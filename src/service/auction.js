import config from '@/common/config';
import serojs from 'serojs';
import seropp from 'sero-pp';
import account from '@/service/account';
import BigNumber from 'bignumber.js';
import tx from './tx';
import gerorpc from '@/common/gerorpc';
class Auction {
  constructor() {
    this.callContract = null;
    this.callContract = serojs.callContract(
      config.auction.abi,
      config.auction.address,
    );
  }
  async bid(contractIndex, mintCoin, amount, password) {
    const that = this;
    const act = account.getCurrent();
    return that.executeMethod(
      'bid',
      act.PK,
      act.MainPKr,
      [contractIndex],
      new BigNumber(amount),
      mintCoin,
      password,
    );
  }
  async withDraw(contractIndex, password) {
    const act = account.getCurrent();
    return this.executeMethod(
      'withDraw',
      act.PK,
      act.MainPKr,
      [contractIndex],
      new BigNumber(0),
      'SERO',
      password,
    );
  }
  async setAuctionPrice(_contractIndex, password) {
    const act = account.getCurrent();
    return this.executeMethod(
      'setAuctionPrice',
      act.PK,
      act.MainPKr,
      [_contractIndex],
      new BigNumber(0),
      'SERO',
      password,
    );
  }
  async pageAuctions(offset, pageSize) {
    const act = account.getCurrent();
    return this.callMethod('pageAuctions', act.MainPKr, [offset, pageSize]);
  }
  async timer() {
    const act = account.getCurrent();
    if (act && act.MainPKr) {
      return this.callMethod('timer', act.MainPKr, []);
    }
    return;
  }
  now() {
    return Math.ceil(new Date().getTime() / 1000);
  }
  async callMethod(_method, from, _args) {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: config.auction.address,
      data: packData,
    };
    return new Promise((resolve, reject) => {
      resolve();
      // gerorpc
      //   .post('sero_call', [callParams, 'latest'])
      //   .then(callData => {
      //     if (callData !== '0x') {
      //       try {
      //         let rest = that.callContract.unPackData(_method, callData);
      //         resolve(rest);
      //       } catch (e) {
      //         reject(e.message);
      //       }
      //     } else {
      //       reject(callData);
      //     }
      //   })
      //   .catch(e => {
      //     reject(e);
      //   });
    });
  }
  async executeMethod(_method, from, mainPKr, args, value, cy, password) {
    let that = this;
    return new Promise((resolve, reject) => {
      let packData = that.callContract.packData(_method, args);
      let executeData = {
        from: from,
        to: config.auction.address,
        value: '0x' + value.toString(16),
        data: packData,
        gasPrice: '0x' + new BigNumber('1000000000').toString(16),
        cy: cy,
        gas: '',
        password: password,
      };
      let estimateParam = {
        from: mainPKr,
        to: config.auction.address,
        value: '0x' + value.toString(16),
        data: packData,
        gasPrice: '0x' + new BigNumber('1000000000').toString(16),
        cy: cy,
      };
      gerorpc
        .post('sero_estimateGas', [estimateParam])
        .then(gas => {
          executeData['gas'] = gas;
          seropp.executeContract(executeData, function(rest) {
            tx.addTx(
              value,
              cy,
              rest,
              from,
              gas,
              config.auction.address,
              _method,
            );
            resolve(rest);
          });
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
const auction = new Auction();
export default auction;
//# sourceMappingURL=auction.js.map
