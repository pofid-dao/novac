import { PopDB } from '@/common/db/PopDB';
import utils from '@/common/utils';
import account from '@/service/account';
class Tx {
  constructor() {
    this._db = new PopDB(dbConfig);
  }
  async add(tx) {
    await this._db.insert(txList.name, tx);
  }
  detail(txHash) {
    const that = this;
    return new Promise((resolve, reject) => {
      that._db
        .select(txList.name, { tx_hash: txHash })
        .then(rest => {
          console.log('rest>>>', rest);
          const tx = rest[0];
          resolve(tx);
        })
        .catch(e => {
          reject(e);
        });
    });
  }
  list(state) {
    const that = this;
    const act = account.getCurrent();
    return new Promise((resolve, reject) => {
      if (!act) {
        resolve();
      } else {
        if (state) {
          that._db
            .some(txList.name, { state: state, from: act.PK }, 50)
            .then(rest => {
              resolve(rest);
            })
            .catch(e => {
              reject(e);
            });
        } else {
          that._db
            .some(txList.name, { from: act.PK }, 50)
            .then(rest => {
              resolve(rest);
            })
            .catch(e => {
              reject(e);
            });
        }
      }
    });
  }
  update(tx) {
    return new Promise((resolve, reject) => {
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
  addTx(value, cy, rest, from, gas, to, method) {
    if (rest.indexOf('0x') > -1 && rest.length === 66) {
      const that = this;
      utils.getDecimal(cy).then(decimal => {
        let txInfo = {
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
const txList = {
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
const dbConfig = {
  databaseName: 'novac',
  tables: [txList],
  version: 1,
};
const tx = new Tx();
export default tx;
//# sourceMappingURL=tx.js.map
