"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Webform = _interopRequireDefault(require("./Webform"));

var _Component2 = _interopRequireDefault(require("./components/_classes/component/Component"));

var _dragula = _interopRequireDefault(require("dragula/dist/dragula"));

var _tooltip = _interopRequireDefault(require("tooltip.js"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Components = _interopRequireDefault(require("./components/Components"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _utils = require("./utils/utils");

var _formUtils = require("./utils/formUtils");

var _builder = _interopRequireDefault(require("./utils/builder"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Templates = _interopRequireDefault(require("./templates/Templates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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
function (_Component) {
  _inherits(WebformBuilder, _Component);

  // eslint-disable-next-line max-statements
  function WebformBuilder() {
    var _this;

    _classCallCheck(this, WebformBuilder);

    var element, options;

    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    } else {
      options = arguments[0];
    } // Reset skipInit in case PDFBuilder has set it.


    options.skipInit = false;
    _this = _possibleConstructorReturn(this, _getPrototypeOf(WebformBuilder).call(this, null, options));
    _this.element = element;
    _this.builderHeight = 0;
    _this.schemas = {};
    _this.sideBarScroll = _lodash.default.get(_this.options, 'sideBarScroll', true);
    _this.sideBarScrollOffset = _lodash.default.get(_this.options, 'sideBarScrollOffset', 0);
    var componentInfo = {};

    for (var type in _Components.default.components) {
      var component = _Components.default.components[type];

      if (component.builderInfo) {
        component.type = type;
        componentInfo[type] = component.builderInfo;
      }
    }

    _this.dragDropEnabled = true; // Setup the builder options.

    _this.builder = _lodash.default.defaultsDeep({}, _this.options.builder, _this.defaultGroups); // Turn off if explicitely said to do so...

    _lodash.default.each(_this.defaultGroups, function (config, key) {
      if (config === false) {
        _this.builder[key] = false;
      }
    }); // Add the groups.


    _this.groups = {};
    _this.groupOrder = [];

    var _loop = function _loop(group) {
      if (_this.builder[group]) {
        _this.builder[group].key = group;
        _this.groups[group] = _this.builder[group];
        _this.groups[group].components = _this.groups[group].components || {};
        _this.groups[group].componentOrder = _this.groups[group].componentOrder || [];
        _this.groups[group].subgroups = Object.keys(_this.groups[group].groups || {}).map(function (groupKey) {
          _this.groups[group].groups[groupKey].componentOrder = Object.keys(_this.groups[group].groups[groupKey].components).map(function (key) {
            return key;
          });
          return _this.groups[group].groups[groupKey];
        });

        _this.groupOrder.push(_this.groups[group]);
      }
    };

    for (var group in _this.builder) {
      _loop(group);
    }

    _this.groupOrder = _this.groupOrder.filter(function (group) {
      return group && !group.ignore;
    }).sort(function (a, b) {
      return a.weight - b.weight;
    }).map(function (group) {
      return group.key;
    });

    for (var _type in _Components.default.components) {
      var _component = _Components.default.components[_type];

      if (_component.builderInfo) {
        _this.schemas[_type] = _component.builderInfo.schema;
        _component.type = _type;
        var builderInfo = _component.builderInfo;
        builderInfo.key = _component.type;

        _this.addBuilderComponentInfo(builderInfo);
      }
    } // Filter out any extra components.
    // Add the components in each group.


    for (var group in _this.groups) {
      var info = _this.groups[group];

      for (var key in info.components) {
        var comp = info.components[key];

        if (comp) {
          if (comp.schema) {
            _this.schemas[key] = comp.schema;
          }

          info.components[key] = comp === true ? componentInfo[key] : comp;
          info.components[key].key = key;
        }
      }
    } // Need to create a component order for each group.


    var _loop2 = function _loop2(_group) {
      if (_this.groups[_group] && _this.groups[_group].components) {
        _this.groups[_group].componentOrder = Object.keys(_this.groups[_group].components).map(function (key) {
          return _this.groups[_group].components[key];
        }).filter(function (component) {
          return component && !component.ignore;
        }).sort(function (a, b) {
          return a.weight - b.weight;
        }).map(function (component) {
          return component.key;
        });
      }
    };

    for (var _group in _this.groups) {
      _loop2(_group);
    }

    _this.options.hooks = _this.options.hooks || {};

    _this.options.hooks.renderComponent = function (html, _ref) {
      var self = _ref.self;

      if (self.type === 'form' && !self.key) {
        // The main webform shouldn't have this class as it adds extra styles.
        return html.replace('formio-component-form', '');
      }

      if (_this.options.disabled && _this.options.disabled.includes(self.key) || self.parent.noDragDrop) {
        return html;
      }

      return _this.renderTemplate('builderComponent', {
        html: html
      });
    };

    _this.options.hooks.renderComponents = function (html, _ref2) {
      var components = _ref2.components,
          self = _ref2.self;

      // if Datagrid and already has a component, don't make it droppable.
      if (self.type === 'datagrid' && components.length > 0 || self.noDragDrop) {
        return html;
      }

      if (!components || !components.length && !components.nodrop || self.type === 'form' && components.length <= 1 && (components.length === 0 || components[0].type === 'button')) {
        html = _this.renderTemplate('builderPlaceholder', {
          position: 0
        }) + html;
      }

      return _this.renderTemplate('builderComponents', {
        key: self.key,
        type: self.type,
        html: html
      });
    };

    _this.options.hooks.renderInput = function (html, _ref3) {
      var self = _ref3.self;

      if (self.type === 'hidden') {
        return html + self.name;
      }

      return html;
    };

    _this.options.hooks.renderLoading = function (html, _ref4) {
      var self = _ref4.self;

      if (self.type === 'form' && self.key) {
        return self.name;
      }

      return html;
    };

    _this.options.hooks.attachComponents = function (element, components, container, component) {
      // Don't attach if no element was found or component doesn't participate in drag'n'drop.
      if (!element) {
        return;
      }

      if (component.noDragDrop) {
        return element;
      } // Attach container and component to element for later reference.


      var containerElement = element.querySelector("[ref=\"".concat(component.component.key, "-container\"]")) || element;
      containerElement.formioContainer = container;
      containerElement.formioComponent = component; // Add container to draggable list.

      if (_this.dragula) {
        _this.dragula.containers.push(containerElement);
      } // If this is an existing datagrid element, don't make it draggable.


      if (component.type === 'datagrid' && components.length > 0) {
        return element;
      } // Since we added a wrapper, need to return the original element so that we can find the components inside it.


      return element.children[0];
    };

    _this.options.hooks.attachDatagrid = function (element, component) {
      component.loadRefs(element, _defineProperty({}, "".concat(component.key, "-container"), 'single'));
      component.attachComponents(component.refs["".concat(component.key, "-container")].parentNode, [], component.component.components); // Need to set up horizontal rearrangement of fields.
    };

    _this.options.hooks.attachComponent = function (element, component) {
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
        new _tooltip.default(component.refs.copyComponent, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Copy')
        });
        component.addEventListener(component.refs.copyComponent, 'click', function () {
          return _this.copyComponent(component);
        });
      }

      if (component.refs.pasteComponent) {
        var pasteToolTip = new _tooltip.default(component.refs.pasteComponent, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Paste below')
        });
        component.addEventListener(component.refs.pasteComponent, 'click', function () {
          pasteToolTip.hide();

          _this.pasteComponent(component);
        });
      }

      if (component.refs.moveComponent) {
        new _tooltip.default(component.refs.moveComponent, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Move')
        });
      }

      var parent = _this.getParentElement(element);

      if (component.refs.editComponent) {
        new _tooltip.default(component.refs.editComponent, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Edit')
        });
        component.addEventListener(component.refs.editComponent, 'click', function () {
          return _this.editComponent(component.component, parent);
        });
      }

      if (component.refs.editJson) {
        new _tooltip.default(component.refs.editJson, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Edit JSON')
        });
        component.addEventListener(component.refs.editJson, 'click', function () {
          return _this.editComponent(component.component, parent, false, true);
        });
      }

      if (component.refs.removeComponent) {
        new _tooltip.default(component.refs.removeComponent, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Remove')
        });
        component.addEventListener(component.refs.removeComponent, 'click', function () {
          return _this.removeComponent(component.component, parent);
        });
      }

      return element;
    }; // Load resources tagged as 'builder'


    var query = {
      params: {
        type: 'resource',
        limit: 4294967295,
        select: '_id,title,name,components'
      }
    };

    if (_this.options && _this.options.resourceTag) {
      query.tags = [_this.options.resourceTag];
    } else if (!_this.options || !_this.options.hasOwnProperty('resourceTag')) {
      query.tags = ['builder'];
    }

    var formio = new _Formio.default(_Formio.default.projectUrl);

    if (!formio.noProject) {
      formio.loadForms(query).then(function (resources) {
        if (resources.length) {
          _this.builder.resource = {
            title: 'Existing Resource Fields',
            key: 'resource',
            weight: 50,
            subgroups: [],
            components: [],
            componentOrder: []
          };
          _this.groups.resource = {
            title: 'Existing Resource Fields',
            key: 'resource',
            weight: 50,
            subgroups: [],
            components: [],
            componentOrder: []
          };

          _this.groupOrder.push('resource');

          _this.addExistingResourceFields(resources);
        }
      });
    } // Notify components if they need to modify their render.


    _this.options.attachMode = 'builder';
    _this.webform = _this.webform || _this.createForm(_this.options);
    return _this;
  }

  _createClass(WebformBuilder, [{
    key: "addExistingResourceFields",
    value: function addExistingResourceFields(resources) {
      var _this2 = this;

      _lodash.default.each(resources, function (resource, index) {
        var resourceKey = resource.name;
        var subgroup = {
          key: resource.name,
          title: resource.title,
          components: [],
          componentOrder: [],
          default: index === 0
        };
        (0, _formUtils.eachComponent)(resource.components, function (component) {
          if (component.type === 'button') return;
          if (_this2.options && _this2.options.resourceFilter && (!component.tags || component.tags.indexOf(_this2.options.resourceFilter) === -1)) return;
          var componentName = component.label;

          if (!componentName && component.key) {
            componentName = _lodash.default.upperFirst(component.key);
          }

          subgroup.componentOrder.push(component.key);
          subgroup.components[component.key] = _lodash.default.merge(_lodash.default.cloneDeep(_Components.default.components[component.type].builderInfo, true), {
            key: component.key,
            title: componentName,
            group: 'resource',
            subgroup: resourceKey
          }, {
            schema: _objectSpread({}, component, {
              label: component.label,
              key: component.key,
              lockKey: true,
              source: !_this2.options.noSource ? resource._id : undefined,
              isNew: true
            })
          });
        }, true);

        _this2.groups.resource.subgroups.push(subgroup);
      });

      this.triggerRedraw();
    }
  }, {
    key: "createForm",
    value: function createForm(options) {
      this.webform = new _Webform.default(this.element, options);

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

  }, {
    key: "findNamespaceRoot",

    /**
     * When a component sets its api key, we need to check if it is unique within its namespace. Find the namespace root
     * so we can calculate this correctly.
     * @param component
     */
    value: function findNamespaceRoot(component) {
      // First get the component with nested parents.
      var comp = (0, _formUtils.getComponent)(this.webform.form.components, component.key, true);
      var namespaceKey = this.recurseNamespace(comp); // If there is no key, it is the root form.

      if (!namespaceKey || this.form.key === namespaceKey) {
        return this.form.components;
      } // If the current component is the namespace, we don't need to find it again.


      if (namespaceKey === component.key) {
        return component.components;
      } // Get the namespace component so we have the original object.


      var namespaceComponent = (0, _formUtils.getComponent)(this.form.components, namespaceKey, true);
      return namespaceComponent.components;
    }
  }, {
    key: "recurseNamespace",
    value: function recurseNamespace(component) {
      // If there is no parent, we are at the root level.
      if (!component) {
        return null;
      } // Some components are their own namespace.


      if (['container', 'datagrid', 'editgrid', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
        return component.key;
      } // Anything else, keep going up.


      return this.recurseNamespace(component.parent);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return this.renderTemplate('builder', {
        sidebar: this.renderTemplate('builderSidebar', {
          scrollEnabled: this.sideBarScroll,
          groupOrder: this.groupOrder,
          groupId: "builder-sidebar-".concat(this.id),
          groups: this.groupOrder.map(function (groupKey) {
            return _this3.renderTemplate('builderSidebarGroup', {
              group: _this3.groups[groupKey],
              groupKey: groupKey,
              groupId: "builder-sidebar-".concat(_this3.id),
              subgroups: _this3.groups[groupKey].subgroups.map(function (group) {
                return _this3.renderTemplate('builderSidebarGroup', {
                  group: group,
                  groupKey: group.key,
                  groupId: "builder-sidebar-".concat(groupKey),
                  subgroups: []
                });
              })
            });
          })
        }),
        form: this.webform.render()
      });
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this4 = this;

      return _get(_getPrototypeOf(WebformBuilder.prototype), "attach", this).call(this, element).then(function () {
        _this4.loadRefs(element, {
          form: 'single',
          sidebar: 'single',
          'container': 'multiple',
          'sidebar-anchor': 'multiple',
          'sidebar-group': 'multiple',
          'sidebar-container': 'multiple'
        });

        if (_this4.sideBarScroll && _Templates.default.current.handleBuilderSidebarScroll) {
          _Templates.default.current.handleBuilderSidebarScroll.call(_this4, _this4);
        } // Add the paste status in form


        if (window.sessionStorage) {
          var data = window.sessionStorage.getItem('formio.clipboard');

          if (data) {
            _this4.addClass(_this4.refs.form, 'builder-paste-mode');
          }
        }

        if (!(0, _utils.bootstrapVersion)(_this4.options)) {
          // Initialize
          _this4.refs['sidebar-group'].forEach(function (group) {
            group.style.display = group.getAttribute('data-default') === 'true' ? 'inherit' : 'none';
          }); // Click event


          _this4.refs['sidebar-anchor'].forEach(function (anchor, index) {
            _this4.addEventListener(anchor, 'click', function () {
              var clickedParentId = anchor.getAttribute('data-parent').slice('#builder-sidebar-'.length);
              var clickedId = anchor.getAttribute('data-target').slice('#group-'.length);

              _this4.refs['sidebar-group'].forEach(function (group, groupIndex) {
                var openByDefault = group.getAttribute('data-default') === 'true';
                var groupId = group.getAttribute('id').slice('group-'.length);
                var groupParent = group.getAttribute('data-parent').slice('#builder-sidebar-'.length);
                group.style.display = openByDefault && groupParent === clickedId || groupId === clickedParentId || groupIndex === index ? 'inherit' : 'none';
              });
            }, true);
          });
        }

        if (_this4.dragDropEnabled) {
          _this4.initDragula();
        }

        if (_this4.refs.form) {
          return _this4.webform.attach(_this4.refs.form);
        }
      });
    }
  }, {
    key: "initDragula",
    value: function initDragula() {
      var _this5 = this;

      var options = this.options;

      if (this.dragula) {
        this.dragula.destroy();
      }

      var containersArray = Array.prototype.slice.call(this.refs['sidebar-container']).filter(function (item) {
        return item.id !== 'group-container-resource';
      });
      this.dragula = (0, _dragula.default)(containersArray, {
        moves: function moves(el) {
          var moves = true;
          var list = Array.from(el.classList).filter(function (item) {
            return item.indexOf('formio-component-') === 0;
          });
          list.forEach(function (item) {
            var key = item.slice('formio-component-'.length);

            if (options.disabled && options.disabled.includes(key)) {
              moves = false;
            }
          });

          if (el.classList.contains('no-drag')) {
            moves = false;
          }

          return moves;
        },
        copy: function copy(el) {
          return el.classList.contains('drag-copy');
        },
        accepts: function accepts(el, target) {
          return !el.contains(target) && !target.classList.contains('no-drop');
        }
      }).on('drop', function (element, target, source, sibling) {
        return _this5.onDrop(element, target, source, sibling);
      });
    }
  }, {
    key: "detach",
    value: function detach() {
      if (this.dragula) {
        this.dragula.destroy();
      }

      this.dragula = null;

      if (this.sideBarScroll && _Templates.default.current.clearBuilderSidebarScroll) {
        _Templates.default.current.clearBuilderSidebarScroll.call(this, this);
      }

      _get(_getPrototypeOf(WebformBuilder.prototype), "detach", this).call(this);
    }
  }, {
    key: "getComponentInfo",
    value: function getComponentInfo(key, group) {
      var info; // This is a new component

      if (this.schemas.hasOwnProperty(key)) {
        info = _lodash.default.cloneDeep(this.schemas[key]);
        info.key = _lodash.default.camelCase(info.title || info.label || info.placeholder || info.type);
      } else {
        // This is an existing resource field.
        var resourceGroups = this.groups.resource.subgroups;

        var resourceGroup = _lodash.default.find(resourceGroups, {
          key: group
        });

        if (resourceGroup && resourceGroup.components.hasOwnProperty(key)) {
          info = resourceGroup.components[key].schema;
        }
      }

      return info;
    }
  }, {
    key: "getComponentsPath",
    value: function getComponentsPath(component, parent) {
      // Get path to the component in the parent component.
      var path = 'components';

      switch (parent.type) {
        case 'table':
          path = "rows[".concat(component.tableRow, "][").concat(component.tableColumn, "].components");
          break;

        case 'columns':
          path = "columns[".concat(component.column, "].components");
          break;

        case 'tabs':
          path = "components[".concat(component.tab, "].components");
          break;
      }

      return path;
    }
    /* eslint-disable max-statements */

  }, {
    key: "onDrop",
    value: function onDrop(element, target, source, sibling) {
      if (!target) {
        return;
      } // If you try to drop within itself.


      if (element.contains(target)) {
        return;
      }

      var key = element.getAttribute('data-key');
      var type = element.getAttribute('data-type');
      var group = element.getAttribute('data-group');
      var info, isNew;

      if (key) {
        // This is a new component.
        info = this.getComponentInfo(key, group);

        if (!info && type) {
          info = this.getComponentInfo(type, group);
        }

        isNew = true;
      } else {
        var _index = _lodash.default.findIndex(source.formioContainer, {
          key: element.formioComponent.component.key
        });

        if (_index !== -1) {
          // Grab and remove the component from the source container.
          info = source.formioContainer.splice(_lodash.default.findIndex(source.formioContainer, {
            key: element.formioComponent.component.key
          }), 1); // Since splice returns an array of one object, we need to destructure it.

          info = info[0];
        }
      } // If we haven't found the component, stop.


      if (!info) {
        return;
      }

      if (target !== source) {
        // Ensure the key remains unique in its new container.
        _builder.default.uniquify(this.findNamespaceRoot(target.formioComponent.component), info);
      } // Insert in the new container.


      if (sibling) {
        var _index2 = 0;

        if (!sibling.getAttribute('data-noattach')) {
          _index2 = _lodash.default.findIndex(target.formioContainer, {
            key: sibling.formioComponent.component.key
          }) || 0;
        } else {
          _index2 = sibling.getAttribute('data-position');
        }

        target.formioContainer.splice(_index2, 0, info);
      } else {
        target.formioContainer.push(info);
      }

      var parent = target.formioComponent;
      var path = this.getComponentsPath(info, parent.component);
      var index = _lodash.default.findIndex(_lodash.default.get(parent.schema, path), {
        key: info.key
      }) || 0;
      this.emit('addComponent', info, parent, path, index, isNew);

      if (isNew && !this.options.noNewEdit) {
        this.editComponent(info, target, isNew);
      } // Only rebuild the parts needing to be rebuilt.


      if (target !== source) {
        if (source.formioContainer && source.contains(target)) {
          source.formioComponent.rebuild();
        } else if (target.contains(source)) {
          target.formioComponent.rebuild();
        } else {
          if (source.formioContainer) {
            source.formioComponent.rebuild();
          }

          target.formioComponent.rebuild();
        }
      } else {
        // If they are the same, only rebuild one.
        target.formioComponent.rebuild();
      }
    }
  }, {
    key: "setForm",
    value: function setForm(form) {
      var _this6 = this;

      //populate isEnabled for recaptcha form settings
      var isRecaptchaEnabled = false;

      if (form.components) {
        (0, _formUtils.eachComponent)(form.components, function (component) {
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
          return _this6.builderHeight = _this6.refs.form.offsetHeight;
        }, 200);
        return retVal;
      });
    }
  }, {
    key: "removeComponent",
    value: function removeComponent(component, parent) {
      if (!parent) {
        return;
      }

      var remove = true;

      if (!component.skipRemoveConfirm && (Array.isArray(component.components) && component.components.length || Array.isArray(component.rows) && component.rows.length || Array.isArray(component.columns) && component.columns.length)) {
        var message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
        remove = window.confirm(this.t(message));
      }

      var index = parent.formioContainer.indexOf(component);

      if (remove && index !== -1) {
        var path = this.getComponentsPath(component, parent.formioComponent.component);
        this.emit('removeComponent', component, parent.formioComponent.component, path, index);
        parent.formioContainer.splice(index, 1);
        parent.formioComponent.rebuild();
        this.emit('change', this.form);
      }

      return remove;
    }
  }, {
    key: "updateComponent",
    value: function updateComponent(component) {
      // Update the preview.
      if (this.preview) {
        this.preview.form = {
          components: [_lodash.default.omit(component, ['hidden', 'calculatedValue'])]
        };
        var previewElement = this.componentEdit.querySelector('[ref="preview"]');

        if (previewElement) {
          this.setContent(previewElement, this.preview.render());
          this.preview.attach(previewElement);
        }
      } // Change the "default value" field to be reflective of this component.


      if (this.defaultValueComponent) {
        _lodash.default.assign(this.defaultValueComponent.component, _lodash.default.omit(component, ['key', 'label', 'placeholder', 'tooltip', 'validate', 'disabled', 'calculatedValue']));
      } // Called when we update a component.


      this.emit('updateComponent', component);
    }
    /**
     * Called when a new component is saved.
     *
     * @param parent
     * @param component
     * @return {boolean}
     */

  }, {
    key: "saveComponent",
    value: function saveComponent(component, parent, isNew) {
      var _this7 = this;

      this.editForm.detach();
      var parentContainer = parent ? parent.formioContainer : this.container;
      var parentComponent = parent ? parent.formioComponent : this;
      var path = this.getComponentsPath(component, parentComponent.component);
      var index = parentContainer.indexOf(component);
      this.dialog.close();

      if (index !== -1) {
        var originalComponent = parentContainer[index];
        var submissionData = this.editForm.submission.data;
        parentContainer[index] = submissionData.componentJson || submissionData;

        var rebuild = parentComponent.rebuild() || _nativePromiseOnly.default.resolve();

        return rebuild.then(function () {
          _this7.emit('saveComponent', parentContainer[index], originalComponent, parentComponent.component, path, index, isNew);

          _this7.emit('change', _this7.form);
        });
      }

      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "editComponent",
    value: function editComponent(component, parent, isNew, isJsonEdit) {
      var _this8 = this;

      if (!component.key) {
        return;
      }

      var saved = false;

      var componentCopy = _lodash.default.cloneDeep(component);

      var componentClass = _Components.default.components[componentCopy.type];
      var isCustom = componentClass === undefined;
      isJsonEdit = isJsonEdit || isCustom;
      componentClass = isCustom ? _Components.default.components.unknown : componentClass; // Make sure we only have one dialog open at a time.

      if (this.dialog) {
        this.dialog.close();
      } // This is the render step.


      var editFormOptions = _lodash.default.clone(_lodash.default.get(this, 'options.editForm', {}));

      if (this.editForm) {
        this.editForm.destroy();
      } // Allow editForm overrides per component.


      var overrides = _lodash.default.get(this.options, "editForm.".concat(componentCopy.type), {}); // Pass along the form being edited.


      editFormOptions.editForm = this.form;
      editFormOptions.editComponent = component;
      this.editForm = new _Webform.default(_objectSpread({}, _lodash.default.omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'skipInit']), {
        language: this.options.language
      }, editFormOptions));
      this.editForm.form = isJsonEdit && !isCustom ? {
        components: [{
          type: 'textarea',
          as: 'json',
          editor: 'ace',
          weight: 10,
          input: true,
          key: 'componentJson',
          label: 'Component JSON',
          tooltip: 'Edit the JSON for this component.'
        }]
      } : componentClass.editForm(_lodash.default.cloneDeep(overrides));
      this.editForm.submission = isJsonEdit ? {
        data: {
          componentJson: componentCopy
        }
      } : {
        data: componentCopy
      };

      if (this.preview) {
        this.preview.destroy();
      }

      if (!componentClass.builderInfo.hasOwnProperty('preview') || componentClass.builderInfo.preview) {
        this.preview = new _Webform.default(_lodash.default.omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'calculatedValue']));
      }

      this.componentEdit = this.ce('div');
      this.setContent(this.componentEdit, this.renderTemplate('builderEditForm', {
        componentInfo: componentClass.builderInfo,
        editForm: this.editForm.render(),
        preview: this.preview ? this.preview.render() : false
      }));
      this.dialog = this.createModal(this.componentEdit); // This is the attach step.

      this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));
      this.defaultValueComponent = (0, _formUtils.getComponent)(this.editForm.components, 'defaultValue');
      this.updateComponent(componentCopy);
      this.editForm.on('change', function (event) {
        if (event.changed) {
          // See if this is a manually modified key. Treat custom component keys as manually modified
          if (event.changed.component && event.changed.component.key === 'key' || isJsonEdit) {
            componentCopy.keyModified = true;
          }

          if (event.changed.component && ['label', 'title'].includes(event.changed.component.key)) {
            // Ensure this component has a key.
            if (isNew) {
              if (!event.data.keyModified) {
                _this8.editForm.everyComponent(function (component) {
                  if (component.key === 'key' && component.parent.component.key === 'tabs') {
                    component.setValue(_lodash.default.camelCase(event.data.title || event.data.label || event.data.placeholder || event.data.type));
                    return false;
                  }
                });
              }

              if (_this8.form) {
                // Set a unique key for this component.
                _builder.default.uniquify(_this8.findNamespaceRoot(parent.formioComponent.component), event.data);
              }
            }
          } // Update the component.


          _this8.updateComponent(event.data.componentJson || event.data);
        }
      });
      this.addEventListener(this.componentEdit.querySelector('[ref="cancelButton"]'), 'click', function (event) {
        event.preventDefault();

        _this8.editForm.detach();

        _this8.emit('cancelComponent', component);

        _this8.dialog.close();
      });
      this.addEventListener(this.componentEdit.querySelector('[ref="removeButton"]'), 'click', function (event) {
        event.preventDefault(); // Since we are already removing the component, don't trigger another remove.

        saved = true;

        _this8.editForm.detach();

        _this8.removeComponent(component, parent);

        _this8.dialog.close();
      });
      this.addEventListener(this.componentEdit.querySelector('[ref="saveButton"]'), 'click', function (event) {
        event.preventDefault();

        if (!_this8.editForm.checkValidity(_this8.editForm.data, true)) {
          _this8.editForm.setPristine(false);

          _this8.editForm.showErrors();

          return false;
        }

        saved = true;

        _this8.saveComponent(component, parent, isNew);
      });
      this.addEventListener(this.dialog, 'close', function () {
        _this8.editForm.destroy();

        if (_this8.preview) {
          _this8.preview.destroy();

          _this8.preview = null;
        }

        if (isNew && !saved) {
          _this8.removeComponent(component, parent);
        } // Clean up.


        _this8.removeEventListener(_this8.dialog, 'close');

        _this8.dialog = null;
      }); // Called when we edit a component.

      this.emit('editComponent', component);
    }
    /**
     * Creates copy of component schema and stores it under sessionStorage.
     * @param {Component} component
     * @return {*}
     */

  }, {
    key: "copyComponent",
    value: function copyComponent(component) {
      if (!window.sessionStorage) {
        return console.warn('Session storage is not supported in this browser.');
      }

      this.addClass(this.refs.form, 'builder-paste-mode');

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
        return console.warn('Session storage is not supported in this browser.');
      }

      this.removeClass(this.refs.form, 'builder-paste-mode');

      if (window.sessionStorage) {
        var data = window.sessionStorage.getItem('formio.clipboard');

        if (data) {
          var schema = JSON.parse(data);
          var parent = this.getParentElement(component.element);

          _builder.default.uniquify(this.findNamespaceRoot(parent.formioComponent.component), schema);

          var index = parent.formioContainer.indexOf(component.component);
          var path = this.getComponentsPath(schema, parent.formioComponent.component);
          parent.formioContainer.splice(index + 1, 0, schema);
          parent.formioComponent.rebuild();
          this.emit('saveComponent', schema, schema, parent.formioComponent.components, path, index + 1, true);
          this.emit('change', this.form);
        }
      }
    }
  }, {
    key: "getParentElement",
    value: function getParentElement(element) {
      var container = element;

      do {
        container = container.parentNode;
      } while (container && !container.formioContainer);

      return container;
    }
  }, {
    key: "addBuilderComponentInfo",
    value: function addBuilderComponentInfo(component) {
      if (!component || !component.group || !this.groups[component.group]) {
        return;
      }

      component = _lodash.default.clone(component);
      var groupInfo = this.groups[component.group];

      if (!groupInfo.components.hasOwnProperty(component.key)) {
        groupInfo.components[component.key] = component;
      }

      return component;
    }
  }, {
    key: "ready",
    get: function get() {
      return this.webform.ready;
    }
  }, {
    key: "defaultGroups",
    get: function get() {
      return {
        basic: {
          title: 'Basic',
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
        },
        premium: {
          title: 'Premium',
          weight: 40
        }
      };
    }
  }, {
    key: "form",
    get: function get() {
      return this.webform.form;
    },
    set: function set(value) {
      if (!value.components) {
        value.components = [];
      } // Ensure there is at least a submit button.


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
      this.rebuild();
    }
  }, {
    key: "schema",
    get: function get() {
      return this.webform.schema;
    }
  }, {
    key: "container",
    get: function get() {
      return this.webform.form.components;
    }
  }]);

  return WebformBuilder;
}(_Component2.default);

exports.default = WebformBuilder;