import EditFormUtils from './utils';
export default [
    {
        label: 'Validations',
        key: 'validations',
        input: true,
        type: 'editgrid',
        inlineEdit: true,
        templates: {
            header: (`<div class="row">
          <div class="col-sm-6">Description</div>
          <div class="col-sm-2">Group</div>
          <div class="col-sm-2">Severity</div>
          <div class="col-sm-2">Actions</div>
        </div>`),
            row: (`<div class="row">
          <div class="col-sm-6">{{ row.description ? row.description : flattenedComponents.condition.getView(row.condition) }}</div>
          <div class="col-sm-2">{{ row.group }}</div>
          <div class="col-sm-2">{{ flattenedComponents.severity.getView(row.severity) }}</div>
          <div class="col-sm-2">
            <button class="btn btn-default btn-light btn-sm editRow">Edit</button>
            <button class="btn btn-danger btn-sm removeRow">Delete</button>
          </div>
        </div>`),
        },
        addAnother: 'Add Validation',
        saveRow: 'Save Validation',
        components: [
            {
                type: 'checkbox',
                label: 'Active',
                key: 'active',
                input: true,
                defaultValue: true,
            },
            Object.assign(Object.assign({}, EditFormUtils.conditionSelector()), { validate: {
                    required: true,
                } }),
            {
                type: 'textfield',
                label: 'Group',
                key: 'group',
                input: true,
            },
            {
                type: 'textfield',
                label: 'Description',
                key: 'description',
                input: true,
            },
            {
                type: 'radio',
                label: 'Severity',
                key: 'severity',
                inline: true,
                input: true,
                values: [
                    {
                        label: 'Error',
                        value: 'error',
                    },
                    {
                        label: 'Warning',
                        value: 'warning',
                    },
                    {
                        label: 'Info',
                        value: 'info',
                    },
                ],
                validate: {
                    required: true,
                },
            },
            {
                type: 'textfield',
                label: 'Message',
                key: 'message',
                input: true,
            },
        ],
    },
];
