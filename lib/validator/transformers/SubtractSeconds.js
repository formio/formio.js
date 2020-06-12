import { SubtractDateComponentTransformer } from './SubtractDateComponent';
export class SubtractSecondsTransformer extends SubtractDateComponentTransformer {
    static get title() {
        return 'Subtract Seconds';
    }
    static get name() {
        return 'subtractSeconds';
    }
    static get presetArguments() {
        return {
            unit: {
                valueSource: 'string',
                stringInput: 'seconds',
            },
        };
    }
}
