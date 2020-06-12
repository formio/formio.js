import { SetDateComponentTransformer } from './SetDateComponent';
export class SetMonthTransformer extends SetDateComponentTransformer {
    static get title() {
        return 'Set Month';
    }
    static get name() {
        return 'setMonth';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'month',
            },
        };
    }
}
