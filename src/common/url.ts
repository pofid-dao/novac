import { history } from 'umi';

class Url {
  path = {
    home: '/index',
    wallet: '/wallet',
    pfid: {
      my: '/pfid/my',
      staking: '/pfid/staking',
      equity: '/pfid/equity',
      equityWithdraw: '/pfid/equity/withdraw',
      govenrn: '/pfid/govenrn',
    },
    dmw: {
      list: '/dmw/list',
      dissent: '/dmw/dissent',
      ssc: '/dmw/ssc',
    },
    scctools: {
      list: '/scctools/list',
      my: '/scctools/my',
      deposit: '/scctools/deposit',
      borrow: '/scctools/borrow',
    },
    scctoolsV2: {
      list: '/scctoolsv2/list',
      my: '/scctoolsv2/my',
      deposit: '/scctoolsv2/deposit',
      borrow: '/scctoolsv2/borrow',
    },
    auction: '/auction',
    DApps: '/DApps',
    QA: '/QA',
  };

  goPage(path: string): void {
    history.push(path);
  }
}

const url = new Url();

export { url };
