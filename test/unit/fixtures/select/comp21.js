export default {
  title: 'FIO-7632',
  name: 'fio7632',
  path: 'fio7632',
  type: 'form',
  display: 'form',
  components: [
    {
      collapsible: false,
      key: 'panel',
      type: 'panel',
      label: 'Panel',
      input: false,
      tableView: false,
      components: [
        {
          label: 'Animals',
          widget: 'html5',
          tableView: true,
          data: {
            values: [
              {
                label: 'Dog',
                value: 'dog',
              },
              {
                label: 'Cat',
                value: 'cat',
              },
              {
                label: 'Horse',
                value: 'horse',
              },
            ],
          },
          key: 'animals',
          type: 'select',
          input: true,
        },
        {
          label: 'Checkbox',
          tableView: false,
          key: 'checkbox',
          type: 'checkbox',
          input: true,
        },
        {
          label: 'Animals2',
          widget: 'html5',
          tableView: true,
          data: {
            values: [
              {
                label: 'Dog',
                value: 'dog',
              },
              {
                label: 'Cat',
                value: 'cat',
              },
              {
                label: 'Horse',
                value: 'horse',
              },
            ],
          },
          calculateValue: 'if (data.checkbox === true) {\n  value = data.animals;\n}',
          key: 'animals2',
          logic: [
            {
              name: 'disable',
              trigger: {
                type: 'javascript',
                javascript: 'result = row.checkbox === true;',
              },
              actions: [
                {
                  name: 'disable',
                  type: 'property',
                  property: {
                    label: 'Disabled',
                    value: 'disabled',
                    type: 'boolean',
                  },
                  state: true,
                },
              ],
            },
          ],
          type: 'select',
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
    },
  ],
};
