'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormioFormBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _formio = require('./formio.form');

var _formio2 = _interopRequireDefault(_formio);

var _dragula = require('dragula');

var _dragula2 = _interopRequireDefault(_dragula);

var _builder = require('./components/builder');

var _builder2 = _interopRequireDefault(_builder);

var _Components = require('./components/Components');

var _builder3 = require('./utils/builder');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _eventemitter = require('eventemitter2');

var _eventemitter2 = _interopRequireDefault(_eventemitter);

var _nativePromiseOnly = require('native-promise-only');

var _nativePromiseOnly2 = _interopRequireDefault(_nativePromiseOnly);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormioFormBuilder = exports.FormioFormBuilder = function (_FormioForm) {
  _inherits(FormioFormBuilder, _FormioForm);

  function FormioFormBuilder(element, options) {
    _classCallCheck(this, FormioFormBuilder);

    var _this = _possibleConstructorReturn(this, (FormioFormBuilder.__proto__ || Object.getPrototypeOf(FormioFormBuilder)).call(this, element, options));

    var self = _this;
    _this.dragContainers = [];
    _this.sidebarContainers = [];
    _this.updateDraggable = _lodash2.default.debounce(_this.refreshDraggable.bind(_this), 200);

    // Setup the builder options.
    _this.options.builder = _lodash2.default.defaultsDeep({}, _this.options.builder, {
      basic: {
        title: 'Basic Components',
        weight: 0,
        default: true
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
    });

    _this.builderReady = new _nativePromiseOnly2.default(function (resolve) {
      _this.builderReadyResolve = resolve;
    });

    _this.groups = {};
    _this.options.sideBarScroll = _lodash2.default.get(_this.options, 'sideBarScroll', true);
    _this.options.sideBarScrollOffset = _lodash2.default.get(_this.options, 'sideBarScrollOffset', 0);
    _this.options.hooks = _this.options.hooks || {};
    _this.options.hooks.addComponents = function (components) {
      if (!components || !components.length && !components.nodrop) {
        // Return a simple alert so they know they can add something here.
        return [{
          type: 'htmlelement',
          internal: true,
          tag: 'div',
          className: 'alert alert-info',
          attrs: [{ attr: 'id', value: this.id + '-placeholder' }, { attr: 'style', value: 'text-align:center; margin-bottom: 0px;' }, { attr: 'role', value: 'alert' }],
          content: 'Drag and Drop a form component'
        }];
      }
      return components;
    };
    _this.options.hooks.addComponent = function (container, comp) {
      if (!comp || !comp.component) {
        return container;
      }

      if (!comp.noEdit && !comp.component.internal) {
        // Make sure the component position is relative so the buttons align properly.
        comp.getElement().style.position = 'relative';

        var removeButton = this.ce('div', {
          class: 'btn btn-xxs btn-danger component-settings-button component-settings-button-remove'
        }, this.ce('span', { class: 'glyphicon glyphicon-remove' }));
        this.addEventListener(removeButton, 'click', function () {
          return self.deleteComponent(comp);
        });

        var editButton = this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-edit'
        }, this.ce('span', { class: 'glyphicon glyphicon-cog' }));
        this.addEventListener(editButton, 'click', function () {
          return self.editComponent(comp);
        });

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
    _this.setBuilderElement();
    return _this;
  }

  _createClass(FormioFormBuilder, [{
    key: 'scrollSidebar',
    value: function scrollSidebar() {
      var newTop = window.scrollY - this.sideBarRect.top + this.options.sideBarScrollOffset;
      var shouldScroll = newTop > 0;
      if (shouldScroll && newTop + this.sideBarElement.offsetHeight < this.element.offsetHeight) {
        this.sideBarElement.style.marginTop = newTop + 'px';
      } else if (shouldScroll && this.sideBarElement.offsetHeight < this.element.offsetHeight) {
        this.sideBarElement.style.marginTop = this.element.offsetHeight - this.sideBarElement.offsetHeight + 'px';
      } else {
        this.sideBarElement.style.marginTop = '0px';
      }
    }
  }, {
    key: 'setBuilderElement',
    value: function setBuilderElement() {
      var _this2 = this;

      return this.onElement.then(function () {
        _this2.addClass(_this2.wrapper, 'row formbuilder');
        _this2.builderSidebar = _this2.ce('div', {
          class: 'col-xs-4 col-sm-3 col-md-2 formcomponents'
        });
        _this2.prependTo(_this2.builderSidebar, _this2.wrapper);
        _this2.addClass(_this2.element, 'col-xs-8 col-sm-9 col-md-10 formarea');
        _this2.element.component = _this2;
        _this2.buildSidebar();
        _this2.sideBarRect = _this2.sideBarElement.getBoundingClientRect();
        if (_this2.options.sideBarScroll) {
          _this2.addEventListener(window, 'scroll', _lodash2.default.debounce(_this2.scrollSidebar.bind(_this2), 10));
        }
      });
    }
  }, {
    key: 'deleteComponent',
    value: function deleteComponent(component) {
      if (!component.parent) {
        return;
      }
      var remove = true;
      if (component.type === 'components' && component.getComponents().length > 0) {
        remove = window.confirm(this.t('Removing this component will also remove all of its children. Are you sure you want to do this?'));
      }
      if (remove) {
        this.emit('deleteComponent', component);
        component.parent.removeComponentById(component.id);
        this.form = this.schema;
      }
      return remove;
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(component) {
      var _this3 = this;

      // Update the preview.
      if (this.componentPreview) {
        this.preview = _builder2.default.create(component.component, {
          preview: true,
          events: new _eventemitter2.default({
            wildcard: false,
            maxListeners: 0
          })
        }, {}, true);
        this.preview.on('componentEdit', function (comp) {
          _lodash2.default.merge(component.component, comp.component);
          _this3.editForm.redraw();
        });
        this.preview.build();
        this.preview.isBuilt = true;
        this.componentPreview.innerHTML = '';
        this.componentPreview.appendChild(this.preview.getElement());
      }

      // Ensure this component has a key.
      if (component.isNew) {
        if (!component.keyModified) {
          component.component.key = _lodash2.default.camelCase(component.component.label || component.component.placeholder || component.component.type);
        }

        // Set a unique key for this component.
        _builder3.BuilderUtils.uniquify(this._form, component.component);
      }

      // Change the "default value" field to be reflective of this component.
      if (this.defaultValueComponent) {
        _lodash2.default.assign(this.defaultValueComponent, _lodash2.default.omit(component.component, ['key', 'label', 'placeholder', 'tooltip', 'validate']));
      }

      // Called when we update a component.
      this.emit('updateComponent', component);
    }
  }, {
    key: 'editComponent',
    value: function editComponent(component) {
      var _this4 = this;

      var componentCopy = _lodash2.default.cloneDeep(component);
      var componentClass = _builder2.default[componentCopy.component.type];
      // Make sure we only have one dialog open at a time.
      if (this.dialog) {
        this.dialog.close();
      }
      this.dialog = this.createModal(componentCopy.name);
      var formioForm = this.ce('div');
      this.componentPreview = this.ce('div', {
        class: 'component-preview'
      });
      var componentInfo = componentClass ? componentClass.builderInfo : {};

      var saveButton = this.ce('button', {
        class: 'btn btn-success',
        style: 'margin-right: 10px;'
      }, this.t('Save'));

      var cancelButton = this.ce('button', {
        class: 'btn btn-default',
        style: 'margin-right: 10px;'
      }, this.t('Cancel'));

      var removeButton = this.ce('button', {
        class: 'btn btn-danger'
      }, this.t('Remove'));

      var componentEdit = this.ce('div', {}, [this.ce('div', {
        class: 'row'
      }, [this.ce('div', {
        class: 'col col-sm-6'
      }, this.ce('p', {
        class: 'lead'
      }, componentInfo.title + ' Component')), this.ce('div', {
        class: 'col col-sm-6'
      }, [this.ce('div', {
        class: 'pull-right',
        style: 'margin-right: 20px; margin-top: 10px'
      }, this.ce('a', {
        href: componentInfo.documentation || '#',
        target: '_blank'
      }, this.ce('i', {
        class: 'glyphicon glyphicon-new-window'
      }, ' ' + this.t('Help'))))])]), this.ce('div', {
        class: 'row'
      }, [this.ce('div', {
        class: 'col col-sm-6'
      }, formioForm), this.ce('div', {
        class: 'col col-sm-6'
      }, [this.ce('div', {
        class: 'panel panel-default preview-panel'
      }, [this.ce('div', {
        class: 'panel-heading'
      }, this.ce('h3', {
        class: 'panel-title'
      }, this.t('Preview'))), this.ce('div', {
        class: 'panel-body'
      }, this.componentPreview)]), this.ce('div', {
        style: 'margin-top: 10px;'
      }, [saveButton, cancelButton, removeButton])])])]);

      // Append the settings page to the dialog body.
      this.dialog.body.appendChild(componentEdit);

      var editForm = _builder2.default[componentCopy.component.type].editForm();

      // Change the defaultValue component to be reflective.
      this.defaultValueComponent = _utils2.default.getComponent(editForm.components, 'defaultValue');
      _lodash2.default.assign(this.defaultValueComponent, _lodash2.default.omit(componentCopy.component, ['key', 'label', 'placeholder', 'tooltip', 'validate']));

      // Create the form instance.
      this.editForm = new _formio2.default(formioForm);

      // Set the form to the edit form.
      this.editForm.form = editForm;

      // Pass along the form being edited.
      this.editForm.editForm = this._form;

      // Update the preview with this component.
      this.updateComponent(componentCopy);

      // Register for when the edit form changes.
      this.editForm.on('change', function (event) {
        if (event.changed) {
          // See if this is a manually modified key.
          if (event.changed.component && event.changed.component.key === 'key') {
            componentCopy.keyModified = true;
          }

          // Set the component JSON to the new data.
          componentCopy.component = event.data;

          // Update the component.
          _this4.updateComponent(componentCopy);
        }
      });

      // Modify the component information in the edit form.
      this.editForm.formReady.then(function () {
        return _this4.editForm.setValue({ data: componentCopy.component }, {
          noUpdateEvent: true
        });
      });

      this.addEventListener(cancelButton, 'click', function (event) {
        event.preventDefault();
        _this4.emit('cancelComponent', component);
        _this4.dialog.close();
      });

      this.addEventListener(removeButton, 'click', function (event) {
        event.preventDefault();
        _this4.deleteComponent(component);
        _this4.dialog.close();
      });

      this.addEventListener(saveButton, 'click', function (event) {
        event.preventDefault();
        component.isNew = false;
        component.component = componentCopy.component;
        if (component.dragEvents && component.dragEvents.onSave) {
          component.dragEvents.onSave(component);
        }
        _this4.emit('saveComponent', component);
        _this4.form = _this4.schema;
        _this4.dialog.close();
      });

      this.addEventListener(this.dialog, 'close', function () {
        _this4.editForm.destroy();
        if (component.isNew) {
          _this4.deleteComponent(component);
        }
      });

      // Called when we edit a component.
      this.emit('editComponent', component);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(FormioFormBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioFormBuilder.prototype), 'destroy', this).call(this);
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

  }, {
    key: 'insertInOrder',
    value: function insertInOrder(info, items, element, container) {
      // Determine where this item should be added.
      var beforeWeight = 0;
      var before = null;
      _lodash2.default.each(items, function (itemInfo) {
        if (info.key !== itemInfo.key && info.weight < itemInfo.weight && (!beforeWeight || itemInfo.weight < beforeWeight)) {
          before = itemInfo.element;
          beforeWeight = itemInfo.weight;
        }
      });

      if (before) {
        try {
          container.insertBefore(element, before);
        } catch (err) {
          container.appendChild(element);
        }
      } else {
        container.appendChild(element);
      }
    }
  }, {
    key: 'addBuilderGroup',
    value: function addBuilderGroup(info, container) {
      var _this5 = this;

      if (!info || !info.key) {
        console.warn('Invalid Group Provided.');
        return;
      }

      info = _lodash2.default.clone(info);
      var groupAnchor = this.ce('a', {
        href: '#group-' + info.key
      }, this.text(info.title));

      // Add a listener when it is clicked.
      this.addEventListener(groupAnchor, 'click', function (event) {
        event.preventDefault();
        var clickedGroupId = event.target.getAttribute('href').replace('#group-', '');
        if (_this5.groups[clickedGroupId]) {
          var clickedGroup = _this5.groups[clickedGroupId];
          var wasIn = _this5.hasClass(clickedGroup.panel, 'in');
          _lodash2.default.each(_this5.groups, function (group, groupId) {
            _this5.removeClass(group.panel, 'in');
            if (groupId === clickedGroupId && !wasIn) {
              _this5.addClass(group.panel, 'in');
              var parent = group.parent;
              while (parent) {
                _this5.addClass(parent.panel, 'in');
                parent = parent.parent;
              }
            }
          });

          // Match the form builder height to the sidebar.
          _this5.element.style.minHeight = _this5.builderSidebar.offsetHeight + 'px';
          _this5.scrollSidebar();
        }
      });

      info.element = this.ce('div', {
        class: 'panel panel-default form-builder-panel',
        id: 'group-panel-' + info.key
      }, [this.ce('div', {
        class: 'panel-heading'
      }, [this.ce('h4', {
        class: 'panel-title'
      }, groupAnchor)])]);
      info.body = this.ce('div', {
        class: 'panel-body no-drop'
      });

      // Add this group body to the drag containers.
      this.sidebarContainers.push(info.body);

      var groupBodyClass = 'panel-collapse collapse';
      if (info.default) {
        groupBodyClass += ' in';
      }

      info.panel = this.ce('div', {
        class: groupBodyClass,
        id: 'group-' + info.key
      }, info.body);

      info.element.appendChild(info.panel);
      this.groups[info.key] = info;
      this.insertInOrder(info, this.groups, info.element, container);

      // Now see if this group has subgroups.
      if (info.groups) {
        _lodash2.default.each(info.groups, function (subInfo, subGroup) {
          subInfo.key = subGroup;
          subInfo.parent = info;
          _this5.addBuilderGroup(subInfo, info.body);
        });
      }
    }
  }, {
    key: 'addBuilderComponentInfo',
    value: function addBuilderComponentInfo(component) {
      if (!component || !component.group || !this.groups[component.group]) {
        console.warn('Invalid group');
        return;
      }

      component = _lodash2.default.clone(component);
      var groupInfo = this.groups[component.group];
      if (!groupInfo.components) {
        groupInfo.components = {};
      }
      if (!groupInfo.components.hasOwnProperty(component.key)) {
        groupInfo.components[component.key] = component;
      }
      return component;
    }
  }, {
    key: 'addBuilderComponent',
    value: function addBuilderComponent(component, group) {
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
        id: 'builder-' + component.key,
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
  }, {
    key: 'buildSidebar',
    value: function buildSidebar() {
      var _this6 = this;

      this.groups = {};
      this.sidebarContainers = [];
      if (this.sideBarElement) {
        this.removeChildFrom(this.sideBarElement, this.builderSidebar);
      }
      this.sideBarElement = this.ce('div', {
        class: 'panel-group'
      });

      // Add the groups.
      _lodash2.default.each(this.options.builder, function (info, group) {
        if (info) {
          info.key = group;
          _this6.addBuilderGroup(info, _this6.sideBarElement);
        }
      });

      // Get all of the components builder info grouped and sorted.
      var components = {};
      var allComponents = _lodash2.default.filter(_lodash2.default.map(_lodash2.default.assign(_builder2.default, _Components.FormioComponents.customComponents), function (component, type) {
        if (!component.builderInfo) {
          return null;
        }
        component.type = type;
        return component;
      }));
      _lodash2.default.map(_lodash2.default.sortBy(allComponents, function (component) {
        return component.builderInfo.weight;
      }), function (component) {
        var builderInfo = component.builderInfo;
        builderInfo.key = component.type;
        components[builderInfo.key] = builderInfo;
        _this6.addBuilderComponentInfo(builderInfo);
      });

      // Add the components in each group.
      _lodash2.default.each(this.groups, function (info) {
        return _lodash2.default.each(info.components, function (comp, key) {
          if (comp) {
            _this6.addBuilderComponent(comp === true ? components[key] : comp, info);
          }
        });
      });

      // Add the new sidebar element.
      this.builderSidebar.appendChild(this.sideBarElement);
      this.updateDraggable();
    }
  }, {
    key: 'getParentElement',
    value: function getParentElement(element) {
      var containerComponent = element;
      do {
        containerComponent = containerComponent.parentNode;
      } while (containerComponent && !containerComponent.component);
      return containerComponent;
    }
  }, {
    key: 'addDragContainer',
    value: function addDragContainer(element, component, dragEvents) {
      _lodash2.default.remove(this.dragContainers, function (container) {
        return element.id && element.id === container.id;
      });
      element.component = component;
      if (dragEvents) {
        element.dragEvents = dragEvents;
      }
      this.addClass(element, 'drag-container');
      if (!element.id) {
        element.id = 'builder-element-' + component.id;
      }
      this.dragContainers.push(element);
      this.updateDraggable();
    }
  }, {
    key: 'clear',
    value: function clear() {
      _get(FormioFormBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioFormBuilder.prototype), 'clear', this).call(this);
      this.dragContainers = [];
    }
  }, {
    key: 'addComponentTo',
    value: function addComponentTo(parent, schema, element, sibling) {
      return parent.addComponent(schema, element, parent.data, sibling);
    }
  }, {
    key: 'onDrop',
    value: function onDrop(element, target, source, sibling) {
      var builderElement = source.querySelector('#' + element.id);
      var newParent = this.getParentElement(element);
      if (!newParent || !newParent.component) {
        return console.warn('Could not find parent component.');
      }

      // Remove any instances of the placeholder.
      var placeholder = document.getElementById(newParent.component.id + '-placeholder');
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
      if (builderElement && builderElement.builderInfo && builderElement.builderInfo.schema) {
        var componentSchema = _lodash2.default.clone(builderElement.builderInfo.schema);
        if (target.dragEvents && target.dragEvents.onDrop) {
          target.dragEvents.onDrop(element, target, source, sibling, componentSchema);
        }

        // Add the new component.
        var component = this.addComponentTo(newParent.component, componentSchema, newParent, sibling);

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
          var _componentSchema = element.component.schema;
          if (target.dragEvents && target.dragEvents.onDrop) {
            target.dragEvents.onDrop(element, target, source, sibling, _componentSchema);
          }

          // Remove the component from its parent.
          if (element.component.parent) {
            element.component.parent.removeComponent(element.component);
          }

          // Add the component to its new parent.
          var _component = newParent.component.addComponent(_componentSchema, newParent, newParent.component.data, sibling);

          if (target.dragEvents && target.dragEvents.onSave) {
            target.dragEvents.onSave(_component);
          }

          // Refresh the form.
          this.form = this.schema;
        }
    }

    /**
     * Adds a submit button if there are no components.
     */

  }, {
    key: 'addSubmitButton',
    value: function addSubmitButton() {
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
  }, {
    key: 'refreshDraggable',
    value: function refreshDraggable() {
      var _this7 = this;

      if (this.dragula) {
        this.dragula.destroy();
      }
      this.dragula = (0, _dragula2.default)(this.sidebarContainers.concat(this.dragContainers), {
        copy: function copy(el, source) {
          return el.classList.contains('drag-copy');
        },
        accepts: function accepts(el, target) {
          return !target.classList.contains('no-drop');
        }
      }).on('drop', function (element, target, source, sibling) {
        return _this7.onDrop(element, target, source, sibling);
      });

      // If there are no components, then we need to add a default submit button.
      this.addSubmitButton();
      this.builderReadyResolve();
    }
  }, {
    key: 'build',
    value: function build() {
      _get(FormioFormBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioFormBuilder.prototype), 'build', this).call(this);
      this.updateDraggable();
      this.formReadyResolve();
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.builderReady;
    }
  }]);

  return FormioFormBuilder;
}(_formio2.default);