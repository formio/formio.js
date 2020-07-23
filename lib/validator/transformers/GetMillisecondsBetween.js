import { GetDateDifferenceTransformer } from './GetDateDifference';
export class GetMillisecondsBetweenTransformer extends GetDateDifferenceTransformer {
    static get title() {
        return 'Get Milliseconds Between';
    }
    static get name() {
        return 'getMillisecondsBetween';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'milliseconds',
            },
        };
    }
}
