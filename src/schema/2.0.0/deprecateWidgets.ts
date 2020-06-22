import { eachComponent } from "../../utils/formUtils";

export default (form) => {
  eachComponent(form.components, (component) => {
    switch (component.type) {
      case 'textfield':
        if (component.widget && component.widget.type === 'calendar') {
          component.type = 'datetime';
          component.format = component.widget.format;
          component.placeholder = component.widget.format;
          component.dataType = component.widget.saveAs !== 'text' ? 'datetime' : 'string';
          component.dataFormat = component.widget.dataFormat;
        }
        delete component.widget;
        break;
      case 'datetime':
        component.placeholder = component.widget.format;
        delete component.widget;
        break;
    }
  }, true, null, null);

  return form;
}
