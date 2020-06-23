const { db1, db2 } = require("../config/db");

const VipOffersModel = {
  findOne: async (report_id) => {
    return await db2
      .promise()
      .query(
        `select a.* , g.name as game_name, si.name as server_name, vp.title, vp.price
        from vip_wire_report a left join games g on a.game_id =g.game_id
        left join servers si on a.server_id =si.server_id
        left join vip_products vp on vp.product_id=a.product_id where report_id=?`,
        [report_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  getProductsList: async () => {
    return await db2
      .promise()
      .query(
        "select a.product_id,a.title, a.product_desc,a.price,a.gold,a.free_golds, a.game_id, a.is_active, a.start_time, a.end_time, g.name as game_name from vip_products a left join games g on a.game_id =g.game_id;"
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  findProdById: async (product_id) => {
    return await db2
      .promise()
      .query(
        `select a.product_id,a.title, a.product_desc,a.price,a.gold,a.free_golds, 
        a.game_id, a.is_active, a.start_time, a.end_time, g.name as game_name 
        from vip_products a left join games g on a.game_id =g.game_id where product_id=?`,
        [product_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  getOrderList: async () => {
    return await db2
      .promise()
      .query(
        `select a.* , g.name as game_name, si.name as server_name, vp.title, vp.price,vp.gold, 
        vp.free_golds, b.name as admin_name
        from vip_wire_report a left join games g on a.game_id =g.game_id
        left join servers si on a.server_id =si.server_id
        left join vip_products vp on vp.product_id=a.product_id
        left join admin_users b on a.admin_uid =b.uid

        ;`
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  findProdsByGameId: async (game_id) => {
    return await db2
      .promise()
      .query(
        "select a.product_id,a.title, a.product_desc,a.price,a.gold,a.free_golds, a.game_id, g.name as game_name from vip_products a  join games g on a.game_id =g.game_id where a.game_id=?",
        [game_id]
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  findByIdAndUpdate: async (id, report) => {
    return await db1
      .promise()
      .query("Update vip_wire_report set ? where id=?", [report, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  findReportAndRemove: async (report_id) => {
    return await db1
      .promise()
      .query(
        "Delete from vip_wire_report where report_id=? and report_status=1",
        [report_id]
      )
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  findProdByIdAndUpdate: async (id, prod) => {
    return await db1
      .promise()
      .query("Update vip_products set ? where product_id=?", [prod, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  findProdAndRemove: async (product_id) => {
    return await db1
      .promise()
      .query('Delete from vip_products where product_id=? and is_active="0"', [
        product_id,
      ])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  createProduct: async (product) => {
    return await db1
      .promise()
      .query("insert into vip_products set ?", product)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  checkIfExistInWireReport: async (product_id) => {
    return await db2
      .promise()
      .query(
        "select count(product_id) as cnt from vip_wire_report where product_id=?",
        [product_id]
      )
      .then(([rows, fields]) => {
        if (rows[0].cnt > 0) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  get30daysData: async () => {
    return await db2
      .promise()
      .query(
        `SELECT  a.game_id,g.name as game_name, DATE_FORMAT(update_time, '%Y/%m/%d') as udate, sum(wire_amount) as amount, count(*) as count
        FROM    vip_wire_report a left join games g on a.game_id = g.game_id
        WHERE   report_status=4 and update_time BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE()
        group by a.game_id,g.name,DATE_FORMAT(update_time, '%Y/%m/%d')`
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch((err) => ({ error: err.message }));
  },
};

module.exports = VipOffersModel;
