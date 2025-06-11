export default {
  _id: '66051dae494c977c47028fac',
  title: 'test draft parent',
  name: 'testDraftParent',
  path: 'testdraftparent',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Parent Form Field',
      tableView: true,
      key: 'parent',
      type: 'textfield',
      input: true,
    },
    {
      label: 'Form',
      tableView: true,
      src: 'http://localhost:3000/idwqwhclwioyqbw/testdraftnested',
      key: 'form',
      type: 'form',
      input: true,
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false,
    },
  ],
  project: '63cead09be0090345b109e22',
  machineName: 'idwqwhclwioyqbw:testdraftparent'
};
