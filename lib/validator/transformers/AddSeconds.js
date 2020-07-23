import { AddDateComponentTransformer } from './AddDateComponent';
export class AddSecondsTransformer extends AddDateComponentTransformer {
    static get title() {
        return 'Add Seconds';
    }
    static get name() {
        return 'addSeconds';
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
