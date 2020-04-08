import { defineConfig } from 'umi';

export default defineConfig({
  locale:{antd:true},
  publicPath:"./",
  history:{type:'hash'},
  routes: [
    { path: '/', component: '@/layouts/index',
      routes: [
        { path: '/',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/wallet/index'
        },
        { path: '/index',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/wallet/index'
        },
        { path: '/wallet',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/wallet/index'
        },

        { path: '/pfid/my',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/pfid/my'
        },
        { path: '/pfid/staking',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/pfid/staking'
        },
        { path: '/pfid/equity',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/pfid/equity'
        },
        { path: '/pfid/govenrn',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/pfid/govenrn'
        },


        { path: '/dmw/list',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/dmw/list'
        },
        { path: '/dmw/dissent',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/dmw/dissent'
        },
        { path: '/dmw/ssc',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/dmw/ssc'
        },

        { path: '/scctools/list',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/scctools/index'
        },
        { path: '/scctools/deposit',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/scctools/deposit'
        },
        { path: '/scctools/borrow',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/scctools/borrow'
        },
        { path: '/DApps',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/dapps/index'
        },
        { path: '/QA',
          wrappers: [
            '@/wrappers/filter',
          ],
          component: '@/pages/QA/index'
        },

      ]
    }
  ],
  theme: {
    "primary-color": "#161796",
  },
  dynamicImport: {

  },
});
