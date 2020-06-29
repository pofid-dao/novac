import config from '@/common/config';

import BigNumber from 'bignumber.js';
import account from '@/service/account';
import { AccountInfo } from '@/model/account';
import tx from '@/service/tx';
import gerorpc from '@/common/gerorpc';

const serojs = require('serojs');
const seropp = require('sero-pp');

class CoinFactory {
  callContract: any = null;

  constructor() {
    this.callContract = serojs.callContract(
      config.coinFactory.abi,
      config.coinFactory.address,
    );
  }

  async totalSupply(symbol: string): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('totalSupply', act.MainPKr, [symbol]);
  }

  async callMethod(_method: string, from: string, _args: any): Promise<any> {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: that.callContract.address,
      data: packData,
    };
    return new Promise<any>((resolve, reject) => {
      gerorpc
        .post('sero_call', [callParams, 'latest'])
        .then(callData => {
          if (callData !== '0x') {
            try {
              let rest = that.callContract.unPackData(_method, callData);
              resolve(rest);
            } catch (e) {
              reject(e.message);
            }
          } else {
            reject(callData);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

const coinFactory = new CoinFactory();

export default coinFactory;
