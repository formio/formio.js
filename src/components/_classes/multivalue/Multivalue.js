import Field from '../field/Field';
import Tooltip from 'tooltip.js';

export default class Multivalue extends Field {
  get addAnother() {
    return this.t(this.component.addAnother || ' Add Another');
  }

  render() {
    // If single value field.
    if (!this.component.multiple) {
      return super.render(`<div ref="element">${this.renderElement(this.dataValue)}</div>`);
    }

    // If multiple value field.
    console.log(this.dataValue, this.dataValue.map(this.renderRow.bind(this)).join(''));

    const template = this.options.templates['multiValueTable'];
    return super.render(this.interpolate(template.form, {
      rows: this.dataValue.map(this.renderRow.bind(this)).join(''),
      addAnother: this.addAnother,
    }));
  }

  renderRow(value, index) {
    const template = this.options.templates['multiValueRow'];
    return this.interpolate(template.form, {
      index,
      element: `<div ref="element">${this.renderElement(this.dataValue)}</div>`,
    });
  }

  hydrate(dom) {
    this.loadRefs(dom, {tooltip: 'single', element: 'multiple'});

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

    if (this.refs.element) {
      this.refs.element.forEach(this.hydrateElement.bind(this));
    }

    // this.addEventListener(addButton, 'click', (event) => {
    //   event.preventDefault();
    //   this.addValue();
    // });
    //
    // this.addEventListener(removeButton, 'click', (event) => {
    //   event.preventDefault();
    //   this.removeValue(index);
    // });

    super.hydrate(dom);
  }

  dehydrate() {
    if (this.tooltip) {
      this.tooltip.dispose();
    }
  }
}
