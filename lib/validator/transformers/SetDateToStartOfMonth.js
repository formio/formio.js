import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';
export class SetDateToStartOfMonthTransformer extends SetDateToStartOfComponentTransformer {
    static get title() {
        return 'Set Date To Start of Month';
    }
    static get name() {
        return 'setDateToStartOfMonth';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'month',
            },
        };
    }
}
