"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _builder = _interopRequireDefault(require("../../../utils/builder"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [{
  key: 'labelPosition',
  ignore: true
}, {
  key: 'placeholder',
  ignore: true
}, {
  key: 'hideLabel',
  ignore: true
}, {
  type: 'select',
  key: 'action',
  label: 'Action',
  input: true,
  dataSrc: 'values',
  weight: 110,
  tooltip: 'This is the action to be performed by this button.',
  data: {
    values: [{
      label: 'Submit',
      value: 'submit'
    }, {
      label: 'Save in state',
      value: 'saveState'
    }, {
      label: 'Event',
      value: 'event'
    }, {
      label: 'Custom',
      value: 'custom'
    }, {
      label: 'Reset',
      value: 'reset'
    }, {
      label: 'OAuth',
      value: 'oauth'
    }, {
      label: 'POST to URL',
      value: 'url'
    }]
  }
}, {
  type: 'select',
  key: 'oauthProvider',
  label: 'OAuth Provider',
  input: true,
  dataSrc: 'values',
  weight: 111,
  tooltip: 'The oauth provider to use to log in (8.x server only).',
  data: {
    values: [{
      label: 'OpenID',
      value: 'openid'
    }, {
      label: 'Github',
      value: 'github'
    }, {
      label: 'Google',
      value: 'google'
    }]
  },
  conditional: {
    json: {
      '===': [{
        var: 'data.action'
      }, 'oauth']
    }
  }
}, {
  type: 'textfield',
  label: 'Save in state',
  key: 'state',
  weight: 112,
  tooltip: 'The state you wish to save the submission under when this button is pressed. Example "draft" would save the submission in Draft Mode.',
  placeholder: 'submitted',
  input: true,
  conditional: {
    json: {
      '===': [{
        var: 'data.action'
      }, 'saveState']
    }
  }
}, {
  type: 'checkbox',
  input: true,
  inputType: 'checkbox',
  key: 'saveOnEnter',
  label: 'Save On Enter',
  weight: 113,
  tooltip: 'Use the Enter key to submit form.',
  conditional: {
    json: {
      '===': [{
        var: 'data.action'
      }, 'submit']
    }
  }
}, {
  type: 'checkbox',
  input: true,
  inputType: 'checkbox',
  key: 'showValidations',
  label: 'Show Validations',
  weight: 115,
  tooltip: 'When the button is pressed, show any validation errors on the form.',
  conditional: {
    json: {
      '!==': [{
        var: 'data.action'
      }, 'submit']
    }
  }
}, {
  type: 'textfield',
  label: 'Button Event',
  key: 'event',
  input: true,
  weight: 120,
  tooltip: 'The event to fire when the button is clicked.',
  conditional: {
    json: {
      '===': [{
        var: 'data.action'
      }, 'event']
    }
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
    json: {
      '===': [{
        var: 'data.action'
      }, 'url']
    }
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
    json: {
      '===': [{
        var: 'data.action'
      }, 'url']
    }
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
  placeholder: "data['mykey'] = data['anotherKey'];",
  conditional: {
    json: {
      '===': [{
        var: 'data.action'
      }, 'custom']
    }
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
    values: [{
      label: 'Primary',
      value: 'primary'
    }, {
      label: 'Secondary',
      value: 'secondary'
    }, {
      label: 'Info',
      value: 'info'
    }, {
      label: 'Success',
      value: 'success'
    }, {
      label: 'Danger',
      value: 'danger'
    }, {
      label: 'Warning',
      value: 'warning'
    }]
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
    values: [{
      label: 'Small',
      value: 'sm'
    }, {
      label: 'Medium',
      value: 'md'
    }, {
      label: 'Large',
      value: 'lg'
    }]
  }
}, {
  type: 'textfield',
  key: 'leftIcon',
  label: 'Left Icon',
  input: true,
  placeholder: 'Enter icon classes',
  tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
  weight: 160
}, {
  type: 'textfield',
  key: 'rightIcon',
  label: 'Right Icon',
  input: true,
  placeholder: 'Enter icon classes',
  tooltip: "This is the full icon class string to show the icon. Example: 'fa fa-plus'",
  weight: 170
}, {
  type: 'select',
  input: true,
  weight: 180,
  label: 'Shortcut',
  key: 'shortcut',
  tooltip: 'Shortcut for this component.',
  dataSrc: 'custom',
  valueProperty: 'value',
  customDefaultValue: function customDefaultValue() {
    return '';
  },
  template: '{{ item.label }}',
  data: {
    custom: function custom(context) {
      return _builder.default.getAvailableShortcuts(_lodash.default.get(context, 'instance.options.editForm', {}), _lodash.default.get(context, 'instance.options.editComponent', {}));
    }
  }
}, {
  type: 'checkbox',
  key: 'block',
  label: 'Block Button',
  input: true,
  weight: 155,
  tooltip: 'This control should span the full width of the bounding container.'
}, {
  type: 'checkbox',
  key: 'disableOnInvalid',
  label: 'Disable on Form Invalid',
  tooltip: 'This will disable this field if the form is invalid.',
  input: true,
  weight: 620
}];
exports.default = _default;