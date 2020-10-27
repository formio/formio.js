"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Address = _interopRequireDefault(require("./address/Address"));

var _Button = _interopRequireDefault(require("./button/Button"));

var _Checkbox = _interopRequireDefault(require("./checkbox/Checkbox"));

var _Columns = _interopRequireDefault(require("./columns/Columns"));

var _Component = _interopRequireDefault(require("./_classes/component/Component"));

var _ComponentModal = _interopRequireDefault(require("./_classes/componentModal/ComponentModal"));

var _Container = _interopRequireDefault(require("./container/Container"));

var _Content = _interopRequireDefault(require("./content/Content"));

var _Currency = _interopRequireDefault(require("./currency/Currency"));

var _DataGrid = _interopRequireDefault(require("./datagrid/DataGrid"));

var _DataMap = _interopRequireDefault(require("./datamap/DataMap"));

var _DateTime = _interopRequireDefault(require("./datetime/DateTime"));

var _Day = _interopRequireDefault(require("./day/Day"));

var _EditGrid = _interopRequireDefault(require("./editgrid/EditGrid"));

var _Email = _interopRequireDefault(require("./email/Email"));

var _Fieldset = _interopRequireDefault(require("./fieldset/Fieldset"));

var _File = _interopRequireDefault(require("./file/File"));

var _Form = _interopRequireDefault(require("./form/Form"));

var _Hidden = _interopRequireDefault(require("./hidden/Hidden"));

var _Input = _interopRequireDefault(require("./_classes/input/Input"));

var _Multivalue = _interopRequireDefault(require("./_classes/multivalue/Multivalue"));

var _Field = _interopRequireDefault(require("./_classes/field/Field"));

var _HTML = _interopRequireDefault(require("./html/HTML"));

var _NestedComponent = _interopRequireDefault(require("./_classes/nested/NestedComponent"));

var _NestedDataComponent = _interopRequireDefault(require("./_classes/nesteddata/NestedDataComponent"));

var _NestedArrayComponent = _interopRequireDefault(require("./_classes/nestedarray/NestedArrayComponent"));

var _Number = _interopRequireDefault(require("./number/Number"));

var _Panel = _interopRequireDefault(require("./panel/Panel"));

var _Password = _interopRequireDefault(require("./password/Password"));

var _PhoneNumber = _interopRequireDefault(require("./phonenumber/PhoneNumber"));

var _Radio = _interopRequireDefault(require("./radio/Radio"));

var _ReCaptcha = _interopRequireDefault(require("./recaptcha/ReCaptcha"));

var _Resource = _interopRequireDefault(require("./resource/Resource"));

var _SelectBoxes = _interopRequireDefault(require("./selectboxes/SelectBoxes"));

var _Select = _interopRequireDefault(require("./select/Select"));

var _Signature = _interopRequireDefault(require("./signature/Signature"));

var _Survey = _interopRequireDefault(require("./survey/Survey"));

var _Table = _interopRequireDefault(require("./table/Table"));

var _Tabs = _interopRequireDefault(require("./tabs/Tabs"));

var _Tags = _interopRequireDefault(require("./tags/Tags"));

var _TextArea = _interopRequireDefault(require("./textarea/TextArea"));

var _TextField = _interopRequireDefault(require("./textfield/TextField"));

var _Time = _interopRequireDefault(require("./time/Time"));

var _Tree = _interopRequireDefault(require("./tree/Tree"));

var _Unknown = _interopRequireDefault(require("./unknown/Unknown"));

var _Url = _interopRequireDefault(require("./url/Url"));

var _Well = _interopRequireDefault(require("./well/Well"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  address: _Address.default,
  base: _Component.default,
  component: _Component.default,
  componentmodal: _ComponentModal.default,
  button: _Button.default,
  checkbox: _Checkbox.default,
  columns: _Columns.default,
  container: _Container.default,
  content: _Content.default,
  currency: _Currency.default,
  datagrid: _DataGrid.default,
  datamap: _DataMap.default,
  datetime: _DateTime.default,
  day: _Day.default,
  editgrid: _EditGrid.default,
  email: _Email.default,
  input: _Input.default,
  field: _Field.default,
  multivalue: _Multivalue.default,
  fieldset: _Fieldset.default,
  file: _File.default,
  form: _Form.default,
  hidden: _Hidden.default,
  htmlelement: _HTML.default,
  nested: _NestedComponent.default,
  nesteddata: _NestedDataComponent.default,
  nestedarray: _NestedArrayComponent.default,
  number: _Number.default,
  panel: _Panel.default,
  password: _Password.default,
  phoneNumber: _PhoneNumber.default,
  radio: _Radio.default,
  recaptcha: _ReCaptcha.default,
  resource: _Resource.default,
  select: _Select.default,
  selectboxes: _SelectBoxes.default,
  signature: _Signature.default,
  survey: _Survey.default,
  table: _Table.default,
  tabs: _Tabs.default,
  tags: _Tags.default,
  textarea: _TextArea.default,
  textfield: _TextField.default,
  time: _Time.default,
  tree: _Tree.default,
  unknown: _Unknown.default,
  url: _Url.default,
  well: _Well.default
};
exports.default = _default;