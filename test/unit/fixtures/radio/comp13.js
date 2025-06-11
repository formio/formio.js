export default {
  _id: '66ebe22841267c275a4cb34e',
  title: 'test radio url 1',
  name: 'testRadioUrl1',
  path: 'testradiourl1',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: false,
      tableView: false,
      dataSrc: 'url',
      values: [
        {
          label: '',
          value: '',
          shortcut: '',
        },
      ],
      valueProperty: 'identifier',
      validateWhenHidden: false,
      key: 'radio',
      type: 'radio',
      data: {
        url: 'https://test.test/options',
        headers: [
          {
            key: '',
            value: '',
          },
        ],
      },
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
  project: '66e930e238963ab0230de6df',
};
