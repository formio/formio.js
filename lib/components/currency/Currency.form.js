import baseEditForm from '../textfield/TextField.form';
import CurrencyEditData from './editForm/Currency.edit.data';
import CurrencyEditDisplay from './editForm/Currency.edit.display';
export default (...extend) => baseEditForm([
    {
        key: 'display',
        components: CurrencyEditDisplay,
    },
    {
        key: 'data',
        components: CurrencyEditData,
    },
], ...extend);
