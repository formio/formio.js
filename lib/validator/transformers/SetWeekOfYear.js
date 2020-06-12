import { SetDateComponentTransformer } from './SetDateComponent';
export class SetWeekOfYearTransformer extends SetDateComponentTransformer {
    static get title() {
        return 'Set Week of Year';
    }
    static get name() {
        return 'setWeekOfYear';
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
