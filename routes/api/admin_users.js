const express = require("express");
const router = express.Router();
const Admin_user = require("../../models/Admin_user");

const auth = require("../../middleware/auth");

//@route: GET /api/admin_users/getCSMaster
//@desc: get game list
//@access: private

router.get("/getCSMaster", auth, async (req, res) => {
  const cs_master_list = await Admin_user.findAllByRole("cs_master");
  res.json(cs_master_list);
});

//@route: GET /api/admin_users/getAdminUsersByRole/:role
//@desc: get admin users list by provided role
//@access: private

router.get("/getAdminUsersByRole/:role", auth, async (req, res) => {
  const role = req.params.role;
  const adminUsersList = await Admin_user.findAllByRole(role);
  res.json(adminUsersList);
});

router.get("/getUserTasks", auth, async (req, res) => {
  //console.log("req.user", req.user);
  const userTasks = await Admin_user.findTasksByUid(req.user.uid);
  res.json(userTasks);
});

module.exports = router;
