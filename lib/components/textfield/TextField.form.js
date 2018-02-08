'use strict';

var BaseEditForm = require('../base/Base.form');

module.exports = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return BaseEditForm.apply(undefined, [{
    components: [{
      weight: 0,
      type: 'tabs',
      key: 'tabs',
      components: [{
        label: 'Display',
        key: 'display',
        components: [{
          weight: 50,
          type: 'select',
          input: true,
          key: 'labelPosition',
          label: 'Label Position',
          tooltip: 'Position for the label for this field.',
          dataSrc: 'values',
          widget: 'html5',
          data: {
            values: [{ label: 'Top', value: 'top' }, { label: 'Left (left-aligned)', value: 'left-left' }, { label: 'Left (right-aligned)', value: 'left-right' }, { label: 'Right (left-aligned)', value: 'right-left' }, { label: 'Right (right-aligned)', value: 'right-right' }, { label: 'Bottom', value: 'bottom' }]
          }
        }, {
          weight: 410,
          type: 'textfield',
          input: true,
          key: 'inputMask',
          label: 'Input Mask',
          tooltip: 'An input mask helps the user with input by ensuring a predefined format.<br><br>9: numeric<br>a: alphabetical<br>*: alphanumeric<br><br>Example telephone mask: (999) 999-9999<br><br>See the <a target=\'_blank\' href=\'https://github.com/RobinHerbots/jquery.inputmask\'>jquery.inputmask documentation</a> for more information.</a>'
        }, {
          weight: 420,
          type: 'textfield',
          input: true,
          key: 'prefix',
          label: 'Prefix'
        }, {
          weight: 430,
          type: 'textfield',
          input: true,
          key: 'suffix',
          label: 'Suffix'
        }]
      },
      // Need to keep empty to align tabs to merge.
      {}, {
        label: 'Validation',
        key: 'validation',
        components: [{
          weight: 110,
          key: 'validate.minLength',
          label: 'Minimum Length',
          placeholder: 'Minimum Length',
          type: 'number',
          tooltip: 'The minimum length requirement this field must meet.',
          input: true
        }, {
          weight: 120,
          key: 'validate.maxLength',
          label: 'Maximum Length',
          placeholder: 'Maximum Length',
          type: 'number',
          tooltip: 'The maximum length requirement this field must meet.',
          input: true
        }, {
          weight: 130,
          key: 'validate.pattern',
          label: 'Regular Expression Pattern',
          placeholder: 'Regular Expression Pattern',
          type: 'textfield',
          tooltip: 'The regular expression pattern test that the field value must pass before the form can be submitted.',
          input: true
        }]
      }]
    }]
  }].concat(extend));
};