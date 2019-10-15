import Input from '../input/Input';
import Widgets from '../../../widgets';

export default class WidgetComponent extends Input {
  static schema(...extend) {
    return Input.schema({
      widget: {
        type: 'input'
      }
    }, ...extend);
  }

  constructor(component, options, data) {
    super(component, options, data);

    // Add the validators date/
    if (
      this.component.validate.hasOwnProperty('strictDateValidation') &&
      this.component.settings &&
      this.component.settings.widget &&
      this.component.settings.widget.type === 'calendar'
    ) {
      const validators = this.component.validate.strictDateValidation ? ['date', 'strictDateValidation'] : ['date'];
      this.validators.push(...validators);
    }

    this.component.checkDataValidity = () => {
      return this.checkValidity(this.data, true);
    };
  }

  get defaultSchema() {
    return WidgetComponent.schema();
  }

  /**
   * Creates an instance of a widget for this component.
   *
   * @return {null}
   */
  createWidget(index) {
    // Return null if no widget is found.
    if (!this.component.widget) {
      return null;
    }

    // Get the widget settings.
    const settings = (typeof this.component.widget === 'string') ? {
      type: this.component.widget
    } : this.component.widget;

    // Make sure we have a widget.
    if (!Widgets.hasOwnProperty(settings.type)) {
      return null;
    }

    // Create the widget.
    const widget = new Widgets[settings.type](settings, this.component);
    widget.on('update', () => this.updateValue(widget.getValue(), {
      modified: true
    }, index), true);
    widget.on('redraw', () => this.redraw(), true);

    return widget;
  }

  attachElement(element, index) {
    super.attachElement(element, index);

    // Attach the widget.
    const input = this.performInputMapping(this.refs.input[index]);
    input.widget = this.createWidget(index);
    if (input.widget) {
      input.widget.attach(element);
      if (this.refs.prefix && this.refs.prefix[index]) {
        input.widget.addPrefix(this.refs.prefix[index]);
      }
      if (this.refs.suffix && this.refs.suffix[index]) {
        input.widget.addSuffix(this.refs.suffix[index]);
      }
    }
  }

  setCustomValidity(message, dirty, external) {
    this.refs.input.forEach((input) => {
      if (input.widget) {
        input.widget.toggleInvalidClassForWidget(message);
      }
    });
    return super.setCustomValidity(message, dirty, external);
  }

  getValueAt(index) {
    const input = this.performInputMapping(this.refs.input[index]);
    if (input && input.widget) {
      return input.widget.getValue();
    }
    return input ? input.value : undefined;
  }

  setValueAt(index, value, flags) {
    flags = flags || {};
    if (!flags.noDefault && (value === null || value === undefined) && !this.component.multiple) {
      value = this.defaultValue;
    }
    const input = this.performInputMapping(this.refs.input[index]);
    if (input.mask) {
      input.mask.textMaskInputElement.update(value);
    }
    else if (input.widget) {
      input.widget.setValue(value);
    }
    else {
      input.value = value;
    }
  }

  checkValidity(data, dirty, rowData) {
    // Mark as dirty if any input has an entered date.
    dirty = Array.prototype.reduce.call(this.refs.input, (dirty, input) => dirty || (input.widget && input.widget.enteredDate), dirty);
    return super.checkValidity(data, dirty, rowData);
  }

  destroy() {
    if (this.refs.input && this.refs.input.length) {
      this.refs.input.forEach((input) => {
        if (input.widget) {
          input.widget.destroy();
        }
      });
    }

    super.destroy();
  }
}
