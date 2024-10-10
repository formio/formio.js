import Component from '../component/Component';

/*
 * Field class is a base class for all fields.
 * @extends Component
 */
export default class Field extends Component {
  /**
   * @param {object} element - The component to create.
   * @returns {Field} - The created field.
   */
  render(element) {
    if (this.noField) {
      return super.render(element);
    }
    else if (this.isAdvancedLabel || this.options.condensedMode) {
      return super.render(this.renderTemplate('field', {
        ...this.getLabelInfo(this.options.condensedMode),
        labelMarkup: this.renderTemplate('label'),
        element: element
      }, 'align'));
    }
    else {
      return super.render(this.renderTemplate('field', {
        labelMarkup: this.renderTemplate('label'),
        element: element,
      }));
    }
  }

  /**
  /* Saves current caret position to restore it after the component is redrawn
   * @param {HTMLElement} element - The element to save the caret position for.
   * @param {number} index - The index of the element.
   */
  saveCaretPosition(element, index) {
    if (this.root?.focusedComponent?.path === this.path) {
      try {
        this.root.currentSelection = { selection: [element.selectionStart, element.selectionEnd], index };
      }
      catch (e) {
        if (!(e instanceof DOMException)) {
          console.debug(e);
        }
      }
    }
  }
}
