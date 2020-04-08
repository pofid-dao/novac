import React from "react";
import {Form, Modal, Select,Input} from "antd";

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
const DissentCreateForm: React.FC<CollectionCreateFormProps> = ({
                                                                  visible,
                                                                  onCreate,
                                                                  onCancel,
                                                                }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="CREATE SSC"
      okText="Suppose"
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
        <Form.Item
          name="account"
          label="Currency"
          rules={[{required: false, message: 'Please select a kind!'}]}
          className="collection-create-form_last-form-item">
          <Select defaultValue="1">
            <Option value="1">Dollar($)</Option>
            <Option value="2">Euro($)</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="rate"
          label="Collateralization ratio"
          rules={[{required: true, message: 'Please input description!'}]}
          className="collection-create-form_last-form-item">
          <Input/>
        </Form.Item>
        <Form.Item
          name="liquidation"
          label="Liquidation  ratio"
          rules={[{required: true, message: 'Please input description!'}]}
          className="collection-create-form_last-form-item">
          <Input/>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DissentCreateForm
