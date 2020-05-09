import config from '@/common/config';
import { AccountInfo } from '@/model/account';
import serojs from 'serojs';
import seropp from 'sero-pp';
import account from '@/service/account';
import BigNumber from 'bignumber.js';
import utils from '@/common/utils';
import tx from '@/service/tx';
import gerorpc from '@/common/gerorpc';
import { storage } from '@/common/storage';

class DmwBase {
  callContract: any = null;

  constructor() {
    this.callContract = serojs.callContract(
      config.dmwBase.abi,
      config.dmwBase.address,
    );
  }

  async getTradingPairs(): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    let lang: any = storage.get(storage.keys.language);
    lang = lang ? lang : 'en_US';
    return this.callMethod('getTradingPairs', act.MainPKr, [lang]);
  }

  async getProxyAddress(backedCoin: string, mintCoin: string): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('getProxyAddress', act.MainPKr, [
      backedCoin,
      mintCoin,
    ]);
  }

  async addDescription(
    backedCoin: string,
    language: string,
    description: string,
    password: string,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.executeMethod(
      'addDescription',
      act.PK,
      act.MainPKr,
      [backedCoin, language, description],
      new BigNumber(0),
      'SERO',
      password,
    );
  }

  async addExchange(
    backedCoin: string,
    name: string,
    password: string,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.executeMethod(
      'addExchange',
      act.PK,
      act.MainPKr,
      [backedCoin, name],
      new BigNumber(0),
      'SERO',
      password,
    );
  }

  now(): any {
    return Math.ceil(new Date().getTime() / 1000);
  }

  async callMethod(_method: string, from: string, _args: any): Promise<any> {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: config.dmwBase.address,
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
        to: config.dmwBase.address,
        value: '0x' + value.toString(16),
        data: packData,
        gasPrice: '0x' + new BigNumber('1000000000').toString(16),
        cy: cy,
        gas: '',
        password: password,
      };
      let estimateParam = {
        from: mainPKr,
        to: config.dmwBase.address,
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
            tx.addTx(value, cy, rest, from, gas, dmwBase.address, _method);
            resolve(rest);
          });
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

const dmwBase = new DmwBase();

export default dmwBase;
