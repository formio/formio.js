export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'HTML',
      attrs: [
        {
          attr: '',
          value: '',
        },
      ],
      content: '<img src=1 onerror=alert("htmlContent")>',
      refreshOnChange: false,
      key: 'html',
      type: 'htmlelement',
      input: false,
      tableView: false,
    },
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
