"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.get-prototype-of.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("regenerator-runtime/runtime.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.typed-array.uint8-array.js");

require("core-js/modules/es.typed-array.copy-within.js");

require("core-js/modules/es.typed-array.every.js");

require("core-js/modules/es.typed-array.fill.js");

require("core-js/modules/es.typed-array.filter.js");

require("core-js/modules/es.typed-array.find.js");

require("core-js/modules/es.typed-array.find-index.js");

require("core-js/modules/es.typed-array.for-each.js");

require("core-js/modules/es.typed-array.includes.js");

require("core-js/modules/es.typed-array.index-of.js");

require("core-js/modules/es.typed-array.iterator.js");

require("core-js/modules/es.typed-array.join.js");

require("core-js/modules/es.typed-array.last-index-of.js");

require("core-js/modules/es.typed-array.map.js");

require("core-js/modules/es.typed-array.reduce.js");

require("core-js/modules/es.typed-array.reduce-right.js");

require("core-js/modules/es.typed-array.reverse.js");

require("core-js/modules/es.typed-array.set.js");

require("core-js/modules/es.typed-array.slice.js");

require("core-js/modules/es.typed-array.some.js");

require("core-js/modules/es.typed-array.sort.js");

require("core-js/modules/es.typed-array.subarray.js");

require("core-js/modules/es.typed-array.to-locale-string.js");

require("core-js/modules/es.typed-array.to-string.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.number.to-fixed.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.find-index.js");

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _utils = require("../../utils/utils");

var _downloadjs = _interopRequireDefault(require("downloadjs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _fileProcessor = _interopRequireDefault(require("../../providers/processor/fileProcessor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Camera;
var webViewCamera = navigator.camera || Camera; // canvas.toBlob polyfill.

var htmlCanvasElement;

if (typeof window !== 'undefined') {
  htmlCanvasElement = window.HTMLCanvasElement;
} else if (typeof global !== 'undefined') {
  htmlCanvasElement = global.HTMLCanvasElement;
}

if (htmlCanvasElement && !htmlCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function value(callback, type, quality) {
      var canvas = this;
      setTimeout(function () {
        var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
            len = binStr.length,
            arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], {
          type: type || 'image/png'
        }));
      });
    }
  });
}

var FileComponent = /*#__PURE__*/function (_Field) {
  _inherits(FileComponent, _Field);

  var _super = _createSuper(FileComponent);

  function FileComponent() {
    _classCallCheck(this, FileComponent);

    return _super.apply(this, arguments);
  }

  _createClass(FileComponent, [{
    key: "init",
    value: function init() {
      var _this = this;

      _get(_getPrototypeOf(FileComponent.prototype), "init", this).call(this);

      webViewCamera = navigator.camera || Camera;
      var fileReaderSupported = typeof FileReader !== 'undefined';
      var formDataSupported = typeof window !== 'undefined' ? Boolean(window.FormData) : false;
      var progressSupported = typeof window !== 'undefined' && window.XMLHttpRequest ? 'upload' in new XMLHttpRequest() : false;
      this.support = {
        filereader: fileReaderSupported,
        formdata: formDataSupported,
        hasWarning: !fileReaderSupported || !formDataSupported || !progressSupported,
        progress: progressSupported
      }; // Called when our files are ready.

      this.filesReady = new _nativePromiseOnly.default(function (resolve, reject) {
        _this.filesReadyResolve = resolve;
        _this.filesReadyReject = reject;
      });
      this.cameraMode = false;
      this.statuses = [];
      this.fileDropHidden = false;
    }
  }, {
    key: "dataReady",
    get: function get() {
      return this.filesReady;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return FileComponent.schema();
    }
  }, {
    key: "loadImage",
    value: function loadImage(fileInfo) {
      if (this.component.privateDownload) {
        fileInfo.private = true;
      }

      return this.fileService.downloadFile(fileInfo).then(function (result) {
        return result.url;
      });
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [];
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (_lodash.default.isArray(value)) {
        return _lodash.default.map(value, 'originalName').join(', ');
      }

      return _lodash.default.get(value, 'originalName', '');
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(FileComponent.prototype), "defaultValue", this);

      return Array.isArray(value) ? value : [];
    }
  }, {
    key: "hasTypes",
    get: function get() {
      return this.component.fileTypes && Array.isArray(this.component.fileTypes) && this.component.fileTypes.length !== 0 && (this.component.fileTypes[0].label !== '' || this.component.fileTypes[0].value !== '');
    }
  }, {
    key: "fileDropHidden",
    get: function get() {
      return this._fileBrowseHidden;
    },
    set: function set(value) {
      if (typeof value !== 'boolean' || this.component.multiple) {
        return;
      }

      this._fileBrowseHidden = value;
    }
  }, {
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(FileComponent.prototype), "render", this).call(this, this.renderTemplate('file', {
        fileSize: this.fileSize,
        files: this.dataValue || [],
        statuses: this.statuses,
        disabled: this.disabled,
        support: this.support,
        fileDropHidden: this.fileDropHidden
      }));
    }
  }, {
    key: "getVideoStream",
    value: function getVideoStream(constraints) {
      return navigator.mediaDevices.getUserMedia({
        video: _objectSpread({
          width: {
            min: 640,
            ideal: 1920
          },
          height: {
            min: 360,
            ideal: 1080
          },
          aspectRatio: {
            ideal: 16 / 9
          }
        }, constraints),
        audio: false
      });
    }
  }, {
    key: "stopVideoStream",
    value: function stopVideoStream(videoStream) {
      videoStream.getVideoTracks().forEach(function (track) {
        return track.stop();
      });
    }
  }, {
    key: "getFrame",
    value: function getFrame(videoPlayer) {
      return new _nativePromiseOnly.default(function (resolve) {
        var canvas = document.createElement('canvas');
        canvas.height = videoPlayer.videoHeight;
        canvas.width = videoPlayer.videoWidth;
        var context = canvas.getContext('2d');
        context.drawImage(videoPlayer, 0, 0);
        canvas.toBlob(resolve);
      });
    }
  }, {
    key: "startVideo",
    value: function startVideo() {
      var _this2 = this;

      this.getVideoStream().then(function (stream) {
        _this2.videoStream = stream;
        var videoPlayer = _this2.refs.videoPlayer;

        if (!videoPlayer) {
          console.warn('Video player not found in template.');
          _this2.cameraMode = false;

          _this2.redraw();

          return;
        }

        videoPlayer.srcObject = stream;
        var width = parseInt(_this2.component.webcamSize) || 320;
        videoPlayer.setAttribute('width', width);
        videoPlayer.play();
      }).catch(function (err) {
        console.error(err);
        _this2.cameraMode = false;

        _this2.redraw();
      });
    }
  }, {
    key: "stopVideo",
    value: function stopVideo() {
      if (this.videoStream) {
        this.stopVideoStream(this.videoStream);
        this.videoStream = null;
      }
    }
  }, {
    key: "takePicture",
    value: function takePicture() {
      var _this3 = this;

      var videoPlayer = this.refs.videoPlayer;

      if (!videoPlayer) {
        console.warn('Video player not found in template.');
        this.cameraMode = false;
        this.redraw();
        return;
      }

      this.getFrame(videoPlayer).then(function (frame) {
        frame.name = "photo-".concat(Date.now(), ".png");

        _this3.upload([frame]);

        _this3.cameraMode = false;

        _this3.redraw();
      });
    }
  }, {
    key: "browseFiles",
    value: function browseFiles() {
      var _this4 = this;

      var attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return new _nativePromiseOnly.default(function (resolve) {
        var fileInput = _this4.ce('input', _objectSpread({
          type: 'file',
          style: 'height: 0; width: 0; visibility: hidden;',
          tabindex: '-1'
        }, attrs));

        document.body.appendChild(fileInput);
        fileInput.addEventListener('change', function () {
          resolve(fileInput.files);
          document.body.removeChild(fileInput);
        }, true); // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
        // a click event on it.

        if (typeof fileInput.trigger === 'function') {
          fileInput.trigger('click');
        } else {
          fileInput.click();
        }
      });
    }
  }, {
    key: "cameraMode",
    get: function get() {
      return this._cameraMode;
    },
    set: function set(value) {
      this._cameraMode = value;

      if (value) {
        this.startVideo();
      } else {
        this.stopVideo();
      }
    }
  }, {
    key: "useWebViewCamera",
    get: function get() {
      return this.imageUpload && webViewCamera;
    }
  }, {
    key: "imageUpload",
    get: function get() {
      return Boolean(this.component.image);
    }
  }, {
    key: "browseOptions",
    get: function get() {
      var options = {};

      if (this.component.multiple) {
        options.multiple = true;
      } //use "accept" attribute only for desktop devices because of its limited support by mobile browsers


      if (!this.isMobile.any) {
        var filePattern = this.component.filePattern.trim() || '';
        var imagesPattern = 'image/*';

        if (this.imageUpload && (!filePattern || filePattern === '*')) {
          options.accept = imagesPattern;
        } else if (this.imageUpload && !filePattern.includes(imagesPattern)) {
          options.accept = "".concat(imagesPattern, ",").concat(filePattern);
        } else {
          options.accept = filePattern;
        }
      }

      return options;
    }
  }, {
    key: "deleteFile",
    value: function deleteFile(fileInfo) {
      var _this$component$optio = this.component.options,
          options = _this$component$optio === void 0 ? {} : _this$component$optio;

      if (fileInfo && ['url', 'indexeddb'].includes(this.component.storage)) {
        var fileService = this.fileService;

        if (fileService && typeof fileService.deleteFile === 'function') {
          fileService.deleteFile(fileInfo, options);
        } else {
          var formio = this.options.formio || this.root && this.root.formio;

          if (formio) {
            formio.makeRequest('', fileInfo.url, 'delete');
          }
        }
      }
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this5 = this;

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
        fileProcessingLoader: 'single'
      }); // Ensure we have an empty input refs. We need this for the setValue method to redraw the control when it is set.

      this.refs.input = [];

      var superAttach = _get(_getPrototypeOf(FileComponent.prototype), "attach", this).call(this, element);

      if (this.refs.fileDrop) {
        var _element = this;

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

          _element.upload(event.dataTransfer.files);
        });
      }

      if (this.refs.fileBrowse) {
        this.addEventListener(this.refs.fileBrowse, 'click', function (event) {
          event.preventDefault();

          _this5.browseFiles(_this5.browseOptions).then(function (files) {
            _this5.upload(files);
          });
        });
      }

      this.refs.fileLink.forEach(function (fileLink, index) {
        _this5.addEventListener(fileLink, 'click', function (event) {
          event.preventDefault();

          _this5.getFile(_this5.dataValue[index]);
        });
      });
      this.refs.removeLink.forEach(function (removeLink, index) {
        _this5.addEventListener(removeLink, 'click', function (event) {
          var fileInfo = _this5.dataValue[index];

          _this5.deleteFile(fileInfo);

          event.preventDefault();

          _this5.splice(index);

          _this5.redraw();
        });
      });
      this.refs.fileStatusRemove.forEach(function (fileStatusRemove, index) {
        _this5.addEventListener(fileStatusRemove, 'click', function (event) {
          event.preventDefault();

          if (_this5.abortUpload) {
            _this5.abortUpload();
          }

          _this5.statuses.splice(index, 1);

          _this5.redraw();
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
                  var blob = new Blob([new Uint8Array(evt.target.result)], {
                    type: file.type
                  });
                  blob.name = file.name;

                  _this5.upload([blob]);
                };

                reader.readAsArrayBuffer(file);
              });
            });
          }, function (err) {
            console.error(err);
          }, {
            sourceType: webViewCamera.PictureSourceType.PHOTOLIBRARY
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
                  var blob = new Blob([new Uint8Array(evt.target.result)], {
                    type: file.type
                  });
                  blob.name = file.name;

                  _this5.upload([blob]);
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
            correctOrientation: false
          });
        });
      }

      if (this.refs.takePictureButton) {
        this.addEventListener(this.refs.takePictureButton, 'click', function (event) {
          event.preventDefault();

          _this5.takePicture();
        });
      }

      if (this.refs.toggleCameraMode) {
        this.addEventListener(this.refs.toggleCameraMode, 'click', function (event) {
          event.preventDefault();
          _this5.cameraMode = !_this5.cameraMode;

          _this5.redraw();
        });
      }

      this.refs.fileType.forEach(function (fileType, index) {
        _this5.dataValue[index].fileType = _this5.dataValue[index].fileType || _this5.component.fileTypes[0].label;

        _this5.addEventListener(fileType, 'change', function (event) {
          event.preventDefault();

          var fileType = _this5.component.fileTypes.find(function (typeObj) {
            return typeObj.value === event.target.value;
          });

          _this5.dataValue[index].fileType = fileType.label;
        });
      });
      var fileService = this.fileService;

      if (fileService) {
        var loadingImages = [];
        this.refs.fileImage.forEach(function (image, index) {
          loadingImages.push(_this5.loadImage(_this5.dataValue[index]).then(function (url) {
            return image.src = url;
          }));
        });

        if (loadingImages.length) {
          _nativePromiseOnly.default.all(loadingImages).then(function () {
            _this5.filesReadyResolve();
          }).catch(function () {
            return _this5.filesReadyReject();
          });
        } else {
          this.filesReadyResolve();
        }
      }

      return superAttach;
    }
    /* eslint-disable max-len */

  }, {
    key: "fileSize",
    value: function fileSize(a, b, c, d, e) {
      return "".concat((b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2), " ").concat(e ? "".concat('kMGTPEZY'[--e], "B") : 'Bytes');
    }
    /* eslint-enable max-len */

    /* eslint-disable max-depth */

  }, {
    key: "globStringToRegex",
    value: function globStringToRegex(str) {
      str = str.replace(/\s/g, '');
      var regexp = '',
          excludes = [];

      if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
        regexp = str.substring(1, str.length - 1);
      } else {
        var split = str.split(',');

        if (split.length > 1) {
          for (var i = 0; i < split.length; i++) {
            var r = this.globStringToRegex(split[i]);

            if (r.regexp) {
              regexp += "(".concat(r.regexp, ")");

              if (i < split.length - 1) {
                regexp += '|';
              }
            } else {
              excludes = excludes.concat(r.excludes);
            }
          }
        } else {
          if (str.startsWith('!')) {
            excludes.push("^((?!".concat(this.globStringToRegex(str.substring(1)).regexp, ").)*$"));
          } else {
            if (str.startsWith('.')) {
              str = "*".concat(str);
            }

            regexp = "^".concat(str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&'), "$");
            regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
          }
        }
      }

      return {
        regexp: regexp,
        excludes: excludes
      };
    }
    /* eslint-enable max-depth */

  }, {
    key: "translateScalars",
    value: function translateScalars(str) {
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
    }
  }, {
    key: "validatePattern",
    value: function validatePattern(file, val) {
      if (!val) {
        return true;
      }

      var pattern = this.globStringToRegex(val);
      var valid = true;

      if (pattern.regexp && pattern.regexp.length) {
        var regexp = new RegExp(pattern.regexp, 'i');
        valid = !_lodash.default.isNil(file.type) && regexp.test(file.type) || !_lodash.default.isNil(file.name) && regexp.test(file.name);
      }

      valid = pattern.excludes.reduce(function (result, excludePattern) {
        var exclude = new RegExp(excludePattern, 'i');
        return result && (_lodash.default.isNil(file.type) || !exclude.test(file.type)) && (_lodash.default.isNil(file.name) || !exclude.test(file.name));
      }, valid);
      return valid;
    }
  }, {
    key: "validateMinSize",
    value: function validateMinSize(file, val) {
      return file.size + 0.1 >= this.translateScalars(val);
    }
  }, {
    key: "validateMaxSize",
    value: function validateMaxSize(file, val) {
      return file.size - 0.1 <= this.translateScalars(val);
    }
  }, {
    key: "upload",
    value: function upload(files) {
      var _this6 = this;

      // Only allow one upload if not multiple.
      if (!this.component.multiple) {
        if (this.statuses.length) {
          this.statuses = [];
        }

        files = Array.prototype.slice.call(files, 0, 1);
      }

      if (this.component.storage && files && files.length) {
        this.fileDropHidden = true; // files is not really an array and does not have a forEach method, so fake it.

        /* eslint-disable max-statements */

        Array.prototype.forEach.call(files, /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(file) {
            var fileName, fileUpload, fileWithSameNameUploaded, fileWithSameNameUploadedWithError, dir, fileService, _this6$component, storage, _this6$component$opti, options, url, groupKey, groupPermissions, fileKey, groupResourceId, processedFile, fileProcessorHandler, filePromise;

            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    fileName = (0, _utils.uniqueName)(file.name, _this6.component.fileNameTemplate, _this6.evalContext());
                    fileUpload = {
                      originalName: file.name,
                      name: fileName,
                      size: file.size,
                      status: 'info',
                      message: _this6.t('Processing file. Please wait...')
                    }; // Check if file with the same name is being uploaded

                    fileWithSameNameUploaded = _this6.dataValue.some(function (fileStatus) {
                      return fileStatus.originalName === file.name;
                    });
                    fileWithSameNameUploadedWithError = _this6.statuses.findIndex(function (fileStatus) {
                      return fileStatus.originalName === file.name && fileStatus.status === 'error';
                    });

                    if (fileWithSameNameUploaded) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File with the same name is already uploaded');
                    }

                    if (fileWithSameNameUploadedWithError !== -1) {
                      _this6.statuses.splice(fileWithSameNameUploadedWithError, 1);

                      _this6.redraw();
                    } // Check file pattern


                    if (_this6.component.filePattern && !_this6.validatePattern(file, _this6.component.filePattern)) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File is the wrong type; it must be {{ pattern }}', {
                        pattern: _this6.component.filePattern
                      });
                    } // Check file minimum size


                    if (_this6.component.fileMinSize && !_this6.validateMinSize(file, _this6.component.fileMinSize)) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File is too small; it must be at least {{ size }}', {
                        size: _this6.component.fileMinSize
                      });
                    } // Check file maximum size


                    if (_this6.component.fileMaxSize && !_this6.validateMaxSize(file, _this6.component.fileMaxSize)) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File is too big; it must be at most {{ size }}', {
                        size: _this6.component.fileMaxSize
                      });
                    } // Get a unique name for this file to keep file collisions from occurring.


                    dir = _this6.interpolate(_this6.component.dir || '');
                    fileService = _this6.fileService;

                    if (!fileService) {
                      fileUpload.status = 'error';
                      fileUpload.message = _this6.t('File Service not provided.');
                    }

                    _this6.statuses.push(fileUpload);

                    _this6.redraw();

                    if (!(fileUpload.status !== 'error')) {
                      _context.next = 46;
                      break;
                    }

                    if (_this6.component.privateDownload) {
                      file.private = true;
                    }

                    _this6$component = _this6.component, storage = _this6$component.storage, _this6$component$opti = _this6$component.options, options = _this6$component$opti === void 0 ? {} : _this6$component$opti;
                    url = _this6.interpolate(_this6.component.url, {
                      file: fileUpload
                    });
                    groupKey = null;
                    groupPermissions = null; //Iterate through form components to find group resource if one exists

                    _this6.root.everyComponent(function (element) {
                      var _element$component, _element$component2;

                      if ((_element$component = element.component) !== null && _element$component !== void 0 && _element$component.submissionAccess || (_element$component2 = element.component) !== null && _element$component2 !== void 0 && _element$component2.defaultPermission) {
                        groupPermissions = !element.component.submissionAccess ? [{
                          type: element.component.defaultPermission,
                          roles: []
                        }] : element.component.submissionAccess;
                        groupPermissions.forEach(function (permission) {
                          groupKey = ['admin', 'write', 'create'].includes(permission.type) ? element.component.key : null;
                        });
                      }
                    });

                    fileKey = _this6.component.fileKey || 'file';
                    groupResourceId = groupKey ? _this6.currentForm.submission.data[groupKey]._id : null;
                    processedFile = null;

                    if (!_this6.root.options.fileProcessor) {
                      _context.next = 43;
                      break;
                    }

                    _context.prev = 25;

                    if (_this6.refs.fileProcessingLoader) {
                      _this6.refs.fileProcessingLoader.style.display = 'block';
                    }

                    fileProcessorHandler = (0, _fileProcessor.default)(_this6.fileService, _this6.root.options.fileProcessor);
                    _context.next = 30;
                    return fileProcessorHandler(file, _this6.component.properties);

                  case 30:
                    processedFile = _context.sent;
                    _context.next = 40;
                    break;

                  case 33:
                    _context.prev = 33;
                    _context.t0 = _context["catch"](25);
                    fileUpload.status = 'error';
                    fileUpload.message = _this6.t('File processing has been failed.');
                    _this6.fileDropHidden = false;

                    _this6.redraw();

                    return _context.abrupt("return");

                  case 40:
                    _context.prev = 40;

                    if (_this6.refs.fileProcessingLoader) {
                      _this6.refs.fileProcessingLoader.style.display = 'none';
                    }

                    return _context.finish(40);

                  case 43:
                    fileUpload.message = _this6.t('Starting upload.');

                    _this6.redraw();

                    filePromise = fileService.uploadFile(storage, processedFile || file, fileName, dir, // Progress callback
                    function (evt) {
                      fileUpload.status = 'progress';
                      fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
                      delete fileUpload.message;

                      _this6.redraw();
                    }, url, options, fileKey, groupPermissions, groupResourceId, // Upload start callback
                    function () {
                      _this6.emit('fileUploadingStart', filePromise);
                    }, // Abort upload callback
                    function (abort) {
                      return _this6.abortUpload = abort;
                    }).then(function (fileInfo) {
                      var index = _this6.statuses.indexOf(fileUpload);

                      if (index !== -1) {
                        _this6.statuses.splice(index, 1);
                      }

                      fileInfo.originalName = file.name;

                      if (!_this6.hasValue()) {
                        _this6.dataValue = [];
                      }

                      _this6.dataValue.push(fileInfo);

                      _this6.fileDropHidden = false;

                      _this6.redraw();

                      _this6.triggerChange();

                      _this6.emit('fileUploadingEnd', filePromise);
                    }).catch(function (response) {
                      fileUpload.status = 'error';
                      fileUpload.message = typeof response === 'string' ? response : response.toString();
                      delete fileUpload.progress;
                      _this6.fileDropHidden = false;

                      _this6.redraw();

                      _this6.emit('fileUploadingEnd', filePromise);
                    });

                  case 46:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, null, [[25, 33, 40, 43]]);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      }
    }
  }, {
    key: "getFile",
    value: function getFile(fileInfo) {
      var _this$component$optio2 = this.component.options,
          options = _this$component$optio2 === void 0 ? {} : _this$component$optio2;
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
            (0, _downloadjs.default)(file.url, file.originalName || file.name, file.type);
          } else {
            window.open(file.url, '_blank');
          }
        }
      }).catch(function (response) {
        // Is alert the best way to do this?
        // User is expecting an immediate notification due to attempting to download a file.
        alert(response);
      });
    }
  }, {
    key: "focus",
    value: function focus() {
      if ('beforeFocus' in this.parent) {
        this.parent.beforeFocus(this);
      }

      if (this.refs.fileBrowse) {
        this.refs.fileBrowse.focus();
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stopVideo();

      _get(_getPrototypeOf(FileComponent.prototype), "destroy", this).call(this);
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2.default.schema.apply(_Field2.default, [{
        type: 'file',
        label: 'Upload',
        key: 'file',
        image: false,
        privateDownload: false,
        imageSize: '200',
        filePattern: '*',
        fileMinSize: '0KB',
        fileMaxSize: '1GB',
        uploadOnly: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'File',
        group: 'premium',
        icon: 'file',
        documentation: '/userguide/#file',
        weight: 100,
        schema: FileComponent.schema()
      };
    }
  }]);

  return FileComponent;
}(_Field2.default);

exports.default = FileComponent;