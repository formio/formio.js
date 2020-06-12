import { Transformer } from './Transformer';
export class IdentityTransformer extends Transformer {
    static get title() {
        return 'Identity';
    }
    static get name() {
        return 'identity';
    }
    transform(value) {
        return value;
    }
}
