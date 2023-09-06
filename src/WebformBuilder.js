import Webform from './Webform';
import Component from './components/_classes/component/Component';
import tippy from 'tippy.js';
import NativePromise from 'native-promise-only';
import Components from './components/Components';
import { GlobalFormio as Formio } from './Formio';
import { fastCloneDeep, bootstrapVersion, getArrayFromComponentPath, getStringFromComponentPath } from './utils/utils';
import { eachComponent, getComponent } from './utils/formUtils';
import BuilderUtils from './utils/builder';
import _ from 'lodash';
import autoScroll from 'dom-autoscroller';

require('./components/builder');

let Templates = Formio.Templates;

if (!Templates) {
  Templates = require('./templates/Templates').default;
}

let dragula;
if (typeof window !== 'undefined') {
  // Import from "dist" because it would require and "global" would not be defined in Angular apps.
  dragula = require('dragula/dist/dragula');
}

export default class WebformBuilder extends Component {
  // eslint-disable-next-line max-statements
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
    options.display = options.display || 'form';

    super(null, options);

    this.element = element;

    this.builderHeight = 0;
    this.schemas = {};
    this.repeatablePaths = [];

    this.sideBarScroll = _.get(this.options, 'sideBarScroll', true);
    this.sideBarScrollOffset = _.get(this.options, 'sideBarScrollOffset', 0);
    this.dragDropEnabled = true;

    // Setup the builder options.
    this.builder = _.defaultsDeep({}, this.options.builder, this.defaultGroups);

    // Turn off if explicitely said to do so...
    _.each(this.defaultGroups, (config, key) => {
      if (config === false) {
        this.builder[key] = false;
      }
    });

    // Add the groups.////
    this.groups = {};
    this.groupOrder = [];
    for (const group in this.builder) {
      if (this.builder[group]) {
        this.builder[group].key = group;
        this.groups[group] = this.builder[group];
        this.groups[group].components = this.groups[group].components || {};
        this.groups[group].componentOrder = this.groups[group].componentOrder || [];
        this.groups[group].subgroups = Object.keys(this.groups[group].groups || {}).map((groupKey) => {
          this.groups[group].groups[groupKey].componentOrder = Object.keys(this.groups[group].groups[groupKey].components).map((key) => key);
          return this.groups[group].groups[groupKey];
        });
        this.groupOrder.push(this.groups[group]);
      }
    }

    this.groupOrder = this.groupOrder
      .filter(group => group && !group.ignore)
      .sort((a, b) => a.weight - b.weight)
      .map(group => group.key);

    for (const type in Components.components) {
      const component = Components.components[type];
      if (component.builderInfo && component.builderInfo.schema) {
        this.schemas[type] = component.builderInfo.schema;
        component.type = type;
        const builderInfo = component.builderInfo;
        builderInfo.key = component.type;
        this.addBuilderComponentInfo(builderInfo);
      }
    }

    // Filter out any extra components.
    // Add the components in each group.
    for (const group in this.groups) {
      const info = this.groups[group];
      for (const key in info.components) {
        const compKey = group === 'resource' ? `component-${key}` : key;
        let comp = info.components[compKey];
        if (
          comp === true &&
          Components.components[key] &&
          Components.components[key].builderInfo
        ) {
          comp = Components.components[key].builderInfo;
        }
        if (comp && comp.schema) {
          this.schemas[key] = comp.schema;
          info.components[compKey] = comp;
          info.components[compKey].key = key;
        }
        else {
          // Do not include this component in the components array.
          delete info.components[compKey];
        }
      }

      // Order the components.
      this.orderComponents(info);
    }

    this.options.hooks = this.options.hooks || {};

    this.options.hooks.renderComponent = (html, { component, self }) => {
      if (self.type === 'form' && !self.key) {
        const template = this.hook('renderComponentFormTemplate', html.replace('formio-component-form', ''));
        // The main webform shouldn't have this class as it adds extra styles.
        return template;
      }

      if (this.options.disabled && this.options.disabled.includes(self.key) || self.parent.noDragDrop) {
        return html;
      }

      return this.renderTemplate('builderComponent', {
        html,
        disableBuilderActions: self?.component?.disableBuilderActions,
        childComponent: component,
      });
    };

    this.options.hooks.renderComponents = (html, { components, self }) => {
      // if Datagrid and already has a component, don't make it droppable.
      if (self.type === 'datagrid' && components.length > 0 || self.noDragDrop) {
        return html;
      }

      if (!components ||
        (!components.length && !components.nodrop) ||
        (self.type === 'form' && components.length <= 1 && (components.length === 0 || components[0].type === 'button'))
      ) {
        html = this.renderTemplate('builderPlaceholder', {
          position: 0
        }) + html;
      }
      return this.renderTemplate('builderComponents', {
        key: self.key,
        type: self.type,
        html,
      });
    };

    this.options.hooks.renderInput = (html, { self }) => {
      if (self.type === 'hidden') {
        return html + self.name;
      }
      return html;
    };

    this.options.hooks.renderLoading = (html, { self }) => {
      if (self.type === 'form' && self.key) {
        return self.name;
      }
      return html;
    };

    this.options.hooks.attachComponents = (element, components, container, component) => {
      // Don't attach if no element was found or component doesn't participate in drag'n'drop.
      if (!element) {
        return;
      }
      if (component.noDragDrop) {
        return element;
      }
      // Attach container and component to element for later reference.
      const containerElement = element.querySelector(`[ref="${component.component.key}-container"]`) || element;
      containerElement.formioContainer = container;
      containerElement.formioComponent = component;

      // Add container to draggable list.
      if (this.dragula && this.allowDrop(element)) {
        this.dragula.containers.push(containerElement);
      }

      // If this is an existing datagrid element, don't make it draggable.
      if ((component.type === 'datagrid' || component.type === 'datamap') && components.length > 0) {
        return element;
      }

      // Since we added a wrapper, need to return the original element so that we can find the components inside it.
      return element.children[0];
    };

    this.options.hooks.attachDatagrid = (element, component) => {
      component.loadRefs(element, {
        [`${component.key}-container`]: 'single',
      });

      const dataGridContainer = component.refs[`${component.key}-container`];

      if (dataGridContainer) {
        component.attachComponents(dataGridContainer.parentNode, [], component.component.components);
      }
      // Need to set up horizontal rearrangement of fields.
    };

    this.options.hooks.attachComponent = this.attachComponent.bind(this);

    // Load resources tagged as 'builder'
    const query = {
      params: {
        type: 'resource',
        limit: 1000000,
        select: '_id,title,name,components'
      }
    };
    if (this.options && this.options.resourceTag) {
      query.params.tags = [this.options.resourceTag];
    }
    else if (!this.options || !this.options.hasOwnProperty('resourceTag')) {
      query.params.tags = ['builder'];
    }
    const formio = new Formio(Formio.projectUrl);
    const isResourcesDisabled = this.options.builder && this.options.builder.resource === false;

    formio.loadProject().then((project) => {
      if (project && (_.get(project, 'settings.addConfigToForms', false) ||  _.get(project, 'addConfigToForms', false))) {
        const config = project.config || {};
        this.options.formConfig = config;

        const pathToFormConfig = 'webform._form.config';
        const webformConfig = _.get(this, pathToFormConfig);

        if (this.webform  && !webformConfig) {
          _.set(this, pathToFormConfig, config);
        }
      }
    }).catch((err) => {
      console.warn(`Could not load project settings: ${err.message || err}`);
    });

    if (!formio.noProject && !isResourcesDisabled) {
      const resourceOptions = this.options.builder && this.options.builder.resource;
      formio.loadForms(query)
        .then((resources) => {
          if (resources.length) {
            this.builder.resource = {
              title: resourceOptions ? resourceOptions.title : 'Existing Resource Fields',
              key: 'resource',
              weight: resourceOptions ? resourceOptions.weight : 50,
              subgroups: [],
              components: [],
              componentOrder: []
            };
            this.groups.resource = {
              title: resourceOptions ? resourceOptions.title : 'Existing Resource Fields',
              key: 'resource',
              weight: resourceOptions ? resourceOptions.weight : 50,
              subgroups: [],
              components: [],
              componentOrder: []
            };
            if (!this.groupOrder.includes('resource')) {
              this.groupOrder.push('resource');
            }
            this.addExistingResourceFields(resources);
          }
        });
    }

    // Notify components if they need to modify their render.
    this.options.attachMode = 'builder';
    this.webform = this.webform || this.createForm(this.options);

    this.pathComponentsMapping = {};
    this.arrayDataComponentPaths = [];
    this.nestedDataComponents = [];
    this.arrayDataComponents = [];
  }

  allowDrop() {
    return true;
  }

  addExistingResourceFields(resources) {
    _.each(resources, (resource, index) => {
      const resourceKey = `resource-${resource.name}`;
      const subgroup = {
        key: resourceKey,
        title: resource.title,
        components: [],
        componentOrder: [],
        default: index === 0,
      };

      eachComponent(resource.components, (component) => {
        if (component.type === 'button') return;
        if (
          this.options &&
          this.options.resourceFilter &&
          (!component.tags || component.tags.indexOf(this.options.resourceFilter) === -1)
        ) return;

        let componentName = component.label;
        if (!componentName && component.key) {
          componentName = _.upperFirst(component.key);
        }

        subgroup.componentOrder.push(`component-${component.key}`);
        subgroup.components[`component-${component.key}`] = _.merge(
          fastCloneDeep(Components.components[component.type]
            ? Components.components[component.type].builderInfo
            : Components.components['unknown'].builderInfo),
          {
            key: component.key,
            title: componentName,
            group: 'resource',
            subgroup: resourceKey,
          },
          {
            schema: {
              ...component,
              label: component.label,
              key: component.key,
              lockKey: true,
              source: (!this.options.noSource ? resource._id : undefined),
              isNew: true
            }
          }
        );
      }, true);

      this.groups.resource.subgroups.push(subgroup);
    });

    this.triggerRedraw();
  }

  attachTooltip(component, title) {
    return tippy(component, {
      allowHTML: true,
      trigger: 'mouseenter focus',
      placement: 'top',
      delay: [200, 0],
      zIndex: 10000,
      content: title
    });
  }

  attachComponent(element, component) {
    if (component instanceof WebformBuilder) {
      return;
    }

    // Add component to element for later reference.
    element.formioComponent = component;

    component.loadRefs(element, {
      removeComponent: 'single',
      editComponent: 'single',
      moveComponent: 'single',
      copyComponent: 'single',
      pasteComponent: 'single',
      editJson: 'single'
    });

    if (component.refs.copyComponent) {
      this.attachTooltip(component.refs.copyComponent, this.t('Copy'));

      component.addEventListener(component.refs.copyComponent, 'click', () =>
        this.copyComponent(component));
    }

    if (component.refs.pasteComponent) {
      const pasteToolTip = this.attachTooltip(component.refs.pasteComponent, this.t('Paste below'));

      component.addEventListener(component.refs.pasteComponent, 'click', () => {
        pasteToolTip.hide();
        this.pasteComponent(component);
      });
    }

    if (component.refs.moveComponent) {
      this.attachTooltip(component.refs.moveComponent, this.t('Move'));
      if (this.keyboardActionsEnabled) {
        component.addEventListener(component.refs.moveComponent, 'click', () => {
          this.moveComponent(component);
        });
      }
    }

    const parent = this.getParentElement(element);

    if (component.refs.editComponent) {
      this.attachTooltip(component.refs.editComponent, this.t('Edit'));

      component.addEventListener(component.refs.editComponent, 'click', () =>
        this.editComponent(component.schema, parent, false, false, component.component, { inDataGrid: component.isInDataGrid }));
    }

    if (component.refs.editJson) {
      this.attachTooltip(component.refs.editJson, this.t('Edit JSON'));

      component.addEventListener(component.refs.editJson, 'click', () =>
        this.editComponent(component.schema, parent, false, true, component.component));
    }

    if (component.refs.removeComponent) {
      this.attachTooltip(component.refs.removeComponent, this.t('Remove'));

      component.addEventListener(component.refs.removeComponent, 'click', () =>
        this.removeComponent(component.schema, parent, component.component));
    }

    return element;
  }

  createForm(options) {
    this.webform = new Webform(this.element, options);
    if (this.element) {
      this.loadRefs(this.element, {
        form: 'single'
      });
      if (this.refs.form) {
        this.webform.element = this.refs.form;
      }
    }
    return this.webform;
  }

  /**
   * Called when everything is ready.
   *
   * @returns {Promise} - Wait for webform to be ready.
   */
  get ready() {
    return this.webform.ready;
  }

  get defaultGroups() {
    return {
      basic: {
        title: 'Basic',
        weight: 0,
        default: true,
      },
      advanced: {
        title: 'Advanced',
        weight: 10
      },
      layout: {
        title: 'Layout',
        weight: 20
      },
      data: {
        title: 'Data',
        weight: 30
      },
      premium: {
        title: 'Premium',
        weight: 40
      }
    };
  }

  redraw() {
    return Webform.prototype.redraw.call(this);
  }

  get form() {
    return this.webform.form;
  }

  get schema() {
    return this.webform.schema;
  }

  set form(value) {
    this.setForm(value);
  }

  get container() {
    return this.webform.form.components;
  }

  /**
   * When a component sets its api key, we need to check if it is unique within its namespace. Find the namespace root
   * so we can calculate this correctly.
   * @param component
   */
  findNamespaceRoot(component) {
    const path = getArrayFromComponentPath(component.path);
    // First get the component with nested parents.
    let comp = this.webform.getComponent(path);
    comp = Array.isArray(comp) ? comp[0] : comp;
    const namespaceKey = this.recurseNamespace(comp);

    // If there is no key, it is the root form.
    if (!namespaceKey || this.form.key === namespaceKey) {
      return this.form.components;
    }

    const componentSchema = component.component;
    // If the current component is the namespace, we don't need to find it again.
    if (namespaceKey === component.key) {
      return [...componentSchema.components, componentSchema];
    }

    // Get the namespace component so we have the original object.
    const namespaceComponent = getComponent(this.form.components, namespaceKey, true);
    return namespaceComponent ? namespaceComponent.components : comp.components;
  }

  recurseNamespace(component) {
    // If there is no parent, we are at the root level.
    if (!component) {
      return null;
    }

    // Some components are their own namespace.
    if (['address', 'container', 'datagrid', 'editgrid', 'dynamicWizard', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
      return component.key;
    }

    // Anything else, keep going up.
    return this.recurseNamespace(component.parent);
  }

  render() {
    return this.renderTemplate('builder', {
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
          keyboardActionsEnabled: this.keyboardActionsEnabled,
        })),
      }),
      form: this.webform.render(),
    });
  }

  attach(element) {
    this.on('change', (form) => {
      this.populateRecaptchaSettings(form);
    });
    return super.attach(element).then(() => {
      this.loadRefs(element, {
        form: 'single',
        sidebar: 'single',
        'sidebar-search': 'single',
        'sidebar-groups': 'single',
        'container': 'multiple',
        'sidebar-anchor': 'multiple',
        'sidebar-group': 'multiple',
        'sidebar-container': 'multiple',
        'sidebar-component': 'multiple',
      });

      if (this.sideBarScroll && Templates.current.handleBuilderSidebarScroll) {
        Templates.current.handleBuilderSidebarScroll.call(this, this);
      }

      // Add the paste status in form
      if (typeof window !== 'undefined' && window.sessionStorage) {
        const data = window.sessionStorage.getItem('formio.clipboard');
        if (data) {
          this.addClass(this.refs.form, 'builder-paste-mode');
        }
      }

      if (!bootstrapVersion(this.options)) {
        // Initialize
        this.refs['sidebar-group'].forEach((group) => {
          group.style.display = (group.getAttribute('data-default') === 'true') ? 'inherit' : 'none';
        });

        // Click event
        this.refs['sidebar-anchor'].forEach((anchor, index) => {
          this.addEventListener(anchor, 'click', () => {
            const clickedParentId = anchor.getAttribute('data-parent').slice('#builder-sidebar-'.length);
            const clickedId = anchor.getAttribute('data-target').slice('#group-'.length);

            this.refs['sidebar-group'].forEach((group, groupIndex) => {
              const openByDefault = group.getAttribute('data-default') === 'true';
              const groupId = group.getAttribute('id').slice('group-'.length);
              const groupParent = group.getAttribute('data-parent').slice('#builder-sidebar-'.length);

              group.style.display =
                (
                  (openByDefault && groupParent === clickedId) ||
                  groupId === clickedParentId ||
                  groupIndex === index
                )
                  ? 'inherit' : 'none';
            });
          }, true);
        });
      }

      if (this.keyboardActionsEnabled) {
        this.refs['sidebar-component'].forEach((component) => {
          this.addEventListener(component, 'keydown', (event) => {
            if (event.keyCode === 13) {
              this.addNewComponent(component);
            }
          });
        });
      }

      this.addEventListener(this.refs['sidebar-search'], 'input',
        _.debounce((e) => {
          const searchString = e.target.value;
          this.searchFields(searchString);
        }, 300)
      );

      if (this.dragDropEnabled) {
        this.initDragula();
      }

      const drake = this.dragula;

      if (this.refs.form) {
        autoScroll([window], {
          margin: 20,
          maxSpeed: 6,
          scrollWhenOutside: true,
          autoScroll: function() {
              return this.down && drake?.dragging;
          }
        });

        return this.webform.attach(this.refs.form);
      }
    });
  }

  searchFields(searchString = '') {
    const searchValue = searchString.toLowerCase();
    const sidebar = this.refs['sidebar'];
    const sidebarGroups = this.refs['sidebar-groups'];

    if (!sidebar || !sidebarGroups) {
      return;
    }

    const filterGroupBy = (group, searchValue = '') => {
      const result = _.toPlainObject(group);
      const { subgroups = [], components } = result;
      const filteredComponents = [];

      for (const key in components) {
        const isMatchedToTitle = components[key].title.toLowerCase().match(searchValue);
        const isMatchedToKey = components[key].key.toLowerCase().match(searchValue);

        if (isMatchedToTitle || isMatchedToKey) {
          filteredComponents.push(components[key]);
        }
      }

      this.orderComponents(result, filteredComponents);
      if (searchValue) {
        result.default = true;
      }
      if (result.componentOrder.length || subgroups.length) {
        return result;
      }
      return null;
    };

    const filterGroupOrder = (groupOrder, searchValue) => {
      const result = _.cloneDeep(groupOrder);
      return result.filter(key => filterGroupBy(this.groups[key], searchValue));
    };

    const filterSubgroups = (groups, searchValue) => {
      const result = _.clone(groups);
      return result
            .map(subgroup => filterGroupBy(subgroup, searchValue))
            .filter(subgroup => !_.isNull(subgroup));
    };

    const toTemplate = groupKey => {
      return {
        group: filterGroupBy(this.groups[groupKey], searchValue),
        groupKey,
        groupId: sidebar.id || sidebarGroups.id,
        subgroups: filterSubgroups(this.groups[groupKey].subgroups, searchValue)
                  .map((group) => this.renderTemplate('builderSidebarGroup', {
                    group,
                    groupKey: group.key,
                    groupId: `group-container-${groupKey}`,
                    subgroups: []
                  })),
      };
    };

    sidebarGroups.innerHTML = filterGroupOrder(this.groupOrder, searchValue)
                              .map(groupKey => this.renderTemplate('builderSidebarGroup', toTemplate(groupKey)))
                              .join('');

    this.loadRefs(this.element, {
      'sidebar-groups': 'single',
      'sidebar-anchor': 'multiple',
      'sidebar-group': 'multiple',
      'sidebar-container': 'multiple',
    });

    this.updateDragAndDrop();

    if (searchValue === '') {
      this.triggerRedraw();
    }
  }

  orderComponents(groupInfo, foundComponents) {
    const components = foundComponents || groupInfo.components;
    const isResource = groupInfo.key.indexOf('resource-') === 0;
    if (components) {
      groupInfo.componentOrder = Object.keys(components)
        .map(key => components[key])
        .filter(component => component && !component.ignore && !component.ignoreForForm)
        .sort((a, b) => a.weight - b.weight)
        .map(component => isResource ? `component-${component.key}` : component.key);
    }
  }

  updateDragAndDrop() {
    if (this.dragDropEnabled) {
      this.initDragula();
    }
    if (this.refs.form) {
      return this.webform.attach(this.refs.form);
    }
  }

  initDragula() {
    const options = this.options;

    if (this.dragula) {
      this.dragula.destroy();
    }

    const containersArray = Array.prototype.slice.call(this.refs['sidebar-container']).filter(item => {
      return item.id !== 'group-container-resource';
    });

    if (!dragula) {
      return;
    }

    this.dragula = dragula(containersArray, {
      moves(el) {
        let moves = true;

        const list = Array.from(el.classList).filter(item => item.indexOf('formio-component-') === 0);
        list.forEach(item => {
          const key = item.slice('formio-component-'.length);
          if (options.disabled && options.disabled.includes(key)) {
            moves = false;
          }
        });

        if (el.classList.contains('no-drag')) {
          moves = false;
        }
        return moves;
      },
      copy(el) {
        return el.classList.contains('drag-copy');
      },
      accepts(el, target) {
        return !el.contains(target) && !target.classList.contains('no-drop');
      }
    }).on('drop', (element, target, source, sibling) => this.onDrop(element, target, source, sibling));
  }

  detach() {
    if (this.dragula) {
      this.dragula.destroy();
    }
    this.dragula = null;
    if (this.sideBarScroll && Templates.current.clearBuilderSidebarScroll) {
      Templates.current.clearBuilderSidebarScroll.call(this, this);
    }

    super.detach();
  }

  getComponentInfo(key, group) {
    let info;
    // Need to check in first order as resource component key can be the same as from webform default components
    if (group && group.slice(0, group.indexOf('-')) === 'resource') {
      // This is an existing resource field.
      const resourceGroups = this.groups.resource.subgroups;
      const resourceGroup = _.find(resourceGroups, { key: group });
      if (resourceGroup && resourceGroup.components.hasOwnProperty(`component-${key}`)) {
        info = fastCloneDeep(resourceGroup.components[`component-${key}`].schema);
      }
    }
    // This is a new component
    else if (this.schemas.hasOwnProperty(key)) {
      info = fastCloneDeep(this.schemas[key]);
    }
    else if (this.groups.hasOwnProperty(group)) {
      const groupComponents = this.groups[group].components;
      if (groupComponents.hasOwnProperty(key)) {
        info = fastCloneDeep(groupComponents[key].schema);
      }
    }
    else if (group === 'searchFields') {//Search components go into this group
      const resourceGroups = this.groups.resource.subgroups;
      for (let ix = 0; ix < resourceGroups.length; ix++) {
        const resourceGroup = resourceGroups[ix];
        if (resourceGroup.components.hasOwnProperty(`component-${key}`)) {
          info = fastCloneDeep(resourceGroup.components[`component-${key}`].schema);
          break;
        }
      }
    }

    if (info) {
      info.key = this.generateKey(info);
    }

    return info;
  }

  getComponentsPath(component, parent) {
    // Get path to the component in the parent component.
    let path = 'components';
    let columnIndex = 0;
    let tableRowIndex = 0;
    let tableColumnIndex = 0;
    let tabIndex = 0;
    switch (parent.type) {
      case 'table':
        tableRowIndex = _.findIndex(parent.rows, row => row.some(column => column.components.some(comp => comp.key === component.key)));
        tableColumnIndex = _.findIndex(parent.rows[tableRowIndex], (column => column.components.some(comp => comp.key === component.key)));
        path = `rows[${tableRowIndex}][${tableColumnIndex}].components`;
        break;
      case 'columns':
        columnIndex = _.findIndex(parent.columns, column => column.components.some(comp => comp.key === component.key));
        path = `columns[${columnIndex}].components`;
        break;
      case 'tabs':
        tabIndex = _.findIndex(parent.components, tab => tab.components.some(comp => comp.key === component.key));
        path = `components[${tabIndex}].components`;
        break;
    }
    return path;
  }

  /* eslint-disable max-statements */
  onDrop(element, target, source, sibling) {
    if (!target) {
      return;
    }

    // If you try to drop within itself.
    if (element.contains(target)) {
      return;
    }

    const key = element.getAttribute('data-key');
    const type = element.getAttribute('data-type');
    const group = element.getAttribute('data-group');
    let info, isNew, path, index;

    if (key && group) {
      // This is a new component.
      info = this.getComponentInfo(key, group);
      if (!info && type) {
        info = this.getComponentInfo(type, group);
      }
      isNew = true;
    }
    else if (source.formioContainer) {
      index = _.findIndex(source.formioContainer, { key: element.formioComponent.component.key });
      if (index !== -1) {
        // Grab and remove the component from the source container.
        info = source.formioContainer.splice(
          _.findIndex(source.formioContainer, { key: element.formioComponent.component.key }), 1
        );

        // Since splice returns an array of one object, we need to destructure it.
        info = info[0];
      }
    }

    // If we haven't found the component, stop.
    if (!info) {
      return;
    }

    // Show an error if siblings are disabled for a component and such a component already exists.
    const compKey = (group === 'resource') ? `component-${key}` : key;
    const draggableComponent = this.groups[group]?.components[compKey] || {};

    if (draggableComponent.disableSiblings) {
      let isCompAlreadyExists = false;
      eachComponent(this.webform.components, (component) => {
        if (component.type === draggableComponent.schema.type) {
          isCompAlreadyExists = true;
          return;
        }
      }, true);
      if (isCompAlreadyExists) {
        this.webform.redraw();
        this.webform.setAlert('danger', `You cannot add more than one ${draggableComponent.key} component to one page.`);
        return;
      }
    }

    if (target !== source) {
      // Ensure the key remains unique in its new container.
      BuilderUtils.uniquify(this.findNamespaceRoot(target.formioComponent), info);
    }

    const parent = target.formioComponent;

    // Insert in the new container.
    if (target.formioContainer) {
      if (sibling) {
        if (!sibling.getAttribute('data-noattach')) {
          index = _.findIndex(target.formioContainer, { key: _.get(sibling, 'formioComponent.component.key') });
          index = (index === -1) ? 0 : index;
        }
        else {
          index = sibling.getAttribute('data-position');
        }
        if (index !== -1) {
          target.formioContainer.splice(index, 0, info);
        }
      }
      else {
        target.formioContainer.push(info);
      }
      path = this.getComponentsPath(info, parent.component);
      index = _.findIndex(_.get(parent.schema, path), { key: info.key });
      if (index === -1) {
        index = 0;
      }
    }

    if (parent && parent.addChildComponent) {
      parent.addChildComponent(info, element, target, source, sibling);
    }

    const componentInDataGrid = parent.type === 'datagrid';

    if (isNew && !this.options.noNewEdit && !info.noNewEdit) {
      this.editComponent(info, target, isNew, null, null, { inDataGrid: componentInDataGrid });
    }

    // Only rebuild the parts needing to be rebuilt.
    let rebuild;
    if (target !== source) {
      if (source.formioContainer && source.contains(target)) {
        rebuild = source.formioComponent.rebuild();
      }
      else if (target.contains(source)) {
        rebuild = target.formioComponent.rebuild();
      }
      else {
        if (source.formioContainer) {
          rebuild = source.formioComponent.rebuild();
        }
        rebuild = target.formioComponent.rebuild();
      }
    }
    else {
      // If they are the same, only rebuild one.
      rebuild = target.formioComponent.rebuild();
    }

    if (!rebuild) {
      rebuild = NativePromise.resolve();
    }

    return rebuild.then(() => {
      this.emit('addComponent', info, parent, path, index, isNew && !this.options.noNewEdit && !info.noNewEdit);
      if (!isNew || this.options.noNewEdit || info.noNewEdit) {
        this.emit('change', this.form);
      }
    });
  }

  setForm(form) {
    if (!form.components) {
      form.components = [];
    }

    if (form && form.properties) {
      this.options.properties = form.properties;
    }

    this.keyboardActionsEnabled = _.get(this.options, 'keyboardBuilder', false) || this.options.properties?.keyboardBuilder;

    const isShowSubmitButton = !this.options.noDefaultSubmitButton
      && !form.components.length;

    // Ensure there is at least a submit button.
    if (isShowSubmitButton) {
      form.components.push({
        type: 'button',
        label: 'Submit',
        key: 'submit',
        size: 'md',
        block: false,
        action: 'submit',
        disableOnInvalid: true,
        theme: 'primary'
      });
    }

    if (this.webform) {
      const shouldRebuild = !this.webform.form.components ||
        (form.components.length !== this.webform.form.components.length);
      return this.webform.setForm(form, { keepAsReference: true }).then(() => {
        if (this.refs.form) {
          this.builderHeight = this.refs.form.offsetHeight;
        }
        if (!shouldRebuild) {
          return this.form;
        }
        return this.rebuild().then(() => this.form);
      });
    }
    return NativePromise.resolve(form);
  }

  populateRecaptchaSettings(form) {
    //populate isEnabled for recaptcha form settings
    let isRecaptchaEnabled = false;
    if (this.form.components) {
      eachComponent(form.components, component => {
        if (isRecaptchaEnabled) {
          return;
        }
        if (component.type === 'recaptcha') {
          isRecaptchaEnabled = true;
          return false;
        }
      });
      if (isRecaptchaEnabled) {
        _.set(form, 'settings.recaptcha.isEnabled', true);
      }
      else if (_.get(form, 'settings.recaptcha.isEnabled')) {
        _.set(form, 'settings.recaptcha.isEnabled', false);
      }
    }
  }

  removeComponent(component, parent, original) {
    if (!parent) {
      return;
    }
    let remove = true;
    const removingComponentsGroup = !component.skipRemoveConfirm &&
      (
        (Array.isArray(component.components) && component.components.length) ||
        (Array.isArray(component.rows) && component.rows.length) ||
        (Array.isArray(component.columns) && component.columns.length)
      );

    if (this.options.alwaysConfirmComponentRemoval || removingComponentsGroup) {
      const message = removingComponentsGroup ? 'Removing this component will also remove all of its children. Are you sure you want to do this?'
        : 'Are you sure you want to remove this component?';
      remove = window.confirm(this.t(message));
    }
    if (!original) {
      original = parent.formioContainer.find((comp) => comp.id === component.id);
    }
    const index = parent.formioContainer ? parent.formioContainer.indexOf(original) : 0;
    if (remove && index !== -1) {
      const path = this.getComponentsPath(component, parent.formioComponent.component);
      if (parent.formioContainer) {
        parent.formioContainer.splice(index, 1);
      }
      else if (parent.formioComponent && parent.formioComponent.removeChildComponent) {
        parent.formioComponent.removeChildComponent(component);
      }
      const rebuild = parent.formioComponent.rebuild() || NativePromise.resolve();
      rebuild.then(() => {
        this.emit('removeComponent', component, parent.formioComponent.schema, path, index);
        this.emit('change', this.form);
      });
    }
    return remove;
  }

  replaceDoubleQuotes(data, fieldsToRemoveDoubleQuotes = []) {
    if (data) {
      fieldsToRemoveDoubleQuotes.forEach((key) => {
        if (data[key]) {
          data[key] = data[key].replace(/"/g, "'");
        }
      });
      return data;
    }
  }

  updateComponent(component, changed) {
    // Update the preview.
    if (this.preview) {
      this.preview.form = {
        components: [_.omit({ ...component }, [
          'hidden',
          'conditional',
          'calculateValue',
          'logic',
          'autofocus',
          'customConditional',
        ])],
        config: this.options.formConfig || {}
      };

      const fieldsToRemoveDoubleQuotes = ['label', 'tooltip'];

      this.preview.form.components.forEach(component => this.replaceDoubleQuotes(component, fieldsToRemoveDoubleQuotes));

      const previewElement = this.componentEdit.querySelector('[ref="preview"]');
      if (previewElement) {
        this.setContent(previewElement, this.preview.render());
        this.preview.attach(previewElement);
      }
    }

    // Change the "default value" field to be reflective of this component.
    const defaultValueComponent = getComponent(this.editForm.components, 'defaultValue', true);
    if (defaultValueComponent && component.type !== 'hidden') {
      const defaultChanged = changed && (
        (changed.component && changed.component.key === 'defaultValue')
        || (changed.instance && defaultValueComponent.hasComponent && defaultValueComponent.hasComponent(changed.instance))
      );

      if (!defaultChanged) {
        _.assign(defaultValueComponent.component, _.omit({ ...component }, [
          'key',
          'label',
          'placeholder',
          'tooltip',
          'hidden',
          'autofocus',
          'validate',
          'disabled',
          'defaultValue',
          'customDefaultValue',
          'calculateValue',
          'conditional',
          'customConditional',
          'id'
        ]));
        const parentComponent = defaultValueComponent.parent;
        let tabIndex = -1;
        let index = -1;
        parentComponent.tabs.some((tab, tIndex) => {
          tab.some((comp, compIndex) => {
            if (comp.id === defaultValueComponent.id) {
              tabIndex = tIndex;
              index = compIndex;
              return true;
            }
            return false;
          });
        });

        if (tabIndex !== -1 && index !== -1 && changed && !_.isNil(changed.value)) {
          const sibling = parentComponent.tabs[tabIndex][index + 1];
          parentComponent.removeComponent(defaultValueComponent);
          const newComp = parentComponent.addComponent(defaultValueComponent.component, defaultValueComponent.data, sibling);
          _.pull(newComp.validators, 'required');
          parentComponent.tabs[tabIndex].splice(index, 1, newComp);
          newComp.checkValidity = () => true;
          newComp.build(defaultValueComponent.element);
        }
      }
      else {
        let dataPath = changed.instance._data.key;

        const path = getArrayFromComponentPath(changed.instance.path);
        path.shift();

        if (path.length) {
          path.unshift(component.key);
          dataPath = getStringFromComponentPath(path);
        }

        _.set(this.preview._data, dataPath, changed.value);
        _.set(this.webform._data, dataPath, changed.value);
      }
    }

    // Called when we update a component.
    this.emit('updateComponent', component);
  }

  findRepeatablePaths() {
    const repeatablePaths = [];
    const keys = new Map();

    eachComponent(this.form.components, (comp, path) => {
      if (!comp.key) {
        return;
      }

      if (keys.has(comp.key)) {
        if (keys.get(comp.key).includes(path)) {
          repeatablePaths.push(path);
        }
        else {
          keys.set(comp.key, [...keys.get(comp.key), path]);
        }
      }
      else {
        keys.set(comp.key, [path]);
      }
    }, true);

    return repeatablePaths;
  }

  highlightInvalidComponents() {
    const repeatablePaths = this.findRepeatablePaths();
    let hasInvalidComponents = false;

    this.webform.everyComponent((comp) => {
      const path = comp.path;
      if (repeatablePaths.includes(path)) {
        comp.setCustomValidity(`API Key is not unique: ${comp.key}`);
        hasInvalidComponents = true;
      }
      else if (comp.error?.message?.startsWith('API Key is not unique')) {
        comp.setCustomValidity('');
      }
    });

    this.emit('builderFormValidityChange', hasInvalidComponents);
  }

  /**
   * Called when a new component is saved.
   *
   * @param parent
   * @param component
   * @return {boolean}
   */
  saveComponent(component, parent, isNew, original) {
    this.editForm.detach();
    const parentContainer = parent ? parent.formioContainer : this.container;
    const parentComponent = parent ? parent.formioComponent : this;
    this.dialog.close();
    const path = parentContainer ? this.getComponentsPath(component, parentComponent.component) : '';
    if (!original) {
      original = parent.formioContainer.find((comp) => comp.id === component.id);
    }
    const index = parentContainer ? parentContainer.indexOf(original) : 0;
    if (index !== -1) {
      let submissionData = this.editForm.submission.data;
      submissionData = submissionData.componentJson || submissionData;
      const fieldsToRemoveDoubleQuotes = ['label', 'tooltip'];

      this.replaceDoubleQuotes(submissionData, fieldsToRemoveDoubleQuotes);

      this.hook('beforeSaveComponentSettings', submissionData);

      let comp = null;
      parentComponent.getComponents().forEach((component) => {
        if (component.component.key === original.key) {
          comp = component;
        }
      });
      const originalComp = comp.component;
      const originalComponentSchema = comp.schema;

      const isParentSaveChildMethod = this.isParentSaveChildMethod(parent.formioComponent);

      if (parentContainer && !isParentSaveChildMethod) {
        parentContainer[index] = submissionData;
        if (comp) {
          comp.component = submissionData;
        }
      }
      else if (isParentSaveChildMethod) {
        parent.formioComponent.saveChildComponent(submissionData);
      }

      const rebuild = parentComponent.rebuild() || NativePromise.resolve();
      return rebuild.then(() => {
        const schema = parentContainer ? parentContainer[index] : (comp ? comp.schema : []);
        this.emitSaveComponentEvent(
          schema,
          originalComp,
          parentComponent.schema,
          path,
          index,
          isNew,
          originalComponentSchema
        );
        this.emit('change', this.form);
        this.highlightInvalidComponents();

        if (this.isComponentCreated) {
          const component = parent.formioComponent.components[0];
          this.moveComponent(component);
          this.isComponentCreated = false;
        }
      });
    }

    this.highlightInvalidComponents();
    return NativePromise.resolve();
  }

  emitSaveComponentEvent(schema, originalComp, parentComponentSchema, path, index, isNew, originalComponentSchema) {
    this.emit('saveComponent',
      schema,
      originalComp,
      parentComponentSchema,
      path,
      index,
      isNew,
      originalComponentSchema
    );
  }

  attachEditComponentControls(component, parent, isNew, original, ComponentClass) {
    const cancelButtons = this.componentEdit.querySelectorAll('[ref="cancelButton"]');
    cancelButtons.forEach((cancelButton) => {
      this.editForm.addEventListener(cancelButton, 'click', (event) => {
        event.preventDefault();
        this.editForm.detach();
        this.emit('cancelComponent', component);
        this.dialog.close();
        this.highlightInvalidComponents();
      });
    });

    const removeButtons = this.componentEdit.querySelectorAll('[ref="removeButton"]');
    removeButtons.forEach((removeButton) => {
      this.editForm.addEventListener(removeButton, 'click', (event) => {
        event.preventDefault();
        // Since we are already removing the component, don't trigger another remove.
        this.saved = true;
        this.editForm.detach();
        this.removeComponent(component, parent, original);
        this.dialog.close();
        this.highlightInvalidComponents();
      });
    });

    const saveButtons = this.componentEdit.querySelectorAll('[ref="saveButton"]');
    saveButtons.forEach((saveButton) => {
      this.editForm.addEventListener(saveButton, 'click', (event) => {
        event.preventDefault();
        if (!this.editForm.checkValidity(this.editForm.data, true, this.editForm.data)) {
          this.editForm.setPristine(false);
          this.editForm.showErrors();
          return false;
        }
        this.saved = true;
        this.saveComponent(component, parent, isNew, original);
      });
    });

    const previewButtons = this.componentEdit.querySelectorAll('[ref="previewButton"]');
    previewButtons.forEach((previewButton) => {
      this.editForm.addEventListener(previewButton, 'click', (event) => {
        event.preventDefault();
        this.showPreview = !this.showPreview;
        this.editForm.detach();
        this.setContent(this.componentEdit, this.renderTemplate('builderEditForm', {
          componentInfo: ComponentClass.builderInfo,
          editForm: this.editForm.render(),
          preview: this.preview ? this.preview.render() : false,
          showPreview: this.showPreview,
          helplinks: this.helplinks,
        }));
        this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));
        this.attachEditComponentControls(component, parent, isNew, original, ComponentClass);
      });
    });
  }

  editComponent(component, parent, isNew, isJsonEdit, original, flags = {}) {
    if (!component.key) {
      return;
    }
    this.saved = false;
    const componentCopy = fastCloneDeep(component);
    let ComponentClass = Components.components[componentCopy.type];
    const isCustom = ComponentClass === undefined;
    isJsonEdit = isJsonEdit || isCustom;
    ComponentClass = isCustom ? Components.components.unknown : ComponentClass;
    // Make sure we only have one dialog open at a time.
    if (this.dialog) {
      this.dialog.close();
      this.highlightInvalidComponents();
    }

    // This is the render step.
    const editFormOptions = _.clone(_.get(this, 'options.editForm', {}));
    if (this.editForm) {
      this.editForm.destroy();
    }

    // Allow editForm overrides per component.
    const overrides = _.get(this.options, `editForm.${componentCopy.type}`, {});

    // Pass along the form being edited.
    editFormOptions.editForm = this.form;
    editFormOptions.editComponent = component;
    editFormOptions.flags = flags;

    this.hook('editComponentParentInstance', editFormOptions, parent);

    this.editForm = new Webform(
      {
        ..._.omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'skipInit']),
        language: this.options.language,
        ...editFormOptions
      }
    );

    this.hook('editFormProperties', parent);

    this.editForm.form = (isJsonEdit && !isCustom) ? {
      components: [
        {
          type: 'textarea',
          as: 'json',
          editor: 'ace',
          weight: 10,
          input: true,
          key: 'componentJson',
          label: 'Component JSON',
          tooltip: 'Edit the JSON for this component.'
        },
        {
          type: 'checkbox',
          key: 'showFullSchema',
          label: 'Full Schema'
        }
      ]
    } : ComponentClass.editForm(_.cloneDeep(overrides));
    const instanceOptions = {
      inFormBuilder: true,
    };

    this.hook('instanceOptionsPreview', instanceOptions);

    const instance = new ComponentClass(componentCopy, instanceOptions);
    const schema = this.hook('builderComponentSchema', component, instance);

    this.editForm.submission = isJsonEdit ? {
      data: {
        componentJson: schema,
        showFullSchema: this.options.showFullJsonSchema
      },
    } : {
        data: instance.component,
      };

    if (this.preview) {
      this.preview.destroy();
    }
    if (!ComponentClass.builderInfo.hasOwnProperty('preview') || ComponentClass.builderInfo.preview) {
      this.preview = new Webform(_.omit({ ...this.options, preview: true }, [
        'hooks',
        'builder',
        'events',
        'attachMode',
        'calculateValue'
      ]));

      this.hook('previewFormSettitngs', schema, isJsonEdit);
    }

    this.showPreview = ComponentClass.builderInfo.showPreview ?? true;

    this.componentEdit = this.ce('div', { 'class': 'component-edit-container' });
    this.setContent(this.componentEdit, this.renderTemplate('builderEditForm', {
      componentInfo: ComponentClass.builderInfo,
      editForm: this.editForm.render(),
      preview: this.preview ? this.preview.render() : false,
      showPreview: this.showPreview,
      helplinks: this.helplinks
    }));

    this.dialog = this.createModal(this.componentEdit, _.get(this.options, 'dialogAttr', {}));

    // This is the attach step.
    this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));

    this.hook('editFormWrapper');

    this.updateComponent(componentCopy);

    this.editForm.on('change', (event) => {
      if (event.changed) {
        if (event.changed.component && event.changed.component.key === 'showFullSchema') {
          const { value } = event.changed;
          this.editForm.submission = {
            data: {
              componentJson: value ? instance.component : component,
              showFullSchema: value
            },
          };
          return;
        }
        // See if this is a manually modified key. Treat custom component keys as manually modified
        if ((event.changed.component && (event.changed.component.key === 'key')) || isJsonEdit) {
          componentCopy.keyModified = true;
        }

        let isComponentLabelChanged = false;
        if (event.changed.instance) {
          isComponentLabelChanged = ['label', 'title'].includes(event.changed.instance.path);
        }
        else if (event.changed.component) {
          isComponentLabelChanged = ['label', 'title'].includes(event.changed.component.key);
        }

        if (isComponentLabelChanged) {
          // Ensure this component has a key.
          if (isNew) {
            if (!event.data.keyModified) {
              this.editForm.everyComponent(component => {
                if (component.key === 'key' && component.parent.component.key === 'tabs') {
                  component.setValue(this.updateComponentKey(event.data));
                  return false;
                }
              });
            }

            if (this.form) {
              let formComponents = this.findNamespaceRoot(parent.formioComponent);
              // excluding component which key uniqueness is to be checked to prevent the comparing of the same keys
              formComponents = formComponents.filter(comp => editFormOptions.editComponent.id !== comp.id);

              // Set a unique key for this component.
              BuilderUtils.uniquify(formComponents, event.data);
            }
          }
        }

        // Update the component.
        this.updateComponent(event.data.componentJson || event.data, event.changed);
      }
    });

    this.attachEditComponentControls(component, parent, isNew, original, ComponentClass);

    const dialogClose = () => {
      this.editForm.destroy(true);
      if (this.preview) {
        this.preview.destroy(true);
        this.preview = null;
      }
      if (isNew && !this.saved) {
        this.removeComponent(component, parent, original);
        this.highlightInvalidComponents();
      }
      // Clean up.
      this.removeEventListener(this.dialog, 'close', dialogClose);
      this.dialog = null;
    };
    this.addEventListener(this.dialog, 'close', dialogClose);

    // Called when we edit a component.
    this.emit('editComponent', component);
  }

  updateComponentKey(data) {
    return _.camelCase(
      data.title ||
      data.label ||
      data.placeholder ||
      data.type
    ).replace(/^[0-9]*/, '');
  }

  moveComponent(component) {
    if (this.selectedComponent) {
      const prevSelected = this.selectedComponent;
      prevSelected.element?.classList.remove('builder-component-selected');
      this.removeEventListener(document, 'keydown');
    }

    component.element.focus();
    component.element.classList.add('builder-component-selected');
    this.selectedComponent = component;
    this.addEventListener(document, 'keydown', this.moveHandler.bind(this));
  }

  moveHandler = (e) => {
    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) {
      e.stopPropagation();
      e.preventDefault();
    }

    if (e.keyCode === 38) {
      this.updateComponentPlacement(true);
    }

    if (e.keyCode === 40) {
      this.updateComponentPlacement(false);
    }

    if (e.keyCode === 13) {
      this.stopMoving(this.selectedComponent);
    }
  };

  updateComponentPlacement(direction) {
    const component = this.selectedComponent;
    let index, info;
    const step = direction ? -1 : 1;
    if (component) {
      const element = component.element;
      const sibling = direction ? element.previousElementSibling : element.nextElementSibling;
      const source = element.parentNode;

      const containerLength = source.formioContainer.length;

      if (containerLength && containerLength <= 1) {
        return;
      }

      if (source.formioContainer) {
        index = _.findIndex(source.formioContainer, { key: element.formioComponent.component.key });

        if (index !== -1) {
          info = source.formioContainer.splice(
            _.findIndex(source.formioContainer, { key: element.formioComponent.component.key }), 1
          );
          info = info[0];
          source.removeChild(element);
        }
      }

      const len = source.formioComponent.components.length;
        index = (index === -1) ? 0 : index + step;

        if (index === -1) {
          source.formioContainer.push(info);
          source.appendChild(element);
        }
        else if (index === len) {
          const key = source.formioContainer[0].key;
          index = _.findIndex(source.formioComponent.components, { key: key });
          const firstElement = source.formioComponent.components[index].element;
          source.formioContainer.splice(0, 0, info);
          source.insertBefore(element, firstElement);
        }
        else if (index !== -1) {
          source.formioContainer.splice(index, 0, info);
          direction
          ? source.insertBefore(element, sibling)
          : source.insertBefore(element, sibling.nextElementSibling);
        }
        element.focus();
    }
  }

  stopMoving(comp) {
    const parent = comp.element.parentNode;
    this.removeEventListener(document, 'keydown');
    parent.formioComponent.rebuild();
    this.selectedComponent = null;
  }

  addNewComponent(element) {
    const source = document.querySelector('.formio-builder-form');
    const key = element.getAttribute('data-key');
    const group = element.getAttribute('data-group');

    const isNew = true;
    let info;

    if (key && group) {
      info = this.getComponentInfo(key, group);
    }

    if (isNew && !this.options.noNewEdit && !info.noNewEdit) {
      BuilderUtils.uniquify(this.findNamespaceRoot(source.formioComponent), info);
      this.editComponent(info, source, isNew, null, null);
    }

    const firstComponent = source.formioComponent.components[0]?.element;

    if (firstComponent) {
      source.formioContainer.splice(0, 0, info);
    }
    else {
      source.formioContainer.push(info);
    }

    source.formioComponent.rebuild().then(() => {
      this.isComponentCreated = true;
    });
  }

  /**
   * Creates copy of component schema and stores it under sessionStorage.
   * @param {Component} component
   * @return {*}
   */
  copyComponent(component) {
    if (!window.sessionStorage) {
      return console.warn('Session storage is not supported in this browser.');
    }
    this.addClass(this.refs.form, 'builder-paste-mode');
    window.sessionStorage.setItem('formio.clipboard', JSON.stringify(component.schema));
  }

  /**
   * Paste copied component after the current component.
   * @param {Component} component
   * @return {*}
   */
  pasteComponent(component) {
    if (!window.sessionStorage) {
      return console.warn('Session storage is not supported in this browser.');
    }
    this.removeClass(this.refs.form, 'builder-paste-mode');
    if (window.sessionStorage) {
      const data = window.sessionStorage.getItem('formio.clipboard');
      if (data) {
        const schema = JSON.parse(data);
        const parent = this.getParentElement(component.element);
        if (parent) {
          BuilderUtils.uniquify(this.findNamespaceRoot(parent.formioComponent), schema);
          let path = '';
          let index = 0;

          const isParentSaveChildMethod = this.isParentSaveChildMethod(parent.formioComponent);

          if (parent.formioContainer && !isParentSaveChildMethod) {
            index = parent.formioContainer.indexOf(component.component);
            path = this.getComponentsPath(schema, parent.formioComponent.component);
            parent.formioContainer.splice(index + 1, 0, schema);
          }
          else if (isParentSaveChildMethod) {
            parent.formioComponent.saveChildComponent(schema, false);
          }
          parent.formioComponent.rebuild();

          this.emitSaveComponentEvent(schema, schema, parent.formioComponent.component, path, (index + 1), true, schema);
        }
        this.emit('change', this.form);
      }
    }
  }

  isParentSaveChildMethod(parentComp) {
    return !!(parentComp && parentComp.saveChildComponent);
  }

  getParentElement(element) {
    let container = element;
    do {
      container = container.parentNode;
    } while (container && !container.formioComponent);
    return container;
  }

  addBuilderComponentInfo(component) {
    if (!component || !component.group || !this.groups[component.group]) {
      return;
    }

    component = _.clone(component);
    const groupInfo = this.groups[component.group];
    if (!groupInfo.components.hasOwnProperty(component.key)) {
      groupInfo.components[component.key] = component;
    }
    return component;
  }

  init() {
    if (this.webform) {
      this.webform.init();
    }
    return super.init();
  }

  clear() {
    if (this.webform.initialized) {
      this.webform.clear();
    }
  }

  destroy(deleteFromGlobal) {
    if (this.webform.initialized) {
      this.webform.destroy(deleteFromGlobal);
    }
    super.destroy(deleteFromGlobal);
  }

  addBuilderGroup(name, group) {
    if (!this.groups[name]) {
      this.groups[name] = group;
      this.groupOrder.push(name);
      this.triggerRedraw();
    }
    else {
      this.updateBuilderGroup(name, group);
    }
  }

  updateBuilderGroup(name, group) {
    if (this.groups[name]) {
      this.groups[name] = group;
      this.triggerRedraw();
    }
  }

  generateKey(info) {
    return info.key || _.camelCase(
      info.title ||
      info.label ||
      info.placeholder ||
      info.type
    );
  }
}
