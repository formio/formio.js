const keys = ['apple', 'banana', 'cherry', 'dog', 'elephant', 'frenchfries'];

export default {
  type: 'form',
  display: 'form',
  components: [
    ...keys.map((key, index) => ({
      label: 'HTML',
      attrs: [{ attr: '', value: '' }],
      content: `{{instance.t('${key}')}}`,
      refreshOnChange: false,
      key: index === 0 ? 'html' : `html${index}`,
      type: 'htmlelement',
      input: false,
      tableView: false,
    })),
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
};
