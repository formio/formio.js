import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';
export class SetDateToStartOfYearTransformer extends SetDateToStartOfComponentTransformer {
    static get title() {
        return 'Set Date To Start of Year';
    }
    static get name() {
        return 'setDateToStartOfYear';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'year',
            },
        };
    }
}
