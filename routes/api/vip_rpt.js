const express = require("express");
const router = express.Router();
const checkPermission = require("../../middleware/checkPermission");
const VipOffersModel = require("../../models/VipOffersModel");
//@route: GET /api/vip_rpt/test
//@desc: get test res
//@access: public
router.get("/test", async (req, res) => {
  res.json({ msg: "test vip_rpt ok" });
});

//@route: GET /api/vip_rpt/home
//@desc: get dashboard data
//@access: private
router.get(
  "/home",
  (req, res, next) => checkPermission(req, res, next, "vip", "read"),
  async (req, res) => {
    try {
      const data = await VipOffersModel.get30daysData();
      if (data.error) {
        return res.status(500).json({ msg: `獲取資料失敗:(${data.error})` });
      }
      res.json({ past_month_data: data });
    } catch (error) {
      return res.status(500).json({ msg: `發生錯誤:(${error})` });
    }
  }
);

module.exports = router;
