// @ts-ignore
import seropp from 'sero-pp';
const dapp = {
  name: 'Novac',
  contractAddress: 'Novac',
  github: 'http://localhost:8000',
  author: 'pofit',
  url: document.location.href,
  logo:
    document.location.protocol +
    '//' +
    document.location.host +
    '/airdrop/sero.png',
  embedType: 2,
};
class Popup {
  constructor() {
    seropp.init(dapp, function(data) {
      console.log(data);
    });
  }
  async accountList() {
    return new Promise(resolve => {
      seropp.getAccountList(function(rest) {
        resolve(rest);
      });
    });
  }
  async getAccount(pk) {
    return new Promise(resolve => {
      seropp.getAccountDetail(pk, function(rest) {
        resolve(rest);
      });
    });
  }
  async getInfo() {
    return new Promise(resolve => {
      seropp.getInfo(function(rest) {
        resolve(rest);
      });
    });
  }
}
const popup = new Popup();
export { popup };
//# sourceMappingURL=popup.js.map
