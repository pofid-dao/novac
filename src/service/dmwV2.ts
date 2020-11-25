import config from '@/common/config';
import { AccountInfo } from '@/model/account';
import serojs from 'serojs';
import seropp from 'sero-pp';
import account from '@/service/account';
import BigNumber from 'bignumber.js';
import utils from '@/common/utils';
import tx from '@/service/tx';
import gerorpc from '@/common/gerorpc';
import DmwProxy from '@/service/dmwProxy';
import dmwBase from '@/service/dmwBaseV2';

class Dmw {
  callContract: any = null;

  constructor() {
    this.callContract = serojs.callContract(
      config.dmwV2.abi,
      config.dmwV2.address,
    );
  }

  async claim(
    contractIndex: number,
    mintCoin: string,
    amount: any,
    password: string,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.executeMethod(
      'claim',
      act.PK,
      act.MainPKr,
      [contractIndex],
      new BigNumber(amount),
      mintCoin,
      password,
    );
  }

  async issue(
    mintCoin: string,
    backedCoin: string,
    amount: any,
    password: string,
    proxy?: boolean,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.executeMethod(
      'issue',
      act.PK,
      act.MainPKr,
      [mintCoin],
      new BigNumber(amount),
      backedCoin,
      password,
      proxy,
    );
  }

  async estimatMintAmount(
    _backedCoin: string,
    _mintCoin: string,
    _backedValue: any,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('estimatMintAmount', act.MainPKr, [
      _backedCoin,
      _mintCoin,
      utils.toHex(_backedValue),
    ]);
  }

  async currentRate(_backedCoin: string, _mintCoin: string): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('currentRate', act.MainPKr, [
      _backedCoin,
      _mintCoin,
    ]);
  }

  async collateralRate(_backedCoin: string, _mintCoin: string): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('collateralRate', act.MainPKr, [
      _backedCoin,
      _mintCoin,
    ]);
  }

  async thresholdRate(_backedCoin: string, _mintCoin: string): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('thresholdRate', act.MainPKr, [
      _backedCoin,
      _mintCoin,
    ]);
  }

  async getMinBackedAmount(
    _backedCoin: string,
    _mintCoin: string,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('getMinBackedAmount', act.MainPKr, [
      _backedCoin,
      _mintCoin,
    ]);
  }

  async estimatAddDepositAmount(_contractIndex: number): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('estimatAddDepositAmount', act.MainPKr, [
      _contractIndex,
    ]);
  }

  async deposit(
    _contractIndex: number,
    password: string,
    value: any,
    backedCoin: string,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.executeMethod(
      'deposit',
      act.PK,
      act.MainPKr,
      [_contractIndex],
      new BigNumber(value),
      backedCoin,
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
      to: config.dmwV2.address,
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
    proxy?: boolean,
  ): Promise<any> {
    let that = this;
    let packData = that.callContract.packData(_method, args);
    let executeData = {
      from: from,
      to: config.dmwV2.address,
      value: '0x' + value.toString(16),
      data: packData,
      gasPrice: '0x' + new BigNumber('1000000000').toString(16),
      cy: cy,
      gas: '',
      password: password,
      feeCy: 'SERO',
    };
    let estimateParam = {
      from: mainPKr,
      to: config.dmwV2.address,
      value: '0x' + value.toString(16),
      data: packData,
      gasPrice: '0x' + new BigNumber('1000000000').toString(16),
      cy: cy,
    };
    let convertAddress = config.dmwV2.address;
    if (proxy == true && _method == 'issue') {
      const proxyAddress = await dmwBase.getProxyAddress(cy, args[0]);
      const bddress = await gerorpc.post('sero_getFullAddress', [
        [proxyAddress],
      ]);
      convertAddress = bddress[proxyAddress];
      estimateParam.to = convertAddress;
    }
    const gas = await gerorpc.post('sero_estimateGas', [estimateParam]);
    executeData.gas = gas;
    let contractAddress = config.dmwV2.address;
    if (proxy == true && _method == 'issue') {
      const dmwProxy = new DmwProxy(convertAddress);
      const feeCoin: any = await dmwProxy.feeCoin();
      const estimateGas: any = await dmwProxy.estimateGas(gas);
      executeData.feeCy = feeCoin;
      contractAddress = convertAddress;
      executeData.to = convertAddress;
      executeData.gas = '0x' + new BigNumber(estimateGas).toString(16);
    }

    return new Promise<any>((resolve, reject) => {
      seropp.executeContract(executeData, function(rest: any) {
        tx.addTx(value, cy, rest, from, gas, contractAddress, _method);
        resolve(rest);
      });
    });
  }
}

const dmw = new Dmw();

export default dmw;
