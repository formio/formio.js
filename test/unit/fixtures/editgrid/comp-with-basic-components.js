export default {
  type: 'form',
  owner: '5e05a6b7549cdc2ece30c6b0',
  components: [
    {
      label: 'Edit Grid Basic Drafts Enabled Modal',
      tableView: true,
      templates: {
        header: "<div class=\"row\">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n          <div class=\"col-sm-2\">{{ component.label }}</div>\n        {% } %}\n      {% }) %}\n    </div>",
        row: "<div class=\"row\">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n          <div class=\"col-sm-2\">\n            {{ getView(component, row[component.key]) }}\n          </div>\n        {% } %}\n      {% }) %}\n      {% if (!instance.disabled) { %}\n        <div class=\"col-sm-2\">\n          <div class=\"btn-group pull-right\">\n            <button class=\"btn btn-default btn-light btn-sm editRow\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n            {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n              <button class=\"btn btn-danger btn-sm removeRow\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n            {% } %}\n          </div>\n        </div>\n      {% } %}\n    </div>"
      },
      modal: true,
      key: 'editGridBasic2',
      type: 'editgrid',
      input: true,
      components: [
        {
          label: 'Text Field',
          tableView: true,
          validate: {
            required: true
          },
          key: 'textField',
          type: 'textfield',
          input: true
        },
        {
          label: 'Text Area',
          autoExpand: false,
          tableView: true,
          validate: {
            required: true
          },
          key: 'textArea',
          type: 'textarea',
          input: true
        },
        {
          label: 'Number',
          mask: false,
          spellcheck: true,
          tableView: true,
          delimiter: false,
          requireDecimal: false,
          inputFormat: 'plain',
          validate: {
            required: true
          },
          key: 'number',
          type: 'number',
          input: true
        },
        {
          label: 'Password',
          tableView: true,
          validate: {
            required: true
          },
          key: 'password',
          type: 'password',
          input: true,
          protected: true
        },
        {
          label: 'Checkbox',
          tableView: true,
          defaultValue: false,
          validate: {
            required: true
          },
          key: 'checkbox',
          type: 'checkbox',
          input: true
        },
        {
          label: 'Select Boxes',
          optionsLabelPosition: 'right',
          tableView: true,
          defaultValue: {
            '': false,
            sa: false,
            sb: false,
            sc: false
          },
          values: [
            {
              label: 'sa',
              value: 'sa',
              shortcut: ''
            },
            {
              label: 'sb',
              value: 'sb',
              shortcut: ''
            },
            {
              label: 'sc',
              value: 'sc',
              shortcut: ''
            }
          ],
          validate: {
            required: true
          },
          key: 'selectBoxes1',
          type: 'selectboxes',
          input: true,
          inputType: 'checkbox'
        },
        {
          label: 'Select',
          widget: 'choicesjs',
          tableView: true,
          data: {
            values: [
              {
                label: 'se1',
                value: 'se1'
              },
              {
                label: 'se2',
                value: 'se2'
              },
              {
                label: 'se3',
                value: 'se3'
              }
            ]
          },
          selectThreshold: 0.3,
          validate: {
            required: true
          },
          key: 'select1',
          type: 'select',
          indexeddb: {
            filter: {

            }
          },
          input: true
        },
        {
          label: 'Select URL',
          widget: 'choicesjs',
          tableView: true,
          dataSrc: 'url',
          data: {
            values: [
              {
                label: '',
                value: ''
              }
            ],
            url: 'https://cdn.rawgit.com/mshafrir/2646763/raw/states_titlecase.json',
            headers: [
              {
                key: '',
                value: ''
              }
            ]
          },
          template: '<span>{{ item.name }}</span>',
          selectThreshold: 0.3,
          validate: {
            required: true
          },
          key: 'selectUrl',
          type: 'select',
          indexeddb: {
            filter: {

            }
          },
          input: true,
          disableLimit: false
        },
        {
          label: 'Radio',
          optionsLabelPosition: 'right',
          inline: false,
          tableView: true,
          values: [
            {
              label: 'ra1',
              value: 'ra1',
              shortcut: ''
            },
            {
              label: 'ra2',
              value: 'ra2',
              shortcut: ''
            },
            {
              label: 'ra3',
              value: 'ra3',
              shortcut: ''
            }
          ],
          validate: {
            required: true,
            onlyAvailableItems: false
          },
          key: 'radio1',
          type: 'radio',
          input: true
        }
      ]
    },
    {
      label: 'Submit',
      showValidations: false,
      tableView: false,
      key: 'submit',
      type: 'button',
      input: true
    }
  ],
  title: 'Test EG 2',
  display: 'form',
  name: 'testEg2',
};
