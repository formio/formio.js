import { getContextComponents } from '../../../../utils/utils';

/* eslint-disable quotes, max-len */
export default [
  {
    weight: 0,
    input: true,
    label: 'Advanced Logic',
    key: 'logic',
    templates: {
      header: '<div class="row"> \n  <div class="col-sm-6">\n    <strong>{{ value.length }} Advanced Logic Configured</strong>\n  </div>\n</div>',
      row: '<div class="row"> \n  <div class="col-sm-6">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <div class="btn btn-default editRow">Edit</div> \n      <div class="btn btn-danger removeRow">Delete</div> \n    </div> \n  </div> \n</div>',
      footer: '',
    },
    type: 'editgrid',
    addAnother: 'Add Logic',
    saveRow: 'Save Logic',
    components: [
      {
        weight: 0,
        input: true,
        inputType: 'text',
        label: 'Logic Name',
        key: 'name',
        validate: {
          required: true,
        },
        type: 'textfield',
      },
      {
        weight: 10,
        key: 'triggerPanel',
        input: false,
        title: 'Trigger',
        tableView: false,
        components: [
          {
            weight: 0,
            input: true,
            tableView: false,
            components: [
              {
                weight: 0,
                input: true,
                label: 'Type',
                key: 'type',
                tableView: false,
                data: {
                  values: [
                    {
                      value: 'simple',
                      label: 'Simple',
                    },
                    {
                      value: 'javascript',
                      label: 'Javascript',
                    },
                    {
                      value: 'json',
                      label: 'JSON Logic',
                    },
                    {
                      value: 'event',
                      label: 'Event',
                    },
                  ],
                },
                dataSrc: 'values',
                template: '<span>{{ item.label }}</span>',
                type: 'select',
              },
              {
                weight: 10,
                label: '',
                key: 'simple',
                type: 'container',
                tableView: false,
                customConditional({ row }) {
                  return row.type === 'simple';
                },
                components: [
                  {
                    input: true,
                    key: 'show',
                    label: 'Show',
                    type: 'hidden',
                    tableView: false,
                    calculateValue() {
                      return true;
                    },
                  },
                  {
                    type: 'select',
                    input: true,
                    label: 'When the form component:',
                    key: 'when',
                    dataSrc: 'custom',
                    valueProperty: 'value',
                    tableView: false,
                    data: {
                      custom(context) {
                        return getContextComponents(context);
                      },
                    },
                  },
                  {
                    type: 'textfield',
                    input: true,
                    label: 'Has the value:',
                    key: 'eq',
                    tableView: false,
                  },
                ],
              },
              {
                weight: 10,
                type: 'textarea',
                key: 'javascript',
                rows: 5,
                editor: 'ace',
                input: true,
                tableView: false,
                placeholder: `result = (data['mykey'] > 1);`,
                description: '"row", "data", and "component" variables are available. Return "result".',
                customConditional({ row }) {
                  return row.type === 'javascript';
                },
              },
              {
                weight: 10,
                type: 'textarea',
                key: 'json',
                rows: 5,
                editor: 'ace',
                label: 'JSON Logic',
                as: 'json',
                input: true,
                tableView: false,
                placeholder: `{ ... }`,
                description: '"row", "data", "component" and "_" variables are available. Return the result to be passed to the action if truthy.',
                customConditional({ row }) {
                  return row.type === 'json';
                },
              },
              {
                weight: 10,
                type: 'textfield',
                key: 'event',
                label: 'Event Name',
                placeholder: 'event',
                description: 'The event that will trigger this logic. You can trigger events externally or via a button.',
                tableView: false,
                customConditional({ row }) {
                  return row.type === 'event';
                },
              },
            ],
            key: 'trigger',
            type: 'container',
          },
        ],
        type: 'panel',
      },
      {
        weight: 20,
        input: true,
        label: 'Actions',
        key: 'actions',
        tableView: false,
        templates: {
          header: '<div class="row"> \n  <div class="col-sm-6"><strong>{{ value.length }} actions</strong></div>\n</div>',
          row: '<div class="row"> \n  <div class="col-sm-6">\n    <div>{{ row.name }} </div>\n  </div>\n  <div class="col-sm-2"> \n    <div class="btn-group pull-right"> \n      <div class="btn btn-default editRow">Edit</div> \n      <div class="btn btn-danger removeRow">Delete</div> \n    </div> \n  </div> \n</div>',
          footer: '',
        },
        type: 'editgrid',
        addAnother: 'Add Action',
        saveRow: 'Save Action',
        components: [
          {
            weight: 0,
            title: 'Action',
            input: false,
            key: 'actionPanel',
            type: 'panel',
            components: [
              {
                weight: 0,
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
                weight: 10,
                input: true,
                label: 'Type',
                key: 'type',
                data: {
                  values: [
                    {
                      value: 'property',
                      label: 'Property',
                    },
                    {
                      value: 'value',
                      label: 'Value',
                    },
                    {
                      label: 'Merge Component Schema',
                      value: 'mergeComponentSchema',
                    },
                  ],
                },
                dataSrc: 'values',
                template: '<span>{{ item.label }}</span>',
                type: 'select',
              },
              {
                weight: 20,
                type: 'select',
                template: '<span>{{ item.label }}</span>',
                dataSrc: 'json',
                tableView: false,
                data: {
                  json: [
                    {
                      label: 'Hidden',
                      value: 'hidden',
                      type: 'boolean',
                    },
                    {
                      label: 'Required',
                      value: 'validate.required',
                      type: 'boolean',
                    },
                    {
                      label: 'Disabled',
                      value: 'disabled',
                      type: 'boolean',
                    },
                    {
                      label: 'Label',
                      value: 'label',
                      type: 'string',
                    },
                    {
                      label: 'Title',
                      value: 'title',
                      type: 'string',
                    },
                    {
                      label: 'Prefix',
                      value: 'prefix',
                      type: 'string',
                    },
                    {
                      label: 'Suffix',
                      value: 'suffix',
                      type: 'string',
                    },
                    {
                      label: 'Tooltip',
                      value: 'tooltip',
                      type: 'string',
                    },
                    {
                      label: 'Description',
                      value: 'description',
                      type: 'string',
                    },
                    {
                      label: 'Placeholder',
                      value: 'placeholder',
                      type: 'string',
                    },
                    {
                      label: 'Input Mask',
                      value: 'inputMask',
                      type: 'string',
                    },
                    {
                      label: 'CSS Class',
                      value: 'className',
                      type: 'string',
                    },
                    {
                      label: 'Container Custom Class',
                      value: 'customClass',
                      type: 'string',
                    },
                  ],
                },
                key: 'property',
                label: 'Component Property',
                input: true,
                customConditional({ row }) {
                  return row.type === 'property';
                },
              },
              {
                weight: 30,
                input: true,
                label: 'Set State',
                key: 'state',
                tableView: false,
                data: {
                  values: [
                    {
                      label: 'True',
                      value: 'true',
                    },
                    {
                      label: 'False',
                      value: 'false',
                    },
                  ],
                },
                dataSrc: 'values',
                template: '<span>{{ item.label }}</span>',
                type: 'select',
                customConditional({ row }) {
                  return row.type === 'property' &&
                    row.hasOwnProperty('property') &&
                    row.property.type === 'boolean';
                },
              },
              {
                weight: 30,
                type: 'textfield',
                key: 'text',
                label: 'Text',
                inputType: 'text',
                input: true,
                tableView: false,
                description: 'Can use templating with {{ data.myfield }}. "data", "row", "component" and "result" variables are available.',
                customConditional({ row }) {
                  return row.type === 'property' &&
                    row.hasOwnProperty('property') &&
                    row.property.type === 'string' &&
                    !row.property.component;
                },
              },
              {
                weight: 20,
                input: true,
                label: 'Value (Javascript)',
                key: 'value',
                editor: 'ace',
                rows: 5,
                placeholder: `value = data.myfield;`,
                type: 'textarea',
                tableView: false,
                description: '"row", "data", "component", and "result" variables are available. Return the value.',
                customConditional({ row }) {
                  return row.type === 'value';
                },
              },
              {
                weight: 20,
                input: true,
                label: 'Schema Defenition',
                key: 'schemaDefinition',
                editor: 'ace',
                rows: 5,
                placeholder: `schema = { label: 'Updated' };`,
                type: 'textarea',
                tableView: false,
                description: '"row", "data", "component", and "result" variables are available. Return the schema.',
                customConditional({ row }) {
                  return row.type === 'mergeComponentSchema';
                },
              },
            ],
          },
        ],
      },
    ],
  },
];
/* eslint-enable quotes, max-len */
