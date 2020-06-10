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
/* global Quill */
import TextFieldComponent from '../textfield/TextField';
import _ from 'lodash';
import NativePromise from 'native-promise-only';
import { uniqueName } from '../../utils/utils';
var TextAreaComponent = /** @class */ (function (_super) {
    __extends(TextAreaComponent, _super);
    function TextAreaComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextFieldComponent.schema.apply(TextFieldComponent, __spreadArrays([{
                type: 'textarea',
                label: 'Text Area',
                key: 'textArea',
                rows: 3,
                wysiwyg: false,
                editor: '',
                fixedSize: true,
                inputFormat: 'html',
                validate: {
                    minWords: '',
                    maxWords: ''
                }
            }], extend));
    };
    Object.defineProperty(TextAreaComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Text Area',
                group: 'basic',
                icon: 'font',
                documentation: 'http://help.form.io/userguide/#textarea',
                weight: 20,
                schema: TextAreaComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.editors = [];
        this.editorsReady = [];
        this.updateSizes = [];
        // Never submit on enter for text areas.
        this.options.submitOnEnter = false;
    };
    Object.defineProperty(TextAreaComponent.prototype, "defaultSchema", {
        get: function () {
            return TextAreaComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextAreaComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.type = this.component.wysiwyg ? 'div' : 'textarea';
            if (this.component.rows) {
                info.attr.rows = this.component.rows;
            }
            return info;
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.validateMultiple = function () {
        return !this.isJsonValue;
    };
    TextAreaComponent.prototype.renderElement = function (value, index) {
        var info = this.inputInfo;
        info.attr = info.attr || {};
        info.content = value;
        if (this.options.readOnly || this.disabled) {
            return this.renderTemplate('well', {
                children: '<div ref="input"></div>',
                nestedKey: this.key,
                value: value
            });
        }
        return this.renderTemplate('input', {
            input: info,
            value: value,
            index: index
        });
    };
    Object.defineProperty(TextAreaComponent.prototype, "autoExpand", {
        get: function () {
            return this.component.autoExpand;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates the editor value.
     *
     * @param newValue
     */
    TextAreaComponent.prototype.updateEditorValue = function (index, newValue) {
        newValue = this.getConvertedValue(this.removeBlanks(newValue));
        var dataValue = this.dataValue;
        if (this.component.multiple && Array.isArray(dataValue)) {
            var newArray = _.clone(dataValue);
            newArray[index] = newValue;
            newValue = newArray;
        }
        if ((!_.isEqual(newValue, dataValue)) && (!_.isEmpty(newValue) || !_.isEmpty(dataValue))) {
            this.updateValue(newValue, {
                modified: !this.autoModified
            }, index);
        }
        this.autoModified = false;
    };
    TextAreaComponent.prototype.attachElement = function (element, index) {
        var _this_1 = this;
        if (this.autoExpand && (this.isPlain || this.options.readOnly || this.options.htmlView)) {
            if (element.nodeName === 'TEXTAREA') {
                this.addAutoExpanding(element, index);
            }
        }
        if (this.options.readOnly) {
            return element;
        }
        if (this.component.wysiwyg && !this.component.editor) {
            this.component.editor = 'ckeditor';
        }
        var settings = _.isEmpty(this.component.wysiwyg) ?
            this.wysiwygDefault[this.component.editor] || this.wysiwygDefault.default
            : this.component.wysiwyg;
        // Keep track of when this editor is ready.
        this.editorsReady[index] = new NativePromise(function (editorReady) {
            // Attempt to add a wysiwyg editor. In order to add one, it must be included on the global scope.
            switch (_this_1.component.editor) {
                case 'ace':
                    if (!settings) {
                        settings = {};
                    }
                    settings.mode = _this_1.component.as;
                    _this_1.addAce(element, settings, function (newValue) { return _this_1.updateEditorValue(index, newValue); }).then(function (ace) {
                        _this_1.editors[index] = ace;
                        var dataValue = _this_1.dataValue;
                        dataValue = (_this_1.component.multiple && Array.isArray(dataValue)) ? dataValue[index] : dataValue;
                        ace.setValue(_this_1.setConvertedValue(dataValue, index));
                        editorReady(ace);
                        return ace;
                    }).catch(function (err) { return console.warn(err); });
                    break;
                case 'quill':
                    // Normalize the configurations for quill.
                    if (settings.hasOwnProperty('toolbarGroups') || settings.hasOwnProperty('toolbar')) {
                        console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
                        settings = _this_1.wysiwygDefault.quill;
                    }
                    // Add the quill editor.
                    _this_1.addQuill(element, settings, function () { return _this_1.updateEditorValue(index, _this_1.editors[index].root.innerHTML); }).then(function (quill) {
                        _this_1.editors[index] = quill;
                        if (_this_1.component.isUploadEnabled) {
                            var _this_2 = _this_1;
                            quill.getModule('toolbar').addHandler('image', function () {
                                //we need initial 'this' because quill calls this method with its own context and we need some inner quill methods exposed in it
                                //we also need current component instance as we use some fields and methods from it as well
                                _this_2.imageHandler.call(_this_2, this);
                            });
                        }
                        quill.root.spellcheck = _this_1.component.spellcheck;
                        if (_this_1.options.readOnly || _this_1.component.disabled) {
                            quill.disable();
                        }
                        var dataValue = _this_1.dataValue;
                        dataValue = (_this_1.component.multiple && Array.isArray(dataValue)) ? dataValue[index] : dataValue;
                        quill.setContents(quill.clipboard.convert(_this_1.setConvertedValue(dataValue, index)));
                        editorReady(quill);
                        return quill;
                    }).catch(function (err) { return console.warn(err); });
                    break;
                case 'ckeditor':
                    settings = settings || {};
                    settings.rows = _this_1.component.rows;
                    _this_1.addCKE(element, settings, function (newValue) { return _this_1.updateEditorValue(index, newValue); })
                        .then(function (editor) {
                        _this_1.editors[index] = editor;
                        if (_this_1.options.readOnly || _this_1.component.disabled) {
                            editor.isReadOnly = true;
                        }
                        var numRows = parseInt(_this_1.component.rows, 10);
                        if (_.isFinite(numRows) && _.has(editor, 'ui.view.editable.editableElement')) {
                            // Default height is 21px with 10px margin + a 14px top margin.
                            var editorHeight = (numRows * 31) + 14;
                            editor.ui.view.editable.editableElement.style.height = (editorHeight) + "px";
                        }
                        var dataValue = _this_1.dataValue;
                        dataValue = (_this_1.component.multiple && Array.isArray(dataValue)) ? dataValue[index] : dataValue;
                        editor.data.set(_this_1.setConvertedValue(dataValue, index));
                        editorReady(editor);
                        return editor;
                    });
                    break;
                case 'tiny':
                    if (!settings) {
                        settings = {};
                    }
                    settings.mode = _this_1.component.as || 'javascript';
                    _this_1.addTiny(element, settings, function (newValue) { return _this_1.updateEditorValue(newValue); })
                        .then(function (tiny) {
                        _this_1.editors[index] = tiny;
                        tiny.setContent(_this_1.setConvertedValue(_this_1.dataValue));
                        editorReady(tiny);
                        return tiny;
                    }).catch(function (err) { return console.warn(err); });
                    break;
                default:
                    _super.prototype.attachElement.call(_this_1, element, index);
                    break;
            }
        });
        return element;
    };
    TextAreaComponent.prototype.attach = function (element) {
        var attached = _super.prototype.attach.call(this, element);
        // Make sure we restore the value after attaching since wysiwygs and readonly texts need an additional set.
        this.restoreValue();
        return attached;
    };
    TextAreaComponent.prototype.imageHandler = function (quillInstance) {
        var _this_1 = this;
        var fileInput = quillInstance.container.querySelector('input.ql-image[type=file]');
        if (fileInput == null) {
            fileInput = document.createElement('input');
            fileInput.setAttribute('type', 'file');
            fileInput.setAttribute('accept', 'image/*');
            fileInput.classList.add('ql-image');
            this.addEventListener(fileInput, 'change', function () {
                var files = fileInput.files;
                var range = quillInstance.quill.getSelection(true);
                if (!files || !files.length) {
                    console.warn('No files selected');
                    return;
                }
                quillInstance.quill.enable(false);
                var _a = _this_1.component, uploadStorage = _a.uploadStorage, uploadUrl = _a.uploadUrl, uploadOptions = _a.uploadOptions, uploadDir = _a.uploadDir, fileKey = _a.fileKey;
                var requestData;
                _this_1.fileService
                    .uploadFile(uploadStorage, files[0], uniqueName(files[0].name), uploadDir || '', //should pass empty string if undefined
                null, uploadUrl, uploadOptions, fileKey)
                    .then(function (result) {
                    requestData = result;
                    return _this_1.fileService.downloadFile(result);
                })
                    .then(function (result) {
                    quillInstance.quill.enable(true);
                    var Delta = Quill.import('delta');
                    quillInstance.quill.updateContents(new Delta()
                        .retain(range.index)
                        .delete(range.length)
                        .insert({
                        image: result.url
                    }, {
                        alt: JSON.stringify(requestData),
                    }), Quill.sources.USER);
                    fileInput.value = '';
                }).catch(function (error) {
                    console.warn('Quill image upload failed');
                    console.warn(error);
                    quillInstance.quill.enable(true);
                });
            });
            quillInstance.container.appendChild(fileInput);
        }
        fileInput.click();
    };
    Object.defineProperty(TextAreaComponent.prototype, "isPlain", {
        get: function () {
            return (!this.component.wysiwyg && !this.component.editor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextAreaComponent.prototype, "htmlView", {
        get: function () {
            return this.options.readOnly && (this.component.editor || this.component.wysiwyg);
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.setValueAt = function (index, value, flags) {
        var _this_1 = this;
        if (flags === void 0) { flags = {}; }
        _super.prototype.setValueAt.call(this, index, value, flags);
        if (this.editorsReady[index]) {
            var setEditorsValue = function (flags) { return function (editor) {
                _this_1.autoModified = true;
                if (!flags.skipWysiwyg) {
                    switch (_this_1.component.editor) {
                        case 'ace':
                            editor.setValue(_this_1.setConvertedValue(value, index));
                            break;
                        case 'quill':
                            if (_this_1.component.isUploadEnabled) {
                                _this_1.setAsyncConvertedValue(value)
                                    .then(function (result) {
                                    editor.setContents(editor.clipboard.convert(result));
                                });
                            }
                            else {
                                editor.setContents(editor.clipboard.convert(_this_1.setConvertedValue(value, index)));
                            }
                            break;
                        case 'ckeditor':
                            editor.data.set(_this_1.setConvertedValue(value, index));
                            break;
                        case 'tiny':
                            editor.setContent(_this_1.setConvertedValue(value));
                            break;
                    }
                }
            }; };
            this.editorsReady[index].then(setEditorsValue(_.clone(flags)));
        }
    };
    TextAreaComponent.prototype.setValue = function (value, flags) {
        var _this_1 = this;
        if (flags === void 0) { flags = {}; }
        if (this.isPlain || this.options.readOnly || this.disabled) {
            value = (this.component.multiple && Array.isArray(value)) ?
                value.map(function (val, index) { return _this_1.setConvertedValue(val, index); }) :
                this.setConvertedValue(value);
            return _super.prototype.setValue.call(this, value, flags);
        }
        flags.skipWysiwyg = _.isEqual(value, this.getValue());
        return _super.prototype.setValue.call(this, value, flags);
    };
    TextAreaComponent.prototype.setReadOnlyValue = function (value, index) {
        index = index || 0;
        if (this.options.readOnly || this.disabled) {
            if (this.refs.input && this.refs.input[index]) {
                this.setContent(this.refs.input[index], this.interpolate(value));
            }
        }
    };
    Object.defineProperty(TextAreaComponent.prototype, "isJsonValue", {
        get: function () {
            return this.component.as && this.component.as === 'json';
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.setConvertedValue = function (value, index) {
        if (this.isJsonValue && !_.isNil(value)) {
            try {
                value = JSON.stringify(value, null, 2);
            }
            catch (err) {
                console.warn(err);
            }
        }
        if (!_.isString(value)) {
            value = '';
        }
        this.setReadOnlyValue(value, index);
        return value;
    };
    TextAreaComponent.prototype.setAsyncConvertedValue = function (value) {
        if (this.isJsonValue && value) {
            try {
                value = JSON.stringify(value, null, 2);
            }
            catch (err) {
                console.warn(err);
            }
        }
        if (!_.isString(value)) {
            value = '';
        }
        var htmlDoc = new DOMParser().parseFromString(value, 'text/html');
        var images = htmlDoc.getElementsByTagName('img');
        if (images.length) {
            return this.setImagesUrl(images)
                .then(function () {
                value = htmlDoc.getElementsByTagName('body')[0].firstElementChild;
                return new XMLSerializer().serializeToString(value);
            });
        }
        else {
            return NativePromise.resolve(value);
        }
    };
    TextAreaComponent.prototype.setImagesUrl = function (images) {
        var _this_1 = this;
        return NativePromise.all(_.map(images, function (image) {
            var requestData;
            try {
                requestData = JSON.parse(image.getAttribute('alt'));
            }
            catch (error) {
                console.warn(error);
            }
            return _this_1.fileService.downloadFile(requestData)
                .then(function (result) {
                image.setAttribute('src', result.url);
            });
        }));
    };
    TextAreaComponent.prototype.addAutoExpanding = function (textarea, index) {
        var heightOffset = null;
        var previousHeight = null;
        var changeOverflow = function (value) {
            var width = textarea.style.width;
            textarea.style.width = '0px';
            textarea.offsetWidth;
            textarea.style.width = width;
            textarea.style.overflowY = value;
        };
        var preventParentScroll = function (element, changeSize) {
            var nodeScrolls = [];
            while (element && element.parentNode && element.parentNode instanceof Element) {
                if (element.parentNode.scrollTop) {
                    nodeScrolls.push({
                        node: element.parentNode,
                        scrollTop: element.parentNode.scrollTop,
                    });
                }
                element = element.parentNode;
            }
            changeSize();
            nodeScrolls.forEach(function (nodeScroll) {
                nodeScroll.node.scrollTop = nodeScroll.scrollTop;
            });
        };
        var resize = function () {
            if (textarea.scrollHeight === 0) {
                return;
            }
            preventParentScroll(textarea, function () {
                textarea.style.height = '';
                textarea.style.height = textarea.scrollHeight + heightOffset + "px";
            });
        };
        var update = _.debounce(function () {
            resize();
            var styleHeight = Math.round(parseFloat(textarea.style.height));
            var computed = window.getComputedStyle(textarea, null);
            var currentHeight = textarea.offsetHeight;
            if (currentHeight < styleHeight && computed.overflowY === 'hidden') {
                changeOverflow('scroll');
            }
            else if (computed.overflowY !== 'hidden') {
                changeOverflow('hidden');
            }
            resize();
            currentHeight = textarea.offsetHeight;
            if (previousHeight !== currentHeight) {
                previousHeight = currentHeight;
                update();
            }
        }, 200);
        var computedStyle = window.getComputedStyle(textarea, null);
        textarea.style.resize = 'none';
        heightOffset = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth) || 0;
        if (window) {
            this.addEventListener(window, 'resize', update);
        }
        this.addEventListener(textarea, 'input', update);
        this.on('initialized', update);
        this.updateSizes[index] = update;
        update();
    };
    TextAreaComponent.prototype.removeBlanks = function (value) {
        if (!value) {
            return value;
        }
        var removeBlanks = function (input) {
            if (typeof input !== 'string') {
                return input;
            }
            return input.replace(/<p>&nbsp;<\/p>|<p><br><\/p>|<p><br>&nbsp;<\/p>/g, '').trim();
        };
        if (Array.isArray(value)) {
            value.forEach(function (input, index) {
                value[index] = removeBlanks(input);
            });
        }
        else {
            value = removeBlanks(value);
        }
        return value;
    };
    TextAreaComponent.prototype.onChange = function (flags, fromRoot) {
        var changed = _super.prototype.onChange.call(this, flags, fromRoot);
        this.updateSizes.forEach(function (updateSize) { return updateSize(); });
        return changed;
    };
    TextAreaComponent.prototype.hasChanged = function (newValue, oldValue) {
        return _super.prototype.hasChanged.call(this, this.removeBlanks(newValue), this.removeBlanks(oldValue));
    };
    TextAreaComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        return _super.prototype.isEmpty.call(this, this.removeBlanks(value));
    };
    Object.defineProperty(TextAreaComponent.prototype, "defaultValue", {
        get: function () {
            var defaultValue = _super.prototype.defaultValue;
            if (this.component.editor === 'quill' && !defaultValue) {
                defaultValue = '<p><br></p>';
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.getConvertedValue = function (value) {
        if (this.isJsonValue && value) {
            try {
                value = JSON.parse(value);
            }
            catch (err) {
                // console.warn(err);
            }
        }
        return value;
    };
    TextAreaComponent.prototype.detach = function () {
        var _this_1 = this;
        // Destroy all editors.
        this.editors.forEach(function (editor) {
            if (editor.destroy) {
                editor.destroy();
            }
        });
        this.editors = [];
        this.editorsReady = [];
        this.updateSizes.forEach(function (updateSize) { return _this_1.removeEventListener(window, 'resize', updateSize); });
        this.updateSizes = [];
    };
    TextAreaComponent.prototype.getValue = function () {
        if (this.isPlain) {
            return this.getConvertedValue(_super.prototype.getValue.call(this));
        }
        return this.dataValue;
    };
    return TextAreaComponent;
}(TextFieldComponent));
export default TextAreaComponent;
