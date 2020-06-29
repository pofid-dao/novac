import React from 'react';
import { Form, Modal, Input } from 'antd';
import i18n from '@/i18n';
const DealForm = ({ visible, onCreate, onCancel, params }) => {
  const [form] = Form.useForm();
  form.setFieldsValue({ amountes: params.mintValue });
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: i18n.t('button_deal'),
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
          name: 'amountes',
          label: `${i18n.t('form_lable_amount')}(${params.mintCoin})`,
          rules: [{ required: true, message: i18n.t('form_input_amount') }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(Input, {
          defaultValue: params.mintValue,
          disabled: true,
        }),
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
export default DealForm;
//# sourceMappingURL=Deal.js.map
