import { GetDateComponentTransformer } from './GetDateComponent';
export class GetYearTransformer extends GetDateComponentTransformer {
    static get title() {
        return 'Get Year';
    }
    static get name() {
        return 'getYear';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'year',
            },
        };
    }
}
