import React, { Component } from 'react';
import { Card, Button, Table, Spin, notification } from 'antd';
import './equity.css';
import staking from '@/service/staking';
import PasswordForm from '@/components/Password';
import utils from '@/common/utils';
import i18n from '@/i18n';
const columns = [
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
class EquityWithdraw extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      datasource: [],
      total: 0,
      loading: false,
      visiblePassword: false,
      ssc: '',
    };
    this.onCreateWithdraw = values => {
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
    this.setVisiblePassword = f => {
      const that = this;
      that.setState({
        visiblePassword: f,
      });
    };
  }
  componentDidMount() {
    const that = this;
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
  async mySSCWithDraw() {
    const that = this;
    that.setState({
      loading: true,
    });
    const rest = await staking.mySSCWithDraw();
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
            amount.toNumber() > 0
              ? React.createElement(
                  Button,
                  {
                    type: 'primary',
                    onClick: () => that.onWithdraw(data.sscName),
                  },
                  i18n.t('button_withdraw'),
                )
              : '',
        });
      }
      that.setState({
        datasource: source,
      });
    }
  }
  onWithdraw(name) {
    this.setState({
      ssc: name,
      visiblePassword: true,
    });
  }
  render() {
    const { datasource, total, visiblePassword } = this.state;
    return React.createElement(
      'div',
      null,
      React.createElement(
        Spin,
        { spinning: this.state.loading },
        React.createElement('p', null),
        React.createElement(
          Card,
          { title: i18n.t('pages_equity_withdraw') },
          React.createElement(Table, {
            dataSource: datasource,
            columns: columns,
            pagination: false,
          }),
        ),
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
export default EquityWithdraw;
//# sourceMappingURL=equity-withdraw.js.map
