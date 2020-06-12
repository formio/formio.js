import { SetDateComponentTransformer } from './SetDateComponent';
export class SetWeekYearTransformer extends SetDateComponentTransformer {
    static get title() {
        return 'Set Week Year';
    }
    static get name() {
        return 'setWeekYear';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'isoWeekYear',
            },
        };
    }
}
