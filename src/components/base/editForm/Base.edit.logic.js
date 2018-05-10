/* eslint-disable quotes, max-len */
export default [
  {
    input: true,
    label: 'Advanced Logic',
    key: 'logic',
    templates: {
      header: '<div class="row"> \n  <div class="col-sm-6">\n    <strong>{{ value.length }} Advanced Logic Configured</strong>\n  </div>\n</div>',
      row: '<div class="row"> \n  <div class="col-sm-6">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <div class="btn btn-default editRow">Edit</div> \n      <div class="btn btn-danger removeRow">Delete</div> \n    </div> \n  </div> \n</div>',
      footer: ''
    },
    type: 'editgrid',
    addAnother: 'Add Logic',
    saveRow: 'Save Logic',
    components: [
      {
        input: true,
        inputType: 'text',
        label: 'Logic Name',
        key: 'name',
        validate: {
          required: true,
        },
        type: 'textfield'
      },
      {
        key: 'triggerPanel',
        input: false,
        title: 'Trigger',
        components: [
          {
            input: true,
            components: [
              {
                input: true,
                label: 'Type',
                key: 'type',
                data: {
                  values: [
                    {
                      value: 'simple',
                      label: 'Simple'
                    },
                    {
                      value: 'javascript',
                      label: 'Javascript'
                    },
                    {
                      value: 'json',
                      label: 'JSON Logic'
                    }
                  ],
                },
                dataSrc: 'values',
                template: '<span>{{ item.label }}</span>',
                type: 'select',
              },
              {
                label: '',
                key: 'simple',
                type: 'container',
                customConditional: 'show = row.type === "simple";',
                components: [
                  {
                    input: true,
                    key: 'show',
                    label: 'Show',
                    type: 'hidden',
                    defaultValue: true
                  },
                  {
                    type: 'select',
                    input: true,
                    label: 'When the form component:',
                    key: 'conditional.when',
                    dataSrc: 'custom',
                    data: {
                      custom: `
                        utils.eachComponent(instance.root.editForm.components, function(component, path) {
                          if (component.key !== data.key) {
                            values.push({
                              label: component.label || component.key,
                              value: path
                            });
                          }
                        });
                      `
                    }
                  },
                  {
                    type: 'textfield',
                    input: true,
                    label: 'Has the value:',
                    key: 'eq'
                  }
                ]
              },
              {
                type: 'textarea',
                key: 'javascript',
                rows: 5,
                editor: 'ace',
                input: true,
                placeholder: `result = (data['mykey'] > 1);`,
                description: '"row", "data", and "component" variables are available. Return "result".',
                customConditional: 'show = row.type === "javascript";'
              },
              {
                type: 'textarea',
                key: 'json',
                rows: 5,
                editor: 'ace',
                label: 'JSON Logic',
                as: 'json',
                input: true,
                placeholder: `{ ... }`,
                description: '"row", "data", "component" and "_" variables are available. Return the result to be passed to the action if truthy.',
                customConditional: 'show = row.type === "json";',
              },
            ],
            key: 'trigger',
            type: 'container',
          }
        ],
        type: 'panel',
      },
      {
        input: true,
        label: 'Actions',
        key: 'actions',
        templates: {
          header: '<div class="row"> \n  <div class="col-sm-6"><strong>{{ value.length }} actions</strong></div>\n</div>',
          row: '<div class="row"> \n  <div class="col-sm-6">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <div class="btn btn-default editRow">Edit</div> \n      <div class="btn btn-danger removeRow">Delete</div> \n    </div> \n  </div> \n</div>',
          footer: ''
        },
        type: 'editgrid',
        addAnother: 'Add Action',
        saveRow: 'Save Action',
        components: [
          {
            title: 'Action',
            input: false,
            key: 'actionPanel',
            type: 'panel',
            components: [
              {
                input: true,
                inputType: 'text',
                label: 'Action Name',
                key: 'name',
                validate: {
                  required: true,
                },
                type: 'textfield',
              },
              {
                input: true,
                label: 'Type',
                key: 'type',
                data: {
                  values: [
                    {
                      value: 'property',
                      label: 'Property'
                    },
                    {
                      value: 'value',
                      label: 'Value'
                    },
                    {
                      label: 'Validation',
                      value: 'validation'
                    }
                  ],
                },
                dataSrc: 'values',
                template: '<span>{{ item.label }}</span>',
                type: 'select',
              },
              {

                type: 'select',
                template: '<span>{{ item.label }}</span>',
                dataSrc: 'json',
                data: {
                  json: [
                    {
                      label: 'Hidden',
                      value: 'hidden',
                      type: 'boolean'
                    },
                    {
                      label: 'required',
                      value: 'validation.required',
                      type: 'boolean'
                    },
                    {
                      label: 'Disabled',
                      value: 'disabled',
                      type: 'boolean'
                    },
                    {
                      label: 'label',
                      value: 'label',
                      type: 'string'
                    },
                    {
                      label: 'title',
                      value: 'title',
                      type: 'string'
                    },
                    {
                      label: 'Decription',
                      value: 'description',
                      type: 'string'
                    },
                    {
                      label: 'Paceholder',
                      value: 'placeholder',
                      type: 'string'
                    }
                  ],
                  values: []
                },
                key: 'property',
                label: 'Component Property',
                input: true,
                customConditional: 'show = row.type === "property";',
              },
              {
                input: true,
                label: 'Set State',
                key: 'state',
                data: {
                  values: [
                    {
                      label: 'True',
                      value: 'true'
                    },
                    {
                      label: 'False',
                      value: 'false'
                    }
                  ],
                },
                dataSrc: 'values',
                template: '<span>{{ item.label }}</span>',
                type: 'select',
                customConditional: 'show = row.type === "property" && row.hasOwnProperty("property") && row.property.type === "boolean";',
              },
              {
                type: 'textfield',
                key: 'text',
                label: 'Text',
                inputType: 'text',
                input: true,
                description: 'Can use templating with {{ data.myfield }}. "data", "row", "component" and "result" variables are available.',
                customConditional: 'show = row.type === "property" && row.hasOwnProperty("property") && row.property.type === "string";',
              },
              {
                input: true,
                label: 'Value (Javascript)',
                key: 'value',
                editor: 'ace',
                rows: 5,
                placeholder: `value = data.myfield;`,
                type: 'textarea',
                description: '"row", "data", "component", and "result" variables are available. Return the value.',
                customConditional: 'show = row.type === "value";',
              }
            ],
          }
        ],
      }
    ]
  }
];
/* eslint-enable quotes, max-len */
