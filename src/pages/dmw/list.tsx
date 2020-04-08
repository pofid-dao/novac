import React,{Component} from 'react';
import {Button, Col, Row, Tabs,Divider} from 'antd'
import {StarFilled} from '@ant-design/icons';
import './list.css';
import DissentCreateForm from "@/components/Dissent";
import CreateSSCForm from "@/components/CreateSSC";

const { TabPane } = Tabs;

class DmwList extends Component{

  state = {
    visible:false,
    visibleSSC:false,
  }

  onCreate = (values:any) => {
    this.setState({
      visible:false
    })
  };

  setVisible=(f:boolean)=>{
    this.setState({
      visible:f
    })
  }

  onCreateSSC = (values:any) => {
    this.setState({
      visibleSSC:false
    })
  };

  setVisibleSSC=(f:boolean)=>{
    this.setState({
      visibleSSC:f
    })
  }

  render() {

    const {visible,visibleSSC} = this.state;
    return <div>
      <Row className={"pfid-title"}>
        <Col span={12}><span>DMW List</span></Col>
        <Col span={12} style={{textAlign:'right'}}></Col>
      </Row>
      <p/>
      <Tabs type="card">
        <TabPane tab="SERO" key="1">
          <Row>
            <Col span={20}>
              <h2>SERO</h2>
              <p>SERO is the first company in the world to support Turing's complete intelligent contract. It adopts zero-knowledge proof to protect the public chain of assets and transaction privacy</p>
              <p>Collateralization ratio： 200%</p>
              <p>Liquidation  ratio： 150%</p>
              <p>VM Data Source：</p>
              <p style={{color:"#161796"}}>Coinbase   Bitfinex  Bitmex  Biance</p>
            </Col>
            <Col span={4} style={{textAlign:"center"}}>
              <Button type={"primary"} size={"large"} onClick={()=>{this.setVisible(true)}}>Dissent it</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type={"default"} size={"large"}>DMW Source</Button>
              <Divider type={"vertical"} />
              <Button type={"default"} size={"large"}>VM Source</Button>
              <Divider type={"vertical"} />
              <StarFilled/>
            </Col>
          </Row>
          <Divider dashed/>
          <p>
            <h2>Stable coin by SERO DMW</h2>
          </p>
          <p>
            <Button type={"primary"} size={"large"}>USRO</Button>
            <Divider type={"vertical"} />
            <Button type={"primary"} size={"large"}>ESRO</Button>
            <Divider type={"vertical"} />
            <Button type={"default"} size={"large"} onClick={()=>{this.setVisibleSSC(true)}}>CREATE NEW SSC</Button>
          </p>
        </TabPane>
        <TabPane tab="BTC" key="2">
          <Row>
            <Col span={20}>
              <h2>BTC</h2>
              <p>SERO is the first company in the world to support Turing's complete intelligent contract. It adopts zero-knowledge proof to protect the public chain of assets and transaction privacy</p>
              <p>Collateralization ratio： 200%</p>
              <p>Liquidation  ratio： 150%</p>
              <p>VM Data Source：</p>
              <p style={{color:"#161796"}}>Coinbase   Bitfinex  Bitmex  Biance</p>
            </Col>
            <Col span={4} style={{textAlign:"center"}}>
              <Button type={"primary"} size={"large"} onClick={()=>{this.setVisible(true)}}>Dissent it</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type={"default"} size={"large"}>DMW Source</Button>
              <Divider type={"vertical"} />
              <Button type={"default"} size={"large"}>VM Source</Button>
              <Divider type={"vertical"} />
              <StarFilled/>
            </Col>
          </Row>
          <Divider dashed/>
          <p>
            <h2>Stable coin by SERO DMW</h2>
          </p>
          <p>
            <Button type={"primary"} size={"large"}>USRO</Button>
            <Divider type={"vertical"} />
            <Button type={"primary"} size={"large"}>ESRO</Button>
            <Divider type={"vertical"} />
            <Button type={"default"} size={"large"} onClick={()=>{this.setVisibleSSC(true)}}>CREATE NEW SSC</Button>
          </p>
        </TabPane>
        <TabPane tab="ETH" key="3">
          <Row>
            <Col span={20}>
              <h2>ETH</h2>
              <p>SERO is the first company in the world to support Turing's complete intelligent contract. It adopts zero-knowledge proof to protect the public chain of assets and transaction privacy</p>
              <p>Collateralization ratio： 200%</p>
              <p>Liquidation  ratio： 150%</p>
              <p>VM Data Source：</p>
              <p style={{color:"#161796"}}>Coinbase   Bitfinex  Bitmex  Biance</p>
            </Col>
            <Col span={4} style={{textAlign:"center"}}>
              <Button type={"primary"} size={"large"} onClick={()=>{this.setVisible(true)}}>Dissent it</Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button type={"default"} size={"large"}>DMW Source</Button>
              <Divider type={"vertical"} />
              <Button type={"default"} size={"large"}>VM Source</Button>
              <Divider type={"vertical"} />
              <StarFilled/>
            </Col>
          </Row>
          <Divider dashed/>
          <p>
            <h2>Stable coin by SERO DMW</h2>
          </p>
          <p>
            <Button type={"primary"} size={"large"}>USRO</Button>
            <Divider type={"vertical"} />
            <Button type={"primary"} size={"large"}>ESRO</Button>
            <Divider type={"vertical"} />
            <Button type={"default"} size={"large"} onClick={()=>{this.setVisibleSSC(true)}}>CREATE NEW SSC</Button>
          </p>
        </TabPane>
      </Tabs>
      <DissentCreateForm
        visible={visible}
        onCreate={this.onCreate}
        onCancel={() => {
          this.setVisible(false)
        }}
      />
      <CreateSSCForm
        visible={visibleSSC}
        onCreate={this.onCreateSSC}
        onCancel={() => {
          this.setVisibleSSC(false)
        }}
      />



    </div>;
  }
}

export default DmwList
