"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.promise");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

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

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _Input = _interopRequireDefault(require("../_classes/input/Input"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ButtonComponent = /*#__PURE__*/function (_Field) {
  _inherits(ButtonComponent, _Field);

  var _super = _createSuper(ButtonComponent);

  function ButtonComponent() {
    _classCallCheck(this, ButtonComponent);

    return _super.apply(this, arguments);
  }

  _createClass(ButtonComponent, [{
    key: "createLabel",
    // No label needed for buttons.
    value: function createLabel() {}
  }, {
    key: "createInput",
    value: function createInput(container) {
      this.refs.button = _get(_getPrototypeOf(ButtonComponent.prototype), "createInput", this).call(this, container);
      return this.refs.button;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.viewOnly || this.options.hideButtons) {
        this._visible = false;
      }

      return _get(_getPrototypeOf(ButtonComponent.prototype), "render", this).call(this, this.renderTemplate('button', {
        component: this.component,
        input: this.inputInfo
      }));
    }
  }, {
    key: "attachButton",
    value: function attachButton() {
      var _this = this;

      this.addShortcut(this.refs.button);
      var onChange = null;
      var onError = null;

      if (this.component.action === 'submit') {
        this.on('submitButton', function () {
          _this.disabled = true;
        }, true);
        this.on('submitDone', function (message) {
          var resultMessage = _lodash.default.isString(message) ? message : _this.t('complete');
          _this.loading = false;
          _this.disabled = false;

          _this.addClass(_this.refs.button, 'btn-success submit-success');

          _this.removeClass(_this.refs.button, 'btn-danger submit-fail');

          _this.addClass(_this.refs.buttonMessageContainer, 'has-success');

          _this.removeClass(_this.refs.buttonMessageContainer, 'has-error');

          _this.setContent(_this.refs.buttonMessage, resultMessage);
        }, true);
        this.on('submitError', function (message) {
          var resultMessage = _lodash.default.isString(message) ? message : _this.t(_this.errorMessage('error'));
          _this.loading = false;
          _this.disabled = false;
          _this.hasError = true;

          _this.removeClass(_this.refs.button, 'btn-success submit-success');

          _this.addClass(_this.refs.button, 'btn-danger submit-fail');

          _this.removeClass(_this.refs.buttonMessageContainer, 'has-success');

          _this.addClass(_this.refs.buttonMessageContainer, 'has-error');

          _this.setContent(_this.refs.buttonMessage, resultMessage);
        }, true);

        onChange = function onChange(value, isValid) {
          _this.removeClass(_this.refs.button, 'btn-success submit-success');

          if (isValid) {
            _this.removeClass(_this.refs.button, 'btn-danger submit-fail');

            if (_this.hasError) {
              _this.hasError = false;

              _this.setContent(_this.refs.buttonMessage, '');

              _this.removeClass(_this.refs.buttonMessageContainer, 'has-success');

              _this.removeClass(_this.refs.buttonMessageContainer, 'has-error');
            }
          }
        };

        onError = function onError() {
          _this.hasError = true;

          _this.removeClass(_this.refs.button, 'btn-success submit-success');

          _this.addClass(_this.refs.button, 'btn-danger submit-fail');

          _this.removeClass(_this.refs.buttonMessageContainer, 'has-success');

          _this.addClass(_this.refs.buttonMessageContainer, 'has-error');

          _this.setContent(_this.refs.buttonMessage, _this.t(_this.errorMessage('error')));
        };
      }

      if (this.component.action === 'url') {
        this.on('requestButton', function () {
          _this.disabled = true;
        }, true);
        this.on('requestDone', function () {
          _this.loading = false;
          _this.disabled = false;
        }, true);
      }

      this.on('change', function (value, flags) {
        var isValid = value.isValid; //check root validity only if disableOnInvalid is set and when it is not possible to make submission because of validation errors

        if (flags && flags.noValidate && (_this.component.disableOnInvalid || _this.hasError)) {
          isValid = flags.rootValidity || (_this.root ? _this.root.checkValidity(_this.root.data, null, null, true) : true);
          flags.rootValidity = isValid;
        }

        _this.loading = false;
        _this.disabled = _this.shouldDisabled || _this.component.disableOnInvalid && !isValid;

        _this.setDisabled(_this.refs.button, _this.disabled);

        if (onChange) {
          onChange(value, isValid);
        }
      }, true);
      this.on('error', function () {
        _this.loading = false;
        _this.disabled = false;

        if (onError) {
          onError();
        }
      }, true);
      this.addEventListener(this.refs.button, 'click', this.onClick.bind(this));
      this.disabled = this.shouldDisabled;

      function getUrlParameter(name) {
        name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp("[\\?&]".concat(name, "=([^&#]*)"));
        var results = regex.exec(location.search);

        if (!results) {
          return results;
        }

        return decodeURIComponent(results[1].replace(/\+/g, ' '));
      } // If this is an OpenID Provider initiated login, perform the click event immediately


      if (this.component.action === 'oauth' && this.oauthConfig && !this.oauthConfig.error) {
        var iss = getUrlParameter('iss');

        if (iss && this.oauthConfig.authURI.indexOf(iss) === 0) {
          this.openOauth(this.oauthConfig);
        }
      }
    }
  }, {
    key: "attach",
    value: function attach(element) {
      this.loadRefs(element, {
        button: 'single',
        buttonMessageContainer: 'single',
        buttonMessage: 'single'
      });

      var superAttach = _get(_getPrototypeOf(ButtonComponent.prototype), "attach", this).call(this, element);

      this.attachButton();
      return superAttach;
    }
    /* eslint-enable max-statements */

  }, {
    key: "detach",
    value: function detach(element) {
      if (element && this.refs.button) {
        this.removeShortcut(this.refs.button);
      }
    }
  }, {
    key: "onClick",
    value: function onClick(event) {
      this.triggerReCaptcha(); // Don't click if disabled or in builder mode.

      if (this.disabled || this.options.attachMode === 'builder') {
        return;
      }

      this.dataValue = true;

      if (this.component.action !== 'submit' && this.component.showValidations) {
        this.emit('checkValidity', this.data);
      }

      switch (this.component.action) {
        case 'saveState':
        case 'submit':
          event.preventDefault();
          event.stopPropagation();
          this.loading = true;
          this.emit('submitButton', {
            state: this.component.state || 'submitted',
            component: this.component,
            instance: this
          });
          break;

        case 'event':
          this.emit(this.interpolate(this.component.event), this.data);
          this.events.emit(this.interpolate(this.component.event), this.data);
          this.emit('customEvent', {
            type: this.interpolate(this.component.event),
            component: this.component,
            data: this.data,
            event: event
          });
          break;

        case 'custom':
          {
            // Get the FormioForm at the root of this component's tree
            var form = this.getRoot(); // Get the form's flattened schema components

            var flattened = (0, _utils.flattenComponents)(form.component.components, true); // Create object containing the corresponding HTML element components

            var components = {};

            _lodash.default.each(flattened, function (component, key) {
              var element = form.getComponent(key);

              if (element) {
                components[key] = element;
              }
            });

            this.evaluate(this.component.custom, {
              form: form,
              flattened: flattened,
              components: components
            });
            break;
          }

        case 'url':
          this.loading = true;
          this.emit('requestButton', {
            component: this.component,
            instance: this
          });
          this.emit('requestUrl', {
            url: this.interpolate(this.component.url),
            headers: this.component.headers
          });
          break;

        case 'reset':
          this.emit('resetForm');
          break;

        case 'delete':
          this.emit('deleteSubmission');
          break;

        case 'oauth':
          if (this.root === this) {
            console.warn('You must add the OAuth button to a form for it to function properly');
            return;
          } // Display Alert if OAuth config is missing


          if (!this.oauthConfig) {
            this.root.setAlert('danger', 'OAuth not configured. You must configure oauth for your project before it will work.');
            break;
          } // Display Alert if oAuth has an error is missing


          if (this.oauthConfig.error) {
            this.root.setAlert('danger', "The Following Error Has Occured ".concat(this.oauthConfig.error));
            break;
          }

          this.openOauth(this.oauthConfig);
          break;
      }
    }
  }, {
    key: "openOauth",
    value: function openOauth(settings) {
      var _this2 = this;

      if (!this.root.formio) {
        console.warn('You must attach a Form API url to your form in order to use OAuth buttons.');
        return;
      }
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
            } // Depending on where the settings came from, submit to either the submission endpoint (old) or oauth endpoint (new).


            var requestPromise = Promise.resolve();

            if (_lodash.default.has(_this2, 'root.form.config.oauth') && _this2.root.form.config.oauth[_this2.component.oauthProvider]) {
              _params.provider = settings.provider;
              _params.redirectURI = window.location.origin;
              requestPromise = _this2.root.formio.makeRequest('oauth', "".concat(_this2.root.formio.projectUrl, "/oauth2"), 'POST', _params);
            } else {
              var submission = {
                data: {},
                oauth: {}
              };
              submission.oauth[settings.provider] = _params;
              submission.oauth[settings.provider].redirectURI = window.location.origin || "".concat(window.location.protocol, "//").concat(window.location.host);
              requestPromise = _this2.root.formio.saveSubmission(submission);
            }

            requestPromise.then(function (result) {
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
    key: "focus",
    value: function focus() {
      if (this.refs.button) {
        this.refs.button.focus();
      }
    }
  }, {
    key: "triggerReCaptcha",
    value: function triggerReCaptcha() {
      var _this3 = this;

      if (!this.root) {
        return;
      }

      var recaptchaComponent = this.root.components.find(function (component) {
        return component.component.type === 'recaptcha' && component.component.eventType === 'buttonClick' && component.component.buttonKey === _this3.component.key;
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
    key: "inputInfo",
    get: function get() {
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

      info.content = this.t(this.component.label);
      return info;
    }
  }, {
    key: "labelInfo",
    get: function get() {
      return {
        hidden: true
      };
    }
  }, {
    key: "loading",
    set: function set(loading) {
      this.setLoading(this.refs.button, loading);
    }
  }, {
    key: "skipInEmail",
    get: function get() {
      return true;
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
    key: "className",
    get: function get() {
      var className = _get(_getPrototypeOf(ButtonComponent.prototype), "className", this);

      className += ' form-group';
      return className;
    }
  }, {
    key: "oauthConfig",
    get: function get() {
      if (_lodash.default.has(this, 'root.form.config.oauth') && this.component.oauthProvider) {
        return this.root.form.config.oauth[this.component.oauthProvider];
      } // Legacy oauth location.


      if (this.component.oauth) {
        return this.component.oauth;
      }

      return false;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Input.default.schema.apply(_Input.default, [{
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
        theme: 'primary',
        dataGridLabel: true
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Button',
        group: 'basic',
        icon: 'stop',
        documentation: 'http://help.form.io/userguide/#button',
        weight: 110,
        schema: ButtonComponent.schema()
      };
    }
  }]);

  return ButtonComponent;
}(_Field2.default);

exports.default = ButtonComponent;