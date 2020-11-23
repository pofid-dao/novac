import config from '@/common/config';
import serojs from 'serojs';
import seropp from 'sero-pp';
import account from '@/service/account';
import BigNumber from 'bignumber.js';
import tx from '@/service/tx';
import gerorpc from '@/common/gerorpc';
class DmwInfo {
  constructor() {
    this.callContract = null;
    console.log('dwmInfo>>>>>>>>>>>>>>>>,', config.dmwInfoV2);
    this.callContract = serojs.callContract(
      config.dmwInfoV2.abi,
      config.dmwInfoV2.address,
    );
  }
  async myPageContracts(offset, pageSize) {
    const act = account.getCurrent();
    return this.callMethod('myPageContracts', act.MainPKr, [offset, pageSize]);
  }
  async keyPageContracts(_backedCoin, _mintCoin, offset, pageSize) {
    console.log('keyPageContracts', _backedCoin, _mintCoin, offset, pageSize);
    console.log(this.callContract);
    const act = account.getCurrent();
    return this.callMethod('keyPageContracts', act.MainPKr, [
      _backedCoin,
      _mintCoin,
      offset,
      pageSize,
    ]);
  }
  async myPageKeyContracts(_backedCoin, _mintCoin, offset, pageSize) {
    const act = account.getCurrent();
    return this.callMethod('myPageKeyContracts', act.MainPKr, [
      _backedCoin,
      _mintCoin,
      offset,
      pageSize,
    ]);
  }
  now() {
    return Math.ceil(new Date().getTime() / 1000);
  }
  async callMethod(_method, from, _args) {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: config.dmwInfoV2.address,
      data: packData,
    };
    return new Promise((resolve, reject) => {
      gerorpc
        .post('sero_call', [callParams, 'latest'])
        .then(callData => {
          if (callData !== '0x') {
            try {
              let rest = that.callContract.unPackData(_method, callData);
              console.log('SSSSSSSSSSSSSS', rest, that.callContract);
              resolve(rest);
            } catch (e) {
              if (callData === '0x') {
                resolve(null);
              } else {
                reject(e.message);
              }
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
        to: config.dmwInfoV2.address,
        value: '0x' + value.toString(16),
        data: packData,
        gasPrice: '0x' + new BigNumber('1000000000').toString(16),
        cy: cy,
        gas: '',
        password: password,
      };
      let estimateParam = {
        from: mainPKr,
        to: config.dmwInfoV2.address,
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
              config.dmwInfoV2.address,
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
const dmwInfo = new DmwInfo();
export default dmwInfo;
//# sourceMappingURL=dmwInfoV2.js.map
