import { GetDateComponentTransformer } from './GetDateComponent';
export class GetMillisecondTransformer extends GetDateComponentTransformer {
    static get title() {
        return 'Get Millisecond';
    }
    static get name() {
        return 'getMillisecond';
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
