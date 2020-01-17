const express = require("express");
const router = express.Router();

//@route: GET /api/serial/list
//@desc: get serial list
//@access: private

router.get("/g66", async (req, res) => {
  console.log("req.query", req.query);
  const x = req.query.x;
  const result = [];
  if (x) {
    //find second { and sencond from back }
    const firstMark = x.indexOf("{", 3);
    const lastMark = x.lastIndexOf("}", x.length - 5);

    const item = x.slice(firstMark, lastMark + 1);
    //console.log(x.replace("equip=", "equip:"));
    //const equip = JSON.parse();

    const equip = JSON.parse(item);

    //裝備數量	主要裝備	插件1	插件2	插件3	插件4	插件5

    console.log("主要裝備", equip.item_id);
    console.log("插件數", Object.keys(equip.m_index).length);

    //result.主要裝備 = equip.item_id;
    //result.插件數 = Object.keys(equip.m_index).length;

    Object.keys(equip.m_index).map(modKey => {
      const mod = equip.modules[equip.m_index[modKey]];
      result.push({
        item_id: mod.item_id,
        _lv: mod._lv,
        _exp: mod._exp
      });
      //   console.log("插件", mod.item_id);
      //   console.log("lv", mod._lv);
      //   console.log("_exp", mod._exp);
    });
  }
  console.log("result", result);
  res.json(result);
});

module.exports = router;
