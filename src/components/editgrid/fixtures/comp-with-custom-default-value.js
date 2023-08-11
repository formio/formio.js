export default {
  type: 'form',
  components: [
    {
      label: 'Selected Funds',
      conditionalAddButton: 'show = !instance.hasOpenRows();',
      tableView: false,
      templates: {
        header: "<div class=\"row\">\r\n  {% util.eachComponent(components, function(component) {\r\n    if (component.key === 'loadTypeFundCode') { %}\r\n      <div class=\"col-sm-2\">\r\n        <strong>Fund Code</strong>\r\n      </div>\r\n      <div class=\"col-sm-2\">\r\n        <strong>Load Type</strong>\r\n      </div>    \r\n    {% } else if (component.key !== 'fundClass') { \r\n      if (component.key === 'fundName2') { %}\r\n      <div class=\"col-sm-2\">\r\n      {% } else { %}\r\n      <div class=\"col-sm-2\">\r\n      {% } %}\r\n      <strong>{{ component.label }}</strong>\r\n      </div>\r\n      {% }\r\n  }) %}\r\n</div>",
        row: "<div class=\"row\">\r\n  {% console.dir(row);\r\n  util.eachComponent(components, function(component) { \r\n    if (component.key === 'loadTypeFundCode') { \r\n      var fundCode = '';\r\n      var loadType = '';\r\n      var item = component.data.values.find(item=>item.value==row[component.key]);\r\n      if (!!item) {\r\n\t      var itemParts = item.label.split('/');\r\n        loadType = itemParts [0];\r\n\t      if (itemParts.length > 1) { \r\n\t        fundCode = itemParts [1];\r\n        }\r\n      }\r\n    %}\r\n    <div class=\"col-sm-2\">{{ fundCode }}</div>\r\n    <div class=\"col-sm-2\">{{ loadType }}</div>\r\n    {% } else if (component.key !== 'fundClass') { \r\n      if (component.key === 'fundName2') { %}\r\n      <div class=\"col-sm-2\">\r\n      {% } else { %}\r\n      <div class=\"col-sm-2\">\r\n      {% } \r\n      if (!!component.data && !!Array.isArray(component.data.values)) { \r\n        var item = component.data.values.find(item=>item.value==row[component.key]);\r\n        if (!!item) { %}\r\n          {{item.label}}\r\n        {% } else { %}\r\n          {{ row[component.key] }}\r\n        {% } \r\n      } else { %}\r\n        {{ row[component.key] }}\r\n      {% } %}\r\n    </div>\r\n    {% }\r\n  }) %}\r\n  <div class=\"col-sm-2\">\r\n    <div class=\"btn-group pull-right\">\r\n      {% if (!instance.hasOpenRows()) { %}\r\n      <div class=\"btn btn-default btn-sm editRow\"><i class=\"fa fa-edit\"></i></div>\r\n      <div class=\"btn btn-danger btn-sm removeRow\"><i class=\"fa fa-trash\"></i></div>\r\n      {% } %}\r\n    </div>\r\n  </div>\r\n</div>"
      },
      addAnother: 'Add Another Fund',
      saveRow: 'Save Fund',
      inlineEdit: true,
      customDefaultValue: "value = [\n  {\n    fundClass: 'Class1',\n    fundName2: 'Name1',\n    loadTypeFundCode: 'dsc602',\n    allocationAmount2: 100\n  },\n  {\n    fundClass: 'Class2',\n    fundName2: 'Name2',\n    loadTypeFundCode: 'll1202',\n    allocationAmount2: 200\n  },\n  {\n    fundClass: 'Class3',\n    fundName2: 'Name2',\n    loadTypeFundCode: 'll1202',\n    allocationAmount2: 100\n  },\n  {\n    fundClass: 'Class3',\n    fundName2: 'Name2',\n    loadTypeFundCode: 'll1202',\n    allocationAmount2: 100\n  }  ,\n  {\n    fundClass: 'Class3',\n    fundName2: 'Name2',\n    loadTypeFundCode: 'll1202',\n    allocationAmount2: 100\n  }\n];",
      validate: {
        minLength: 1
      },
      rowDrafts: false,
      key: 'selectedFunds2',
      type: 'editgrid',
      input: true,
      components: [
        {
          label: 'Columns',
          columns: [
            {
              components: [
                {
                  label: 'Fund Class',
                  widget: 'choicesjs',
                  tableView: true,
                  dataSrc: 'custom',
                  data: {
                    custom: "values = ['Class1', 'Class2', 'Class3'];"
                  },
                  template: '<span>{{ item }}</span>',
                  validate: {
                    required: true
                  },
                  key: 'fundClass',
                  type: 'select',
                  input: true,
                  hideOnChildrenHidden: false
                }
              ],
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
              currentWidth: 6
            },
            {
              components: [
                {
                  label: 'Fund Name',
                  widget: 'choicesjs',
                  tableView: true,
                  dataSrc: 'custom',
                  data: {
                    custom: "values = ['Name1', 'Name2'];"
                  },
                  template: '<span>{{ item }}</span>',
                  validate: {
                    required: true
                  },
                  key: 'fundName2',
                  logic: [
                    {
                      name: 'Disable',
                      trigger: {
                        type: 'javascript',
                        javascript: "result = !row['fundClass'];"
                      },
                      actions: [
                        {
                          name: 'Disable',
                          type: 'property',
                          property: {
                            label: 'Disabled',
                            value: 'disabled',
                            type: 'boolean'
                          },
                          state: true
                        }
                      ]
                    }
                  ],
                  type: 'select',
                  input: true,
                  hideOnChildrenHidden: false
                }
              ],
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
              currentWidth: 6
            }
          ],
          key: 'columns1',
          type: 'columns',
          tableView: false,
          input: false,
          hideOnChildrenHidden: false
        },
        {
          label: 'Columns',
          columns: [
            {
              components: [
                {
                  label: 'Load Type / Fund Code',
                  widget: 'choicesjs',
                  tableView: true,
                  data: {
                    values: [
                      {
                        label: 'DSC/602',
                        value: 'dsc602'
                      },
                      {
                        label: 'NL/702',
                        value: 'nl702'
                      },
                      {
                        label: 'LL/1202',
                        value: 'll1202'
                      },
                      {
                        label: 'NL-CB/3002',
                        value: 'nlCb3002'
                      },
                      {
                        label: 'NL-CB5/5002',
                        value: 'nlCb55002'
                      }
                    ]
                  },
                  refreshOn: 'editGrid1.fundName2',
                  validate: {
                    required: true
                  },
                  key: 'loadTypeFundCode',
                  logic: [
                    {
                      name: 'Disable',
                      trigger: {
                        type: 'javascript',
                        javascript: "result = !row['fundName2'];"
                      },
                      actions: [
                        {
                          name: 'Disable',
                          type: 'property',
                          property: {
                            label: 'Disabled',
                            value: 'disabled',
                            type: 'boolean'
                          },
                          state: true
                        }
                      ]
                    }
                  ],
                  type: 'select',
                  input: true,
                  hideOnChildrenHidden: false
                }
              ],
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
              currentWidth: 6
            },
            {
              components: [
                {
                  label: 'Amount',
                  mask: false,
                  spellcheck: true,
                  tableView: false,
                  currency: 'USD',
                  inputFormat: 'plain',
                  validate: {
                    required: true
                  },
                  key: 'allocationAmount2',
                  type: 'currency',
                  input: true,
                  delimiter: true,
                  hideOnChildrenHidden: false
                }
              ],
              width: 6,
              offset: 0,
              push: 0,
              pull: 0,
              size: 'md',
              currentWidth: 6
            }
          ],
          key: 'columns',
          type: 'columns',
          input: false,
          tableView: false,
          hideOnChildrenHidden: false
        }
      ]
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false
    }
  ],
  display: 'form',
};
