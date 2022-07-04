"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.symbol.async-iterator.js");

require("core-js/modules/es.symbol.to-string-tag.js");

require("core-js/modules/es.json.to-string-tag.js");

require("core-js/modules/es.math.to-string-tag.js");

require("core-js/modules/es.array.reverse.js");

require("core-js/modules/es.array.slice.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Formio = require("./Formio");

var _Webform2 = _interopRequireDefault(require("./Webform"));

var _utils = require("./utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var PDF = /*#__PURE__*/function (_Webform) {
  _inherits(PDF, _Webform);

  var _super = _createSuper(PDF);

  function PDF(element, options) {
    var _this;

    _classCallCheck(this, PDF);

    options.display = 'pdf';
    _this = _super.call(this, element, options);
    _this.components = [];
    return _this;
  }

  _createClass(PDF, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      _get(_getPrototypeOf(PDF.prototype), "init", this).call(this); // Handle an iframe submission.


      this.on('iframe-submission', function (submission) {
        return _this2.setValue(submission, {
          fromIframe: true
        });
      }, true);
      this.on('iframe-change', function (submission) {
        return _this2.setValue(submission, {
          fromIframe: true
        });
      }, true);
      this.on('iframe-getIframePositions', function (query) {
        var iframe = document.getElementById("iframe-".concat(query.formId));

        if (iframe) {
          var iframeBoundingClientRect = iframe.getBoundingClientRect();

          _this2.postMessage({
            name: 'iframePositions',
            data: {
              formId: query.formId,
              iframe: {
                top: iframeBoundingClientRect.top
              },
              scrollY: window.scrollY || window.pageYOffset
            }
          });
        }
      }); // Trigger when this form is ready.

      this.on('iframe-ready', function () {
        return _this2.iframeReadyResolve();
      }, true);
    }
  }, {
    key: "render",
    value: function render() {
      this.submitButton = this.addComponent({
        input: true,
        type: 'button',
        action: 'submit',
        internal: true,
        label: 'Submit',
        key: 'submit',
        ref: 'button',
        hidden: this.isSubmitButtonHidden()
      });
      return this.renderTemplate('pdf', {
        submitButton: this.submitButton.render(),
        classes: 'formio-form-pdf',
        children: this.renderComponents()
      });
    }
  }, {
    key: "redraw",
    value: function redraw() {
      this.postMessage({
        name: 'redraw'
      });
      return this.builderMode ? _nativePromiseOnly["default"].resolve() : _get(_getPrototypeOf(PDF.prototype), "redraw", this).call(this);
    }
  }, {
    key: "rebuild",
    value: function rebuild() {
      if (this.builderMode && this.component.components) {
        this.destroyComponents();
        this.addComponents();
        return _nativePromiseOnly["default"].resolve();
      }

      this.postMessage({
        name: 'redraw'
      });
      return _get(_getPrototypeOf(PDF.prototype), "rebuild", this).call(this);
    } // Do not attach nested components for pdf.

  }, {
    key: "attachComponents",
    value: function attachComponents(element, components, container) {
      components = components || this.components;
      container = container || this.component.components;
      element = this.hook('attachComponents', element, components, container, this);
      return Promise.resolve();
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this3 = this;

      return _get(_getPrototypeOf(PDF.prototype), "attach", this).call(this, element).then( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var iframeSrc, _this3$options, appEnv, headers, acceptedEnvs, bodyRequest, htmlBody, iframeWindow, iframeDoc, submitButton, form;

        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this3.loadRefs(element, {
                  button: 'single',
                  buttonMessageContainer: 'single',
                  buttonMessage: 'single',
                  zoomIn: 'single',
                  zoomOut: 'single',
                  iframeContainer: 'single'
                });

                _this3.submitButton.refs = _objectSpread({}, _this3.refs);

                _this3.submitButton.attachButton(); // Reset the iframeReady promise.


                _this3.iframeReady = new _nativePromiseOnly["default"](function (resolve, reject) {
                  _this3.iframeReadyResolve = resolve;
                  _this3.iframeReadyReject = reject;
                }); // iframes cannot be in the template so manually create it

                iframeSrc = _this3.getSrc();
                _this3.iframeElement = _this3.ce('iframe', {
                  src: iframeSrc,
                  id: "iframe-".concat(_this3.id),
                  seamless: true,
                  "class": 'formio-iframe'
                });
                _this3.iframeElement.formioContainer = _this3.component.components;
                _this3.iframeElement.formioComponent = _this3; // Append the iframe to the iframeContainer in the template

                _this3.empty(_this3.refs.iframeContainer);

                _this3.appendChild(_this3.refs.iframeContainer, _this3.iframeElement);

                _this3$options = _this3.options, appEnv = _this3$options.appEnv, headers = _this3$options.headers;
                acceptedEnvs = [];

                if (!acceptedEnvs.includes(appEnv)) {
                  _context.next = 30;
                  break;
                }

                _context.prev = 13;
                _context.next = 16;
                return fetch(iframeSrc, {
                  method: 'GET',
                  headers: _objectSpread({
                    credentials: 'include'
                  }, headers)
                });

              case 16:
                bodyRequest = _context.sent;
                _context.next = 19;
                return bodyRequest.text();

              case 19:
                htmlBody = _context.sent;
                iframeWindow = _this3.iframeElement.contentWindow || _this3.iframeElement.contentDocument.parentWindow;
                iframeDoc = iframeWindow.document;
                iframeDoc.open();
                iframeDoc.write(htmlBody);
                iframeDoc.close();
                _context.next = 30;
                break;

              case 27:
                _context.prev = 27;
                _context.t0 = _context["catch"](13);
                console.log('error setting pdf iframe', _context.t0);

              case 30:
                // Post the form to the iframe
                _this3.form.base = _Formio.GlobalFormio.getBaseUrl();
                _this3.form.projectUrl = _Formio.GlobalFormio.getProjectUrl();

                _this3.postMessage({
                  name: 'form',
                  data: _this3.form
                }); // Hide the submit button if the associated component is hidden


                submitButton = _this3.components.find(function (c) {
                  return c.element === _this3.refs.button;
                });

                if (submitButton) {
                  _this3.refs.button.classList.toggle('hidden', !submitButton.visible);
                }

                _this3.addEventListener(_this3.refs.zoomIn, 'click', function (event) {
                  event.preventDefault();

                  _this3.postMessage({
                    name: 'zoomIn'
                  });
                });

                _this3.addEventListener(_this3.refs.zoomOut, 'click', function (event) {
                  event.preventDefault();

                  _this3.postMessage({
                    name: 'zoomOut'
                  });
                });

                form = (0, _utils.fastCloneDeep)(_this3.form);

                if (_this3.formio) {
                  form.projectUrl = _this3.formio.projectUrl;
                  form.url = _this3.formio.formUrl;
                  form.base = _this3.formio.base;

                  _this3.postMessage({
                    name: 'token',
                    data: _this3.formio.getToken()
                  });
                }

                _this3.emit('attach');

              case 40:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[13, 27]]);
      })));
    }
    /**
     * Get the submission from the iframe.
     *
     * @return {Promise<any>}
     */

  }, {
    key: "getSubmission",
    value: function getSubmission() {
      var _this4 = this;

      return new _nativePromiseOnly["default"](function (resolve) {
        _this4.once('iframe-submission', resolve);

        _this4.postMessage({
          name: 'getSubmission'
        });
      });
    }
    /**
     * Ensure we have the submission from the iframe before we submit the form.
     *
     * @param options
     * @return {*}
     */

  }, {
    key: "submitForm",
    value: function submitForm() {
      var _this5 = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.postMessage({
        name: 'getErrors'
      });
      return this.getSubmission().then(function () {
        return _get(_getPrototypeOf(PDF.prototype), "submitForm", _this5).call(_this5, options);
      });
    }
  }, {
    key: "getSrc",
    value: function getSrc() {
      if (!this._form || !this._form.settings || !this._form.settings.pdf) {
        return '';
      }

      var iframeSrc = "".concat(this._form.settings.pdf.src, ".html");
      var params = ["id=".concat(this.id)];

      if (this.options.showCheckboxBackground || this._form.settings.showCheckboxBackground) {
        params.push('checkboxbackground=1');
      }

      if (this.options.readOnly) {
        params.push('readonly=1');
      }

      if (this.options.zoom) {
        params.push("zoom=".concat(this.options.zoom));
      }

      if (this.builderMode) {
        params.push('builder=1');
      }

      if (params.length) {
        iframeSrc += "?".concat(params.join('&'));
      }

      return iframeSrc;
    }
  }, {
    key: "setForm",
    value: function setForm(form) {
      var _this6 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return _get(_getPrototypeOf(PDF.prototype), "setForm", this).call(this, form, flags).then(function () {
        if (_this6.formio) {
          form.projectUrl = _this6.formio.projectUrl;
          form.url = _this6.formio.formUrl;
          form.base = _this6.formio.base;

          _this6.postMessage({
            name: 'token',
            data: _this6.formio.getToken()
          });
        }

        _this6.postMessage({
          name: 'form',
          data: _this6.form
        });
      });
    }
    /**
     * Set's the value of this form component.
     *
     * @param submission
     * @param flags
     */

  }, {
    key: "setValue",
    value: function setValue(submission) {
      var _this7 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var changed = _get(_getPrototypeOf(PDF.prototype), "setValue", this).call(this, submission, flags);

      if (!flags || !flags.fromIframe) {
        this.once('iframe-ready', function () {
          if (changed) {
            _this7.postMessage({
              name: 'submission',
              data: submission
            });
          }
        });
      }

      return changed;
    }
  }, {
    key: "postMessage",
    value: function postMessage(message) {
      var _this8 = this;

      // If we get here before the iframeReady promise is set up, it's via the superclass constructor
      if (!this.iframeReady) {
        return;
      }

      if (!message.type) {
        message.type = 'iframe-data';
      }

      this.iframeReady.then(function () {
        if (_this8.iframeElement && _this8.iframeElement.contentWindow && !(message.name === 'form' && _this8.iframeFormSetUp)) {
          _this8.iframeElement.contentWindow.postMessage(JSON.stringify(message), '*');

          _this8.iframeFormSetUp = message.name === 'form';
        }
      });
    }
  }, {
    key: "focusOnComponent",
    value: function focusOnComponent(key) {
      this.postMessage({
        name: 'focusErroredField',
        data: key
      });
    } // Do not clear the iframe.

  }, {
    key: "clear",
    value: function clear() {}
  }, {
    key: "showErrors",
    value: function showErrors(error, triggerEvent) {
      var _this$refs$buttonMess;

      var helpBlock = document.getElementById('submit-error');
      var submitError = this.t('submitError');
      var isSubmitErrorShown = ((_this$refs$buttonMess = this.refs.buttonMessage) === null || _this$refs$buttonMess === void 0 ? void 0 : _this$refs$buttonMess.textContent.trim()) === submitError;

      if (!helpBlock && this.errors.length && !isSubmitErrorShown) {
        var p = this.ce('p', {
          "class": 'help-block'
        });
        this.setContent(p, submitError);
        p.addEventListener('click', function () {
          window.scrollTo(0, 0);
        });
        var div = this.ce('div', {
          id: 'submit-error',
          "class": 'has-error'
        });
        this.appendTo(p, div);
        this.appendTo(div, this.element);
      }

      if (!this.errors.length && helpBlock) {
        helpBlock.remove();
      }

      _get(_getPrototypeOf(PDF.prototype), "showErrors", this).call(this, error, triggerEvent);
    }
  }, {
    key: "isSubmitButtonHidden",
    value: function isSubmitButtonHidden() {
      var hidden = false;
      (0, _utils.eachComponent)(this.component.components, function (component) {
        if (component.type === 'button' && (component.action === 'submit' || !component.action)) {
          hidden = component.hidden || false;
        }
      });
      return hidden;
    }
  }]);

  return PDF;
}(_Webform2["default"]);
/**
 * Listen for window messages.
 */


exports["default"] = PDF;

if (typeof window !== 'undefined') {
  window.addEventListener('message', function (event) {
    var eventData = null;

    try {
      eventData = JSON.parse(event.data);
    } catch (err) {
      eventData = null;
    } // If this form exists, then emit the event within this form.


    if (eventData && eventData.name && eventData.formId && _Formio.GlobalFormio.forms.hasOwnProperty(eventData.formId)) {
      _Formio.GlobalFormio.forms[eventData.formId].emit("iframe-".concat(eventData.name), eventData.data);
    }
  });
}