const { db1, db2 } = require('../config/db');

const EventsModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query('select * from events order by id desc')
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
      .query('select * from events where id=?', [id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  save: async event => {
    return await db1
      .promise()
      .query('insert into events set ?', event)
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
      .query('Update events set ? where id=?', [event, id])
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
      .query('Delete from events where id=?', [event.id])
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
  findSerialRecords: async event_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `SELECT a.personal_id as in_game_id, log_tb.char_name as name, a.email, a.serial, a.event_sub_id, sm.title, log_tb.partner_uid, log_tb.note as server, (select create_time from log_serial_event c where c.char_id=a.personal_id and c.serial=a.serial and status=1 order by id desc limit 1 ) as dt
      FROM (event_serial a)
      LEFT JOIN serial_main sm ON sm.id=a.event_sub_id
      JOIN ( select * from log_serial_event where event_id=? and status=1) log_tb ON log_tb.serial=a.serial
      WHERE a.event_id =  ?
      AND a.status =  1
      ORDER BY a.event_sub_id`,
        [event_id, event_id]
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

module.exports = EventsModel;
