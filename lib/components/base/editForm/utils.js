'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFormUtils = undefined;

var _mergeWith2 = require('lodash/mergeWith');

var _mergeWith3 = _interopRequireDefault(_mergeWith2);

var _sortBy2 = require('lodash/sortBy');

var _sortBy3 = _interopRequireDefault(_sortBy2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _unionWith2 = require('lodash/unionWith');

var _unionWith3 = _interopRequireDefault(_unionWith2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditFormUtils = exports.EditFormUtils = {
  mergeComponents: function mergeComponents(objValue, srcValue) {
    if ((0, _isArray3.default)(objValue)) {
      if (objValue[0] && objValue[0].components) {
        return (0, _mergeWith3.default)(objValue, srcValue, EditFormUtils.mergeComponents);
      }
      if (objValue[0] && objValue[0].type) {
        return (0, _sortBy3.default)((0, _unionWith3.default)(srcValue, objValue, function (a, b) {
          return a.key === b.key;
        }), ['weight']);
      }
      return objValue.concat(srcValue);
    }
  },
  javaScriptValue: function javaScriptValue(title, property) {
    return {
      type: 'panel',
      title: title,
      theme: 'default',
      collapsible: true,
      collapsed: true,
      key: property + 'Panel',
      components: [{
        type: 'panel',
        title: 'JavaScript Default',
        collapsible: true,
        collapsed: false,
        style: { 'margin-bottom': '10px' },
        key: property + '-js',
        components: [{
          type: 'textarea',
          key: property,
          rows: 5,
          editor: 'ace',
          input: true
        }, {
          type: 'htmlelement',
          tag: 'div',
          content: '<p>Enter custom default value code.</p>' + '<p>You must assign the <strong>value</strong> variable as the result you want for the default value.</p>' + '<p>The global variable data is provided, and allows you to access the data of any form component, by using its API key.</p>' + '<p>Default Values are only calculated on form load. Use Calculated Value for a value that will update with the form.</p>'
        }]
      }, {
        type: 'panel',
        title: 'JSONLogic Default',
        collapsible: true,
        collapsed: true,
        key: property + '-json',
        components: [{
          type: 'htmlelement',
          tag: 'div',
          content: '<p>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank">JSONLogic</a>.</p>' + '<p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' + '<p><a href="http://formio.github.io/formio.js/app/examples/calculated.html" target="_blank">Click here for an example</a></p>'
        }, {
          type: 'textarea',
          key: property,
          rows: 5,
          editor: 'ace',
          as: 'json',
          input: true
        }]
      }]
    };
  }
};