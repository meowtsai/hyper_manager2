const { db1, db2 } = require('../config/db');

const GovLetterModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `select  gov.* ,  g.name as game_name , b.name as server_name, au.name as admin_name from  gov_letters gov
      left join servers b on gov.server_id =b.server_id
      left join games g on gov.game_id = g.game_id
      left join admin_users au on au.uid=gov.admin_uid
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

  findOne: async id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query('SELECT * FROM gov_letters WHERE id=?', [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findOneByLetterId: async letter_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query('SELECT o_letter_id  FROM gov_letters WHERE o_letter_id=?', [
        letter_id
      ])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  save: async pv_record => {
    return await db1
      .promise()
      .query('INSERT into gov_letters SET ?', pv_record)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '新增失敗' };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (id, pv_record) => {
    return await db1
      .promise()
      .query('UPDATE gov_letters SET ? WHERE id=?', [pv_record, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '更新失敗' };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  findAndRemove: async gv_id => {
    return await db1
      .promise()
      .query('DELETE FROM gov_letters WHERE id=?', [gv_id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '刪除失敗' };
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = GovLetterModel;
