let Components = {
  base: require('./Base'),
  content: require('./Content'),
  container: require('./Container'),
  datagrid: require('./DataGrid'),
  datetime: require('./DateTime'),
  htmlelement: require('./HTML'),
  hidden: require('./Hidden'),
  textfield: require('./TextField'),
  phoneNumber: require('./PhoneNumber'),
  email: require('./Email'),
  checkbox: require('./Checkbox'),
  signature: require('./Signature'),
  select: require('./Select'),
  textarea: require('./TextArea'),
  button: require('./Button'),
  number: require('./Number'),
  password: require('./Password'),
  signature: require('./Signature'),
  panel: require('./Panel'),
  columns: require('./Columns'),
  column: require('./Column'),
  table: require('./Table'),
  radio: require('./Radio'),
  selectboxes: require('./SelectBoxes'),
  survey: require('./Survey'),
  well: require('./Well'),
  create: function(component, events, data) {
    let comp = null;
    if (!component.type) {
      return null;
    }
    else if (this.hasOwnProperty(component.type)) {
      comp = new Components[component.type](component, events, data);
    }
    else {
      comp = new Components.base(component, events, data);
    }
    comp.build();
    return comp;
  }
};
module.exports = Components;
