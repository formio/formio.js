import { Transformer } from './Transformer';
export class GetRowTransformer extends Transformer {
    static get title() {
        return 'Get Row';
    }
    static get name() {
        return 'getRow';
    }
    static get optionsEditForm() {
        return [
            {
                label: 'Component',
                dataSrc: 'custom',
                data: {
                    custom({ instance }) {
                        return instance.root.nestedDataComponents;
                    },
                },
                valueProperty: 'path',
                dataType: 'string',
                template: '<span>{{ item.component.label || item.component.key }} ({{ item.component.key }})</span>',
                key: 'component',
                type: 'select',
                input: true,
            },
        ];
    }
    transform(value, args, opts) {
        var _a, _b;
        const { component, } = opts;
        if (!component) {
            return (_a = value === null || value === void 0 ? void 0 : value.data) !== null && _a !== void 0 ? _a : null;
        }
        let current = value;
        while ((current === null || current === void 0 ? void 0 : current.parent) && (current.parent.path !== component)) {
            current = current.parent;
        }
        return (_b = current === null || current === void 0 ? void 0 : current.data) !== null && _b !== void 0 ? _b : null;
    }
}
