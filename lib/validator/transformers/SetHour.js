import { SetDateComponentTransformer } from './SetDateComponent';
export class SetHourTransformer extends SetDateComponentTransformer {
    static get title() {
        return 'Set Hour';
    }
    static get name() {
        return 'setHour';
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
