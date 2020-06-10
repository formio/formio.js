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
import SignaturePad from 'signature_pad/dist/signature_pad.js';
import Input from '../_classes/input/Input';
import _ from 'lodash';
var SignatureComponent = /** @class */ (function (_super) {
    __extends(SignatureComponent, _super);
    function SignatureComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignatureComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input.schema.apply(Input, __spreadArrays([{
                type: 'signature',
                label: 'Signature',
                key: 'signature',
                footer: 'Sign above',
                width: '100%',
                height: '150px',
                penColor: 'black',
                backgroundColor: 'rgb(245,245,235)',
                minWidth: '0.5',
                maxWidth: '2.5'
            }], extend));
    };
    Object.defineProperty(SignatureComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Signature',
                group: 'advanced',
                icon: 'pencil',
                weight: 120,
                documentation: 'http://help.form.io/userguide/#signature',
                schema: SignatureComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    SignatureComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.currentWidth = 0;
        this.scale = 1;
        if (!this.component.width) {
            this.component.width = '100%';
        }
        if (!this.component.height) {
            this.component.height = '200px';
        }
    };
    Object.defineProperty(SignatureComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignatureComponent.prototype, "defaultSchema", {
        get: function () {
            return SignatureComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignatureComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.type = 'input';
            info.attr.type = 'hidden';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignatureComponent.prototype, "className", {
        get: function () {
            return _super.prototype.className + " signature-pad";
        },
        enumerable: false,
        configurable: true
    });
    SignatureComponent.prototype.labelIsHidden = function () {
        return this.component.hideLabel;
    };
    SignatureComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = _super.prototype.setValue.call(this, value, flags);
        if (value && this.refs.signatureImage && this.options.readOnly) {
            this.refs.signatureImage.setAttribute('src', value);
            this.showCanvas(false);
        }
        if (this.signaturePad) {
            if (!value) {
                this.signaturePad.clear();
            }
            else if (changed) {
                this.triggerChange();
            }
        }
        return changed;
    };
    SignatureComponent.prototype.showCanvas = function (show) {
        if (show) {
            if (this.refs.canvas) {
                this.refs.canvas.style.display = 'inherit';
            }
            if (this.refs.signatureImage) {
                this.refs.signatureImage.style.display = 'none';
            }
        }
        else {
            if (this.refs.canvas) {
                this.refs.canvas.style.display = 'none';
            }
            if (this.refs.signatureImage) {
                this.refs.signatureImage.style.display = 'inherit';
            }
        }
    };
    SignatureComponent.prototype.onDisabled = function () {
        this.showCanvas(!_super.prototype.disabled);
        if (this.signaturePad) {
            if (_super.prototype.disabled) {
                this.signaturePad.off();
                if (this.refs.refresh) {
                    this.refs.refresh.classList.add('disabled');
                }
                if (this.refs.signatureImage) {
                    this.refs.signatureImage.setAttribute('src', this.dataValue);
                }
            }
            else {
                this.signaturePad.on();
                if (this.refs.refresh) {
                    this.refs.refresh.classList.remove('disabled');
                }
            }
        }
    };
    SignatureComponent.prototype.checkSize = function (force, scale) {
        if (force || (this.refs.padBody.offsetWidth !== this.currentWidth)) {
            this.scale = force ? scale : this.scale;
            this.currentWidth = this.refs.padBody.offsetWidth;
            this.refs.canvas.width = this.currentWidth * this.scale;
            this.refs.canvas.height = this.refs.padBody.offsetHeight * this.scale;
            var ctx = this.refs.canvas.getContext('2d');
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale((1 / this.scale), (1 / this.scale));
            ctx.fillStyle = this.signaturePad.backgroundColor;
            ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
            this.signaturePad.clear();
            if (this.dataValue) {
                this.signaturePad.fromDataURL(this.dataValue);
            }
        }
    };
    SignatureComponent.prototype.renderElement = function (value, index) {
        return this.renderTemplate('signature', {
            element: _super.prototype.renderElement.call(this, value, index),
            required: _.get(this.component, 'validate.required', false),
        });
    };
    SignatureComponent.prototype.setOpenModalElement = function () {
        var template;
        if (this.dataValue) {
            template = this.getModalPreviewTemplate();
        }
        else {
            template = "\n        <label class=\"control-label\">" + this.component.label + "</label><br>\n        <button lang='en' class='btn btn-light btn-md open-modal-button' ref='openModal'>Click to Sign</button>\n      ";
        }
        this.componentModal.setOpenModalElement(template);
    };
    SignatureComponent.prototype.getModalPreviewTemplate = function () {
        return "\n      <label class=\"control-label\">" + this.component.label + "</label><br>\n      <img src=" + this.dataValue + " ref='openModal' />\n    ";
    };
    SignatureComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { canvas: 'single', refresh: 'single', padBody: 'single', signatureImage: 'single' });
        var superAttach = _super.prototype.attach.call(this, element);
        if (this.refs.refresh && this.options.readOnly) {
            this.refs.refresh.classList.add('disabled');
        }
        // Create the signature pad.
        if (this.refs.canvas) {
            this.signaturePad = new SignaturePad(this.refs.canvas, {
                minWidth: this.component.minWidth,
                maxWidth: this.component.maxWidth,
                penColor: this.component.penColor,
                backgroundColor: this.component.backgroundColor
            });
            this.signaturePad.onEnd = function () { return _this.setValue(_this.signaturePad.toDataURL()); };
            this.refs.signatureImage.setAttribute('src', this.signaturePad.toDataURL());
            this.onDisabled();
            // Ensure the signature is always the size of its container.
            if (this.refs.padBody) {
                if (!this.refs.padBody.style.maxWidth) {
                    this.refs.padBody.style.maxWidth = '100%';
                }
                this.addEventListener(window, 'resize', _.debounce(function () { return _this.checkSize(); }, 100));
                setTimeout(function checkWidth() {
                    if (this.refs.padBody && this.refs.padBody.offsetWidth) {
                        this.checkSize();
                    }
                    else {
                        setTimeout(checkWidth.bind(this), 200);
                    }
                }.bind(this), 200);
            }
        }
        this.addEventListener(this.refs.refresh, 'click', function (event) {
            event.preventDefault();
            _this.showCanvas(true);
            _this.signaturePad.clear();
            _this.setValue(_this.defaultValue);
        });
        this.setValue(this.dataValue);
        return superAttach;
    };
    /* eslint-enable max-statements */
    SignatureComponent.prototype.detach = function () {
        if (this.signaturePad) {
            this.signaturePad.off();
        }
        this.signaturePad = null;
        this.currentWidth = 0;
        _super.prototype.detach.call(this);
    };
    SignatureComponent.prototype.getValueAsString = function (value) {
        return value ? 'Yes' : 'No';
    };
    SignatureComponent.prototype.focus = function () {
        this.refs.padBody.focus();
    };
    return SignatureComponent;
}(Input));
export default SignatureComponent;
