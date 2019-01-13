export default
{
  type: 'form',
  components: [
  {
    label: 'Radio',
    optionsLabelPosition: 'right',
    values: [
    {
      value: 'yes',
      label: 'Yes',
      shortcut: ''
    },
    {
      value: 'no',
      label: 'No',
      shortcut: ''
    }],
    inline: false,
    mask: false,
    tableView: true,
    alwaysEnabled: false,
    type: 'radio',
    input: true,
    key: 'radio',
    defaultValue: 'no',
    conditional:
    {
      show: ''
    },
    properties:
    {},
    encrypted: false
  },
  {
    input: true,
    tableView: true,
    key: 'formField',
    label: 'formField',
    type: 'form',
    tags: [],
    conditional:
    {
      show: 'true',
      when: 'radio',
      eq: 'yes'
    },
    properties:
    {},
    hideLabel: true,
    submit: true,
    components: [
    {
      input: true,
      key: 'name',
      label: 'Name',
      validate:
      {
        required: true,
        customMessage: '',
        json: ''
      },
      type: 'textfield'
    }]
  },
  {
    input: true,
    label: 'Submit',
    tableView: false,
    key: 'submit',
    theme: 'primary',
    type: 'button'
  }],
  title: 'Nested Conditional',
  display: 'form',
};
