export default {
  type: 'form',
  display: 'form',
  components: [
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
      key: 'select',
      type: 'select',
      input: true
    },
    {
      label: 'Data Grid',
      reorder: false,
      addAnotherPosition: 'bottom',
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      tableView: false,
      defaultValue: [
        {
          firstName: '',
          lastName: ''
        }
      ],
      calculateValue: "var temp = instance.defaultValue;\n  if(data.select === 'a')\n  {\n    temp = [{'firstName': 'A f 1','lastName': 'A l 1'}];\n  } else if(data.select === 'b') {  \n    temp = [{'firstName': 'B f 1','lastName': 'B l 1'}  \n    ,{'firstName': 'B f 2','lastName': 'B l 2'}];\n  } else if(data.select === 'c') {  \n    temp = [{'firstName': 'C f 1','lastName': 'C l 1'}];\n  }\n  value = temp;",
      allowCalculateOverride: true,
      key: 'dataGrid',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'First Name',
          tableView: true,
          key: 'firstName',
          type: 'textfield',
          input: true
        },
        {
          label: 'Last Name',
          tableView: true,
          key: 'lastName',
          type: 'textfield',
          input: true
        }
      ]
    },
    {
      label: 'Data Grid 2',
      reorder: false,
      addAnotherPosition: 'bottom',
      layoutFixed: false,
      enableRowGroups: false,
      initEmpty: false,
      tableView: false,
      defaultValue: [
        {
          firstName: '',
          lastName: ''
        }
      ],
      calculateValue: "var temp = instance.defaultValue;\n  if(data.select === 'a')\n  {\n    temp = [{'firstName': 'A f 1','lastName': 'A l 1'}];\n  } else if(data.select === 'b') {  \n    temp = [{'firstName': 'B f 1','lastName': 'B l 1'}  \n    ,{'firstName': 'B f 2','lastName': 'B l 2'}];\n  } else if(data.select === 'c') {  \n    temp = [{'firstName': 'C f 1','lastName': 'C l 1'}];\n  }\n  value = temp;",
      allowCalculateOverride: true,
      key: 'dataGrid2',
      type: 'datagrid',
      input: true,
      components: [
        {
          label: 'First Name',
          tableView: true,
          key: 'firstName',
          type: 'textfield',
          input: true
        },
        {
          label: 'Last Name',
          tableView: true,
          key: 'lastName',
          type: 'textfield',
          input: true
        }
      ]
    }
  ]
};
