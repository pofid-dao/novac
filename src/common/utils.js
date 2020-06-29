import BigNumber from 'bignumber.js';
import { storage } from '@/common/storage';
import gerorpc from '@/common/gerorpc';
class Utils {
  ellipsis(str) {
    if (str && str.length > 8) {
      str = str.substr(0, 8) + '...' + str.substr(str.length - 8);
    }
    return str;
  }
  toValue(value, decimal) {
    return new BigNumber(value).dividedBy(new BigNumber(10).pow(decimal));
  }
  fromValue(value, decimal) {
    return new BigNumber(value).multipliedBy(new BigNumber(10).pow(decimal));
  }
  async getDecimal(currency) {
    if (currency == 'SERO') {
      return new Promise(resolve => resolve(18));
    }
    const cache = storage.get(storage.keys.decimal(currency));
    if (cache) {
      return new Promise(resolve => resolve(cache));
    } else {
      const data = await gerorpc.post('sero_getDecimal', [currency]);
      const decimal = new BigNumber(data, 16).toNumber();
      storage.set(storage.keys.decimal(currency), decimal);
      return new Promise(resolve => resolve(decimal));
    }
  }
  getDecimalCache(currency) {
    if (currency == 'SERO') {
      return 18;
    }
    const cache = storage.get(storage.keys.decimal(currency));
    return cache;
  }
  formatTime(timestamp) {
    return (
      new Date(timestamp).toLocaleTimeString() +
      ' ' +
      new Date(timestamp).toLocaleDateString()
    );
  }
  toHex(value) {
    return '0x' + new BigNumber(value).toString(16);
  }
}
const utils = new Utils();
export default utils;
//# sourceMappingURL=utils.js.map
