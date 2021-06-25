export default {
  type: 'form',
  components: [
    {
      title: 'Page 1',
      label: 'Page 1',
      type: 'panel',
      key: 'page1',
      components: [
        {
          label: 'Text Field',
          tableView: true,
          validate: {
            required: true,
          },
          key: 'textField',
          type: 'textfield',
          input: true,
        },
      ],
      input: false,
      tableView: false,
    },
    {
      title: 'Page 2',
      label: 'Page 2',
      type: 'panel',
      key: 'page2',
      components: [
        {
          label: 'Container',
          tableView: false,
          key: 'container',
          type: 'container',
          input: true,
          components: [
            {
              label: 'Text Field',
              tableView: true,
              key: 'textField',
              type: 'textfield',
              input: true,
            },
          ],
        },
      ],
      input: false,
      tableView: false,
    },
  ],
  title: 'FIO-2492',
  display: 'wizard',
  name: 'fio2492',
  path: 'fio2492',
  machineName: 'eynzpktnbannula:fio2492',
};
