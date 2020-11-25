import config from '@/common/config';
import serojs from 'serojs';
import seropp from 'sero-pp';
import account from '@/service/account';
import BigNumber from 'bignumber.js';
import tx from '@/service/tx';
import gerorpc from '@/common/gerorpc';
import { storage } from '@/common/storage';
class DmwBase {
  constructor() {
    this.callContract = null;
    this.callContract = serojs.callContract(
      config.dmwBaseV2.abi,
      config.dmwBaseV2.address,
    );
  }
  async getTradingPairs() {
    const act = account.getCurrent();
    let lang = storage.get(storage.keys.language);
    lang = lang ? lang : 'en_US';
    return this.callMethod('getTradingPairs', act.MainPKr, [lang]);
  }
  async getProxyAddress(backedCoin, mintCoin) {
    const act = account.getCurrent();
    return this.callMethod('getProxyAddress', act.MainPKr, [
      backedCoin,
      mintCoin,
    ]);
  }
  async addDescription(backedCoin, language, description, password) {
    const act = account.getCurrent();
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
  async addExchange(backedCoin, name, password) {
    const act = account.getCurrent();
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
  now() {
    return Math.ceil(new Date().getTime() / 1000);
  }
  async callMethod(_method, from, _args) {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: config.dmwBaseV2.address,
      data: packData,
    };
    return new Promise((resolve, reject) => {
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
  async executeMethod(_method, from, mainPKr, args, value, cy, password) {
    let that = this;
    return new Promise((resolve, reject) => {
      let packData = that.callContract.packData(_method, args);
      let executeData = {
        from: from,
        to: config.dmwBaseV2.address,
        value: '0x' + value.toString(16),
        data: packData,
        gasPrice: '0x' + new BigNumber('1000000000').toString(16),
        cy: cy,
        gas: '',
        password: password,
      };
      let estimateParam = {
        from: mainPKr,
        to: config.dmwBaseV2.address,
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
              config.dmwBaseV2.address,
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
const dmwBase = new DmwBase();
export default dmwBase;
//# sourceMappingURL=dmwBaseV2.js.map
