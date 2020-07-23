import { SetDateComponentTransformer } from './SetDateComponent';
export class SetQuarterTransformer extends SetDateComponentTransformer {
    static get title() {
        return 'Set Quarter';
    }
    static get name() {
        return 'setQuarter';
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
