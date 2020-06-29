import React from 'react';
import { Form, Modal, Select } from 'antd';
const { Option } = Select;
const ChangeAccountCreateForm = ({
  visible,
  accounts,
  onCreate,
  onCancel,
  selectAccount,
}) => {
  const [form] = Form.useForm();
  let options = [];
  if (accounts) {
    for (let i = 0; i < accounts.length; i++) {
      const account = accounts[i];
      options.push(
        React.createElement(
          Option,
          { value: account.MainPKr },
          account.Name,
          ' ',
          account.MainPKr,
        ),
      );
    }
  }
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: 'Change Account',
      okText: 'OK',
      cancelText: 'Cancel',
      onCancel: onCancel,
      onOk: () => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      },
    },
    React.createElement(
      Form,
      { form: form, layout: 'vertical', name: 'form_in_modal' },
      React.createElement(
        Form.Item,
        {
          label: 'Accounts',
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(
          Select,
          {
            onChange: v => {
              selectAccount(v);
            },
          },
          options,
        ),
      ),
    ),
  );
};
export default ChangeAccountCreateForm;
//# sourceMappingURL=ChangeAccount.js.map
