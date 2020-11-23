import React, { Component } from 'react';
import {
  Card,
  Button,
  Row,
  Col,
  Divider,
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import { UserSwitchOutlined } from '@ant-design/icons';
import ChangeAccountCreateForm from '@/components/ChangeAccount';
import './index.css';
const { Option } = Select;
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return React.createElement(
    Modal,
    {
      visible: visible,
      title: 'Staking',
      okText: 'Commit',
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
          name: 'amount',
          label: 'Amount',
          rules: [{ required: true, message: 'Please input amount!' }],
        },
        React.createElement(Input, null),
      ),
      React.createElement(
        Form.Item,
        {
          name: 'cycle',
          label: 'Cycle',
          rules: [{ required: true, message: 'Please select Cycle!' }],
          className: 'collection-create-form_last-form-item',
        },
        React.createElement(
          Select,
          null,
          React.createElement(Option, { value: '30' }, '30 Days'),
          React.createElement(Option, { value: '60' }, '60 Days'),
          React.createElement(Option, { value: '90' }, '90 Days'),
        ),
      ),
      React.createElement(
        Form.Item,
        null,
        React.createElement('span', null, 'Expect: 35 PFID'),
      ),
    ),
  );
};
class Borrow extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      visible: false,
      showSelectAccount: false,
    };
    this.onCreate = values => {
      this.setState({
        visible: false,
      });
    };
    this.setVisible = f => {
      this.setState({
        visible: f,
      });
    };
    this.onSelectCreate = values => {
      this.setState({
        showSelectAccount: false,
      });
    };
    this.setVisibleAccount = f => {
      this.setState({
        showSelectAccount: f,
      });
    };
  }
  render() {
    const { visible, showSelectAccount } = this.state;
    return React.createElement(
      'div',
      null,
      React.createElement(
        Row,
        { className: 'pfid-title' },
        React.createElement(
          Col,
          { span: 12 },
          React.createElement('span', null, 'Borrow USRO($)'),
        ),
        React.createElement(Col, { span: 12, style: { textAlign: 'right' } }),
      ),
      React.createElement(
        Row,
        { className: 'pfid-title' },
        React.createElement(
          Col,
          { span: 12 },
          React.createElement('span', null, '5i52s5qoD4a...f2A1pCMVtKeAzSW'),
        ),
        React.createElement(
          Col,
          { span: 12, style: { textAlign: 'right' } },
          React.createElement(
            Button,
            {
              type: 'primary',
              onClick: () => {
                this.setVisibleAccount(true);
              },
            },
            React.createElement(UserSwitchOutlined, null),
            'Change Account',
          ),
        ),
      ),
      React.createElement('p', null),
      React.createElement(
        Row,
        { className: 'pfid-balance' },
        React.createElement(
          Col,
          { span: 18 },
          React.createElement('span', null, 'SERO'),
        ),
        React.createElement(
          Col,
          { span: 6 },
          React.createElement('span', null, 'Balance: '),
          React.createElement('span', null, '1000.000'),
        ),
      ),
      React.createElement(
        Card,
        null,
        React.createElement(
          Row,
          null,
          React.createElement(
            Col,
            { span: 6 },
            'PV: ',
            React.createElement('span', null, 'SRO_A'),
          ),
          React.createElement(
            Col,
            { span: 6 },
            'Collateralization ratio: ',
            React.createElement('strong', null, '200%'),
          ),
          React.createElement(
            Col,
            { span: 6 },
            'Liquidation ratio: ',
            React.createElement('strong', null, '150%'),
          ),
          React.createElement(
            Col,
            { span: 6 },
            'Fee: ',
            React.createElement('strong', null, '2%'),
          ),
        ),
        React.createElement(Divider, { dashed: true }),
        React.createElement(
          Form.Item,
          {
            name: 'amount',
            label: 'Borrow Amount',
            rules: [{ required: false, message: 'Please input amount!' }],
            className: 'collection-create-form_last-form-item',
          },
          React.createElement(
            'div',
            null,
            React.createElement(Input, {
              style: { width: '50%' },
              defaultValue: 30,
            }),
            '\u00A0\u00A0',
            React.createElement('strong', null, 'USRO($)'),
          ),
        ),
        React.createElement(Divider, { dashed: true }),
        React.createElement(
          Form.Item,
          {
            name: 'amount',
            label: 'Sero at least',
            rules: [{ required: false, message: 'Please input amount!' }],
            className: 'collection-create-form_last-form-item',
          },
          React.createElement(
            'div',
            null,
            React.createElement(Input, {
              style: { width: '50%' },
              defaultValue: 1000,
            }),
            '\u00A0\u00A0',
            React.createElement('strong', null, 'SERO'),
          ),
        ),
        React.createElement(Divider, { dashed: true }),
        React.createElement('p', null, 'Fee : 0.49 USRO($)'),
        React.createElement(Divider, { dashed: true }),
        React.createElement(
          Button,
          { type: 'primary', size: 'large' },
          'Submit',
        ),
      ),
      React.createElement(CollectionCreateForm, {
        visible: visible,
        onCreate: this.onCreate,
        onCancel: () => {
          this.setVisible(false);
        },
      }),
      React.createElement(ChangeAccountCreateForm, {
        visible: showSelectAccount,
        onCreate: this.onSelectCreate,
        onCancel: () => {
          this.setVisibleAccount(false);
        },
      }),
    );
  }
}
export default Borrow;
//# sourceMappingURL=borrow.js.map
