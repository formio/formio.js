import _ from 'lodash';
import ComponentEditConditions from './editForm/Component.edit.conditions';
import ComponentEditData from './editForm/Component.edit.data';
import ComponentEditDisplay from './editForm/Component.edit.display';
import ComponentEditLogic from './editForm/Component.edit.logic';
import ComponentEditValidations from './editForm/Component.edit.validations';
import ComponentEditVariables from './editForm/Component.edit.variables';
import ComponentSidebarDisplay from './editForm/Component.sidebar.display';
import ComponentSidebarValidations from './editForm/Component.sidebar.validations';
import EditFormUtils from './editForm/utils';
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
                    label: 'Display',
                    key: 'display',
                    weight: 0,
                    components: ComponentEditDisplay,
                    sidebar: ComponentSidebarDisplay,
                },
                {
                    label: 'Data',
                    key: 'data',
                    weight: 10,
                    components: ComponentEditData,
                },
                {
                    label: 'Validations',
                    key: 'validations',
                    weight: 20,
                    components: ComponentEditValidations,
                    sidebar: ComponentSidebarValidations,
                },
                {
                    label: 'Logic',
                    key: 'logic',
                    weight: 30,
                    components: ComponentEditLogic,
                },
                {
                    label: 'Conditions',
                    key: 'conditions',
                    weight: 40,
                    components: ComponentEditConditions,
                },
                {
                    label: 'Variables',
                    key: 'variables',
                    weight: 50,
                    components: ComponentEditVariables,
                },
            ],
        },
    ]).concat(extend.map(function (items) { return ({
        type: 'tabs',
        key: 'tabs',
        components: _.cloneDeep(items),
    }); }));
    return {
        components: _.unionWith(components, EditFormUtils.unifyComponents).concat({
            type: 'hidden',
            key: 'type',
        }),
    };
});
