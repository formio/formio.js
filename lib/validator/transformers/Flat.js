import { Transformer } from './Transformer';
export class FlatTransformer extends Transformer {
    static get title() {
        return 'Flat';
    }
    static get name() {
        return 'flat';
    }
    static get arguments() {
        return [
            {
                name: 'Depth',
                key: 'depth',
                required: false,
            },
        ];
    }
    transform(value, args) {
        var _a;
        const { depth = 1, } = args;
        return (_a = value === null || value === void 0 ? void 0 : value.flat) === null || _a === void 0 ? void 0 : _a.call(value, depth);
    }
}
