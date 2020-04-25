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
  title: string;
}

const PasswordForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
  title,
}) => {
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title={title}
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
          name="password"
          label={i18n.t('form_lable_password')}
          rules={[{ required: true, message: i18n.t('form_input_password') }]}
          className="collection-create-form_last-form-item"
        >
          <Input type={'password'} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PasswordForm;
