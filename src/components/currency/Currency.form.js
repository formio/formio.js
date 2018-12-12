import baseEditForm from '../_classes/component/Component.form';
import CurrencyEditDisplay from './editForm/Currency.edit.display';
import CurrencyEditData from './editForm/Currency.edit.data';
export default function(...extend) {
  return baseEditForm([
    {
      key: 'display',
      components: CurrencyEditDisplay
    },
    {
      key: 'data',
      components: CurrencyEditData
    }
  ], ...extend);
}
