import Component from '../component/Component';
import Tooltip from 'tooltip.js';

export default class Field extends Component {
  render(element) {
    const template = this.options.templates['field'];
    const html = this.interpolate(template.form, {
      component: this.component,
      label: this.labelInfo,
      element: element
    });
    return super.render(html);
  }

  hydrate(dom) {
    this.loadRefs(dom, {tooltip: 'single', field: 'single'});

    if (this.refs.tooltip) {
      this.tooltip = new Tooltip(this.refs.tooltip, {
        delay: {
          hide: 100
        },
        placement: 'right',
        html: true,
        title: this.component.tooltip.replace(/(?:\r\n|\r|\n)/g, '<br />')
      });
    }

    super.hydrate(dom);
  }

  dehydrate() {
    if (this.tooltip) {
      this.tooltip.dispose();
    }
  }
}
