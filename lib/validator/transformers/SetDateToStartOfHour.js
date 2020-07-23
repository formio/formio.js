import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';
export class SetDateToStartOfHourTransformer extends SetDateToStartOfComponentTransformer {
    static get title() {
        return 'Set Date To Start of Hour';
    }
    static get name() {
        return 'setDateToStartOfHour';
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
