import { AddDateComponentTransformer } from './AddDateComponent';
export class AddDaysTransformer extends AddDateComponentTransformer {
    static get title() {
        return 'Add Days';
    }
    static get name() {
        return 'addDays';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'days',
            },
        };
    }
}
