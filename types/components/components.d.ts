import { ExtendedComponentSchema } from './schema';
import { Component } from './_classes/component/component';
import { ComponentModal } from './_classes/componentmodal/componentmodal';
import { Field } from './_classes/field/field';
import { Input } from './_classes/input/input';
import { Multivalue } from './_classes/multivalue/multivalue';
import { NestedComponent } from './_classes/nested/nestedComponent';
import { WidgetComponent } from './_classes/widgetcomponent/widgetComponent';

type ClassWithEditForm<C> = C & { editForm: () => { components: ExtendedComponentSchema[] } };

export namespace Components {
  function setComponents(comps: Object): void;
  function setComponent(name: string, comp: Object): void;
  function addComponent(name: string, comp: Object): void;
  function create(component: any, options: Object, data?: any, flag?: any): Object;
  let baseEditForm: any;
  let EditFormUtils: any;
  namespace components {
    class base extends Component {}
    class componentmodal extends ComponentModal {}
    class input extends Input {}
    class nested extends NestedComponent {}
    class multivalue extends Multivalue {}
    class field extends Field {}

    const address: ClassWithEditForm<typeof WidgetComponent>;
    const button: ClassWithEditForm<typeof Field>;
    const checkbox: ClassWithEditForm<typeof Field>;
    const columns: ClassWithEditForm<typeof NestedComponent>;
    const container: ClassWithEditForm<typeof NestedComponent>;
    const content: ClassWithEditForm<typeof Component>;
    const currency: ClassWithEditForm<typeof Input>;
    const datagrid: ClassWithEditForm<typeof NestedComponent>;
    const datamap: ClassWithEditForm<typeof NestedComponent>;
    const datetime: ClassWithEditForm<typeof WidgetComponent>;
    const day: ClassWithEditForm<typeof Field>;
    const editgrid: ClassWithEditForm<typeof NestedComponent>;
    const email: ClassWithEditForm<typeof WidgetComponent>;
    const fieldset: ClassWithEditForm<typeof NestedComponent>;
    const file: ClassWithEditForm<typeof Field>;
    const form: ClassWithEditForm<typeof Component>;
    const hidden: ClassWithEditForm<typeof Input>;
    const htmlelement: ClassWithEditForm<typeof Component>;
    const number: ClassWithEditForm<typeof Input>;
    const panel: ClassWithEditForm<typeof NestedComponent>;
    const password: ClassWithEditForm<typeof WidgetComponent>;
    const phoneNumber: ClassWithEditForm<typeof WidgetComponent>;
    const radio: ClassWithEditForm<typeof Field>;
    const recaptcha: ClassWithEditForm<typeof Component>;
    const resource: ClassWithEditForm<typeof Field>;
    const select: ClassWithEditForm<typeof Field>;
    const selectboxes: ClassWithEditForm<typeof Field>;
    const signature: ClassWithEditForm<typeof Input>;
    const sketchpad: ClassWithEditForm<typeof Field>;
    const survey: ClassWithEditForm<typeof Field>;
    const table: ClassWithEditForm<typeof NestedComponent>;
    const tabs: ClassWithEditForm<typeof NestedComponent>;
    const tagpad: ClassWithEditForm<typeof NestedComponent>;
    const tags: ClassWithEditForm<typeof Input>;
    const textarea: ClassWithEditForm<typeof WidgetComponent>;
    const textfield: ClassWithEditForm<typeof WidgetComponent>;
    const time: ClassWithEditForm<typeof WidgetComponent>;
    const tree: ClassWithEditForm<typeof NestedComponent>;
    const unknown: ClassWithEditForm<typeof Component>;
    const url: ClassWithEditForm<typeof WidgetComponent>;
    const well: ClassWithEditForm<typeof NestedComponent>;
  }
}
