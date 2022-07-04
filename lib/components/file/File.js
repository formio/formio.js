"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.symbol.async-iterator.js");

require("core-js/modules/es.symbol.to-string-tag.js");

require("core-js/modules/es.json.to-string-tag.js");

require("core-js/modules/es.math.to-string-tag.js");

require("core-js/modules/es.array.reverse.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/web.timers.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.array-buffer.slice.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.typed-array.uint8-array.js");

require("core-js/modules/es.typed-array.copy-within.js");

require("core-js/modules/es.typed-array.every.js");

require("core-js/modules/es.typed-array.fill.js");

require("core-js/modules/es.typed-array.filter.js");

require("core-js/modules/es.typed-array.find.js");

require("core-js/modules/es.typed-array.find-index.js");

require("core-js/modules/es.typed-array.for-each.js");

require("core-js/modules/es.typed-array.includes.js");

require("core-js/modules/es.typed-array.index-of.js");

require("core-js/modules/es.typed-array.iterator.js");

require("core-js/modules/es.typed-array.join.js");

require("core-js/modules/es.typed-array.last-index-of.js");

require("core-js/modules/es.typed-array.map.js");

require("core-js/modules/es.typed-array.reduce.js");

require("core-js/modules/es.typed-array.reduce-right.js");

require("core-js/modules/es.typed-array.reverse.js");

require("core-js/modules/es.typed-array.set.js");

require("core-js/modules/es.typed-array.slice.js");

require("core-js/modules/es.typed-array.some.js");

require("core-js/modules/es.typed-array.sort.js");

require("core-js/modules/es.typed-array.subarray.js");

require("core-js/modules/es.typed-array.to-locale-string.js");

require("core-js/modules/es.typed-array.to-string.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.date.now.js");

require("core-js/modules/es.date.to-string.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.number.to-fixed.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.parse-float.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.some.js");

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.array.index-of.js");

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _utils = require("../../utils/utils");

var _downloadjs = _interopRequireDefault(require("downloadjs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _fileProcessor = _interopRequireDefault(require("../../providers/processor/fileProcessor"));

var _browserMd5File = _interopRequireDefault(require("browser-md5-file"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var Camera;
var webViewCamera = navigator.camera || Camera; // canvas.toBlob polyfill.

var htmlCanvasElement;

if (typeof window !== 'undefined') {
  htmlCanvasElement = window.HTMLCanvasElement;
} else if (typeof global !== 'undefined') {
  htmlCanvasElement = global.HTMLCanvasElement;
}

if (htmlCanvasElement && !htmlCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function value(callback, type, quality) {
      var canvas = this;
      setTimeout(function () {
        var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], {
          type: type || 'image/png'
        }));
      });
    }
  });
}

var FileComponent = /*#__PURE__*/function (_Field) {
  _inherits(FileComponent, _Field);

  var _super = _createSuper(FileComponent);

  function FileComponent() {
    _classCallCheck(this, FileComponent);

    return _super.apply(this, arguments);
  }

  _createClass(FileComponent, [{
    key: "init",
    value: function init() {
      var _this = this;

      _get(_getPrototypeOf(FileComponent.prototype), "init", this).call(this);

      webViewCamera = navigator.camera || Camera;
      var fileReaderSupported = typeof FileReader !== 'undefined';
      var formDataSupported = typeof window !== 'undefined' ? Boolean(window.FormData) : false;
      var progressSupported = typeof window !== 'undefined' && window.XMLHttpRequest ? 'upload' in new XMLHttpRequest() : false;
      this.support = {
        filereader: fileReaderSupported,
        formdata: formDataSupported,
        hasWarning: !fileReaderSupported || !formDataSupported || !progressSupported,
        progress: progressSupported
      }; // Called when our files are ready.

      this.filesReady = new _nativePromiseOnly["default"](function (resolve, reject) {
        _this.filesReadyResolve = resolve;
        _this.filesReadyReject = reject;
      });
      this.cameraMode = false;
      this.statuses = [];
      this.fileDropHidden = false;
    }
  }, {
    key: "dataReady",
    get: function get() {
      return this.filesReady;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return FileComponent.schema();
    }
  }, {
    key: "loadImage",
    value: function loadImage(fileInfo) {
      if (this.component.privateDownload) {
        fileInfo["private"] = true;
      }

      return this.fileService.downloadFile(fileInfo).then(function (result) {
        return result.url;
      });
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [];
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (_lodash["default"].isArray(value)) {
        return _lodash["default"].map(value, 'originalName').join(', ');
      }

      return _lodash["default"].get(value, 'originalName', '');
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(FileComponent.prototype), "defaultValue", this);

      return Array.isArray(value) ? value : [];
    }
  }, {
    key: "hasTypes",
    get: function get() {
      return this.component.fileTypes && Array.isArray(this.component.fileTypes) && this.component.fileTypes.length !== 0 && (this.component.fileTypes[0].label !== '' || this.component.fileTypes[0].value !== '');
    }
  }, {
    key: "fileDropHidden",
    get: function get() {
      return this._fileBrowseHidden;
    },
    set: function set(value) {
      if (typeof value !== 'boolean' || this.component.multiple) {
        return;
      }

      this._fileBrowseHidden = value;
    }
  }, {
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(FileComponent.prototype), "render", this).call(this, this.renderTemplate('file', {
        fileSize: this.fileSize,
        files: this.dataValue || [],
        statuses: this.statuses,
        disabled: this.disabled,
        support: this.support,
        fileDropHidden: this.fileDropHidden
      }));
    }
  }, {
    key: "getVideoStream",
    value: function getVideoStream(constraints) {
      return navigator.mediaDevices.getUserMedia({
        video: _objectSpread({
          width: {
            min: 640,
            ideal: 1920
          },
          height: {
            min: 360,
            ideal: 1080
          },
          aspectRatio: {
            ideal: 16 / 9
          }
        }, constraints),
        audio: false
      });
    }
  }, {
    key: "stopVideoStream",
    value: function stopVideoStream(videoStream) {
      videoStream.getVideoTracks().forEach(function (track) {
        return track.stop();
      });
    }
  }, {
    key: "getFrame",
    value: function getFrame(videoPlayer) {
      return new _nativePromiseOnly["default"](function (resolve) {
        var canvas = document.createElement('canvas');
        canvas.height = videoPlayer.videoHeight;
        canvas.width = videoPlayer.videoWidth;
        var context = canvas.getContext('2d');
        context.drawImage(videoPlayer, 0, 0);
        canvas.toBlob(resolve);
      });
    }
  }, {
    key: "startVideo",
    value: function startVideo() {
      var _this2 = this;

      this.getVideoStream().then(function (stream) {
        _this2.videoStream = stream;
        var videoPlayer = _this2.refs.videoPlayer;

        if (!videoPlayer) {
          console.warn('Video player not found in template.');
          _this2.cameraMode = false;

          _this2.redraw();

          return;
        }

        videoPlayer.srcObject = stream;
        var width = parseInt(_this2.component.webcamSize) || 320;
        videoPlayer.setAttribute('width', width);
        videoPlayer.play();
      })["catch"](function (err) {
        console.error(err);
        _this2.cameraMode = false;

        _this2.redraw();
      });
    }
  }, {
    key: "stopVideo",
    value: function stopVideo() {
      if (this.videoStream) {
        this.stopVideoStream(this.videoStream);
        this.videoStream = null;
      }
    }
  }, {
    key: "takePicture",
    value: function takePicture() {
      var _this3 = this;

      var videoPlayer = this.refs.videoPlayer;

      if (!videoPlayer) {
        console.warn('Video player not found in template.');
        this.cameraMode = false;
        this.redraw();
        return;
      }

      this.getFrame(videoPlayer).then(function (frame) {
        frame.name = "photo-".concat(Date.now(), ".png");

        _this3.upload([frame]);

        _this3.cameraMode = false;

        _this3.redraw();
      });
    }
  }, {
    key: "browseFiles",
    value: function browseFiles() {
      var _this4 = this;

      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _nativePromiseOnly["default"](function (resolve) {
        var fileInput = _this4.ce('input', _objectSpread({
          type: 'file',
          style: 'height: 0; width: 0; visibility: hidden;',
          tabindex: '-1'
        }, attrs));

        document.body.appendChild(fileInput);
        fileInput.addEventListener('change', function () {
          resolve(fileInput.files);
          document.body.removeChild(fileInput);
        }, true); // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
        // a click event on it.

        if (typeof fileInput.trigger === 'function') {
          fileInput.trigger('click');
        } else {
          fileInput.click();
        }
      });
    }
  }, {
    key: "cameraMode",
    get: function get() {
      return this._cameraMode;
    },
    set: function set(value) {
      this._cameraMode = value;

      if (value) {
        this.startVideo();
      } else {
        this.stopVideo();
      }
    }
  }, {
    key: "useWebViewCamera",
    get: function get() {
      return this.imageUpload && webViewCamera;
    }
  }, {
    key: "imageUpload",
    get: function get() {
      return Boolean(this.component.image);
    }
  }, {
    key: "browseOptions",
    get: function get() {
      var options = {};

      if (this.component.multiple) {
        options.multiple = true;
      } //use "accept" attribute only for desktop devices because of its limited support by mobile browsers


      if (!this.isMobile.any) {
        var filePattern = this.component.filePattern.trim() || '';
        var imagesPattern = 'image/*';

        if (this.imageUpload && (!filePattern || filePattern === '*')) {
          options.accept = imagesPattern;
        } else if (this.imageUpload && !filePattern.includes(imagesPattern)) {
          options.accept = "".concat(imagesPattern, ",").concat(filePattern);
        } else {
          options.accept = filePattern;
        }
      }

      return options;
    }
  }, {
    key: "deleteFile",
    value: function deleteFile(fileInfo) {
      var _this$component$optio = this.component.options,
          options = _this$component$optio === void 0 ? {} : _this$component$optio;

      if (fileInfo && ['url', 'indexeddb'].includes(this.component.storage)) {
        var fileService = this.fileService;

        if (fileService && typeof fileService.deleteFile === 'function') {
          fileService.deleteFile(fileInfo, options);
        } else {
          var formio = this.options.formio || this.root && this.root.formio;

          if (formio) {
            formio.makeRequest('', fileInfo.url, 'delete');
          }
        }
      }
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this5 = this;

      this.loadRefs(element, {
        fileDrop: 'single',
        fileBrowse: 'single',
        galleryButton: 'single',
        cameraButton: 'single',
        takePictureButton: 'single',
        toggleCameraMode: 'single',
        videoPlayer: 'single',
        fileLink: 'multiple',
        removeLink: 'multiple',
        fileStatusRemove: 'multiple',
        fileImage: 'multiple',
        fileType: 'multiple',
        fileProcessingLoader: 'single'
      }); // Ensure we have an empty input refs. We need this for the setValue method to redraw the control when it is set.

      this.refs.input = [];

      var superAttach = _get(_getPrototypeOf(FileComponent.prototype), "attach", this).call(this, element);

      if (this.refs.fileDrop) {
        var _element = this;

        this.addEventListener(this.refs.fileDrop, 'dragover', function (event) {
          this.className = 'fileSelector fileDragOver';
          event.preventDefault();
        });
        this.addEventListener(this.refs.fileDrop, 'dragleave', function (event) {
          this.className = 'fileSelector';
          event.preventDefault();
        });
        this.addEventListener(this.refs.fileDrop, 'drop', function (event) {
          this.className = 'fileSelector';
          event.preventDefault();

          _element.upload(event.dataTransfer.files);
        });
      }

      if (this.refs.fileBrowse) {
        this.addEventListener(this.refs.fileBrowse, 'click', function (event) {
          event.preventDefault();

          _this5.browseFiles(_this5.browseOptions).then(function (files) {
            _this5.upload(files);
          });
        });
      }

      this.refs.fileLink.forEach(function (fileLink, index) {
        _this5.addEventListener(fileLink, 'click', function (event) {
          event.preventDefault();

          _this5.getFile(_this5.dataValue[index]);
        });
      });
      this.refs.removeLink.forEach(function (removeLink, index) {
        _this5.addEventListener(removeLink, 'click', function (event) {
          var fileInfo = _this5.dataValue[index];

          _this5.deleteFile(fileInfo);

          event.preventDefault();

          _this5.splice(index);

          _this5.redraw();
        });
      });
      this.refs.fileStatusRemove.forEach(function (fileStatusRemove, index) {
        _this5.addEventListener(fileStatusRemove, 'click', function (event) {
          event.preventDefault();

          if (_this5.abortUpload) {
            _this5.abortUpload();
          }

          _this5.statuses.splice(index, 1);

          _this5.redraw();
        });
      });

      if (this.refs.galleryButton && webViewCamera) {
        this.addEventListener(this.refs.galleryButton, 'click', function (event) {
          event.preventDefault();
          webViewCamera.getPicture(function (success) {
            window.resolveLocalFileSystemURL(success, function (fileEntry) {
              fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (evt) {
                  var blob = new Blob([new Uint8Array(evt.target.result)], {
                    type: file.type
                  });
                  blob.name = file.name;

                  _this5.upload([blob]);
                };

                reader.readAsArrayBuffer(file);
              });
            });
          }, function (err) {
            console.error(err);
          }, {
            sourceType: webViewCamera.PictureSourceType.PHOTOLIBRARY
          });
        });
      }

      if (this.refs.cameraButton && webViewCamera) {
        this.addEventListener(this.refs.cameraButton, 'click', function (event) {
          event.preventDefault();
          webViewCamera.getPicture(function (success) {
            window.resolveLocalFileSystemURL(success, function (fileEntry) {
              fileEntry.file(function (file) {
                var reader = new FileReader();

                reader.onloadend = function (evt) {
                  var blob = new Blob([new Uint8Array(evt.target.result)], {
                    type: file.type
                  });
                  blob.name = file.name;

                  _this5.upload([blob]);
                };

                reader.readAsArrayBuffer(file);
              });
            });
          }, function (err) {
            console.error(err);
          }, {
            sourceType: webViewCamera.PictureSourceType.CAMERA,
            encodingType: webViewCamera.EncodingType.PNG,
            mediaType: webViewCamera.MediaType.PICTURE,
            saveToPhotoAlbum: true,
            correctOrientation: false
          });
        });
      }

      if (this.refs.takePictureButton) {
        this.addEventListener(this.refs.takePictureButton, 'click', function (event) {
          event.preventDefault();

          _this5.takePicture();
        });
      }

      if (this.refs.toggleCameraMode) {
        this.addEventListener(this.refs.toggleCameraMode, 'click', function (event) {
          event.preventDefault();
          _this5.cameraMode = !_this5.cameraMode;

          _this5.redraw();
        });
      }

      this.refs.fileType.forEach(function (fileType, index) {
        _this5.dataValue[index].fileType = _this5.dataValue[index].fileType || _this5.component.fileTypes[0].label;

        _this5.addEventListener(fileType, 'change', function (event) {
          event.preventDefault();

          var fileType = _this5.component.fileTypes.find(function (typeObj) {
            return typeObj.value === event.target.value;
          });

          _this5.dataValue[index].fileType = fileType.label;
        });
      });
      var fileService = this.fileService;

      if (fileService) {
        var loadingImages = [];
        this.refs.fileImage.forEach(function (image, index) {
          loadingImages.push(_this5.loadImage(_this5.dataValue[index]).then(function (url) {
            return image.src = url;
          }));
        });

        if (loadingImages.length) {
          _nativePromiseOnly["default"].all(loadingImages).then(function () {
            _this5.filesReadyResolve();
          })["catch"](function () {
            return _this5.filesReadyReject();
          });
        } else {
          this.filesReadyResolve();
        }
      }

      return superAttach;
    }
    /* eslint-disable max-len */

  }, {
    key: "fileSize",
    value: function fileSize(a, b, c, d, e) {
      return "".concat((b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2), " ").concat(e ? "".concat('kMGTPEZY'[--e], "B") : 'Bytes');
    }
    /* eslint-enable max-len */

    /* eslint-disable max-depth */

  }, {
    key: "globStringToRegex",
    value: function globStringToRegex(str) {
      str = str.replace(/\s/g, '');
      var regexp = '',
          excludes = [];

      if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
        regexp = str.substring(1, str.length - 1);
      } else {
        var split = str.split(',');

        if (split.length > 1) {
          for (var i = 0; i < split.length; i++) {
            var r = this.globStringToRegex(split[i]);

            if (r.regexp) {
              regexp += "(".concat(r.regexp, ")");

              if (i < split.length - 1) {
                regexp += '|';
              }
            } else {
              excludes = excludes.concat(r.excludes);
            }
          }
        } else {
          if (str.startsWith('!')) {
            excludes.push("^((?!".concat(this.globStringToRegex(str.substring(1)).regexp, ").)*$"));
          } else {
            if (str.startsWith('.')) {
              str = "*".concat(str);
            }

            regexp = "^".concat(str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&'), "$");
            regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
          }
        }
      }

      return {
        regexp: regexp,
        excludes: excludes
      };
    }
    /* eslint-enable max-depth */

  }, {
    key: "translateScalars",
    value: function translateScalars(str) {
      if (typeof str === 'string') {
        if (str.search(/kb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1024);
        }

        if (str.search(/mb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1024 * 1024);
        }

        if (str.search(/gb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1024 * 1024 * 1024);
        }

        if (str.search(/b/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1));
        }

        if (str.search(/s/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1));
        }

        if (str.search(/m/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1) * 60);
        }

        if (str.search(/h/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1) * 3600);
        }
      }

      return str;
    }
  }, {
    key: "validatePattern",
    value: function validatePattern(file, val) {
      if (!val) {
        return true;
      }

      var pattern = this.globStringToRegex(val);
      var valid = true;

      if (pattern.regexp && pattern.regexp.length) {
        var regexp = new RegExp(pattern.regexp, 'i');
        valid = !_lodash["default"].isNil(file.type) && regexp.test(file.type) || !_lodash["default"].isNil(file.name) && regexp.test(file.name);
      }

      valid = pattern.excludes.reduce(function (result, excludePattern) {
        var exclude = new RegExp(excludePattern, 'i');
        return result && (_lodash["default"].isNil(file.type) || !exclude.test(file.type)) && (_lodash["default"].isNil(file.name) || !exclude.test(file.name));
      }, valid);
      return valid;
    }
  }, {
    key: "validateMinSize",
    value: function validateMinSize(file, val) {
      return file.size + 0.1 >= this.translateScalars(val);
    }
  }, {
    key: "validateMaxSize",
    value: function validateMaxSize(file, val) {
      return file.size - 0.1 <= this.translateScalars(val);
    }
  }, {
    key: "upload",
    value: function upload(files) {
      var _this6 = this;

      // Only allow one upload if not multiple.
      if (!this.component.multiple) {
        if (this.statuses.length) {
          this.statuses = [];
        }

        files = Array.prototype.slice.call(files, 0, 1);
      }

      if (this.component.storage && files && files.length) {
        this.fileDropHidden = true; // files is not really an array and does not have a forEach method, so fake it.

        /* eslint-disable max-statements */

        Array.prototype.forEach.call(files, /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(file) {
            var bmf, hash, fileName, fileUpload, fileWithSameNameUploaded, fileWithSameNameUploadedWithError, dir, fileService, _this6$component, storage, _this6$component$opti, options, url, groupKey, groupPermissions, fileKey, groupResourceId, processedFile, fileProcessorHandler, filePromise;

            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    bmf = new _browserMd5File["default"]();
                    _context.next = 3;
                    return new Promise(function (resolve, reject) {
                      bmf.md5(file, function (err, md5) {
                        if (err) {
                          return reject(err);
                        }

                        return resolve(md5);
                      });
                    });

                  case 3:
                    hash = _context.sent;
                    fileName = (0, _utils.uniqueName)(file.name, _this6.component.fileNameTemplate, _this6.evalContext());
                    fileUpload = {
                      originalName: file.name,
                      name: fileName,
                      size: file.size,
                      status: 'info',
                      message: _this6.t('Processing file. Please wait...'),
                      hash: hash
                    }; // Check if file with the same name is being uploaded

                    fileWithSameNameUploaded = _this6.dataValue.some(function (fileStatus) {
                      return fileStatus.originalName === file.name;
                    });
                    fileWithSameNameUploadedWithError = _this6.statuses.findIndex(function (fileStatus) {
                      return fileStatus.originalName === file.name && fileStatus.status === 'error';
                    });

                    if (fileWithSameNameUploaded) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File with the same name is already uploaded');
                    }

                    if (fileWithSameNameUploadedWithError !== -1) {
                      _this6.statuses.splice(fileWithSameNameUploadedWithError, 1);

                      _this6.redraw();
                    } // Check file pattern


                    if (_this6.component.filePattern && !_this6.validatePattern(file, _this6.component.filePattern)) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File is the wrong type; it must be {{ pattern }}', {
                        pattern: _this6.component.filePattern
                      });
                    } // Check file minimum size


                    if (_this6.component.fileMinSize && !_this6.validateMinSize(file, _this6.component.fileMinSize)) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File is too small; it must be at least {{ size }}', {
                        size: _this6.component.fileMinSize
                      });
                    } // Check file maximum size


                    if (_this6.component.fileMaxSize && !_this6.validateMaxSize(file, _this6.component.fileMaxSize)) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File is too big; it must be at most {{ size }}', {
                        size: _this6.component.fileMaxSize
                      });
                    } // Get a unique name for this file to keep file collisions from occurring.


                    dir = _this6.interpolate(_this6.component.dir || '');
                    fileService = _this6.fileService;

                    if (!fileService) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File Service not provided.');
                    }

                    _this6.statuses.push(fileUpload);

                    _this6.redraw();

                    if (!(fileUpload.status !== 'error')) {
                      _context.next = 50;
                      break;
                    }

                    if (_this6.component.privateDownload) {
                      file["private"] = true;
                    }

                    _this6$component = _this6.component, storage = _this6$component.storage, _this6$component$opti = _this6$component.options, options = _this6$component$opti === void 0 ? {} : _this6$component$opti;
                    url = _this6.interpolate(_this6.component.url, {
                      file: fileUpload
                    });
                    groupKey = null;
                    groupPermissions = null; //Iterate through form components to find group resource if one exists

                    _this6.root.everyComponent(function (element) {
                      var _element$component, _element$component2;

                      if ((_element$component = element.component) !== null && _element$component !== void 0 && _element$component.submissionAccess || (_element$component2 = element.component) !== null && _element$component2 !== void 0 && _element$component2.defaultPermission) {
                        groupPermissions = !element.component.submissionAccess ? [{
                          type: element.component.defaultPermission,
                          roles: []
                        }] : element.component.submissionAccess;
                        groupPermissions.forEach(function (permission) {
                          groupKey = ['admin', 'write', 'create'].includes(permission.type) ? element.component.key : null;
                        });
                      }
                    });

                    fileKey = _this6.component.fileKey || 'file';
                    groupResourceId = groupKey ? _this6.currentForm.submission.data[groupKey]._id : null;
                    processedFile = null;

                    if (!_this6.root.options.fileProcessor) {
                      _context.next = 47;
                      break;
                    }

                    _context.prev = 29;

                    if (_this6.refs.fileProcessingLoader) {
                      _this6.refs.fileProcessingLoader.style.display = 'block';
                    }

                    fileProcessorHandler = (0, _fileProcessor["default"])(_this6.fileService, _this6.root.options.fileProcessor);
                    _context.next = 34;
                    return fileProcessorHandler(file, _this6.component.properties);

                  case 34:
                    processedFile = _context.sent;
                    _context.next = 44;
                    break;

                  case 37:
                    _context.prev = 37;
                    _context.t0 = _context["catch"](29);
                    fileUpload.status = 'error';
                    fileUpload.message = _this6.t('File processing has been failed.');
                    _this6.fileDropHidden = false;

                    _this6.redraw();

                    return _context.abrupt("return");

                  case 44:
                    _context.prev = 44;

                    if (_this6.refs.fileProcessingLoader) {
                      _this6.refs.fileProcessingLoader.style.display = 'none';
                    }

                    return _context.finish(44);

                  case 47:
                    fileUpload.message = _this6.t('Starting upload.');

                    _this6.redraw();

                    filePromise = fileService.uploadFile(storage, processedFile || file, fileName, dir, // Progress callback
                    function (evt) {
                      fileUpload.status = 'progress';
                      fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
                      delete fileUpload.message;

                      _this6.redraw();
                    }, url, options, fileKey, groupPermissions, groupResourceId, // Upload start callback
                    function () {
                      _this6.emit('fileUploadingStart', filePromise);
                    }, // Abort upload callback
                    function (abort) {
                      return _this6.abortUpload = abort;
                    }).then(function (fileInfo) {
                      var index = _this6.statuses.indexOf(fileUpload);

                      if (index !== -1) {
                        _this6.statuses.splice(index, 1);
                      }

                      fileInfo.originalName = file.name;
                      fileInfo.hash = fileUpload.hash;

                      if (!_this6.hasValue()) {
                        _this6.dataValue = [];
                      }

                      _this6.dataValue.push(fileInfo);

                      _this6.fileDropHidden = false;

                      _this6.redraw();

                      _this6.triggerChange();

                      _this6.emit('fileUploadingEnd', filePromise);
                    })["catch"](function (response) {
                      fileUpload.status = 'error';
                      fileUpload.message = typeof response === 'string' ? response : response.toString();
                      delete fileUpload.progress;
                      _this6.fileDropHidden = false;

                      _this6.redraw();

                      _this6.emit('fileUploadingEnd', filePromise);
                    });

                  case 50:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[29, 37, 44, 47]]);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      }
    }
  }, {
    key: "getFile",
    value: function getFile(fileInfo) {
      var _this$component$optio2 = this.component.options,
          options = _this$component$optio2 === void 0 ? {} : _this$component$optio2;
      var fileService = this.fileService;

      if (!fileService) {
        return alert('File Service not provided');
      }

      if (this.component.privateDownload) {
        fileInfo["private"] = true;
      }

      fileService.downloadFile(fileInfo, options).then(function (file) {
        if (file) {
          if (['base64', 'indexeddb'].includes(file.storage)) {
            (0, _downloadjs["default"])(file.url, file.originalName || file.name, file.type);
          } else {
            window.open(file.url, '_blank');
          }
        }
      })["catch"](function (response) {
        // Is alert the best way to do this?
        // User is expecting an immediate notification due to attempting to download a file.
        alert(response);
      });
    }
  }, {
    key: "focus",
    value: function focus() {
      if ('beforeFocus' in this.parent) {
        this.parent.beforeFocus(this);
      }

      if (this.refs.fileBrowse) {
        this.refs.fileBrowse.focus();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stopVideo();

      _get(_getPrototypeOf(FileComponent.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2["default"].schema.apply(_Field2["default"], [{
        type: 'file',
        label: 'Upload',
        key: 'file',
        image: false,
        privateDownload: false,
        imageSize: '200',
        filePattern: '*',
        fileMinSize: '0KB',
        fileMaxSize: '1GB',
        uploadOnly: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'File',
        group: 'premium',
        icon: 'file',
        documentation: '/userguide/forms/premium-components#file',
        weight: 100,
        schema: FileComponent.schema()
      };
    }
  }]);

  return FileComponent;
}(_Field2["default"]);

exports["default"] = FileComponent;