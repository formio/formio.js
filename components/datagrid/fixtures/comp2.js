"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  label: 'Children',
  key: 'children',
  type: 'datagrid',
  input: true,
  components: [{
    type: 'panel',
    label: 'User Information',
    key: 'userinfo',
    components: [{
      label: 'First Name',
      key: 'firstName',
      type: 'textfield',
      input: true
    }, {
      label: 'Last Name',
      key: 'lastName',
      type: 'textfield',
      input: true
    }]
  }]
};
exports.default = _default;