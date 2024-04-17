export default {
    _id: '65bb9a72798447442979fe59',
    title: 'check dompurify',
    name: 'checkDompurify',
    path: 'checkdompurify',
    type: 'form',
    display: 'form',
    components: [
      {
        label: 'Text Field with script <script>console.log(111)</script>',
        applyMaskOn: 'change',
        tableView: true,
        validate: {
          required: true,
        },
        key: 'textFieldWithScript',
        type: 'textfield',
        validateWhenHidden: false,
        input: true,
      },
      {
        label: 'Text Area with iframe <iframe>test</iframe>',
        applyMaskOn: 'change',
        autoExpand: false,
        tableView: true,
        validate: {
          minLength: 555,
        },
        key: 'textAreaWithIframe',
        type: 'textarea',
        input: true,
      },
      {
        label: 'Submit',
        showValidations: false,
        tableView: false,
        key: 'submit',
        type: 'button',
        input: true,
        saveOnEnter: false,
      },
    ],
    settings: {},
    globalSettings: {},
};