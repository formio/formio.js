"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  components: [{
    type: 'select',
    label: 'Select JSON',
    key: 'select',
    placeholder: 'Select one',
    data: {
      json: "[\n          {\"value\":\"a\",\"label\":\"A\"},\n          {\"value\":\"b\",\"label\":\"B\"},\n          {\"value\":\"c\",\"label\":\"C\"},\n          {\"value\":\"d\",\"label\":\"D\"}\n        ]"
    },
    dataSrc: 'json',
    template: '<span>{{ item.label }}</span>',
    input: true
  }, {
    type: 'button',
    label: 'Submit',
    key: 'submit',
    disableOnInvalid: false,
    input: true,
    tableView: false
  }]
};
exports.default = _default;