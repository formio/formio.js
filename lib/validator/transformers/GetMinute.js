import { GetDateComponentTransformer } from './GetDateComponent';
export class GetMinuteTransformer extends GetDateComponentTransformer {
    static get title() {
        return 'Get Minute';
    }
    static get name() {
        return 'getMinute';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'minute',
            },
        };
    }
}
