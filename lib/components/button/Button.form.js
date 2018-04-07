'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base2.default.apply(undefined, [[{
    label: 'Display',
    key: 'display',
    weight: 0,
    components: [{
      type: 'select',
      key: 'action',
      label: 'Action',
      input: true,
      dataSrc: 'values',
      weight: 110,
      tooltip: 'This is the action to be performed by this button.',
      data: {
        values: [{ label: 'Submit', value: 'submit' }, { label: 'Event', value: 'event' }, { label: 'Custom', value: 'custom' }, { label: 'Reset', value: 'reset' }, { label: 'OAuth', value: 'oauth' }, { label: 'POST to URL', value: 'url' }]
      }
    }, {
      type: 'textfield',
      label: 'Button Event',
      key: 'event',
      input: true,
      weight: 120,
      tooltip: 'The event to fire when the button is clicked.',
      conditional: {
        json: { '===': [{ var: 'data.action' }, 'event'] }
      }
    }, {
      type: 'textfield',
      inputType: 'url',
      key: 'url',
      input: true,
      weight: 120,
      label: 'Button URL',
      tooltip: 'The URL where the submission will be sent.',
      placeholder: 'https://example.form.io',
      conditional: {
        json: { '===': [{ var: 'data.action' }, 'url'] }
      }
    }, {
      type: 'datagrid',
      key: 'headers',
      input: true,
      weight: 130,
      label: 'Headers',
      addAnother: 'Add Header',
      tooltip: 'Headers Properties and Values for your request',
      components: [{
        key: 'header',
        label: 'Header',
        input: true,
        type: 'textfield'
      }, {
        key: 'value',
        label: 'Value',
        input: true,
        type: 'textfield'
      }],
      conditional: {
        json: { '===': [{ var: 'data.action' }, 'url'] }
      }
    }, {
      type: 'textarea',
      key: 'custom',
      label: 'Button Custom Logic',
      tooltip: 'The custom logic to evaluate when the button is clicked.',
      rows: 5,
      editor: 'ace',
      input: true,
      weight: 120,
      placeholder: 'data[\'mykey\'] = data[\'anotherKey\'];',
      conditional: {
        json: { '===': [{ var: 'data.action' }, 'custom'] }
      }
    }, {
      type: 'select',
      key: 'theme',
      label: 'Theme',
      input: true,
      tooltip: 'The color theme of this button.',
      dataSrc: 'values',
      weight: 140,
      data: {
        values: [{ label: 'Default', value: 'default' }, { label: 'Primary', value: 'primary' }, { label: 'Info', value: 'info' }, { label: 'Success', value: 'success' }, { label: 'Danger', value: 'danger' }, { label: 'Warning', value: 'warning' }]
      }
    }, {
      type: 'select',
      key: 'size',
      label: 'Size',
      input: true,
      tooltip: 'The size of this button.',
      dataSrc: 'values',
      weight: 150,
      data: {
        values: [{ label: 'Extra Small', value: 'xs' }, { label: 'Small', value: 'sm' }, { label: 'Medium', value: 'md' }, { label: 'Large', value: 'lg' }]
      }
    }, {
      type: 'textfield',
      key: 'leftIcon',
      label: 'Left Icon',
      input: true,
      placeholder: 'Enter icon classes',
      tooltip: 'This is the full icon class string to show the icon. Example: \'fa fa-plus\'',
      weight: 160
    }, {
      type: 'textfield',
      key: 'rightIcon',
      label: 'Right Icon',
      input: true,
      placeholder: 'Enter icon classes',
      tooltip: 'This is the full icon class string to show the icon. Example: \'fa fa-plus\'',
      weight: 170
    }, {
      type: 'select',
      input: true,
      weight: 180,
      label: 'Shortcut',
      key: 'shortcut',
      tooltip: 'Shortcut for this component.',
      dataSrc: 'custom',
      data: {
        custom: function custom(component, data) {
          return _builder.BuilderUtils.getAvailableShortcuts(data.__form, component.component);
        }
      }
    }, {
      type: 'checkbox',
      key: 'block',
      label: 'Block',
      input: true,
      weight: 610,
      tooltip: 'This control should span the full width of the bounding container.'
    }, {
      type: 'checkbox',
      key: 'disableOnInvalid',
      label: 'Disable on Form Invalid',
      tooltip: 'This will disable this field if the form is invalid.',
      input: true,
      weight: 620
    }]
  }]].concat(extend));
};

var _Base = require('../base/Base.form');

var _Base2 = _interopRequireDefault(_Base);

var _builder = require('../../utils/builder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;