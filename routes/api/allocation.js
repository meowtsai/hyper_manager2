const express = require("express");
const router = express.Router();
const validator = require("validator");
const auth = require("../../middleware/auth");
const QuestionsModel = require("../../models/QuestionsModel");
const AllocationModel = require("../../models/AllocationModel");
const checkPermission = require("../../middleware/checkPermission");
//@route: GET /api/allocation/test
//@desc:
//@access: private
router.get("/test", auth, async (req, res) => {
  res.json({ msg: "/api/allocation/test works!" });
});

//@route: GET /api/allocation
//@desc:
//@access: private
router.get("/:question_id", auth, async (req, res) => {
  const question_id = req.params.question_id;
  const allocation = await AllocationModel.getRecordsByQidSingle(question_id);
  const allocation_logs = await AllocationModel.getLogsByAllocationId(
    allocation.id
  );
  res.json({ allocation, allocation_logs });
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
        admin_uname: req.user.name
      }
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
      assignee: req.user.uid,
      allocate_status,
      update_time: new Date()
    };

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

    if (!updResult.error) {
      res.json({
        msg: "修改後送工作狀態成功。",
        id: allocation_id,
        updatedField: {
          ...record,
          admin_uname: req.user.name
        },
        newLog: {
          ...log,
          update_time: new Date()
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
  const { allocation_id, allocate_status, allocate_note } = data;

  if (!allocate_note || validator.isEmpty(allocate_note)) {
    errors.allocate_note = "必須填寫處理描述。";
  }

  if (!allocation_id) {
    errors.allocation_id = "沒有後送單號";
  }
  if (!allocate_status) {
    errors.allocate_status = "沒有指定後送狀態";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
