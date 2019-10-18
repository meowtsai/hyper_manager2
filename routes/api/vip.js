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
//@desc: add service request by id
//@access: private

router.post(
  "/request",
  function(req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    const insRecord = req.body;
    const validateResult = validateRequestIns(insRecord);
    if (!validateResult.isValid) {
      return res.status(400).json({ msg: "請選擇服務項目" });
    }

    try {
      const insResult = await WhaleUserModel.saveServiceRequest({
        ...insRecord,
        admin_uid: req.user.uid
      });
      if (!insResult.error) {
        res.json({
          msg: "新增VIP服務紀錄成功。",
          id: insResult.insertId,
          updatedField: {
            ...insRecord,
            create_time: new Date(),
            admin_uname: req.user.name
          }
        });
      } else {
        return res.status(500).json({ msg: insResult.error });
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

  if (note && !validator.isLength(note, { mix: 0, max: 250 })) {
    errors.note = "描述請在0~250字之間";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
