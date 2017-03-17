import { AddressComponent } from './address/Address';
import { BaseComponent } from './base/Base';
import { ContentComponent } from './content/Content';
import { ContainerComponent } from './container/Container';
import { DataGridComponent } from './datagrid/DataGrid';
import { DateTimeComponent } from './datetime/DateTime';
import { DayComponent } from './day/Day';
import { HTMLComponent } from './html/HTML';
import { HiddenComponent } from './hidden/Hidden';
import { TextFieldComponent } from './textfield/TextField';
import { PhoneNumberComponent } from './phonenumber/PhoneNumber';
import { EmailComponent } from './email/Email';
import { CheckBoxComponent } from './checkbox/Checkbox';
import { CurrencyComponent } from './currency/Currency';
import { FieldsetComponent } from './fieldset/Fieldset';
import { SignatureComponent } from './signature/Signature';
import { SelectComponent } from './select/Select';
import { ResourceComponent } from './resource/Resource';
import { TextAreaComponent } from './textarea/TextArea';
import { ButtonComponent } from './button/Button';
import { NumberComponent } from './number/Number';
import { PasswordComponent } from './password/Password';
import { PanelComponent } from './panel/Panel';
import { ColumnComponent } from './columns/Column';
import { ColumnsComponent } from './columns/Columns';
import { TableComponent } from './table/Table';
import { UnknownComponent } from './unknown/Unknown';
import { RadioComponent } from './radio/Radio';
import { SelectBoxesComponent } from './selectboxes/SelectBoxes';
import { SurveyComponent } from './survey/Survey';
import { WellComponent } from './well/Well';
import { GmapComponent } from './gmap/Gmap';
module.exports = {
  address: AddressComponent,
  base: BaseComponent,
  content: ContentComponent,
  container: ContainerComponent,
  datagrid: DataGridComponent,
  datetime: DateTimeComponent,
  day: DayComponent,
  htmlelement: HTMLComponent,
  hidden: HiddenComponent,
  textfield: TextFieldComponent,
  phoneNumber: PhoneNumberComponent,
  email: EmailComponent,
  checkbox: CheckBoxComponent,
  currency: CurrencyComponent,
  fieldset: FieldsetComponent,
  signature: SignatureComponent,
  select: SelectComponent,
  resource: ResourceComponent,
  textarea: TextAreaComponent,
  button: ButtonComponent,
  number: NumberComponent,
  password: PasswordComponent,
  panel: PanelComponent,
  column: ColumnComponent,
  columns: ColumnsComponent,
  table: TableComponent,
  unknown: UnknownComponent,
  radio: RadioComponent,
  selectboxes: SelectBoxesComponent,
  survey: SurveyComponent,
  well: WellComponent,
  gmap: GmapComponent,
  create: function(component, options, data) {
    let comp = null;
    if (!component.type) {
      return null;
    }
    else if (this.hasOwnProperty(component.type)) {
      comp = new this[component.type](component, options, data);
    }
    else {
      comp = new UnknownComponent(component, options, data);
    }
    comp.build();
    return comp;
  }
};
