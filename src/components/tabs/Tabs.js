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
      icon: 'folder-o',
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

  get tabKey() {
    return `tab-${this.key}`;
  }

  get tabLikey() {
    return `tabLi-${this.key}`;
  }

  get tabLinkKey() {
    return `tabLink-${this.key}`;
  }

  constructor(...args) {
    super(...args);
    this.currentTab = 0;
  }

  init() {
    this.tabs = [];
    _.each(this.component.components, (tab, index) => {
      this.tabs[index] = [];
      // Initialize empty tabs.
      tab.components = tab.components || [];
      _.each(tab.components, (comp) => {
        const component = this.createComponent(comp);
        component.tab = this.currentTab;
        this.tabs[index].push(component);
      });
    });
  }

  render() {
    return super.render(this.renderTemplate('tab', {
      tabKey: this.tabKey,
      tabLikey: this.tabLikey,
      tabLinkKey: this.tabLinkKey,
      currentTab: this.currentTab,
      tabComponents: this.tabs.map(tab => this.renderComponents(tab))
    }));
  }

  attach(element) {
    this.loadRefs(element, { [this.tabLinkKey]: 'multiple', [this.tabKey]: 'multiple', [this.tabLikey]: 'multiple' });
    super.attach(element);
    this.refs[this.tabLinkKey].forEach((tabLink, index) => {
      this.addEventListener(tabLink, 'click', (event) => {
        event.preventDefault();
        this.setTab(index);
      });
    });
    this.refs[this.tabKey].forEach((tab, index) => {
      this.attachComponents(tab, this.tabs[index], this.component.components[index].components);
    });
  }

  detach(all) {
    super.detach(all);
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
      !this.refs[this.tabKey] ||
      !this.refs[this.tabKey][index]
    ) {
      return;
    }

    this.currentTab = index;

    _.each(this.refs[this.tabKey], (tab) => {
      this.removeClass(tab, 'active');
      tab.style.display = 'none';
    });
    this.addClass(this.refs[this.tabKey][index], 'active');
    this.refs[this.tabKey][index].style.display = 'block';

    _.each(this.refs[this.tabLinkKey], (tabLink, tabIndex) => {
      if (this.refs[this.tabLinkKey][tabIndex]) {
        this.removeClass(tabLink, 'active');
      }
      if (this.refs[this.tabLikey][tabIndex]) {
        this.removeClass(this.refs[this.tabLikey][tabIndex], 'active');
      }
    });
    if (this.refs[this.tabLikey][index]) {
      this.addClass(this.refs[this.tabLikey][index], 'active');
    }
    if (this.refs[this.tabLinkKey][index]) {
      this.addClass(this.refs[this.tabLinkKey][index], 'active');
    }
  }
}
