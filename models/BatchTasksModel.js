const { db1, db2 } = require("../config/db");

const BatchTasksModel = {
  getActiveTasks: async admin_uid => {
    //console.log("q_ids", q_ids);
    return await db2
      .promise()
      .query(
        `SELECT g.name as game_name,b.game_id,b.title,b.id,b.create_time,b.update_time,b.admin_uid,adm.name as admin_name
		from batch_tasks b
		LEFT JOIN games g on g.game_id=b.game_id
		LEFT JOIN admin_users adm on adm.uid=b.admin_uid
		where b.admin_uid=? and b.status=1
		order by status,id desc
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
      .query("select * from questions where id=?", [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = BatchTasksModel;
