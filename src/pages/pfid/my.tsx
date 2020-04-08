import React,{Component} from 'react';
import {Card,Button,Row,Col,Divider,Table,Modal, Form, Input, Select} from 'antd'
import {PlusOutlined,UserSwitchOutlined} from '@ant-design/icons';
import ChangeAccountCreateForm from "@/components/ChangeAccount";
import './my.css';

const {Option} = Select
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
    operation:<Button type={"link"}>Withdraw</Button>
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
    operation:<Button type={"link"}>Withdraw</Button>
  },
  {
    key: '3',
    hash: <a href={"http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474"} target={"_blank"}>0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd</a>,
    cycle: '2 month',
    state: 'Finished',
    staking: '1000',
    received: '1088',
    fee: '5',
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

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
                                                                     visible,
                                                                     onCreate,
                                                                     onCancel,
                                                                   }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Staking"
      okText="Commit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values:any) => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: 'Please input amount!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cycle"
          label="Cycle"
          rules={[{ required: true, message: 'Please select Cycle!' }]}
          className="collection-create-form_last-form-item">
          <Select>
            <Option value="30">30 Days</Option>
            <Option value="60">60 Days</Option>
            <Option value="90">90 Days</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <span>Expect: 35 PFID</span>
        </Form.Item>
      </Form>
    </Modal>
  );
};

class MyPfid extends Component{

  state = {
    visible:false,
    showSelectAccount:false
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
    const {visible,showSelectAccount} =  this.state;

    return (
      <div>
        <Row className={"pfid-title"}>
          <Col span={12}><span>5i52s5qoD4a...f2A1pCMVtKeAzSW</span></Col>
          <Col span={12} style={{textAlign:'right'}}><Button type={"primary"} onClick={()=>{this.setVisibleAccount(true)}}><UserSwitchOutlined />Change Account</Button></Col>
        </Row>
        <p/>
        <Row className={"pfid-balance"}>
          <Col span={12}><span>PFID</span></Col>
          <Col span={6}><span>Balance: </span><span>1000.000</span></Col>
          <Col span={6} style={{textAlign:'right'}}><span>Staking Pool: </span><span>800</span></Col>
        </Row>
        <Divider dashed/>
        <Card title="Staking Record" extra={<Button type={"primary"} onClick={()=>{this.setVisible(true)}}><PlusOutlined />Go Staking</Button>} style={{ width: '100%' }}>
          <Table dataSource={dataSource} columns={columns} />
        </Card>
        <CollectionCreateForm
          visible={visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setVisible(false)
          }}
        />
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

export default MyPfid

