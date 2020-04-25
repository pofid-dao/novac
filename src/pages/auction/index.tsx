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
    title: i18n.t('pages_auction_index'),
    dataIndex: 'index',
    key: 'index',
    width: '10%',
  },
  {
    title: i18n.t('pages_auction_assets'),
    dataIndex: 'backedValue',
    key: 'backedValue',
    width: '20%',
  },
  {
    title: i18n.t('pages_auction_currentPrice'),
    dataIndex: 'currentPrice',
    key: 'currentPrice',
    width: '20%',
  },
  {
    title: i18n.t('pages_auction_singleBid'),
    dataIndex: 'cut',
    key: 'cut',
    width: '20%',
  },
  {
    title: i18n.t('pages_auction_status'),
    dataIndex: 'status',
    key: 'status',
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

let auctionTimerId: any = null;

class Auction extends Component {
  state = {
    visible: false,
    pageNo: 1,
    pageSize: 10,
    contractIndex: 0,
    loading: false,
    mintCoin: '',
    index: 0,
    datasource: [],
    visibleWithdraw: false,
    total: 0,
    currentPrice: '0.00',
    cut: '0.00',
    totalCut: 0,
    // timer:storage.get(storage.keys.contractTimer)
  };

  componentDidMount(): void {
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
    const rest: any = await auction.pageAuctions(
      (pageNo - 1) * pageSize,
      pageSize,
    );
    const datas = JSON.parse(rest);
    console.log('datas>>', datas);

    this.setState({
      datasource: datas,
      total: datas.total,
    });
  }

  bid(index: any, mintCoin: string, currentPrice: string, cut: string) {
    this.setState({
      visible: true,
      index: index,
      mintCoin: mintCoin,
      currentPrice: currentPrice,
      cut: cut,
      totalCut: currentPrice,
    });
  }

  onCreateBid = (values: any) => {
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
        .then((rest: any) => {
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

  setVisible = (f: boolean) => {
    this.setState({
      visible: f,
    });
  };

  withdraw(index: any) {
    this.setState({
      visibleWithdraw: true,
      index: index,
    });
  }

  onCreateWithdraw = (values: any) => {
    const that = this;
    const { index } = this.state;
    that.setState({
      visibleWithdraw: false,
      loading: true,
    });

    auction
      .withDraw(index, values['password'])
      .then((rest: any) => {
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

  setVisibleWithdraw = (f: boolean) => {
    this.setState({
      visibleWithdraw: f,
    });
  };

  pageChange = (no: number) => {
    const that = this;
    that.setState({
      pageNo: no,
    });
    setTimeout(function() {
      that.list().then();
    }, 10);
  };

  calculation = (v: any) => {
    const { currentPrice, cut } = this.state;
    this.setState({
      totalCut: new BigNumber(cut)
        .multipliedBy(new BigNumber(v))
        .plus(new BigNumber(currentPrice))
        .toString(10),
    });
  };

  renderDatasource = (datas: any) => {
    const timer = storage.get(storage.keys.contractTimer);

    let datasorce = [];
    if (datas.total > 0) {
      for (let i = 0; i < datas.data.length; i++) {
        const data = datas.data[i];
        const deadline = data.startedAt + data.duration;
        const idOver = timer >= deadline;
        let btn: any = '';
        if (!data.invalid) {
          if (data.onAuction) {
            btn = (
              <Button
                type={'primary'}
                onClick={() => {
                  this.bid(
                    data.contractIndex,
                    data.mintCoin,
                    utils.toValue(data.currentPrice, decimal2).toString(10),
                    utils.toValue(data.cut, decimal2).toString(10),
                  );
                }}
              >
                {i18n.t('button_bid')}
              </Button>
            );
          } else {
            if (data.owns) {
              btn = (
                <Button
                  type={'primary'}
                  onClick={() => {
                    this.withdraw(data.contractIndex);
                  }}
                >
                  {i18n.t('button_withdraw')}
                </Button>
              );
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
          backedValue:
            utils.toValue(data.backedValue, decimal).toFixed(4) +
            ' ' +
            data.backedCoin,
          currentPrice:
            utils.toValue(data.currentPrice, decimal2).toFixed(4) +
            ' ' +
            data.mintCoin,
          cut:
            utils.toValue(data.cut, decimal2).toFixed(4) + ' ' + data.mintCoin,
          status: status,
          duration: idOver ? 'Finished' : <span>{deadline - timer}s</span>,
          operator: btn,
        });
      }
    }
    return datasorce;
  };

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
    } = this.state;

    const params = {
      mintCoin,
      currentPrice,
      cut,
      totalCut,
    };

    const datas = this.renderDatasource(datasource);

    return (
      <div>
        <Spin spinning={this.state.loading}>
          <Row className={'pfid-title'}>
            <Col span={12}>
              <span>{i18n.t('menus_auction')}</span>
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}></Col>
          </Row>
          <p />
          <Table columns={columns} dataSource={datas} pagination={false} />
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
        </Spin>
        <BidForm
          visible={visible}
          onCreate={this.onCreateBid}
          onCancel={() => {
            this.setVisible(false);
          }}
          params={params}
          calculation={this.calculation}
        />
        <PasswordForm
          visible={visibleWithdraw}
          onCreate={this.onCreateWithdraw}
          onCancel={() => {
            this.setVisibleWithdraw(false);
          }}
          title={i18n.t('menus_auction')}
        />
      </div>
    );
  }
}

function showTotal(total: any) {
  return `Total ${total} items`;
}

export default Auction;
