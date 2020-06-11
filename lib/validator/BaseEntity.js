import _ from 'lodash';
export class BaseEntity {
    constructor(context = {}) {
        this.context = context;
    }
    static get name() {
        throw new Error('Getter #name() is abstract.');
    }
    static get title() {
        throw new Error('Getter #title() is abstract.');
    }
    get options() {
        var _a;
        return (_a = this.context.options) !== null && _a !== void 0 ? _a : {};
    }
    get engineOptions() {
        var _a;
        return (_a = this.context.engineOptions) !== null && _a !== void 0 ? _a : {};
    }
    get targetComponentInstance() {
        return this.getRequiredOption('targetComponentInstance');
    }
    get sourceComponentInstance() {
        return this.getRequiredOption('sourceComponentInstance');
    }
    get formInstance() {
        return this.getRequiredOption('formInstance');
    }
    getOption(name) {
        var _a;
        return (_a = this.options[name]) !== null && _a !== void 0 ? _a : null;
    }
    getRequiredOption(name) {
        const { [name]: option, } = this.options;
        if (_.isNil(option)) {
            throw new Error(`'${name}' is not defined.`);
        }
        return option;
    }
}
