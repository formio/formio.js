import { Operator } from './Operator';
export class MatchPatternOperator extends Operator {
    static get name() {
        return 'matchPattern';
    }
    static get title() {
        return 'Match Pattern';
    }
    static get hasComplementaryOperator() {
        return true;
    }
    static get arguments() {
        return [
            {
                name: 'Value',
                key: 'value',
                required: true,
            },
            {
                name: 'Pattern',
                key: 'pattern',
                required: true,
            },
        ];
    }
    static get optionsEditForm() {
        return [
            {
                label: 'Case-insensitive',
                key: 'caseInsensitive',
                type: 'checkbox',
                input: true,
            },
        ];
    }
    execute(args, opts = {}) {
        const { pattern, value, } = args;
        const { caseInsensitive = false, } = opts;
        let flags = '';
        if (caseInsensitive) {
            flags += 'i';
        }
        return new RegExp(pattern, flags).test(value);
    }
}
