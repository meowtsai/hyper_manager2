const express = require('express');
const router = express.Router();
const VipOffersModel = require('../../models/VipOffersModel');
const WhaleUserModel = require('../../models/WhaleUserModel');
const checkPermission = require('../../middleware/checkPermission');
const validator = require('validator');
const auth = require('../../middleware/auth');
const { isEmpty } = require('../../utils/helper');

//@route: GET /api/vip_offers/test
//@desc: get test res
//@access: public
router.get('/test', async (req, res) => {
  res.json({ msg: 'test vip_offers ok' });
});

//@route: GET /api/vip/offers_list
//@desc: get vip offers list
//@access: private
//if ($this->zacl->check_acl("vip", "read")) { read,modify,authorize,statistics
router.get(
  '/offer_list',
  function (req, res, next) {
    return checkPermission(req, res, next, 'vip', 'read');
  },
  async (req, res) => {
    try {
      const offer_list = await VipOffersModel.getOffersList();
      if (offer_list.error) {
        return res
          .status(500)
          .json({ msg: `獲取資料失敗:(${offer_list.error})` });
      }
      res.json(offer_list);
    } catch (error) {
      return res.status(500).json({ msg: `發生錯誤:(${error})` });
    }
  }
);

router.get(
  '/order_list',
  function (req, res, next) {
    return checkPermission(req, res, next, 'vip', 'read');
  },
  async (req, res) => {
    try {
      const order_list = await VipOffersModel.getOrderList();
      if (order_list.error) {
        return res
          .status(500)
          .json({ msg: `獲取資料失敗:(${order_list.error})` });
      }
      res.json(order_list);
    } catch (error) {
      return res.status(500).json({ msg: `發生錯誤:(${error})` });
    }
  }
);

router.get(
  '/detail/:report_id',
  function (req, res, next) {
    return checkPermission(req, res, next, 'vip', 'modify');
  },
  async (req, res) => {
    const report_id = req.params.report_id;
    const g = await VipOffersModel.findOne(report_id);
    if (g) {
      res.json(g);
    } else {
      res.status(400).json({ msg: '沒有這個紀錄' });
    }
  }
);

router.get(
  '/prods_list/:game_id',
  function (req, res, next) {
    return checkPermission(req, res, next, 'vip', 'read');
  },
  async (req, res) => {
    const game_id = req.params.game_id;
    const g = await VipOffersModel.findProdsByGameId(game_id);
    if (g) {
      res.json(g);
    } else {
      res.status(400).json({ msg: '沒有這個紀錄' });
    }
  }
);

//url: "/api/vip_offers/wire_report/update",
router.put(
  '/wire_report/update',
  function (req, res, next) {
    return checkPermission(req, res, next, 'vip', 'modify');
  },
  async (req, res) => {
    const record = req.body;
    const report = await VipOffersModel.findOne(record.report_id);
    if (report.id) {
      const validateResult = validateVipOrderUpdate(record);
      if (!validateResult.isValid) {
        return res.status(400).json(validateResult.errors);
      }

      record.admin_uid = req.user.uid;
      record.update_time = new Date();

      //try update vip_ranking
      if (report.vip_ranking === null) {
        //console.log("report.game_id", report.game_id, report.char_in_game_id);
        const vip = await WhaleUserModel.findUserByRoleId(
          report.game_id,
          record.role_id
        );

        //console.log("vip_ranking", vip.vip_ranking);
        if (vip) {
          record.vip_ranking =
            vip.vip_ranking === null ? 'NO_R' : vip.vip_ranking;
        } else {
          record.vip_ranking = null;
        }
      }

      const updateMsg = await VipOffersModel.findByIdAndUpdate(
        report.id,
        record
      );
      if (!updateMsg.error) {
        if (updateMsg.affectedRows === 1) {
          res.json({
            msg: '資訊已更新。',
            updatedField: { ...record },
          });
        } else {
          res.status(500).json({ msg: `用戶資訊更新失敗(${updateMsg.error})` });
        }
      } else {
        res.status(500).json({ msg: `更新失敗(${updateMsg.error})` });
      }
    } else {
      return res.status(404).json({ msg: `沒有這個紀錄` });
    }
  }
);

router.delete(
  '/delete_wire_report/:id',
  function (req, res, next) {
    return checkPermission(req, res, next, 'whale_users_statistics', 'read');
  },
  async (req, res) => {
    const report_id = req.params.id;
    const delResult = await VipOffersModel.findReportAndRemove(report_id);

    if (delResult.error) {
      return res.status(500).json({ msg: delResult.error });
    }

    if (delResult.affectedRows === 1) {
      res.json({
        msg: '紀錄已經刪除。',
        updatedField: report_id,
      });
    } else {
      res.status(500).json({ msg: '紀錄刪除失敗' });
    }
  }
);

module.exports = router;

const validateVipOrderUpdate = (data) => {
  let errors = {};

  data.report_status = !isEmpty(data.report_status) ? data.report_status : '';
  data.orderids = !isEmpty(data.orderids) ? data.orderids : '';

  if (data.report_status === '2' && validator.isEmpty(data.orderids)) {
    errors.orderids = '請輸入單號';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
