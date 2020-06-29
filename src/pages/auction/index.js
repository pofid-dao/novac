import React, { Component } from 'react';
import { Col, Row, Button, Table, Spin, notification, Pagination } from 'antd';
import './index.css';
import auction from '@/service/auction';
import BidForm from '@/components/Bid';
import PasswordForm from '@/components/Password';
import utils from '@/common/utils';
import BigNumber from 'bignumber.js';
import { storage } from '@/common/storage';
import i18n from '@/i18n';
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
  {
    title: i18n.t('pages_auction_index'),
    dataIndex: 'index',
    key: 'index',
    width: '5%',
  },
  {
    title: i18n.t('pages_myssc_no'),
    dataIndex: 'no',
    key: 'no',
    width: '10%',
  },
  {
    title: i18n.t('pages_auction_assets'),
    dataIndex: 'backedValue',
    key: 'backedValue',
    width: '15%',
  },
  {
    title: i18n.t('pages_auction_currentPrice'),
    dataIndex: 'currentPrice',
    key: 'currentPrice',
    width: '15%',
  },
  {
    title: i18n.t('pages_auction_singleBid'),
    dataIndex: 'cut',
    key: 'cut',
    width: '10%',
  },
  {
    title: i18n.t('pages_auction_status'),
    dataIndex: 'status',
    key: 'status',
    width: '10%',
  },
  {
    title: i18n.t('pages_pfid_my_time'),
    dataIndex: 'createdAt',
    key: 'createdAt',
    width: '10%',
  },
  {
    title: i18n.t('pages_auction_countDown'),
    dataIndex: 'duration',
    key: 'duration',
    width: '10%',
  },
  {
    title: i18n.t('pages_auction_operation'),
    dataIndex: 'operator',
    key: 'operator',
    width: '10%',
  },
];
let auctionTimerId = null;
class Auction extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      visible: false,
      pageNo: 1,
      pageSize: 10,
      contractIndex: 0,
      loading: false,
      mintCoin: '',
      index: 0,
      datasource: [],
      visibleWithdraw: false,
      visibleUnsold: false,
      total: 0,
      currentPrice: '0.00',
      cut: '0.00',
      totalCut: 0,
    };
    this.onCreateBid = values => {
      const that = this;
      const { index, mintCoin, currentPrice, cut } = this.state;
      const amount = values['amountes'];
      that.setState({
        visible: false,
        loading: true,
      });
      utils.getDecimal(mintCoin).then(decimal => {
        auction
          .bid(
            index,
            mintCoin,
            utils.fromValue(
              new BigNumber(cut)
                .multipliedBy(new BigNumber(amount))
                .plus(new BigNumber(currentPrice))
                .toString(10),
              decimal,
            ),
            values['password'],
          )
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
            const err = typeof e == 'string' ? e : e.message;
            notify('error', 'Error', err);
          });
      });
    };
    this.setVisible = f => {
      this.setState({
        visible: f,
      });
    };
    this.onCreateWithdraw = values => {
      const that = this;
      const { index } = this.state;
      that.setState({
        visibleWithdraw: false,
        loading: true,
      });
      auction
        .withDraw(index, values['password'])
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
          const err = typeof e == 'string' ? e : e.message;
          notify('error', 'Error', err);
        });
    };
    this.setVisibleWithdraw = f => {
      this.setState({
        visibleWithdraw: f,
      });
    };
    this.setVisibleUnsold = f => {
      this.setState({
        visibleUnsold: f,
      });
    };
    this.pageChange = no => {
      const that = this;
      that.setState({
        pageNo: no,
      });
      setTimeout(function() {
        that.list().then();
      }, 10);
    };
    this.calculation = v => {
      const { currentPrice, cut } = this.state;
      this.setState({
        totalCut: new BigNumber(cut)
          .multipliedBy(new BigNumber(v))
          .plus(new BigNumber(currentPrice))
          .toString(10),
      });
    };
    this.renderDatasource = datas => {
      const timer = storage.get(storage.keys.contractTimer);
      let datasorce = [];
      if (datas.total > 0) {
        for (let i = 0; i < datas.data.length; i++) {
          const data = datas.data[i];
          const deadline = data.startedAt + data.duration;
          const idOver = timer >= deadline;
          let btn = '';
          if (!data.invalid) {
            if (data.unSold) {
              btn = React.createElement(
                Button,
                {
                  type: 'primary',
                  onClick: () => {
                    this.unsold(data.contractIndex);
                  },
                },
                i18n.t('button_bid'),
              );
            } else {
              if (data.onAuction) {
                btn = React.createElement(
                  Button,
                  {
                    type: 'primary',
                    onClick: () => {
                      this.bid(
                        data.contractIndex,
                        data.mintCoin,
                        utils.toValue(data.currentPrice, decimal2).toString(10),
                        utils.toValue(data.cut, decimal2).toString(10),
                      );
                    },
                  },
                  i18n.t('button_bid'),
                );
              } else {
                if (data.owns) {
                  btn = React.createElement(
                    Button,
                    {
                      type: 'primary',
                      onClick: () => {
                        this.withdraw(data.contractIndex);
                      },
                    },
                    i18n.t('button_withdraw'),
                  );
                }
              }
            }
          }
          const decimal = utils.getDecimalCache(data.backedCoin);
          const decimal2 = utils.getDecimalCache(data.mintCoin);
          let status = 'Finished';
          if (!data.invalid) {
            status = 'Valid';
          }
          datasorce.push({
            index: i + 1,
            no: data.contractIndex + 100000,
            backedValue:
              utils.toValue(data.backedValue, decimal).toFixed(4) +
              ' ' +
              data.backedCoin,
            currentPrice:
              utils.toValue(data.currentPrice, decimal2).toFixed(4) +
              ' ' +
              data.mintCoin,
            cut:
              utils.toValue(data.cut, decimal2).toFixed(4) +
              ' ' +
              data.mintCoin,
            status: status,
            createdAt: utils.formatTime(data.startedAt * 1000),
            duration: idOver
              ? 'Finished'
              : React.createElement('span', null, deadline - timer, 's'),
            operator: btn,
          });
        }
      }
      return datasorce;
    };
  }
  componentDidMount() {
    const that = this;
    // that.startTimer()
    that.setState({
      loading: true,
    });
    that
      .list()
      .then(() => {
        that.setState({
          loading: false,
        });
      })
      .catch(e => {
        that.setState({
          loading: false,
        });
      });
    if (auctionTimerId == null) {
      auctionTimerId = setInterval(function() {
        that.list().then();
      }, 10 * 1000);
    }
  }
  async list() {
    const that = this;
    const { pageNo, pageSize } = that.state;
    const rest = await auction.pageAuctions((pageNo - 1) * pageSize, pageSize);
    const datas = JSON.parse(rest);
    console.log('datas>>', datas);
    this.setState({
      datasource: datas,
      total: datas.total,
    });
  }
  bid(index, mintCoin, currentPrice, cut) {
    this.setState({
      visible: true,
      index: index,
      mintCoin: mintCoin,
      currentPrice: currentPrice,
      cut: cut,
      totalCut: currentPrice,
    });
  }
  withdraw(index) {
    this.setState({
      visibleWithdraw: true,
      index: index,
    });
  }
  unsold(index) {
    this.setState({
      visibleUnsold: true,
      index: index,
    });
  }
  onUnsold(values) {
    const that = this;
    const { index } = this.state;
    that.setState({
      visibleUnsold: false,
      loading: true,
    });
    auction
      .setAuctionPrice(index, values['password'])
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
        const err = typeof e == 'string' ? e : e.message;
        notify('error', 'Error', err);
      });
  }
  render() {
    const {
      visible,
      mintCoin,
      datasource,
      visibleWithdraw,
      total,
      pageNo,
      pageSize,
      currentPrice,
      cut,
      totalCut,
      visibleUnsold,
    } = this.state;
    const params = {
      mintCoin,
      currentPrice,
      cut,
      totalCut,
    };
    const datas = this.renderDatasource(datasource);
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
            React.createElement('span', null, i18n.t('menus_auction')),
          ),
          React.createElement(Col, { span: 12, style: { textAlign: 'right' } }),
        ),
        React.createElement('p', null),
        React.createElement(Table, {
          columns: columns,
          dataSource: datas,
          pagination: false,
        }),
        React.createElement(
          'div',
          { style: { position: 'relative', float: 'right', padding: '15px' } },
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
      React.createElement(BidForm, {
        visible: visible,
        onCreate: this.onCreateBid,
        onCancel: () => {
          this.setVisible(false);
        },
        params: params,
        calculation: this.calculation,
      }),
      React.createElement(PasswordForm, {
        visible: visibleWithdraw,
        onCreate: this.onCreateWithdraw,
        onCancel: () => {
          this.setVisibleWithdraw(false);
        },
        title: i18n.t('menus_auction'),
      }),
      React.createElement(PasswordForm, {
        visible: visibleUnsold,
        onCreate: this.onUnsold,
        onCancel: () => {
          this.setVisibleUnsold(false);
        },
        title: i18n.t('menus_auction'),
      }),
    );
  }
}
function showTotal(total) {
  return `Total ${total} items`;
}
export default Auction;
//# sourceMappingURL=index.js.map
