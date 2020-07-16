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
import { AccountInfo } from '@/model/account';
import en_US from 'antd/es/locale/en_US';
import zh_CN from 'antd/es/locale/zh_CN';
import { storage } from '@/common/storage';
import auction from '@/service/auction';
import BigNumber from 'bignumber.js';
import tx, { TxInfo } from '@/service/tx';
import gerorpc from '@/common/gerorpc';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;
const languageList = (
  <Menu>
    <Menu.Item
      onClick={() => {
        changeLang('en_US');
      }}
    >
      English
    </Menu.Item>

    <Menu.Item
      onClick={() => {
        changeLang('ko_KR');
      }}
    >
      한국어
    </Menu.Item>
    <Menu.Item
      onClick={() => {
        changeLang('zh_CN');
      }}
    >
      简体中文
    </Menu.Item>
  </Menu>
);

let timerId: any = null;
// let syncTxStateId: any = null;
// let syncWalletInfoId: any = null;
let walletHost = '//popup-github.sero.cash/?language=';
let walletUrl = walletHost + storage.get(storage.keys.language);

function changeLang(l: string) {
  storage.set(storage.keys.language, l);
  i18n.changeLanguage(l).then(() => {
    document.location.href = 'http://' + document.location.host;
  });
}

class SiderMenus extends React.Component {
  hash = window.location.hash.replace('#', '');

  state = {
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

  componentDidMount(): void {
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

  onlyChrome = () => {
    const isChrome = window.navigator.userAgent.indexOf('Chrome') > -1;
    if (!isChrome) {
      this.setState({
        chromeModal: true,
      });
    }
  };

  startSyncTime() {
    auction.timer().then(rest => {
      storage.set(storage.keys.contractTimer, new BigNumber(rest).toNumber());
    });
  }

  async syncTxState() {
    const that = this;
    const rest: any = await tx.list('');
    if (rest && rest.length > 0) {
      let tmp = [];
      let pendingCount = 0;
      for (let i = 0; i < rest.length; i++) {
        const txInfo: TxInfo = rest[i];
        if (txInfo.state == 'pending') {
          const txReceipt: any = await gerorpc.post(
            'sero_getTransactionReceipt',
            [txInfo.tx_hash],
          );
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

  setRead = () => {
    storage.set(storage.keys.readWallet, true);
  };

  setFrameHeight() {
    const that = this;
    const hash = window.location.hash.replace('#', '');
    this.setState({
      selectKey: hash,
    });

    const pathname: string = document.location.pathname;
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
    const currentAccount: AccountInfo = account.getCurrent();
    if (currentAccount) {
      that.setState({ act: currentAccount });
    }

    setTimeout(function() {
      that
        .getAccountList()
        .then((accounts: any) => {
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

  switchLanguage = (key: string) => {
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

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  async getAccountList() {
    const accounts: any = await popup.accountList();
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

  onSelectCreate = (values: any) => {
    this.setState({
      showSelectAccount: false,
    });
  };

  setVisibleAccount = (f: boolean) => {
    const that = this;
    this.getAccountList().then(() => {
      setTimeout(function() {
        that.setState({
          showSelectAccount: f,
        });
      }, 10);
    });
  };

  selectAccount = (mainPKr: string) => {
    const act = this.state.accountMap.get(mainPKr);

    if (act) {
      this.setState({
        act: act,
      });
      account.setCurrent(act);

      window.location.reload();
    }
  };

  switchMenus(_url: string) {
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
        const tx: TxInfo = txDatas[i];
        let icon: any = <CheckCircleOutlined />;
        if (tx.state == 'pending') {
          icon = <LoadingOutlined />;
        } else if (tx.state == 'success') {
          icon = <CheckCircleOutlined />;
        } else if (tx.state == 'failed') {
          icon = <CloseCircleOutlined />;
        }
        let color: any = '#87d068';
        if (tx.state == 'pending') {
          color = '#ffcd00';
        } else if (tx.state == 'success') {
          color = '#87d068';
        } else if (tx.state == 'failed') {
          color = '#f81d22';
        }

        datasource.push({
          tx_hash: tx.tx_hash,
          avatar: <Avatar icon={icon} style={{ backgroundColor: color }} />,
          description: (
            <div>
              <span>{tx.state}</span>
              <br />
              {/*<span>{tx.assets[0].amount} {tx.assets[0].currency}</span><br/>*/}
              <span>{utils.formatTime(tx.timestamp * 1000)}</span>
            </div>
          ),
        });
      }
    }

    const txList = (
      <div
        style={{
          maxHeight: document.documentElement.clientHeight * 0.5,
          overflowY: 'scroll',
        }}
        className={'txListDropDown'}
      >
        <List
          itemLayout="horizontal"
          dataSource={datasource}
          renderItem={(item: any) => (
            <List.Item>
              <List.Item.Meta
                avatar={item.avatar}
                title={
                  <a
                    href={`https://explorer.sero.cash/txsInfo.html?hash=${item.tx_hash}`}
                    target={'_blank'}
                  >
                    {utils.ellipsis(item.tx_hash)}
                  </a>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    );

    return (
      <I18nextProvider i18n={i18n}>
        <ConfigProvider>
          <div className={'layout'}>
            <Layout>
              <Sider
                trigger={null}
                collapsible
                collapsed={this.state.collapsed}
              >
                <div>
                  <a href={'/#/'}>
                    <img src={logo} className="logo" />
                  </a>
                </div>
                <Menu
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={[selectKey]}
                  defaultOpenKeys={['2', '4']}
                >
                  <Menu.Item
                    key={url.path.wallet}
                    onClick={() => this.switchMenus(url.path.wallet)}
                  >
                    <WalletOutlined />
                    <span>{i18n.t('menus_wallet')}</span>
                  </Menu.Item>
                  <SubMenu
                    key="2"
                    title={
                      <span>
                        <FundOutlined />
                        <span>{i18n.t('menus_pfid')}</span>
                      </span>
                    }
                  >
                    <Menu.Item
                      key={url.path.pfid.my}
                      onClick={() => this.switchMenus(url.path.pfid.my)}
                    >
                      {i18n.t('menus_mypfid')}
                    </Menu.Item>
                    {/*<Menu.Item key="staking" onClick={() => this.switchMenus(url.path.pfid.staking)}>STAKING</Menu.Item>*/}
                    <Menu.Item
                      key={url.path.pfid.equity}
                      onClick={() => this.switchMenus(url.path.pfid.equity)}
                    >
                      {i18n.t('menus_equity')}
                    </Menu.Item>
                    {/*<Menu.Item key="govern" onClick={() => this.switchMenus(url.path.pfid.govenrn)}>GOVERN</Menu.Item>*/}
                  </SubMenu>

                  <Menu.Item
                    key={url.path.dmw.list}
                    onClick={() => this.switchMenus(url.path.dmw.list)}
                  >
                    <WalletOutlined />
                    <span>{i18n.t('menus_dmw')}</span>
                  </Menu.Item>

                  <SubMenu
                    key="4"
                    title={
                      <span>
                        <ToolOutlined />
                        <span>{i18n.t('menus_ssctools')}</span>
                      </span>
                    }
                  >
                    <Menu.Item
                      key={url.path.scctools.list}
                      onClick={() => this.switchMenus(url.path.scctools.list)}
                    >
                      {i18n.t('menus_ssclist')}
                    </Menu.Item>
                    <Menu.Item
                      key={url.path.scctools.my}
                      onClick={() => this.switchMenus(url.path.scctools.my)}
                    >
                      {i18n.t('menus_sscmy')}
                    </Menu.Item>
                  </SubMenu>

                  {/*<Menu.Item*/}
                  {/*  key={url.path.auction}*/}
                  {/*  onClick={() => this.switchMenus(url.path.auction)}*/}
                  {/*>*/}
                  {/*  <WalletOutlined />*/}
                  {/*  {i18n.t('menus_auction')}*/}
                  {/*</Menu.Item>*/}

                  {/*<SubMenu*/}
                  {/*  key="3"*/}
                  {/*  title={*/}
                  {/*    <span>*/}
                  {/*  <CiCircleOutlined/>*/}
                  {/*  <span>DMW</span>*/}
                  {/*</span>*/}
                  {/*  }*/}
                  {/*>*/}
                  {/*  <Menu.Item key="dmwList" onClick={() => this.switchMenus(url.path.dmw.list)}>DMW LIST</Menu.Item>*/}
                  {/*<Menu.Item key="dissent" onClick={() => this.switchMenus(url.path.dmw.dissent)}>DISSENT</Menu.Item>*/}
                  {/*<Menu.Item key="createssc" onClick={() => this.switchMenus(url.path.dmw.ssc)}>CREATE SSC</Menu.Item>*/}
                  {/*</SubMenu>*/}
                  {/*<SubMenu*/}
                  {/*  key="4"*/}
                  {/*  title={*/}
                  {/*    <span>*/}
                  {/*  <ToolOutlined/>*/}
                  {/*  <span>SCCTools</span>*/}
                  {/*</span>*/}
                  {/*  }*/}
                  {/*>*/}
                  {/*  <Menu.Item key="sscList" onClick={() => this.switchMenus(url.path.scctools.list)}>SCC LIST</Menu.Item>*/}
                  {/*</SubMenu>*/}

                  {/*<Menu.Item*/}
                  {/*  key="6"*/}
                  {/*  onClick={() => this.switchMenus(url.path.DApps)}*/}
                  {/*>*/}
                  {/*  <AppstoreAddOutlined />*/}
                  {/*  <span>DAPPS</span>*/}
                  {/*</Menu.Item>*/}
                </Menu>
              </Sider>
              <Layout className="site-layout">
                <Header
                  className="site-layout-background"
                  style={{ padding: 0 }}
                >
                  <div style={{ float: 'right', marginRight: '24px' }}>
                    <Button
                      type={'link'}
                      onClick={() => this.setVisibleAccount(true)}
                    >
                      <span className={'head-account'}>
                        {utils.ellipsis(act.Name)}
                        <small>
                          {act.MainPKr
                            ? ['(', utils.ellipsis(act.MainPKr), ')'].join('')
                            : ''}
                        </small>
                      </span>
                      <Button size={'small'} type={'primary'}>
                        {i18n.t('button_changeAccount')}
                      </Button>
                    </Button>
                    <Divider dashed type={'vertical'} />
                    <Dropdown overlay={txList}>
                      <Badge count={pendingCount}>
                        <UnorderedListOutlined style={{ fontSize: '20px' }} />
                      </Badge>
                    </Dropdown>
                    <Divider dashed type={'vertical'} />
                    <a href={i18n.t('help')} target="_blank">
                      <QuestionCircleOutlined style={{ fontSize: '20px' }} />
                    </a>
                    <Divider dashed type={'vertical'} />
                    <Dropdown overlay={languageList}>
                      <GlobalOutlined style={{ fontSize: '20px' }} />
                    </Dropdown>
                  </div>
                </Header>
                <Content
                  className="site-layout-background"
                  style={{
                    margin: '24px 16px',
                    padding: '24px',
                    minHeight: document.documentElement.clientHeight * 0.81,
                    height: 'auto',
                  }}
                >
                  {this.props.children}
                  <iframe
                    className="wrapperIframe"
                    style={{
                      width: '375px',
                      height: this.state.walletHeight,
                      overflow: 'visible',
                    }}
                    id="popupModel"
                    src={walletUrl}
                    width="100%"
                    frameBorder="no"
                  />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                  NOVAC ©2020 Create By{' '}
                  <a target="_blank" href={'https://pofid.com/'}>
                    <img src={pofid} style={{ height: '25px' }} />
                  </a>
                </Footer>
              </Layout>
            </Layout>
            <ChangeAccountCreateForm
              accounts={accounts}
              visible={showSelectAccount}
              onCreate={this.onSelectCreate}
              onCancel={() => {
                this.setVisibleAccount(false);
              }}
              selectAccount={this.selectAccount}
            />
          </div>
          <Modal
            title="Download Chrome"
            closable={false}
            maskClosable={false}
            visible={this.state.chromeModal}
            keyboard={false}
            footer={null}
          >
            {i18n.t('chrome_down_tip')}{' '}
            <a href={i18n.t('chrome_down')} target={'_blank'}>
              {i18n.t('chrome_down_btn')}
            </a>
          </Modal>
        </ConfigProvider>
      </I18nextProvider>
    );
  }
}

export default SiderMenus;
