import Multivalue from '../multivalue/Multivalue';
import { delay } from '../../../utils/utils';
import Widgets from '../../../widgets';
import _ from 'lodash';

export default class Input extends Multivalue {
  constructor(component, options, data) {
    super(component, options, data);
    this.triggerUpdateValueAt = _.debounce(this.updateValueAt.bind(this), 100);
  }

  get inputInfo() {
    const attr = {
      name: this.options.name,
      type: this.component.inputType || 'text',
      class: 'form-control',
      lang: this.options.language
    };

    if (this.component.placeholder) {
      attr.placeholder = this.t(this.component.placeholder);
    }

    if (this.component.tabindex) {
      attr.tabindex = this.component.tabindex;
    }

    if (this.shouldDisable) {
      attr.disabled = 'disabled';
    }

    return {
      id: this.key,
      type: 'input',
      changeEvent: 'input',
      content: '',
      attr
    };
  }

  updateMask(textInput, newMaskName) {
    const newMask = this.getMaskByName(newMaskName);
    //destroy previous mask
    if (textInput.mask) {
      textInput.mask.destroy();
    }
    //set new text field mask
    this.setInputMask(textInput, newMask);
    //update text field value after new mask is applied
    this.updateValue();
  }

  get maskOptions() {
    return _.map(this.component.inputMasks, mask => {
      return {
        label: mask.label,
        value: mask.label
      };
    });
  }

  get isMultipleMasksField() {
    return this.component.allowMultipleMasks && !!this.component.inputMasks && !!this.component.inputMasks.length;
  }

  getMaskByName(maskName) {
    const inputMask = _.find(this.component.inputMasks, (inputMask) => {
      return inputMask.label === maskName;
    });
    return inputMask ? inputMask.mask : undefined;
  }

  setInputMask(input, inputMask) {
    return super.setInputMask(input, (inputMask || this.component.inputMask), !this.component.placeholder);
  }

  get hasCounter() {
    if (
      _.get(this.component, 'showWordCount', false) ||
      _.get(this.component, 'showCharCount', false)
    ) {
      return true;
    }
    return false;
  }

  get remainingWords() {
    const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords'), 10);
    const wordCount = this.dataValue.trim().split(/\s+/).length;
    return maxWords - wordCount;
  }

  renderElement(value, index) {
    const info = this.inputInfo;
    info.attr = info.attr || {};
    info.attr.value = value;
    return this.renderTemplate('input', {
      input: info,
      index
    });
  }

  setCounter(type, element, count, max) {
    if (max) {
      const remaining = max - count;
      if (remaining > 0) {
        this.removeClass(element, 'text-danger');
      }
      else {
        this.addClass(element, 'text-danger');
      }
      element.innerHTML = this.t(`{{ remaining }} ${type} remaining.`, {
        remaining: remaining
      });
    }
    else {
      element.innerHTML = this.t(`{{ count }} ${type}`, {
        count: count
      });
    }
  }

  updateValueAt(flags, value, index) {
    if (this.refs.counter && this.refs.counter[index]) {
      if (_.get(this.component, 'showWordCount', false)) {
        const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords', 0), 10);
        if (maxWords) {
          this.setCounter('words', this.refs.counter[index], value.trim().split(/\s+/).length, maxWords);
        }
      }
      if (_.get(this.component, 'showCharCount', false)) {
        const maxChars = _.parseInt(_.get(this.component, 'validate.maxLength', 0), 10);
        if (maxChars) {
          this.setCounter('characters', this.refs.counter[index], value.length, maxChars);
        }
      }
    }
  }

  updateValue(flags, value, index) {
    flags = flags || {};
    value = value || this.dataValue;
    index = index || 0;
    this.triggerUpdateValueAt(flags, value, index);
    return super.updateValue(flags, value);
  }

  attach(element) {
    const ret = super.attach(element);
    this.loadRefs(element, {
      counter: 'multiple'
    });
    return ret;
  }

  attachElement(element, index) {
    this.addEventListener(element, this.inputInfo.changeEvent, () => {
      return this.updateValue(null, element.value, index);
    });

    // Attach the widget.
    element.widget = this.createWidget(index);
    element.widget.attach(element);

    // Add focus and blur events.
    this.addFocusBlurEvents(element);

    if (this.options.submitOnEnter) {
      this.addEventListener(element, 'keypress', (event) => {
        const key = event.keyCode || event.which;
        if (key === 13) {
          event.preventDefault();
          event.stopPropagation();
          this.emit('submitButton');
        }
      });
    }

    this.setInputMask(this.refs.input[index]);
  }

  /**
   * Returns the instance of the widget for this component.
   *
   * @return {*}
   */
  get widget() {
    if (this._widget) {
      return this._widget;
    }
    return this.createWidget();
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
    widget.on('update', () => this.updateValue(null, widget.getValue(), index));
    widget.on('redraw', () => this.redraw());
    this._widget = widget;
    return widget;
  }

  addFocusBlurEvents(element) {
    this.addEventListener(element, 'focus', () => {
      if (this.root.focusedComponent !== this) {
        if (this.root.pendingBlur) {
          this.root.pendingBlur();
        }

        this.root.focusedComponent = this;

        this.emit('focus', this);
      }
      else if (this.root.focusedComponent === this && this.root.pendingBlur) {
        this.root.pendingBlur.cancel();
        this.root.pendingBlur = null;
      }
    });
    this.addEventListener(element, 'blur', () => {
      this.root.pendingBlur = delay(() => {
        this.emit('blur', this);
        if (this.component.validateOn === 'blur') {
          this.root.triggerChange({}, {
            instance: this,
            component: this.component,
            value: this.dataValue,
            flags: {}
          });
        }
        this.root.focusedComponent = null;
        this.root.pendingBlur = null;
      });
    });
  }
}
