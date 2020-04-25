import React, { Component } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Divider,
  Table,
  Statistic,
  Descriptions,
  message,
  Spin,
  Pagination,
  notification,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './my.css';
import staking from '@/service/staking';
import utils from '@/common/utils';
import BigNumber from 'bignumber.js';
import { popup } from '@/service/popup';
import account from '@/service/account';
import { AccountInfo } from '@/model/account';
import PFIDForm from '@/components/PFID';
import PasswordForm from '@/components/Password';
import i18n from '../../i18n';

const notify = (type: string, message: string, desc: string) => {
  let d = 4.5;
  if (type == 'success' && desc && !desc.startsWith('0x')) {
    type = 'error';
    message = 'Error';
  }
  // @ts-ignore
  notification[type]({
    message: message,
    description: (
      <p
        style={{
          wordBreak: 'normal',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        }}
      >
        {desc}
      </p>
    ),
    duration: d,
    // placement: 'bottomRight',
    // bottom: 50,
  });
};

const { Countdown } = Statistic;
const columns = [
  {
    title: i18n.t('pages_pfid_my_index'),
    dataIndex: 'index',
    key: 'index',
    width: '10%',
  },
  {
    title: i18n.t('pages_pfid_my_cycle'),
    dataIndex: 'cycle',
    key: 'cycle',
    width: '15%',
  },
  {
    title: i18n.t('pages_pfid_my_state'),
    dataIndex: 'state',
    key: 'state',
    width: '15%',
  },
  {
    title: i18n.t('pages_pfid_my_staking'),
    dataIndex: 'staking',
    key: 'staking',
    width: '15%',
  },
  {
    title: i18n.t('pages_pfid_my_received'),
    dataIndex: 'received',
    key: 'received',
    width: '15%',
  },
  {
    title: i18n.t('pages_pfid_my_time'),
    dataIndex: 'time',
    key: 'time',
    width: '20%',
  },
  {
    title: i18n.t('pages_pfid_my_operation'),
    dataIndex: 'operation',
    key: 'operation',
    width: '10%',
  },
];

let myPfidTimerId: any = null;
class MyPfid extends Component {
  state = {
    visible: false,
    datasource: [],
    total: 0,
    pageNo: 1,
    pageSize: 5,
    stakingBalance: 0,
    balance: 0,
    expect: 0,
    loading: false,
    fee: 0,

    visiblePassword: false,
    index: 0,
    editAmount: false,
    amount: 0,
    minStakingValue: 0,
  };

  componentDidMount(): void {
    const that = this;
    that.setState({
      loading: true,
    });
    that
      .getShareList(that)
      .then(() => {})
      .catch(e => {
        that.setState({
          loading: false,
        });
        const err = typeof e === 'string' ? e : e.message;
        notify('error', 'Error', err);
      });
    that.getStakingBalance();
    that.devidendList();
    that.minStakingValue();

    if (myPfidTimerId == null) {
      myPfidTimerId = setInterval(function() {
        that
          .getShareList(that)
          .then(() => {})
          .catch(e => {
            const err = typeof e === 'string' ? e : e.message;
            notify('error', 'Error', err);
          });
        that.getStakingBalance();
        that.devidendList();
        that.minStakingValue();
      }, 10 * 1000);
    }
  }

  minStakingValue() {
    const that = this;
    staking.minStakingValue().then(rest => {
      console.log('rest>>> ', rest);
      that.setState({
        minStakingValue: utils.toValue(rest, 18).toString(10),
      });
    });
  }

  getStakingBalance() {
    const that = this;
    staking.stakingBalance().then((balance: BigNumber) => {
      that.setState({
        stakingBalance: utils.toValue(balance.toString(10), 18).toString(10),
      });
    });

    const act: AccountInfo = account.getCurrent();
    popup.getAccount(act.PK).then((rest: any) => {
      if (rest && rest.Balance && rest.Balance.get('PFID')) {
        that.setState({
          balance: utils.toValue(rest.Balance.get('PFID'), 18).toString(10),
        });
      }
    });
  }

  expect = (phase: number, amount: any) => {
    const that = this;
    staking.getInterest(phase).then(rest => {
      that.setState({
        expect: new BigNumber(rest)
          .multipliedBy(new BigNumber(amount))
          .dividedBy(new BigNumber(10).pow(10))
          .toString(10),
      });
    });
  };

  devidendList() {
    staking.allSSC().then(rest => {
      console.log(rest);
    });
  }

  async getShareList(that: any): Promise<any> {
    let tmp = [];
    const offset = (that.state.pageNo - 1) * that.state.pageSize;
    const rest: any = await staking.myPageShare(offset, that.state.pageSize);
    console.log('rest>>>>> ', rest);
    const total = rest.total;
    if (total > 0) {
      let i = 0;
      for (let data of rest.data) {
        // const sscs:Array<any> = data.sscs;
        // let sscArr = [];
        // for(let i=0;i<sscs.length;i++){
        //   const ssc = sscs[i];
        //   const amount = ssc.amount;
        //   const sscName = ssc.sscName;
        //   const decimal = await utils.getDecimal(sscName)
        //   sscArr.push(<div><Statistic title={sscName} value={utils.toValue(amount,decimal).toString(10)}/></div>)
        // }

        const reStakingAmount = utils.toValue(
          new BigNumber(data.value)
            .plus(
              new BigNumber(data.value)
                .multipliedBy(new BigNumber(data.interest))
                .dividedBy(new BigNumber(10).pow(data.interestDecimals)),
            )
            .toString(10),
          18,
        );
        const btns = (
          <div>
            <Button
              type={'link'}
              onClick={() => that.onWithdraw(data.shareIndex)}
            >
              {i18n.t('button_withdraw')}
            </Button>
            <Button
              type={'link'}
              onClick={() =>
                that.onReStaking(data.shareIndex, reStakingAmount.toString(10))
              }
            >
              {i18n.t('button_reinvet')}
            </Button>
          </div>
        );

        let opHtml: any = '';
        if (new Date().getTime() / 1000 > data.endTime && data.valid) {
          opHtml = btns;
        } else {
          if (data.valid) {
            opHtml = (
              <Countdown
                title={i18n.t('button_withdraw')}
                value={data.endTime * 1000}
              />
            );
          } else {
            opHtml = i18n.t('state_finished');
          }
        }

        tmp.push({
          index: ++i,
          cycle: data.stakingDays,
          state: data.valid ? i18n.t('state_valid') : i18n.t('state_finished'),
          staking: utils.toValue(data.value, 18).toString(10),
          received: utils
            .toValue(
              new BigNumber(data.value)
                .multipliedBy(new BigNumber(data.interest))
                .dividedBy(new BigNumber(10).pow(data.interestDecimals))
                .toString(10),
              18,
            )
            .toString(10),
          fee: new BigNumber(data.fee)
            .multipliedBy(new BigNumber(data.value))
            .multipliedBy(new BigNumber(data.interest))
            .dividedBy(new BigNumber(10).pow(18 + data.interestDecimals))
            .dividedBy(100)
            .toString(10),
          // ssc:sscArr,
          time: (
            <Descriptions column={1}>
              <Descriptions.Item label={i18n.t('pages_pfid_started_at')}>
                {utils.formatTime(data.startTime * 1000)}
              </Descriptions.Item>
              {data.withDrawTime == 0 ? (
                ''
              ) : (
                <Descriptions.Item label={i18n.t('pages_pfid_withdraw_at')}>
                  {utils.formatTime(data.withDrawTime * 1000)}
                </Descriptions.Item>
              )}
            </Descriptions>
          ),
          operation: opHtml,
        });
      }
      that.setState({
        datasource: tmp,
        total: total,
        loading: false,
      });
    }
    that.setState({
      loading: false,
    });
    return new Promise(resolve => resolve);
  }

  onStaking() {
    const that = this;
    that.setState({
      editAmount: false,
      amount: 0,
      visible: true,
    });
  }

  onReStaking(index: number, amount: any) {
    const that = this;
    that.setState({
      editAmount: true,
      amount: amount,
      index: index,
      visible: true,
    });
  }

  onWithdraw(index: number) {
    this.setState({
      index: index,
      visiblePassword: true,
    });
  }

  onCreateWithdraw = (values: any) => {
    const that = this;
    that.setState({
      visiblePassword: false,
      loading: true,
    });
    staking
      .withDrawShare(that.state.index, values['password'])
      .then(rest => {
        that.setState({
          loading: false,
        });
        notify('success', 'SUCCESS', rest);
      })
      .catch(e => {
        that.setState({
          loading: false,
        });
        const err = typeof e === 'string' ? e : e.message;
        notify('error', 'Error', err);
      });
  };

  onCreate = (values: any) => {
    const that = this;
    const { index, editAmount } = this.state;
    const cycle = values['cycle'];
    that.setState({
      visible: false,
      loading: true,
    });

    if (!!editAmount) {
      staking
        .reStaking(index, cycle, values['password'])
        .then(rest => {
          notify('success', 'SUCCESS', rest);
          that.setState({
            loading: false,
          });
        })
        .catch(e => {
          that.setState({
            loading: false,
          });
          const err = typeof e === 'string' ? e : e.message;
          notify('error', 'Error', err);
        });
    } else {
      const amount = values['amount'];
      staking
        .staking(
          parseInt(cycle),
          utils.fromValue(amount, 18),
          values['password'],
        )
        .then(rest => {
          console.log(rest);
          that.setState({
            loading: false,
          });
          notify('success', 'SUCCESS', rest);
        })
        .catch(e => {
          that.setState({
            loading: false,
          });
          const err = typeof e === 'string' ? e : e.message;
          notify('error', 'Error', err);
        });
    }
  };

  setVisible = (f: boolean) => {
    const that = this;
    if (f) {
      staking.fee().then((rest: any) => {
        that.setState({
          visible: f,
          fee: rest.toString(10),
        });
      });
    } else {
      that.setState({
        visible: f,
      });
    }
  };

  setVisiblePassword = (f: boolean) => {
    const that = this;
    that.setState({
      visiblePassword: f,
    });
  };

  pageChange = (no: number) => {
    const that = this;
    that.setState({
      pageNo: no,
      loading: true,
    });
    setTimeout(function() {
      that
        .getShareList(that)
        .then()
        .catch(() => {
          that.setState({
            loading: false,
          });
        });
    }, 10);
  };

  render() {
    const {
      visible,
      datasource,
      stakingBalance,
      balance,
      expect,
      fee,
      total,
      pageNo,
      pageSize,
      visiblePassword,
      editAmount,
      amount,
      minStakingValue,
    } = this.state;

    const params = {
      editAmount: editAmount,
      amount: amount,
      minStakingValue: minStakingValue,
      balance: balance,
    };
    return (
      <div>
        <Spin spinning={this.state.loading}>
          <p />
          <Row className={'pfid-balance'}>
            <Col span={6}>
              <span>PFID</span>
            </Col>
            <Col span={10}>
              <span>{i18n.t('pages_pfid_balance')}: </span>
              <span>{balance}</span>
            </Col>
            <Col span={8} style={{ textAlign: 'right' }}>
              <span>{i18n.t('pages_pfid_stakingPool')}: </span>
              <span>{stakingBalance}</span>
            </Col>
          </Row>
          <Divider dashed />
          <Card
            title={i18n.t('pages_pfid_my_stakingRecord')}
            extra={
              <Button
                type={'primary'}
                onClick={() => {
                  this.onStaking();
                }}
              >
                <PlusOutlined />
                {i18n.t('button_goStaking')}
              </Button>
            }
            style={{ width: '100%' }}
          >
            <Table
              dataSource={datasource}
              columns={columns}
              pagination={false}
            />
            <div
              style={{ position: 'relative', float: 'right', padding: '15px' }}
            >
              <Pagination
                size="small"
                total={total}
                defaultCurrent={1}
                current={pageNo}
                pageSize={pageSize}
                onChange={this.pageChange}
                showTotal={showTotal}
              />
            </div>
          </Card>
          <PFIDForm
            visible={visible}
            onCreate={this.onCreate}
            onCancel={() => {
              this.setVisible(false);
            }}
            onExpect={this.expect}
            expect={expect}
            fee={fee}
            params={params}
          />
          <PasswordForm
            visible={visiblePassword}
            onCreate={this.onCreateWithdraw}
            onCancel={() => {
              this.setVisiblePassword(false);
            }}
            title={i18n.t('button_withdraw')}
          />
        </Spin>
      </div>
    );
  }
}

function showTotal(total: any) {
  return `Total ${total} items`;
}

export default MyPfid;
