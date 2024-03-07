// Need to polyfill some Intl.locale support, since node doesn't include it in standard builds
// Adapted from here: https://polyfill.io/v3/polyfill.js?features=Intl.~locale.en-US,Intl.~locale.de,Intl.~locale.fr,Intl.~locale.en-GB&flags=always

(function (undefined) {
    // Intl
    !(function (e, r) {
        e.IntlPolyfill = r();
    })(this, function () {
        'use strict';

        function e(e) {
            if ('function' == typeof Math.log10)
                return Math.floor(Math.log10(e));
            var r = Math.round(Math.log(e) * Math.LOG10E);
            return r - (Number('1e' + r) > e);
        }

        function r(e) {
            for (var t in e)
                (e instanceof r || Me.call(e, t)) &&
                    Ie(this, t, {
                        value: e[t],
                        enumerable: !0,
                        writable: !0,
                        configurable: !0,
                    });
        }

        function t() {
            Ie(this, 'length', {
                writable: !0,
                value: 0,
            }),
                arguments.length && Ge.apply(this, qe.call(arguments));
        }

        function n() {
            if ($e.disableRegExpRestore) return function () {};
            for (
                var e = {
                        lastMatch: RegExp.lastMatch || '',
                        leftContext: RegExp.leftContext,
                        multiline: RegExp.multiline,
                        input: RegExp.input,
                    },
                    r = !1,
                    n = 1;
                n <= 9;
                n++
            )
                r = (e['$' + n] = RegExp['$' + n]) || r;
            return function () {
                var n = /[.?*+^$[\]\\(){}|-]/g,
                    a = e.lastMatch.replace(n, '\\$&'),
                    i = new t();
                if (r)
                    for (var o = 1; o <= 9; o++) {
                        var s = e['$' + o];
                        s
                            ? ((s = s.replace(n, '\\$&')),
                              (a = a.replace(s, '(' + s + ')')))
                            : (a = '()' + a),
                            Ge.call(i, a.slice(0, a.indexOf('(') + 1)),
                            (a = a.slice(a.indexOf('(') + 1));
                    }
                var l = Ze.call(i, '') + a;
                l = l.replace(/(\\\(|\\\)|[^()])+/g, function (e) {
                    return '[\\s\\S]{' + e.replace('\\', '').length + '}';
                });
                var c = new RegExp(l, e.multiline ? 'gm' : 'g');
                (c.lastIndex = e.leftContext.length), c.exec(e.input);
            };
        }

        function a(e) {
            if (null === e)
                throw new TypeError(
                    'Cannot convert null or undefined to object',
                );
            return 'object' ===
                ('undefined' == typeof e ? 'undefined' : Ne.typeof(e))
                ? e
                : Object(e);
        }

        function i(e) {
            return 'number' == typeof e ? e : Number(e);
        }

        function o(e) {
            var r = i(e);
            return isNaN(r)
                ? 0
                : 0 === r || r === -0 || r === +(1 / 0) || r === -(1 / 0)
                  ? r
                  : r < 0
                    ? Math.floor(Math.abs(r)) * -1
                    : Math.floor(Math.abs(r));
        }

        function s(e) {
            var r = o(e);
            return r <= 0
                ? 0
                : r === 1 / 0
                  ? Math.pow(2, 53) - 1
                  : Math.min(r, Math.pow(2, 53) - 1);
        }

        function l(e) {
            return Me.call(e, '__getInternalProperties')
                ? e.__getInternalProperties(Ke)
                : Re(null);
        }

        function c(e) {
            cr = e;
        }

        function u(e) {
            for (var r = e.length; r--; ) {
                var t = e.charAt(r);
                t >= 'a' &&
                    t <= 'z' &&
                    (e = e.slice(0, r) + t.toUpperCase() + e.slice(r + 1));
            }
            return e;
        }

        function g(e) {
            return !!ir.test(e) && !or.test(e) && !sr.test(e);
        }

        function f(e) {
            var r = void 0,
                t = void 0;
            (e = e.toLowerCase()), (t = e.split('-'));
            for (var n = 1, a = t.length; n < a; n++)
                if (2 === t[n].length) t[n] = t[n].toUpperCase();
                else if (4 === t[n].length)
                    t[n] = t[n].charAt(0).toUpperCase() + t[n].slice(1);
                else if (1 === t[n].length && 'x' !== t[n]) break;
            (e = Ze.call(t, '-')),
                (r = e.match(lr)) &&
                    r.length > 1 &&
                    (r.sort(),
                    (e = e.replace(
                        RegExp('(?:' + lr.source + ')+', 'i'),
                        Ze.call(r, ''),
                    ))),
                Me.call(ur.tags, e) && (e = ur.tags[e]),
                (t = e.split('-'));
            for (var i = 1, o = t.length; i < o; i++)
                Me.call(ur.subtags, t[i])
                    ? (t[i] = ur.subtags[t[i]])
                    : Me.call(ur.extLang, t[i]) &&
                      ((t[i] = ur.extLang[t[i]][0]),
                      1 === i &&
                          ur.extLang[t[1]][1] === t[0] &&
                          ((t = qe.call(t, i++)), (o -= 1)));
            return Ze.call(t, '-');
        }

        function m() {
            return cr;
        }

        function v(e) {
            var r = String(e),
                t = u(r);
            return gr.test(t) !== !1;
        }

        function d(e) {
            if (void 0 === e) return new t();
            var r = new t();
            e = 'string' == typeof e ? [e] : e;
            for (var n = a(e), i = s(n.length), o = 0; o < i; ) {
                var l = String(o),
                    c = l in n;
                if (c) {
                    var u = n[l];
                    if (
                        null === u ||
                        ('string' != typeof u &&
                            'object' !==
                                ('undefined' == typeof u
                                    ? 'undefined'
                                    : Ne.typeof(u)))
                    )
                        throw new TypeError('String or Object type expected');
                    var m = String(u);
                    if (!g(m))
                        throw new RangeError(
                            "'" +
                                m +
                                "' is not a structurally valid language tag",
                        );
                    (m = f(m)), Ae.call(r, m) === -1 && Ge.call(r, m);
                }
                o++;
            }
            return r;
        }

        function h(e, r) {
            for (var t = r; t; ) {
                if (Ae.call(e, t) > -1) return t;
                var n = t.lastIndexOf('-');
                if (n < 0) return;
                n >= 2 && '-' === t.charAt(n - 2) && (n -= 2),
                    (t = t.substring(0, n));
            }
        }

        function p(e, t) {
            for (
                var n = 0, a = t.length, i = void 0, o = void 0, s = void 0;
                n < a && !i;

            )
                (o = t[n]), (s = String(o).replace(fr, '')), (i = h(e, s)), n++;
            var l = new r();
            if (void 0 !== i) {
                if (((l['[[locale]]'] = i), String(o) !== String(s))) {
                    var c = o.match(fr)[0],
                        u = o.indexOf('-u-');
                    (l['[[extension]]'] = c), (l['[[extensionIndex]]'] = u);
                }
            } else l['[[locale]]'] = m();
            return l;
        }

        function y(e, r) {
            return p(e, r);
        }

        function b(e, t, n, a, i) {
            if (0 === e.length)
                throw new ReferenceError(
                    'No locale data has been provided for this object yet.',
                );
            var o = n['[[localeMatcher]]'],
                s = void 0;
            s = 'lookup' === o ? p(e, t) : y(e, t);
            var l = s['[[locale]]'],
                c = void 0,
                u = void 0;
            if (Me.call(s, '[[extension]]')) {
                var g = s['[[extension]]'],
                    m = String.prototype.split;
                (c = m.call(g, '-')), (u = c.length);
            }
            var v = new r();
            v['[[dataLocale]]'] = l;
            for (var d = '-u', h = 0, b = a.length; h < b; ) {
                var w = a[h],
                    x = i[l],
                    j = x[w],
                    D = j[0],
                    z = '',
                    k = Ae;
                if (void 0 !== c) {
                    var O = k.call(c, w);
                    if (O !== -1)
                        if (O + 1 < u && c[O + 1].length > 2) {
                            var F = c[O + 1],
                                S = k.call(j, F);
                            S !== -1 && ((D = F), (z = '-' + w + '-' + D));
                        } else {
                            var E = k(j, 'true');
                            E !== -1 && (D = 'true');
                        }
                }
                if (Me.call(n, '[[' + w + ']]')) {
                    var L = n['[[' + w + ']]'];
                    k.call(j, L) !== -1 && L !== D && ((D = L), (z = ''));
                }
                (v['[[' + w + ']]'] = D), (d += z), h++;
            }
            if (d.length > 2) {
                var P = l.indexOf('-x-');
                if (P === -1) l += d;
                else {
                    var N = l.substring(0, P),
                        T = l.substring(P);
                    l = N + d + T;
                }
                l = f(l);
            }
            return (v['[[locale]]'] = l), v;
        }

        function w(e, r) {
            for (var n = r.length, a = new t(), i = 0; i < n; ) {
                var o = r[i],
                    s = String(o).replace(fr, ''),
                    l = h(e, s);
                void 0 !== l && Ge.call(a, o), i++;
            }
            var c = qe.call(a);
            return c;
        }

        function x(e, r) {
            return w(e, r);
        }

        function j(e, t, n) {
            var i = void 0,
                o = void 0;
            if (
                void 0 !== n &&
                ((n = new r(a(n))),
                (i = n.localeMatcher),
                void 0 !== i &&
                    ((i = String(i)), 'lookup' !== i && 'best fit' !== i))
            )
                throw new RangeError(
                    'matcher should be "lookup" or "best fit"',
                );
            o = void 0 === i || 'best fit' === i ? x(e, t) : w(e, t);
            for (var s in o)
                Me.call(o, s) &&
                    Ie(o, s, {
                        writable: !1,
                        configurable: !1,
                        value: o[s],
                    });
            return (
                Ie(o, 'length', {
                    writable: !1,
                }),
                o
            );
        }

        function D(e, r, t, n, a) {
            var i = e[r];
            if (void 0 !== i) {
                if (
                    ((i =
                        'boolean' === t
                            ? Boolean(i)
                            : 'string' === t
                              ? String(i)
                              : i),
                    void 0 !== n && Ae.call(n, i) === -1)
                )
                    throw new RangeError(
                        "'" + i + "' is not an allowed value for `" + r + '`',
                    );
                return i;
            }
            return a;
        }

        function z(e, r, t, n, a) {
            var i = e[r];
            if (void 0 !== i) {
                if (((i = Number(i)), isNaN(i) || i < t || i > n))
                    throw new RangeError(
                        'Value is not a number or outside accepted range',
                    );
                return Math.floor(i);
            }
            return a;
        }

        function k(e) {
            for (var r = d(e), t = [], n = r.length, a = 0; a < n; )
                (t[a] = r[a]), a++;
            return t;
        }

        function O() {
            var e = arguments[0],
                r = arguments[1];
            return this && this !== mr
                ? F(a(this), e, r)
                : new mr.NumberFormat(e, r);
        }

        function F(e, i, o) {
            var s = l(e),
                c = n();
            if (s['[[initializedIntlObject]]'] === !0)
                throw new TypeError(
                    '`this` object has already been initialized as an Intl object',
                );
            Ie(e, '__getInternalProperties', {
                value: function () {
                    if (arguments[0] === Ke) return s;
                },
            }),
                (s['[[initializedIntlObject]]'] = !0);
            var u = d(i);
            o = void 0 === o ? {} : a(o);
            var g = new r(),
                f = D(
                    o,
                    'localeMatcher',
                    'string',
                    new t('lookup', 'best fit'),
                    'best fit',
                );
            g['[[localeMatcher]]'] = f;
            var m = $e.NumberFormat['[[localeData]]'],
                h = b(
                    $e.NumberFormat['[[availableLocales]]'],
                    u,
                    g,
                    $e.NumberFormat['[[relevantExtensionKeys]]'],
                    m,
                );
            (s['[[locale]]'] = h['[[locale]]']),
                (s['[[numberingSystem]]'] = h['[[nu]]']),
                (s['[[dataLocale]]'] = h['[[dataLocale]]']);
            var p = h['[[dataLocale]]'],
                y = D(
                    o,
                    'style',
                    'string',
                    new t('decimal', 'percent', 'currency'),
                    'decimal',
                );
            s['[[style]]'] = y;
            var w = D(o, 'currency', 'string');
            if (void 0 !== w && !v(w))
                throw new RangeError(
                    "'" + w + "' is not a valid currency code",
                );
            if ('currency' === y && void 0 === w)
                throw new TypeError(
                    'Currency code is required when style is currency',
                );
            var x = void 0;
            'currency' === y &&
                ((w = w.toUpperCase()), (s['[[currency]]'] = w), (x = S(w)));
            var j = D(
                o,
                'currencyDisplay',
                'string',
                new t('code', 'symbol', 'name'),
                'symbol',
            );
            'currency' === y && (s['[[currencyDisplay]]'] = j);
            var k = z(o, 'minimumIntegerDigits', 1, 21, 1);
            s['[[minimumIntegerDigits]]'] = k;
            var O = 'currency' === y ? x : 0,
                F = z(o, 'minimumFractionDigits', 0, 20, O);
            s['[[minimumFractionDigits]]'] = F;
            var L =
                    'currency' === y
                        ? Math.max(F, x)
                        : 'percent' === y
                          ? Math.max(F, 0)
                          : Math.max(F, 3),
                P = z(o, 'maximumFractionDigits', F, 20, L);
            s['[[maximumFractionDigits]]'] = P;
            var N = o.minimumSignificantDigits,
                T = o.maximumSignificantDigits;
            (void 0 === N && void 0 === T) ||
                ((N = z(o, 'minimumSignificantDigits', 1, 21, 1)),
                (T = z(o, 'maximumSignificantDigits', N, 21, 21)),
                (s['[[minimumSignificantDigits]]'] = N),
                (s['[[maximumSignificantDigits]]'] = T));
            var _ = D(o, 'useGrouping', 'boolean', void 0, !0);
            s['[[useGrouping]]'] = _;
            var M = m[p],
                I = M.patterns,
                A = I[y];
            return (
                (s['[[positivePattern]]'] = A.positivePattern),
                (s['[[negativePattern]]'] = A.negativePattern),
                (s['[[boundFormat]]'] = void 0),
                (s['[[initializedNumberFormat]]'] = !0),
                _e && (e.format = E.call(e)),
                c(),
                e
            );
        }

        function S(e) {
            return void 0 !== vr[e] ? vr[e] : 2;
        }

        function E() {
            var e = null !== this && 'object' === Ne.typeof(this) && l(this);
            if (!e || !e['[[initializedNumberFormat]]'])
                throw new TypeError(
                    '`this` value for format() is not an initialized Intl.NumberFormat object.',
                );
            if (void 0 === e['[[boundFormat]]']) {
                var r = function (e) {
                        return T(this, Number(e));
                    },
                    t = Ue.call(r, this);
                e['[[boundFormat]]'] = t;
            }
            return e['[[boundFormat]]'];
        }

        function L() {
            var e =
                    arguments.length <= 0 || void 0 === arguments[0]
                        ? void 0
                        : arguments[0],
                r = null !== this && 'object' === Ne.typeof(this) && l(this);
            if (!r || !r['[[initializedNumberFormat]]'])
                throw new TypeError(
                    '`this` value for formatToParts() is not an initialized Intl.NumberFormat object.',
                );
            var t = Number(e);
            return P(this, t);
        }

        function P(e, r) {
            for (var t = N(e, r), n = [], a = 0, i = 0; t.length > i; i++) {
                var o = t[i],
                    s = {};
                (s.type = o['[[type]]']),
                    (s.value = o['[[value]]']),
                    (n[a] = s),
                    (a += 1);
            }
            return n;
        }

        function N(e, r) {
            var n = l(e),
                a = n['[[dataLocale]]'],
                i = n['[[numberingSystem]]'],
                o = $e.NumberFormat['[[localeData]]'][a],
                s = o.symbols[i] || o.symbols.latn,
                c = void 0;
            !isNaN(r) && r < 0
                ? ((r = -r), (c = n['[[negativePattern]]']))
                : (c = n['[[positivePattern]]']);
            for (
                var u = new t(),
                    g = c.indexOf('{', 0),
                    f = 0,
                    m = 0,
                    v = c.length;
                g > -1 && g < v;

            ) {
                if (((f = c.indexOf('}', g)), f === -1)) throw new Error();
                if (g > m) {
                    var d = c.substring(m, g);
                    Ge.call(u, {
                        '[[type]]': 'literal',
                        '[[value]]': d,
                    });
                }
                var h = c.substring(g + 1, f);
                if ('number' === h)
                    if (isNaN(r)) {
                        var p = s.nan;
                        Ge.call(u, {
                            '[[type]]': 'nan',
                            '[[value]]': p,
                        });
                    } else if (isFinite(r)) {
                        'percent' === n['[[style]]'] &&
                            isFinite(r) &&
                            (r *= 100);
                        var y = void 0;
                        (y =
                            Me.call(n, '[[minimumSignificantDigits]]') &&
                            Me.call(n, '[[maximumSignificantDigits]]')
                                ? _(
                                      r,
                                      n['[[minimumSignificantDigits]]'],
                                      n['[[maximumSignificantDigits]]'],
                                  )
                                : M(
                                      r,
                                      n['[[minimumIntegerDigits]]'],
                                      n['[[minimumFractionDigits]]'],
                                      n['[[maximumFractionDigits]]'],
                                  )),
                            dr[i]
                                ? !(function () {
                                      var e = dr[i];
                                      y = String(y).replace(
                                          /\d/g,
                                          function (r) {
                                              return e[r];
                                          },
                                      );
                                  })()
                                : (y = String(y));
                        var b = void 0,
                            w = void 0,
                            x = y.indexOf('.', 0);
                        if (
                            (x > 0
                                ? ((b = y.substring(0, x)),
                                  (w = y.substring(x + 1, x.length)))
                                : ((b = y), (w = void 0)),
                            n['[[useGrouping]]'] === !0)
                        ) {
                            var j = s.group,
                                D = [],
                                z = o.patterns.primaryGroupSize || 3,
                                k = o.patterns.secondaryGroupSize || z;
                            if (b.length > z) {
                                var O = b.length - z,
                                    F = O % k,
                                    S = b.slice(0, F);
                                for (S.length && Ge.call(D, S); F < O; )
                                    Ge.call(D, b.slice(F, F + k)), (F += k);
                                Ge.call(D, b.slice(O));
                            } else Ge.call(D, b);
                            if (0 === D.length) throw new Error();
                            for (; D.length; ) {
                                var E = Be.call(D);
                                Ge.call(u, {
                                    '[[type]]': 'integer',
                                    '[[value]]': E,
                                }),
                                    D.length &&
                                        Ge.call(u, {
                                            '[[type]]': 'group',
                                            '[[value]]': j,
                                        });
                            }
                        } else
                            Ge.call(u, {
                                '[[type]]': 'integer',
                                '[[value]]': b,
                            });
                        if (void 0 !== w) {
                            var L = s.decimal;
                            Ge.call(u, {
                                '[[type]]': 'decimal',
                                '[[value]]': L,
                            }),
                                Ge.call(u, {
                                    '[[type]]': 'fraction',
                                    '[[value]]': w,
                                });
                        }
                    } else {
                        var P = s.infinity;
                        Ge.call(u, {
                            '[[type]]': 'infinity',
                            '[[value]]': P,
                        });
                    }
                else if ('plusSign' === h) {
                    var N = s.plusSign;
                    Ge.call(u, {
                        '[[type]]': 'plusSign',
                        '[[value]]': N,
                    });
                } else if ('minusSign' === h) {
                    var T = s.minusSign;
                    Ge.call(u, {
                        '[[type]]': 'minusSign',
                        '[[value]]': T,
                    });
                } else if (
                    'percentSign' === h &&
                    'percent' === n['[[style]]']
                ) {
                    var I = s.percentSign;
                    Ge.call(u, {
                        '[[type]]': 'literal',
                        '[[value]]': I,
                    });
                } else if ('currency' === h && 'currency' === n['[[style]]']) {
                    var A = n['[[currency]]'],
                        R = void 0;
                    'code' === n['[[currencyDisplay]]']
                        ? (R = A)
                        : 'symbol' === n['[[currencyDisplay]]']
                          ? (R = o.currencies[A] || A)
                          : 'name' === n['[[currencyDisplay]]'] && (R = A),
                        Ge.call(u, {
                            '[[type]]': 'currency',
                            '[[value]]': R,
                        });
                } else {
                    var q = c.substring(g, f);
                    Ge.call(u, {
                        '[[type]]': 'literal',
                        '[[value]]': q,
                    });
                }
                (m = f + 1), (g = c.indexOf('{', m));
            }
            if (m < v) {
                var C = c.substring(m, v);
                Ge.call(u, {
                    '[[type]]': 'literal',
                    '[[value]]': C,
                });
            }
            return u;
        }

        function T(e, r) {
            for (var t = N(e, r), n = '', a = 0; t.length > a; a++) {
                var i = t[a];
                n += i['[[value]]'];
            }
            return n;
        }

        function _(r, t, n) {
            var a = n,
                i = void 0,
                o = void 0;
            if (0 === r) (i = Ze.call(Array(a + 1), '0')), (o = 0);
            else {
                o = e(Math.abs(r));
                var s = Math.round(Math.exp(Math.abs(o - a + 1) * Math.LN10));
                i = String(Math.round(o - a + 1 < 0 ? r * s : r / s));
            }
            if (o >= a) return i + Ze.call(Array(o - a + 1 + 1), '0');
            if (o === a - 1) return i;
            if (
                (o >= 0
                    ? (i = i.slice(0, o + 1) + '.' + i.slice(o + 1))
                    : o < 0 &&
                      (i = '0.' + Ze.call(Array(-(o + 1) + 1), '0') + i),
                i.indexOf('.') >= 0 && n > t)
            ) {
                for (var l = n - t; l > 0 && '0' === i.charAt(i.length - 1); )
                    (i = i.slice(0, -1)), l--;
                '.' === i.charAt(i.length - 1) && (i = i.slice(0, -1));
            }
            return i;
        }

        function M(e, r, t, n) {
            var a = n,
                i = Math.pow(10, a) * e,
                o = 0 === i ? '0' : i.toFixed(0),
                s = void 0,
                l = (s = o.indexOf('e')) > -1 ? o.slice(s + 1) : 0;
            l &&
                ((o = o.slice(0, s).replace('.', '')),
                (o += Ze.call(Array(l - (o.length - 1) + 1), '0')));
            var c = void 0;
            if (0 !== a) {
                var u = o.length;
                if (u <= a) {
                    var g = Ze.call(Array(a + 1 - u + 1), '0');
                    (o = g + o), (u = a + 1);
                }
                var f = o.substring(0, u - a),
                    m = o.substring(u - a, o.length);
                (o = f + '.' + m), (c = f.length);
            } else c = o.length;
            for (var v = n - t; v > 0 && '0' === o.slice(-1); )
                (o = o.slice(0, -1)), v--;
            if (('.' === o.slice(-1) && (o = o.slice(0, -1)), c < r)) {
                var d = Ze.call(Array(r - c + 1), '0');
                o = d + o;
            }
            return o;
        }

        function I(e) {
            for (var r = 0; r < wr.length; r += 1)
                if (e.hasOwnProperty(wr[r])) return !1;
            return !0;
        }

        function A(e) {
            for (var r = 0; r < br.length; r += 1)
                if (e.hasOwnProperty(br[r])) return !1;
            return !0;
        }

        function R(e, r) {
            for (
                var t = {
                        _: {},
                    },
                    n = 0;
                n < br.length;
                n += 1
            )
                e[br[n]] && (t[br[n]] = e[br[n]]),
                    e._[br[n]] && (t._[br[n]] = e._[br[n]]);
            for (var a = 0; a < wr.length; a += 1)
                r[wr[a]] && (t[wr[a]] = r[wr[a]]),
                    r._[wr[a]] && (t._[wr[a]] = r._[wr[a]]);
            return t;
        }

        function q(e) {
            return (
                (e.pattern12 = e.extendedPattern.replace(
                    /'([^']*)'/g,
                    function (e, r) {
                        return r ? r : "'";
                    },
                )),
                (e.pattern = e.pattern12.replace('{ampm}', '').replace(pr, '')),
                e
            );
        }

        function C(e, r) {
            switch (e.charAt(0)) {
                case 'G':
                    return (
                        (r.era = ['short', 'short', 'short', 'long', 'narrow'][
                            e.length - 1
                        ]),
                        '{era}'
                    );
                case 'y':
                case 'Y':
                case 'u':
                case 'U':
                case 'r':
                    return (
                        (r.year = 2 === e.length ? '2-digit' : 'numeric'),
                        '{year}'
                    );
                case 'Q':
                case 'q':
                    return (
                        (r.quarter = [
                            'numeric',
                            '2-digit',
                            'short',
                            'long',
                            'narrow',
                        ][e.length - 1]),
                        '{quarter}'
                    );
                case 'M':
                case 'L':
                    return (
                        (r.month = [
                            'numeric',
                            '2-digit',
                            'short',
                            'long',
                            'narrow',
                        ][e.length - 1]),
                        '{month}'
                    );
                case 'w':
                    return (
                        (r.week = 2 === e.length ? '2-digit' : 'numeric'),
                        '{weekday}'
                    );
                case 'W':
                    return (r.week = 'numeric'), '{weekday}';
                case 'd':
                    return (
                        (r.day = 2 === e.length ? '2-digit' : 'numeric'),
                        '{day}'
                    );
                case 'D':
                case 'F':
                case 'g':
                    return (r.day = 'numeric'), '{day}';
                case 'E':
                    return (
                        (r.weekday = [
                            'short',
                            'short',
                            'short',
                            'long',
                            'narrow',
                            'short',
                        ][e.length - 1]),
                        '{weekday}'
                    );
                case 'e':
                    return (
                        (r.weekday = [
                            'numeric',
                            '2-digit',
                            'short',
                            'long',
                            'narrow',
                            'short',
                        ][e.length - 1]),
                        '{weekday}'
                    );
                case 'c':
                    return (
                        (r.weekday = [
                            'numeric',
                            void 0,
                            'short',
                            'long',
                            'narrow',
                            'short',
                        ][e.length - 1]),
                        '{weekday}'
                    );
                case 'a':
                case 'b':
                case 'B':
                    return (r.hour12 = !0), '{ampm}';
                case 'h':
                case 'H':
                    return (
                        (r.hour = 2 === e.length ? '2-digit' : 'numeric'),
                        '{hour}'
                    );
                case 'k':
                case 'K':
                    return (
                        (r.hour12 = !0),
                        (r.hour = 2 === e.length ? '2-digit' : 'numeric'),
                        '{hour}'
                    );
                case 'm':
                    return (
                        (r.minute = 2 === e.length ? '2-digit' : 'numeric'),
                        '{minute}'
                    );
                case 's':
                    return (
                        (r.second = 2 === e.length ? '2-digit' : 'numeric'),
                        '{second}'
                    );
                case 'S':
                case 'A':
                    return (r.second = 'numeric'), '{second}';
                case 'z':
                case 'Z':
                case 'O':
                case 'v':
                case 'V':
                case 'X':
                case 'x':
                    return (
                        (r.timeZoneName = e.length < 4 ? 'short' : 'long'),
                        '{timeZoneName}'
                    );
            }
        }

        function G(e, r) {
            if (!yr.test(r)) {
                var t = {
                    originalPattern: r,
                    _: {},
                };
                return (
                    (t.extendedPattern = r.replace(hr, function (e) {
                        return C(e, t._);
                    })),
                    e.replace(hr, function (e) {
                        return C(e, t);
                    }),
                    q(t)
                );
            }
        }

        function Z(e) {
            var r = e.availableFormats,
                t = e.timeFormats,
                n = e.dateFormats,
                a = [],
                i = void 0,
                o = void 0,
                s = void 0,
                l = void 0,
                c = void 0,
                u = [],
                g = [];
            for (i in r)
                r.hasOwnProperty(i) &&
                    ((o = r[i]),
                    (s = G(i, o)),
                    s && (a.push(s), I(s) ? g.push(s) : A(s) && u.push(s)));
            for (i in t)
                t.hasOwnProperty(i) &&
                    ((o = t[i]), (s = G(i, o)), s && (a.push(s), u.push(s)));
            for (i in n)
                n.hasOwnProperty(i) &&
                    ((o = n[i]), (s = G(i, o)), s && (a.push(s), g.push(s)));
            for (l = 0; l < u.length; l += 1)
                for (c = 0; c < g.length; c += 1)
                    (o =
                        'long' === g[c].month
                            ? g[c].weekday
                                ? e.full
                                : e.long
                            : 'short' === g[c].month
                              ? e.medium
                              : e.short),
                        (s = R(g[c], u[l])),
                        (s.originalPattern = o),
                        (s.extendedPattern = o
                            .replace('{0}', u[l].extendedPattern)
                            .replace('{1}', g[c].extendedPattern)
                            .replace(/^[,\s]+|[,\s]+$/gi, '')),
                        a.push(q(s));
            return a;
        }

        function B(e, r) {
            if (xr[e] && xr[e][r]) {
                var t;
                return (
                    (t = {
                        originalPattern: xr[e][r],
                        _: ge({}, e, r),
                        extendedPattern: '{' + e + '}',
                    }),
                    ge(t, e, r),
                    ge(t, 'pattern12', '{' + e + '}'),
                    ge(t, 'pattern', '{' + e + '}'),
                    t
                );
            }
        }

        function U(e, r, t, n, a) {
            var i = e[r] && e[r][t] ? e[r][t] : e.gregory[t],
                o = {
                    narrow: ['short', 'long'],
                    short: ['long', 'narrow'],
                    long: ['short', 'narrow'],
                },
                s = Me.call(i, n)
                    ? i[n]
                    : Me.call(i, o[n][0])
                      ? i[o[n][0]]
                      : i[o[n][1]];
            return null !== a ? s[a] : s;
        }

        function $() {
            var e = arguments[0],
                r = arguments[1];
            return this && this !== mr
                ? K(a(this), e, r)
                : new mr.DateTimeFormat(e, r);
        }

        function K(e, a, i) {
            var o = l(e),
                s = n();
            if (o['[[initializedIntlObject]]'] === !0)
                throw new TypeError(
                    '`this` object has already been initialized as an Intl object',
                );
            Ie(e, '__getInternalProperties', {
                value: function () {
                    if (arguments[0] === Ke) return o;
                },
            }),
                (o['[[initializedIntlObject]]'] = !0);
            var c = d(a);
            i = H(i, 'any', 'date');
            var g = new r(),
                f = D(
                    i,
                    'localeMatcher',
                    'string',
                    new t('lookup', 'best fit'),
                    'best fit',
                );
            g['[[localeMatcher]]'] = f;
            var m = $e.DateTimeFormat,
                v = m['[[localeData]]'],
                h = b(
                    m['[[availableLocales]]'],
                    c,
                    g,
                    m['[[relevantExtensionKeys]]'],
                    v,
                );
            (o['[[locale]]'] = h['[[locale]]']),
                (o['[[calendar]]'] = h['[[ca]]']),
                (o['[[numberingSystem]]'] = h['[[nu]]']),
                (o['[[dataLocale]]'] = h['[[dataLocale]]']);
            var p = h['[[dataLocale]]'],
                y = i.timeZone;
            if (void 0 !== y && ((y = u(y)), 'UTC' !== y))
                throw new RangeError('timeZone is not supported.');
            (o['[[timeZone]]'] = y), (g = new r());
            for (var w in Dr)
                if (Me.call(Dr, w)) {
                    var x = D(i, w, 'string', Dr[w]);
                    g['[[' + w + ']]'] = x;
                }
            var j = void 0,
                z = v[p],
                k = Y(z.formats);
            if (
                ((f = D(
                    i,
                    'formatMatcher',
                    'string',
                    new t('basic', 'best fit'),
                    'best fit',
                )),
                (z.formats = k),
                'basic' === f)
            )
                j = W(g, k);
            else {
                var O = D(i, 'hour12', 'boolean');
                (g.hour12 = void 0 === O ? z.hour12 : O), (j = X(g, k));
            }
            for (var F in Dr)
                if (Me.call(Dr, F) && Me.call(j, F)) {
                    var S = j[F];
                    (S = j._ && Me.call(j._, F) ? j._[F] : S),
                        (o['[[' + F + ']]'] = S);
                }
            var E = void 0,
                L = D(i, 'hour12', 'boolean');
            if (o['[[hour]]'])
                if (
                    ((L = void 0 === L ? z.hour12 : L),
                    (o['[[hour12]]'] = L),
                    L === !0)
                ) {
                    var P = z.hourNo0;
                    (o['[[hourNo0]]'] = P), (E = j.pattern12);
                } else E = j.pattern;
            else E = j.pattern;
            return (
                (o['[[pattern]]'] = E),
                (o['[[boundFormat]]'] = void 0),
                (o['[[initializedDateTimeFormat]]'] = !0),
                _e && (e.format = V.call(e)),
                s(),
                e
            );
        }

        function Y(e) {
            return '[object Array]' === Object.prototype.toString.call(e)
                ? e
                : Z(e);
        }

        function H(e, t, n) {
            if (void 0 === e) e = null;
            else {
                var i = a(e);
                e = new r();
                for (var o in i) e[o] = i[o];
            }
            var s = Re;
            e = s(e);
            var l = !0;
            return (
                ('date' !== t && 'any' !== t) ||
                    (void 0 === e.weekday &&
                        void 0 === e.year &&
                        void 0 === e.month &&
                        void 0 === e.day) ||
                    (l = !1),
                ('time' !== t && 'any' !== t) ||
                    (void 0 === e.hour &&
                        void 0 === e.minute &&
                        void 0 === e.second) ||
                    (l = !1),
                !l ||
                    ('date' !== n && 'all' !== n) ||
                    (e.year = e.month = e.day = 'numeric'),
                !l ||
                    ('time' !== n && 'all' !== n) ||
                    (e.hour = e.minute = e.second = 'numeric'),
                e
            );
        }

        function W(e, r) {
            for (
                var t = 120,
                    n = 20,
                    a = 8,
                    i = 6,
                    o = 6,
                    s = 3,
                    l = -(1 / 0),
                    c = void 0,
                    u = 0,
                    g = r.length;
                u < g;

            ) {
                var f = r[u],
                    m = 0;
                for (var v in Dr)
                    if (Me.call(Dr, v)) {
                        var d = e['[[' + v + ']]'],
                            h = Me.call(f, v) ? f[v] : void 0;
                        if (void 0 === d && void 0 !== h) m -= n;
                        else if (void 0 !== d && void 0 === h) m -= t;
                        else {
                            var p = [
                                    '2-digit',
                                    'numeric',
                                    'narrow',
                                    'short',
                                    'long',
                                ],
                                y = Ae.call(p, d),
                                b = Ae.call(p, h),
                                w = Math.max(Math.min(b - y, 2), -2);
                            2 === w
                                ? (m -= i)
                                : 1 === w
                                  ? (m -= s)
                                  : w === -1
                                    ? (m -= o)
                                    : w === -2 && (m -= a);
                        }
                    }
                m > l && ((l = m), (c = f)), u++;
            }
            return c;
        }

        function X(e, r) {
            var t = [];
            for (var n in Dr)
                Me.call(Dr, n) && void 0 !== e['[[' + n + ']]'] && t.push(n);
            if (1 === t.length) {
                var a = B(t[0], e['[[' + t[0] + ']]']);
                if (a) return a;
            }
            for (
                var i = 120,
                    o = 20,
                    s = 8,
                    l = 6,
                    c = 6,
                    u = 3,
                    g = 2,
                    f = 1,
                    m = -(1 / 0),
                    v = void 0,
                    d = 0,
                    h = r.length;
                d < h;

            ) {
                var p = r[d],
                    y = 0;
                for (var b in Dr)
                    if (Me.call(Dr, b)) {
                        var w = e['[[' + b + ']]'],
                            x = Me.call(p, b) ? p[b] : void 0,
                            j = Me.call(p._, b) ? p._[b] : void 0;
                        if ((w !== j && (y -= g), void 0 === w && void 0 !== x))
                            y -= o;
                        else if (void 0 !== w && void 0 === x) y -= i;
                        else {
                            var D = [
                                    '2-digit',
                                    'numeric',
                                    'narrow',
                                    'short',
                                    'long',
                                ],
                                z = Ae.call(D, w),
                                k = Ae.call(D, x),
                                O = Math.max(Math.min(k - z, 2), -2);
                            (k <= 1 && z >= 2) || (k >= 2 && z <= 1)
                                ? O > 0
                                    ? (y -= l)
                                    : O < 0 && (y -= s)
                                : O > 1
                                  ? (y -= u)
                                  : O < -1 && (y -= c);
                        }
                    }
                p._.hour12 !== e.hour12 && (y -= f),
                    y > m && ((m = y), (v = p)),
                    d++;
            }
            return v;
        }

        function V() {
            var e = null !== this && 'object' === Ne.typeof(this) && l(this);
            if (!e || !e['[[initializedDateTimeFormat]]'])
                throw new TypeError(
                    '`this` value for format() is not an initialized Intl.DateTimeFormat object.',
                );
            if (void 0 === e['[[boundFormat]]']) {
                var r = function () {
                        var e =
                                arguments.length <= 0 || void 0 === arguments[0]
                                    ? void 0
                                    : arguments[0],
                            r = void 0 === e ? Date.now() : i(e);
                        return ee(this, r);
                    },
                    t = Ue.call(r, this);
                e['[[boundFormat]]'] = t;
            }
            return e['[[boundFormat]]'];
        }

        function J() {
            var e =
                    arguments.length <= 0 || void 0 === arguments[0]
                        ? void 0
                        : arguments[0],
                r = null !== this && 'object' === Ne.typeof(this) && l(this);
            if (!r || !r['[[initializedDateTimeFormat]]'])
                throw new TypeError(
                    '`this` value for formatToParts() is not an initialized Intl.DateTimeFormat object.',
                );
            var t = void 0 === e ? Date.now() : i(e);
            return re(this, t);
        }

        function Q(e, r) {
            if (!isFinite(r))
                throw new RangeError('Invalid valid date passed to format');
            var a = e.__getInternalProperties(Ke);
            n();
            for (
                var i = a['[[locale]]'],
                    o = new mr.NumberFormat([i], {
                        useGrouping: !1,
                    }),
                    s = new mr.NumberFormat([i], {
                        minimumIntegerDigits: 2,
                        useGrouping: !1,
                    }),
                    l = te(r, a['[[calendar]]'], a['[[timeZone]]']),
                    c = a['[[pattern]]'],
                    u = new t(),
                    g = 0,
                    f = c.indexOf('{'),
                    m = 0,
                    v = a['[[dataLocale]]'],
                    d = $e.DateTimeFormat['[[localeData]]'][v].calendars,
                    h = a['[[calendar]]'];
                f !== -1;

            ) {
                var p = void 0;
                if (((m = c.indexOf('}', f)), m === -1))
                    throw new Error('Unclosed pattern');
                f > g &&
                    Ge.call(u, {
                        type: 'literal',
                        value: c.substring(g, f),
                    });
                var y = c.substring(f + 1, m);
                if (Dr.hasOwnProperty(y)) {
                    var b = a['[[' + y + ']]'],
                        w = l['[[' + y + ']]'];
                    if (
                        ('year' === y && w <= 0
                            ? (w = 1 - w)
                            : 'month' === y
                              ? w++
                              : 'hour' === y &&
                                a['[[hour12]]'] === !0 &&
                                ((w %= 12),
                                0 === w && a['[[hourNo0]]'] === !0 && (w = 12)),
                        'numeric' === b)
                    )
                        p = T(o, w);
                    else if ('2-digit' === b)
                        (p = T(s, w)), p.length > 2 && (p = p.slice(-2));
                    else if (b in jr)
                        switch (y) {
                            case 'month':
                                p = U(d, h, 'months', b, l['[[' + y + ']]']);
                                break;
                            case 'weekday':
                                try {
                                    p = U(d, h, 'days', b, l['[[' + y + ']]']);
                                } catch (e) {
                                    throw new Error(
                                        'Could not find weekday data for locale ' +
                                            i,
                                    );
                                }
                                break;
                            case 'timeZoneName':
                                p = '';
                                break;
                            case 'era':
                                try {
                                    p = U(d, h, 'eras', b, l['[[' + y + ']]']);
                                } catch (e) {
                                    throw new Error(
                                        'Could not find era data for locale ' +
                                            i,
                                    );
                                }
                                break;
                            default:
                                p = l['[[' + y + ']]'];
                        }
                    Ge.call(u, {
                        type: y,
                        value: p,
                    });
                } else if ('ampm' === y) {
                    var x = l['[[hour]]'];
                    (p = U(d, h, 'dayPeriods', x > 11 ? 'pm' : 'am', null)),
                        Ge.call(u, {
                            type: 'dayPeriod',
                            value: p,
                        });
                } else
                    Ge.call(u, {
                        type: 'literal',
                        value: c.substring(f, m + 1),
                    });
                (g = m + 1), (f = c.indexOf('{', g));
            }
            return (
                m < c.length - 1 &&
                    Ge.call(u, {
                        type: 'literal',
                        value: c.substr(m + 1),
                    }),
                u
            );
        }

        function ee(e, r) {
            for (var t = Q(e, r), n = '', a = 0; t.length > a; a++) {
                var i = t[a];
                n += i.value;
            }
            return n;
        }

        function re(e, r) {
            for (var t = Q(e, r), n = [], a = 0; t.length > a; a++) {
                var i = t[a];
                n.push({
                    type: i.type,
                    value: i.value,
                });
            }
            return n;
        }

        function te(e, t, n) {
            var a = new Date(e),
                i = 'get' + (n || '');
            return new r({
                '[[weekday]]': a[i + 'Day'](),
                '[[era]]': +(a[i + 'FullYear']() >= 0),
                '[[year]]': a[i + 'FullYear'](),
                '[[month]]': a[i + 'Month'](),
                '[[day]]': a[i + 'Date'](),
                '[[hour]]': a[i + 'Hours'](),
                '[[minute]]': a[i + 'Minutes'](),
                '[[second]]': a[i + 'Seconds'](),
                '[[inDST]]': !1,
            });
        }

        function ne(e, r) {
            if (!e.number)
                throw new Error(
                    "Object passed doesn't contain locale data for Intl.NumberFormat",
                );
            var t = void 0,
                n = [r],
                a = r.split('-');
            for (
                a.length > 2 &&
                4 === a[1].length &&
                Ge.call(n, a[0] + '-' + a[2]);
                (t = Be.call(n));

            )
                Ge.call($e.NumberFormat['[[availableLocales]]'], t),
                    ($e.NumberFormat['[[localeData]]'][t] = e.number),
                    e.date &&
                        ((e.date.nu = e.number.nu),
                        Ge.call($e.DateTimeFormat['[[availableLocales]]'], t),
                        ($e.DateTimeFormat['[[localeData]]'][t] = e.date));
            void 0 === cr && c(r);
        }
        var ae =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e;
                      }
                    : function (e) {
                          return e &&
                              'function' == typeof Symbol &&
                              e.constructor === Symbol
                              ? 'symbol'
                              : typeof e;
                      },
            ie = (function () {
                var e =
                    ('function' == typeof Symbol &&
                        Symbol.for &&
                        Symbol.for('react.element')) ||
                    60103;
                return function (r, t, n, a) {
                    var i = r && r.defaultProps,
                        o = arguments.length - 3;
                    if ((t || 0 === o || (t = {}), t && i))
                        for (var s in i) void 0 === t[s] && (t[s] = i[s]);
                    else t || (t = i || {});
                    if (1 === o) t.children = a;
                    else if (o > 1) {
                        for (var l = Array(o), c = 0; c < o; c++)
                            l[c] = arguments[c + 3];
                        t.children = l;
                    }
                    return {
                        $$typeof: e,
                        type: r,
                        key: void 0 === n ? null : '' + n,
                        ref: null,
                        props: t,
                        _owner: null,
                    };
                };
            })(),
            oe = function (e) {
                return function () {
                    var r = e.apply(this, arguments);
                    return new Promise(function (e, t) {
                        function n(a, i) {
                            try {
                                var o = r[a](i),
                                    s = o.value;
                            } catch (e) {
                                return void t(e);
                            }
                            return o.done
                                ? void e(s)
                                : Promise.resolve(s).then(
                                      function (e) {
                                          return n('next', e);
                                      },
                                      function (e) {
                                          return n('throw', e);
                                      },
                                  );
                        }
                        return n('next');
                    });
                };
            },
            se = function (e, r) {
                if (!(e instanceof r))
                    throw new TypeError('Cannot call a class as a function');
            },
            le = (function () {
                function e(e, r) {
                    for (var t = 0; t < r.length; t++) {
                        var n = r[t];
                        (n.enumerable = n.enumerable || !1),
                            (n.configurable = !0),
                            'value' in n && (n.writable = !0),
                            Object.defineProperty(e, n.key, n);
                    }
                }
                return function (r, t, n) {
                    return t && e(r.prototype, t), n && e(r, n), r;
                };
            })(),
            ce = function (e, r) {
                for (var t in r) {
                    var n = r[t];
                    (n.configurable = n.enumerable = !0),
                        'value' in n && (n.writable = !0),
                        Object.defineProperty(e, t, n);
                }
                return e;
            },
            ue = function (e, r) {
                for (
                    var t = Object.getOwnPropertyNames(r), n = 0;
                    n < t.length;
                    n++
                ) {
                    var a = t[n],
                        i = Object.getOwnPropertyDescriptor(r, a);
                    i &&
                        i.configurable &&
                        void 0 === e[a] &&
                        Object.defineProperty(e, a, i);
                }
                return e;
            },
            ge = function (e, r, t) {
                return (
                    r in e
                        ? Object.defineProperty(e, r, {
                              value: t,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                          })
                        : (e[r] = t),
                    e
                );
            },
            fe =
                Object.assign ||
                function (e) {
                    for (var r = 1; r < arguments.length; r++) {
                        var t = arguments[r];
                        for (var n in t)
                            Object.prototype.hasOwnProperty.call(t, n) &&
                                (e[n] = t[n]);
                    }
                    return e;
                },
            me = function e(r, t, n) {
                null === r && (r = Function.prototype);
                var a = Object.getOwnPropertyDescriptor(r, t);
                if (void 0 === a) {
                    var i = Object.getPrototypeOf(r);
                    return null === i ? void 0 : e(i, t, n);
                }
                if ('value' in a) return a.value;
                var o = a.get;
                if (void 0 !== o) return o.call(n);
            },
            ve = function (e, r) {
                if ('function' != typeof r && null !== r)
                    throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                            typeof r,
                    );
                (e.prototype = Object.create(r && r.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                    },
                })),
                    r &&
                        (Object.setPrototypeOf
                            ? Object.setPrototypeOf(e, r)
                            : (e.__proto__ = r));
            },
            de = function (e, r) {
                return null != r &&
                    'undefined' != typeof Symbol &&
                    r[Symbol.hasInstance]
                    ? r[Symbol.hasInstance](e)
                    : e instanceof r;
            },
            he = function (e) {
                return e && e.__esModule
                    ? e
                    : {
                          default: e,
                      };
            },
            pe = function (e) {
                if (e && e.__esModule) return e;
                var r = {};
                if (null != e)
                    for (var t in e)
                        Object.prototype.hasOwnProperty.call(e, t) &&
                            (r[t] = e[t]);
                return (r.default = e), r;
            },
            ye = function (e, r) {
                if (e !== r)
                    throw new TypeError('Cannot instantiate an arrow function');
            },
            be = function (e) {
                if (null == e)
                    throw new TypeError('Cannot destructure undefined');
            },
            we = function (e, r) {
                var t = {};
                for (var n in e)
                    r.indexOf(n) >= 0 ||
                        (Object.prototype.hasOwnProperty.call(e, n) &&
                            (t[n] = e[n]));
                return t;
            },
            xe = function (e, r) {
                if (!e)
                    throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called",
                    );
                return !r || ('object' != typeof r && 'function' != typeof r)
                    ? e
                    : r;
            },
            je = 'undefined' == typeof global ? self : global,
            De = function e(r, t, n, a) {
                var i = Object.getOwnPropertyDescriptor(r, t);
                if (void 0 === i) {
                    var o = Object.getPrototypeOf(r);
                    null !== o && e(o, t, n, a);
                } else if ('value' in i && i.writable) i.value = n;
                else {
                    var s = i.set;
                    void 0 !== s && s.call(a, n);
                }
                return n;
            },
            ze = (function () {
                function e(e, r) {
                    var t = [],
                        n = !0,
                        a = !1,
                        i = void 0;
                    try {
                        for (
                            var o, s = e[Symbol.iterator]();
                            !(n = (o = s.next()).done) &&
                            (t.push(o.value), !r || t.length !== r);
                            n = !0
                        );
                    } catch (e) {
                        (a = !0), (i = e);
                    } finally {
                        try {
                            !n && s.return && s.return();
                        } finally {
                            if (a) throw i;
                        }
                    }
                    return t;
                }
                return function (r, t) {
                    if (Array.isArray(r)) return r;
                    if (Symbol.iterator in Object(r)) return e(r, t);
                    throw new TypeError(
                        'Invalid attempt to destructure non-iterable instance',
                    );
                };
            })(),
            ke = function (e, r) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) {
                    for (
                        var t, n = [], a = e[Symbol.iterator]();
                        !(t = a.next()).done &&
                        (n.push(t.value), !r || n.length !== r);

                    );
                    return n;
                }
                throw new TypeError(
                    'Invalid attempt to destructure non-iterable instance',
                );
            },
            Oe = function (e, r) {
                return Object.freeze(
                    Object.defineProperties(e, {
                        raw: {
                            value: Object.freeze(r),
                        },
                    }),
                );
            },
            Fe = function (e, r) {
                return (e.raw = r), e;
            },
            Se = function (e, r, t) {
                if (e === t)
                    throw new ReferenceError(
                        r + ' is not defined - temporal dead zone',
                    );
                return e;
            },
            Ee = {},
            Le = function (e) {
                return Array.isArray(e) ? e : Array.from(e);
            },
            Pe = function (e) {
                if (Array.isArray(e)) {
                    for (var r = 0, t = Array(e.length); r < e.length; r++)
                        t[r] = e[r];
                    return t;
                }
                return Array.from(e);
            },
            Ne = Object.freeze({
                jsx: ie,
                asyncToGenerator: oe,
                classCallCheck: se,
                createClass: le,
                defineEnumerableProperties: ce,
                defaults: ue,
                defineProperty: ge,
                get: me,
                inherits: ve,
                interopRequireDefault: he,
                interopRequireWildcard: pe,
                newArrowCheck: ye,
                objectDestructuringEmpty: be,
                objectWithoutProperties: we,
                possibleConstructorReturn: xe,
                selfGlobal: je,
                set: De,
                slicedToArray: ze,
                slicedToArrayLoose: ke,
                taggedTemplateLiteral: Oe,
                taggedTemplateLiteralLoose: Fe,
                temporalRef: Se,
                temporalUndefined: Ee,
                toArray: Le,
                toConsumableArray: Pe,
                typeof: ae,
                extends: fe,
                instanceof: de,
            }),
            Te = (function () {
                var e = function () {};
                try {
                    return (
                        Object.defineProperty(e, 'a', {
                            get: function () {
                                return 1;
                            },
                        }),
                        Object.defineProperty(e, 'prototype', {
                            writable: !1,
                        }),
                        1 === e.a && e.prototype instanceof Object
                    );
                } catch (e) {
                    return !1;
                }
            })(),
            _e = !Te && !Object.prototype.__defineGetter__,
            Me = Object.prototype.hasOwnProperty,
            Ie = Te
                ? Object.defineProperty
                : function (e, r, t) {
                      'get' in t && e.__defineGetter__
                          ? e.__defineGetter__(r, t.get)
                          : (!Me.call(e, r) || 'value' in t) &&
                            (e[r] = t.value);
                  },
            Ae =
                Array.prototype.indexOf ||
                function (e) {
                    var r = this;
                    if (!r.length) return -1;
                    for (var t = arguments[1] || 0, n = r.length; t < n; t++)
                        if (r[t] === e) return t;
                    return -1;
                },
            Re =
                Object.create ||
                function (e, r) {
                    function t() {}
                    var n = void 0;
                    (t.prototype = e), (n = new t());
                    for (var a in r) Me.call(r, a) && Ie(n, a, r[a]);
                    return n;
                },
            qe = Array.prototype.slice,
            Ce = Array.prototype.concat,
            Ge = Array.prototype.push,
            Ze = Array.prototype.join,
            Be = Array.prototype.shift,
            Ue =
                Function.prototype.bind ||
                function (e) {
                    var r = this,
                        t = qe.call(arguments, 1);
                    return 1 === r.length
                        ? function () {
                              return r.apply(e, Ce.call(t, qe.call(arguments)));
                          }
                        : function () {
                              return r.apply(e, Ce.call(t, qe.call(arguments)));
                          };
                },
            $e = Re(null),
            Ke = Math.random();
        (r.prototype = Re(null)), (t.prototype = Re(null));
        var Ye = '[a-z]{3}(?:-[a-z]{3}){0,2}',
            He = '(?:[a-z]{2,3}(?:-' + Ye + ')?|[a-z]{4}|[a-z]{5,8})',
            We = '[a-z]{4}',
            Xe = '(?:[a-z]{2}|\\d{3})',
            Ve = '(?:[a-z0-9]{5,8}|\\d[a-z0-9]{3})',
            Je = '[0-9a-wy-z]',
            Qe = Je + '(?:-[a-z0-9]{2,8})+',
            er = 'x(?:-[a-z0-9]{1,8})+',
            rr =
                '(?:en-GB-oed|i-(?:ami|bnn|default|enochian|hak|klingon|lux|mingo|navajo|pwn|tao|tay|tsu)|sgn-(?:BE-FR|BE-NL|CH-DE))',
            tr =
                '(?:art-lojban|cel-gaulish|no-bok|no-nyn|zh-(?:guoyu|hakka|min|min-nan|xiang))',
            nr = '(?:' + rr + '|' + tr + ')',
            ar =
                He +
                '(?:-' +
                We +
                ')?(?:-' +
                Xe +
                ')?(?:-' +
                Ve +
                ')*(?:-' +
                Qe +
                ')*(?:-' +
                er +
                ')?',
            ir = RegExp('^(?:' + ar + '|' + er + '|' + nr + ')$', 'i'),
            or = RegExp(
                '^(?!x).*?-(' + Ve + ')-(?:\\w{4,8}-(?!x-))*\\1\\b',
                'i',
            ),
            sr = RegExp('^(?!x).*?-(' + Je + ')-(?:\\w+-(?!x-))*\\1\\b', 'i'),
            lr = RegExp('-' + Qe, 'ig'),
            cr = void 0,
            ur = {
                tags: {
                    'art-lojban': 'jbo',
                    'i-ami': 'ami',
                    'i-bnn': 'bnn',
                    'i-hak': 'hak',
                    'i-klingon': 'tlh',
                    'i-lux': 'lb',
                    'i-navajo': 'nv',
                    'i-pwn': 'pwn',
                    'i-tao': 'tao',
                    'i-tay': 'tay',
                    'i-tsu': 'tsu',
                    'no-bok': 'nb',
                    'no-nyn': 'nn',
                    'sgn-BE-FR': 'sfb',
                    'sgn-BE-NL': 'vgt',
                    'sgn-CH-DE': 'sgg',
                    'zh-guoyu': 'cmn',
                    'zh-hakka': 'hak',
                    'zh-min-nan': 'nan',
                    'zh-xiang': 'hsn',
                    'sgn-BR': 'bzs',
                    'sgn-CO': 'csn',
                    'sgn-DE': 'gsg',
                    'sgn-DK': 'dsl',
                    'sgn-ES': 'ssp',
                    'sgn-FR': 'fsl',
                    'sgn-GB': 'bfi',
                    'sgn-GR': 'gss',
                    'sgn-IE': 'isg',
                    'sgn-IT': 'ise',
                    'sgn-JP': 'jsl',
                    'sgn-MX': 'mfs',
                    'sgn-NI': 'ncs',
                    'sgn-NL': 'dse',
                    'sgn-NO': 'nsl',
                    'sgn-PT': 'psr',
                    'sgn-SE': 'swl',
                    'sgn-US': 'ase',
                    'sgn-ZA': 'sfs',
                    'zh-cmn': 'cmn',
                    'zh-cmn-Hans': 'cmn-Hans',
                    'zh-cmn-Hant': 'cmn-Hant',
                    'zh-gan': 'gan',
                    'zh-wuu': 'wuu',
                    'zh-yue': 'yue',
                },
                subtags: {
                    BU: 'MM',
                    DD: 'DE',
                    FX: 'FR',
                    TP: 'TL',
                    YD: 'YE',
                    ZR: 'CD',
                    heploc: 'alalc97',
                    in: 'id',
                    iw: 'he',
                    ji: 'yi',
                    jw: 'jv',
                    mo: 'ro',
                    ayx: 'nun',
                    bjd: 'drl',
                    ccq: 'rki',
                    cjr: 'mom',
                    cka: 'cmr',
                    cmk: 'xch',
                    drh: 'khk',
                    drw: 'prs',
                    gav: 'dev',
                    hrr: 'jal',
                    ibi: 'opa',
                    kgh: 'kml',
                    lcq: 'ppr',
                    mst: 'mry',
                    myt: 'mry',
                    sca: 'hle',
                    tie: 'ras',
                    tkk: 'twm',
                    tlw: 'weo',
                    tnf: 'prs',
                    ybd: 'rki',
                    yma: 'lrr',
                },
                extLang: {
                    aao: ['aao', 'ar'],
                    abh: ['abh', 'ar'],
                    abv: ['abv', 'ar'],
                    acm: ['acm', 'ar'],
                    acq: ['acq', 'ar'],
                    acw: ['acw', 'ar'],
                    acx: ['acx', 'ar'],
                    acy: ['acy', 'ar'],
                    adf: ['adf', 'ar'],
                    ads: ['ads', 'sgn'],
                    aeb: ['aeb', 'ar'],
                    aec: ['aec', 'ar'],
                    aed: ['aed', 'sgn'],
                    aen: ['aen', 'sgn'],
                    afb: ['afb', 'ar'],
                    afg: ['afg', 'sgn'],
                    ajp: ['ajp', 'ar'],
                    apc: ['apc', 'ar'],
                    apd: ['apd', 'ar'],
                    arb: ['arb', 'ar'],
                    arq: ['arq', 'ar'],
                    ars: ['ars', 'ar'],
                    ary: ['ary', 'ar'],
                    arz: ['arz', 'ar'],
                    ase: ['ase', 'sgn'],
                    asf: ['asf', 'sgn'],
                    asp: ['asp', 'sgn'],
                    asq: ['asq', 'sgn'],
                    asw: ['asw', 'sgn'],
                    auz: ['auz', 'ar'],
                    avl: ['avl', 'ar'],
                    ayh: ['ayh', 'ar'],
                    ayl: ['ayl', 'ar'],
                    ayn: ['ayn', 'ar'],
                    ayp: ['ayp', 'ar'],
                    bbz: ['bbz', 'ar'],
                    bfi: ['bfi', 'sgn'],
                    bfk: ['bfk', 'sgn'],
                    bjn: ['bjn', 'ms'],
                    bog: ['bog', 'sgn'],
                    bqn: ['bqn', 'sgn'],
                    bqy: ['bqy', 'sgn'],
                    btj: ['btj', 'ms'],
                    bve: ['bve', 'ms'],
                    bvl: ['bvl', 'sgn'],
                    bvu: ['bvu', 'ms'],
                    bzs: ['bzs', 'sgn'],
                    cdo: ['cdo', 'zh'],
                    cds: ['cds', 'sgn'],
                    cjy: ['cjy', 'zh'],
                    cmn: ['cmn', 'zh'],
                    coa: ['coa', 'ms'],
                    cpx: ['cpx', 'zh'],
                    csc: ['csc', 'sgn'],
                    csd: ['csd', 'sgn'],
                    cse: ['cse', 'sgn'],
                    csf: ['csf', 'sgn'],
                    csg: ['csg', 'sgn'],
                    csl: ['csl', 'sgn'],
                    csn: ['csn', 'sgn'],
                    csq: ['csq', 'sgn'],
                    csr: ['csr', 'sgn'],
                    czh: ['czh', 'zh'],
                    czo: ['czo', 'zh'],
                    doq: ['doq', 'sgn'],
                    dse: ['dse', 'sgn'],
                    dsl: ['dsl', 'sgn'],
                    dup: ['dup', 'ms'],
                    ecs: ['ecs', 'sgn'],
                    esl: ['esl', 'sgn'],
                    esn: ['esn', 'sgn'],
                    eso: ['eso', 'sgn'],
                    eth: ['eth', 'sgn'],
                    fcs: ['fcs', 'sgn'],
                    fse: ['fse', 'sgn'],
                    fsl: ['fsl', 'sgn'],
                    fss: ['fss', 'sgn'],
                    gan: ['gan', 'zh'],
                    gds: ['gds', 'sgn'],
                    gom: ['gom', 'kok'],
                    gse: ['gse', 'sgn'],
                    gsg: ['gsg', 'sgn'],
                    gsm: ['gsm', 'sgn'],
                    gss: ['gss', 'sgn'],
                    gus: ['gus', 'sgn'],
                    hab: ['hab', 'sgn'],
                    haf: ['haf', 'sgn'],
                    hak: ['hak', 'zh'],
                    hds: ['hds', 'sgn'],
                    hji: ['hji', 'ms'],
                    hks: ['hks', 'sgn'],
                    hos: ['hos', 'sgn'],
                    hps: ['hps', 'sgn'],
                    hsh: ['hsh', 'sgn'],
                    hsl: ['hsl', 'sgn'],
                    hsn: ['hsn', 'zh'],
                    icl: ['icl', 'sgn'],
                    ils: ['ils', 'sgn'],
                    inl: ['inl', 'sgn'],
                    ins: ['ins', 'sgn'],
                    ise: ['ise', 'sgn'],
                    isg: ['isg', 'sgn'],
                    isr: ['isr', 'sgn'],
                    jak: ['jak', 'ms'],
                    jax: ['jax', 'ms'],
                    jcs: ['jcs', 'sgn'],
                    jhs: ['jhs', 'sgn'],
                    jls: ['jls', 'sgn'],
                    jos: ['jos', 'sgn'],
                    jsl: ['jsl', 'sgn'],
                    jus: ['jus', 'sgn'],
                    kgi: ['kgi', 'sgn'],
                    knn: ['knn', 'kok'],
                    kvb: ['kvb', 'ms'],
                    kvk: ['kvk', 'sgn'],
                    kvr: ['kvr', 'ms'],
                    kxd: ['kxd', 'ms'],
                    lbs: ['lbs', 'sgn'],
                    lce: ['lce', 'ms'],
                    lcf: ['lcf', 'ms'],
                    liw: ['liw', 'ms'],
                    lls: ['lls', 'sgn'],
                    lsg: ['lsg', 'sgn'],
                    lsl: ['lsl', 'sgn'],
                    lso: ['lso', 'sgn'],
                    lsp: ['lsp', 'sgn'],
                    lst: ['lst', 'sgn'],
                    lsy: ['lsy', 'sgn'],
                    ltg: ['ltg', 'lv'],
                    lvs: ['lvs', 'lv'],
                    lzh: ['lzh', 'zh'],
                    max: ['max', 'ms'],
                    mdl: ['mdl', 'sgn'],
                    meo: ['meo', 'ms'],
                    mfa: ['mfa', 'ms'],
                    mfb: ['mfb', 'ms'],
                    mfs: ['mfs', 'sgn'],
                    min: ['min', 'ms'],
                    mnp: ['mnp', 'zh'],
                    mqg: ['mqg', 'ms'],
                    mre: ['mre', 'sgn'],
                    msd: ['msd', 'sgn'],
                    msi: ['msi', 'ms'],
                    msr: ['msr', 'sgn'],
                    mui: ['mui', 'ms'],
                    mzc: ['mzc', 'sgn'],
                    mzg: ['mzg', 'sgn'],
                    mzy: ['mzy', 'sgn'],
                    nan: ['nan', 'zh'],
                    nbs: ['nbs', 'sgn'],
                    ncs: ['ncs', 'sgn'],
                    nsi: ['nsi', 'sgn'],
                    nsl: ['nsl', 'sgn'],
                    nsp: ['nsp', 'sgn'],
                    nsr: ['nsr', 'sgn'],
                    nzs: ['nzs', 'sgn'],
                    okl: ['okl', 'sgn'],
                    orn: ['orn', 'ms'],
                    ors: ['ors', 'ms'],
                    pel: ['pel', 'ms'],
                    pga: ['pga', 'ar'],
                    pks: ['pks', 'sgn'],
                    prl: ['prl', 'sgn'],
                    prz: ['prz', 'sgn'],
                    psc: ['psc', 'sgn'],
                    psd: ['psd', 'sgn'],
                    pse: ['pse', 'ms'],
                    psg: ['psg', 'sgn'],
                    psl: ['psl', 'sgn'],
                    pso: ['pso', 'sgn'],
                    psp: ['psp', 'sgn'],
                    psr: ['psr', 'sgn'],
                    pys: ['pys', 'sgn'],
                    rms: ['rms', 'sgn'],
                    rsi: ['rsi', 'sgn'],
                    rsl: ['rsl', 'sgn'],
                    sdl: ['sdl', 'sgn'],
                    sfb: ['sfb', 'sgn'],
                    sfs: ['sfs', 'sgn'],
                    sgg: ['sgg', 'sgn'],
                    sgx: ['sgx', 'sgn'],
                    shu: ['shu', 'ar'],
                    slf: ['slf', 'sgn'],
                    sls: ['sls', 'sgn'],
                    sqk: ['sqk', 'sgn'],
                    sqs: ['sqs', 'sgn'],
                    ssh: ['ssh', 'ar'],
                    ssp: ['ssp', 'sgn'],
                    ssr: ['ssr', 'sgn'],
                    svk: ['svk', 'sgn'],
                    swc: ['swc', 'sw'],
                    swh: ['swh', 'sw'],
                    swl: ['swl', 'sgn'],
                    syy: ['syy', 'sgn'],
                    tmw: ['tmw', 'ms'],
                    tse: ['tse', 'sgn'],
                    tsm: ['tsm', 'sgn'],
                    tsq: ['tsq', 'sgn'],
                    tss: ['tss', 'sgn'],
                    tsy: ['tsy', 'sgn'],
                    tza: ['tza', 'sgn'],
                    ugn: ['ugn', 'sgn'],
                    ugy: ['ugy', 'sgn'],
                    ukl: ['ukl', 'sgn'],
                    uks: ['uks', 'sgn'],
                    urk: ['urk', 'ms'],
                    uzn: ['uzn', 'uz'],
                    uzs: ['uzs', 'uz'],
                    vgt: ['vgt', 'sgn'],
                    vkk: ['vkk', 'ms'],
                    vkt: ['vkt', 'ms'],
                    vsi: ['vsi', 'sgn'],
                    vsl: ['vsl', 'sgn'],
                    vsv: ['vsv', 'sgn'],
                    wuu: ['wuu', 'zh'],
                    xki: ['xki', 'sgn'],
                    xml: ['xml', 'sgn'],
                    xmm: ['xmm', 'ms'],
                    xms: ['xms', 'sgn'],
                    yds: ['yds', 'sgn'],
                    ysl: ['ysl', 'sgn'],
                    yue: ['yue', 'zh'],
                    zib: ['zib', 'sgn'],
                    zlm: ['zlm', 'ms'],
                    zmi: ['zmi', 'ms'],
                    zsl: ['zsl', 'sgn'],
                    zsm: ['zsm', 'ms'],
                },
            },
            gr = /^[A-Z]{3}$/,
            fr = /-u(?:-[0-9a-z]{2,8})+/gi,
            mr = {};
        Object.defineProperty(mr, 'getCanonicalLocales', {
            enumerable: !1,
            configurable: !0,
            writable: !0,
            value: k,
        });
        var vr = {
            BHD: 3,
            BYR: 0,
            XOF: 0,
            BIF: 0,
            XAF: 0,
            CLF: 4,
            CLP: 0,
            KMF: 0,
            DJF: 0,
            XPF: 0,
            GNF: 0,
            ISK: 0,
            IQD: 3,
            JPY: 0,
            JOD: 3,
            KRW: 0,
            KWD: 3,
            LYD: 3,
            OMR: 3,
            PYG: 0,
            RWF: 0,
            TND: 3,
            UGX: 0,
            UYI: 0,
            VUV: 0,
            VND: 0,
        };
        Ie(mr, 'NumberFormat', {
            configurable: !0,
            writable: !0,
            value: O,
        }),
            Ie(mr.NumberFormat, 'prototype', {
                writable: !1,
            }),
            ($e.NumberFormat = {
                '[[availableLocales]]': [],
                '[[relevantExtensionKeys]]': ['nu'],
                '[[localeData]]': {},
            }),
            Ie(mr.NumberFormat, 'supportedLocalesOf', {
                configurable: !0,
                writable: !0,
                value: Ue.call(function (e) {
                    if (!Me.call(this, '[[availableLocales]]'))
                        throw new TypeError(
                            'supportedLocalesOf() is not a constructor',
                        );
                    var r = n(),
                        t = arguments[1],
                        a = this['[[availableLocales]]'],
                        i = d(e);
                    return r(), j(a, i, t);
                }, $e.NumberFormat),
            }),
            Ie(mr.NumberFormat.prototype, 'format', {
                configurable: !0,
                get: E,
            }),
            Object.defineProperty(mr.NumberFormat.prototype, 'formatToParts', {
                configurable: !0,
                enumerable: !1,
                writable: !0,
                value: L,
            });
        var dr = {
            arab: ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'],
            arabext: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
            bali: ['᭐', '᭑', '᭒', '᭓', '᭔', '᭕', '᭖', '᭗', '᭘', '᭙'],
            beng: ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'],
            deva: ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'],
            fullwide: [
                '０',
                '１',
                '２',
                '３',
                '４',
                '５',
                '６',
                '７',
                '８',
                '９',
            ],
            gujr: ['૦', '૧', '૨', '૩', '૪', '૫', '૬', '૭', '૮', '૯'],
            guru: ['੦', '੧', '੨', '੩', '੪', '੫', '੬', '੭', '੮', '੯'],
            hanidec: [
                '〇',
                '一',
                '二',
                '三',
                '四',
                '五',
                '六',
                '七',
                '八',
                '九',
            ],
            khmr: ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'],
            knda: ['೦', '೧', '೨', '೩', '೪', '೫', '೬', '೭', '೮', '೯'],
            laoo: ['໐', '໑', '໒', '໓', '໔', '໕', '໖', '໗', '໘', '໙'],
            latn: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
            limb: ['᥆', '᥇', '᥈', '᥉', '᥊', '᥋', '᥌', '᥍', '᥎', '᥏'],
            mlym: ['൦', '൧', '൨', '൩', '൪', '൫', '൬', '൭', '൮', '൯'],
            mong: ['᠐', '᠑', '᠒', '᠓', '᠔', '᠕', '᠖', '᠗', '᠘', '᠙'],
            mymr: ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'],
            orya: ['୦', '୧', '୨', '୩', '୪', '୫', '୬', '୭', '୮', '୯'],
            tamldec: ['௦', '௧', '௨', '௩', '௪', '௫', '௬', '௭', '௮', '௯'],
            telu: ['౦', '౧', '౨', '౩', '౪', '౫', '౬', '౭', '౮', '౯'],
            thai: ['๐', '๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙'],
            tibt: ['༠', '༡', '༢', '༣', '༤', '༥', '༦', '༧', '༨', '༩'],
        };
        Ie(mr.NumberFormat.prototype, 'resolvedOptions', {
            configurable: !0,
            writable: !0,
            value: function () {
                var e = void 0,
                    t = new r(),
                    n = [
                        'locale',
                        'numberingSystem',
                        'style',
                        'currency',
                        'currencyDisplay',
                        'minimumIntegerDigits',
                        'minimumFractionDigits',
                        'maximumFractionDigits',
                        'minimumSignificantDigits',
                        'maximumSignificantDigits',
                        'useGrouping',
                    ],
                    a =
                        null !== this &&
                        'object' === Ne.typeof(this) &&
                        l(this);
                if (!a || !a['[[initializedNumberFormat]]'])
                    throw new TypeError(
                        '`this` value for resolvedOptions() is not an initialized Intl.NumberFormat object.',
                    );
                for (var i = 0, o = n.length; i < o; i++)
                    Me.call(a, (e = '[[' + n[i] + ']]')) &&
                        (t[n[i]] = {
                            value: a[e],
                            writable: !0,
                            configurable: !0,
                            enumerable: !0,
                        });
                return Re({}, t);
            },
        });
        var hr =
                /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g,
            pr = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            yr = /[rqQASjJgwWIQq]/,
            br = ['era', 'year', 'month', 'day', 'weekday', 'quarter'],
            wr = ['hour', 'minute', 'second', 'hour12', 'timeZoneName'],
            xr = {
                second: {
                    numeric: 's',
                    '2-digit': 'ss',
                },
                minute: {
                    numeric: 'm',
                    '2-digit': 'mm',
                },
                year: {
                    numeric: 'y',
                    '2-digit': 'yy',
                },
                day: {
                    numeric: 'd',
                    '2-digit': 'dd',
                },
                month: {
                    numeric: 'L',
                    '2-digit': 'LL',
                    narrow: 'LLLLL',
                    short: 'LLL',
                    long: 'LLLL',
                },
                weekday: {
                    narrow: 'ccccc',
                    short: 'ccc',
                    long: 'cccc',
                },
            },
            jr = Re(null, {
                narrow: {},
                short: {},
                long: {},
            });
        Ie(mr, 'DateTimeFormat', {
            configurable: !0,
            writable: !0,
            value: $,
        }),
            Ie($, 'prototype', {
                writable: !1,
            });
        var Dr = {
            weekday: ['narrow', 'short', 'long'],
            era: ['narrow', 'short', 'long'],
            year: ['2-digit', 'numeric'],
            month: ['2-digit', 'numeric', 'narrow', 'short', 'long'],
            day: ['2-digit', 'numeric'],
            hour: ['2-digit', 'numeric'],
            minute: ['2-digit', 'numeric'],
            second: ['2-digit', 'numeric'],
            timeZoneName: ['short', 'long'],
        };
        ($e.DateTimeFormat = {
            '[[availableLocales]]': [],
            '[[relevantExtensionKeys]]': ['ca', 'nu'],
            '[[localeData]]': {},
        }),
            Ie(mr.DateTimeFormat, 'supportedLocalesOf', {
                configurable: !0,
                writable: !0,
                value: Ue.call(function (e) {
                    if (!Me.call(this, '[[availableLocales]]'))
                        throw new TypeError(
                            'supportedLocalesOf() is not a constructor',
                        );
                    var r = n(),
                        t = arguments[1],
                        a = this['[[availableLocales]]'],
                        i = d(e);
                    return r(), j(a, i, t);
                }, $e.NumberFormat),
            }),
            Ie(mr.DateTimeFormat.prototype, 'format', {
                configurable: !0,
                get: V,
            }),
            Object.defineProperty(
                mr.DateTimeFormat.prototype,
                'formatToParts',
                {
                    enumerable: !1,
                    writable: !0,
                    configurable: !0,
                    value: J,
                },
            ),
            Ie(mr.DateTimeFormat.prototype, 'resolvedOptions', {
                writable: !0,
                configurable: !0,
                value: function () {
                    var e = void 0,
                        t = new r(),
                        n = [
                            'locale',
                            'calendar',
                            'numberingSystem',
                            'timeZone',
                            'hour12',
                            'weekday',
                            'era',
                            'year',
                            'month',
                            'day',
                            'hour',
                            'minute',
                            'second',
                            'timeZoneName',
                        ],
                        a =
                            null !== this &&
                            'object' === Ne.typeof(this) &&
                            l(this);
                    if (!a || !a['[[initializedDateTimeFormat]]'])
                        throw new TypeError(
                            '`this` value for resolvedOptions() is not an initialized Intl.DateTimeFormat object.',
                        );
                    for (var i = 0, o = n.length; i < o; i++)
                        Me.call(a, (e = '[[' + n[i] + ']]')) &&
                            (t[n[i]] = {
                                value: a[e],
                                writable: !0,
                                configurable: !0,
                                enumerable: !0,
                            });
                    return Re({}, t);
                },
            });
        var zr = (mr.__localeSensitiveProtos = {
            Number: {},
            Date: {},
        });
        if (
            ((zr.Number.toLocaleString = function () {
                if ('[object Number]' !== Object.prototype.toString.call(this))
                    throw new TypeError(
                        '`this` value must be a number for Number.prototype.toLocaleString()',
                    );
                return T(new O(arguments[0], arguments[1]), this);
            }),
            (zr.Date.toLocaleString = function () {
                if ('[object Date]' !== Object.prototype.toString.call(this))
                    throw new TypeError(
                        '`this` value must be a Date instance for Date.prototype.toLocaleString()',
                    );
                var e = +this;
                if (isNaN(e)) return 'Invalid Date';
                var r = arguments[0],
                    t = arguments[1];
                t = H(t, 'any', 'all');
                var n = new $(r, t);
                return ee(n, e);
            }),
            (zr.Date.toLocaleDateString = function () {
                if ('[object Date]' !== Object.prototype.toString.call(this))
                    throw new TypeError(
                        '`this` value must be a Date instance for Date.prototype.toLocaleDateString()',
                    );
                var e = +this;
                if (isNaN(e)) return 'Invalid Date';
                var r = arguments[0],
                    t = arguments[1];
                t = H(t, 'date', 'date');
                var n = new $(r, t);
                return ee(n, e);
            }),
            (zr.Date.toLocaleTimeString = function () {
                if ('[object Date]' !== Object.prototype.toString.call(this))
                    throw new TypeError(
                        '`this` value must be a Date instance for Date.prototype.toLocaleTimeString()',
                    );
                var e = +this;
                if (isNaN(e)) return 'Invalid Date';
                var r = arguments[0],
                    t = arguments[1];
                t = H(t, 'time', 'time');
                var n = new $(r, t);
                return ee(n, e);
            }),
            Ie(mr, '__applyLocaleSensitivePrototypes', {
                writable: !0,
                configurable: !0,
                value: function () {
                    Ie(Number.prototype, 'toLocaleString', {
                        writable: !0,
                        configurable: !0,
                        value: zr.Number.toLocaleString,
                    }),
                        Ie(Date.prototype, 'toLocaleString', {
                            writable: !0,
                            configurable: !0,
                            value: zr.Date.toLocaleString,
                        });
                    for (var e in zr.Date)
                        Me.call(zr.Date, e) &&
                            Ie(Date.prototype, e, {
                                writable: !0,
                                configurable: !0,
                                value: zr.Date[e],
                            });
                },
            }),
            Ie(mr, '__addLocaleData', {
                value: function (e) {
                    if (!g(e.locale))
                        throw new Error(
                            "Object passed doesn't identify itself with a valid language tag",
                        );
                    ne(e, e.locale);
                },
            }),
            Ie(mr, '__disableRegExpRestore', {
                value: function () {
                    $e.disableRegExpRestore = !0;
                },
            }),
            'undefined' == typeof Intl)
        )
            try {
                (window.Intl = mr), mr.__applyLocaleSensitivePrototypes();
            } catch (e) {}
        return mr;
    });

    // Intl.~locale.en-US
    IntlPolyfill.__addLocaleData({
        locale: 'en-US',
        date: {
            ca: [
                'gregory',
                'buddhist',
                'chinese',
                'coptic',
                'dangi',
                'ethioaa',
                'ethiopic',
                'generic',
                'hebrew',
                'indian',
                'islamic',
                'islamicc',
                'japanese',
                'persian',
                'roc',
            ],
            hourNo0: true,
            hour12: true,
            formats: {
                short: '{1}, {0}',
                medium: '{1}, {0}',
                full: "{1} 'at' {0}",
                long: "{1} 'at' {0}",
                availableFormats: {
                    d: 'd',
                    E: 'ccc',
                    Ed: 'd E',
                    Ehm: 'E h:mm a',
                    EHm: 'E HH:mm',
                    Ehms: 'E h:mm:ss a',
                    EHms: 'E HH:mm:ss',
                    Gy: 'y G',
                    GyMMM: 'MMM y G',
                    GyMMMd: 'MMM d, y G',
                    GyMMMEd: 'E, MMM d, y G',
                    h: 'h a',
                    H: 'HH',
                    hm: 'h:mm a',
                    Hm: 'HH:mm',
                    hms: 'h:mm:ss a',
                    Hms: 'HH:mm:ss',
                    hmsv: 'h:mm:ss a v',
                    Hmsv: 'HH:mm:ss v',
                    hmv: 'h:mm a v',
                    Hmv: 'HH:mm v',
                    M: 'L',
                    Md: 'M/d',
                    MEd: 'E, M/d',
                    MMM: 'LLL',
                    MMMd: 'MMM d',
                    MMMEd: 'E, MMM d',
                    MMMMd: 'MMMM d',
                    ms: 'mm:ss',
                    y: 'y',
                    yM: 'M/y',
                    yMd: 'M/d/y',
                    yMEd: 'E, M/d/y',
                    yMMM: 'MMM y',
                    yMMMd: 'MMM d, y',
                    yMMMEd: 'E, MMM d, y',
                    yMMMM: 'MMMM y',
                    yQQQ: 'QQQ y',
                    yQQQQ: 'QQQQ y',
                },
                dateFormats: {
                    yMMMMEEEEd: 'EEEE, MMMM d, y',
                    yMMMMd: 'MMMM d, y',
                    yMMMd: 'MMM d, y',
                    yMd: 'M/d/yy',
                },
                timeFormats: {
                    hmmsszzzz: 'h:mm:ss a zzzz',
                    hmsz: 'h:mm:ss a z',
                    hms: 'h:mm:ss a',
                    hm: 'h:mm a',
                },
            },
            calendars: {
                buddhist: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        long: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['BE'],
                        short: ['BE'],
                        long: ['BE'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                chinese: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Mo1',
                            'Mo2',
                            'Mo3',
                            'Mo4',
                            'Mo5',
                            'Mo6',
                            'Mo7',
                            'Mo8',
                            'Mo9',
                            'Mo10',
                            'Mo11',
                            'Mo12',
                        ],
                        long: [
                            'Month1',
                            'Month2',
                            'Month3',
                            'Month4',
                            'Month5',
                            'Month6',
                            'Month7',
                            'Month8',
                            'Month9',
                            'Month10',
                            'Month11',
                            'Month12',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                coptic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Tout',
                            'Baba',
                            'Hator',
                            'Kiahk',
                            'Toba',
                            'Amshir',
                            'Baramhat',
                            'Baramouda',
                            'Bashans',
                            'Paona',
                            'Epep',
                            'Mesra',
                            'Nasie',
                        ],
                        long: [
                            'Tout',
                            'Baba',
                            'Hator',
                            'Kiahk',
                            'Toba',
                            'Amshir',
                            'Baramhat',
                            'Baramouda',
                            'Bashans',
                            'Paona',
                            'Epep',
                            'Mesra',
                            'Nasie',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                dangi: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Mo1',
                            'Mo2',
                            'Mo3',
                            'Mo4',
                            'Mo5',
                            'Mo6',
                            'Mo7',
                            'Mo8',
                            'Mo9',
                            'Mo10',
                            'Mo11',
                            'Mo12',
                        ],
                        long: [
                            'Month1',
                            'Month2',
                            'Month3',
                            'Month4',
                            'Month5',
                            'Month6',
                            'Month7',
                            'Month8',
                            'Month9',
                            'Month10',
                            'Month11',
                            'Month12',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                ethiopic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                        long: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                ethioaa: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                        long: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0'],
                        short: ['ERA0'],
                        long: ['ERA0'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                generic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                        long: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                gregory: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        long: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['B', 'A', 'BCE', 'CE'],
                        short: ['BC', 'AD', 'BCE', 'CE'],
                        long: [
                            'Before Christ',
                            'Anno Domini',
                            'Before Common Era',
                            'Common Era',
                        ],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                hebrew: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                            '7',
                        ],
                        short: [
                            'Tishri',
                            'Heshvan',
                            'Kislev',
                            'Tevet',
                            'Shevat',
                            'Adar I',
                            'Adar',
                            'Nisan',
                            'Iyar',
                            'Sivan',
                            'Tamuz',
                            'Av',
                            'Elul',
                            'Adar II',
                        ],
                        long: [
                            'Tishri',
                            'Heshvan',
                            'Kislev',
                            'Tevet',
                            'Shevat',
                            'Adar I',
                            'Adar',
                            'Nisan',
                            'Iyar',
                            'Sivan',
                            'Tamuz',
                            'Av',
                            'Elul',
                            'Adar II',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['AM'],
                        short: ['AM'],
                        long: ['AM'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                indian: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Chaitra',
                            'Vaisakha',
                            'Jyaistha',
                            'Asadha',
                            'Sravana',
                            'Bhadra',
                            'Asvina',
                            'Kartika',
                            'Agrahayana',
                            'Pausa',
                            'Magha',
                            'Phalguna',
                        ],
                        long: [
                            'Chaitra',
                            'Vaisakha',
                            'Jyaistha',
                            'Asadha',
                            'Sravana',
                            'Bhadra',
                            'Asvina',
                            'Kartika',
                            'Agrahayana',
                            'Pausa',
                            'Magha',
                            'Phalguna',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['Saka'],
                        short: ['Saka'],
                        long: ['Saka'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                islamic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Muh.',
                            'Saf.',
                            'Rab. I',
                            'Rab. II',
                            'Jum. I',
                            'Jum. II',
                            'Raj.',
                            'Sha.',
                            'Ram.',
                            'Shaw.',
                            'Dhuʻl-Q.',
                            'Dhuʻl-H.',
                        ],
                        long: [
                            'Muharram',
                            'Safar',
                            'Rabiʻ I',
                            'Rabiʻ II',
                            'Jumada I',
                            'Jumada II',
                            'Rajab',
                            'Shaʻban',
                            'Ramadan',
                            'Shawwal',
                            'Dhuʻl-Qiʻdah',
                            'Dhuʻl-Hijjah',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['AH'],
                        short: ['AH'],
                        long: ['AH'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                islamicc: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Muh.',
                            'Saf.',
                            'Rab. I',
                            'Rab. II',
                            'Jum. I',
                            'Jum. II',
                            'Raj.',
                            'Sha.',
                            'Ram.',
                            'Shaw.',
                            'Dhuʻl-Q.',
                            'Dhuʻl-H.',
                        ],
                        long: [
                            'Muharram',
                            'Safar',
                            'Rabiʻ I',
                            'Rabiʻ II',
                            'Jumada I',
                            'Jumada II',
                            'Rajab',
                            'Shaʻban',
                            'Ramadan',
                            'Shawwal',
                            'Dhuʻl-Qiʻdah',
                            'Dhuʻl-Hijjah',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['AH'],
                        short: ['AH'],
                        long: ['AH'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                japanese: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        long: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'M',
                            'T',
                            'S',
                            'H',
                        ],
                        short: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'Meiji',
                            'Taishō',
                            'Shōwa',
                            'Heisei',
                        ],
                        long: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'Meiji',
                            'Taishō',
                            'Shōwa',
                            'Heisei',
                        ],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                persian: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Farvardin',
                            'Ordibehesht',
                            'Khordad',
                            'Tir',
                            'Mordad',
                            'Shahrivar',
                            'Mehr',
                            'Aban',
                            'Azar',
                            'Dey',
                            'Bahman',
                            'Esfand',
                        ],
                        long: [
                            'Farvardin',
                            'Ordibehesht',
                            'Khordad',
                            'Tir',
                            'Mordad',
                            'Shahrivar',
                            'Mehr',
                            'Aban',
                            'Azar',
                            'Dey',
                            'Bahman',
                            'Esfand',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['AP'],
                        short: ['AP'],
                        long: ['AP'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                roc: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        long: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['Before R.O.C.', 'Minguo'],
                        short: ['Before R.O.C.', 'Minguo'],
                        long: ['Before R.O.C.', 'Minguo'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
            },
        },
        number: {
            nu: ['latn'],
            patterns: {
                decimal: {
                    positivePattern: '{number}',
                    negativePattern: '{minusSign}{number}',
                },
                currency: {
                    positivePattern: '{currency}{number}',
                    negativePattern: '{minusSign}{currency}{number}',
                },
                percent: {
                    positivePattern: '{number}{percentSign}',
                    negativePattern: '{minusSign}{number}{percentSign}',
                },
            },
            symbols: {
                latn: {
                    decimal: '.',
                    group: ',',
                    nan: 'NaN',
                    plusSign: '+',
                    minusSign: '-',
                    percentSign: '%',
                    infinity: '∞',
                },
            },
            currencies: {
                AUD: 'A$',
                BRL: 'R$',
                CAD: 'CA$',
                CNY: 'CN¥',
                EUR: '€',
                GBP: '£',
                HKD: 'HK$',
                ILS: '₪',
                INR: '₹',
                JPY: '¥',
                KRW: '₩',
                MXN: 'MX$',
                NZD: 'NZ$',
                TWD: 'NT$',
                USD: '$',
                VND: '₫',
                XAF: 'FCFA',
                XCD: 'EC$',
                XOF: 'CFA',
                XPF: 'CFPF',
            },
        },
    });

    // Intl.~locale.de
    IntlPolyfill.__addLocaleData({
        locale: 'de',
        date: {
            ca: [
                'gregory',
                'buddhist',
                'chinese',
                'coptic',
                'dangi',
                'ethioaa',
                'ethiopic',
                'generic',
                'hebrew',
                'indian',
                'islamic',
                'islamicc',
                'japanese',
                'persian',
                'roc',
            ],
            hourNo0: true,
            hour12: false,
            formats: {
                short: '{1}, {0}',
                medium: '{1}, {0}',
                full: "{1} 'um' {0}",
                long: "{1} 'um' {0}",
                availableFormats: {
                    d: 'd',
                    E: 'ccc',
                    Ed: 'E, d.',
                    Ehm: 'E h:mm a',
                    EHm: 'E, HH:mm',
                    Ehms: 'E, h:mm:ss a',
                    EHms: 'E, HH:mm:ss',
                    Gy: 'y G',
                    GyMMM: 'MMM y G',
                    GyMMMd: 'd. MMM y G',
                    GyMMMEd: 'E, d. MMM y G',
                    h: 'h a',
                    H: "HH 'Uhr'",
                    hm: 'h:mm a',
                    Hm: 'HH:mm',
                    hms: 'h:mm:ss a',
                    Hms: 'HH:mm:ss',
                    hmsv: 'h:mm:ss a v',
                    Hmsv: 'HH:mm:ss v',
                    hmv: 'h:mm a v',
                    Hmv: 'HH:mm v',
                    M: 'L',
                    Md: 'd.M.',
                    MEd: 'E, d.M.',
                    MMd: 'd.MM.',
                    MMdd: 'dd.MM.',
                    MMM: 'LLL',
                    MMMd: 'd. MMM',
                    MMMEd: 'E, d. MMM',
                    MMMMd: 'd. MMMM',
                    MMMMEd: 'E, d. MMMM',
                    ms: 'mm:ss',
                    y: 'y',
                    yM: 'M.y',
                    yMd: 'd.M.y',
                    yMEd: 'E, d.M.y',
                    yMM: 'MM.y',
                    yMMdd: 'dd.MM.y',
                    yMMM: 'MMM y',
                    yMMMd: 'd. MMM y',
                    yMMMEd: 'E, d. MMM y',
                    yMMMM: 'MMMM y',
                    yQQQ: 'QQQ y',
                    yQQQQ: 'QQQQ y',
                },
                dateFormats: {
                    yMMMMEEEEd: 'EEEE, d. MMMM y',
                    yMMMMd: 'd. MMMM y',
                    yMMMd: 'dd.MM.y',
                    yMd: 'dd.MM.yy',
                },
                timeFormats: {
                    hmmsszzzz: 'HH:mm:ss zzzz',
                    hmsz: 'HH:mm:ss z',
                    hms: 'HH:mm:ss',
                    hm: 'HH:mm',
                },
            },
            calendars: {
                buddhist: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan.',
                            'Feb.',
                            'März',
                            'Apr.',
                            'Mai',
                            'Juni',
                            'Juli',
                            'Aug.',
                            'Sep.',
                            'Okt.',
                            'Nov.',
                            'Dez.',
                        ],
                        long: [
                            'Januar',
                            'Februar',
                            'März',
                            'April',
                            'Mai',
                            'Juni',
                            'Juli',
                            'August',
                            'September',
                            'Oktober',
                            'November',
                            'Dezember',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['BE'],
                        short: ['BE'],
                        long: ['BE'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                chinese: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                        long: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                coptic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Tout',
                            'Baba',
                            'Hator',
                            'Kiahk',
                            'Toba',
                            'Amshir',
                            'Baramhat',
                            'Baramouda',
                            'Bashans',
                            'Paona',
                            'Epep',
                            'Mesra',
                            'Nasie',
                        ],
                        long: [
                            'Tout',
                            'Baba',
                            'Hator',
                            'Kiahk',
                            'Toba',
                            'Amshir',
                            'Baramhat',
                            'Baramouda',
                            'Bashans',
                            'Paona',
                            'Epep',
                            'Mesra',
                            'Nasie',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                dangi: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                        long: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                ethiopic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                        long: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                ethioaa: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                        long: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0'],
                        short: ['ERA0'],
                        long: ['ERA0'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                generic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                        long: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                gregory: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan.',
                            'Feb.',
                            'März',
                            'Apr.',
                            'Mai',
                            'Juni',
                            'Juli',
                            'Aug.',
                            'Sep.',
                            'Okt.',
                            'Nov.',
                            'Dez.',
                        ],
                        long: [
                            'Januar',
                            'Februar',
                            'März',
                            'April',
                            'Mai',
                            'Juni',
                            'Juli',
                            'August',
                            'September',
                            'Oktober',
                            'November',
                            'Dezember',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['v. Chr.', 'n. Chr.', 'v. u. Z.', 'u. Z.'],
                        short: ['v. Chr.', 'n. Chr.', 'v. u. Z.', 'u. Z.'],
                        long: [
                            'v. Chr.',
                            'n. Chr.',
                            'vor unserer Zeitrechnung',
                            'unserer Zeitrechnung',
                        ],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                hebrew: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                            '7',
                        ],
                        short: [
                            'Tishri',
                            'Heshvan',
                            'Kislev',
                            'Tevet',
                            'Shevat',
                            'Adar I',
                            'Adar',
                            'Nisan',
                            'Iyar',
                            'Sivan',
                            'Tamuz',
                            'Av',
                            'Elul',
                            'Adar II',
                        ],
                        long: [
                            'Tishri',
                            'Heshvan',
                            'Kislev',
                            'Tevet',
                            'Shevat',
                            'Adar I',
                            'Adar',
                            'Nisan',
                            'Iyar',
                            'Sivan',
                            'Tamuz',
                            'Av',
                            'Elul',
                            'Adar II',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['AM'],
                        short: ['AM'],
                        long: ['AM'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                indian: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Chaitra',
                            'Vaisakha',
                            'Jyaistha',
                            'Asadha',
                            'Sravana',
                            'Bhadra',
                            'Asvina',
                            'Kartika',
                            'Agrahayana',
                            'Pausa',
                            'Magha',
                            'Phalguna',
                        ],
                        long: [
                            'Chaitra',
                            'Vaisakha',
                            'Jyaistha',
                            'Asadha',
                            'Sravana',
                            'Bhadra',
                            'Asvina',
                            'Kartika',
                            'Agrahayana',
                            'Pausa',
                            'Magha',
                            'Phalguna',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['Saka'],
                        short: ['Saka'],
                        long: ['Saka'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                islamic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Muh.',
                            'Saf.',
                            'Rab. I',
                            'Rab. II',
                            'Jum. I',
                            'Jum. II',
                            'Raj.',
                            'Sha.',
                            'Ram.',
                            'Shaw.',
                            'Dhuʻl-Q.',
                            'Dhuʻl-H.',
                        ],
                        long: [
                            'Muharram',
                            'Safar',
                            'Rabiʻ I',
                            'Rabiʻ II',
                            'Jumada I',
                            'Jumada II',
                            'Rajab',
                            'Shaʻban',
                            'Ramadan',
                            'Shawwal',
                            'Dhuʻl-Qiʻdah',
                            'Dhuʻl-Hijjah',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['AH'],
                        short: ['AH'],
                        long: ['AH'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                islamicc: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Muh.',
                            'Saf.',
                            'Rab. I',
                            'Rab. II',
                            'Jum. I',
                            'Jum. II',
                            'Raj.',
                            'Sha.',
                            'Ram.',
                            'Shaw.',
                            'Dhuʻl-Q.',
                            'Dhuʻl-H.',
                        ],
                        long: [
                            'Muharram',
                            'Safar',
                            'Rabiʻ I',
                            'Rabiʻ II',
                            'Jumada I',
                            'Jumada II',
                            'Rajab',
                            'Shaʻban',
                            'Ramadan',
                            'Shawwal',
                            'Dhuʻl-Qiʻdah',
                            'Dhuʻl-Hijjah',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['AH'],
                        short: ['AH'],
                        long: ['AH'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                japanese: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan.',
                            'Feb.',
                            'März',
                            'Apr.',
                            'Mai',
                            'Juni',
                            'Juli',
                            'Aug.',
                            'Sep.',
                            'Okt.',
                            'Nov.',
                            'Dez.',
                        ],
                        long: [
                            'Januar',
                            'Februar',
                            'März',
                            'April',
                            'Mai',
                            'Juni',
                            'Juli',
                            'August',
                            'September',
                            'Oktober',
                            'November',
                            'Dezember',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'M',
                            'T',
                            'S',
                            'H',
                        ],
                        short: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'Meiji',
                            'Taishō',
                            'Shōwa',
                            'Heisei',
                        ],
                        long: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'Meiji',
                            'Taishō',
                            'Shōwa',
                            'Heisei',
                        ],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                persian: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Farvardin',
                            'Ordibehesht',
                            'Khordad',
                            'Tir',
                            'Mordad',
                            'Shahrivar',
                            'Mehr',
                            'Aban',
                            'Azar',
                            'Dey',
                            'Bahman',
                            'Esfand',
                        ],
                        long: [
                            'Farvardin',
                            'Ordibehesht',
                            'Khordad',
                            'Tir',
                            'Mordad',
                            'Shahrivar',
                            'Mehr',
                            'Aban',
                            'Azar',
                            'Dey',
                            'Bahman',
                            'Esfand',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['AP'],
                        short: ['AP'],
                        long: ['AP'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
                roc: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan.',
                            'Feb.',
                            'März',
                            'Apr.',
                            'Mai',
                            'Juni',
                            'Juli',
                            'Aug.',
                            'Sep.',
                            'Okt.',
                            'Nov.',
                            'Dez.',
                        ],
                        long: [
                            'Januar',
                            'Februar',
                            'März',
                            'April',
                            'Mai',
                            'Juni',
                            'Juli',
                            'August',
                            'September',
                            'Oktober',
                            'November',
                            'Dezember',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'D', 'M', 'D', 'F', 'S'],
                        short: [
                            'So.',
                            'Mo.',
                            'Di.',
                            'Mi.',
                            'Do.',
                            'Fr.',
                            'Sa.',
                        ],
                        long: [
                            'Sonntag',
                            'Montag',
                            'Dienstag',
                            'Mittwoch',
                            'Donnerstag',
                            'Freitag',
                            'Samstag',
                        ],
                    },
                    eras: {
                        narrow: ['Before R.O.C.', 'Minguo'],
                        short: ['Before R.O.C.', 'Minguo'],
                        long: ['Before R.O.C.', 'Minguo'],
                    },
                    dayPeriods: {
                        am: 'vorm.',
                        pm: 'nachm.',
                    },
                },
            },
        },
        number: {
            nu: ['latn'],
            patterns: {
                decimal: {
                    positivePattern: '{number}',
                    negativePattern: '{minusSign}{number}',
                },
                currency: {
                    positivePattern: '{number} {currency}',
                    negativePattern: '{minusSign}{number} {currency}',
                },
                percent: {
                    positivePattern: '{number} {percentSign}',
                    negativePattern: '{minusSign}{number} {percentSign}',
                },
            },
            symbols: {
                latn: {
                    decimal: ',',
                    group: '.',
                    nan: 'NaN',
                    plusSign: '+',
                    minusSign: '-',
                    percentSign: '%',
                    infinity: '∞',
                },
            },
            currencies: {
                ATS: 'öS',
                AUD: 'AU$',
                BGM: 'BGK',
                BGO: 'BGJ',
                BRL: 'R$',
                CAD: 'CA$',
                CNY: 'CN¥',
                DEM: 'DM',
                EUR: '€',
                GBP: '£',
                HKD: 'HK$',
                ILS: '₪',
                INR: '₹',
                JPY: '¥',
                KRW: '₩',
                MXN: 'MX$',
                NZD: 'NZ$',
                THB: '฿',
                TWD: 'NT$',
                USD: '$',
                VND: '₫',
                XAF: 'FCFA',
                XCD: 'EC$',
                XOF: 'CFA',
                XPF: 'CFPF',
            },
        },
    });

    // Intl.~locale.en-GB
    IntlPolyfill.__addLocaleData({
        locale: 'en-GB',
        date: {
            ca: [
                'gregory',
                'buddhist',
                'chinese',
                'coptic',
                'dangi',
                'ethioaa',
                'ethiopic',
                'generic',
                'hebrew',
                'indian',
                'islamic',
                'islamicc',
                'japanese',
                'persian',
                'roc',
            ],
            hourNo0: true,
            hour12: false,
            formats: {
                short: '{1}, {0}',
                medium: '{1}, {0}',
                full: "{1} 'at' {0}",
                long: "{1} 'at' {0}",
                availableFormats: {
                    d: 'd',
                    E: 'ccc',
                    Ed: 'E d',
                    Ehm: 'E h:mm a',
                    EHm: 'E HH:mm',
                    Ehms: 'E h:mm:ss a',
                    EHms: 'E HH:mm:ss',
                    Gy: 'y G',
                    GyMMM: 'MMM y G',
                    GyMMMd: 'd MMM y G',
                    GyMMMEd: 'E, d MMM y G',
                    h: 'h a',
                    H: 'HH',
                    hm: 'h:mm a',
                    Hm: 'HH:mm',
                    hms: 'h:mm:ss a',
                    Hms: 'HH:mm:ss',
                    hmsv: 'h:mm:ss a v',
                    Hmsv: 'HH:mm:ss v',
                    hmv: 'h:mm a v',
                    Hmv: 'HH:mm v',
                    M: 'L',
                    Md: 'dd/MM',
                    MEd: 'E, dd/MM',
                    MMdd: 'dd/MM',
                    MMM: 'LLL',
                    MMMd: 'd MMM',
                    MMMEd: 'E, d MMM',
                    MMMMd: 'd MMMM',
                    ms: 'mm:ss',
                    y: 'y',
                    yM: 'MM/y',
                    yMd: 'dd/MM/y',
                    yMEd: 'E, dd/MM/y',
                    yMMM: 'MMM y',
                    yMMMd: 'd MMM y',
                    yMMMEd: 'E, d MMM y',
                    yMMMM: 'MMMM y',
                    yQQQ: 'QQQ y',
                    yQQQQ: 'QQQQ y',
                },
                dateFormats: {
                    yMMMMEEEEd: 'EEEE, d MMMM y',
                    yMMMMd: 'd MMMM y',
                    yMMMd: 'd MMM y',
                    yMd: 'dd/MM/y',
                },
                timeFormats: {
                    hmmsszzzz: 'HH:mm:ss zzzz',
                    hmsz: 'HH:mm:ss z',
                    hms: 'HH:mm:ss',
                    hm: 'HH:mm',
                },
            },
            calendars: {
                buddhist: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        long: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['BE'],
                        short: ['BE'],
                        long: ['BE'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                chinese: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Mo1',
                            'Mo2',
                            'Mo3',
                            'Mo4',
                            'Mo5',
                            'Mo6',
                            'Mo7',
                            'Mo8',
                            'Mo9',
                            'Mo10',
                            'Mo11',
                            'Mo12',
                        ],
                        long: [
                            'Month1',
                            'Month2',
                            'Month3',
                            'Month4',
                            'Month5',
                            'Month6',
                            'Month7',
                            'Month8',
                            'Month9',
                            'Month10',
                            'Month11',
                            'Month12',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                coptic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Tout',
                            'Baba',
                            'Hator',
                            'Kiahk',
                            'Toba',
                            'Amshir',
                            'Baramhat',
                            'Baramouda',
                            'Bashans',
                            'Paona',
                            'Epep',
                            'Mesra',
                            'Nasie',
                        ],
                        long: [
                            'Tout',
                            'Baba',
                            'Hator',
                            'Kiahk',
                            'Toba',
                            'Amshir',
                            'Baramhat',
                            'Baramouda',
                            'Bashans',
                            'Paona',
                            'Epep',
                            'Mesra',
                            'Nasie',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                dangi: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Mo1',
                            'Mo2',
                            'Mo3',
                            'Mo4',
                            'Mo5',
                            'Mo6',
                            'Mo7',
                            'Mo8',
                            'Mo9',
                            'Mo10',
                            'Mo11',
                            'Mo12',
                        ],
                        long: [
                            'Month1',
                            'Month2',
                            'Month3',
                            'Month4',
                            'Month5',
                            'Month6',
                            'Month7',
                            'Month8',
                            'Month9',
                            'Month10',
                            'Month11',
                            'Month12',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                ethiopic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                        long: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                ethioaa: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                        long: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0'],
                        short: ['ERA0'],
                        long: ['ERA0'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                generic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                        long: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                gregory: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        long: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['B', 'A', 'BCE', 'CE'],
                        short: ['BC', 'AD', 'BCE', 'CE'],
                        long: [
                            'Before Christ',
                            'Anno Domini',
                            'Before Common Era',
                            'Common Era',
                        ],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                hebrew: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                            '7',
                        ],
                        short: [
                            'Tishri',
                            'Heshvan',
                            'Kislev',
                            'Tevet',
                            'Shevat',
                            'Adar I',
                            'Adar',
                            'Nisan',
                            'Iyar',
                            'Sivan',
                            'Tamuz',
                            'Av',
                            'Elul',
                            'Adar II',
                        ],
                        long: [
                            'Tishri',
                            'Heshvan',
                            'Kislev',
                            'Tevet',
                            'Shevat',
                            'Adar I',
                            'Adar',
                            'Nisan',
                            'Iyar',
                            'Sivan',
                            'Tamuz',
                            'Av',
                            'Elul',
                            'Adar II',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['AM'],
                        short: ['AM'],
                        long: ['AM'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                indian: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Chaitra',
                            'Vaisakha',
                            'Jyaistha',
                            'Asadha',
                            'Sravana',
                            'Bhadra',
                            'Asvina',
                            'Kartika',
                            'Agrahayana',
                            'Pausa',
                            'Magha',
                            'Phalguna',
                        ],
                        long: [
                            'Chaitra',
                            'Vaisakha',
                            'Jyaistha',
                            'Asadha',
                            'Sravana',
                            'Bhadra',
                            'Asvina',
                            'Kartika',
                            'Agrahayana',
                            'Pausa',
                            'Magha',
                            'Phalguna',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['Saka'],
                        short: ['Saka'],
                        long: ['Saka'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                islamic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Muh.',
                            'Saf.',
                            'Rab. I',
                            'Rab. II',
                            'Jum. I',
                            'Jum. II',
                            'Raj.',
                            'Sha.',
                            'Ram.',
                            'Shaw.',
                            'Dhuʻl-Q.',
                            'Dhuʻl-H.',
                        ],
                        long: [
                            'Muharram',
                            'Safar',
                            'Rabiʻ I',
                            'Rabiʻ II',
                            'Jumada I',
                            'Jumada II',
                            'Rajab',
                            'Shaʻban',
                            'Ramadan',
                            'Shawwal',
                            'Dhuʻl-Qiʻdah',
                            'Dhuʻl-Hijjah',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['AH'],
                        short: ['AH'],
                        long: ['AH'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                islamicc: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Muh.',
                            'Saf.',
                            'Rab. I',
                            'Rab. II',
                            'Jum. I',
                            'Jum. II',
                            'Raj.',
                            'Sha.',
                            'Ram.',
                            'Shaw.',
                            'Dhuʻl-Q.',
                            'Dhuʻl-H.',
                        ],
                        long: [
                            'Muharram',
                            'Safar',
                            'Rabiʻ I',
                            'Rabiʻ II',
                            'Jumada I',
                            'Jumada II',
                            'Rajab',
                            'Shaʻban',
                            'Ramadan',
                            'Shawwal',
                            'Dhuʻl-Qiʻdah',
                            'Dhuʻl-Hijjah',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['AH'],
                        short: ['AH'],
                        long: ['AH'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                japanese: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        long: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'M',
                            'T',
                            'S',
                            'H',
                        ],
                        short: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'Meiji',
                            'Taishō',
                            'Shōwa',
                            'Heisei',
                        ],
                        long: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'Meiji',
                            'Taishō',
                            'Shōwa',
                            'Heisei',
                        ],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                persian: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Farvardin',
                            'Ordibehesht',
                            'Khordad',
                            'Tir',
                            'Mordad',
                            'Shahrivar',
                            'Mehr',
                            'Aban',
                            'Azar',
                            'Dey',
                            'Bahman',
                            'Esfand',
                        ],
                        long: [
                            'Farvardin',
                            'Ordibehesht',
                            'Khordad',
                            'Tir',
                            'Mordad',
                            'Shahrivar',
                            'Mehr',
                            'Aban',
                            'Azar',
                            'Dey',
                            'Bahman',
                            'Esfand',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['AP'],
                        short: ['AP'],
                        long: ['AP'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
                roc: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'Jan',
                            'Feb',
                            'Mar',
                            'Apr',
                            'May',
                            'Jun',
                            'Jul',
                            'Aug',
                            'Sep',
                            'Oct',
                            'Nov',
                            'Dec',
                        ],
                        long: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ],
                    },
                    days: {
                        narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                        short: [
                            'Sun',
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thu',
                            'Fri',
                            'Sat',
                        ],
                        long: [
                            'Sunday',
                            'Monday',
                            'Tuesday',
                            'Wednesday',
                            'Thursday',
                            'Friday',
                            'Saturday',
                        ],
                    },
                    eras: {
                        narrow: ['Before R.O.C.', 'Minguo'],
                        short: ['Before R.O.C.', 'Minguo'],
                        long: ['Before R.O.C.', 'Minguo'],
                    },
                    dayPeriods: {
                        am: 'am',
                        pm: 'pm',
                    },
                },
            },
        },
        number: {
            nu: ['latn'],
            patterns: {
                decimal: {
                    positivePattern: '{number}',
                    negativePattern: '{minusSign}{number}',
                },
                currency: {
                    positivePattern: '{currency}{number}',
                    negativePattern: '{minusSign}{currency}{number}',
                },
                percent: {
                    positivePattern: '{number}{percentSign}',
                    negativePattern: '{minusSign}{number}{percentSign}',
                },
            },
            symbols: {
                latn: {
                    decimal: '.',
                    group: ',',
                    nan: 'NaN',
                    plusSign: '+',
                    minusSign: '-',
                    percentSign: '%',
                    infinity: '∞',
                },
            },
            currencies: {
                AUD: 'A$',
                BRL: 'R$',
                CAD: 'CA$',
                CNY: 'CN¥',
                EUR: '€',
                GBP: '£',
                HKD: 'HK$',
                ILS: '₪',
                INR: '₹',
                JPY: 'JP¥',
                KRW: '₩',
                MXN: 'MX$',
                NZD: 'NZ$',
                TWD: 'NT$',
                USD: 'US$',
                VND: '₫',
                XAF: 'FCFA',
                XCD: 'EC$',
                XOF: 'CFA',
                XPF: 'CFPF',
            },
        },
    });

    // Intl.~locale.fr
    IntlPolyfill.__addLocaleData({
        locale: 'fr',
        date: {
            ca: [
                'gregory',
                'buddhist',
                'chinese',
                'coptic',
                'dangi',
                'ethioaa',
                'ethiopic',
                'generic',
                'hebrew',
                'indian',
                'islamic',
                'islamicc',
                'japanese',
                'persian',
                'roc',
            ],
            hourNo0: true,
            hour12: false,
            formats: {
                short: '{1} {0}',
                medium: "{1} 'à' {0}",
                full: "{1} 'à' {0}",
                long: "{1} 'à' {0}",
                availableFormats: {
                    d: 'd',
                    E: 'E',
                    Ed: 'E d',
                    Ehm: 'E h:mm a',
                    EHm: 'E HH:mm',
                    Ehms: 'E h:mm:ss a',
                    EHms: 'E HH:mm:ss',
                    Gy: 'y G',
                    GyMMM: 'MMM y G',
                    GyMMMd: 'd MMM y G',
                    GyMMMEd: 'E d MMM y G',
                    h: 'h a',
                    H: "HH 'h'",
                    hm: 'h:mm a',
                    Hm: 'HH:mm',
                    hms: 'h:mm:ss a',
                    Hms: 'HH:mm:ss',
                    hmsv: 'h:mm:ss a v',
                    Hmsv: 'HH:mm:ss v',
                    hmv: 'h:mm a v',
                    Hmv: 'HH:mm v',
                    M: 'L',
                    Md: 'dd/MM',
                    MEd: 'E dd/MM',
                    MMM: 'LLL',
                    MMMd: 'd MMM',
                    MMMEd: 'E d MMM',
                    MMMMd: 'd MMMM',
                    ms: 'mm:ss',
                    y: 'y',
                    yM: 'MM/y',
                    yMd: 'dd/MM/y',
                    yMEd: 'E dd/MM/y',
                    yMMM: 'MMM y',
                    yMMMd: 'd MMM y',
                    yMMMEd: 'E d MMM y',
                    yMMMM: 'MMMM y',
                    yQQQ: 'QQQ y',
                    yQQQQ: 'QQQQ y',
                },
                dateFormats: {
                    yMMMMEEEEd: 'EEEE d MMMM y',
                    yMMMMd: 'd MMMM y',
                    yMMMd: 'd MMM y',
                    yMd: 'dd/MM/y',
                },
                timeFormats: {
                    hmmsszzzz: 'HH:mm:ss zzzz',
                    hmsz: 'HH:mm:ss z',
                    hms: 'HH:mm:ss',
                    hm: 'HH:mm',
                },
            },
            calendars: {
                buddhist: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'janv.',
                            'févr.',
                            'mars',
                            'avr.',
                            'mai',
                            'juin',
                            'juil.',
                            'août',
                            'sept.',
                            'oct.',
                            'nov.',
                            'déc.',
                        ],
                        long: [
                            'janvier',
                            'février',
                            'mars',
                            'avril',
                            'mai',
                            'juin',
                            'juillet',
                            'août',
                            'septembre',
                            'octobre',
                            'novembre',
                            'décembre',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['E.B.'],
                        short: ['ère b.'],
                        long: ['ère bouddhiste'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                chinese: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            '1yuè',
                            '2yuè',
                            '3yuè',
                            '4yuè',
                            '5yuè',
                            '6yuè',
                            '7yuè',
                            '8yuè',
                            '9yuè',
                            '10yuè',
                            '11yuè',
                            '12yuè',
                        ],
                        long: [
                            'zhēngyuè',
                            'èryuè',
                            'sānyuè',
                            'sìyuè',
                            'wǔyuè',
                            'liùyuè',
                            'qīyuè',
                            'bāyuè',
                            'jiǔyuè',
                            'shíyuè',
                            'shíyīyuè',
                            'shí’èryuè',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                coptic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Tout',
                            'Baba',
                            'Hator',
                            'Kiahk',
                            'Toba',
                            'Amshir',
                            'Baramhat',
                            'Baramouda',
                            'Bashans',
                            'Paona',
                            'Epep',
                            'Mesra',
                            'Nasie',
                        ],
                        long: [
                            'Tout',
                            'Baba',
                            'Hator',
                            'Kiahk',
                            'Toba',
                            'Amshir',
                            'Baramhat',
                            'Baramouda',
                            'Bashans',
                            'Paona',
                            'Epep',
                            'Mesra',
                            'Nasie',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                dangi: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            '1yuè',
                            '2yuè',
                            '3yuè',
                            '4yuè',
                            '5yuè',
                            '6yuè',
                            '7yuè',
                            '8yuè',
                            '9yuè',
                            '10yuè',
                            '11yuè',
                            '12yuè',
                        ],
                        long: [
                            'zhēngyuè',
                            'èryuè',
                            'sānyuè',
                            'sìyuè',
                            'wǔyuè',
                            'liùyuè',
                            'qīyuè',
                            'bāyuè',
                            'jiǔyuè',
                            'shíyuè',
                            'shíyīyuè',
                            'shí’èryuè',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                ethiopic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                        long: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                ethioaa: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                        ],
                        short: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                        long: [
                            'Meskerem',
                            'Tekemt',
                            'Hedar',
                            'Tahsas',
                            'Ter',
                            'Yekatit',
                            'Megabit',
                            'Miazia',
                            'Genbot',
                            'Sene',
                            'Hamle',
                            'Nehasse',
                            'Pagumen',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0'],
                        short: ['ERA0'],
                        long: ['ERA0'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                generic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                        long: [
                            'M01',
                            'M02',
                            'M03',
                            'M04',
                            'M05',
                            'M06',
                            'M07',
                            'M08',
                            'M09',
                            'M10',
                            'M11',
                            'M12',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['ERA0', 'ERA1'],
                        short: ['ERA0', 'ERA1'],
                        long: ['ERA0', 'ERA1'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                gregory: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'janv.',
                            'févr.',
                            'mars',
                            'avr.',
                            'mai',
                            'juin',
                            'juil.',
                            'août',
                            'sept.',
                            'oct.',
                            'nov.',
                            'déc.',
                        ],
                        long: [
                            'janvier',
                            'février',
                            'mars',
                            'avril',
                            'mai',
                            'juin',
                            'juillet',
                            'août',
                            'septembre',
                            'octobre',
                            'novembre',
                            'décembre',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['av. J.-C.', 'ap. J.-C.', 'AEC', 'EC'],
                        short: ['av. J.-C.', 'ap. J.-C.', 'AEC', 'EC'],
                        long: [
                            'avant Jésus-Christ',
                            'après Jésus-Christ',
                            'avant l’ère commune',
                            'de l’ère commune',
                        ],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                hebrew: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                            '13',
                            '7',
                        ],
                        short: [
                            'Tisseri',
                            'Hesvan',
                            'Kislev',
                            'Tébeth',
                            'Schébat',
                            'Adar I',
                            'Adar',
                            'Nissan',
                            'Iyar',
                            'Sivan',
                            'Tamouz',
                            'Ab',
                            'Elloul',
                            'Adar II',
                        ],
                        long: [
                            'Tisseri',
                            'Hesvan',
                            'Kislev',
                            'Tébeth',
                            'Schébat',
                            'Adar I',
                            'Adar',
                            'Nissan',
                            'Iyar',
                            'Sivan',
                            'Tamouz',
                            'Ab',
                            'Elloul',
                            'Adar II',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['AM'],
                        short: ['AM'],
                        long: ['AM'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                indian: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Chaitra',
                            'Vaisakha',
                            'Jyaistha',
                            'Asadha',
                            'Sravana',
                            'Bhadra',
                            'Asvina',
                            'Kartika',
                            'Agrahayana',
                            'Pausa',
                            'Magha',
                            'Phalguna',
                        ],
                        long: [
                            'Chaitra',
                            'Vaisakha',
                            'Jyaistha',
                            'Asadha',
                            'Sravana',
                            'Bhadra',
                            'Asvina',
                            'Kartika',
                            'Agrahayana',
                            'Pausa',
                            'Magha',
                            'Phalguna',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['Saka'],
                        short: ['Saka'],
                        long: ['Saka'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                islamic: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'mouh.',
                            'saf.',
                            'rab. aw.',
                            'rab. th.',
                            'joum. oul.',
                            'joum. tha.',
                            'raj.',
                            'chaa.',
                            'ram.',
                            'chaw.',
                            'dhou. q.',
                            'dhou. h.',
                        ],
                        long: [
                            'mouharram',
                            'safar',
                            'rabia al awal',
                            'rabia ath-thani',
                            'joumada al oula',
                            'joumada ath-thania',
                            'rajab',
                            'chaabane',
                            'ramadan',
                            'chawwal',
                            'dhou al qi`da',
                            'dhou al-hijja',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['AH'],
                        short: ['AH'],
                        long: ['AH'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                islamicc: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'mouh.',
                            'saf.',
                            'rab. aw.',
                            'rab. th.',
                            'joum. oul.',
                            'joum. tha.',
                            'raj.',
                            'chaa.',
                            'ram.',
                            'chaw.',
                            'dhou. q.',
                            'dhou. h.',
                        ],
                        long: [
                            'mouharram',
                            'safar',
                            'rabia al awal',
                            'rabia ath-thani',
                            'joumada al oula',
                            'joumada ath-thania',
                            'rajab',
                            'chaabane',
                            'ramadan',
                            'chawwal',
                            'dhou al qi`da',
                            'dhou al-hijja',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['AH'],
                        short: ['AH'],
                        long: ['AH'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                japanese: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'janv.',
                            'févr.',
                            'mars',
                            'avr.',
                            'mai',
                            'juin',
                            'juil.',
                            'août',
                            'sept.',
                            'oct.',
                            'nov.',
                            'déc.',
                        ],
                        long: [
                            'janvier',
                            'février',
                            'mars',
                            'avril',
                            'mai',
                            'juin',
                            'juillet',
                            'août',
                            'septembre',
                            'octobre',
                            'novembre',
                            'décembre',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'M',
                            'T',
                            'S',
                            'H',
                        ],
                        short: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'Meiji',
                            'Taishō',
                            'Shōwa',
                            'Heisei',
                        ],
                        long: [
                            'Taika (645–650)',
                            'Hakuchi (650–671)',
                            'Hakuhō (672–686)',
                            'Shuchō (686–701)',
                            'Taihō (701–704)',
                            'Keiun (704–708)',
                            'Wadō (708–715)',
                            'Reiki (715–717)',
                            'Yōrō (717–724)',
                            'Jinki (724–729)',
                            'Tenpyō (729–749)',
                            'Tenpyō-kampō (749-749)',
                            'Tenpyō-shōhō (749-757)',
                            'Tenpyō-hōji (757-765)',
                            'Tenpyō-jingo (765-767)',
                            'Jingo-keiun (767-770)',
                            'Hōki (770–780)',
                            'Ten-ō (781-782)',
                            'Enryaku (782–806)',
                            'Daidō (806–810)',
                            'Kōnin (810–824)',
                            'Tenchō (824–834)',
                            'Jōwa (834–848)',
                            'Kajō (848–851)',
                            'Ninju (851–854)',
                            'Saikō (854–857)',
                            'Ten-an (857-859)',
                            'Jōgan (859–877)',
                            'Gangyō (877–885)',
                            'Ninna (885–889)',
                            'Kanpyō (889–898)',
                            'Shōtai (898–901)',
                            'Engi (901–923)',
                            'Enchō (923–931)',
                            'Jōhei (931–938)',
                            'Tengyō (938–947)',
                            'Tenryaku (947–957)',
                            'Tentoku (957–961)',
                            'Ōwa (961–964)',
                            'Kōhō (964–968)',
                            'Anna (968–970)',
                            'Tenroku (970–973)',
                            'Ten’en (973–976)',
                            'Jōgen (976–978)',
                            'Tengen (978–983)',
                            'Eikan (983–985)',
                            'Kanna (985–987)',
                            'Eien (987–989)',
                            'Eiso (989–990)',
                            'Shōryaku (990–995)',
                            'Chōtoku (995–999)',
                            'Chōhō (999–1004)',
                            'Kankō (1004–1012)',
                            'Chōwa (1012–1017)',
                            'Kannin (1017–1021)',
                            'Jian (1021–1024)',
                            'Manju (1024–1028)',
                            'Chōgen (1028–1037)',
                            'Chōryaku (1037–1040)',
                            'Chōkyū (1040–1044)',
                            'Kantoku (1044–1046)',
                            'Eishō (1046–1053)',
                            'Tengi (1053–1058)',
                            'Kōhei (1058–1065)',
                            'Jiryaku (1065–1069)',
                            'Enkyū (1069–1074)',
                            'Shōho (1074–1077)',
                            'Shōryaku (1077–1081)',
                            'Eihō (1081–1084)',
                            'Ōtoku (1084–1087)',
                            'Kanji (1087–1094)',
                            'Kahō (1094–1096)',
                            'Eichō (1096–1097)',
                            'Jōtoku (1097–1099)',
                            'Kōwa (1099–1104)',
                            'Chōji (1104–1106)',
                            'Kashō (1106–1108)',
                            'Tennin (1108–1110)',
                            'Ten-ei (1110-1113)',
                            'Eikyū (1113–1118)',
                            'Gen’ei (1118–1120)',
                            'Hōan (1120–1124)',
                            'Tenji (1124–1126)',
                            'Daiji (1126–1131)',
                            'Tenshō (1131–1132)',
                            'Chōshō (1132–1135)',
                            'Hōen (1135–1141)',
                            'Eiji (1141–1142)',
                            'Kōji (1142–1144)',
                            'Ten’yō (1144–1145)',
                            'Kyūan (1145–1151)',
                            'Ninpei (1151–1154)',
                            'Kyūju (1154–1156)',
                            'Hōgen (1156–1159)',
                            'Heiji (1159–1160)',
                            'Eiryaku (1160–1161)',
                            'Ōho (1161–1163)',
                            'Chōkan (1163–1165)',
                            'Eiman (1165–1166)',
                            'Nin’an (1166–1169)',
                            'Kaō (1169–1171)',
                            'Shōan (1171–1175)',
                            'Angen (1175–1177)',
                            'Jishō (1177–1181)',
                            'Yōwa (1181–1182)',
                            'Juei (1182–1184)',
                            'Genryaku (1184–1185)',
                            'Bunji (1185–1190)',
                            'Kenkyū (1190–1199)',
                            'Shōji (1199–1201)',
                            'Kennin (1201–1204)',
                            'Genkyū (1204–1206)',
                            'Ken’ei (1206–1207)',
                            'Jōgen (1207–1211)',
                            'Kenryaku (1211–1213)',
                            'Kenpō (1213–1219)',
                            'Jōkyū (1219–1222)',
                            'Jōō (1222–1224)',
                            'Gennin (1224–1225)',
                            'Karoku (1225–1227)',
                            'Antei (1227–1229)',
                            'Kanki (1229–1232)',
                            'Jōei (1232–1233)',
                            'Tenpuku (1233–1234)',
                            'Bunryaku (1234–1235)',
                            'Katei (1235–1238)',
                            'Ryakunin (1238–1239)',
                            'En’ō (1239–1240)',
                            'Ninji (1240–1243)',
                            'Kangen (1243–1247)',
                            'Hōji (1247–1249)',
                            'Kenchō (1249–1256)',
                            'Kōgen (1256–1257)',
                            'Shōka (1257–1259)',
                            'Shōgen (1259–1260)',
                            'Bun’ō (1260–1261)',
                            'Kōchō (1261–1264)',
                            'Bun’ei (1264–1275)',
                            'Kenji (1275–1278)',
                            'Kōan (1278–1288)',
                            'Shōō (1288–1293)',
                            'Einin (1293–1299)',
                            'Shōan (1299–1302)',
                            'Kengen (1302–1303)',
                            'Kagen (1303–1306)',
                            'Tokuji (1306–1308)',
                            'Enkyō (1308–1311)',
                            'Ōchō (1311–1312)',
                            'Shōwa (1312–1317)',
                            'Bunpō (1317–1319)',
                            'Genō (1319–1321)',
                            'Genkō (1321–1324)',
                            'Shōchū (1324–1326)',
                            'Karyaku (1326–1329)',
                            'Gentoku (1329–1331)',
                            'Genkō (1331–1334)',
                            'Kenmu (1334–1336)',
                            'Engen (1336–1340)',
                            'Kōkoku (1340–1346)',
                            'Shōhei (1346–1370)',
                            'Kentoku (1370–1372)',
                            'Bunchū (1372–1375)',
                            'Tenju (1375–1379)',
                            'Kōryaku (1379–1381)',
                            'Kōwa (1381–1384)',
                            'Genchū (1384–1392)',
                            'Meitoku (1384–1387)',
                            'Kakei (1387–1389)',
                            'Kōō (1389–1390)',
                            'Meitoku (1390–1394)',
                            'Ōei (1394–1428)',
                            'Shōchō (1428–1429)',
                            'Eikyō (1429–1441)',
                            'Kakitsu (1441–1444)',
                            'Bun’an (1444–1449)',
                            'Hōtoku (1449–1452)',
                            'Kyōtoku (1452–1455)',
                            'Kōshō (1455–1457)',
                            'Chōroku (1457–1460)',
                            'Kanshō (1460–1466)',
                            'Bunshō (1466–1467)',
                            'Ōnin (1467–1469)',
                            'Bunmei (1469–1487)',
                            'Chōkyō (1487–1489)',
                            'Entoku (1489–1492)',
                            'Meiō (1492–1501)',
                            'Bunki (1501–1504)',
                            'Eishō (1504–1521)',
                            'Taiei (1521–1528)',
                            'Kyōroku (1528–1532)',
                            'Tenbun (1532–1555)',
                            'Kōji (1555–1558)',
                            'Eiroku (1558–1570)',
                            'Genki (1570–1573)',
                            'Tenshō (1573–1592)',
                            'Bunroku (1592–1596)',
                            'Keichō (1596–1615)',
                            'Genna (1615–1624)',
                            'Kan’ei (1624–1644)',
                            'Shōho (1644–1648)',
                            'Keian (1648–1652)',
                            'Jōō (1652–1655)',
                            'Meireki (1655–1658)',
                            'Manji (1658–1661)',
                            'Kanbun (1661–1673)',
                            'Enpō (1673–1681)',
                            'Tenna (1681–1684)',
                            'Jōkyō (1684–1688)',
                            'Genroku (1688–1704)',
                            'Hōei (1704–1711)',
                            'Shōtoku (1711–1716)',
                            'Kyōhō (1716–1736)',
                            'Genbun (1736–1741)',
                            'Kanpō (1741–1744)',
                            'Enkyō (1744–1748)',
                            'Kan’en (1748–1751)',
                            'Hōreki (1751–1764)',
                            'Meiwa (1764–1772)',
                            'An’ei (1772–1781)',
                            'Tenmei (1781–1789)',
                            'Kansei (1789–1801)',
                            'Kyōwa (1801–1804)',
                            'Bunka (1804–1818)',
                            'Bunsei (1818–1830)',
                            'Tenpō (1830–1844)',
                            'Kōka (1844–1848)',
                            'Kaei (1848–1854)',
                            'Ansei (1854–1860)',
                            'Man’en (1860–1861)',
                            'Bunkyū (1861–1864)',
                            'Genji (1864–1865)',
                            'Keiō (1865–1868)',
                            'Meiji',
                            'Taishō',
                            'Shōwa',
                            'Heisei',
                        ],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                persian: {
                    months: {
                        narrow: [
                            '1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10',
                            '11',
                            '12',
                        ],
                        short: [
                            'Farvardin',
                            'Ordibehesht',
                            'Khordad',
                            'Tir',
                            'Mordad',
                            'Shahrivar',
                            'Mehr',
                            'Aban',
                            'Azar',
                            'Dey',
                            'Bahman',
                            'Esfand',
                        ],
                        long: [
                            'Farvardin',
                            'Ordibehesht',
                            'Khordad',
                            'Tir',
                            'Mordad',
                            'Shahrivar',
                            'Mehr',
                            'Aban',
                            'Azar',
                            'Dey',
                            'Bahman',
                            'Esfand',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['AP'],
                        short: ['AP'],
                        long: ['AP'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
                roc: {
                    months: {
                        narrow: [
                            'J',
                            'F',
                            'M',
                            'A',
                            'M',
                            'J',
                            'J',
                            'A',
                            'S',
                            'O',
                            'N',
                            'D',
                        ],
                        short: [
                            'janv.',
                            'févr.',
                            'mars',
                            'avr.',
                            'mai',
                            'juin',
                            'juil.',
                            'août',
                            'sept.',
                            'oct.',
                            'nov.',
                            'déc.',
                        ],
                        long: [
                            'janvier',
                            'février',
                            'mars',
                            'avril',
                            'mai',
                            'juin',
                            'juillet',
                            'août',
                            'septembre',
                            'octobre',
                            'novembre',
                            'décembre',
                        ],
                    },
                    days: {
                        narrow: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
                        short: [
                            'dim.',
                            'lun.',
                            'mar.',
                            'mer.',
                            'jeu.',
                            'ven.',
                            'sam.',
                        ],
                        long: [
                            'dimanche',
                            'lundi',
                            'mardi',
                            'mercredi',
                            'jeudi',
                            'vendredi',
                            'samedi',
                        ],
                    },
                    eras: {
                        narrow: ['avant RdC', 'RdC'],
                        short: ['avant RdC', 'RdC'],
                        long: ['avant RdC', 'RdC'],
                    },
                    dayPeriods: {
                        am: 'AM',
                        pm: 'PM',
                    },
                },
            },
        },
        number: {
            nu: ['latn'],
            patterns: {
                decimal: {
                    positivePattern: '{number}',
                    negativePattern: '{minusSign}{number}',
                },
                currency: {
                    positivePattern: '{number} {currency}',
                    negativePattern: '{minusSign}{number} {currency}',
                },
                percent: {
                    positivePattern: '{number} {percentSign}',
                    negativePattern: '{minusSign}{number} {percentSign}',
                },
            },
            symbols: {
                latn: {
                    decimal: ',',
                    group: ' ',
                    nan: 'NaN',
                    plusSign: '+',
                    minusSign: '-',
                    percentSign: '%',
                    infinity: '∞',
                },
            },
            currencies: {
                ARS: '$AR',
                AUD: '$AU',
                BEF: 'FB',
                BMD: '$BM',
                BND: '$BN',
                BRL: 'R$',
                BSD: '$BS',
                BZD: '$BZ',
                CAD: '$CA',
                CLP: '$CL',
                COP: '$CO',
                CYP: '£CY',
                EUR: '€',
                FJD: '$FJ',
                FKP: '£FK',
                FRF: 'F',
                GBP: '£GB',
                GIP: '£GI',
                IEP: '£IE',
                ILP: '£IL',
                ILS: '₪',
                INR: '₹',
                ITL: '₤IT',
                KRW: '₩',
                LBP: '£LB',
                MTP: '£MT',
                MXN: '$MX',
                NAD: '$NA',
                NZD: '$NZ',
                RHD: '$RH',
                SBD: '$SB',
                SGD: '$SG',
                SRD: '$SR',
                TTD: '$TT',
                USD: '$US',
                UYU: '$UY',
                VND: '₫',
                WST: 'WS$',
                XAF: 'FCFA',
                XOF: 'CFA',
                XPF: 'FCFP',
            },
        },
    });
}).call(global);

global._Intl = global.Intl;
global.Intl = global.IntlPolyfill;

Number.prototype.toLocaleString = function (locale, options) {
    let formatter = Intl.NumberFormat(locale, options);
    return formatter.format(this);
};
