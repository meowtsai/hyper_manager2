const express = require('express');
const router = express.Router();
const PVModel = require('../../models/PVModel');
const GovLetterModel = require('../../models/GovLetterModel');
const CplCaseModel = require('../../models/CplCaseModel');
const image_path = require('../../config/default')['image_path'];
const SERVICE_CONFIG = require('../../config/service');
const image_upload_dir = require('../../config/default')['image_upload_dir'];
const moment = require('moment');
const path = require('path');
const checkPermission = require('../../middleware/checkPermission');
const validator = require('validator');
const helper = require('../../utils/helper');
//@route: GET /api/offline_cs/pv_list
//@desc: get list of personal visit data list
//@access: private
router.get(
  '/pv_list',

  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'read');
  },
  async (req, res) => {
    const pv_list = await PVModel.getAll();

    const return_list = pv_list.map(record => ({
      ...record,
      formated_visit_time: record.visit_time
        ? moment(record.visit_time)
            .local()
            .format('YYYY-MM-DD HH:mm:ss')
        : '',
      formated_status: record.status === '1' ? '1-處理中' : '4-已結案'
    }));

    res.json({ list: return_list, config_status: SERVICE_CONFIG.cpl_status });
  }
);

router.get(
  '/pv_list/detail/:record_id',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'read');
  },
  async (req, res) => {
    const record_id = req.params.record_id;
    const pv = await PVModel.findOne(record_id);
    if (pv) {
      res.json({ record: pv });
    } else {
      res.status(400).json({ msg: '沒有這個活動' });
    }
  }
);

//@route: POST /api/offline_cs/pv_list
//@desc: add a new pv event
//@access: private
router.post(
  '/pv_list',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
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
          msg: '編輯成功',
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
  '/gov_list',

  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'read');
  },
  async (req, res) => {
    const gov_list = await GovLetterModel.getAll();

    const return_list = gov_list.map(record => ({
      ...record,
      formated_gov_list: record.gov_list
        ? moment(record.gov_list)
            .local()
            .format('YYYY-MM-DD HH:mm:ss')
        : '',
      formated_status: record.status === '1' ? '1-處理中' : '4-已結案'
    }));

    res.json({ list: return_list, config_status: SERVICE_CONFIG.cpl_status });
  }
);

router.get(
  '/gov_list/detail/:record_id',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'read');
  },
  async (req, res) => {
    const record_id = req.params.record_id;
    const letter = await GovLetterModel.findOne(record_id);
    if (letter) {
      res.json({ record: letter });
    } else {
      res.status(400).json({ msg: '沒有這個公函' });
    }
  }
);

//@route: POST /api/offline_cs/gov_list
//@desc: add or edit a gove letter record
//@access: private
router.post(
  '/gov_list',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
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
            if (keyName === 'attachment01') {
              gov_record.file_path = image_path + new_file_name;
            }
            if (keyName === 'attachment02') {
              gov_record.file_path2 = image_path + new_file_name;
            }
            if (keyName === 'attachment03') {
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
          msg: '編輯成功',
          affectedId: gov_id ? gov_id : result.insertId
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    }
  }
);

router.get(
  '/cpl_case',

  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'read');
  },
  async (req, res) => {
    const list = await CplCaseModel.getAll();
    const refList = await CplCaseModel.getAllReferece();
    const attachList = await CplCaseModel.getAllAttachment();

    res.json({
      list: list.map(item => {
        const refs = refList.filter(ref => ref.case_id === item.id);
        const attachments = attachList.filter(ref => ref.case_id === item.id);
        return { ...item, refs, attachments };
      }),

      config_status: SERVICE_CONFIG.cpl_status
    });
  }
);

//@route: POST /api/offline_cs/cpl_case
//@desc: add a new cpl case
//@access: private
router.post(
  '/cpl_case',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
  },
  async (req, res) => {
    //console.log("pv_list post", req.body);
    //console.log(req.body);
    const errors = validateCplCaseInput(req.body);

    if (!errors.isValid) {
      //Bad request
      res.status(400).json(errors.errors);
    } else {
      const record = req.body;

      const case_id = record.id ? record.id : null;
      record.admin_uid = req.user.uid;
      delete record.id;

      const result = case_id
        ? await CplCaseModel.findByIdAndUpdate(case_id, record)
        : await CplCaseModel.save(record);
      //console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          msg: '編輯成功',
          affectedId: case_id ? case_id : result.insertId
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    }
  }
);

//@route: POST /api/offline_cs/cpl_case/reply
//@desc: add or modify a  cpl_replies
//@access: private
router.post(
  '/cpl_case/reply',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
  },
  async (req, res) => {
    //console.log("/cpl_case/reply post", req.body);
    const errors = validateReplyInput(req.body);

    if (!errors.isValid) {
      //Bad request
      res.status(400).json(errors.errors);
    } else {
      const record = req.body;

      const id = record.id ? record.id : null;
      record.admin_uid = req.user.uid;
      delete record.id;

      const result = id
        ? await CplCaseModel.findByIdAndUpdateReply(id, record)
        : await CplCaseModel.saveReply(record);
      //console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          act: id ? 'edit' : 'add',
          reply: {
            id: id ? id : result.insertId,
            ...record,
            admin_uname: req.user.name
          }
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    }
  }
);

//modify_mediation_json
//@route: POST /api/offline_cs/cpl_case/mediation
//@desc: add or modify a  cpl_case mediation
//@access: private
router.post(
  '/cpl_case/mediation',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
  },
  async (req, res) => {
    //console.log("/cpl_case/reply post", req.body);
    const errors = validateMediationInput(req.body);

    if (!errors.isValid) {
      //Bad request
      res.status(400).json(errors.errors);
    } else {
      const record = req.body;

      const id = record.id ? record.id : null;
      record.admin_uid = req.user.uid;
      delete record.id;

      const result = id
        ? await CplCaseModel.findByIdAndUpdateMediation(id, record)
        : await CplCaseModel.saveMediation(record);
      //console.log(result);
      if (result.affectedRows === 1) {
        res.json({
          act: id ? 'edit' : 'add',
          mediation: {
            id: id ? id : result.insertId,
            ...record,
            admin_uname: req.user.name
          }
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    }
  }
);

//@route: DELETE   /api/offline_cs/cpl_case/attachment/:id
//@desc: delete   attachment by id
//@access: private

router.delete(
  '/cpl_case/attachment/:id',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
  },
  async (req, res) => {
    const record_id = req.params.id;
    const delResult = await CplCaseModel.findAndRemoveAttachment(record_id);

    if (delResult.error) {
      return res.status(500).json({ msg: delResult.error });
    }

    if (delResult.affectedRows === 1) {
      res.json({
        msg: '紀錄已經刪除。',
        deleted_id: record_id
      });
    } else {
      res.status(500).json({ msg: '紀錄刪除失敗' });
    }
  }
);

//@route: DELETE   /api/offline_cs/cpl_case/:id
//@desc: delete  cpl+case by id
//@access: private

router.delete(
  '/cpl_case/reply/:id',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
  },
  async (req, res) => {
    const record_id = req.params.id;
    const delResult = await CplCaseModel.findAndRemoveReply(record_id);

    if (delResult.error) {
      return res.status(500).json({ msg: delResult.error });
    }

    if (delResult.affectedRows === 1) {
      res.json({
        msg: '紀錄已經刪除。',
        deleted_id: record_id
      });
    } else {
      res.status(500).json({ msg: '紀錄刪除失敗' });
    }
  }
);
//@route: DELETE   /api/offline_cs/cpl_case/:id
//@desc: delete  cpl+case by id
//@access: private
//url: `/api/offline_cs/cpl_case/mediation/${id}`
router.delete(
  '/cpl_case/mediation/:id',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
  },
  async (req, res) => {
    const record_id = req.params.id;
    const delResult = await CplCaseModel.findAndRemoveMediation(record_id);

    if (delResult.error) {
      return res.status(500).json({ msg: delResult.error });
    }

    if (delResult.affectedRows === 1) {
      res.json({
        msg: '紀錄已經刪除。',
        deleted_id: record_id
      });
    } else {
      res.status(500).json({ msg: '紀錄刪除失敗' });
    }
  }
);

//@route: DELETE   /api/offline_cs/cpl_case/:id
//@desc: delete  cpl+case by id
//@access: private

router.delete(
  '/cpl_case/:id',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
  },
  async (req, res) => {
    const record_id = req.params.id;
    const delResult = await CplCaseModel.findAndRemove(record_id);

    if (delResult.error) {
      return res.status(500).json({ msg: delResult.error });
    }

    if (delResult.affectedRows === 1) {
      res.json({
        msg: '紀錄已經刪除。',
        updatedField: record_id
      });
    } else {
      res.status(500).json({ msg: '紀錄刪除失敗' });
    }
  }
);
router.put(
  '/cpl_case/move_case/:record_id',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'read');
  },
  async (req, res) => {
    const record_id = req.params.record_id;
    const { status, close_date } = req.body;
    const updField = status === '4' ? { status, close_date } : { status };
    const result = await CplCaseModel.findByIdAndUpdate(record_id, updField);

    if (result.affectedRows === 1) {
      res.json({
        msg: '編輯成功',
        affectedId: record_id,
        updField
      });
    } else {
      res.status(500).json({ msg: `狀態修改失敗(${result.error})` });
    }
  }
);
router.get(
  '/cpl_case/detail/:record_id',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'read');
  },
  async (req, res) => {
    const record_id = req.params.record_id;
    const cpl_case = await CplCaseModel.findOne(record_id);
    const refList = await CplCaseModel.getRefereceByCaseId(record_id);
    const attachList = await CplCaseModel.getAttachmentByCaseId(record_id);
    const replies = await CplCaseModel.getRepliesByCaseId(record_id);
    const mediations = await CplCaseModel.getMediationsByCaseId(record_id);
    const ref_case_list = await CplCaseModel.getRefListByCaseId(record_id);

    if (cpl_case) {
      res.json({
        record: {
          ...cpl_case,
          refs: refList,
          attachments: attachList,
          ref_case_list,
          replies,
          mediations
        },
        config_status: SERVICE_CONFIG.cpl_status
      });
    } else {
      res.status(400).json({ msg: '沒有這個活動' });
    }
  }
);

router.post(
  '/cpl_case/ref',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'read');
  },
  async (req, res) => {
    const { case_id, ref_id } = req.body;
    let errors = {};
    if (!case_id || validator.isEmpty(case_id.toString())) {
      errors.o_case_id = 'case_id必須填寫。';
    }
    if (!ref_id || validator.isEmpty(ref_id.toString())) {
      errors.ref_id = 'ref_id必須填寫。';
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ msg: errors });
    }

    const result = await CplCaseModel.saveRef(case_id, ref_id);
    const refList = await CplCaseModel.getRefereceByCaseId(case_id);
    const ref_case_list = await CplCaseModel.getRefListByCaseId(case_id);

    if (result.affectedRows === 1) {
      res.json({
        refs: refList,
        ref_case_list
      });
    } else {
      res.status(500).json({ msg: `狀態修改失敗(${result.error})` });
    }
  }
);
router.post(
  '/cpl_case/ref/remove',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
  },
  async (req, res) => {
    const { case_id, ref_id } = req.body;
    let errors = {};
    if (!case_id || validator.isEmpty(case_id.toString())) {
      errors.o_case_id = 'case_id必須填寫。';
    }
    if (!ref_id || validator.isEmpty(ref_id.toString())) {
      errors.ref_id = 'ref_id必須填寫。';
    }
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ msg: errors });
    }

    const delResult = await CplCaseModel.findAndRemoveRef(case_id, ref_id);

    if (delResult.error) {
      return res.status(500).json({ msg: delResult.error });
    }

    if (delResult.affectedRows === 1) {
      res.json({
        msg: '紀錄已經刪除。',
        deleted_id: ref_id
      });
    } else {
      res.status(500).json({ msg: '紀錄刪除失敗' });
    }
  }
);

//add_attachment_json
router.post(
  '/cpl_case/attachment/add',
  function(req, res, next) {
    return checkPermission(req, res, next, 'cpl_case', 'modify');
  },
  async (req, res) => {
    const { case_id, attach_title } = req.body;
    let errors = {};
    if (!attach_title || validator.isEmpty(attach_title.toString())) {
      errors.attach_title = '附件名稱必須填寫。';
    }
    if (helper.isEmpty(req.files)) {
      errors.file01 = '沒有附件';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ msg: errors });
    }

    const data = { case_id, title: attach_title };

    let add_pics = [];
    //console.log("req.files", req.files);
    if (!helper.isEmpty(req.files)) {
      if (Object.keys(req.files).length > 0) {
        Object.keys(req.files).forEach((keyName, index) => {
          const new_file_name =
            helper.set_filename() +
            path.extname(req.files[keyName].name).toLowerCase();
          add_pics.push(image_path + new_file_name);

          req.files[keyName].mv(`${image_upload_dir}${new_file_name}`, err => {
            if (err) return res.status(500).send({ file01: err.message });
          });
          //console.log("keyName", keyName);
          if (keyName === 'attachment01') {
            data.pic_path = image_path + new_file_name;
          }
        });
      }
    }

    const result = await CplCaseModel.saveAttachment(data);

    if (result.error) {
      return res.status(500).json({ msg: result.error });
    }

    if (result.affectedRows === 1) {
      const attachList = await CplCaseModel.getAttachmentByCaseId(case_id);
      res.json({
        attachments: attachList
      });
    } else {
      res.status(500).json({ msg: `檔案上傳失敗(${result.error})` });
    }
  }
);

module.exports = router;

const validateMediationInput = data => {
  let errors = {};
  const {
    case_id,
    o_case_id,
    o_case_date,
    req_date,
    req_place,
    o_staff,
    o_contact
  } = data;

  if (!case_id || validator.isEmpty(case_id)) {
    errors.o_case_id = '發文字號必須填寫。';
  }
  if (!o_case_id || validator.isEmpty(o_case_id)) {
    errors.o_case_id = '發文字號必須填寫。';
  }

  if (!o_case_date || validator.isEmpty(o_case_date)) {
    errors.o_case_date = '發文日期必須填寫。';
  } else if (o_case_date && validator.toDate(o_case_date) === null) {
    errors.o_case_date = '發文日期格式不正確。';
  }
  if (!req_date || validator.isEmpty(req_date)) {
    errors.req_date = '出席時間必須填寫。';
  } else if (req_date && validator.toDate(req_date) === null) {
    errors.req_date = '出席時間格式不正確。';
  }

  if (!req_place || validator.isEmpty(req_place)) {
    errors.req_place = '出席地點必須填寫。';
  }
  if (!o_staff || validator.isEmpty(o_staff)) {
    errors.o_staff = '主持人必須填寫。';
  }
  if (!o_contact || validator.isEmpty(o_contact)) {
    errors.o_contact = '聯絡人必須填寫。';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
const validateReplyInput = data => {
  let errors = {};
  const { case_id, note, contact_time } = data;

  if (!case_id || validator.isEmpty(case_id)) {
    errors.o_case_id = '發文字號必須填寫。';
  }

  if (!contact_time || validator.isEmpty(contact_time)) {
    errors.contact_time = '聯繫日期必須填寫。';
  } else if (contact_time && validator.toDate(contact_time) === null) {
    errors.contact_time = '聯繫日期格式不正確。';
  }

  if (!note || validator.isEmpty(note)) {
    errors.note = '聯繫概要必須填寫。';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateCplCaseInput = data => {
  let errors = {};
  const {
    o_case_id,
    o_case_date,
    deadline,
    appellant,
    phone,
    reason,
    game_id,
    server_id,
    role_name
  } = data;

  if (!o_case_id || validator.isEmpty(o_case_id)) {
    errors.o_case_id = '發文字號必須填寫。';
  } else if (
    o_case_id &&
    !validator.isByteLength(o_case_id, { min: 2, max: 80 })
  ) {
    errors.o_case_id = '發文字號長度必須在2~80之間。';
  }

  if (!o_case_date || validator.isEmpty(o_case_date)) {
    errors.o_case_date = '發文日期必須填寫。';
  } else if (o_case_date && validator.toDate(o_case_date) === null) {
    errors.o_case_date = '發文日期格式不正確。';
  }
  if (!deadline || validator.isEmpty(deadline)) {
    errors.deadline = '回文期限必須填寫。';
  } else if (deadline && validator.toDate(deadline) === null) {
    errors.deadline = '回文期限日期格式不正確。';
  }

  if (!appellant || validator.isEmpty(appellant)) {
    errors.appellant = '申訴人必須填寫。';
  } else if (
    appellant &&
    !validator.isByteLength(appellant, { min: 2, max: 20 })
  ) {
    errors.appellant = '申訴人姓名長度必須在2~80之間。';
  }

  if (!reason || validator.isEmpty(reason)) {
    errors.reason = '申訴事由必須填寫。';
  } else if (!validator.isByteLength(reason, { min: 2, max: 100 })) {
    errors.reason = '申訴事由長度必須在2~100之間。';
  }

  if (!game_id) {
    errors.game_id = '請選擇遊戲';
  }
  if (!server_id) {
    errors.server_id = '請填寫伺服器';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
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
    errors.clientName = '來訪玩家姓名必須填寫。';
  } else if (
    client_name &&
    !validator.isByteLength(client_name, { min: 2, max: 20 })
  ) {
    errors.clientName = '玩家姓名長度必須在2~20之間。';
  }

  if (client_email && !validator.isEmail(client_email)) {
    errors.email = 'Email格式不正確。';
  }

  if (!cause || validator.isEmpty(cause)) {
    errors.cause = '來訪事由必須填寫。';
  } else if (!validator.isByteLength(cause, { min: 2, max: 100 })) {
    errors.cause = '來訪事由長度必須在2~100之間。';
  }

  if (!visit_time) {
    errors.visitTime = '請填寫來訪時間';
  }
  if (!client_phone) {
    errors.phone = '請填寫聯絡電話';
  }

  if (!admin_uid) {
    errors.caseMember = '請選擇處理人員';
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
    errors.note = '事由必須填寫。';
  }

  if (!o_letter_id) {
    errors.o_letter_id = '請填寫公函字號';
  }
  if (!o_letter_date) {
    errors.o_letter_date = '請填寫公函發文日期';
  }
  if (!contact) {
    errors.contact = '請填寫承辦人';
  }
  if (!game_id) {
    errors.gameId = '請選擇遊戲';
  }
  if (!server_id) {
    errors.serverId = '請選擇遊戲';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
