import { SetDateComponentTransformer } from './SetDateComponent';
export class SetDayOfWeekTransformer extends SetDateComponentTransformer {
    static get title() {
        return 'Set Day of Week';
    }
    static get name() {
        return 'setDayOfWeek';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'isoWeekday',
            },
        };
    }
}
