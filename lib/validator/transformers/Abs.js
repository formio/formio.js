import { Transformer } from './Transformer';
export class AbsTransformer extends Transformer {
    static get title() {
        return 'Abs';
    }
    static get name() {
        return 'abs';
    }
    transform(value) {
        return Math.abs(value);
    }
}
