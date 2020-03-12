// desc log_admin_actions;
// +-------------+-------------+------+-----+---------+----------------+
// | Field       | Type        | Null | Key | Default | Extra          |
// +-------------+-------------+------+-----+---------+----------------+
// | id          | int(11)     | NO   | PRI | NULL    | auto_increment |
// | admin_uid   | int(11)     | NO   |     | NULL    |                |
// | ip          | varchar(45) | NO   |     | NULL    |                |
// | action      | varchar(45) | YES  |     | NULL    |                |
// | function    | varchar(45) | YES  |     | NULL    |                |
// | desc        | text        | YES  |     | NULL    |                |
// | create_time | datetime    | NO   |     | NULL    |                |
// +-------------+-------------+------+-----+---------+----------------+

const { db1, db2 } = require('../config/db');

const LogAdminActionsModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query('select * from log_admin_actions order by id desc')
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
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
      .query('select * from log_admin_actions where id=?', [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  save: async log => {
    return await db1
      .promise()
      .query('insert into log_admin_actions set ?', log)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '新增失敗' };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (id, event) => {
    return await db1
      .promise()
      .query('Update log_admin_actions set ? where id=?', [event, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '更新失敗' };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  findAndRemove: async event => {
    return await db1
      .promise()
      .query('Delete from log_admin_actions where id=?', [event.id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          //$this->DB1->set("role", "")->where("role", $role)->update("admin_users");
          db1.query("UPDATE events set role='' where role=?", [role]);

          return rows;
        } else {
          return { error: '刪除失敗' };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getListBySpecification: async ({ admin_uid, date_begin, date_end }) => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        'select * from log_admin_actions where admin_uid=? and create_time between ? and ? order by id desc',
        [admin_uid, date_begin, date_end]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = LogAdminActionsModel;
