import axios from 'axios';
import { storage } from '@/common/storage';

class Gerorpc {
  host: string = 'http://150.158.109.143:8545';

  messageId: number = 1;

  initHost(_host: string): void {
    this.host = _host;
  }

  post(_method: any, _params: any): Promise<any> {
    const walletInfo = storage.get(storage.keys.walletInfo);
    const host = walletInfo && walletInfo.rpc ? walletInfo.rpc : this.host;

    let data: any = {
      id: this.messageId++,
      jsonrpc: '2.0',
      method: _method,
      params: _params,
    };
    return new Promise((resolve, reject) => {
      axios
        .post(host, data)
        .then(resp => {
          if (resp.data.error) {
            reject(resp.data.error.message);
          } else {
            resolve(resp.data.result);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}

const gerorpc = new Gerorpc();

export default gerorpc;
