import config from '@/common/config';
import account from '@/service/account';
import gerorpc from '@/common/gerorpc';
const serojs = require('serojs');
const seropp = require('sero-pp');
class CoinFactory {
  constructor() {
    this.callContract = null;
    this.callContract = serojs.callContract(
      config.coinFactory.abi,
      config.coinFactory.address,
    );
  }
  async totalSupply(symbol) {
    const act = account.getCurrent();
    return this.callMethod('totalSupply', act.MainPKr, [symbol]);
  }
  async callMethod(_method, from, _args) {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: that.callContract.address,
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
}
const coinFactory = new CoinFactory();
export default coinFactory;
//# sourceMappingURL=coinFactory.js.map
