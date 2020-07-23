import { AddDateComponentTransformer } from './AddDateComponent';
export class AddMinutesTransformer extends AddDateComponentTransformer {
    static get title() {
        return 'Add Minutes';
    }
    static get name() {
        return 'addMinutes';
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
