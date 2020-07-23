import { GetDateDifferenceTransformer } from './GetDateDifference';
export class GetDaysBetweenTransformer extends GetDateDifferenceTransformer {
    static get title() {
        return 'Get Days Between';
    }
    static get name() {
        return 'getDaysBetween';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'days',
            },
        };
    }
}
