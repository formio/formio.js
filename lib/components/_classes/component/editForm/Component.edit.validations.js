var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import EditFormUtils from './utils';
export default [
    {
        label: 'Validations',
        key: 'validations',
        input: true,
        type: 'editgrid',
        inlineEdit: true,
        templates: {
            header: ("<div class=\"row\">\n          <div class=\"col-sm-6\">Description</div>\n          <div class=\"col-sm-2\">Group</div>\n          <div class=\"col-sm-2\">Severity</div>\n          <div class=\"col-sm-2\">Actions</div>\n        </div>"),
            row: ("<div class=\"row\">\n          <div class=\"col-sm-6\">{{ row.description ? row.description : flattenedComponents.condition.getView(row.condition) }}</div>\n          <div class=\"col-sm-2\">{{ row.group }}</div>\n          <div class=\"col-sm-2\">{{ flattenedComponents.severity.getView(row.severity) }}</div>\n          <div class=\"col-sm-2\">\n            <button class=\"btn btn-default btn-light btn-sm editRow\">Edit</button>\n            <button class=\"btn btn-danger btn-sm removeRow\">Delete</button>\n          </div>\n        </div>"),
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
            __assign(__assign({}, EditFormUtils.conditionSelector()), { validate: {
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
