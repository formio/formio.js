import { SubtractDateComponentTransformer } from './SubtractDateComponent';
export class SubtractHoursTransformer extends SubtractDateComponentTransformer {
    static get title() {
        return 'Subtract Hours';
    }
    static get name() {
        return 'subtractHours';
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
