import React from 'react';
import { Form, Modal, Select, Input, Descriptions } from 'antd';
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

  params: any;
}

const DealForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  params,
}) => {
  const [form] = Form.useForm();
  form.setFieldsValue({ amountes: params.mintValue });
  return (
    <Modal
      visible={visible}
      title={i18n.t('button_deal')}
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
          name="amountes"
          label={`${i18n.t('form_lable_amount')}(${params.mintCoin})`}
          rules={[{ required: true, message: i18n.t('form_input_amount') }]}
          className="collection-create-form_last-form-item"
        >
          <Input defaultValue={params.mintValue} disabled={true} />
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

export default DealForm;
