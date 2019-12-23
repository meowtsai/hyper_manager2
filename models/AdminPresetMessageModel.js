const { db1, db2 } = require("../config/db");

const AdminPresetMessageModel = {
  getAllByUid: async admin_uid => {
    return await db2
      .promise()
      .query(
        `select  ap.* , au.name as admin_name 
        from  admin_preset_messages ap
      left join admin_users au on au.uid=ap.admin_uid
      where admin_uid=?
      `,
        [admin_uid]
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
  findOne: async id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from admin_preset_messages where id=?", [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  save: async record => {
    return await db1
      .promise()
      .query("insert into admin_preset_messages set ?", record)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (id, record) => {
    return await db1
      .promise()
      .query("Update admin_preset_messages set ? where id=?", [record, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  findAndRemove: async id => {
    return await db1
      .promise()
      .query("Delete from admin_preset_messages where id=?", [id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗, 沒有這筆紀錄" };
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = AdminPresetMessageModel;
