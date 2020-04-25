import React from 'react';
import { Form, Modal, Select } from 'antd';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  accounts: Array<any>;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  selectAccount: (mainPKr: string) => void;
}

const { Option } = Select;

const ChangeAccountCreateForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  accounts,
  onCreate,
  onCancel,
  selectAccount,
}) => {
  const [form] = Form.useForm();
  let options: Array<any> = [];
  if (accounts) {
    for (let i = 0; i < accounts.length; i++) {
      const account: any = accounts[i];
      options.push(
        <Option value={account.MainPKr}>
          {account.Name} {account.MainPKr}
        </Option>,
      );
    }
  }

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
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          label="Accounts"
          className="collection-create-form_last-form-item"
        >
          <Select
            onChange={(v: any) => {
              selectAccount(v);
            }}
          >
            {options}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ChangeAccountCreateForm;
