'use strict';

var _Address = require('./address/Address');

var _Base = require('./base/Base');

var _Content = require('./content/Content');

var _Container = require('./container/Container');

var _DataGrid = require('./datagrid/DataGrid');

var _DateTime = require('./datetime/DateTime');

var _Day = require('./day/Day');

var _HTML = require('./html/HTML');

var _Hidden = require('./hidden/Hidden');

var _Form = require('./form/Form');

var _TextField = require('./textfield/TextField');

var _PhoneNumber = require('./phonenumber/PhoneNumber');

var _Email = require('./email/Email');

var _Time = require('./time/Time');

var _Checkbox = require('./checkbox/Checkbox');

var _Currency = require('./currency/Currency');

var _Fieldset = require('./fieldset/Fieldset');

var _Signature = require('./signature/Signature');

var _Select = require('./select/Select');

var _Resource = require('./resource/Resource');

var _TextArea = require('./textarea/TextArea');

var _Button = require('./button/Button');

var _Number = require('./number/Number');

var _Password = require('./password/Password');

var _Panel = require('./panel/Panel');

var _Column = require('./columns/Column');

var _Columns = require('./columns/Columns');

var _Table = require('./table/Table');

var _Unknown = require('./unknown/Unknown');

var _Radio = require('./radio/Radio');

var _SelectBoxes = require('./selectboxes/SelectBoxes');

var _Survey = require('./survey/Survey');

var _Well = require('./well/Well');

var _Gmap = require('./gmap/Gmap');

var _File = require('./file/File');

module.exports = {
  address: _Address.AddressComponent,
  base: _Base.BaseComponent,
  content: _Content.ContentComponent,
  container: _Container.ContainerComponent,
  datagrid: _DataGrid.DataGridComponent,
  datetime: _DateTime.DateTimeComponent,
  day: _Day.DayComponent,
  htmlelement: _HTML.HTMLComponent,
  hidden: _Hidden.HiddenComponent,
  form: _Form.FormComponent,
  textfield: _TextField.TextFieldComponent,
  phoneNumber: _PhoneNumber.PhoneNumberComponent,
  email: _Email.EmailComponent,
  time: _Time.TimeComponent,
  checkbox: _Checkbox.CheckBoxComponent,
  currency: _Currency.CurrencyComponent,
  fieldset: _Fieldset.FieldsetComponent,
  signature: _Signature.SignatureComponent,
  select: _Select.SelectComponent,
  resource: _Resource.ResourceComponent,
  textarea: _TextArea.TextAreaComponent,
  button: _Button.ButtonComponent,
  number: _Number.NumberComponent,
  password: _Password.PasswordComponent,
  panel: _Panel.PanelComponent,
  column: _Column.ColumnComponent,
  columns: _Columns.ColumnsComponent,
  table: _Table.TableComponent,
  unknown: _Unknown.UnknownComponent,
  radio: _Radio.RadioComponent,
  selectboxes: _SelectBoxes.SelectBoxesComponent,
  survey: _Survey.SurveyComponent,
  well: _Well.WellComponent,
  gmap: _Gmap.GmapComponent,
  file: _File.FileComponent,
  create: function create(component, options, data, nobuild) {
    var comp = null;
    if (!component.type) {
      return null;
    } else if (this.hasOwnProperty(component.type)) {
      comp = new this[component.type](component, options, data);
    } else {
      comp = new _Unknown.UnknownComponent(component, options, data);
    }
    if (!nobuild) {
      comp.build();
    }
    return comp;
  }
};