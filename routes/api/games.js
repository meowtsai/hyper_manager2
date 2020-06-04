const express = require('express');
const router = express.Router();
const GamesModel = require('../../models/GamesModel');
const Admin_user = require('../../models/Admin_user');
const moment = require('moment');
const auth = require('../../middleware/auth');
const checkPermission = require('../../middleware/checkPermission');
const validator = require('validator');
const helper = require('../../utils/helper');
const image_path = require('../../config/default')['image_path'];
const image_upload_dir = require('../../config/default')['image_upload_dir'];
const path = require('path');
//@route: GET /api/games/list
//@desc: get game list
//@access: private

router.get(
  '/list',
  function (req, res, next) {
    return checkPermission(req, res, next, 'game_setting', 'modify');
  },
  async (req, res) => {
    const games_list = await GamesModel.getAll();
    res.json(games_list);
  }
);

//create a new game $this->zacl->check("game_setting", "modify");
router.post(
  '/',
  function (req, res, next) {
    return checkPermission(req, res, next, 'game_setting', 'modify');
  },
  async (req, res) => {
    //console.log("game post", req.body);
    const errors = validateGameInput(req.body);

    if (!errors.isValid) {
      //Bad request
      res.status(400).json(errors.errors);
    } else {
      const game_record = req.body;

      const game_id = game_record.editGameId ? game_record.editGameId : null;
      delete game_record.editGameId;
      delete game_record.logo_path;
      delete game_record.title_path;
      delete game_record.bg_path;

      //check if letter id duplicate while inserting
      if (!game_id) {
        const checkDub = await GamesModel.findOne(game_record.game_id);
        if (checkDub !== null) {
          return res.status(500).json({
            msg: `新增失敗,遊戲ID [${game_record.game_id}]已經存在了喔!`,
          });
        }
      }

      //$this->load->library('upload', array("upload_path"=>realpath("p/upload/pictures"), "allowed_types"=>"gif|jpg|jpeg|png", 'encrypt_name'=>TRUE));
      //$bg_path = str_replace("https://manager.longeplay.com.tw", "https://game.longeplay.com.tw", $bg_path);
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
              `${image_upload_dir}pictures/${new_file_name}`,
              (err) => {
                if (err)
                  return res.status(500).send({ file_logo: err.message });
              }
            );
            //console.log("keyName", keyName);
            if (keyName === 'file_logo') {
              game_record.logo_path = (
                image_path +
                'pictures/' +
                new_file_name
              ).replace('manager', 'game');
            }
            if (keyName === 'file_title') {
              game_record.title_path = (
                image_path +
                'pictures/' +
                new_file_name
              ).replace('manager', 'game');
            }
            if (keyName === 'file_bg') {
              game_record.bg_path = (
                image_path +
                'pictures/' +
                new_file_name
              ).replace('manager', 'game');
            }
          });
        }
      }

      const result = game_id
        ? await GamesModel.findByIdAndUpdate(game_id, game_record)
        : await GamesModel.save(game_record);

      if (result.affectedRows === 1) {
        res.json({
          msg: '新增成功',
          newRecord: game_record,
        });
      } else {
        res.status(500).json({ msg: `新增失敗(${result.error})` });
      }
    }
  }
);

router.get(
  '/detail/:game_id',
  function (req, res, next) {
    return checkPermission(req, res, next, 'game_setting', 'modify');
  },
  async (req, res) => {
    const game_id = req.params.game_id;
    const g = await GamesModel.findOne(game_id);
    if (g) {
      res.json(g);
    } else {
      res.status(400).json({ msg: '沒有這個遊戲' });
    }
  }
);
module.exports = router;

const validateGameInput = (data) => {
  //id, name, status
  let errors = {};
  const { game_id, name, fanpage, site } = data;

  if (!name || validator.isEmpty(name)) {
    errors.game_name = '遊戲名稱必須填寫。';
  } else if (name && !validator.isByteLength(name, { min: 2, max: 50 })) {
    errors.game_name = '遊戲名稱長度必須在2~40之間。';
  }

  if (!game_id || validator.isEmpty(game_id)) {
    errors.game_id = 'Game Id 必須填寫。';
  } else if (game_id && !validator.isAscii(game_id)) {
    errors.game_id = 'Game Id 格式不正確，只能用字母和數字。';
  }

  if (fanpage && !validator.isURL(fanpage)) {
    errors.fanpage = '粉絲團網址格式不正確，必須是網址。';
  }
  if (site && !validator.isURL(site)) {
    errors.site = '遊戲官網格式不正確，必須是網址。';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
