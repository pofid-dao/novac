import { storage } from '@/common/storage';
class Account {
  constructor() {}
  setCurrent(info) {
    storage.set(storage.keys.account.current, info);
  }
  getCurrent() {
    return storage.get(storage.keys.account.current);
  }
  getCurrentBalance() {
    const act = storage.get(storage.keys.account.current);
    if (act) {
      return act.Balance;
    }
    return { Address: '', Balance: {}, MainPKr: '', Name: '', PK: '', TK: '' };
  }
}
const account = new Account();
export default account;
//# sourceMappingURL=account.js.map
