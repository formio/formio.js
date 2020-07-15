"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("../../_classes/component/editForm/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* eslint-disable quotes, max-len */
var title = 'Advanced Next Page';
var jsonProp = 'nextPage';
var jsProp = 'nextPage';
var jsDocHTML = "\n  <p>You must assign the <strong>next</strong> variable with the API key of the next page.</p>\n  <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>\n  <p>Also <strong>moment</strong> library is available, and allows you to manipulate dates in a convenient way.</p>\n  <h5>Example</h5><pre>next = data.addComment ? 'page3' : 'page4';</pre>\n";
var jsonDocHTML = "\n  <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>\n";

var settingComponent = _utils.default.javaScriptValue(title, jsProp, jsonProp, 110, jsDocHTML, jsonDocHTML);

var _default = [_objectSpread(_objectSpread({}, settingComponent), {}, {
  customConditional: function customConditional(context) {
    return context.instance.options.editForm.display === 'wizard';
  }
})];
/* eslint-enable quotes, max-len */

exports.default = _default;