export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Day',
      hideInputLabels: false,
      inputsLabelPosition: 'top',
      useLocaleSettings: false,
      tableView: false,
      fields: {
        day: {
          hide: false,
          required: true
        },
        month: {
          hide: false
        },
        year: {
          hide: false
        }
      },
      validateOn: 'blur',
      key: 'day',
      type: 'day',
      input: true,
      defaultValue: '00/00/0000'
    },
    {
      type: 'button',
      action: 'submit',
      label: 'Submit',
      theme: 'primary'
    }
  ]
};
