"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.to-string.js");

var _utils = _interopRequireDefault(require("../../_classes/component/editForm/utils"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _difference2 = _interopRequireDefault(require("lodash/difference"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

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
    var isWizardPanel = false;

    if (context.instance.options.editForm.display === 'wizard') {
      var components = context.instance.options.editForm.components;
      var component = context.instance.options.editComponent;

      if (components && component) {
        isWizardPanel = components.some(function (comp) {
          var diff = (0, _difference2.default)((0, _keys2.default)(comp), (0, _keys2.default)(component)) || [];
          diff.push('components');
          return (0, _isEqual2.default)((0, _omit2.default)(comp, diff), (0, _omit2.default)(component, diff));
        });
      }
    }

    return isWizardPanel;
  }
})];
/* eslint-enable quotes, max-len */

exports.default = _default;