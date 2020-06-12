import { Transformer } from './Transformer';
export class JoinTransformer extends Transformer {
    static get title() {
        return 'Join';
    }
    static get name() {
        return 'join';
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
        return (_a = value === null || value === void 0 ? void 0 : value.join) === null || _a === void 0 ? void 0 : _a.call(value, separator);
    }
}
