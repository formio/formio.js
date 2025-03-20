export default {
  type: 'form',
  owner: null,
  components: [
    {
      label: 'Form',
      tableView: true,
      display: 'form',
      components: [
        {
          input: true,
          tableView: true,
          label: 'Make',
          key: 'make',
          data: {
            values: [
              {
                value: 'ford',
                label: 'Ford'
              },
              {
                value: 'honda',
                label: 'Honda'
              }
            ],
          },
          dataSrc: 'values',
          template: '<span>{{ item.label }}</span>',
          validate: {
            required: true
          },
          type: 'select',
        },
        {
          label: 'Model',
          widget: 'choicesjs',
          placeholder: 'Select your model',
          tableView: true,
          dataSrc: 'url',
          data: {
            url: 'https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/{{ data.make }}?format=json',
            headers: [
              {
                key: '',
                value: ''
              }
            ]
          },
          valueProperty: 'Model_Name',
          template: '<span>{{ item.Model_Name }}</span>',
          refreshOn: 'make',
          clearOnRefresh: true,
          selectThreshold: 0.3,
          clearOnHide: false,
          validate: {
            required: true
          },
          key: 'model',
          type: 'select',
          indexeddb: {
            filter: {}
          },
          selectValues: 'Results',
          input: true,
          disableLimit: false,
          lazyLoad: false
        },
        {
          input: true,
          label: 'Submit',
          tableView: false,
          key: 'submit',
          type: 'button'
        }
      ],
      key: 'form',
      type: 'form',
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
  ],
};
