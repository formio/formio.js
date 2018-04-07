'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditFormUtils = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EditFormUtils = exports.EditFormUtils = {
  sortAndFilterComponents: function sortAndFilterComponents(components) {
    return _lodash2.default.filter(_lodash2.default.sortBy(components, 'weight'), function (item) {
      return !item.ignore;
    });
  },
  unifyComponents: function unifyComponents(objValue, srcValue) {
    if (objValue.key && srcValue.key) {
      if (objValue.key === srcValue.key) {
        if (objValue.components) {
          srcValue.components = EditFormUtils.sortAndFilterComponents(_lodash2.default.unionWith(objValue.components, srcValue.components, EditFormUtils.unifyComponents));
        }
        return true;
      } else {
        return false;
      }
    }
    return _lodash2.default.isEqual(objValue, srcValue);
  },
  javaScriptValue: function javaScriptValue(title, property, weight) {
    return {
      type: 'panel',
      title: title,
      theme: 'default',
      collapsible: true,
      collapsed: true,
      key: property + 'Panel',
      weight: weight,
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