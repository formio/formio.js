import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';
export class SetDateToStartOfQuarterTransformer extends SetDateToStartOfComponentTransformer {
    static get title() {
        return 'Set Date To Start of Quarter';
    }
    static get name() {
        return 'setDateToStartOfQuarter';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'quarter',
            },
        };
    }
}
