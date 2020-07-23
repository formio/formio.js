import { GetDateComponentTransformer } from './GetDateComponent';
export class GetSecondTransformer extends GetDateComponentTransformer {
    static get title() {
        return 'Get Second';
    }
    static get name() {
        return 'getSecond';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'second',
            },
        };
    }
}
