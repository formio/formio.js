import baseEditForm from '../_classes/component/Component.form';
import TextFieldEditData from './editForm/TextField.edit.data';
import TextFieldEditDisplay from './editForm/TextField.edit.display';
export default (...extend) => baseEditForm([
    {
        key: 'display',
        components: TextFieldEditDisplay,
    },
    {
        key: 'data',
        components: TextFieldEditData,
    },
], ...extend);
