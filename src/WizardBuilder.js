import WebformBuilder from './WebformBuilder';
import _ from 'lodash';

export default class WizardBuilder extends WebformBuilder {
  constructor() {
    let element, options;
    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    }
    else {
      options = arguments[0];
    }
    super(null, options);
    // this.element = element;

    this._form = {
      components: [
        this.getPageConfig(1),
      ],
    };

    this.page = 0;

    this.options.hooks.attachPanel = (element, component) => {
      if (component.refs.removeComponent) {
        this.addEventListener(component.refs.removeComponent, 'click', () => {
          const pageIndex = this.pages.findIndex((page) => page.key === component.key);
          const componentIndex = this._form.components.findIndex((comp) => comp.key === component.key);
          if (pageIndex !== -1) {
            this.removePage(pageIndex, componentIndex);
          }
        });
      }
    };

    const originalRenderComponentsHook = this.options.hooks.renderComponents;
    this.options.hooks.renderComponents = (html, { components, self }) => {
      if (self.type === 'form' && !self.root) {
        return html;
      }
      else {
        return originalRenderComponentsHook(html, { components, self });
      }
    };

    const originalAttachComponentsHook = this.options.hooks.attachComponents;
    this.options.hooks.attachComponents = (element, components, container, component) => {
      if (component.type === 'form' && !component.root) {
        return element;
      }

      return originalAttachComponentsHook(element, components, container, component);
    };
  }

  get pages() {
    return _.filter(this._form.components, { type: 'panel' });
  }

  get currentPage() {
    return (this.pages && (this.pages.length >= this.page)) ? this.pages[this.page] : null;
  }

  set form(value) {
    this._form = value;
    if (!this._form.components || !Array.isArray(this._form.components)) {
      this._form.components = [];
    }

    if (this.pages.length === 0) {
      const components = this._form.components.filter((component) => component.type !== 'button');
      this._form.components = [this.getPageConfig(1, components)];
    }
    this.rebuild();
  }

  get form() {
    return this._form;
  }

  get schema() {
    return this._form;
  }

  render() {
    return this.renderTemplate('builderWizard', {
      sidebar: this.renderTemplate('builderSidebar', {
        scrollEnabled: this.sideBarScroll,
        groupOrder: this.groupOrder,
        groups: this.groups,
      }),
      pages: this.pages,
      form: this.webform.render(),
    });
  }

  attach(element) {
    this.loadRefs(element, {
      addPage: 'multiple',
      gotoPage: 'multiple',
    });

    this.refs.addPage.forEach(link => {
      this.addEventListener(link, 'click', (event) => {
        event.preventDefault();
        this.addPage();
      });
    });

    this.refs.gotoPage.forEach((link, index) => {
      this.addEventListener(link, 'click', (event) => {
        event.preventDefault();
        this.setPage(index);
      });
    });

    return super.attach(element);
  }

  rebuild() {
    const page = this.currentPage;
    this.webform.form = {
      display: 'form',
      type: 'form',
      components: page ? [page] : [],
    };
    this.redraw();
  }

  addPage() {
    const pageNum = (this.pages.length + 1);
    const newPage = this.getPageConfig(pageNum);
    this._form.components.push(newPage);
    this.emit('saveComponent', newPage);
    this.rebuild();
  }

  removePage(pageIndex, componentIndex) {
    this._form.components.splice(componentIndex, 1);

    if (pageIndex === this.pages.length) {
      // If the last page is removed.
      if (pageIndex === 0) {
        this._form.components.push(this.getPageConfig(1));
        this.rebuild();
      }
      else {
        this.setPage(pageIndex - 1);
      }
    }
    else {
      this.rebuild();
    }
  }

  setPage(index) {
    if (index === this.page) {
      return;
    }
    this.page = index;
    this.rebuild();
  }

  getPageConfig(index, components = []) {
    return {
      title: `Page ${index}`,
      label: `Page ${index}`,
      type: 'panel',
      key: `page${index}`,
      components,
    };
  }
}
