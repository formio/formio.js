'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dropbox = function dropbox(formio) {
  return {
    uploadFile: function uploadFile(file, fileName, dir, progressCallback) {
      return new _nativePromiseOnly2.default(function (resolve, reject) {
        // Send the file with data.
        var xhr = new XMLHttpRequest();

        if (typeof progressCallback === 'function') {
          xhr.upload.onprogress = progressCallback;
        }

        var fd = new FormData();
        fd.append('name', fileName);
        fd.append('dir', dir);
        fd.append('file', file);

        // Fire on network error.
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
            response.url = response.path_lower;
            resolve(response);
          } else {
            reject(xhr.response || 'Unable to upload file');
          }
        };

        xhr.onabort = function (err) {
          reject(err);
        };

        xhr.open('POST', formio.formUrl + '/storage/dropbox');
        var token = formio.getToken();
        if (token) {
          xhr.setRequestHeader('x-jwt-token', token);
        }
        xhr.send(fd);
      });
    },
    downloadFile: function downloadFile(file) {
      var token = formio.getToken();
      file.url = formio.formUrl + '/storage/dropbox?path_lower=' + file.path_lower + (token ? '&x-jwt-token=' + token : '');
      return _nativePromiseOnly2.default.resolve(file);
    }
  };
};

dropbox.title = 'Dropbox';
exports.default = dropbox;