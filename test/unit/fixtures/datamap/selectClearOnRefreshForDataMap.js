export default {
  title: "8724 Data",
  name: "8724Data",
  path: "8724data",
  owner: "6846c4df008f6ee0d1991f65",
  components: [
    {
      label: "Select data map",
      widget: "choicesjs",
      tableView: true,
      data: {
        values: [
          { label: "a", value: "a" },
          { label: "b", value: "b" },
          { label: "c", value: "c" }
        ]
      },
      refreshOn: "dataMap",
      clearOnRefresh: true,
      validateWhenHidden: false,
      key: "selectDataMap",
      type: "select",
      input: true
    },
    {
      label: "Data Map",
      tableView: false,
      calculateServer: true,
      validateWhenHidden: false,
      key: "dataMap",
      type: "datamap",
      input: true,
      valueComponent: {
        label: "Text Field datamap",
        applyMaskOn: "change",
        hideLabel: true,
        tableView: true,
        validateWhenHidden: false,
        key: "textField",
        type: "textfield",
        input: true
      }
    },
    {
      type: "button",
      label: "Submit",
      key: "submit",
      disableOnInvalid: true,
      input: true,
      tableView: false
    }
  ],
  created: "2025-06-09T11:25:15.417Z",
  modified: "2025-06-10T08:16:12.620Z"
}