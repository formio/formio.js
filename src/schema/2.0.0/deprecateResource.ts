import { eachComponent } from "../../utils/formUtils";

export default (form) => {
  eachComponent(form.components, (component) => {
    switch (component.type) {
      case 'resource':
        component.type = 'select';
        component.dataSrc = 'resource';
        component.data = {
          resource: component.resource,
        };
        delete component.resource;
        break;
    }
  }, false, null, null);

  return form;
}
