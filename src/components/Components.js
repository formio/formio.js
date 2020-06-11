import _ from 'lodash';
import AddressComponent from './address/Address';
import ButtonComponent from './button/Button';
import CheckBoxComponent from './checkbox/Checkbox';
import ColumnsComponent from './columns/Columns';
import Component from './_classes/component/Component';
import ContainerComponent from './container/Container';
import ContentComponent from './content/Content';
import CurrencyComponent from './currency/Currency';
import DataGridComponent from './datagrid/DataGrid';
import DataMapComponent from './datamap/DataMap';
import DateTimeComponent from './datetime/DateTime';
import DayComponent from './day/Day';
import EditGridComponent from './editgrid/EditGrid';
import EmailComponent from './email/Email';
import FieldsetComponent from './fieldset/Fieldset';
import FileComponent from './file/File';
import HiddenComponent from './hidden/Hidden';
import Input from './_classes/input/Input';
import Multivalue from './_classes/multivalue/Multivalue';
import Field from './_classes/field/Field';
import HTMLComponent from './html/HTML';
import NestedComponent from './_classes/nested/NestedComponent';
import NestedDataComponent from './_classes/nesteddata/NestedDataComponent';
import NestedArrayComponent from './_classes/nestedarray/NestedArrayComponent';
import NumberComponent from './number/Number';
import PanelComponent from './panel/Panel';
import PasswordComponent from './password/Password';
import PhoneNumberComponent from './phonenumber/PhoneNumber';
import RadioComponent from './radio/Radio';
import ReCaptchaComponent from './recaptcha/ReCaptcha';
import ResourceComponent from './resource/Resource';
import SelectBoxesComponent from './selectboxes/SelectBoxes';
import SelectComponent from './select/Select';
import SignatureComponent from './signature/Signature';
import SurveyComponent from './survey/Survey';
import TableComponent from './table/Table';
import TabsComponent from './tabs/Tabs';
import TagsComponent from './tags/Tags';
import TextAreaComponent from './textarea/TextArea';
import TextFieldComponent from './textfield/TextField';
import TimeComponent from './time/Time';
import TreeComponent from './tree/Tree';
import UnknownComponent from './unknown/Unknown';
import UrlComponent from './url/Url';
import WellComponent from './well/Well';

export class Components {
  static get components() {
    if (!Components._components) {
      Components._components = {
        address: AddressComponent,
        base: Component,
        component: Component,
        button: ButtonComponent,
        checkbox: CheckBoxComponent,
        columns: ColumnsComponent,
        container: ContainerComponent,
        content: ContentComponent,
        currency: CurrencyComponent,
        datagrid: DataGridComponent,
        datamap: DataMapComponent,
        datetime: DateTimeComponent,
        day: DayComponent,
        editgrid: EditGridComponent,
        email: EmailComponent,
        input: Input,
        field: Field,
        multivalue: Multivalue,
        fieldset: FieldsetComponent,
        file: FileComponent,
        hidden: HiddenComponent,
        htmlelement: HTMLComponent,
        nested: NestedComponent,
        nesteddata: NestedDataComponent,
        nestedarray: NestedArrayComponent,
        number: NumberComponent,
        panel: PanelComponent,
        password: PasswordComponent,
        phoneNumber: PhoneNumberComponent,
        radio: RadioComponent,
        recaptcha: ReCaptchaComponent,
        resource: ResourceComponent,
        select: SelectComponent,
        selectboxes: SelectBoxesComponent,
        signature: SignatureComponent,
        survey: SurveyComponent,
        table: TableComponent,
        tabs: TabsComponent,
        tags: TagsComponent,
        textarea: TextAreaComponent,
        textfield: TextFieldComponent,
        time: TimeComponent,
        tree: TreeComponent,
        unknown: UnknownComponent,
        url: UrlComponent,
        well: WellComponent,
      };
    }
    return Components._components;
  }

  static setComponents(comps) {
    // Set the tableView method on BaseComponent.
    if (comps.base) {
      // Implement the tableView method.
      comps.base.tableView = function(value, options) {
        const comp = Components.create(options.component, options.options || {}, options.data || {}, true);
        return comp.getView(value);
      };
    }
    _.assign(Components.components, comps);
  }

  static addComponent(name, comp) {
    return Components.setComponent(name, comp);
  }

  static setComponent(name, comp) {
    Components.components[name] = comp;
  }

  static create(component, options, data) {
    let comp = null;
    if (component.type && Components.components.hasOwnProperty(component.type)) {
      comp = new Components.components[component.type](component, options, data);
    }
    else if (component.arrayTree) {
      // eslint-disable-next-line new-cap
      comp = new Components.components['datagrid'](component, options, data);
    }
    else if (component.tree) {
      // eslint-disable-next-line new-cap
      comp = new Components.components['nesteddata'](component, options, data);
    }
    else if (Array.isArray(component.components)) {
      // eslint-disable-next-line new-cap
      comp = new Components.components['nested'](component, options, data);
    }
    else {
      comp = new Component(component, options, data);
    }
    return comp;
  }
}
