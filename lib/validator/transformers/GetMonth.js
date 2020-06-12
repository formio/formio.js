import { GetDateComponentTransformer } from './GetDateComponent';
export class GetMonthTransformer extends GetDateComponentTransformer {
    static get title() {
        return 'Get Month';
    }
    static get name() {
        return 'getMonth';
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
