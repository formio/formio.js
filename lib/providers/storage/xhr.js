"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setXhrHeaders = exports.default = void 0;

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.concat.js");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _trim2 = _interopRequireDefault(require("lodash/trim"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var setXhrHeaders = function setXhrHeaders(formio, xhr) {
  var headers = formio.options.headers;

  if (headers) {
    var ValidHeaders = {
      'Content-Disposition': true,
      'Authorization': true
    };

    for (var header in headers) {
      if (ValidHeaders[header]) {
        xhr.setRequestHeader(header, headers[header]);
      }
    }
  }
};

exports.setXhrHeaders = setXhrHeaders;
var XHR = {
  trim: function trim(text) {
    return (0, _trim2.default)(text, '/');
  },
  path: function path(items) {
    return items.filter(function (item) {
      return !!item;
    }).map(XHR.trim).join('/');
  },
  upload: function upload(formio, type, xhrCb, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback) {
    return new _nativePromiseOnly.default(function (resolve, reject) {
      // Send the pre response to sign the upload.
      var pre = new XMLHttpRequest(); // This only fires on a network error.

      pre.onerror = function (err) {
        err.networkError = true;
        reject(err);
      };

      pre.onabort = reject;

      pre.onload = function () {
        if (pre.status >= 200 && pre.status < 300) {
          var response = JSON.parse(pre.response); // Send the file with data.

          var xhr = new XMLHttpRequest();

          if (typeof progressCallback === 'function') {
            xhr.upload.onprogress = progressCallback;
          }

          if (typeof abortCallback === 'function') {
            abortCallback(function () {
              return xhr.abort();
            });
          }

          xhr.openAndSetHeaders = function () {
            xhr.open.apply(xhr, arguments);
            setXhrHeaders(formio, xhr);
          }; // Fire on network error.


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
              resolve(response);
            } else {
              reject(xhr.response || 'Unable to upload file');
            }
          }; // Set the onabort error callback.


          xhr.onabort = reject; // Get the request and send it to the server.

          xhr.send(xhrCb(xhr, response));
        } else {
          reject(pre.response || 'Unable to sign file');
        }
      };

      pre.open('POST', "".concat(formio.formUrl, "/storage/").concat(type));
      pre.setRequestHeader('Accept', 'application/json');
      pre.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      var token = formio.getToken();

      if (token) {
        pre.setRequestHeader('x-jwt-token', token);
      }

      pre.send(JSON.stringify({
        name: XHR.path([dir, fileName]),
        size: file.size,
        type: file.type,
        groupPermissions: groupPermissions,
        groupId: groupId
      }));
    });
  }
};
var _default = XHR;
exports.default = _default;