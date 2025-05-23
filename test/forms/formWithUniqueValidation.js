export default {
  form: {
    _id: '66f276bb34ac6c4049cb91a5',
    title: 'test unique',
    name: 'testUnique',
    path: 'testunique',
    type: 'form',
    display: 'form',
    owner: '637b2e6b48c1227e60b1f910',
    components: [
      {
        label: 'Text Field',
        applyMaskOn: 'change',
        tableView: true,
        validate: {
          required: true,
        },
        validateWhenHidden: false,
        key: 'textField',
        type: 'textfield',
        input: true,
      },
      {
        label: 'Text Field unique',
        applyMaskOn: 'change',
        tableView: true,
        unique: true,
        validateWhenHidden: false,
        key: 'textFieldUnique',
        type: 'textfield',
        input: true,
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
    project: '66f27195e0c7ef9920ae787e',
  },
  submission: {
    data: { textField: 'test', textFieldUnique: 'notUnique', submit: false },
  },
  serverErrors: {
    ok: false,
    status: 400,
    statusText: "Bad Request",
    error: {
      name: 'ValidationError',
      details: [
        {
          message: 'Text Field unique must be unique',
          level: 'error',
          path: ['textFieldUnique'],
          context: {
            validator: 'unique',
            hasLabel: true,
            key: 'textFieldUnique',
            label: 'Text Field unique',
            path: 'textFieldUnique',
            value: 'notUnique',
            index: 0,
          },
        },
      ],
    }
  },
};
