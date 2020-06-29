class Storage {
  constructor() {
    this.keys = {
      account: {
        current: 'account:current:',
      },
      decimal(cy) {
        return ['decimal', cy].join(':');
      },
      language: 'language',
      readWallet: 'readWallet',
      contractTimer: 'contractTimer',
      walletInfo: 'walletInfo',
    };
  }
  /**
   * Empties the list associated with the object of all key/value pairs, if there are any.
   */
  clear() {
    window.localStorage.clear();
  }
  /**
   * value = storage[key]
   */
  get(key) {
    var jsonStr = window.localStorage.getItem(key);
    return jsonStr ? JSON.parse(jsonStr) : null;
  }
  /**
   * Returns the name of the nth key in the list, or null if n is greater
   * than or equal to the number of key/value pairs in the object.
   */
  key(index) {
    return window.localStorage.key(index);
  }
  delete(key) {
    window.localStorage.removeItem(key);
  }
  /**
   * storage[key] = value
   */
  set(key, value) {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
  /**
   * value = storage[key]
   */
  has(key) {
    let data = window.localStorage.getItem(key);
    return !!data;
  }
  length() {
    return window.localStorage.length;
  }
}
const storage = new Storage();
export { storage };
//# sourceMappingURL=storage.js.map
