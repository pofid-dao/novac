import React from 'react';
import {Card,Button,Row,Col,Divider,Table} from 'antd'
import './my.css';
import {PlusOutlined,UserSwitchOutlined} from '@ant-design/icons';

const dataSource = [
  {
    key: '1',
    hash: <a href={"http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474"} target={"_blank"}>0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd</a>,
    cycle: '1 month',
    state: 'Finished',
    staking: '1000',
    received: '1088',
    fee: '5',
    time: new Date().toDateString(),
    operation:<Button type={"link"}>Staking</Button>
  },
  {
    key: '2',
    hash: <a href={"http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474"} target={"_blank"}>0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd</a>,
    cycle: '1 month',
    state: 'Finished',
    staking: '1000',
    received: '1088',
    fee: '5',
    time: new Date().toDateString(),
    operation:<Button type={"link"}>Staking</Button>
  },
  {
    key: '3',
    hash: <a href={"http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474"} target={"_blank"}>0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd</a>,
    cycle: '1 month',
    state: 'Finished',
    staking: '1000',
    received: '1088',
    fee: '5',
    time: new Date().toDateString(),
    operation:<Button type={"link"}>Staking</Button>
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
    title: 'Cycle',
    dataIndex: 'cycle',
    key: 'cycle',
    width:'11%'
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    width:'11%'
  },
  {
    title: 'Staking',
    dataIndex: 'staking',
    key: 'staking',
    width:'11%'
  },
  {
    title: 'Received',
    dataIndex: 'received',
    key: 'received',
    width:'11%'
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    key: 'fee',
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

export default () => {
  return (
    <div>
      <Card title="Account" extra={<Button type={"primary"}><UserSwitchOutlined />Change Account</Button>} style={{ width: '100%' }}>
        <Row className={"pfid-balance"}>
          <Col span={12}><span>PFID</span></Col>
          <Col span={6}><span>Balance: </span><span>1000.000</span></Col>
          <Col span={6}><span>Staking Pool: </span><span>800</span></Col>
        </Row>
        <Divider dashed/>
        <Card title="Staking Record" extra={<Button type={"primary"}><PlusOutlined />Go Staking</Button>} style={{ width: '100%' }}>
          <Table dataSource={dataSource} columns={columns} />
        </Card>
      </Card>
    </div>
  );
}
