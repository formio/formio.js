"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.function.name.js");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fileProcessor = function fileProcessor(formio, config) {
  return function (file, options) {
    return new _nativePromiseOnly.default(function (resolve, reject) {
      var xhr = new XMLHttpRequest(); // Fire on network error.

      xhr.onerror = function (err) {
        err.networkError = true;
        reject(err);
      }; // Fire on network abort.


      xhr.onabort = function (err) {
        err.networkError = true;
        reject(err);
      }; // Fired when the response has made it back from the server.


      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          var mimetype = xhr.getResponseHeader('Content-Type') || file.type;
          resolve(new File([xhr.response], file.name, {
            type: mimetype
          }));
        } else {
          reject(xhr.response || 'Unable to process file');
        }
      }; // Set the onabort error callback.


      xhr.onabort = reject;
      xhr.open('POST', config.url);
      var token = formio.getToken();

      if (token) {
        xhr.setRequestHeader('x-jwt-token', token);
      }

      xhr.responseType = 'arraybuffer';
      var data = new FormData();
      data.append('file', file);
      data.append('processorOptions', JSON.stringify(config.options || {}));
      data.append('options', JSON.stringify(options || {})); // Get the request and send it to the server.

      xhr.send(data);
    });
  };
};

var _default = fileProcessor;
exports.default = _default;