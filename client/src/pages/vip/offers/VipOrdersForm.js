import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  CustomInput,
  FormFeedback,
  Button,
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";
import PageTitle from "../../../components/PageTitle";
import {
  getCurrentVipReport,
  getServersByGameId,
  getVipProductsByGameId,
  getGames,
  editVipWireReport
} from "../../../redux/actions";
import { reportStatusOptions, invoiceOptions } from "./vipOptions";
const VipOrdersForm = ({
  getCurrentVipReport,
  match,
  currentReport,
  getServersByGameId,
  getVipProductsByGameId,
  editVipWireReport,
  errors,
  loading,
  updateOKMessage,
  games,
  servers,
  vip_prods
}) => {
  const report_id = match.params.report_id ? match.params.report_id : null;
  const [server_id, setServerId] = useState("");

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [product_id, setProductId] = useState("");
  const [qty, setQty] = useState("");
  const [orderids, setOrderids] = useState("");
  const [role_id, setRoleId] = useState("");
  const [char_name, setCharName] = useState("");
  const [bank_name, setBankName] = useState("");
  const [wire_name, setWireName] = useState("");

  const [wire_code, setWireCode] = useState("");
  const [wire_time, setWireTime] = useState("");
  const [wire_amount, setWireAmount] = useState("");

  const [note, setNote] = useState("");

  const [report_status, setReportStatus] = useState("");

  const [invoice_option, setInvoiceOption] = useState("");
  const [address, setAddress] = useState("");
  const [invoice_id, setInvoiceId] = useState("");
  const [invoice_date, setInvoiceDate] = useState("");

  useEffect(() => {
    if (report_id) {
      getCurrentVipReport(report_id);
      getGames();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentReport.game_id) {
      getServersByGameId(currentReport.game_id);
      getVipProductsByGameId(currentReport.game_id);

      setServerId(currentReport.server_id);
      setPhone(currentReport.phone);
      setEmail(currentReport.email);
      setProductId(currentReport.product_id);
      setQty(currentReport.qty);
      setRoleId(currentReport.role_id);
      setCharName(currentReport.char_name);
      setBankName(currentReport.bank_name);
      setWireName(currentReport.wire_name);
      setWireCode(currentReport.wire_code);
      setWireTime(currentReport.wire_time);
      setWireAmount(currentReport.wire_amount);
      setNote(currentReport.note ? currentReport.note : "");
      setReportStatus(currentReport.report_status);
      setOrderids(currentReport.orderids);
      setInvoiceId(currentReport.invoice_id ? currentReport.invoice_id : "");
      setInvoiceDate(
        currentReport.invoice_date ? currentReport.invoice_date : ""
      );

      setInvoiceOption(
        currentReport.invoice_option ? currentReport.invoice_option : ""
      );
      setAddress(currentReport.address ? currentReport.address : "");
    }
  }, [currentReport]);

  const mainTitle = "VIP 訂單";
  const act_title = report_id ? "編輯" : "新增";

  const formSubmit = e => {
    e.preventDefault();

    let formatedInvoiceDate = moment(invoice_date).format("YYYY-MM-DD");
    if (formatedInvoiceDate === "Invalid date") {
      formatedInvoiceDate = null;
    }
    const reportField = {
      report_id,
      server_id,
      phone,
      email,
      product_id,
      qty,
      role_id,
      char_name,
      bank_name,
      wire_name,
      wire_code,
      wire_time: moment(wire_time).format("YYYY-MM-DD HH:mm:ss"),
      wire_amount,
      note,
      report_status,
      orderids,
      invoice_id,
      invoice_date: formatedInvoiceDate,
      invoice_option,
      address
    };
    //console.log("reportField", reportField);
    editVipWireReport(reportField);
  };

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "VIP", path: "/vip/wire_report/list", active: false },
          { label: mainTitle, path: "/vip/wire_report/list", active: true },
          {
            label: act_title,
            path: "/vip/wire_report/list",
            active: true
          }
        ]}
        title={`${act_title}${mainTitle}`}
      />

      <Row className="mb-2">
        <Col lg={6}>
          <Card className="border p-1 mb-1 rounded font-13 bg-light">
            <CardBody>
              {errors && errors.msg && (
                <Alert color="danger" isOpen={errors.msg ? true : false}>
                  <div>{errors.msg}</div>
                </Alert>
              )}
              <Form onSubmit={formSubmit}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="report_id">匯款回報單號</Label>

                      {report_id && (
                        <Input plaintext defaultValue={report_id} readOnly />
                      )}
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="create_time">填寫時間</Label>

                      <Input
                        plaintext
                        defaultValue={moment(currentReport.create_time).format(
                          "YYYY-MM-DD HH:mm:ss a"
                        )}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="phone">聯繫電話</Label>

                      <Input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        invalid={errors.phone ? true : false}
                      />

                      <FormFeedback>{errors.phone}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="email">EMAIL</Label>
                      <Input
                        type="text"
                        name="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        invalid={errors.email ? true : false}
                      />

                      <FormFeedback>{errors.email}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="product_id">方案ID</Label>

                      <Input
                        type="select"
                        name="product_id"
                        id="product_id"
                        value={product_id}
                        onChange={e => setProductId(e.target.value)}
                        invalid={errors.product_id ? true : false}
                      >
                        <option>請選擇</option>
                        {vip_prods &&
                          vip_prods.map(product => (
                            <option
                              key={"product-" + product.product_id}
                              value={product.product_id}
                            >
                              {product.title}
                            </option>
                          ))}
                      </Input>

                      <FormFeedback>{errors.product_id}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="qty">方案數量</Label>
                      <Input
                        type="number"
                        name="qty"
                        id="qty"
                        value={qty}
                        onChange={e => setQty(e.target.value)}
                        invalid={errors.qty ? true : false}
                      />
                      <FormFeedback>{errors.qty}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="o_letter_id">遊戲名稱</Label>
                      <Input
                        plaintext
                        defaultValue={currentReport.game_name}
                        readOnly
                      />
                    </FormGroup>
                  </Col>

                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="server_id">伺服器</Label>
                      <Input
                        type="select"
                        name="server_id"
                        id="server_id"
                        value={server_id}
                        onChange={e => setServerId(e.target.value)}
                        invalid={errors.server_id ? true : false}
                      >
                        <option>請選擇</option>
                        {servers &&
                          servers
                            .filter(server => server.server_status === "public")
                            .map(server => (
                              <option
                                key={"server-" + server.server_id}
                                value={server.server_id}
                              >
                                {server.server_name}
                              </option>
                            ))}
                      </Input>
                      <FormFeedback>{errors.server_id}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="role_id">角色GID</Label>

                      <Input
                        type="text"
                        name="role_id"
                        id="role_id"
                        value={role_id}
                        onChange={e => setRoleId(e.target.value)}
                        invalid={errors.role_id ? true : false}
                      />

                      <FormFeedback>{errors.role_id}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="char_name">角色名稱</Label>
                      <Input
                        type="text"
                        name="char_name"
                        id="char_name"
                        value={char_name}
                        onChange={e => setCharName(e.target.value)}
                        invalid={errors.char_name ? true : false}
                      />

                      <FormFeedback>{errors.char_name}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="bank_name">匯款銀行</Label>

                      <Input
                        type="text"
                        name="bank_name"
                        id="bank_name"
                        value={bank_name}
                        onChange={e => setBankName(e.target.value)}
                        invalid={errors.bank_name ? true : false}
                      />

                      <FormFeedback>{errors.bank_name}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="wire_name">匯款戶名</Label>
                      <Input
                        type="text"
                        name="wire_name"
                        id="wire_name"
                        value={wire_name}
                        onChange={e => setWireName(e.target.value)}
                        invalid={errors.wire_name ? true : false}
                      />

                      <FormFeedback>{errors.wire_name}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="wire_code">匯款帳號後五碼</Label>
                      <Input
                        type="text"
                        name="wire_code"
                        id="wire_code"
                        value={wire_code}
                        onChange={e => setWireCode(e.target.value)}
                        invalid={errors.wire_code ? true : false}
                      />

                      <FormFeedback>{errors.wire_code}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="wire_time">匯款時間</Label>

                      <Input
                        type="datetime-local"
                        name="wire_time"
                        id="wire_time"
                        value={moment(wire_time).format("YYYY-MM-DDTHH:mm")}
                        onChange={e => setWireTime(e.target.value)}
                        invalid={errors.wire_time ? true : false}
                      />

                      <FormFeedback>{errors.wire_time}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="wire_amount">匯款總金額</Label>
                      <Input
                        type="number"
                        name="wire_amount"
                        id="wire_amount"
                        value={wire_amount}
                        onChange={e => setWireAmount(e.target.value)}
                        invalid={errors.wire_amount ? true : false}
                      />

                      <FormFeedback>{errors.wire_amount}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="report_status" className="text-primary">
                        🔔狀態
                      </Label>
                      <Input
                        type="select"
                        name="report_status"
                        id="report_status"
                        value={report_status}
                        onChange={e => setReportStatus(e.target.value)}
                        invalid={errors.report_status ? true : false}
                      >
                        <option>請選擇</option>
                        {reportStatusOptions &&
                          Object.keys(reportStatusOptions).map(optKey => (
                            <option key={"rso-" + optKey} value={optKey}>
                              {reportStatusOptions[optKey]}
                            </option>
                          ))}
                      </Input>
                      <FormFeedback>{errors.report_status}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label htmlFor="orderids" className="text-primary">
                        🔔網易訂單號
                      </Label>
                      <Input
                        type="text"
                        name="orderids"
                        id="orderids"
                        value={orderids}
                        onChange={e => setOrderids(e.target.value)}
                        invalid={errors.orderids ? true : false}
                      />

                      <FormFeedback>{errors.orderids}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="report_status">發票選項</Label>
                      <Input
                        type="select"
                        name="invoice_option"
                        id="invoice_option"
                        value={invoice_option}
                        onChange={e => setInvoiceOption(e.target.value)}
                        invalid={errors.invoice_option ? true : false}
                      >
                        <option>請選擇</option>
                        {invoiceOptions &&
                          Object.keys(invoiceOptions).map(optKey => (
                            <option key={"rso-" + optKey} value={optKey}>
                              {invoiceOptions[optKey]}
                            </option>
                          ))}
                      </Input>
                      <FormFeedback>{errors.invoice_option}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="invoice_date">發票日期</Label>
                      <Input
                        type="date"
                        name="invoice_date"
                        id="invoice_date"
                        value={moment(invoice_date).format("YYYY-MM-DD")}
                        onChange={e => setInvoiceDate(e.target.value)}
                        invalid={errors.invoice_date ? true : false}
                      />

                      <FormFeedback>{errors.invoice_date}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label htmlFor="invoice_id">發票號碼</Label>
                      <Input
                        type="test"
                        name="invoice_id"
                        id="invoice_id"
                        value={invoice_id}
                        onChange={e => setInvoiceId(e.target.value)}
                        invalid={errors.invoice_id ? true : false}
                      />

                      <FormFeedback>{errors.invoice_id}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <FormGroup>
                  <Label for="txtAddress">寄送地址</Label>

                  <Input
                    type="text"
                    name="txtAddress"
                    id="txtAddress"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="玩家備註"
                    invalid={errors.address ? true : false}
                  />

                  <FormFeedback>{errors.address}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="txtNote">玩家備註</Label>

                  <Input
                    type="textarea"
                    name="txtNote"
                    id="txtNote"
                    rows="5"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="玩家備註"
                    invalid={errors.note ? true : false}
                  />

                  <FormFeedback>{errors.note}</FormFeedback>
                </FormGroup>

                {
                  <Alert
                    color="success"
                    isOpen={updateOKMessage !== null ? true : false}
                  >
                    <div>{` # ${report_id} ${act_title} 成功!`} </div>
                  </Alert>
                }

                <Link
                  className="btn btn-secondary mr-2"
                  to="/vip/wire_report/list"
                >
                  回列表
                </Link>

                <Button color="primary" type="submit">
                  確認送出
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

VipOrdersForm.propTypes = {
  games: PropTypes.array
};

const mapStateToProps = state => ({
  games: state.Games.list,
  servers: state.Servers.list,
  currentReport: state.VipOffers.current_report,
  errors: state.VipOffers.errors,
  loading: state.VipOffers.loading,
  updateOKMessage: state.VipOffers.updateOKMessage,
  vip_prods: state.VipOffers.vip_prods
});
export default connect(mapStateToProps, {
  getCurrentVipReport,
  getServersByGameId,
  getVipProductsByGameId,
  getGames,
  editVipWireReport
})(VipOrdersForm);

//方案id
//遊戲id
//方案標題
//類型
//描述
//金額
//點數
