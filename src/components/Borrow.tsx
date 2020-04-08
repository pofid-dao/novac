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
      title="Dissent DMW"
      okText="Dissent"
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
          label="Kind of"
          rules={[{required: false, message: 'Please select a kind!'}]}
          className="collection-create-form_last-form-item">
          <Select defaultValue="1">
            <Option value="1">Adjust liquidation ratio</Option>
            <Option value="2">Adjust VM</Option>
            <Option value="3">Close this DMW</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="desc"
          label="More Description"
          rules={[{required: true, message: 'Please input description!'}]}
          className="collection-create-form_last-form-item">
          <TextArea/>
        </Form.Item>
        <p>Pledge：1000 PFID</p>
      </Form>
    </Modal>
  );
};

export default CreateSSCForm
