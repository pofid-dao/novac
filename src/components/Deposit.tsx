import React from "react";
import {Form, Modal, Select, Input, List, Col, Row} from "antd";

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

const {Option} = Select;
const { TextArea } = Input;
const CreateSSCForm: React.FC<CollectionCreateFormProps> = ({
                                                              visible,
                                                              onCreate,
                                                              onCancel,
                                                            }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="DEPOSIT USRO($)"
      okText="Submit"
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
        initialValues={{modifier: 'public'}}
      >
        <h3 style={{ marginBottom: 16 }}>Default Size</h3>
        <List
          header={<div>USRO ($)</div>}
          bordered
        >
          <List.Item>
            <Row>
              <Col span={8}>DMW: <span>SRO_D</span></Col>
              <Col span={8}>Collateralization ratio: <strong>200%</strong></Col>
              <Col span={8}>Liquidation ratio: <strong>150%</strong></Col>
            </Row>
          </List.Item>
          <List.Item>
            <Form.Item
              name="amount"
              label="Deposit Amount"
              rules={[{required: false, message: 'Please input amount!'}]}
              className="collection-create-form_last-form-item">
              <Input/>
            </Form.Item>
          </List.Item>
            <p>Draw : 1000 SERO</p>
          <List.Item>
          </List.Item>
        </List>
      </Form>
    </Modal>
  );
};

export default CreateSSCForm
