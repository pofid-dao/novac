import React from "react";
import {Form, Modal, Select} from "antd";
import {utils} from "@/common/utils";

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

const ChangeAccountCreateForm: React.FC<CollectionCreateFormProps> = ({
                                                                        visible,
                                                                        onCreate,
                                                                        onCancel,
                                                                      }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Change Account"
      okText="OK"
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
          label="Accounts"
          rules={[{required: true, message: 'Please select account!'}]}
          className="collection-create-form_last-form-item">
          <Select>
            <Option value="30">Test (tUfRVSDf4Q...qHg5V7K7qqohx2)</Option>
            <Option value="30">Test (tUfRVSDf4Q...qHg5V7K7qqohx2)</Option>
            <Option value="30">Test (tUfRVSDf4Q...qHg5V7K7qqohx2)</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeAccountCreateForm
