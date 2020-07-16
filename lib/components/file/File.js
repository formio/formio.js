"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/es.typed-array.uint8-array");

require("core-js/modules/es.typed-array.copy-within");

require("core-js/modules/es.typed-array.every");

require("core-js/modules/es.typed-array.fill");

require("core-js/modules/es.typed-array.filter");

require("core-js/modules/es.typed-array.find");

require("core-js/modules/es.typed-array.find-index");

require("core-js/modules/es.typed-array.for-each");

require("core-js/modules/es.typed-array.includes");

require("core-js/modules/es.typed-array.index-of");

require("core-js/modules/es.typed-array.iterator");

require("core-js/modules/es.typed-array.join");

require("core-js/modules/es.typed-array.last-index-of");

require("core-js/modules/es.typed-array.map");

require("core-js/modules/es.typed-array.reduce");

require("core-js/modules/es.typed-array.reduce-right");

require("core-js/modules/es.typed-array.reverse");

require("core-js/modules/es.typed-array.set");

require("core-js/modules/es.typed-array.slice");

require("core-js/modules/es.typed-array.some");

require("core-js/modules/es.typed-array.sort");

require("core-js/modules/es.typed-array.subarray");

require("core-js/modules/es.typed-array.to-locale-string");

require("core-js/modules/es.typed-array.to-string");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _utils = require("../../utils/utils");

var _downloadjs = _interopRequireDefault(require("downloadjs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Camera;
var webViewCamera = navigator.camera || Camera; // canvas.toBlob polyfill.

if (!HTMLCanvasElement.prototype.toBlob) {
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
      var formDataSupported = Boolean(window.FormData);
      var progressSupported = window.XMLHttpRequest ? 'upload' in new XMLHttpRequest() : false;
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
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(FileComponent.prototype), "render", this).call(this, this.renderTemplate('file', {
        fileSize: this.fileSize,
        files: this.dataValue || [],
        statuses: this.statuses,
        disabled: this.disabled,
        support: this.support
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
    key: "deleteFile",
    value: function deleteFile(fileInfo) {
      if (fileInfo && this.component.storage === 'url') {
        var fileService = this.fileService;

        if (fileService && typeof fileService.deleteFile === 'function') {
          fileService.deleteFile(fileInfo);
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
        fileType: 'multiple'
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

          return false;
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
        _this5.dataValue[index].fileType = _this5.component.fileTypes[0].label;

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
        files = Array.prototype.slice.call(files, 0, 1);
      }

      if (this.component.storage && files && files.length) {
        // files is not really an array and does not have a forEach method, so fake it.
        Array.prototype.forEach.call(files, function (file) {
          var fileName = (0, _utils.uniqueName)(file.name, _this6.component.fileNameTemplate, _this6.evalContext());
          var fileUpload = {
            originalName: file.name,
            name: fileName,
            size: file.size,
            status: 'info',
            message: _this6.t('Starting upload')
          }; // Check file pattern

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


          var dir = _this6.interpolate(_this6.component.dir || '');

          var fileService = _this6.fileService;

          if (!fileService) {
            fileUpload.status = 'error';
            fileUpload.message = _this6.t('File Service not provided.');
          }

          _this6.statuses.push(fileUpload);

          _this6.redraw();

          if (fileUpload.status !== 'error') {
            if (_this6.component.privateDownload) {
              file.private = true;
            }

            var _this6$component = _this6.component,
                storage = _this6$component.storage,
                _this6$component$opti = _this6$component.options,
                options = _this6$component$opti === void 0 ? {} : _this6$component$opti;

            var url = _this6.interpolate(_this6.component.url);

            var fileKey = _this6.component.fileKey || 'file';
            fileService.uploadFile(storage, file, fileName, dir, function (evt) {
              fileUpload.status = 'progress';
              fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
              delete fileUpload.message;

              _this6.redraw();
            }, url, options, fileKey).then(function (fileInfo) {
              var index = _this6.statuses.indexOf(fileUpload);

              if (index !== -1) {
                _this6.statuses.splice(index, 1);
              }

              fileInfo.originalName = file.name;

              if (!_this6.hasValue()) {
                _this6.dataValue = [];
              }

              _this6.dataValue.push(fileInfo);

              _this6.redraw();

              _this6.triggerChange();
            }).catch(function (response) {
              fileUpload.status = 'error';
              fileUpload.message = response;
              delete fileUpload.progress;

              _this6.redraw();
            });
          }
        });
      }
    }
  }, {
    key: "getFile",
    value: function getFile(fileInfo) {
      var _this$component$optio = this.component.options,
          options = _this$component$optio === void 0 ? {} : _this$component$optio;
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
    key: "emptyValue",
    get: function get() {
      return [];
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
    key: "cameraMode",
    set: function set(value) {
      this._cameraMode = value;

      if (value) {
        this.startVideo();
      } else {
        this.stopVideo();
      }
    },
    get: function get() {
      return this._cameraMode;
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
      }

      if (this.imageUpload) {
        options.accept = 'image/*';
      }

      return options;
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
        documentation: 'http://help.form.io/userguide/#file',
        weight: 100,
        schema: FileComponent.schema()
      };
    }
  }]);

  return FileComponent;
}(_Field2.default);

exports.default = FileComponent;