import WebformBuilder from './WebformBuilder';
import Webform from './Webform';
import BuilderUtils from './utils/builder';
import _ from 'lodash';
import { fastCloneDeep } from './utils/utils';

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
    // Reset skipInit in case PDFBuilder has set it.
    options.skipInit = false;
    options.display = 'wizard';

    super(element, options);

    this._form = {
      components: [
        this.getPageConfig(1),
      ],
    };

    this.page = 0;

    // Need to create a component order for each group.
    for (const group in this.groups) {
      if (this.groups[group] && this.groups[group].components) {
        this.groups[group].componentOrder = Object.keys(this.groups[group].components)
          .map(key => this.groups[group].components[key])
          .filter(component => component && !component.ignore)
          .sort((a, b) => a.weight - b.weight)
          .map(component => component.key);
      }
    }

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

    // Wizard pages don't replace themselves in the right array. Do that here.
    this.on('saveComponent', (component, originalComponent) => {
      const webformComponents = this.webform.components.map(({ component }) => component);
      if (this._form.components.includes(originalComponent)) {
        this._form.components[this._form.components.indexOf(originalComponent)] = component;
        this.rebuild();
      }
      else if (webformComponents.includes(originalComponent)) {
        this._form.components.push(component);
        this.rebuild();
      }
      else {
        // Fallback to look for panel based on key.
        const formComponentIndex = this._form.components.findIndex((comp) => originalComponent.key === comp.key);
        if (formComponentIndex !== -1) {
          this._form.components[formComponentIndex] = component;
          this.rebuild();
        }
      }
    }, true);
  }

  allowDrop(element) {
    return (this.webform && this.webform.refs && this.webform.refs.webform === element) ? false : true;
  }

  get pages() {
    return _.filter(this._form.components, { type: 'panel' });
  }

  get currentPage() {
    const pages = this.pages;
    return (pages && (pages.length >= this.page)) ? pages[this.page] : null;
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
    _.assign(this.currentPage, this.webform._form.components[0]);
    const webform = new Webform(this.options);
    webform.setForm(this._form, { noEmit: true });
    return webform.schema;
  }

  render() {
    return this.renderTemplate('builderWizard', {
      sidebar: this.renderTemplate('builderSidebar', {
        scrollEnabled: this.sideBarScroll,
        groupOrder: this.groupOrder,
        groupId: `builder-sidebar-${this.id}`,
        groups: this.groupOrder.map((groupKey) => this.renderTemplate('builderSidebarGroup', {
          group: this.groups[groupKey],
          groupKey,
          groupId: `builder-sidebar-${this.id}`,
          subgroups: this.groups[groupKey].subgroups.map((group) => this.renderTemplate('builderSidebarGroup', {
            group,
            groupKey: group.key,
            groupId: `group-container-${groupKey}`,
            subgroups: []
          })),
        })),
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
    this.webform.setForm({
      display: 'form',
      type: 'form',
      components: page ? [page] : [],
    }, { keepAsReference: true });
    return this.redraw();
  }

  addPage(page) {
    const newPage = page && page.schema ? fastCloneDeep(page.schema) : this.getPageConfig(this.pages.length + 1);

    BuilderUtils.uniquify(this._form.components, newPage);
    this._form.components.push(newPage);

    this.emitSaveComponentEvent(
      newPage,
      newPage,
      this._form,
      'components',
      (this._form.components.length - 1),
      true,
      newPage
    );

    this.emit('change', this._form);
    return this.rebuild();
  }

  removePage(pageIndex, componentIndex) {
    this._form.components.splice(componentIndex, 1);
    this.emit('change', this._form);

    if (pageIndex === this.pages.length) {
      // If the last page is removed.
      if (pageIndex === 0) {
        this._form.components.push(this.getPageConfig(1));
        return this.rebuild();
      }
      else {
        return this.setPage(pageIndex - 1);
      }
    }
    else {
      return this.rebuild();
    }
  }

  setPage(index) {
    if (index === this.page) {
      return;
    }
    this.page = index;
    return this.rebuild();
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

  pasteComponent(component) {
    if (component instanceof WizardBuilder) {
      return;
    }
    if (this._form.components.find(comp => _.isEqual(component.component, comp))) {
      this.addPage(component);
    }
    else {
      return super.pasteComponent(component);
    }
  }
}
