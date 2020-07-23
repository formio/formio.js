import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';
export class SetDateToEndOfMonthTransformer extends SetDateToEndOfComponentTransformer {
    static get title() {
        return 'Set Date To End of Month';
    }
    static get name() {
        return 'setDateToEndOfMonth';
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
