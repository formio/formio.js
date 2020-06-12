import baseEditForm from '../_classes/component/Component.form';
import SelectEditData from './editForm/Select.edit.data';
import SelectEditDisplay from './editForm/Select.edit.display';
export default (...extend) => baseEditForm([
    {
        key: 'display',
        components: SelectEditDisplay,
    },
    {
        key: 'data',
        components: SelectEditData,
    },
], ...extend);
