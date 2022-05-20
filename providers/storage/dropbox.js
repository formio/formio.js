"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _xhr = require("./xhr");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropbox = function dropbox(formio) {
  return {
    uploadFile: function uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback) {
      return new _nativePromiseOnly.default(function (resolve, reject) {
        // Send the file with data.
        var xhr = new XMLHttpRequest();

        if (typeof progressCallback === 'function') {
          xhr.upload.onprogress = progressCallback;
        }

        if (typeof abortCallback === 'function') {
          abortCallback(function () {
            return xhr.abort();
          });
        }

        var fd = new FormData();
        fd.append('name', fileName);
        fd.append('dir', dir);
        fd.append('file', file); // Fire on network error.

        xhr.onerror = function (err) {
          err.networkError = true;
          reject(err);
        };

        xhr.onload = function () {
          if (xhr.status >= 200 && xhr.status < 300) {
            var response = JSON.parse(xhr.response);
            response.storage = 'dropbox';
            response.size = file.size;
            response.type = file.type;
            response.groupId = groupId;
            response.groupPermissions = groupPermissions;
            response.url = response.path_lower;
            resolve(response);
          } else {
            reject(xhr.response || 'Unable to upload file');
          }
        };

        xhr.onabort = reject;
        xhr.open('POST', "".concat(formio.formUrl, "/storage/dropbox"));
        (0, _xhr.setXhrHeaders)(formio, xhr);
        var token = formio.getToken();

        if (token) {
          xhr.setRequestHeader('x-jwt-token', token);
        }

        xhr.send(fd);
      });
    },
    downloadFile: function downloadFile(file) {
      var token = formio.getToken();
      file.url = "".concat(formio.formUrl, "/storage/dropbox?path_lower=").concat(file.path_lower).concat(token ? "&x-jwt-token=".concat(token) : '');
      return _nativePromiseOnly.default.resolve(file);
    }
  };
};

dropbox.title = 'Dropbox';
var _default = dropbox;
exports.default = _default;