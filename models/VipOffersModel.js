const { db1, db2 } = require("../config/db");

const VipOffersModel = {
  getOffersList: async () => {
    return await db2
      .promise()
      .query(
        "select a.id,a.type,a.title, a.content,a.cost, a.game_id,a.create_time,a.status, a.offer_id,a.admin_uid, a.update_time, g.name as game_name from vip_offers a left join games g on a.game_id =g.game_id;"
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

module.exports = VipOffersModel;
