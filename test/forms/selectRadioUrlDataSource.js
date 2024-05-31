export default {
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Select Boxes - URL',
      optionsLabelPosition: 'right',
      tableView: true,
      modalEdit: true,
      dataSrc: 'url',
      values: [
        {
          label: '',
          value: '',
          shortcut: '',
        },
      ],
      valueProperty: 'abbreviation',
      key: 'selectBoxes',
      type: 'selectboxes',
      data: {
        url: 'https://gists.rawgit.com/mshafrir/2646763/raw/states_titlecase.json',
        headers: [
          {
            key: '',
            value: '',
          },
        ],
      },
      template: '<span>{{ item.name }}</span>',
      input: true,
      inputType: 'checkbox',
    },
    {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: false,
      tableView: true,
      modalEdit: true,
      dataSrc: 'url',
      values: [
        {
          label: '',
          value: '',
          shortcut: '',
        },
      ],
      valueProperty: 'abbreviation',
      key: 'radio',
      type: 'radio',
      data: {
        url: 'https://gists.rawgit.com/mshafrir/2646763/raw/states_titlecase.json',
        headers: [
          {
            key: '',
            value: '',
          },
        ],
      },
      template: '<span>{{ item.name }}</span>',
      input: true,
    },
    {
      label: 'Select',
      widget: 'choicesjs',
      tableView: true,
      modalEdit: true,
      dataSrc: 'url',
      data: {
        url: 'https://gists.rawgit.com/mshafrir/2646763/raw/states_titlecase.json',
        headers: [
          {
            key: '',
            value: '',
          },
        ],
      },
      valueProperty: 'abbreviation',
      template: '<span>{{ item.name }}</span>',
      key: 'select',
      type: 'select',
      disableLimit: false,
      noRefreshOnScroll: false,
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
};
