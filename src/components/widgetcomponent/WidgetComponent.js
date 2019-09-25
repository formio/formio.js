import _ from 'lodash';
import BaseComponent from '../base/Base';

export default class WidgetComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema(...extend);
  }

  constructor(component, options, data) {
    super(component, options, data);
     // Add the validators date.
     if (this.component.validate.hasOwnProperty('strictDateValidation')) {
      const validators = this.component.validate.strictDateValidation ? ['date', 'strictDateValidation'] : ['date'];
      this.validators.push(...validators);
    }

    if (this.widget) {
      this.component.checkDataValidity = () => {
        this.setPristine(false);
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
    if (this._widget && 'widgetLocale' in this._widget) {
      return this._widget.widgetLocale;
    }
    return null;
  }

  get widgetData() {
    if (this._widget && 'widgetData' in this._widget) {
      return this._widget.widgetData;
    }
    return null;
  }
}
