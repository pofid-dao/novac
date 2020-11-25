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
import dmwBase from '@/service/dmwBaseV2';
import i18n from '@/i18n';
import { storage } from '@/common/storage';
import AddExchangeForm from '@/components/AddExchange';
const { TabPane } = Tabs;
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
class DmwList extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      visible: false,
      visibleExchange: false,
      list: [],
      loading: true,
      panes: [],
      backedCoin: '',
    };
    this.onCreate = values => {
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
    };
    this.setVisible = f => {
      this.setState({
        visible: f,
      });
    };
    this.onCreateExchange = values => {
      const that = this;
      const { backedCoin } = this.state;
      this.setState({
        visibleExchange: false,
        loading: true,
      });
      console.info('values>>', values);
      dmwBase
        .addExchange(backedCoin, values['name'], values['password'])
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
    };
    this.setvisibleExchange = f => {
      this.setState({
        visibleExchange: f,
      });
    };
  }
  componentDidMount() {
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
    const rest = await dmwBase.getTradingPairs();
    console.info('rest>>', rest);
    let list = JSON.parse(rest);
    let dataMap = new Map();
    for (let i = 0; i < list.length; i++) {
      const data = list[i];
      const key = data.backeCoin;
      let value = data;
      if (dataMap.has(key)) {
        let org = dataMap.get(key);
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
        coinsx.push(
          React.createElement(Tag, { className: 'tag-cst' }, data.mintCoin),
        );
      }
      let exchanges = [];
      for (let data of datas) {
        const exchgs = data.exchanges;
        for (let ex of exchgs) {
          if (exchanges.indexOf(ex.name) > -1) {
          } else {
            exchanges.push(ex.name);
          }
        }
      }
      let bkEX = [];
      exchanges.forEach(name => {
        bkEX.push(React.createElement(Tag, { className: 'tag-cst' }, name));
      });
      panes.push(
        React.createElement(
          TabPane,
          { tab: key, key: key + i },
          React.createElement(
            Row,
            null,
            React.createElement(
              Col,
              { span: 20 },
              React.createElement('h2', null, key),
              React.createElement('p', null, datas[0].description),
              React.createElement(
                'p',
                null,
                i18n.t('pages_dmw_collateralizationRatio'),
                ':',
                React.createElement(
                  'strong',
                  null,
                  datas[0].collateralRate,
                  '%',
                ),
              ),
              React.createElement(
                'p',
                null,
                i18n.t('pages_dmw_liquidationRatio'),
                ':',
                ' ',
                React.createElement(
                  'strong',
                  null,
                  datas[0].thresholdRate,
                  '%',
                ),
              ),
              React.createElement(
                'p',
                null,
                i18n.t('pages_dmw_vmDataSource'),
                ':',
              ),
              React.createElement('p', { style: { color: '#161796' } }, bkEX),
              datas[0].ownsBackedCoin
                ? React.createElement(
                    Button,
                    {
                      type: 'primary',
                      size: 'small',
                      onClick: () => {
                        this.setExchange(key);
                      },
                    },
                    i18n.t('addExchange'),
                  )
                : '',
            ),
            React.createElement(
              Col,
              { span: 4, style: { textAlign: 'center' } },
              datas[0].ownsBackedCoin
                ? React.createElement(
                    Button,
                    {
                      type: 'primary',
                      size: 'large',
                      onClick: () => {
                        this.setDesc(key);
                      },
                    },
                    i18n.t('updateDesc'),
                  )
                : '',
            ),
          ),
          React.createElement(Divider, { dashed: true }),
          React.createElement(
            'p',
            null,
            React.createElement(
              'h2',
              null,
              i18n.t('pages_dmw_stableCoin'),
              ' ',
              key,
              ' PV',
            ),
          ),
          React.createElement('p', null, coinsx),
        ),
      );
    }
    this.setState({
      panes: panes,
    });
  }
  setDesc(backedCoin) {
    this.setState({
      backedCoin: backedCoin,
      visible: true,
    });
  }
  setExchange(backedCoin) {
    this.setState({
      backedCoin: backedCoin,
      visibleExchange: true,
    });
  }
  render() {
    const { visible, visibleExchange, panes } = this.state;
    return React.createElement(
      'div',
      null,
      React.createElement(
        Spin,
        { spinning: this.state.loading },
        React.createElement(
          Row,
          { className: 'pfid-title' },
          React.createElement(
            Col,
            { span: 12 },
            React.createElement('span', null, i18n.t('pages_dmw_list')),
          ),
          React.createElement(Col, { span: 12, style: { textAlign: 'right' } }),
        ),
        React.createElement('p', null),
        React.createElement(Tabs, { type: 'card', animated: true }, panes),
        React.createElement(DissentCreateForm, {
          visible: visible,
          onCreate: this.onCreate,
          onCancel: () => {
            this.setVisible(false);
          },
        }),
        React.createElement(AddExchangeForm, {
          visible: visibleExchange,
          onCreate: this.onCreateExchange,
          onCancel: () => {
            this.setvisibleExchange(false);
          },
        }),
      ),
    );
  }
}
export default DmwList;
//# sourceMappingURL=list.js.map
