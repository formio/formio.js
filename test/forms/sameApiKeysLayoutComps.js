export default {
  type: 'form',
  components: [
    {
      label: 'Tabs',
      components: [
        {
          label: 'Tab 1',
          key: 'tab1',
          components: [

          ]
        }
      ],
      key: 'tabs',
      type: 'tabs',
      input: false,
      tableView: false
    },
    {
      label: 'Tabs',
      components: [
        {
          label: 'Tab 1',
          key: 'tab2',
          components: [

          ]
        }
      ],
      key: 'tabs',
      type: 'tabs',
      input: false,
      tableView: false
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
  title: 'FIO-249',
  display: 'form',
};
