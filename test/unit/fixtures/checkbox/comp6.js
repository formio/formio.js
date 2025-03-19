export default
  {
    name: 'ckeckbox',
    path: 'ckeckbox',
    type: 'form',
    display: 'form',

    components: [
      {
        label: 'Checkbox',
        inputType: 'radio',
        tableView: false,
        defaultValue: false,
        key: 'checkbox',
        type: 'checkbox',
        name: 'some name',
        value: 'ok',
        input: true,
        'some name': false
      },
      {
        type: 'button',
        label: 'Submit',
        key: 'submit',
        disableOnInvalid: true,
        input: true,
        tableView: false
      }
    ],
  };
