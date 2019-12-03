const { db1, db2 } = require("../config/db");

const AllocationModel = {
  getRecords: async () => {
    return await db2
      .promise()
      .query(
        `select qa.id, qa.create_time as allocation_time, q.create_time as question_ctime, qa.question_id,  q.server_id, s.name as server_name,g.name as game_name,
        q.character_name,q.partner_uid, q.type, q.phone, q.email, q.content, qa.allocate_cause, qa.allocate_status, qa.assignor, au.name as assignor_name,  qa.assignee, aus.name as assignee_name,(SELECT allocate_note FROM question_allocation_records a
          where a.allocation_id =qa.id
          ORDER BY id DESC LIMIT 1) as lastestNote
        from question_allocation qa left join questions q on qa.question_id =q.id
        left join servers s on s.server_id = q.server_id
        left join games g on g.game_id =s.game_id
        left join admin_users au on au.uid = qa.assignor
        left join admin_users aus on aus.uid = qa.assignee
        order by allocation_time desc
                
      `,
        []
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
  getRecordsByQid: async q_ids => {
    //console.log("q_ids", q_ids);
    return await db2
      .promise()
      .query(
        `select qr.question_id, qr.allocate_status, au.name as assignee_name
        from question_allocation qr
        left join admin_users au on au.uid=qr.assignee
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
  getRecordsByQidSingle: async q_id => {
    //console.log("q_ids", q_ids);
    return await db2
      .promise()
      .query(
        `select qr.*, au.name as admin_uname, aus.name as assignee_name
        from question_allocation qr
        left join admin_users au on au.uid=qr.assignor
        left join admin_users aus on aus.uid=qr.assignee
        where qr.question_id =? 
      `,
        [q_id]
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
  findOne: async id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from question_allocation where id=?", [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getToByAssignTasks: async () => {
    return await db1
      .promise()
      .query(
        "select question_allocation.id as allocation_id from question_allocation  join questions q on question_id=q.id where question_allocation.allocate_status=0 ORDER BY FIELD(q.type,'1','2') desc, question_allocation.priority DESC, question_allocation.ID ASC limit 3"
      )
      .then(([rows, fields]) => {
        return rows;
      })
      .catch(err => ({ error: err.message }));
  },
  assign: async assignee => {
    return await db1
      .promise()
      .query(
        "UPDATE question_allocation SET assignee=?,allocate_status=1 WHERE allocate_status=0 ORDER BY priority DESC, ID ASC limit 3",
        [assignee]
      )
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findCurrentTasks: async assignee => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select question_id, allocate_status from question_allocation where assignee=?",
        [assignee]
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
  findAssigneeLogsForThePastOneHour: async assignee => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select count(*) as chk from question_allocation_records where admin_uid=113 and allocate_status='1' and create_time > ADDTIME(Now(), '-2:00:00') and allocation_id in(select id from question_allocation where assignee=?);",
        [assignee]
      )
      .then(([rows, fields]) => {
        return rows[0].chk;
        // if (rows[0].chk >= 3) {
        //   return false;
        // } else {
        //   return true;
        // }
      })
      .catch(err => ({ error: err.message }));
  },
  findHandledLogsForThePastOneHour: async assignee => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select count(*) as chk from question_allocation_records where admin_uid=? and allocate_status in(2,3,4) and create_time > ADDTIME(Now(), '-1:00:00');",
        [assignee]
      )
      .then(([rows, fields]) => {
        return rows[0].chk;
      })
      .catch(err => ({ error: err.message }));
  },
  save: async record => {
    return await db1
      .promise()
      .query("insert into question_allocation set ?", record)
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
      .query("UPDATE question_allocation SET ? WHERE id=?", [newRecord, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getLogsByAllocationId: async allocation_id => {
    //console.log("q_ids", q_ids);
    return await db2
      .promise()
      .query(
        `select qr.*, au.name as admin_uname, au.role
        from question_allocation_records qr
        left join admin_users au on au.uid=qr.admin_uid
        where qr.allocation_id =? 
      `,
        [allocation_id]
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
  getLogsByUid: async uid => {
    //console.log("q_ids", q_ids);
    return await db2
      .promise()
      .query(
        `select distinct allocate_note from (select allocate_note from question_allocation_records where admin_uid=? and (allocate_status in(2,3,4))  and length(allocate_note)<50 order by id desc limit 20 ) a
      `,
        [uid]
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
  saveLog: async newRecord => {
    return await db1
      .promise()
      .query("insert into question_allocation_records set ?", newRecord)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getAllocateOverview: async () => {
    return await db2
      .promise()
      .query(
        `select qa.allocate_status, aus.name as assignee_name, count(*) as cnt
        from question_allocation qa
        left join admin_users au on au.uid = qa.assignor
        left join admin_users aus on aus.uid = qa.assignee
        group by  allocate_status,assignee_name`
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = AllocationModel;
