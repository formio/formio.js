import { GetDateDifferenceTransformer } from './GetDateDifference';
export class GetHoursBetweenTransformer extends GetDateDifferenceTransformer {
    static get title() {
        return 'Get Hours Between';
    }
    static get name() {
        return 'getHoursBetween';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'hours',
            },
        };
    }
}
