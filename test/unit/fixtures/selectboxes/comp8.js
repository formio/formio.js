export default {
  _id: '66ebfb1141267c275a4cce11',
  title: 'test selectboxes url',
  name: 'testSelectboxesUrl',
  path: 'testselectboxesurl',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Select Boxes',
      optionsLabelPosition: 'right',
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
      key: 'selectBoxes',
      type: 'selectboxes',
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
      inputType: 'checkbox',
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
