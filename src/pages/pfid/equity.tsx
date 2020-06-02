import React, { Component } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Divider,
  Table,
  Statistic,
  message,
  Spin,
  Pagination,
  Tag,
  notification,
} from 'antd';
import './equity.css';
import staking from '@/service/staking';
import utils from '@/common/utils';
import BigNumber from 'bignumber.js';
import { popup } from '@/service/popup';
import account from '@/service/account';
import { AccountInfo } from '@/model/account';
import PFIDForm from '@/components/PFID';
import PasswordForm from '@/components/Password';
import { url } from '@/common/url';
import i18n from '@/i18n';

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

const columnsWithdraw = [
  {
    title: i18n.t('pages_equity_index'),
    dataIndex: 'index',
    key: 'index',
    width: '15%',
  },
  {
    title: i18n.t('pages_equity_ssc'),
    dataIndex: 'ssc',
    key: 'ssc',
    width: '30%',
  },
  {
    title: i18n.t('pages_equity_amount'),
    dataIndex: 'amount',
    key: 'amount',
    width: '30%',
  },
  {
    title: i18n.t('pages_pfid_my_operation'),
    dataIndex: 'operation',
    key: 'operation',
    width: '15%',
  },
];

const columns = [
  {
    title: i18n.t('pages_equity_index'),
    dataIndex: 'index',
    key: 'index',
    width: '20%',
  },
  {
    title: i18n.t('pages_equity_ssc'),
    dataIndex: 'ssc',
    key: 'ssc',
    width: '20%',
  },
  {
    title: i18n.t('pages_equity_amount'),
    dataIndex: 'amount',
    key: 'amount',
    width: '20%',
  },
  // {
  //   title: i18n.t('pages_equity_time'),
  //   dataIndex: 'time',
  //   key: 'time',
  //   width: '20%',
  // },
  {
    title: i18n.t('pages_equity_state'),
    dataIndex: 'state',
    key: 'state',
    width: '20%',
  },
  // {
  //   title: 'Fee(PFID)',
  //   dataIndex: 'fee',
  //   key: 'fee',
  //   width:'10%'
  // },
  // {
  //   title: 'SSC',
  //   dataIndex: 'ssc',
  //   key: 'ssc',
  //   width:'10%'
  // },
  // {
  //   title: 'Time',
  //   dataIndex: 'time',
  //   key: 'time',
  //   width:'20%'
  // },
  // {
  //   title: 'Operation',
  //   dataIndex: 'operation',
  //   key: 'operation',
  //   width:'10%'
  // },
];

let equityTimerId: any = null;

class Equity extends Component {
  state = {
    visible: false,
    datasource: [],
    total: 0,
    pageNo: 1,
    pageSize: 100,
    stakingBalance: 0,
    balance: 0,
    expect: 0,
    loading: false,
    fee: 0,

    visiblePassword: false,
    index: 0,
    devidendList: [],

    datasourceWithdraw: [],
    totalWithdraw: 0,
    ssc: '',
  };

  componentDidMount(): void {
    const that = this;

    that
      .getShareList(this)
      .then(() => {})
      .catch(err => {
        message.error(err);
        that.setState({
          loading: false,
        });
      });

    that.getStakingBalance();

    that.dividendList();
    // if(equityTimerId == null){
    //   equityTimerId = setInterval(function () {
    //     that
    //       .getShareList(that)
    //       .then(() => {})
    //       .catch(err => {
    //         message.error(err);
    //       });
    //     that.getStakingBalance();
    //   },10 * 1000)
    // }

    that
      .mySSCWithDraw()
      .then(() => {
        that.setState({
          loading: false,
        });
      })
      .catch(e => {
        const err = typeof e == 'string' ? e : e.message;
        notify('error', 'Error', err);
        that.setState({
          loading: false,
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
      if (rest && rest.Balance) {
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

  dividendList() {
    const that = this;
    staking.allSSC().then((rest: any) => {
      that.setState({
        devidendList: JSON.parse(rest),
      });
    });
  }

  async getShareList(that: any): Promise<any> {
    that.setState({
      loading: true,
    });

    const offset = (that.state.pageNo - 1) * that.state.pageSize;
    const rest: any = await staking.myPageShare(offset, that.state.pageSize);

    const total = rest.total;
    if (total > 0) {
      let i = 0;
      let tmp: any = [];
      let sscMap: Map<string, any> = new Map<string, any>();
      for (let data of rest.data) {
        const sscs: Array<any> = data.sscs;
        for (let i = 0; i < sscs.length; i++) {
          const ssc = sscs[i];
          const amount = ssc.amount;
          const sscName = ssc.sscName;
          const decimal = await utils.getDecimal(sscName);
          const value = utils.toValue(amount, decimal).toString(10);
          const key = [sscName, data.shareIndex].join('_');
          let mvalue = {
            data: data,
            value: value,
          };
          if (sscMap.has(key)) {
            let org = sscMap.get(key);
            org.value = new BigNumber(org.value).plus(value).toString(10);
            sscMap.set(key, org);
          } else {
            sscMap.set(key, mvalue);
          }
        }
      }

      for (let [k, mvalue] of sscMap) {
        tmp.push({
          index: ++i,
          ssc: k.split('_')[0],
          amount: new BigNumber(mvalue.value).toFixed(4),
          time: utils.formatTime(mvalue.data.endTime * 1000),
          state: mvalue.data.valid
            ? i18n.t('state_ssc_valid')
            : i18n.t('state_ssc_finished'),
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
    });
    setTimeout(function() {
      that
        .getShareList(that)
        .then()
        .catch(e => {
          that.setState({
            loading: false,
          });
        });
    }, 10);
  };

  async mySSCWithDraw(): Promise<any> {
    const that = this;
    that.setState({
      loading: true,
    });
    const rest: any = await staking.mySSCWithDraw();
    console.log('mySSCWithDraw>> ', rest);
    const datas = JSON.parse(rest);
    if (datas.length > 0) {
      let source = [];
      let i = 0;
      for (let data of datas) {
        const decimal = await utils.getDecimal(data.sscName);
        const amount = utils.toValue(data.amount, decimal);
        source.push({
          index: ++i,
          amount: amount.toString(10),
          ssc: data.sscName,
          operation:
            amount.toNumber() > 0 ? (
              <Button
                type={'primary'}
                onClick={() => that.onWithdraw(data.sscName)}
              >
                {i18n.t('button_withdraw')}
              </Button>
            ) : (
              ''
            ),
        });
      }
      that.setState({
        datasourceWithdraw: source,
      });
    }
  }

  onWithdraw(name: string) {
    this.setState({
      ssc: name,
      visiblePassword: true,
    });
  }

  onCreateWithdraw = (values: any) => {
    const that = this;
    const { ssc } = that.state;
    that.setState({
      visiblePassword: false,
      loading: true,
    });
    staking
      .withDrawSSC(ssc, values['password'])
      .then(rest => {
        that.setState({
          loading: false,
        });
        notify('success', 'SUCCESS', rest);
      })
      .catch(e => {
        const err = typeof e == 'string' ? e : e.message;
        notify('error', 'Error', err);
      });
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
      datasourceWithdraw,
      devidendList,
    } = this.state;

    console.log('devidendList>>> ', devidendList);

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
            title={
              <span className={'equity-span'}>
                {i18n.t('pages_equity_dividendList')}
              </span>
            }
          >
            <div>
              {devidendList
                ? devidendList.map(value => (
                    <Tag className={'tag-cst'}>{value}</Tag>
                  ))
                : ''}
            </div>
          </Card>
          <p />
          <Card
            title={i18n.t('equity_withdraw_list')}
            style={{ height: 'auto' }}
          >
            <div
              style={{
                maxHeight: document.documentElement.clientHeight * 0.4,
                overflowY: 'scroll',
              }}
            >
              <Table
                dataSource={datasourceWithdraw}
                columns={columnsWithdraw}
                pagination={false}
              />
            </div>
          </Card>
          <p />
          <Card
            title={i18n.t('pages_equity_dividendRecords')}
            style={{ height: 'auto' }}
          >
            <div
              style={{
                maxHeight: document.documentElement.clientHeight * 0.6,
                overflowY: 'scroll',
              }}
            >
              <Table
                dataSource={datasource}
                columns={columns}
                pagination={false}
              />
            </div>
          </Card>

          <PasswordForm
            visible={visiblePassword}
            onCreate={this.onCreateWithdraw}
            onCancel={() => {
              this.setVisiblePassword(false);
            }}
            title={i18n.t('menus_equity')}
          />
        </Spin>
      </div>
    );
  }
}

function showTotal(total: any) {
  return `Total ${total} items`;
}

export default Equity;
