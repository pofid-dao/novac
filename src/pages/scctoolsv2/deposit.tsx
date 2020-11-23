import React, { Component } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Divider,
  Table,
  Modal,
  Form,
  Input,
  Select,
  List,
} from 'antd';
import { PlusOutlined, UserSwitchOutlined } from '@ant-design/icons';
import ChangeAccountCreateForm from '@/components/ChangeAccount';
import './index.css';

const { Option } = Select;

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
          .then((values: any) => {
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
          className="collection-create-form_last-form-item"
        >
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

class Deposit extends Component {
  state = {
    visible: false,
    showSelectAccount: false,
  };

  onCreate = (values: any) => {
    this.setState({
      visible: false,
    });
  };

  setVisible = (f: boolean) => {
    this.setState({
      visible: f,
    });
  };

  onSelectCreate = (values: any) => {
    this.setState({
      showSelectAccount: false,
    });
  };

  setVisibleAccount = (f: boolean) => {
    this.setState({
      showSelectAccount: f,
    });
  };

  render() {
    const { visible, showSelectAccount } = this.state;

    return (
      <div>
        <Row className={'pfid-title'}>
          <Col span={12}>
            <span>Deposit USRO($)</span>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}></Col>
        </Row>
        <Row className={'pfid-title'}>
          <Col span={12}>
            <span>5i52s5qoD4a...f2A1pCMVtKeAzSW</span>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button
              type={'primary'}
              onClick={() => {
                this.setVisibleAccount(true);
              }}
            >
              <UserSwitchOutlined />
              Change Account
            </Button>
          </Col>
        </Row>
        <p />
        <Row className={'pfid-balance'}>
          <Col span={18}>
            <span>USRO ($)</span>
          </Col>
          <Col span={6}>
            <span>Balance: </span>
            <span>1000.000</span>
          </Col>
        </Row>
        <Card>
          <Row>
            <Col span={8}>
              PV: <span>SRO_D</span>
            </Col>
            <Col span={8}>
              Collateralization ratio: <strong>200%</strong>
            </Col>
            <Col span={8}>
              Liquidation ratio: <strong>150%</strong>
            </Col>
          </Row>
          <Divider dashed />
          <Form.Item
            name="amount"
            label="Deposit Amount"
            rules={[{ required: false, message: 'Please input amount!' }]}
            className="collection-create-form_last-form-item"
          >
            <Input />
          </Form.Item>
          <Divider dashed />
          <p>Draw : 1000 SERO</p>
          <Divider dashed />
          <Button type={'primary'} size={'large'}>
            Submit
          </Button>
        </Card>

        <CollectionCreateForm
          visible={visible}
          onCreate={this.onCreate}
          onCancel={() => {
            this.setVisible(false);
          }}
        />
        <ChangeAccountCreateForm
          visible={showSelectAccount}
          onCreate={this.onSelectCreate}
          onCancel={() => {
            this.setVisibleAccount(false);
          }}
        />
      </div>
    );
  }
}

export default Deposit;
