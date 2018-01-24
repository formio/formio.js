import { FormioComponents } from '../Components';
export class CollapsiblePanelComponent extends FormioComponents {
  build() {
		let componentId = this.component.id || Math.random().toString(36).substring(7);
    this.element = this.ce('div', {
      class: 'panel panel-' + (this.component.theme || 'primary')	+ ' ' + (this.component.customClass || '')
    });
    if (this.component.title) {
      let heading = this.ce('div', {
        class: 'panel-heading'
      });
      let title = this.ce('h3', {
        class: 'panel-title'
      });
      let collapseTitle = this.ce('a', {
        'data-toggle': 'collapse',
        href: `#collapse-${componentId}`
      });
      title.appendChild(this.text(this.component.title));
      this.createTooltip(title);
      collapseTitle.appendChild(title);
      heading.appendChild(collapseTitle);
      this.element.appendChild(heading);
    }
		let bodyWrapper = this.ce('div', {
			id: `collapse-${componentId}`,
			class: 'panel-collapse collapse'
		});
    let body = this.ce('div', {
      class: 'panel-body'
    });
		bodyWrapper.appendChild(body);
    this.addComponents(body);
    this.element.appendChild(bodyWrapper);
  }
}
