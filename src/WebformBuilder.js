"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Webform2 = _interopRequireDefault(require("./Webform"));

var _dragula = _interopRequireDefault(require("dragula"));

var _tooltip = _interopRequireDefault(require("tooltip.js"));

var _Components = _interopRequireDefault(require("./components/Components"));

var _builder = _interopRequireDefault(require("./utils/builder"));

var _utils = require("./utils/utils");

var _EventEmitter = _interopRequireDefault(require("./EventEmitter"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

require('./components/builder');

var WebformBuilder =
/*#__PURE__*/
function (_Webform) {
  _inherits(WebformBuilder, _Webform);

  function WebformBuilder(element, options) {
    var _this;

    _classCallCheck(this, WebformBuilder);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebformBuilder).call(this, element, options));
    _this.builderHeight = 0;
    _this.dragContainers = [];
    _this.sidebarContainers = [];
    _this.updateDraggable = _lodash.default.debounce(_this.refreshDraggable.bind(_assertThisInitialized(_this)), 200); // Setup the builder options.

    _this.options.builder = _lodash.default.defaultsDeep({}, _this.options.builder, _this.defaultComponents);
    _this.options.enableButtons = _lodash.default.defaults({}, _this.options.enableButtons, {
      remove: true,
      copy: true,
      paste: true,
      edit: true,
      editJson: false
    }); // Turn off if explicitely said to do so...

    _lodash.default.each(_this.defaultComponents, function (config, key) {
      if (config === false) {
        _this.options.builder[key] = false;
      }
    });

    _this.builderReady = new _nativePromiseOnly.default(function (resolve) {
      _this.builderReadyResolve = resolve;
    });
    _this.groups = {};
    _this.options.sideBarScroll = _lodash.default.get(_this.options, 'sideBarScroll', true);
    _this.options.sideBarScrollOffset = _lodash.default.get(_this.options, 'sideBarScrollOffset', 0);
    _this.options.hooks = _this.options.hooks || {};

    _this.options.hooks.addComponents = function (components, parent) {
      if (!components || !components.length && !components.nodrop) {
        // Return a simple alert so they know they can add something here.
        return [{
          type: 'htmlelement',
          internal: true,
          tag: 'div',
          className: 'drag-and-drop-alert alert alert-info',
          attrs: [{
            attr: 'id',
            value: "".concat(parent.id, "-placeholder")
          }, {
            attr: 'style',
            value: 'text-align:center;'
          }, {
            attr: 'role',
            value: 'alert'
          }],
          content: _this.t('Drag and Drop a form component')
        }];
      }

      return components;
    };

    _this.options.hooks.addComponent = function (container, comp, parent) {
      if (!comp || !comp.component) {
        return container;
      }

      if (!comp.noEdit && !comp.component.internal) {
        // Make sure the component position is relative so the buttons align properly.
        comp.getElement().style.position = 'relative';

        var removeButton = _this.ce('div', {
          class: 'btn btn-xxs btn-danger component-settings-button component-settings-button-remove'
        }, _this.getIcon('remove'));

        _this.addEventListener(removeButton, 'click', function () {
          return _this.deleteComponent(comp);
        });

        new _tooltip.default(removeButton, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Remove')
        });

        var editButton = _this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-edit'
        }, _this.getIcon('cog'));

        _this.addEventListener(editButton, 'click', function () {
          return _this.editComponent(comp);
        });

        new _tooltip.default(editButton, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Edit')
        });

        var copyButton = _this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-copy'
        }, _this.getIcon('copy'));

        _this.addEventListener(copyButton, 'click', function () {
          return _this.copyComponent(comp);
        });

        new _tooltip.default(copyButton, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Copy')
        });

        var pasteButton = _this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-paste'
        }, _this.getIcon('save'));

        var pasteTooltip = new _tooltip.default(pasteButton, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Paste below')
        });

        _this.addEventListener(pasteButton, 'click', function () {
          pasteTooltip.hide();

          _this.pasteComponent(comp);
        });

        var editJsonButton = _this.ce('div', {
          class: 'btn btn-xxs btn-default component-settings-button component-settings-button-edit-json'
        }, _this.getIcon('wrench'));

        _this.addEventListener(editJsonButton, 'click', function () {
          return _this.editComponent(comp, true);
        });

        new _tooltip.default(editJsonButton, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Edit JSON')
        }); // Set in paste mode if we have an item in our clipboard.

        if (window.sessionStorage) {
          var data = window.sessionStorage.getItem('formio.clipboard');

          if (data) {
            _this.addClass(_this.element, 'builder-paste-mode');
          }
        } // Add the edit buttons to the component.


        comp.prepend(_this.ce('div', {
          class: 'component-btn-group'
        }, [_this.options.enableButtons.remove ? removeButton : null, _this.options.enableButtons.copy ? copyButton : null, _this.options.enableButtons.paste ? pasteButton : null, _this.options.enableButtons.editJson ? editJsonButton : null, _this.options.enableButtons.edit ? editButton : null]));
      }

      if (!container.noDrop) {
        _this.addDragContainer(container, parent);
      }

      return container;
    };

    _this.setBuilderElement();

    return _this;
  }

  _createClass(WebformBuilder, [{
    key: "scrollSidebar",
    value: function scrollSidebar() {
      var newTop = window.scrollY - this.sideBarTop + this.options.sideBarScrollOffset;
      var shouldScroll = newTop > 0;

      if (shouldScroll && newTop + this.sideBarElement.offsetHeight < this.builderHeight) {
        this.sideBarElement.style.marginTop = "".concat(newTop, "px");
      } else if (shouldScroll && this.sideBarElement.offsetHeight < this.builderHeight) {
        this.sideBarElement.style.marginTop = "".concat(this.builderHeight - this.sideBarElement.offsetHeight, "px");
      } else {
        this.sideBarElement.style.marginTop = '0px';
      }
    }
  }, {
    key: "setBuilderElement",
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
      });
    }
  }, {
    key: "setForm",
    value: function setForm(form) {
      var _this3 = this;

      //populate isEnabled for recaptcha form settings
      var isRecaptchaEnabled = false;

      if (form.components) {
        (0, _utils.eachComponent)(form.components, function (component) {
          if (isRecaptchaEnabled) {
            return;
          }

          if (component.type === 'recaptcha') {
            isRecaptchaEnabled = true;
            return false;
          }
        });

        if (isRecaptchaEnabled) {
          _lodash.default.set(form, 'settings.recaptcha.isEnabled', true);
        } else if (_lodash.default.get(form, 'settings.recaptcha.isEnabled')) {
          _lodash.default.set(form, 'settings.recaptcha.isEnabled', false);
        }
      }

      this.emit('change', form);
      return _get(_getPrototypeOf(WebformBuilder.prototype), "setForm", this).call(this, form).then(function (retVal) {
        setTimeout(function () {
          return _this3.builderHeight = _this3.element.offsetHeight;
        }, 200);
        return retVal;
      });
    }
  }, {
    key: "deleteComponent",
    value: function deleteComponent(component) {
      if (!component.parent) {
        return;
      }

      var remove = true;

      if (typeof component.getComponents === 'function' && component.getComponents().length > 0) {
        var message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
        remove = window.confirm(this.t(message));
      }

      if (remove) {
        component.parent.removeComponentById(component.id);
        this.form = this.schema;
        this.emit('deleteComponent', component);
      }

      return remove;
    }
  }, {
    key: "updateComponent",
    value: function updateComponent(component) {
      var _this4 = this;

      // Update the preview.
      if (this.componentPreview) {
        if (this.preview) {
          this.preview.destroy();
        }

        this.preview = _Components.default.create(component.component, {
          preview: true,
          events: new _EventEmitter.default({
            wildcard: false,
            maxListeners: 0
          })
        }, {}, true);
        this.preview.on('componentEdit', function (comp) {
          _lodash.default.merge(component.component, comp.component);

          _this4.editForm.redraw();
        });
        this.preview.build();
        this.preview.isBuilt = true;
        this.componentPreview.innerHTML = '';
        this.componentPreview.appendChild(this.preview.getElement());
      } // Ensure this component has a key.


      if (component.isNew) {
        if (!component.keyModified) {
          component.component.key = _lodash.default.camelCase(component.component.label || component.component.placeholder || component.component.type);
        } // Set a unique key for this component.


        _builder.default.uniquify(this._form, component.component);
      } // Change the "default value" field to be reflective of this component.


      if (this.defaultValueComponent) {
        _lodash.default.assign(this.defaultValueComponent, _lodash.default.omit(component.component, ['key', 'label', 'placeholder', 'tooltip', 'validate', 'disabled']));
      } // Called when we update a component.


      this.emit('updateComponent', component);
    }
    /* eslint-disable max-statements */

  }, {
    key: "editComponent",
    value: function editComponent(component, isJsonEdit) {
      var _this5 = this;

      var componentCopy = _lodash.default.cloneDeep(component);

      var componentClass = _Components.default.components[componentCopy.component.type];
      var isCustom = componentClass === undefined; //custom component should be edited as JSON

      isJsonEdit = isJsonEdit || isCustom;
      componentClass = isCustom ? _Components.default.components.unknown : componentClass; // Make sure we only have one dialog open at a time.

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
      }, "".concat(this.t(componentInfo.title), " ").concat(this.t('Component')))), this.ce('div', {
        class: 'col col-sm-6'
      }, [this.ce('div', {
        class: 'pull-right',
        style: 'margin-right: 20px; margin-top: 10px'
      }, this.ce('a', {
        href: componentInfo.documentation || '#',
        target: '_blank'
      }, this.ce('i', {
        class: this.iconClass('new-window')
      }, " ".concat(this.t('Help')))))])]), this.ce('div', {
        class: 'row'
      }, [this.ce('div', {
        class: 'col col-sm-6'
      }, formioForm), this.ce('div', {
        class: 'col col-sm-6'
      }, [this.ce('div', {
        class: 'card panel panel-default preview-panel'
      }, [this.ce('div', {
        class: 'card-header panel-heading'
      }, this.ce('h4', {
        class: 'card-title panel-title mb-0'
      }, this.t('Preview'))), this.ce('div', {
        class: 'card-body panel-body'
      }, this.componentPreview)]), this.ce('div', {
        style: 'margin-top: 10px;'
      }, [saveButton, cancelButton, removeButton])])])]); // Append the settings page to the dialog body.

      this.dialog.body.appendChild(componentEdit); // Allow editForm overrides per component.

      var overrides = _lodash.default.get(this.options, "editForm.".concat(componentCopy.component.type), {}); // Get the editform for this component.


      var editForm; //custom component has its own Edit Form defined

      if (isJsonEdit && !isCustom) {
        editForm = {
          'components': [{
            'type': 'textarea',
            'as': 'json',
            'editor': 'ace',
            'weight': 10,
            'input': true,
            'key': 'componentJson',
            'label': 'Component JSON',
            'tooltip': 'Edit the JSON for this component.'
          }]
        };
      } else {
        editForm = componentClass.editForm(_lodash.default.cloneDeep(overrides));
      } // Change the defaultValue component to be reflective.


      this.defaultValueComponent = (0, _utils.getComponent)(editForm.components, 'defaultValue');

      _lodash.default.assign(this.defaultValueComponent, _lodash.default.omit(componentCopy.component, ['key', 'label', 'placeholder', 'tooltip', 'validate', 'disabled'])); // Create the form instance.


      var editFormOptions = _lodash.default.get(this, 'options.editForm', {});

      this.editForm = new _Webform2.default(formioForm, _objectSpread({
        language: this.options.language
      }, editFormOptions)); // Set the form to the edit form.

      this.editForm.form = editForm; // Pass along the form being edited.

      this.editForm.editForm = this._form;
      this.editForm.editComponent = component; // Update the preview with this component.

      this.updateComponent(componentCopy); // Register for when the edit form changes.

      this.editForm.on('change', function (event) {
        if (event.changed) {
          // See if this is a manually modified key. Treat JSON edited component keys as manually modified
          if (event.changed.component && event.changed.component.key === 'key' || isJsonEdit) {
            componentCopy.keyModified = true;
          } // Set the component JSON to the new data.


          var editFormData = _this5.editForm.getValue().data; //for custom component use value in 'componentJson' field as JSON of component


          if ((editFormData.type === 'custom' || isJsonEdit) && editFormData.componentJson) {
            componentCopy.component = editFormData.componentJson;
          } else {
            componentCopy.component = editFormData;
          } // Update the component.


          _this5.updateComponent(componentCopy);
        }
      }); // Modify the component information in the edit form.

      this.editForm.formReady.then(function () {
        //for custom component populate component setting with component JSON
        if (isJsonEdit) {
          _this5.editForm.setValue({
            data: {
              componentJson: _lodash.default.cloneDeep(componentCopy.component)
            }
          });
        } else {
          _this5.editForm.setValue({
            data: componentCopy.component
          });
        }
      });
      this.addEventListener(cancelButton, 'click', function (event) {
        event.preventDefault();

        _this5.emit('cancelComponent', component);

        _this5.dialog.close();
      });
      this.addEventListener(removeButton, 'click', function (event) {
        event.preventDefault();

        _this5.deleteComponent(component);

        _this5.dialog.close();
      });
      this.addEventListener(saveButton, 'click', function (event) {
        if (!_this5.editForm.checkValidity(_this5.editForm.data, true)) {
          return;
        }

        event.preventDefault();
        var originalComponent = component.schema;
        component.isNew = false; //for JSON Edit use value in 'componentJson' field as JSON of component

        if (isJsonEdit) {
          component.component = _this5.editForm.data.componentJson;
        } else {
          component.component = componentCopy.component;
        }

        if (component.dragEvents && component.dragEvents.onSave) {
          component.dragEvents.onSave(component);
        }

        _this5.form = _this5.schema;

        _this5.emit('saveComponent', component, originalComponent);

        _this5.dialog.close();
      });
      this.addEventListener(this.dialog, 'close', function () {
        _this5.editForm.destroy(true);

        _this5.preview.destroy(true);

        if (component.isNew) {
          _this5.deleteComponent(component);
        }
      }); // Called when we edit a component.

      this.emit('editComponent', component);
    }
    /* eslint-enable max-statements */

    /**
     * Creates copy of component schema and stores it under sessionStorage.
     * @param {Component} component
     * @return {*}
     */

  }, {
    key: "copyComponent",
    value: function copyComponent(component) {
      if (!window.sessionStorage) {
        return console.log('Session storage is not supported in this browser.');
      }

      this.addClass(this.element, 'builder-paste-mode');

      var copy = _lodash.default.cloneDeep(component.schema);

      window.sessionStorage.setItem('formio.clipboard', JSON.stringify(copy));
    }
    /**
     * Paste copied component after the current component.
     * @param {Component} component
     * @return {*}
     */

  }, {
    key: "pasteComponent",
    value: function pasteComponent(component) {
      if (!window.sessionStorage) {
        return console.log('Session storage is not supported in this browser.');
      }

      this.removeClass(this.element, 'builder-paste-mode');
      var data = window.sessionStorage.getItem('formio.clipboard');

      if (data) {
        var schema = JSON.parse(data);
        window.sessionStorage.removeItem('formio.clipboard');

        _builder.default.uniquify(this._form, schema); // If this is an empty "nested" component, and it is empty, then paste the component inside this component.


        if (typeof component.addComponent === 'function' && !component.components.length) {
          component.addComponent(schema);
        } else {
          component.parent.addComponent(schema, false, false, component.element.nextSibling);
        }

        this.form = this.schema;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var state = _get(_getPrototypeOf(WebformBuilder.prototype), "destroy", this).call(this);

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

  }, {
    key: "insertInOrder",
    value: function insertInOrder(info, items, element, container) {
      // Determine where this item should be added.
      var beforeWeight = 0;
      var before = null;

      _lodash.default.each(items, function (itemInfo) {
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
    key: "addBuilderGroup",
    value: function addBuilderGroup(info, container) {
      var _this6 = this;

      if (!info || !info.key) {
        console.warn('Invalid Group Provided.');
        return;
      }

      info = _lodash.default.clone(info);
      var groupAnchor = this.ce('button', {
        class: 'btn btn-block builder-group-button',
        'type': 'button',
        'data-toggle': 'collapse',
        'data-parent': "#".concat(container.id),
        'data-target': "#group-".concat(info.key)
      }, this.text(info.title)); // Add a listener when it is clicked.

      if (!(0, _utils.bootstrapVersion)(this.options)) {
        this.addEventListener(groupAnchor, 'click', function (event) {
          event.preventDefault();
          var clickedGroupId = event.target.getAttribute('data-target').replace('#group-', '');

          if (_this6.groups[clickedGroupId]) {
            var clickedGroup = _this6.groups[clickedGroupId];

            var wasIn = _this6.hasClass(clickedGroup.panel, 'in');

            _lodash.default.each(_this6.groups, function (group, groupId) {
              _this6.removeClass(group.panel, 'in');

              _this6.removeClass(group.panel, 'show');

              if (groupId === clickedGroupId && !wasIn) {
                _this6.addClass(group.panel, 'in');

                _this6.addClass(group.panel, 'show');

                var parent = group.parent;

                while (parent) {
                  _this6.addClass(parent.panel, 'in');

                  _this6.addClass(parent.panel, 'show');

                  parent = parent.parent;
                }
              }
            }); // Match the form builder height to the sidebar.


            _this6.element.style.minHeight = "".concat(_this6.builderSidebar.offsetHeight, "px");

            _this6.scrollSidebar();
          }
        }, true);
      }

      info.element = this.ce('div', {
        class: 'card panel panel-default form-builder-panel',
        id: "group-panel-".concat(info.key)
      }, [this.ce('div', {
        class: 'card-header panel-heading form-builder-group-header'
      }, [this.ce('h5', {
        class: 'mb-0 panel-title'
      }, groupAnchor)])]);
      info.body = this.ce('div', {
        id: "group-container-".concat(info.key),
        class: 'card-body panel-body no-drop'
      }); // Add this group body to the drag containers.

      this.sidebarContainers.push(info.body);
      var groupBodyClass = 'panel-collapse collapse';

      if (info.default) {
        switch ((0, _utils.bootstrapVersion)(this.options)) {
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
        'data-parent': "#".concat(container.id),
        id: "group-".concat(info.key)
      }, info.body);
      info.element.appendChild(info.panel);
      this.groups[info.key] = info;
      this.insertInOrder(info, this.groups, info.element, container); // Now see if this group has subgroups.

      if (info.groups) {
        _lodash.default.each(info.groups, function (subInfo, subGroup) {
          subInfo.key = subGroup;
          subInfo.parent = info;

          _this6.addBuilderGroup(subInfo, info.body);
        });
      }
    }
  }, {
    key: "addBuilderComponentInfo",
    value: function addBuilderComponentInfo(component) {
      if (!component || !component.group || !this.groups[component.group]) {
        return;
      }

      component = _lodash.default.clone(component);
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
    key: "addBuilderComponent",
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
        id: "builder-".concat(component.key),
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
    key: "addBuilderButton",
    value: function addBuilderButton(info, container) {
      var _this7 = this;

      var button;
      info.element = this.ce('div', {
        style: 'margin: 5px 0;'
      }, button = this.ce('span', {
        class: "btn btn-block ".concat(info.style || 'btn-default')
      }, info.title)); // Make sure it persists across refreshes.

      this.addEventListener(button, 'click', function () {
        return _this7.emit(info.event);
      }, true);
      this.groups[info.key] = info;
      this.insertInOrder(info, this.groups, info.element, container);
    }
  }, {
    key: "buildSidebar",
    value: function buildSidebar() {
      var _this8 = this;

      // Do not rebuild the sidebar.
      if (this.sideBarElement) {
        return;
      }

      this.groups = {};
      this.sidebarContainers = [];
      this.sideBarElement = this.ce('div', {
        id: "builder-sidebar-".concat(this.id),
        class: 'accordion panel-group'
      }); // Add the groups.

      _lodash.default.each(this.options.builder, function (info, group) {
        if (info) {
          info.key = group;

          if (info.type === 'button') {
            _this8.addBuilderButton(info, _this8.sideBarElement);
          } else {
            _this8.addBuilderGroup(info, _this8.sideBarElement);
          }
        }
      }); // Get all of the components builder info grouped and sorted.


      var components = {};

      var allComponents = _lodash.default.filter(_lodash.default.map(_Components.default.components, function (component, type) {
        if (!component.builderInfo) {
          return null;
        }

        component.type = type;
        return component;
      }));

      _lodash.default.map(_lodash.default.sortBy(allComponents, function (component) {
        return component.builderInfo.weight;
      }), function (component) {
        var builderInfo = component.builderInfo;
        builderInfo.key = component.type;
        components[builderInfo.key] = builderInfo;

        _this8.addBuilderComponentInfo(builderInfo);
      }); // Add the components in each group.


      _lodash.default.each(this.groups, function (info) {
        return _lodash.default.each(info.components, function (comp, key) {
          if (comp) {
            _this8.addBuilderComponent(comp === true ? components[key] : comp, info);
          }
        });
      }); // Add the new sidebar element.


      this.builderSidebar.appendChild(this.sideBarElement);
      this.updateDraggable();
      this.sideBarTop = this.sideBarElement.getBoundingClientRect().top + window.scrollY;

      if (this.options.sideBarScroll) {
        this.addEventListener(window, 'scroll', _lodash.default.throttle(this.scrollSidebar.bind(this), 10), true);
      }
    }
  }, {
    key: "getParentElement",
    value: function getParentElement(element) {
      var containerComponent = element;

      do {
        containerComponent = containerComponent.parentNode;
      } while (containerComponent && !containerComponent.component);

      return containerComponent;
    }
  }, {
    key: "addDragContainer",
    value: function addDragContainer(element, component, dragEvents) {
      _lodash.default.remove(this.dragContainers, function (container) {
        return element.id && element.id === container.id;
      });

      element.component = component;

      if (dragEvents) {
        element.dragEvents = dragEvents;
      }

      this.addClass(element, 'drag-container');

      if (!element.id) {
        element.id = "builder-element-".concat(component.id);
      }

      this.dragContainers.push(element);
      this.updateDraggable();
    }
  }, {
    key: "clear",
    value: function clear() {
      this.dragContainers = [];
      return _get(_getPrototypeOf(WebformBuilder.prototype), "clear", this).call(this);
    }
  }, {
    key: "addComponentTo",
    value: function addComponentTo(schema, parent, element, sibling, after) {
      var component = parent.addComponent(schema, element, parent.data, sibling);

      if (after) {
        after(component);
      } // Get path to the component in the parent component.


      var path = 'components';

      switch (component.parent.type) {
        case 'table':
          path = "rows[".concat(component.tableRow, "][").concat(component.tableColumn, "].components");
          break;

        case 'columns':
          path = "columns[".concat(component.column, "].components");
          break;

        case 'tabs':
          path = "components[".concat(component.tab, "].components");
          break;
      } // Index within container


      var index = _lodash.default.findIndex(_lodash.default.get(component.parent.schema, path), {
        key: component.component.key
      }) || 0;
      this.emit('addComponent', component, path, index);
      return component;
    }
    /* eslint-disable  max-statements */

  }, {
    key: "onDrop",
    value: function onDrop(element, target, source, sibling) {
      if (!element || !element.id) {
        console.warn('No element.id defined for dropping');
        return;
      }

      var builderElement = source.querySelector("#".concat(element.id));
      var newParent = this.getParentElement(element);

      if (!newParent || !newParent.component) {
        return console.warn('Could not find parent component.');
      } // Remove any instances of the placeholder.


      var placeholder = document.getElementById("".concat(newParent.component.id, "-placeholder"));

      if (placeholder) {
        placeholder = placeholder.parentNode;
        placeholder.parentNode.removeChild(placeholder);
      } // If the sibling is the placeholder, then set it to null.


      if (sibling === placeholder) {
        sibling = null;
      } // Make this element go before the submit button if it is still on the builder.


      if (!sibling && this.submitButton && newParent.contains(this.submitButton.element)) {
        sibling = this.submitButton.element;
      } // If this is a new component, it will come from the builderElement


      if (builderElement && builderElement.builderInfo && builderElement.builderInfo.schema) {
        var componentSchema = _lodash.default.clone(builderElement.builderInfo.schema);

        if (target.dragEvents && target.dragEvents.onDrop) {
          target.dragEvents.onDrop(element, target, source, sibling, componentSchema);
        } // Add the new component.


        var component = this.addComponentTo(componentSchema, newParent.component, newParent, sibling, function (comp) {
          // Set that this is a new component.
          comp.isNew = true; // Pass along the save event.

          if (target.dragEvents) {
            comp.dragEvents = target.dragEvents;
          }
        }); // Edit the component.

        this.editComponent(component); // Remove the element.

        target.removeChild(element);
      } // Check to see if this is a moved component.
      else if (element.component) {
          var _componentSchema = element.component.schema;

          if (target.dragEvents && target.dragEvents.onDrop) {
            target.dragEvents.onDrop(element, target, source, sibling, _componentSchema);
          } // Remove the component from its parent.


          if (element.component.parent) {
            this.emit('deleteComponent', element.component);
            element.component.parent.removeComponent(element.component);
          } // Add the new component.


          var _component = this.addComponentTo(_componentSchema, newParent.component, newParent, sibling);

          if (target.dragEvents && target.dragEvents.onSave) {
            target.dragEvents.onSave(_component);
          } // Refresh the form.


          this.form = this.schema;
        }
    }
    /* eslint-enable  max-statements */

    /**
     * Adds a submit button if there are no components.
     */

  }, {
    key: "addSubmitButton",
    value: function addSubmitButton() {
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
  }, {
    key: "refreshDraggable",
    value: function refreshDraggable() {
      var _this9 = this;

      if (this.dragula) {
        this.dragula.destroy();
      }

      this.dragula = (0, _dragula.default)(this.sidebarContainers.concat(this.dragContainers), {
        moves: function moves(el) {
          return !el.classList.contains('no-drag');
        },
        copy: function copy(el) {
          return el.classList.contains('drag-copy');
        },
        accepts: function accepts(el, target) {
          return !el.contains(target) && !target.classList.contains('no-drop');
        }
      }).on('drop', function (element, target, source, sibling) {
        return _this9.onDrop(element, target, source, sibling);
      }); // If there are no components, then we need to add a default submit button.

      this.addSubmitButton();
      this.builderReadyResolve();
    }
  }, {
    key: "build",
    value: function build(state) {
      this.buildSidebar();

      _get(_getPrototypeOf(WebformBuilder.prototype), "build", this).call(this, state);

      this.updateDraggable();
      this.formReadyResolve();
    }
  }, {
    key: "defaultComponents",
    get: function get() {
      return {
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
      };
    }
  }, {
    key: "ready",
    get: function get() {
      return this.builderReady;
    }
  }]);

  return WebformBuilder;
}(_Webform2.default);

exports.default = WebformBuilder;