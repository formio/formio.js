"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFormioUploadAdapterPlugin = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.promise.finally.js");

require("core-js/modules/es.array.concat.js");

var _utils = require("../../utils/utils");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/**
 * UploadAdapter for CKEditor https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html
 */
var FormioUploadAdapter = /*#__PURE__*/function () {
  function FormioUploadAdapter(loader, fileService, component) {
    _classCallCheck(this, FormioUploadAdapter);

    this.loader = loader;
    this.fileService = fileService;
    this.component = component;
  }

  _createClass(FormioUploadAdapter, [{
    key: "upload",
    value: function upload() {
      var _this = this;

      return this.loader.file.then(function (file) {
        return new _nativePromiseOnly.default(function (resolve, reject) {
          var _this$fileService;

          var _this$component$compo = _this.component.component,
              uploadStorage = _this$component$compo.uploadStorage,
              uploadUrl = _this$component$compo.uploadUrl,
              uploadOptions = _this$component$compo.uploadOptions,
              uploadDir = _this$component$compo.uploadDir,
              fileKey = _this$component$compo.fileKey;
          var uploadParams = [uploadStorage, file, (0, _utils.uniqueName)(file.name), uploadDir || '', //should pass empty string if undefined
          function (evt) {
            return _this.onUploadProgress(evt);
          }, uploadUrl, uploadOptions, fileKey, null, null];

          var uploadPromise = (_this$fileService = _this.fileService).uploadFile.apply(_this$fileService, uploadParams.concat([function () {
            return _this.component.emit('fileUploadingStart', uploadPromise);
          }])).then(function (result) {
            return _this.fileService.downloadFile(result);
          }).then(function (result) {
            return resolve({
              default: result.url
            });
          }).catch(function (err) {
            console.warn('An Error occured while uploading file', err);
            reject(err);
          }).finally(function () {
            _this.component.emit('fileUploadingEnd', uploadPromise);
          });
        });
      });
    }
  }, {
    key: "abort",
    value: function abort() {}
  }, {
    key: "onUploadProgress",
    value: function onUploadProgress(evt) {
      if (evt.lengthComputable) {
        this.loader.uploadTotal = evt.total;
        this.loader.uploaded = evt.loaded;
      }
    }
  }]);

  return FormioUploadAdapter;
}();

var getFormioUploadAdapterPlugin = function getFormioUploadAdapterPlugin(fileService, component) {
  return function (editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
      return new FormioUploadAdapter(loader, fileService, component);
    };
  };
};

exports.getFormioUploadAdapterPlugin = getFormioUploadAdapterPlugin;