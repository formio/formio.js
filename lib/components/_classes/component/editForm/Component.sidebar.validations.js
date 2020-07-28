var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { QuickRules } from '../../../../validator';
import EditFormUtils from './utils';
export default __spreadArrays([
    {
        key: 'quickRulesHeading',
        type: 'htmlelement',
        input: false,
        tag: 'h4',
        content: 'Quick Rules',
    }
], [
    QuickRules.getQuickRule('required'),
    QuickRules.getQuickRule('minLength'),
    QuickRules.getQuickRule('maxLength'),
    QuickRules.getQuickRule('minWords'),
    QuickRules.getQuickRule('maxWords'),
    QuickRules.getQuickRule('pattern'),
]
    .map(EditFormUtils.addQuickRule));
