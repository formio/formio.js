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

    // Setup default groups, but let them be overridden.
    _this.options.groups = _lodash2.default.defaultsDeep({}, _this.options.groups, {
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
      }
    });

    _this.groups = {};
    _this.options.builder = true;
    _this.options.hooks = _this.options.hooks || {};
    _this.options.hooks.addComponents = function (components) {
      if (!components || !components.length) {
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
    key: 'setBuilderElement',
    value: function setBuilderElement() {
      var _this2 = this;

      this.onElement.then(function () {
        _this2.addClass(_this2.wrapper, 'row formbuilder');
        _this2.builderSidebar = _this2.ce('div', {
          class: 'col-xs-4 col-sm-3 col-md-2 formcomponents'
        });
        _this2.prependTo(_this2.builderSidebar, _this2.wrapper);
        _this2.addClass(_this2.element, 'col-xs-8 col-sm-9 col-md-10 formarea');
        _this2.element.component = _this2;
        _this2.buildSidebar();
        _this2.builderSidebar.appendChild(_this2.sideBarElement);
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
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(component, isNew) {
      // Update the preview.
      if (this.componentPreview) {
        this.componentPreview.innerHTML = '';
        this.componentPreview.appendChild(_builder2.default.create(component.component, {
          preview: true
        }).getElement());
      }

      // Ensure this component has a key.
      if (isNew) {
        if (!component.keyModified) {
          component.component.key = _lodash2.default.camelCase(component.component.label || component.component.placeholder || component.component.type);
        }

        // Set a unique key for this component.
        _builder3.BuilderUtils.uniquify(this._form, component.component, isNew);
      }

      // Set the full form on the component.
      component.component.__form = this.schema;

      // Called when we update a component.
      component.isNew = isNew;
      this.emit('updateComponent', component);
    }
  }, {
    key: 'editComponent',
    value: function editComponent(component, isNew) {
      var _this3 = this;

      var componentCopy = _lodash2.default.cloneDeep(component);
      var componentClass = _builder2.default[componentCopy.component.type];
      var dialog = this.createModal(componentCopy.name);
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
      dialog.body.appendChild(componentEdit);
      this.editForm = new _formio2.default(formioForm);

      // Set the form to the edit form.
      this.editForm.form = _builder2.default[componentCopy.component.type].editForm();

      // Update the preview with this component.
      this.updateComponent(componentCopy, isNew);

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
          _this3.updateComponent(componentCopy, isNew);
        }
      });

      // Modify the component information in the edit form.
      this.editForm.formReady.then(function () {
        return _this3.editForm.setValue({ data: componentCopy.component }, {
          noUpdateEvent: true
        });
      });

      this.addEventListener(cancelButton, 'click', function (event) {
        event.preventDefault();
        dialog.close();
      });

      this.addEventListener(removeButton, 'click', function (event) {
        event.preventDefault();
        _this3.deleteComponent(component);
        dialog.close();
      });

      this.addEventListener(saveButton, 'click', function (event) {
        event.preventDefault();
        isNew = false;
        if (componentCopy.component && componentCopy.component.__form) {
          delete componentCopy.component.__form;
        }
        component.component = componentCopy.component;
        _this3.emit('saveComponent', component);
        _this3.form = _this3.schema;
        dialog.close();
      });

      this.addEventListener(dialog, 'close', function () {
        _this3.editForm.destroy();
        if (isNew) {
          _this3.deleteComponent(component);
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
        if (info.key !== itemInfo.key && info.weight < itemInfo.weight && (!beforeWeight || itemInfo.weight > beforeWeight)) {
          before = itemInfo.element;
          beforeWeight = itemInfo.weight;
        }
      });

      if (before) {
        container.insertBefore(element, before);
      } else {
        container.appendChild(element);
      }
    }
  }, {
    key: 'addBuilderGroup',
    value: function addBuilderGroup(info) {
      var _this4 = this;

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
        if (_this4.groups[clickedGroupId]) {
          var clickedGroup = _this4.groups[clickedGroupId];
          var wasIn = _this4.hasClass(clickedGroup.panel, 'in');
          _lodash2.default.each(_this4.groups, function (group, groupId) {
            _this4.removeClass(group.panel, 'in');
            if (groupId === clickedGroupId && !wasIn) {
              _this4.addClass(group.panel, 'in');
            }
          });

          // Match the form builder height to the sidebar.
          _this4.element.style.minHeight = _this4.builderSidebar.offsetHeight + 'px';
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
      this.insertInOrder(info, this.groups, info.element, this.sideBarElement);
    }
  }, {
    key: 'addBuilderComponent',
    value: function addBuilderComponent(component) {
      if (!component || !component.group || !this.groups[component.group]) {
        console.warn('Invalid group');
        return;
      }

      component = _lodash2.default.clone(component);
      var groupInfo = this.groups[component.group];
      if (!groupInfo.components) {
        groupInfo.components = {};
      }

      groupInfo.components[component.key] = component;

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
      this.insertInOrder(component, groupInfo.components, component.element, groupInfo.body);
    }
  }, {
    key: 'buildSidebar',
    value: function buildSidebar() {
      var _this5 = this;

      this.groups = {};
      this.sideBarElement = this.ce('div', {
        class: 'panel-group'
      });

      // Add the groups.
      _lodash2.default.each(this.options.groups, function (info, group) {
        info.key = group;
        _this5.addBuilderGroup(info);
      });

      // Get all of the components builder info grouped and sorted.
      var components = _lodash2.default.filter(_lodash2.default.map(_lodash2.default.assign(_builder2.default, _Components.FormioComponents.customComponents), function (component, type) {
        var builderInfo = component.builderInfo;
        if (!builderInfo) {
          return null;
        }

        builderInfo.key = type;
        return builderInfo;
      }));

      // Iterate through every component.
      _lodash2.default.each(components, function (component) {
        return _this5.addBuilderComponent(component);
      });
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
    value: function addDragContainer(element, component) {
      _lodash2.default.remove(this.dragContainers, function (container) {
        return container.component === component;
      });
      element.component = component;
      this.addClass(element, 'drag-container');
      this.dragContainers.push(element);
    }
  }, {
    key: 'clear',
    value: function clear() {
      _get(FormioFormBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioFormBuilder.prototype), 'clear', this).call(this);
      this.dragContainers = [];
    }
  }, {
    key: 'build',
    value: function build() {
      var _this6 = this;

      _get(FormioFormBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioFormBuilder.prototype), 'build', this).call(this);
      this.dragula = (0, _dragula2.default)(this.sidebarContainers.concat(this.dragContainers), {
        copy: function copy(el, source) {
          return el.classList.contains('drag-copy');
        },
        accepts: function accepts(el, target) {
          return !target.classList.contains('no-drop');
        }
      }).on('drop', function (element, target, source, sibling) {
        var builderElement = source.querySelector('#' + element.id);
        var newParent = _this6.getParentElement(element);
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

        // If this is a new component, it will come from the builderElement
        if (builderElement && builderElement.builderInfo && builderElement.builderInfo.schema) {
          // Add the new component.
          var component = newParent.component.addComponent(builderElement.builderInfo.schema, newParent, newParent.component.data, sibling);

          // Edit the component.
          _this6.editComponent(component, true);

          // Remove the element.
          target.removeChild(element);
        }
        // Check to see if this is a moved component.
        else if (element.component) {
            // Remove the component from its parent.
            if (element.component.parent) {
              element.component.parent.removeComponent(element.component);
            }

            // Add the component to its new parent.
            newParent.component.addComponent(element.component.schema, newParent, newParent.component.data, sibling);

            // Refresh the form.
            _this6.form = _this6.schema;
          }
      });

      this.formReadyResolve();
    }
  }, {
    key: 'ready',
    get: function get() {
      return this.formReady;
    }
  }]);

  return FormioFormBuilder;
}(_formio2.default);