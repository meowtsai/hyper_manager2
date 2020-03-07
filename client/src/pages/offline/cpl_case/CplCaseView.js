import React, { useEffect, useState, Fragment } from 'react';
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  InputGroup,
  InputGroupAddon
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import PageTitle from '../../../components/PageTitle';
import {
  editCplReply,
  getCurrentRecord,
  deleteCplCase,
  moveCplCase,
  editCplMediation,
  deleteCplCaseReply,
  deleteCplMediation,
  editCplRef,
  deleteCplRef,
  addCplAttachment,
  deleteCplAttachment
} from '../../../redux/actions';

import CaseViewBasic from './CaseViewBasic';
import CaseReply from './CaseReply';
import MediationForm from './MediationForm';

const CplCaseView = ({
  getCurrentRecord,
  editCplReply,
  editCplMediation,
  deleteCplCase,
  deleteCplCaseReply,
  deleteCplMediation,
  currentRecord,
  moveCplCase,
  match,
  history,
  config_status,
  error,
  editCplRef,
  deleteCplRef,
  addCplAttachment,
  deleteCplAttachment
}) => {
  const record_id = match.params.record_id ? match.params.record_id : null;

  const [contact_time, setContactTime] = useState(
    moment().format('YYYY-MM-DDTHH:mm')
  );
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState({});
  const [modal, setModal] = useState(false);
  const [mdModal, setMdModal] = useState(false);

  const [upd_reply_id, setReplyId] = useState(null);
  const [upd_contact_time, setUpdContactTime] = useState(
    moment().format('YYYY-MM-DDTHH:mm')
  );
  const [upd_note, setUpdNote] = useState('');
  const [selectedMediation, setSelectedMediation] = useState({});

  const [activeTab, setActiveTab] = useState(1);
  const [new_ref_case, setNewRefCase] = useState('');
  const [attach_title, setAttachTitle] = useState('');
  const [file01, setFile01] = useState(null);
  const [file_path, setFile_path] = useState('');
  useEffect(() => {
    if (record_id) {
      getCurrentRecord('cpl_case', record_id, history);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (error) {
      setErrors(error);
    } else {
      setErrors({});
    }
  }, [error]);

  useEffect(() => {
    setNote('');
    setMdModal(false);
    if (currentRecord.attachments) {
      setAttachTitle(
        '附件' + Number.parseInt(currentRecord.attachments.length + 1)
      );
    }
  }, [currentRecord]);

  const submitReply = () => {
    const record = {
      case_id: record_id,
      note,
      contact_time: moment(contact_time).format('YYYY-MM-DD HH:mm:ss'),
      contact_date: moment(contact_time).format('YYYY-MM-DD')
    };

    editCplReply(record);
  };

  const confirmUpdate = () => {
    const record = {
      id: upd_reply_id,
      case_id: record_id,
      note: upd_note,
      contact_time: moment(upd_contact_time).format('YYYY-MM-DD HH:mm:ss'),
      contact_date: moment(upd_contact_time).format('YYYY-MM-DD')
    };

    setModal(!modal);
    editCplReply(record);
  };

  const onEditClick = reply_id => {
    //console.log("onEditClick");
    setModal(true);
    const selectedReply = currentRecord.replies.filter(
      re => re.id === reply_id
    )[0];

    setReplyId(reply_id);
    setUpdContactTime(selectedReply.contact_time);
    setUpdNote(selectedReply.note);
  };

  const onDeleteReplyClick = reply_id => {
    const deleteOk = window.confirm('確定要刪除這筆歷程嗎?');
    if (deleteOk) {
      deleteCplCaseReply(reply_id);
    }
  };

  const submitDelete = e => {
    //console.log("submitDelete");
    const deleteOk = window.confirm('確定要刪除嗎?');
    if (deleteOk) {
      deleteCplCase(record_id, history);
    }
  };

  const changeStatus = iStatus => {
    console.log('changeStatus', iStatus);
    moveCplCase(record_id, { status: iStatus });
  };

  const showMediationEditModal = m_id => {
    setMdModal(true);
    const t_selectedMediation = currentRecord.mediations.filter(
      md => md.id === m_id
    )[0];

    setSelectedMediation(t_selectedMediation);
    //console.log("selectedMediation", selectedMediation);
  };

  const onEditMediation = fields => {
    //console.log("values", fields);
    editCplMediation(fields);
  };

  const onDeleteMediation = m_id => {
    deleteCplMediation(m_id);
  };

  const onDeleteRef = ref_id => {
    const deleteOk = window.confirm('確定要刪除關聯案件#' + ref_id + '嗎?');
    if (deleteOk) {
      deleteCplRef(record_id, ref_id);
    }
  };

  const onDeleteAttach = att_id => {
    const deleteOk = window.confirm('確定要刪除這個附件嗎?');
    if (deleteOk) {
      deleteCplAttachment(att_id);
    }
  };

  const onAddRefCase = () => {
    if (new_ref_case !== '') {
      //console.log("onAddRefCase", new_ref_case);
      editCplRef(currentRecord.id, new_ref_case);
    }
  };

  const onAttachFile = () => {
    let formData = new FormData();

    formData.append('attach_title', attach_title);
    formData.append('case_id', record_id);

    if (attach_title === '') {
      setErrors({ attach_title: '請填寫附件名稱' });
      return;
    }

    if (file01 !== null) {
      formData.append(`attachment01`, file01[0]);
    } else {
      setErrors({ file01: '請選擇檔案' });
      return;
    }

    addCplAttachment(formData);
    setFile01(null);
    setErrors({});
  };

  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          {
            label: '線下客服',
            path: '/offline/cpl_case/home',
            active: false
          },
          {
            label: '消保',
            path: '/offline/cpl_case/home',
            active: false
          },
          {
            label: '檢視案件',
            path: '/offline/cpl_case/view',
            active: true
          }
        ]}
        title='檢視案件'
      />

      <Row className='mb-2'>
        <Col lg={6}></Col>
      </Row>
      {Object.keys(currentRecord).length > 0 && (
        <CaseViewBasic
          row={currentRecord}
          config_status={config_status}
          deleteRef={onDeleteRef}
          deleteAttach={onDeleteAttach}
        />
      )}

      <hr />
      <Row className='mb-2'>
        <Col lg={12}>
          <Nav tabs>
            <NavItem>
              <NavLink
                href='#'
                className={classnames({ active: activeTab === 1 })}
                onClick={() => {
                  setActiveTab(1);
                }}>
                <i
                  className={classnames(
                    'mdi mdi-folder-plus',
                    'd-lg-none',
                    'd-block',
                    'mr-1'
                  )}></i>
                <span className='d-none d-lg-block'>
                  <i className='mdi mdi-folder-plus mr-1' />
                  新增相關案件
                </span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href='#'
                className={classnames({ active: activeTab === 2 })}
                onClick={() => {
                  setActiveTab(2);
                }}>
                <i
                  className={classnames(
                    'mdi mdi-attachment',
                    'd-lg-none',
                    'd-block',
                    'mr-1'
                  )}></i>
                <span className='d-none d-lg-block'>
                  <i className='mdi mdi-attachment mr-1' />
                  新增附件
                </span>
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent activeTab={activeTab}>
            <TabPane tabId={1}>
              <Row>
                <Col sm='4' className='bg-light m-2'>
                  <FormGroup>
                    <InputGroup className='mt-2'>
                      <Input
                        type='select'
                        name='ref_case_list'
                        id='ref_case_list'
                        value={new_ref_case}
                        onChange={e => setNewRefCase(e.target.value)}
                        invalid={errors.new_ref_case ? true : false}>
                        <option value=''>案件列表</option>
                        {currentRecord.ref_case_list &&
                          currentRecord.ref_case_list.map(item => (
                            <option key={`refcase_${item.id}`} value={item.id}>
                              # {item.id} - {item.o_case_id} - {item.appellant}
                            </option>
                          ))}
                      </Input>
                      <InputGroupAddon addonType='append'>
                        <Button color='dark' size='sm' onClick={onAddRefCase}>
                          加入
                        </Button>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>

                  <p className='mt-3'></p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId={2}>
              <Row>
                <Col sm='4' className='bg-light m-2'>
                  <FormGroup>
                    <label className='mt-2'>附件名稱</label>
                    <Input
                      type='text'
                      name='attach_title'
                      id='attach_title'
                      className='required'
                      value={attach_title}
                      onChange={e => setAttachTitle(e.target.value)}
                      autoComplete='off'
                      invalid={errors.attach_title ? true : false}
                    />{' '}
                    <FormFeedback>{errors.attach_title}</FormFeedback>
                    <Label className='mt-2' for='cfile'>
                      選擇附件
                    </Label>
                    <InputGroup>
                      <Input
                        type='file'
                        name='file'
                        id='file01'
                        onChange={e => {
                          //console.log("e.target.files", e.target.files);
                          setFile01(e.target.files);
                        }}
                        invalid={errors.file01 ? true : false}
                      />
                      <FormFeedback>{errors.file01}</FormFeedback>
                    </InputGroup>
                    <Button
                      color='dark'
                      size='sm'
                      className='mt-2'
                      onClick={onAttachFile}>
                      上傳附件
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </Col>
      </Row>

      <hr />

      <CaseReply
        replies={currentRecord.replies || []}
        onEditClick={onEditClick}
        onDeleteReplyClick={onDeleteReplyClick}></CaseReply>

      <Row className='mb-2'>
        <Col lg={12}>
          <Modal isOpen={modal} toggle={e => setModal(!modal)}>
            <ModalHeader toggle={e => setModal(!modal)}>編輯</ModalHeader>
            <ModalBody>
              <Card className='border p-1 mt-2 mb-1 rounded font-13 bg-light'>
                <CardBody>
                  <h5>編輯事件歷程</h5>
                  <FormGroup>
                    <Label for='txtUpdContactTime'>聯絡時間</Label>
                    <Input
                      type='datetime-local'
                      name='txtUpdContactTime'
                      id='txtUpdContactTime'
                      value={moment(upd_contact_time).format(
                        'YYYY-MM-DDTHH:mm'
                      )}
                      onChange={e => setUpdContactTime(e.target.value)}
                      invalid={errors.upd_contact_time ? true : false}
                    />

                    <FormFeedback>{errors.upd_contact_time}</FormFeedback>
                  </FormGroup>
                  <FormGroup>
                    <Label for='txtUpdNote'>歷程紀錄</Label>

                    <Input
                      type='textarea'
                      name='txtUpdNote'
                      id='txtUpdNote'
                      rows='5'
                      value={upd_note}
                      onChange={e => setUpdNote(e.target.value)}
                      placeholder='歷程紀錄'
                      invalid={errors.upd_note ? true : false}
                    />

                    <FormFeedback>{errors.upd_note}</FormFeedback>
                  </FormGroup>
                </CardBody>
              </Card>
            </ModalBody>
            <ModalFooter>
              <Button
                color='secondary'
                className='sm'
                onClick={e => setModal(!modal)}>
                取消
              </Button>
              <Button color='primary' onClick={e => confirmUpdate()}>
                確認修改
              </Button>{' '}
            </ModalFooter>
          </Modal>
        </Col>
      </Row>
      {(currentRecord.status === '1' || currentRecord.status === '2') && (
        <Row form>
          <Col md={6}>
            <Card className='border p-1 mt-2 mb-1 rounded font-13 bg-light'>
              <CardBody>
                <h5>添加聯絡或事件歷程</h5>
                <FormGroup>
                  <Label for='txtContactTime'>聯絡時間</Label>
                  <Input
                    type='datetime-local'
                    name='txtContactTime'
                    id='txtContactTime'
                    value={moment(contact_time).format('YYYY-MM-DDTHH:mm')}
                    onChange={e => setContactTime(e.target.value)}
                    invalid={errors.contact_time ? true : false}
                  />

                  <FormFeedback>{errors.contact_time}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for='txtNote'>歷程紀錄</Label>

                  <Input
                    type='textarea'
                    name='txtNote'
                    id='txtNote'
                    rows='5'
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder='歷程紀錄'
                    invalid={errors.note ? true : false}
                  />

                  <FormFeedback>{errors.note}</FormFeedback>
                </FormGroup>

                <Button color='primary' type='button' onClick={submitReply}>
                  確認送出
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}

      {currentRecord.mediations && currentRecord.mediations.length > 0 && (
        <Fragment>
          <h5 className='text-primary'>協調會資訊</h5>
          <table className='table table-striped table-bordered font-13'>
            <thead>
              <tr>
                <th> #</th>
                <th>結案日期</th>
                <th>發文日期</th>
                <th>發文字號</th>
                <th>出席日期</th>
                <th>出席地點</th>
                <th>主持人</th>
                <th>聯絡人姓名</th>
                <th>連絡人電話</th>
                <th>我方出席人員</th>
                <th>結果</th>
                <th>狀態</th>
                <th>建立時間</th>
              </tr>
            </thead>
            <tbody>
              {currentRecord.mediations.map(item => (
                <tr key={`crmd_${item.id}`}>
                  <td>
                    <Button
                      size='sm'
                      color='light'
                      onClick={e => showMediationEditModal(item.id)}>
                      {item.id}
                    </Button>
                  </td>

                  <td> {moment(item.close_date).format('YYYY-MM-DD')}</td>
                  <td> {moment(item.o_case_date).format('YYYY-MM-DD')} </td>
                  <td>{item.o_case_id}</td>

                  <td>
                    {' '}
                    {moment(item.req_date).format('YYYY-MM-DD HH:mm:ss')}
                  </td>
                  <td>{item.req_place}</td>
                  <td>{item.o_staff}</td>
                  <td>{item.o_contact}</td>
                  <td>{item.o_phone}</td>
                  <td>{item.representative}</td>
                  <td>{item.note}</td>
                  <td>{config_status[item.status]}</td>

                  <td>
                    {' '}
                    {moment(item.create_time).format('YYYY-MM-DD HH:mm:ss')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
      )}

      <Row className='mt-2'>
        <Col sm={12}>
          <hr />
          <Link className='btn btn-secondary mr-2' to='/offline/cpl_case/home'>
            回消保列表
          </Link>
          {currentRecord.status === '2' && (
            <Button color='info' type='button' onClick={e => changeStatus(5)}>
              無共識
            </Button>
          )}

          {currentRecord.status === '3' && (
            <Button
              color='dark'
              type='button'
              onClick={e => setMdModal(!mdModal)}>
              新增協調會紀錄
            </Button>
          )}

          {(currentRecord.status === '2' || currentRecord.status === '5') && (
            <Button
              color='warning'
              type='button'
              onClick={e => changeStatus(3)}>
              進入消保協調開會程序
            </Button>
          )}

          {(currentRecord.status === '2' || currentRecord.status === '3') && (
            <Button
              color='success'
              type='button'
              onClick={e => changeStatus(4)}>
              結案
            </Button>
          )}

          <Button color='danger' type='button' onClick={submitDelete}>
            <i className='mdi mdi-trash-can-outline' />
            刪除本案
          </Button>
        </Col>
      </Row>

      <Row className='mb-2'>
        <Col lg={12}>
          <Modal isOpen={mdModal} toggle={e => setMdModal(!mdModal)}>
            <ModalHeader toggle={e => setMdModal(!mdModal)}>編輯</ModalHeader>
            <ModalBody>
              <MediationForm
                selectedMediation={selectedMediation}
                case_id={record_id}
                onEditMediation={onEditMediation}
                onDeleteMediation={onDeleteMediation}
                errors={errors}
              />
            </ModalBody>
          </Modal>
        </Col>
      </Row>
    </Fragment>
  );
};

CplCaseView.propTypes = {};

const mapStateToProps = state => ({
  error: state.OfflineCs.error,

  config_status: state.OfflineCs.config_status,
  currentRecord: state.OfflineCs.currentRecord
});
export default connect(mapStateToProps, {
  getCurrentRecord,
  editCplReply,
  deleteCplCase,
  moveCplCase,
  editCplMediation,
  deleteCplCaseReply,
  deleteCplMediation,
  editCplRef,
  deleteCplRef,
  addCplAttachment,
  deleteCplAttachment
})(CplCaseView);
