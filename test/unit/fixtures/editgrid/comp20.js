export default {
  title: "edit grid validation",
  name: "EG_validation",
  path: "EG_validation",
  type: "form",
  display: "form",
  components: [
    {
      label: 'Root Text',
      alwaysEnabled: false,
      tableView: true,
      key: 'text',
      type: 'textfield',
      input: true
    },
    {
      label: "Edit Grid",
      tableView: false,
      validateWhenHidden: false,
      rowDrafts: false,
      key: "editGrid",
      type: "editgrid",
      displayAsTable: false,
      input: true,
      components: [
        {
          label: 'Textfield - EG',
          applyMaskOn: 'change',
          tableView: true,
          validate: {
            custom: "valid = (input === data.text) ? true : 'data must match root textfield';"
          },
          validateWhenHidden: false,
          key: 'rootTest',
          type: 'textfield',
          alwaysEnabled: false,
          input: true
        },
      ],
    },
  ],
};
