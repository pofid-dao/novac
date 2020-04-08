import React,{Component} from 'react';
import {Card, Col, Row, Tabs,Divider,Button} from 'antd'
import './index.css';
import DissentCreateForm from "@/components/Dissent";
import CreateSSCForm from "@/components/CreateSSC";
import {url} from "@/common/url";

const { TabPane } = Tabs;

class SSCTools extends Component{

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
        <Col span={12}><span>SSC List</span></Col>
        <Col span={12} style={{textAlign:'right'}}></Col>
      </Row>
      <p/>
      <Card title={"USRO($)"} extra={<div>
        <Button type={"primary"} onClick={()=>{url.goPage(url.path.scctools.borrow)}}>Borrow</Button>&nbsp;&nbsp;
        <Button type={"primary"} onClick={()=>{url.goPage(url.path.scctools.deposit)}}>Deposit</Button>&nbsp;&nbsp;
        <Button type={"primary"}>Deal</Button>
      </div>}>
        <Row>
          <Col span={8}>DMW: <span>SRO_D</span></Col>
          <Col span={8}>Collateralization ratio: <strong>200%</strong></Col>
          <Col span={8}>Liquidation ratio: <strong>150%</strong></Col>
        </Row>
        <Divider dashed/>
        <p>
          <strong>Support Exchange: </strong><span style={{color:"#161796"}}>Bitfinex Biance</span>
        </p>
      </Card>
      <p/>
      <Card title={"USRO($)"} extra={<div>
        <Button type={"primary"} onClick={()=>{url.goPage(url.path.scctools.borrow)}}>Borrow</Button>&nbsp;&nbsp;
        <Button type={"primary"} onClick={()=>{url.goPage(url.path.scctools.deposit)}}>Deposit</Button>&nbsp;&nbsp;
        <Button type={"primary"}>Deal</Button>
      </div>}>
        <Row>
          <Col span={8}>DMW: <span>SRO_D</span></Col>
          <Col span={8}>Collateralization ratio: <strong>200%</strong></Col>
          <Col span={8}>Liquidation ratio: <strong>150%</strong></Col>
        </Row>
        <Divider dashed/>
        <p>
          <strong>Support Exchange: </strong><span style={{color:"#161796"}}>Bitfinex Biance</span>
        </p>
      </Card>
      <p/>
      <Card title={"USRO($)"} extra={<div>
        <Button type={"primary"} onClick={()=>{url.goPage(url.path.scctools.borrow)}}>Borrow</Button>&nbsp;&nbsp;
        <Button type={"primary"} onClick={()=>{url.goPage(url.path.scctools.deposit)}}>Deposit</Button>&nbsp;&nbsp;
        <Button type={"primary"}>Deal</Button>
      </div>}>
        <Row>
          <Col span={8}>DMW: <span>SRO_D</span></Col>
          <Col span={8}>Collateralization ratio: <strong>200%</strong></Col>
          <Col span={8}>Liquidation ratio: <strong>150%</strong></Col>
        </Row>
        <Divider dashed/>
        <p>
          <strong>Support Exchange: </strong><span style={{color:"#161796"}}>Bitfinex Biance</span>
        </p>
      </Card>
      <p/>
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

export default SSCTools
