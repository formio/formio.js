import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';
export class SetDateToStartOfWeekTransformer extends SetDateToStartOfComponentTransformer {
    static get title() {
        return 'Set Date To Start of Week';
    }
    static get name() {
        return 'setDateToStartOfWeek';
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
