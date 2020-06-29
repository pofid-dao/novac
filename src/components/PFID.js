import React from 'react';
import { Descriptions, Form, Input, Modal, Select, InputNumber } from 'antd';
import BigNumber from 'bignumber.js';
import i18n from '@/i18n';
const { Option } = Select;
const PFIDForm = ({
  visible,
  onCreate,
  onCancel,
  onExpect,
  expect,
  fee,
  params,
}) => {
  const [form] = Form.useForm();
  const editAmount = !!params['editAmount'];
  const minStakingValue = params['minStakingValue'];
  const amount = params['amount'];
  const balance = params['balance'];
  if (editAmount) {
    form.setFieldsValue({ amount: amount });
  }
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: i18n.t('button_goStaking'),
      okText: i18n.t('button_commit'),
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
          name: 'amount',
          label: i18n.t('pages_pfid_my_amount'),
          rules: [
            {
              required: true,
              message: i18n.t('form_input_amount'),
            },
          ],
        },
        React.createElement(InputNumber, {
          disabled: editAmount,
          min: minStakingValue,
          style: { width: '300px' },
          step: 100,
          onBlur: v => {
            console.log('console>>', v);
            onExpect(
              parseInt(form.getFieldValue('cycle')),
              form.getFieldValue('amount'),
            );
          },
          defaultValue: amount,
        }),
      ),
      React.createElement(
        Form.Item,
        {
          name: 'cycle',
          label: i18n.t('pages_pfid_my_cycle'),
          rules: [{ required: true, message: i18n.t('form_input_cycle') }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(
          Select,
          {
            onChange: v => {
              form
                .validateFields()
                .then(values => {
                  // form.resetFields();
                  onExpect(parseInt(v), values['amount']);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            },
          },
          React.createElement(Option, { value: '30' }, '30 Days'),
          React.createElement(Option, { value: '60' }, '60 Days'),
          React.createElement(Option, { value: '90' }, '90 Days'),
        ),
      ),
      React.createElement(
        Form.Item,
        {
          name: 'password',
          label: i18n.t('pages_pfid_my_password'),
          rules: [{ required: true, message: i18n.t('form_input_password') }],
        },
        React.createElement(Input, {
          type: 'password',
          onBlur: v => {
            form
              .validateFields()
              .then(values => {
                // form.resetFields();
                onExpect(parseInt(values['cycle']), values['amount']);
              })
              .catch(info => {
                console.log('Validate Failed:', info);
              });
          },
        }),
      ),
      React.createElement(
        Form.Item,
        null,
        React.createElement(
          Descriptions,
          null,
          React.createElement(
            Descriptions.Item,
            { label: i18n.t('pages_pfid_my_expect_received') },
            React.createElement(
              'span',
              { style: { color: '#161796' } },
              new BigNumber(expect)
                .minus(
                  new BigNumber(fee)
                    .multipliedBy(new BigNumber(expect))
                    .div(100),
                )
                .toString(10),
            ),
            ' ',
            'PFID',
          ),
        ),
      ),
    ),
  );
};
export default PFIDForm;
//# sourceMappingURL=PFID.js.map
