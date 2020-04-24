const { db1, db2 } = require('../config/db');

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
  getOffersList: async () => {
    return await db2
      .promise()
      .query(
        'select a.product_id,a.title, a.product_desc,a.price,a.gold,a.free_golds, a.game_id, g.name as game_name from vip_products a left join games g on a.game_id =g.game_id;'
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
  getOrderList: async () => {
    return await db2
      .promise()
      .query(
        `select a.* , g.name as game_name, si.name as server_name, vp.title, vp.price,vp.gold, 
        vp.free_golds, b.name as admin_name, (select vip_ranking from whale_users where whale_users.char_in_game_id=a.role_id and whale_users.site=a.game_id) as vip_ranking
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
        'select a.product_id,a.title, a.product_desc,a.price,a.gold,a.free_golds, a.game_id, g.name as game_name from vip_products a  join games g on a.game_id =g.game_id where a.game_id=?',
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
      .query('Update vip_wire_report set ? where id=?', [report, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '更新失敗' };
        }
      })
      .catch((err) => ({ error: err.message }));
  },
  findReportAndRemove: async (report_id) => {
    return await db1
      .promise()
      .query(
        'Delete from vip_wire_report where report_id=? and report_status=1',
        [report_id]
      )
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: '刪除失敗' };
        }
      })
      .catch((err) => ({ error: err.message }));
  },
};

// CREATE TABLE `vip_wire_report` (
//   `id` int(11) NOT NULL AUTO_INCREMENT,
//   `report_id` varchar(30) NOT NULL,
//   `phone` varchar(20) DEFAULT NULL,
//   `email` varchar(300) DEFAULT NULL,
//   `wire_code` varchar(10) DEFAULT NULL,
//   `wire_time` datetime DEFAULT NULL,
//   `wire_amount` int(5) DEFAULT NULL,
//   `wire_name` varchar(20) DEFAULT NULL,
//   `bank_name` varchar(20) DEFAULT NULL,
//   `note` varchar(200) DEFAULT NULL,
//   `game_id` varchar(20) NOT NULL,
//   `server_id` varchar(20) NOT NULL,
//   `role_id` varchar(20) DEFAULT NULL,
//   `char_name` varchar(20) DEFAULT NULL,
//   `admin_uid` int(11) DEFAULT NULL,
//   `admin_comment` text,
//   `update_time` datetime DEFAULT NULL,
//   `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
//   `ip` varchar(20) DEFAULT NULL,
//   `country` varchar(30) DEFAULT NULL,
//   `invoice_option` varchar(20) DEFAULT 'donate' COMMENT '發票選項 donate-捐贈 paper-2聯紙本',
//   `address` varchar(300) DEFAULT NULL,
//   `product_id` varchar(30) NOT NULL,
//   `qty` smallint(6) DEFAULT 1,
//   `report_status` char(1) DEFAULT '1' COMMENT '狀態 1-初始 4-派寶完成',
//   `orderids` varchar(300) DEFAULT null COMMENT '網易訂單號',
//   `invoice_id` varchar(12) DEFAULT null COMMENT '發票號碼',
//   `invoice_date` date DEFAULT null COMMENT '發票日期',
//   PRIMARY KEY (`id`)
// ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='VIP匯款後回填';

module.exports = VipOffersModel;
