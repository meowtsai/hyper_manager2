import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  CustomInput,
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import PageTitle from '../../../components/PageTitle';
import {
  getGames,
  editVipProduct,
  getCurrentVipProduct,
} from '../../../redux/actions';

// editVipOfferRecord,
//   getCurrentVipOfferRecord
const VipOfferForm = ({
  getGames,
  match,
  editVipProduct,
  getCurrentVipProduct,
  history,
  current_product,
  error,
  updateOKMessage,
}) => {
  const record_id = match.params.product_id ? match.params.product_id : null;
  const mainTitle = 'VIP 方案';
  const act_title = record_id ? '編輯' : '新增';
  const [errors, setErrors] = useState({});
  const [productId, setProductId] = useState('');
  const [title, setTitle] = useState('');
  const [productDesc, setProductDesc] = useState('');
  const [gameId, setGameId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [price, setPrice] = useState(0);
  const [gold, setGold] = useState(0);
  const [isActive, setIsActive] = useState(0);
  useEffect(() => {
    //console.log("record_id", record_id);
    if (record_id) {
      getCurrentVipProduct(record_id, history);
    }
    getGames();

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
    if (current_product.product_id) {
      setProductId(current_product.product_id);
      setGameId(current_product.game_id);
      setTitle(current_product.title);
      setProductDesc(current_product.product_desc);
      setPrice(current_product.price);
      setGold(current_product.gold);
      setStartTime(
        moment(current_product.start_time).format('YYYY-MM-DDTHH:mm')
      );
      setEndTime(moment(current_product.end_time).format('YYYY-MM-DDTHH:mm'));
      setIsActive(current_product.is_active);
    }
  }, [current_product]);

  const formSubmit = (e) => {
    e.preventDefault();
    const action = record_id ? 'edit' : 'add';

    let formatedSDate = moment(startTime).format('YYYY-MM-DD HH:mm:ss');
    if (formatedSDate === 'Invalid date') {
      formatedSDate = null;
    }

    let formatedEDate = moment(endTime).format('YYYY-MM-DD HH:mm:ss');
    if (formatedEDate === 'Invalid date') {
      formatedEDate = null;
    }
    let record = {
      product_id: record_id ? record_id : productId,
      title,
      product_desc: productDesc,
      game_id: gameId,
      price,
      gold,
      is_active: isActive ? '1' : '0',
      start_time: formatedSDate,
      end_time: formatedEDate,
      free_golds: 0,
    };

    //console.log('record', record);
    editVipProduct({ record, action, history });
  };
  return (
    <Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: 'VIP', path: '/vip/offers', active: false },
          { label: mainTitle, path: '/vip/offers/offer_list', active: true },
          {
            label: act_title,
            path: '/vip/offers/edit/:product_id',
            active: true,
          },
        ]}
        title={`${act_title}${mainTitle}`}
      />

      <Row className='mb-2'>
        <Col lg={6}>
          <Card>
            <CardBody>
              <h4 className='mb-3 header-title'>請填寫產品內容</h4>
              {errors.msg && (
                <Alert color='danger' isOpen={errors.msg ? true : false}>
                  <div>{errors.msg}</div>
                </Alert>
              )}
              <Form onSubmit={formSubmit}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='gameId'>遊戲</Label>
                      <Input
                        type='select'
                        name='gameId'
                        id='gameId'
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                        invalid={errors.game_id ? true : false}>
                        <option>請選擇遊戲</option>
                        <option value='h55naxx2tw'>
                          h55naxx2tw - 第五人格
                        </option>
                        <option value='g66naxx2tw'>
                          g66naxx2tw - 明日之後
                        </option>
                      </Input>
                      <FormFeedback>{errors.game_id}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='product_id'>產品ID</Label>
                      {record_id ? (
                        <Input plaintext defaultValue={productId} readOnly />
                      ) : (
                        <Input
                          type='text'
                          name='product_id'
                          id='product_id'
                          value={productId}
                          onChange={(e) => setProductId(e.target.value)}
                          placeholder='產品ID'
                          invalid={errors.product_id ? true : false}
                        />
                      )}

                      <FormFeedback>{errors.product_id}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for='title'>產品名稱</Label>
                      <Input
                        type='text'
                        name='title'
                        id='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        invalid={errors.title ? true : false}
                      />

                      <FormFeedback>{errors.title}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={12}>
                    <FormGroup>
                      <Label for='product_desc'>產品描述</Label>
                      <Input
                        type='text'
                        name='product_desc'
                        id='product_desc'
                        value={productDesc}
                        onChange={(e) => setProductDesc(e.target.value)}
                        placeholder='簡述產品, 例:儲值NTD.3,000，共可獲得7200回聲。'
                        invalid={errors.product_desc ? true : false}
                      />

                      <FormFeedback>{errors.product_desc}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='txtPrice'>價格</Label>
                      <Input
                        type='number'
                        name='txtPrice'
                        id='txtPrice'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        invalid={errors.price ? true : false}
                      />

                      <FormFeedback>{errors.price}</FormFeedback>
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for='txtGold'>遊戲幣</Label>
                      <Input
                        type='number'
                        name='txtGold'
                        id='txtGold'
                        value={gold}
                        onChange={(e) => setGold(e.target.value)}
                        invalid={errors.gold ? true : false}
                      />

                      <FormFeedback>{errors.gold}</FormFeedback>
                    </FormGroup>
                  </Col>
                </Row>

                <Row form>
                  <Col md={12}>
                    <Label for='start_time'>狀態</Label>
                    <CustomInput
                      type='switch'
                      id='activeSwitch'
                      name='activeSwitch'
                      label={
                        isActive === '1' || isActive === true
                          ? '上架中'
                          : '下架'
                      }
                      className='small text-muted'
                      checked={isActive === '1' || isActive === true}
                      onChange={(e) => {
                        setIsActive(e.target.checked);
                      }}
                    />
                  </Col>
                </Row>

                <Row form>
                  <Col md={12}>
                    <h4 className='mt-3 header-title'>指定區間</h4>
                    <p className='small text-muted'>
                      可以僅設定上架起始,
                      但狀態必須是"上架中"才會在指定時間出現在匯款回報頁面喔!
                    </p>
                    <Row form>
                      <Col md={6}>
                        <FormGroup>
                          <Label for='start_time'>上架起始</Label>

                          <Input
                            type='datetime-local'
                            name='start_time'
                            id='start_time'
                            value={moment(startTime).format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => setStartTime(e.target.value)}
                            invalid={errors.start_time ? true : false}
                            max={moment(endTime).format('YYYY-MM-DD')}
                          />
                          <FormFeedback>{errors.start_time}</FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col md={6}>
                        <FormGroup>
                          <Label for='endTime'>上架終止</Label>

                          <Input
                            type='datetime-local'
                            name='endTime'
                            id='endTime'
                            value={moment(endTime).format('YYYY-MM-DDTHH:mm')}
                            onChange={(e) => setEndTime(e.target.value)}
                            invalid={errors.end_time ? true : false}
                            min={moment(startTime).format('YYYY-MM-DD')}
                          />
                          <FormFeedback>{errors.end_time}</FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <hr></hr>
                  </Col>
                </Row>
                {
                  <Alert
                    color='success'
                    isOpen={updateOKMessage !== null ? true : false}>
                    <div>{`  ${act_title} 成功!`} </div>
                  </Alert>
                }

                <Link
                  className='btn btn-secondary mr-2'
                  to='/vip/offers/offer_list'>
                  回列表
                </Link>

                <Button color='primary' type='submit'>
                  確認送出
                </Button>
              </Form>{' '}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Fragment>
  );
};

VipOfferForm.propTypes = {
  games: PropTypes.array,
};

const mapStateToProps = (state) => ({
  games: state.Games.list,
  error: state.VipOffers.errors,
  loading: state.VipOffers.loading,
  current_product: state.VipOffers.current_product,
  updateOKMessage: state.VipOffers.updateOKMessage,
});
export default connect(mapStateToProps, {
  getGames,
  editVipProduct,
  getCurrentVipProduct,
})(VipOfferForm);

//方案id
//遊戲id
//方案標題
//類型
//描述
//金額
//點數
