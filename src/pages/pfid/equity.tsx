import React,{Component} from 'react';
import {Card,Button,Row,Col,Divider,Table,Tag} from 'antd'
import {UserSwitchOutlined,StarFilled} from '@ant-design/icons';
import ChangeAccountCreateForm from "@/components/ChangeAccount";
import './equity.css';

const dataSource = [
  {
    key: '1',
    hash: <a href={"http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474"} target={"_blank"}>0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd</a>,
    ssc: 'UBTC',
    amount: '1000',
    time: new Date().toDateString(),
    operation:<Button type={"link"}>Withdraw</Button>
  },
  {
    key: '2',
    hash: <a href={"http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474"} target={"_blank"}>0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd</a>,
    ssc: 'UBTC',
    amount: '1000',
    time: new Date().toDateString(),
    operation:<Button type={"link"}>Withdraw</Button>
  },
  {
    key: '2',
    hash: <a href={"http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474"} target={"_blank"}>0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd</a>,
    ssc: 'UBTC',
    amount: '1000',
    time: new Date().toDateString(),
    operation:<Button type={"link"}>Withdraw</Button>
  },
];
const columns = [
  {
    title: 'Tx',
    dataIndex: 'hash',
    key: 'hash',
    width:'20%'
  },
  {
    title: 'SSC',
    dataIndex: 'ssc',
    key: 'ssc',
    width:'11%'
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    width:'11%'
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width:'15%'
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    key: 'operation',
    width:'10%'
  },
];

class Equity extends Component{

  state = {
    showSelectAccount:false
  }

  onSelectCreate = (values:any) => {
    this.setState({
      showSelectAccount:false
    })
  };

  setVisibleAccount=(f:boolean)=>{
    this.setState({
      showSelectAccount:f
    })
  }

  render() {
    const {showSelectAccount} =  this.state;

    return (
      <div>
        <Row className={"pfid-title"}>
          <Col span={12}><span>Equity with Staking</span></Col>
          <Col span={12} style={{textAlign:'right'}}><Button type={"primary"} onClick={()=>{this.setVisibleAccount(true)}}><UserSwitchOutlined />Change Account</Button></Col>
        </Row>
        <p/>
        <Row className={"pfid-balance"}>
          <Col span={12}><span>PFID</span></Col>
          <Col span={6}><span>Balance: </span><span>1000.000</span></Col>
          <Col span={6} style={{textAlign:'right'}}><span>Staking Pool: </span><span>800</span></Col>
        </Row>
        <Divider dashed/>
        <Card title={<span className={"equity-span"}>Now Dividend List &nbsp;&nbsp;&nbsp;&nbsp;<StarFilled style={{fontSize:'18px',color:"rgba(0, 0, 0, 0.65)"}}/></span>} style={{ width: '100%' }}>
          <div>
            <Tag className={"tag-cst"}>USTC</Tag>
            <Tag className={"tag-cst"}>EBTC</Tag>
            <Tag className={"tag-cst"}>USRO</Tag>
            <Tag className={"tag-cst"}>ESRO</Tag>
          </div>
        </Card>
        <Divider dashed/>
        <Card title="Dividend Record" style={{ width: '100%' }}>
          <Table dataSource={dataSource} columns={columns} />
        </Card>

        <ChangeAccountCreateForm
          visible={showSelectAccount}
          onCreate={this.onSelectCreate}
          onCancel={() => {
            this.setVisibleAccount(false)
          }}
        />
      </div>
    );
  }
}

export default Equity

