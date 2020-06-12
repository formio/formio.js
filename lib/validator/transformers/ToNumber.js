import { Transformer } from './Transformer';
export class ToNumberTransformer extends Transformer {
    static get title() {
        return 'To Number';
    }
    static get name() {
        return 'toNumber';
    }
    transform(value) {
        return Number(value);
    }
}
