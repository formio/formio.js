import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

export default class TabsComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'tabs',
      input: false,
      key: 'tabs',
      persistent: false,
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

  get defaultSchema() {
    return TabsComponent.schema();
  }

  get schema() {
    const schema = super.schema;
    schema.components = [];
    const allComponents = _.groupBy(this.getComponents(), 'component.tab');
    _.each(this.component.components, (tab, index) => {
      const tabSchema = tab;
      tabSchema.components = [];
      _.each(allComponents[index], (component) => tabSchema.components.push(component.schema));
      schema.components.push(tabSchema);
    });
    return schema;
  }

  get tabId() {
    return `tab-${this.id}`;
  }

  get tabLiId() {
    return `tabLi-${this.id}`;
  }

  get tabLinkId() {
    return `tabLink-${this.id}`;
  }

  init() {
    this.currentTab = 0;
    this.tabs = [];
    _.each(this.component.components, (tab, index) => {
      this.tabs[index] = [];
      _.each(tab.components, (comp) => {
        const component = this.createComponent(comp);
        component.tab = this.currentTab;
        this.tabs[index].push(component);
      });
    });
  }

  render() {
    return super.render(this.renderTemplate('tab', {
      currentTab: this.currentTab,
      tabComponents: this.tabs.map(tab => this.renderComponents(tab))
    }));
  }

  hydrate(element) {
    this.loadRefs(element, {[this.tabLinkId]: 'multiple', [this.tabId]: 'multiple', [this.tabLiId]: 'multiple'});
    this.refs[this.tabLinkId].forEach((tabLink, index) => {
      this.addEventListener(tabLink, 'click', (event) => {
        event.preventDefault();
        this.setTab(index);
      });
    });
    this.refs[this.tabId].forEach((tab, index) => this.hydrateComponents(tab, this.tabs[index]));
  }

  destroy(all) {
    super.destroy(all);
    delete this.columns;
  }

  /**
   * Set the current tab.
   *
   * @param index
   */
  setTab(index) {
    if (
      !this.tabs ||
      !this.tabs[index] ||
      !this.refs[this.tabId] ||
      !this.refs[this.tabId][index]
    ) {
      return;
    }

    this.currentTab = index;

    _.each(this.refs[this.tabId], (tab) => {
      this.removeClass(tab, 'active');
      tab.style.display = 'none';
    });
    this.addClass(this.refs[this.tabId][index], 'active');
    this.refs[this.tabId][index].style.display = 'inherit';

    _.each(this.refs[this.tabLinkId], (tabLink, tabIndex) => {
      if (this.refs[this.tabLinkId][tabIndex]) {
        this.removeClass(tabLink, 'active');
      }
      if (this.refs[this.tabLiId][tabIndex]) {
        this.removeClass(this.refs[this.tabLiId][tabIndex], 'active');
      }
    });
    if (this.refs[this.tabLinkId][index]) {
      this.addClass(this.refs[this.tabLinkId][index], 'active');
    }
    if (this.refs[this.tabLiId][index]) {
      this.addClass(this.refs[this.tabLiId][index], 'active');
    }
  }
}
