import { QuickRules } from '../../../validator';
import EditFormUtils from '../../_classes/component/editForm/utils';
export default [
    {
        key: 'minLengthTitle',
        ignore: true,
    },
    {
        key: 'maxLengthTitle',
        ignore: true,
    },
    {
        key: 'minWordsTitle',
        ignore: true,
    },
    {
        key: 'maxWordsTitle',
        ignore: true,
    },
    {
        key: 'patternTitle',
        ignore: true,
    },
    ...[
        QuickRules.getQuickRule('min'),
        QuickRules.getQuickRule('max'),
    ]
        .map(EditFormUtils.addQuickRule),
];
