const express = require("express");
const router = express.Router();
const BatchTasksModel = require("../../models/BatchTasksModel");
const GamesModel = require("../../models/GamesModel");
const QuestionsModel = require("../../models/QuestionsModel");

const RepliesModel = require("../../models/RepliesModel");
const SERVICE_CONFIG = require("../../config/service");
const moment = require("moment");
const helper = require("../../utils/helper");
const checkPermission = require("../../middleware/checkPermission");
const validator = require("validator");
//@route: GET /api/batch/list
//@desc: get all batch tasks
//@access: private

router.get(
  "/list",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "favorite");
  },
  async (req, res) => {
    try {
      const task_list = await BatchTasksModel.getAll();
      const return_list = task_list.map(task => ({
        ...task,
        is_editable: req.user.uid === task.admin_uid ? "1" : "0"
      }));

      const games_list = await GamesModel.getAll();

      res.json({ batch_tasks: return_list, games: games_list });
    } catch (error) {
      res.status(500).json({ msg: `獲取列表失敗(${error})` });
    }
  }
);

router.get(
  "/detail/:task_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "favorite");
  },
  async (req, res) => {
    const task_id = req.params.task_id;
    const task = await BatchTasksModel.findOne(task_id);
    const q_list = await BatchTasksModel.findBatchQuestionsById(task_id);
    const question_type = SERVICE_CONFIG.question_type;

    if (task) {
      res.json({ task, q_list, question_type });
    } else {
      return res.status(400).json({ msg: "沒有這個處理項目" });
    }
  }
);

//@route: POST /api/batch/task
//@desc: add a new task  or edit an existing task
//@access: private
//@params: //data = `game_id=${game_id}&title=${title}&status=${status}&id=${id}`;
router.post(
  "/task",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "favorite");
  },
  async (req, res) => {
    const errors = validateTaskInput(req.body);

    if (!errors.isValid) {
      //Bad request
      res.status(400).json(errors);
    } else {
      const batch_task = req.body;
      const task_id = batch_task.id ? batch_task.id : null;
      delete batch_task.id;
      batch_task.admin_uid = req.user.uid;
      batch_task.update_time = new Date();
      const result = task_id
        ? await BatchTasksModel.findByIdAndUpdate(task_id, batch_task)
        : await BatchTasksModel.save(batch_task);
      //console.log(result);
      if (result.affectedRows === 1) {
        //task_id = task_id ? task_id : result.insertId;

        const row = await BatchTasksModel.findOne(
          task_id ? task_id : result.insertId
        );

        res.json({
          msg: task_id ? "編輯成功" : "新增成功",
          affectedId: task_id ? task_id : result.insertId,
          action: task_id ? "edit" : "add",
          affectedRow: row
        });
      } else {
        res.status(500).json({ msg: `新增或編輯失敗(${result.error})` });
      }
    }
  }
);

//@route: POST /api/batch/add_to_batch
//@desc: add a question to a exsiting batch
//@access: private
//@params: //data = question_id, batch_id
router.post(
  "/add_to_batch",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "favorite");
  },
  async (req, res) => {
    const { question_id, batch_id } = req.body;

    try {
      const result = await BatchTasksModel.addQuestionToBatch(
        question_id,
        batch_id
      );
      if (result.affectedRows === 1) {
        //select adm.name as admin_name,b.admin_uid, a.batch_id,a.question_id
        res.json({
          msg: "加入批次成功",
          batch_info: {
            admin_name: req.user.name,
            admin_uid: req.user.uid,
            batch_id,
            question_id
          }
        });
      }
    } catch (error) {
      res.status(500).json({ msg: `新增或編輯失敗(${error})` });
    }
  }
);

//@route: DELETE /api/batch/remove_from_batch/:question_id
//@desc: remove a question from a batch which status =1
//@access: private
//@params: //data = question_id
router.delete(
  "/remove_from_batch/:question_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "favorite");
  },
  async (req, res) => {
    const question_id = req.params.question_id;

    try {
      const result = await BatchTasksModel.removeQuestionFromBatch(question_id);
      if (result.affectedRows === 1) {
        //select adm.name as admin_name,b.admin_uid, a.batch_id,a.question_id
        res.json({
          msg: "已經從批次移除",
          removed_q_id: question_id
        });
      } else {
        res.json({
          msg: "該提問不存在於批次中",
          removed_q_id: question_id
        });
      }
    } catch (error) {
      res.status(500).json({ msg: `新增或編輯失敗(${error})` });
    }
  }
);

//@route: DELETE /api/batch/:id
//@desc: remove a task by its id
//@access: private
router.delete(
  "/task/:id",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "favorite");
  },
  async (req, res) => {
    const record_id = req.params.id;
    const delResult = await BatchTasksModel.findAndRemove(record_id);

    if (delResult.error) {
      return res.status(500).json({ msg: delResult.error });
    }

    if (delResult.affectedRows === 1) {
      res.json({
        msg: "紀錄已經刪除。",
        deleted_id: record_id
      });
    } else {
      res.status(500).json({ msg: "紀錄刪除失敗" });
    }
  }
);

//@route: DELETE /api/batch/remove_batch_q/:batch_id
//@desc: remove all questions under a batch_id table :batch_questions
//@access: private
router.delete(
  "/remove_batch_q/:batch_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "favorite");
  },
  async (req, res) => {
    const batch_id = req.params.batch_id;
    const delResult = await BatchTasksModel.removeBatchQuestionsByBatchId(
      batch_id
    );

    if (delResult.error) {
      return res.status(500).json({ msg: delResult.error });
    }

    if (delResult.affectedRows > 0) {
      res.json({
        msg: "已經刪除關聯。",
        affected_batch_id: batch_id
      });
    } else {
      res.status(500).json({ msg: "移除關聯失敗" });
    }
  }
);

//@route: POST /api/batch/batch_reply_json
//@desc: add reply and update the status of each questions related a batch id
//@access: private
//@params: data: `batch_id=${batch_id}&new_type=${new_type}&post_content=${post_content}&mode=${mode}`,
router.post(
  "/batch_reply_json",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "modify");
  },
  async (req, res) => {
    const errors = validateReplyInput(req.body);
    // console.log("body", req.body);
    // console.log("errors", errors);

    if (!errors.isValid) {
      //Bad request
      return res.status(400).json(errors);
    } else {
      //
      const { batch_id, mode, new_type, post_content } = req.body;

      const q_list = await BatchTasksModel.findBatchQuestionsById(batch_id);
      //console.log(q_list);
      //項目沒有任何提問單
      if (!q_list) {
        return res.status(500).json({ msg: "該項目沒有任何提問單" });
      }

      // 狀態2 或 0 的才能結案 且不可是後送的 0初始 1指派 2原廠 狀態

      if (mode === "7" || mode === "4") {
        const check_q_list = await BatchTasksModel.checkQuestionsStatusValidity(
          batch_id
        );
        if (check_q_list) {
          return res
            .status(500)
            .json({ msg: "該項目含有不可結案的提案單:" + check_q_list });
        }
      }

      //儲存每個問題的個別回覆
      const q_ids = await RepliesModel.saveBatch(
        q_list,
        post_content,
        req.user.uid
      );

      //變更問題狀態
      const qField = {
        close_admin_uid: mode === 2 ? null : req.user.uid,
        status: mode,
        system_closed_start: mode === 7 ? new Date() : null, //while mode=7
        admin_uid: req.user.uid,
        type: new_type,
        update_time: new Date(),
        is_read: 0
      };

      const rows = await QuestionsModel.batchUpdate(q_ids, qField);

      const batch_task = {
        update_time: new Date(),
        status: mode
      };
      await BatchTasksModel.findByIdAndUpdate(batch_id, batch_task);

      res.json({
        msg: "OK",
        mode
      });
    }
  }
);

//@route: POST /api/batch/batch_add_to_batch
//@desc: add a series of questions to a exsiting batch
//@access: private
//@params: //data: "ids=" + arr + "&batch_id=" + batch_id ,
router.post(
  "/batch_add_to_batch",
  function(req, res, next) {
    return checkPermission(req, res, next, "service", "favorite");
  },
  async (req, res) => {
    const { ids, batch_id } = req.body;

    if (helper.isEmpty(ids) || helper.isEmpty(batch_id)) {
      return res
        .status(500)
        .json({ msg: "操作失敗, 沒有選擇問題或批次程序。" });
    }

    try {
      //check games
      //console.log("ids", ids.join(",")); ids 338490,338492,338493
      //console.log("batch_id", batch_id);batch_id 125

      const isSameGame = await BatchTasksModel.checkIfSameGame(
        ids.join(","),
        batch_id
      );

      if (!isSameGame) {
        return res
          .status(500)
          .json({ msg: "操作失敗, 所選問題必須和該批次工作屬於相同遊戲。" });
      }

      const result = await BatchTasksModel.addBatchQuestionsToBatch(
        ids,
        batch_id
      );

      if (result.affectedRows > 0) {
        //console.log("addBatchQuestionsToBatch result", result);
        //select adm.name as admin_name,b.admin_uid, a.batch_id,a.question_id
        res.json({
          msg: "加入批次成功",
          ids
        });
      } else {
        return res
          .status(500)
          .json({ msg: `加入批次失敗(${JSON.stringify(result)})` });
      }
    } catch (error) {
      return res.status(500).json({ msg: `加入批次失敗(${error})` });
    }
  }
);

module.exports = router;

const validateReplyInput = data => {
  let errors = {};
  //console.log("data", data);
  const { batch_id, mode, new_type, post_content } = data;
  if (!batch_id || validator.isEmpty(batch_id.toString())) {
    errors.batch_id = "沒有批次項目ID。";
  }
  if (!mode || !validator.isNumeric(mode.toString())) {
    errors.mode = "回覆status狀態錯誤。";
  }
  if (!new_type) {
    errors.new_type = "回覆new_type狀態錯誤。";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
const validateTaskInput = data => {
  let errors = {};
  const { game_id, title } = data;
  if (!game_id || validator.isEmpty(game_id)) {
    errors.game_id = "遊戲ID必選。";
  }
  if (!title || !validator.isByteLength(title, { min: 1, max: 150 })) {
    errors.title = "活動名稱長度必須在1~150字之間。";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
