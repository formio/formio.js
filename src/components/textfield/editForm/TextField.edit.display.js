import Widgets from '../../../widgets';
import _ from 'lodash';
export default [
  {
    weight: 400,
    type: 'select',
    input: true,
    key: 'widget.type',
    label: 'Widget',
    placeholder: 'Select a widget',
    tooltip: 'The widget is the display UI used to input the value of the field.',
    defaultValue: 'input',
    onChange: (context) => {
      context.data.widget = _.pick(context.data.widget, 'type');
    },
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Input Field', value: 'input' },
        { label: 'Calendar Picker', value: 'calendar' },
      ]
    },
    conditional: {
      json: { '===': [{ var: 'data.type' }, 'textfield'] }
    }
  },
  {
    weight: 405,
    type: 'textarea',
    key: 'widget',
    label: 'Widget Settings',
    refreshOn: 'wiget.type',
    clearOnHide: false,
    // Deleted clearOnHide and refreshOn to make possible to change exist widget settings.
    calculateValue: (context) => {
      const { calculatedValue } = context.instance;
      const { type } = context.data.widget;

      if (
        _.isEmpty(_.omit(context.data.widget, 'type')) ||
        _.isEmpty(_.omit(calculatedValue, 'type'))
      ) {
        if (calculatedValue && !calculatedValue.type) {
          return context.data.widget;
        }

        const existWidget = context.instance._currentForm.options.editComponent.widget;
        if (existWidget && !_.isEmpty(_.omit(existWidget, 'type')) && type === existWidget.type) {
          return _.omit(existWidget, 'language');
        }
        else if (type) {
          return _.omit(Widgets[type].defaultSettings, 'language');
        }
      }
      return context.data.widget;
    },
    input: true,
    rows: 5,
    editor: 'ace',
    as: 'json',
    conditional: {
      json: { '!==': [{ var: 'data.widget.type' }, 'input'] }
    }
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
    weight: 413,
    type: 'checkbox',
    input: true,
    key: 'allowMultipleMasks',
    label: 'Allow Multiple Masks'
  },
  {
    weight: 1350,
    type: 'checkbox',
    input: true,
    key: 'spellcheck',
    defaultValue: true,
    label: 'Allow Spellcheck'
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
    weight: 320,
    type: 'textfield',
    input: true,
    key: 'prefix',
    label: 'Prefix'
  },
  {
    weight: 330,
    type: 'textfield',
    input: true,
    key: 'suffix',
    label: 'Suffix'
  },
  {
    weight: 700,
    type: 'textfield',
    input: true,
    key: 'autocomplete',
    label: 'Autocomplete',
    placeholder: 'on',
    tooltip: 'Indicates whether input elements can by default have their values automatically completed by the browser. See the <a href=\'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete\'>MDN documentation</a> on autocomplete for more information.'
  },
  {
    weight: 1300,
    type: 'checkbox',
    label: 'Hide Input',
    tooltip: 'Hide the input in the browser. This does not encrypt on the server. Do not use for passwords.',
    key: 'mask',
    input: true
  },
  {
    weight: 1200,
    type: 'checkbox',
    label: 'Show Word Counter',
    tooltip: 'Show a live count of the number of words.',
    key: 'showWordCount',
    input: true
  },
  {
    weight: 1201,
    type: 'checkbox',
    label: 'Show Character Counter',
    tooltip: 'Show a live count of the number of characters.',
    key: 'showCharCount',
    input: true
  },
];
