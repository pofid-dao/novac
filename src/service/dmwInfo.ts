import config from '@/common/config';
import { AccountInfo } from '@/model/account';
import serojs from 'serojs';
import seropp from 'sero-pp';
import account from '@/service/account';
import BigNumber from 'bignumber.js';
import tx from '@/service/tx';
import gerorpc from '@/common/gerorpc';

class DmwInfo {
  callContract: any = null;

  constructor() {
    console.log('dwmInfo,', config.dmwInfo);
    this.callContract = serojs.callContract(
      config.dmwInfo.abi,
      config.dmwInfo.address,
    );
  }

  async myPageContracts(offset: number, pageSize: number): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('myPageContracts', act.MainPKr, [offset, pageSize]);
  }

  async keyPageContracts(
    _backedCoin: string,
    _mintCoin: string,
    offset: number,
    pageSize: number,
  ): Promise<any> {
    console.log('keyPageContracts', _backedCoin, _mintCoin, offset, pageSize);

    console.log(this.callContract);

    const act: AccountInfo = account.getCurrent();
    return this.callMethod('keyPageContracts', act.MainPKr, [
      _backedCoin,
      _mintCoin,
      offset,
      pageSize,
    ]);
  }

  async myPageKeyContracts(
    _backedCoin: string,
    _mintCoin: string,
    offset: number,
    pageSize: number,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('myPageKeyContracts', act.MainPKr, [
      _backedCoin,
      _mintCoin,
      offset,
      pageSize,
    ]);
  }

  now(): any {
    return Math.ceil(new Date().getTime() / 1000);
  }

  async callMethod(_method: string, from: string, _args: any): Promise<any> {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: config.dmwInfo.address,
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
        to: config.dmwInfo.address,
        value: '0x' + value.toString(16),
        data: packData,
        gasPrice: '0x' + new BigNumber('1000000000').toString(16),
        cy: cy,
        gas: '',
        password: password,
      };
      let estimateParam = {
        from: mainPKr,
        to: config.dmwInfo.address,
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
              config.dmwInfo.address,
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
