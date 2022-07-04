const form = {
  display: "wizard",
  components: [{
      title: "Page 1",
      label: "Page 1",
      type: "panel",
      key: "page1",
      navigateOnEnter: true,
      saveOnEnter: true,
      components: [{
          label: "Text Field",
          tableView: true,
          key: "textField",
          type: "textfield",
          input: true
      }],
      input: false,
      tableView: false
  }, {
      title: "Page 2",
      label: "Page 2",
      type: "panel",
      key: "page2",
      navigateOnEnter: true,
      saveOnEnter: true,
      components: [{
          label: "Text Field",
          tableView: true,
          key: "textField1",
          type: "textfield",
          input: true
      }],
      input: false,
      tableView: false
  }, {
      title: "Page 3",
      label: "Page 3",
      type: "panel",
      key: "page3",
      navigateOnEnter: true,
      saveOnEnter: true,
      components: [{
          label: "Text Field",
          tableView: true,
          key: "textField2",
          type: "textfield",
          input: true
      }],
      input: false,
      tableView: false
  }]
};

export default { form };
