import { SetDateToEndOfComponentTransformer } from './SetDateToEndOfComponent';
export class SetDateToEndOfQuarterTransformer extends SetDateToEndOfComponentTransformer {
    static get title() {
        return 'Set Date To End of Quarter';
    }
    static get name() {
        return 'setDateToEndOfQuarter';
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
