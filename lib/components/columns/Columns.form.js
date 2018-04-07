'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components2.default.apply(undefined, [[{
    label: 'Display',
    key: 'display',
    components: [{
      weight: 150,
      type: 'datagrid',
      input: true,
      key: 'columns',
      label: 'Column Properties',
      addAnother: 'Add Column',
      tooltip: 'The width, offset, push, and pull settings for each column.',
      components: [{
        type: 'number',
        key: 'width',
        defaultValue: 6,
        label: 'Width'
      }, {
        type: 'number',
        key: 'offset',
        defaultValue: 0,
        label: 'Offset'
      }, {
        type: 'number',
        key: 'push',
        defaultValue: 0,
        label: 'Push'
      }, {
        type: 'number',
        key: 'pull',
        defaultValue: 0,
        label: 'Pull'
      }]
    }]
  }]].concat(extend));
};

var _Components = require('../Components.form');

var _Components2 = _interopRequireDefault(_Components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;