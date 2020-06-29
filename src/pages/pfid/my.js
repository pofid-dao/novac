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
import PFIDForm from '@/components/PFID';
import PasswordForm from '@/components/Password';
import i18n from '../../i18n';
const notify = (type, message, desc) => {
  let d = 4.5;
  if (type == 'success' && desc && !desc.startsWith('0x')) {
    type = 'error';
    message = 'Error';
  }
  // @ts-ignore
  notification[type]({
    message: message,
    description: React.createElement(
      'p',
      {
        style: {
          wordBreak: 'normal',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
        },
      },
      desc,
    ),
    duration: d,
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
  // {
  //   title: i18n.t('pages_myssc_no'),
  //   dataIndex: 'no',
  //   key: 'no',
  //   width: '5%',
  // },
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
let myPfidTimerId = null;
class MyPfid extends Component {
  constructor() {
    super(...arguments);
    this.state = {
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
    this.expect = (phase, amount) => {
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
    this.onCreateWithdraw = values => {
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
    this.onCreate = values => {
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
    this.setVisible = f => {
      const that = this;
      if (f) {
        staking.fee().then(rest => {
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
    this.setVisiblePassword = f => {
      const that = this;
      that.setState({
        visiblePassword: f,
      });
    };
    this.pageChange = no => {
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
  }
  componentDidMount() {
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
    staking.stakingBalance().then(balance => {
      that.setState({
        stakingBalance: utils.toValue(balance.toString(10), 18).toString(10),
      });
    });
    const act = account.getCurrent();
    popup.getAccount(act.PK).then(rest => {
      if (rest && rest.Balance && rest.Balance.get('PFID')) {
        that.setState({
          balance: utils.toValue(rest.Balance.get('PFID'), 18).toString(10),
        });
      }
    });
  }
  devidendList() {
    staking.allSSC().then(rest => {
      console.log(rest);
    });
  }
  async getShareList(that) {
    let tmp = [];
    const offset = (that.state.pageNo - 1) * that.state.pageSize;
    const rest = await staking.myPageShare(offset, that.state.pageSize);
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
        const btns = React.createElement(
          'div',
          null,
          React.createElement(
            Button,
            { type: 'link', onClick: () => that.onWithdraw(data.shareIndex) },
            i18n.t('button_withdraw'),
          ),
          React.createElement(
            Button,
            {
              type: 'link',
              onClick: () =>
                that.onReStaking(data.shareIndex, reStakingAmount.toString(10)),
            },
            i18n.t('button_reinvet'),
          ),
        );
        let opHtml = '';
        if (new Date().getTime() / 1000 > data.endTime && data.valid) {
          opHtml = btns;
        } else {
          if (data.valid) {
            opHtml = React.createElement(Countdown, {
              title: i18n.t('button_withdraw'),
              value: data.endTime * 1000,
              format: i18n.t('countdownFormat'),
              valueStyle: { fontSize: '16px' },
            });
          } else {
            opHtml = i18n.t('state_finished');
          }
        }
        tmp.push({
          index: ++i,
          no: data.shareIndex + 100000,
          cycle: data.stakingDays + ' ' + i18n.t('pages_pfid_my_cycle_days'),
          state: data.valid ? i18n.t('state_valid') : i18n.t('state_finished'),
          staking: utils.toValue(data.value, 18).toString(10) + ' PFID',
          received:
            utils
              .toValue(
                new BigNumber(data.value)
                  .multipliedBy(new BigNumber(data.interest))
                  .dividedBy(new BigNumber(10).pow(data.interestDecimals))
                  .toString(10),
                18,
              )
              .toString(10) + ' PFID',
          fee:
            new BigNumber(data.fee)
              .multipliedBy(new BigNumber(data.value))
              .multipliedBy(new BigNumber(data.interest))
              .dividedBy(new BigNumber(10).pow(18 + data.interestDecimals))
              .dividedBy(100)
              .toString(10) + ' PFID',
          // ssc:sscArr,
          time: React.createElement(
            Descriptions,
            { column: 1 },
            React.createElement(
              Descriptions.Item,
              { label: i18n.t('pages_pfid_started_at') },
              utils.formatTime(data.startTime * 1000),
            ),
            data.withDrawTime == 0
              ? ''
              : React.createElement(
                  Descriptions.Item,
                  { label: i18n.t('pages_pfid_withdraw_at') },
                  utils.formatTime(data.withDrawTime * 1000),
                ),
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
  onReStaking(index, amount) {
    const that = this;
    that.setState({
      editAmount: true,
      amount: amount,
      index: index,
      visible: true,
    });
  }
  onWithdraw(index) {
    this.setState({
      index: index,
      visiblePassword: true,
    });
  }
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
    return React.createElement(
      'div',
      null,
      React.createElement(
        Spin,
        { spinning: this.state.loading },
        React.createElement('p', null),
        React.createElement(
          Row,
          { className: 'pfid-balance' },
          React.createElement(
            Col,
            { span: 6 },
            React.createElement('span', null, 'PFID'),
          ),
          React.createElement(
            Col,
            { span: 10 },
            React.createElement(
              'span',
              null,
              i18n.t('pages_pfid_balance'),
              ': ',
            ),
            React.createElement('span', null, balance),
          ),
          React.createElement(
            Col,
            { span: 8, style: { textAlign: 'right' } },
            React.createElement(
              'span',
              null,
              i18n.t('pages_pfid_stakingPool'),
              ': ',
            ),
            React.createElement('span', null, stakingBalance),
          ),
        ),
        React.createElement(Divider, { dashed: true }),
        React.createElement(
          Card,
          {
            title: i18n.t('pages_pfid_my_stakingRecord'),
            extra: React.createElement(
              Button,
              {
                type: 'primary',
                onClick: () => {
                  this.onStaking();
                },
              },
              React.createElement(PlusOutlined, null),
              i18n.t('button_goStaking'),
            ),
            style: { width: '100%' },
          },
          React.createElement(Table, {
            dataSource: datasource,
            columns: columns,
            pagination: false,
          }),
          React.createElement(
            'div',
            {
              style: { position: 'relative', float: 'right', padding: '15px' },
            },
            React.createElement(Pagination, {
              size: 'small',
              total: total,
              defaultCurrent: 1,
              current: pageNo,
              pageSize: pageSize,
              onChange: this.pageChange,
              showTotal: showTotal,
            }),
          ),
        ),
        React.createElement(PFIDForm, {
          visible: visible,
          onCreate: this.onCreate,
          onCancel: () => {
            this.setVisible(false);
          },
          onExpect: this.expect,
          expect: expect,
          fee: fee,
          params: params,
        }),
        React.createElement(PasswordForm, {
          visible: visiblePassword,
          onCreate: this.onCreateWithdraw,
          onCancel: () => {
            this.setVisiblePassword(false);
          },
          title: i18n.t('button_withdraw'),
        }),
      ),
    );
  }
}
function showTotal(total) {
  return `Total ${total} items`;
}
export default MyPfid;
//# sourceMappingURL=my.js.map
