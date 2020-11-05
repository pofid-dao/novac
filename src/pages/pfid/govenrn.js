import React, { Component } from 'react';
import { Card, Button, Row, Col, Pagination } from 'antd';
import { UserSwitchOutlined, StarFilled } from '@ant-design/icons';
import ChangeAccountCreateForm from '@/components/ChangeAccount';
import './govern.css';
class Govenrn extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showSelectAccount: false,
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
    const { showSelectAccount } = this.state;
    return React.createElement(
      'div',
      null,
      React.createElement(
        Row,
        { className: 'pfid-title' },
        React.createElement(
          Col,
          { span: 12 },
          React.createElement('span', null, 'Governance Voting'),
          '\u00A0\u00A0\u00A0\u00A0',
          React.createElement(
            'span',
            null,
            React.createElement(StarFilled, { style: { fontSize: '18px' } }),
          ),
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
          { span: 6, style: { textAlign: 'right' } },
          React.createElement('span', null, 'Staking Pool: '),
          React.createElement('span', null, '800'),
        ),
      ),
      React.createElement('p', null),
      React.createElement(
        Card,
        {
          title: React.createElement(
            'div',
            { style: { width: '60%' } },
            React.createElement(
              'span',
              null,
              React.createElement(
                'a',
                {
                  href:
                    'https://vote.makerdao.com/executive-proposal/proposal-for-collateral-onboarding-of-usdc',
                  target: '_blank',
                },
                'Proposal for adjustment ',
              ),
              'of coinage rate',
            ),
            React.createElement(
              'span',
              { style: { float: 'right' } },
              '510 PFID supports',
            ),
          ),
          extra: React.createElement(Button, { type: 'primary' }, 'Vote'),
          className: 'card-bg',
        },
        React.createElement(
          'div',
          null,
          "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
          React.createElement('br', null),
          'Began on 16 March \uFF0CEnd  of 16 April     Executed: still not',
        ),
      ),
      React.createElement('p', null),
      React.createElement(
        Card,
        {
          title: React.createElement(
            'div',
            { style: { width: '60%' } },
            React.createElement('span', null, 'Proposed ethereum to join PV'),
            React.createElement(
              'span',
              { style: { float: 'right' } },
              '510 PFID supports',
            ),
          ),
          extra: React.createElement(
            Button,
            { type: 'default' },
            React.createElement('span', { style: { color: '#000' } }, 'Excute'),
          ),
          className: 'card-bg',
        },
        React.createElement(
          'div',
          null,
          "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
          React.createElement('br', null),
          'Began on 16 March \uFF0CEnd  of 16 April     Executed: still not',
        ),
      ),
      React.createElement('p', null),
      React.createElement(
        Card,
        {
          title: React.createElement(
            'div',
            { style: { width: '60%' } },
            React.createElement(
              'span',
              null,
              'Proposal for adjustment of coinage rate',
            ),
            React.createElement(
              'span',
              { style: { float: 'right' } },
              '510 PFID supports',
            ),
          ),
          extra: React.createElement(
            Button,
            { type: 'default', disabled: true },
            React.createElement(
              'span',
              { style: { color: 'gray' } },
              'Not pass',
            ),
          ),
          className: 'card-bg',
        },
        React.createElement(
          'div',
          null,
          "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
          React.createElement('br', null),
          'Began on 16 March \uFF0CEnd  of 16 April     Executed: still not',
        ),
      ),
      React.createElement('p', null),
      React.createElement(
        Card,
        {
          title: React.createElement(
            'div',
            { style: { width: '60%' } },
            React.createElement(
              'span',
              null,
              'Proposal for adjustment of coinage rate',
            ),
            React.createElement(
              'span',
              { style: { float: 'right' } },
              '510 PFID supports',
            ),
          ),
          extra: React.createElement(Button, { type: 'primary' }, 'Vote'),
          className: 'card-bg',
        },
        React.createElement(
          'div',
          null,
          "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
          React.createElement('br', null),
          'Began on 16 March \uFF0CEnd  of 16 April     Executed: still not',
        ),
      ),
      React.createElement('p', null),
      React.createElement(
        Card,
        {
          title: React.createElement(
            'div',
            { style: { width: '60%' } },
            React.createElement(
              'span',
              null,
              'Proposal for adjustment of coinage rate',
            ),
            React.createElement(
              'span',
              { style: { float: 'right' } },
              '510 PFID supports',
            ),
          ),
          extra: React.createElement(Button, { type: 'primary' }, 'Vote'),
          className: 'card-bg',
        },
        React.createElement(
          'div',
          null,
          "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
          React.createElement('br', null),
          'Began on 16 March \uFF0CEnd  of 16 April     Executed: still not',
        ),
      ),
      React.createElement('p', null),
      React.createElement(Pagination, { defaultCurrent: 1, total: 50 }),
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
export default Govenrn;
//# sourceMappingURL=govenrn.js.map
