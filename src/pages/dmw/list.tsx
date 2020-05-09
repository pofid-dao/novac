import React, { Component } from 'react';
import {
  Col,
  Row,
  Tabs,
  Divider,
  message,
  Button,
  Tag,
  Spin,
  notification,
} from 'antd';
import './list.css';
import DissentCreateForm from '@/components/Dissent';
import CreateSSCForm from '@/components/CreateSSC';
import dmwBase from '@/service/dmwBase';
import i18n from '@/i18n';
import { storage } from '@/common/storage';
import AddExchangeForm from '@/components/AddExchange';

const { TabPane } = Tabs;
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

class DmwList extends Component {
  state = {
    visible: false,
    visibleExchange: false,

    list: [],
    loading: true,
    panes: [],
    backedCoin: '',
  };

  componentDidMount(): void {
    const that = this;
    that
      .list()
      .then(() => {
        that.setState({
          loading: false,
        });
      })
      .catch(e => {
        const err = typeof e === 'string' ? e : e.message;
        message.error(err);
        that.setState({
          loading: false,
        });
      });
  }

  async list() {
    const rest: any = await dmwBase.getTradingPairs();
    console.info('rest>>', rest);
    let list = JSON.parse(rest);
    let dataMap: Map<string, any> = new Map<string, any>();
    for (let i = 0; i < list.length; i++) {
      const data: any = list[i];
      const key = data.backeCoin;
      let value = data;
      if (dataMap.has(key)) {
        let org: Array<any> = dataMap.get(key);
        dataMap.set(key, org.concat([value]));
      } else {
        dataMap.set(key, [value]);
      }
    }

    console.log('dataMap>>> ', dataMap);

    const panes = [];
    let i = 0;
    for (let [key, datas] of dataMap) {
      let coinsx = [];
      for (let data of datas) {
        coinsx.push(<Tag className={'tag-cst'}>{data.mintCoin}</Tag>);
      }

      let exchanges: string | any[] = [];
      for (let data of datas) {
        const exchgs = data.exchanges;
        for (let ex of exchgs) {
          if (exchanges.indexOf(ex.name) > -1) {
          } else {
            exchanges.push(ex.name);
          }
        }
      }

      let bkEX: any = [];
      exchanges.forEach((name: any) => {
        bkEX.push(<Tag className={'tag-cst'}>{name}</Tag>);
      });

      panes.push(
        <TabPane tab={key} key={key + i}>
          <Row>
            <Col span={20}>
              <h2>{key}</h2>
              <p>{datas[0].description}</p>
              <p>
                {i18n.t('pages_dmw_collateralizationRatio')}:
                <strong>{datas[0].collateralRate}%</strong>
              </p>
              <p>
                {i18n.t('pages_dmw_liquidationRatio')}:{' '}
                <strong>{datas[0].thresholdRate}%</strong>
              </p>
              <p>{i18n.t('pages_dmw_vmDataSource')}:</p>
              <p style={{ color: '#161796' }}>{bkEX}</p>
              {datas[0].ownsBackedCoin ? (
                <Button
                  type={'primary'}
                  size={'small'}
                  onClick={() => {
                    this.setExchange(key);
                  }}
                >
                  {i18n.t('addExchange')}
                </Button>
              ) : (
                ''
              )}
            </Col>
            <Col span={4} style={{ textAlign: 'center' }}>
              {datas[0].ownsBackedCoin ? (
                <Button
                  type={'primary'}
                  size={'large'}
                  onClick={() => {
                    this.setDesc(key);
                  }}
                >
                  {i18n.t('updateDesc')}
                </Button>
              ) : (
                ''
              )}
            </Col>
          </Row>
          <Divider dashed />
          <p>
            <h2>
              {i18n.t('pages_dmw_stableCoin')} {key} DMW
            </h2>
          </p>
          <p>{coinsx}</p>
        </TabPane>,
      );
    }

    this.setState({
      panes: panes,
    });
  }

  setDesc(backedCoin: any) {
    this.setState({
      backedCoin: backedCoin,
      visible: true,
    });
  }

  setExchange(backedCoin: any) {
    this.setState({
      backedCoin: backedCoin,
      visibleExchange: true,
    });
  }

  onCreate = (values: any) => {
    const that = this;
    const { backedCoin } = this.state;
    this.setState({
      visible: false,
      loading: true,
    });
    dmwBase
      .addDescription(
        backedCoin,
        storage.get(storage.keys.language),
        values['description'],
        values['password'],
      )
      .then((rest: any) => {
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
  };

  setVisible = (f: boolean) => {
    this.setState({
      visible: f,
    });
  };

  onCreateExchange = (values: any) => {
    const that = this;
    const { backedCoin } = this.state;
    this.setState({
      visibleExchange: false,
      loading: true,
    });
    console.info('values>>', values);
    dmwBase
      .addExchange(backedCoin, values['name'], values['password'])
      .then((rest: any) => {
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
  };

  setvisibleExchange = (f: boolean) => {
    this.setState({
      visibleExchange: f,
    });
  };

  render() {
    const { visible, visibleExchange, panes } = this.state;

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Row className={'pfid-title'}>
            <Col span={12}>
              <span>{i18n.t('pages_dmw_list')}</span>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}></Col>
          </Row>
          <p />
          <Tabs type="card" animated>
            {panes}
          </Tabs>
          <DissentCreateForm
            visible={visible}
            onCreate={this.onCreate}
            onCancel={() => {
              this.setVisible(false);
            }}
          />
          <AddExchangeForm
            visible={visibleExchange}
            onCreate={this.onCreateExchange}
            onCancel={() => {
              this.setvisibleExchange(false);
            }}
          />
        </Spin>
      </div>
    );
  }
}

export default DmwList;
