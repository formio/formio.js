export default {
  wizardParentForm: {
    _id: '68f8aa53f0639938ba4c2d4b',
    title: 'WizardParent',
    name: 'wizardParent',
    path: 'wizardparent',
    type: 'form',
    display: 'wizard',
    tags: [],
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
            label: 'Form',
            tableView: true,
            form: '68f8aa74f0639938ba4c2e0c',
            useOriginalRevision: false,
            key: 'form',
            type: 'form',
            input: true,
            lazyLoad: true
          }
        ]
      },
      {
        title: 'Page 2',
        label: 'Page 2',
        type: 'panel',
        key: 'page2',
        components: [
          {
            label: 'Text Field',
            applyMaskOn: 'change',
            tableView: true,
            validateWhenHidden: false,
            key: 'textField',
            type: 'textfield',
            input: true
          }
        ],
        input: false,
        tableView: false
      }
    ],
    machineName: 'thjqzjuwyfrmoxi:wizardParent'
  },
  childForm: {
    _id: '68f8aa74f0639938ba4c2e0c',
    title: 'ChildForm',
    name: 'childForm',
    path: 'childform',
    type: 'form',
    display: 'form',
    components: [
      {
        label: 'Select',
        widget: 'choicesjs',
        tableView: true,
        data: {
          values: [
            { label: 'Yes', value: 'yes' },
            { label: 'No', value: 'no' }
          ]
        },
        validateWhenHidden: false,
        key: 'select',
        type: 'select',
        input: true
      },
      {
        label: 'Text Field',
        applyMaskOn: 'change',
        tableView: true,
        validate: { required: true },
        validateWhenHidden: false,
        key: 'textField',
        conditional: {
          show: true,
          conjunction: 'all',
          conditions: [
            {
              component: 'select',
              operator: 'isEqual',
              value: 'yes'
            }
          ]
        },
        type: 'textfield',
        input: true
      },
      {
        type: 'button',
        label: 'Submit',
        key: 'submit',
        disableOnInvalid: true,
        input: true,
        tableView: false
      }
    ]
  }
};
