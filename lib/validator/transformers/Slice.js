import { Transformer } from './Transformer';
export class SliceTransformer extends Transformer {
    static get title() {
        return 'Slice';
    }
    static get name() {
        return 'slice';
    }
    static get arguments() {
        return [
            {
                name: 'From',
                key: 'from',
                required: true,
            },
            {
                name: 'To',
                key: 'to',
                required: false,
            },
        ];
    }
    transform(value, args) {
        var _a, _b;
        const { from, to, } = args;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.slice) === null || _a === void 0 ? void 0 : _a.call(value, from, to)) !== null && _b !== void 0 ? _b : null;
    }
}
