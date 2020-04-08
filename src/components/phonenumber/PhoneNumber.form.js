import textEditForm from '../textfield/TextField.form';

import PhoneNumberEditDisplay from './editForm/PhoneNumber.edit.display';

export default (...extend) => textEditForm([
  {
    key: 'display',
    components: PhoneNumberEditDisplay,
  },
], ...extend);
