import { AddDateComponentTransformer } from './AddDateComponent';
export class AddHoursTransformer extends AddDateComponentTransformer {
    static get title() {
        return 'Add Hours';
    }
    static get name() {
        return 'addHours';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'hours',
            },
        };
    }
}
