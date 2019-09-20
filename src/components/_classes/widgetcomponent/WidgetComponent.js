import Input from '../input/Input';

export default class WidgetComponent extends Input {
  static schema(...extend) {
    return Input.schema(...extend);
  }

  constructor(component, options, data) {
    super(component, options, data);

    // Add the validators date/
    if (this.component.validate.hasOwnProperty('strictDateValidation') && this.widget && this.widget.settings.type === 'calendar') {
      const validators = this.component.validate.strictDateValidation ? ['date', 'strictDateValidation'] : ['date'];
      this.validators.push(...validators);
    }

    if (this.widget) {
      this.component.checkDataValidity = () => {
        return this.checkValidity(this.data, true);
      };
    }
  }

  get defaultSchema() {
    return WidgetComponent.schema();
  }

  isEmpty(value) {
    if (this.widget && this.widget.enteredDate) {
      return false;
    }
    return super.isEmpty(value);
  }

  setCustomValidity(message, dirty) {
    if (this.widget && this.widget.toggleInvalidClassForWidget) {
      this.widget.toggleInvalidClassForWidget(message);
    }
    return super.setCustomValidity(message, dirty);
  }

  setValue(value, flags) {
    if (this.widget) {
      this.widget.setValue(value);
    }
    return super.setValue(value, flags);
  }

  get widgetLocale() {
    if (this.widget && 'widgetLocale' in this.widget) {
      return this.widget.widgetLocale;
    }
    return null;
  }

  get widgetData() {
    if (this.widget && 'widgetData' in this.widget) {
      return this.widget.widgetData;
    }
    return null;
  }

  get emptyValue() {
    return '';
  }

  checkValidity(data, dirty, rowData) {
    if (this.widget && this.widget.enteredDate) {
      dirty = true;
    }
    return super.checkValidity(data, dirty, rowData);
  }
}
