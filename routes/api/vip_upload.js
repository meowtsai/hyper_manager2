const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const momnet = require("moment");
const checkPermission = require("../../middleware/checkPermission");
const WhaleUserModel = require("../../models/WhaleUserModel");

const image_upload_dir = require("../../config/default")["image_upload_dir"];
const helper = require("../../utils/helper");
/* 上傳VIP 更新名單  */

router.post(
  "/",
  function (req, res, next) {
    return checkPermission(req, res, next, "whale_users_statistics", "read");
  },
  async (req, res) => {
    let updateCount = 0;
    let insertCount = 0;
    const { site } = req.body;
    if (!helper.isEmpty(req.files)) {
      let completeFilePath = "";
      if (Object.keys(req.files).length > 0) {
        Object.keys(req.files).forEach((keyName, index) => {
          console.log("keyName", keyName);
          //momnet
          const new_file_name =
            momnet().format("YYYYMMDD") +
            "_" +
            req.files[keyName].name.toLowerCase();
          completeFilePath = image_upload_dir + "viplist/" + new_file_name;
          req.files[keyName].mv(completeFilePath, (err) => {
            if (err) return res.status(500).send({ file01: err.message });
          });
        });
        const data = await fs.readFile(completeFilePath, "utf8");

        let newArray = [];

        if (data.length > 0) {
          let lines = data.split("\n");

          for (let index = 0; index < lines.length; index++) {
            const content = lines[index].split(",");
            try {
              if (content[1] !== undefined) {
                const record = {
                  server_name:
                    site === "g66naxx2tw" ? `g66_${content[0]}` : `h55na1001`,
                  char_in_game_id:
                    site === "g66naxx2tw"
                      ? content[7].replace("\r", "")
                      : content[1],

                  uid:
                    site === "g66naxx2tw"
                      ? content[1].split("@")[0]
                      : content[5].split("@")[0].replace("\r", ""),
                  deposit_total:
                    site === "g66naxx2tw"
                      ? Number.parseInt(content[6].replace("\r", "") * 5)
                      : Number.parseInt(content[3]),
                  char_name:
                    site === "g66naxx2tw"
                      ? content[3]
                      : content[6].replace("\r", ""),
                  last_login:
                    site === "g66naxx2tw"
                      ? content[5]
                      : moment(content[4]).format("YYYY-MM-DD"),
                  site: site,
                  role_id: site === "g66naxx2tw" ? content[2] : content[1],
                };

                newArray.push(record);
              }
            } catch (error) {
              console.log("error", error, content);
            }
          }
        }

        const allChars =
          site === "g66naxx2tw"
            ? newArray.reduce((allChar, currChar) => {
                const existedChar = allChar
                  ? allChar.filter(
                      (char) =>
                        char.char_in_game_id === currChar.char_in_game_id
                    )[0]
                  : [];

                if (existedChar) {
                  const newRecord = {
                    server_name:
                      existedChar.last_login > currChar.last_login
                        ? existedChar.server_name
                        : currChar.server_name,
                    char_in_game_id: currChar.char_in_game_id,
                    uid: currChar.uid,
                    deposit_total:
                      parseInt(existedChar.deposit_total) +
                      parseInt(currChar.deposit_total),
                    char_name:
                      existedChar.last_login > currChar.last_login
                        ? existedChar.char_name
                        : currChar.char_name,
                    last_login:
                      existedChar.last_login > currChar.last_login
                        ? existedChar.last_login
                        : currChar.last_login,
                    site: "g66naxx2tw",
                    role_id: currChar.role_id,
                  };
                  allChar = allChar.filter(
                    (char) => char.char_in_game_id !== currChar.char_in_game_id
                  );
                  allChar.push(newRecord);
                  // console.log("newRecord", newRecord);
                  // console.log("allChar", allChar);
                } else {
                  allChar.push(currChar);
                }
                return allChar;
              }, [])
            : newArray;

        // console.log(
        //   allChars.filter(char => char.char_in_game_id === "XGwsDR5S+FNie0q/")
        // );

        for (i = 0; i < allChars.length; i++) {
          const char = allChars[i];
          //console.log(char);
          if (site === "g66naxx2tw") {
            WhaleUserModel.findG66ServiceRequestByOldRoldIdAndUpdate(char);
          }

          const vip = await WhaleUserModel.findOne(char.site, char.uid);
          //console.log("vip", vip);
          if (vip) {
            const updateResult = await WhaleUserModel.findByRoleIdAndUpdate(
              char.site,
              char.char_in_game_id,
              char
            );
            updateCount++;
            //console.log("updateCount", updateCount);
          } else {
            const saveResult = await WhaleUserModel.saveWhaleUser(char);
            //console.log("insertCount", insertCount);
            insertCount++;
          }
        }

        WhaleUserModel.updateListFinalise();
      }

      return res.json({
        msg: `作業完成，共新增 ${insertCount}筆, 更新${updateCount}筆`,
      });
    }

    return res.status(500).json({ msg: `沒有上傳檔案` });
  }
);

module.exports = router;
