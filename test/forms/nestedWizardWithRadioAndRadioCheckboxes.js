const collidingComponents = [
  {
    label: 'Is this valid?',
    tableView: false,
    values: [
      { label: 'Yes', value: 'yes', shortcut: '' },
      { label: 'No', value: 'no', shortcut: '' },
    ],
    validate: { required: true },
    key: 'isValid',
    type: 'radio',
    input: true,
  },
  {
    label: 'Yes, this is valid',
    inputType: 'radio',
    tableView: false,
    defaultValue: false,
    key: 'yesThisIsValid',
    name: 'isValid',
    value: 'yes',
    type: 'checkbox',
    input: true,
  },
  {
    label: 'No, it is not valid',
    inputType: 'radio',
    tableView: false,
    defaultValue: false,
    key: 'noItIsNotValid',
    name: 'isValid',
    value: 'no',
    type: 'checkbox',
    input: true,
  },
];

const childWizard = {
  _id: '68c9a1b2c3d4e5f600000002',
  title: 'Child Wizard With Radio Checkboxes',
  name: 'childWizardWithRadioCheckboxes',
  path: 'childwizardwithradiocheckboxes',
  type: 'form',
  display: 'wizard',
  components: [
    {
      title: 'Child Page 1',
      label: 'Child Page 1',
      type: 'panel',
      key: 'childPage1',
      input: false,
      tableView: false,
      components: collidingComponents,
    },
    {
      title: 'Child Page 2',
      label: 'Child Page 2',
      type: 'panel',
      key: 'childPage2',
      input: false,
      tableView: false,
      components: [
        {
          label: 'Say something...',
          tableView: true,
          key: 'saySomething',
          type: 'textfield',
          input: true,
        },
      ],
    },
  ],
};

const parentWizard = {
  _id: '68c9a1b2c3d4e5f600000001',
  title: 'Parent Wizard With Nested Radio Checkboxes',
  name: 'parentWizardWithNestedRadioCheckboxes',
  path: 'parentwizardwithnestedradiocheckboxes',
  type: 'form',
  display: 'wizard',
  components: [
    {
      title: 'Page 1',
      label: 'Page 1',
      type: 'panel',
      key: 'page1',
      input: false,
      tableView: false,
      components: [
        {
          label: 'Child',
          key: 'child',
          type: 'form',
          form: '68c9a1b2c3d4e5f600000002',
          input: true,
          tableView: true,
        },
      ],
    },
  ],
};

export default { parentWizard, childWizard };
