import baseEditForm from '../base/Base.form';

import EditGridEditTemplates from './editForm/EditGrid.edit.templates';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Templates',
      key: 'templates',
      weight: 5,
      components: EditGridEditTemplates
    }
  ]);
}
