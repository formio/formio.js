import baseEditForm from '../base/Base.form';

import HTMLEditDisplay from './editForm/HTML.edit.display';

export default function(...extend) {
  return baseEditForm(...extend, [
    {
      key: 'display',
      components: HTMLEditDisplay
    }
  ]);
}
