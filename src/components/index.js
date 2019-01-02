import NestedComponent from './_classes/nested/NestedComponent';
import AddressComponent from './address/Address';
import Component from './_classes/component/Component';
import ContentComponent from './content/Content';
import ContainerComponent from './container/Container';
import DataGridComponent from './datagrid/DataGrid';
import DataMapComponent from './datamap/DataMap';
import DateTimeComponent from './datetime/DateTime';
import DayComponent from './day/Day';
import EditGridComponent from './editgrid/EditGrid';
import EditTableComponent from './edittable/EditTable';
import HTMLComponent from './html/HTML';
import HiddenComponent from './hidden/Hidden';
import FormComponent from './form/Form';
import TextFieldComponent from './textfield/TextField';
import PhoneNumberComponent from './phonenumber/PhoneNumber';
import EmailComponent from './email/Email';
import UrlComponent from './url/Url';
import TimeComponent from './time/Time';
import CheckBoxComponent from './checkbox/Checkbox';
import CurrencyComponent from './currency/Currency';
import FieldsetComponent from './fieldset/Fieldset';
import SignatureComponent from './signature/Signature';
import SelectComponent from './select/Select';
import ResourceComponent from './resource/Resource';
import TextAreaComponent from './textarea/TextArea';
import TagsComponent from './tags/Tags';
import ButtonComponent from './button/Button';
import NumberComponent from './number/Number';
import PasswordComponent from './password/Password';
import PanelComponent from './panel/Panel';
import ColumnComponent from './columns/Column';
import ColumnsComponent from './columns/Columns';
import TableComponent from './table/Table';
import RadioComponent from './radio/Radio';
import SelectBoxesComponent from './selectboxes/SelectBoxes';
import SurveyComponent from './survey/Survey';
import WellComponent from './well/Well';
import LocationComponent from './location/Location';
import FileComponent from './file/File';
import TabsComponent from './tabs/Tabs';
import TreeComponent from './tree/Tree';
import UnknownComponent from './unknown/Unknown';
import ModalEdit from './modaledit/ModalEdit';

export default {
  nested: NestedComponent,
  address: AddressComponent,
  base: Component,
  content: ContentComponent,
  container: ContainerComponent,
  datagrid: DataGridComponent,
  datamap: DataMapComponent,
  datetime: DateTimeComponent,
  day: DayComponent,
  htmlelement: HTMLComponent,
  hidden: HiddenComponent,
  editgrid: EditGridComponent,
  edittable: EditTableComponent,
  form: FormComponent,
  textfield: TextFieldComponent,
  phoneNumber: PhoneNumberComponent,
  email: EmailComponent,
  url: UrlComponent,
  time: TimeComponent,
  checkbox: CheckBoxComponent,
  currency: CurrencyComponent,
  fieldset: FieldsetComponent,
  signature: SignatureComponent,
  select: SelectComponent,
  resource: ResourceComponent,
  textarea: TextAreaComponent,
  tags: TagsComponent,
  button: ButtonComponent,
  number: NumberComponent,
  password: PasswordComponent,
  panel: PanelComponent,
  tabs: TabsComponent,
  column: ColumnComponent,
  columns: ColumnsComponent,
  table: TableComponent,
  radio: RadioComponent,
  selectboxes: SelectBoxesComponent,
  survey: SurveyComponent,
  well: WellComponent,
  location: LocationComponent,
  file: FileComponent,
  tree: TreeComponent,
  unknown: UnknownComponent,
  modaledit: ModalEdit,
};
