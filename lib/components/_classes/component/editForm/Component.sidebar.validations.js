import { QuickRules } from '../../../../validator';
import EditFormUtils from './utils';
export default [
    {
        key: 'quickRulesHeading',
        type: 'htmlelement',
        input: false,
        tag: 'h4',
        content: 'Quick Rules',
    },
    ...[
        QuickRules.getQuickRule('required'),
        QuickRules.getQuickRule('minLength'),
        QuickRules.getQuickRule('maxLength'),
        QuickRules.getQuickRule('minWords'),
        QuickRules.getQuickRule('maxWords'),
        QuickRules.getQuickRule('pattern'),
    ]
        .map(EditFormUtils.addQuickRule),
];
