import { GetDateComponentTransformer } from './GetDateComponent';
export class GetDateOfMonthTransformer extends GetDateComponentTransformer {
    static get title() {
        return 'Get Date of Month';
    }
    static get name() {
        return 'getDateOfMonth';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'date',
            },
        };
    }
}
