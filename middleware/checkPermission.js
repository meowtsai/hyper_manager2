const jwt = require("jsonwebtoken");
const jwtSecret = require("../config/default")["jwtSecret"];
const Admin_user = require("../models/Admin_user");

module.exports = async function(req, res, next, resource, operation) {
  //get token
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "身分驗證失敗, 請登入" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);

    const user = await Admin_user.findByUid(decoded.user);
    req.user = user;
    const role = user.role;

    const is_permitted =
      role === "admin"
        ? true
        : await Admin_user.checkPermission(resource, operation, role);

    if (is_permitted) {
      //console.log("user.role", user.role);

      const chkAllGamePermission = await Admin_user.checkPermission(
        "all_game",
        "all",
        user.role
      );

      //console.log("chkAllGamePermission", chkAllGamePermission);

      const allow_games =
        user.role === "admin" || chkAllGamePermission
          ? "all_game"
          : await Admin_user.getAllowedGames(user.role);
      req.user.allow_games = allow_games;
      next();
    } else {
      return res.status(403).json({ msg: "你目前沒有瀏覽這個頁面的相關權限" });
    }
  } catch (err) {
    return res.status(401).json({ msg: "身分驗證失敗, 請登入" });
  }
};
