const { db1, db2 } = require("../config/db");

const RepliesModel = {
  getRepliesByQid: async q_ids => {
    //console.log("q_ids", q_ids);
    return await db2
      .promise()
      .query(
        `select qr.*, au.name
        from question_replies qr
        left join admin_users au on au.uid=qr.admin_uid
        where qr.question_id in(${q_ids})
      `
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
  getRepliesByQidSingle: async q_id => {
    //console.log("q_ids", q_ids);
    return await db2
      .promise()
      .query(
        `select qr.*, au.name as admin_uname
        from question_replies qr
        left join admin_users au on au.uid=qr.admin_uid
        where qr.question_id =? 
      `,
        [q_id]
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
      .query("select * from question_replies where id=?", [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  save: async reply => {
    return await db1
      .promise()
      .query("insert into question_replies set ?", reply)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (id, newRecord) => {
    return await db1
      .promise()
      .query("UPDATE question_replies SET ? WHERE id=?", [newRecord, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  checkDuplicate: async (id, post_content) => {
    //console.log("checkDuplicate", id);
    return await db2
      .promise()
      .query(
        "select count(*) as chk from question_replies where question_id=? and content=?",
        [id, post_content]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          //console.log("checkDuplicate rows", rows);
          return rows[0].chk > 0;
        } else {
          return false;
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = RepliesModel;
