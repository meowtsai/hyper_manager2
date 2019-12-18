const { db1, db2 } = require("../config/db");

const CplCaseModel = {
  getAll: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `SELECT c.*, deadline, g.name as game_name, au.name admin_name, gi.name as server_name, (select max(contact_time) from cpl_replies where case_id=c.id) as last_replied, (select count(*) from cpl_attachments where case_id=c.id) as has_attached
        FROM (cpl_cases c)
        LEFT JOIN games g ON g.game_id=c.game_id
        LEFT JOIN servers gi ON gi.server_id=c.server_id
        LEFT JOIN admin_users au ON au.uid=c.admin_uid
        ORDER BY id desc
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
  getAllReferece: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `SELECT cr.case_id, c.o_case_id, cr.ref_id
        FROM (case_reference cr)
        LEFT JOIN cpl_cases c ON c.id=cr.ref_id`
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
  getAllAttachment: async () => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `select * from cpl_attachments
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
  getRefereceByCaseId: async case_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(
        `SELECT cr.case_id, c.o_case_id, cr.ref_id
        FROM (case_reference cr)
        LEFT JOIN cpl_cases c ON c.id=cr.ref_id where cr.case_id= ?`,
        [case_id]
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

  getAttachmentByCaseId: async case_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query(`select * from cpl_attachments where case_id= ?`, [case_id])
      .then(([rows, fields]) => {
        if (rows.length > 0) {
          return rows;
        } else {
          return [];
        }
      })
      .catch(err => ({ error: err.message }));
  },
  getRepliesByCaseId: async case_id => {
    return await db2
      .promise()
      .query(
        `select tr.*, au.name as admin_uname from cpl_replies tr left join admin_users au on au.uid=tr.admin_uid where case_id= ?`,
        [case_id]
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
  getMediationsByCaseId: async case_id => {
    return await db2
      .promise()
      .query(
        `select cm.*, au.name as admin_uname from cpl_mediations cm left join admin_users au on au.uid=cm.admin_uid where case_id= ?`,
        [case_id]
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
  getRefListByCaseId: async case_id => {
    return await db2
      .promise()
      .query(
        `select id,o_case_id,o_case_date,appellant from cpl_cases c  where id <>? 
        and id not in(select ref_id from case_reference where case_id=?) 
        and game_id=(select game_id from cpl_cases where id=?)
        order by id desc
        `,
        [case_id, case_id, case_id]
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
        `SELECT c.* , g.name as game_name, au.name admin_name, gi.name as server_name FROM cpl_cases c
      LEFT JOIN games g ON g.game_id=c.game_id
        LEFT JOIN servers gi ON gi.server_id=c.server_id
        LEFT JOIN admin_users au ON au.uid=c.admin_uid
      WHERE id=?`,
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
  findOneByCaseId: async letter_id => {
    //console.log("findOne", account);
    return await db2
      .promise()
      .query("SELECT o_letter_id  FROM cpl_cases WHERE o_case_id=?", [
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
      .query("INSERT into cpl_cases SET ?", pv_record)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdate: async (id, pv_record) => {
    return await db1
      .promise()
      .query("UPDATE cpl_cases SET ? WHERE id=?", [pv_record, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  saveReply: async data => {
    return await db1
      .promise()
      .query("INSERT into cpl_replies SET ?", data)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findByIdAndUpdateReply: async (id, data) => {
    return await db1
      .promise()
      .query("UPDATE cpl_replies SET ? WHERE id=?", [data, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findAndRemoveReply: async id => {
    return await db1
      .promise()
      .query("DELETE FROM cpl_replies WHERE id=?", [id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  findAndRemoveMediation: async id => {
    return await db1
      .promise()
      .query("DELETE FROM cpl_mediations WHERE id=?", [id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findAndRemoveAttachment: async id => {
    return await db1
      .promise()
      .query("DELETE FROM cpl_attachments WHERE id=?", [id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  saveMediation: async data => {
    return await db1
      .promise()
      .query("INSERT into cpl_mediations SET ?", data)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  saveAttachment: async data => {
    return await db1
      .promise()
      .query("INSERT into cpl_attachments SET ?", data)
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },

  findByIdAndUpdateMediation: async (id, data) => {
    return await db1
      .promise()
      .query("UPDATE cpl_mediations SET ? WHERE id=?", [data, id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "更新失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findAndRemove: async id => {
    db1.query("DELETE FROM cpl_replies WHERE case_id=?", [id]);
    db1.query("DELETE FROM cpl_mediations WHERE case_id=?", [id]);
    db1.query("DELETE FROM cpl_attachments WHERE case_id=?", [id]);

    return await db1
      .promise()
      .query("DELETE FROM cpl_cases WHERE id=?", [id])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  saveRef: async (case_id, ref_id) => {
    db1.query("INSERT into case_reference SET ?", [
      { ref_id: case_id, case_id: ref_id }
    ]);
    return await db1
      .promise()
      .query("INSERT into case_reference SET ?", [{ case_id, ref_id }])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "新增失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  },
  findAndRemoveRef: async (case_id, ref_id) => {
    db1.query("DELETE FROM case_reference WHERE ref_id=? and case_id=?", [
      case_id,
      ref_id
    ]);
    return await db1
      .promise()
      .query("DELETE FROM case_reference WHERE case_id=? and ref_id=?", [
        case_id,
        ref_id
      ])
      .then(([rows, fields]) => {
        if (rows.affectedRows > 0) {
          return rows;
        } else {
          return { error: "刪除失敗" };
        }
      })
      .catch(err => ({ error: err.message }));
  }
};

module.exports = CplCaseModel;

// function add_ref_case_json(){
// 	$case_id = $this->input->post("case_id");
// 	$ref_id = $this->input->post("ref_case_list");

// 	$data = array(
// 		"case_id" => $case_id,
// 		'ref_id' => $ref_id,
// 	);
// 	$this->DB1
// 		->insert("case_reference", $data);

// 	$data = array(
// 		"case_id" => $ref_id,
// 		'ref_id' => $case_id,
// 	);
// 	$this->DB1
// 		->insert("case_reference", $data);

// 	die(json_message(array("redirect_url"=> base_url("cpl_case/view/".$case_id), "id"=>$case_id), true));

// }
