"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "comp1", {
  enumerable: true,
  get: function get() {
    return _comp3.default;
  }
});
Object.defineProperty(exports, "comp2", {
  enumerable: true,
  get: function get() {
    return _comp4.default;
  }
});
Object.defineProperty(exports, "withDefValue", {
  enumerable: true,
  get: function get() {
    return _compWithDefValue.default;
  }
});
Object.defineProperty(exports, "withRowGroupsAndDefValue", {
  enumerable: true,
  get: function get() {
    return _compRowGroupsWithDefValue.default;
  }
});

var _comp3 = _interopRequireDefault(require("./comp1"));

var _comp4 = _interopRequireDefault(require("./comp2"));

var _compWithDefValue = _interopRequireDefault(require("./comp-with-def-value.json"));

var _compRowGroupsWithDefValue = _interopRequireDefault(require("./comp-row-groups-with-def-value.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }