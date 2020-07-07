import config from '@/common/config';
import { AccountInfo } from '@/model/account';
import serojs from 'serojs';
import seropp from 'sero-pp';
import account from '@/service/account';
import BigNumber from 'bignumber.js';
import tx from './tx';
import gerorpc from '@/common/gerorpc';
class Auction {
  callContract: any = null;

  constructor() {
    this.callContract = serojs.callContract(
      config.auction.abi,
      config.auction.address,
    );
  }

  async bid(
    contractIndex: number,
    mintCoin: string,
    amount: any,
    password: string,
  ): Promise<any> {
    const that = this;
    const act: AccountInfo = account.getCurrent();
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

  async withDraw(contractIndex: number, password: string): Promise<any> {
    const act: AccountInfo = account.getCurrent();
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

  async setAuctionPrice(
    _contractIndex: number,
    password: string,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
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

  async pageAuctions(offset: number, pageSize: number): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('pageAuctions', act.MainPKr, [offset, pageSize]);
  }

  async timer(): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    if (act && act.MainPKr) {
      return this.callMethod('timer', act.MainPKr, []);
    }
    return;
  }

  now(): any {
    return Math.ceil(new Date().getTime() / 1000);
  }

  async callMethod(_method: string, from: string, _args: any): Promise<any> {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: config.auction.address,
      data: packData,
    };
    return new Promise<any>((resolve, reject) => {
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

  async executeMethod(
    _method: string,
    from: string,
    mainPKr: string,
    args: any,
    value: BigNumber,
    cy: string,
    password: string,
  ): Promise<any> {
    let that = this;
    return new Promise<any>((resolve, reject) => {
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
        .then((gas: any) => {
          executeData['gas'] = gas;
          seropp.executeContract(executeData, function(rest: any) {
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
