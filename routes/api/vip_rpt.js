const express = require("express");
const router = express.Router();
const checkPermission = require("../../middleware/checkPermission");
const VipOffersModel = require("../../models/VipOffersModel");
const DaddyModel = require("../../models/DaddyModel");
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
      const p_ages = DaddyModel.getGenderAgeGroupsData();
      const p_area = DaddyModel.getAreaData();
      Promise.all([p_past_month_data, p_prod, p_buyers, p_ages, p_area]).then(
        ([
          past_month_data,
          product_selling_data,
          top_buyers,
          gender_ages,
          area,
        ]) => {
          res.json({
            past_month_data,
            product_selling_data,
            top_buyers,
            gender_ages,
            area,
          });
        }
      );
    } catch (error) {
      return res.status(500).json({ msg: `發生錯誤:(${error})` });
    }
  }
);

module.exports = router;
