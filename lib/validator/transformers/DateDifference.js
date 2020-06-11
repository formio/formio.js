import moment from 'moment';
import { Transformer } from './Transformer';
export class DateDifferenceTransformer extends Transformer {
    static get title() {
        return 'Date Difference';
    }
    static get name() {
        return 'dateDifference';
    }
    static get arguments() {
        return [
            {
                name: 'Different Date',
                key: 'differentDate',
                required: true,
            },
        ];
    }
    static get optionsEditForm() {
        return [
            {
                label: 'Units',
                key: 'units',
                type: 'select',
                input: true,
                dataSrc: 'values',
                data: {
                    values: [
                        {
                            label: 'Years',
                            value: 'years',
                        },
                        {
                            label: 'Months',
                            value: 'months',
                        },
                        {
                            label: 'Weeks',
                            value: 'weeks',
                        },
                        {
                            label: 'Days',
                            value: 'days',
                        },
                        {
                            label: 'Hours',
                            value: 'hours',
                        },
                        {
                            label: 'Minutes',
                            value: 'minutes',
                        },
                        {
                            label: 'Seconds',
                            value: 'seconds',
                        },
                        {
                            label: 'Milliseconds',
                            value: 'milliseconds',
                        },
                    ],
                },
                defaultValue: 'years',
            },
        ];
    }
    transform(value, args, opts = {}) {
        const { differentDate, } = args;
        const { units = '', } = opts;
        return moment(value).diff(differentDate, units);
    }
}
