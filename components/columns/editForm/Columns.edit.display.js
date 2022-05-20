"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  key: 'labelPosition',
  ignore: true
}, {
  key: 'placeholder',
  ignore: true
}, {
  key: 'description',
  ignore: true
}, {
  key: 'tooltip',
  ignore: true
}, {
  key: 'autofocus',
  ignore: true
}, {
  key: 'tabindex',
  ignore: true
}, {
  key: 'disabled',
  ignore: true
}, {
  key: 'tableView',
  ignore: true
}, {
  weight: 150,
  type: 'datagrid',
  input: true,
  key: 'columns',
  label: 'Column Properties',
  addAnother: 'Add Column',
  tooltip: 'The width, offset, push, and pull settings for each column.',
  reorder: true,
  components: [{
    type: 'hidden',
    key: 'components',
    defaultValue: []
  }, {
    type: 'select',
    key: 'size',
    defaultValue: 'md',
    label: 'Size',
    data: {
      values: [{
        label: 'xs',
        value: 'xs'
      }, {
        label: 'sm',
        value: 'sm'
      }, {
        label: 'md',
        value: 'md'
      }, {
        label: 'lg',
        value: 'lg'
      }, {
        label: 'xl',
        value: 'xl'
      }]
    }
  }, {
    type: 'number',
    key: 'width',
    defaultValue: 6,
    label: 'Width'
  }, {
    type: 'number',
    key: 'offset',
    defaultValue: 0,
    label: 'Offset'
  }, {
    type: 'number',
    key: 'push',
    defaultValue: 0,
    label: 'Push'
  }, {
    type: 'number',
    key: 'pull',
    defaultValue: 0,
    label: 'Pull'
  }]
}, {
  weight: 160,
  type: 'checkbox',
  label: 'Auto adjust columns',
  tooltip: 'Will automatically adjust columns based on if nested components are hidden.',
  key: 'autoAdjust',
  input: true
}];
exports.default = _default;