const { db1, db2 } = require("../config/db");

const GamesModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        "select game_id,name as game_name,logo_path,is_active,fanpage,site from games order by is_active desc, game_id"
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getListByCodition: async allow_games => {
    const where_allow_games =
      allow_games === "all_game"
        ? ""
        : " where game_id in('" + allow_games.split(",").join("','") + "')";
    return await db2
      .promise()
      .query(
        "select game_id,name as game_name,logo_path,is_active,fanpage,site from games " +
          where_allow_games +
          " order by is_active desc, game_id"
      )
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findOne: async game_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("select * from games where game_id=?", [game_id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows[0];
        } else {
          return null;
        }
      })
      .catch(err => ({ error: err.message }));
  },
  save: async game => {
    return await db1
      .promise()
      .query("insert into games set ?", game)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (game_id, game) => {
    return await db1
      .promise()
      .query("Update games set ? where game_id=?", [game, game_id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = GamesModel;
