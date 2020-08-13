const { db1, db2 } = require("../config/db");
//vip_whale_report_map
//vip_whales;
const DaddyModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from vip_whales order by email")
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return null;
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  findOne: async (id) => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from vip_whales where whale_id=?", [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  save: async (whale) => {
    return await db1
      .promise()
      .query("insert into vip_whales set ?", whale)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  findByIdAndUpdate: async (whale_id, whale) => {
    return await db1
      .promise()
      .query("Update vip_whales set ? where whale_id=?", [whale, whale_id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch((err) => ({ error: err.message }));
  },

  findAndRemove: async (main_whale_id, delete_whale_id) => {
    return await db1
      .promise()
      .query("Delete from vip_whales where whale_id=?", [delete_whale_id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          //$this->DB1->set("role", "")->where("role", $role)->update("admin_users");
          db1.query(
            "UPDATE vip_whale_report_map set whale_id=? where whale_id=?",
            [main_whale_id, delete_whale_id]
          );

          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch((err) => ({ error: err.message }));
  },
};

module.exports = DaddyModel;
