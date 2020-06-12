import nestedComponentForm from '../_classes/nested/NestedComponent.form';
import WellEditDisplay from './editForm/Well.edit.display';
export default (...extend) => nestedComponentForm([
    {
        key: 'display',
        components: WellEditDisplay,
    },
], ...extend);
