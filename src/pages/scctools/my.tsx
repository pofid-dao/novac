import React, { Component } from 'react';
import {
  Card,
  Col,
  Row,
  Divider,
  Button,
  Tabs,
  Descriptions,
  Table,
  Spin,
  message,
  notification,
  Pagination,
} from 'antd';
import './index.css';
import utils from '@/common/utils';
import dmw from '@/service/dmw';
import dmwInfo from '@/service/dmwInfo';
import BorrowForm from '@/components/Borrow';
import DealForm from '@/components/Deal';
import PasswordForm from '@/components/Password';
import BigNumber from 'bignumber.js';
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

const columns = [
  {
    title: i18n.t('pages_myssc_index'),
    dataIndex: 'index',
    key: 'index',
    width: '5%',
  },
  {
    title: i18n.t('pages_myssc_pledged'),
    dataIndex: 'backedValue',
    key: 'backedValue',
    width: '20%',
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
    width: '15%',
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
    return 'Biding';
  } else if (status === 4) {
    return 'Unsold';
  } else if (status === 0) {
    return 'Finished';
  }
}

let mySSCTimerId: any = null;
class MySSC extends Component {
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
    mintValue: 0,
    amount: '',
    fee: '',
    contractIndex: 0,

    loading: false,
    queryOwn: true,
    total: 0,
  };

  componentDidMount(): void {
    const that = this;
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
        const err = typeof e === 'string' ? e : e.message;
        notify('error', 'Error', err);
      });

    // if(mySSCTimerId == null){
    //   mySSCTimerId = setInterval(function () {
    //     that.list().catch(e => {});
    //   },10 * 1000 )
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

  borrow(backedCoin: string, mintCoin: string) {
    const that = this;
    that.setState({
      backedCoin: backedCoin,
      mintCoin: mintCoin,
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
      contractIndex: contractIndex,
      mintValue: mintValue,
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
    const { contractIndex, mintCoin, backedCoin } = that.state;

    dmw
      .issue(
        mintCoin,
        backedCoin,
        utils.fromValue(amount, 18).toString(10),
        values['password'],
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

  async list() {
    const that = this;
    const { pageNo, pageSize } = this.state;
    let result: any = await dmwInfo.myPageContracts(
      (pageNo - 1) * pageSize,
      pageSize,
    );
    let datasource = [];
    const datas = JSON.parse(result);
    console.log('result>>', datas);
    let total = datas.total;
    if (datas && datas.total > 0) {
      for (let i = 0; i < datas.data.length; i++) {
        let buttons = [];
        const d = datas.data[i];
        const backedCoin: string = d.backedCoin;
        const mintCoin: string = d.mintCoin;
        const currentRateNumerator: number = d.currentRateNumerator;
        const currentRateDenominator: number = d.currentRateDenominator;
        const currentRate = new BigNumber(d.backedValue)
          .multipliedBy(new BigNumber(currentRateDenominator))
          .dividedBy(new BigNumber(currentRateNumerator))
          .dividedBy(new BigNumber(d.mintValue))
          .multipliedBy(100)
          .toFixed(2);
        const decimal = await utils.getDecimal(d.backedCoin);
        const decimal2 = await utils.getDecimal(d.mintCoin);
        if (d.status == 1) {
          // buttons.push(<Button type={"primary"} onClick={()=>{that.borrow(backeCoin,mintCoin)}} block style={{marginTop:'5px'}}>Borrow</Button>);
          if (d.owns) {
            buttons.push(
              <Button
                type={'primary'}
                onClick={() => {
                  that.deal(
                    backedCoin,
                    mintCoin,
                    utils.toValue(d.mintValue, decimal2).toString(10),
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
        } else if (d.status == 3) {
          buttons.push(
            <Button disabled={true} block>
              {i18n.t('button_bidding')}...
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
        datasource.push({
          index: i + 1,
          backedValue:
            utils.toValue(d.backedValue, decimal).toFixed(4) +
            ' ' +
            d.backedCoin,
          mintValue:
            utils.toValue(d.mintValue, decimal2).toFixed(4) + ' ' + d.mintCoin,
          fee: utils.toValue(d.fee, decimal2).toFixed(4),
          currentratio: currentRate + '%',
          status: convertStatus(d.status),
          time: utils.formatTime(d.createTime * 1000),
          operator: buttons,
        });
      }
      let mintCoinTabs = (
        <div>
          <Table columns={columns} dataSource={datasource} pagination={false} />
          <div
            style={{ position: 'relative', float: 'right', padding: '15px' }}
          >
            <Pagination
              size="small"
              total={total}
              defaultCurrent={1}
              current={pageNo}
              pageSize={pageSize}
              onChange={this.pageChange}
              showTotal={showTotal}
            />
          </div>
        </div>
      );

      this.setState({
        tabs: mintCoinTabs,
      });
    } else {
      let mintCoinTabs = (
        <div>
          <Table columns={columns} dataSource={[]} pagination={false} />
          <div
            style={{ position: 'relative', float: 'right', padding: '15px' }}
          >
            <Pagination
              size="small"
              total={total}
              defaultCurrent={1}
              current={pageNo}
              pageSize={pageSize}
              onChange={this.pageChange}
              showTotal={showTotal}
            />
          </div>
        </div>
      );

      this.setState({
        tabs: mintCoinTabs,
      });
    }
  }

  pageChange = (no: number) => {
    const that = this;
    that.setState({
      pageNo: no,
    });

    setTimeout(function() {
      that.list().then();
    }, 10);
  };

  render() {
    const {
      visible,
      tabs,
      backedCoin,
      visibleDeal,
      mintCoin,
      amount,
      fee,
      visibleAuction,
      visibleAuctionPrice,
      mintValue,
    } = this.state;

    let params = {
      mintCoin,
      mintValue,
    };

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Row className={'pfid-title'}>
            <Col span={12}>
              <span>MY SSC</span>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}></Col>
          </Row>
          <p />
          {tabs}
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

function showTotal(total: any) {
  return `Total ${total} items`;
}

export default MySSC;
