"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.function.name.js");

var _xhr = _interopRequireDefault(require("./xhr"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var azure = function azure(formio) {
  return {
    uploadFile: function uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback) {
      return _xhr.default.upload(formio, 'azure', function (xhr, response) {
        xhr.openAndSetHeaders('PUT', response.url);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
        return file;
      }, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback).then(function () {
        return {
          storage: 'azure',
          name: _xhr.default.path([dir, fileName]),
          size: file.size,
          type: file.type,
          groupPermissions: groupPermissions,
          groupId: groupId
        };
      });
    },
    downloadFile: function downloadFile(file) {
      return formio.makeRequest('file', "".concat(formio.formUrl, "/storage/azure?name=").concat(_xhr.default.trim(file.name)), 'GET');
    }
  };
};

azure.title = 'Azure File Services';
var _default = azure;
exports.default = _default;