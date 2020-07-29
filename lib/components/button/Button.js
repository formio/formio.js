var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import _ from 'lodash';
import { flattenComponents, superGet } from '../../utils/utils';
import Field from '../_classes/field/Field';
import Input from '../_classes/input/Input';
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ButtonComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input.schema.apply(Input, __spreadArrays([{
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
            }], extend));
    };
    Object.defineProperty(ButtonComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Button',
                group: 'basic',
                icon: 'stop',
                documentation: 'http://help.form.io/userguide/#button',
                weight: 110,
                schema: ButtonComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "defaultSchema", {
        get: function () {
            return ButtonComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'button';
            info.attr.type = (['submit', 'saveState'].includes(this.component.action)) ? 'submit' : 'button';
            this.component.theme = this.component.theme || 'default';
            info.attr.class = "btn btn-" + this.component.theme;
            if (this.component.size) {
                info.attr.class += " btn-" + this.component.size;
            }
            if (this.component.block) {
                info.attr.class += ' btn-block';
            }
            if (this.component.customClass) {
                info.attr.class += " " + this.component.customClass;
            }
            info.content = this.t(this.component.label);
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "labelInfo", {
        get: function () {
            return {
                hidden: true
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "loading", {
        set: function (loading) {
            this.setLoading(this.refs.button, loading);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "skipInEmail", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    // No label needed for buttons.
    ButtonComponent.prototype.createLabel = function () { };
    ButtonComponent.prototype.createInput = function (container) {
        this.refs.button = _super.prototype.createInput.call(this, container);
        return this.refs.button;
    };
    Object.defineProperty(ButtonComponent.prototype, "emptyValue", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    ButtonComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    Object.defineProperty(ButtonComponent.prototype, "clicked", {
        get: function () {
            return this.dataValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "defaultValue", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "className", {
        get: function () {
            var className = superGet(Field, 'className', this);
            className += ' form-group';
            return className;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "oauthConfig", {
        get: function () {
            if (_.has(this, 'root.form.config.oauth') && this.component.oauthProvider) {
                return this.root.form.config.oauth[this.component.oauthProvider];
            }
            // Legacy oauth location.
            if (this.component.oauth) {
                return this.component.oauth;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    ButtonComponent.prototype.render = function () {
        if (this.viewOnly || this.options.hideButtons) {
            this._visible = false;
        }
        return _super.prototype.render.call(this, this.renderTemplate('button', {
            component: this.component,
            input: this.inputInfo,
        }));
    };
    ButtonComponent.prototype.attachButton = function () {
        var _this = this;
        this.addShortcut(this.refs.button);
        var onChange = null;
        var onError = null;
        if (this.component.action === 'submit') {
            this.on('submitButton', function () {
                _this.disabled = true;
            }, true);
            this.on('submitDone', function (message) {
                var resultMessage = _.isString(message) ? message : _this.t('complete');
                _this.loading = false;
                _this.disabled = false;
                _this.addClass(_this.refs.button, 'btn-success submit-success');
                _this.removeClass(_this.refs.button, 'btn-danger submit-fail');
                _this.addClass(_this.refs.buttonMessageContainer, 'has-success');
                _this.removeClass(_this.refs.buttonMessageContainer, 'has-error');
                _this.setContent(_this.refs.buttonMessage, resultMessage);
            }, true);
            this.on('submitError', function (message) {
                var resultMessage = _.isString(message) ? message : _this.t(_this.errorMessage('error'));
                _this.loading = false;
                _this.disabled = false;
                _this.hasError = true;
                _this.removeClass(_this.refs.button, 'btn-success submit-success');
                _this.addClass(_this.refs.button, 'btn-danger submit-fail');
                _this.removeClass(_this.refs.buttonMessageContainer, 'has-success');
                _this.addClass(_this.refs.buttonMessageContainer, 'has-error');
                _this.setContent(_this.refs.buttonMessage, resultMessage);
            }, true);
            onChange = function (value, isValid) {
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
            onError = function () {
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
            var isValid = value.isValid;
            //check root validity only if disableOnInvalid is set and when it is not possible to make submission because of validation errors
            if (flags && flags.noValidate && (_this.component.disableOnInvalid || _this.hasError)) {
                isValid = flags.rootValidity || (_this.root ? _this.root.checkValidity(_this.root.data, null, null, true) : true);
                flags.rootValidity = isValid;
            }
            _this.loading = false;
            _this.disabled = _this.shouldDisabled || (_this.component.disableOnInvalid && !isValid);
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
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
            var results = regex.exec(location.search);
            if (!results) {
                return results;
            }
            return decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
        // If this is an OpenID Provider initiated login, perform the click event immediately
        if ((this.component.action === 'oauth') && this.oauthConfig && !this.oauthConfig.error) {
            var iss = getUrlParameter('iss');
            if (iss && (this.oauthConfig.authURI.indexOf(iss) === 0)) {
                this.openOauth(this.oauthConfig);
            }
        }
    };
    ButtonComponent.prototype.attach = function (element) {
        this.loadRefs(element, {
            button: 'single',
            buttonMessageContainer: 'single',
            buttonMessage: 'single'
        });
        var superAttach = _super.prototype.attach.call(this, element);
        this.attachButton();
        return superAttach;
    };
    /* eslint-enable max-statements */
    ButtonComponent.prototype.detach = function (element) {
        if (element && this.refs.button) {
            this.removeShortcut(this.refs.button);
        }
    };
    ButtonComponent.prototype.onClick = function (event) {
        this.triggerReCaptcha();
        // Don't click if disabled or in builder mode.
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
            case 'custom': {
                // Get the FormioForm at the root of this component's tree
                var form_1 = this.getRoot();
                // Get the form's flattened schema components
                var flattened = flattenComponents(form_1.component.components, true);
                // Create object containing the corresponding HTML element components
                var components_1 = {};
                _.each(flattened, function (component, key) {
                    var element = form_1.getComponent(key);
                    if (element) {
                        components_1[key] = element;
                    }
                });
                this.evaluate(this.component.custom, {
                    form: form_1,
                    flattened: flattened,
                    components: components_1
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
                }
                // Display Alert if OAuth config is missing
                if (!this.oauthConfig) {
                    this.root.setAlert('danger', 'OAuth not configured. You must configure oauth for your project before it will work.');
                    break;
                }
                // Display Alert if oAuth has an error is missing
                if (this.oauthConfig.error) {
                    this.root.setAlert('danger', "The Following Error Has Occured " + this.oauthConfig.error);
                    break;
                }
                this.openOauth(this.oauthConfig);
                break;
        }
    };
    ButtonComponent.prototype.openOauth = function (settings) {
        var _this = this;
        if (!this.root.formio) {
            console.warn('You must attach a Form API url to your form in order to use OAuth buttons.');
            return;
        }
        /*eslint-disable camelcase */
        var params = {
            response_type: 'code',
            client_id: settings.clientId,
            redirect_uri: window.location.origin || window.location.protocol + "//" + window.location.host,
            state: settings.state,
            scope: settings.scope
        };
        /*eslint-enable camelcase */
        // Make display optional.
        if (settings.display) {
            params.display = settings.display;
        }
        params = Object.keys(params).map(function (key) {
            return key + "=" + encodeURIComponent(params[key]);
        }).join('&');
        var url = settings.authURI + "?" + params;
        var popup = window.open(url, settings.provider, 'width=1020,height=618');
        var interval = setInterval(function () {
            try {
                var popupHost = popup.location.host;
                var currentHost = window.location.host;
                if (popup && !popup.closed && popupHost === currentHost && popup.location.search) {
                    popup.close();
                    var params_1 = popup.location.search.substr(1).split('&').reduce(function (params, param) {
                        var split = param.split('=');
                        params[split[0]] = split[1];
                        return params;
                    }, {});
                    if (params_1.error) {
                        alert(params_1.error_description || params_1.error);
                        _this.root.setAlert('danger', params_1.error_description || params_1.error);
                        return;
                    }
                    // TODO: check for error response here
                    if (settings.state !== params_1.state) {
                        _this.root.setAlert('danger', 'OAuth state does not match. Please try logging in again.');
                        return;
                    }
                    // Depending on where the settings came from, submit to either the submission endpoint (old) or oauth endpoint (new).
                    var requestPromise = Promise.resolve();
                    if (_.has(_this, 'root.form.config.oauth') && _this.root.form.config.oauth[_this.component.oauthProvider]) {
                        params_1.provider = settings.provider;
                        params_1.redirectURI = window.location.origin;
                        requestPromise = _this.root.formio.makeRequest('oauth', _this.root.formio.projectUrl + "/oauth2", 'POST', params_1);
                    }
                    else {
                        var submission = { data: {}, oauth: {} };
                        submission.oauth[settings.provider] = params_1;
                        submission.oauth[settings.provider].redirectURI = window.location.origin
                            || window.location.protocol + "//" + window.location.host;
                        requestPromise = _this.root.formio.saveSubmission(submission);
                    }
                    requestPromise.then(function (result) {
                        _this.root.onSubmit(result, true);
                    })
                        .catch(function (err) {
                        _this.root.onSubmissionError(err);
                    });
                }
            }
            catch (error) {
                if (error.name !== 'SecurityError') {
                    _this.root.setAlert('danger', error.message || error);
                }
            }
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(interval);
            }
        }, 100);
    };
    ButtonComponent.prototype.focus = function () {
        if (this.refs.button) {
            this.refs.button.focus();
        }
    };
    ButtonComponent.prototype.triggerReCaptcha = function () {
        var _this = this;
        if (!this.root) {
            return;
        }
        var recaptchaComponent = this.root.components.find(function (component) {
            return component.component.type === 'recaptcha' &&
                component.component.eventType === 'buttonClick' &&
                component.component.buttonKey === _this.component.key;
        });
        if (recaptchaComponent) {
            recaptchaComponent.verify(this.component.key + "Click");
        }
    };
    return ButtonComponent;
}(Field));
export default ButtonComponent;
