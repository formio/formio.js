import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';
export class SetDateToEndOfDayTransformer extends SetDateToEndOfComponentTransformer {
    static get title() {
        return 'Set Date To End of Day';
    }
    static get name() {
        return 'setDateToEndOfDay';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'day',
            },
        };
    }
}
