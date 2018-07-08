/* global $ */

import Webform from './Webform';
import Component from './components/_classes/component/Component';
import dragula from 'dragula';
import Components from './components/Components';
import BuilderUtils from './utils/builder';
import { getComponent } from './utils/utils';
import EventEmitter from 'eventemitter2';
import Promise from 'native-promise-only';
import _ from 'lodash';
require('./components/builder');

export default class WebformBuilder extends Component {
  constructor(options) {
    super(options);
    this.dragContainers = [];
    this.sidebarContainers = [];
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
    };

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

    options.hooks.renderComponents = (html, {components, self, path}) => {
      if (!components || (!components.length && !components.nodrop) || (self.type === 'form' && components.length <= 1)) {
        html = this.renderTemplate('builderPlaceholder', {}) + html;
      }
      return this.renderTemplate('builderComponents', {
        html,
        path,
      });
    };

    options.hooks.attachComponents = (element, components, container, component) => {
      // Attach container and component to element for later reference.
      const containerElement = element.querySelector(`[ref="container"]`);
      containerElement.formioContainer = container;
      containerElement.formioComponent = component;
      // Add container to draggable list.
      this.dragula.containers.push(containerElement);

      // Since we added a wrapper, need to return the original element so that we can find the components inside it.
      return element.children[0];
    };

    options.hooks.renderComponent = (html, {self}) => {
      return this.renderTemplate('builderComponent', {
        html,
        path: self.schemaPath,
      });
    };

    options.hooks.attachComponent = (element, component) => {
      // Add component to element for later reference.
      element.formioComponent = component;

      component.loadRefs(element, {
        removeComponent: 'single',
        editComponent: 'single',
      });
      component.addEventListener(this.refs.editComponent, 'click', () => this.editComponent(component));
      component.addEventListener(this.refs.removeComponent, 'click', () => this.deleteComponent(component));
      return element;
    };

    this.webform = new Webform(options);
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
      this.refs['sidebar-anchor'].forEach((anchor, index) => {
        this.addEventListener(anchor, 'click', () => {
          this.refs['sidebar-group'].forEach((group, groupIndex) => {
            group.style.display = (groupIndex === index) ? 'inherit' : 'none';
          });
        });
      });
    }

    this.dragula = dragula(Array.prototype.slice.call(this.refs['sidebar-container']), {
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
    let info;

    if (type) {
      // This is a new component
      info = this.schemas[type];
      info.isNew = true;
    }
    else {
      // Grab and remove the component from the source container.
      info = source.formioContainer.splice(_.findIndex(source.formioContainer, {key: element.formioComponent.component.key}), 1);

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
        index = _.findIndex(target.formioContainer, {key: sibling.formioComponent.component.key});
      }
      target.formioContainer.splice(index, 0, info);
    }
    else {
      target.formioContainer.push(info);
    }

    if (info.isNew) {
      // this.editComponent(info);
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

  get ready() {
    return Promise.resolve(this);
  }

  deleteComponent(component) {
    console.log('delete', component);
    return;
    if (!component.parent) {
      return;
    }
    let remove = true;
    if (component.type === 'components' && component.getComponents().length > 0) {
      const message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
      remove = window.confirm(this.t(message));
    }
    if (remove) {
      this.emit('deleteComponent', component);
      component.parent.removeComponentById(component.id);
      this.form = this.schema;
    }
    return remove;
  }

  removeComponent(path) {
    const container = _.get(this.form, path.replace(/\[[^\[]*?\]$/, ''));
    container.splice(container.indexOf(_.get(this.form, path)), 1);
  }

  updateComponent(component) {
    // Update the preview.
    if (this.componentPreview) {
      this.preview = Components.create(component.component, {
        preview: true,
        events: new EventEmitter({
          wildcard: false,
          maxListeners: 0
        })
      }, {}, true);
      this.preview.on('componentEdit', (comp) => {
        _.merge(component.component, comp.component);
        this.editForm.redraw();
      });
      this.preview.build();
      this.preview.isBuilt = true;
      this.componentPreview.innerHTML = '';
      this.componentPreview.appendChild(this.preview.getElement());
    }

    // Ensure this component has a key.
    if (component.isNew) {
      if (!component.keyModified) {
        component.component.key = _.camelCase(
          component.component.label ||
          component.component.placeholder ||
          component.component.type
        );
      }

      // Set a unique key for this component.
      BuilderUtils.uniquify(this._form, component.component);
    }

    // Change the "default value" field to be reflective of this component.
    if (this.defaultValueComponent) {
      _.assign(this.defaultValueComponent, _.omit(component.component, [
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

  editComponent(component) {
    console.log('edit', component);
    return;
    const componentCopy = _.cloneDeep(component);
    const componentClass = Components.components[componentCopy.component.type];
    // Make sure we only have one dialog open at a time.
    if (this.dialog) {
      this.dialog.close();
    }
    this.dialog = this.createModal(componentCopy.name);
    const formioForm = this.ce('div');
    this.componentPreview = this.ce('div', {
      class: 'component-preview'
    });
    const componentInfo = componentClass ? componentClass.builderInfo : {};

    const saveButton = this.ce('button', {
      class: 'btn btn-success',
      style: 'margin-right: 10px;'
    }, this.t('Save'));

    const cancelButton = this.ce('button', {
      class: 'btn btn-default',
      style: 'margin-right: 10px;'
    }, this.t('Cancel'));

    const removeButton = this.ce('button', {
      class: 'btn btn-danger'
    }, this.t('Remove'));

    const componentEdit = this.ce('div', {}, [
      this.ce('div', {
        class: 'row'
      }, [
        this.ce('div', {
          class: 'col col-sm-6'
        }, this.ce('p', {
          class: 'lead'
        }, `${componentInfo.title} Component`)),
        this.ce('div', {
          class: 'col col-sm-6'
        }, [
          this.ce('div', {
            class: 'pull-right',
            style: 'margin-right: 20px; margin-top: 10px'
          }, this.ce('a', {
            href: componentInfo.documentation || '#',
            target: '_blank'
          }, this.ce('i', {
            class: this.iconClass('new-window')
          }, ` ${this.t('Help')}`)))
        ])
      ]),
      this.ce('div', {
        class: 'row'
      }, [
        this.ce('div', {
          class: 'col col-sm-6'
        }, formioForm),
        this.ce('div', {
          class: 'col col-sm-6'
        }, [
          this.ce('div', {
            class: 'card panel panel-default preview-panel'
          }, [
            this.ce('div', {
              class: 'card-header panel-heading'
            }, this.ce('h3', {
              class: 'card-title panel-title'
            }, this.t('Preview'))),
            this.ce('div', {
              class: 'card-body panel-body'
            }, this.componentPreview)
          ]),
          this.ce('div', {
            style: 'margin-top: 10px;'
          }, [
            saveButton,
            cancelButton,
            removeButton
          ])
        ])
      ])
    ]);

    // Append the settings page to the dialog body.
    this.dialog.body.appendChild(componentEdit);

    const editForm = Components.components[componentCopy.component.type].editForm();

    // Change the defaultValue component to be reflective.
    this.defaultValueComponent = getComponent(editForm.components, 'defaultValue');
    _.assign(this.defaultValueComponent, _.omit(componentCopy.component, [
      'key',
      'label',
      'placeholder',
      'tooltip',
      'validate'
    ]));

    // Create the form instance.
    this.editForm = new Webform(formioForm);

    // Set the form to the edit form.
    this.editForm.form = editForm;

    // Pass along the form being edited.
    this.editForm.editForm = this._form;

    // Update the preview with this component.
    this.updateComponent(componentCopy);

    // Register for when the edit form changes.
    this.editForm.on('change', (event) => {
      if (event.changed) {
        // See if this is a manually modified key.
        if (event.changed.component && (event.changed.component.key === 'key')) {
          componentCopy.keyModified = true;
        }

        // Set the component JSON to the new data.
        componentCopy.component = this.editForm.getValue().data;

        // Update the component.
        this.updateComponent(componentCopy);
      }
    });

    // Modify the component information in the edit form.
    this.editForm.formReady.then(() => this.editForm.setValue({ data: componentCopy.component }, {
      noUpdateEvent: true
    }));

    this.addEventListener(cancelButton, 'click', (event) => {
      event.preventDefault();
      this.emit('cancelComponent', component);
      this.dialog.close();
    });

    this.addEventListener(removeButton, 'click', (event) => {
      event.preventDefault();
      this.deleteComponent(component);
      this.dialog.close();
    });

    this.addEventListener(saveButton, 'click', (event) => {
      event.preventDefault();
      component.isNew = false;
      component.component = componentCopy.component;
      if (component.dragEvents && component.dragEvents.onSave) {
        component.dragEvents.onSave(component);
      }
      this.emit('saveComponent', component);
      this.form = this.schema;
      this.dialog.close();
    });

    this.addEventListener(this.dialog, 'close', () => {
      this.editForm.destroy();
      if (component.isNew) {
        this.deleteComponent(component);
      }
    });

    // Called when we edit a component.
    this.emit('editComponent', component);
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

  clear() {
    super.clear();
    this.dragContainers = [];
  }
}
