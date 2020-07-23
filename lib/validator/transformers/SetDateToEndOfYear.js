import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';
export class SetDateToEndOfYearTransformer extends SetDateToEndOfComponentTransformer {
    static get title() {
        return 'Set Date To End of Year';
    }
    static get name() {
        return 'setDateToEndOfYear';
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
