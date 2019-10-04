const express = require("express");
const router = express.Router();
const moment = require("moment");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const QuestionsModel = require("../../models/QuestionsModel");
const Admin_user = require("../../models/Admin_user");
const RepliesModel = require("../../models/RepliesModel");
const BatchTasksModel = require("../../models/BatchTasksModel");
const LogAdminActionsModel = require("../../models/LogAdminActionsModel");
const AllocationModel = require("../../models/AllocationModel");

const SERVICE_CONFIG = require("../../config/service");

const helper = require("../../utils/helper");

const checkPermission = require("../../middleware/checkPermission");
const auth = require("../../middleware/auth");

//@route: GET /api/questions/test
//@desc: get questions list
//@access: private

router.get("/test", auth, async (req, res) => {
  const questionsList = await QuestionsModel.getTestData();
  res.json(questionsList);
});

//@route: GET /api/questions/overview
//@desc: get questions status overview
//@access: private

router.get(
  "/overview",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "read");
  },
  async (req, res) => {
    const allow_games =
      req.user.role === "admin" ||
      Admin_user.checkPermission(req.user.role, "all_game", "all")
        ? "all_game"
        : Admin_user.getAllowedGames(req.user.role);

    //const allow_games = await Admin_user.getAllowedGames("ants");

    const dataToday = QuestionsModel.getOverviewData(allow_games, 1);
    const dataTotal = QuestionsModel.getOverviewData(allow_games, 2);
    const dataAllocate = QuestionsModel.getAllocateOverview(allow_games);
    const dataAllocateNew = AllocationModel.getAllocateOverview();

    Promise.all([dataToday, dataTotal, dataAllocate, dataAllocateNew]).then(
      ([ovToday, ovTotal, ovAllocate, ovAllocateNew]) => {
        stat = {
          ovToday,
          ovTotal,
          ovAllocate,
          ovAllocateNew
        };

        res.json(stat);
      },
      reason => {
        //console.log(reason);
        res.json({ reason });
      }
    );
  }
);

//getAllowedGames
//@route: GET /api/questions/
//@desc: get questions list
//@access: private

router.get("/", auth, async (req, res) => {
  const questionsList = await QuestionsModel.getAll(0, 25);
  res.json(questionsList);
});

//@route: GET /api/questions/view/:id
//@desc: get single question
//@access: private

router.get(
  "/view/:question_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const question_type = SERVICE_CONFIG.question_type;
    const question_status = SERVICE_CONFIG.question_status;
    //檢查是否有權限可以加入批次
    const add_favor_ok = Admin_user.checkPermission(
      "service",
      "favorite",
      req.user.role
    );

    const question_id = req.params.question_id;
    //檢查本單是否已經在批次中
    const q_batch_info = QuestionsModel.checkBatchInfo(question_id);
    const question = QuestionsModel.findOneComplete(question_id, req.user.uid);

    const replies = RepliesModel.getRepliesByQidSingle(question_id);
    const pic_plus = QuestionsModel.getPicPlus(question_id);

    const allocate_users = Admin_user.findAllByRole("cs");
    const tasks = BatchTasksModel.getActiveTasks(req.user.uid);

    Promise.all([
      question,
      replies,
      pic_plus,
      add_favor_ok,
      q_batch_info,
      allocate_users,
      tasks
    ]).then(
      ([
        question,
        replies,
        pic_plus,
        add_favor_ok,
        q_batch_info,
        allocate_users,
        tasks
      ]) => {
        stat = {
          question,
          replies,
          pic_plus,
          add_favor_ok,
          q_batch_info,
          allocate_users,
          tasks
        };

        res.json({ stat, question_type, question_status });
      },
      reason => {
        //console.log(reason);
        res.status(400).json({ msg: reason });
        res.json({ reason });
      }
    );
  }
);

//@route: GET /api/questions/allocated/:admin_uid
//@desc: get allocated questions list
//@access: private
//$allocate_count = $this->DB1->from("questions q")->where("q.allocate_admin_uid", $_SESSION['admin_uid'])->where("q.allocate_status", "1")->count_all_results();
router.get("/allocated", auth, async (req, res) => {
  //const admin_uid = req.user.uid;
  const admin_uid = 86;
  const questionsList = await QuestionsModel.getAllocateList(admin_uid, 1);
  res.json(questionsList);
});

//@route: GET /api/questions/getList
//@desc: get allocated questions list
//@access: private
//$allocate_count = $this->DB1->from("questions q")->where("q.allocate_admin_uid", $_SESSION['admin_uid'])->where("q.allocate_status", "1")->count_all_results();
router.post("/getList", auth, async (req, res) => {
  //const admin_uid = req.user.uid;
  const question_type = SERVICE_CONFIG.question_type;
  const question_status = SERVICE_CONFIG.question_status;
  const allocation_status = SERVICE_CONFIG.allocationStatus;
  //console.log("server get list", req.body);
  const condition = req.body;
  //const action = req.query.action; //查詢
  const action = "查詢";
  let query = [];
  if (action) {
    query = await QuestionsModel.getAll(req.user.uid, condition);
  } else {
    //default
  }
  const q_ids = query.length > 0 ? query.map(q => q.id).join(",") : [];
  const pReply = RepliesModel.getRepliesByQid(q_ids);
  const pAllocation = AllocationModel.getRecordsByQid(q_ids);
  Promise.all([pReply, pAllocation]).then(
    ([reply_query, newAllocationStatus]) => {
      res.json({
        query,
        reply_query,
        newAllocationStatus,
        question_type,
        question_status,
        allocation_status
      });
    },
    reason => {
      //console.log(reason);
      res.json({ reason });
    }
  );

  //const admin_uid = 86;
  //const questionsList = await QuestionsModel.getAllocateList(admin_uid, 1);
});

router.put(
  "/updateQuestionType",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    //console.log("updateQuestionType", req.body);
    const { qId, newType } = req.body;
    const result = await QuestionsModel.findByIdAndUpdate(qId, {
      type: newType
    });

    //console.log(result);
    if (result.affectedRows === 1) {
      res.json({
        msg: "編輯成功",
        id: qId,
        type: newType
      });
    } else {
      res.status(500).json({ msg: `新增失敗(${result.error})` });
    }
  }
);
router.put(
  "/updateQuestionStatus",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    //console.log("updateQuestionStatus", req.body);
    const { qId, newStatus } = req.body;
    const result = await QuestionsModel.findByIdAndUpdate(qId, {
      status: newStatus
    });

    //console.log(result);
    if (result.affectedRows === 1) {
      res.json({
        msg: "編輯成功",
        id: qId,
        status: newStatus
      });
    } else {
      res.status(500).json({ msg: `新增失敗(${result.error})` });
    }
  }
);

router.put(
  "/allocate_json",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    //console.log("allocate_json", req.body);
    const {
      question_id,
      allocate_result,
      result,
      allocate_admin_uid
    } = req.body;

    const dt = moment()
      .local()
      .format("YYYY-MM-DD HH:mm");

    const updatedResult = `${
      allocate_result === null ? "" : allocate_result
    }${dt} - ${req.user.name}：[後送]${result}<br>`;

    const updatedField = {
      allocate_admin_uid: allocate_admin_uid,
      allocate_date: dt,
      allocate_status: 1,
      allocate_result: updatedResult,
      close_admin_uid: null,
      system_closed_start: null
    };

    const dbResult = await QuestionsModel.findByIdAndUpdate(
      question_id,
      updatedField
    );

    //console.log(result);
    if (dbResult.affectedRows === 1) {
      res.json({
        msg: "後送成功",
        id: question_id,
        updatedField: updatedField
      });
    } else {
      res.status(500).json({ msg: `失敗(${dbResult.error})` });
    }
  }
);

router.put(
  "/request_allocate_json",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    //console.log("allocate_json", req.body);
    const {
      question_id,
      allocate_result,
      result,
      allocate_admin_uid
    } = req.body;

    const dt = moment()
      .local()
      .format("YYYY-MM-DD HH:mm");

    const updatedResult = `${
      allocate_result === null ? "" : allocate_result
    }${dt} - ${req.user.name}：[資料請求]${result}<br>`;

    const updatedField = {
      allocate_admin_uid: allocate_admin_uid,
      allocate_status: 3,
      allocate_result: updatedResult,
      close_admin_uid: null,
      system_closed_start: null
    };

    const dbResult = await QuestionsModel.findByIdAndUpdate(
      question_id,
      updatedField
    );

    //console.log(result);
    if (dbResult.affectedRows === 1) {
      res.json({
        msg: "後送成功",
        id: question_id,
        updatedField: updatedField
      });
    } else {
      res.status(500).json({ msg: `失敗(${dbResult.error})` });
    }
  }
);

router.put(
  "/finish_allocate_json",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const { question_id, allocate_result, result } = req.body;

    const dt = moment()
      .local()
      .format("YYYY-MM-DD HH:mm");

    const updatedResult = `${allocate_result}${dt} - ${req.user.name}：[處理完成]${result}<br>`;

    const updatedField = {
      allocate_admin_uid: req.user.uid,
      allocate_finish_date: dt,
      allocate_status: 2,
      allocate_result: updatedResult
    };

    const dbResult = await QuestionsModel.findByIdAndUpdate(
      question_id,
      updatedField
    );

    //console.log(result);
    if (dbResult.affectedRows === 1) {
      res.json({
        msg: "已修改為後送處理完成",
        id: question_id,
        updatedField: { ...updatedField, allocate_user_name: req.user.name }
      });
    } else {
      res.status(500).json({ msg: `失敗(${dbResult.error})` });
    }
  }
);

router.put(
  "/modify_reply_json",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const { id, question_id, content } = req.body;
    if (helper.isEmpty(content)) {
      return res.status(400).json({ msg: "請輸入回覆內容。" });
    }

    const post_content = helper.nl2brB(content);

    //409 is the correct status code for duplicate resource or resource already exists.
    const isDub = await RepliesModel.checkDuplicate(question_id, post_content);
    //檢查是否重複作答
    if (isDub) {
      return res.status(409).json({ msg: "請勿重覆回答。" });
    }
    const data = {
      uid: 0,
      question_id,
      content: post_content,
      is_official: "1",
      admin_uid: req.user.uid
    };

    //console.log("modify_reply_json data", data);
    if (!helper.isEmpty(id)) {
      const reply = await RepliesModel.findOne(id);
      //console.log("modify_reply_json reply", reply);

      const log = {
        admin_uid: req.user.uid,
        ip: req.clientIp,
        action: "question_reply",
        function: "update",
        desc: `編輯回覆 #${id} ${reply.content} => ${data.content}`,
        create_time: "NOW()"
      };

      LogAdminActionsModel.save(log);
      const replyResult = await RepliesModel.findByIdAndUpdate(id, data);

      if (!replyResult.error) {
        res.json({
          msg: "編輯回覆成功。",
          id: id,
          updatedField: {
            ...data,
            create_time: new Date(),
            admin_uname: req.user.name
          }
        });
      } else {
        res.status(500).json({ msg: `失敗(${replyResult.error})` });
      }
    } else {
      const insResult = await RepliesModel.save(data);
      const updateQuestionData = {
        update_time: new Date(),
        is_read: "0",
        status: "2",
        admin_uid: req.user.uid
      };
      QuestionsModel.findByIdAndUpdate(question_id, updateQuestionData);

      const question = await QuestionsModel.findOne(question_id);
      const {
        email,
        game_name,
        game_id,
        check_id,
        is_in_game,
        ip,
        phone
      } = question;

      //console.log(qResult);
      //get token to send user direct link
      if (validator.isEmail(email)) {
        let msg;
        if (is_in_game === "1") {
          //在遊戲中的不提示檢核碼, 請玩家直接進入客服中心查看
          msg = `提問單編號[${question_id}]回覆通知 - 您提問的內容已收到最新回覆，<br />您可以透過<b>遊戲內客服中心</b>查看相關內容。`;
        } else {
          if (!helper.isEmpty(ip)) {
            //表示新的機制

            const jsonToBeSinged = {
              check_id,
              email,
              mobile: phone,
              question_id: question_id
            };

            try {
              const token = await jwt.sign(
                jsonToBeSinged,
                SERVICE_CONFIG.supportJwtSecret,
                {
                  expiresIn: "7d"
                }
              );

              msg = `提問單編號[${question_id}]回覆通知 - 您提問的內容已收到最新回覆，<br />您可以透過<a href='${SERVICE_CONFIG.site}/service/${game_id}/view/${question_id}?token=${token}'>客服中心</a>查看相關內容。。<br /><br />查詢代碼<b>${check_id}</b>`;
            } catch (error) {
              msg = `提問單編號[${question_id}]回覆通知 - 您提問的內容已收到最新回覆，<br />您可以透過<a href='${SERVICE_CONFIG.site}/service_quick?param_game_id=${game_id}'>追蹤此單號</a>，查看相關內容。<br /><br />查詢代碼<b>${check_id}</b>`;
            }
          } else {
            msg = `提問單編號${question_id}回覆通知 - 您提問的內容已收到最新回覆，<br />您可以透過<a href='https://game.longeplay.com.tw/service_quick?site=long_e&param_game_id=${game_id}'>追蹤此單號</a>，查看相關內容。<br /><br />查詢代碼<b>${check_id}</b>`;
          }
        }

        /// EMAIL /////
        //if (process.env.NODE_ENV != "development") {
        if (process.env.NODE_ENV === "production") {
          const nodemailer = require("nodemailer");
          const smtp_server = require("../../config/default")["smtp_server"];
          let transporter = nodemailer.createTransport(smtp_server);

          const fs = require("fs");

          let html_template = fs.readFileSync(
            __dirname + "/../../utils//template/mail.html",
            "utf8"
          );

          html_template = html_template.replace(/{{game_name}}/g, game_name);

          html_template = html_template.replace("{{msg}}", msg);
          html_template = html_template.replace(
            "{{year}}",
            new Date().getFullYear()
          );

          let mailOptions = {
            //$_SESSION['game_name']."客服代碼通知信[".date("Y/m/d H:i:s")."]",
            from: '"龍邑自動回覆系統" <no-reply@longeplay.com.tw>', // sender address
            to: email, // list of receivers
            subject: `${game_name}客服回覆通知信 ${moment().format(
              "YYYY-MM-DD HH:mm:ss"
            )}`, // Subject line
            html: html_template // html body
          };

          // send mail with defined transport object
          let maileSentResult;
          try {
            maileSentResult = await transporter.sendMail(mailOptions);
            //console.log("Message sent: %s", maileSentResult);
          } catch (error) {
            maileSentResult = error;
            //console.log("Message sent ERROR: %s", error);
          }

          //console.log("Message sent: %s", info.messageId);

          /// EMAIL /////
        }
      }

      res.json({
        msg: `新增回覆成功。${maileSentResult}`,
        id: insResult.insertId,
        updatedField: {
          ...data,
          create_time: new Date(),
          admin_uname: req.user.name
        },
        updateQuestionData
      });
    }
  }
);

router.put(
  "/close_question",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const { question_id } = req.body;
    const question = await QuestionsModel.findOne(question_id);

    if (question.id) {
      if (!question.admin_uid) {
        return res.status(409).json({ msg: `問題尚未處理` });
      }

      const updateFiled = {
        status: "4",
        close_admin_uid: req.user.uid,
        system_closed_start: null
      };
      const result = await QuestionsModel.findByIdAndUpdate(
        question_id,
        updateFiled
      );

      //console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          msg: "已將問題設定為結案狀態。",
          id: question_id,
          updatedField: { ...updateFiled, close_admin_name: req.user.name }
        });
      } else {
        res.status(500).json({ msg: `結案失敗(${result.error})` });
      }
    } else {
      return res.status(404).json({ msg: `沒有這個提問單` });
    }
  }
);

router.put(
  "/reserved_question",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const { question_id } = req.body;
    const question = await QuestionsModel.findOne(question_id);

    if (question.id) {
      if (
        !question.admin_uid ||
        question.status.toString() !== "2" ||
        question.allocate_status.toString() === "1"
      ) {
        return res
          .status(409)
          .json({ msg: `該問題尚未處理, 已經結案或是仍在後送中` });
      }

      const updateFiled = {
        status: "7",
        close_admin_uid: req.user.uid,
        system_closed_start: new Date()
      };
      const result = await QuestionsModel.findByIdAndUpdate(
        question_id,
        updateFiled
      );

      //console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          msg: "已將問題設定為預約結案狀態。",
          id: question_id,
          updatedField: { ...updateFiled, close_admin_name: req.user.name }
        });
      } else {
        res.status(500).json({ msg: `結案失敗(${result.error})` });
      }
    } else {
      return res.status(404).json({ msg: `沒有這個提問單` });
    }
  }
);

router.put(
  "/cancel_reserved_question",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const { question_id } = req.body;
    const question = await QuestionsModel.findOne(question_id);

    if (question.id) {
      if (question.system_closed.toString() === "1") {
        return res.status(409).json({ msg: `該問題已無法取消預約` });
      }

      const updateFiled = {
        status: "2",
        close_admin_uid: null,
        system_closed_start: null
      };
      const result = await QuestionsModel.findByIdAndUpdate(
        question_id,
        updateFiled
      );

      //console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          msg: "已經取消預約。",
          id: question_id,
          updatedField: { ...updateFiled, close_admin_name: null }
        });
      } else {
        res.status(500).json({ msg: `取消預約失敗(${result.error})` });
      }
    } else {
      return res.status(404).json({ msg: `沒有這個提問單` });
    }
  }
);

module.exports = router;
