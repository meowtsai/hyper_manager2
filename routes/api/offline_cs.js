const express = require("express");
const router = express.Router();
const PVModel = require("../../models/PVModel");
const GovLetterModel = require("../../models/GovLetterModel");
const image_path = require("../../config/default")["image_path"];
const image_upload_dir = require("../../config/default")["image_upload_dir"];
const moment = require("moment");
const path = require("path");
const checkPermission = require("../../middleware/checkPermission");
const validator = require("validator");
const helper = require("../../utils/helper");
//@route: GET /api/offline_cs/pv_list
//@desc: get list of personal visit data list
//@access: private
router.get(
  "/pv_list",

  function(req, res, next) {
    return checkPermission(req, res, next, "cpl_case", "read");
  },
  async (req, res) => {
    const pv_list = await PVModel.getAll();

    const return_list = pv_list.map(record => ({
      ...record,
      formated_visit_time: record.visit_time
        ? moment(record.visit_time)
            .local()
            .format("YYYY-MM-DD HH:mm:ss")
        : "",
      formated_status: record.status === "1" ? "1-處理中" : "4-已結案"
    }));

    res.json(return_list);
  }
);

router.get(
  "/pv_list/detail/:record_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "cpl_case", "read");
  },
  async (req, res) => {
    const record_id = req.params.record_id;
    const pv = await PVModel.findOne(record_id);
    if (pv) {
      res.json(pv);
    } else {
      res.status(400).json({ msg: "沒有這個活動" });
    }
  }
);

//@route: POST /api/offline_cs/pv_list
//@desc: add a new pv event
//@access: private
router.post(
  "/pv_list",
  function(req, res, next) {
    return checkPermission(req, res, next, "cpl_case", "modify");
  },
  async (req, res) => {
    //console.log("pv_list post", req.body);
    const errors = validatePVInput(req.body);

    if (!errors.isValid) {
      //Bad request
      res.status(400).json(errors.errors);
    } else {
      const pv_record = req.body;

      const pv_id = pv_record.id ? pv_record.id : null;
      delete pv_record.id;

      const result = pv_id
        ? await PVModel.findByIdAndUpdate(pv_id, pv_record)
        : await PVModel.save(pv_record);
      //console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          msg: "編輯成功",
          affectedId: pv_id ? pv_id : result.insertId
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    }
  }
);

//@route: GET /api/offline_cs/gov_list
//@desc: get list of gov leter data list
//@access: private
router.get(
  "/gov_list",

  function(req, res, next) {
    return checkPermission(req, res, next, "cpl_case", "read");
  },
  async (req, res) => {
    const gov_list = await GovLetterModel.getAll();

    const return_list = gov_list.map(record => ({
      ...record,
      formated_gov_list: record.gov_list
        ? moment(record.gov_list)
            .local()
            .format("YYYY-MM-DD HH:mm:ss")
        : "",
      formated_status: record.status === "1" ? "1-處理中" : "4-已結案"
    }));

    res.json(return_list);
  }
);

router.get(
  "/gov_list/detail/:record_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "cpl_case", "read");
  },
  async (req, res) => {
    const record_id = req.params.record_id;
    const letter = await GovLetterModel.findOne(record_id);
    if (letter) {
      res.json(letter);
    } else {
      res.status(400).json({ msg: "沒有這個公函" });
    }
  }
);

//@route: POST /api/offline_cs/gov_list
//@desc: add or edit a gove letter record
//@access: private
router.post(
  "/gov_list",
  function(req, res, next) {
    return checkPermission(req, res, next, "cpl_case", "modify");
  },
  async (req, res) => {
    //console.log("gov_list post", req.body);
    const errors = validateGovInput(req.body);

    if (!errors.isValid) {
      //Bad request
      res.status(400).json(errors.errors);
    } else {
      const gov_record = req.body;
      gov_record.admin_uid = req.user.uid;
      const gov_id = gov_record.id ? gov_record.id : null;
      delete gov_record.id;
      delete gov_record.attachment01;
      delete gov_record.attachment02;
      delete gov_record.attachment03;
      gov_record.note = helper.nl2br(gov_record.note);
      //check if letter id duplicate while inserting
      if (!gov_id) {
        const checkDub = await GovLetterModel.findOneByLetterId(
          gov_record.o_letter_id
        );
        if (checkDub !== null) {
          res.status(500).json({
            msg: `新增失敗, 發文字號[${gov_record.o_letter_id}]已經存在了喔!`
          });
        }
      }

      let add_pics = [];
      //console.log("req.files", req.files);
      if (!helper.isEmpty(req.files)) {
        if (Object.keys(req.files).length > 0) {
          Object.keys(req.files).forEach((keyName, index) => {
            const new_file_name =
              helper.set_filename() +
              path.extname(req.files[keyName].name).toLowerCase();
            add_pics.push(image_path + new_file_name);

            req.files[keyName].mv(
              `${image_upload_dir}${new_file_name}`,
              err => {
                if (err) return res.status(500).send({ file01: err.message });
              }
            );
            //console.log("keyName", keyName);
            if (keyName === "attachment01") {
              gov_record.file_path = image_path + new_file_name;
            }
            if (keyName === "attachment02") {
              gov_record.file_path2 = image_path + new_file_name;
            }
            if (keyName === "attachment03") {
              gov_record.file_path3 = image_path + new_file_name;
            }
          });
        }
      }

      const result = gov_id
        ? await GovLetterModel.findByIdAndUpdate(gov_id, gov_record)
        : await GovLetterModel.save(gov_record);
      //console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          msg: "編輯成功",
          affectedId: gov_id ? gov_id : result.insertId
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    }
  }
);
module.exports = router;

const validatePVInput = data => {
  //姓名, 原因, 日期,  處理人
  let errors = {};
  const {
    client_name,
    visit_time,
    cause,
    admin_uid,
    client_email,
    client_phone
  } = data;

  if (!client_name || validator.isEmpty(client_name)) {
    errors.clientName = "來訪玩家姓名必須填寫。";
  } else if (
    client_name &&
    !validator.isByteLength(client_name, { min: 2, max: 20 })
  ) {
    errors.clientName = "玩家姓名長度必須在2~20之間。";
  }

  if (client_email && !validator.isEmail(client_email)) {
    errors.email = "Email格式不正確。";
  }

  if (!cause || validator.isEmpty(cause)) {
    errors.cause = "來訪事由必須填寫。";
  } else if (!validator.isByteLength(cause, { min: 2, max: 100 })) {
    errors.cause = "來訪事由長度必須在2~100之間。";
  }

  if (!visit_time) {
    errors.visitTime = "請填寫來訪時間";
  }
  if (!client_phone) {
    errors.phone = "請填寫聯絡電話";
  }

  if (!admin_uid) {
    errors.caseMember = "請選擇處理人員";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateGovInput = data => {
  //姓名, 原因, 日期,  處理人
  let errors = {};
  const {
    o_letter_id,
    contact,
    note,
    o_letter_date,
    game_id,
    server_id
  } = data;

  if (!note || validator.isEmpty(note)) {
    errors.note = "事由必須填寫。";
  }

  if (!o_letter_id) {
    errors.o_letter_id = "請填寫公函字號";
  }
  if (!o_letter_date) {
    errors.o_letter_date = "請填寫公函發文日期";
  }
  if (!contact) {
    errors.contact = "請填寫承辦人";
  }
  if (!game_id) {
    errors.gameId = "請選擇遊戲";
  }
  if (!server_id) {
    errors.serverId = "請選擇遊戲";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
