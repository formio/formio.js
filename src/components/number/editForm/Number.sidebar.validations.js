import { QuickRules } from '../../../validator';

import EditFormUtils from '../../_classes/component/editForm/utils';

export default [
  {
    key: 'minLength',
    ignore: true,
  },
  {
    key: 'maxLength',
    ignore: true,
  },
  {
    key: 'minWords',
    ignore: true,
  },
  {
    key: 'maxWords',
    ignore: true,
  },
  {
    key: 'pattern',
    ignore: true,
  },
  ...[
    QuickRules.getQuickRule('min'),
    QuickRules.getQuickRule('max'),
  ]
    .map(EditFormUtils.addQuickRule),
];
