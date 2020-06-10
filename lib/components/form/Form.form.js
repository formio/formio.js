var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import FormEditData from './editForm/Form.edit.data';
import FormEditDisplay from './editForm/Form.edit.display';
import FormEditForm from './editForm/Form.edit.form';
export default (function () {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return nestedComponentForm.apply(void 0, __spreadArrays([[
            {
                key: 'display',
                components: FormEditDisplay,
            },
            {
                label: 'Form',
                key: 'form',
                weight: 10,
                components: FormEditForm,
            },
            {
                label: 'Data',
                key: 'data',
                weight: 10,
                components: FormEditData,
            },
        ]], extend));
});
