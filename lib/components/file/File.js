"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.number.to-fixed");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.search");

require("core-js/modules/es.string.split");

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

var _Formio = _interopRequireDefault(require("../../Formio"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Camera;
var webViewCamera = navigator.camera || Camera;

// canvas.toBlob polyfill.
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

var FileComponent =
/*#__PURE__*/
function (_Field) {
  _inherits(FileComponent, _Field);

  function FileComponent() {
    _classCallCheck(this, FileComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(FileComponent).apply(this, arguments));
  }

  _createClass(FileComponent, [{
    key: "init",
    value: function init() {
      var _this = this;

      _get(_getPrototypeOf(FileComponent.prototype), "init", this).call(this);

      this.support = {
        filereader: typeof FileReader != 'undefined',
        formdata: !!window.FormData,
        progress: 'upload' in new XMLHttpRequest()
      }; // Called when our files are ready.

      this.filesReady = new _nativePromiseOnly.default(function (resolve, reject) {
        _this.filesReadyResolve = resolve;
        _this.filesReadyReject = reject;
      });
      this.support.hasWarning = !this.support.filereader || !this.support.formdata || !this.support.progress;
      this.cameraMode = false;
      this.statuses = [];
    }
  }, {
    key: "loadImage",
    value: function loadImage(fileInfo) {
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
    key: "startVideo",
    value: function startVideo() {
      var _this2 = this;

      if (!this.refs.videoPlayer || !this.refs.videoCanvas) {
        console.warn('Video player not found in template.');
        this.cameraMode = false;
        this.redraw();
        return;
      }

      navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
      navigator.getMedia({
        video: {
          width: {
            min: 640,
            ideal: 1920
          },
          height: {
            min: 400,
            ideal: 1080
          },
          aspectRatio: {
            ideal: 1.7777777778
          }
        },
        audio: false
      }, function (stream) {
        if (navigator.mozGetUserMedia) {
          _this2.refs.videoPlayer.mozSrcObject = stream;
        } else {
          _this2.refs.videoPlayer.srcObject = stream;
        }

        var width = parseInt(_this2.component.webcamSize) || 320;

        _this2.refs.videoPlayer.setAttribute('width', width);

        _this2.refs.videoPlayer.play();
      }, function (err) {
        console.error(err);
      });
    }
  }, {
    key: "takePicture",
    value: function takePicture() {
      var _this3 = this;

      if (!this.refs.videoPlayer || !this.refs.videoCanvas) {
        console.warn('Video player not found in template.');
        this.cameraMode = false;
        this.redraw();
        return;
      }

      this.refs.videoCanvas.setAttribute('width', this.refs.videoPlayer.videoWidth);
      this.refs.videoCanvas.setAttribute('height', this.refs.videoPlayer.videoHeight);
      this.refs.videoCanvas.getContext('2d').drawImage(this.refs.videoPlayer, 0, 0);
      this.refs.videoCanvas.toBlob(function (blob) {
        blob.name = "photo-".concat(Date.now(), ".png");

        _this3.upload([blob]);
      });
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this4 = this;

      this.loadRefs(element, {
        fileDrop: 'single',
        fileBrowse: 'single',
        galleryButton: 'single',
        cameraButton: 'single',
        takePictureButton: 'single',
        toggleCameraMode: 'single',
        videoPlayer: 'single',
        videoCanvas: 'single',
        hiddenFileInputElement: 'single',
        fileLink: 'multiple',
        removeLink: 'multiple',
        fileStatusRemove: 'multiple',
        fileImage: 'multiple'
      });

      var superAttach = _get(_getPrototypeOf(FileComponent.prototype), "attach", this).call(this, element);

      if (this.refs.fileDrop) {
        var _element = this;

        this.addEventListener(this.refs.fileDrop, 'dragOver', function (event) {
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

      if (this.refs.fileBrowse && this.refs.hiddenFileInputElement) {
        this.addEventListener(this.refs.fileBrowse, 'click', function (event) {
          event.preventDefault(); // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
          // a click event on it.

          if (typeof _this4.refs.hiddenFileInputElement.trigger === 'function') {
            _this4.refs.hiddenFileInputElement.trigger('click');
          } else {
            _this4.refs.hiddenFileInputElement.click();
          }
        });
        this.addEventListener(this.refs.hiddenFileInputElement, 'change', function () {
          _this4.upload(_this4.refs.hiddenFileInputElement.files);

          _this4.refs.hiddenFileInputElement.value = '';
        });
      }

      this.refs.fileLink.forEach(function (fileLink, index) {
        _this4.addEventListener(fileLink, 'click', function (event) {
          event.preventDefault();

          _this4.getFile(_this4.dataValue[index]);
        });
      });
      this.refs.removeLink.forEach(function (removeLink, index) {
        _this4.addEventListener(removeLink, 'click', function (event) {
          var fileInfo = _this4.dataValue[index];

          if (fileInfo && _this4.component.storage === 'url') {
            _this4.options.formio.makeRequest('', fileInfo.url, 'delete');
          }

          event.preventDefault();

          _this4.splice(index);

          _this4.redraw();
        });
      });
      this.refs.fileStatusRemove.forEach(function (fileStatusRemove, index) {
        _this4.addEventListener(fileStatusRemove, 'click', function (event) {
          event.preventDefault();

          _this4.statuses.splice(index, 1);

          _this4.redraw();
        });
      });

      if (this.refs.galleryButton && webViewCamera) {
        this.addEventListener(this.refs.galleryButton, 'click', function (event) {
          event.preventDefault();
          webViewCamera.getPicture(function (success) {
            window.resolveLocalFileSystemURL(success, function (fileEntry) {
              fileEntry.file(function (file) {
                _this4.upload([file]);
              });
            });
          }, null, {
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
                _this4.upload([file]);
              });
            });
          }, null, {
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

          _this4.takePicture();
        });
      }

      if (this.refs.toggleCameraMode) {
        this.addEventListener(this.refs.toggleCameraMode, 'click', function (event) {
          event.preventDefault();
          _this4.cameraMode = !_this4.cameraMode;

          if (_this4.cameraMode) {
            _this4.startVideo();
          }

          _this4.redraw();
        });
      }

      var fileService = this.fileService;

      if (fileService) {
        var loadingImages = [];
        this.refs.fileImage.forEach(function (image, index) {
          loadingImages.push(_this4.loadImage(_this4.dataValue[index]).then(function (url) {
            return image.src = url;
          }));
        });

        if (loadingImages.length) {
          _nativePromiseOnly.default.all(loadingImages).then(function () {
            _this4.filesReadyResolve();
          }).catch(function () {
            return _this4.filesReadyReject();
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
          if (str.indexOf('!') === 0) {
            excludes.push("^((?!".concat(this.globStringToRegex(str.substring(1)).regexp, ").)*$"));
          } else {
            if (str.indexOf('.') === 0) {
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
        } else if (str.search(/mb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1048576);
        } else if (str.search(/gb/i) === str.length - 2) {
          return parseFloat(str.substring(0, str.length - 2) * 1073741824);
        } else if (str.search(/b/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1));
        } else if (str.search(/s/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1));
        } else if (str.search(/m/i) === str.length - 1) {
          return parseFloat(str.substring(0, str.length - 1) * 60);
        } else if (str.search(/h/i) === str.length - 1) {
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
        valid = file.type != null && regexp.test(file.type) || file.name != null && regexp.test(file.name);
      }

      var len = pattern.excludes.length;

      while (len--) {
        var exclude = new RegExp(pattern.excludes[len], 'i');
        valid = valid && (file.type == null || exclude.test(file.type)) && (file.name == null || exclude.test(file.name));
      }

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
      var _this5 = this;

      // Only allow one upload if not multiple.
      if (!this.component.multiple) {
        files = Array.prototype.slice.call(files, 0, 1);
      }

      if (this.component.storage && files && files.length) {
        // files is not really an array and does not have a forEach method, so fake it.
        Array.prototype.forEach.call(files, function (file) {
          var fileName = (0, _utils.uniqueName)(file.name, _this5.component.fileNameTemplate, _this5.evalContext());
          var fileUpload = {
            originalName: file.name,
            name: fileName,
            size: file.size,
            status: 'info',
            message: 'Starting upload'
          }; // Check file pattern

          if (_this5.component.filePattern && !_this5.validatePattern(file, _this5.component.filePattern)) {
            fileUpload.status = 'error';
            fileUpload.message = "File is the wrong type; it must be ".concat(_this5.component.filePattern);
          } // Check file minimum size


          if (_this5.component.fileMinSize && !_this5.validateMinSize(file, _this5.component.fileMinSize)) {
            fileUpload.status = 'error';
            fileUpload.message = "File is too small; it must be at least ".concat(_this5.component.fileMinSize);
          } // Check file maximum size


          if (_this5.component.fileMaxSize && !_this5.validateMaxSize(file, _this5.component.fileMaxSize)) {
            fileUpload.status = 'error';
            fileUpload.message = "File is too big; it must be at most ".concat(_this5.component.fileMaxSize);
          } // Get a unique name for this file to keep file collisions from occurring.


          var dir = _this5.interpolate(_this5.component.dir || '');

          var fileService = _this5.fileService;

          if (!fileService) {
            fileUpload.status = 'error';
            fileUpload.message = 'File Service not provided.';
          }

          _this5.statuses.push(fileUpload);

          _this5.redraw();

          if (fileUpload.status !== 'error') {
            if (_this5.component.privateDownload) {
              file.private = true;
            }

            var _this5$component = _this5.component,
                storage = _this5$component.storage,
                url = _this5$component.url,
                _this5$component$opti = _this5$component.options,
                options = _this5$component$opti === void 0 ? {} : _this5$component$opti;
            fileService.uploadFile(storage, file, fileName, dir, function (evt) {
              fileUpload.status = 'progress';
              fileUpload.progress = parseInt(100.0 * evt.loaded / evt.total);
              delete fileUpload.message;

              _this5.redraw();
            }, url, options).then(function (fileInfo) {
              var index = _this5.statuses.indexOf(fileUpload);

              if (index !== -1) {
                _this5.statuses.splice(index, 1);
              }

              fileInfo.originalName = file.name;

              _this5.dataValue.push(fileInfo);

              _this5.redraw();

              _this5.triggerChange();
            }).catch(function (response) {
              fileUpload.status = 'error';
              fileUpload.message = response;
              delete fileUpload.progress;

              _this5.redraw();
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
      this.refs.fileBrowse.focus();
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
    key: "fileService",
    get: function get() {
      if (this.options.fileService) {
        return this.options.fileService;
      }

      if (this.options.formio) {
        return this.options.formio;
      }

      if (this.root && this.root.formio) {
        return this.root.formio;
      }

      var formio = new _Formio.default(); // If a form is loaded, then make sure to set the correct formUrl.

      if (this.root && this.root._form && this.root._form._id) {
        formio.formUrl = "".concat(formio.projectUrl, "/form/").concat(this.root._form._id);
      }

      return formio;
    }
  }, {
    key: "useWebViewCamera",
    get: function get() {
      return this.component.image && webViewCamera;
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