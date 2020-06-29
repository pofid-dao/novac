import React from 'react';
import { Form, Modal, Input } from 'antd';
import i18n from '@/i18n';
const PasswordForm = ({ visible, onCreate, onCancel, title, desc }) => {
  const [form] = Form.useForm();
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: title,
      okText: i18n.t('button_ok'),
      cancelText: i18n.t('button_cancel'),
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
      {
        form: form,
        layout: 'vertical',
        name: 'form_in_modal',
        initialValues: { modifier: 'public' },
      },
      React.createElement(
        Form.Item,
        {
          name: 'password',
          label: i18n.t('form_lable_password'),
          rules: [{ required: true, message: i18n.t('form_input_password') }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(Input, { type: 'password' }),
      ),
    ),
    React.createElement('p', null, desc),
  );
};
export default PasswordForm;
//# sourceMappingURL=Password.js.map
