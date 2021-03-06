import React from 'react';
import { Form, Modal, Select, Input } from 'antd';
import i18n from '@/i18n';
import { storage } from '@/common/storage';

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
const CreateSSCForm: React.FC<CollectionCreateFormProps> = ({
  visible,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const lang = storage.get(storage.keys.language);
  let descriptions: any = (
    <Form.Item
      name={'description'}
      label={i18n.t(lang)}
      rules={[{ required: true, message: i18n.t('form_input_desc') }]}
      className="collection-create-form_last-form-item"
    >
      <TextArea />
    </Form.Item>
  );

  return (
    <Modal
      visible={visible}
      title={i18n.t('updateDesc')}
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
        {descriptions}
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

export default CreateSSCForm;
