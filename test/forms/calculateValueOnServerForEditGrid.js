export default {
  type: 'form',
  display: 'form',
  components: [
    {
      key: 'first',
      type: 'textfield',
      input: true,
      label: 'Text Field',
      tableView: true,
    },
    {
      key: 'editGrid',
      type: 'editgrid',
      input: true,
      label: 'Edit Grid',
      rowDrafts: false,
      tableView: false,
      components: [
        {
          key: 'fielda',
          type: 'textfield',
          input: true,
          label: 'Text Field',
          tableView: true,
        },
        {
          key: 'fieldb',
          type: 'textfield',
          input: true,
          label: 'Text Field',
          tableView: true,
        },
      ],
      calculateValue:
        'if (options.server){\n  value = [{ fielda: data.first, fieldb: "test"}];\n}',
      displayAsTable: false,
      calculateServer: true,
    },
    {
      key: 'submit',
      type: 'button',
      input: true,
      label: 'Submit',
      tableView: false,
      disableOnInvalid: true,
    },
  ],
};
