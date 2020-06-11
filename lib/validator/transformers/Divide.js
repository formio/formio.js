import { Transformer } from './Transformer';
export class DivideTransformer extends Transformer {
    static get title() {
        return 'Divide';
    }
    static get name() {
        return 'divide';
    }
    static get arguments() {
        return [
            {
                name: 'Divisor',
                key: 'divisor',
                required: true,
            },
        ];
    }
    transform(value, args) {
        const { divisor, } = args;
        return value / divisor;
    }
}
