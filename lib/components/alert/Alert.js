"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.entries");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Alert = /*#__PURE__*/function () {
  function Alert(container, component) {
    _classCallCheck(this, Alert);

    this.container = container;
    this.alert = null;
    this.parentComponent = component;
    this.refs = {};
    this.loadRefs = this.parentComponent.loadRefs.bind(this);
  }

  _createClass(Alert, [{
    key: "showErrors",
    value: function showErrors() {
      var errors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var triggerEvent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      errors = _lodash.default.isArray(errors) ? errors : [errors];
      var messagesList = this.createMessagesList('error', errors);
      this.showAlert('error', messagesList, options);

      if (triggerEvent) {
        this.parentComponent.emit('error', errors);
      }

      return errors;
    }
  }, {
    key: "showMessage",
    value: function showMessage(message, type) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var messageElement = message;

      if (messageElement instanceof HTMLElement) {
        messageElement.setAttribute('ref', 'messageRef');
      } else {
        messageElement = this.parentComponent.ce('p', {
          ref: 'messageRef'
        });
      }

      this.showAlert(type, messageElement, options);
    }
  }, {
    key: "createMessagesList",
    value: function createMessagesList(type) {
      switch (type) {
        case 'error':
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          return this.createErrorList.apply(this, args);
      }
    }
  }, {
    key: "createErrorList",
    value: function createErrorList(errors) {
      var _this = this;

      var p = this.parentComponent.ce('p');
      this.parentComponent.setContent(p, this.parentComponent.t('error'));
      var ul = this.parentComponent.ce('ul');
      var messagesList = document.createDocumentFragment();
      errors.forEach(function (err) {
        return _this.appendErrorToList(err, ul);
      });
      p.appendChild(ul);
      messagesList.appendChild(p);
      return messagesList;
    }
  }, {
    key: "showAlert",
    value: function showAlert(type, messagesList) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var customClasses = options.customClasses,
          customEvents = options.customEvents;
      this.setAlert(type, messagesList, {
        customClasses: customClasses
      });

      if (!this.alert) {
        return;
      }

      this.attach({
        customEvents: customEvents
      });
      this.parentComponent.prependTo(this.alert, this.container);
    }
  }, {
    key: "setAlert",
    value: function setAlert(type, messagesList) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var alertType = this.alertTypes[type];

      if (this.alert) {
        this.clear();
      }

      if (messagesList) {
        var _options$id = options.id,
            id = _options$id === void 0 ? "".concat(type, "-list-").concat(this.parentComponent.id) : _options$id,
            _options$customClasse = options.customClasses,
            customClasses = _options$customClasse === void 0 ? "alert alert-".concat(alertType) : _options$customClasse;
        this.alert = this.parentComponent.ce('div', {
          id: id,
          class: customClasses
        });

        if (messagesList instanceof HTMLElement) {
          this.parentComponent.appendTo(messagesList, this.alert);
        } else {
          this.parentComponent.setContent(this.alert, messagesList);
        }
      }
    }
  }, {
    key: "attach",
    value: function attach(options) {
      var _customEvents$click,
          _customEvents$keypres,
          _this2 = this,
          _this$refs$messageRef;

      var _options$customEvents = options.customEvents,
          customEvents = _options$customEvents === void 0 ? {} : _options$customEvents;
      this.eventListenersKeys = [];
      this.loadRefs(this.alert, this.refsNames);
      var clickListeners = ((_customEvents$click = customEvents.click) === null || _customEvents$click === void 0 ? void 0 : _customEvents$click.listeners) || [];
      var keyPressListeners = ((_customEvents$keypres = customEvents.keypress) === null || _customEvents$keypres === void 0 ? void 0 : _customEvents$keypres.listeners) || [];
      customEvents = _objectSpread(_objectSpread({}, customEvents), {}, {
        click: [].concat(_toConsumableArray(clickListeners), [function (e) {
          var key = e.currentTarget.dataset.componentKey;

          _this2.focusOnComponent(key);
        }]),
        keypress: [].concat(_toConsumableArray(keyPressListeners), [function (e) {
          var key = e.currentTarget.dataset.componentKey;

          _this2.focusOnComponent(key);
        }])
      });

      if ((_this$refs$messageRef = this.refs.messageRef) === null || _this$refs$messageRef === void 0 ? void 0 : _this$refs$messageRef.length) {
        this.refs.messageRef.forEach(function (el) {
          Object.entries(customEvents).forEach(function (_ref) {
            var _ref2 = _slicedToArray(_ref, 2),
                event = _ref2[0],
                listeners = _ref2[1];

            listeners.forEach(function (listener) {
              return _this2.parentComponent.addEventListener(el, event, listener);
            });

            _this2.eventListenersKeys.push(event);
          });
        });
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this3 = this;

      try {
        var _this$refs$messageRef2;

        if ((_this$refs$messageRef2 = this.refs.messageRef) === null || _this$refs$messageRef2 === void 0 ? void 0 : _this$refs$messageRef2.length) {
          this.refs.messageRef.forEach(function (el) {
            _this3.eventListenersKeys.forEach(function (event) {
              return _this3.parentComponent.removeEventListener(el, event);
            });
          });
        }

        this.parentComponent.removeChildFrom(this.alert, this.container);
        this.alert = null;
      } catch (err) {// ignore
      }
    }
  }, {
    key: "focusOnComponent",
    value: function focusOnComponent(keyOrPath) {
      if (keyOrPath) {
        var _this$parentComponent;

        var component = (_this$parentComponent = this.parentComponent.root) === null || _this$parentComponent === void 0 ? void 0 : _this$parentComponent.getComponent(keyOrPath);

        if (component && _lodash.default.isFunction(component.focus)) {
          component.focus();
        }
      }
    }
  }, {
    key: "createMessage",
    value: function createMessage(type, element, message, index, err) {
      switch (type) {
        case 'error':
          return this.createErrorMessage(element, message, index, err);
      }
    }
  }, {
    key: "createErrorMessage",
    value: function createErrorMessage(element, message, index, err) {
      var _err$messages, _err$component;

      var params = {
        style: 'cursor: pointer',
        ref: 'messageRef',
        tabIndex: 0,
        'aria-label': "".concat(message, ". Click to navigate to the field with following error.")
      };
      var li = this.parentComponent.ce('li', params);
      this.parentComponent.setContent(li, message);
      var messageFromIndex = !_lodash.default.isUndefined(index) && (err === null || err === void 0 ? void 0 : (_err$messages = err.messages) === null || _err$messages === void 0 ? void 0 : _err$messages[index]);
      var keyOrPath = (messageFromIndex === null || messageFromIndex === void 0 ? void 0 : messageFromIndex.path) || (err === null || err === void 0 ? void 0 : (_err$component = err.component) === null || _err$component === void 0 ? void 0 : _err$component.key);

      if (keyOrPath) {
        var formattedKeyOrPath = (0, _utils.getStringFromComponentPath)(keyOrPath);
        li.dataset.componentKey = formattedKeyOrPath;
      }

      this.parentComponent.appendTo(li, element);
    }
  }, {
    key: "appendErrorToList",
    value: function appendErrorToList(err, ul) {
      var _err$messages2,
          _this4 = this;

      if (err === null || err === void 0 ? void 0 : (_err$messages2 = err.messages) === null || _err$messages2 === void 0 ? void 0 : _err$messages2.length) {
        err.messages.forEach(function (_ref3, index) {
          var message = _ref3.message;

          _this4.createMessage('error', ul, message, index, err);
        });
      } else if (err) {
        var message = _lodash.default.isObject(err) ? err.message || '' : err;
        this.createMessage('error', ul, message);
      }
    }
  }, {
    key: "refsNames",
    get: function get() {
      return {
        messageRef: 'multiple'
      };
    }
  }, {
    key: "alertTypes",
    get: function get() {
      return {
        error: 'danger',
        success: 'success',
        info: 'info',
        warning: 'warning'
      };
    }
  }]);

  return Alert;
}();

exports.default = Alert;