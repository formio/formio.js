"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = [
  {
    weight: 100,
    type: 'textfield',
    input: true,
    key: 'placeholder',
    label: 'Placeholder',
    placeholder: 'Placeholder',
    tooltip: 'The placeholder text that will appear when this field is empty.'
  },
  {
    weight: 410,
    type: 'textfield',
    input: true,
    key: 'inputMask',
    label: 'Input Mask',
    tooltip: 'An input mask helps the user with input by ensuring a predefined format.<br><br>9: numeric<br>a: alphabetical<br>*: alphanumeric<br><br>Example telephone mask: (999) 999-9999<br><br>See the <a target=\'_blank\' href=\'https://github.com/RobinHerbots/jquery.inputmask\'>jquery.inputmask documentation</a> for more information.</a>',
    customConditional(context) {
      return !context.data.allowMultipleMasks;
    }
  },
  {
    weight: 417,
    type: 'datagrid',
    input: true,
    key: 'inputMasks',
    label: 'Input Masks',
    customConditional(context) {
      return context.data.allowMultipleMasks === true;
    },
    reorder: true,
    components: [
      {
        type: 'textfield',
        key: 'label',
        label: 'Label',
        input: true
      },
      {
        type: 'textfield',
        key: 'mask',
        label: 'Mask',
        input: true
      }
    ]
  },
  {
    type: 'number',
    input: true,
    key: 'rows',
    label: 'Rows',
    weight: 510,
    tooltip: 'This allows control over how many rows are visible in the text area.',
    placeholder: 'Enter the amount of rows'
  },
];
exports.default = _default;