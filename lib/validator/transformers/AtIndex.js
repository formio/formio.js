import { Transformer } from './Transformer';
export class AtIndexTransformer extends Transformer {
    static get title() {
        return 'At Index';
    }
    static get name() {
        return 'atIndex';
    }
    static get arguments() {
        return [
            {
                name: 'Index',
                key: 'index',
                required: true,
            },
        ];
    }
    transform(value, args) {
        var _a;
        const { index, } = args;
        return (_a = value === null || value === void 0 ? void 0 : value[index]) !== null && _a !== void 0 ? _a : null;
    }
}
