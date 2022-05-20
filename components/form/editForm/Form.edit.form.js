"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.to-string.js");

var _default = [{
  type: 'select',
  input: true,
  dataSrc: 'url',
  data: {
    url: '/form?limit=4294967295&select=_id,title,display'
  },
  searchField: 'title__regex',
  template: '<span>{{ item.title }}</span>',
  valueProperty: '_id',
  authenticate: true,
  label: 'Form',
  key: 'form',
  weight: 10,
  lazyLoad: false,
  tooltip: 'The form to load within this form component.',
  validate: {
    required: true
  }
}, {
  label: 'Lazy Load',
  inputType: 'checkbox',
  defaultValue: true,
  clearOnHide: true,
  errorLabel: '',
  key: 'lazyLoad',
  type: 'checkbox',
  tooltip: 'if it is checked, the subform is loaded after navigation to the page with this component within the wizard.',
  input: true,
  customConditional: function customConditional(_ref) {
    var _instance$root, _instance$root$getCom, _instance$options, _instance$options$edi;

    var instance = _ref.instance,
        data = _ref.data;
    var formInfo = (_instance$root = instance.root) === null || _instance$root === void 0 ? void 0 : (_instance$root$getCom = _instance$root.getComponent('form')) === null || _instance$root$getCom === void 0 ? void 0 : _instance$root$getCom.defaultDownloadedResources.find(function (res) {
      return res._id === data.form;
    });
    var displayMode = 'wizard';
    return ((_instance$options = instance.options) === null || _instance$options === void 0 ? void 0 : (_instance$options$edi = _instance$options.editForm) === null || _instance$options$edi === void 0 ? void 0 : _instance$options$edi.display) === displayMode && formInfo && formInfo.display !== displayMode;
  }
}, {
  type: 'textfield',
  input: true,
  label: 'Form Revision',
  placeholder: 'Current',
  tooltip: 'You can lock the nested form to a specific revision by entering the revision number here.',
  key: 'revision',
  weight: 11
}, {
  type: 'checkbox',
  input: true,
  weight: 19,
  key: 'useOriginalRevision',
  label: 'Use Original Revision while Submissions Viewing',
  tooltip: 'Using this option will make form load the original revision (the one which was used to make a submission) when viewing a submission.'
}, {
  type: 'checkbox',
  input: true,
  weight: 20,
  key: 'reference',
  label: 'Save as reference',
  tooltip: 'Using this option will save this field as a reference and link its value to the value of the origin record.'
}];
exports.default = _default;