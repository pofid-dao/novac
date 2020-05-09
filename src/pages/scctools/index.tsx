import React, { Component } from 'react';
import {
  Card,
  Col,
  Row,
  Button,
  Tabs,
  Descriptions,
  Table,
  Spin,
  notification,
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
import { url } from '@/common/url';

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
const columns = [
  {
    title: i18n.t('pages_myssc_index'),
    dataIndex: 'index',
    key: 'index',
    width: '5%',
  },
  {
    title: i18n.t('pages_myssc_no'),
    dataIndex: 'no',
    key: 'no',
    width: '5%',
  },
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

function convertStatus(status: number) {
  if (status === 1) {
    return 'Normal';
  } else if (status === 2) {
    return 'Liquidation';
  } else if (status === 3) {
    return 'Auction created';
  } else if (status === 4) {
    return 'Unsold';
  } else if (status === 0) {
    return 'Finished';
  }
}

let sscTimerId: any = null;

class SSCTools extends Component {
  state = {
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
  };

  componentDidMount(): void {
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

  setVisible = (f: boolean) => {
    this.setState({
      visible: f,
    });
  };

  setVisibleDeal = (f: boolean) => {
    this.setState({
      visibleDeal: f,
    });
  };

  setVisibleAuction = (f: boolean) => {
    this.setState({
      visibleAuction: f,
    });
  };

  setVisibleAuctionPrice = (f: boolean) => {
    this.setState({
      visibleAuctionPrice: f,
    });
  };

  borrow(backedCoin: string, mintCoin: string, proxy: any) {
    const that = this;
    that.setState({
      backedCoin: backedCoin,
      mintCoin: mintCoin,
      proxy: proxy,
    });
    that.setVisible(true);
  }

  deal(
    backedCoin: string,
    mintCoin: string,
    mintValue: string,
    contractIndex: number,
  ) {
    const that = this;
    that.setState({
      backedCoin: backedCoin,
      mintCoin: mintCoin,
      mintValue: mintValue,
      contractIndex: contractIndex,
    });
    that.setVisibleDeal(true);
  }

  auction(contractIndex: number) {
    const that = this;
    that.setState({
      contractIndex: contractIndex,
    });
    that.setVisibleAuction(true);
  }

  setAuctionPrice(contractIndex: number) {
    const that = this;
    that.setState({
      contractIndex: contractIndex,
    });
    that.setVisibleAuctionPrice(true);
  }

  estimate = (amount: any) => {
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

  onBorrow = (values: any) => {
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

  onDeal = (values: any) => {
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

  onCreateAuction = (values: any) => {
    const that = this;
    that.setState({
      visibleAuction: false,
      loading: true,
    });
    const { contractIndex } = that.state;

    dmw
      .createAuction(contractIndex, values['password'])
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

  onSetAuctionPrice = (values: any) => {
    const that = this;
    that.setState({
      visibleAuctionPrice: false,
      loading: true,
    });
    const { contractIndex } = that.state;

    dmw
      .setAuctionPrice(contractIndex, values['password'])
      .then(rest => {
        notify('success', 'SUCCESS', rest);
        that.setState({
          loading: false,
          visibleAuctionPrice: false,
        });
      })
      .catch((e: any) => {
        that.setState({
          loading: false,
        });
        const err = typeof e === 'string' ? e : e.message;
        notify('error', 'Error', err);
      });
  };

  async list(that: any) {
    const { pageNo, pageSize } = that.state;
    const rest: any = await dmwBase.getTradingPairs();
    const arr = JSON.parse(rest);
    console.log('arrarrarrarr =>>> ', arr);
    let decimals: any = {};
    if (arr.length > 0) {
      let subPanes: any = {};
      let panes: any = {};
      let selectBackedCoin: any;
      let selectMintCoin: any;

      console.log('arr=>>> ', arr);

      for (let i = 0; i < arr.length; i++) {
        const data = arr[i];
        const backeCoin: string = data.backeCoin;
        const mintCoin: string = data.mintCoin;
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
          (pageNo - 1) * pageSize,
          pageSize,
        );
        const datas = JSON.parse(records);
        if (panes[backeCoin]) {
          let org: Array<any> = panes[backeCoin];
          panes[backeCoin] = org.concat([data]);
        } else {
          panes[backeCoin] = [data];
        }
        subPanes[subPanesKey(backeCoin, mintCoin)] = datas;
      }
      console.log('subPanes>>>> ', subPanes);

      that.setState({
        panes: panes,
        decimals: decimals,
        subPanes: subPanes,
        selectBackedCoin: selectBackedCoin,
        selectMintCoin: selectMintCoin,
      });
    }
  }

  getRecords = () => {
    const that = this;
    const {
      pageNo,
      pageSize,
      selectBackedCoin,
      selectMintCoin,
      subPanes,
    } = this.state;
    let tmpSubPanes: any = subPanes;
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
        });
      })
      .catch(error => {
        that.setState({
          loading: false,
        });
      });
  };

  pageChange = (no: number) => {
    const that = this;

    that.setState({
      pageNo: no,
      loading: true,
    });

    setTimeout(function() {
      that.getRecords();
    }, 10);
  };

  onShowSizeChange = (current: number, pagesize: number) => {
    const that = this;

    that.setState({
      pageSize: pagesize,
      loading: true,
    });

    setTimeout(function() {
      that.getRecords();
    }, 10);
  };

  renderSubPane(data: any, datas: any) {
    const that = this;
    const { pageNo, pageSize, decimals } = that.state;
    const thresholdRate: number = data.thresholdRate;
    const collateralRate: number = data.collateralRate;
    const currentRateNumerator: number = data.currentRateNumerator;
    const currentRateDenominator: number = data.currentRateDenominator;
    const backeCoin = data.backeCoin;
    const mintCoin = data.mintCoin;
    let datasource = [];
    if (datas && datas.total > 0) {
      for (let i = 0; i < datas.data.length; i++) {
        let buttons = [];
        const d = datas.data[i];
        const currentRate = new BigNumber(d.backedValue)
          .multipliedBy(new BigNumber(currentRateDenominator))
          .dividedBy(new BigNumber(currentRateNumerator))
          .dividedBy(new BigNumber(d.mintValue))
          .multipliedBy(100)
          .toFixed(2);

        if (d.status == 1) {
          // buttons.push(<Button type={"primary"} onClick={()=>{that.borrow(backeCoin,mintCoin)}} block style={{marginTop:'5px'}}>Borrow</Button>);
          if (d.owns) {
            buttons.push(
              <Button
                type={'primary'}
                onClick={() => {
                  // @ts-ignore
                  const dcmls = decimals[mintCoin];
                  that.deal(
                    backeCoin,
                    mintCoin,
                    utils.toValue(d.mintValue, dcmls).toString(10),
                    d.contractIndex,
                  );
                }}
                block
                style={{ marginTop: '5px' }}
              >
                {i18n.t('button_repay')}
              </Button>,
            );
          }
        } else if (d.status == 2) {
          if (d.owns) {
            buttons.push(
              <Button
                type={'primary'}
                onClick={() => {
                  // @ts-ignore
                  const dcmls = decimals[mintCoin];
                  that.deal(
                    backeCoin,
                    mintCoin,
                    utils.toValue(d.mintValue, dcmls).toString(10),
                    d.contractIndex,
                  );
                }}
                block
                style={{ marginTop: '5px' }}
              >
                {i18n.t('button_repay')}
              </Button>,
            );
          } else {
            buttons.push(
              <Button
                type={'primary'}
                onClick={() => {
                  that.auction(d.contractIndex);
                }}
                block
                style={{ marginTop: '5px' }}
              >
                {i18n.t('button_createAuction')}
              </Button>,
            );
          }
        } else if (d.status == 3) {
          buttons.push(
            <Button
              block
              type={'primary'}
              onClick={() => {
                url.goPage(url.path.auction);
              }}
            >
              {i18n.t('button_bidding')}
            </Button>,
          );
        } else if (d.status == 4) {
          buttons.push(
            <Button
              type={'primary'}
              onClick={() => {
                that.setAuctionPrice(d.contractIndex);
              }}
              block
              style={{ marginTop: '5px' }}
            >
              {i18n.t('button_createAuction')}
            </Button>,
          );
        }
        // @ts-ignore
        const decimal = decimals[data.backeCoin];
        // @ts-ignore
        const decima2 = decimals[data.mintCoin];
        datasource.push({
          index: i + 1,
          no: d.contractIndex + 100000,
          backedValue:
            utils.toValue(d.backedValue, decimal).toFixed(4) +
            ' ' +
            data.backeCoin,
          mintValue:
            utils.toValue(d.mintValue, decima2).toFixed(4) +
            ' ' +
            data.mintCoin,
          fee: utils.toValue(d.fee, decima2).toFixed(4),
          currentratio: currentRate + '%',
          status: convertStatus(d.status),
          time: utils.formatTime(d.createTime * 1000),
          operator: buttons,
        });
      }

      let mintCoinTabs = (
        <TabPane
          tab={mintCoin}
          key={mintCoin}
          style={{
            maxHeight: document.documentElement.clientHeight * 0.6,
            overflowY: 'scroll',
          }}
        >
          <Descriptions column={3} column={4}>
            <Descriptions.Item
              label={i18n.t('pages_ssctools_list_collateralizationRatio')}
            >
              {collateralRate}%
            </Descriptions.Item>
            <Descriptions.Item
              label={i18n.t('pages_ssctools_list_exchangeRatio')}
            >
              {data.currentRateNumerator} {data.backeCoin} ={' '}
              {data.currentRateDenominator} {mintCoin}
            </Descriptions.Item>
            <Descriptions.Item
              label={i18n.t('pages_ssctools_list_liquidationRatio')}
            >
              {thresholdRate}%
            </Descriptions.Item>
            <Descriptions.Item label={''}>
              <Button
                type={'primary'}
                onClick={() => {
                  that.borrow(backeCoin, mintCoin, data.proxy);
                }}
                block
                style={{ marginTop: '5px' }}
              >
                {i18n.t('button_borrow')}
              </Button>
            </Descriptions.Item>
          </Descriptions>
          <p />
          <Table columns={columns} dataSource={datasource} pagination={false} />
          <div
            style={{ position: 'relative', float: 'right', padding: '15px' }}
          >
            <Pagination
              size="small"
              total={datas.total}
              defaultCurrent={1}
              current={pageNo}
              pageSize={pageSize}
              onChange={this.pageChange}
              showTotal={showTotal}
              onShowSizeChange={this.onShowSizeChange}
            />
          </div>
        </TabPane>
      );

      return mintCoinTabs;
    } else {
      return (
        <TabPane
          tab={mintCoin}
          key={mintCoin}
          style={{
            maxHeight: document.documentElement.clientHeight * 0.6,
            overflowY: 'scroll',
          }}
        >
          <Descriptions column={4}>
            <Descriptions.Item
              label={i18n.t('pages_ssctools_list_collateralizationRatio')}
            >
              {collateralRate}%
            </Descriptions.Item>
            <Descriptions.Item
              label={i18n.t('pages_ssctools_list_exchangeRatio')}
            >
              {data.currentRateNumerator} {data.backeCoin} ={' '}
              {data.currentRateDenominator} {mintCoin}
            </Descriptions.Item>
            <Descriptions.Item
              label={i18n.t('pages_ssctools_list_liquidationRatio')}
            >
              {thresholdRate}%
            </Descriptions.Item>
            <Descriptions.Item label={''}>
              <Button
                type={'primary'}
                onClick={() => {
                  that.borrow(backeCoin, mintCoin, data.proxy);
                }}
                block
                style={{ marginTop: '5px' }}
              >
                {i18n.t('button_borrow')}
              </Button>
            </Descriptions.Item>
          </Descriptions>
          <p />
          <Table columns={columns} dataSource={[]} pagination={false} />
        </TabPane>
      );
    }
  }

  setSelectTap = (backedCoin: string, mintCoin: string) => {
    this.setState({
      selectBackedCoin: backedCoin,
      selectMintCoin: mintCoin,
    });
  };

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
      visibleAuctionPrice,
      mintValue,
      subPanes,
      panes,
    } = this.state;
    let params = {
      mintCoin,
      mintValue,
    };

    const panesKeys = Object.keys(panes);
    const tabPanes = [];
    if (panesKeys.length > 0) {
      for (let backedCoinK of panesKeys) {
        // @ts-ignore
        const datas = panes[backedCoinK];
        let subPaneTag = [];
        for (let data of datas) {
          // @ts-ignore
          let records: any = subPanes[subPanesKey(backedCoinK, data.mintCoin)];
          const subPane = that.renderSubPane(data, records);
          subPaneTag.push(subPane);
        }
        tabPanes.push(
          <TabPane tab={backedCoinK} key={backedCoinK}>
            <Tabs
              type="card"
              tabPosition={'left'}
              onTabClick={(mintCoin: any) => {
                this.setSelectTap(backedCoinK, mintCoin);
              }}
            >
              {subPaneTag}
            </Tabs>
          </TabPane>,
        );
      }
    }

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Row className={'pfid-title'}>
            <Col span={12}>
              <span>SSC List</span>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}></Col>
          </Row>
          <p />
          <Tabs type="card" animated>
            {tabPanes}
          </Tabs>
          <p />
        </Spin>

        <BorrowForm
          visible={visible}
          onCreate={this.onBorrow}
          onCancel={() => {
            this.setVisible(false);
          }}
          mintCoin={mintCoin}
          amountEstimate={amount}
          fee={fee}
          backedCoin={backedCoin}
          estimate={this.estimate}
        />

        <DealForm
          visible={visibleDeal}
          onCreate={this.onDeal}
          onCancel={() => {
            this.setVisibleDeal(false);
          }}
          params={params}
        />
        <PasswordForm
          visible={visibleAuction}
          onCreate={this.onCreateAuction}
          onCancel={() => {
            this.setVisibleAuction(false);
          }}
          title={i18n.t('button_createAuction')}
        />
        <PasswordForm
          visible={visibleAuctionPrice}
          onCreate={this.onSetAuctionPrice}
          onCancel={() => {
            this.setVisibleAuctionPrice(false);
          }}
          title={i18n.t('button_createAuction')}
        />
      </div>
    );
  }
}
//
// function panesKey(backeCoin:string, mintCoin:string) {
//   return ["panes",backeCoin, mintCoin].join("_")
// }

function subPanesKey(backeCoin: string, mintCoin: string) {
  return ['subPanes', backeCoin, mintCoin].join('_');
}

function showTotal(total: any) {
  return `Total ${total} items`;
}

export default SSCTools;
