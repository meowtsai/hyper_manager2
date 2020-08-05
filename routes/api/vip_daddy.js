const express = require("express");
const router = express.Router();
const DaddyModel = require("../../models/DaddyModel");
const checkPermission = require("../../middleware/checkPermission");

//@route: GET /api/daddy/test
//@desc: get test res
//@access: public

router.get("/test", async (req, res) => {
  res.json({ msg: "test daddy ok" });
});

//get vip data
router.get(
  "/list",
  function (req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    //const game_id = req.params.game_id;
    const plist = DaddyModel.getAll();
    const preports = DaddyModel.findAllReports();

    Promise.all([plist, preports])
      .then(
        ([list, reports]) => {
          res.json({ list, reports });
        },
        (reason) => {
          //console.log(reason);
          res.json({ reason });
        }
      )
      .catch((err) => console.log("get vip data error: ", err));
  }
);

module.exports = router;
