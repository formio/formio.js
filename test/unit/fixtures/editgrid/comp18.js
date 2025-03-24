export default {
  title: "validate_submit",
  name: "validate_submit",
  path: "validate_submit",
  type: "form",
  display: "form",
  components: [
    {
      label: "Edit Grid",
      tableView: false,
      validateWhenHidden: false,
      rowDrafts: false,
      key: "editGrid",
      validateOn: 'submit',
      type: "editgrid",
      displayAsTable: false,
      input: true,
      components: [
        {
          label: "Select",
          widget: "choicesjs",
          tableView: true,
          data: {
            values: [
              {
                label: "one",
                value: "one",
              },

              {
                label: "two",
                value: "two",
              },
            ],
          },
          validate: {
            required: true,
          },
          validateWhenHidden: false,
          validateOn: 'submit',
          key: "select1",
          type: "select",
          input: true,
        },
        {
          label: "Select",
          widget: "choicesjs",
          tableView: true,
          data: {
            values: [
              {
                label: "three",
                value: "three",
              },
              {
                label: "four",
                value: "four",
              },
            ],
          },
          validate: {
            required: true,
          },
          validateWhenHidden: false,
          validateOn: 'submit',
          key: "select2",
          type: "select",
          input: true,
        },
      ],
    },
  ],
};