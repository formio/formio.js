"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../base/Base"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ButtonComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(ButtonComponent, _BaseComponent);

  function ButtonComponent() {
    _classCallCheck(this, ButtonComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(ButtonComponent).apply(this, arguments));
  }

  _createClass(ButtonComponent, [{
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(ButtonComponent.prototype), "elementInfo", this).call(this);

      info.type = 'button';
      info.attr.type = ['submit', 'saveState'].includes(this.component.action) ? 'submit' : 'button';
      this.component.theme = this.component.theme || 'default';
      info.attr.class = "btn btn-".concat(this.component.theme);

      if (this.component.size) {
        info.attr.class += " btn-".concat(this.component.size);
      }

      if (this.component.block) {
        info.attr.class += ' btn-block';
      }

      if (this.component.customClass) {
        info.attr.class += " ".concat(this.component.customClass);
      }

      return info;
    }
  }, {
    key: "createLabel",
    // No label needed for buttons.
    value: function createLabel() {}
  }, {
    key: "createInput",
    value: function createInput(container) {
      this.buttonElement = _get(_getPrototypeOf(ButtonComponent.prototype), "createInput", this).call(this, container);
      return this.buttonElement;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "buttonMessage",
    value: function buttonMessage(message) {
      return this.ce('span', {
        class: 'help-block'
      }, this.text(message));
    }
    /* eslint-disable max-statements */

  }, {
    key: "build",
    value: function build() {
      var _this = this;

      if (this.viewOnly || this.options.hideButtons) {
        this.component.hidden = true;
      }

      this.dataValue = false;
      this.hasError = false;
      this.createElement();
      this.createInput(this.element);
      this.addShortcut(this.buttonElement);

      if (this.component.leftIcon) {
        this.buttonElement.appendChild(this.ce('span', {
          class: this.component.leftIcon
        }));
        this.buttonElement.appendChild(this.text(' '));
      }

      if (!this.labelIsHidden()) {
        this.labelElement = this.text(this.addShortcutToLabel());
        this.buttonElement.appendChild(this.labelElement);
        this.createTooltip(this.buttonElement, null, this.iconClass('question-sign'));
      }

      if (this.component.rightIcon) {
        this.buttonElement.appendChild(this.text(' '));
        this.buttonElement.appendChild(this.ce('span', {
          class: this.component.rightIcon
        }));
      }

      var onChange = null;
      var onError = null;

      if (this.component.action === 'submit') {
        var message = this.ce('div');
        this.on('submitButton', function () {
          _this.loading = true;
          _this.disabled = true;
        }, true);
        this.on('submitDone', function () {
          _this.loading = false;
          _this.disabled = false;

          _this.empty(message);

          _this.addClass(_this.buttonElement, 'btn-success submit-success');

          _this.removeClass(_this.buttonElement, 'btn-danger submit-fail');

          _this.addClass(message, 'has-success');

          _this.removeClass(message, 'has-error');

          _this.append(message);
        }, true);

        onChange = function onChange(value, isValid) {
          _this.removeClass(_this.buttonElement, 'btn-success submit-success');

          _this.removeClass(_this.buttonElement, 'btn-danger submit-fail');

          if (isValid && _this.hasError) {
            _this.hasError = false;

            _this.empty(message);

            _this.removeChild(message);

            _this.removeClass(message, 'has-success');

            _this.removeClass(message, 'has-error');
          }
        };

        onError = function onError() {
          _this.hasError = true;

          _this.removeClass(_this.buttonElement, 'btn-success submit-success');

          _this.addClass(_this.buttonElement, 'btn-danger submit-fail');

          _this.empty(message);

          _this.removeClass(message, 'has-success');

          _this.addClass(message, 'has-error');

          _this.append(message);
        };
      }

      if (this.component.action === 'url') {
        this.on('requestButton', function () {
          _this.loading = true;
          _this.disabled = true;
        }, true);
        this.on('requestDone', function () {
          _this.loading = false;
          _this.disabled = false;
        }, true);
      }

      this.on('change', function (value) {
        _this.loading = false;
        _this.disabled = _this.options.readOnly || _this.component.disableOnInvalid && !value.isValid;

        if (onChange) {
          onChange(value, value.isValid);
        }
      }, true);
      this.on('error', function () {
        _this.loading = false;

        if (onError) {
          onError();
        }
      }, true);
      this.addEventListener(this.buttonElement, 'click', function (event) {
        _this.triggerReCaptcha();

        _this.dataValue = true;

        if (_this.component.action !== 'submit' && _this.component.showValidations) {
          _this.emit('checkValidity', _this.data);
        }

        switch (_this.component.action) {
          case 'saveState':
          case 'submit':
            event.preventDefault();
            event.stopPropagation();

            _this.emit('submitButton', {
              state: _this.component.state || 'submitted'
            });

            break;

          case 'event':
            _this.emit(_this.interpolate(_this.component.event), _this.data);

            _this.events.emit(_this.interpolate(_this.component.event), _this.data);

            _this.emit('customEvent', {
              type: _this.interpolate(_this.component.event),
              component: _this.component,
              data: _this.data,
              event: event
            });

            break;

          case 'custom':
            {
              // Get the FormioForm at the root of this component's tree
              var form = _this.getRoot(); // Get the form's flattened schema components


              var flattened = (0, _utils.flattenComponents)(form.component.components, true); // Create object containing the corresponding HTML element components

              var components = {};

              _lodash.default.each(flattened, function (component, key) {
                var element = form.getComponent(key);

                if (element) {
                  components[key] = element;
                }
              });

              _this.evaluate(_this.component.custom, {
                form: form,
                flattened: flattened,
                components: components
              });

              break;
            }

          case 'url':
            _this.emit('requestButton');

            _this.emit('requestUrl', {
              url: _this.interpolate(_this.component.url),
              headers: _this.component.headers
            });

            break;

          case 'reset':
            _this.emit('resetForm');

            break;

          case 'delete':
            _this.emit('deleteSubmission');

            break;

          case 'oauth':
            if (_this.root === _this) {
              console.warn('You must add the OAuth button to a form for it to function properly');
              return;
            } // Display Alert if OAuth config is missing


            if (!_this.component.oauth) {
              _this.root.setAlert('danger', 'You must assign this button to an OAuth action before it will work.');

              break;
            } // Display Alert if oAuth has an error is missing


            if (_this.component.oauth.error) {
              _this.root.setAlert('danger', "The Following Error Has Occured".concat(_this.component.oauth.error));

              break;
            }

            _this.openOauth(_this.component.oauth);

            break;
        }
      });

      if (this.shouldDisable) {
        this.disabled = true;
      }

      function getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp("[\\?&]".concat(name, "=([^&#]*)"));
        var results = regex.exec(location.search);

        if (!results) {
          return results;
        }

        return decodeURIComponent(results[1].replace(/\+/g, ' '));
      } // If this is an OpenID Provider initiated login, perform the click event immediately


      if (this.component.action === 'oauth' && this.component.oauth && this.component.oauth.authURI) {
        var iss = getUrlParameter('iss');

        if (iss && this.component.oauth.authURI.indexOf(iss) === 0) {
          this.openOauth();
        }
      }

      this.autofocus();
      this.attachLogic();
    }
    /* eslint-enable max-statements */

  }, {
    key: "openOauth",
    value: function openOauth() {
      var _this2 = this;

      if (!this.root.formio) {
        console.warn('You must attach a Form API url to your form in order to use OAuth buttons.');
        return;
      }

      var settings = this.component.oauth;
      /*eslint-disable camelcase */

      var params = {
        response_type: 'code',
        client_id: settings.clientId,
        redirect_uri: window.location.origin || "".concat(window.location.protocol, "//").concat(window.location.host),
        state: settings.state,
        scope: settings.scope
      };
      /*eslint-enable camelcase */
      // Make display optional.

      if (settings.display) {
        params.display = settings.display;
      }

      params = Object.keys(params).map(function (key) {
        return "".concat(key, "=").concat(encodeURIComponent(params[key]));
      }).join('&');
      var url = "".concat(settings.authURI, "?").concat(params);
      var popup = window.open(url, settings.provider, 'width=1020,height=618');
      var interval = setInterval(function () {
        try {
          var popupHost = popup.location.host;
          var currentHost = window.location.host;

          if (popup && !popup.closed && popupHost === currentHost && popup.location.search) {
            popup.close();

            var _params = popup.location.search.substr(1).split('&').reduce(function (params, param) {
              var split = param.split('=');
              params[split[0]] = split[1];
              return params;
            }, {});

            if (_params.error) {
              alert(_params.error_description || _params.error);

              _this2.root.setAlert('danger', _params.error_description || _params.error);

              return;
            } // TODO: check for error response here


            if (settings.state !== _params.state) {
              _this2.root.setAlert('danger', 'OAuth state does not match. Please try logging in again.');

              return;
            }

            var submission = {
              data: {},
              oauth: {}
            };
            submission.oauth[settings.provider] = _params;
            submission.oauth[settings.provider].redirectURI = window.location.origin || "".concat(window.location.protocol, "//").concat(window.location.host);

            _this2.root.formio.saveSubmission(submission).then(function (result) {
              _this2.root.onSubmit(result, true);
            }).catch(function (err) {
              _this2.root.onSubmissionError(err);
            });
          }
        } catch (error) {
          if (error.name !== 'SecurityError') {
            _this2.root.setAlert('danger', error.message || error);
          }
        }

        if (!popup || popup.closed || popup.closed === undefined) {
          clearInterval(interval);
        }
      }, 100);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(ButtonComponent.prototype), "destroy", this).call(this);

      this.removeShortcut(this.buttonElement);
    }
  }, {
    key: "focus",
    value: function focus() {
      this.buttonElement.focus();
    }
  }, {
    key: "triggerReCaptcha",
    value: function triggerReCaptcha() {
      var _this3 = this;

      var recaptchaComponent;
      this.root.everyComponent(function (component) {
        if (component.component.type === 'recaptcha' && component.component.eventType === 'buttonClick' && component.component.buttonKey === _this3.component.key) {
          recaptchaComponent = component;
          return false;
        }
      });

      if (recaptchaComponent) {
        recaptchaComponent.verify("".concat(this.component.key, "Click"));
      }
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return ButtonComponent.schema();
    }
  }, {
    key: "loading",
    set: function set(loading) {
      this.setLoading(this.buttonElement, loading);
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      // Do not allow a component to be disabled if it should be always...
      if (!disabled && this.shouldDisable || disabled && !this.shouldDisable) {
        return;
      }

      _set(_getPrototypeOf(ButtonComponent.prototype), "disabled", disabled, this, true);

      this.setDisabled(this.buttonElement, disabled);
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return false;
    }
  }, {
    key: "clicked",
    get: function get() {
      return this.dataValue;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      return false;
    }
  }, {
    key: "dataValue",
    set: function set(value) {
      if (!this.component.input) {
        return;
      }

      _set(_getPrototypeOf(ButtonComponent.prototype), "dataValue", value, this, true);
    }
  }, {
    key: "className",
    get: function get() {
      var className = _get(_getPrototypeOf(ButtonComponent.prototype), "className", this);

      className += ' form-group';
      return className;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
        type: 'button',
        label: 'Submit',
        key: 'submit',
        size: 'md',
        leftIcon: '',
        rightIcon: '',
        block: false,
        action: 'submit',
        persistent: false,
        disableOnInvalid: false,
        theme: 'default',
        dataGridLabel: true
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Button',
        group: 'basic',
        icon: 'fa fa-stop',
        documentation: 'http://help.form.io/userguide/#button',
        weight: 110,
        schema: ButtonComponent.schema()
      };
    }
  }]);

  return ButtonComponent;
}(_Base.default);

exports.default = ButtonComponent;