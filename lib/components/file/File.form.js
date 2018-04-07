'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base2.default.apply(undefined, [[{
    label: 'File',
    key: 'file',
    weight: 5,
    components: [{
      type: 'select',
      input: true,
      key: 'storage',
      label: 'Storage',
      placeholder: 'Select your file storage provider',
      weight: 0,
      tooltip: 'Which storage to save the files in.',
      valueProperty: 'value',
      dataSrc: 'custom',
      data: {
        custom: function custom() {
          return _lodash2.default.map(_formio2.default.providers.storage, function (storage, key) {
            return {
              label: storage.title,
              value: key
            };
          });
        }
      }
    }, {
      type: 'textfield',
      input: true,
      key: 'url',
      label: 'Url',
      weight: 10,
      placeholder: 'Enter the url to post the files to.',
      tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#server-side\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#server-side</a> for how to set up the server.',
      conditional: {
        json: { '===': [{ var: 'data.storage' }, 'url'] }
      }
    }, {
      type: 'textfield',
      input: true,
      key: 'dir',
      label: 'Directory',
      placeholder: '(optional) Enter a directory for the files',
      tooltip: 'This will place all the files uploaded in this field in the directory',
      weight: 20
    }, {
      type: 'checkbox',
      input: true,
      key: 'image',
      label: 'Display as image(s)',
      tooltip: 'Instead of a list of linked files, images will be rendered in the view.',
      weight: 30
    }, {
      type: 'textfield',
      input: true,
      key: 'imageSize',
      label: 'Image Size',
      placeholder: '100',
      tooltip: 'The image size for previewing images.',
      weight: 40,
      conditional: {
        json: { '==': [{ var: 'data.image' }, true] }
      }
    }, {
      type: 'textfield',
      input: true,
      key: 'filePattern',
      label: 'File Pattern',
      placeholder: '.pdf,.jpg',
      tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file patterns.',
      weight: 50
    }, {
      type: 'textfield',
      input: true,
      key: 'fileMinSize',
      label: 'File Minimum Size',
      placeholder: '1MB',
      tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file sizes.',
      weight: 60
    }, {
      type: 'textfield',
      input: true,
      key: 'fileMaxSize',
      label: 'File Maximum Size',
      placeholder: '10MB',
      tooltip: 'See <a href=\'https://github.com/danialfarid/ng-file-upload#full-reference\' target=\'_blank\'>https://github.com/danialfarid/ng-file-upload#full-reference</a> for how to specify file sizes.',
      weight: 70
    }]
  }]].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

var _formio = require('../../formio');

var _formio2 = _interopRequireDefault(_formio);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;