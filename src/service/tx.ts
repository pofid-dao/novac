import { Database, DatabaseTable } from '@/common/db/types';
import { PopDB } from '@/common/db/PopDB';
import BigNumber from 'bignumber.js';
import utils from '@/common/utils';
import { AccountInfo } from '@/model/account';
import account from '@/service/account';

class Tx {
  _db: PopDB = new PopDB(dbConfig);

  async add(tx: TxInfo) {
    await this._db.insert(txList.name, tx);
  }

  detail(txHash: string): Promise<TxInfo | null> {
    const that = this;
    return new Promise<TxInfo | null>((resolve, reject) => {
      that._db
        .select(txList.name, { tx_hash: txHash })
        .then((rest: any) => {
          console.log('rest>>>', rest);
          const tx: TxInfo = rest[0];
          resolve(tx);
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  list(state?: string): Promise<Array<TxInfo> | null> {
    const that = this;
    const act: AccountInfo = account.getCurrent();
    return new Promise<Array<TxInfo>>((resolve, reject) => {
      if (!act) {
        resolve();
      } else {
        if (state) {
          that._db
            .some(txList.name, { state: state, from: act.PK }, 50)
            .then((rest: any) => {
              resolve(rest);
            })
            .catch(e => {
              reject(e);
            });
        } else {
          that._db
            .some(txList.name, { from: act.PK }, 50)
            .then((rest: any) => {
              resolve(rest);
            })
            .catch(e => {
              reject(e);
            });
        }
      }
    });
  }

  update(tx: TxInfo): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const that = this;
      that._db
        .update(txList.name, tx)
        .then(() => {
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  }

  addTx(
    value: BigNumber,
    cy: string,
    rest: any,
    from: string,
    gas: any,
    to: string,
    method: string,
  ) {
    if (rest.indexOf('0x') > -1 && rest.length === 66) {
      const that = this;
      utils.getDecimal(cy).then(decimal => {
        let txInfo: TxInfo = {
          assets: [
            {
              amount: utils.toValue(value.toString(10), decimal).toString(10),
              currency: cy,
            },
          ],
          tx_hash: rest,
          state: 'pending',
          timestamp: Math.ceil(new Date().getTime() / 1000),
          from: from,
          to: to,
          operation: method,
          gas: gas,
          gasPrice: '1000000000',
        };
        that
          .add(txInfo)
          .then(rest => {
            console.log('add tx rest=>', rest);
          })
          .catch(e => {
            console.log('add tx err=>', e);
          });
      });
    }
  }
}

export interface TxInfo {
  tx_hash: string;
  block_number?: number;
  state: string;
  assets: Array<Asset>;
  timestamp: number;
  from: string;
  to: string;
  operation: string;
  gas?: string;
  gasPrice?: string;
}

export interface Asset {
  currency: string;
  amount: string;
}

const txList: DatabaseTable = {
  name: 'tx_list',
  keyPath: 'id',
  autoIncrement: true,
  indexes: [
    {
      index: 'tx_hash',
      relativeIndex: 'tx_hash',
      unique: true,
    },
    {
      index: 'state',
      relativeIndex: 'state',
      unique: false,
    },
    {
      index: 'block_number',
      relativeIndex: 'block_number',
      unique: false,
    },
    {
      index: 'from',
      relativeIndex: 'from',
      unique: false,
    },
  ],
};

const dbConfig: Database = {
  databaseName: 'novac',
  tables: [txList],
  version: 1,
};

const tx = new Tx();

export default tx;
