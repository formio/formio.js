/* global $ */

import Webform from './Webform';
import Component from './components/_classes/component/Component';
import dragula from 'dragula';
import Components from './components/Components';
import BuilderUtils from './utils/builder';
import { getComponent } from './utils/utils';
import Promise from 'native-promise-only';
import _ from 'lodash';
require('./components/builder');

export default class WebformBuilder extends Component {
  constructor(options) {
    super(options);
    this.schemas = {};

    this.sideBarScroll = _.get(this.options, 'sideBarScroll', true);
    this.sideBarScrollOffset = _.get(this.options, 'sideBarScrollOffset', 0);

    // Setup the builder options.
    this.builder = _.defaultsDeep({}, this.options.builder, this.defaultGroups);

    // Turn off if explicitely said to do so...
    _.each(this.defaultGroups, (config, key) => {
      if (config === false) {
        this.options.builder[key] = false;
      }
    });

    // Add the groups.
    this.groups = {};
    this.groupOrder = [];
    for (const group in this.builder) {
      if (this.builder[group]) {
        this.builder[group].key = group;
        this.groups[group] = this.builder[group];
        this.groupOrder.push(this.builder[group]);
      }
    }

    this.groupOrder = this.groupOrder
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

    // Need to create a component order for each group.
    for (const group in this.groups) {
      if (this.groups[group] && this.groups[group].components) {
        this.groups[group].componentOrder = this.groups[group].componentOrder
          .sort((a, b) => a.weight - b.weight)
          .map(component => component.key);
      }
    }

    options.hooks = options.hooks || {};

    options.hooks.renderComponents = (html, { components, self }) => {
      if (!components || (!components.length && !components.nodrop) || (self.type === 'form' && components.length <= 1)) {
        html = this.renderTemplate('builderPlaceholder', {}) + html;
      }
      return this.renderTemplate('builderComponents', {
        html,
      });
    };

    options.hooks.attachComponents = (element, components, container, component) => {
      // Attach container and component to element for later reference.
      const containerElement = element.querySelector('[ref="container"]');
      containerElement.formioContainer = container;
      containerElement.formioComponent = component;
      // Add container to draggable list.
      this.dragula.containers.push(containerElement);

      // Since we added a wrapper, need to return the original element so that we can find the components inside it.
      return element.children[0];
    };

    options.hooks.renderComponent = (html, { self }) => {
      if (self.type === 'form') {
        return html;
      }
      return this.renderTemplate('builderComponent', {
        html,
      });
    };

    options.hooks.attachComponent = (element, component) => {
      // Add component to element for later reference.
      element.formioComponent = component;

      component.loadRefs(element, {
        removeComponent: 'single',
        editComponent: 'single',
      });

      const parent = this.getParentElement(element);
      component.addEventListener(component.refs.editComponent, 'click', () => this.editComponent(component.component, parent));
      component.addEventListener(component.refs.removeComponent, 'click', () => this.removeComponent(component.component, parent));

      return element;
    };

    this.webform = new Webform(options);
  }

  get ready() {
    return Promise.resolve(this);
  }

  get defaultGroups() {
    return {
      basic: {
        title: 'Basic Components',
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
      }
    };
  }

  get options() {
    if (this.webform) {
      return this.webform.options;
    }
    return {};
  }

  set options(value) {
    if (this.webform) {
      return this.webform.options = value;
    }
  }

  get form() {
    return this.webform.form;
  }

  set form(value) {
    if (!value.components) {
      value.components = [];
    }

    // Ensure there is at least a submit button.
    if (!value.components.length) {
      value.components.push({
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

    this.webform.form = value;
  }

  render() {
    return this.renderTemplate('builder', {
      sidebar: this.renderTemplate('builderSidebar', {
        groupOrder: this.groupOrder,
        groups: this.groups,
      }),
      form: this.webform.render(),
    });
  }

  attach(element) {
    this.element = element;
    this.loadRefs(element, {
      form: 'single',
      sidebar: 'single',
      'container': 'multiple',
      'sidebar-anchor': 'multiple',
      'sidebar-group': 'multiple',
      'sidebar-container': 'multiple',
    });

    this.sideBarTop = this.refs.sidebar.getBoundingClientRect().top + window.scrollY;
    if (this.sideBarScroll) {
      this.addEventListener(window, 'scroll', _.throttle(this.scrollSidebar.bind(this), 10));
    }

    // See if we have bootstrap.js installed.
    const hasBootstrapJS = (typeof $ === 'function') && (typeof $().collapse === 'function');

    if (!hasBootstrapJS) {
      // Initialize
      this.refs['sidebar-group'].forEach((group) => {
        group.style.display = (group.getAttribute('data-default') === 'true') ? 'inherit' : 'none';
      });

      // Click event
      this.refs['sidebar-anchor'].forEach((anchor, index) => {
        this.addEventListener(anchor, 'click', () => {
          this.refs['sidebar-group'].forEach((group, groupIndex) => {
            group.style.display = (groupIndex === index) ? 'inherit' : 'none';
          });
        });
      });
    }

    this.dragula = dragula(Array.prototype.slice.call(this.refs['sidebar-container']), {
      moves(el) {
        return !el.classList.contains('no-drag');
      },
      copy(el) {
        return el.classList.contains('drag-copy');
      },
      accepts(el, target) {
        return !target.classList.contains('no-drop');
      }
    }).on('drop', (element, target, source, sibling) => this.onDrop(element, target, source, sibling));

    this.webform.attach(this.refs.form);
  }

  detach() {
    // if (this.dragula) {
    //   this.dragula.destroy();
    // }
    // this.dragula = null;
    super.detach();
  }

  onDrop(element, target, source, sibling) {
    if (!target) {
      return;
    }

    const type = element.getAttribute('data-type');
    let info, isNew;

    if (type) {
      // This is a new component
      info = this.schemas[type];
      isNew = true;
    }
    else {
      // Grab and remove the component from the source container.
      info = source.formioContainer.splice(
        _.findIndex(source.formioContainer, { key: element.formioComponent.component.key }), 1
      );

      // Since splice returns an array of one object, we need to destructure it.
      info = info[0];

      // If the target is different from the source, rebuild the source now that the item has been removed.
      if (target !== source) {
        source.formioComponent.rebuild();
      }
    }

    // Insert in the new container.
    if (sibling) {
      let index = 0;
      if (!sibling.getAttribute('data-noattach')) {
        index = _.findIndex(target.formioContainer, { key: sibling.formioComponent.component.key });
      }
      target.formioContainer.splice(index, 0, info);
    }
    else {
      target.formioContainer.push(info);
    }

    if (isNew) {
      this.editComponent(info, target, isNew);
    }

    // Cause parent to rebuild so component becomes visible.
    target.formioComponent.rebuild();
  }

  scrollSidebar() {
    const newTop = (window.scrollY - this.sideBarTop) + this.sideBarScrollOffset;
    const shouldScroll = (newTop > 0);
    if (shouldScroll && ((newTop + this.refs.sidebar.offsetHeight) < this.element.offsetHeight)) {
      this.refs.sidebar.style.marginTop = `${newTop}px`;
    }
    else if (shouldScroll && (this.refs.sidebar.offsetHeight < this.element.offsetHeight)) {
      this.refs.sidebar.style.marginTop = `${this.element.offsetHeight - this.refs.sidebar.offsetHeight}px`;
    }
    else {
      this.refs.sidebar.style.marginTop = '0px';
    }
  }

  removeComponent(component, parent) {
    if (!parent) {
      return;
    }
    const remove = true;
    // if (component.type === 'components' && component.getComponents().length > 0) {
    //   const message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
    //   remove = window.confirm(this.t(message));
    // }
    if (remove) {
      this.emit('removeComponent', component);
      parent.formioContainer.splice(parent.formioContainer.indexOf(component), 1);
      parent.formioComponent.rebuild();
    }
    return remove;
  }

  updateComponent(component, keyModified, isNew) {
    // Update the preview.
    if (this.preview) {
      this.preview.form = { components: [component] };
      this.componentEdit.querySelector('[ref="preview"]').innerHTML = this.preview.render();
    }

    // Ensure this component has a key.
    if (isNew) {
      if (!keyModified) {
        component.key = _.camelCase(
          component.label ||
          component.placeholder ||
          component.type
        );
      }

      // Set a unique key for this component.
      BuilderUtils.uniquify(this._form, component);
    }

    // Change the "default value" field to be reflective of this component.
    if (this.defaultValueComponent) {
      _.assign(this.defaultValueComponent.component, _.omit(component, [
        'key',
        'label',
        'placeholder',
        'tooltip',
        'validate'
      ]));
    }

    // Called when we update a component.
    this.emit('updateComponent', component);
  }

  editComponent(component, parent, isNew) {
    const componentCopy = _.cloneDeep(component);
    const componentClass = Components.components[componentCopy.type];
    // Make sure we only have one dialog open at a time.
    if (this.dialog) {
      this.dialog.close();
    }

    // This is the render step.
    this.editForm = new Webform(_.omit(this.options, ['hooks', 'builder', 'events']));

    this.editForm.form = componentClass.editForm();

    // Pass along the form being edited.
    this.editForm.editForm = this._form;

    this.editForm.submission = {
      data: componentCopy,
    };

    this.preview = new Webform(_.omit(this.options, ['hooks', 'builder', 'events']));

    this.componentEdit = this.ce('div');
    this.componentEdit.innerHTML = this.renderTemplate('builderEditForm', {
      componentInfo: componentClass.builderInfo,
      editForm: this.editForm.render(),
      preview: this.preview.render(),
    });

    this.dialog = this.createModal(this.componentEdit);

    // This is the attach step.
    const editForm = this.componentEdit.querySelector('[ref="editForm"]');
    this.editForm.attach(editForm);

    this.defaultValueComponent = getComponent(this.editForm.components, 'defaultValue');

    this.updateComponent(componentCopy);

    this.editForm.on('change', (event) => {
      if (event.changed) {
        this.updateComponent(event.data, event.data.key === component.key);
      }
    });

    this.addEventListener(this.componentEdit.querySelector('[ref="cancelButton"]'), 'click', (event) => {
      event.preventDefault();
      this.editForm.detach();
      this.emit('cancelComponent', component);
      this.dialog.close();
    });

    this.addEventListener(this.componentEdit.querySelector('[ref="removeButton"]'), 'click', (event) => {
      event.preventDefault();
      this.editForm.detach();
      this.removeComponent(component, parent);
      this.dialog.close();
    });

    this.addEventListener(this.componentEdit.querySelector('[ref="saveButton"]'), 'click', (event) => {
      event.preventDefault();
      this.editForm.detach();
      parent.formioContainer[parent.formioContainer.indexOf(component)] = this.editForm.submission.data;
      parent.formioComponent.rebuild();
      this.emit('saveComponent', component);
      this.dialog.close();
    });

    this.addEventListener(this.dialog, 'close', () => {
      this.editForm.detach();
      if (isNew) {
        // this.removeComponent(component);
      }
    });

    // Called when we edit a component.
    this.emit('editComponent', component);
  }

  getParentElement(element) {
    let container = element;
    do {
      container = container.parentNode;
    } while (container && !container.formioContainer);
    return container;
  }

  addBuilderComponentInfo(component) {
    if (!component || !component.group || !this.groups[component.group]) {
      return;
    }

    component = _.clone(component);
    const groupInfo = this.groups[component.group];
    if (!groupInfo.components) {
      groupInfo.components = {};
    }
    if (!groupInfo.componentOrder) {
      groupInfo.componentOrder = [];
    }
    groupInfo.componentOrder.push(component);
    if (!groupInfo.components.hasOwnProperty(component.key)) {
      groupInfo.components[component.key] = component;
    }
    return component;
  }
}
