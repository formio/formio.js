export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Text Field',
      applyMaskOn: 'change',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      input: true,
    },
    {
      label: 'HTML',
      attrs: [
        {
          attr: '',
          value: '',
        },
      ],
      content: '<img src=1 onerror=alert("htmlContent")>\n<div class="myClass {{data.textField + \'-class\'}}">{{' +
        ' data.textField ? data.textField : \'No Text\'}}</div>',
      refreshOnChange: true,
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
