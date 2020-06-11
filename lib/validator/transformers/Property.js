import _ from 'lodash';
import { Transformer } from './Transformer';
export class PropertyTransformer extends Transformer {
    static get title() {
        return 'Property';
    }
    static get name() {
        return 'property';
    }
    static get arguments() {
        return [
            {
                name: 'Path',
                key: 'path',
                required: false,
            },
            {
                name: 'Default Value',
                key: 'defaultValue',
                required: false,
            },
        ];
    }
    transform(value, args) {
        const { path, defaultValue, } = args;
        return _.get(value, path, defaultValue !== null && defaultValue !== void 0 ? defaultValue : value);
    }
}
