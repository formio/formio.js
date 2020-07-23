import { SetDateComponentTransformer } from './SetDateComponent';
export class SetMillisecondTransformer extends SetDateComponentTransformer {
    static get title() {
        return 'Set Millisecond';
    }
    static get name() {
        return 'setMillisecond';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'millisecond',
            },
        };
    }
}
