import Component from '../component/Component';

export default class Field extends Component {
  get labelInfo() {
    const label = {};
    label.hidden = this.labelIsHidden();

    label.className = '';
    label.labelPosition = this.component.labelPosition;
    label.tooltipClass = `${this.iconClass('question-sign')} text-muted`;

    if (this.hasInput && this.component.validate && this.component.validate.required) {
      label.className += ' field-required';
    }
    if (label.hidden) {
      label.className += ' control-label--hidden';
    }
    if (this.info.attr.id) {
      label.for = this.info.attr.id;
    }
    return label;
  }

  get className() {
    let className = super.className;
    if (this.labelIsHidden()) {
      className += ' formio-component-label-hidden';
    }
    return className;
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
