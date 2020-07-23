import { GetDateComponentTransformer } from './GetDateComponent';
export class GetHourTransformer extends GetDateComponentTransformer {
    static get title() {
        return 'Get Hour';
    }
    static get name() {
        return 'getHour';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'hour',
            },
        };
    }
}
