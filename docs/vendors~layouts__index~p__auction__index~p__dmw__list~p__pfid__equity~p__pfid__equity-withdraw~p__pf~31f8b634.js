(window['webpackJsonp'] = window['webpackJsonp'] || []).push([
  [2],
  {
    '/9aa': function(e, t, n) {
      var r = n('NykK'),
        o = n('ExA7'),
        i = '[object Symbol]';
      function a(e) {
        return 'symbol' == typeof e || (o(e) && r(e) == i);
      }
      e.exports = a;
    },
    '2SVd': function(e, t, n) {
      'use strict';
      e.exports = function(e) {
        return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
      };
    },
    '5oMp': function(e, t, n) {
      'use strict';
      e.exports = function(e, t) {
        return t ? e.replace(/\/+$/, '') + '/' + t.replace(/^\/+/, '') : e;
      };
    },
    '9rSQ': function(e, t, n) {
      'use strict';
      var r = n('xTJ+');
      function o() {
        this.handlers = [];
      }
      (o.prototype.use = function(e, t) {
        return (
          this.handlers.push({ fulfilled: e, rejected: t }),
          this.handlers.length - 1
        );
      }),
        (o.prototype.eject = function(e) {
          this.handlers[e] && (this.handlers[e] = null);
        }),
        (o.prototype.forEach = function(e) {
          r.forEach(this.handlers, function(t) {
            null !== t && e(t);
          });
        }),
        (e.exports = o);
    },
    BAi7: function(e, t) {
      function n(e, t) {
        if (!(e instanceof t))
          throw new TypeError('Cannot call a class as a function');
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports['default'] = e.exports);
    },
    CgaS: function(e, t, n) {
      'use strict';
      var r = n('xTJ+'),
        o = n('MLWZ'),
        i = n('9rSQ'),
        a = n('UnBK'),
        s = n('SntB');
      function u(e) {
        (this.defaults = e),
          (this.interceptors = { request: new i(), response: new i() });
      }
      (u.prototype.request = function(e) {
        'string' === typeof e
          ? ((e = arguments[1] || {}), (e.url = arguments[0]))
          : (e = e || {}),
          (e = s(this.defaults, e)),
          e.method
            ? (e.method = e.method.toLowerCase())
            : this.defaults.method
            ? (e.method = this.defaults.method.toLowerCase())
            : (e.method = 'get');
        var t = [a, void 0],
          n = Promise.resolve(e);
        this.interceptors.request.forEach(function(e) {
          t.unshift(e.fulfilled, e.rejected);
        }),
          this.interceptors.response.forEach(function(e) {
            t.push(e.fulfilled, e.rejected);
          });
        while (t.length) n = n.then(t.shift(), t.shift());
        return n;
      }),
        (u.prototype.getUri = function(e) {
          return (
            (e = s(this.defaults, e)),
            o(e.url, e.params, e.paramsSerializer).replace(/^\?/, '')
          );
        }),
        r.forEach(['delete', 'get', 'head', 'options'], function(e) {
          u.prototype[e] = function(t, n) {
            return this.request(r.merge(n || {}, { method: e, url: t }));
          };
        }),
        r.forEach(['post', 'put', 'patch'], function(e) {
          u.prototype[e] = function(t, n, o) {
            return this.request(
              r.merge(o || {}, { method: e, url: t, data: n }),
            );
          };
        }),
        (e.exports = u);
    },
    DfZB: function(e, t, n) {
      'use strict';
      e.exports = function(e) {
        return function(t) {
          return e.apply(null, t);
        };
      };
    },
    Fugr: function(e, t, n) {
      'use strict';
      var r = n('1OyB'),
        o = n('vuIU'),
        i = [],
        a = i.forEach,
        s = i.slice;
      function u(e) {
        return (
          a.call(s.call(arguments, 1), function(t) {
            if (t) for (var n in t) void 0 === e[n] && (e[n] = t[n]);
          }),
          e
        );
      }
      var c,
        l = {
          create: function(e, t, n, r) {
            var o,
              i =
                arguments.length > 4 && void 0 !== arguments[4]
                  ? arguments[4]
                  : { path: '/' };
            if (n) {
              var a = new Date();
              a.setTime(a.getTime() + 60 * n * 1e3),
                (o = '; expires=' + a.toUTCString());
            } else o = '';
            (r = r ? 'domain=' + r + ';' : ''),
              (i = Object.keys(i).reduce(function(e, t) {
                return (
                  e +
                  ';' +
                  t.replace(/([A-Z])/g, function(e) {
                    return '-' + e.toLowerCase();
                  }) +
                  '=' +
                  i[t]
                );
              }, '')),
              (document.cookie =
                e + '=' + encodeURIComponent(t) + o + ';' + r + i);
          },
          read: function(e) {
            for (
              var t = e + '=', n = document.cookie.split(';'), r = 0;
              r < n.length;
              r++
            ) {
              var o = n[r];
              while (' ' === o.charAt(0)) o = o.substring(1, o.length);
              if (0 === o.indexOf(t)) return o.substring(t.length, o.length);
            }
            return null;
          },
          remove: function(e) {
            this.create(e, '', -1);
          },
        },
        f = {
          name: 'cookie',
          lookup: function(e) {
            var t;
            if (e.lookupCookie && 'undefined' !== typeof document) {
              var n = l.read(e.lookupCookie);
              n && (t = n);
            }
            return t;
          },
          cacheUserLanguage: function(e, t) {
            t.lookupCookie &&
              'undefined' !== typeof document &&
              l.create(
                t.lookupCookie,
                e,
                t.cookieMinutes,
                t.cookieDomain,
                t.cookieOptions,
              );
          },
        },
        p = {
          name: 'querystring',
          lookup: function(e) {
            var t;
            if ('undefined' !== typeof window)
              for (
                var n = window.location.search.substring(1),
                  r = n.split('&'),
                  o = 0;
                o < r.length;
                o++
              ) {
                var i = r[o].indexOf('=');
                if (i > 0) {
                  var a = r[o].substring(0, i);
                  a === e.lookupQuerystring && (t = r[o].substring(i + 1));
                }
              }
            return t;
          },
        };
      try {
        c = 'undefined' !== window && null !== window.localStorage;
        var h = 'i18next.translate.boo';
        window.localStorage.setItem(h, 'foo'),
          window.localStorage.removeItem(h);
      } catch (S) {
        c = !1;
      }
      var g,
        d = {
          name: 'localStorage',
          lookup: function(e) {
            var t;
            if (e.lookupLocalStorage && c) {
              var n = window.localStorage.getItem(e.lookupLocalStorage);
              n && (t = n);
            }
            return t;
          },
          cacheUserLanguage: function(e, t) {
            t.lookupLocalStorage &&
              c &&
              window.localStorage.setItem(t.lookupLocalStorage, e);
          },
        };
      try {
        g = 'undefined' !== window && null !== window.sessionStorage;
        var v = 'i18next.translate.boo';
        window.sessionStorage.setItem(v, 'foo'),
          window.sessionStorage.removeItem(v);
      } catch (S) {
        g = !1;
      }
      var m = {
          name: 'sessionStorage',
          lookup: function(e) {
            var t;
            if (e.lookupsessionStorage && g) {
              var n = window.sessionStorage.getItem(e.lookupsessionStorage);
              n && (t = n);
            }
            return t;
          },
          cacheUserLanguage: function(e, t) {
            t.lookupsessionStorage &&
              g &&
              window.sessionStorage.setItem(t.lookupsessionStorage, e);
          },
        },
        y = {
          name: 'navigator',
          lookup: function(e) {
            var t = [];
            if ('undefined' !== typeof navigator) {
              if (navigator.languages)
                for (var n = 0; n < navigator.languages.length; n++)
                  t.push(navigator.languages[n]);
              navigator.userLanguage && t.push(navigator.userLanguage),
                navigator.language && t.push(navigator.language);
            }
            return t.length > 0 ? t : void 0;
          },
        },
        b = {
          name: 'htmlTag',
          lookup: function(e) {
            var t,
              n =
                e.htmlTag ||
                ('undefined' !== typeof document
                  ? document.documentElement
                  : null);
            return (
              n &&
                'function' === typeof n.getAttribute &&
                (t = n.getAttribute('lang')),
              t
            );
          },
        },
        w = {
          name: 'path',
          lookup: function(e) {
            var t;
            if ('undefined' !== typeof window) {
              var n = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
              if (n instanceof Array)
                if ('number' === typeof e.lookupFromPathIndex) {
                  if ('string' !== typeof n[e.lookupFromPathIndex]) return;
                  t = n[e.lookupFromPathIndex].replace('/', '');
                } else t = n[0].replace('/', '');
            }
            return t;
          },
        },
        x = {
          name: 'subdomain',
          lookup: function(e) {
            var t;
            if ('undefined' !== typeof window) {
              var n = window.location.href.match(
                /(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi,
              );
              n instanceof Array &&
                (t =
                  'number' === typeof e.lookupFromSubdomainIndex
                    ? n[e.lookupFromSubdomainIndex]
                        .replace('http://', '')
                        .replace('https://', '')
                        .replace('.', '')
                    : n[0]
                        .replace('http://', '')
                        .replace('https://', '')
                        .replace('.', ''));
            }
            return t;
          },
        };
      function k() {
        return {
          order: [
            'querystring',
            'cookie',
            'localStorage',
            'sessionStorage',
            'navigator',
            'htmlTag',
          ],
          lookupQuerystring: 'lng',
          lookupCookie: 'i18next',
          lookupLocalStorage: 'i18nextLng',
          caches: ['localStorage'],
          excludeCacheFor: ['cimode'],
          checkWhitelist: !0,
          checkForSimilarInWhitelist: !1,
        };
      }
      var O = (function() {
        function e(t) {
          var n =
            arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
          Object(r['a'])(this, e),
            (this.type = 'languageDetector'),
            (this.detectors = {}),
            this.init(t, n);
        }
        return (
          Object(o['a'])(e, [
            {
              key: 'init',
              value: function(e) {
                var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {},
                  n =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {};
                (this.services = e),
                  (this.options = u(t, this.options || {}, k())),
                  this.options.checkForSimilarInWhitelist &&
                    (this.options.checkWhitelist = !0),
                  this.options.lookupFromUrlIndex &&
                    (this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex),
                  (this.i18nOptions = n),
                  this.addDetector(f),
                  this.addDetector(p),
                  this.addDetector(d),
                  this.addDetector(m),
                  this.addDetector(y),
                  this.addDetector(b),
                  this.addDetector(w),
                  this.addDetector(x);
              },
            },
            {
              key: 'addDetector',
              value: function(e) {
                this.detectors[e.name] = e;
              },
            },
            {
              key: 'detect',
              value: function(e) {
                var t = this;
                e || (e = this.options.order);
                var n,
                  r = [];
                if (
                  (e.forEach(function(e) {
                    if (t.detectors[e]) {
                      var n = t.detectors[e].lookup(t.options);
                      n && 'string' === typeof n && (n = [n]),
                        n && (r = r.concat(n));
                    }
                  }),
                  r.forEach(function(e) {
                    if (!n) {
                      var r = t.services.languageUtils.formatLanguageCode(e);
                      (t.options.checkWhitelist &&
                        !t.services.languageUtils.isWhitelisted(r)) ||
                        (n = r),
                        !n &&
                          t.options.checkForSimilarInWhitelist &&
                          (n = t.getSimilarInWhitelist(r));
                    }
                  }),
                  !n)
                ) {
                  var o = this.i18nOptions.fallbackLng;
                  'string' === typeof o && (o = [o]),
                    o || (o = []),
                    (n =
                      '[object Array]' === Object.prototype.toString.apply(o)
                        ? o[0]
                        : o[0] || (o['default'] && o['default'][0]));
                }
                return n;
              },
            },
            {
              key: 'cacheUserLanguage',
              value: function(e, t) {
                var n = this;
                t || (t = this.options.caches),
                  t &&
                    ((this.options.excludeCacheFor &&
                      this.options.excludeCacheFor.indexOf(e) > -1) ||
                      t.forEach(function(t) {
                        n.detectors[t] &&
                          n.detectors[t].cacheUserLanguage(e, n.options);
                      }));
              },
            },
            {
              key: 'getSimilarInWhitelist',
              value: function(e) {
                var t = this;
                if (this.i18nOptions.whitelist) {
                  if (e.includes('-')) {
                    var n = e.split('-')[0],
                      r = this.services.languageUtils.formatLanguageCode(n);
                    if (this.services.languageUtils.isWhitelisted(r)) return r;
                    e = r;
                  }
                  var o = this.i18nOptions.whitelist.find(function(n) {
                    var r = t.services.languageUtils.formatLanguageCode(n);
                    if (r.startsWith(e)) return r;
                  });
                  return o || void 0;
                }
              },
            },
          ]),
          e
        );
      })();
      (O.type = 'languageDetector'), (t['a'] = O);
    },
    HSsa: function(e, t, n) {
      'use strict';
      e.exports = function(e, t) {
        return function() {
          for (var n = new Array(arguments.length), r = 0; r < n.length; r++)
            n[r] = arguments[r];
          return e.apply(t, n);
        };
      };
    },
    JEQr: function(e, t, n) {
      'use strict';
      (function(t) {
        var r = n('xTJ+'),
          o = n('yK9s'),
          i = { 'Content-Type': 'application/x-www-form-urlencoded' };
        function a(e, t) {
          !r.isUndefined(e) &&
            r.isUndefined(e['Content-Type']) &&
            (e['Content-Type'] = t);
        }
        function s() {
          var e;
          return (
            ('undefined' !== typeof XMLHttpRequest ||
              ('undefined' !== typeof t &&
                '[object process]' === Object.prototype.toString.call(t))) &&
              (e = n('tQ2B')),
            e
          );
        }
        var u = {
          adapter: s(),
          transformRequest: [
            function(e, t) {
              return (
                o(t, 'Accept'),
                o(t, 'Content-Type'),
                r.isFormData(e) ||
                r.isArrayBuffer(e) ||
                r.isBuffer(e) ||
                r.isStream(e) ||
                r.isFile(e) ||
                r.isBlob(e)
                  ? e
                  : r.isArrayBufferView(e)
                  ? e.buffer
                  : r.isURLSearchParams(e)
                  ? (a(t, 'application/x-www-form-urlencoded;charset=utf-8'),
                    e.toString())
                  : r.isObject(e)
                  ? (a(t, 'application/json;charset=utf-8'), JSON.stringify(e))
                  : e
              );
            },
          ],
          transformResponse: [
            function(e) {
              if ('string' === typeof e)
                try {
                  e = JSON.parse(e);
                } catch (t) {}
              return e;
            },
          ],
          timeout: 0,
          xsrfCookieName: 'XSRF-TOKEN',
          xsrfHeaderName: 'X-XSRF-TOKEN',
          maxContentLength: -1,
          validateStatus: function(e) {
            return e >= 200 && e < 300;
          },
          headers: { common: { Accept: 'application/json, text/plain, */*' } },
        };
        r.forEach(['delete', 'get', 'head'], function(e) {
          u.headers[e] = {};
        }),
          r.forEach(['post', 'put', 'patch'], function(e) {
            u.headers[e] = r.merge(i);
          }),
          (e.exports = u);
      }.call(this, n('Q2Ig')));
    },
    LYNF: function(e, t, n) {
      'use strict';
      var r = n('OH9c');
      e.exports = function(e, t, n, o, i) {
        var a = new Error(e);
        return r(a, t, n, o, i);
      };
    },
    Lmem: function(e, t, n) {
      'use strict';
      e.exports = function(e) {
        return !(!e || !e.__CANCEL__);
      };
    },
    MLWZ: function(e, t, n) {
      'use strict';
      var r = n('xTJ+');
      function o(e) {
        return encodeURIComponent(e)
          .replace(/%40/gi, '@')
          .replace(/%3A/gi, ':')
          .replace(/%24/g, '$')
          .replace(/%2C/gi, ',')
          .replace(/%20/g, '+')
          .replace(/%5B/gi, '[')
          .replace(/%5D/gi, ']');
      }
      e.exports = function(e, t, n) {
        if (!t) return e;
        var i;
        if (n) i = n(t);
        else if (r.isURLSearchParams(t)) i = t.toString();
        else {
          var a = [];
          r.forEach(t, function(e, t) {
            null !== e &&
              'undefined' !== typeof e &&
              (r.isArray(e) ? (t += '[]') : (e = [e]),
              r.forEach(e, function(e) {
                r.isDate(e)
                  ? (e = e.toISOString())
                  : r.isObject(e) && (e = JSON.stringify(e)),
                  a.push(o(t) + '=' + o(e));
              }));
          }),
            (i = a.join('&'));
        }
        if (i) {
          var s = e.indexOf('#');
          -1 !== s && (e = e.slice(0, s)),
            (e += (-1 === e.indexOf('?') ? '?' : '&') + i);
        }
        return e;
      };
    },
    OH9c: function(e, t, n) {
      'use strict';
      e.exports = function(e, t, n, r, o) {
        return (
          (e.config = t),
          n && (e.code = n),
          (e.request = r),
          (e.response = o),
          (e.isAxiosError = !0),
          (e.toJSON = function() {
            return {
              message: this.message,
              name: this.name,
              description: this.description,
              number: this.number,
              fileName: this.fileName,
              lineNumber: this.lineNumber,
              columnNumber: this.columnNumber,
              stack: this.stack,
              config: this.config,
              code: this.code,
            };
          }),
          e
        );
      };
    },
    OTTw: function(e, t, n) {
      'use strict';
      var r = n('xTJ+');
      e.exports = r.isStandardBrowserEnv()
        ? (function() {
            var e,
              t = /(msie|trident)/i.test(navigator.userAgent),
              n = document.createElement('a');
            function o(e) {
              var r = e;
              return (
                t && (n.setAttribute('href', r), (r = n.href)),
                n.setAttribute('href', r),
                {
                  href: n.href,
                  protocol: n.protocol ? n.protocol.replace(/:$/, '') : '',
                  host: n.host,
                  search: n.search ? n.search.replace(/^\?/, '') : '',
                  hash: n.hash ? n.hash.replace(/^#/, '') : '',
                  hostname: n.hostname,
                  port: n.port,
                  pathname:
                    '/' === n.pathname.charAt(0)
                      ? n.pathname
                      : '/' + n.pathname,
                }
              );
            }
            return (
              (e = o(window.location.href)),
              function(t) {
                var n = r.isString(t) ? o(t) : t;
                return n.protocol === e.protocol && n.host === e.host;
              }
            );
          })()
        : (function() {
            return function() {
              return !0;
            };
          })();
    },
    PW5K: function(e, t) {
      function n(e, t, n) {
        return (
          t in e
            ? Object.defineProperty(e, t, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              })
            : (e[t] = n),
          e
        );
      }
      (e.exports = n),
        (e.exports.__esModule = !0),
        (e.exports['default'] = e.exports);
    },
    QSL9: function(e, t, n) {
      'use strict';
      n.d(t, 'a', function() {
        return g;
      }),
        n.d(t, 'b', function() {
          return m;
        });
      var r = n('BAi7'),
        o = n.n(r),
        i = n('VKLI'),
        a = n.n(i),
        s = n('PW5K'),
        u = n.n(s),
        c = n('q1tI'),
        l = n.n(c);
      function f(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
          var r = Object.getOwnPropertySymbols(e);
          t &&
            (r = r.filter(function(t) {
              return Object.getOwnPropertyDescriptor(e, t).enumerable;
            })),
            n.push.apply(n, r);
        }
        return n;
      }
      function p(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? arguments[t] : {};
          t % 2
            ? f(Object(n), !0).forEach(function(t) {
                u()(e, t, n[t]);
              })
            : Object.getOwnPropertyDescriptors
            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
            : f(Object(n)).forEach(function(t) {
                Object.defineProperty(
                  e,
                  t,
                  Object.getOwnPropertyDescriptor(n, t),
                );
              });
        }
        return e;
      }
      var h = {
          bindI18n: 'languageChanged',
          bindI18nStore: '',
          transEmptyNodeValue: '',
          transSupportBasicHtmlNodes: !0,
          transWrapTextNodes: '',
          transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p'],
          useSuspense: !0,
        },
        g = l.a.createContext();
      function d() {
        var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
        h = p(p({}, h), e);
      }
      (function() {
        function e() {
          o()(this, e), (this.usedNamespaces = {});
        }
        a()(e, [
          {
            key: 'addUsedNamespaces',
            value: function(e) {
              var t = this;
              e.forEach(function(e) {
                t.usedNamespaces[e] || (t.usedNamespaces[e] = !0);
              });
            },
          },
          {
            key: 'getUsedNamespaces',
            value: function() {
              return Object.keys(this.usedNamespaces);
            },
          },
        ]);
      })();
      function v(e) {
        e;
      }
      var m = {
        type: '3rdParty',
        init: function(e) {
          d(e.options.react), v(e);
        },
      };
    },
    'Rn+g': function(e, t, n) {
      'use strict';
      var r = n('LYNF');
      e.exports = function(e, t, n) {
        var o = n.config.validateStatus;
        !o || o(n.status)
          ? e(n)
          : t(
              r(
                'Request failed with status code ' + n.status,
                n.config,
                null,
                n.request,
                n,
              ),
            );
      };
    },
    SntB: function(e, t, n) {
      'use strict';
      var r = n('xTJ+');
      e.exports = function(e, t) {
        t = t || {};
        var n = {},
          o = ['url', 'method', 'params', 'data'],
          i = ['headers', 'auth', 'proxy'],
          a = [
            'baseURL',
            'url',
            'transformRequest',
            'transformResponse',
            'paramsSerializer',
            'timeout',
            'withCredentials',
            'adapter',
            'responseType',
            'xsrfCookieName',
            'xsrfHeaderName',
            'onUploadProgress',
            'onDownloadProgress',
            'maxContentLength',
            'validateStatus',
            'maxRedirects',
            'httpAgent',
            'httpsAgent',
            'cancelToken',
            'socketPath',
          ];
        r.forEach(o, function(e) {
          'undefined' !== typeof t[e] && (n[e] = t[e]);
        }),
          r.forEach(i, function(o) {
            r.isObject(t[o])
              ? (n[o] = r.deepMerge(e[o], t[o]))
              : 'undefined' !== typeof t[o]
              ? (n[o] = t[o])
              : r.isObject(e[o])
              ? (n[o] = r.deepMerge(e[o]))
              : 'undefined' !== typeof e[o] && (n[o] = e[o]);
          }),
          r.forEach(a, function(r) {
            'undefined' !== typeof t[r]
              ? (n[r] = t[r])
              : 'undefined' !== typeof e[r] && (n[r] = e[r]);
          });
        var s = o.concat(i).concat(a),
          u = Object.keys(t).filter(function(e) {
            return -1 === s.indexOf(e);
          });
        return (
          r.forEach(u, function(r) {
            'undefined' !== typeof t[r]
              ? (n[r] = t[r])
              : 'undefined' !== typeof e[r] && (n[r] = e[r]);
          }),
          n
        );
      };
    },
    TO8r: function(e, t) {
      var n = /\s/;
      function r(e) {
        var t = e.length;
        while (t-- && n.test(e.charAt(t)));
        return t;
      }
      e.exports = r;
    },
    UnBK: function(e, t, n) {
      'use strict';
      var r = n('xTJ+'),
        o = n('xAGQ'),
        i = n('Lmem'),
        a = n('JEQr');
      function s(e) {
        e.cancelToken && e.cancelToken.throwIfRequested();
      }
      e.exports = function(e) {
        s(e),
          (e.headers = e.headers || {}),
          (e.data = o(e.data, e.headers, e.transformRequest)),
          (e.headers = r.merge(
            e.headers.common || {},
            e.headers[e.method] || {},
            e.headers,
          )),
          r.forEach(
            ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
            function(t) {
              delete e.headers[t];
            },
          );
        var t = e.adapter || a.adapter;
        return t(e).then(
          function(t) {
            return (
              s(e), (t.data = o(t.data, t.headers, e.transformResponse)), t
            );
          },
          function(t) {
            return (
              i(t) ||
                (s(e),
                t &&
                  t.response &&
                  (t.response.data = o(
                    t.response.data,
                    t.response.headers,
                    e.transformResponse,
                  ))),
              Promise.reject(t)
            );
          },
        );
      };
    },
    VKLI: function(e, t) {
      function n(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          (r.enumerable = r.enumerable || !1),
            (r.configurable = !0),
            'value' in r && (r.writable = !0),
            Object.defineProperty(e, r.key, r);
        }
      }
      function r(e, t, r) {
        return (
          t && n(e.prototype, t),
          r && n(e, r),
          Object.defineProperty(e, 'prototype', { writable: !1 }),
          e
        );
      }
      (e.exports = r),
        (e.exports.__esModule = !0),
        (e.exports['default'] = e.exports);
    },
    XzT5: function(e, t, n) {
      'use strict';
      var r = n('U8pU'),
        o = n('rePB');
      function i(e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = null != arguments[t] ? Object(arguments[t]) : {},
            r = Object.keys(n);
          'function' === typeof Object.getOwnPropertySymbols &&
            (r = r.concat(
              Object.getOwnPropertySymbols(n).filter(function(e) {
                return Object.getOwnPropertyDescriptor(n, e).enumerable;
              }),
            )),
            r.forEach(function(t) {
              Object(o['a'])(e, t, n[t]);
            });
        }
        return e;
      }
      var a = n('1OyB'),
        s = n('vuIU'),
        u = n('md7G'),
        c = n('foSv'),
        l = n('JX7q'),
        f = n('Ji7U'),
        p = {
          type: 'logger',
          log: function(e) {
            this.output('log', e);
          },
          warn: function(e) {
            this.output('warn', e);
          },
          error: function(e) {
            this.output('error', e);
          },
          output: function(e, t) {
            console && console[e] && console[e].apply(console, t);
          },
        },
        h = (function() {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            Object(a['a'])(this, e), this.init(t, n);
          }
          return (
            Object(s['a'])(e, [
              {
                key: 'init',
                value: function(e) {
                  var t =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : {};
                  (this.prefix = t.prefix || 'i18next:'),
                    (this.logger = e || p),
                    (this.options = t),
                    (this.debug = t.debug);
                },
              },
              {
                key: 'setDebug',
                value: function(e) {
                  this.debug = e;
                },
              },
              {
                key: 'log',
                value: function() {
                  for (
                    var e = arguments.length, t = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    t[n] = arguments[n];
                  return this.forward(t, 'log', '', !0);
                },
              },
              {
                key: 'warn',
                value: function() {
                  for (
                    var e = arguments.length, t = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    t[n] = arguments[n];
                  return this.forward(t, 'warn', '', !0);
                },
              },
              {
                key: 'error',
                value: function() {
                  for (
                    var e = arguments.length, t = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    t[n] = arguments[n];
                  return this.forward(t, 'error', '');
                },
              },
              {
                key: 'deprecate',
                value: function() {
                  for (
                    var e = arguments.length, t = new Array(e), n = 0;
                    n < e;
                    n++
                  )
                    t[n] = arguments[n];
                  return this.forward(t, 'warn', 'WARNING DEPRECATED: ', !0);
                },
              },
              {
                key: 'forward',
                value: function(e, t, n, r) {
                  return r && !this.debug
                    ? null
                    : ('string' === typeof e[0] &&
                        (e[0] = ''
                          .concat(n)
                          .concat(this.prefix, ' ')
                          .concat(e[0])),
                      this.logger[t](e));
                },
              },
              {
                key: 'create',
                value: function(t) {
                  return new e(
                    this.logger,
                    i(
                      {},
                      { prefix: ''.concat(this.prefix, ':').concat(t, ':') },
                      this.options,
                    ),
                  );
                },
              },
            ]),
            e
          );
        })(),
        g = new h(),
        d = (function() {
          function e() {
            Object(a['a'])(this, e), (this.observers = {});
          }
          return (
            Object(s['a'])(e, [
              {
                key: 'on',
                value: function(e, t) {
                  var n = this;
                  return (
                    e.split(' ').forEach(function(e) {
                      (n.observers[e] = n.observers[e] || []),
                        n.observers[e].push(t);
                    }),
                    this
                  );
                },
              },
              {
                key: 'off',
                value: function(e, t) {
                  this.observers[e] &&
                    (t
                      ? (this.observers[e] = this.observers[e].filter(function(
                          e,
                        ) {
                          return e !== t;
                        }))
                      : delete this.observers[e]);
                },
              },
              {
                key: 'emit',
                value: function(e) {
                  for (
                    var t = arguments.length,
                      n = new Array(t > 1 ? t - 1 : 0),
                      r = 1;
                    r < t;
                    r++
                  )
                    n[r - 1] = arguments[r];
                  if (this.observers[e]) {
                    var o = [].concat(this.observers[e]);
                    o.forEach(function(e) {
                      e.apply(void 0, n);
                    });
                  }
                  if (this.observers['*']) {
                    var i = [].concat(this.observers['*']);
                    i.forEach(function(t) {
                      t.apply(t, [e].concat(n));
                    });
                  }
                },
              },
            ]),
            e
          );
        })();
      function v() {
        var e,
          t,
          n = new Promise(function(n, r) {
            (e = n), (t = r);
          });
        return (n.resolve = e), (n.reject = t), n;
      }
      function m(e) {
        return null == e ? '' : '' + e;
      }
      function y(e, t, n) {
        e.forEach(function(e) {
          t[e] && (n[e] = t[e]);
        });
      }
      function b(e, t, n) {
        function r(e) {
          return e && e.indexOf('###') > -1 ? e.replace(/###/g, '.') : e;
        }
        function o() {
          return !e || 'string' === typeof e;
        }
        var i = 'string' !== typeof t ? [].concat(t) : t.split('.');
        while (i.length > 1) {
          if (o()) return {};
          var a = r(i.shift());
          !e[a] && n && (e[a] = new n()),
            (e = Object.prototype.hasOwnProperty.call(e, a) ? e[a] : {});
        }
        return o() ? {} : { obj: e, k: r(i.shift()) };
      }
      function w(e, t, n) {
        var r = b(e, t, Object),
          o = r.obj,
          i = r.k;
        o[i] = n;
      }
      function x(e, t, n, r) {
        var o = b(e, t, Object),
          i = o.obj,
          a = o.k;
        (i[a] = i[a] || []), r && (i[a] = i[a].concat(n)), r || i[a].push(n);
      }
      function k(e, t) {
        var n = b(e, t),
          r = n.obj,
          o = n.k;
        if (r) return r[o];
      }
      function O(e, t, n) {
        var r = k(e, n);
        return void 0 !== r ? r : k(t, n);
      }
      function S(e, t, n) {
        for (var r in t)
          '__proto__' !== r &&
            'constructor' !== r &&
            (r in e
              ? 'string' === typeof e[r] ||
                e[r] instanceof String ||
                'string' === typeof t[r] ||
                t[r] instanceof String
                ? n && (e[r] = t[r])
                : S(e[r], t[r], n)
              : (e[r] = t[r]));
        return e;
      }
      function L(e) {
        return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
      }
      var N = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
      };
      function j(e) {
        return 'string' === typeof e
          ? e.replace(/[&<>"'\/]/g, function(e) {
              return N[e];
            })
          : e;
      }
      var E =
          'undefined' !== typeof window &&
          window.navigator &&
          window.navigator.userAgent &&
          window.navigator.userAgent.indexOf('MSIE') > -1,
        C = (function(e) {
          function t(e) {
            var n,
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : { ns: ['translation'], defaultNS: 'translation' };
            return (
              Object(a['a'])(this, t),
              (n = Object(u['a'])(this, Object(c['a'])(t).call(this))),
              E && d.call(Object(l['a'])(n)),
              (n.data = e || {}),
              (n.options = r),
              void 0 === n.options.keySeparator &&
                (n.options.keySeparator = '.'),
              n
            );
          }
          return (
            Object(f['a'])(t, e),
            Object(s['a'])(t, [
              {
                key: 'addNamespaces',
                value: function(e) {
                  this.options.ns.indexOf(e) < 0 && this.options.ns.push(e);
                },
              },
              {
                key: 'removeNamespaces',
                value: function(e) {
                  var t = this.options.ns.indexOf(e);
                  t > -1 && this.options.ns.splice(t, 1);
                },
              },
              {
                key: 'getResource',
                value: function(e, t, n) {
                  var r =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : {},
                    o =
                      void 0 !== r.keySeparator
                        ? r.keySeparator
                        : this.options.keySeparator,
                    i = [e, t];
                  return (
                    n && 'string' !== typeof n && (i = i.concat(n)),
                    n &&
                      'string' === typeof n &&
                      (i = i.concat(o ? n.split(o) : n)),
                    e.indexOf('.') > -1 && (i = e.split('.')),
                    k(this.data, i)
                  );
                },
              },
              {
                key: 'addResource',
                value: function(e, t, n, r) {
                  var o =
                      arguments.length > 4 && void 0 !== arguments[4]
                        ? arguments[4]
                        : { silent: !1 },
                    i = this.options.keySeparator;
                  void 0 === i && (i = '.');
                  var a = [e, t];
                  n && (a = a.concat(i ? n.split(i) : n)),
                    e.indexOf('.') > -1 &&
                      ((a = e.split('.')), (r = t), (t = a[1])),
                    this.addNamespaces(t),
                    w(this.data, a, r),
                    o.silent || this.emit('added', e, t, n, r);
                },
              },
              {
                key: 'addResources',
                value: function(e, t, n) {
                  var r =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : { silent: !1 };
                  for (var o in n)
                    ('string' !== typeof n[o] &&
                      '[object Array]' !==
                        Object.prototype.toString.apply(n[o])) ||
                      this.addResource(e, t, o, n[o], { silent: !0 });
                  r.silent || this.emit('added', e, t, n);
                },
              },
              {
                key: 'addResourceBundle',
                value: function(e, t, n, r, o) {
                  var a =
                      arguments.length > 5 && void 0 !== arguments[5]
                        ? arguments[5]
                        : { silent: !1 },
                    s = [e, t];
                  e.indexOf('.') > -1 &&
                    ((s = e.split('.')), (r = n), (n = t), (t = s[1])),
                    this.addNamespaces(t);
                  var u = k(this.data, s) || {};
                  r ? S(u, n, o) : (u = i({}, u, n)),
                    w(this.data, s, u),
                    a.silent || this.emit('added', e, t, n);
                },
              },
              {
                key: 'removeResourceBundle',
                value: function(e, t) {
                  this.hasResourceBundle(e, t) && delete this.data[e][t],
                    this.removeNamespaces(t),
                    this.emit('removed', e, t);
                },
              },
              {
                key: 'hasResourceBundle',
                value: function(e, t) {
                  return void 0 !== this.getResource(e, t);
                },
              },
              {
                key: 'getResourceBundle',
                value: function(e, t) {
                  return (
                    t || (t = this.options.defaultNS),
                    'v1' === this.options.compatibilityAPI
                      ? i({}, {}, this.getResource(e, t))
                      : this.getResource(e, t)
                  );
                },
              },
              {
                key: 'getDataByLanguage',
                value: function(e) {
                  return this.data[e];
                },
              },
              {
                key: 'toJSON',
                value: function() {
                  return this.data;
                },
              },
            ]),
            t
          );
        })(d),
        R = {
          processors: {},
          addPostProcessor: function(e) {
            this.processors[e.name] = e;
          },
          handle: function(e, t, n, r, o) {
            var i = this;
            return (
              e.forEach(function(e) {
                i.processors[e] && (t = i.processors[e].process(t, n, r, o));
              }),
              t
            );
          },
        },
        P = {},
        A = (function(e) {
          function t(e) {
            var n,
              r =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {};
            return (
              Object(a['a'])(this, t),
              (n = Object(u['a'])(this, Object(c['a'])(t).call(this))),
              E && d.call(Object(l['a'])(n)),
              y(
                [
                  'resourceStore',
                  'languageUtils',
                  'pluralResolver',
                  'interpolator',
                  'backendConnector',
                  'i18nFormat',
                  'utils',
                ],
                e,
                Object(l['a'])(n),
              ),
              (n.options = r),
              void 0 === n.options.keySeparator &&
                (n.options.keySeparator = '.'),
              (n.logger = g.create('translator')),
              n
            );
          }
          return (
            Object(f['a'])(t, e),
            Object(s['a'])(
              t,
              [
                {
                  key: 'changeLanguage',
                  value: function(e) {
                    e && (this.language = e);
                  },
                },
                {
                  key: 'exists',
                  value: function(e) {
                    var t =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : { interpolation: {} },
                      n = this.resolve(e, t);
                    return n && void 0 !== n.res;
                  },
                },
                {
                  key: 'extractFromKey',
                  value: function(e, t) {
                    var n =
                      void 0 !== t.nsSeparator
                        ? t.nsSeparator
                        : this.options.nsSeparator;
                    void 0 === n && (n = ':');
                    var r =
                        void 0 !== t.keySeparator
                          ? t.keySeparator
                          : this.options.keySeparator,
                      o = t.ns || this.options.defaultNS;
                    if (n && e.indexOf(n) > -1) {
                      var i = e.match(this.interpolator.nestingRegexp);
                      if (i && i.length > 0) return { key: e, namespaces: o };
                      var a = e.split(n);
                      (n !== r ||
                        (n === r && this.options.ns.indexOf(a[0]) > -1)) &&
                        (o = a.shift()),
                        (e = a.join(r));
                    }
                    return (
                      'string' === typeof o && (o = [o]),
                      { key: e, namespaces: o }
                    );
                  },
                },
                {
                  key: 'translate',
                  value: function(e, n, o) {
                    var a = this;
                    if (
                      ('object' !== Object(r['a'])(n) &&
                        this.options.overloadTranslationOptionHandler &&
                        (n = this.options.overloadTranslationOptionHandler(
                          arguments,
                        )),
                      n || (n = {}),
                      void 0 === e || null === e)
                    )
                      return '';
                    Array.isArray(e) || (e = [String(e)]);
                    var s =
                        void 0 !== n.keySeparator
                          ? n.keySeparator
                          : this.options.keySeparator,
                      u = this.extractFromKey(e[e.length - 1], n),
                      c = u.key,
                      l = u.namespaces,
                      f = l[l.length - 1],
                      p = n.lng || this.language,
                      h =
                        n.appendNamespaceToCIMode ||
                        this.options.appendNamespaceToCIMode;
                    if (p && 'cimode' === p.toLowerCase()) {
                      if (h) {
                        var g = n.nsSeparator || this.options.nsSeparator;
                        return f + g + c;
                      }
                      return c;
                    }
                    var d = this.resolve(e, n),
                      v = d && d.res,
                      m = (d && d.usedKey) || c,
                      y = (d && d.exactUsedKey) || c,
                      b = Object.prototype.toString.apply(v),
                      w = [
                        '[object Number]',
                        '[object Function]',
                        '[object RegExp]',
                      ],
                      x =
                        void 0 !== n.joinArrays
                          ? n.joinArrays
                          : this.options.joinArrays,
                      k = !this.i18nFormat || this.i18nFormat.handleAsObject,
                      O =
                        'string' !== typeof v &&
                        'boolean' !== typeof v &&
                        'number' !== typeof v;
                    if (
                      k &&
                      v &&
                      O &&
                      w.indexOf(b) < 0 &&
                      ('string' !== typeof x || '[object Array]' !== b)
                    ) {
                      if (!n.returnObjects && !this.options.returnObjects)
                        return (
                          this.logger.warn(
                            'accessing an object - but returnObjects options is not enabled!',
                          ),
                          this.options.returnedObjectHandler
                            ? this.options.returnedObjectHandler(m, v, n)
                            : "key '"
                                .concat(c, ' (')
                                .concat(
                                  this.language,
                                  ")' returned an object instead of string.",
                                )
                        );
                      if (s) {
                        var S = '[object Array]' === b,
                          L = S ? [] : {},
                          N = S ? y : m;
                        for (var j in v)
                          if (Object.prototype.hasOwnProperty.call(v, j)) {
                            var E = ''
                              .concat(N)
                              .concat(s)
                              .concat(j);
                            (L[j] = this.translate(
                              E,
                              i({}, n, { joinArrays: !1, ns: l }),
                            )),
                              L[j] === E && (L[j] = v[j]);
                          }
                        v = L;
                      }
                    } else if (
                      k &&
                      'string' === typeof x &&
                      '[object Array]' === b
                    )
                      (v = v.join(x)),
                        v && (v = this.extendTranslation(v, e, n, o));
                    else {
                      var C = !1,
                        R = !1,
                        P = void 0 !== n.count && 'string' !== typeof n.count,
                        A = t.hasDefaultValue(n),
                        T = P ? this.pluralResolver.getSuffix(p, n.count) : '',
                        U = n['defaultValue'.concat(T)] || n.defaultValue;
                      !this.isValidLookup(v) && A && ((C = !0), (v = U)),
                        this.isValidLookup(v) || ((R = !0), (v = c));
                      var F = A && U !== v && this.options.updateMissing;
                      if (R || C || F) {
                        if (
                          (this.logger.log(
                            F ? 'updateKey' : 'missingKey',
                            p,
                            f,
                            c,
                            F ? U : v,
                          ),
                          s)
                        ) {
                          var D = this.resolve(
                            c,
                            i({}, n, { keySeparator: !1 }),
                          );
                          D &&
                            D.res &&
                            this.logger.warn(
                              'Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.',
                            );
                        }
                        var B = [],
                          I = this.languageUtils.getFallbackCodes(
                            this.options.fallbackLng,
                            n.lng || this.language,
                          );
                        if (
                          'fallback' === this.options.saveMissingTo &&
                          I &&
                          I[0]
                        )
                          for (var M = 0; M < I.length; M++) B.push(I[M]);
                        else
                          'all' === this.options.saveMissingTo
                            ? (B = this.languageUtils.toResolveHierarchy(
                                n.lng || this.language,
                              ))
                            : B.push(n.lng || this.language);
                        var V = function(e, t, r) {
                          a.options.missingKeyHandler
                            ? a.options.missingKeyHandler(
                                e,
                                f,
                                t,
                                F ? r : v,
                                F,
                                n,
                              )
                            : a.backendConnector &&
                              a.backendConnector.saveMissing &&
                              a.backendConnector.saveMissing(
                                e,
                                f,
                                t,
                                F ? r : v,
                                F,
                                n,
                              ),
                            a.emit('missingKey', e, f, t, v);
                        };
                        this.options.saveMissing &&
                          (this.options.saveMissingPlurals && P
                            ? B.forEach(function(e) {
                                a.pluralResolver
                                  .getSuffixes(e)
                                  .forEach(function(t) {
                                    V(
                                      [e],
                                      c + t,
                                      n['defaultValue'.concat(t)] || U,
                                    );
                                  });
                              })
                            : V(B, c, U));
                      }
                      (v = this.extendTranslation(v, e, n, d, o)),
                        R &&
                          v === c &&
                          this.options.appendNamespaceToMissingKey &&
                          (v = ''.concat(f, ':').concat(c)),
                        R &&
                          this.options.parseMissingKeyHandler &&
                          (v = this.options.parseMissingKeyHandler(v));
                    }
                    return v;
                  },
                },
                {
                  key: 'extendTranslation',
                  value: function(e, t, n, r, o) {
                    var a = this;
                    if (this.i18nFormat && this.i18nFormat.parse)
                      e = this.i18nFormat.parse(
                        e,
                        n,
                        r.usedLng,
                        r.usedNS,
                        r.usedKey,
                        { resolved: r },
                      );
                    else if (!n.skipInterpolation) {
                      n.interpolation &&
                        this.interpolator.init(
                          i({}, n, {
                            interpolation: i(
                              {},
                              this.options.interpolation,
                              n.interpolation,
                            ),
                          }),
                        );
                      var s,
                        u =
                          (n.interpolation &&
                            n.interpolation.skipOnVariables) ||
                          this.options.interpolation.skipOnVariables;
                      if (u) {
                        var c = e.match(this.interpolator.nestingRegexp);
                        s = c && c.length;
                      }
                      var l =
                        n.replace && 'string' !== typeof n.replace
                          ? n.replace
                          : n;
                      if (
                        (this.options.interpolation.defaultVariables &&
                          (l = i(
                            {},
                            this.options.interpolation.defaultVariables,
                            l,
                          )),
                        (e = this.interpolator.interpolate(
                          e,
                          l,
                          n.lng || this.language,
                          n,
                        )),
                        u)
                      ) {
                        var f = e.match(this.interpolator.nestingRegexp),
                          p = f && f.length;
                        s < p && (n.nest = !1);
                      }
                      !1 !== n.nest &&
                        (e = this.interpolator.nest(
                          e,
                          function() {
                            for (
                              var e = arguments.length, r = new Array(e), i = 0;
                              i < e;
                              i++
                            )
                              r[i] = arguments[i];
                            return o && o[0] === r[0] && !n.context
                              ? (a.logger.warn(
                                  'It seems you are nesting recursively key: '
                                    .concat(r[0], ' in key: ')
                                    .concat(t[0]),
                                ),
                                null)
                              : a.translate.apply(a, r.concat([t]));
                          },
                          n,
                        )),
                        n.interpolation && this.interpolator.reset();
                    }
                    var h = n.postProcess || this.options.postProcess,
                      g = 'string' === typeof h ? [h] : h;
                    return (
                      void 0 !== e &&
                        null !== e &&
                        g &&
                        g.length &&
                        !1 !== n.applyPostProcessor &&
                        (e = R.handle(
                          g,
                          e,
                          t,
                          this.options && this.options.postProcessPassResolved
                            ? i({ i18nResolved: r }, n)
                            : n,
                          this,
                        )),
                      e
                    );
                  },
                },
                {
                  key: 'resolve',
                  value: function(e) {
                    var t,
                      n,
                      r,
                      o,
                      i,
                      a = this,
                      s =
                        arguments.length > 1 && void 0 !== arguments[1]
                          ? arguments[1]
                          : {};
                    return (
                      'string' === typeof e && (e = [e]),
                      e.forEach(function(e) {
                        if (!a.isValidLookup(t)) {
                          var u = a.extractFromKey(e, s),
                            c = u.key;
                          n = c;
                          var l = u.namespaces;
                          a.options.fallbackNS &&
                            (l = l.concat(a.options.fallbackNS));
                          var f =
                              void 0 !== s.count && 'string' !== typeof s.count,
                            p =
                              void 0 !== s.context &&
                              'string' === typeof s.context &&
                              '' !== s.context,
                            h = s.lngs
                              ? s.lngs
                              : a.languageUtils.toResolveHierarchy(
                                  s.lng || a.language,
                                  s.fallbackLng,
                                );
                          l.forEach(function(e) {
                            a.isValidLookup(t) ||
                              ((i = e),
                              !P[''.concat(h[0], '-').concat(e)] &&
                                a.utils &&
                                a.utils.hasLoadedNamespace &&
                                !a.utils.hasLoadedNamespace(i) &&
                                ((P[''.concat(h[0], '-').concat(e)] = !0),
                                a.logger.warn(
                                  'key "'
                                    .concat(n, '" for languages "')
                                    .concat(
                                      h.join(', '),
                                      '" won\'t get resolved as namespace "',
                                    )
                                    .concat(i, '" was not yet loaded'),
                                  'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!',
                                )),
                              h.forEach(function(n) {
                                if (!a.isValidLookup(t)) {
                                  o = n;
                                  var i,
                                    u,
                                    l = c,
                                    h = [l];
                                  if (
                                    a.i18nFormat &&
                                    a.i18nFormat.addLookupKeys
                                  )
                                    a.i18nFormat.addLookupKeys(h, c, n, e, s);
                                  else
                                    f &&
                                      (i = a.pluralResolver.getSuffix(
                                        n,
                                        s.count,
                                      )),
                                      f && p && h.push(l + i),
                                      p &&
                                        h.push(
                                          (l += ''
                                            .concat(a.options.contextSeparator)
                                            .concat(s.context)),
                                        ),
                                      f && h.push((l += i));
                                  while ((u = h.pop()))
                                    a.isValidLookup(t) ||
                                      ((r = u),
                                      (t = a.getResource(n, e, u, s)));
                                }
                              }));
                          });
                        }
                      }),
                      {
                        res: t,
                        usedKey: n,
                        exactUsedKey: r,
                        usedLng: o,
                        usedNS: i,
                      }
                    );
                  },
                },
                {
                  key: 'isValidLookup',
                  value: function(e) {
                    return (
                      void 0 !== e &&
                      !(!this.options.returnNull && null === e) &&
                      !(!this.options.returnEmptyString && '' === e)
                    );
                  },
                },
                {
                  key: 'getResource',
                  value: function(e, t, n) {
                    var r =
                      arguments.length > 3 && void 0 !== arguments[3]
                        ? arguments[3]
                        : {};
                    return this.i18nFormat && this.i18nFormat.getResource
                      ? this.i18nFormat.getResource(e, t, n, r)
                      : this.resourceStore.getResource(e, t, n, r);
                  },
                },
              ],
              [
                {
                  key: 'hasDefaultValue',
                  value: function(e) {
                    var t = 'defaultValue';
                    for (var n in e)
                      if (
                        Object.prototype.hasOwnProperty.call(e, n) &&
                        t === n.substring(0, t.length) &&
                        void 0 !== e[n]
                      )
                        return !0;
                    return !1;
                  },
                },
              ],
            ),
            t
          );
        })(d);
      function T(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      }
      var U = (function() {
          function e(t) {
            Object(a['a'])(this, e),
              (this.options = t),
              (this.whitelist = this.options.supportedLngs || !1),
              (this.supportedLngs = this.options.supportedLngs || !1),
              (this.logger = g.create('languageUtils'));
          }
          return (
            Object(s['a'])(e, [
              {
                key: 'getScriptPartFromCode',
                value: function(e) {
                  if (!e || e.indexOf('-') < 0) return null;
                  var t = e.split('-');
                  return 2 === t.length
                    ? null
                    : (t.pop(),
                      'x' === t[t.length - 1].toLowerCase()
                        ? null
                        : this.formatLanguageCode(t.join('-')));
                },
              },
              {
                key: 'getLanguagePartFromCode',
                value: function(e) {
                  if (!e || e.indexOf('-') < 0) return e;
                  var t = e.split('-');
                  return this.formatLanguageCode(t[0]);
                },
              },
              {
                key: 'formatLanguageCode',
                value: function(e) {
                  if ('string' === typeof e && e.indexOf('-') > -1) {
                    var t = [
                        'hans',
                        'hant',
                        'latn',
                        'cyrl',
                        'cans',
                        'mong',
                        'arab',
                      ],
                      n = e.split('-');
                    return (
                      this.options.lowerCaseLng
                        ? (n = n.map(function(e) {
                            return e.toLowerCase();
                          }))
                        : 2 === n.length
                        ? ((n[0] = n[0].toLowerCase()),
                          (n[1] = n[1].toUpperCase()),
                          t.indexOf(n[1].toLowerCase()) > -1 &&
                            (n[1] = T(n[1].toLowerCase())))
                        : 3 === n.length &&
                          ((n[0] = n[0].toLowerCase()),
                          2 === n[1].length && (n[1] = n[1].toUpperCase()),
                          'sgn' !== n[0] &&
                            2 === n[2].length &&
                            (n[2] = n[2].toUpperCase()),
                          t.indexOf(n[1].toLowerCase()) > -1 &&
                            (n[1] = T(n[1].toLowerCase())),
                          t.indexOf(n[2].toLowerCase()) > -1 &&
                            (n[2] = T(n[2].toLowerCase()))),
                      n.join('-')
                    );
                  }
                  return this.options.cleanCode || this.options.lowerCaseLng
                    ? e.toLowerCase()
                    : e;
                },
              },
              {
                key: 'isWhitelisted',
                value: function(e) {
                  return (
                    this.logger.deprecate(
                      'languageUtils.isWhitelisted',
                      'function "isWhitelisted" will be renamed to "isSupportedCode" in the next major - please make sure to rename it\'s usage asap.',
                    ),
                    this.isSupportedCode(e)
                  );
                },
              },
              {
                key: 'isSupportedCode',
                value: function(e) {
                  return (
                    ('languageOnly' === this.options.load ||
                      this.options.nonExplicitSupportedLngs) &&
                      (e = this.getLanguagePartFromCode(e)),
                    !this.supportedLngs ||
                      !this.supportedLngs.length ||
                      this.supportedLngs.indexOf(e) > -1
                  );
                },
              },
              {
                key: 'getBestMatchFromCodes',
                value: function(e) {
                  var t,
                    n = this;
                  return e
                    ? (e.forEach(function(e) {
                        if (!t) {
                          var r = n.formatLanguageCode(e);
                          (n.options.supportedLngs && !n.isSupportedCode(r)) ||
                            (t = r);
                        }
                      }),
                      !t &&
                        this.options.supportedLngs &&
                        e.forEach(function(e) {
                          if (!t) {
                            var r = n.getLanguagePartFromCode(e);
                            if (n.isSupportedCode(r)) return (t = r);
                            t = n.options.supportedLngs.find(function(e) {
                              if (0 === e.indexOf(r)) return e;
                            });
                          }
                        }),
                      t ||
                        (t = this.getFallbackCodes(
                          this.options.fallbackLng,
                        )[0]),
                      t)
                    : null;
                },
              },
              {
                key: 'getFallbackCodes',
                value: function(e, t) {
                  if (!e) return [];
                  if (
                    ('function' === typeof e && (e = e(t)),
                    'string' === typeof e && (e = [e]),
                    '[object Array]' === Object.prototype.toString.apply(e))
                  )
                    return e;
                  if (!t) return e['default'] || [];
                  var n = e[t];
                  return (
                    n || (n = e[this.getScriptPartFromCode(t)]),
                    n || (n = e[this.formatLanguageCode(t)]),
                    n || (n = e[this.getLanguagePartFromCode(t)]),
                    n || (n = e['default']),
                    n || []
                  );
                },
              },
              {
                key: 'toResolveHierarchy',
                value: function(e, t) {
                  var n = this,
                    r = this.getFallbackCodes(
                      t || this.options.fallbackLng || [],
                      e,
                    ),
                    o = [],
                    i = function(e) {
                      e &&
                        (n.isSupportedCode(e)
                          ? o.push(e)
                          : n.logger.warn(
                              'rejecting language code not found in supportedLngs: '.concat(
                                e,
                              ),
                            ));
                    };
                  return (
                    'string' === typeof e && e.indexOf('-') > -1
                      ? ('languageOnly' !== this.options.load &&
                          i(this.formatLanguageCode(e)),
                        'languageOnly' !== this.options.load &&
                          'currentOnly' !== this.options.load &&
                          i(this.getScriptPartFromCode(e)),
                        'currentOnly' !== this.options.load &&
                          i(this.getLanguagePartFromCode(e)))
                      : 'string' === typeof e && i(this.formatLanguageCode(e)),
                    r.forEach(function(e) {
                      o.indexOf(e) < 0 && i(n.formatLanguageCode(e));
                    }),
                    o
                  );
                },
              },
            ]),
            e
          );
        })(),
        F = [
          {
            lngs: [
              'ach',
              'ak',
              'am',
              'arn',
              'br',
              'fil',
              'gun',
              'ln',
              'mfe',
              'mg',
              'mi',
              'oc',
              'pt',
              'pt-BR',
              'tg',
              'tl',
              'ti',
              'tr',
              'uz',
              'wa',
            ],
            nr: [1, 2],
            fc: 1,
          },
          {
            lngs: [
              'af',
              'an',
              'ast',
              'az',
              'bg',
              'bn',
              'ca',
              'da',
              'de',
              'dev',
              'el',
              'en',
              'eo',
              'es',
              'et',
              'eu',
              'fi',
              'fo',
              'fur',
              'fy',
              'gl',
              'gu',
              'ha',
              'hi',
              'hu',
              'hy',
              'ia',
              'it',
              'kn',
              'ku',
              'lb',
              'mai',
              'ml',
              'mn',
              'mr',
              'nah',
              'nap',
              'nb',
              'ne',
              'nl',
              'nn',
              'no',
              'nso',
              'pa',
              'pap',
              'pms',
              'ps',
              'pt-PT',
              'rm',
              'sco',
              'se',
              'si',
              'so',
              'son',
              'sq',
              'sv',
              'sw',
              'ta',
              'te',
              'tk',
              'ur',
              'yo',
            ],
            nr: [1, 2],
            fc: 2,
          },
          {
            lngs: [
              'ay',
              'bo',
              'cgg',
              'fa',
              'ht',
              'id',
              'ja',
              'jbo',
              'ka',
              'kk',
              'km',
              'ko',
              'ky',
              'lo',
              'ms',
              'sah',
              'su',
              'th',
              'tt',
              'ug',
              'vi',
              'wo',
              'zh',
            ],
            nr: [1],
            fc: 3,
          },
          {
            lngs: ['be', 'bs', 'cnr', 'dz', 'hr', 'ru', 'sr', 'uk'],
            nr: [1, 2, 5],
            fc: 4,
          },
          { lngs: ['ar'], nr: [0, 1, 2, 3, 11, 100], fc: 5 },
          { lngs: ['cs', 'sk'], nr: [1, 2, 5], fc: 6 },
          { lngs: ['csb', 'pl'], nr: [1, 2, 5], fc: 7 },
          { lngs: ['cy'], nr: [1, 2, 3, 8], fc: 8 },
          { lngs: ['fr'], nr: [1, 2], fc: 9 },
          { lngs: ['ga'], nr: [1, 2, 3, 7, 11], fc: 10 },
          { lngs: ['gd'], nr: [1, 2, 3, 20], fc: 11 },
          { lngs: ['is'], nr: [1, 2], fc: 12 },
          { lngs: ['jv'], nr: [0, 1], fc: 13 },
          { lngs: ['kw'], nr: [1, 2, 3, 4], fc: 14 },
          { lngs: ['lt'], nr: [1, 2, 10], fc: 15 },
          { lngs: ['lv'], nr: [1, 2, 0], fc: 16 },
          { lngs: ['mk'], nr: [1, 2], fc: 17 },
          { lngs: ['mnk'], nr: [0, 1, 2], fc: 18 },
          { lngs: ['mt'], nr: [1, 2, 11, 20], fc: 19 },
          { lngs: ['or'], nr: [2, 1], fc: 2 },
          { lngs: ['ro'], nr: [1, 2, 20], fc: 20 },
          { lngs: ['sl'], nr: [5, 1, 2, 3], fc: 21 },
          { lngs: ['he', 'iw'], nr: [1, 2, 20, 21], fc: 22 },
        ],
        D = {
          1: function(e) {
            return Number(e > 1);
          },
          2: function(e) {
            return Number(1 != e);
          },
          3: function(e) {
            return 0;
          },
          4: function(e) {
            return Number(
              e % 10 == 1 && e % 100 != 11
                ? 0
                : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
                ? 1
                : 2,
            );
          },
          5: function(e) {
            return Number(
              0 == e
                ? 0
                : 1 == e
                ? 1
                : 2 == e
                ? 2
                : e % 100 >= 3 && e % 100 <= 10
                ? 3
                : e % 100 >= 11
                ? 4
                : 5,
            );
          },
          6: function(e) {
            return Number(1 == e ? 0 : e >= 2 && e <= 4 ? 1 : 2);
          },
          7: function(e) {
            return Number(
              1 == e
                ? 0
                : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
                ? 1
                : 2,
            );
          },
          8: function(e) {
            return Number(1 == e ? 0 : 2 == e ? 1 : 8 != e && 11 != e ? 2 : 3);
          },
          9: function(e) {
            return Number(e >= 2);
          },
          10: function(e) {
            return Number(1 == e ? 0 : 2 == e ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4);
          },
          11: function(e) {
            return Number(
              1 == e || 11 == e
                ? 0
                : 2 == e || 12 == e
                ? 1
                : e > 2 && e < 20
                ? 2
                : 3,
            );
          },
          12: function(e) {
            return Number(e % 10 != 1 || e % 100 == 11);
          },
          13: function(e) {
            return Number(0 !== e);
          },
          14: function(e) {
            return Number(1 == e ? 0 : 2 == e ? 1 : 3 == e ? 2 : 3);
          },
          15: function(e) {
            return Number(
              e % 10 == 1 && e % 100 != 11
                ? 0
                : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20)
                ? 1
                : 2,
            );
          },
          16: function(e) {
            return Number(e % 10 == 1 && e % 100 != 11 ? 0 : 0 !== e ? 1 : 2);
          },
          17: function(e) {
            return Number(1 == e || (e % 10 == 1 && e % 100 != 11) ? 0 : 1);
          },
          18: function(e) {
            return Number(0 == e ? 0 : 1 == e ? 1 : 2);
          },
          19: function(e) {
            return Number(
              1 == e
                ? 0
                : 0 == e || (e % 100 > 1 && e % 100 < 11)
                ? 1
                : e % 100 > 10 && e % 100 < 20
                ? 2
                : 3,
            );
          },
          20: function(e) {
            return Number(
              1 == e ? 0 : 0 == e || (e % 100 > 0 && e % 100 < 20) ? 1 : 2,
            );
          },
          21: function(e) {
            return Number(
              e % 100 == 1
                ? 1
                : e % 100 == 2
                ? 2
                : e % 100 == 3 || e % 100 == 4
                ? 3
                : 0,
            );
          },
          22: function(e) {
            return Number(
              1 == e
                ? 0
                : 2 == e
                ? 1
                : (e < 0 || e > 10) && e % 10 == 0
                ? 2
                : 3,
            );
          },
        };
      function B() {
        var e = {};
        return (
          F.forEach(function(t) {
            t.lngs.forEach(function(n) {
              e[n] = { numbers: t.nr, plurals: D[t.fc] };
            });
          }),
          e
        );
      }
      var I = (function() {
          function e(t) {
            var n =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : {};
            Object(a['a'])(this, e),
              (this.languageUtils = t),
              (this.options = n),
              (this.logger = g.create('pluralResolver')),
              (this.rules = B());
          }
          return (
            Object(s['a'])(e, [
              {
                key: 'addRule',
                value: function(e, t) {
                  this.rules[e] = t;
                },
              },
              {
                key: 'getRule',
                value: function(e) {
                  return (
                    this.rules[e] ||
                    this.rules[this.languageUtils.getLanguagePartFromCode(e)]
                  );
                },
              },
              {
                key: 'needsPlural',
                value: function(e) {
                  var t = this.getRule(e);
                  return t && t.numbers.length > 1;
                },
              },
              {
                key: 'getPluralFormsOfKey',
                value: function(e, t) {
                  return this.getSuffixes(e).map(function(e) {
                    return t + e;
                  });
                },
              },
              {
                key: 'getSuffixes',
                value: function(e) {
                  var t = this,
                    n = this.getRule(e);
                  return n
                    ? n.numbers.map(function(n) {
                        return t.getSuffix(e, n);
                      })
                    : [];
                },
              },
              {
                key: 'getSuffix',
                value: function(e, t) {
                  var n = this,
                    r = this.getRule(e);
                  if (r) {
                    var o = r.noAbs ? r.plurals(t) : r.plurals(Math.abs(t)),
                      i = r.numbers[o];
                    this.options.simplifyPluralSuffix &&
                      2 === r.numbers.length &&
                      1 === r.numbers[0] &&
                      (2 === i ? (i = 'plural') : 1 === i && (i = ''));
                    var a = function() {
                      return n.options.prepend && i.toString()
                        ? n.options.prepend + i.toString()
                        : i.toString();
                    };
                    return 'v1' === this.options.compatibilityJSON
                      ? 1 === i
                        ? ''
                        : 'number' === typeof i
                        ? '_plural_'.concat(i.toString())
                        : a()
                      : 'v2' === this.options.compatibilityJSON ||
                        (this.options.simplifyPluralSuffix &&
                          2 === r.numbers.length &&
                          1 === r.numbers[0])
                      ? a()
                      : this.options.prepend && o.toString()
                      ? this.options.prepend + o.toString()
                      : o.toString();
                  }
                  return (
                    this.logger.warn('no plural rule found for: '.concat(e)), ''
                  );
                },
              },
            ]),
            e
          );
        })(),
        M = (function() {
          function e() {
            var t =
              arguments.length > 0 && void 0 !== arguments[0]
                ? arguments[0]
                : {};
            Object(a['a'])(this, e),
              (this.logger = g.create('interpolator')),
              (this.options = t),
              (this.format =
                (t.interpolation && t.interpolation.format) ||
                function(e) {
                  return e;
                }),
              this.init(t);
          }
          return (
            Object(s['a'])(e, [
              {
                key: 'init',
                value: function() {
                  var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {};
                  e.interpolation || (e.interpolation = { escapeValue: !0 });
                  var t = e.interpolation;
                  (this.escape = void 0 !== t.escape ? t.escape : j),
                    (this.escapeValue =
                      void 0 === t.escapeValue || t.escapeValue),
                    (this.useRawValueToEscape =
                      void 0 !== t.useRawValueToEscape &&
                      t.useRawValueToEscape),
                    (this.prefix = t.prefix
                      ? L(t.prefix)
                      : t.prefixEscaped || '{{'),
                    (this.suffix = t.suffix
                      ? L(t.suffix)
                      : t.suffixEscaped || '}}'),
                    (this.formatSeparator = t.formatSeparator
                      ? t.formatSeparator
                      : t.formatSeparator || ','),
                    (this.unescapePrefix = t.unescapeSuffix
                      ? ''
                      : t.unescapePrefix || '-'),
                    (this.unescapeSuffix = this.unescapePrefix
                      ? ''
                      : t.unescapeSuffix || ''),
                    (this.nestingPrefix = t.nestingPrefix
                      ? L(t.nestingPrefix)
                      : t.nestingPrefixEscaped || L('$t(')),
                    (this.nestingSuffix = t.nestingSuffix
                      ? L(t.nestingSuffix)
                      : t.nestingSuffixEscaped || L(')')),
                    (this.nestingOptionsSeparator = t.nestingOptionsSeparator
                      ? t.nestingOptionsSeparator
                      : t.nestingOptionsSeparator || ','),
                    (this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3),
                    (this.alwaysFormat =
                      void 0 !== t.alwaysFormat && t.alwaysFormat),
                    this.resetRegExp();
                },
              },
              {
                key: 'reset',
                value: function() {
                  this.options && this.init(this.options);
                },
              },
              {
                key: 'resetRegExp',
                value: function() {
                  var e = ''.concat(this.prefix, '(.+?)').concat(this.suffix);
                  this.regexp = new RegExp(e, 'g');
                  var t = ''
                    .concat(this.prefix)
                    .concat(this.unescapePrefix, '(.+?)')
                    .concat(this.unescapeSuffix)
                    .concat(this.suffix);
                  this.regexpUnescape = new RegExp(t, 'g');
                  var n = ''
                    .concat(this.nestingPrefix, '(.+?)')
                    .concat(this.nestingSuffix);
                  this.nestingRegexp = new RegExp(n, 'g');
                },
              },
              {
                key: 'interpolate',
                value: function(e, t, n, r) {
                  var o,
                    i,
                    a,
                    s = this,
                    u =
                      (this.options &&
                        this.options.interpolation &&
                        this.options.interpolation.defaultVariables) ||
                      {};
                  function c(e) {
                    return e.replace(/\$/g, '$$$$');
                  }
                  var l = function(e) {
                    if (e.indexOf(s.formatSeparator) < 0) {
                      var o = O(t, u, e);
                      return s.alwaysFormat ? s.format(o, void 0, n) : o;
                    }
                    var i = e.split(s.formatSeparator),
                      a = i.shift().trim(),
                      c = i.join(s.formatSeparator).trim();
                    return s.format(O(t, u, a), c, n, r);
                  };
                  this.resetRegExp();
                  var f =
                      (r && r.missingInterpolationHandler) ||
                      this.options.missingInterpolationHandler,
                    p =
                      (r &&
                        r.interpolation &&
                        r.interpolation.skipOnVariables) ||
                      this.options.interpolation.skipOnVariables,
                    h = [
                      {
                        regex: this.regexpUnescape,
                        safeValue: function(e) {
                          return c(e);
                        },
                      },
                      {
                        regex: this.regexp,
                        safeValue: function(e) {
                          return s.escapeValue ? c(s.escape(e)) : c(e);
                        },
                      },
                    ];
                  return (
                    h.forEach(function(t) {
                      a = 0;
                      while ((o = t.regex.exec(e))) {
                        if (((i = l(o[1].trim())), void 0 === i))
                          if ('function' === typeof f) {
                            var n = f(e, o, r);
                            i = 'string' === typeof n ? n : '';
                          } else {
                            if (p) {
                              i = o[0];
                              continue;
                            }
                            s.logger.warn(
                              'missed to pass in variable '
                                .concat(o[1], ' for interpolating ')
                                .concat(e),
                            ),
                              (i = '');
                          }
                        else
                          'string' === typeof i ||
                            s.useRawValueToEscape ||
                            (i = m(i));
                        if (
                          ((e = e.replace(o[0], t.safeValue(i))),
                          (t.regex.lastIndex = 0),
                          a++,
                          a >= s.maxReplaces)
                        )
                          break;
                      }
                    }),
                    e
                  );
                },
              },
              {
                key: 'nest',
                value: function(e, t) {
                  var n,
                    r,
                    o = this,
                    a =
                      arguments.length > 2 && void 0 !== arguments[2]
                        ? arguments[2]
                        : {},
                    s = i({}, a);
                  function u(e, t) {
                    var n = this.nestingOptionsSeparator;
                    if (e.indexOf(n) < 0) return e;
                    var r = e.split(new RegExp(''.concat(n, '[ ]*{'))),
                      o = '{'.concat(r[1]);
                    (e = r[0]),
                      (o = this.interpolate(o, s)),
                      (o = o.replace(/'/g, '"'));
                    try {
                      (s = JSON.parse(o)), t && (s = i({}, t, s));
                    } catch (a) {
                      return (
                        this.logger.warn(
                          'failed parsing options string in nesting for key '.concat(
                            e,
                          ),
                          a,
                        ),
                        ''
                          .concat(e)
                          .concat(n)
                          .concat(o)
                      );
                    }
                    return delete s.defaultValue, e;
                  }
                  (s.applyPostProcessor = !1), delete s.defaultValue;
                  while ((n = this.nestingRegexp.exec(e))) {
                    var c = [],
                      l = !1;
                    if (
                      n[0].includes(this.formatSeparator) &&
                      !/{.*}/.test(n[1])
                    ) {
                      var f = n[1].split(this.formatSeparator).map(function(e) {
                        return e.trim();
                      });
                      (n[1] = f.shift()), (c = f), (l = !0);
                    }
                    if (
                      ((r = t(u.call(this, n[1].trim(), s), s)),
                      r && n[0] === e && 'string' !== typeof r)
                    )
                      return r;
                    'string' !== typeof r && (r = m(r)),
                      r ||
                        (this.logger.warn(
                          'missed to resolve '
                            .concat(n[1], ' for nesting ')
                            .concat(e),
                        ),
                        (r = '')),
                      l &&
                        (r = c.reduce(function(e, t) {
                          return o.format(e, t, a.lng, a);
                        }, r.trim())),
                      (e = e.replace(n[0], r)),
                      (this.regexp.lastIndex = 0);
                  }
                  return e;
                },
              },
            ]),
            e
          );
        })();
      function V(e, t) {
        var n = e.indexOf(t);
        while (-1 !== n) e.splice(n, 1), (n = e.indexOf(t));
      }
      var q = (function(e) {
        function t(e, n, r) {
          var o,
            i =
              arguments.length > 3 && void 0 !== arguments[3]
                ? arguments[3]
                : {};
          return (
            Object(a['a'])(this, t),
            (o = Object(u['a'])(this, Object(c['a'])(t).call(this))),
            E && d.call(Object(l['a'])(o)),
            (o.backend = e),
            (o.store = n),
            (o.services = r),
            (o.languageUtils = r.languageUtils),
            (o.options = i),
            (o.logger = g.create('backendConnector')),
            (o.state = {}),
            (o.queue = []),
            o.backend && o.backend.init && o.backend.init(r, i.backend, i),
            o
          );
        }
        return (
          Object(f['a'])(t, e),
          Object(s['a'])(t, [
            {
              key: 'queueLoad',
              value: function(e, t, n, r) {
                var o = this,
                  i = [],
                  a = [],
                  s = [],
                  u = [];
                return (
                  e.forEach(function(e) {
                    var r = !0;
                    t.forEach(function(t) {
                      var s = ''.concat(e, '|').concat(t);
                      !n.reload && o.store.hasResourceBundle(e, t)
                        ? (o.state[s] = 2)
                        : o.state[s] < 0 ||
                          (1 === o.state[s]
                            ? a.indexOf(s) < 0 && a.push(s)
                            : ((o.state[s] = 1),
                              (r = !1),
                              a.indexOf(s) < 0 && a.push(s),
                              i.indexOf(s) < 0 && i.push(s),
                              u.indexOf(t) < 0 && u.push(t)));
                    }),
                      r || s.push(e);
                  }),
                  (i.length || a.length) &&
                    this.queue.push({
                      pending: a,
                      loaded: {},
                      errors: [],
                      callback: r,
                    }),
                  {
                    toLoad: i,
                    pending: a,
                    toLoadLanguages: s,
                    toLoadNamespaces: u,
                  }
                );
              },
            },
            {
              key: 'loaded',
              value: function(e, t, n) {
                var r = e.split('|'),
                  o = r[0],
                  i = r[1];
                t && this.emit('failedLoading', o, i, t),
                  n && this.store.addResourceBundle(o, i, n),
                  (this.state[e] = t ? -1 : 2);
                var a = {};
                this.queue.forEach(function(n) {
                  x(n.loaded, [o], i),
                    V(n.pending, e),
                    t && n.errors.push(t),
                    0 !== n.pending.length ||
                      n.done ||
                      (Object.keys(n.loaded).forEach(function(e) {
                        a[e] || (a[e] = []),
                          n.loaded[e].length &&
                            n.loaded[e].forEach(function(t) {
                              a[e].indexOf(t) < 0 && a[e].push(t);
                            });
                      }),
                      (n.done = !0),
                      n.errors.length ? n.callback(n.errors) : n.callback());
                }),
                  this.emit('loaded', a),
                  (this.queue = this.queue.filter(function(e) {
                    return !e.done;
                  }));
              },
            },
            {
              key: 'read',
              value: function(e, t, n) {
                var r = this,
                  o =
                    arguments.length > 3 && void 0 !== arguments[3]
                      ? arguments[3]
                      : 0,
                  i =
                    arguments.length > 4 && void 0 !== arguments[4]
                      ? arguments[4]
                      : 350,
                  a = arguments.length > 5 ? arguments[5] : void 0;
                return e.length
                  ? this.backend[n](e, t, function(s, u) {
                      s && u && o < 5
                        ? setTimeout(function() {
                            r.read.call(r, e, t, n, o + 1, 2 * i, a);
                          }, i)
                        : a(s, u);
                    })
                  : a(null, {});
              },
            },
            {
              key: 'prepareLoading',
              value: function(e, t) {
                var n = this,
                  r =
                    arguments.length > 2 && void 0 !== arguments[2]
                      ? arguments[2]
                      : {},
                  o = arguments.length > 3 ? arguments[3] : void 0;
                if (!this.backend)
                  return (
                    this.logger.warn(
                      'No backend was added via i18next.use. Will not load resources.',
                    ),
                    o && o()
                  );
                'string' === typeof e &&
                  (e = this.languageUtils.toResolveHierarchy(e)),
                  'string' === typeof t && (t = [t]);
                var i = this.queueLoad(e, t, r, o);
                if (!i.toLoad.length) return i.pending.length || o(), null;
                i.toLoad.forEach(function(e) {
                  n.loadOne(e);
                });
              },
            },
            {
              key: 'load',
              value: function(e, t, n) {
                this.prepareLoading(e, t, {}, n);
              },
            },
            {
              key: 'reload',
              value: function(e, t, n) {
                this.prepareLoading(e, t, { reload: !0 }, n);
              },
            },
            {
              key: 'loadOne',
              value: function(e) {
                var t = this,
                  n =
                    arguments.length > 1 && void 0 !== arguments[1]
                      ? arguments[1]
                      : '',
                  r = e.split('|'),
                  o = r[0],
                  i = r[1];
                this.read(o, i, 'read', void 0, void 0, function(r, a) {
                  r &&
                    t.logger.warn(
                      ''
                        .concat(n, 'loading namespace ')
                        .concat(i, ' for language ')
                        .concat(o, ' failed'),
                      r,
                    ),
                    !r &&
                      a &&
                      t.logger.log(
                        ''
                          .concat(n, 'loaded namespace ')
                          .concat(i, ' for language ')
                          .concat(o),
                        a,
                      ),
                    t.loaded(e, r, a);
                });
              },
            },
            {
              key: 'saveMissing',
              value: function(e, t, n, r, o) {
                var a =
                  arguments.length > 5 && void 0 !== arguments[5]
                    ? arguments[5]
                    : {};
                this.services.utils &&
                this.services.utils.hasLoadedNamespace &&
                !this.services.utils.hasLoadedNamespace(t)
                  ? this.logger.warn(
                      'did not save key "'
                        .concat(n, '" as the namespace "')
                        .concat(t, '" was not yet loaded'),
                      'This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!',
                    )
                  : void 0 !== n &&
                    null !== n &&
                    '' !== n &&
                    (this.backend &&
                      this.backend.create &&
                      this.backend.create(
                        e,
                        t,
                        n,
                        r,
                        null,
                        i({}, a, { isUpdate: o }),
                      ),
                    e && e[0] && this.store.addResource(e[0], t, n, r));
              },
            },
          ]),
          t
        );
      })(d);
      function _() {
        return {
          debug: !1,
          initImmediate: !0,
          ns: ['translation'],
          defaultNS: ['translation'],
          fallbackLng: ['dev'],
          fallbackNS: !1,
          whitelist: !1,
          nonExplicitWhitelist: !1,
          supportedLngs: !1,
          nonExplicitSupportedLngs: !1,
          load: 'all',
          preload: !1,
          simplifyPluralSuffix: !0,
          keySeparator: '.',
          nsSeparator: ':',
          pluralSeparator: '_',
          contextSeparator: '_',
          partialBundledLanguages: !1,
          saveMissing: !1,
          updateMissing: !1,
          saveMissingTo: 'fallback',
          saveMissingPlurals: !0,
          missingKeyHandler: !1,
          missingInterpolationHandler: !1,
          postProcess: !1,
          postProcessPassResolved: !1,
          returnNull: !0,
          returnEmptyString: !0,
          returnObjects: !1,
          joinArrays: !1,
          returnedObjectHandler: !1,
          parseMissingKeyHandler: !1,
          appendNamespaceToMissingKey: !1,
          appendNamespaceToCIMode: !1,
          overloadTranslationOptionHandler: function(e) {
            var t = {};
            if (
              ('object' === Object(r['a'])(e[1]) && (t = e[1]),
              'string' === typeof e[1] && (t.defaultValue = e[1]),
              'string' === typeof e[2] && (t.tDescription = e[2]),
              'object' === Object(r['a'])(e[2]) ||
                'object' === Object(r['a'])(e[3]))
            ) {
              var n = e[3] || e[2];
              Object.keys(n).forEach(function(e) {
                t[e] = n[e];
              });
            }
            return t;
          },
          interpolation: {
            escapeValue: !0,
            format: function(e, t, n, r) {
              return e;
            },
            prefix: '{{',
            suffix: '}}',
            formatSeparator: ',',
            unescapePrefix: '-',
            nestingPrefix: '$t(',
            nestingSuffix: ')',
            nestingOptionsSeparator: ',',
            maxReplaces: 1e3,
            skipOnVariables: !1,
          },
        };
      }
      function H(e) {
        return (
          'string' === typeof e.ns && (e.ns = [e.ns]),
          'string' === typeof e.fallbackLng &&
            (e.fallbackLng = [e.fallbackLng]),
          'string' === typeof e.fallbackNS && (e.fallbackNS = [e.fallbackNS]),
          e.whitelist &&
            (e.whitelist &&
              e.whitelist.indexOf('cimode') < 0 &&
              (e.whitelist = e.whitelist.concat(['cimode'])),
            (e.supportedLngs = e.whitelist)),
          e.nonExplicitWhitelist &&
            (e.nonExplicitSupportedLngs = e.nonExplicitWhitelist),
          e.supportedLngs &&
            e.supportedLngs.indexOf('cimode') < 0 &&
            (e.supportedLngs = e.supportedLngs.concat(['cimode'])),
          e
        );
      }
      function z() {}
      var W = (function(e) {
          function t() {
            var e,
              n =
                arguments.length > 0 && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              r = arguments.length > 1 ? arguments[1] : void 0;
            if (
              (Object(a['a'])(this, t),
              (e = Object(u['a'])(this, Object(c['a'])(t).call(this))),
              E && d.call(Object(l['a'])(e)),
              (e.options = H(n)),
              (e.services = {}),
              (e.logger = g),
              (e.modules = { external: [] }),
              r && !e.isInitialized && !n.isClone)
            ) {
              if (!e.options.initImmediate)
                return e.init(n, r), Object(u['a'])(e, Object(l['a'])(e));
              setTimeout(function() {
                e.init(n, r);
              }, 0);
            }
            return e;
          }
          return (
            Object(f['a'])(t, e),
            Object(s['a'])(t, [
              {
                key: 'init',
                value: function() {
                  var e = this,
                    t =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    n = arguments.length > 1 ? arguments[1] : void 0;
                  function r(e) {
                    return e ? ('function' === typeof e ? new e() : e) : null;
                  }
                  if (
                    ('function' === typeof t && ((n = t), (t = {})),
                    t.whitelist &&
                      !t.supportedLngs &&
                      this.logger.deprecate(
                        'whitelist',
                        'option "whitelist" will be renamed to "supportedLngs" in the next major - please make sure to rename this option asap.',
                      ),
                    t.nonExplicitWhitelist &&
                      !t.nonExplicitSupportedLngs &&
                      this.logger.deprecate(
                        'whitelist',
                        'options "nonExplicitWhitelist" will be renamed to "nonExplicitSupportedLngs" in the next major - please make sure to rename this option asap.',
                      ),
                    (this.options = i({}, _(), this.options, H(t))),
                    (this.format = this.options.interpolation.format),
                    n || (n = z),
                    !this.options.isClone)
                  ) {
                    this.modules.logger
                      ? g.init(r(this.modules.logger), this.options)
                      : g.init(null, this.options);
                    var o = new U(this.options);
                    this.store = new C(this.options.resources, this.options);
                    var a = this.services;
                    (a.logger = g),
                      (a.resourceStore = this.store),
                      (a.languageUtils = o),
                      (a.pluralResolver = new I(o, {
                        prepend: this.options.pluralSeparator,
                        compatibilityJSON: this.options.compatibilityJSON,
                        simplifyPluralSuffix: this.options.simplifyPluralSuffix,
                      })),
                      (a.interpolator = new M(this.options)),
                      (a.utils = {
                        hasLoadedNamespace: this.hasLoadedNamespace.bind(this),
                      }),
                      (a.backendConnector = new q(
                        r(this.modules.backend),
                        a.resourceStore,
                        a,
                        this.options,
                      )),
                      a.backendConnector.on('*', function(t) {
                        for (
                          var n = arguments.length,
                            r = new Array(n > 1 ? n - 1 : 0),
                            o = 1;
                          o < n;
                          o++
                        )
                          r[o - 1] = arguments[o];
                        e.emit.apply(e, [t].concat(r));
                      }),
                      this.modules.languageDetector &&
                        ((a.languageDetector = r(
                          this.modules.languageDetector,
                        )),
                        a.languageDetector.init(
                          a,
                          this.options.detection,
                          this.options,
                        )),
                      this.modules.i18nFormat &&
                        ((a.i18nFormat = r(this.modules.i18nFormat)),
                        a.i18nFormat.init && a.i18nFormat.init(this)),
                      (this.translator = new A(this.services, this.options)),
                      this.translator.on('*', function(t) {
                        for (
                          var n = arguments.length,
                            r = new Array(n > 1 ? n - 1 : 0),
                            o = 1;
                          o < n;
                          o++
                        )
                          r[o - 1] = arguments[o];
                        e.emit.apply(e, [t].concat(r));
                      }),
                      this.modules.external.forEach(function(t) {
                        t.init && t.init(e);
                      });
                  }
                  if (
                    this.options.fallbackLng &&
                    !this.services.languageDetector &&
                    !this.options.lng
                  ) {
                    var s = this.services.languageUtils.getFallbackCodes(
                      this.options.fallbackLng,
                    );
                    s.length > 0 && 'dev' !== s[0] && (this.options.lng = s[0]);
                  }
                  this.services.languageDetector ||
                    this.options.lng ||
                    this.logger.warn(
                      'init: no languageDetector is used and no lng is defined',
                    );
                  var u = [
                    'getResource',
                    'hasResourceBundle',
                    'getResourceBundle',
                    'getDataByLanguage',
                  ];
                  u.forEach(function(t) {
                    e[t] = function() {
                      var n;
                      return (n = e.store)[t].apply(n, arguments);
                    };
                  });
                  var c = [
                    'addResource',
                    'addResources',
                    'addResourceBundle',
                    'removeResourceBundle',
                  ];
                  c.forEach(function(t) {
                    e[t] = function() {
                      var n;
                      return (n = e.store)[t].apply(n, arguments), e;
                    };
                  });
                  var l = v(),
                    f = function() {
                      var t = function(t, r) {
                        e.isInitialized &&
                          e.logger.warn(
                            'init: i18next is already initialized. You should call init just once!',
                          ),
                          (e.isInitialized = !0),
                          e.options.isClone ||
                            e.logger.log('initialized', e.options),
                          e.emit('initialized', e.options),
                          l.resolve(r),
                          n(t, r);
                      };
                      if (
                        e.languages &&
                        'v1' !== e.options.compatibilityAPI &&
                        !e.isInitialized
                      )
                        return t(null, e.t.bind(e));
                      e.changeLanguage(e.options.lng, t);
                    };
                  return (
                    this.options.resources || !this.options.initImmediate
                      ? f()
                      : setTimeout(f, 0),
                    l
                  );
                },
              },
              {
                key: 'loadResources',
                value: function(e) {
                  var t = this,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : z,
                    r = n,
                    o = 'string' === typeof e ? e : this.language;
                  if (
                    ('function' === typeof e && (r = e),
                    !this.options.resources ||
                      this.options.partialBundledLanguages)
                  ) {
                    if (o && 'cimode' === o.toLowerCase()) return r();
                    var i = [],
                      a = function(e) {
                        if (e) {
                          var n = t.services.languageUtils.toResolveHierarchy(
                            e,
                          );
                          n.forEach(function(e) {
                            i.indexOf(e) < 0 && i.push(e);
                          });
                        }
                      };
                    if (o) a(o);
                    else {
                      var s = this.services.languageUtils.getFallbackCodes(
                        this.options.fallbackLng,
                      );
                      s.forEach(function(e) {
                        return a(e);
                      });
                    }
                    this.options.preload &&
                      this.options.preload.forEach(function(e) {
                        return a(e);
                      }),
                      this.services.backendConnector.load(
                        i,
                        this.options.ns,
                        r,
                      );
                  } else r(null);
                },
              },
              {
                key: 'reloadResources',
                value: function(e, t, n) {
                  var r = v();
                  return (
                    e || (e = this.languages),
                    t || (t = this.options.ns),
                    n || (n = z),
                    this.services.backendConnector.reload(e, t, function(e) {
                      r.resolve(), n(e);
                    }),
                    r
                  );
                },
              },
              {
                key: 'use',
                value: function(e) {
                  if (!e)
                    throw new Error(
                      'You are passing an undefined module! Please check the object you are passing to i18next.use()',
                    );
                  if (!e.type)
                    throw new Error(
                      'You are passing a wrong module! Please check the object you are passing to i18next.use()',
                    );
                  return (
                    'backend' === e.type && (this.modules.backend = e),
                    ('logger' === e.type || (e.log && e.warn && e.error)) &&
                      (this.modules.logger = e),
                    'languageDetector' === e.type &&
                      (this.modules.languageDetector = e),
                    'i18nFormat' === e.type && (this.modules.i18nFormat = e),
                    'postProcessor' === e.type && R.addPostProcessor(e),
                    '3rdParty' === e.type && this.modules.external.push(e),
                    this
                  );
                },
              },
              {
                key: 'changeLanguage',
                value: function(e, t) {
                  var n = this;
                  this.isLanguageChangingTo = e;
                  var r = v();
                  this.emit('languageChanging', e);
                  var o = function(e, o) {
                      o
                        ? ((n.language = o),
                          (n.languages = n.services.languageUtils.toResolveHierarchy(
                            o,
                          )),
                          n.translator.changeLanguage(o),
                          (n.isLanguageChangingTo = void 0),
                          n.emit('languageChanged', o),
                          n.logger.log('languageChanged', o))
                        : (n.isLanguageChangingTo = void 0),
                        r.resolve(function() {
                          return n.t.apply(n, arguments);
                        }),
                        t &&
                          t(e, function() {
                            return n.t.apply(n, arguments);
                          });
                    },
                    i = function(e) {
                      var t =
                        'string' === typeof e
                          ? e
                          : n.services.languageUtils.getBestMatchFromCodes(e);
                      t &&
                        (n.language ||
                          ((n.language = t),
                          (n.languages = n.services.languageUtils.toResolveHierarchy(
                            t,
                          ))),
                        n.translator.language || n.translator.changeLanguage(t),
                        n.services.languageDetector &&
                          n.services.languageDetector.cacheUserLanguage(t)),
                        n.loadResources(t, function(e) {
                          o(e, t);
                        });
                    };
                  return (
                    e ||
                    !this.services.languageDetector ||
                    this.services.languageDetector.async
                      ? !e &&
                        this.services.languageDetector &&
                        this.services.languageDetector.async
                        ? this.services.languageDetector.detect(i)
                        : i(e)
                      : i(this.services.languageDetector.detect()),
                    r
                  );
                },
              },
              {
                key: 'getFixedT',
                value: function(e, t) {
                  var n = this,
                    o = function e(t, o) {
                      var a;
                      if ('object' !== Object(r['a'])(o)) {
                        for (
                          var s = arguments.length,
                            u = new Array(s > 2 ? s - 2 : 0),
                            c = 2;
                          c < s;
                          c++
                        )
                          u[c - 2] = arguments[c];
                        a = n.options.overloadTranslationOptionHandler(
                          [t, o].concat(u),
                        );
                      } else a = i({}, o);
                      return (
                        (a.lng = a.lng || e.lng),
                        (a.lngs = a.lngs || e.lngs),
                        (a.ns = a.ns || e.ns),
                        n.t(t, a)
                      );
                    };
                  return (
                    'string' === typeof e ? (o.lng = e) : (o.lngs = e),
                    (o.ns = t),
                    o
                  );
                },
              },
              {
                key: 't',
                value: function() {
                  var e;
                  return (
                    this.translator &&
                    (e = this.translator).translate.apply(e, arguments)
                  );
                },
              },
              {
                key: 'exists',
                value: function() {
                  var e;
                  return (
                    this.translator &&
                    (e = this.translator).exists.apply(e, arguments)
                  );
                },
              },
              {
                key: 'setDefaultNamespace',
                value: function(e) {
                  this.options.defaultNS = e;
                },
              },
              {
                key: 'hasLoadedNamespace',
                value: function(e) {
                  var t = this,
                    n =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {};
                  if (!this.isInitialized)
                    return (
                      this.logger.warn(
                        'hasLoadedNamespace: i18next was not initialized',
                        this.languages,
                      ),
                      !1
                    );
                  if (!this.languages || !this.languages.length)
                    return (
                      this.logger.warn(
                        'hasLoadedNamespace: i18n.languages were undefined or empty',
                        this.languages,
                      ),
                      !1
                    );
                  var r = this.languages[0],
                    o = !!this.options && this.options.fallbackLng,
                    i = this.languages[this.languages.length - 1];
                  if ('cimode' === r.toLowerCase()) return !0;
                  var a = function(e, n) {
                    var r =
                      t.services.backendConnector.state[
                        ''.concat(e, '|').concat(n)
                      ];
                    return -1 === r || 2 === r;
                  };
                  if (n.precheck) {
                    var s = n.precheck(this, a);
                    if (void 0 !== s) return s;
                  }
                  return (
                    !!this.hasResourceBundle(r, e) ||
                    !this.services.backendConnector.backend ||
                      !(!a(r, e) || (o && !a(i, e)))
                  );
                },
              },
              {
                key: 'loadNamespaces',
                value: function(e, t) {
                  var n = this,
                    r = v();
                  return this.options.ns
                    ? ('string' === typeof e && (e = [e]),
                      e.forEach(function(e) {
                        n.options.ns.indexOf(e) < 0 && n.options.ns.push(e);
                      }),
                      this.loadResources(function(e) {
                        r.resolve(), t && t(e);
                      }),
                      r)
                    : (t && t(), Promise.resolve());
                },
              },
              {
                key: 'loadLanguages',
                value: function(e, t) {
                  var n = v();
                  'string' === typeof e && (e = [e]);
                  var r = this.options.preload || [],
                    o = e.filter(function(e) {
                      return r.indexOf(e) < 0;
                    });
                  return o.length
                    ? ((this.options.preload = r.concat(o)),
                      this.loadResources(function(e) {
                        n.resolve(), t && t(e);
                      }),
                      n)
                    : (t && t(), Promise.resolve());
                },
              },
              {
                key: 'dir',
                value: function(e) {
                  if (
                    (e ||
                      (e =
                        this.languages && this.languages.length > 0
                          ? this.languages[0]
                          : this.language),
                    !e)
                  )
                    return 'rtl';
                  var t = [
                    'ar',
                    'shu',
                    'sqr',
                    'ssh',
                    'xaa',
                    'yhd',
                    'yud',
                    'aao',
                    'abh',
                    'abv',
                    'acm',
                    'acq',
                    'acw',
                    'acx',
                    'acy',
                    'adf',
                    'ads',
                    'aeb',
                    'aec',
                    'afb',
                    'ajp',
                    'apc',
                    'apd',
                    'arb',
                    'arq',
                    'ars',
                    'ary',
                    'arz',
                    'auz',
                    'avl',
                    'ayh',
                    'ayl',
                    'ayn',
                    'ayp',
                    'bbz',
                    'pga',
                    'he',
                    'iw',
                    'ps',
                    'pbt',
                    'pbu',
                    'pst',
                    'prp',
                    'prd',
                    'ug',
                    'ur',
                    'ydd',
                    'yds',
                    'yih',
                    'ji',
                    'yi',
                    'hbo',
                    'men',
                    'xmn',
                    'fa',
                    'jpr',
                    'peo',
                    'pes',
                    'prs',
                    'dv',
                    'sam',
                  ];
                  return t.indexOf(
                    this.services.languageUtils.getLanguagePartFromCode(e),
                  ) >= 0
                    ? 'rtl'
                    : 'ltr';
                },
              },
              {
                key: 'createInstance',
                value: function() {
                  var e =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    n = arguments.length > 1 ? arguments[1] : void 0;
                  return new t(e, n);
                },
              },
              {
                key: 'cloneInstance',
                value: function() {
                  var e = this,
                    n =
                      arguments.length > 0 && void 0 !== arguments[0]
                        ? arguments[0]
                        : {},
                    r =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : z,
                    o = i({}, this.options, n, { isClone: !0 }),
                    a = new t(o),
                    s = ['store', 'services', 'language'];
                  return (
                    s.forEach(function(t) {
                      a[t] = e[t];
                    }),
                    (a.services = i({}, this.services)),
                    (a.services.utils = {
                      hasLoadedNamespace: a.hasLoadedNamespace.bind(a),
                    }),
                    (a.translator = new A(a.services, a.options)),
                    a.translator.on('*', function(e) {
                      for (
                        var t = arguments.length,
                          n = new Array(t > 1 ? t - 1 : 0),
                          r = 1;
                        r < t;
                        r++
                      )
                        n[r - 1] = arguments[r];
                      a.emit.apply(a, [e].concat(n));
                    }),
                    a.init(o, r),
                    (a.translator.options = a.options),
                    (a.translator.backendConnector.services.utils = {
                      hasLoadedNamespace: a.hasLoadedNamespace.bind(a),
                    }),
                    a
                  );
                },
              },
            ]),
            t
          );
        })(d),
        K = new W();
      t['a'] = K;
    },
    endd: function(e, t, n) {
      'use strict';
      function r(e) {
        this.message = e;
      }
      (r.prototype.toString = function() {
        return 'Cancel' + (this.message ? ': ' + this.message : '');
      }),
        (r.prototype.__CANCEL__ = !0),
        (e.exports = r);
    },
    eqyj: function(e, t, n) {
      'use strict';
      var r = n('xTJ+');
      e.exports = r.isStandardBrowserEnv()
        ? (function() {
            return {
              write: function(e, t, n, o, i, a) {
                var s = [];
                s.push(e + '=' + encodeURIComponent(t)),
                  r.isNumber(n) &&
                    s.push('expires=' + new Date(n).toGMTString()),
                  r.isString(o) && s.push('path=' + o),
                  r.isString(i) && s.push('domain=' + i),
                  !0 === a && s.push('secure'),
                  (document.cookie = s.join('; '));
              },
              read: function(e) {
                var t = document.cookie.match(
                  new RegExp('(^|;\\s*)(' + e + ')=([^;]*)'),
                );
                return t ? decodeURIComponent(t[3]) : null;
              },
              remove: function(e) {
                this.write(e, '', Date.now() - 864e5);
              },
            };
          })()
        : (function() {
            return {
              write: function() {},
              read: function() {
                return null;
              },
              remove: function() {},
            };
          })();
    },
    g7np: function(e, t, n) {
      'use strict';
      var r = n('2SVd'),
        o = n('5oMp');
      e.exports = function(e, t) {
        return e && !r(t) ? o(e, t) : t;
      };
    },
    jXQH: function(e, t, n) {
      var r = n('TO8r'),
        o = /^\s+/;
      function i(e) {
        return e ? e.slice(0, r(e) + 1).replace(o, '') : e;
      }
      e.exports = i;
    },
    'jfS+': function(e, t, n) {
      'use strict';
      var r = n('endd');
      function o(e) {
        if ('function' !== typeof e)
          throw new TypeError('executor must be a function.');
        var t;
        this.promise = new Promise(function(e) {
          t = e;
        });
        var n = this;
        e(function(e) {
          n.reason || ((n.reason = new r(e)), t(n.reason));
        });
      }
      (o.prototype.throwIfRequested = function() {
        if (this.reason) throw this.reason;
      }),
        (o.source = function() {
          var e,
            t = new o(function(t) {
              e = t;
            });
          return { token: t, cancel: e };
        }),
        (e.exports = o);
    },
    kB5k: function(e, t, n) {
      var r;
      (function(o) {
        'use strict';
        var i,
          a = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,
          s = Math.ceil,
          u = Math.floor,
          c = '[BigNumber Error] ',
          l = c + 'Number primitive has more than 15 significant digits: ',
          f = 1e14,
          p = 14,
          h = 9007199254740991,
          g = [
            1,
            10,
            100,
            1e3,
            1e4,
            1e5,
            1e6,
            1e7,
            1e8,
            1e9,
            1e10,
            1e11,
            1e12,
            1e13,
          ],
          d = 1e7,
          v = 1e9;
        function m(e) {
          var t,
            n,
            r,
            o = (B.prototype = {
              constructor: B,
              toString: null,
              valueOf: null,
            }),
            i = new B(1),
            L = 20,
            N = 4,
            j = -7,
            E = 21,
            C = -1e7,
            R = 1e7,
            P = !1,
            A = 1,
            T = 0,
            U = {
              prefix: '',
              groupSize: 3,
              secondaryGroupSize: 0,
              groupSeparator: ',',
              decimalSeparator: '.',
              fractionGroupSize: 0,
              fractionGroupSeparator: '\xa0',
              suffix: '',
            },
            F = '0123456789abcdefghijklmnopqrstuvwxyz',
            D = !0;
          function B(e, t) {
            var o,
              i,
              s,
              c,
              f,
              g,
              d,
              v,
              m = this;
            if (!(m instanceof B)) return new B(e, t);
            if (null == t) {
              if (e && !0 === e._isBigNumber)
                return (
                  (m.s = e.s),
                  void (!e.c || e.e > R
                    ? (m.c = m.e = null)
                    : e.e < C
                    ? (m.c = [(m.e = 0)])
                    : ((m.e = e.e), (m.c = e.c.slice())))
                );
              if ((g = 'number' == typeof e) && 0 * e == 0) {
                if (((m.s = 1 / e < 0 ? ((e = -e), -1) : 1), e === ~~e)) {
                  for (c = 0, f = e; f >= 10; f /= 10, c++);
                  return void (c > R
                    ? (m.c = m.e = null)
                    : ((m.e = c), (m.c = [e])));
                }
                v = String(e);
              } else {
                if (!a.test((v = String(e)))) return r(m, v, g);
                m.s = 45 == v.charCodeAt(0) ? ((v = v.slice(1)), -1) : 1;
              }
              (c = v.indexOf('.')) > -1 && (v = v.replace('.', '')),
                (f = v.search(/e/i)) > 0
                  ? (c < 0 && (c = f),
                    (c += +v.slice(f + 1)),
                    (v = v.substring(0, f)))
                  : c < 0 && (c = v.length);
            } else {
              if ((x(t, 2, F.length, 'Base'), 10 == t && D))
                return (m = new B(e)), q(m, L + m.e + 1, N);
              if (((v = String(e)), (g = 'number' == typeof e))) {
                if (0 * e != 0) return r(m, v, g, t);
                if (
                  ((m.s = 1 / e < 0 ? ((v = v.slice(1)), -1) : 1),
                  B.DEBUG && v.replace(/^0\.0*|\./, '').length > 15)
                )
                  throw Error(l + e);
              } else m.s = 45 === v.charCodeAt(0) ? ((v = v.slice(1)), -1) : 1;
              for (o = F.slice(0, t), c = f = 0, d = v.length; f < d; f++)
                if (o.indexOf((i = v.charAt(f))) < 0) {
                  if ('.' == i) {
                    if (f > c) {
                      c = d;
                      continue;
                    }
                  } else if (
                    !s &&
                    ((v == v.toUpperCase() && (v = v.toLowerCase())) ||
                      (v == v.toLowerCase() && (v = v.toUpperCase())))
                  ) {
                    (s = !0), (f = -1), (c = 0);
                    continue;
                  }
                  return r(m, String(e), g, t);
                }
              (g = !1),
                (v = n(v, t, 10, m.s)),
                (c = v.indexOf('.')) > -1
                  ? (v = v.replace('.', ''))
                  : (c = v.length);
            }
            for (f = 0; 48 === v.charCodeAt(f); f++);
            for (d = v.length; 48 === v.charCodeAt(--d); );
            if ((v = v.slice(f, ++d))) {
              if (((d -= f), g && B.DEBUG && d > 15 && (e > h || e !== u(e))))
                throw Error(l + m.s * e);
              if ((c = c - f - 1) > R) m.c = m.e = null;
              else if (c < C) m.c = [(m.e = 0)];
              else {
                if (
                  ((m.e = c),
                  (m.c = []),
                  (f = (c + 1) % p),
                  c < 0 && (f += p),
                  f < d)
                ) {
                  for (f && m.c.push(+v.slice(0, f)), d -= p; f < d; )
                    m.c.push(+v.slice(f, (f += p)));
                  f = p - (v = v.slice(f)).length;
                } else f -= d;
                for (; f--; v += '0');
                m.c.push(+v);
              }
            } else m.c = [(m.e = 0)];
          }
          function I(e, t, n, r) {
            var o, i, a, s, u;
            if ((null == n ? (n = N) : x(n, 0, 8), !e.c)) return e.toString();
            if (((o = e.c[0]), (a = e.e), null == t))
              (u = b(e.c)),
                (u =
                  1 == r || (2 == r && (a <= j || a >= E))
                    ? O(u, a)
                    : S(u, a, '0'));
            else if (
              ((e = q(new B(e), t, n)),
              (i = e.e),
              (u = b(e.c)),
              (s = u.length),
              1 == r || (2 == r && (t <= i || i <= j)))
            ) {
              for (; s < t; u += '0', s++);
              u = O(u, i);
            } else if (((t -= a), (u = S(u, i, '0')), i + 1 > s)) {
              if (--t > 0) for (u += '.'; t--; u += '0');
            } else if (((t += i - s), t > 0))
              for (i + 1 == s && (u += '.'); t--; u += '0');
            return e.s < 0 && o ? '-' + u : u;
          }
          function M(e, t) {
            for (var n, r = 1, o = new B(e[0]); r < e.length; r++) {
              if (((n = new B(e[r])), !n.s)) {
                o = n;
                break;
              }
              t.call(o, n) && (o = n);
            }
            return o;
          }
          function V(e, t, n) {
            for (var r = 1, o = t.length; !t[--o]; t.pop());
            for (o = t[0]; o >= 10; o /= 10, r++);
            return (
              (n = r + n * p - 1) > R
                ? (e.c = e.e = null)
                : n < C
                ? (e.c = [(e.e = 0)])
                : ((e.e = n), (e.c = t)),
              e
            );
          }
          function q(e, t, n, r) {
            var o,
              i,
              a,
              c,
              l,
              h,
              d,
              v = e.c,
              m = g;
            if (v) {
              e: {
                for (o = 1, c = v[0]; c >= 10; c /= 10, o++);
                if (((i = t - o), i < 0))
                  (i += p),
                    (a = t),
                    (l = v[(h = 0)]),
                    (d = (l / m[o - a - 1]) % 10 | 0);
                else if (((h = s((i + 1) / p)), h >= v.length)) {
                  if (!r) break e;
                  for (; v.length <= h; v.push(0));
                  (l = d = 0), (o = 1), (i %= p), (a = i - p + 1);
                } else {
                  for (l = c = v[h], o = 1; c >= 10; c /= 10, o++);
                  (i %= p),
                    (a = i - p + o),
                    (d = a < 0 ? 0 : (l / m[o - a - 1]) % 10 | 0);
                }
                if (
                  ((r =
                    r ||
                    t < 0 ||
                    null != v[h + 1] ||
                    (a < 0 ? l : l % m[o - a - 1])),
                  (r =
                    n < 4
                      ? (d || r) && (0 == n || n == (e.s < 0 ? 3 : 2))
                      : d > 5 ||
                        (5 == d &&
                          (4 == n ||
                            r ||
                            (6 == n &&
                              (i > 0 ? (a > 0 ? l / m[o - a] : 0) : v[h - 1]) %
                                10 &
                                1) ||
                            n == (e.s < 0 ? 8 : 7)))),
                  t < 1 || !v[0])
                )
                  return (
                    (v.length = 0),
                    r
                      ? ((t -= e.e + 1),
                        (v[0] = m[(p - (t % p)) % p]),
                        (e.e = -t || 0))
                      : (v[0] = e.e = 0),
                    e
                  );
                if (
                  (0 == i
                    ? ((v.length = h), (c = 1), h--)
                    : ((v.length = h + 1),
                      (c = m[p - i]),
                      (v[h] = a > 0 ? u((l / m[o - a]) % m[a]) * c : 0)),
                  r)
                )
                  for (;;) {
                    if (0 == h) {
                      for (i = 1, a = v[0]; a >= 10; a /= 10, i++);
                      for (a = v[0] += c, c = 1; a >= 10; a /= 10, c++);
                      i != c && (e.e++, v[0] == f && (v[0] = 1));
                      break;
                    }
                    if (((v[h] += c), v[h] != f)) break;
                    (v[h--] = 0), (c = 1);
                  }
                for (i = v.length; 0 === v[--i]; v.pop());
              }
              e.e > R ? (e.c = e.e = null) : e.e < C && (e.c = [(e.e = 0)]);
            }
            return e;
          }
          function _(e) {
            var t,
              n = e.e;
            return null === n
              ? e.toString()
              : ((t = b(e.c)),
                (t = n <= j || n >= E ? O(t, n) : S(t, n, '0')),
                e.s < 0 ? '-' + t : t);
          }
          return (
            (B.clone = m),
            (B.ROUND_UP = 0),
            (B.ROUND_DOWN = 1),
            (B.ROUND_CEIL = 2),
            (B.ROUND_FLOOR = 3),
            (B.ROUND_HALF_UP = 4),
            (B.ROUND_HALF_DOWN = 5),
            (B.ROUND_HALF_EVEN = 6),
            (B.ROUND_HALF_CEIL = 7),
            (B.ROUND_HALF_FLOOR = 8),
            (B.EUCLID = 9),
            (B.config = B.set = function(e) {
              var t, n;
              if (null != e) {
                if ('object' != typeof e)
                  throw Error(c + 'Object expected: ' + e);
                if (
                  (e.hasOwnProperty((t = 'DECIMAL_PLACES')) &&
                    ((n = e[t]), x(n, 0, v, t), (L = n)),
                  e.hasOwnProperty((t = 'ROUNDING_MODE')) &&
                    ((n = e[t]), x(n, 0, 8, t), (N = n)),
                  e.hasOwnProperty((t = 'EXPONENTIAL_AT')) &&
                    ((n = e[t]),
                    n && n.pop
                      ? (x(n[0], -v, 0, t),
                        x(n[1], 0, v, t),
                        (j = n[0]),
                        (E = n[1]))
                      : (x(n, -v, v, t), (j = -(E = n < 0 ? -n : n)))),
                  e.hasOwnProperty((t = 'RANGE')))
                )
                  if (((n = e[t]), n && n.pop))
                    x(n[0], -v, -1, t),
                      x(n[1], 1, v, t),
                      (C = n[0]),
                      (R = n[1]);
                  else {
                    if ((x(n, -v, v, t), !n))
                      throw Error(c + t + ' cannot be zero: ' + n);
                    C = -(R = n < 0 ? -n : n);
                  }
                if (e.hasOwnProperty((t = 'CRYPTO'))) {
                  if (((n = e[t]), n !== !!n))
                    throw Error(c + t + ' not true or false: ' + n);
                  if (n) {
                    if (
                      'undefined' == typeof crypto ||
                      !crypto ||
                      (!crypto.getRandomValues && !crypto.randomBytes)
                    )
                      throw ((P = !n), Error(c + 'crypto unavailable'));
                    P = n;
                  } else P = n;
                }
                if (
                  (e.hasOwnProperty((t = 'MODULO_MODE')) &&
                    ((n = e[t]), x(n, 0, 9, t), (A = n)),
                  e.hasOwnProperty((t = 'POW_PRECISION')) &&
                    ((n = e[t]), x(n, 0, v, t), (T = n)),
                  e.hasOwnProperty((t = 'FORMAT')))
                ) {
                  if (((n = e[t]), 'object' != typeof n))
                    throw Error(c + t + ' not an object: ' + n);
                  U = n;
                }
                if (e.hasOwnProperty((t = 'ALPHABET'))) {
                  if (
                    ((n = e[t]),
                    'string' != typeof n || /^.?$|[+\-.\s]|(.).*\1/.test(n))
                  )
                    throw Error(c + t + ' invalid: ' + n);
                  (D = '0123456789' == n.slice(0, 10)), (F = n);
                }
              }
              return {
                DECIMAL_PLACES: L,
                ROUNDING_MODE: N,
                EXPONENTIAL_AT: [j, E],
                RANGE: [C, R],
                CRYPTO: P,
                MODULO_MODE: A,
                POW_PRECISION: T,
                FORMAT: U,
                ALPHABET: F,
              };
            }),
            (B.isBigNumber = function(e) {
              if (!e || !0 !== e._isBigNumber) return !1;
              if (!B.DEBUG) return !0;
              var t,
                n,
                r = e.c,
                o = e.e,
                i = e.s;
              e: if ('[object Array]' == {}.toString.call(r)) {
                if ((1 === i || -1 === i) && o >= -v && o <= v && o === u(o)) {
                  if (0 === r[0]) {
                    if (0 === o && 1 === r.length) return !0;
                    break e;
                  }
                  if (
                    ((t = (o + 1) % p),
                    t < 1 && (t += p),
                    String(r[0]).length == t)
                  ) {
                    for (t = 0; t < r.length; t++)
                      if (((n = r[t]), n < 0 || n >= f || n !== u(n))) break e;
                    if (0 !== n) return !0;
                  }
                }
              } else if (
                null === r &&
                null === o &&
                (null === i || 1 === i || -1 === i)
              )
                return !0;
              throw Error(c + 'Invalid BigNumber: ' + e);
            }),
            (B.maximum = B.max = function() {
              return M(arguments, o.lt);
            }),
            (B.minimum = B.min = function() {
              return M(arguments, o.gt);
            }),
            (B.random = (function() {
              var e = 9007199254740992,
                t =
                  (Math.random() * e) & 2097151
                    ? function() {
                        return u(Math.random() * e);
                      }
                    : function() {
                        return (
                          8388608 * ((1073741824 * Math.random()) | 0) +
                          ((8388608 * Math.random()) | 0)
                        );
                      };
              return function(e) {
                var n,
                  r,
                  o,
                  a,
                  l,
                  f = 0,
                  h = [],
                  d = new B(i);
                if ((null == e ? (e = L) : x(e, 0, v), (a = s(e / p)), P))
                  if (crypto.getRandomValues) {
                    for (
                      n = crypto.getRandomValues(new Uint32Array((a *= 2)));
                      f < a;

                    )
                      (l = 131072 * n[f] + (n[f + 1] >>> 11)),
                        l >= 9e15
                          ? ((r = crypto.getRandomValues(new Uint32Array(2))),
                            (n[f] = r[0]),
                            (n[f + 1] = r[1]))
                          : (h.push(l % 1e14), (f += 2));
                    f = a / 2;
                  } else {
                    if (!crypto.randomBytes)
                      throw ((P = !1), Error(c + 'crypto unavailable'));
                    for (n = crypto.randomBytes((a *= 7)); f < a; )
                      (l =
                        281474976710656 * (31 & n[f]) +
                        1099511627776 * n[f + 1] +
                        4294967296 * n[f + 2] +
                        16777216 * n[f + 3] +
                        (n[f + 4] << 16) +
                        (n[f + 5] << 8) +
                        n[f + 6]),
                        l >= 9e15
                          ? crypto.randomBytes(7).copy(n, f)
                          : (h.push(l % 1e14), (f += 7));
                    f = a / 7;
                  }
                if (!P)
                  for (; f < a; ) (l = t()), l < 9e15 && (h[f++] = l % 1e14);
                for (
                  a = h[--f],
                    e %= p,
                    a && e && ((l = g[p - e]), (h[f] = u(a / l) * l));
                  0 === h[f];
                  h.pop(), f--
                );
                if (f < 0) h = [(o = 0)];
                else {
                  for (o = -1; 0 === h[0]; h.splice(0, 1), o -= p);
                  for (f = 1, l = h[0]; l >= 10; l /= 10, f++);
                  f < p && (o -= p - f);
                }
                return (d.e = o), (d.c = h), d;
              };
            })()),
            (B.sum = function() {
              for (var e = 1, t = arguments, n = new B(t[0]); e < t.length; )
                n = n.plus(t[e++]);
              return n;
            }),
            (n = (function() {
              var e = '0123456789';
              function n(e, t, n, r) {
                for (var o, i, a = [0], s = 0, u = e.length; s < u; ) {
                  for (i = a.length; i--; a[i] *= t);
                  for (
                    a[0] += r.indexOf(e.charAt(s++)), o = 0;
                    o < a.length;
                    o++
                  )
                    a[o] > n - 1 &&
                      (null == a[o + 1] && (a[o + 1] = 0),
                      (a[o + 1] += (a[o] / n) | 0),
                      (a[o] %= n));
                }
                return a.reverse();
              }
              return function(r, o, i, a, s) {
                var u,
                  c,
                  l,
                  f,
                  p,
                  h,
                  g,
                  d,
                  v = r.indexOf('.'),
                  m = L,
                  y = N;
                for (
                  v >= 0 &&
                    ((f = T),
                    (T = 0),
                    (r = r.replace('.', '')),
                    (d = new B(o)),
                    (h = d.pow(r.length - v)),
                    (T = f),
                    (d.c = n(S(b(h.c), h.e, '0'), 10, i, e)),
                    (d.e = d.c.length)),
                    g = n(r, o, i, s ? ((u = F), e) : ((u = e), F)),
                    l = f = g.length;
                  0 == g[--f];
                  g.pop()
                );
                if (!g[0]) return u.charAt(0);
                if (
                  (v < 0
                    ? --l
                    : ((h.c = g),
                      (h.e = l),
                      (h.s = a),
                      (h = t(h, d, m, y, i)),
                      (g = h.c),
                      (p = h.r),
                      (l = h.e)),
                  (c = l + m + 1),
                  (v = g[c]),
                  (f = i / 2),
                  (p = p || c < 0 || null != g[c + 1]),
                  (p =
                    y < 4
                      ? (null != v || p) && (0 == y || y == (h.s < 0 ? 3 : 2))
                      : v > f ||
                        (v == f &&
                          (4 == y ||
                            p ||
                            (6 == y && 1 & g[c - 1]) ||
                            y == (h.s < 0 ? 8 : 7)))),
                  c < 1 || !g[0])
                )
                  r = p ? S(u.charAt(1), -m, u.charAt(0)) : u.charAt(0);
                else {
                  if (((g.length = c), p))
                    for (--i; ++g[--c] > i; )
                      (g[c] = 0), c || (++l, (g = [1].concat(g)));
                  for (f = g.length; !g[--f]; );
                  for (v = 0, r = ''; v <= f; r += u.charAt(g[v++]));
                  r = S(r, l, u.charAt(0));
                }
                return r;
              };
            })()),
            (t = (function() {
              function e(e, t, n) {
                var r,
                  o,
                  i,
                  a,
                  s = 0,
                  u = e.length,
                  c = t % d,
                  l = (t / d) | 0;
                for (e = e.slice(); u--; )
                  (i = e[u] % d),
                    (a = (e[u] / d) | 0),
                    (r = l * i + a * c),
                    (o = c * i + (r % d) * d + s),
                    (s = ((o / n) | 0) + ((r / d) | 0) + l * a),
                    (e[u] = o % n);
                return s && (e = [s].concat(e)), e;
              }
              function t(e, t, n, r) {
                var o, i;
                if (n != r) i = n > r ? 1 : -1;
                else
                  for (o = i = 0; o < n; o++)
                    if (e[o] != t[o]) {
                      i = e[o] > t[o] ? 1 : -1;
                      break;
                    }
                return i;
              }
              function n(e, t, n, r) {
                for (var o = 0; n--; )
                  (e[n] -= o),
                    (o = e[n] < t[n] ? 1 : 0),
                    (e[n] = o * r + e[n] - t[n]);
                for (; !e[0] && e.length > 1; e.splice(0, 1));
              }
              return function(r, o, i, a, s) {
                var c,
                  l,
                  h,
                  g,
                  d,
                  v,
                  m,
                  b,
                  w,
                  x,
                  k,
                  O,
                  S,
                  L,
                  N,
                  j,
                  E,
                  C = r.s == o.s ? 1 : -1,
                  R = r.c,
                  P = o.c;
                if (!R || !R[0] || !P || !P[0])
                  return new B(
                    r.s && o.s && (R ? !P || R[0] != P[0] : P)
                      ? (R && 0 == R[0]) || !P
                        ? 0 * C
                        : C / 0
                      : NaN,
                  );
                for (
                  b = new B(C),
                    w = b.c = [],
                    l = r.e - o.e,
                    C = i + l + 1,
                    s ||
                      ((s = f),
                      (l = y(r.e / p) - y(o.e / p)),
                      (C = (C / p) | 0)),
                    h = 0;
                  P[h] == (R[h] || 0);
                  h++
                );
                if ((P[h] > (R[h] || 0) && l--, C < 0)) w.push(1), (g = !0);
                else {
                  for (
                    L = R.length,
                      j = P.length,
                      h = 0,
                      C += 2,
                      d = u(s / (P[0] + 1)),
                      d > 1 &&
                        ((P = e(P, d, s)),
                        (R = e(R, d, s)),
                        (j = P.length),
                        (L = R.length)),
                      S = j,
                      x = R.slice(0, j),
                      k = x.length;
                    k < j;
                    x[k++] = 0
                  );
                  (E = P.slice()),
                    (E = [0].concat(E)),
                    (N = P[0]),
                    P[1] >= s / 2 && N++;
                  do {
                    if (((d = 0), (c = t(P, x, j, k)), c < 0)) {
                      if (
                        ((O = x[0]),
                        j != k && (O = O * s + (x[1] || 0)),
                        (d = u(O / N)),
                        d > 1)
                      ) {
                        d >= s && (d = s - 1),
                          (v = e(P, d, s)),
                          (m = v.length),
                          (k = x.length);
                        while (1 == t(v, x, m, k))
                          d--,
                            n(v, j < m ? E : P, m, s),
                            (m = v.length),
                            (c = 1);
                      } else
                        0 == d && (c = d = 1), (v = P.slice()), (m = v.length);
                      if (
                        (m < k && (v = [0].concat(v)),
                        n(x, v, k, s),
                        (k = x.length),
                        -1 == c)
                      )
                        while (t(P, x, j, k) < 1)
                          d++, n(x, j < k ? E : P, k, s), (k = x.length);
                    } else 0 === c && (d++, (x = [0]));
                    (w[h++] = d),
                      x[0] ? (x[k++] = R[S] || 0) : ((x = [R[S]]), (k = 1));
                  } while ((S++ < L || null != x[0]) && C--);
                  (g = null != x[0]), w[0] || w.splice(0, 1);
                }
                if (s == f) {
                  for (h = 1, C = w[0]; C >= 10; C /= 10, h++);
                  q(b, i + (b.e = h + l * p - 1) + 1, a, g);
                } else (b.e = l), (b.r = +g);
                return b;
              };
            })()),
            (r = (function() {
              var e = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
                t = /^([^.]+)\.$/,
                n = /^\.([^.]+)$/,
                r = /^-?(Infinity|NaN)$/,
                o = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
              return function(i, a, s, u) {
                var l,
                  f = s ? a : a.replace(o, '');
                if (r.test(f)) i.s = isNaN(f) ? null : f < 0 ? -1 : 1;
                else {
                  if (
                    !s &&
                    ((f = f.replace(e, function(e, t, n) {
                      return (
                        (l =
                          'x' == (n = n.toLowerCase()) ? 16 : 'b' == n ? 2 : 8),
                        u && u != l ? e : t
                      );
                    })),
                    u && ((l = u), (f = f.replace(t, '$1').replace(n, '0.$1'))),
                    a != f)
                  )
                    return new B(f, l);
                  if (B.DEBUG)
                    throw Error(
                      c + 'Not a' + (u ? ' base ' + u : '') + ' number: ' + a,
                    );
                  i.s = null;
                }
                i.c = i.e = null;
              };
            })()),
            (o.absoluteValue = o.abs = function() {
              var e = new B(this);
              return e.s < 0 && (e.s = 1), e;
            }),
            (o.comparedTo = function(e, t) {
              return w(this, new B(e, t));
            }),
            (o.decimalPlaces = o.dp = function(e, t) {
              var n,
                r,
                o,
                i = this;
              if (null != e)
                return (
                  x(e, 0, v),
                  null == t ? (t = N) : x(t, 0, 8),
                  q(new B(i), e + i.e + 1, t)
                );
              if (!(n = i.c)) return null;
              if (((r = ((o = n.length - 1) - y(this.e / p)) * p), (o = n[o])))
                for (; o % 10 == 0; o /= 10, r--);
              return r < 0 && (r = 0), r;
            }),
            (o.dividedBy = o.div = function(e, n) {
              return t(this, new B(e, n), L, N);
            }),
            (o.dividedToIntegerBy = o.idiv = function(e, n) {
              return t(this, new B(e, n), 0, 1);
            }),
            (o.exponentiatedBy = o.pow = function(e, t) {
              var n,
                r,
                o,
                a,
                l,
                f,
                h,
                g,
                d,
                v = this;
              if (((e = new B(e)), e.c && !e.isInteger()))
                throw Error(c + 'Exponent not an integer: ' + _(e));
              if (
                (null != t && (t = new B(t)),
                (f = e.e > 14),
                !v.c ||
                  !v.c[0] ||
                  (1 == v.c[0] && !v.e && 1 == v.c.length) ||
                  !e.c ||
                  !e.c[0])
              )
                return (
                  (d = new B(Math.pow(+_(v), f ? 2 - k(e) : +_(e)))),
                  t ? d.mod(t) : d
                );
              if (((h = e.s < 0), t)) {
                if (t.c ? !t.c[0] : !t.s) return new B(NaN);
                (r = !h && v.isInteger() && t.isInteger()), r && (v = v.mod(t));
              } else {
                if (
                  e.e > 9 &&
                  (v.e > 0 ||
                    v.e < -1 ||
                    (0 == v.e
                      ? v.c[0] > 1 || (f && v.c[1] >= 24e7)
                      : v.c[0] < 8e13 || (f && v.c[0] <= 9999975e7)))
                )
                  return (
                    (a = v.s < 0 && k(e) ? -0 : 0),
                    v.e > -1 && (a = 1 / a),
                    new B(h ? 1 / a : a)
                  );
                T && (a = s(T / p + 2));
              }
              for (
                f
                  ? ((n = new B(0.5)), h && (e.s = 1), (g = k(e)))
                  : ((o = Math.abs(+_(e))), (g = o % 2)),
                  d = new B(i);
                ;

              ) {
                if (g) {
                  if (((d = d.times(v)), !d.c)) break;
                  a ? d.c.length > a && (d.c.length = a) : r && (d = d.mod(t));
                }
                if (o) {
                  if (((o = u(o / 2)), 0 === o)) break;
                  g = o % 2;
                } else if (((e = e.times(n)), q(e, e.e + 1, 1), e.e > 14))
                  g = k(e);
                else {
                  if (((o = +_(e)), 0 === o)) break;
                  g = o % 2;
                }
                (v = v.times(v)),
                  a
                    ? v.c && v.c.length > a && (v.c.length = a)
                    : r && (v = v.mod(t));
              }
              return r
                ? d
                : (h && (d = i.div(d)), t ? d.mod(t) : a ? q(d, T, N, l) : d);
            }),
            (o.integerValue = function(e) {
              var t = new B(this);
              return null == e ? (e = N) : x(e, 0, 8), q(t, t.e + 1, e);
            }),
            (o.isEqualTo = o.eq = function(e, t) {
              return 0 === w(this, new B(e, t));
            }),
            (o.isFinite = function() {
              return !!this.c;
            }),
            (o.isGreaterThan = o.gt = function(e, t) {
              return w(this, new B(e, t)) > 0;
            }),
            (o.isGreaterThanOrEqualTo = o.gte = function(e, t) {
              return 1 === (t = w(this, new B(e, t))) || 0 === t;
            }),
            (o.isInteger = function() {
              return !!this.c && y(this.e / p) > this.c.length - 2;
            }),
            (o.isLessThan = o.lt = function(e, t) {
              return w(this, new B(e, t)) < 0;
            }),
            (o.isLessThanOrEqualTo = o.lte = function(e, t) {
              return -1 === (t = w(this, new B(e, t))) || 0 === t;
            }),
            (o.isNaN = function() {
              return !this.s;
            }),
            (o.isNegative = function() {
              return this.s < 0;
            }),
            (o.isPositive = function() {
              return this.s > 0;
            }),
            (o.isZero = function() {
              return !!this.c && 0 == this.c[0];
            }),
            (o.minus = function(e, t) {
              var n,
                r,
                o,
                i,
                a = this,
                s = a.s;
              if (((e = new B(e, t)), (t = e.s), !s || !t)) return new B(NaN);
              if (s != t) return (e.s = -t), a.plus(e);
              var u = a.e / p,
                c = e.e / p,
                l = a.c,
                h = e.c;
              if (!u || !c) {
                if (!l || !h) return l ? ((e.s = -t), e) : new B(h ? a : NaN);
                if (!l[0] || !h[0])
                  return h[0]
                    ? ((e.s = -t), e)
                    : new B(l[0] ? a : 3 == N ? -0 : 0);
              }
              if (((u = y(u)), (c = y(c)), (l = l.slice()), (s = u - c))) {
                for (
                  (i = s < 0) ? ((s = -s), (o = l)) : ((c = u), (o = h)),
                    o.reverse(),
                    t = s;
                  t--;
                  o.push(0)
                );
                o.reverse();
              } else
                for (
                  r = (i = (s = l.length) < (t = h.length)) ? s : t, s = t = 0;
                  t < r;
                  t++
                )
                  if (l[t] != h[t]) {
                    i = l[t] < h[t];
                    break;
                  }
              if (
                (i && ((o = l), (l = h), (h = o), (e.s = -e.s)),
                (t = (r = h.length) - (n = l.length)),
                t > 0)
              )
                for (; t--; l[n++] = 0);
              for (t = f - 1; r > s; ) {
                if (l[--r] < h[r]) {
                  for (n = r; n && !l[--n]; l[n] = t);
                  --l[n], (l[r] += f);
                }
                l[r] -= h[r];
              }
              for (; 0 == l[0]; l.splice(0, 1), --c);
              return l[0]
                ? V(e, l, c)
                : ((e.s = 3 == N ? -1 : 1), (e.c = [(e.e = 0)]), e);
            }),
            (o.modulo = o.mod = function(e, n) {
              var r,
                o,
                i = this;
              return (
                (e = new B(e, n)),
                !i.c || !e.s || (e.c && !e.c[0])
                  ? new B(NaN)
                  : !e.c || (i.c && !i.c[0])
                  ? new B(i)
                  : (9 == A
                      ? ((o = e.s),
                        (e.s = 1),
                        (r = t(i, e, 0, 3)),
                        (e.s = o),
                        (r.s *= o))
                      : (r = t(i, e, 0, A)),
                    (e = i.minus(r.times(e))),
                    e.c[0] || 1 != A || (e.s = i.s),
                    e)
              );
            }),
            (o.multipliedBy = o.times = function(e, t) {
              var n,
                r,
                o,
                i,
                a,
                s,
                u,
                c,
                l,
                h,
                g,
                v,
                m,
                b,
                w,
                x = this,
                k = x.c,
                O = (e = new B(e, t)).c;
              if (!k || !O || !k[0] || !O[0])
                return (
                  !x.s || !e.s || (k && !k[0] && !O) || (O && !O[0] && !k)
                    ? (e.c = e.e = e.s = null)
                    : ((e.s *= x.s),
                      k && O ? ((e.c = [0]), (e.e = 0)) : (e.c = e.e = null)),
                  e
                );
              for (
                r = y(x.e / p) + y(e.e / p),
                  e.s *= x.s,
                  u = k.length,
                  h = O.length,
                  u < h &&
                    ((m = k), (k = O), (O = m), (o = u), (u = h), (h = o)),
                  o = u + h,
                  m = [];
                o--;
                m.push(0)
              );
              for (b = f, w = d, o = h; --o >= 0; ) {
                for (
                  n = 0, g = O[o] % w, v = (O[o] / w) | 0, a = u, i = o + a;
                  i > o;

                )
                  (c = k[--a] % w),
                    (l = (k[a] / w) | 0),
                    (s = v * c + l * g),
                    (c = g * c + (s % w) * w + m[i] + n),
                    (n = ((c / b) | 0) + ((s / w) | 0) + v * l),
                    (m[i--] = c % b);
                m[i] = n;
              }
              return n ? ++r : m.splice(0, 1), V(e, m, r);
            }),
            (o.negated = function() {
              var e = new B(this);
              return (e.s = -e.s || null), e;
            }),
            (o.plus = function(e, t) {
              var n,
                r = this,
                o = r.s;
              if (((e = new B(e, t)), (t = e.s), !o || !t)) return new B(NaN);
              if (o != t) return (e.s = -t), r.minus(e);
              var i = r.e / p,
                a = e.e / p,
                s = r.c,
                u = e.c;
              if (!i || !a) {
                if (!s || !u) return new B(o / 0);
                if (!s[0] || !u[0]) return u[0] ? e : new B(s[0] ? r : 0 * o);
              }
              if (((i = y(i)), (a = y(a)), (s = s.slice()), (o = i - a))) {
                for (
                  o > 0 ? ((a = i), (n = u)) : ((o = -o), (n = s)), n.reverse();
                  o--;
                  n.push(0)
                );
                n.reverse();
              }
              for (
                o = s.length,
                  t = u.length,
                  o - t < 0 && ((n = u), (u = s), (s = n), (t = o)),
                  o = 0;
                t;

              )
                (o = ((s[--t] = s[t] + u[t] + o) / f) | 0),
                  (s[t] = f === s[t] ? 0 : s[t] % f);
              return o && ((s = [o].concat(s)), ++a), V(e, s, a);
            }),
            (o.precision = o.sd = function(e, t) {
              var n,
                r,
                o,
                i = this;
              if (null != e && e !== !!e)
                return (
                  x(e, 1, v),
                  null == t ? (t = N) : x(t, 0, 8),
                  q(new B(i), e, t)
                );
              if (!(n = i.c)) return null;
              if (((o = n.length - 1), (r = o * p + 1), (o = n[o]))) {
                for (; o % 10 == 0; o /= 10, r--);
                for (o = n[0]; o >= 10; o /= 10, r++);
              }
              return e && i.e + 1 > r && (r = i.e + 1), r;
            }),
            (o.shiftedBy = function(e) {
              return x(e, -h, h), this.times('1e' + e);
            }),
            (o.squareRoot = o.sqrt = function() {
              var e,
                n,
                r,
                o,
                i,
                a = this,
                s = a.c,
                u = a.s,
                c = a.e,
                l = L + 4,
                f = new B('0.5');
              if (1 !== u || !s || !s[0])
                return new B(
                  !u || (u < 0 && (!s || s[0])) ? NaN : s ? a : 1 / 0,
                );
              if (
                ((u = Math.sqrt(+_(a))),
                0 == u || u == 1 / 0
                  ? ((n = b(s)),
                    (n.length + c) % 2 == 0 && (n += '0'),
                    (u = Math.sqrt(+n)),
                    (c = y((c + 1) / 2) - (c < 0 || c % 2)),
                    u == 1 / 0
                      ? (n = '5e' + c)
                      : ((n = u.toExponential()),
                        (n = n.slice(0, n.indexOf('e') + 1) + c)),
                    (r = new B(n)))
                  : (r = new B(u + '')),
                r.c[0])
              )
                for (c = r.e, u = c + l, u < 3 && (u = 0); ; )
                  if (
                    ((i = r),
                    (r = f.times(i.plus(t(a, i, l, 1)))),
                    b(i.c).slice(0, u) === (n = b(r.c)).slice(0, u))
                  ) {
                    if (
                      (r.e < c && --u,
                      (n = n.slice(u - 3, u + 1)),
                      '9999' != n && (o || '4999' != n))
                    ) {
                      (+n && (+n.slice(1) || '5' != n.charAt(0))) ||
                        (q(r, r.e + L + 2, 1), (e = !r.times(r).eq(a)));
                      break;
                    }
                    if (!o && (q(i, i.e + L + 2, 0), i.times(i).eq(a))) {
                      r = i;
                      break;
                    }
                    (l += 4), (u += 4), (o = 1);
                  }
              return q(r, r.e + L + 1, N, e);
            }),
            (o.toExponential = function(e, t) {
              return null != e && (x(e, 0, v), e++), I(this, e, t, 1);
            }),
            (o.toFixed = function(e, t) {
              return (
                null != e && (x(e, 0, v), (e = e + this.e + 1)), I(this, e, t)
              );
            }),
            (o.toFormat = function(e, t, n) {
              var r,
                o = this;
              if (null == n)
                null != e && t && 'object' == typeof t
                  ? ((n = t), (t = null))
                  : e && 'object' == typeof e
                  ? ((n = e), (e = t = null))
                  : (n = U);
              else if ('object' != typeof n)
                throw Error(c + 'Argument not an object: ' + n);
              if (((r = o.toFixed(e, t)), o.c)) {
                var i,
                  a = r.split('.'),
                  s = +n.groupSize,
                  u = +n.secondaryGroupSize,
                  l = n.groupSeparator || '',
                  f = a[0],
                  p = a[1],
                  h = o.s < 0,
                  g = h ? f.slice(1) : f,
                  d = g.length;
                if (
                  (u && ((i = s), (s = u), (u = i), (d -= i)), s > 0 && d > 0)
                ) {
                  for (i = d % s || s, f = g.substr(0, i); i < d; i += s)
                    f += l + g.substr(i, s);
                  u > 0 && (f += l + g.slice(i)), h && (f = '-' + f);
                }
                r = p
                  ? f +
                    (n.decimalSeparator || '') +
                    ((u = +n.fractionGroupSize)
                      ? p.replace(
                          new RegExp('\\d{' + u + '}\\B', 'g'),
                          '$&' + (n.fractionGroupSeparator || ''),
                        )
                      : p)
                  : f;
              }
              return (n.prefix || '') + r + (n.suffix || '');
            }),
            (o.toFraction = function(e) {
              var n,
                r,
                o,
                a,
                s,
                u,
                l,
                f,
                h,
                d,
                v,
                m,
                y = this,
                w = y.c;
              if (
                null != e &&
                ((l = new B(e)),
                (!l.isInteger() && (l.c || 1 !== l.s)) || l.lt(i))
              )
                throw Error(
                  c +
                    'Argument ' +
                    (l.isInteger() ? 'out of range: ' : 'not an integer: ') +
                    _(l),
                );
              if (!w) return new B(y);
              for (
                n = new B(i),
                  h = r = new B(i),
                  o = f = new B(i),
                  m = b(w),
                  s = n.e = m.length - y.e - 1,
                  n.c[0] = g[(u = s % p) < 0 ? p + u : u],
                  e = !e || l.comparedTo(n) > 0 ? (s > 0 ? n : h) : l,
                  u = R,
                  R = 1 / 0,
                  l = new B(m),
                  f.c[0] = 0;
                ;

              ) {
                if (
                  ((d = t(l, n, 0, 1)),
                  (a = r.plus(d.times(o))),
                  1 == a.comparedTo(e))
                )
                  break;
                (r = o),
                  (o = a),
                  (h = f.plus(d.times((a = h)))),
                  (f = a),
                  (n = l.minus(d.times((a = n)))),
                  (l = a);
              }
              return (
                (a = t(e.minus(r), o, 0, 1)),
                (f = f.plus(a.times(h))),
                (r = r.plus(a.times(o))),
                (f.s = h.s = y.s),
                (s *= 2),
                (v =
                  t(h, o, s, N)
                    .minus(y)
                    .abs()
                    .comparedTo(
                      t(f, r, s, N)
                        .minus(y)
                        .abs(),
                    ) < 1
                    ? [h, o]
                    : [f, r]),
                (R = u),
                v
              );
            }),
            (o.toNumber = function() {
              return +_(this);
            }),
            (o.toPrecision = function(e, t) {
              return null != e && x(e, 1, v), I(this, e, t, 2);
            }),
            (o.toString = function(e) {
              var t,
                r = this,
                o = r.s,
                i = r.e;
              return (
                null === i
                  ? o
                    ? ((t = 'Infinity'), o < 0 && (t = '-' + t))
                    : (t = 'NaN')
                  : (null == e
                      ? (t =
                          i <= j || i >= E ? O(b(r.c), i) : S(b(r.c), i, '0'))
                      : 10 === e && D
                      ? ((r = q(new B(r), L + i + 1, N)),
                        (t = S(b(r.c), r.e, '0')))
                      : (x(e, 2, F.length, 'Base'),
                        (t = n(S(b(r.c), i, '0'), 10, e, o, !0))),
                    o < 0 && r.c[0] && (t = '-' + t)),
                t
              );
            }),
            (o.valueOf = o.toJSON = function() {
              return _(this);
            }),
            (o._isBigNumber = !0),
            null != e && B.set(e),
            B
          );
        }
        function y(e) {
          var t = 0 | e;
          return e > 0 || e === t ? t : t - 1;
        }
        function b(e) {
          for (var t, n, r = 1, o = e.length, i = e[0] + ''; r < o; ) {
            for (t = e[r++] + '', n = p - t.length; n--; t = '0' + t);
            i += t;
          }
          for (o = i.length; 48 === i.charCodeAt(--o); );
          return i.slice(0, o + 1 || 1);
        }
        function w(e, t) {
          var n,
            r,
            o = e.c,
            i = t.c,
            a = e.s,
            s = t.s,
            u = e.e,
            c = t.e;
          if (!a || !s) return null;
          if (((n = o && !o[0]), (r = i && !i[0]), n || r))
            return n ? (r ? 0 : -s) : a;
          if (a != s) return a;
          if (((n = a < 0), (r = u == c), !o || !i))
            return r ? 0 : !o ^ n ? 1 : -1;
          if (!r) return (u > c) ^ n ? 1 : -1;
          for (s = (u = o.length) < (c = i.length) ? u : c, a = 0; a < s; a++)
            if (o[a] != i[a]) return (o[a] > i[a]) ^ n ? 1 : -1;
          return u == c ? 0 : (u > c) ^ n ? 1 : -1;
        }
        function x(e, t, n, r) {
          if (e < t || e > n || e !== u(e))
            throw Error(
              c +
                (r || 'Argument') +
                ('number' == typeof e
                  ? e < t || e > n
                    ? ' out of range: '
                    : ' not an integer: '
                  : ' not a primitive number: ') +
                String(e),
            );
        }
        function k(e) {
          var t = e.c.length - 1;
          return y(e.e / p) == t && e.c[t] % 2 != 0;
        }
        function O(e, t) {
          return (
            (e.length > 1 ? e.charAt(0) + '.' + e.slice(1) : e) +
            (t < 0 ? 'e' : 'e+') +
            t
          );
        }
        function S(e, t, n) {
          var r, o;
          if (t < 0) {
            for (o = n + '.'; ++t; o += n);
            e = o + e;
          } else if (((r = e.length), ++t > r)) {
            for (o = n, t -= r; --t; o += n);
            e += o;
          } else t < r && (e = e.slice(0, t) + '.' + e.slice(t));
          return e;
        }
        (i = m()),
          (i['default'] = i.BigNumber = i),
          (r = function() {
            return i;
          }.call(t, n, t, e)),
          void 0 === r || (e.exports = r);
      })();
    },
    tLB3: function(e, t, n) {
      var r = n('jXQH'),
        o = n('GoyQ'),
        i = n('/9aa'),
        a = NaN,
        s = /^[-+]0x[0-9a-f]+$/i,
        u = /^0b[01]+$/i,
        c = /^0o[0-7]+$/i,
        l = parseInt;
      function f(e) {
        if ('number' == typeof e) return e;
        if (i(e)) return a;
        if (o(e)) {
          var t = 'function' == typeof e.valueOf ? e.valueOf() : e;
          e = o(t) ? t + '' : t;
        }
        if ('string' != typeof e) return 0 === e ? e : +e;
        e = r(e);
        var n = u.test(e);
        return n || c.test(e) ? l(e.slice(2), n ? 2 : 8) : s.test(e) ? a : +e;
      }
      e.exports = f;
    },
    tQ2B: function(e, t, n) {
      'use strict';
      var r = n('xTJ+'),
        o = n('Rn+g'),
        i = n('MLWZ'),
        a = n('g7np'),
        s = n('w0Vi'),
        u = n('OTTw'),
        c = n('LYNF');
      e.exports = function(e) {
        return new Promise(function(t, l) {
          var f = e.data,
            p = e.headers;
          r.isFormData(f) && delete p['Content-Type'];
          var h = new XMLHttpRequest();
          if (e.auth) {
            var g = e.auth.username || '',
              d = e.auth.password || '';
            p.Authorization = 'Basic ' + btoa(g + ':' + d);
          }
          var v = a(e.baseURL, e.url);
          if (
            (h.open(
              e.method.toUpperCase(),
              i(v, e.params, e.paramsSerializer),
              !0,
            ),
            (h.timeout = e.timeout),
            (h.onreadystatechange = function() {
              if (
                h &&
                4 === h.readyState &&
                (0 !== h.status ||
                  (h.responseURL && 0 === h.responseURL.indexOf('file:')))
              ) {
                var n =
                    'getAllResponseHeaders' in h
                      ? s(h.getAllResponseHeaders())
                      : null,
                  r =
                    e.responseType && 'text' !== e.responseType
                      ? h.response
                      : h.responseText,
                  i = {
                    data: r,
                    status: h.status,
                    statusText: h.statusText,
                    headers: n,
                    config: e,
                    request: h,
                  };
                o(t, l, i), (h = null);
              }
            }),
            (h.onabort = function() {
              h && (l(c('Request aborted', e, 'ECONNABORTED', h)), (h = null));
            }),
            (h.onerror = function() {
              l(c('Network Error', e, null, h)), (h = null);
            }),
            (h.ontimeout = function() {
              var t = 'timeout of ' + e.timeout + 'ms exceeded';
              e.timeoutErrorMessage && (t = e.timeoutErrorMessage),
                l(c(t, e, 'ECONNABORTED', h)),
                (h = null);
            }),
            r.isStandardBrowserEnv())
          ) {
            var m = n('eqyj'),
              y =
                (e.withCredentials || u(v)) && e.xsrfCookieName
                  ? m.read(e.xsrfCookieName)
                  : void 0;
            y && (p[e.xsrfHeaderName] = y);
          }
          if (
            ('setRequestHeader' in h &&
              r.forEach(p, function(e, t) {
                'undefined' === typeof f && 'content-type' === t.toLowerCase()
                  ? delete p[t]
                  : h.setRequestHeader(t, e);
              }),
            r.isUndefined(e.withCredentials) ||
              (h.withCredentials = !!e.withCredentials),
            e.responseType)
          )
            try {
              h.responseType = e.responseType;
            } catch (b) {
              if ('json' !== e.responseType) throw b;
            }
          'function' === typeof e.onDownloadProgress &&
            h.addEventListener('progress', e.onDownloadProgress),
            'function' === typeof e.onUploadProgress &&
              h.upload &&
              h.upload.addEventListener('progress', e.onUploadProgress),
            e.cancelToken &&
              e.cancelToken.promise.then(function(e) {
                h && (h.abort(), l(e), (h = null));
              }),
            void 0 === f && (f = null),
            h.send(f);
        });
      };
    },
    vDqi: function(e, t, n) {
      e.exports = n('zuR4');
    },
    w0Vi: function(e, t, n) {
      'use strict';
      var r = n('xTJ+'),
        o = [
          'age',
          'authorization',
          'content-length',
          'content-type',
          'etag',
          'expires',
          'from',
          'host',
          'if-modified-since',
          'if-unmodified-since',
          'last-modified',
          'location',
          'max-forwards',
          'proxy-authorization',
          'referer',
          'retry-after',
          'user-agent',
        ];
      e.exports = function(e) {
        var t,
          n,
          i,
          a = {};
        return e
          ? (r.forEach(e.split('\n'), function(e) {
              if (
                ((i = e.indexOf(':')),
                (t = r.trim(e.substr(0, i)).toLowerCase()),
                (n = r.trim(e.substr(i + 1))),
                t)
              ) {
                if (a[t] && o.indexOf(t) >= 0) return;
                a[t] =
                  'set-cookie' === t
                    ? (a[t] ? a[t] : []).concat([n])
                    : a[t]
                    ? a[t] + ', ' + n
                    : n;
              }
            }),
            a)
          : a;
      };
    },
    xAGQ: function(e, t, n) {
      'use strict';
      var r = n('xTJ+');
      e.exports = function(e, t, n) {
        return (
          r.forEach(n, function(n) {
            e = n(e, t);
          }),
          e
        );
      };
    },
    'xTJ+': function(e, t, n) {
      'use strict';
      var r = n('HSsa'),
        o = Object.prototype.toString;
      function i(e) {
        return '[object Array]' === o.call(e);
      }
      function a(e) {
        return 'undefined' === typeof e;
      }
      function s(e) {
        return (
          null !== e &&
          !a(e) &&
          null !== e.constructor &&
          !a(e.constructor) &&
          'function' === typeof e.constructor.isBuffer &&
          e.constructor.isBuffer(e)
        );
      }
      function u(e) {
        return '[object ArrayBuffer]' === o.call(e);
      }
      function c(e) {
        return 'undefined' !== typeof FormData && e instanceof FormData;
      }
      function l(e) {
        var t;
        return (
          (t =
            'undefined' !== typeof ArrayBuffer && ArrayBuffer.isView
              ? ArrayBuffer.isView(e)
              : e && e.buffer && e.buffer instanceof ArrayBuffer),
          t
        );
      }
      function f(e) {
        return 'string' === typeof e;
      }
      function p(e) {
        return 'number' === typeof e;
      }
      function h(e) {
        return null !== e && 'object' === typeof e;
      }
      function g(e) {
        return '[object Date]' === o.call(e);
      }
      function d(e) {
        return '[object File]' === o.call(e);
      }
      function v(e) {
        return '[object Blob]' === o.call(e);
      }
      function m(e) {
        return '[object Function]' === o.call(e);
      }
      function y(e) {
        return h(e) && m(e.pipe);
      }
      function b(e) {
        return (
          'undefined' !== typeof URLSearchParams && e instanceof URLSearchParams
        );
      }
      function w(e) {
        return e.replace(/^\s*/, '').replace(/\s*$/, '');
      }
      function x() {
        return (
          ('undefined' === typeof navigator ||
            ('ReactNative' !== navigator.product &&
              'NativeScript' !== navigator.product &&
              'NS' !== navigator.product)) &&
          'undefined' !== typeof window && 'undefined' !== typeof document
        );
      }
      function k(e, t) {
        if (null !== e && 'undefined' !== typeof e)
          if (('object' !== typeof e && (e = [e]), i(e)))
            for (var n = 0, r = e.length; n < r; n++) t.call(null, e[n], n, e);
          else
            for (var o in e)
              Object.prototype.hasOwnProperty.call(e, o) &&
                t.call(null, e[o], o, e);
      }
      function O() {
        var e = {};
        function t(t, n) {
          'object' === typeof e[n] && 'object' === typeof t
            ? (e[n] = O(e[n], t))
            : (e[n] = t);
        }
        for (var n = 0, r = arguments.length; n < r; n++) k(arguments[n], t);
        return e;
      }
      function S() {
        var e = {};
        function t(t, n) {
          'object' === typeof e[n] && 'object' === typeof t
            ? (e[n] = S(e[n], t))
            : (e[n] = 'object' === typeof t ? S({}, t) : t);
        }
        for (var n = 0, r = arguments.length; n < r; n++) k(arguments[n], t);
        return e;
      }
      function L(e, t, n) {
        return (
          k(t, function(t, o) {
            e[o] = n && 'function' === typeof t ? r(t, n) : t;
          }),
          e
        );
      }
      e.exports = {
        isArray: i,
        isArrayBuffer: u,
        isBuffer: s,
        isFormData: c,
        isArrayBufferView: l,
        isString: f,
        isNumber: p,
        isObject: h,
        isUndefined: a,
        isDate: g,
        isFile: d,
        isBlob: v,
        isFunction: m,
        isStream: y,
        isURLSearchParams: b,
        isStandardBrowserEnv: x,
        forEach: k,
        merge: O,
        deepMerge: S,
        extend: L,
        trim: w,
      };
    },
    yK9s: function(e, t, n) {
      'use strict';
      var r = n('xTJ+');
      e.exports = function(e, t) {
        r.forEach(e, function(n, r) {
          r !== t &&
            r.toUpperCase() === t.toUpperCase() &&
            ((e[t] = n), delete e[r]);
        });
      };
    },
    zuR4: function(e, t, n) {
      'use strict';
      var r = n('xTJ+'),
        o = n('HSsa'),
        i = n('CgaS'),
        a = n('SntB'),
        s = n('JEQr');
      function u(e) {
        var t = new i(e),
          n = o(i.prototype.request, t);
        return r.extend(n, i.prototype, t), r.extend(n, t), n;
      }
      var c = u(s);
      (c.Axios = i),
        (c.create = function(e) {
          return u(a(c.defaults, e));
        }),
        (c.Cancel = n('endd')),
        (c.CancelToken = n('jfS+')),
        (c.isCancel = n('Lmem')),
        (c.all = function(e) {
          return Promise.all(e);
        }),
        (c.spread = n('DfZB')),
        (e.exports = c),
        (e.exports['default'] = c);
    },
  },
]);
