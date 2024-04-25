import textEditForm from '../textfield/TextField.form';

import UrlEditDisplay from './editForm/Url.edit.display';
import UrlEditData from './editForm/Url.edit.data';
import UrlEditValidation from './editForm/Url.edit.validation';

/**
 *
 * @param {...any} extend
 */
export default function(...extend) {
  return textEditForm([
    {
      key: 'display',
      components: UrlEditDisplay
    },
    {
      key: 'data',
      components: UrlEditData
    },
    {
      key: 'validation',
      components: UrlEditValidation
    },
  ], ...extend);
}
