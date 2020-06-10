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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import NativePromise from 'native-promise-only';
import Formio from '../../Formio';
import Webform from '../webform/Webform';
import { fastCloneDeep, eachComponent } from '../../utils/utils';
var PDF = /** @class */ (function (_super) {
    __extends(PDF, _super);
    function PDF(element, options) {
        var _this = _super.call(this, element, options) || this;
        _this.components = [];
        return _this;
    }
    PDF.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        // Handle an iframe submission.
        this.on('iframe-submission', function (submission) { return _this.setValue(submission, {
            fromIframe: true
        }); }, true);
        this.on('iframe-change', function (submission) { return _this.setValue(submission, {
            fromIframe: true
        }); }, true);
        this.on('iframe-getIframePositions', function () {
            var iframeBoundingClientRect = document.querySelector('iframe').getBoundingClientRect();
            _this.postMessage({
                name: 'iframePositions',
                data: {
                    iframe: {
                        top: iframeBoundingClientRect.top
                    },
                    scrollY: window.scrollY || window.pageYOffset
                }
            });
        });
        // Trigger when this form is ready.
        this.on('iframe-ready', function () { return _this.iframeReadyResolve(); }, true);
    };
    PDF.prototype.render = function () {
        this.submitButton = this.addComponent({
            input: true,
            type: 'button',
            action: 'submit',
            internal: true,
            label: 'Submit',
            key: 'submit',
            ref: 'button',
            hidden: this.checkSubmitButtonHiddenness()
        });
        return this.renderTemplate('pdf', {
            submitButton: this.submitButton.render(),
            classes: 'formio-form-pdf',
            children: this.renderComponents()
        });
    };
    PDF.prototype.redraw = function () {
        this.postMessage({ name: 'redraw' });
        return this.builderMode ? NativePromise.resolve() : _super.prototype.redraw.call(this);
    };
    PDF.prototype.rebuild = function () {
        if (this.builderMode && this.component.components) {
            this.destroyComponents();
            this.addComponents();
            return NativePromise.resolve();
        }
        this.postMessage({ name: 'redraw' });
        return _super.prototype.rebuild.call(this);
    };
    PDF.prototype.attach = function (element) {
        var _this = this;
        return _super.prototype.attach.call(this, element).then(function () {
            _this.loadRefs(element, {
                button: 'single',
                buttonMessageContainer: 'single',
                buttonMessage: 'single',
                zoomIn: 'single',
                zoomOut: 'single',
                iframeContainer: 'single'
            });
            _this.submitButton.refs = __assign({}, _this.refs);
            _this.submitButton.attachButton();
            // Reset the iframeReady promise.
            _this.iframeReady = new NativePromise(function (resolve, reject) {
                _this.iframeReadyResolve = resolve;
                _this.iframeReadyReject = reject;
            });
            // iframes cannot be in the template so manually create it
            _this.iframeElement = _this.ce('iframe', {
                src: _this.getSrc(),
                id: "iframe-" + _this.id,
                seamless: true,
                class: 'formio-iframe'
            });
            _this.iframeElement.formioContainer = _this.component.components;
            _this.iframeElement.formioComponent = _this;
            // Append the iframe to the iframeContainer in the template
            _this.empty(_this.refs.iframeContainer);
            _this.appendChild(_this.refs.iframeContainer, _this.iframeElement);
            // Post the form to the iframe
            _this.postMessage({ name: 'form', data: _this.form });
            // Hide the submit button if the associated component is hidden
            var submitButton = _this.components.find(function (c) { return c.element === _this.refs.button; });
            if (submitButton) {
                _this.refs.button.classList.toggle('hidden', !submitButton.visible);
            }
            _this.addEventListener(_this.refs.zoomIn, 'click', function (event) {
                event.preventDefault();
                _this.postMessage({ name: 'zoomIn' });
            });
            _this.addEventListener(_this.refs.zoomOut, 'click', function (event) {
                event.preventDefault();
                _this.postMessage({ name: 'zoomOut' });
            });
            var form = fastCloneDeep(_this.form);
            if (_this.formio) {
                form.projectUrl = _this.formio.projectUrl;
                form.url = _this.formio.formUrl;
                form.base = _this.formio.base;
                _this.postMessage({ name: 'token', data: _this.formio.getToken() });
            }
            _this.emit('attach');
        });
    };
    /**
     * Get the submission from the iframe.
     *
     * @return {Promise<any>}
     */
    PDF.prototype.getSubmission = function () {
        var _this = this;
        return new NativePromise(function (resolve) {
            _this.once('iframe-submission', resolve);
            _this.postMessage({ name: 'getSubmission' });
        });
    };
    /**
     * Ensure we have the submission from the iframe before we submit the form.
     *
     * @param options
     * @return {*}
     */
    PDF.prototype.submitForm = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.postMessage({ name: 'getErrors' });
        return this.getSubmission().then(function () { return _super.prototype.submitForm.call(_this, options); });
    };
    PDF.prototype.getSrc = function () {
        if (!this._form || !this._form.settings || !this._form.settings.pdf) {
            return '';
        }
        var iframeSrc = this._form.settings.pdf.src + ".html";
        var params = ["id=" + this.id];
        if (this.options.readOnly) {
            params.push('readonly=1');
        }
        if (this.options.zoom) {
            params.push("zoom=" + this.options.zoom);
        }
        if (this.builderMode) {
            params.push('builder=1');
        }
        if (params.length) {
            iframeSrc += "?" + params.join('&');
        }
        return iframeSrc;
    };
    PDF.prototype.setForm = function (form) {
        var _this = this;
        if (this.builderMode && this.form.components) {
            this.postMessage({ name: 'form', data: this.form });
            return NativePromise.resolve();
        }
        return _super.prototype.setForm.call(this, form).then(function () {
            if (_this.formio) {
                form.projectUrl = _this.formio.projectUrl;
                form.url = _this.formio.formUrl;
                form.base = _this.formio.base;
                _this.postMessage({ name: 'token', data: _this.formio.getToken() });
            }
            _this.postMessage({ name: 'form', data: form });
        });
    };
    /**
     * Set's the value of this form component.
     *
     * @param submission
     * @param flags
     */
    PDF.prototype.setValue = function (submission, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        var changed = _super.prototype.setValue.call(this, submission, flags);
        if (!flags || !flags.fromIframe) {
            this.once('iframe-ready', function () {
                _this.postMessage({ name: 'submission', data: submission });
            });
        }
        return changed;
    };
    PDF.prototype.setSubmission = function (submission) {
        var _this = this;
        submission.readOnly = !!this.options.readOnly;
        return _super.prototype.setSubmission.call(this, submission).then(function () {
            if (_this.formio) {
                _this.formio.getDownloadUrl().then(function (url) {
                    // Add a download button if it has a download url.
                    if (!url) {
                        return;
                    }
                    if (!_this.downloadButton) {
                        if (_this.options.primaryProject) {
                            url += "&project=" + _this.options.primaryProject;
                        }
                        _this.downloadButton = _this.ce('a', {
                            href: url,
                            target: '_blank',
                            style: 'position:absolute;right:10px;top:110px;cursor:pointer;'
                        }, _this.ce('img', {
                            src: require('./pdf.image'),
                            style: 'width:3em;'
                        }));
                        _this.element.insertBefore(_this.downloadButton, _this.iframe);
                    }
                });
            }
        });
    };
    PDF.prototype.postMessage = function (message) {
        var _this = this;
        // If we get here before the iframeReady promise is set up, it's via the superclass constructor
        if (!this.iframeReady) {
            return;
        }
        if (!message.type) {
            message.type = 'iframe-data';
        }
        this.iframeReady.then(function () {
            if (_this.iframeElement && _this.iframeElement.contentWindow) {
                _this.iframeElement.contentWindow.postMessage(JSON.stringify(message), '*');
            }
        });
    };
    PDF.prototype.focusOnComponent = function (key) {
        this.postMessage({
            name: 'focusErroredField',
            data: key,
        });
    };
    // Do not clear the iframe.
    PDF.prototype.clear = function () { };
    PDF.prototype.showErrors = function (error, triggerEvent) {
        var helpBlock = document.getElementById('submit-error');
        if (!helpBlock && this.errors.length) {
            var p = this.ce('p', { class: 'help-block' });
            this.setContent(p, this.t('submitError'));
            p.addEventListener('click', function () {
                window.scrollTo(0, 0);
            });
            var div = this.ce('div', { id: 'submit-error', class: 'has-error' });
            this.appendTo(p, div);
            this.appendTo(div, this.element);
        }
        if (!this.errors.length && helpBlock) {
            helpBlock.remove();
        }
        _super.prototype.showErrors.call(this, error, triggerEvent);
    };
    PDF.prototype.checkSubmitButtonHiddenness = function () {
        var hidden = false;
        eachComponent(this.component.components, function (component) {
            if ((component.type === 'button') &&
                ((component.action === 'submit') || !component.action)) {
                hidden = component.hidden || false;
            }
        });
        return hidden;
    };
    return PDF;
}(Webform));
export default PDF;
/**
 * Listen for window messages.
 */
window.addEventListener('message', function (event) {
    var eventData = null;
    try {
        eventData = JSON.parse(event.data);
    }
    catch (err) {
        eventData = null;
    }
    // If this form exists, then emit the event within this form.
    if (eventData &&
        eventData.name &&
        eventData.formId &&
        Formio.forms.hasOwnProperty(eventData.formId)) {
        Formio.forms[eventData.formId].emit("iframe-" + eventData.name, eventData.data);
    }
});
