import Webform from './Webform';
import dragula from 'dragula';
import Components from './components/builder';
import NestedComponent from './components/NestedComponent';
import BuilderUtils from './utils/builder';
import {getComponent} from './utils/utils';
import EventEmitter from 'eventemitter2';
import Promise from 'native-promise-only';
import _ from 'lodash';

export default class WebformBuilder extends Webform {
  constructor(element, options) {
    super(element, options);
    let self = this;
    this.dragContainers = [];
    this.sidebarContainers = [];
    this.updateDraggable = _.debounce(this.refreshDraggable.bind(this), 200);

    // Setup the builder options.
    this.options.builder = _.defaultsDeep({}, this.options.builder, this.defaultComponents);

    // Turn off if explicitely said to do so...
    _.each(this.defaultComponents, (config, key) => {
      if (config === false) {
        this.options.builder[key] = false;
      }
    });

    this.builderReady = new Promise((resolve) => {
      this.builderReadyResolve = resolve;
    });

    this.groups = {};
    this.options.sideBarScroll = _.get(this.options, 'sideBarScroll', true);
    this.options.sideBarScrollOffset = _.get(this.options, 'sideBarScrollOffset', 0);
    this.options.hooks = this.options.hooks || {};
    this.options.hooks.addComponents = function(components) {
      if (!components || (!components.length && !components.nodrop)) {
        // Return a simple alert so they know they can add something here.
        return [
          {
            type: 'htmlelement',
            internal: true,
            tag: 'div',
            className: 'alert alert-info',
            attrs: [
              {attr: 'id', value: this.id + '-placeholder'},
              {attr: 'style', value: 'text-align:center; margin-bottom: 0px;'},
              {attr: 'role', value: 'alert'}
            ],
            content: 'Drag and Drop a form component'
          }
        ];
      }
      return components;
    };
    this.options.hooks.addComponent = function(container, comp) {
      if (!comp || !comp.component) {
        return container;
      }

      if (!comp.noEdit && !comp.component.internal) {
        // Make sure the component position is relative so the buttons align properly.
        comp.getElement().style.position = 'relative';

        let removeButton = this.ce('div', {
          class: 'btn btn-xxs btn-danger component-settings-button component-settings-button-remove'
        }, this.ce('span', {class: 'glyphicon glyphicon-remove'}));
        this.addEventListener(removeButton, 'click', () => self.deleteComponent(comp));

        let editButton = this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-edit'
        }, this.ce('span', {class: 'glyphicon glyphicon-cog'}));
        this.addEventListener(editButton, 'click', () => self.editComponent(comp));

        // Add the edit buttons to the component.
        comp.prepend(this.ce('div', {
          class: 'component-btn-group'
        }, [removeButton, editButton]));
      }

      if (!container.noDrop) {
        self.addDragContainer(container, this);
      }

      return container;
    };
    this.setBuilderElement();
  }

  get defaultComponents() {
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

  scrollSidebar() {
    const newTop = (window.scrollY - this.sideBarTop) + this.options.sideBarScrollOffset;
    const shouldScroll = (newTop > 0);
    if (shouldScroll && ((newTop + this.sideBarElement.offsetHeight) < this.element.offsetHeight)) {
      this.sideBarElement.style.marginTop = `${newTop}px`;
    }
    else if (shouldScroll && (this.sideBarElement.offsetHeight < this.element.offsetHeight)) {
      this.sideBarElement.style.marginTop = `${this.element.offsetHeight - this.sideBarElement.offsetHeight}px`;
    }
    else {
      this.sideBarElement.style.marginTop = '0px';
    }
  }

  setBuilderElement() {
    return this.onElement.then(() => {
      this.addClass(this.wrapper, 'row formbuilder');
      this.builderSidebar = this.ce('div', {
        class: 'col-xs-4 col-sm-3 col-md-2 formcomponents'
      });
      this.prependTo(this.builderSidebar, this.wrapper);
      this.addClass(this.element, 'col-xs-8 col-sm-9 col-md-10 formarea');
      this.element.component = this;
      this.buildSidebar();
      this.sideBarTop = this.sideBarElement.getBoundingClientRect().top + window.scrollY;
      if (this.options.sideBarScroll) {
        this.addEventListener(window, 'scroll', _.throttle(this.scrollSidebar.bind(this), 10));
      }
    });
  }

  get ready() {
    return this.builderReady;
  }

  deleteComponent(component) {
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
    let componentCopy = _.cloneDeep(component);
    let componentClass = Components[componentCopy.component.type];
    // Make sure we only have one dialog open at a time.
    if (this.dialog) {
      this.dialog.close();
    }
    this.dialog = this.createModal(componentCopy.name);
    let formioForm = this.ce('div');
    this.componentPreview = this.ce('div', {
      class: 'component-preview'
    });
    let componentInfo = componentClass ? componentClass.builderInfo : {};

    let saveButton = this.ce('button', {
      class: 'btn btn-success',
      style: 'margin-right: 10px;'
    }, this.t('Save'));

    let cancelButton = this.ce('button', {
      class: 'btn btn-default',
      style: 'margin-right: 10px;'
    }, this.t('Cancel'));

    let removeButton = this.ce('button', {
      class: 'btn btn-danger'
    }, this.t('Remove'));

    let componentEdit = this.ce('div', {}, [
      this.ce('div', {
        class: 'row'
      }, [
        this.ce('div', {
          class: 'col col-sm-6'
        }, this.ce('p', {
          class: 'lead'
        }, componentInfo.title + ' Component')),
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
            class: 'glyphicon glyphicon-new-window'
          }, ' ' + this.t('Help'))))
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
            class: 'panel panel-default preview-panel'
          }, [
            this.ce('div', {
              class: 'panel-heading'
            }, this.ce('h3', {
              class: 'panel-title'
            }, this.t('Preview'))),
            this.ce('div', {
              class: 'panel-body'
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

    const editForm = Components[componentCopy.component.type].editForm();

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
    this.editForm.formReady.then(() => this.editForm.setValue({data: componentCopy.component}, {
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

  destroy() {
    super.destroy();
    if (this.dragula) {
      this.dragula.destroy();
    }
  }

  /**
   * Insert an element in the weight order.
   *
   * @param info
   * @param items
   * @param element
   * @param container
   */
  insertInOrder(info, items, element, container) {
    // Determine where this item should be added.
    let beforeWeight = 0;
    let before = null;
    _.each(items, (itemInfo) => {
      if (
        (info.key !== itemInfo.key) &&
        (info.weight < itemInfo.weight) &&
        (!beforeWeight || (itemInfo.weight < beforeWeight))
      ) {
        before = itemInfo.element;
        beforeWeight = itemInfo.weight;
      }
    });

    if (before) {
      try {
        container.insertBefore(element, before);
      }
      catch (err) {
        container.appendChild(element);
      }
    }
    else {
      container.appendChild(element);
    }
  }

  addBuilderGroup(info, container) {
    if (!info || !info.key) {
      console.warn('Invalid Group Provided.');
      return;
    }

    info = _.clone(info);
    let groupAnchor = this.ce('a', {
      href: `#group-${info.key}`
    }, this.text(info.title));

    // Add a listener when it is clicked.
    this.addEventListener(groupAnchor, 'click', (event) => {
      event.preventDefault();
      let clickedGroupId = event.target.getAttribute('href').replace('#group-', '');
      if (this.groups[clickedGroupId]) {
        let clickedGroup = this.groups[clickedGroupId];
        let wasIn = this.hasClass(clickedGroup.panel, 'in');
        _.each(this.groups, (group, groupId) => {
          this.removeClass(group.panel, 'in');
          if ((groupId === clickedGroupId) && !wasIn) {
            this.addClass(group.panel, 'in');
            let parent = group.parent;
            while (parent) {
              this.addClass(parent.panel, 'in');
              parent = parent.parent;
            }
          }
        });

        // Match the form builder height to the sidebar.
        this.element.style.minHeight = this.builderSidebar.offsetHeight + 'px';
        this.scrollSidebar();
      }
    });

    info.element = this.ce('div', {
      class: 'panel panel-default form-builder-panel',
      id: `group-panel-${info.key}`
    }, [
      this.ce('div', {
        class: 'panel-heading'
      }, [
        this.ce('h4', {
          class: 'panel-title'
        }, groupAnchor)
      ])
    ]);
    info.body = this.ce('div', {
      class: 'panel-body no-drop'
    });

    // Add this group body to the drag containers.
    this.sidebarContainers.push(info.body);

    let groupBodyClass = 'panel-collapse collapse';
    if (info.default) {
      groupBodyClass += ' in';
    }

    info.panel = this.ce('div', {
      class: groupBodyClass,
      id: `group-${info.key}`
    }, info.body);

    info.element.appendChild(info.panel);
    this.groups[info.key] = info;
    this.insertInOrder(info, this.groups, info.element, container);

    // Now see if this group has subgroups.
    if (info.groups) {
      _.each(info.groups, (subInfo, subGroup) => {
        subInfo.key = subGroup;
        subInfo.parent = info;
        this.addBuilderGroup(subInfo, info.body);
      });
    }
  }

  addBuilderComponentInfo(component) {
    if (!component || !component.group || !this.groups[component.group]) {
      return;
    }

    component = _.clone(component);
    let groupInfo = this.groups[component.group];
    if (!groupInfo.components) {
      groupInfo.components = {};
    }
    if (!groupInfo.components.hasOwnProperty(component.key)) {
      groupInfo.components[component.key] = component;
    }
    return component;
  }

  addBuilderComponent(component, group) {
    if (!component) {
      return;
    }
    if (!group && component.group && this.groups[component.group]) {
      group = this.groups[component.group];
    }
    if (!group) {
      return;
    }
    component.element = this.ce('span', {
      id: `builder-${component.key}`,
      class: 'btn btn-primary btn-xs btn-block formcomponent drag-copy'
    });
    if (component.icon) {
      component.element.appendChild(this.ce('i', {
        class: component.icon,
        style: 'margin-right: 5px;'
      }));
    }
    component.element.builderInfo = component;
    component.element.appendChild(this.text(component.title));
    this.insertInOrder(component, group.components, component.element, group.body);
    return component;
  }

  buildSidebar() {
    this.groups = {};
    this.sidebarContainers = [];
    if (this.sideBarElement) {
      this.removeChildFrom(this.sideBarElement, this.builderSidebar);
    }
    this.sideBarElement = this.ce('div', {
      class: 'panel-group'
    });

    // Add the groups.
    _.each(this.options.builder, (info, group) => {
      if (info) {
        info.key = group;
        this.addBuilderGroup(info, this.sideBarElement);
      }
    });

    // Get all of the components builder info grouped and sorted.
    let components = {};
    let allComponents = _.filter(_.map(_.assign(Components, NestedComponent.customComponents), (component, type) => {
      if (!component.builderInfo) {
        return null;
      }
      component.type = type;
      return component;
    }));
    _.map(_.sortBy(allComponents, component => {
      return component.builderInfo.weight;
    }), (component) => {
      let builderInfo = component.builderInfo;
      builderInfo.key = component.type;
      components[builderInfo.key] = builderInfo;
      this.addBuilderComponentInfo(builderInfo);
    });

    // Add the components in each group.
    _.each(this.groups, (info) =>
      _.each(info.components, (comp, key) => {
        if (comp) {
          this.addBuilderComponent(comp === true ? components[key] : comp, info);
        }
      })
    );

    // Add the new sidebar element.
    this.builderSidebar.appendChild(this.sideBarElement);
    this.updateDraggable();
  }

  getParentElement(element) {
    let containerComponent = element;
    do {
      containerComponent = containerComponent.parentNode;
    } while (containerComponent && !containerComponent.component);
    return containerComponent;
  }

  addDragContainer(element, component, dragEvents) {
    _.remove(this.dragContainers, (container) => (element.id && (element.id === container.id)));
    element.component = component;
    if (dragEvents) {
      element.dragEvents = dragEvents;
    }
    this.addClass(element, 'drag-container');
    if (!element.id) {
      element.id = `builder-element-${component.id}`;
    }
    this.dragContainers.push(element);
    this.updateDraggable();
  }

  clear() {
    super.clear();
    this.dragContainers = [];
  }

  addComponentTo(parent, schema, element, sibling) {
    return parent.addComponent(
      schema,
      element,
      parent.data,
      sibling
    );
  }

  onDrop(element, target, source, sibling) {
    let builderElement = source.querySelector('#' + element.id);
    let newParent = this.getParentElement(element);
    if (!newParent || !newParent.component) {
      return console.warn('Could not find parent component.');
    }

    // Remove any instances of the placeholder.
    let placeholder = document.getElementById(newParent.component.id + '-placeholder');
    if (placeholder) {
      placeholder.parentNode.removeChild(placeholder);
    }

    // If the sibling is the placeholder, then set it to null.
    if (sibling === placeholder) {
      sibling = null;
    }

    // Make this element go before the submit button if it is still on the builder.
    if (!sibling && this.submitButton && newParent.contains(this.submitButton.element)) {
      sibling = this.submitButton.element;
    }

    // If this is a new component, it will come from the builderElement
    if (
      builderElement &&
      builderElement.builderInfo &&
      builderElement.builderInfo.schema
    ) {
      let componentSchema = _.clone(builderElement.builderInfo.schema);
      if (target.dragEvents && target.dragEvents.onDrop) {
        target.dragEvents.onDrop(element, target, source, sibling, componentSchema);
      }

      // Add the new component.
      let component = this.addComponentTo(newParent.component, componentSchema, newParent, sibling);

      // Set that this is a new component.
      component.isNew = true;

      // Pass along the save event.
      if (target.dragEvents) {
        component.dragEvents = target.dragEvents;
      }

      // Edit the component.
      this.editComponent(component);

      // Remove the element.
      target.removeChild(element);
    }
    // Check to see if this is a moved component.
    else if (element.component) {
      let componentSchema = element.component.schema;
      if (target.dragEvents && target.dragEvents.onDrop) {
        target.dragEvents.onDrop(element, target, source, sibling, componentSchema);
      }

      // Remove the component from its parent.
      if (element.component.parent) {
        element.component.parent.removeComponent(element.component);
      }

      // Add the component to its new parent.
      let component = newParent.component.addComponent(
        componentSchema,
        newParent,
        newParent.component.data,
        sibling
      );

      if (target.dragEvents && target.dragEvents.onSave) {
        target.dragEvents.onSave(component);
      }

      // Refresh the form.
      this.form = this.schema;
    }
  }

  /**
   * Adds a submit button if there are no components.
   */
  addSubmitButton() {
    if (!this.getComponents().length) {
      this.submitButton = this.addComponent({
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
  }

  refreshDraggable() {
    if (this.dragula) {
      this.dragula.destroy();
    }
    this.dragula = dragula(this.sidebarContainers.concat(this.dragContainers), {
      copy: function(el) {
        return el.classList.contains('drag-copy');
      },
      accepts: function(el, target) {
        return !target.classList.contains('no-drop');
      }
    }).on('drop', (element, target, source, sibling) => this.onDrop(element, target, source, sibling));

    // If there are no components, then we need to add a default submit button.
    this.addSubmitButton();
    this.builderReadyResolve();
  }

  build() {
    super.build();
    this.updateDraggable();
    this.formReadyResolve();
  }
}
