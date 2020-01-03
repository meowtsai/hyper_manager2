const { db1, db2 } = require("../config/db");

const BatchTasksModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `SELECT g.name as game_name,b.game_id,b.title,b.id,b.create_time,b.update_time,b.admin_uid,adm.name as admin_name,b.status,
       (select count(*) from batch_questions bq where bq.batch_id=b.id) as count
     from batch_tasks b
     LEFT JOIN games g on g.game_id=b.game_id
     LEFT JOIN admin_users adm on adm.uid=b.admin_uid
     order by id desc
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
  save: async task => {
    return await db1
      .promise()
      .query("insert into batch_tasks set ?", task)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (id, task) => {
    return await db1
      .promise()
      .query("Update batch_tasks set ? where id=?", [task, id])
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
    db1.query("DELETE FROM batch_questions WHERE batch_id=?", [id]);

    return await db1
      .promise()
      .query("DELETE FROM batch_tasks WHERE id=?", [id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },

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
      .query(
        `SELECT g.name as game_name,b.game_id,b.title,b.id,b.create_time,b.update_time,b.admin_uid,adm.name as admin_name,b.status,
      (select count(*) from batch_questions bq where bq.batch_id=b.id) as count
    from batch_tasks b
    LEFT JOIN games g on g.game_id=b.game_id
    LEFT JOIN admin_users adm on adm.uid=b.admin_uid
    where id=?`,
        [id]
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
  findBatchQuestionsById: async id => {
    return await db2
      .promise()
      .query(`SELECT question_id FROM batch_questions where batch_id=?`, [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  removeBatchQuestionsByBatchId: async id => {
    return await db1
      .promise()
      .query("DELETE FROM batch_questions WHERE batch_id=?", [id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  removeQuestionFromBatchByQId: async id => {
    return await db1
      .promise()
      .query(
        "DELETE FROM batch_questions WHERE question_id=? and batch_id in(select id from batch_tasks where status=1)",
        [id]
      )
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  checkQuestionsStatusValidity: async batch_id => {
    return await db2
      .promise()
      .query(
        `Select group_concat(id) as ids 
      from questions 
      where id in(SELECT question_id FROM batch_questions where batch_id=?) 
      
      and (status=4 or status=7 or id in(select question_id from question_allocation where allocate_status in('0','1','2')))`,
        [batch_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0].ids;
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  checkQuestionsBatchInfo: async question_id => {
    return await db2
      .promise()
      .query(
        `select adm.name as admin_name,b.admin_uid, a.batch_id,a.question_id
        from batch_questions a left join batch_tasks b on a.batch_id=b.id
        LEFT JOIN admin_users adm on adm.uid=b.admin_uid
        where a.question_id=? and b.status=1`,
        [question_id]
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
  addQuestionToBatch: async (question_id, batch_id) => {
    return await db1
      .promise()
      .query("insert into batch_questions set ?", { question_id, batch_id })
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  removeQuestionFromBatch: async question_id => {
    return await db1
      .promise()
      .query(
        "DELETE FROM batch_questions WHERE question_id=? and batch_id in(select id from batch_tasks where status=1)",
        [question_id]
      )
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  checkIfSameGame: async (ids, batch_id) => {
    return await db2
      .promise()
      .query(
        `select count(*) as wrong_cnt
        from questions a left join servers b
        on a.server_id = b.server_id
        left join games c
        on b.game_id = c.game_id
        where a.id in(${ids}) and b.game_id <>(select game_id from batch_tasks where id=?)`,
        [batch_id]
      )
      .then(([rows, fields]) => {
        console.log(" checkIfSameGame rows", rows);
        if (rows[0].wrong_cnt > 0) {
          return false;
        } else {
          return true;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  addBatchQuestionsToBatch: async (q_list, batch_id) => {
    // console.log("addBatchQuestionsToBatch q_list", q_list);
    // console.log("addBatchQuestionsToBatch batch_id", batch_id);
    let updateSql = "INSERT INTO batch_questions(question_id,batch_id) VALUES";
    for (let index = 0; index < q_list.length; index++) {
      if (index > 0) updateSql += ",";
      updateSql += `(${q_list[index]},${batch_id})`;
    }
    //console.log("updateSql", updateSql);
    return await db1
      .promise()
      .query(updateSql)
      .then(([rows, fields]) => {
        //  console.log("addBatchQuestionsToBatch rows", rows);
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

//檢查本單是否已經在批次中
module.exports = BatchTasksModel;
