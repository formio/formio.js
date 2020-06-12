import { Transformer } from './Transformer';
export class AddTransformer extends Transformer {
    static get title() {
        return 'Add';
    }
    static get name() {
        return 'add';
    }
    static get arguments() {
        return [
            {
                name: 'Value To Add',
                key: 'valueToAdd',
                required: true,
            },
        ];
    }
    transform(value, args) {
        const { valueToAdd, } = args;
        return value + valueToAdd;
    }
}
