const { db1, db2 } = require("../config/db");
const { isEmpty } = require("../utils/helper");
const QuestionsModel = {
  getAll: async (allow_games, uid, condition) => {
    const {
      status,
      gameId,
      beginTime,
      endTime,
      type,
      email,
      phone,
      partner_uid,
      character_name,
      check_id,
      content,
      id
    } = condition;

    //console.log("getAll condition", condition);
    //console.log("QuestionsModel getall", uid, status);
    //gameId,
    //beginTime,
    //endTime
    let limitedStatusCondition = "";
    let limitRowCount = 15000;
    if (status) {
      limitedStatusCondition = `q.status=${status}`;
      if (status.toString() === "4") {
        limitedStatusCondition += " or q.status='7' ";

        if (Object.keys(condition).length === 1) {
          limitRowCount = 1000;
        }
      }
      limitedStatusCondition = `(${limitedStatusCondition})`;
    }
    let limitedCondition = "";
    if (gameId) {
      if (limitedStatusCondition !== "") {
        limitedCondition += " and ";
      }
      limitedCondition = `g.game_id='${gameId}'`;
    }

    if (beginTime && endTime) {
      if (limitedStatusCondition !== "" || limitedCondition !== "") {
        limitedCondition += " and ";
      }
      limitedCondition += `q.create_time between '${beginTime}' and '${endTime}'`;
    }

    if (content) {
      if (limitedStatusCondition !== "" || limitedCondition !== "") {
        limitedCondition += " and ";
      }
      limitedCondition += `q.content like '%${content}%'`;
    }

    Object.keys({
      type,
      email,
      phone,
      partner_uid,
      character_name,
      check_id,
      id
    }).forEach(itemKey => {
      if (condition[itemKey]) {
        if (limitedStatusCondition !== "" || limitedCondition !== "") {
          limitedCondition += " and ";
        }
        limitedCondition += `q.${itemKey} ='${condition[itemKey]}'`;
      }
    });

    //console.log("QuestionsModel getAll", allow_games);

    const where_allow_games =
      allow_games === "all_game"
        ? ""
        : " and g.game_id in('" + allow_games.split(",").join("','") + "')";

    //console.log("limitedCondition", limitedCondition);
    // console.log("where_allow_games", where_allow_games);
    return await db2
      .promise()
      .query(
        `  select q.*, g.game_id, g.name as game_name, au.name as admin_uname, gi.name as server_name,
        (select count(*) from question_favorites where question_id=q.id and category=1 and admin_uid=?) as is_favorite,
        (select count(*) from batch_questions where question_id=q.id and batch_id in(select id from batch_tasks where status=1)) as is_batch
        from questions q  
        left join servers gi on gi.server_id=q.server_id
        left join games g on g.game_id=gi.game_id
        left join admin_users au on au.uid=q.admin_uid
        where  ${limitedStatusCondition}  ${limitedCondition} ${where_allow_games}  order by id desc limit ${limitRowCount}
      `,
        [uid]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          //console.log("QuestionsModel getall", rows.length);
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getAllocateList: async (adminUid = 0, allocateStatus = 1) => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `select  q.* ,  g.name as game_name , b.name as server_name,au.name as allocate_admin_name from  questions q
      left join servers b on q.server_id =b.server_id
      left join games g on b.game_id = g.game_id
      left join admin_users au on au.uid=q.allocate_admin_uid
      where allocate_admin_uid=? and allocate_status=?
      `,
        [adminUid, allocateStatus]
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
        `select *,g.name as game_name, g.game_id as game_id from questions q
      LEFT JOIN servers gi ON gi.server_id=q.server_id
      LEFT JOIN games g ON g.game_id=gi.game_id
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
  findOneComplete: async (qid, admin_uid) => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `SELECT q.*, g.name as game_name, g.game_id as game_id, gi.name as server_name, au.name allocate_user_name, c.in_game_id, c.name as in_game_name, aux.name close_admin_name, (select count(*) from question_favorites where question_id=? and admin_uid=?) as is_favorite
      FROM (questions q)
      LEFT JOIN servers gi ON gi.server_id=q.server_id
      LEFT JOIN games g ON g.game_id=gi.game_id
      LEFT JOIN admin_users au ON au.uid=q.allocate_admin_uid
      LEFT JOIN admin_users aux ON aux.uid=q.close_admin_uid
      LEFT JOIN characters c ON c.partner_uid=q.partner_uid and c.server_id=q.server_id and c.name=q.character_name
      WHERE q.id = ?   `,
        [qid, admin_uid, qid]
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
  findByIdAndUpdate: async (id, newRecord) => {
    //console.log("questions findByIdAndUpdate", id, newRecord);
    return await db1
      .promise()
      .query("UPDATE questions SET ? WHERE id=?", [newRecord, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getTestData: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `  select q.*
        from questions q  
        order by id desc
        limit 10
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
  getOverviewData: async (allow_games, type) => {
    const where_allow_games =
      allow_games === "all_game"
        ? ""
        : " and s.game_id in('" + allow_games.split(",").join("','") + "')";
    //console.log("where_allow_games", where_allow_games);
    //and s.game_id in('G103','g66naxx2tw','g78naxx2hmt','g83tw','g83twpc','G93','h35naxx1hmt','h38na','H54','h55naxx2tw','L20na','LRE')

    return await db2
      .promise()
      .query(
        `  
        select count(*) as total,
SUM(case when status='0' then 1 else 0 end) as 'status_hidden', 
SUM(case when status='1' then 1 else 0 end) as 'status_new', 
SUM(case when status='2' then 1 else 0 end) as 'status_process', 
SUM(case when status='4' then 1 else 0 end) as 'status_done', 
SUM(case when status='7' then 1 else 0 end) as 'status_tobeclosed'
 from questions q where 1=1  ${
   type.toString() === "1" ? "and q.create_time>=CURDATE()" : ""
 } ${where_allow_games}
      `
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },

  getAllocateOverview: async allow_games => {
    const where_allow_games =
      allow_games === "all_game"
        ? ""
        : " and s.game_id in('" + allow_games.split(",").join("','") + "')";

    return await db2
      .promise()
      .query(
        `select q.allocate_status, au.uid, au.name,au.role, count(*) cnt from questions q
        left join servers s on s.server_id=q.server_id
        left join admin_users au on au.uid = q.allocate_admin_uid
        where allocate_status in ('1','2') ${where_allow_games} group by allocate_status, uid order by au.role desc,au.uid`
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
  checkBatchInfo: async question_id => {
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
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getPicPlus: async question_id => {
    return await db2
      .promise()
      .query(
        `SELECT *
        FROM question_pictures
        WHERE question_id=  ?
        ORDER BY id asc `,
        [question_id]
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
  getStatisticsQrCount: async (yyyymm, role) => {
    return await db2
      .promise()
      .query(
        `select g.game_id, g.name as game_name, au.name as admin_name, DATE_FORMAT(qr.create_time, '%Y-%m-%d') as '時間',
        SUM(case when type='t' then 1 else 0 end) as 'test_cnt',
        SUM(case when type<>'t' then 1 else 0 end) as 'cnt'
        from questions q
        left join question_replies qr on q.id=qr.question_id
        LEFT JOIN servers gi
        ON gi.server_id=q.server_id
        LEFT JOIN games g on g.game_id=gi.game_id
        left join admin_users au on au.uid=qr.admin_uid
        where DATE_FORMAT(qr.create_time,'%Y-%m') = ?
        and au.role=?
        group by game_id, game_name,au.name, DATE_FORMAT(qr.create_time,'%Y-%m-%d') order by DATE_FORMAT(qr.create_time,'%Y-%m-%d') `,
        [yyyymm, role]
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
  getStatisticsQCount: async yyyymm => {
    return await db2
      .promise()
      .query(
        `select g.game_id, g.name as game_name,DATE_FORMAT(q.create_time, '%Y-%m-%d') as '時間',count(*) as 'cnt'
        from questions q
        LEFT JOIN servers gi
        ON gi.server_id=q.server_id
        LEFT JOIN games g on g.game_id=gi.game_id
        where  
         DATE_FORMAT(q.create_time,'%Y-%m') = ?
        group by game_id, game_name, DATE_FORMAT(q.create_time,'%Y-%m-%d')`,
        [yyyymm]
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
  getListByUserShort: async ({ partner_uid, phone, email }) => {
    let condition = "";

    if (!isEmpty(partner_uid)) {
      condition = "  partner_uid='" + partner_uid + "'";
    }
    if (!isEmpty(phone)) {
      if (!isEmpty(condition)) {
        condition += " or ";
      }
      condition += " phone='" + phone + "'";
    }
    if (!isEmpty(email)) {
      if (!isEmpty(condition)) {
        condition += " or ";
      }
      condition += " email='" + email + "'";
    }
    //console.log("condition", condition);
    if (isEmpty(condition)) {
      return [];
    }
    return await db2
      .promise()
      .query(
        `select id,content, create_time,g.name as game_name, g.game_id as game_id from questions q
        LEFT JOIN servers gi ON gi.server_id=q.server_id
        LEFT JOIN games g ON g.game_id=gi.game_id
         where ${condition} order by id desc limit 20`
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

module.exports = QuestionsModel;
