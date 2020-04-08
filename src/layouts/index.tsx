import * as React from "react";
import {Layout, Divider, Button, Menu, Dropdown} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GlobalOutlined,
  WalletOutlined,
  FundOutlined,
  ToolOutlined,
  QuestionCircleOutlined,
  AppstoreAddOutlined,
  CiCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';
import './index.css'
import logo from '../img/logo.png'
import pofid from '../img/pofid.png'
import {url} from '@/common/url'
import {utils} from "@/common/utils";

const {Header, Sider, Content, Footer} = Layout;
const {SubMenu} = Menu;
const language = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        简体中文
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        English
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="#">
        한국어
      </a>
    </Menu.Item>
  </Menu>
);

class SiderMenus extends React.Component {
  state = {
    collapsed: false,
    walletHeight: 0,
  };

  componentDidMount(): void {

    const pathname: string = document.location.pathname;

    console.log("pathname>>>", pathname);
    if (pathname.indexOf("/wallet") > -1) {
      this.setState({
        walletHeight: document.documentElement.clientHeight
      })
    }
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (<div className={"layout"}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div><img src={logo} className="logo"/></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              {/*<SubMenu*/}
              {/*  key="1"*/}
              {/*  title={*/}
              {/*    <span>*/}
              {/*  <WalletOutlined/>*/}
              {/*  <span>Wallet</span>*/}
              {/*</span>*/}
              {/*  }*/}
              {/*>*/}
              {/*  <Menu.Item key="account">Account</Menu.Item>*/}
              {/*  <Menu.Item key="transfer">Transfer</Menu.Item>*/}
              {/*</SubMenu>*/}
              {/*<Menu.Item key="0" onClick={() => url.goPage(url.path.home)}>*/}
              {/*  <HomeOutlined/>*/}
              {/*  <span >Home</span>*/}
              {/*</Menu.Item>*/}
              <Menu.Item key="1" onClick={() => url.goPage(url.path.wallet)}>
                <WalletOutlined/>
                <span>Wallet</span>
              </Menu.Item>
              <SubMenu
                key="2"
                title={
                  <span>
                <FundOutlined/>
                <span>PFID</span>
              </span>
                }
              >
                <Menu.Item key="mypfid" onClick={() => url.goPage(url.path.pfid.my)}>MY PFID</Menu.Item>
                {/*<Menu.Item key="staking" onClick={() => url.goPage(url.path.pfid.staking)}>STAKING</Menu.Item>*/}
                <Menu.Item key="equity" onClick={() => url.goPage(url.path.pfid.equity)}>EQUITY</Menu.Item>
                <Menu.Item key="govern" onClick={() => url.goPage(url.path.pfid.govenrn)}>GOVERN</Menu.Item>
              </SubMenu>
              <SubMenu
                key="3"
                title={
                  <span>
                <CiCircleOutlined/>
                <span>DMW</span>
              </span>
                }
              >
                <Menu.Item key="dmwList" onClick={() => url.goPage(url.path.dmw.list)}>DMW LIST</Menu.Item>
                {/*<Menu.Item key="dissent" onClick={() => url.goPage(url.path.dmw.dissent)}>DISSENT</Menu.Item>*/}
                {/*<Menu.Item key="createssc" onClick={() => url.goPage(url.path.dmw.ssc)}>CREATE SSC</Menu.Item>*/}
              </SubMenu>
              <SubMenu
                key="4"
                title={
                  <span>
                <ToolOutlined/>
                <span>SCCTools</span>
              </span>
                }
              >
                <Menu.Item key="sscList" onClick={() => url.goPage(url.path.scctools.list)}>SCC LIST</Menu.Item>
              </SubMenu>
              <Menu.Item key="5" onClick={() => url.goPage(url.path.DApps)}>
                <AppstoreAddOutlined/>
                <span>DAPPS</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{padding: 0}}>
              <div style={{float: 'right', marginRight: '24px'}}>
                <QuestionCircleOutlined style={{fontSize: '20px'}}/>
                <Divider dashed type={"vertical"}/>
                <Dropdown overlay={language}>
                  <GlobalOutlined style={{fontSize: '20px'}}/>
                </Dropdown>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                width: '100%',
                minHeight: document.documentElement.clientHeight * 0.93,
              }}
            >
              {this.props.children}
              <iframe className="wrapperIframe"
                      style={{width: '375px', height: this.state.walletHeight, overflow: 'visible'}}
                      id="popupModel"
                      // src={"http://sero-cash.gitee.io/popup/#/"}
                      src={"http://127.0.0.1:3001"}
                      width="100%"
                      frameBorder="no"
              />
            </Content>
            <Footer style={{textAlign: 'center'}}>NOVAC ©2020 Create By <a href={"#"}><img src={pofid}
                                                                                           style={{height: '25px'}}/></a></Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default SiderMenus
