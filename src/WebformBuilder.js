import Webform from './Webform';
import Component from './components/_classes/component/Component';
// Import from "dist" because it would require and "global" would not be defined in Angular apps.
import dragula from 'dragula/dist/dragula';
import Tooltip from 'tooltip.js';
import NativePromise from 'native-promise-only';
import Components from './components/Components';
import Formio from './Formio';
import { fastCloneDeep, bootstrapVersion } from './utils/utils';
import { eachComponent, getComponent } from './utils/formUtils';
import BuilderUtils from './utils/builder';
import _ from 'lodash';
import Templates from './templates/Templates';
require('./components/builder');

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

    super(null, options);

    this.element = element;

    this.builderHeight = 0;
    this.schemas = {};
    this.repeatablePaths = [];

    this.sideBarScroll = _.get(this.options, 'sideBarScroll', true);
    this.sideBarScrollOffset = _.get(this.options, 'sideBarScrollOffset', 0);

    const componentInfo = {};
    for (const type in Components.components) {
      const component = Components.components[type];
      if (component.builderInfo) {
        component.type = type;
        componentInfo[type] = component.builderInfo;
      }
    }

    this.fieldsList = {
      title: 'Result fields',
      key: 'searchFields',
      weight: 0,
      subgroups: [],
      default: true,
      components: {},
      componentOrder: []
    };

    this.dragDropEnabled = true;

    // Setup the builder options.
    this.builder = _.defaultsDeep({}, this.options.builder, this.defaultGroups);

    // Turn off if explicitely said to do so...
    _.each(this.defaultGroups, (config, key) => {
      if (config === false) {
        this.builder[key] = false;
      }
    });

    // Add the groups.
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
      if (component.builderInfo) {
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
        const comp = info.components[key];
        if (comp) {
          if (comp.schema) {
            this.schemas[key] = comp.schema;
          }
          info.components[key] = comp === true ? componentInfo[key] : comp;
          info.components[key].key = key;
          this.fieldsList.components[key] = info.components[key];
        }
      }
    }

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

    this.options.hooks = this.options.hooks || {};

    this.options.hooks.renderComponent = (html, { self }) => {
      if (self.type === 'form' && !self.key) {
        // The main webform shouldn't have this class as it adds extra styles.
        return html.replace('formio-component-form', '');
      }

      if (this.options.disabled && this.options.disabled.includes(self.key) || self.parent.noDragDrop) {
        return html;
      }

      return this.renderTemplate('builderComponent', {
        html,
        disableBuilderActions: self?.component?.disableBuilderActions,
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

    this.options.hooks.attachComponent = (element, component) => {
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
        new Tooltip(component.refs.copyComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Copy')
        });

        component.addEventListener(component.refs.copyComponent, 'click', () =>
          this.copyComponent(component));
      }

      if (component.refs.pasteComponent) {
        const pasteToolTip = new Tooltip(component.refs.pasteComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Paste below')
        });

        component.addEventListener(component.refs.pasteComponent, 'click', () => {
          pasteToolTip.hide();
          this.pasteComponent(component);
        });
      }

      if (component.refs.moveComponent) {
        new Tooltip(component.refs.moveComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Move')
        });
      }

      const parent = this.getParentElement(element);

      if (component.refs.editComponent) {
        new Tooltip(component.refs.editComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Edit')
        });

        component.addEventListener(component.refs.editComponent, 'click', () =>
          this.editComponent(component.schema, parent, false, false, component.component));
      }

      if (component.refs.editJson) {
        new Tooltip(component.refs.editJson, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Edit JSON')
        });

        component.addEventListener(component.refs.editJson, 'click', () =>
          this.editComponent(component.schema, parent, false, true, component.component));
      }

      if (component.refs.removeComponent) {
        new Tooltip(component.refs.removeComponent, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Remove')
        });

        component.addEventListener(component.refs.removeComponent, 'click', () =>
          this.removeComponent(component.schema, parent, component.component));
      }

      return element;
    };

    // Load resources tagged as 'builder'
    const query = {
      params: {
        type: 'resource',
        limit: 4294967295,
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

        subgroup.componentOrder.push(component.key);
        subgroup.components[component.key] = _.merge(
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
        this.fieldsList.components[component.key] = subgroup.components[component.key];
      }, true);

      this.groups.resource.subgroups.push(subgroup);
    });

    this.triggerRedraw();
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
      },
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
    // First get the component with nested parents.
    const comp = getComponent(this.webform.form.components, component.key, true);
    const namespaceKey = this.recurseNamespace(comp);

    // If there is no key, it is the root form.
    if (!namespaceKey || this.form.key === namespaceKey) {
      return this.form.components;
    }

    // If the current component is the namespace, we don't need to find it again.
    if (namespaceKey === component.key) {
      return [...component.components, component];
    }

    // Get the namespace component so we have the original object.
    const namespaceComponent = getComponent(this.form.components, namespaceKey, true);
    return namespaceComponent.components;
  }

  recurseNamespace(component) {
    // If there is no parent, we are at the root level.
    if (!component) {
      return null;
    }

    // Some components are their own namespace.
    if (['address', 'container', 'datagrid', 'editgrid', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
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
      });

      if (this.sideBarScroll && Templates.current.handleBuilderSidebarScroll) {
        Templates.current.handleBuilderSidebarScroll.call(this, this);
      }

      // Add the paste status in form
      if (window.sessionStorage) {
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

      this.addEventListener(this.refs['sidebar-search'], 'input', (e) => {
        const searchString = e.target.value;
        this.searchFields(searchString);
      });

      if (this.dragDropEnabled) {
        this.initDragula();
      }

      if (this.refs.form) {
        return this.webform.attach(this.refs.form);
      }
    });
  }

  searchFields(searchString) {
    if (!this.refs['sidebar-groups']) {
      return;
    }
    if (searchString) {
      const filteredComponentsOrder = [];
      for (const type in this.fieldsList.components) {
        const builderInfo = this.fieldsList.components[type];
        if (builderInfo.title.toLowerCase().indexOf(searchString) !== -1) {
          filteredComponentsOrder.push(type);
        }
      }
      this.fieldsList.componentOrder = filteredComponentsOrder;
      this.refs['sidebar-groups'].innerHTML = this.renderTemplate('builderSidebarGroup', {
        group: this.fieldsList,
        groupKey: 'searchFields',
        groupId: `builder-sidebar-${this.id}`,
        subgroups: []
      });
    }
    else {
      this.refs['sidebar-groups'].innerHTML = this.groupOrder.map((groupKey) => this.renderTemplate('builderSidebarGroup', {
        group: this.groups[groupKey],
        groupKey,
        groupId: `builder-sidebar-${this.id}`,
        subgroups: this.groups[groupKey].subgroups.map((group) => this.renderTemplate('builderSidebarGroup', {
          group,
          groupKey: group.key,
          groupId: `group-container-${groupKey}`,
          subgroups: []
        })),
      })).join('');
    }

    this.loadRefs(this.element, {
      'sidebar-groups': 'single',
      'sidebar-anchor': 'multiple',
      'sidebar-group': 'multiple',
      'sidebar-container': 'multiple',
    });

    this.updateDragAndDrop();
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
    // This is a new component
    if (this.schemas.hasOwnProperty(key)) {
      info = fastCloneDeep(this.schemas[key]);
    }
    else if (this.groups.hasOwnProperty(group)) {
      const groupComponents = this.groups[group].components;
      if (groupComponents.hasOwnProperty(key)) {
        info = fastCloneDeep(groupComponents[key].schema);
      }
    }
    if (group.slice(0, group.indexOf('-')) === 'resource') {
      // This is an existing resource field.
      const resourceGroups = this.groups.resource.subgroups;
      const resourceGroup = _.find(resourceGroups, { key: group });
      if (resourceGroup && resourceGroup.components.hasOwnProperty(key)) {
        info = fastCloneDeep(resourceGroup.components[key].schema);
      }
    }

    if (info) {
      info.key = _.camelCase(
        info.key ||
        info.title ||
        info.label ||
        info.placeholder ||
        info.type
      );
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

    if (key) {
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

    if (target !== source) {
      // Ensure the key remains unique in its new container.
      BuilderUtils.uniquify(this.findNamespaceRoot(target.formioComponent.component), info);
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

    if (isNew && !this.options.noNewEdit && !info.noNewEdit) {
      this.editComponent(info, target, isNew);
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
      return this.webform.setForm(form).then(() => {
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
    var isRecaptchaEnabled = false;
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
    if (
      !component.skipRemoveConfirm &&
      (
        (Array.isArray(component.components) && component.components.length) ||
        (Array.isArray(component.rows) && component.rows.length) ||
        (Array.isArray(component.columns) && component.columns.length)
      )
    ) {
      const message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
      remove = window.confirm(this.t(message));
    }
    if (!original) {
      original = parent.formioContainer.find((comp) => comp.key === component.key);
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

  updateComponent(component, changed) {
    // Update the preview.
    if (this.preview) {
      this.preview.form = {
        components: [_.omit(component, [
          'hidden',
          'conditional',
          'calculateValue',
          'logic',
          'autofocus',
          'customConditional',
        ])]
      };
      const previewElement = this.componentEdit.querySelector('[ref="preview"]');
      if (previewElement) {
        this.setContent(previewElement, this.preview.render());
        this.preview.attach(previewElement);
      }
    }

    // Change the "default value" field to be reflective of this component.
    const defaultValueComponent = getComponent(this.editForm.components, 'defaultValue');
    if (defaultValueComponent && component.type !== 'hidden') {
      const defaultChanged = changed && (
        (changed.component && changed.component.key === 'defaultValue')
        || (changed.instance && defaultValueComponent.hasComponent && defaultValueComponent.hasComponent(changed.instance))
      );

      if (!defaultChanged) {
        _.assign(defaultValueComponent.component, _.omit(component, [
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

        if (tabIndex !== -1 && index !== -1) {
          const sibling = parentComponent.tabs[tabIndex][index + 1];
          parentComponent.removeComponent(defaultValueComponent);
          const newComp = parentComponent.addComponent(defaultValueComponent.component, defaultValueComponent.data, sibling);
          _.pull(newComp.validators, 'required');
          parentComponent.tabs[tabIndex].splice(index, 1, newComp);
          newComp.checkValidity = () => true;
          newComp.build(defaultValueComponent.element);
        }
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
    });

    return repeatablePaths;
  }

  highlightInvalidComponents() {
    const repeatablePaths = this.findRepeatablePaths();

    eachComponent(this.webform.getComponents(), (comp, path) => {
      if (repeatablePaths.includes(path)) {
        comp.setCustomValidity(`API Key is not unique: ${comp.key}`);
      }
    });
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
      let comp = null;
      parentComponent.getComponents().forEach((component) => {
        if (component.component.key === original.key) {
          comp = component;
        }
      });
      const originalComp = comp.component;
      const originalComponentSchema = comp.schema;

      if (parentContainer) {
        parentContainer[index] = submissionData;
        if (comp) {
          comp.component = submissionData;
        }
      }
      else if (parentComponent && parentComponent.saveChildComponent) {
        parentComponent.saveChildComponent(submissionData);
      }
      const rebuild = parentComponent.rebuild() || NativePromise.resolve();
      return rebuild.then(() => {
        const schema = parentContainer ? parentContainer[index] : (comp ? comp.schema : []);
        this.emit('saveComponent',
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
      });
    }

    this.highlightInvalidComponents();
    return NativePromise.resolve();
  }

  editComponent(component, parent, isNew, isJsonEdit, original) {
    if (!component.key) {
      return;
    }
    let saved = false;
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
    this.editForm = new Webform(
      {
        ..._.omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'skipInit']),
        language: this.options.language,
        ...editFormOptions
      }
    );

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
        }
      ]
    } : ComponentClass.editForm(_.cloneDeep(overrides));
    const instance = new ComponentClass(componentCopy);
    this.editForm.submission = isJsonEdit ? {
      data: {
        componentJson: instance.component
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
    }

    this.componentEdit = this.ce('div', { 'class': 'component-edit-container' });
    this.setContent(this.componentEdit, this.renderTemplate('builderEditForm', {
      componentInfo: ComponentClass.builderInfo,
      editForm: this.editForm.render(),
      preview: this.preview ? this.preview.render() : false,
    }));

    this.dialog = this.createModal(this.componentEdit, _.get(this.options, 'dialogAttr', {}));

    // This is the attach step.
    this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));
    this.updateComponent(componentCopy);

    this.editForm.on('change', (event) => {
      if (event.changed) {
        // See if this is a manually modified key. Treat custom component keys as manually modified
        if ((event.changed.component && (event.changed.component.key === 'key')) || isJsonEdit) {
          componentCopy.keyModified = true;
        }

        if (event.changed.component && (['label', 'title'].includes(event.changed.component.key))) {
          // Ensure this component has a key.
          if (isNew) {
            if (!event.data.keyModified) {
              this.editForm.everyComponent(component => {
                if (component.key === 'key' && component.parent.component.key === 'tabs') {
                  component.setValue(_.camelCase(
                    event.data.title ||
                    event.data.label ||
                    event.data.placeholder ||
                    event.data.type
                  ));
                  return false;
                }
              });
            }

            if (this.form) {
              let formComponents = this.findNamespaceRoot(parent.formioComponent.component);
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
    this.addEventListener(this.componentEdit.querySelector('[ref="cancelButton"]'), 'click', (event) => {
      event.preventDefault();
      this.editForm.detach();
      this.emit('cancelComponent', component);
      this.dialog.close();
      this.highlightInvalidComponents();
    });

    this.addEventListener(this.componentEdit.querySelector('[ref="removeButton"]'), 'click', (event) => {
      event.preventDefault();
      // Since we are already removing the component, don't trigger another remove.
      saved = true;
      this.editForm.detach();
      this.removeComponent(component, parent, original);
      this.dialog.close();
      this.highlightInvalidComponents();
    });

    this.addEventListener(this.componentEdit.querySelector('[ref="saveButton"]'), 'click', (event) => {
      event.preventDefault();
      if (!this.editForm.checkValidity(this.editForm.data, true, this.editForm.data)) {
        this.editForm.setPristine(false);
        this.editForm.showErrors();
        return false;
      }
      saved = true;
      this.saveComponent(component, parent, isNew, original);
    });

    const dialogClose = () => {
      this.editForm.destroy(true);
      if (this.preview) {
        this.preview.destroy(true);
        this.preview = null;
      }
      if (isNew && !saved) {
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
        BuilderUtils.uniquify(this.findNamespaceRoot(parent.formioComponent.component), schema);
        let path = '';
        let index = 0;
        if (parent.formioContainer) {
          index = parent.formioContainer.indexOf(component.component);
          path = this.getComponentsPath(schema, parent.formioComponent.component);
          parent.formioContainer.splice(index + 1, 0, schema);
        }
        else if (parent.formioComponent && parent.formioComponent.saveChildComponent) {
          parent.formioComponent.saveChildComponent(schema, false);
        }
        parent.formioComponent.rebuild();
        this.emit('saveComponent', schema, schema, parent.formioComponent.components, path, (index + 1), true);
        this.emit('change', this.form);
      }
    }
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
    this.fieldsList.components[component.key] = component;
    return component;
  }

  init() {
    if (this.webform) {
      this.webform.init();
    }
    return super.init();
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
}
