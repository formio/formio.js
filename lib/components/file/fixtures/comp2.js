"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  _id: '6108f1dac7e55d5cabe2627f',
  type: 'form',
  components: [{
    label: 'Upload',
    tableView: false,
    modalEdit: true,
    storage: 'base64',
    webcam: false,
    fileTypes: [{
      label: '',
      value: ''
    }],
    key: 'file',
    type: 'file',
    input: true
  }, {
    type: 'button',
    label: 'Submit',
    key: 'submit',
    disableOnInvalid: true,
    input: true,
    tableView: false
  }],
  title: 'testFileForm',
  display: 'form',
  name: 'testFileForm',
  path: 'testfileform'
};
exports["default"] = _default;