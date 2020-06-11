import _ from 'lodash';
import WebformEditConditions from './Webform.edit.conditions';
import WebformEditVariables from './Webform.edit.variables';
import EditFormUtils from '../../../components/_classes/component/editForm/utils';
export default (function () {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    var components = _.cloneDeep([
        {
            type: 'tabs',
            key: 'tabs',
            components: [
                {
                    label: 'Conditions',
                    key: 'conditions',
                    weight: 0,
                    components: WebformEditConditions,
                },
                {
                    label: 'Variables',
                    key: 'variables',
                    weight: 10,
                    components: WebformEditVariables,
                },
            ],
        },
    ]).concat(extend.map(function (items) { return ({
        type: 'tabs',
        key: 'tabs',
        components: _.cloneDeep(items),
    }); }));
    return {
        components: _.unionWith(components, EditFormUtils.unifyComponents),
    };
});
