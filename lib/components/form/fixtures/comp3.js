"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  type: 'form',
  tags: [],
  components: [{
    type: 'panel',
    title: 'Page 1',
    isNew: false,
    components: [{
      autofocus: false,
      input: true,
      tableView: true,
      inputType: 'text',
      inputMask: '',
      label: 'Text',
      key: 'page1Text',
      placeholder: '',
      prefix: '',
      suffix: '',
      multiple: false,
      defaultValue: '',
      protected: false,
      unique: false,
      persistent: true,
      hidden: false,
      clearOnHide: true,
      spellcheck: true,
      validate: {
        required: false,
        minLength: '',
        maxLength: '',
        pattern: '',
        custom: '',
        customPrivate: false
      },
      conditional: {
        show: '',
        when: null,
        eq: ''
      },
      type: 'textfield',
      labelPosition: 'top',
      inputFormat: 'plain',
      tags: [],
      properties: {}
    }],
    input: false,
    key: 'page1',
    clearOnHide: false,
    theme: 'default',
    tableView: false,
    hideLabel: false
  }, {
    type: 'panel',
    title: 'Page 2',
    isNew: false,
    components: [{
      autofocus: false,
      input: true,
      tableView: true,
      inputType: 'number',
      label: 'Number',
      key: 'page2Number',
      placeholder: '',
      prefix: '',
      suffix: '',
      defaultValue: '',
      protected: false,
      persistent: true,
      hidden: false,
      clearOnHide: true,
      validate: {
        required: false,
        min: '',
        max: '',
        step: 'any',
        integer: '',
        multiple: '',
        custom: ''
      },
      type: 'number',
      labelPosition: 'top',
      tags: [],
      conditional: {
        show: '',
        when: null,
        eq: ''
      },
      properties: {}
    }],
    input: false,
    key: 'page2',
    clearOnHide: false,
    theme: 'default',
    tableView: false,
    hideLabel: false
  }, {
    type: 'panel',
    title: 'Page 3',
    isNew: false,
    components: [{
      autofocus: false,
      input: true,
      inputType: 'checkbox',
      tableView: true,
      label: 'Hola',
      dataGridLabel: false,
      key: 'page3Hola',
      defaultValue: false,
      protected: false,
      persistent: true,
      hidden: false,
      name: '',
      value: '',
      clearOnHide: true,
      validate: {
        required: false
      },
      type: 'checkbox',
      labelPosition: 'right',
      hideLabel: false,
      tags: [],
      conditional: {
        show: '',
        when: null,
        eq: ''
      },
      properties: {}
    }],
    input: false,
    key: 'page3',
    clearOnHide: false,
    theme: 'default',
    tableView: false,
    hideLabel: false
  }, {
    autofocus: false,
    input: true,
    label: 'Submit',
    tableView: false,
    key: 'submit',
    size: 'md',
    leftIcon: '',
    rightIcon: '',
    block: false,
    action: 'submit',
    disableOnInvalid: false,
    theme: 'primary',
    type: 'button'
  }],
  revisions: '',
  title: 'Wiizard',
  display: 'wizard',
  submissionAccess: [],
  settings: {},
  name: 'wiizard',
  path: 'wiizard'
};
exports.default = _default;