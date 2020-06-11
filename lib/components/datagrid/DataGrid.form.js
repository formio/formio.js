import baseEditForm from '../_classes/component/Component.form';
import DataGridEditData from './editForm/DataGrid.edit.data';
import DataGridEditDisplay from './editForm/DataGrid.edit.display';
export default (...extend) => baseEditForm([
    {
        key: 'display',
        components: DataGridEditDisplay,
    },
    {
        key: 'data',
        components: DataGridEditData,
    },
], ...extend);
