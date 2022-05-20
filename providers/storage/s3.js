"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.trim.js");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _xhr = _interopRequireDefault(require("./xhr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var s3 = function s3(formio) {
  return {
    uploadFile: function uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback) {
      return _xhr.default.upload(formio, 's3', function (xhr, response) {
        response.data.fileName = fileName;
        response.data.key = _xhr.default.path([response.data.key, dir, fileName]);

        if (response.signed) {
          xhr.openAndSetHeaders('PUT', response.signed);
          xhr.setRequestHeader('Content-Type', file.type);
          return file;
        } else {
          var fd = new FormData();

          for (var key in response.data) {
            fd.append(key, response.data[key]);
          }

          fd.append('file', file);
          xhr.openAndSetHeaders('POST', response.url);
          return fd;
        }
      }, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback).then(function (response) {
        return {
          storage: 's3',
          name: fileName,
          bucket: response.bucket,
          key: response.data.key,
          url: _xhr.default.path([response.url, response.data.key]),
          acl: response.data.acl,
          size: file.size,
          type: file.type
        };
      });
    },
    downloadFile: function downloadFile(file) {
      if (file.acl !== 'public-read') {
        return formio.makeRequest('file', "".concat(formio.formUrl, "/storage/s3?bucket=").concat(_xhr.default.trim(file.bucket), "&key=").concat(_xhr.default.trim(file.key)), 'GET');
      } else {
        return _nativePromiseOnly.default.resolve(file);
      }
    }
  };
};

s3.title = 'S3';
var _default = s3;
exports.default = _default;