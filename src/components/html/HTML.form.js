import baseEditForm from '../_classes/component/Component.form';

import HTMLEditDisplay from './editForm/HTML.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: HTMLEditDisplay
    }
  ]);
}
