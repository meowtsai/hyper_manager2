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

module.exports = router;
