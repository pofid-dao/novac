import React, { Component } from 'react';
import { Card, Breadcrumb, Col, Button, Table, Spin, notification } from 'antd';
import './equity.css';
import staking from '@/service/staking';
import PasswordForm from '@/components/Password';
import utils from '@/common/utils';
import { url } from '@/common/url';
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

class EquityWithdraw extends Component {
  state = {
    datasource: [],
    total: 0,
    loading: false,
    visiblePassword: false,
    ssc: '',
  };

  componentDidMount(): void {
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
        datasource: source,
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

  setVisiblePassword = (f: boolean) => {
    const that = this;
    that.setState({
      visiblePassword: f,
    });
  };

  render() {
    const { datasource, total, visiblePassword } = this.state;

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <p />
          <Card title={i18n.t('pages_equity_withdraw')}>
            <Table
              dataSource={datasource}
              columns={columns}
              pagination={false}
            />
          </Card>
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

export default EquityWithdraw;
