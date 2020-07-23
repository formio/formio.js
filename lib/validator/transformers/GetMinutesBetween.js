import { GetDateDifferenceTransformer } from './GetDateDifference';
export class GetMinutesBetweenTransformer extends GetDateDifferenceTransformer {
    static get title() {
        return 'Get Minutes Between';
    }
    static get name() {
        return 'getMinutesBetween';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'minutes',
            },
        };
    }
}
