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
import NativePromise from 'native-promise-only';
import fetchPonyfill from 'fetch-ponyfill';
import { Formio } from '../../Formio';
import WebformBuilder from '../webform/WebformBuilder';
import { getElementRect, fastCloneDeep } from '../../utils/utils';
import { eachComponent } from '../../utils/formUtils';
import BuilderUtils from '../../utils/builder';
import { PDF } from '../../displays/pdf/PDF';
var _a = fetchPonyfill({
    Promise: NativePromise
}), fetch = _a.fetch, Headers = _a.Headers;
var PDFBuilder = /** @class */ (function (_super) {
    __extends(PDFBuilder, _super);
    function PDFBuilder() {
        var _this = this;
        var element, options;
        if (arguments[0] instanceof HTMLElement || arguments[1]) {
            element = arguments[0];
            options = arguments[1];
        }
        else {
            options = arguments[0];
        }
        // Force superclass to skip the automatic init; we'll trigger it manually
        options.skipInit = true;
        if (element) {
            _this = _super.call(this, element, options) || this;
        }
        else {
            _this = _super.call(this, options) || this;
        }
        _this.dragDropEnabled = false;
        return _this;
    }
    Object.defineProperty(PDFBuilder.prototype, "defaultGroups", {
        get: function () {
            return {
                pdf: {
                    title: 'PDF Fields',
                    weight: 0,
                    default: true,
                    components: {
                        textfield: true,
                        number: true,
                        password: true,
                        email: true,
                        phoneNumber: true,
                        currency: true,
                        checkbox: true,
                        signature: true,
                        select: true,
                        textarea: true,
                        datetime: true,
                        file: true,
                        htmlelement: true,
                    }
                },
                basic: false,
                advanced: false,
                layout: false,
                data: false,
                premium: false,
                resource: false
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PDFBuilder.prototype, "hasPDF", {
        get: function () {
            return _.has(this.webform.form, 'settings.pdf');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PDFBuilder.prototype, "projectUrl", {
        get: function () {
            return this.options.projectUrl || Formio.getProjectUrl();
        },
        enumerable: false,
        configurable: true
    });
    // 888      d8b  .d888                                    888
    // 888      Y8P d88P"                                     888
    // 888          888                                       888
    // 888      888 888888 .d88b.   .d8888b 888  888  .d8888b 888  .d88b.
    // 888      888 888   d8P  Y8b d88P"    888  888 d88P"    888 d8P  Y8b
    // 888      888 888   88888888 888      888  888 888      888 88888888
    // 888      888 888   Y8b.     Y88b.    Y88b 888 Y88b.    888 Y8b.
    // 88888888 888 888    "Y8888   "Y8888P  "Y88888  "Y8888P 888  "Y8888
    //                                           888
    //                                      Y8b d88P
    //                                       "Y88P"
    PDFBuilder.prototype.init = function () {
        this.options.attachMode = 'builder';
        this.webform = this.webform || this.createForm(this.options);
        this.webform.init();
    };
    PDFBuilder.prototype.render = function () {
        var _this = this;
        var result = this.renderTemplate('pdfBuilder', {
            sidebar: this.renderTemplate('builderSidebar', {
                scrollEnabled: this.sideBarScroll,
                groupOrder: this.groupOrder,
                groupId: "builder-sidebar-" + this.id,
                groups: this.groupOrder.map(function (groupKey) { return _this.renderTemplate('builderSidebarGroup', {
                    group: _this.groups[groupKey],
                    groupKey: groupKey,
                    groupId: "builder-sidebar-" + _this.id,
                    subgroups: _this.groups[groupKey].subgroups.map(function (group) { return _this.renderTemplate('builderSidebarGroup', {
                        group: group,
                        groupKey: group.key,
                        groupId: "builder-sidebar-" + groupKey,
                        subgroups: []
                    }); }),
                }); }),
            }),
            form: this.hasPDF ?
                this.webform.render() :
                this.renderTemplate('pdfBuilderUpload', {})
        });
        return result;
    };
    PDFBuilder.prototype.attach = function (element) {
        var _this = this;
        // PDF Upload
        if (!this.hasPDF) {
            this.loadRefs(element, {
                'fileDrop': 'single',
                'fileBrowse': 'single',
                'hiddenFileInputElement': 'single',
                'uploadError': 'single',
            });
            this.addEventListener(this.refs['pdf-upload-button'], 'click', function (event) {
                event.preventDefault();
            });
            // Init the upload error.
            if (!this.projectUrl) {
                this.setUploadError('Form options.projectUrl not set. Please set the "projectUrl" property of the options for this form or use Formio.setProjectUrl(). This setting is necessary to upload a pdf background.');
            }
            else {
                this.setUploadError();
            }
            if (this.refs.fileDrop) {
                var element_1 = this;
                this.addEventListener(this.refs.fileDrop, 'dragover', function (event) {
                    this.className = 'fileSelector fileDragOver';
                    event.preventDefault();
                });
                this.addEventListener(this.refs.fileDrop, 'dragleave', function (event) {
                    this.className = 'fileSelector';
                    event.preventDefault();
                });
                this.addEventListener(this.refs.fileDrop, 'drop', function (event) {
                    this.className = 'fileSelector';
                    event.preventDefault();
                    element_1.upload(event.dataTransfer.files[0]);
                    return false;
                });
            }
            if (this.refs.fileBrowse && this.refs.hiddenFileInputElement) {
                this.addEventListener(this.refs.fileBrowse, 'click', function (event) {
                    event.preventDefault();
                    // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
                    // a click event on it.
                    if (typeof _this.refs.hiddenFileInputElement.trigger === 'function') {
                        _this.refs.hiddenFileInputElement.trigger('click');
                    }
                    else {
                        _this.refs.hiddenFileInputElement.click();
                    }
                });
                this.addEventListener(this.refs.hiddenFileInputElement, 'change', function () {
                    _this.upload(_this.refs.hiddenFileInputElement.files[0]);
                    _this.refs.hiddenFileInputElement.value = '';
                });
            }
            return NativePromise.resolve();
        }
        // Normal PDF Builder
        return _super.prototype.attach.call(this, element).then(function () {
            _this.loadRefs(_this.element, {
                iframeDropzone: 'single', 'sidebar-container': 'multiple'
            });
            _this.afterAttach();
            return _this.element;
        });
    };
    PDFBuilder.prototype.afterAttach = function () {
        var _this = this;
        this.on('saveComponent', function (schema, component) {
            _this.webform.postMessage({ name: 'updateElement', data: component });
        });
        this.on('removeComponent', function (component) {
            _this.webform.postMessage({ name: 'removeElement', data: component });
        });
        this.initIframeEvents();
        this.updateDropzoneDimensions();
        this.initDropzoneEvents();
        this.prepSidebarComponentsForDrag();
    };
    PDFBuilder.prototype.upload = function (file) {
        var _this = this;
        var headers = new Headers({
            'Accept': 'application/json, text/plain, */*',
            'x-jwt-token': Formio.getToken(),
        });
        var formData = new FormData();
        formData.append('file', file);
        fetch(this.projectUrl + "/upload", {
            method: 'POST',
            headers: headers,
            body: formData
        })
            .then(function (response) {
            if (response.status !== 201) {
                response.text().then(function (info) {
                    _this.setUploadError(response.statusText + " - " + info);
                });
            }
            else {
                response.json().then(function (data) {
                    _.set(_this.webform.form, 'settings.pdf', {
                        id: data.file,
                        src: "" + data.filesServer + data.path
                    });
                    _this.emit('pdfUploaded', data);
                    // Now that the settings are set, redraw to show the builder.
                    _this.redraw();
                });
            }
        })
            .catch(function () {
            _this.setUploadError('Upload failed.');
        });
    };
    PDFBuilder.prototype.setUploadError = function (message) {
        if (!this.refs.uploadError) {
            return;
        }
        this.refs.uploadError.style.display = message ? '' : 'none';
        this.refs.uploadError.innerHTML = message;
    };
    PDFBuilder.prototype.createForm = function (options) {
        var _this = this;
        // Instantiate the webform from the PDF class instead of Webform
        options.skipInit = false;
        this.webform = new PDF(this.element, options);
        this.webform.on('attach', function () {
            // If the dropzone exists but has been removed in a PDF rebuild, reinstate it
            if (_this.refs.iframeDropzone && !__spreadArrays(_this.refs.form.children).includes(_this.refs.iframeDropzone)) {
                _this.prependTo(_this.refs.iframeDropzone, _this.refs.form);
            }
        });
        return this.webform;
    };
    PDFBuilder.prototype.destroy = function (deleteFromGlobal) {
        _super.prototype.destroy.call(this, deleteFromGlobal);
        this.webform.destroy(deleteFromGlobal);
    };
    // d8b 8888888888                                                                              888
    // Y8P 888                                                                                     888
    //     888                                                                                     888
    // 888 8888888 888d888 8888b.  88888b.d88b.   .d88b.        .d88b.  888  888  .d88b.  88888b.  888888 .d8888b
    // 888 888     888P"      "88b 888 "888 "88b d8P  Y8b      d8P  Y8b 888  888 d8P  Y8b 888 "88b 888    88K
    // 888 888     888    .d888888 888  888  888 88888888      88888888 Y88  88P 88888888 888  888 888    "Y8888b.
    // 888 888     888    888  888 888  888  888 Y8b.          Y8b.      Y8bd8P  Y8b.     888  888 Y88b.       X88
    // 888 888     888    "Y888888 888  888  888  "Y8888        "Y8888    Y88P    "Y8888  888  888  "Y888  88888P'
    PDFBuilder.prototype.initIframeEvents = function () {
        var _this = this;
        if (!this.webform.iframeElement) {
            return;
        }
        this.webform.off('iframe-elementUpdate');
        this.webform.off('iframe-componentUpdate');
        this.webform.off('iframe-componentClick');
        this.webform.on('iframe-elementUpdate', function (schema) {
            var component = _this.webform.getComponentById(schema.id);
            if (component && component.component) {
                component.component.overlay = {
                    page: schema.page,
                    left: schema.left,
                    top: schema.top,
                    height: schema.height,
                    width: schema.width
                };
                if (!_this.options.noNewEdit) {
                    _this.editComponent(component.component, _this.webform.iframeElement);
                }
                _this.emit('updateComponent', component.component);
            }
            return component;
        });
        this.webform.on('iframe-componentUpdate', function (schema) {
            var component = _this.webform.getComponentById(schema.id);
            if (component && component.component) {
                component.component.overlay = {
                    page: schema.overlay.page,
                    left: schema.overlay.left,
                    top: schema.overlay.top,
                    height: schema.overlay.height,
                    width: schema.overlay.width
                };
                _this.emit('updateComponent', component.component);
                var localComponent = _.find(_this.form.components, { id: schema.id });
                if (localComponent) {
                    localComponent.overlay = _.clone(component.component.overlay);
                }
                _this.emit('change', _this.form);
            }
            return component;
        });
        this.webform.on('iframe-componentClick', function (schema) {
            var component = _this.webform.getComponentById(schema.id);
            if (component) {
                _this.editComponent(component.component, _this.webform.iframeElement);
            }
        }, true);
    };
    // 8888888b.                                                                   888                   d8b
    // 888  "Y88b                                                                  888                   Y8P
    // 888    888                                                                  888
    // 888    888 888d888 .d88b.  88888b. 88888888  .d88b.  88888b.   .d88b.       888  .d88b.   .d88b.  888  .d8888b
    // 888    888 888P"  d88""88b 888 "88b   d88P  d88""88b 888 "88b d8P  Y8b      888 d88""88b d88P"88b 888 d88P"
    // 888    888 888    888  888 888  888  d88P   888  888 888  888 88888888      888 888  888 888  888 888 888
    // 888  .d88P 888    Y88..88P 888 d88P d88P    Y88..88P 888  888 Y8b.          888 Y88..88P Y88b 888 888 Y88b.
    // 8888888P"  888     "Y88P"  88888P" 88888888  "Y88P"  888  888  "Y8888       888  "Y88P"   "Y88888 888  "Y8888P
    //                            888                                                                888
    //                            888                                                           Y8b d88P
    //                            888                                                            "Y88P"
    PDFBuilder.prototype.initDropzoneEvents = function () {
        if (!this.refs.iframeDropzone) {
            return;
        }
        // This is required per HTML spec in order for the drop event to fire
        this.removeEventListener(this.refs.iframeDropzone, 'dragover');
        this.removeEventListener(this.refs.iframeDropzone, 'drop');
        this.addEventListener(this.refs.iframeDropzone, 'dragover', function (e) {
            e.preventDefault();
            return false;
        });
        this.addEventListener(this.refs.iframeDropzone, 'drop', this.onDropzoneDrop.bind(this));
    };
    PDFBuilder.prototype.prepSidebarComponentsForDrag = function () {
        var _this = this;
        if (!this.refs['sidebar-container']) {
            return;
        }
        this.refs['sidebar-container'].forEach(function (container) {
            __spreadArrays(container.children).forEach(function (el) {
                el.draggable = true;
                el.setAttribute('draggable', true);
                _this.removeEventListener(el, 'dragstart');
                _this.removeEventListener(el, 'dragend');
                _this.addEventListener(el, 'dragstart', _this.onDragStart.bind(_this), true);
                _this.addEventListener(el, 'dragend', _this.onDragEnd.bind(_this), true);
            });
        });
    };
    PDFBuilder.prototype.updateDropzoneDimensions = function () {
        if (!this.refs.iframeDropzone) {
            return;
        }
        var iframeRect = getElementRect(this.webform.refs.iframeContainer);
        this.refs.iframeDropzone.style.height = iframeRect && iframeRect.height ? iframeRect.height + "px" : '1000px';
        this.refs.iframeDropzone.style.width = iframeRect && iframeRect.width ? iframeRect.width + "px" : '100%';
    };
    PDFBuilder.prototype.onDragStart = function (e) {
        // Taking the current offset of a dragged item relative to the cursor
        var _a = e.offsetX, offsetX = _a === void 0 ? 0 : _a, _b = e.offsetY, offsetY = _b === void 0 ? 0 : _b;
        this.itemOffsetX = offsetX;
        this.itemOffsetY = offsetY;
        e.dataTransfer.setData('text/html', null);
        this.updateDropzoneDimensions();
        this.addClass(this.refs.iframeDropzone, 'enabled');
    };
    PDFBuilder.prototype.onDropzoneDrop = function (e) {
        this.dropEvent = e;
        e.preventDefault();
        return false;
    };
    PDFBuilder.prototype.onDragEnd = function (e) {
        // IMPORTANT - must retrieve offsets BEFORE disabling the dropzone - offsets will
        // reflect absolute positioning if accessed after the target element is hidden
        var offsetX = this.dropEvent ? this.dropEvent.offsetX : null;
        var offsetY = this.dropEvent ? this.dropEvent.offsetY : null;
        var WIDTH = 100;
        var HEIGHT = 20;
        // Always disable the dropzone on drag end
        this.removeClass(this.refs.iframeDropzone, 'enabled');
        // If there hasn't been a drop event on the dropzone, we're done
        if (!this.dropEvent) {
            return;
        }
        var element = e.target;
        var type = element.getAttribute('data-type');
        var schema = fastCloneDeep(this.schemas[type]);
        schema.key = _.camelCase(schema.label ||
            schema.placeholder ||
            schema.type);
        // Set a unique key for this component.
        BuilderUtils.uniquify([this.webform.component], schema);
        this.webform.component.components.push(schema);
        schema.overlay = {
            top: offsetY - this.itemOffsetY + HEIGHT,
            left: offsetX - this.itemOffsetX,
            width: WIDTH,
            height: HEIGHT
        };
        this.webform.addComponent(schema, {}, null, true);
        this.webform.postMessage({ name: 'addElement', data: schema });
        this.emit('addComponent', schema, this.webform, schema.key, this.webform.component.components.length, !this.options.noNewEdit);
        // Delete the stored drop event now that it's been handled
        this.dropEvent = null;
    };
    PDFBuilder.prototype.highlightInvalidComponents = function () {
        var _this = this;
        var repeatablePaths = this.findRepeatablePaths();
        // update elements which path was duplicated if any pathes have been changed
        if (!_.isEqual(this.repeatablePaths, repeatablePaths)) {
            eachComponent(this.webform.getComponents(), function (comp, path) {
                if (_this.repeatablePaths.includes(path)) {
                    _this.webform.postMessage({ name: 'updateElement', data: comp.component });
                }
            });
            this.repeatablePaths = repeatablePaths;
        }
        if (!repeatablePaths.length) {
            return;
        }
        eachComponent(this.webform.getComponents(), function (comp, path) {
            if (_this.repeatablePaths.includes(path)) {
                _this.webform.postMessage({
                    name: 'showBuilderErrors',
                    data: {
                        compId: comp.component.id,
                        errorMessage: "API Key is not unique: " + comp.key,
                    }
                });
            }
        });
    };
    return PDFBuilder;
}(WebformBuilder));
export default PDFBuilder;
