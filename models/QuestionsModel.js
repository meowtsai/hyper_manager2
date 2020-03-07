const { db1, db2 } = require('../config/db');
const { isEmpty } = require('../utils/helper');
const question_type = require('../config/service').question_type;

const QuestionsModel = {
  getAll: async (allow_games, uid, condition) => {
    const {
      status,
      gameId,
      beginTime,
      endTime,
      replyTimeBegin,
      replyTimeEnd,
      type,
      email,
      phone,
      partner_uid,
      character_name,
      check_id,
      content,
      id,
      queryAdmin
    } = condition;

    //console.log("getAll condition", condition);
    //console.log("QuestionsModel getall", uid, status);
    //gameId,
    //beginTime,
    //endTime
    let limitedStatusCondition = '';
    let limitRowCount = 15000;
    let limitedCondition = '';
    let joinRepliesTable = '';
    if (status) {
      if (status !== 'favorite' && status !== 'hidden') {
        limitedStatusCondition = `q.status=${status}`;
        if (status.toString() === '4') {
          limitedStatusCondition += " or q.status='7' ";

          if (Object.keys(condition).length === 1) {
            limitRowCount = 1000;
          }
        }
        limitedStatusCondition = `(${limitedStatusCondition})`;
      } else {
        //$this->DB2->where("q.id in(select question_id from question_favorites where admin_uid={$_SESSION['admin_uid']})", null, false);
        if (status === 'favorite') {
          limitedCondition = ` q.id in(select question_id from question_favorites where admin_uid='${uid}')`;
        } else if (status === 'hidden') {
          limitedCondition = ` q.status='0' or  (g.game_id in('N5','Ma71','Ma71tw','MA81','MA74') and q.status='1')`;
        }
      }
    }

    if (gameId) {
      if (limitedStatusCondition !== '') {
        limitedCondition += ' and ';
      }
      limitedCondition += `g.game_id='${gameId}'`;
    }

    if (beginTime && endTime) {
      if (limitedStatusCondition !== '' || limitedCondition !== '') {
        limitedCondition += ' and ';
      }
      limitedCondition += `q.create_time between '${beginTime}' and '${endTime}'`;
    }

    if (content || queryAdmin || replyTimeBegin) {
      if (content) {
        if (limitedStatusCondition !== '' || limitedCondition !== '') {
          limitedCondition += ' and ';
        }
        limitedCondition += `(q.content like '%${content}%' or qr.content like '%${content}%')`;
      }

      if (queryAdmin) {
        if (limitedStatusCondition !== '' || limitedCondition !== '') {
          limitedCondition += ' and ';
        }
        limitedCondition += `(qr.admin_uid = '${queryAdmin}')`;
      }

      if (replyTimeBegin) {
        if (limitedStatusCondition !== '' || limitedCondition !== '') {
          limitedCondition += ' and ';
        }
        limitedCondition += `(qr.create_time >= '${replyTimeBegin}')`;
      }

      if (replyTimeEnd) {
        if (limitedStatusCondition !== '' || limitedCondition !== '') {
          limitedCondition += ' and ';
        }
        limitedCondition += `(qr.create_time <= '${replyTimeEnd}')`;
      }

      joinRepliesTable =
        ' left join question_replies qr on q.id=qr.question_id ';

      //question_replies qr", "q.id=qr.question_id", "left
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
        if (limitedStatusCondition !== '' || limitedCondition !== '') {
          limitedCondition += ' and ';
        }
        limitedCondition += `q.${itemKey} ='${condition[itemKey]}'`;
      }
    });

    // console.log('QuestionsModel getAll', allow_games);

    const where_allow_games =
      allow_games === 'all_game'
        ? ''
        : " and g.game_id in('" + allow_games.split(',').join("','") + "')";

    //console.log('joinRepliesTable', joinRepliesTable);
    //console.log('limitedStatusCondition', limitedStatusCondition);
    // console.log("limitedCondition", limitedCondition);
    // console.log("where_allow_games", where_allow_games);
    const finalSql = `  select distinct q.*, g.game_id, g.name as game_name, au.name as admin_uname, gi.name as server_name,
    (select count(*) from question_favorites where question_id=q.id and category=1 and admin_uid=?) as is_favorite,
    (select count(*) from batch_questions where question_id=q.id and batch_id in(select id from batch_tasks where status=1)) as is_batch
    from questions q  
    left join servers gi on gi.server_id=q.server_id
    left join games g on g.game_id=gi.game_id
    left join admin_users au on au.uid=q.admin_uid
    ${joinRepliesTable}
    where  ${limitedStatusCondition}  ${limitedCondition} ${where_allow_games}  order by id desc limit ${limitRowCount}
  `;
    //console.log(finalSql);
    return await db2
      .promise()
      .query(finalSql, [uid])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          //console.log("QuestionsModel getall", rows.length);
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => {
        console.log(err);
        return { error: err.message };
      });
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
      .query('UPDATE questions SET ? WHERE id=?', [newRecord, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '更新失敗' };
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
      allow_games === 'all_game'
        ? ''
        : " and s.game_id in('" + allow_games.split(',').join("','") + "')";
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
   type.toString() === '1' ? 'and q.create_time>=CURDATE()' : ''
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
      allow_games === 'all_game'
        ? ''
        : " and s.game_id in('" + allow_games.split(',').join("','") + "')";

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
    // console.log(
    //   Object.keys(question_type)
    //     .map(
    //       t =>
    //         `SUM(case when type='${t}' then 1 else 0 end) as '${question_type[t]}'`
    //     )
    //     .join(",")
    // );

    return await db2
      .promise()
      .query(
        `select g.game_id, g.name as game_name,qr.admin_uid, au.name as admin_name, DATE_FORMAT(qr.create_time, '%Y-%m-%d') as '時間', 
        SUM(case when type='t' then 1 else 0 end) as 'test_cnt',
        SUM(case when type<>'t' then 1 else 0 end) as 'cnt',
        ${Object.keys(question_type)
          .map(
            t =>
              `SUM(case when type='${t}' then 1 else 0 end) as '${question_type[t]}'`
          )
          .join(',')}
       
        from questions q
        left join question_replies qr on q.id=qr.question_id
        LEFT JOIN servers gi
        ON gi.server_id=q.server_id
        LEFT JOIN games g on g.game_id=gi.game_id
        left join admin_users au on au.uid=qr.admin_uid
        where DATE_FORMAT(qr.create_time,'%Y-%m') = ?
        and au.role=?
        group by game_id, game_name,qr.admin_uid ,au.name, DATE_FORMAT(qr.create_time,'%Y-%m-%d') order by DATE_FORMAT(qr.create_time,'%Y-%m-%d') `,
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
        `select g.game_id, g.name as game_name,DATE_FORMAT(q.create_time, '%Y-%m-%d') as '時間',count(*) as 'cnt',
        ${Object.keys(question_type)
          .map(
            t =>
              `SUM(case when type='${t}' then 1 else 0 end) as '${question_type[t]}'`
          )
          .join(',')}
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
  getStatisticsQAllocationCount: async (yyyymm, role) => {
    return await db2
      .promise()
      .query(
        `select g.game_id, g.name as game_name,DATE_FORMAT(qar.create_time, '%Y-%m-%d') as '時間', qar.admin_uid,au.name as admin_name,  count(*) as cnt, 0 as test_cnt
        from question_allocation_records qar
        LEFT JOIN question_allocation qa on qa.id = qar.allocation_id
        LEFT JOIN questions q on qa.question_id =q.id
        LEFT JOIN servers gi ON gi.server_id=q.server_id
        LEFT JOIN games g on g.game_id=gi.game_id
        left join admin_users au on au.uid=qar.admin_uid
        where qar.allocate_status in(2,3,4) and DATE_FORMAT(qar.create_time,'%Y-%m') = ?
        and au.role=?
        group by qar.admin_uid,game_id, game_name, au.name,DATE_FORMAT(qar.create_time, '%Y-%m-%d') 
        order by DATE_FORMAT(qar.create_time,'%Y-%m-%d') 
        `,
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
  getStatisticsQAllocationRequestCount: async (yyyymm, role) => {
    return await db2
      .promise()
      .query(
        `select g.game_id, g.name as game_name,DATE_FORMAT(qa.create_time, '%Y-%m-%d') as '時間', qa.assignor as admin_uid,au.name as admin_name,  count(*) as cnt, 0 as test_cnt
        from question_allocation qa 
        LEFT JOIN questions q on qa.question_id =q.id
        LEFT JOIN servers gi ON gi.server_id=q.server_id
        LEFT JOIN games g on g.game_id=gi.game_id
        left join admin_users au on au.uid=qa.assignor
        where  DATE_FORMAT(qa.create_time,'%Y-%m') = ?
        and au.role=?
        group by qa.assignor,game_id, game_name, au.name,DATE_FORMAT(qa.create_time, '%Y-%m-%d') 
        order by DATE_FORMAT(qa.create_time,'%Y-%m-%d') 
        `,
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
  getListByUserShort: async ({ partner_uid, phone, email }) => {
    let condition = '';

    if (!isEmpty(partner_uid)) {
      condition = "  partner_uid='" + partner_uid + "'";
    }
    if (!isEmpty(phone)) {
      if (!isEmpty(condition)) {
        condition += ' or ';
      }
      condition += " phone='" + phone + "'";
    }
    if (!isEmpty(email)) {
      if (!isEmpty(condition)) {
        condition += ' or ';
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
         where ${condition} order by id desc`
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
  addToFavorite: async (admin_uid, question_id, category = 1) => {
    return await db1
      .promise()
      .query('insert into question_favorites set ?', {
        question_id,
        admin_uid,
        category
      })
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '新增失敗' };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  RemoveFavorite: async (admin_uid, question_id) => {
    return await db1
      .promise()
      .query(
        'DELETE FROM question_favorites WHERE admin_uid=? and question_id=?',
        [admin_uid, question_id]
      )
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '刪除失敗' };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  batchUpdate: async (q_ids, updateField) => {
    return await db1
      .promise()
      .query('UPDATE questions SET ? WHERE id in(?)', [updateField, q_ids])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '更新失敗' };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getReportCountByHour: async (allow_games, sDate) => {
    const where_allow_games =
      allow_games === 'all_game'
        ? ''
        : " and g.game_id in('" + allow_games.split(',').join("','") + "')";
    return await db2
      .promise()
      .query(
        `SELECT g.game_id, g.name as 'game_name',q.type , DATE_FORMAT(create_time, '%H:00') as 'hour',count(*) as 'cnt'
        from questions q LEFT JOIN servers gi
        ON gi.server_id=q.server_id
        LEFT JOIN games g on g.game_id=gi.game_id
        where q.create_time between '${sDate} 00:00:00' and '${sDate} 23:59:59'
        ${where_allow_games}
        group by g.game_id,g.name,q.type,DATE_FORMAT(create_time, '%H:00')
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
  getReplyCountByHour: async (allow_games, sDate) => {
    const where_allow_games =
      allow_games === 'all_game'
        ? ''
        : " and g.game_id in('" + allow_games.split(',').join("','") + "')";
    return await db2
      .promise()
      .query(
        `select g.game_id,g.name as 'game_name',DATE_FORMAT(qr.create_time, '%H:00') as 'hour',count(*) as 'cnt'
		from questions q
		left join question_replies qr on q.id=qr.question_id
		LEFT JOIN servers gi
		ON gi.server_id=q.server_id
		LEFT JOIN games g on g.game_id=gi.game_id
		where qr.create_time between '${sDate} 00:00:00' and '${sDate} 23:59:59'
		${where_allow_games}
		and qr.admin_uid <>113 and qr.is_official=1
    group by g.game_id,g.name,DATE_FORMAT(qr.create_time, '%H:00')`
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
