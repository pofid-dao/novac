import React from 'react';
import { Form, Modal, Select, Input } from 'antd';
import i18n from '@/i18n';
import { storage } from '@/common/storage';
const { Option } = Select;
const { TextArea } = Input;
const CreateSSCForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const lang = storage.get(storage.keys.language);
  let descriptions = React.createElement(
    Form.Item,
    {
      name: 'description',
      label: i18n.t(lang),
      rules: [{ required: true, message: i18n.t('form_input_desc') }],
      className: 'collection-create-form_last-form-item',
    },
    React.createElement(TextArea, null),
  );
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: i18n.t('updateDesc'),
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
      descriptions,
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
export default CreateSSCForm;
//# sourceMappingURL=Dissent.js.map
