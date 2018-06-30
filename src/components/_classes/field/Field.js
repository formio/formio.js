import Component from '../component/Component';

export default class Field extends Component {
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

  render(element) {
    return super.render(this.renderTemplate('field', {
      label: this.labelInfo,
      element: element
    }));
  }

  attach(dom) {
    super.attach(dom);
  }

  deattach() {
    if (this.tooltip) {
      this.tooltip.dispose();
    }
  }
}
