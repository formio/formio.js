import textEditForm from '../textfield/TextField.form';
import PasswordEditData from './editForm/Password.edit.data';
import PasswordEditDisplay from './editForm/Password.edit.display';
export default (...extend) => textEditForm([
    {
        key: 'data',
        components: PasswordEditData,
    },
    {
        key: 'display',
        components: PasswordEditDisplay,
    },
], ...extend);
