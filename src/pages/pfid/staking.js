import React from 'react';
import { Card, Button, Row, Col, Divider, Table } from 'antd';
import './my.css';
import { PlusOutlined, UserSwitchOutlined } from '@ant-design/icons';
const dataSource = [
  {
    key: '1',
    hash: React.createElement(
      'a',
      {
        href:
          'http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474',
        target: '_blank',
      },
      '0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd',
    ),
    cycle: '1 month',
    state: 'Finished',
    staking: '1000',
    received: '1088',
    fee: '5',
    time: new Date().toDateString(),
    operation: React.createElement(Button, { type: 'link' }, 'Staking'),
  },
  {
    key: '2',
    hash: React.createElement(
      'a',
      {
        href:
          'http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474',
        target: '_blank',
      },
      '0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd',
    ),
    cycle: '1 month',
    state: 'Finished',
    staking: '1000',
    received: '1088',
    fee: '5',
    time: new Date().toDateString(),
    operation: React.createElement(Button, { type: 'link' }, 'Staking'),
  },
  {
    key: '3',
    hash: React.createElement(
      'a',
      {
        href:
          'http://cn.seroscan.com/txsInfo.html?hash=0x513462580e5d4d7d0e55d13bef47edd23e9d34d5d373f32dd17e586bb120a474',
        target: '_blank',
      },
      '0x4a14b0329cad38b6c04ba297d8a82ac9e54f6ffd297c27e66279dc379ec520dd',
    ),
    cycle: '1 month',
    state: 'Finished',
    staking: '1000',
    received: '1088',
    fee: '5',
    time: new Date().toDateString(),
    operation: React.createElement(Button, { type: 'link' }, 'Staking'),
  },
];
const columns = [
  {
    title: 'Tx',
    dataIndex: 'hash',
    key: 'hash',
    width: '20%',
  },
  {
    title: 'Cycle',
    dataIndex: 'cycle',
    key: 'cycle',
    width: '11%',
  },
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    width: '11%',
  },
  {
    title: 'Staking',
    dataIndex: 'staking',
    key: 'staking',
    width: '11%',
  },
  {
    title: 'Received',
    dataIndex: 'received',
    key: 'received',
    width: '11%',
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    key: 'fee',
    width: '11%',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
    width: '15%',
  },
  {
    title: 'Operation',
    dataIndex: 'operation',
    key: 'operation',
    width: '10%',
  },
];
export default () => {
  return React.createElement(
    'div',
    null,
    React.createElement(
      Card,
      {
        title: 'Account',
        extra: React.createElement(
          Button,
          { type: 'primary' },
          React.createElement(UserSwitchOutlined, null),
          'Change Account',
        ),
        style: { width: '100%' },
      },
      React.createElement(
        Row,
        { className: 'pfid-balance' },
        React.createElement(
          Col,
          { span: 12 },
          React.createElement('span', null, 'PFID'),
        ),
        React.createElement(
          Col,
          { span: 6 },
          React.createElement('span', null, 'Balance: '),
          React.createElement('span', null, '1000.000'),
        ),
        React.createElement(
          Col,
          { span: 6 },
          React.createElement('span', null, 'Staking Pool: '),
          React.createElement('span', null, '800'),
        ),
      ),
      React.createElement(Divider, { dashed: true }),
      React.createElement(
        Card,
        {
          title: 'Staking Record',
          extra: React.createElement(
            Button,
            { type: 'primary' },
            React.createElement(PlusOutlined, null),
            'Go Staking',
          ),
          style: { width: '100%' },
        },
        React.createElement(Table, {
          dataSource: dataSource,
          columns: columns,
        }),
      ),
    ),
  );
};
//# sourceMappingURL=staking.js.map
