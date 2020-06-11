var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import EditFormUtils from '../../components/_classes/component/editForm/utils';
export default [
    __assign(__assign({}, EditFormUtils.getConditionsEditForm(EditFormUtils.getWebformLogicEditFormSettings())), { key: 'settings.conditions' }),
];
