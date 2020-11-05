import React, { Component } from 'react';
import { Card, Button, Row, Col, Divider, Pagination } from 'antd';
import { UserSwitchOutlined, StarFilled } from '@ant-design/icons';
import ChangeAccountCreateForm from '@/components/ChangeAccount';
import './govern.css';

class Govenrn extends Component {
  state = {
    showSelectAccount: false,
  };

  onSelectCreate = (values: any) => {
    this.setState({
      showSelectAccount: false,
    });
  };

  setVisibleAccount = (f: boolean) => {
    this.setState({
      showSelectAccount: f,
    });
  };

  render() {
    const { showSelectAccount } = this.state;

    return (
      <div>
        <Row className={'pfid-title'}>
          <Col span={12}>
            <span>Governance Voting</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span>
              <StarFilled style={{ fontSize: '18px' }} />
            </span>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Button
              type={'primary'}
              onClick={() => {
                this.setVisibleAccount(true);
              }}
            >
              <UserSwitchOutlined />
              Change Account
            </Button>
          </Col>
        </Row>
        <p />
        <Row className={'pfid-balance'}>
          <Col span={12}>
            <span>PFID</span>
          </Col>
          <Col span={6}>
            <span>Balance: </span>
            <span>1000.000</span>
          </Col>
          <Col span={6} style={{ textAlign: 'right' }}>
            <span>Staking Pool: </span>
            <span>800</span>
          </Col>
        </Row>
        <p />
        <Card
          title={
            <div style={{ width: '60%' }}>
              <span>
                <a
                  href={
                    'https://vote.makerdao.com/executive-proposal/proposal-for-collateral-onboarding-of-usdc'
                  }
                  target={'_blank'}
                >
                  Proposal for adjustment{' '}
                </a>
                of coinage rate
              </span>
              <span style={{ float: 'right' }}>510 PFID supports</span>
            </div>
          }
          extra={<Button type={'primary'}>Vote</Button>}
          className={'card-bg'}
        >
          <div>
            It is hoped that the coinage tax rate of BTC's PV will be adjusted
            to 8%
            <br />
            Began on 16 March ，End of 16 April Executed: still not
          </div>
        </Card>
        <p />
        <Card
          title={
            <div style={{ width: '60%' }}>
              <span>Proposed ethereum to join PV</span>
              <span style={{ float: 'right' }}>510 PFID supports</span>
            </div>
          }
          extra={
            <Button type={'default'}>
              <span style={{ color: '#000' }}>Excute</span>
            </Button>
          }
          className={'card-bg'}
        >
          <div>
            It is hoped that the coinage tax rate of BTC's PV will be adjusted
            to 8%
            <br />
            Began on 16 March ，End of 16 April Executed: still not
          </div>
        </Card>
        <p />
        <Card
          title={
            <div style={{ width: '60%' }}>
              <span>Proposal for adjustment of coinage rate</span>
              <span style={{ float: 'right' }}>510 PFID supports</span>
            </div>
          }
          extra={
            <Button type={'default'} disabled>
              <span style={{ color: 'gray' }}>Not pass</span>
            </Button>
          }
          className={'card-bg'}
        >
          <div>
            It is hoped that the coinage tax rate of BTC's PV will be adjusted
            to 8%
            <br />
            Began on 16 March ，End of 16 April Executed: still not
          </div>
        </Card>
        <p />
        <Card
          title={
            <div style={{ width: '60%' }}>
              <span>Proposal for adjustment of coinage rate</span>
              <span style={{ float: 'right' }}>510 PFID supports</span>
            </div>
          }
          extra={<Button type={'primary'}>Vote</Button>}
          className={'card-bg'}
        >
          <div>
            It is hoped that the coinage tax rate of BTC's PV will be adjusted
            to 8%
            <br />
            Began on 16 March ，End of 16 April Executed: still not
          </div>
        </Card>
        <p />
        <Card
          title={
            <div style={{ width: '60%' }}>
              <span>Proposal for adjustment of coinage rate</span>
              <span style={{ float: 'right' }}>510 PFID supports</span>
            </div>
          }
          extra={<Button type={'primary'}>Vote</Button>}
          className={'card-bg'}
        >
          <div>
            It is hoped that the coinage tax rate of BTC's PV will be adjusted
            to 8%
            <br />
            Began on 16 March ，End of 16 April Executed: still not
          </div>
        </Card>
        <p />
        <Pagination defaultCurrent={1} total={50} />
        <ChangeAccountCreateForm
          visible={showSelectAccount}
          onCreate={this.onSelectCreate}
          onCancel={() => {
            this.setVisibleAccount(false);
          }}
        />
      </div>
    );
  }
}

export default Govenrn;
