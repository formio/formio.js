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

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

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

      if (!container.noDrop && !container.dragContainer) {
        container.component = this;
        container.dragContainer = true;
        self.addClass(container, 'drag-container');
        self.dragContainers.push(container);
      }

      return container;
    };
    return _this;
  }

  _createClass(FormioFormBuilder, [{
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
      var _this2 = this;

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
        _utils2.default.uniquify(this._form, component.component, isNew);
      }

      // Set the full form on the component.
      component.component.__form = this.schema;

      // Modify the component information in the edit form.
      if (this.editForm) {
        this.editForm.formReady.then(function () {
          return _this2.editForm.setValue({ data: component.component }, {
            noUpdateEvent: true
          });
        });
      }

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
        console.log(componentCopy.component);
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
    key: 'clear',
    value: function clear() {
      _get(FormioFormBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioFormBuilder.prototype), 'clear', this).call(this);
      if (this.builderElement) {
        this.builderElement.innerHTML = '';
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(FormioFormBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioFormBuilder.prototype), 'destroy', this).call(this);
      if (this.dragula) {
        this.dragula.destroy();
      }
    }
  }, {
    key: 'buildSidebar',
    value: function buildSidebar() {
      var _this4 = this;

      // Get all of the components builder info grouped and sorted.
      var components = _lodash2.default.map(_lodash2.default.assign(_builder2.default, _Components.FormioComponents.customComponents), function (component, key) {
        var builderInfo = component.builderInfo;
        if (!builderInfo) {
          return null;
        }

        builderInfo.key = key;
        return builderInfo;
      });

      components = _lodash2.default.sortBy(components, 'weight');
      components = _lodash2.default.groupBy(components, 'group');
      var sideBarElement = this.ce('div', {
        class: 'panel-group'
      });

      this.groupPanels = {};

      // Iterate through each group of components.
      var firstGroup = true;
      _lodash2.default.each(components, function (groupComponents, group) {
        var groupInfo = _Components.FormioComponents.groupInfo[group];
        if (groupInfo) {
          var groupAnchor = _this4.ce('a', {
            href: '#group-' + group
          }, _this4.text(groupInfo.title));
          _this4.addEventListener(groupAnchor, 'click', function (event) {
            event.preventDefault();
            var clickedGroup = event.target.getAttribute('href').substr(1);
            var wasIn = _this4.hasClass(_this4.groupPanels[clickedGroup], 'in');
            _lodash2.default.each(_this4.groupPanels, function (groupPanel, groupId) {
              _this4.removeClass(groupPanel, 'in');
              if (groupId === clickedGroup && !wasIn) {
                _this4.addClass(groupPanel, 'in');
              }
            });

            // Match the form builder height to the sidebar.
            _this4.formBuilderElement.style.minHeight = _this4.builderSidebar.offsetHeight + 'px';
          });

          var groupPanel = _this4.ce('div', {
            class: 'panel panel-default form-builder-panel'
          }, [_this4.ce('div', {
            class: 'panel-heading'
          }, [_this4.ce('h4', {
            class: 'panel-title'
          }, groupAnchor)])]);
          var groupBody = _this4.ce('div', {
            class: 'panel-body no-drop'
          });

          // Add this group body to the drag containers.
          _this4.dragContainers.push(groupBody);

          var groupBodyClass = 'panel-collapse collapse';
          if (firstGroup) {
            groupBodyClass += ' in';
            firstGroup = false;
          }
          var groupId = 'group-' + group;
          var groupBodyWrapper = _this4.ce('div', {
            class: groupBodyClass,
            id: groupId
          }, groupBody);

          _this4.groupPanels[groupId] = groupBodyWrapper;

          _lodash2.default.each(groupComponents, function (builderInfo) {
            var compButton = _this4.ce('span', {
              id: 'builder-' + builderInfo.key,
              class: 'btn btn-primary btn-xs btn-block formcomponent drag-copy'
            });
            if (builderInfo.icon) {
              compButton.appendChild(_this4.ce('i', {
                class: builderInfo.icon,
                style: 'margin-right: 5px;'
              }));
            }
            compButton.builderInfo = builderInfo;
            compButton.appendChild(_this4.text(builderInfo.title));
            groupBody.appendChild(compButton);
          });

          groupPanel.appendChild(groupBodyWrapper);
          sideBarElement.appendChild(groupPanel);
        }
      });

      return sideBarElement;
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
    key: 'build',
    value: function build() {
      var _this5 = this;

      this.dragContainers = [];
      if (!this.builderElement) {
        this.builderElement = this.element;
        this.builderElement.setAttribute('class', 'row formbuilder');
      }

      this.builderSidebar = document.createElement('div');
      this.builderSidebar.setAttribute('class', 'col-xs-4 col-sm-3 col-md-2 formcomponents');
      this.builderElement.appendChild(this.builderSidebar);

      this.formBuilderElement = document.createElement('div');
      this.formBuilderElement.setAttribute('class', 'col-xs-8 col-sm-9 col-md-10 formarea');
      this.element = this.formBuilderElement;
      this.element.component = this;

      this.builderElement.appendChild(this.formBuilderElement);
      this.sideBarElement = this.buildSidebar();
      this.builderSidebar.appendChild(this.sideBarElement);

      _get(FormioFormBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioFormBuilder.prototype), 'build', this).call(this);
      this.dragula = (0, _dragula2.default)(this.dragContainers, {
        copy: function copy(el, source) {
          return el.classList.contains('drag-copy');
        },
        accepts: function accepts(el, target) {
          return !target.classList.contains('no-drop');
        }
      }).on('drop', function (element, target, source, sibling) {
        var builderElement = source.querySelector('#' + element.id);
        var newParent = _this5.getParentElement(element);
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
          _this5.editComponent(component, true);

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
            _this5.form = _this5.schema;
          }
      });
    }
  }]);

  return FormioFormBuilder;
}(_formio2.default);