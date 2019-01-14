import baseEditForm from '../_classes/component/Component.form';

import EditGridEditData from './editForm/EditGrid.data.template';
import EditGridEditTemplates from './editForm/EditGrid.edit.templates';

export default function(...extend) {
  return baseEditForm([
    {
      label: 'Templates',
      key: 'templates',
      weight: 5,
      components: EditGridEditTemplates
    },
    {
      key: 'data',
      components: EditGridEditData,
    }
  ], ...extend);
}
