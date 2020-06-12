import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';
export class SetDateToEndOfHourTransformer extends SetDateToEndOfComponentTransformer {
    static get title() {
        return 'Set Date To End of Hour';
    }
    static get name() {
        return 'setDateToEndOfHour';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'hour',
            },
        };
    }
}
