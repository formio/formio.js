import { ValueSource } from './ValueSource';
export class NumberValueSource extends ValueSource {
    static get name() {
        return 'number';
    }
    static get title() {
        return 'Number';
    }
    static get weight() {
        return 410;
    }
    static getInputEditForm() {
        return {
            label: 'Number',
            type: 'number',
            input: true,
            validate: {
                required: true,
            },
        };
    }
    getValue(input) {
        return Number(input);
    }
}
