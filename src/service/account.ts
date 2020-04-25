import { AccountInfo } from '@/model/account';
import { storage } from '@/common/storage';

class Account {
  constructor() {}

  setCurrent(info: AccountInfo): void {
    storage.set(storage.keys.account.current, info);
  }

  getCurrent(): AccountInfo {
    return storage.get(storage.keys.account.current);
  }

  getCurrentBalance(): AccountInfo {
    const act: AccountInfo = storage.get(storage.keys.account.current);
    if (act) {
      return act.Balance;
    }
    return { Address: '', Balance: {}, MainPKr: '', Name: '', PK: '', TK: '' };
  }
}

const account = new Account();

export default account;
