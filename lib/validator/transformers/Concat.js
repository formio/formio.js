import { Transformer } from './Transformer';
export class ConcatTransformer extends Transformer {
    static get title() {
        return 'Concat';
    }
    static get name() {
        return 'concat';
    }
    static get arguments() {
        return [
            {
                name: 'Value To Add',
                key: 'valueToAdd',
                required: true,
            },
        ];
    }
    transform(value, args) {
        var _a;
        const { valueToAdd, } = args;
        return (_a = value === null || value === void 0 ? void 0 : value.concat) === null || _a === void 0 ? void 0 : _a.call(value, valueToAdd);
    }
}
