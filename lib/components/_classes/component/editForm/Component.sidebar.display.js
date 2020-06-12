import _ from 'lodash';
export default [
    {
        key: 'previewHeading',
        type: 'htmlelement',
        input: false,
        tag: 'h4',
        content: 'Preview',
    },
    (schema) => (Object.assign(Object.assign({}, _.omit(schema, [
        'hidden',
        'conditional',
        'customDefaultValue',
        'customDefaultValueVariable',
        'calculateValue',
        'calculateValueVariable',
        'logic',
        'autofocus',
        'customConditional',
        'validations',
    ])), { key: 'preview' })),
];
