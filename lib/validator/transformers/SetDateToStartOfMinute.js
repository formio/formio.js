import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';
export class SetDateToStartOfMinuteTransformer extends SetDateToStartOfComponentTransformer {
    static get title() {
        return 'Set Date To Start of Minute';
    }
    static get name() {
        return 'setDateToStartOfMinute';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'minute',
            },
        };
    }
}
