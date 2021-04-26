import React, { Fragment, useState } from "react";
import PageTitle from "../../../components/PageTitle";

import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import LoaderWidget from "../../../components/Loader";
import LoaderProgressBar from "../../../components/LoaderProgressBar";

import axios from "axios";

const VIpUploadTaskHome = () => {
  const [file01, setFile01] = useState("");
  const [lines, setLines] = useState([]);
  const [errors, setErrors] = useState({});
  const [currentProcessIndex, setCurrentProcessIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({});
  const [game, setGame] = useState({ gameId: "", gameName: "" });

  //驗證資料
  const preSubmitValidation = () => {
    console.log("preSubmitValidation 驗證資料");
    if (file01 !== "") {
      //record.close_date=close_date;
      //console.log("file01", file01[0]);
      //530012,546720202@ios.netease_global.win.163.com,X+2yeBZjKmUNDqfX,韓金兒,12,20210302,15161.47045,15178329,,,,,,

      var reader = new FileReader();
      reader.onload = function (event) {
        //console.log(event.target.result);
        setLines([]);

        const result = event.target.result.split("\n");
        try {
          const reSize = result.length;
          if (reSize > 0) {
            const firstLine = result[0].split(",");
            let deposit_total = false;
            let uid;

            firstLine.forEach((colData, i) => {
              if (colData.indexOf("@") > -1) {
                uid = colData;
                if (i === 1) {
                  setGame({ gameId: "g66naxx2tw", gameName: "明日之後" });
                  deposit_total = isNaN(
                    Number.parseInt(firstLine[6].replace("\r", "") * 5)
                  );
                } else if (i === 5) {
                  setGame({ gameId: "h55naxx2tw", gameName: "第五人格" });
                  deposit_total = isNaN(Number.parseInt(firstLine[3]));
                } else {
                  throw new Error("含有@符號的uid欄位不在預期的位置");
                }
              }

              if (deposit_total) {
                throw new Error("儲值金額欄位不是數值");
              }
              if (i === firstLine.length - 1 && !uid) {
                throw new Error("第一列資料找不到含有@符號的uid欄位 ");
              }
            });
          }
          setLines(result);
          setErrors({});
          //error
        } catch (error) {
          setErrors({ msg: error + "- 無法解析檔案" });
        }

        //
      };
      reader.readAsText(file01[0]);

      //formData.append(`attachment01`, file01[0]);
    }
  };
  const formSubmit = async (e) => {
    e.preventDefault();

    //setLoading(true);
    axios.defaults.timeout = 180000;

    //1. 將檔案上傳
    //2. 在client 端將資料分批 每100筆
    let rInsertCount = 0,
      rUpdateCount = 0;
    try {
      for (let i = 0; i < lines.length / 100; i++) {
        setCurrentProcessIndex(i);
        let formData = new FormData();
        formData.append(`site`, game.gameId);

        //formData.append(`vipList`, file01[0]);
        formData.append(
          `lines`,
          JSON.stringify(lines.slice(i * 100, i * 100 + 100))
        );

        const result = await axios.post("/api/vip_upload", formData);
        const { insertCount, updateCount } = result.data;
        rInsertCount = rInsertCount + insertCount;
        rUpdateCount = rUpdateCount + updateCount;
        console.log(i, result.data);
      }

      setLoading(false);
      setMessage({
        msg: `作業完成，共新增 ${rInsertCount}筆, 更新${rUpdateCount}筆`,
      });
      setCurrentProcessIndex(0);

      setLines([]);
      setFile01("");
      setGame({ gameId: "", gameName: "" });
    } catch (error) {
      console.log(error);
      setErrors({ msg: error });
      setLoading(false);
    }

    //console.log("result", result);
    //editRecord('govletter', formData);
  };

  if (currentProcessIndex > 0) {
    return (
      <LoaderProgressBar
        value={(100 / (lines.length / 100)) * currentProcessIndex}
      />
    );
  }

  if (loading) {
    return <LoaderWidget />;
  }

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "鯨魚用戶名單上傳", path: "/vip/upload", active: false },
        ]}
        title={"鯨魚用戶名單上傳"}
      />
      <Row className="mb-2">
        <Col lg={4}>
          <Card>
            <CardBody>
              <h4 className="mb-3 header-title">上傳新名單</h4>
              {errors.msg && (
                <Alert color="danger" isOpen={errors.msg ? true : false}>
                  <div>{errors.msg}</div>
                </Alert>
              )}

              <Form>
                <FormGroup>
                  <Label for="file01">相關檔案1</Label>
                  <Input
                    type="file"
                    name="file01"
                    id="file01"
                    onChange={(e) => {
                      setFile01(e.target.files);
                    }}
                  />
                </FormGroup>

                <Link className="btn btn-secondary mr-2" to="/vip/whale_users">
                  取消
                </Link>

                <Button color="dark mr-2" onClick={preSubmitValidation}>
                  驗證資料
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col lg={8}>
          {message.msg && (
            <Alert color="success" isOpen={message.msg ? true : false}>
              <div>{message.msg}</div>
            </Alert>
          )}

          {lines.length > 0 && !errors.msg && (
            <Button color="primary" type="submit" onClick={formSubmit}>
              匯入名單({game.gameName})
            </Button>
          )}
          <table>
            <thead>
              <tr>
                <th>帳號</th>
                <th>暱稱</th>
                <th>角色ID</th>
                <th>伺服器</th>
                <th>儲值總額</th>
                <th>最後登入</th>
              </tr>
            </thead>
            <tbody>
              {lines.slice(0, 10).map((line) =>
                line.length > 0 ? (
                  <tr>
                    <td>{line.split(",")[1].split("@")[0]}</td>
                    <td>{line.split(",")[3]}</td>
                    <td>{line.split(",")[7]}</td>
                    <td>{line.split(",")[0]}</td>
                    <td>
                      {Number.parseInt(
                        line.split(",")[6].replace("\r", "") * 5
                      )}
                    </td>
                    <td>{line.split(",")[5]}</td>
                  </tr>
                ) : null
              )}
            </tbody>
          </table>
        </Col>
      </Row>
    </Fragment>
  );
};

export default VIpUploadTaskHome;

// //帳號,暱稱,role id, 伺服器, 儲值總額, 最後登入

// server_name: `g66_${content[0]}`,
//         char_in_game_id: content[7].replace("\r", ""),
//         uid: content[1].split("@")[0],
//         deposit_total: content[6].replace("\r", "") * 5,
//         char_name: content[3],
//         last_login: content[5],
//         site: "g66naxx2tw",
//         role_id: content[2],
//<td>${line[6].replace("\r", "") * 5}</td>
