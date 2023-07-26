import _ from 'lodash';

/* eslint-disable no-unused-vars */
export default class ConditionOperator {
    static get operatorKey() {
        return '';
    }

    static get displayedName() {
        return '';
    }

    static get requireValue() {
        return true;
    }

    execute(options) {
        return true;
    }

    getResult(options = {}) {
        const { value } = options;

        if (_.isArray(value)) {
            return _.some(value, valueItem => this.execute({ ...options, value: valueItem }));
        }

        return this.execute(options);
    }
}
