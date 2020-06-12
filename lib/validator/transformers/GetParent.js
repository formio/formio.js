import { Transformer } from './Transformer';
export class GetParentTransformer extends Transformer {
    static get title() {
        return 'Get Parent';
    }
    static get name() {
        return 'getParent';
    }
    transform(value) {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value.parent) !== null && _a !== void 0 ? _a : null;
    }
}
