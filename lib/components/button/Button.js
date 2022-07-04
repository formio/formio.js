"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/web.timers.js");

require("core-js/modules/es.array.reduce.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _Input = _interopRequireDefault(require("../_classes/input/Input"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var ButtonComponent = /*#__PURE__*/function (_Field) {
  _inherits(ButtonComponent, _Field);

  var _super = _createSuper(ButtonComponent);

  function ButtonComponent(component, options, data) {
    var _this;

    _classCallCheck(this, ButtonComponent);

    _this = _super.call(this, component, options, data);
    _this.filesUploading = [];
    return _this;
  }

  _createClass(ButtonComponent, [{
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
      info.attr["class"] = "btn btn-".concat(this.component.theme);

      if (this.component.size) {
        info.attr["class"] += " btn-".concat(this.component.size);
      }

      if (this.component.block) {
        info.attr["class"] += ' btn-block';
      }

      if (this.component.customClass) {
        info.attr["class"] += " ".concat(this.component.customClass);
      }

      info.content = this.t(this.component.label, {
        _userInput: true
      });
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
    } // No label needed for buttons.

  }, {
    key: "createLabel",
    value: function createLabel() {}
  }, {
    key: "createInput",
    value: function createInput(container) {
      this.refs.button = _get(_getPrototypeOf(ButtonComponent.prototype), "createInput", this).call(this, container);
      return this.refs.button;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return false;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
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
      if (_lodash["default"].has(this, 'root.form.config.oauth') && this.component.oauthProvider) {
        return this.root.form.config.oauth[this.component.oauthProvider];
      } // Legacy oauth location.


      if (this.component.oauth) {
        return this.component.oauth;
      }

      return false;
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
      var _this2 = this;

      this.addShortcut(this.refs.button);
      var onChange = null;
      var onError = null;

      if (this.component.action === 'submit') {
        this.on('submitButton', function () {
          _this2.disabled = true;
        }, true);
        this.on('cancelSubmit', function () {
          _this2.disabled = false;
        }, true);
        this.on('submitDone', function (message) {
          var resultMessage = _lodash["default"].isString(message) ? message : _this2.t('complete');
          _this2.loading = false;
          _this2.disabled = false;

          _this2.addClass(_this2.refs.button, 'btn-success submit-success');

          _this2.removeClass(_this2.refs.button, 'btn-danger submit-fail');

          _this2.addClass(_this2.refs.buttonMessageContainer, 'has-success');

          _this2.removeClass(_this2.refs.buttonMessageContainer, 'has-error');

          _this2.setContent(_this2.refs.buttonMessage, resultMessage);
        }, true);
        this.on('submitError', function (message) {
          var resultMessage = _lodash["default"].isString(message) ? _this2.t(message) : _this2.t(_this2.errorMessage('submitError'));
          _this2.loading = false;
          _this2.disabled = false;
          _this2.hasError = true;

          _this2.removeClass(_this2.refs.button, 'btn-success submit-success');

          _this2.addClass(_this2.refs.button, 'btn-danger submit-fail');

          _this2.removeClass(_this2.refs.buttonMessageContainer, 'has-success');

          _this2.addClass(_this2.refs.buttonMessageContainer, 'has-error');

          _this2.setContent(_this2.refs.buttonMessage, resultMessage);
        }, true);
        this.on('fileUploadingStart', function (filePromise) {
          _this2.filesUploading.push(filePromise);

          _this2.disabled = true;

          _this2.setDisabled(_this2.refs.button, _this2.disabled);
        }, true);
        this.on('fileUploadingEnd', function (filePromise) {
          var index = _this2.filesUploading.indexOf(filePromise);

          if (index !== -1) {
            _this2.filesUploading.splice(index, 1);
          }

          _this2.disabled = _this2.shouldDisabled ? true : false;

          _this2.setDisabled(_this2.refs.button, _this2.disabled);
        }, true);

        onChange = function onChange(value, isValid) {
          _this2.removeClass(_this2.refs.button, 'btn-success submit-success');

          if (isValid) {
            _this2.removeClass(_this2.refs.button, 'btn-danger submit-fail');

            if (_this2.hasError) {
              _this2.hasError = false;

              _this2.setContent(_this2.refs.buttonMessage, '');

              _this2.removeClass(_this2.refs.buttonMessageContainer, 'has-success');

              _this2.removeClass(_this2.refs.buttonMessageContainer, 'has-error');
            }
          }
        };

        onError = function onError() {
          _this2.hasError = true;

          _this2.removeClass(_this2.refs.button, 'btn-success submit-success');

          _this2.addClass(_this2.refs.button, 'btn-danger submit-fail');

          _this2.removeClass(_this2.refs.buttonMessageContainer, 'has-success');

          _this2.addClass(_this2.refs.buttonMessageContainer, 'has-error');

          _this2.setContent(_this2.refs.buttonMessage, _this2.t(_this2.errorMessage('submitError')));
        };
      }

      if (this.component.action === 'url') {
        this.on('requestButton', function () {
          _this2.disabled = true;
        }, true);
        this.on('requestDone', function () {
          _this2.loading = false;
          _this2.disabled = false;
        }, true);
      }

      this.on('change', function (value, flags) {
        var isValid = value.isValid;
        var isSilent = flags && flags.silent; //check root validity only if disableOnInvalid is set and when it is not possible to make submission because of validation errors

        if (flags && flags.noValidate && (_this2.component.disableOnInvalid || _this2.hasError)) {
          isValid = flags.rootValidity || (_this2.root ? _this2.root.checkValidity(_this2.root.data, null, null, true) : true);
          flags.rootValidity = isValid;
        }

        _this2.loading = false;
        _this2.isDisabledOnInvalid = _this2.component.disableOnInvalid && (isSilent || !isValid);
        _this2.disabled = _this2.shouldDisabled;

        _this2.setDisabled(_this2.refs.button, _this2.disabled);

        if (onChange) {
          onChange(value, isValid);
        }
      }, true);
      this.on('error', function () {
        _this2.loading = false;
        _this2.disabled = false;

        if (onError) {
          onError();
        }
      }, true);

      if (this.component.saveOnEnter) {
        this.root.addEventListener(this.root.element, 'keyup', function (event) {
          if (event.keyCode === 13) {
            _this2.onClick.call(_this2, event);
          }
        });
      }

      this.addEventListener(this.refs.button, 'click', this.onClick.bind(this));
      this.addEventListener(this.refs.buttonMessageContainer, 'click', function () {
        if (_this2.refs.buttonMessageContainer.classList.contains('has-error')) {
          if (_this2.root && _this2.root.alert) {
            _this2.scrollIntoView(_this2.root.alert);
          }
        }
      });
      this.disabled = this.shouldDisabled;
      this.setDisabled(this.refs.button, this.disabled);

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
    key: "shouldDisabled",
    get: function get() {
      var _this$filesUploading;

      return _get(_getPrototypeOf(ButtonComponent.prototype), "shouldDisabled", this) || !!((_this$filesUploading = this.filesUploading) !== null && _this$filesUploading !== void 0 && _this$filesUploading.length) || this.isDisabledOnInvalid;
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

      _get(_getPrototypeOf(ButtonComponent.prototype), "detach", this).call(this);
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
            var form = this.getRoot();
            var flattened = {};
            var components = {};
            (0, _utils.eachComponent)(form.components, function (componentWrapper, path) {
              var component = componentWrapper.component || componentWrapper;
              flattened[path] = component;
              components[component.key] = component;
            }, true);
            this.evaluate(this.component.custom, {
              form: form,
              flattened: flattened,
              components: components
            });
            this.triggerChange();
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
      var _this3 = this;

      if (!this.root.formio) {
        console.warn('You must attach a Form API url to your form in order to use OAuth buttons.');
        return;
      }
      /*eslint-disable camelcase */


      var params = {
        response_type: 'code',
        client_id: settings.clientId,
        redirect_uri: settings.redirectURI || window.location.origin || "".concat(window.location.protocol, "//").concat(window.location.host),
        state: settings.state,
        scope: settings.scope
      };
      /*eslint-enable camelcase */
      // Needs for the correct redirection URI for the OpenID

      var originalRedirectUri = params.redirect_uri; // Make display optional.

      if (settings.display) {
        params.display = settings.display;
      }

      params = Object.keys(params).map(function (key) {
        return "".concat(key, "=").concat(encodeURIComponent(params[key]));
      }).join('&');
      var separator = settings.authURI.indexOf('?') !== -1 ? '&' : '?';
      var url = "".concat(settings.authURI).concat(separator).concat(params);
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

              _this3.root.setAlert('danger', _params.error_description || _params.error);

              return;
            } // TODO: check for error response here


            if (settings.state !== _params.state) {
              _this3.root.setAlert('danger', 'OAuth state does not match. Please try logging in again.');

              return;
            } // Depending on where the settings came from, submit to either the submission endpoint (old) or oauth endpoint (new).


            var requestPromise = _nativePromiseOnly["default"].resolve();

            if (_lodash["default"].has(_this3, 'root.form.config.oauth') && _this3.root.form.config.oauth[_this3.component.oauthProvider]) {
              _params.provider = settings.provider;
              _params.redirectURI = originalRedirectUri; // Needs for the exclude oAuth Actions that not related to this button

              _params.triggeredBy = _this3.key;
              requestPromise = _this3.root.formio.makeRequest('oauth', "".concat(_this3.root.formio.projectUrl, "/oauth2"), 'POST', _params);
            } else {
              var submission = {
                data: {},
                oauth: {}
              };
              submission.oauth[settings.provider] = _params;
              submission.oauth[settings.provider].redirectURI = originalRedirectUri; // Needs for the exclude oAuth Actions that not related to this button

              submission.oauth[settings.provider].triggeredBy = _this3.key;
              requestPromise = _this3.root.formio.saveSubmission(submission);
            }

            requestPromise.then(function (result) {
              _this3.root.onSubmit(result, true);
            })["catch"](function (err) {
              _this3.root.onSubmissionError(err);
            });
          }
        } catch (error) {
          if (error.name !== 'SecurityError' && (error.name !== 'Error' || error.message !== 'Permission denied')) {
            _this3.root.setAlert('danger', error.message || error);
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
      var _this4 = this;

      if (!this.root) {
        return;
      }

      var recaptchaComponent;
      this.root.everyComponent(function (component) {
        if (component.component.type === 'recaptcha' && component.component.eventType === 'buttonClick' && component.component.buttonKey === _this4.component.key) {
          recaptchaComponent = component;
        }
      });

      if (recaptchaComponent) {
        recaptchaComponent.verify("".concat(this.component.key, "Click"));
      }
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Input["default"].schema.apply(_Input["default"], [{
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
        documentation: '/userguide/forms/form-components#button',
        weight: 110,
        schema: ButtonComponent.schema()
      };
    }
  }]);

  return ButtonComponent;
}(_Field2["default"]);

exports["default"] = ButtonComponent;