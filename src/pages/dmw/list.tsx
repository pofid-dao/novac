import React, { Component } from 'react';
import { Col, Row, Tabs, Divider, message, Tag } from 'antd';
import './list.css';
import DissentCreateForm from '@/components/Dissent';
import CreateSSCForm from '@/components/CreateSSC';
import dmwBase from '@/service/dmwBase';
import i18n from '@/i18n';

const { TabPane } = Tabs;

class DmwList extends Component {
  state = {
    visible: false,
    visibleSSC: false,

    list: [],
    loading: true,
    panes: [],
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
    let list = JSON.parse(rest);
    console.log('list>>>>>>> ', list);

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
            </Col>
            <Col span={4} style={{ textAlign: 'center' }}>
              {/*<Button type={"primary"} size={"large"} onClick={()=>{this.setVisible(true)}}>Dissent it</Button>*/}
            </Col>
          </Row>
          {/*<Row>*/}
          {/*  <Col>*/}
          {/*    <Button type={'default'} size={'large'}>*/}
          {/*      DMW Source*/}
          {/*    </Button>*/}
          {/*    <Divider type={'vertical'} />*/}
          {/*    <Button type={'default'} size={'large'}>*/}
          {/*      VM Source*/}
          {/*    </Button>*/}
          {/*    <Divider type={'vertical'} />*/}
          {/*    <StarFilled />*/}
          {/*  </Col>*/}
          {/*</Row>*/}
          <Divider dashed />
          <p>
            <h2>
              {i18n.t('pages_dmw_stableCoin')} {key} DMW
            </h2>
          </p>
          <p>
            {coinsx}
            {/*<Button type={"primary"} size={"large"}>USRO</Button>*/}
            {/*<Divider type={"vertical"} />*/}
            {/*<Button type={"primary"} size={"large"}>ESRO</Button>*/}
            {/*<Divider type={"vertical"} />*/}
            {/*<Button type={"default"} size={"large"} onClick={()=>{this.setVisibleSSC(true)}}>CREATE NEW SSC</Button>*/}
          </p>
        </TabPane>,
      );
    }

    this.setState({
      panes: panes,
    });
  }

  onCreate = (values: any) => {
    this.setState({
      visible: false,
    });
  };

  setVisible = (f: boolean) => {
    this.setState({
      visible: f,
    });
  };

  onCreateSSC = (values: any) => {
    this.setState({
      visibleSSC: false,
    });
  };

  setVisibleSSC = (f: boolean) => {
    this.setState({
      visibleSSC: f,
    });
  };

  render() {
    const { visible, visibleSSC, panes } = this.state;

    return (
      <div>
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
        <CreateSSCForm
          visible={visibleSSC}
          onCreate={this.onCreateSSC}
          onCancel={() => {
            this.setVisibleSSC(false);
          }}
        />
      </div>
    );
  }
}

export default DmwList;
