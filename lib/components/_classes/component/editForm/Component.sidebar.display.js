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
import _ from 'lodash';
export default [
    {
        key: 'previewHeading',
        type: 'htmlelement',
        input: false,
        tag: 'h4',
        content: 'Preview',
    },
    function (schema) { return (__assign(__assign({}, _.omit(schema, [
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
    ])), { key: 'preview' })); },
];
