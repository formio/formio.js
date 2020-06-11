import moment from 'moment';
import { ValueSource } from './ValueSource';
const format = 'YYYY-MM-DD';
export class DateValueSource extends ValueSource {
    static get name() {
        return 'date';
    }
    static get title() {
        return 'Date';
    }
    static get weight() {
        return 440;
    }
    static getInputEditForm() {
        return {
            label: 'Date',
            type: 'datetime',
            input: true,
            validate: {
                required: true,
            },
            format: 'yyyy-MM-dd',
            enableTime: false,
        };
    }
    getValue(input) {
        return moment(input, format);
    }
}
