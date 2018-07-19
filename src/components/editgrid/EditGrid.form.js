import baseEditForm from '../_classes/component/Component.form';

import EditGridEditTemplates from './editForm/EditGrid.edit.templates';

export default function(...extend) {
  return baseEditForm([
    {
      label: 'Templates',
      key: 'templates',
      weight: 5,
      components: EditGridEditTemplates
    }
  ], ...extend);
}
