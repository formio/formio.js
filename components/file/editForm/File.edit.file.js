"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.map.js");

var _Formio = require("../../../Formio");

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [{
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
      return _lodash.default.map(_Formio.GlobalFormio.Providers.getProviders('storage'), function (storage, key) {
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
  tooltip: "See <a href='https://github.com/danialfarid/ng-file-upload#server-side' target='_blank'>https://github.com/danialfarid/ng-file-upload#server-side</a> for how to set up the server.",
  conditional: {
    json: {
      '===': [{
        var: 'data.storage'
      }, 'url']
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'options.indexeddb',
  label: 'Database',
  weight: 10,
  placeholder: 'Enter the indexeddb database name',
  conditional: {
    json: {
      in: [{
        var: 'data.storage'
      }, ['indexeddb']]
    }
  }
}, {
  type: 'textfield',
  input: true,
  label: 'Table',
  key: 'options.indexeddbTable',
  weight: 10,
  placeholder: 'Enter the name for indexeddb table',
  conditional: {
    json: {
      in: [{
        var: 'data.storage'
      }, ['indexeddb']]
    }
  }
}, {
  type: 'textarea',
  key: 'options',
  label: 'Custom request options',
  tooltip: 'Pass your custom xhr options(optional)',
  rows: 5,
  editor: 'ace',
  input: true,
  weight: 15,
  placeholder: "{\n  \"withCredentials\": true\n}",
  conditional: {
    json: {
      '===': [{
        var: 'data.storage'
      }, 'url']
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'fileKey',
  label: 'File form-data key',
  weight: 17,
  placeholder: 'Enter the key name of a file for form data.',
  tooltip: 'Key name that you would like to modify for the file while calling API request.',
  conditional: {
    json: {
      '===': [{
        var: 'data.storage'
      }, 'url']
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'dir',
  label: 'Directory',
  placeholder: '(optional) Enter a directory for the files',
  tooltip: 'This will place all the files uploaded in this field in the directory',
  weight: 20,
  conditional: {
    json: {
      '!==': [{
        var: 'data.storage'
      }, 'googledrive']
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'dir',
  label: 'Folder ID',
  placeholder: '(optional) Enter an ID of the folder for the files',
  tooltip: 'This will place all the files uploaded in this field in the folder',
  weight: 20,
  conditional: {
    json: {
      '===': [{
        var: 'data.storage'
      }, 'googledrive']
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'fileNameTemplate',
  label: 'File Name Template',
  placeholder: '(optional) { {name} }-{ {guid} }"',
  tooltip: 'Specify template for name of uploaded file(s). Regular template variables are available (`data`, `component`, `user`, `value`, `moment` etc.), also `fileName`, `guid` variables are available. `guid` part must be present, if not found in template, will be added at the end.',
  weight: 25
}, {
  type: 'checkbox',
  input: true,
  key: 'image',
  label: 'Display as image(s)',
  tooltip: 'Instead of a list of linked files, images will be rendered in the view.',
  weight: 30
}, {
  type: 'checkbox',
  input: true,
  key: 'uploadOnly',
  label: 'Upload Only',
  tooltip: 'When this is checked, will only allow you to upload file(s) and consequently the download, in this component, will be unavailable.',
  weight: 33
}, {
  type: 'checkbox',
  input: true,
  key: 'privateDownload',
  label: 'Private Download',
  tooltip: 'When this is checked, the file download will send a POST request to the download URL with the x-jwt-token header. This will allow your endpoint to create a Private download system.',
  weight: 31,
  conditional: {
    json: {
      '===': [{
        var: 'data.storage'
      }, 'url']
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'imageSize',
  label: 'Image Size',
  placeholder: '100',
  tooltip: 'The image size for previewing images.',
  weight: 40,
  conditional: {
    json: {
      '==': [{
        var: 'data.image'
      }, true]
    }
  }
}, {
  type: 'checkbox',
  input: true,
  key: 'webcam',
  label: 'Enable web camera',
  tooltip: 'This will allow using an attached camera to directly take a picture instead of uploading an existing file.',
  weight: 32
}, {
  type: 'textfield',
  input: true,
  key: 'webcamSize',
  label: 'Webcam Width',
  placeholder: '320',
  tooltip: 'The webcam size for taking pictures.',
  weight: 38,
  conditional: {
    json: {
      '==': [{
        var: 'data.webcam'
      }, true]
    }
  }
}, {
  type: 'datagrid',
  input: true,
  label: 'File Types',
  key: 'fileTypes',
  tooltip: 'Specify file types to classify the uploads. This is useful if you allow multiple types of uploads but want to allow the user to specify which type of file each is.',
  weight: 11,
  components: [{
    label: 'Label',
    key: 'label',
    input: true,
    type: 'textfield'
  }, {
    label: 'Value',
    key: 'value',
    input: true,
    type: 'textfield'
  }]
}, {
  type: 'textfield',
  input: true,
  key: 'filePattern',
  label: 'File Pattern',
  placeholder: '.jpg,video/*,application/pdf',
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
}];
exports.default = _default;