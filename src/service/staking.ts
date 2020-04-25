import config from '@/common/config';
import serojs from 'serojs';
import seropp from 'sero-pp';
import BigNumber from 'bignumber.js';
import account from '@/service/account';
import { AccountInfo } from '@/model/account';
import tx from '@/service/tx';
import gerorpc from '@/common/gerorpc';

class Staking {
  callContract: any = null;

  constructor() {
    this.callContract = serojs.callContract(
      config.staking.abi,
      config.staking.address,
    );
  }

  async getInterest(_stakingDays: number): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('getInterest', act.MainPKr, [
      '0x' + new BigNumber(_stakingDays).toString(16),
    ]);
  }

  async mySSCWithDraw(): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('mySSCWithDraw', act.MainPKr, []);
  }

  async withDrawSSC(sscName: string, password: string): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.executeMethod(
      'withDrawSSC',
      act.PK,
      act.MainPKr,
      [sscName],
      new BigNumber(0),
      'SERO',
      password,
    );
  }

  async staking(
    stakingDays: number,
    value: BigNumber,
    password: string,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.executeMethod(
      'staking',
      act.PK,
      act.MainPKr,
      ['0x' + new BigNumber(stakingDays).toString(16)],
      value,
      'PFID',
      password,
    );
  }

  async reStaking(
    index: number,
    stakingDays: number,
    password: string,
  ): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.executeMethod(
      'reStaking',
      act.PK,
      act.MainPKr,
      [
        '0x' + new BigNumber(index).toString(16),
        '0x' + new BigNumber(stakingDays).toString(16),
      ],
      new BigNumber(0),
      'SERO',
      password,
    );
  }

  async withDrawShare(shareIndex: number, password: string): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.executeMethod(
      'withDrawShare',
      act.PK,
      act.MainPKr,
      ['0x' + new BigNumber(shareIndex).toString(16)],
      new BigNumber(0),
      'SERO',
      password,
    );
  }

  async allSSC(): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('allSSC', act.MainPKr, []);
  }

  async minStakingValue(): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('minStakingValue', act.MainPKr, []);
  }

  async myPageShare(offset: number, pageSize: number): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    const rest = await this.callMethod('myPageShare', act.MainPKr, [
      '0x' + new BigNumber(offset).toString(16),
      '0x' + new BigNumber(pageSize).toString(16),
    ]);
    return JSON.parse(rest);
  }

  async stakingBalance(): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('stakingBalance', act.MainPKr, []);
  }

  async fee(): Promise<any> {
    const act: AccountInfo = account.getCurrent();
    return this.callMethod('fee', act.MainPKr, []);
  }

  now(): any {
    return Math.ceil(new Date().getTime() / 1000);
  }

  async callMethod(_method: string, from: string, _args: any): Promise<any> {
    const that = this;
    let packData = that.callContract.packData(_method, _args);
    let callParams = {
      from: from,
      to: config.staking.address,
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
        to: config.staking.address,
        value: '0x' + value.toString(16),
        data: packData,
        gasPrice: '0x' + new BigNumber('1000000000').toString(16),
        cy: cy,
        gas: '',
        password: password,
      };
      let estimateParam = {
        from: mainPKr,
        to: config.staking.address,
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
              config.staking.address,
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

const staking = new Staking();

export default staking;
