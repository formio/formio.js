import Webform from './Webform';
import dragula from 'dragula';
import Tooltip from 'tooltip.js';
import Components from './components/Components';
import BuilderUtils from './utils/builder';
import { getComponent, bootstrapVersion, eachComponent } from './utils/utils';
import EventEmitter from './EventEmitter';
import Promise from 'native-promise-only';
import _ from 'lodash';
require('./components/builder');

export default class WebformBuilder extends Webform {
  constructor(element, options) {
    super(element, options);
    this.builderHeight = 0;
    this.dragContainers = [];
    this.sidebarContainers = [];
    this.updateDraggable = _.debounce(this.refreshDraggable.bind(this), 200);

    // Setup the builder options.
    this.options.builder = _.defaultsDeep({}, this.options.builder, this.defaultComponents);
    this.options.enableButtons = _.defaults({}, this.options.enableButtons, {
      remove: true,
      copy: true,
      paste: true,
      edit: true,
      editJson: false,
    });

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
    this.options.hooks.addComponents = (components, parent) => {
      if (!components || (!components.length && !components.nodrop)) {
        // Return a simple alert so they know they can add something here.
        return [
          {
            type: 'htmlelement',
            internal: true,
            tag: 'div',
            className: 'drag-and-drop-alert alert alert-info',
            attrs: [
              { attr: 'id', value: `${parent.id}-placeholder` },
              { attr: 'style', value: 'text-align:center;' },
              { attr: 'role', value: 'alert' }
            ],
            content: this.t('Drag and Drop a form component')
          }
        ];
      }
      return components;
    };
    this.options.hooks.addComponent = (container, comp, parent) => {
      if (!comp || !comp.component) {
        return container;
      }

      if (!comp.noEdit && !comp.component.internal) {
        // Make sure the component position is relative so the buttons align properly.
        comp.getElement().style.position = 'relative';

        const removeButton = this.ce('div', {
          class: 'btn btn-xxs btn-danger component-settings-button component-settings-button-remove'
        }, this.getIcon('remove'));
        this.addEventListener(removeButton, 'click', () => this.deleteComponent(comp));
        new Tooltip(removeButton, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Remove')
        });

        const editButton = this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-edit'
        }, this.getIcon('cog'));
        this.addEventListener(editButton, 'click', () => this.editComponent(comp));
        new Tooltip(editButton, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Edit')
        });

        const copyButton = this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-copy'
        }, this.getIcon('copy'));
        this.addEventListener(copyButton, 'click', () => this.copyComponent(comp));
        new Tooltip(copyButton, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Copy')
        });

        const pasteButton = this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-paste'
        }, this.getIcon('save'));
        const pasteTooltip = new Tooltip(pasteButton, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Paste below')
        });
        this.addEventListener(pasteButton, 'click', () => {
          pasteTooltip.hide();
          this.pasteComponent(comp);
        });

        const editJsonButton = this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-edit-json'
        }, this.getIcon('wrench'));
        this.addEventListener(editJsonButton, 'click', () => this.editComponent(comp, true));
        new Tooltip(editJsonButton, {
          trigger: 'hover',
          placement: 'top',
          title: this.t('Edit JSON')
        });

        // Set in paste mode if we have an item in our clipboard.
        if (window.sessionStorage) {
          const data = window.sessionStorage.getItem('formio.clipboard');
          if (data) {
            this.addClass(this.element, 'builder-paste-mode');
          }
        }

        // Add the edit buttons to the component.
        comp.prepend(this.ce('div', {
          class: 'component-btn-group'
        }, [
          this.options.enableButtons.remove ? removeButton : null,
          this.options.enableButtons.copy ? copyButton : null,
          this.options.enableButtons.paste ? pasteButton : null,
          this.options.enableButtons.editJson ? editJsonButton : null,
          this.options.enableButtons.edit ? editButton : null
        ]));
      }

      if (!container.noDrop) {
        this.addDragContainer(container, parent);
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
    if (shouldScroll && ((newTop + this.sideBarElement.offsetHeight) < this.builderHeight)) {
      this.sideBarElement.style.marginTop = `${newTop}px`;
    }
    else if (shouldScroll && (this.sideBarElement.offsetHeight < this.builderHeight)) {
      this.sideBarElement.style.marginTop = `${this.builderHeight - this.sideBarElement.offsetHeight}px`;
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
    });
  }

  get ready() {
    return this.builderReady;
  }

  setForm(form) {
    //populate isEnabled for recaptcha form settings
    var isRecaptchaEnabled = false;
    if (form.components) {
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
    this.emit('change', form);
    return super.setForm(form).then(retVal => {
      setTimeout(() => (this.builderHeight = this.element.offsetHeight), 200);
      return retVal;
    });
  }

  deleteComponent(component) {
    if (!component.parent) {
      return;
    }
    let remove = true;
    if ((typeof component.getComponents === 'function') && component.getComponents().length > 0) {
      const message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
      remove = window.confirm(this.t(message));
    }
    if (remove) {
      component.parent.removeComponentById(component.id);
      this.form = this.schema;
      this.emit('deleteComponent', component);
    }
    return remove;
  }

  updateComponent(component) {
    // Update the preview.
    if (this.componentPreview) {
      if (this.preview) {
        this.preview.destroy();
      }
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
        'validate',
        'disabled'
      ]));
    }

    // Called when we update a component.
    this.emit('updateComponent', component);
  }

  /* eslint-disable max-statements */
  editComponent(component, isJsonEdit) {
    const componentCopy = _.cloneDeep(component);
    let componentClass = Components.components[componentCopy.component.type];
    const isCustom = componentClass === undefined;
    //custom component should be edited as JSON
    isJsonEdit = isJsonEdit || isCustom;
    componentClass = isCustom ? Components.components.unknown : componentClass;
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
        }, `${this.t(componentInfo.title)} ${this.t('Component')}`)),
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
            }, this.ce('h4', {
              class: 'card-title panel-title mb-0'
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

    // Allow editForm overrides per component.
    const overrides = _.get(this.options, `editForm.${componentCopy.component.type}`, {});

    // Get the editform for this component.
    let editForm;
    //custom component has its own Edit Form defined
    if (isJsonEdit && !isCustom) {
      editForm = {
        'components': [
          {
            'type': 'textarea',
            'as': 'json',
            'editor': 'ace',
            'weight': 10,
            'input': true,
            'key': 'componentJson',
            'label': 'Component JSON',
            'tooltip': 'Edit the JSON for this component.'
          }
        ]
      };
    }
    else {
      editForm = componentClass.editForm(_.cloneDeep(overrides));
    }

    // Change the defaultValue component to be reflective.
    this.defaultValueComponent = getComponent(editForm.components, 'defaultValue');
    _.assign(this.defaultValueComponent, _.omit(componentCopy.component, [
      'key',
      'label',
      'placeholder',
      'tooltip',
      'validate',
      'disabled'
    ]));

    // Create the form instance.
    const editFormOptions = _.get(this, 'options.editForm', {});
    this.editForm = new Webform(formioForm, {
      language: this.options.language,
      ...editFormOptions
    });

    // Set the form to the edit form.
    this.editForm.form = editForm;

    // Pass along the form being edited.
    this.editForm.editForm = this._form;
    this.editForm.editComponent = component;

    // Update the preview with this component.
    this.updateComponent(componentCopy);

    // Register for when the edit form changes.
    this.editForm.on('change', (event) => {
      if (event.changed) {
        // See if this is a manually modified key. Treat JSON edited component keys as manually modified
        if ((event.changed.component && (event.changed.component.key === 'key')) || isJsonEdit) {
          componentCopy.keyModified = true;
        }

        // Set the component JSON to the new data.
        var editFormData = this.editForm.getValue().data;
        //for custom component use value in 'componentJson' field as JSON of component
        if ((editFormData.type === 'custom' || isJsonEdit) && editFormData.componentJson) {
          componentCopy.component = editFormData.componentJson;
        }
        else {
          componentCopy.component = editFormData;
        }

        // Update the component.
        this.updateComponent(componentCopy);
      }
    });

    // Modify the component information in the edit form.
    this.editForm.formReady.then(() => {
      //for custom component populate component setting with component JSON
      if (isJsonEdit) {
        this.editForm.setValue({
          data: {
            componentJson: _.cloneDeep(componentCopy.component)
          }
        });
      }
      else {
        this.editForm.setValue({ data: componentCopy.component });
      }
    });

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
      if (!this.editForm.checkValidity(this.editForm.data, true)) {
        return;
      }
      event.preventDefault();
      const originalComponent = component.schema;
      component.isNew = false;
      //for JSON Edit use value in 'componentJson' field as JSON of component
      if (isJsonEdit) {
        component.component = this.editForm.data.componentJson;
      }
      else {
        component.component = componentCopy.component;
      }
      if (component.dragEvents && component.dragEvents.onSave) {
        component.dragEvents.onSave(component);
      }
      this.form = this.schema;
      this.emit('saveComponent', component, originalComponent);
      this.dialog.close();
    });

    this.addEventListener(this.dialog, 'close', () => {
      this.editForm.destroy(true);
      this.preview.destroy(true);
      if (component.isNew) {
        this.deleteComponent(component);
      }
    });

    // Called when we edit a component.
    this.emit('editComponent', component);
  }
  /* eslint-enable max-statements */

  /**
   * Creates copy of component schema and stores it under sessionStorage.
   * @param {Component} component
   * @return {*}
   */
  copyComponent(component) {
    if (!window.sessionStorage) {
      return console.log('Session storage is not supported in this browser.');
    }
    this.addClass(this.element, 'builder-paste-mode');
    const copy = _.cloneDeep(component.schema);
    window.sessionStorage.setItem('formio.clipboard', JSON.stringify(copy));
  }

  /**
   * Paste copied component after the current component.
   * @param {Component} component
   * @return {*}
   */
  pasteComponent(component) {
    if (!window.sessionStorage) {
      return console.log('Session storage is not supported in this browser.');
    }
    this.removeClass(this.element, 'builder-paste-mode');
    const data = window.sessionStorage.getItem('formio.clipboard');
    if (data) {
      const schema = JSON.parse(data);
      window.sessionStorage.removeItem('formio.clipboard');
      BuilderUtils.uniquify(this._form, schema);
      // If this is an empty "nested" component, and it is empty, then paste the component inside this component.
      if ((typeof component.addComponent === 'function') && !component.components.length) {
        component.addComponent(schema);
      }
      else {
        component.parent.addComponent(schema, false, false, component.element.nextSibling);
      }
      this.form = this.schema;
    }
  }

  destroy() {
    const state = super.destroy();
    if (this.dragula) {
      this.dragula.destroy();
    }
    return state;
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
    const groupAnchor = this.ce('button', {
      class: 'btn btn-block builder-group-button',
      'type': 'button',
      'data-toggle': 'collapse',
      'data-parent': `#${container.id}`,
      'data-target': `#group-${info.key}`
    }, this.text(info.title));

    // Add a listener when it is clicked.
    if (!bootstrapVersion(this.options)) {
      this.addEventListener(groupAnchor, 'click', (event) => {
        event.preventDefault();
        const clickedGroupId = event.target.getAttribute('data-target').replace('#group-', '');
        if (this.groups[clickedGroupId]) {
          const clickedGroup = this.groups[clickedGroupId];
          const wasIn = this.hasClass(clickedGroup.panel, 'in');
          _.each(this.groups, (group, groupId) => {
            this.removeClass(group.panel, 'in');
            this.removeClass(group.panel, 'show');
            if ((groupId === clickedGroupId) && !wasIn) {
              this.addClass(group.panel, 'in');
              this.addClass(group.panel, 'show');
              let parent = group.parent;
              while (parent) {
                this.addClass(parent.panel, 'in');
                this.addClass(parent.panel, 'show');
                parent = parent.parent;
              }
            }
          });

          // Match the form builder height to the sidebar.
          this.element.style.minHeight = `${this.builderSidebar.offsetHeight}px`;
          this.scrollSidebar();
        }
      }, true);
    }

    info.element = this.ce('div', {
      class: 'card panel panel-default form-builder-panel',
      id: `group-panel-${info.key}`
    }, [
      this.ce('div', {
        class: 'card-header panel-heading form-builder-group-header'
      }, [
        this.ce('h5', {
          class: 'mb-0 panel-title'
        }, groupAnchor)
      ])
    ]);
    info.body = this.ce('div', {
      id: `group-container-${info.key}`,
      class: 'card-body panel-body no-drop'
    });

    // Add this group body to the drag containers.
    this.sidebarContainers.push(info.body);

    let groupBodyClass = 'panel-collapse collapse';
    if (info.default) {
      switch (bootstrapVersion(this.options)) {
        case 4:
          groupBodyClass += ' show';
          break;
        case 3:
          groupBodyClass += ' in';
          break;
        default:
          groupBodyClass += ' in show';
          break;
      }
    }

    info.panel = this.ce('div', {
      class: groupBodyClass,
      'data-parent': `#${container.id}`,
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
    const groupInfo = this.groups[component.group];
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

  addBuilderButton(info, container) {
    let button;
    info.element = this.ce('div', {
        style: 'margin: 5px 0;'
      },
      button = this.ce('span', {
        class: `btn btn-block ${info.style || 'btn-default'}`,
      }, info.title)
    );
    // Make sure it persists across refreshes.
    this.addEventListener(button, 'click', () => this.emit(info.event), true);
    this.groups[info.key] = info;
    this.insertInOrder(info, this.groups, info.element, container);
  }

  buildSidebar() {
    // Do not rebuild the sidebar.
    if (this.sideBarElement) {
      return;
    }
    this.groups = {};
    this.sidebarContainers = [];
    this.sideBarElement = this.ce('div', {
      id: `builder-sidebar-${this.id}`,
      class: 'accordion panel-group'
    });

    // Add the groups.
    _.each(this.options.builder, (info, group) => {
      if (info) {
        info.key = group;
        if (info.type === 'button') {
          this.addBuilderButton(info, this.sideBarElement);
        }
        else {
          this.addBuilderGroup(info, this.sideBarElement);
        }
      }
    });

    // Get all of the components builder info grouped and sorted.
    const components = {};
    const allComponents = _.filter(_.map(Components.components, (component, type) => {
      if (!component.builderInfo) {
        return null;
      }
      component.type = type;
      return component;
    }));
    _.map(_.sortBy(allComponents, component => {
      return component.builderInfo.weight;
    }), (component) => {
      const builderInfo = component.builderInfo;
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
    this.sideBarTop = this.sideBarElement.getBoundingClientRect().top + window.scrollY;
    if (this.options.sideBarScroll) {
      this.addEventListener(window, 'scroll', _.throttle(this.scrollSidebar.bind(this), 10), true);
    }
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
    this.dragContainers = [];
    return super.clear();
  }

  addComponentTo(schema, parent, element, sibling, after) {
    const component = parent.addComponent(
      schema,
      element,
      parent.data,
      sibling
    );

    if (after) {
      after(component);
    }

    // Get path to the component in the parent component.
    let path = 'components';
    switch (component.parent.type) {
      case 'table':
        path = `rows[${component.tableRow}][${component.tableColumn}].components`;
        break;
      case 'columns':
        path = `columns[${component.column}].components`;
        break;
      case 'tabs':
        path = `components[${component.tab}].components`;
        break;
    }
    // Index within container
    const index = _.findIndex(_.get(component.parent.schema, path), { key: component.component.key }) || 0;
    this.emit('addComponent', component, path, index);
    return component;
  }

  /* eslint-disable  max-statements */
  onDrop(element, target, source, sibling) {
    if (!element || !element.id) {
      console.warn('No element.id defined for dropping');
      return;
    }
    const builderElement = source.querySelector(`#${element.id}`);
    const newParent = this.getParentElement(element);
    if (!newParent || !newParent.component) {
      return console.warn('Could not find parent component.');
    }

    // Remove any instances of the placeholder.
    let placeholder = document.getElementById(`${newParent.component.id}-placeholder`);
    if (placeholder) {
      placeholder = placeholder.parentNode;
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
      const componentSchema = _.clone(builderElement.builderInfo.schema);
      if (target.dragEvents && target.dragEvents.onDrop) {
        target.dragEvents.onDrop(element, target, source, sibling, componentSchema);
      }

      // Add the new component.
      const component = this.addComponentTo(componentSchema, newParent.component, newParent, sibling, (comp) => {
        // Set that this is a new component.
        comp.isNew = true;

        // Pass along the save event.
        if (target.dragEvents) {
          comp.dragEvents = target.dragEvents;
        }
      });

      // Edit the component.
      this.editComponent(component);

      // Remove the element.
      target.removeChild(element);
    }
    // Check to see if this is a moved component.
    else if (element.component) {
      const componentSchema = element.component.schema;
      if (target.dragEvents && target.dragEvents.onDrop) {
        target.dragEvents.onDrop(element, target, source, sibling, componentSchema);
      }

      // Remove the component from its parent.
      if (element.component.parent) {
        this.emit('deleteComponent', element.component);
        element.component.parent.removeComponent(element.component);
      }

      // Add the new component.
      const component = this.addComponentTo(
        componentSchema,
        newParent.component,
        newParent,
        sibling
      );
      if (target.dragEvents && target.dragEvents.onSave) {
        target.dragEvents.onSave(component);
      }

      // Refresh the form.
      this.form = this.schema;
    }
  }
  /* eslint-enable  max-statements */

  /**
   * Adds a submit button if there are no components.
   */
  addSubmitButton() {
    if (!this.getComponents().length) {
      this.submitButton = this.addComponent({
        type: 'button',
        label: this.t('Submit'),
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
      moves(el) {
        return !el.classList.contains('no-drag');
      },
      copy(el) {
        return el.classList.contains('drag-copy');
      },
      accepts(el, target) {
        return !el.contains(target) && !target.classList.contains('no-drop');
      }
    }).on('drop', (element, target, source, sibling) => this.onDrop(element, target, source, sibling));

    // If there are no components, then we need to add a default submit button.
    this.addSubmitButton();
    this.builderReadyResolve();
  }

  build(state) {
    this.buildSidebar();
    super.build(state);
    this.updateDraggable();
    this.formReadyResolve();
  }
}
