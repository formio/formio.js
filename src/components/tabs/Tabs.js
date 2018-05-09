import _ from 'lodash';
import NestedComponent from '../NestedComponent';

export default class TabsComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
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

  get defaultSchema() {
    return TabsComponent.schema();
  }

  get schema() {
    let schema = super.schema;
    schema.components = [];
    let allComponents = _.groupBy(this.getComponents(), 'component.tab');
    _.each(this.component.components, (tab, index) => {
      let tabSchema = tab;
      tabSchema.components = [];
      _.each(allComponents[index], (component) => tabSchema.components.push(component.schema));
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
    _.each(this.component.components, (tab, index) => {
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
    _.remove(this.components, (comp) => comp.component.tab === this.currentTab);
    let components = this.hook('addComponents', tab.components);
    _.each(components, (component) => this.addComponent(component, this.tabs[this.currentTab]));
    this.checkConditions(this.root ? this.root.data : {});

    if (this.tabLinks.length <= index) {
      return;
    }

    _.each(this.tabLinks, (tabLink) => {
      this.removeClass(tabLink, 'active');
    });
    this.addClass(this.tabLinks[index], 'active');
    _.each(this.tabs, (tab) => {
      this.removeClass(tab, 'active');
    });
    this.addClass(this.tabs[index], 'active');
  }

  /**
   * Make sure to include the tab on the component as it is added.
   *
   * @param component
   * @param element
   * @param data
   * @param before
   * @return {BaseComponent}
   */
  addComponent(component, element, data, before) {
    component.tab = this.currentTab;
    return super.addComponent(component, element, data, before);
  }

  /**
   * Only add the components for the active tab.
   */
  addComponents() {
    this.setTab(this.currentTab);
  }
}
