"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  type: 'select',
  input: true,
  key: 'displayInTimezone',
  label: 'Display in Timezone',
  tooltip: 'This will display the captured date time in the select timezone.',
  weight: 30,
  defaultValue: 'viewer',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'of Viewer',
      value: 'viewer'
    }, {
      label: 'of Submission',
      value: 'submission'
    }, {
      label: 'of Location',
      value: 'location'
    }, {
      label: 'UTC',
      value: 'utc'
    }]
  }
}, {
  type: 'select',
  input: true,
  key: 'timezone',
  label: 'Select Timezone',
  tooltip: 'Select the timezone you wish to display this Date',
  weight: 31,
  lazyLoad: true,
  defaultValue: '',
  valueProperty: 'name',
  dataSrc: 'url',
  data: {
    url: 'https://cdn.form.io/timezones.json'
  },
  template: '<span>{{ item.label }}</span>',
  conditional: {
    json: {
      '===': [{
        var: 'data.displayInTimezone'
      }, 'location']
    }
  }
}, {
  type: 'checkbox',
  input: true,
  key: 'useLocaleSettings',
  label: 'Use Locale Settings',
  tooltip: 'Use locale settings to display date and time.',
  weight: 51
}, {
  type: 'checkbox',
  input: true,
  key: 'allowInput',
  label: 'Allow Manual Input',
  tooltip: 'Check this if you would like to allow the user to manually enter in the date.',
  weight: 51
}, {
  type: 'textfield',
  input: true,
  key: 'format',
  label: 'Format',
  placeholder: 'Format',
  description: 'Use formats provided by <a href="https://github.com/angular-ui/bootstrap/tree/master/src/dateparser/docs#uibdateparsers-format-codes" target="_blank">DateParser Codes</a>',
  tooltip: 'The date format for displaying the datetime value.',
  weight: 52
}, {
  type: 'editgrid',
  input: true,
  key: 'shortcutButtons',
  label: 'Shortcut Buttons',
  description: 'You can specify few buttons which will be shown above the calendar. Use Label to specify the name of the button and onClick to specify which date/time will be set when user clicks the button. E.g, date = new Date()',
  templates: {
    header: '<div class="row">\n  <div class="col-sm-3">Label</div>\n  <div class="col-sm-6">onClick</div>\n</div>',
    row: '<div class="row">\n      <div class="col-sm-3">\n        {{ flattenedComponents.label.getView(row.label) }}\n      </div>\n      <div class="col-sm-6">\n        {{ flattenedComponents.onClick.getView(row.onClick) }}\n      </div>\n      {% if (!instance.disabled) { %}\n        <div class="col-sm-3">\n          <div class="btn-group pull-right">\n            <button class="btn btn-default btn-light btn-sm editRow"><i class="{{ iconClass("edit") }}"></i></button>\n            {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n              <button class="btn btn-danger btn-sm removeRow"><i class="{{ iconClass("trash") }}"></i></button>\n            {% } %}\n          </div>\n        </div>\n      {% } %}\n    </div>'
  },
  components: [{
    label: 'Label',
    key: 'label',
    type: 'textfield',
    input: true,
    validate: {
      required: true
    }
  }, {
    label: 'onClick',
    key: 'onClick',
    type: 'textarea',
    editor: 'ace',
    input: true,
    validate: {
      required: true
    }
  }],
  defaultValue: []
}];
exports.default = _default;