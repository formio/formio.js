import textEditForm from '../textfield/TextField.form';

import NumberEditData from './editForm/Number.edit.data';
import NumberEditDisplay from './editForm/Number.edit.display';
import NumberSidebarValidations from './editForm/Number.sidebar.validations';

export default (...extend) => textEditForm([
  {
    key: 'display',
    components: NumberEditDisplay,
  },
  {
    key: 'data',
    components: NumberEditData,
  },
  {
    key: 'validations',
    sidebar: NumberSidebarValidations,
  },
], ...extend);
