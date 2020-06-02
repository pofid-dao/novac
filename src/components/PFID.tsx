import React from 'react';
import { Descriptions, Form, Input, Modal, Select, InputNumber } from 'antd';
import BigNumber from 'bignumber.js';
import i18n from '@/i18n';

const { Option } = Select;

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
  onExpect: (value: number, amount: any) => void;
  expect: any;
  fee: any;
  params: any;
}

const PFIDForm: React.FC<CollectionCreateFormProps> = ({
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
  return (
    <Modal
      visible={visible}
      title={i18n.t('button_goStaking')}
      okText={i18n.t('button_commit')}
      cancelText={i18n.t('button_cancel')}
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
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{ modifier: 'public' }}
      >
        <Form.Item
          name="amount"
          label={i18n.t('pages_pfid_my_amount')}
          rules={[
            {
              required: true,
              message: i18n.t('form_input_amount'),
            },
          ]}
        >
          <InputNumber
            disabled={editAmount}
            min={minStakingValue}
            style={{ width: '300px' }}
            step={100}
            onBlur={v => {
              console.log('console>>', v);
              onExpect(
                parseInt(form.getFieldValue('cycle')),
                form.getFieldValue('amount'),
              );
            }}
            defaultValue={amount}
          />
        </Form.Item>
        <Form.Item
          name="cycle"
          label={i18n.t('pages_pfid_my_cycle')}
          rules={[{ required: true, message: i18n.t('form_input_cycle') }]}
          className="collection-create-form_last-form-item"
        >
          <Select
            onChange={(v: any) => {
              form
                .validateFields()
                .then((values: any) => {
                  // form.resetFields();
                  onExpect(parseInt(v), values['amount']);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
            // defaultValue={"30"}
          >
            <Option value="30">30 Days</Option>
            <Option value="60">60 Days</Option>
            <Option value="90">90 Days</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label={i18n.t('pages_pfid_my_password')}
          rules={[{ required: true, message: i18n.t('form_input_password') }]}
        >
          <Input
            type={'password'}
            onBlur={v => {
              form
                .validateFields()
                .then((values: any) => {
                  // form.resetFields();
                  onExpect(parseInt(values['cycle']), values['amount']);
                })
                .catch(info => {
                  console.log('Validate Failed:', info);
                });
            }}
          />
        </Form.Item>
        <Form.Item>
          <Descriptions>
            {/*<Descriptions.Item label={i18n.t('pages_pfid_my_expect')}>*/}
            {/*  <span style={{ color: '#161796' }}>{expect}</span> PFID*/}
            {/*</Descriptions.Item>*/}
            {/*<Descriptions.Item label={"Fee Rate"}><span style={{color:'#161796'}}>{fee/100}</span></Descriptions.Item>*/}
            <Descriptions.Item label={i18n.t('pages_pfid_my_expect_received')}>
              <span style={{ color: '#161796' }}>
                {new BigNumber(expect)
                  .minus(
                    new BigNumber(fee)
                      .multipliedBy(new BigNumber(expect))
                      .div(100),
                  )
                  .toString(10)}
              </span>{' '}
              PFID
            </Descriptions.Item>
          </Descriptions>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PFIDForm;
