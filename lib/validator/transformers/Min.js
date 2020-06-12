import { Transformer } from './Transformer';
export class MinTransformer extends Transformer {
    static get title() {
        return 'Min';
    }
    static get name() {
        return 'min';
    }
    transform(value) {
        return Math.min(...value);
    }
}
