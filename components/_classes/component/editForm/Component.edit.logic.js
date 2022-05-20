"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.object.assign.js");

var _utils = _interopRequireDefault(require("./utils"));

var _utils2 = require("../../../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable quotes, max-len */
var _default = [{
  weight: 0,
  input: true,
  label: 'Advanced Logic',
  key: 'logic',
  templates: {
    header: '<div class="row"> \n  <div class="col-sm-6">\n    <strong>{{ value.length }} {{ ctx.t("Advanced Logic Configured") }}</strong>\n  </div>\n</div>',
    row: '<div class="row"> \n  <div class="col-sm-6">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <button class="btn btn-default editRow">{{ ctx.t("Edit") }}</button> \n      <button class="btn btn-danger removeRow">{{ ctx.t("Delete") }}</button> \n    </div> \n  </div> \n</div>',
    footer: ''
  },
  type: 'editgrid',
  addAnother: 'Add Logic',
  saveRow: 'Save Logic',
  components: [{
    weight: 0,
    input: true,
    inputType: 'text',
    label: 'Logic Name',
    key: 'name',
    validate: {
      required: true
    },
    type: 'textfield'
  }, {
    weight: 10,
    key: 'triggerPanel',
    input: false,
    title: 'Trigger',
    tableView: false,
    components: [{
      weight: 0,
      input: true,
      tableView: false,
      components: [{
        weight: 0,
        input: true,
        label: 'Type',
        key: 'type',
        tableView: false,
        data: {
          values: [{
            value: 'simple',
            label: 'Simple'
          }, {
            value: 'javascript',
            label: 'Javascript'
          }, {
            value: 'json',
            label: 'JSON Logic'
          }, {
            value: 'event',
            label: 'Event'
          }]
        },
        dataSrc: 'values',
        template: '<span>{{ item.label }}</span>',
        type: 'select'
      }, {
        weight: 10,
        label: '',
        key: 'simple',
        type: 'container',
        tableView: false,
        customConditional: function customConditional(_ref) {
          var row = _ref.row;
          return row.type === 'simple';
        },
        components: [{
          input: true,
          key: 'show',
          label: 'Show',
          type: 'hidden',
          tableView: false,
          calculateValue: function calculateValue() {
            return true;
          }
        }, {
          type: 'select',
          input: true,
          label: 'When the form component:',
          key: 'when',
          dataSrc: 'custom',
          valueProperty: 'value',
          tableView: false,
          data: {
            custom: function custom(context) {
              return (0, _utils2.getContextComponents)(context);
            }
          }
        }, {
          type: 'textfield',
          input: true,
          label: 'Has the value:',
          key: 'eq',
          tableView: false
        }]
      }, {
        weight: 10,
        type: 'textarea',
        key: 'javascript',
        rows: 5,
        editor: 'ace',
        as: 'javascript',
        input: true,
        tableView: false,
        placeholder: "result = (data['mykey'] > 1);",
        description: '"row", "data", and "component" variables are available. Return "result".',
        customConditional: function customConditional(_ref2) {
          var row = _ref2.row;
          return row.type === 'javascript';
        }
      }, {
        weight: 10,
        type: 'textarea',
        key: 'json',
        rows: 5,
        editor: 'ace',
        label: 'JSON Logic',
        as: 'json',
        input: true,
        tableView: false,
        placeholder: "{ ... }",
        description: '"row", "data", "component" and "_" variables are available. Return the result to be passed to the action if truthy.',
        customConditional: function customConditional(_ref3) {
          var row = _ref3.row;
          return row.type === 'json';
        }
      }, {
        weight: 10,
        type: 'textfield',
        key: 'event',
        label: 'Event Name',
        placeholder: 'event',
        description: 'The event that will trigger this logic. You can trigger events externally or via a button.',
        tableView: false,
        customConditional: function customConditional(_ref4) {
          var row = _ref4.row;
          return row.type === 'event';
        }
      }],
      key: 'trigger',
      type: 'container'
    }],
    type: 'panel'
  }, {
    weight: 20,
    input: true,
    label: 'Actions',
    key: 'actions',
    tableView: false,
    templates: {
      header: '<div class="row"> \n  <div class="col-sm-6"><strong>{{ value.length }} {{ ctx.t("actions") }}</strong></div>\n</div>',
      row: '<div class="row"> \n  <div class="col-sm-6">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <button class="btn btn-default editRow">{{ ctx.t("Edit") }}</button> \n      <button class="btn btn-danger removeRow">{{ ctx.t("Delete") }}</button> \n    </div> \n  </div> \n</div>',
      footer: ''
    },
    type: 'editgrid',
    addAnother: 'Add Action',
    saveRow: 'Save Action',
    components: [{
      weight: 0,
      title: 'Action',
      input: false,
      key: 'actionPanel',
      type: 'panel',
      components: [{
        weight: 0,
        input: true,
        inputType: 'text',
        label: 'Action Name',
        key: 'name',
        validate: {
          required: true
        },
        type: 'textfield'
      }, {
        weight: 10,
        input: true,
        label: 'Type',
        key: 'type',
        data: {
          values: [{
            value: 'property',
            label: 'Property'
          }, {
            value: 'value',
            label: 'Value'
          }, {
            label: 'Merge Component Schema',
            value: 'mergeComponentSchema'
          }, {
            label: 'Custom Action',
            value: 'customAction'
          }]
        },
        dataSrc: 'values',
        template: '<span>{{ item.label }}</span>',
        type: 'select'
      }, {
        weight: 20,
        type: 'select',
        template: '<span>{{ item.label }}</span>',
        dataSrc: 'json',
        tableView: false,
        data: {
          json: [{
            label: 'Hidden',
            value: 'hidden',
            type: 'boolean'
          }, {
            label: 'Required',
            value: 'validate.required',
            type: 'boolean'
          }, {
            label: 'Disabled',
            value: 'disabled',
            type: 'boolean'
          }, {
            label: 'Label',
            value: 'label',
            type: 'string'
          }, {
            label: 'Title',
            value: 'title',
            type: 'string'
          }, {
            label: 'Prefix',
            value: 'prefix',
            type: 'string'
          }, {
            label: 'Suffix',
            value: 'suffix',
            type: 'string'
          }, {
            label: 'Tooltip',
            value: 'tooltip',
            type: 'string'
          }, {
            label: 'Description',
            value: 'description',
            type: 'string'
          }, {
            label: 'Placeholder',
            value: 'placeholder',
            type: 'string'
          }, {
            label: 'Input Mask',
            value: 'inputMask',
            type: 'string'
          }, {
            label: 'CSS Class',
            value: 'className',
            type: 'string'
          }, {
            label: 'Container Custom Class',
            value: 'customClass',
            type: 'string'
          }]
        },
        key: 'property',
        label: 'Component Property',
        input: true,
        customConditional: function customConditional(_ref5) {
          var row = _ref5.row;
          return row.type === 'property';
        }
      }, {
        weight: 30,
        input: true,
        label: 'Set State',
        key: 'state',
        tableView: false,
        data: {
          values: [{
            label: 'True',
            value: 'true'
          }, {
            label: 'False',
            value: 'false'
          }]
        },
        dataSrc: 'values',
        template: '<span>{{ item.label }}</span>',
        type: 'select',
        customConditional: function customConditional(_ref6) {
          var row = _ref6.row;
          return row.type === 'property' && row.hasOwnProperty('property') && row.property.type === 'boolean';
        }
      }, {
        weight: 30,
        type: 'textfield',
        key: 'text',
        label: 'Text',
        inputType: 'text',
        input: true,
        tableView: false,
        description: 'Can use templating with {{ data.myfield }}. "data", "row", "component" and "result" variables are available.',
        customConditional: function customConditional(_ref7) {
          var row = _ref7.row;
          return row.type === 'property' && row.hasOwnProperty('property') && row.property.type === 'string' && !row.property.component;
        }
      }, {
        weight: 20,
        input: true,
        label: 'Value (Javascript)',
        key: 'value',
        editor: 'ace',
        as: 'javascript',
        rows: 5,
        placeholder: "value = data.myfield;",
        type: 'textarea',
        tableView: false,
        description: '"row", "data", "component", and "result" variables are available. Return the value.',
        customConditional: function customConditional(_ref8) {
          var row = _ref8.row;
          return row.type === 'value';
        }
      }, {
        weight: 20,
        input: true,
        label: 'Schema Defenition',
        key: 'schemaDefinition',
        editor: 'ace',
        as: 'javascript',
        rows: 5,
        placeholder: "schema = { label: 'Updated' };",
        type: 'textarea',
        tableView: false,
        description: '"row", "data", "component", and "result" variables are available. Return the schema.',
        customConditional: function customConditional(_ref9) {
          var row = _ref9.row;
          return row.type === 'mergeComponentSchema';
        }
      }, Object.assign(_utils.default.logicVariablesTable('<tr><th>input</th><td>The value that was input into this component</td></tr>'), {
        customConditional: function customConditional(_ref10) {
          var row = _ref10.row;
          return row.type === 'customAction';
        }
      }), {
        weight: 20,
        input: true,
        label: 'Custom Action (Javascript)',
        key: 'customAction',
        editor: 'ace',
        rows: 5,
        placeholder: "value = data.myfield;",
        type: 'textarea',
        tableView: false,
        customConditional: function customConditional(_ref11) {
          var row = _ref11.row;
          return row.type === 'customAction';
        }
      }]
    }]
  }]
}];
/* eslint-enable quotes, max-len */

exports.default = _default;