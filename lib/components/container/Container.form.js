var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import baseEditForm from '../_classes/component/Component.form';
import ContainerEditData from './editForm/Container.edit.data';
import ContainerEditDisplay from './editForm/Container.edit.display';
export default (function () {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return baseEditForm.apply(void 0, __spreadArrays([[
            {
                key: 'display',
                components: ContainerEditDisplay,
            },
            {
                key: 'data',
                components: ContainerEditData,
            },
        ]], extend));
});
