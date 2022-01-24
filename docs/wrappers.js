(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [20],
  {
    Gmul: function(e, t, n) {
      'use strict';
      n.r(t);
      var l = n('q1tI');
      t['default'] = e => {
        var t = document.location.href,
          n = document.getElementById('popupModel');
        return (
          n
            ? t.indexOf('/wallet') > -1 || t.endsWith('#/')
              ? (n.style.height =
                  0.8 * document.documentElement.clientHeight + 'px')
              : (n.style.height = '0px')
            : setTimeout(function() {
                (n = document.getElementById('popupModel')),
                  n &&
                    (t.indexOf('/wallet') > -1 || t.endsWith('#/')
                      ? (n.style.height =
                          0.8 * document.documentElement.clientHeight + 'px')
                      : (n.style.height = '0px'));
              }, 100),
          l['createElement']('div', null, e.children)
        );
      };
    },
  },
]);
