(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [11],
  {
    DUDt: function(e, t, a) {
      'use strict';
      a('2qtc');
      var l = a('kLXV'),
        n = (a('y8nQ'), a('Vl3Y')),
        r = a('ODXe'),
        c = (a('OaEy'), a('2fM7')),
        s = a('q1tI'),
        o = a.n(s),
        i = c['a'].Option,
        m = e => {
          var t = e.visible,
            a = e.accounts,
            s = e.onCreate,
            m = e.onCancel,
            p = e.selectAccount,
            u = n['a'].useForm(),
            E = Object(r['a'])(u, 1),
            d = E[0],
            h = [];
          if (a)
            for (var f = 0; f < a.length; f++) {
              var g = a[f];
              h.push(
                o.a.createElement(
                  i,
                  { value: g.MainPKr },
                  g.Name,
                  ' ',
                  g.MainPKr,
                ),
              );
            }
          return o.a.createElement(
            l['a'],
            {
              visible: t,
              title: 'Change Account',
              okText: 'OK',
              cancelText: 'Cancel',
              onCancel: m,
              onOk: () => {
                d.validateFields()
                  .then(e => {
                    d.resetFields(), s(e);
                  })
                  .catch(e => {
                    console.log('Validate Failed:', e);
                  });
              },
            },
            o.a.createElement(
              n['a'],
              { form: d, layout: 'vertical', name: 'form_in_modal' },
              o.a.createElement(
                n['a'].Item,
                {
                  label: 'Accounts',
                  className: 'collection-create-form_last-form-item',
                },
                o.a.createElement(
                  c['a'],
                  {
                    onChange: e => {
                      p && p(e);
                    },
                  },
                  h,
                ),
              ),
            ),
          );
        };
      t['a'] = m;
    },
    cp1c: function(e, t, a) {},
    dy3U: function(e, t, a) {
      'use strict';
      a.r(t);
      a('DjyN');
      var l = a('NUBc'),
        n = (a('IzEo'), a('bx4M')),
        r = (a('14J3'), a('BMrR')),
        c = (a('+L6B'), a('2/Rp')),
        s = (a('jCWc'), a('kPKH')),
        o = a('q1tI'),
        i = a.n(o),
        m = a('djQt'),
        p = a('+5D9'),
        u = a('DUDt');
      a('cp1c');
      class E extends o['Component'] {
        constructor() {
          super(...arguments),
            (this.state = { showSelectAccount: !1 }),
            (this.onSelectCreate = e => {
              this.setState({ showSelectAccount: !1 });
            }),
            (this.setVisibleAccount = e => {
              this.setState({ showSelectAccount: e });
            });
        }
        render() {
          var e = this.state.showSelectAccount;
          return i.a.createElement(
            'div',
            null,
            i.a.createElement(
              r['a'],
              { className: 'pfid-title' },
              i.a.createElement(
                s['a'],
                { span: 12 },
                i.a.createElement('span', null, 'Governance Voting'),
                '\xa0\xa0\xa0\xa0',
                i.a.createElement(
                  'span',
                  null,
                  i.a.createElement(m['a'], { style: { fontSize: '18px' } }),
                ),
              ),
              i.a.createElement(
                s['a'],
                { span: 12, style: { textAlign: 'right' } },
                i.a.createElement(
                  c['a'],
                  {
                    type: 'primary',
                    onClick: () => {
                      this.setVisibleAccount(!0);
                    },
                  },
                  i.a.createElement(p['a'], null),
                  'Change Account',
                ),
              ),
            ),
            i.a.createElement('p', null),
            i.a.createElement(
              r['a'],
              { className: 'pfid-balance' },
              i.a.createElement(
                s['a'],
                { span: 12 },
                i.a.createElement('span', null, 'PFID'),
              ),
              i.a.createElement(
                s['a'],
                { span: 6 },
                i.a.createElement('span', null, 'Balance: '),
                i.a.createElement('span', null, '1000.000'),
              ),
              i.a.createElement(
                s['a'],
                { span: 6, style: { textAlign: 'right' } },
                i.a.createElement('span', null, 'Staking Pool: '),
                i.a.createElement('span', null, '800'),
              ),
            ),
            i.a.createElement('p', null),
            i.a.createElement(
              n['a'],
              {
                title: i.a.createElement(
                  'div',
                  { style: { width: '60%' } },
                  i.a.createElement(
                    'span',
                    null,
                    i.a.createElement(
                      'a',
                      {
                        href:
                          'https://vote.makerdao.com/executive-proposal/proposal-for-collateral-onboarding-of-usdc',
                        target: '_blank',
                      },
                      'Proposal for adjustment',
                      ' ',
                    ),
                    'of coinage rate',
                  ),
                  i.a.createElement(
                    'span',
                    { style: { float: 'right' } },
                    '510 PFID supports',
                  ),
                ),
                extra: i.a.createElement(c['a'], { type: 'primary' }, 'Vote'),
                className: 'card-bg',
              },
              i.a.createElement(
                'div',
                null,
                "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
                i.a.createElement('br', null),
                'Began on 16 March \uff0cEnd of 16 April Executed: still not',
              ),
            ),
            i.a.createElement('p', null),
            i.a.createElement(
              n['a'],
              {
                title: i.a.createElement(
                  'div',
                  { style: { width: '60%' } },
                  i.a.createElement(
                    'span',
                    null,
                    'Proposed ethereum to join PV',
                  ),
                  i.a.createElement(
                    'span',
                    { style: { float: 'right' } },
                    '510 PFID supports',
                  ),
                ),
                extra: i.a.createElement(
                  c['a'],
                  { type: 'default' },
                  i.a.createElement(
                    'span',
                    { style: { color: '#000' } },
                    'Excute',
                  ),
                ),
                className: 'card-bg',
              },
              i.a.createElement(
                'div',
                null,
                "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
                i.a.createElement('br', null),
                'Began on 16 March \uff0cEnd of 16 April Executed: still not',
              ),
            ),
            i.a.createElement('p', null),
            i.a.createElement(
              n['a'],
              {
                title: i.a.createElement(
                  'div',
                  { style: { width: '60%' } },
                  i.a.createElement(
                    'span',
                    null,
                    'Proposal for adjustment of coinage rate',
                  ),
                  i.a.createElement(
                    'span',
                    { style: { float: 'right' } },
                    '510 PFID supports',
                  ),
                ),
                extra: i.a.createElement(
                  c['a'],
                  { type: 'default', disabled: !0 },
                  i.a.createElement(
                    'span',
                    { style: { color: 'gray' } },
                    'Not pass',
                  ),
                ),
                className: 'card-bg',
              },
              i.a.createElement(
                'div',
                null,
                "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
                i.a.createElement('br', null),
                'Began on 16 March \uff0cEnd of 16 April Executed: still not',
              ),
            ),
            i.a.createElement('p', null),
            i.a.createElement(
              n['a'],
              {
                title: i.a.createElement(
                  'div',
                  { style: { width: '60%' } },
                  i.a.createElement(
                    'span',
                    null,
                    'Proposal for adjustment of coinage rate',
                  ),
                  i.a.createElement(
                    'span',
                    { style: { float: 'right' } },
                    '510 PFID supports',
                  ),
                ),
                extra: i.a.createElement(c['a'], { type: 'primary' }, 'Vote'),
                className: 'card-bg',
              },
              i.a.createElement(
                'div',
                null,
                "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
                i.a.createElement('br', null),
                'Began on 16 March \uff0cEnd of 16 April Executed: still not',
              ),
            ),
            i.a.createElement('p', null),
            i.a.createElement(
              n['a'],
              {
                title: i.a.createElement(
                  'div',
                  { style: { width: '60%' } },
                  i.a.createElement(
                    'span',
                    null,
                    'Proposal for adjustment of coinage rate',
                  ),
                  i.a.createElement(
                    'span',
                    { style: { float: 'right' } },
                    '510 PFID supports',
                  ),
                ),
                extra: i.a.createElement(c['a'], { type: 'primary' }, 'Vote'),
                className: 'card-bg',
              },
              i.a.createElement(
                'div',
                null,
                "It is hoped that the coinage tax rate of BTC's PV will be adjusted to 8%",
                i.a.createElement('br', null),
                'Began on 16 March \uff0cEnd of 16 April Executed: still not',
              ),
            ),
            i.a.createElement('p', null),
            i.a.createElement(l['a'], { defaultCurrent: 1, total: 50 }),
            i.a.createElement(u['a'], {
              visible: e,
              onCreate: this.onSelectCreate,
              onCancel: () => {
                this.setVisibleAccount(!1);
              },
            }),
          );
        }
      }
      t['default'] = E;
    },
  },
]);
