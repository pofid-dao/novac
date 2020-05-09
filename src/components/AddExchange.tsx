import React from 'react';
import { Form, Modal, Select, Input } from 'antd';
import i18n from '@/i18n';

interface Values {
  title: string;
  description: string;
  modifier: string;
}

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: Values) => void;
  onCancel: () => void;
}

const { Option } = Select;
const { TextArea } = Input;
const AddExchangeForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={i18n.t('addExchange')}
      okText={i18n.t('button_ok')}
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
          name="name"
          label={i18n.t('form_lable_exchange_name')}
          rules={[{ required: true, message: i18n.t('form_input_name') }]}
          className="collection-create-form_last-form-item"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label={i18n.t('form_lable_password')}
          rules={[{ required: true, message: i18n.t('form_input_amount') }]}
          className="collection-create-form_last-form-item"
        >
          <Input type={'password'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddExchangeForm;
