import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

export default class TabsComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Tabs',
      type: 'tabs',
      input: false,
      key: 'tabs',
      persistent: false,
      tableView: false,
      components: [
        {
          label: 'Tab 1',
          key: 'tab1',
          components: [],
        },
      ],
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Tabs',
      group: 'layout',
      icon: 'folder-o',
      weight: 50,
      documentation: 'http://help.form.io/userguide/#tabs',
      schema: TabsComponent.schema(),
    };
  }

  get defaultSchema() {
    return TabsComponent.schema();
  }

  get schema() {
    const schema = super.schema;
    // We need to clone this because the builder uses the "components" reference and this would reset that reference.
    const components = _.cloneDeep(this.component.components);
    schema.components = components.map((tab, index) => {
      tab.components = this.tabs[index].map((component) => component.schema);
      return tab;
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
    this.noField = true;
  }

  init() {
    this.components = [];
    this.tabs = [];
    _.each(this.component.components, (tab, index) => {
      this.tabs[index] = [];
      // Initialize empty tabs.
      tab.components = tab.components || [];
      _.each(tab.components, (comp) => {
        const component = this.createComponent(comp);
        component.tab = index;
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
    }, (this.options.flatten || this.options.pdf ? 'flat' : null)));
  }

  attach(element) {
    this.loadRefs(element, { [this.tabLinkKey]: 'multiple', [this.tabKey]: 'multiple', [this.tabLikey]: 'multiple' });
    const superAttach = super.attach(element);
    this.refs[this.tabLinkKey].forEach((tabLink, index) => {
      this.addEventListener(tabLink, 'click', (event) => {
        event.preventDefault();
        this.setTab(index);
      });
    });
    this.refs[this.tabKey].forEach((tab, index) => {
      this.attachComponents(tab, this.tabs[index], this.component.components[index].components);
    });
    return superAttach;
  }

  detach(all) {
    super.detach(all);
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
      this.removeClass(tab, 'formio-tab-panel-active');
      tab.style.display = 'none';
    });
    this.addClass(this.refs[this.tabKey][index], 'formio-tab-panel-active');
    this.refs[this.tabKey][index].style.display = 'block';

    _.each(this.refs[this.tabLinkKey], (tabLink, tabIndex) => {
      if (this.refs[this.tabLinkKey][tabIndex]) {
        this.removeClass(tabLink, 'formio-tab-link-active');
      }
      if (this.refs[this.tabLikey][tabIndex]) {
        this.removeClass(this.refs[this.tabLikey][tabIndex], 'formio-tab-link-container-active');
      }
    });
    if (this.refs[this.tabLikey][index]) {
      this.addClass(this.refs[this.tabLikey][index], 'formio-tab-link-container-active');
    }
    if (this.refs[this.tabLinkKey][index]) {
      this.addClass(this.refs[this.tabLinkKey][index], 'formio-tab-link-active');
    }
    this.triggerChange();
  }

  beforeFocus(component) {
    if ('beforeFocus' in this.parent) {
      this.parent.beforeFocus(this);
    }
    const tabIndex = this.tabs.findIndex((tab) => {
      return tab.some((comp) => comp === component);
    });
    if (tabIndex !== -1) {
      this.setTab(tabIndex);
    }
  }
}
