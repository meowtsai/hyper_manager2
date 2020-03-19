//1. 確定日期區間
const moment = require('moment');
const LogAdminActionsModel = require('../../models/LogAdminActionsModel');
const fs = require('fs');
const sDate = moment()
  .subtract(7, 'days')
  .format('YYYY-MM-DD');
const eDate = moment()
  .subtract(1, 'days')
  .format('YYYY-MM-DD');
const path = require('path');

const directoryPath = path.join(__dirname);
// console.log(sDate);
// console.log(eDate);

//2. get data from db

const getRpt = async condition => {
  const result = await LogAdminActionsModel.getListByRole(condition);
  return result;
};
getRpt({
  role: 'ants',
  date_begin: sDate,
  date_end: eDate + ' 23:59:59'
})
  .then(results => {
    //console.log('results', results);
    if (!results) {
      //沒有資料
      console.log('no data');
    } else {
      //3. 產出報表
      const filename = `ants_${new Date().getTime()}.csv`;
      let finalResult = '帳號,時間,操作,提問單號,遊戲,描述\n';
      for (let index = 0; index < results.length; index++) {
        //console.log('index', index);
        //帳號 時間 提問單號 遊戲  描述
        const item = results[index];

        const action_opt = {
          login_success: '登入',
          view_question: '檢視提問單',
          view_image: '開圖',
          logout: '登出',
          question_reply: '編輯回覆'
        };

        const action_text = action_opt[item.action];
        let game_text = '';
        let qid = '';
        let desc = item.desc;

        switch (item.action) {
          case 'view_question':
          case 'view_image':
            game_text = item.function.split(',')[0];
            qid = item.function.split(',')[1];
            break;
          case 'question_reply':
            if (item.function.split(',').length > 1) {
              game_text = item.function.split(',')[0];
              qid = item.function.split(',')[1];
              desc = `${item.admin_name} 在 ${moment(item.create_time).format(
                'YYYY-MM-DD HH:mm:ss'
              )} 編輯提問單回覆#${qid}`;
            } else {
              desc = '';
            }

            break;
          default:
            game_text = '';
            break;
        }
        finalResult += `${item.admin_name},${moment(item.create_time).format(
          'YYYY-MM-DD HH:mm:ss'
        )},${action_text},${qid},${game_text},${desc}\n`;
      }

      fs.writeFileSync(`${directoryPath}/${filename}`, finalResult);

      // done
      //4. send mail
      //if (process.env.NODE_ENV != "development") {

      const nodemailer = require('nodemailer');
      const smtp_server = require('../../config/default')['smtp_server'];
      const report_receivers = require('../../config/service')[
        'report_receivers'
      ];
      let transporter = nodemailer.createTransport(smtp_server);

      let mailOptions = {
        from: '"龍邑自動回覆系統" <no-reply@longeplay.com.tw>', // sender address
        to: report_receivers, // list of receivers
        subject: `蟻力後台操作紀錄週報表(${sDate} - ${eDate}) ${moment().format(
          'YYYY-MM-DD HH:mm:ss'
        )}`, // Subject line
        text: '附件是上周操作紀錄報表, 請查收．\n\n龍邑技術部',
        attachments: [
          {
            path: `${directoryPath}/${filename}`
          }
        ]
      };

      transporter.sendMail(mailOptions);

      //console.log("Message sent: %s", info.messageId);

      /// EMAIL /////

      // console.log('done');
    }
  })
  .catch(e => {
    fs.appendFile('cslog.txt', `${sDate},${eDate},${e.message}`, function(err) {
      if (err) {
        // append failed
        console.log('failed', err);
      } else {
        // done
        console.log('done');
        process.exit();
      }
    });
  });
setTimeout(function() {
  process.exit();
}, 20000);
