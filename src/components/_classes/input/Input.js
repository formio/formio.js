import Multivalue from '../multivalue/Multivalue';
import { delay, convertStringToHTMLElement } from '../../../utils/utils';
import Widgets from '../../../widgets';
import NativePromise from 'native-promise-only';
import _ from 'lodash';

export default class Input extends Multivalue {
  constructor(component, options, data) {
    super(component, options, data);
    this.triggerUpdateValueAt = _.debounce(this.updateValueAt.bind(this), 100);
  }

  static schema(...extend) {
    return Multivalue.schema({
      widget: {
        type: 'input'
      }
    }, ...extend);
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

    if (this.disabled) {
      attr.disabled = 'disabled';
    }

    if (this.component.autocomplete) {
      attr.autocomplete = this.component.autocomplete;
    }

    _.defaults(attr, this.component.attributes);

    return {
      id: this.key,
      type: 'input',
      changeEvent: 'input',
      content: '',
      attr
    };
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

  getMaskOptions() {
    return this.component.inputMasks
      .map(mask => ({
        label: mask.label,
        value: mask.label,
      }));
  }

  getWordCount(value) {
    return value.trim().split(/\s+/).length;
  }

  get remainingWords() {
    const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords'), 10);
    const wordCount = this.getWordCount(this.dataValue);
    return maxWords - wordCount;
  }

  get prefix() {
    return this.component.prefix;
  }

  get suffix() {
    if (this.component.widget && this.component.widget.type === 'calendar') {
      const calendarIcon = this.renderTemplate('icon', {
        ref: 'icon',
        // After font-awesome would be updated to v5.x, "clock-o" should be replaced with "clock"
        className: this.iconClass(this.component.enableDate || this.component.widget.enableDate ? 'calendar' : 'clock-o'),
        styles: '',
        content: ''
      }).trim();
      if (this.component.prefix !== calendarIcon) {
        // converting string to HTML markup to render correctly DateTime component in portal.form.io
        return convertStringToHTMLElement(calendarIcon, '[ref="icon"]');
      }
    }
    return this.component.suffix;
  }

  renderElement(value, index) {
    // Double quotes cause the input value to close so replace them with html quote char.
    if (value && typeof value === 'string') {
      value = value.replace(/"/g, '&quot;');
    }
    const info = this.inputInfo;
    info.attr = info.attr || {};
    info.attr.value = this.getValueAsString(this.formatValue(this.parseValue(value)));
    if (this.isMultipleMasksField) {
      info.attr.class += ' formio-multiple-mask-input';
    }

    return this.isMultipleMasksField
      ? this.renderTemplate('multipleMasksInput', {
        input: info,
        value,
        index,
        selectOptions: this.getMaskOptions() || [],
      })
      : this.renderTemplate('input', {
        prefix: this.prefix,
        suffix: this.suffix,
        input: info,
        value: this.formatValue(this.parseValue(value)),
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
      this.setContent(element, this.t(`{{ remaining }} ${type} remaining.`, {
        remaining: remaining
      }));
    }
    else {
      this.setContent(element, this.t(`{{ count }} ${type}`, {
        count: count
      }));
    }
  }

  updateValueAt(value, flags, index) {
    flags = flags || {};
    if (_.get(this.component, 'showWordCount', false)) {
      if (this.refs.wordcount && this.refs.wordcount[index]) {
        const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords', 0), 10);
        this.setCounter(this.t('words'), this.refs.wordcount[index], this.getWordCount(value), maxWords);
      }
    }
    if (_.get(this.component, 'showCharCount', false)) {
      if (this.refs.charcount && this.refs.charcount[index]) {
        const maxChars = _.parseInt(_.get(this.component, 'validate.maxLength', 0), 10);
        this.setCounter(this.t('characters'), this.refs.charcount[index], value.length, maxChars);
      }
    }
  }

  getValueAt(index) {
    const input = this.performInputMapping(this.refs.input[index]);
    if (input && input.widget) {
      return input.widget.getValue();
    }
    return input ? input.value : undefined;
  }

  updateValue(value, flags, index) {
    flags = flags || {};
    const changed = super.updateValue(value, flags);
    this.triggerUpdateValueAt(this.dataValue, flags, index);
    return changed;
  }

  parseValue(value) {
    return value;
  }

  formatValue(value) {
    return value;
  }

  attach(element) {
    this.loadRefs(element, {
      charcount: 'multiple',
      wordcount: 'multiple',
      prefix: 'multiple',
      suffix: 'multiple'
    });
    return super.attach(element);
  }

  getWidget(index) {
    index = index || 0;
    if (this.refs.input && this.refs.input[index]) {
      return this.refs.input[index].widget;
    }
    return null;
  }

  getValueAsString(value, options) {
    return super.getValueAsString(this.getWidgetValueAsString(value, options), options);
  }

  attachElement(element, index) {
    super.attachElement(element, index);
    if (element.widget) {
      element.widget.destroy();
    }
    // Attach the widget.
    let promise = NativePromise.resolve();
    element.widget = this.createWidget(index);
    if (element.widget) {
      promise = element.widget.attach(element);
      if (this.refs.prefix && this.refs.prefix[index]) {
        element.widget.addPrefix(this.refs.prefix[index]);
      }
      if (this.refs.suffix && this.refs.suffix[index]) {
        element.widget.addSuffix(this.refs.suffix[index]);
      }
    }

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
    return promise;
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

  detach() {
    super.detach();
    if (this.refs && this.refs.input) {
      for (let i = 0; i <= this.refs.input.length; i++) {
        const widget = this.getWidget(i);
        if (widget) {
          widget.destroy();
        }
      }
    }
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
