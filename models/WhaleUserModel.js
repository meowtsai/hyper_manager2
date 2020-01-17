const { db1, db2 } = require("../config/db");

const WhaleUserModel = {
  getGameList: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select distinct a.site, g.name, g.is_active from whale_users a left join games g on a.site =g.game_id;"
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getVIPList: async game_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from whale_users where site =?", [game_id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },

  getRequestData: async game_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select *, au.name as admin_name from vip_requests vr left join admin_users au on au.uid=vr.admin_uid  where game_id =? order by create_time desc",
        [game_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getRequestDataByDateRangeGameId: async (game_id, begin_date, end_date) => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select vr.*, w.char_name,au.name as admin_name from vip_requests vr left join admin_users au on au.uid=vr.admin_uid left join whale_users w on w.char_in_game_id= vr.role_id  where game_id =? and vr.create_time between ? and ? order by create_time desc",
        [game_id, begin_date + " 00:00", end_date + " 23:59"]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findOne: async (game_id, uid) => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from whale_users where site=? and uid=?", [game_id, uid])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findUserByRoleId: async (game_id, role_id) => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select a.*, g.name as game_name, gi.name as server_name from whale_users a LEFT JOIN servers gi ON gi.server_id=a.server_name left join games g on a.site =g.game_id where a.site=? and a.char_in_game_id=? ",
        [game_id, role_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getRequestDataByRoleId: async (game_id, role_id) => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select vr.*, au.name as admin_name from vip_requests vr left join admin_users au on au.uid=vr.admin_uid  where game_id =? and role_id=? order by create_time desc",
        [game_id, role_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },
  saveServiceRequest: async record => {
    return await db2
      .promise()
      .query("insert into vip_requests set ?", record)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findServiceRequestByIdAndUpdate: async (id, record) => {
    return await db2
      .promise()
      .query("Update vip_requests set ? where id=?", [record, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  findServiceRequestAndRemove: async vr_id => {
    return await db2
      .promise()
      .query("Delete from vip_requests where id=?", [vr_id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByRoleIdAndUpdate: async (game_id, role_id, record) => {
    return await db2
      .promise()
      .query("Update whale_users set ? where site=? and char_in_game_id=?", [
        record,
        game_id,
        role_id
      ])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = WhaleUserModel;
