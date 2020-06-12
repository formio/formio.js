import { Transformer } from './Transformer';
export class SplitTransformer extends Transformer {
    static get title() {
        return 'Split';
    }
    static get name() {
        return 'split';
    }
    static get arguments() {
        return [
            {
                name: 'Separator',
                key: 'separator',
                required: false,
            },
        ];
    }
    transform(value, args) {
        var _a;
        const { separator } = args;
        return (_a = value === null || value === void 0 ? void 0 : value.split) === null || _a === void 0 ? void 0 : _a.call(value, separator);
    }
}
