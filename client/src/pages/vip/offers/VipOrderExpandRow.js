import React from 'react';
import { Row, Col, Table } from 'reactstrap';
import Moment from 'react-moment';
import moment from 'moment';
import { reportStatusOptions, invoiceOptions } from './vipOptions';
const VipOrderExpandRow = {
  showExpandColumn: true,
  expandByColumnOnly: true,
  onlyOneExpanding: true,
  renderer: (row) => (
    <Row>
      <Col xl={6}>
        <Table className='mb-0' sm={4} dark>
          <tbody>
            <tr>
              <th>狀態</th>
              <td colSpan='3'>{reportStatusOptions[row.report_status]}</td>
            </tr>
            <tr>
              <th>單號：</th>
              <td>{row.report_id}</td>
              <th>負責專員：</th>
              <td>{row.admin_name}</td>
            </tr>
            <tr>
              <th>填單時間：</th>
              <td>
                {<Moment format='YYYY-MM-DD HH:mm'>{row.create_time}</Moment>}
              </td>
              <th>上次更新：</th>
              <td>
                {moment(row.update_time).format('YYYY-MM-DD') ===
                'Invalid date' ? (
                  ''
                ) : (
                  <Moment format='YYYY-MM-DD'>{row.update_time}</Moment>
                )}
              </td>
            </tr>

            <tr>
              <th>遊戲：</th>
              <td>{row.game_name}</td>
              <th>伺服器：</th>
              <td>{row.server_name}</td>
            </tr>

            <tr>
              <th>角色名：</th>
              <td>{row.char_name}</td>
              <th>角色ID：</th>
              <td>{row.role_id}</td>
            </tr>
            <tr>
              <th>VIP等級：</th>
              <td>{row.vip_ranking}</td>
              <th>Role ID：</th>
              <td>{row.char_in_game_id}</td>
            </tr>
            <tr>
              <th>電話：</th>
              <td>{row.phone}</td>
              <th>Email：</th>
              <td>{row.email}</td>
            </tr>
            <tr>
              <th>匯款銀行</th>
              <td>{row.bank_name}</td>
              <th>玩家匯款資訊</th>
              <td>{row.wire_code}</td>
            </tr>
            <tr>
              <th>匯款戶名</th>
              <td>{row.wire_name}</td>
              <th>匯款時間</th>
              <td>
                {<Moment format='YYYY-MM-DD HH:mm'>{row.wire_time}</Moment>}{' '}
              </td>
            </tr>
            <tr>
              <th>匯款金額</th>
              <td>{row.wire_amount}</td>
              <th>信用點</th>
              <td>{(row.gold + row.free_golds) * row.qty}</td>
            </tr>
            <tr>
              <th>方案</th>
              <td colSpan='3'>
                {row.product_id} - {row.title} * {row.qty}
              </td>
            </tr>
            <tr>
              <th>發票選項</th>
              <td>{invoiceOptions[row.invoice_option]}</td>
              <th>收件人</th>
              <td>{row.recipient}</td>
            </tr>
            <tr>
              <th>寄送地址</th>
              <td colSpan='3'>{row.address}</td>
            </tr>
            <tr>
              <th>發票日期</th>
              <td>
                {moment(row.invoice_date).format('YYYY-MM-DD') ===
                'Invalid date' ? (
                  ''
                ) : (
                  <Moment format='YYYY-MM-DD'>{row.invoice_date}</Moment>
                )}
              </td>
              <th>發票號碼</th>
              <td>{row.invoice_id}</td>
            </tr>

            <tr>
              <th className='text-nowrap'>備註記事：</th>
              <td colSpan='3'>
                {row.note &&
                  row.note.split('\n').map((item, i) => {
                    return <p key={i}>{item}</p>;
                  })}
              </td>
            </tr>
            <tr>
              <th className='text-nowrap'>網易訂單號：</th>
              <td colSpan='3'>{row.orderids}</td>
            </tr>
            <tr>
              <th>IP</th>
              <td>{row.ip}</td>
              <th>國家</th>
              <td>{row.country !== null ? row.country : ''}</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  ),
};
export default VipOrderExpandRow;
