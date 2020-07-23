import { GetDateDifferenceTransformer } from './GetDateDifference';
export class GetMonthsBetweenTransformer extends GetDateDifferenceTransformer {
    static get title() {
        return 'Get Months Between';
    }
    static get name() {
        return 'getMonthsBetween';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'months',
            },
        };
    }
}
