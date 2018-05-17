import Multivalue from '../multivalue/Multivalue';
import {getInputMask} from '../../../utils/utils';

export default class Input extends Multivalue {
  get labelInfo() {
    const label = {};
    label.hidden = this.labelIsHidden();

    label.className = 'control-label';
    label.style = '';
    label.labelPosition = this.component.labelPosition;
    label.tooltipClass = `${this.iconClass('question-sign')} text-muted`;

    // Determine label styles/classes depending on position.
    if (label.labelPosition === 'bottom') {
      label.className += ' control-label--bottom';
    }
    else if (label.labelPosition && label.labelPosition !== 'top') {
      label.labelWidth = this.getLabelWidth();
      label.labelMargin = this.getLabelMargin();

      // Label is on the left or right.
      if (this.labelOnTheLeft(label.labelPosition)) {
        label.style += `float: left; width: ${label.labelWidth}%; margin-right: ${label.labelMargin}%; `;
      }
      else if (this.labelOnTheRight(label.labelPosition)) {
        label.style += `float: right; width: ${label.labelWidth}%; margin-left: ${label.labelMargin}%; `;
      }
      if (this.rightAlignedLabel(label.labelPosition)) {
        label.style += 'text-align: right; ';
      }
    }

    if (this.hasInput && this.component.validate && this.component.validate.required) {
      label.className += ' field-required';
    }
    if (this.info.attr.id) {
      label.for = this.info.attr.id;
    }
    return label;
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

    return {
      type: 'input',
      attr
    };
  }
  /**
   * Sets the input mask for an input.
   * @param {HTMLElement} input - The html input to apply the mask to.
   */
  setInputMask(input) {
    if (input && this.component.inputMask) {
      const mask = getInputMask(this.component.inputMask);
      this._inputMask = mask;
      // input.mask = maskInput({
      //   inputElement: input,
      //   mask
      // });
      if (mask.numeric) {
        input.setAttribute('pattern', '\\d*');
      }
      if (!this.component.placeholder) {
        input.setAttribute('placeholder', this.maskPlaceholder(mask));
      }
    }
  }

  setInputStyles(input) {
    if (this.labelIsHidden()) {
      return;
    }

    if (this.labelOnTheLeftOrRight(this.component.labelPosition)) {
      const totalLabelWidth = this.getLabelWidth() + this.getLabelMargin();
      input.style.width = `${100 - totalLabelWidth}%`;

      if (this.labelOnTheLeft(this.component.labelPosition)) {
        input.style.marginLeft = `${totalLabelWidth}%`;
      }
      else {
        input.style.marginRight = `${totalLabelWidth}%`;
      }
    }
  }

  renderElement() {
    const template = this.options.templates['input'];
    return this.interpolate(template.form, {
      component: this.component,
      label: this.labelInfo,
      input: this.inputInfo,
    });
  }

  hydrateElement(element) {
    console.log('hydrate element', element);
  }
}
