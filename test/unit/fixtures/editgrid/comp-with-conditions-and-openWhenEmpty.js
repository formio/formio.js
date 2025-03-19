export default {
  type: 'form',
  components: [
    {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: false,
      tableView: false,
      values: [
        {
          label: 'show',
          value: 'show',
          shortcut: ''
        },
        {
          label: 'hide',
          value: 'hide',
          shortcut: ''
        }
      ],
      key: 'radio',
      type: 'radio',
      input: true
    },
    {
      label: 'Edit Grid',
      openWhenEmpty: true,
      tableView: false,
      rowDrafts: false,
      key: 'editGrid',
      customConditional: 'show = data.radio === \'show\';',
      type: 'editgrid',
      input: true,
      components: [
        {
          label: 'Text Field',
          tableView: true,
          key: 'textField',
          type: 'textfield',
          input: true
        },
        {
          label: 'Select',
          widget: 'choicesjs',
          tableView: true,
          data: {
            values: [
              {
                label: 'a',
                value: 'a'
              },
              {
                label: 'b',
                value: 'b'
              },
              {
                label: 'c',
                value: 'c'
              }
            ]
          },
          selectThreshold: 0.3,
          key: 'select1',
          type: 'select',
          indexeddb: {
            filter: {}
          },
          input: true
        }
      ]
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
  display: 'form',
};

