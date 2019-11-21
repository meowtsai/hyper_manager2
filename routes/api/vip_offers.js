const express = require("express");
const router = express.Router();
const VipOffersModel = require("../../models/VipOffersModel");
const checkPermission = require("../../middleware/checkPermission");
const validator = require("validator");
const auth = require("../../middleware/auth");

//@route: GET /api/vip_offers/test
//@desc: get test res
//@access: public
router.get("/test", async (req, res) => {
  res.json({ msg: "test vip_offers ok" });
});

//@route: GET /api/vip/offers_list
//@desc: get vip offers list
//@access: private
//if ($this->zacl->check_acl("vip", "read")) { read,modify,authorize,statistics
router.get(
  "/offer_list",
  function(req, res, next) {
    return checkPermission(req, res, next, "vip", "read");
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
  "/order_list",
  function(req, res, next) {
    return checkPermission(req, res, next, "vip", "read");
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
  "/detail/:report_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "vip", "modify");
  },
  async (req, res) => {
    const report_id = req.params.report_id;
    const g = await VipOffersModel.findOne(report_id);
    if (g) {
      res.json(g);
    } else {
      res.status(400).json({ msg: "沒有這個紀錄" });
    }
  }
);

router.get(
  "/prods_list/:game_id",
  function(req, res, next) {
    return checkPermission(req, res, next, "vip", "read");
  },
  async (req, res) => {
    const game_id = req.params.game_id;
    const g = await VipOffersModel.findProdsByGameId(game_id);
    if (g) {
      res.json(g);
    } else {
      res.status(400).json({ msg: "沒有這個紀錄" });
    }
  }
);

//url: "/api/vip_offers/wire_report/update",
router.put(
  "/wire_report/update",
  function(req, res, next) {
    return checkPermission(req, res, next, "vip", "modify");
  },
  async (req, res) => {
    console.log("req.body", req.body);
    const record = req.body;

    const report = await VipOffersModel.findOne(record.report_id);

    console.log("report", report);
    if (report.id) {
      record.admin_uid = req.user.uid;
      record.update_time = new Date();

      const updateMsg = await VipOffersModel.findByIdAndUpdate(
        report.id,
        record
      );
      if (!updateMsg.error) {
        if (updateMsg.affectedRows === 1) {
          res.json({
            msg: "資訊已更新。",
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
      return res.status(404).json({ msg: `沒有這個紀錄` });
    }
  }
);

module.exports = router;
