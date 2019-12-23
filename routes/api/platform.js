const express = require("express");
const router = express.Router();
const md5 = require("md5");
const validator = require("validator");
const pw_md5_key = require("../../config/default")["pw_md5_key"];
const Admin_user = require("../../models/Admin_user");
const AdminPresetMessageModel = require("../../models/AdminPresetMessageModel");
const auth = require("../../middleware/auth");

// @route  POST api/platform/modify_password
// @desc   modify passowrd
// @access Private
router.post("/modify_password", auth, async (req, res) => {
  //res.json({ msg: "modify_password works" });

  const errors = validatePassowrdInput(req.body);
  //console.log(error);
  if (!errors.isValid) {
    //Bad request
    return res.status(400).json(errors);
  }

  const { account, password } = req.body;
  let user = await Admin_user.findOne({ account });

  if (!user) {
    return res.status(401).json({ msg: "帳號不存在!" });
  }
  if (req.user.uid !== user.uid) {
    return res.status(401).json({ msg: "只能修改自己的帳號!" });
  }

  const updateResult = await Admin_user.findByUidAndUpdatePassword(user.uid, {
    password: md5(md5(password + pw_md5_key))
  });

  if (updateResult) {
    return res.json({ updateResult });
  } else {
    return res.status(400).json({ msg: "修改失敗!" });
  }
});

//@route: GET /api/platform/preset_messages/list
//@desc: get game list
//@access: private

router.get("/preset_messages/list", auth, async (req, res) => {
  const admin_uid = req.user.uid;
  //console.log("admin_uid", admin_uid);
  const list = await AdminPresetMessageModel.getAllByUid(admin_uid);
  if (!list.error) {
    res.json(list);
  } else {
    return res.status(500).json({ msg: list.error });
  }
});

//@route: POST /api/platform/preset_messages
//@desc:create a new preset message
//@access: private
router.post("/preset_messages", auth, async (req, res) => {
  const errors = validateMessageInput(req.body);
  if (!errors.isValid) {
    return res.status(400).json(errors.errors);
  }
  const { message } = req.body;
  const admin_uid = req.user.uid;
  const record = {
    admin_uid,
    rank: 1,
    message
  };
  const insResult = await AdminPresetMessageModel.save(record);
  res.json({
    msg: "新增自訂快速回覆成功。",
    affectedId: insResult.insertId,
    action: "add",
    updField: {
      ...record
    }
  });
});

//@route: PUT /api/platform/preset_messages
//@desc:edit an existing preset message
//@access: private
router.put("/preset_messages/:id", auth, async (req, res) => {
  const errors = validateMessageInput(req.body);
  if (!errors.isValid) {
    return res.status(400).json(errors.errors);
  }

  const id = req.params.id;
  const { message, rank } = req.body;
  const admin_uid = req.user.uid;

  const pm_record = await AdminPresetMessageModel.findOne(id);
  if (!pm_record) {
    return res.status(500).json({ msg: `沒有這筆紀錄(id:${id})` });
  }
  if (admin_uid !== pm_record.admin_uid) {
    return res.status(500).json({ msg: `這筆紀錄不屬於登入使用者(id:${id})` });
  }

  if (!pm_record.error) {
    const record = {
      rank,
      message
    };
    const result = await AdminPresetMessageModel.findByIdAndUpdate(id, record);
    if (result.affectedRows === 1) {
      res.json({
        msg: "編輯成功",
        affectedId: id,
        action: "update",
        updField: record
      });
    } else {
      res.status(500).json({ msg: `狀態修改失敗(${result.error})` });
    }
  } else {
    return res.status(500).json({ msg: pm_record.error });
  }
});

//@route: DELETE   /api/platform/preset_messages/:id
//@desc: delete  preset_messages by id
//@access: private

router.delete("/preset_messages/:id", auth, async (req, res) => {
  const id = req.params.id;
  const admin_uid = req.user.uid;

  const pm_record = await AdminPresetMessageModel.findOne(id);
  if (!pm_record) {
    return res.status(500).json({ msg: `沒有這筆紀錄(id:${id})` });
  }
  if (admin_uid !== pm_record.admin_uid) {
    return res.status(500).json({ msg: `這筆紀錄不屬於登入使用者(id:${id})` });
  }

  const delResult = await AdminPresetMessageModel.findAndRemove(id);

  if (delResult.error) {
    return res.status(500).json({ msg: delResult.error });
  }

  if (delResult.affectedRows === 1) {
    res.json({
      msg: "紀錄已經刪除。",
      deleted_id: id
    });
  } else {
    res.status(500).json({ msg: "紀錄刪除失敗" });
  }
});

module.exports = router;

const validatePassowrdInput = data => {
  let errors = {};
  const { account, password } = data;
  if (!account || validator.isEmpty(account)) {
    errors.account = "沒有帳號。";
  }
  if (
    !password ||
    !validator.isByteLength(password, { min: 6, max: undefined })
  ) {
    errors.password = "密碼長度至少6碼。";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};

const validateMessageInput = data => {
  let errors = {};
  const { message } = data;

  if (!message || !validator.isByteLength(message, { min: 5, max: 100 })) {
    errors.message = "訊息內容長度5~100字之間。";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
