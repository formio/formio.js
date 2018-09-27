import WebformBuilder from './WebformBuilder';
import _ from 'lodash';

export default class WizardBuilder extends WebformBuilder {
  setBuilderElement() {
    return super.setBuilderElement().then(() => {
      const buildRegion = this.ce('div', {
        class: 'col-xs-8 col-sm-9 col-md-10 formarea'
      });

      this.element.setAttribute('class', '');
      this.element.noDrop = true;
      this.wrapper.insertBefore(buildRegion, this.element);
      this.pageBar = this.ce('ol', {
        class: 'breadcrumb'
      });

      buildRegion.appendChild(this.pageBar);
      buildRegion.appendChild(this.element);
      this.currentPage = 0;
    });
  }

  get currentPage() {
    return this._currentPage || 0;
  }

  set currentPage(currentPage) {
    this._currentPage = currentPage;
  }

  get pages() {
    return _.filter(this.component.components, { type: 'panel' });
  }

  addSubmitButton() {
    // Do nothing...
  }

  deleteComponent(component) {
    if (super.deleteComponent(component)) {
      this.gotoPage(0);
    }
  }

  addPage() {
    const pageNum = (this.pages.length + 1);
    const newPage = {
      title: `Page ${pageNum}`,
      label: `Page ${pageNum}`,
      type: 'panel',
      key: `page${pageNum}`
    };
    this.component.components.push(newPage);
    this.addComponent(newPage);
    this.emit('saveComponent', newPage);
    this.form = this.schema;
    this.redraw();
  }

  addComponents(element, data, options, state) {
    element = element || this.getContainer();
    data = data || this.data;
    const components = this.hook('addComponents', this.componentComponents, this);
    _.each(components, (component, index) => {
      this.addComponent(component, element, data, null, (index !== this.currentPage), state);
    });
  }

  gotoPage(page) {
    this.currentPage = page;
    this.redraw();
  }

  /**
   * Only show the current page.
   *
   * @return {Array}
   */
  get componentComponents() {
    const components = this.pages;
    components.nodrop = true;
    return components;
  }

  buildPageBar() {
    const pages = this.pages;

    // Always ensure we have a single page.
    if (!pages.length) {
      return this.addPage();
    }

    this.empty(this.pageBar);
    _.each(pages, (page, index) => {
      const pageLink = this.ce('span', {
        title: page.title,
        class: (index === this.currentPage) ?
          'mr-2 badge badge-primary bg-primary label label-primary wizard-page-label' :
          'mr-2 badge badge-info bg-info label label-info wizard-page-label'
      }, this.text(page.title));
      this.pageBar.appendChild(this.ce('li', null, pageLink));
      this.addEventListener(pageLink, 'click', (event) => {
        event.preventDefault();
        this.gotoPage(index);
      });
    });

    const newPage = this.ce('span', {
      title: this.t('Create Page'),
      class: 'mr-2 badge badge-success bg-success label label-success wizard-page-label'
    }, [
      this.getIcon('plus'),
      this.text(' PAGE')
    ]);

    this.addEventListener(newPage, 'click', (event) => {
      event.preventDefault();
      this.addPage();
    });

    this.pageBar.appendChild(this.ce('li', null, newPage));
  }

  build() {
    super.build();
    this.builderReady.then(() => this.buildPageBar());
  }
}
