var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import baseEditForm from '../_classes/component/Component.form';
import DateTimeEditData from './editForm/DateTime.edit.data';
import DateTimeEditDate from './editForm/DateTime.edit.date';
import DateTimeEditDisplay from './editForm/DateTime.edit.display';
import DateTimeEditTime from './editForm/DateTime.edit.time';
export default (function () {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return baseEditForm.apply(void 0, __spreadArrays([[
            {
                key: 'display',
                components: DateTimeEditDisplay,
            },
            {
                label: 'Date',
                key: 'date',
                weight: 1,
                components: DateTimeEditDate,
            },
            {
                label: 'Time',
                key: 'time',
                weight: 2,
                components: DateTimeEditTime,
            },
            {
                key: 'data',
                components: DateTimeEditData,
            },
        ]], extend));
});
