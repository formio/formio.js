import _each from 'lodash/each';
import _clone from 'lodash/clone';
import { FormioComponents } from '../Components';

export class TabsComponent extends FormioComponents {
  static schema(...extend) {
    return FormioComponents.schema({
      type: 'tabs',
      input: false,
      key: 'tabs',
      components: [
        {
          label: 'Tab 1',
          key: 'tab1',
          components: []
        }
      ]
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Tabs',
      group: 'layout',
      icon: 'fa fa-folder-o',
      weight: 50,
      documentation: 'http://help.form.io/userguide/#tabs',
      schema: TabsComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.currentTab = 0;
  }

  get schema() {
    let schema = _clone(this.component);
    schema.components = [];
    _each(this.component.components, (tab) => {
      let tabSchema = tab;
      tabSchema.components = [];
      this.eachComponent((component) => tabSchema.components.push(component.schema));
      schema.components.push(tabSchema);
    });
    return schema;
  }

  createElement() {
    this.tabBar = this.ce('ul', {
      class: 'nav nav-tabs'
    });
    this.tabContent = this.ce('div', {
      class: 'tab-content'
    });
    this.tabs = [];
    this.tabLinks = [];
    _each(this.component.components, (tab, index) => {
      let tabPanel = this.ce('div', {
        role: 'tabpanel',
        class: 'tab-pane',
        id: tab.key
      });
      let tabLink = this.ce('a', {
        href: '#' + tab.key
      }, tab.label);
      this.addEventListener(tabLink, 'click', (event) => {
        event.preventDefault();
        this.setTab(index);
      });
      let tabElement = this.ce('li', {
        role: 'presentation'
      }, tabLink);
      this.tabLinks.push(tabElement);
      this.tabs.push(tabPanel);
      this.tabBar.appendChild(tabElement);
      this.tabContent.appendChild(tabPanel);
    });
    this.element = this.ce('div', {
      id: this.id,
      class: this.className
    }, [this.tabBar, this.tabContent]);
    this.element.component = this;
    return this.element;
  }

  /**
   * Set the current tab.
   *
   * @param index
   */
  setTab(index) {
    if (
      !this.tabs ||
      !this.component.components ||
      !this.component.components[this.currentTab] ||
      (this.currentTab >= this.tabs.length)
    ) {
      return;
    }

    this.currentTab = index;

    // Get the current tab.
    let tab = this.component.components[this.currentTab];
    this.empty(this.tabs[this.currentTab]);
    let components = this.hook('addComponents', tab.components);
    _each(components, (component) => this.addComponent(component, this.tabs[this.currentTab]));
    this.checkConditions(this.root ? this.root.data : {});

    if (this.tabLinks.length <= index) {
      return;
    }

    _each(this.tabLinks, (tabLink) => {
      this.removeClass(tabLink, 'active');
    });
    this.addClass(this.tabLinks[index], 'active');
    _each(this.tabs, (tab) => {
      this.removeClass(tab, 'active');
    });
    this.addClass(this.tabs[index], 'active');
  }

  /**
   * Only add the components for the active tab.
   */
  addComponents() {
    this.setTab(this.currentTab);
  }
}
