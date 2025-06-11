export default {
    title: 'test checkbox',
    name: 'testCheckbox',
    path: 'testcheckbox',
    type: 'form',
    display: 'form',
    components: [
      {
        label: 'Checkbox 1',
        inputType: 'radio',
        tableView: false,
        defaultValue: false,
        key: 'checkbox1',
        type: 'checkbox',
        name: 'radio',
        value: 'value1',
        input: true,
        radio: false,
        validate: {
            required: true
        },
      },
      {
        input: true,
        label: 'Submit',
        tableView: false,
        key: 'submit',
        type: 'button',
        disableOnInvalid: true,
      }
    ],
    created: '2022-09-01T09:12:45.581Z',
    modified: '2022-09-05T08:51:16.048Z',
    machineName: 'uubnbosxacwjzbk:testCheckbox',
  };
