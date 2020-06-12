import { Transformer } from './Transformer';
export class MaxTransformer extends Transformer {
    static get title() {
        return 'Max';
    }
    static get name() {
        return 'max';
    }
    transform(value) {
        return Math.max(...value);
    }
}
