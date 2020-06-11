import baseEditForm from '../component/Component.form';
import NestedComponentEditData from './editForm/NestedComponent.edit.data';
export default (...extend) => baseEditForm([
    {
        key: 'data',
        components: NestedComponentEditData,
    },
], ...extend);
