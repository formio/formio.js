'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var base64 = function base64() {
  return {
    title: 'Base64',
    name: 'base64',
    uploadFile: function uploadFile(file, fileName) {
      var _this = this;

      var reader = new FileReader();

      return new _nativePromiseOnly2.default(function (resolve, reject) {
        reader.onload = function (event) {
          var url = event.target.result;
          resolve({
            storage: 'base64',
            name: fileName,
            url: url,
            size: file.size,
            type: file.type,
            data: url.replace('data:' + file.type + ';base64,', '')
          });
        };

        reader.onerror = function () {
          return reject(_this);
        };

        reader.readAsDataURL(file);
      });
    },
    downloadFile: function downloadFile(file) {
      // Return the original as there is nothing to do.
      return _nativePromiseOnly2.default.resolve(file);
    }
  };
};

base64.title = 'Base64';
exports.default = base64;