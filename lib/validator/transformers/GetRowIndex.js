import { Transformer } from './Transformer';
export class GetRowIndexTransformer extends Transformer {
    static get name() {
        return 'getRowIndex';
    }
    static get title() {
        return 'Get Row Index';
    }
    static get optionsEditForm() {
        return [
            {
                label: 'Component',
                dataSrc: 'custom',
                data: {
                    custom({ instance }) {
                        return instance.root.arrayDataComponents;
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
        var _a, _b, _c, _d;
        const { component, } = opts;
        if (!component) {
            return (_a = value === null || value === void 0 ? void 0 : value.rowIndex) !== null && _a !== void 0 ? _a : null;
        }
        const rowIndexes = (_c = (_b = value === null || value === void 0 ? void 0 : value.getRowIndexes) === null || _b === void 0 ? void 0 : _b.call(value)) !== null && _c !== void 0 ? _c : {};
        return (_d = rowIndexes[component]) !== null && _d !== void 0 ? _d : null;
    }
}
