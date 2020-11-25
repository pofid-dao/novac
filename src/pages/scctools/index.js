import React, { Component } from 'react';
import {
  Col,
  Row,
  Button,
  Tabs,
  Descriptions,
  Table,
  Spin,
  notification,
  Tag,
  Pagination,
} from 'antd';
import './index.css';
import utils from '@/common/utils';
import dmw from '@/service/dmw';
import dmwBase from '@/service/dmwBase';
import dmwInfo from '@/service/dmwInfo';
import BorrowForm from '@/components/Borrow';
import DealForm from '@/components/Deal';
import PasswordForm from '@/components/Password';
import BigNumber from 'bignumber.js';
import i18n from '@/i18n';
import coinFactory from '@/service/coinFactory';
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
const columns = [
  // {
  //   title: i18n.t('pages_myssc_index'),
  //   dataIndex: 'index',
  //   key: 'index',
  //   width: '5%',
  // },
  //
  // {
  //   title: i18n.t('pages_myssc_no'),
  //   dataIndex: 'no',
  //   key: 'no',
  //   width: '5%',
  // },
  {
    title: i18n.t('pages_myssc_pledged'),
    dataIndex: 'backedValue',
    key: 'backedValue',
    width: '15%',
  },
  {
    title: i18n.t('pages_myssc_mintCoins'),
    dataIndex: 'mintValue',
    key: 'mintValue',
    width: '15%',
  },
  {
    title: i18n.t('pages_myssc_canClaimtValue'),
    dataIndex: 'canClaimtValue',
    key: 'canClaimtValue',
    width: '10%',
  },
  {
    title: i18n.t('pages_myssc_fee'),
    dataIndex: 'fee',
    key: 'fee',
    width: '10%',
  },
  {
    title: i18n.t('pages_myssc_currentRatio'),
    dataIndex: 'currentratio',
    key: 'currentratio',
    width: '10%',
  },
  {
    title: i18n.t('pages_myssc_status'),
    dataIndex: 'status',
    key: 'status',
    width: '10%',
  },
  {
    title: i18n.t('pages_equity_time'),
    dataIndex: 'time',
    key: 'time',
    width: '20%',
  },
  {
    title: i18n.t('pages_myssc_operation'),
    dataIndex: 'operator',
    key: 'operator',
    width: '10%',
  },
];
function convertStatus(status) {
  if (status === 1) {
    return i18n.t('pages_myssc_normal');
  } else if (status === 2) {
    return i18n.t('pages_myssc_biding');
  } else if (status === 3) {
    return 'UnKnow';
  } else if (status === 4) {
    return 'Unsold';
  } else if (status === 0) {
    return 'Finished';
  }
}
let sscTimerId = null;
class SSCTools extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      visible: false,
      visibleDeal: false,
      visibleAuction: false,
      visibleAuctionPrice: false,
      pageNo: 1,
      pageSize: 10,
      tabs: [],
      backedCoin: '',
      mintCoin: '',
      amount: '',
      fee: '',
      contractIndex: 0,
      loading: false,
      queryOwn: false,
      mintValue: 0,
      subPanes: {},
      panes: {},
      decimals: {},
      selectBackedCoin: '',
      selectMintCoin: '',
      proxy: false,
      minBorrowValue: 0,
      estimatAddDepositAmount: [],
      lastIndex: 0,
      totalSupply: 0,
    };
    this.setVisible = f => {
      this.setState({
        visible: f,
      });
    };
    this.setVisibleDeal = f => {
      this.setState({
        visibleDeal: f,
      });
    };
    this.setVisibleAuction = f => {
      this.setState({
        visibleAuction: f,
      });
    };
    this.setVisibleAuctionPrice = f => {
      this.setState({
        visibleAuctionPrice: f,
      });
    };
    this.estimate = amount => {
      const that = this;
      const { backedCoin, mintCoin } = that.state;
      dmw
        .estimatMintAmount(
          backedCoin,
          mintCoin,
          utils.fromValue(amount, 18).toString(10),
        )
        .then(rest => {
          console.log('estimatMintAmount>>', rest);
          utils.getDecimal(mintCoin).then(d => {
            const amount = utils.toValue(rest[0].toString(10), d).toFixed(8);
            const fee = utils.toValue(rest[1].toString(10), d).toFixed(8);
            that.setState({
              amount: amount,
              fee: fee,
            });
          });
        });
    };
    this.onBorrow = values => {
      const that = this;
      that.setState({
        visible: false,
        loading: true,
      });
      const amount = values['amountes'];
      const { proxy, mintCoin, backedCoin } = that.state;
      dmw
        .issue(
          mintCoin,
          backedCoin,
          utils.fromValue(amount, 18).toString(10),
          values['password'],
          proxy,
        )
        .then(rest => {
          notify('success', 'SUCCESS', rest);
          that.setState({
            loading: false,
            visible: false,
          });
        })
        .catch(e => {
          that.setState({
            loading: false,
          });
          const err = typeof e === 'string' ? e : e.message;
          notify('error', 'Error', err);
        });
    };
    this.onDeal = values => {
      const that = this;
      that.setState({
        visibleDeal: false,
        loading: true,
      });
      const amount = values['amountes'];
      const { contractIndex, mintCoin } = that.state;
      dmw
        .claim(
          contractIndex,
          mintCoin,
          utils.fromValue(amount, 18).toString(10),
          values['password'],
        )
        .then(rest => {
          notify('success', 'SUCCESS', rest);
          that.setState({
            loading: false,
            visibleDeal: false,
          });
        })
        .catch(e => {
          that.setState({
            loading: false,
          });
          const err = typeof e === 'string' ? e : e.message;
          notify('error', 'Error', err);
        });
    };
    this.onDeposit = values => {
      const that = this;
      const { estimatAddDepositAmount, selectBackedCoin } = this.state;
      that.setState({
        visibleAuction: false,
        loading: true,
      });
      const { contractIndex } = that.state;
      dmw
        .deposit(
          contractIndex,
          values['password'],
          estimatAddDepositAmount[0],
          selectBackedCoin,
        )
        .then(rest => {
          notify('success', 'SUCCESS', rest);
          that.setState({
            loading: false,
            visibleAuction: false,
          });
        })
        .catch(e => {
          that.setState({
            loading: false,
          });
          const err = typeof e === 'string' ? e : e.message;
          notify('error', 'Error', err);
        });
    };
    this.getRecords = () => {
      const that = this;
      const {
        pageNo,
        pageSize,
        selectBackedCoin,
        selectMintCoin,
        subPanes,
        lastIndex,
      } = this.state;
      that.totalSupply(selectMintCoin).then(totalSupply => {
        that.setState({
          totalSupply: totalSupply,
        });
      });
      let tmpSubPanes = subPanes;
      dmwInfo
        .keyPageContracts(
          selectBackedCoin,
          selectMintCoin,
          (pageNo - 1) * pageSize,
          pageSize,
        )
        .then(records => {
          const datas = JSON.parse(records);
          console.log('datas==', datas);
          tmpSubPanes[subPanesKey(selectBackedCoin, selectMintCoin)] = datas;
          that.setState({
            subPanes: tmpSubPanes,
            loading: false,
            lastIndex: datas.lastIndex,
          });
        })
        .catch(error => {
          that.setState({
            loading: false,
          });
        });
    };
    this.pageChange = no => {
      const that = this;
      that.setState({
        pageNo: no,
        loading: true,
      });
      setTimeout(function() {
        that.getRecords();
      }, 10);
    };
    this.onShowSizeChange = (current, pagesize) => {
      const that = this;
      that.setState({
        pageSize: pagesize,
        loading: true,
      });
      setTimeout(function() {
        that.getRecords();
      }, 10);
    };
    this.setSelectTap = (backedCoin, mintCoin) => {
      const that = this;
      this.setState({
        selectBackedCoin: backedCoin,
        selectMintCoin: mintCoin,
      });
      that.totalSupply(mintCoin).then(totalSupply => {
        that.setState({
          totalSupply: totalSupply,
        });
      });
    };
  }
  componentDidMount() {
    const that = this;
    that.setState({
      loading: true,
    });
    that
      .list(that)
      .then(() => {
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
    // if (sscTimerId == null) {
    //   sscTimerId = setInterval(function() {
    //     that
    //       .list(that)
    //       .then(() => {})
    //       .catch(e => {});
    //   }, 10 * 1000);
    // }
  }
  borrow(backedCoin, mintCoin, proxy) {
    const that = this;
    const decimal = utils.getDecimalCache(backedCoin);
    dmw.getMinBackedAmount(backedCoin, mintCoin).then(rest => {
      that.setState({
        backedCoin: backedCoin,
        mintCoin: mintCoin,
        proxy: proxy,
        minBorrowValue: utils
          .toValue(new BigNumber(rest).toString(10), decimal)
          .toString(10),
      });
      that.setVisible(true);
    });
  }
  deal(backedCoin, mintCoin, mintValue, contractIndex) {
    const that = this;
    that.setState({
      backedCoin: backedCoin,
      mintCoin: mintCoin,
      mintValue: mintValue,
      contractIndex: contractIndex,
    });
    that.setVisibleDeal(true);
  }
  async totalSupply(mintCoin) {
    const rest = await coinFactory.totalSupply(mintCoin);
    console.log(
      'totalSupply>>> ',
      utils.toValue(rest, utils.getDecimalCache(mintCoin)).toFixed(4),
    );
    return new Promise(resolve => {
      resolve(utils.toValue(rest, utils.getDecimalCache(mintCoin)).toFixed(4));
    });
  }
  deposit(contractIndex) {
    const that = this;
    dmw
      .estimatAddDepositAmount(contractIndex)
      .then(rest => {
        that.setState({
          contractIndex: contractIndex,
          estimatAddDepositAmount: rest,
        });
        that.setVisibleAuction(true);
      })
      .catch(e => {});
  }
  setAuctionPrice(contractIndex) {
    const that = this;
    that.setState({
      contractIndex: contractIndex,
    });
    that.setVisibleAuctionPrice(true);
  }
  async list(that) {
    const { pageNo, pageSize } = that.state;
    const rest = await dmwBase.getTradingPairs();
    const arr = JSON.parse(rest);
    let decimals = {};
    if (arr.length > 0) {
      let subPanes = {};
      let panes = {};
      let selectBackedCoin;
      let selectMintCoin;
      // for (let i = 0; i < arr.length; i++) {
      for (let i = 0; i < 1; i++) {
        const data = arr[i];
        const backeCoin = data.backeCoin;
        const mintCoin = data.mintCoin;
        if (i == 0) {
          selectBackedCoin = backeCoin;
          selectMintCoin = mintCoin;
        }
        const d1 = await utils.getDecimal(backeCoin);
        const d2 = await utils.getDecimal(mintCoin);
        decimals[backeCoin] = d1;
        decimals[mintCoin] = d2;
        const records = await dmwInfo.keyPageContracts(
          backeCoin,
          mintCoin,
          0,
          pageSize,
        );
        const datas = JSON.parse(records);
        console.log('datas>>', datas);
        if (panes[backeCoin]) {
          let org = panes[backeCoin];
          panes[backeCoin] = org.concat([data]);
        } else {
          panes[backeCoin] = [data];
        }
        subPanes[subPanesKey(backeCoin, mintCoin)] = datas;
      }
      const totalSupply = await that.totalSupply(selectMintCoin);
      that.setState({
        panes: panes,
        decimals: decimals,
        subPanes: subPanes,
        selectBackedCoin: selectBackedCoin,
        selectMintCoin: selectMintCoin,
        totalSupply: totalSupply,
      });
    }
  }
  renderSubPane(data, datas) {
    console.log('data>>> ', data);
    const that = this;
    const { pageNo, pageSize, decimals, totalSupply } = that.state;
    const thresholdRate = data.thresholdRate;
    const collateralRate = data.collateralRate;
    const currentRateNumerator = data.currentRateNumerator;
    const currentRateDenominator = data.currentRateDenominator;
    const backeCoin = data.backeCoin;
    const mintCoin = data.mintCoin;
    let datasource = [];
    if (datas && datas.total > 0) {
      for (let i = 0; i < datas.data.length; i++) {
        let buttons = [];
        const d = datas.data[i];
        const currentRateBig = new BigNumber(d.backedValue)
          .multipliedBy(new BigNumber(currentRateDenominator))
          .dividedBy(new BigNumber(currentRateNumerator))
          .dividedBy(new BigNumber(d.mintValue))
          .multipliedBy(new BigNumber(100));
        const currentRate = currentRateBig.toFixed(4, 1);
        if (d.status == 1 || d.status == 2) {
          if (d.owns) {
            buttons.push(
              React.createElement(
                Button,
                {
                  type: 'primary',
                  onClick: () => {
                    // @ts-ignore
                    const dcmls = decimals[mintCoin];
                    that.deal(
                      backeCoin,
                      mintCoin,
                      utils.toValue(d.mintValue, dcmls).toString(10),
                      d.contractIndex,
                    );
                  },
                  block: true,
                  style: { marginTop: '5px' },
                },
                i18n.t('button_repay'),
              ),
            );
          }
          if (currentRateBig.comparedTo(collateralRate) == -1 && d.owns) {
            buttons.push(
              React.createElement(
                Button,
                {
                  disabled: true,
                  type: 'primary',
                  onClick: () => {
                    that.deposit(d.contractIndex);
                  },
                  block: true,
                  style: { marginTop: '5px' },
                },
                i18n.t('button_deposit'),
              ),
            );
          } else if (currentRateBig.comparedTo(thresholdRate) < 0) {
            buttons.push(
              React.createElement(
                Button,
                {
                  disabled: true,
                  type: 'primary',
                  onClick: () => {
                    that.deposit(d.contractIndex);
                  },
                  block: true,
                  style: { marginTop: '5px' },
                },
                i18n.t('button_deposit'),
              ),
            );
          }
        }
        // console.log('buttons>> ', buttons);
        // @ts-ignore
        const decimal = decimals[data.backeCoin];
        // @ts-ignore
        const decima2 = decimals[data.mintCoin];
        datasource.push({
          index: React.createElement(
            'div',
            null,
            i + 1,
            ' ',
            d.owns
              ? React.createElement(Tag, { color: 'volcano' }, 'Owner')
              : '',
          ),
          no: React.createElement(
            'div',
            null,
            d.contractIndex + 100000,
            ' ',
            d.owns
              ? React.createElement(Tag, { color: 'volcano' }, 'Owner')
              : '',
          ),
          backedValue:
            utils.toValue(d.backedValue, decimal).toFixed(4) +
            ' ' +
            data.backeCoin,
          mintValue:
            utils.toValue(d.mintValue, decima2).toFixed(4) +
            ' ' +
            data.mintCoin,
          canClaimtValue:
            utils.toValue(d.canClaimtValue, decimal).toFixed(4) +
            ' ' +
            data.backeCoin,
          fee: utils.toValue(d.fee, decima2).toFixed(4) + ' ' + data.mintCoin,
          currentratio: currentRate + '%',
          status: convertStatus(d.status),
          time: utils.formatTime(d.createTime * 1000),
          operator: buttons,
        });
      }
      let mintCoinTabs = React.createElement(
        TabPane,
        {
          tab: mintCoin,
          key: mintCoin,
          style: {
            maxHeight: document.documentElement.clientHeight * 0.6,
            overflowY: 'scroll',
          },
        },
        React.createElement(
          Descriptions,
          { column: 5 },
          React.createElement(
            Descriptions.Item,
            { label: i18n.t('pages_ssctools_list_collateralizationRatio') },
            '180%',
          ),
          React.createElement(
            Descriptions.Item,
            { label: i18n.t('pages_ssctools_list_exchangeRatio') },
            utils.toValue(data.currentRateNumerator, 8).toString(10),
            ' ',
            data.backeCoin,
            ' =',
            ' ',
            utils.toValue(data.currentRateDenominator, 8).toString(10),
            ' ',
            mintCoin,
          ),
          React.createElement(
            Descriptions.Item,
            { label: i18n.t('pages_ssctools_list_liquidationRatio') },
            '130%',
          ),
          React.createElement(
            Descriptions.Item,
            { label: i18n.t('pages_ssctools_list_current_total') },
            totalSupply,
          ),
          React.createElement(
            Descriptions.Item,
            { label: '' },
            React.createElement(
              Button,
              {
                disabled: true,
                type: 'primary',
                onClick: () => {
                  that.borrow(backeCoin, mintCoin, data.proxy);
                },
                block: true,
                style: { marginTop: '5px' },
              },
              i18n.t('button_borrow'),
            ),
          ),
        ),
        React.createElement('p', null),
        React.createElement(Table, {
          columns: columns,
          dataSource: datasource,
          pagination: false,
        }),
        React.createElement(
          'div',
          { style: { position: 'relative', float: 'right', padding: '15px' } },
          React.createElement(Pagination, {
            size: 'small',
            total: datas.total,
            defaultCurrent: 1,
            current: pageNo,
            pageSize: pageSize,
            onChange: this.pageChange,
            showTotal: showTotal,
            onShowSizeChange: this.onShowSizeChange,
          }),
        ),
      );
      return mintCoinTabs;
    } else {
      return React.createElement(
        TabPane,
        {
          tab: mintCoin,
          key: mintCoin,
          style: {
            maxHeight: document.documentElement.clientHeight * 0.6,
            overflowY: 'scroll',
          },
        },
        React.createElement(
          Descriptions,
          { column: 4 },
          React.createElement(
            Descriptions.Item,
            { label: i18n.t('pages_ssctools_list_collateralizationRatio') },
            '180%',
          ),
          React.createElement(
            Descriptions.Item,
            { label: i18n.t('pages_ssctools_list_exchangeRatio') },
            utils.toValue(data.currentRateNumerator, 8).toString(10),
            ' ',
            data.backeCoin,
            ' =',
            ' ',
            utils.toValue(data.currentRateDenominator, 8).toString(10),
            ' ',
            mintCoin,
          ),
          React.createElement(
            Descriptions.Item,
            { label: i18n.t('pages_ssctools_list_liquidationRatio') },
            '130%',
          ),
          React.createElement(
            Descriptions.Item,
            { label: '' },
            React.createElement(
              Button,
              {
                disabled: true,
                type: 'primary',
                onClick: () => {
                  that.borrow(backeCoin, mintCoin, data.proxy);
                },
                block: true,
                style: { marginTop: '5px' },
              },
              i18n.t('button_borrow'),
            ),
          ),
        ),
        React.createElement('p', null),
        React.createElement(Table, {
          columns: columns,
          dataSource: [],
          pagination: false,
        }),
      );
    }
  }
  render() {
    const that = this;
    const {
      visible,
      backedCoin,
      visibleDeal,
      mintCoin,
      amount,
      fee,
      visibleAuction,
      mintValue,
      subPanes,
      panes,
      minBorrowValue,
      estimatAddDepositAmount,
      selectBackedCoin,
    } = this.state;
    let params = {
      mintCoin,
      mintValue,
    };
    let desc = [];
    if (estimatAddDepositAmount && estimatAddDepositAmount.length > 0) {
      const decimal = utils.getDecimalCache(selectBackedCoin);
      console.log('decimal>>> ', utils.getDecimalCache(selectBackedCoin));
      desc.push(
        `Deposit ${utils
          .toValue(estimatAddDepositAmount[0], decimal)
          .toFixed(4)} ${selectBackedCoin} , Possible Receive ${utils
          .toValue(estimatAddDepositAmount[1], decimal)
          .toFixed(4)} ${selectBackedCoin}`,
      );
    }
    const panesKeys = Object.keys(panes);
    const tabPanes = [];
    if (panesKeys.length > 0) {
      for (let backedCoinK of panesKeys) {
        // @ts-ignore
        const datas = panes[backedCoinK];
        let subPaneTag = [];
        for (let data of datas) {
          // @ts-ignore
          let records = subPanes[subPanesKey(backedCoinK, data.mintCoin)];
          const subPane = that.renderSubPane(data, records);
          subPaneTag.push(subPane);
        }
        tabPanes.push(
          React.createElement(
            TabPane,
            { tab: backedCoinK, key: backedCoinK },
            React.createElement(
              Tabs,
              {
                type: 'card',
                tabPosition: 'left',
                onTabClick: mintCoin => {
                  this.setSelectTap(backedCoinK, mintCoin);
                },
              },
              subPaneTag,
            ),
          ),
        );
      }
    }
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
            React.createElement(
              'span',
              null,
              i18n.t('pages_ssctools_list_title'),
            ),
          ),
          React.createElement(Col, { span: 12, style: { textAlign: 'right' } }),
        ),
        React.createElement('p', null),
        React.createElement(
          Tabs,
          {
            type: 'card',
            onTabClick: mintCoin => {
              this.setSelectTap(mintCoin, 'SUSD');
            },
            animated: true,
          },
          tabPanes,
        ),
        React.createElement('p', null),
      ),
      React.createElement(BorrowForm, {
        visible: visible,
        onCreate: this.onBorrow,
        onCancel: () => {
          this.setVisible(false);
        },
        mintCoin: mintCoin,
        amountEstimate: amount,
        fee: fee,
        backedCoin: backedCoin,
        estimate: this.estimate,
        params: { minBorrowValue: minBorrowValue },
      }),
      React.createElement(DealForm, {
        visible: visibleDeal,
        onCreate: this.onDeal,
        onCancel: () => {
          this.setVisibleDeal(false);
        },
        params: params,
      }),
      React.createElement(PasswordForm, {
        visible: visibleAuction,
        onCreate: this.onDeposit,
        onCancel: () => {
          this.setVisibleAuction(false);
        },
        title: i18n.t('button_deposit'),
        desc: desc,
      }),
    );
  }
}
//
// function panesKey(backeCoin:string, mintCoin:string) {
//   return ["panes",backeCoin, mintCoin].join("_")
// }
function subPanesKey(backeCoin, mintCoin) {
  return ['subPanes', backeCoin, mintCoin].join('_');
}
function showTotal(total) {
  return `Total ${total} items`;
}
export default SSCTools;
//# sourceMappingURL=index.js.map
