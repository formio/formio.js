import EditFormUtils from '../../_classes/component/editForm/utils';
export default [
    {
        key: 'labelPosition',
        ignore: true,
    },
    {
        key: 'placeholder',
        ignore: true,
    },
    {
        key: 'description',
        ignore: true,
    },
    {
        key: 'hideLabel',
        ignore: true,
    },
    {
        key: 'autofocus',
        ignore: true,
    },
    {
        key: 'label',
        hidden: true,
        calculateValue(context) {
            return context.data.title;
        },
    },
    {
        key: 'tabindex',
        hidden: true,
    },
    {
        weight: 1,
        type: 'textfield',
        input: true,
        placeholder: 'Panel Title',
        label: 'Title',
        key: 'title',
        tooltip: 'The title text that appears in the header of this panel.',
    },
    {
        weight: 20,
        type: 'textarea',
        input: true,
        key: 'tooltip',
        label: 'Tooltip',
        placeholder: 'To add a tooltip to this field, enter text here.',
        tooltip: 'Adds a tooltip to the side of this field.',
    },
    {
        weight: 30,
        type: 'select',
        input: true,
        label: 'Theme',
        key: 'theme',
        dataSrc: 'values',
        data: {
            values: [
                { label: 'Default', value: 'default' },
                { label: 'Primary', value: 'primary' },
                { label: 'Info', value: 'info' },
                { label: 'Success', value: 'success' },
                { label: 'Danger', value: 'danger' },
                { label: 'Warning', value: 'warning' },
            ],
        },
    },
    {
        weight: 40,
        type: 'fieldset',
        input: false,
        components: [
            {
                type: 'select',
                input: true,
                label: 'Breadcrumb Type',
                key: 'breadcrumb',
                dataSrc: 'values',
                data: {
                    values: [
                        { label: 'Default', value: 'default' },
                        { label: 'Condensed', value: 'condensed' },
                        { label: 'Hidden', value: 'none' },
                    ],
                },
            },
            {
                input: true,
                type: 'checkbox',
                label: 'Allow click on Breadcrumb',
                key: 'breadcrumbClickable',
                defaultValue: true,
                conditional: {
                    json: { '!==': [{ var: 'data.breadcrumb' }, 'none'] },
                },
            },
            {
                weight: 50,
                label: 'Panel Navigation Buttons',
                optionsLabelPosition: 'right',
                values: [
                    {
                        label: 'Previous',
                        value: 'previous',
                    },
                    {
                        label: 'Cancel',
                        value: 'cancel',
                    },
                    {
                        label: 'Next',
                        value: 'next',
                    },
                ],
                inline: true,
                type: 'selectboxes',
                key: 'buttonSettings',
                input: true,
                inputType: 'checkbox',
                defaultValue: {
                    previous: true,
                    cancel: true,
                    next: true,
                },
            },
        ],
        customConditional(context) {
            return context.instance.options.editForm.display === 'wizard';
        },
    },
    {
        weight: 650,
        type: 'checkbox',
        label: 'Collapsible',
        tooltip: 'If checked, this will turn this Panel into a collapsible panel.',
        key: 'collapsible',
        input: true,
    },
    {
        weight: 651,
        type: 'checkbox',
        label: 'Initially Collapsed',
        tooltip: 'Determines the initial collapsed state of this Panel.',
        key: 'collapsed',
        input: true,
        conditional: {
            json: { '===': [{ var: 'data.collapsible' }, true] },
        },
    },
    Object.assign(Object.assign({}, EditFormUtils.javaScriptValue('Advanced Next Page', 'nextPage', 1650, [
        {
            type: 'js',
            property: 'nextPage',
            example: (`
            <p>You must assign the <strong>next</strong> variable with the API key of the next page.</p>
            <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>
            <p>Also <strong>moment</strong> library is available, and allows you to manipulate dates in a convenient way.</p>
            <h5>Example</h5><pre>next = data.addComment ? 'page3' : 'page4';</pre>
          `),
        },
        {
            type: 'json',
            property: 'nextPage',
            example: (`
            <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>
          `),
        },
        {
            type: 'variable',
            property: 'nextPageConstant',
        },
    ])), { customConditional(context) {
            return context.instance.options.editForm.display === 'wizard';
        } }),
];
