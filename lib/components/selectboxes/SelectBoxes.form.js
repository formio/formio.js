var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import radioEditForm from '../radio/Radio.form';
import SelectBoxesEditData from './editForm/SelectBoxes.edit.data';
export default (function () {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return radioEditForm.apply(void 0, __spreadArrays([[
            {
                key: 'data',
                components: SelectBoxesEditData,
            },
        ]], extend));
});
