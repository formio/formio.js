"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Component = _interopRequireDefault(require("../../components/_classes/component/Component.form"));

var _EditTableEdit = _interopRequireDefault(require("./editForm/EditTable.edit.display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Component.default.apply(void 0, [[{
    key: 'display',
    components: _EditTableEdit.default
  }, {
    key: 'data',
    components: [{
      key: 'defaultValue',
      ignore: true
    }, {
      label: '',
      mask: false,
      tableView: true,
      alwaysEnabled: false,
      type: 'hidden',
      input: true,
      key: 'disableAddingRemovingRows',
      calculateValue: function calculateValue(context) {
        return context.instance.data.enableRowGroups;
      },
      encrypted: false
    }, {
      key: 'enableRowGroups',
      type: 'checkbox',
      label: 'Enable Row Groups',
      weight: 50
    }, {
      label: 'Groups',
      disableAddingRemovingRows: false,
      defaultOpen: false,
      addAnother: '',
      addAnotherPosition: 'bottom',
      mask: false,
      tableView: true,
      alwaysEnabled: false,
      type: 'datagrid',
      input: true,
      key: 'rowGroups',
      reorder: true,
      components: [{
        label: 'Label',
        allowMultipleMasks: false,
        showWordCount: false,
        showCharCount: false,
        tableView: true,
        alwaysEnabled: false,
        type: 'textfield',
        input: true,
        key: 'label',
        widget: {
          type: ''
        },
        row: '0-0'
      }, {
        label: 'Number of Rows',
        mask: false,
        tableView: true,
        alwaysEnabled: false,
        type: 'number',
        input: true,
        key: 'numberOfRows',
        row: '0-1'
      }],
      weight: 51,
      conditional: {
        json: {
          var: 'data.enableRowGroups'
        }
      }
    }]
  }]].concat(extend));
}