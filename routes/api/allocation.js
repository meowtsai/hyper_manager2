const express = require("express");
const router = express.Router();
const validator = require("validator");
const auth = require("../../middleware/auth");
const QuestionsModel = require("../../models/QuestionsModel");
const Admin_user = require("../../models/Admin_user");
const AllocationModel = require("../../models/AllocationModel");
const AdminPresetMessageModel = require("../../models/AdminPresetMessageModel");

const checkPermission = require("../../middleware/checkPermission");
const SERVICE_CONFIG = require("../../config/service");
//@route: GET /api/allocation/test
//@desc:
//@access: private
router.get("/test", auth, async (req, res) => {
  const pAllocation = await AllocationModel.getRecordsByQid(
    "314651,314642, 99852"
  );
  res.json({ msg: "/api/allocation/test works!", pAllocation });
});

//@route: GET /api/allocation/list
//@desc:
//@access: private
router.get("/list", auth, async (req, res) => {
  const all_records = await AllocationModel.getRecords();
  const allocationStatus = SERVICE_CONFIG.allocationStatus;
  const cs_members = await Admin_user.findAllByRole("cs_master");

  res.json({ all_records, allocationStatus, cs_members });
});

//@route: GET /api/allocation
//@desc:
//@access: private
router.get("/:question_id", auth, async (req, res) => {
  const allocationStatus = SERVICE_CONFIG.allocationStatus;
  const question_id = req.params.question_id;
  const allocation = await AllocationModel.getRecordsByQidSingle(question_id);

  const allocation_logs = allocation
    ? await AllocationModel.getLogsByAllocationId(allocation.id)
    : [];

  const allocation_quick_msg = allocation_logs
    ? await AdminPresetMessageModel.getAllByUid(req.user.uid)
    : [];

  //console.log("allocation_quick_msg", allocation_quick_msg);
  res.json({
    allocation,
    allocation_logs,
    allocationStatus,
    allocation_quick_msg
  });
});

//@route: POST /api/allocation
//@desc:ants assign an allocation task to cs_master
//INSERT INTO question_allocation(question_id,allocate_cause, assignor) VALUES(311121,'玩家反應遭到禁言，想知道禁言時間，還請協助確認，謝謝。', 153);
//@access: private
router.post(
  "/",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const errors = validateAllocationInsert(req.body);
    if (!errors.isValid) {
      return res.status(400).json(errors.errors);
    }

    const { question_id, allocate_cause } = req.body;
    const assignor = req.user.uid;

    const question = await QuestionsModel.findOne(question_id);
    if (question.status === "4") {
      return res.status(418).json({ msg: "不可後送已經結案的提問單" });
    }

    const record = {
      question_id,
      allocate_cause,
      assignor
    };

    const insResult = await AllocationModel.save(record);

    res.json({
      msg: "新增後送成功。",
      id: insResult.insertId,
      updatedField: {
        ...record,
        create_time: new Date(),
        admin_uname: req.user.name,
        allocate_status: 0
      }
    });
  }
);

//@route: POST /api/allocation
//@desc:cs_master click on take orders
//cs_master click "take orders!"
// UPDATE question_allocation SET assignee=86,allocate_status=1  WHERE ID IN(SELECT id as allocation_id
//   FROM question_allocation
//   WHERE allocate_status=0
//   ORDER BY priority DESC, ID ASC  LIMIT 3);
//   INSERT INTO question_allocation_records
//   (allocation_id, allocate_status, allocate_note, admin_uid) VALUES
//   (1, 1, '自動派單給' + cs_master.admi_uid , 113);
//@access: private

router.post(
  "/take_allocation_tasks",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const user = req.user;

    if (user.role !== "cs_master" && user.role !== "admin") {
      return res.status(418).json({ msg: "沒有接單的相關職權" });
    }

    let okGo = false;
    let noGoReason = "";

    //每小時可領三件
    const chkLegitimate1 = await AllocationModel.findAssigneeLogsForThePastOneHour(
      user.uid
    );

    //console.log("past one hour tasks assigned", chkLegitimate1);

    if (chkLegitimate1 >= 3) {
      noGoReason = "每小時可領上限是三件, 請先處理目前手上的案子。";

      //檢查過去1小時已經處理兩個案件
      const chkLegitimate2 = await AllocationModel.findHandledLogsForThePastOneHour(
        user.uid
      );

      //console.log("past one hour task handled", chkLegitimate2);
      if (chkLegitimate2 >= 2) {
        okGo = true;
      }
    } else {
      okGo = true;
    }

    //隔天若個人帳號「已領取案件有1/3未標記已處理」或「未結案件數超過10件」 無法領取
    //get user current task
    const allTasks = await AllocationModel.findCurrentTasks(user.uid);
    //console.log("allTasks", allTasks);
    const unhandledCount = allTasks.filter(task => task.allocate_status === "1")
      .length; //未處理
    if (unhandledCount / allTasks.length > 0.3 || unhandledCount > 10) {
      noGoReason =
        "個人帳號「已領取案件有1/3未標記已處理」或「未結案件數超過10件」 無法領取";
      okGo = false;
    }

    if (!okGo) {
      return res.status(418).json({ msg: `無法領取, 原因: ${noGoReason}` });
    }

    //res.json({ msg: okGo });

    const tasks = await AllocationModel.getToByAssignTasks();
    //console.log("tasks", tasks);

    let logs = [];

    if (tasks.length === 0) {
      return res.status(418).json({ msg: `已經沒有案件可以領了` });
    }
    tasks.map(task => {
      const record = {
        assignee: user.uid,
        allocate_status: 1,
        update_time: new Date()
      };

      AllocationModel.findByIdAndUpdate(task.allocation_id, record);

      const log = {
        allocation_id: task.allocation_id,
        allocate_status: 1,
        allocate_note: "機器人派單給" + user.name,
        admin_uid: 113
      };

      AllocationModel.saveLog(log);

      logs.push({
        ...log,
        assignee_name: user.name,
        assignee: user.uid,
        ins_status: "new"
      });
    });

    res.json({ msg: "案件領取成功", tasks, logs });

    // const record = {
    //   assignee: user.uid
    // };

    // const assignResult = await AllocationModel.assign(user.uid);
    // const log = {
    //   allocation_id,
    //   allocate_status,
    //   allocate_note,
    //   admin_uid: req.user.uid
    // };

    // const logResult = AllocationModel.saveLog(log);

    // res.json({
    //   msg: "後送派單領取成功。",
    //   id: insResult.insertId,
    //   updatedField: {
    //     ...record,
    //     create_time: new Date(),
    //     admin_uname: req.user.name,
    //     allocate_status: 0
    //   }
    // });
  }
);

//可以任意變換負責人
// a_id, assign to ,
router.post(
  "/reassign",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const user = req.user;

    if (
      user.role !== "cs_master" &&
      user.role !== "admin" &&
      user.role !== "pm"
    ) {
      return res.status(418).json({ msg: "無法任意變換" });
    }

    const { allocation_id, new_assignee } = req.body;

    const assigneeUser = await Admin_user.findByUid({ uid: new_assignee });
    //console.log("new_assignee", new_assignee);
    //console.log("assigneeUser", assigneeUser);
    if (!assigneeUser) {
      return res.status(418).json({ msg: "用戶不存在" });
    }

    const allocation_task = await AllocationModel.findOne(allocation_id);
    if (!allocation_task) {
      return res.status(418).json({ msg: "案件不存在" });
    }

    const record = {
      assignee: assigneeUser.uid,
      allocate_status: 1,
      update_time: new Date()
    };

    AllocationModel.findByIdAndUpdate(allocation_id, record);

    const log = {
      allocation_id: allocation_id,
      allocate_status: 1,
      allocate_note: "轉派給" + assigneeUser.name,
      admin_uid: user.uid
    };

    AllocationModel.saveLog(log);

    res.json({
      msg: "案件轉派成功",
      record: {
        ...record,
        allocation_id,
        assignee_name: assigneeUser.name
      },
      log
    });
  }
);

//@route: PUT /api/allocation
//@desc:改變allocation task 的狀態並新增一筆history
//ants 發現錯誤 自己結案
// UPDATE question_allocation SET assignee={ants_admin_uid},allocate_status=4  WHERE ID=@id
// INSERT INTO question_allocation_records(allocation_id, allocate_status, allocate_note, admin_uid) VALUES(1, 4, '撤單 - 原因是xxxxx' , {ants_admin_uid});

//@access: private
router.put(
  "/",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const errors = validateAllocationUpdate(req.body);
    if (!errors.isValid) {
      return res.status(400).json(errors.errors);
    }

    const { allocation_id, allocate_status, allocate_note } = req.body;

    const allocation = await AllocationModel.findOne(allocation_id);
    if (!allocation) {
      return res.status(418).json({ msg: "沒有該後送工作單。" });
    }
    if (
      allocation.status === "0" &&
      allocate_status === "4" &&
      allocation.assignor !== req.user.uid
    ) {
      return res
        .status(418)
        .json({ msg: "只有原後送發起人可以在未處理情況下結束後送工作。" });
    }

    const record = {
      allocate_status,
      update_time: new Date(),
      
    };

    //表示可能補足條件的單子重新進入派單

    if (allocate_status === 0) {
      record.assignee = null;
    }

    //99是補充說明 不改變狀態
    if (allocate_status === 99) {
      record.allocate_status = allocation.allocate_status;
    }
    if(allocate_status === 3 ||allocate_status === 4){
      record.assignee=req.user.uid;
      
    }

    const updResult = await AllocationModel.findByIdAndUpdate(
      allocation_id,
      record
    );

    const log = {
      allocation_id,
      allocate_status,
      allocate_note,
      admin_uid: req.user.uid
    };

    const logResult = AllocationModel.saveLog(log);

    if (allocate_status === 0) {
      record.assignee_name = null;
    }
    if (allocate_status === 3 || allocate_status === 4) {
      record.assignee_name=req.user.name;
    }
    

    if (!updResult.error) {
      res.json({
        msg: "修改後送工作狀態成功。",
        id: allocation_id,
        updatedField: {
          ...record
        },
        newLog: {
          ...log,
          update_time: new Date(),
          admin_uname: req.user.name
        }
      });
    } else {
      return res.status(418).json({ msg: updResult.error });
    }
  }
);

module.exports = router;

const validateAllocationInsert = data => {
  //姓名, 原因, 日期,  處理人
  let errors = {};
  const { question_id, allocate_cause } = data;

  if (!allocate_cause || validator.isEmpty(allocate_cause)) {
    errors.allocate_cause = "必須填寫後送描述。";
  }

  if (!question_id) {
    errors.question_id = "沒有提問單號";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
const validateAllocationUpdate = data => {
  //姓名, 原因, 日期,  處理人
  let errors = {};
  //console.log("validateAllocationUpdate", data);
  const { allocation_id, allocate_status, allocate_note } = data;

  if (!allocate_note || validator.isEmpty(allocate_note)) {
    errors.allocate_note = "必須填寫處理描述。";
  }

  if (!allocation_id) {
    errors.allocation_id = "沒有後送單號";
  }
  if (validator.isEmpty(allocate_status.toString())) {
    errors.allocate_status = "沒有指定後送狀態";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
