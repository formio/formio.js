const form = {
  _id: '66742f4146717b98a9fa280f',
  title: 'test reorder',
  name: 'testReorder',
  path: 'testreorder',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Data Grid',
      reorder: true,
      addAnotherPosition: 'bottom',
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      tableView: false,
      defaultValue: [
        {
          select: '',
        },
      ],
      key: 'dataGrid',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'Select',
          widget: 'choicesjs',
          tableView: true,
          dataSrc: 'resource',
          data: {
            resource: '66742ee946717b98a9fa1b0b',
          },
          dataType: 'string',
          valueProperty: 'data.textField',
          template: '<span>{{ item.data.number }}</span>',
          validate: {
            select: false,
          },
          key: 'select',
          type: 'select',
          searchField: 'data.textField__regex',
          limit: 10,
          noRefreshOnScroll: false,
          addResource: false,
          reference: false,
          input: true,
        },
      ],
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
  created: '2024-06-20T13:31:45.177Z',
  modified: '2024-06-25T10:32:46.577Z',
  machineName: 'tifwklexhyrgxbr:testReorder',
};

const submission = {
  form: '66742f4146717b98a9fa280f',
  metadata: {
    selectData: {
      dataGrid: [
        {
          select: {
            data: {
              number: 1,
            },
          },
        },
        {
          select: {
            data: {
              number: 2,
            },
          },
        },
        {
          select: {
            data: {
              number: 3,
            },
          },
        },
        {
          select: {
            data: {
              number: 4,
            },
          },
        },
        {
          select: {
            data: {
              number: 5,
            },
          },
        },
      ],
    },
  },
  data: {
    dataGrid: [
      {
        select: '11',
      },
      {
        select: '22',
      },
      {
        select: '33',
      },
      {
        select: '44',
      },
      {
        select: '55',
      },
    ],
    dataTable: [],
    submit: true,
  },
  _id: '667ab5ee6a69739703d30def',
  project: '65df46bc93bcfaa231f3db1c',
  state: 'submitted',
  created: '2024-06-25T12:19:58.626Z',
  modified: '2024-06-25T12:19:58.627Z',
};

export default {
  form,
  submission,
};
