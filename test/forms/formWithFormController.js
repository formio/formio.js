export default {
    _id: '636e1e0848707efbd322ea71',
    title: 'test controller',
    name: 'testcontroller',
    path: 'testcontroller',
    type: 'form',
    display: 'form',
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
            key: 'textField',
            type: 'textfield',
            input: true,
          },
        ],
        input: false,
        tableView: false,
      },
    ],
    controller:
      "data.textField = 'Hello World';\r\ncomponents[0].disabled = true;\r\ninstance.redraw()",
    created: '2022-11-11T10:03:52.187Z',
    modified: '2022-11-11T11:21:15.386Z',
    machineName: 'ienrmkptejwkozk:gggggg',
};
