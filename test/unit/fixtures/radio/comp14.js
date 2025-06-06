export default {
  type: "form",
  name: "selectr",
  path: "selectr",
  components: [
    {
      label: "Radio",
      optionsLabelPosition: "right",
      inline: false,
      tableView: false,
      defaultValue: true,
      values: [
        {
          label: "A",
          value: "1",
          shortcut: ""
        },
        {
          label: "B",
          value: "2",
          shortcut: ""
        },
        {
          label: "C",
          value: "3",
          shortcut: ""
        },
      ],
      dataType: "number",
      validateWhenHidden: false,
      key: "radio",
      type: "radio",
      input: true
    },
  ]
}