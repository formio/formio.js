import textEditForm from '../textfield/TextField.form';
import UrlEditData from './editForm/Url.edit.data';
import UrlEditDisplay from './editForm/Url.edit.display';
export default (...extend) => textEditForm([
    {
        key: 'display',
        components: UrlEditDisplay,
    },
    {
        key: 'data',
        components: UrlEditData,
    },
], ...extend);
