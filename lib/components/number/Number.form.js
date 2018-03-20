'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base2.default.apply(undefined, [{
    components: [{
      weight: 0,
      type: 'tabs',
      key: 'tabs',
      components: [{
        label: 'Display',
        key: 'display',
        components: []
      }, {
        label: 'Data',
        key: 'data',
        components: []
      }, {
        label: 'Validation',
        key: 'validation',
        components: [{
          weight: 100,
          type: 'checkbox',
          label: 'Unique',
          tooltip: 'Makes sure the data submitted for this field is unique, and has not been submitted before.',
          key: 'validate.unique',
          input: true,
          ignore: true
        }, {
          type: 'number',
          label: 'Minimum Value',
          key: 'validate.min',
          input: true,
          placeholder: 'Minimum Value',
          tooltip: 'The minimum value this field must have before the form can be submitted.',
          weight: 150
        }, {
          type: 'number',
          label: 'Maximum Value',
          key: 'validate.max',
          input: true,
          placeholder: 'Maximum Value',
          tooltip: 'The maximum value this field can have before the form can be submitted.',
          weight: 160
        }]
      }]
    }]
  }].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;