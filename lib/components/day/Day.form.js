var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import baseEditForm from '../_classes/component/Component.form';
import DayEditData from './editForm/Day.edit.data';
import DayEditDay from './editForm/Day.edit.day';
import DayEditDisplay from './editForm/Day.edit.display';
import DayEditMonth from './editForm/Day.edit.month';
import DayEditYear from './editForm/Day.edit.year';
export default (function () {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return baseEditForm.apply(void 0, __spreadArrays([[
            {
                key: 'display',
                components: DayEditDisplay,
            },
            {
                key: 'data',
                components: DayEditData,
            },
            {
                key: 'day',
                label: 'Day',
                weight: 3,
                components: DayEditDay,
            },
            {
                key: 'month',
                label: 'Month',
                weight: 3,
                components: DayEditMonth,
            },
            {
                key: 'year',
                label: 'Year',
                weight: 3,
                components: DayEditYear,
            },
        ]], extend));
});
