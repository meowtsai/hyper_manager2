const express = require("express");
const router = express.Router();
const WhaleUserModel = require("../../models/WhaleUserModel");
const checkPermission = require("../../middleware/checkPermission");
const validator = require("validator");
const auth = require("../../middleware/auth");

//@route: GET /api/vip/test
//@desc: get test res
//@access: public

router.get("/test", async (req, res) => {
  res.json({ msg: "test vip ok" });
});

//@route: GET /api/vip/game_list
//@desc: get game list
//@access: private
//$this->zacl->check("whale_users_statistics", "read");
router.get(
  "/game_list",
  function(req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    const game_list = await WhaleUserModel.getGameList();
    res.json(game_list);
  }
);

//get vip data
router.get(
  "/vip_list/:game_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    const game_id = req.params.game_id;
    const vipP = WhaleUserModel.getVIPList(game_id);
    const requestsP = WhaleUserModel.getRequestData(game_id);

    Promise.all([vipP, requestsP])
      .then(
        ([vip_list, requestData]) => {
          res.json({ vip_list, requestData });
        },
        reason => {
          //console.log(reason);
          res.json({ reason });
        }
      )
      .catch(err => console.log("get vip data error: ", err));
  }
);

//get single vip data
router.get(
  "/user_dashboard/:game_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "vip", "modify");
  },
  async (req, res) => {
    const game_id = req.params.game_id;
    const role_id = decodeURI(req.query.user).replace(" ", "+");

    //console.log("user_dashboard", role_id);

    const vipP = WhaleUserModel.findUserByRoleId(game_id, role_id);
    const requestsP = WhaleUserModel.getRequestDataByRoleId(game_id, role_id);

    Promise.all([vipP, requestsP])
      .then(
        ([vip, requestData]) => {
          res.json({ vip, requestData });
        },
        reason => {
          //console.log(reason);
          res.json({ reason });
        }
      )
      .catch(err => console.log("get vip data error: ", err));
  }
);

//get request data by date range and game_id
router.get(
  "/request_report",
  function(req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    const game_id = req.query.gameId;
    const beginTime = req.query.beginTime;
    const endTime = req.query.endTime;

    //console.log(req.query);

    try {
      const requests = await WhaleUserModel.getRequestDataByDateRangeGameId(
        game_id,
        beginTime,
        endTime
      );

      res.json(requests);
    } catch (error) {
      return res.status(500).json({ msg: `獲取失敗(${error})` });
    }
  }
);
//update whale user info
router.put(
  "/update",
  function(req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    //command "add line" "remove line" confirm inactive
    const { game_id, uid, command } = req.body;
    //console.log("vip update", req.body);

    const whale = await WhaleUserModel.findOne(game_id, uid);

    if (whale.uid) {
      let record;
      if (command === "LINE_ACTION") {
        record =
          whale.is_added === 0
            ? {
                line_date: new Date(),
                is_added: 1
              }
            : {
                line_date: null,
                is_added: 0
              };
      }
      const updateMsg = await WhaleUserModel.findByIdAndUpdate(
        game_id,
        uid,
        record
      );
      if (!updateMsg.error) {
        if (updateMsg.affectedRows === 1) {
          res.json({
            msg: "用戶資訊已更新。",
            game_id,
            uid,
            updatedField: { ...record }
          });
        } else {
          res.status(500).json({ msg: `用戶資訊更新失敗(${updateMsg.error})` });
        }
      } else {
        res.status(500).json({ msg: `更新失敗(${updateMsg.error})` });
      }

      // if (result.affectedRows === 1) {
      //   res.json({
      //     msg: "已將問題設定為預約結案狀態。",
      //     id: question_id,
      //     updatedField: { ...updateFiled, close_admin_name: req.user.name }
      //   });
      // } else {
      //   res.status(500).json({ msg: `結案失敗(${result.error})` });
      // }
    } else {
      return res.status(404).json({ msg: `沒有這個用戶` });
    }
  }
);

router.put(
  "/update_vip_info",
  function(req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    const { game_id, role_id, fields } = req.body;
    //console.log("update_vip_info", req.body);

    const whale = await WhaleUserModel.findUserByRoleId(game_id, role_id);

    if (whale.uid) {
      const updateMsg = await WhaleUserModel.findByRoleIdAndUpdate(
        game_id,
        role_id,
        fields
      );
      if (!updateMsg.error) {
        if (updateMsg.affectedRows === 1) {
          res.json({
            msg: "用戶資訊已更新。",
            game_id,
            role_id,
            updatedField: { ...fields }
          });
        } else {
          res.status(500).json({ msg: `用戶資訊更新失敗(${updateMsg.error})` });
        }
      } else {
        res.status(500).json({ msg: `更新失敗(${updateMsg.error})` });
      }

      // if (result.affectedRows === 1) {
      //   res.json({
      //     msg: "已將問題設定為預約結案狀態。",
      //     id: question_id,
      //     updatedField: { ...updateFiled, close_admin_name: req.user.name }
      //   });
      // } else {
      //   res.status(500).json({ msg: `結案失敗(${result.error})` });
      // }
    } else {
      return res.status(404).json({ msg: `沒有這個用戶` });
    }
  }
);

//@route: DELETE /api/vip/delete_request/:id
//@desc: delete service request by id
//@access: public

router.delete(
  "/delete_request/:id",
  function(req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    const record_id = req.params.id;
    const delResult = await WhaleUserModel.findServiceRequestAndRemove(
      record_id
    );

    if (delResult.error) {
      return res.status(500).json({ msg: delResult.error });
    }

    if (delResult.affectedRows === 1) {
      res.json({
        msg: "紀錄已經刪除。",
        updatedField: record_id
      });
    } else {
      res.status(500).json({ msg: "紀錄刪除失敗" });
    }
  }
);

//@route: POST /api/vip/request/
//@desc: add or modify a service request (by id)
//@access: private

router.post(
  "/request",
  function(req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    const record = req.body;
    const validateResult = validateRequestIns(record);
    if (!validateResult.isValid) {
      return res.status(400).json(validateResult.errors);
    }

    try {
      const record_id = record.id ? record.id : null;
      record.admin_uid = req.user.uid;
      delete record.id;

      const result = record_id
        ? await WhaleUserModel.findServiceRequestByIdAndUpdate(
            record_id,
            record
          )
        : await WhaleUserModel.saveServiceRequest(record);
      //console.log(result);
      if (result.affectedRows === 1) {
        if (record_id) {
          record.create_time = new Date();
        }
        res.json({
          msg: "新增VIP服務紀錄成功。",
          id: record_id ? record_id : result.insertId,
          act: record_id ? "edit" : "add",
          updatedField: {
            id: record_id ? record_id : result.insertId,
            ...record,
            admin_name: req.user.name
          }
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ msg: error });
    }
  }
);

module.exports = router;

const validateRequestIns = data => {
  //game_id, role_id, service_type, request_code, note, creat_time, admin_uid
  let errors = {};
  //console.log("validateAllocationUpdate", data);
  const { game_id, role_id, service_type, request_code, note } = data;

  if (!game_id || validator.isEmpty(game_id)) {
    errors.game_id = "沒有遊戲代碼。";
  }

  if (!role_id || validator.isEmpty(role_id.toString())) {
    errors.role_id = "沒有角色代碼";
  }

  if (!service_type || validator.isEmpty(service_type.toString())) {
    errors.service_type = "沒有服務類別";
  }
  if (!request_code || validator.isEmpty(request_code.toString())) {
    errors.request_code = "沒有快選項目";
  }

  if (note && !validator.isLength(note, { mix: 0, max: 500 })) {
    errors.note = "描述請在0~500字之間";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
