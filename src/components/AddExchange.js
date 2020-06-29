import React from 'react';
import { Form, Modal, Select, Input } from 'antd';
import i18n from '@/i18n';
const { Option } = Select;
const { TextArea } = Input;
const AddExchangeForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: i18n.t('addExchange'),
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
          name: 'name',
          label: i18n.t('form_lable_exchange_name'),
          rules: [{ required: true, message: i18n.t('form_input_name') }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(Input, null),
      ),
      React.createElement(
        Form.Item,
        {
          name: 'password',
          label: i18n.t('form_lable_password'),
          rules: [{ required: true, message: i18n.t('form_input_amount') }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(Input, { type: 'password' }),
      ),
    ),
  );
};
export default AddExchangeForm;
//# sourceMappingURL=AddExchange.js.map
