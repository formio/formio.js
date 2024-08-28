import Field from '../field/Field';
import _ from 'lodash';

export default class Multivalue extends Field {
  get dataValue() {
    const parent = super.dataValue;

    if (!parent && this.component.multiple) {
      return [];
    }
    return parent;
  }

  set dataValue(value) {
    super.dataValue = value;
  }

  get defaultValue() {
    let value = super.defaultValue;

    if (this.component.multiple) {
      if (_.isArray(value)) {
        value = !value.length ? [super.emptyValue] : value;
      }
      else {
        value = [value];
      }
    }

    return value;
  }

  get addAnother() {
    return this.t(this.component.addAnother || 'Add Another');
  }

  get hasMultipleParam() {
    return this.component.hasOwnProperty('multiple') && this.component.multiple;
  }

  /**
   * Ensures the dataValue is an array if the component is a multiple value component, and not an array if not.
   * NOTE: mutates this.dataValue
   */
  normalizeDataValue() {
    if (this.hasMultipleParam && !Array.isArray(this.dataValue)) {
      this.dataValue = this.dataValue ? [this.dataValue] : [];
    } else if (!this.hasMultipleParam && Array.isArray(this.dataValue)) {
      this.dataValue = this.dataValue[0] || this.emptyValue;
    }
  }

  /**
   * @returns {Field} - The created field.
   */
  render() {
    // Normalize the data value before we render.
    this.normalizeDataValue();

    return this.hasMultipleParam
      ? super.render(
          this.renderTemplate('multiValueTable', {
            rows: this.dataValue.map(this.renderRow.bind(this)).join(''),
            disabled: this.disabled,
            addAnother: this.addAnother,
          })
        )
      : super.render(
          `<div ${this._referenceAttributeName}="element">
            ${this.renderElement(
              this.component.type !== 'hidden' ? this.dataValue : ''
            )}
          </div>`
        );
  }

  renderElement() {
    return '';
  }

  /**
   * Renders a single row for multi-value components.
   * @param {any} value - The value associated with the row to render.
   * @param {number} index - The index of the row in the multi-value list.
   * @returns {any} Returns the HTML string representation of the row.
   */
  renderRow(value, index) {
    return this.renderTemplate('multiValueRow', {
      index,
      disabled: this.disabled,
      element: `${this.renderElement(value, index)}`,
    });
  }

  /**
   * @param {HTMLElement} dom - The DOM element to which the component will attach.
   * @returns {Promise} - Promise that resolves when all asynchronous tasks that have finished.
   */
  attach(dom) {
    const superAttach = super.attach(dom);
    this.loadRefs(dom, {
      addButton: 'multiple',
      input: 'multiple',
      removeRow: 'multiple',
      mask: 'multiple',
      select: 'multiple',
    });

    const promises = [];

    this.refs.input.forEach((element, index) => {
      promises.push(this.attachElement.call(this, element, index));
    });

    if (!this.component.multiple) {
      return Promise.all(promises);
    }

    this.refs.removeRow.forEach((removeButton, index) => {
      this.addEventListener(removeButton, 'click', (event) => {
        event.preventDefault();
        this.removeValue(index);
      });
    });

    // If single value field.
    this.refs.addButton.forEach((addButton) => {
      this.addEventListener(addButton, 'click', (event) => {
        event.preventDefault();
        this.addValue();
      });
    });
    return superAttach.then(() => {
      return Promise.all(promises);
    });
  }


  /**
   * Remove all event handlers.
   */
  detach() {
    if (this.refs.input && this.refs.input.length) {
      this.refs.input.forEach((input) => {
        if (input.mask) {
          input.mask.destroy ? input.mask.destroy() : input.mask.remove();
        }
        if (input.widget) {
          input.widget.destroy();
        }
      });
    }
    if (this.refs.mask && this.refs.mask.length) {
      this.refs.mask.forEach((input) => {
        if (input.mask) {
          input.mask.destroy ? input.mask.destroy() : input.mask.remove();
        }
      });
    }
    super.detach();
  }

  /**
   * Attach inputs to the element.
   * @param {HTMLElement} element - The element to attach.
   * @param {number} index - The index of the element to attach.
   */
  attachElement(element, index) {
    this.addEventListener(element, this.inputInfo.changeEvent, () => {
      // Delay update slightly to give input mask a chance to run.
      const textCase = _.get(this.component, 'case', 'mixed');

      if (textCase !== 'mixed') {
        const {
          selectionStart,
          selectionEnd,
        } = element;

        if (textCase === 'uppercase' && element.value) {
          element.value = element.value.toUpperCase();
        }
        if (textCase === 'lowercase' && element.value) {
          element.value = element.value.toLowerCase();
        }

        if (element.selectionStart && element.selectionEnd) {
          element.selectionStart = selectionStart;
          element.selectionEnd = selectionEnd;
        }
      }

      try {
        this.saveCaretPosition(element, index);
      }
      catch (err) {
        console.warn('An error occurred while trying to save caret position', err);
      }

      // If a mask is present, delay the update to allow mask to update first.
      if (element.mask) {
        setTimeout(() => {
          return this.updateValue(null, {
            modified: (this.component.type !== 'hidden')
          }, index);
        }, 1);
      }
      else {
        return this.updateValue(null, {
          modified: (this.component.type !== 'hidden')
        }, index);
      }
    });

    if (!this.attachMultiMask(index)) {
      const applyMask = () => {
        this.setInputMask(element);

        const valueMask = this.component.inputMask;
        const displayMask = this.component.displayMask;

        if (valueMask && displayMask && displayMask !== valueMask && this.refs.valueMaskInput) {
          this.setInputMask(this.refs.valueMaskInput, valueMask);
        }
      };

      if (this.inputInfo.changeEvent === 'blur') {
        this.addEventListener(element, this.inputInfo.changeEvent, () => {
          applyMask();
          this.dataValue = this.refs.input[0].value;
          if (this.checkComponentValidity()) {
            this.updateComponentValue(this.refs.input[0].value);
          }
        });
      }
      else {
        applyMask();
      }
    }
  }

  /**
   * Event handler for selecting a mask from a dropdown.
   * @param {Event} event - Event triggered by changing the selected option in mask.
   */
  onSelectMaskHandler(event) {
    this.updateMask(event.target.maskInput, this.getMaskPattern(event.target.value));
  }

  /**
   * Retrieves the mask pattern for a given mask name
   * @param {string} maskName - The name of the mask to retrieve.
   * @returns {any} The mask pattern associated with the given mask name.
   */
  getMaskPattern(maskName) {
    if (!this.multiMasks) {
      this.multiMasks = {};
    }
    if (this.multiMasks[maskName]) {
      return this.multiMasks[maskName];
    }
    const mask = this.component.inputMasks.find(inputMask => inputMask.label === maskName);
    this.multiMasks[maskName] = mask ? mask.mask : this.component.inputMasks[0].mask;
    return this.multiMasks[maskName];
  }

  /**
   * Attaches a selectable mask to an input field based on its configuration.
   * @param {number} index - The index of the select or input in component array.
   * @returns {boolean} - Returns true if the mask was successfully attached
   */
  attachMultiMask(index) {
    if (!(this.isMultipleMasksField && this.component.inputMasks.length && this.refs.input.length)) {
      return false;
    }

    const maskSelect = this.refs.select[index];
    maskSelect.onchange = this.onSelectMaskHandler.bind(this);
    maskSelect.maskInput = this.refs.mask[index];
    this.setInputMask(maskSelect.maskInput, this.component.inputMasks[0].mask);
    return true;
  }

  /**
   * @param {any} input - The input element on which the mask is to be applied.
   * @param {string} mask - The mask pattern to apply to the input element. Exit early and remove previous mask if no mask.
   */
  updateMask(input, mask) {
    if (!mask) {
      if (input.mask) {
        input.mask.destroy();
      }
      if (!this.component.placeholder) {
        input.removeAttribute('placeholder');
      }
      input.value = '';
      return;
    }
    this.setInputMask(input, mask, !this.component.placeholder);
    this.updateValue();
  }

  /**
   * Adds a new empty value to the data array.
   * @param {any} value -A value to be added to the data array.
   */
  addNewValue(value) {
    if (value === undefined) {
      value = this.component.defaultValue ?
      this.component.defaultValue : this.emptyValue;
      // If default is an empty aray, default back to empty value.
      if (Array.isArray(value) && value.length === 0) {
        value = this.emptyValue;
      }
    }
    let dataValue = this.dataValue || [];
    if (!Array.isArray(dataValue)) {
      dataValue = [dataValue];
    }

    if (Array.isArray(value)) {
      dataValue = dataValue.concat(value);
    }
    else {
      dataValue.push(value);
    }
    this.dataValue = dataValue;
  }

  /**
   * Adds a new empty value to the data array, and add a new row to contain it.
   */
  addValue() {
    this.addNewValue();
    this.redraw();
    this.checkConditions();
    if (!this.isEmpty(this.dataValue)) {
      this.restoreValue();
    }
    if (this.root) {
      this.root.onChange();
    }
  }
}
