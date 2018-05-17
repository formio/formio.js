import Component from '../component/Component';
import Tooltip from 'tooltip.js';

export default class Multivalue extends Component {
  render() {
    const template = this.options.templates['singleValue'];
    const html = this.interpolate(template.form, {
      component: this.component,
      label: this.labelInfo,
      input: this.inputInfo,
      element: this.renderElement()
    });
    return super.render(html);
  }

  hydrate(element) {
    super.hydrate(element);

    this.tooltip = new Tooltip(this.refs.tooltip, {
      delay: {
        hide: 100
      },
      placement: 'right',
      html: true,
      title: this.component.tooltip.replace(/(?:\r\n|\r|\n)/g, '<br />')
    });
  }
}
