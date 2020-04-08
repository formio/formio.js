import radioEditForm from '../radio/Radio.form';

import SelectBoxesEditData from './editForm/SelectBoxes.edit.data';

export default (...extend) => radioEditForm([
  {
    key: 'data',
    components: SelectBoxesEditData,
  },
], ...extend);
