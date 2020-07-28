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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import download from 'downloadjs';
import _ from 'lodash';
import NativePromise from 'native-promise-only';
import { superGet, uniqueName } from '../../utils/utils';
import Field from '../_classes/field/Field';
var Camera;
var webViewCamera = navigator.camera || Camera;
// canvas.toBlob polyfill.
if (!HTMLCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            var canvas = this;
            setTimeout(function () {
                var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]), len = binStr.length, arr = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }
                callback(new Blob([arr], { type: type || 'image/png' }));
            });
        }
    });
}
var FileComponent = /** @class */ (function (_super) {
    __extends(FileComponent, _super);
    function FileComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field.schema.apply(Field, __spreadArrays([{
                type: 'file',
                label: 'Upload',
                key: 'file',
                image: false,
                privateDownload: false,
                imageSize: '200',
                filePattern: '*',
                fileMinSize: '0KB',
                fileMaxSize: '1GB',
                uploadOnly: false,
            }], extend));
    };
    Object.defineProperty(FileComponent, "builderInfo", {
        get: function () {
            return {
                title: 'File',
                group: 'premium',
                icon: 'file',
                documentation: 'http://help.form.io/userguide/#file',
                weight: 100,
                schema: FileComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        webViewCamera = navigator.camera || Camera;
        var fileReaderSupported = (typeof FileReader !== 'undefined');
        var formDataSupported = Boolean(window.FormData);
        var progressSupported = window.XMLHttpRequest ? ('upload' in new XMLHttpRequest) : false;
        this.support = {
            filereader: fileReaderSupported,
            formdata: formDataSupported,
            hasWarning: !fileReaderSupported || !formDataSupported || !progressSupported,
            progress: progressSupported,
        };
        // Called when our files are ready.
        this.filesReady = new NativePromise(function (resolve, reject) {
            _this.filesReadyResolve = resolve;
            _this.filesReadyReject = reject;
        });
        this.cameraMode = false;
        this.statuses = [];
    };
    Object.defineProperty(FileComponent.prototype, "dataReady", {
        get: function () {
            return this.filesReady;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "defaultSchema", {
        get: function () {
            return FileComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.prototype.loadImage = function (fileInfo) {
        if (this.component.privateDownload) {
            fileInfo.private = true;
        }
        return this.fileService.downloadFile(fileInfo).then(function (result) { return result.url; });
    };
    Object.defineProperty(FileComponent.prototype, "emptyValue", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.prototype.getValueAsString = function (value) {
        if (_.isArray(value)) {
            return _.map(value, 'originalName').join(', ');
        }
        return _.get(value, 'originalName', '');
    };
    FileComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    Object.defineProperty(FileComponent.prototype, "defaultValue", {
        get: function () {
            var value = superGet(Field, 'defaultValue', this);
            return Array.isArray(value) ? value : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "hasTypes", {
        get: function () {
            return this.component.fileTypes &&
                Array.isArray(this.component.fileTypes) &&
                this.component.fileTypes.length !== 0 &&
                (this.component.fileTypes[0].label !== '' || this.component.fileTypes[0].value !== '');
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('file', {
            fileSize: this.fileSize,
            files: this.dataValue || [],
            statuses: this.statuses,
            disabled: this.disabled,
            support: this.support,
        }));
    };
    FileComponent.prototype.getVideoStream = function (constraints) {
        return navigator.mediaDevices.getUserMedia({
            video: __assign({ width: { min: 640, ideal: 1920 }, height: { min: 360, ideal: 1080 }, aspectRatio: { ideal: 16 / 9 } }, constraints),
            audio: false,
        });
    };
    FileComponent.prototype.stopVideoStream = function (videoStream) {
        videoStream.getVideoTracks().forEach(function (track) { return track.stop(); });
    };
    FileComponent.prototype.getFrame = function (videoPlayer) {
        return new NativePromise(function (resolve) {
            var canvas = document.createElement('canvas');
            canvas.height = videoPlayer.videoHeight;
            canvas.width = videoPlayer.videoWidth;
            var context = canvas.getContext('2d');
            context.drawImage(videoPlayer, 0, 0);
            canvas.toBlob(resolve);
        });
    };
    FileComponent.prototype.startVideo = function () {
        var _this = this;
        this.getVideoStream()
            .then(function (stream) {
            _this.videoStream = stream;
            var videoPlayer = _this.refs.videoPlayer;
            if (!videoPlayer) {
                console.warn('Video player not found in template.');
                _this.cameraMode = false;
                _this.redraw();
                return;
            }
            videoPlayer.srcObject = stream;
            var width = parseInt(_this.component.webcamSize) || 320;
            videoPlayer.setAttribute('width', width);
            videoPlayer.play();
        })
            .catch(function (err) {
            console.error(err);
            _this.cameraMode = false;
            _this.redraw();
        });
    };
    FileComponent.prototype.stopVideo = function () {
        if (this.videoStream) {
            this.stopVideoStream(this.videoStream);
            this.videoStream = null;
        }
    };
    FileComponent.prototype.takePicture = function () {
        var _this = this;
        var videoPlayer = this.refs.videoPlayer;
        if (!videoPlayer) {
            console.warn('Video player not found in template.');
            this.cameraMode = false;
            this.redraw();
            return;
        }
        this.getFrame(videoPlayer)
            .then(function (frame) {
            frame.name = "photo-" + Date.now() + ".png";
            _this.upload([frame]);
            _this.cameraMode = false;
            _this.redraw();
        });
    };
    FileComponent.prototype.browseFiles = function (attrs) {
        var _this = this;
        if (attrs === void 0) { attrs = {}; }
        return new NativePromise(function (resolve) {
            var fileInput = _this.ce('input', __assign({ type: 'file', style: 'height: 0; width: 0; visibility: hidden;', tabindex: '-1' }, attrs));
            document.body.appendChild(fileInput);
            fileInput.addEventListener('change', function () {
                resolve(fileInput.files);
                document.body.removeChild(fileInput);
            }, true);
            // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
            // a click event on it.
            if (typeof fileInput.trigger === 'function') {
                fileInput.trigger('click');
            }
            else {
                fileInput.click();
            }
        });
    };
    Object.defineProperty(FileComponent.prototype, "cameraMode", {
        get: function () {
            return this._cameraMode;
        },
        set: function (value) {
            this._cameraMode = value;
            if (value) {
                this.startVideo();
            }
            else {
                this.stopVideo();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "useWebViewCamera", {
        get: function () {
            return this.imageUpload && webViewCamera;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "imageUpload", {
        get: function () {
            return Boolean(this.component.image);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "browseOptions", {
        get: function () {
            var options = {};
            if (this.component.multiple) {
                options.multiple = true;
            }
            if (this.imageUpload) {
                options.accept = 'image/*';
            }
            return options;
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.prototype.deleteFile = function (fileInfo) {
        if (fileInfo && (this.component.storage === 'url')) {
            var fileService = this.fileService;
            if (fileService && typeof fileService.deleteFile === 'function') {
                fileService.deleteFile(fileInfo);
            }
            else {
                var formio = this.options.formio || (this.root && this.root.formio);
                if (formio) {
                    formio.makeRequest('', fileInfo.url, 'delete');
                }
            }
        }
    };
    FileComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, {
            fileDrop: 'single',
            fileBrowse: 'single',
            galleryButton: 'single',
            cameraButton: 'single',
            takePictureButton: 'single',
            toggleCameraMode: 'single',
            videoPlayer: 'single',
            fileLink: 'multiple',
            removeLink: 'multiple',
            fileStatusRemove: 'multiple',
            fileImage: 'multiple',
            fileType: 'multiple',
        });
        // Ensure we have an empty input refs. We need this for the setValue method to redraw the control when it is set.
        this.refs.input = [];
        var superAttach = _super.prototype.attach.call(this, element);
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
                element_1.upload(event.dataTransfer.files);
                return false;
            });
        }
        if (this.refs.fileBrowse) {
            this.addEventListener(this.refs.fileBrowse, 'click', function (event) {
                event.preventDefault();
                _this.browseFiles(_this.browseOptions)
                    .then(function (files) {
                    _this.upload(files);
                });
            });
        }
        this.refs.fileLink.forEach(function (fileLink, index) {
            _this.addEventListener(fileLink, 'click', function (event) {
                event.preventDefault();
                _this.getFile(_this.dataValue[index]);
            });
        });
        this.refs.removeLink.forEach(function (removeLink, index) {
            _this.addEventListener(removeLink, 'click', function (event) {
                var fileInfo = _this.dataValue[index];
                _this.deleteFile(fileInfo);
                event.preventDefault();
                _this.splice(index);
                _this.redraw();
            });
        });
        this.refs.fileStatusRemove.forEach(function (fileStatusRemove, index) {
            _this.addEventListener(fileStatusRemove, 'click', function (event) {
                event.preventDefault();
                _this.statuses.splice(index, 1);
                _this.redraw();
            });
        });
        if (this.refs.galleryButton && webViewCamera) {
            this.addEventListener(this.refs.galleryButton, 'click', function (event) {
                event.preventDefault();
                webViewCamera.getPicture(function (success) {
                    window.resolveLocalFileSystemURL(success, function (fileEntry) {
                        fileEntry.file(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (evt) {
                                var blob = new Blob([new Uint8Array(evt.target.result)], { type: file.type });
                                blob.name = file.name;
                                _this.upload([blob]);
                            };
                            reader.readAsArrayBuffer(file);
                        });
                    });
                }, function (err) {
                    console.error(err);
                }, {
                    sourceType: webViewCamera.PictureSourceType.PHOTOLIBRARY,
                });
            });
        }
        if (this.refs.cameraButton && webViewCamera) {
            this.addEventListener(this.refs.cameraButton, 'click', function (event) {
                event.preventDefault();
                webViewCamera.getPicture(function (success) {
                    window.resolveLocalFileSystemURL(success, function (fileEntry) {
                        fileEntry.file(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (evt) {
                                var blob = new Blob([new Uint8Array(evt.target.result)], { type: file.type });
                                blob.name = file.name;
                                _this.upload([blob]);
                            };
                            reader.readAsArrayBuffer(file);
                        });
                    });
                }, function (err) {
                    console.error(err);
                }, {
                    sourceType: webViewCamera.PictureSourceType.CAMERA,
                    encodingType: webViewCamera.EncodingType.PNG,
                    mediaType: webViewCamera.MediaType.PICTURE,
                    saveToPhotoAlbum: true,
                    correctOrientation: false,
                });
            });
        }
        if (this.refs.takePictureButton) {
            this.addEventListener(this.refs.takePictureButton, 'click', function (event) {
                event.preventDefault();
                _this.takePicture();
            });
        }
        if (this.refs.toggleCameraMode) {
            this.addEventListener(this.refs.toggleCameraMode, 'click', function (event) {
                event.preventDefault();
                _this.cameraMode = !_this.cameraMode;
                _this.redraw();
            });
        }
        this.refs.fileType.forEach(function (fileType, index) {
            _this.dataValue[index].fileType = _this.component.fileTypes[0].label;
            _this.addEventListener(fileType, 'change', function (event) {
                event.preventDefault();
                var fileType = _this.component.fileTypes.find(function (typeObj) { return typeObj.value === event.target.value; });
                _this.dataValue[index].fileType = fileType.label;
            });
        });
        var fileService = this.fileService;
        if (fileService) {
            var loadingImages_1 = [];
            this.refs.fileImage.forEach(function (image, index) {
                loadingImages_1.push(_this.loadImage(_this.dataValue[index]).then(function (url) { return (image.src = url); }));
            });
            if (loadingImages_1.length) {
                NativePromise.all(loadingImages_1).then(function () {
                    _this.filesReadyResolve();
                }).catch(function () { return _this.filesReadyReject(); });
            }
        }
        return superAttach;
    };
    /* eslint-disable max-len */
    FileComponent.prototype.fileSize = function (a, b, c, d, e) {
        return (b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2) + " " + (e ? 'kMGTPEZY'[--e] + "B" : 'Bytes');
    };
    /* eslint-enable max-len */
    /* eslint-disable max-depth */
    FileComponent.prototype.globStringToRegex = function (str) {
        var regexp = '', excludes = [];
        if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
            regexp = str.substring(1, str.length - 1);
        }
        else {
            var split = str.split(',');
            if (split.length > 1) {
                for (var i = 0; i < split.length; i++) {
                    var r = this.globStringToRegex(split[i]);
                    if (r.regexp) {
                        regexp += "(" + r.regexp + ")";
                        if (i < split.length - 1) {
                            regexp += '|';
                        }
                    }
                    else {
                        excludes = excludes.concat(r.excludes);
                    }
                }
            }
            else {
                if (str.startsWith('!')) {
                    excludes.push("^((?!" + this.globStringToRegex(str.substring(1)).regexp + ").)*$");
                }
                else {
                    if (str.startsWith('.')) {
                        str = "*" + str;
                    }
                    regexp = "^" + str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&') + "$";
                    regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
                }
            }
        }
        return { regexp: regexp, excludes: excludes };
    };
    /* eslint-enable max-depth */
    FileComponent.prototype.translateScalars = function (str) {
        if (typeof str === 'string') {
            if (str.search(/kb/i) === str.length - 2) {
                return parseFloat(str.substring(0, str.length - 2) * 1024);
            }
            if (str.search(/mb/i) === str.length - 2) {
                return parseFloat(str.substring(0, str.length - 2) * 1024 * 1024);
            }
            if (str.search(/gb/i) === str.length - 2) {
                return parseFloat(str.substring(0, str.length - 2) * 1024 * 1024 * 1024);
            }
            if (str.search(/b/i) === str.length - 1) {
                return parseFloat(str.substring(0, str.length - 1));
            }
            if (str.search(/s/i) === str.length - 1) {
                return parseFloat(str.substring(0, str.length - 1));
            }
            if (str.search(/m/i) === str.length - 1) {
                return parseFloat(str.substring(0, str.length - 1) * 60);
            }
            if (str.search(/h/i) === str.length - 1) {
                return parseFloat(str.substring(0, str.length - 1) * 3600);
            }
        }
        return str;
    };
    FileComponent.prototype.validatePattern = function (file, val) {
        if (!val) {
            return true;
        }
        var pattern = this.globStringToRegex(val);
        var valid = true;
        if (pattern.regexp && pattern.regexp.length) {
            var regexp = new RegExp(pattern.regexp, 'i');
            valid = (!_.isNil(file.type) && regexp.test(file.type)) ||
                (!_.isNil(file.name) && regexp.test(file.name));
        }
        valid = pattern.excludes.reduce(function (result, excludePattern) {
            var exclude = new RegExp(excludePattern, 'i');
            return result && (_.isNil(file.type) || !exclude.test(file.type)) &&
                (_.isNil(file.name) || !exclude.test(file.name));
        }, valid);
        return valid;
    };
    FileComponent.prototype.validateMinSize = function (file, val) {
        return file.size + 0.1 >= this.translateScalars(val);
    };
    FileComponent.prototype.validateMaxSize = function (file, val) {
        return file.size - 0.1 <= this.translateScalars(val);
    };
    FileComponent.prototype.upload = function (files) {
        var _this = this;
        // Only allow one upload if not multiple.
        if (!this.component.multiple) {
            files = Array.prototype.slice.call(files, 0, 1);
        }
        if (this.component.storage && files && files.length) {
            // files is not really an array and does not have a forEach method, so fake it.
            Array.prototype.forEach.call(files, function (file) {
                var fileName = uniqueName(file.name, _this.component.fileNameTemplate, _this.evalContext());
                var fileUpload = {
                    originalName: file.name,
                    name: fileName,
                    size: file.size,
                    status: 'info',
                    message: _this.t('Starting upload'),
                };
                // Check file pattern
                if (_this.component.filePattern && !_this.validatePattern(file, _this.component.filePattern)) {
                    fileUpload.status = 'error';
                    fileUpload.message = _this.t('File is the wrong type; it must be {{ pattern }}', {
                        pattern: _this.component.filePattern,
                    });
                }
                // Check file minimum size
                if (_this.component.fileMinSize && !_this.validateMinSize(file, _this.component.fileMinSize)) {
                    fileUpload.status = 'error';
                    fileUpload.message = _this.t('File is too small; it must be at least {{ size }}', {
                        size: _this.component.fileMinSize,
                    });
                }
                // Check file maximum size
                if (_this.component.fileMaxSize && !_this.validateMaxSize(file, _this.component.fileMaxSize)) {
                    fileUpload.status = 'error';
                    fileUpload.message = _this.t('File is too big; it must be at most {{ size }}', {
                        size: _this.component.fileMaxSize,
                    });
                }
                // Get a unique name for this file to keep file collisions from occurring.
                var dir = _this.interpolate(_this.component.dir || '');
                var fileService = _this.fileService;
                if (!fileService) {
                    fileUpload.status = 'error';
                    fileUpload.message = _this.t('File Service not provided.');
                }
                _this.statuses.push(fileUpload);
                _this.redraw();
                if (fileUpload.status !== 'error') {
                    if (_this.component.privateDownload) {
                        file.private = true;
                    }
                    var _a = _this.component, storage = _a.storage, _b = _a.options, options = _b === void 0 ? {} : _b;
                    var url = _this.interpolate(_this.component.url);
                    var fileKey = _this.component.fileKey || 'file';
                    fileService.uploadFile(storage, file, fileName, dir, function (evt) {
                        fileUpload.status = 'progress';
                        fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
                        delete fileUpload.message;
                        _this.redraw();
                    }, url, options, fileKey)
                        .then(function (fileInfo) {
                        var index = _this.statuses.indexOf(fileUpload);
                        if (index !== -1) {
                            _this.statuses.splice(index, 1);
                        }
                        fileInfo.originalName = file.name;
                        if (!_this.hasValue()) {
                            _this.dataValue = [];
                        }
                        _this.dataValue.push(fileInfo);
                        _this.redraw();
                        _this.triggerChange();
                    })
                        .catch(function (response) {
                        fileUpload.status = 'error';
                        fileUpload.message = response;
                        delete fileUpload.progress;
                        _this.redraw();
                    });
                }
            });
        }
    };
    FileComponent.prototype.getFile = function (fileInfo) {
        var _a = this.component.options, options = _a === void 0 ? {} : _a;
        var fileService = this.fileService;
        if (!fileService) {
            return alert('File Service not provided');
        }
        if (this.component.privateDownload) {
            fileInfo.private = true;
        }
        fileService.downloadFile(fileInfo, options).then(function (file) {
            if (file) {
                if (['base64', 'indexeddb'].includes(file.storage)) {
                    download(file.url, file.originalName || file.name, file.type);
                }
                else {
                    window.open(file.url, '_blank');
                }
            }
        })
            .catch(function (response) {
            // Is alert the best way to do this?
            // User is expecting an immediate notification due to attempting to download a file.
            alert(response);
        });
    };
    FileComponent.prototype.focus = function () {
        if (this.refs.fileBrowse) {
            this.refs.fileBrowse.focus();
        }
    };
    FileComponent.prototype.destroy = function () {
        this.stopVideo();
        _super.prototype.destroy.call(this);
    };
    return FileComponent;
}(Field));
export default FileComponent;
