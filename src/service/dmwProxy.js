import config from '@/common/config';
import serojs from 'serojs';
import seropp from 'sero-pp';
import account from '@/service/account';
import BigNumber from 'bignumber.js';
import tx from '@/service/tx';
import gerorpc from '@/common/gerorpc';
class DmwProxy {
  constructor(address) {
    this.callContract = null;
    this.address = '';
    this.address = address;
    this.callContract = serojs.callContract(config.dmwProxy.abi, address);
  }
  async issue(mintCoin, backedCoin, amount, password) {
    const act = account.getCurrent();
    return this.executeMethod(
      'issue',
      act.PK,
      act.MainPKr,
      [mintCoin],
      new BigNumber(amount),
      backedCoin,
      password,
    );
  }
  async feeCoin() {
    const act = account.getCurrent();
    return this.callMethod('feeCoin', act.MainPKr, []);
  }
  async estimateGas(fee) {
    const act = account.getCurrent();
    return this.callMethod('estimateGas', act.MainPKr, [fee]);
  }
  async callMethod(_method, from, _args) {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: this.address,
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
        to: that.address,
        value: '0x' + value.toString(16),
        data: packData,
        gasPrice: '0x' + new BigNumber('1000000000').toString(16),
        cy: cy,
        gas: '',
        password: password,
      };
      let estimateParam = {
        from: mainPKr,
        to: that.address,
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
            tx.addTx(value, cy, rest, from, gas, that.address, _method);
            resolve(rest);
          });
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
// const dmwProxy = new DmwProxy();
export default DmwProxy;
//# sourceMappingURL=dmwProxy.js.map
