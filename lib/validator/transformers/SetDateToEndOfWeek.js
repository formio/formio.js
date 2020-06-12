import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';
export class SetDateToEndOfWeekTransformer extends SetDateToEndOfComponentTransformer {
    static get title() {
        return 'Set Date To End of Week';
    }
    static get name() {
        return 'setDateToEndOfWeek';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'isoWeek',
            },
        };
    }
}
