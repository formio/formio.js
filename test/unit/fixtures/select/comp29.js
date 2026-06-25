export default {
  formShema: {
    title: "Select Dropdown Issue Reproduction",
    display: "form",
    components: [

      {
        label: "Broken Panel - Select Conditionally Visible",
        title:
          "❌ BROKEN: Select dropdown displays incorrectly in conditionally hidden panel (simple conditional) in HTML render mode (shows values instead of labels)",
        collapsible: false,
        key: "brokenPanel",
        conditional: {
          show: true,
          conjunction: "all",
          conditions: [
            {
              component: "showBrokenPanel",
              operator: "isEqual",
              value: true,
            },
          ],
        },
        type: "panel",
        components: [
          {
            input: true,
            tableView: true,
            label: "Broken Select Dropdown",
            key: "brokenSelect",
            placeholder: "Select Option(s)",
            data: {
              values: [
                {
                  value: "option1",
                  label: "First",
                },
                {
                  value: "option2",
                  label: "Second",
                },
                {
                  value: "option3",
                  label: "Third",
                },
              ]
            },
            multiple: true,
            type: "select",
          },
        ],
        tableView: false,
        input: false,
      },

    ],

  },
  submission: {
    data: {
      showBrokenPanel: true,
      brokenSelect: ["option1", "option2"],
    },
  }
};