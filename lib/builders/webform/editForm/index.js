import _ from 'lodash';
import WebformEditConditions from './Webform.edit.conditions';
import WebformEditVariables from './Webform.edit.variables';
import EditFormUtils from '../../../components/_classes/component/editForm/utils';
export default (...extend) => {
    const components = _.cloneDeep([
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
    ]).concat(extend.map((items) => ({
        type: 'tabs',
        key: 'tabs',
        components: _.cloneDeep(items),
    })));
    return {
        components: _.unionWith(components, EditFormUtils.unifyComponents),
    };
};
