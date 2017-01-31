let Components = {
  base: require('./base/Base'),
  content: require('./content/Content'),
  container: require('./container/Container'),
  datagrid: require('./datagrid/DataGrid'),
  datetime: require('./datetime/DateTime'),
  htmlelement: require('./html/HTML'),
  hidden: require('./hidden/Hidden'),
  textfield: require('./textfield/TextField'),
  phoneNumber: require('./phonenumber/PhoneNumber'),
  email: require('./email/Email'),
  checkbox: require('./checkbox/Checkbox'),
  signature: require('./signature/Signature'),
  select: require('./select/Select'),
  textarea: require('./textarea/TextArea'),
  button: require('./button/Button'),
  number: require('./number/Number'),
  password: require('./password/Password'),
  panel: require('./panel/Panel'),
  columns: require('./columns/Columns'),
  column: require('./columns/Column'),
  table: require('./table/Table'),
  radio: require('./radio/Radio'),
  selectboxes: require('./selectboxes/SelectBoxes'),
  survey: require('./survey/Survey'),
  well: require('./well/Well'),
  create: function(component, options, data) {
    let comp = null;
    if (!component.type) {
      return null;
    }
    else if (this.hasOwnProperty(component.type)) {
      comp = new Components[component.type](component, options, data);
    }
    else {
      comp = new Components.base(component, options, data);
    }
    comp.build();
    return comp;
  }
};
module.exports = Components;
