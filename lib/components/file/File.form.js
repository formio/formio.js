var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import baseEditForm from '../_classes/component/Component.form';
import FileEditData from './editForm/File.edit.data';
import FileEditDisplay from './editForm/File.edit.display';
import FileEditFile from './editForm/File.edit.file';
export default (function () {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return baseEditForm.apply(void 0, __spreadArrays([[
            {
                key: 'display',
                components: FileEditDisplay,
            },
            {
                key: 'data',
                components: FileEditData,
            },
            {
                label: 'File',
                key: 'file',
                weight: 5,
                components: FileEditFile,
            },
        ]], extend));
});
