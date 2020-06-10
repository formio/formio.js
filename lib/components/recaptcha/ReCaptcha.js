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
/*globals grecaptcha*/
import Component from '../_classes/component/Component';
import Formio from '../../Formio';
import _get from 'lodash/get';
import NativePromise from 'native-promise-only';
var ReCaptchaComponent = /** @class */ (function (_super) {
    __extends(ReCaptchaComponent, _super);
    function ReCaptchaComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReCaptchaComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component.schema.apply(Component, __spreadArrays([{
                type: 'recaptcha',
                key: 'recaptcha',
                label: 'reCAPTCHA'
            }], extend));
    };
    Object.defineProperty(ReCaptchaComponent, "builderInfo", {
        get: function () {
            return {
                title: 'reCAPTCHA',
                group: 'premium',
                icon: 'refresh',
                documentation: 'http://help.form.io/userguide/#recaptcha',
                weight: 40,
                schema: ReCaptchaComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    ReCaptchaComponent.prototype.render = function () {
        if (this.builderMode) {
            return _super.prototype.render.call(this, 'reCAPTCHA');
        }
        else {
            return _super.prototype.render.call(this, '', true);
        }
    };
    ReCaptchaComponent.prototype.createInput = function () {
        if (this.builderMode) {
            // We need to see it in builder mode.
            this.append(this.text(this.name));
        }
        else {
            var siteKey = _get(this.root.form, 'settings.recaptcha.siteKey');
            if (siteKey) {
                var recaptchaApiScriptUrl = "https://www.google.com/recaptcha/api.js?render=" + siteKey;
                this.recaptchaApiReady = Formio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
            }
            else {
                console.warn('There is no Site Key specified in settings in form JSON');
            }
        }
    };
    ReCaptchaComponent.prototype.createLabel = function () {
        return;
    };
    ReCaptchaComponent.prototype.verify = function (actionName) {
        var _this = this;
        var siteKey = _get(this.root.form, 'settings.recaptcha.siteKey');
        if (!siteKey) {
            console.warn('There is no Site Key specified in settings in form JSON');
            return;
        }
        if (!this.recaptchaApiReady) {
            var recaptchaApiScriptUrl = "https://www.google.com/recaptcha/api.js?render=" + _get(this.root.form, 'settings.recaptcha.siteKey');
            this.recaptchaApiReady = Formio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
        }
        if (this.recaptchaApiReady) {
            this.recaptchaVerifiedPromise = new NativePromise(function (resolve, reject) {
                _this.recaptchaApiReady
                    .then(function () {
                    grecaptcha.ready(function () {
                        grecaptcha
                            .execute(siteKey, {
                            action: actionName
                        })
                            .then(function (token) {
                            return _this.sendVerificationRequest(token);
                        })
                            .then(function (verificationResult) {
                            _this.setValue(verificationResult);
                            return resolve(verificationResult);
                        });
                    });
                })
                    .catch(function () {
                    return reject();
                });
            });
        }
    };
    ReCaptchaComponent.prototype.beforeSubmit = function () {
        var _this = this;
        if (this.recaptchaVerifiedPromise) {
            return this.recaptchaVerifiedPromise
                .then(function () { return _super.prototype.beforeSubmit.call(_this); });
        }
        return _super.prototype.beforeSubmit.call(this);
    };
    ReCaptchaComponent.prototype.sendVerificationRequest = function (token) {
        return Formio.makeStaticRequest(Formio.projectUrl + "/recaptcha?recaptchaToken=" + token);
    };
    ReCaptchaComponent.prototype.setValue = function (value) {
        var changed = this.hasChanged(value, this.dataValue);
        this.dataValue = value;
        return changed;
    };
    ReCaptchaComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    return ReCaptchaComponent;
}(Component));
export default ReCaptchaComponent;
