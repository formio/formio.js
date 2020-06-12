import { SetDateComponentTransformer } from './SetDateComponent';
export class SetMinuteTransformer extends SetDateComponentTransformer {
    static get title() {
        return 'Set Minute';
    }
    static get name() {
        return 'setMinute';
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
