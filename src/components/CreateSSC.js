import React from 'react';
import { Form, Modal, Select, Input } from 'antd';
const { Option } = Select;
const DissentCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: 'CREATE SSC',
      okText: 'Suppose',
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
      {
        form: form,
        layout: 'vertical',
        name: 'form_in_modal',
        initialValues: { modifier: 'public' },
      },
      React.createElement(
        Form.Item,
        {
          name: 'account',
          label: 'Currency',
          rules: [{ required: false, message: 'Please select a kind!' }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(
          Select,
          { defaultValue: '1' },
          React.createElement(Option, { value: '1' }, 'Dollar($)'),
          React.createElement(Option, { value: '2' }, 'Euro($)'),
        ),
      ),
      React.createElement(
        Form.Item,
        {
          name: 'rate',
          label: 'Collateralization ratio',
          rules: [{ required: true, message: 'Please input description!' }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(Input, null),
      ),
      React.createElement(
        Form.Item,
        {
          name: 'liquidation',
          label: 'Liquidation  ratio',
          rules: [{ required: true, message: 'Please input description!' }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(Input, null),
      ),
    ),
  );
};
export default DissentCreateForm;
//# sourceMappingURL=CreateSSC.js.map
