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
      const days = req.query.value ? req.query.value : 0;
      const p_past_month_data = VipOffersModel.get30daysData();
      const p_prod = VipOffersModel.getProductsSelling(days);
      const p_buyers = VipOffersModel.getTopBuyers(days);

      Promise.all([p_past_month_data, p_prod, p_buyers]).then(
        ([past_month_data, product_selling_data, top_buyers]) => {
          res.json({ past_month_data, product_selling_data, top_buyers });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: `發生錯誤:(${error})` });
    }
  }
);

module.exports = router;
