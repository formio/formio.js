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
import Base from './components/_classes/base/Base';
import { Formio } from './Formio';
import { Displays } from './displays';
import { Templates } from './templates';
import * as FormioUtils from './utils/utils';
import NativePromise from 'native-promise-only';
import { Components } from './components';
import formComponents from './components/form';
Components.setComponents(formComponents);
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    /**
     * Creates an easy to use interface for embedding webforms, pdfs, and wizards into your application.
     *
     * @param {Object} element - The DOM element you wish to render this form within.
     * @param {Object | string} form - Either a Form JSON schema or the URL of a hosted form via. form.io.
     * @param {Object} options - The options to create a new form instance.
     * @param {boolean} options.readOnly - Set this form to readOnly
     * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
     * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
     * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
     *
     * @example
     * import Form from 'formiojs/Form';
     * const form = new Form(document.getElementById('formio'), 'https://examples.form.io/example');
     * form.build();
     */
    function Form() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        var options = args[0] instanceof HTMLElement ? args[2] : args[1];
        if (Formio.options && Formio.options.form) {
            options = Object.assign(options, Formio.options.form);
        }
        _this = _super.call(this, options) || this;
        _this.ready = new NativePromise(function (resolve, reject) {
            _this.readyResolve = resolve;
            _this.readyReject = reject;
        });
        _this.instance = null;
        if (args[0] instanceof HTMLElement) {
            _this.element = args[0];
            _this.options = args[2] || {};
            _this.options.events = _this.events;
            _this.setForm(args[1])
                .then(function () { return _this.readyResolve(_this.instance); })
                .catch(_this.readyReject);
        }
        else if (args[0]) {
            _this.element = null;
            _this.options = args[1] || {};
            _this.options.events = _this.events;
            _this.setForm(args[0])
                .then(function () { return _this.readyResolve(_this.instance); })
                .catch(_this.readyReject);
        }
        else {
            _this.element = null;
            _this.options = {};
            _this.options.events = _this.events;
        }
        _this.display = '';
        return _this;
    }
    /**
     * Create a new form instance provided the display of the form.
     *
     * @param {string} display - The display of the form, either "wizard", "form", or "pdf"
     * @return {*}
     */
    Form.prototype.create = function (display) {
        if (this.options && (this.options.flatten || this.options.renderMode === 'flat')) {
            display = 'form';
        }
        this.display = display;
        if (Displays.displays[display]) {
            return new Displays.displays[display](this.element, this.options);
        }
        else {
            // eslint-disable-next-line new-cap
            return new Displays.displays['webform'](this.element, this.options);
        }
    };
    Object.defineProperty(Form.prototype, "form", {
        /**
         * Returns the loaded forms JSON.
         *
         * @return {object} - The loaded form's JSON
         */
        get: function () {
            return this._form;
        },
        /**
         * Sets the form. Either as JSON or a URL to a form JSON schema.
         *
         * @param {string|object} formParam - Either the form JSON or the URL of the form json.
         * @return {*}
         */
        set: function (formParam) {
            return this.setForm(formParam);
        },
        enumerable: false,
        configurable: true
    });
    Form.prototype.errorForm = function (err) {
        return {
            components: [
                {
                    'label': 'HTML',
                    'tag': 'div',
                    'className': 'error error-message alert alert-danger ui red message',
                    'attrs': [
                        {
                            'attr': 'role',
                            'value': 'alert'
                        }
                    ],
                    'key': 'errorMessage',
                    'type': 'htmlelement',
                    'input': false,
                    'content': typeof err === 'string' ? err : err.message,
                }
            ]
        };
    };
    Form.prototype.setForm = function (formParam) {
        var _this = this;
        var result;
        formParam = formParam || this.form;
        if (typeof formParam === 'string') {
            var formio_1 = new Formio(formParam);
            var error_1;
            result = this.getSubmission(formio_1)
                .catch(function (err) {
                error_1 = err;
            })
                .then(function (submission) {
                return formio_1.loadForm()
                    // If the form returned an error, show it instead of the form.
                    .catch(function (err) {
                    error_1 = err;
                })
                    .then(function (form) {
                    // If the submission returned an error, show it instead of the form.
                    if (error_1) {
                        form = _this.errorForm(error_1);
                    }
                    _this.instance = _this.instance || _this.create(form.display);
                    _this.instance.url = formParam;
                    _this.instance.nosubmit = false;
                    _this._form = _this.instance.form = form;
                    if (submission) {
                        _this.instance.submission = submission;
                    }
                    if (error_1) {
                        throw error_1;
                    }
                    return _this.instance;
                });
            });
        }
        else {
            this.instance = this.instance || this.create(formParam.display);
            this._form = this.instance.form = formParam;
            result = this.instance.ready;
        }
        // A redraw has occurred so save off the new element in case of a setDisplay causing a rebuild.
        return result.then(function () {
            _this.element = _this.instance.element;
            return _this.instance;
        });
    };
    Form.prototype.getSubmission = function (formio) {
        if (formio.submissionId) {
            return formio.loadSubmission();
        }
        return NativePromise.resolve();
    };
    /**
     * Changes the display of the form.
     *
     * @param {string} display - The display to set this form. Either "wizard", "form", or "pdf"
     * @return {Promise<T>}
     */
    Form.prototype.setDisplay = function (display) {
        if ((this.display === display) && this.instance) {
            return NativePromise.resolve(this.instance);
        }
        this.form.display = display;
        this.instance.destroy();
        this.instance = this.create(display);
        return this.setForm(this.form);
    };
    Form.prototype.empty = function () {
        if (this.element) {
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }
    };
    Form.embed = function (embed) {
        var _this = this;
        return new NativePromise(function (resolve) {
            if (!embed || !embed.src) {
                resolve();
            }
            var id = _this.id || "formio-" + Math.random().toString(36).substring(7);
            var className = embed.class || 'formio-form-wrapper';
            var code = embed.styles ? "<link rel=\"stylesheet\" href=\"" + embed.styles + "\">" : '';
            code += "<div id=\"" + id + "\" class=\"" + className + "\"></div>";
            document.write(code);
            var attempts = 0;
            var wait = setInterval(function () {
                attempts++;
                var formElement = document.getElementById(id);
                if (formElement || attempts > 10) {
                    resolve(new Form(formElement, embed.src).ready);
                    clearInterval(wait);
                }
            }, 10);
        });
    };
    /**
     * Sanitize an html string.
     *
     * @param string
     * @returns {*}
     */
    Form.prototype.sanitize = function (dirty) {
        return FormioUtils.sanitize(dirty, this.options);
    };
    Form.prototype.setContent = function (element, content) {
        if (element instanceof HTMLElement) {
            element.innerHTML = this.sanitize(content);
            return true;
        }
        return false;
    };
    /**
     * Build a new form.
     *
     * @return {Promise<T>}
     */
    Form.prototype.build = function () {
        var _this = this;
        if (!this.instance) {
            return NativePromise.reject('Form not ready. Use form.ready promise');
        }
        if (!this.element) {
            return NativePromise.reject('No DOM element for form.');
        }
        // Add temporary loader.
        var template = (this.options && this.options.template) ? this.options.template : 'bootstrap';
        var loader = Templates.templates[template].loader || Templates.templates.bootstrap.loader;
        this.setContent(this.element, loader.form);
        return this.render().then(function (html) {
            _this.setContent(_this.element, html);
            return _this.attach(_this.element).then(function () { return _this.instance; });
        })
            .then(function (param) {
            _this.emit('build', param);
            return param;
        });
    };
    Form.prototype.render = function () {
        var _this = this;
        if (!this.instance) {
            return NativePromise.reject('Form not ready. Use form.ready promise');
        }
        return NativePromise.resolve(this.instance.render())
            .then(function (param) {
            _this.emit('render', param);
            return param;
        });
    };
    Form.prototype.attach = function (element) {
        var _this = this;
        if (!this.instance) {
            return NativePromise.reject('Form not ready. Use form.ready promise');
        }
        this.element = element;
        return this.instance.attach(this.element)
            .then(function (param) {
            _this.emit('attach', param);
            return param;
        });
    };
    return Form;
}(Base));
export { Form };
// Allow simple embedding.
Formio.embedForm = function (embed) { return Form.embed(embed); };
/**
 * Factory that creates a new form based on the form parameters.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio.createForm = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (new (Form.bind.apply(Form, __spreadArrays([void 0], args)))()).ready;
};
Formio.Form = Form;
