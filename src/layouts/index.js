import * as React from 'react';
import {
  Layout,
  Divider,
  Button,
  Menu,
  Dropdown,
  message,
  notification,
  ConfigProvider,
  List,
  Avatar,
  Badge,
  Modal,
} from 'antd';
import {
  GlobalOutlined,
  WalletOutlined,
  QuestionCircleOutlined,
  UnorderedListOutlined,
  FundOutlined,
  ToolOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import './index.css';
import logo from '../img/logo.png';
import pofid from '../img/pofid.png';
import { url } from '@/common/url';
import utils from '@/common/utils';
import { popup } from '@/service/popup';
import ChangeAccountCreateForm from '@/components/ChangeAccount';
import account from '@/service/account';
import en_US from 'antd/es/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import { storage } from '@/common/storage';
import auction from '@/service/auction';
import BigNumber from 'bignumber.js';
import tx from '@/service/tx';
import gerorpc from '@/common/gerorpc';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';
const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const languageList = React.createElement(
  Menu,
  null,
  React.createElement(
    Menu.Item,
    {
      onClick: () => {
        changeLang('en_US');
      },
    },
    'English',
  ),
  React.createElement(
    Menu.Item,
    {
      onClick: () => {
        changeLang('ko_KR');
      },
    },
    '\uD55C\uAD6D\uC5B4',
  ),
  React.createElement(
    Menu.Item,
    {
      onClick: () => {
        changeLang('zh_CN');
      },
    },
    '\u7B80\u4F53\u4E2D\u6587',
  ),
);
let timerId = null;
// let syncTxStateId: any = null;
// let syncWalletInfoId: any = null;
let walletHost = '//popup-github.sero.cash/?language=';
let walletUrl = walletHost + storage.get(storage.keys.language);
function changeLang(l) {
  storage.set(storage.keys.language, l);
  i18n.changeLanguage(l).then(() => {
    document.location.href = 'http://' + document.location.host;
  });
}
class SiderMenus extends React.Component {
  constructor() {
    super(...arguments);
    this.hash = window.location.hash.replace('#', '');
    this.state = {
      collapsed: false,
      walletHeight: 0,
      accounts: [],
      showSelectAccount: false,
      act: { Name: '', MainPKr: '' },
      accountMap: new Map(),
      selectKey: this.hash,
      language: 'en_US',
      locale: en_US,
      txDatas: [],
      pendingCount: 0,
      chromeModal: false,
    };
    this.onlyChrome = () => {
      const isChrome = window.navigator.userAgent.indexOf('Chrome') > -1;
      if (!isChrome) {
        this.setState({
          chromeModal: true,
        });
      }
    };
    this.setRead = () => {
      storage.set(storage.keys.readWallet, true);
    };
    this.switchLanguage = key => {
      storage.set(storage.keys.language, key);
      if (key === 'en_US') {
        this.setState({
          language: key,
          locale: en_US,
        });
      } else if (key === 'zh_CN') {
        this.setState({
          language: key,
          locale: zh_CN,
        });
      }
    };
    this.toggle = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };
    this.onSelectCreate = values => {
      this.setState({
        showSelectAccount: false,
      });
    };
    this.setVisibleAccount = f => {
      const that = this;
      this.getAccountList().then(() => {
        setTimeout(function() {
          that.setState({
            showSelectAccount: f,
          });
        }, 10);
      });
    };
    this.selectAccount = mainPKr => {
      const act = this.state.accountMap.get(mainPKr);
      if (act) {
        this.setState({
          act: act,
        });
        account.setCurrent(act);
        window.location.reload();
      }
    };
  }
  componentDidMount() {
    const that = this;
    that.setFrameHeight();
    that.initWallet();
    setTimeout(function() {
      that.walletTips();
    }, 3000);
    if (timerId == null) {
      timerId = setInterval(function() {
        that.startSyncTime();
        that.syncTxState().then();
        that.initWalletInfo();
      }, 5 * 1000);
    }
    this.onlyChrome();
  }
  startSyncTime() {
    auction.timer().then(rest => {
      storage.set(storage.keys.contractTimer, new BigNumber(rest).toNumber());
    });
  }
  async syncTxState() {
    const that = this;
    const rest = await tx.list('');
    if (rest && rest.length > 0) {
      let tmp = [];
      let pendingCount = 0;
      for (let i = 0; i < rest.length; i++) {
        const txInfo = rest[i];
        if (txInfo.state == 'pending') {
          const txReceipt = await gerorpc.post('sero_getTransactionReceipt', [
            txInfo.tx_hash,
          ]);
          if (txReceipt && txReceipt.blockNumber) {
            if (txReceipt.status === '0x1') {
              txInfo.state = 'success';
            } else {
              txInfo.state = 'failed';
            }
            txInfo.block_number = new BigNumber(
              txReceipt.blockNumber.substr(2),
              16,
            ).toNumber();
            tx.update(txInfo).then();
          } else {
            if (
              Math.ceil(new Date().getTime() / 1000 - txInfo.timestamp) >
              15 * 60
            ) {
              txInfo.state = 'failed';
              tx.update(txInfo).then();
            }
          }
        }
        if (txInfo.state == 'pending') {
          pendingCount++;
        }
        tmp.push(txInfo);
      }
      that.setState({
        txDatas: tmp,
        pendingCount: pendingCount,
      });
    }
  }
  walletTips() {
    const that = this;
    const tips = storage.get(storage.keys.readWallet);
    if (!tips) {
      notification.info({
        message: 'Note',
        description:
          "In Novac V1.0, the account asset management functionality calls Popup's API and will be re-customized in a future release",
        onClose: () => {
          that.setRead();
        },
        duration: null,
      });
    }
  }
  setFrameHeight() {
    const that = this;
    const hash = window.location.hash.replace('#', '');
    this.setState({
      selectKey: hash,
    });
    const pathname = document.location.pathname;
    if (pathname.indexOf('/wallet') > -1) {
      this.setState({
        walletHeight: document.documentElement.clientHeight,
      });
    }
  }
  initWallet() {
    const that = this;
    that.onInitAccount();
  }
  initWalletInfo() {
    popup
      .getInfo()
      .then(rest => {
        console.log('getInfo>>', rest);
        storage.set(storage.keys.walletInfo, rest);
      })
      .catch(e => {});
  }
  onInitAccount() {
    const that = this;
    const currentAccount = account.getCurrent();
    if (currentAccount) {
      that.setState({ act: currentAccount });
    }
    setTimeout(function() {
      that
        .getAccountList()
        .then(accounts => {
          if (!currentAccount && accounts && accounts.length > 0) {
            that.setState({
              act: accounts[0],
            });
            account.setCurrent(accounts[0]);
          }
        })
        .catch(error => {
          console.log('error >> ', error);
        });
    }, 3000);
  }
  async getAccountList() {
    const accounts = await popup.accountList();
    if (accounts && accounts.length > 0) {
      let accountTmpMap = new Map();
      for (let account of accounts) {
        accountTmpMap.set(account.MainPKr, account);
      }
      this.setState({
        accounts: accounts,
        accountMap: accountTmpMap,
      });
    }
    return new Promise(resolve => {
      resolve(accounts);
    });
  }
  switchMenus(_url) {
    const { act } = this.state;
    console.log('act>> ', act);
    if (!act.Name) {
      message.error('Please Change Account');
    } else {
      url.goPage(_url);
    }
  }
  render() {
    const {
      showSelectAccount,
      accounts,
      act,
      selectKey,
      txDatas,
      pendingCount,
    } = this.state;
    let datasource = [];
    if (txDatas && txDatas.length > 0) {
      for (let i = 0; i < txDatas.length; i++) {
        const tx = txDatas[i];
        let icon = React.createElement(CheckCircleOutlined, null);
        if (tx.state == 'pending') {
          icon = React.createElement(LoadingOutlined, null);
        } else if (tx.state == 'success') {
          icon = React.createElement(CheckCircleOutlined, null);
        } else if (tx.state == 'failed') {
          icon = React.createElement(CloseCircleOutlined, null);
        }
        let color = '#87d068';
        if (tx.state == 'pending') {
          color = '#ffcd00';
        } else if (tx.state == 'success') {
          color = '#87d068';
        } else if (tx.state == 'failed') {
          color = '#f81d22';
        }
        datasource.push({
          tx_hash: tx.tx_hash,
          avatar: React.createElement(Avatar, {
            icon: icon,
            style: { backgroundColor: color },
          }),
          description: React.createElement(
            'div',
            null,
            React.createElement('span', null, tx.state),
            React.createElement('br', null),
            React.createElement(
              'span',
              null,
              utils.formatTime(tx.timestamp * 1000),
            ),
          ),
        });
      }
    }
    const txList = React.createElement(
      'div',
      {
        style: {
          maxHeight: document.documentElement.clientHeight * 0.5,
          overflowY: 'scroll',
        },
        className: 'txListDropDown',
      },
      React.createElement(List, {
        itemLayout: 'horizontal',
        dataSource: datasource,
        renderItem: item =>
          React.createElement(
            List.Item,
            null,
            React.createElement(List.Item.Meta, {
              avatar: item.avatar,
              title: React.createElement(
                'a',
                {
                  href: `https://explorer.sero.cash/txsInfo.html?hash=${item.tx_hash}`,
                  target: '_blank',
                },
                utils.ellipsis(item.tx_hash),
              ),
              description: item.description,
            }),
          ),
      }),
    );
    return React.createElement(
      I18nextProvider,
      { i18n: i18n },
      React.createElement(
        ConfigProvider,
        null,
        React.createElement(
          'div',
          { className: 'layout' },
          React.createElement(
            Layout,
            null,
            React.createElement(
              Sider,
              {
                trigger: null,
                collapsible: true,
                collapsed: this.state.collapsed,
              },
              React.createElement(
                'div',
                null,
                React.createElement(
                  'a',
                  { href: '/#/' },
                  React.createElement('img', { src: logo, className: 'logo' }),
                ),
              ),
              React.createElement(
                Menu,
                {
                  theme: 'dark',
                  mode: 'inline',
                  defaultSelectedKeys: [selectKey],
                  defaultOpenKeys: ['2', '4'],
                },
                React.createElement(
                  Menu.Item,
                  {
                    key: url.path.wallet,
                    onClick: () => this.switchMenus(url.path.wallet),
                  },
                  React.createElement(WalletOutlined, null),
                  React.createElement('span', null, i18n.t('menus_wallet')),
                ),
                React.createElement(
                  SubMenu,
                  {
                    key: '2',
                    title: React.createElement(
                      'span',
                      null,
                      React.createElement(FundOutlined, null),
                      React.createElement('span', null, i18n.t('menus_pfid')),
                    ),
                  },
                  React.createElement(
                    Menu.Item,
                    {
                      key: url.path.pfid.my,
                      onClick: () => this.switchMenus(url.path.pfid.my),
                    },
                    i18n.t('menus_mypfid'),
                  ),
                  React.createElement(
                    Menu.Item,
                    {
                      key: url.path.pfid.equity,
                      onClick: () => this.switchMenus(url.path.pfid.equity),
                    },
                    i18n.t('menus_equity'),
                  ),
                ),
                React.createElement(
                  Menu.Item,
                  {
                    key: url.path.dmw.list,
                    onClick: () => this.switchMenus(url.path.dmw.list),
                  },
                  React.createElement(WalletOutlined, null),
                  React.createElement('span', null, i18n.t('menus_dmw')),
                ),
                React.createElement(
                  SubMenu,
                  {
                    key: '4',
                    title: React.createElement(
                      'span',
                      null,
                      React.createElement(ToolOutlined, null),
                      React.createElement(
                        'span',
                        null,
                        i18n.t('menus_ssctools'),
                      ),
                    ),
                  },
                  React.createElement(
                    Menu.Item,
                    {
                      key: url.path.scctools.list,
                      onClick: () => this.switchMenus(url.path.scctools.list),
                    },
                    i18n.t('menus_ssclist'),
                  ),
                  React.createElement(
                    Menu.Item,
                    {
                      key: url.path.scctools.my,
                      onClick: () => this.switchMenus(url.path.scctools.my),
                    },
                    i18n.t('menus_sscmy'),
                  ),
                ),
              ),
            ),
            React.createElement(
              Layout,
              { className: 'site-layout' },
              React.createElement(
                Header,
                { className: 'site-layout-background', style: { padding: 0 } },
                React.createElement(
                  'div',
                  { style: { float: 'right', marginRight: '24px' } },
                  React.createElement(
                    Button,
                    {
                      type: 'link',
                      onClick: () => this.setVisibleAccount(true),
                    },
                    React.createElement(
                      'span',
                      { className: 'head-account' },
                      utils.ellipsis(act.Name),
                      React.createElement(
                        'small',
                        null,
                        act.MainPKr
                          ? ['(', utils.ellipsis(act.MainPKr), ')'].join('')
                          : '',
                      ),
                    ),
                    React.createElement(
                      Button,
                      { size: 'small', type: 'primary' },
                      i18n.t('button_changeAccount'),
                    ),
                  ),
                  React.createElement(Divider, {
                    dashed: true,
                    type: 'vertical',
                  }),
                  React.createElement(
                    Dropdown,
                    { overlay: txList },
                    React.createElement(
                      Badge,
                      { count: pendingCount },
                      React.createElement(UnorderedListOutlined, {
                        style: { fontSize: '20px' },
                      }),
                    ),
                  ),
                  React.createElement(Divider, {
                    dashed: true,
                    type: 'vertical',
                  }),
                  React.createElement(
                    'a',
                    { href: i18n.t('help'), target: '_blank' },
                    React.createElement(QuestionCircleOutlined, {
                      style: { fontSize: '20px' },
                    }),
                  ),
                  React.createElement(Divider, {
                    dashed: true,
                    type: 'vertical',
                  }),
                  React.createElement(
                    Dropdown,
                    { overlay: languageList },
                    React.createElement(GlobalOutlined, {
                      style: { fontSize: '20px' },
                    }),
                  ),
                ),
              ),
              React.createElement(
                Content,
                {
                  className: 'site-layout-background',
                  style: {
                    margin: '24px 16px',
                    padding: '24px',
                    minHeight: document.documentElement.clientHeight * 0.81,
                    height: 'auto',
                  },
                },
                this.props.children,
                React.createElement('iframe', {
                  className: 'wrapperIframe',
                  style: {
                    width: '375px',
                    height: this.state.walletHeight,
                    overflow: 'visible',
                  },
                  id: 'popupModel',
                  src: walletUrl,
                  width: '100%',
                  frameBorder: 'no',
                }),
              ),
              React.createElement(
                Footer,
                { style: { textAlign: 'center' } },
                'NOVAC \u00A92020 Create By',
                ' ',
                React.createElement(
                  'a',
                  { target: '_blank', href: 'https://pofid.com/' },
                  React.createElement('img', {
                    src: pofid,
                    style: { height: '25px' },
                  }),
                ),
              ),
            ),
          ),
          React.createElement(ChangeAccountCreateForm, {
            accounts: accounts,
            visible: showSelectAccount,
            onCreate: this.onSelectCreate,
            onCancel: () => {
              this.setVisibleAccount(false);
            },
            selectAccount: this.selectAccount,
          }),
        ),
        React.createElement(
          Modal,
          {
            title: 'Download Chrome',
            closable: false,
            maskClosable: false,
            visible: this.state.chromeModal,
            keyboard: false,
            footer: null,
          },
          i18n.t('chrome_down_tip'),
          ' ',
          React.createElement(
            'a',
            { href: i18n.t('chrome_down'), target: '_blank' },
            i18n.t('chrome_down_btn'),
          ),
        ),
      ),
    );
  }
}
export default SiderMenus;
//# sourceMappingURL=index.js.map
