const express = require('express');
const router = express.Router();
const Admin_user = require('../../models/Admin_user');
const LogAdminActionsModel = require('../../models/LogAdminActionsModel');
const auth = require('../../middleware/auth');
const checkPermission = require('../../middleware/checkPermission');
const moment = require('moment');
//@route: GET /api/admin_users/getCSMaster
//@desc: get game list
//@access: private

router.get('/getCSMaster', auth, async (req, res) => {
  const cs_master_list = await Admin_user.findAllByRole('cs_master');
  res.json(cs_master_list);
});

//@route: GET /api/admin_users/getAdminUsersByRole/:role
//@desc: get admin users list by provided role
//@access: private

router.get('/getAdminUsersByRole/:role', auth, async (req, res) => {
  const role = req.params.role;
  const adminUsersList = await Admin_user.findAllByRole(role);
  res.json(adminUsersList);
});

router.get('/getUserTasks', auth, async (req, res) => {
  //console.log("req.user", req.user);
  const userTasks = await Admin_user.findTasksByUid(req.user.uid);
  res.json(userTasks);
});

router.get('/getUserLogs', auth, async (req, res) => {
  //console.log("req.user", req.user);
  const { date_begin, date_end } = req.query;
  const condition = { admin_uid: req.user.uid, date_begin, date_end };
  // const condition = {
  //   admin_uid: 112,
  //   date_begin: '2020-03-11',
  //   date_end: '2020-03-12'
  // };
  const userLogs = await LogAdminActionsModel.getListBySpecification(condition);
  res.json(userLogs);
});

router.post(
  '/log_action',
  function(req, res, next) {
    return checkPermission(req, res, next, 'service', 'read');
  },
  async (req, res) => {
    //console.log('log_action req.user', req.user);
    const { act, func, desc } = req.body;
    const log = {
      admin_uid: req.user.uid,
      ip: req.clientIp,
      action: act,
      function: func,
      desc: `${req.user.name} 在 ${moment().format(
        'YYYY-MM-DD HH:mm:ss'
      )} ${desc}`,
      create_time: new Date()
    };

    LogAdminActionsModel.save(log);

    res.json('log ok');
  }
);

module.exports = router;
