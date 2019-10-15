import Multivalue from '../multivalue/Multivalue';
import { delay } from '../../../utils/utils';
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

    if (this.disabled) {
      attr.disabled = 'disabled';
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

  get emptyValue() {
    return '';
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

  get remainingWords() {
    const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords'), 10);
    const wordCount = _.words(this.dataValue).length;
    return maxWords - wordCount;
  }

  renderElement(value, index) {
    const info = this.inputInfo;
    info.attr = info.attr || {};
    info.attr.value = this.getValueAsString(this.formatValue(this.parseValue(value)));
    if (this.isMultipleMasksField) {
      info.attr.class += ' formio-multiple-mask-input';
    }
    // This should be in the calendar widget but it doesn't have access to renderTemplate.
    if (this.component.widget && this.component.widget.type === 'calendar') {
      this.component.suffix = this.renderTemplate('icon', {
        ref: 'icon',
        className: this.iconClass(this.component.enableDate || this.component.widget.enableDate ? 'calendar' : 'time'),
        styles: '',
        content: ''
      });
    }

    return this.isMultipleMasksField
      ? this.renderTemplate('multipleMasksInput', {
        input: info,
        value,
        index,
        selectOptions: this.getMaskOptions() || [],
      })
      : this.renderTemplate('input', {
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
    if (_.get(this.component, 'showWordCount', false)) {
      if (this.refs.wordcount && this.refs.wordcount[index]) {
        const maxWords = _.parseInt(_.get(this.component, 'validate.maxWords', 0), 10);
        this.setCounter('words', this.refs.wordcount[index], _.words(value).length, maxWords);
      }
    }
    if (_.get(this.component, 'showCharCount', false)) {
      if (this.refs.charcount && this.refs.charcount[index]) {
        const maxChars = _.parseInt(_.get(this.component, 'validate.maxLength', 0), 10);
        this.setCounter('characters', this.refs.charcount[index], value.length, maxChars);
      }
    }
  }

  updateValue(value, flags, index) {
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

  attachElement(element, index) {
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
    return super.attachElement(element, index);
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
