import baseEditForm from '../_classes/component/Component.form';

import ButtonEditDisplay from './editForm/Button.edit.display';

export default (...extend) => baseEditForm([
  {
    key: 'display',
    components: ButtonEditDisplay
  },
  {
    key: 'data',
    ignore: true,
  },
], ...extend);
