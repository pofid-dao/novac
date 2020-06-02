import { defineConfig } from 'umi';

export default defineConfig({
  // locale:{antd:true},
  publicPath: './',
  history: { type: 'hash' },
  favicon: '/assets/favicon.ico',
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/wallet/index',
        },
        {
          path: '/index',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/wallet/index',
          title: 'NOVAC - Home',
        },
        {
          path: '/wallet',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/wallet/index',
          title: 'NOVAC - Wallet',
        },

        {
          path: '/pfid/my',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/pfid/my',
          title: 'NOVAC - MY PFID',
        },
        {
          path: '/pfid/equity',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/pfid/equity',
          title: 'NOVAC - EQUITY',
        },
        {
          path: '/pfid/equity/withdraw',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/pfid/equity-withdraw',
          title: 'NOVAC - EQUITY - WITHDRAW',
        },
        {
          path: '/pfid/govenrn',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/pfid/govenrn',
          title: 'NOVAC - GOVENRN',
        },

        {
          path: '/dmw/list',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/dmw/list',
          title: 'NOVAC - DMW - LIST',
        },
        {
          path: '/scctools/list',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/scctools/index',
          title: 'NOVAC - AOC - LIST',
        },
        {
          path: '/scctools/my',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/scctools/my',
          title: 'NOVAC - AOC - MY',
        },

        {
          path: '/auction',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/auction/index',
          title: 'NOVAC - AUCTION',
        },
        {
          path: '/DApps',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/dapps/index',
        },
        {
          path: '/QA',
          wrappers: ['@/wrappers/filter'],
          component: '@/pages/QA/index',
        },
      ],
    },
  ],
  theme: {
    '@primary-color': '#161796',
    '@font-family': '"Inferi Normal", "Times New Roman", serif',
  },
  styles: [
    `font-family:"Inferi Normal", "Times New Roman", serif`,
    `letter-spacing:.02rem`,
  ],

  dynamicImport: {},
});
