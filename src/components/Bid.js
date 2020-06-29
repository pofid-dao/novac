import React from 'react';
import { Form, Modal, Descriptions, Input, InputNumber } from 'antd';
import './Bid.css';
import i18n from '@/i18n';
import BigNumber from 'bignumber.js';
const BidForm = ({ visible, onCreate, onCancel, params, calculation }) => {
  const [form] = Form.useForm();
  // form.setFieldsValue({amountes:params["totalCut"]})
  const crtPrice = new BigNumber(params['currentPrice']).toFixed(4);
  const cut = new BigNumber(params['cut']).toFixed(4);
  const total = new BigNumber(params['totalCut']).toFixed(4);
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: i18n.t('button_bid'),
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
        'p',
        null,
        React.createElement(
          Descriptions.Item,
          { label: i18n.t('form_note') },
          'The base price is ',
          React.createElement('strong', null, crtPrice),
          ' , bid price must be a multiple of ',
          React.createElement('strong', null, cut),
          '.',
          ' ',
        ),
      ),
      React.createElement(
        Form.Item,
        {
          name: 'amountes',
          label: i18n.t('form_lable_markup'),
          rules: [{ required: true, message: i18n.t('form_input_markup') }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(InputNumber, {
          min: 1,
          defaultValue: 1,
          step: 1,
          style: { width: '200px' },
          onChange: v => {
            calculation(v);
          },
          precision: 0,
        }),
      ),
      React.createElement(
        Descriptions,
        { title: '' },
        React.createElement(
          Descriptions.Item,
          { label: i18n.t('form_bid_total') },
          crtPrice,
          ' + ',
          cut,
          ' x',
          ' ',
          form.getFieldValue('amountes') ? form.getFieldValue('amountes') : 1,
          ' ',
          '= ',
          total,
        ),
      ),
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
  );
};
export default BidForm;
//# sourceMappingURL=Bid.js.map
