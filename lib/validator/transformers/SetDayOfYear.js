import { SetDateComponentTransformer } from './SetDateComponent';
export class SetDayOfYearTransformer extends SetDateComponentTransformer {
    static get title() {
        return 'Set Day of Year';
    }
    static get name() {
        return 'setDayOfYear';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'dayOfYear',
            },
        };
    }
}
