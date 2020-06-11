import { Transformer } from './Transformer';
export class IterateeTransformer extends Transformer {
    static get lazyArgsEvaluation() {
        return true;
    }
    static get arguments() {
        return [
            {
                name: 'Iteratee',
                key: 'iteratee',
                required: true,
            },
        ];
    }
}
