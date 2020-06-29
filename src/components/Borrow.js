import React from 'react';
import { Form, Modal, Input, InputNumber, Descriptions } from 'antd';
import i18n from '@/i18n';
const BorrowForm = ({
  visible,
  onCreate,
  onCancel,
  mintCoin,
  backedCoin,
  amountEstimate,
  fee,
  estimate,
  params,
}) => {
  const [form] = Form.useForm();
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: i18n.t('button_borrow'),
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
          label: `${i18n.t('form_lable_amount')}(${backedCoin})`,
          rules: [{ required: true, message: i18n.t('form_input_amount') }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(InputNumber, {
          min: params['minBorrowValue'],
          defaultValue: 1,
          step: 1,
          style: { width: '200px' },
          onChange: v => {
            estimate(form.getFieldValue('amountes'));
          },
          precision: 0,
        }),
      ),
      React.createElement(
        Form.Item,
        {
          name: 'password',
          label: i18n.t('form_lable_password'),
          rules: [{ required: true, message: i18n.t('form_input_password') }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(Input, {
          type: 'password',
          onBlur: v => {
            form
              .validateFields()
              .then(values => {
                estimate(values['amountes']);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          },
        }),
      ),
      React.createElement(
        Descriptions,
        { column: 1 },
        React.createElement(
          Descriptions.Item,
          { label: `${i18n.t('form_lable_estimate')}(${mintCoin})` },
          amountEstimate,
        ),
        React.createElement(
          Descriptions.Item,
          { label: `${i18n.t('form_lable_fee')}(${mintCoin})` },
          fee,
        ),
      ),
    ),
  );
};
export default BorrowForm;
//# sourceMappingURL=Borrow.js.map
