"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.find-index");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.index-of");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.some");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.map");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.regexp.exec");

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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

require('./components/builder');

var WebformBuilder = /*#__PURE__*/function (_Component) {
  _inherits(WebformBuilder, _Component);

  var _super = _createSuper(WebformBuilder);

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
    _this = _super.call(this, null, options);
    _this.element = element;
    _this.builderHeight = 0;
    _this.schemas = {};
    _this.repeatablePaths = [];
    _this.sideBarScroll = _lodash.default.get(_this.options, 'sideBarScroll', true);
    _this.sideBarScrollOffset = _lodash.default.get(_this.options, 'sideBarScrollOffset', 0);
    _this.fieldsList = {
      title: 'Result fields',
      key: 'searchFields',
      weight: 0,
      subgroups: [],
      default: true,
      components: {},
      componentOrder: []
    };
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

    for (var type in _Components.default.components) {
      var component = _Components.default.components[type];

      if (component.builderInfo && component.builderInfo.schema) {
        _this.schemas[type] = component.builderInfo.schema;
        component.type = type;
        var builderInfo = component.builderInfo;
        builderInfo.key = component.type;

        _this.addBuilderComponentInfo(builderInfo);
      }
    } // Filter out any extra components.
    // Add the components in each group.


    var _loop2 = function _loop2(_group) {
      var info = _this.groups[_group];

      for (var key in info.components) {
        var comp = info.components[key];

        if (comp === true && _Components.default.components[key] && _Components.default.components[key].builderInfo) {
          comp = _Components.default.components[key].builderInfo;
        }

        if (comp && comp.schema) {
          _this.schemas[key] = comp.schema;
          info.components[key] = comp;
          info.components[key].key = key;
          _this.fieldsList.components[key] = info.components[key];
        } else {
          // Do not include this component in the components array.
          delete info.components[key];
        }
      } // Order the compoennts.


      if (info.components) {
        info.componentOrder = Object.keys(info.components).map(function (key) {
          return info.components[key];
        }).filter(function (component) {
          return component && !component.ignore && !component.ignoreForForm;
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
      var _self$component;

      var self = _ref.self;

      if (self.type === 'form' && !self.key) {
        // The main webform shouldn't have this class as it adds extra styles.
        return html.replace('formio-component-form', '');
      }

      if (_this.options.disabled && _this.options.disabled.includes(self.key) || self.parent.noDragDrop) {
        return html;
      }

      return _this.renderTemplate('builderComponent', {
        html: html,
        disableBuilderActions: self === null || self === void 0 ? void 0 : (_self$component = self.component) === null || _self$component === void 0 ? void 0 : _self$component.disableBuilderActions
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

      if (_this.dragula && _this.allowDrop(element)) {
        _this.dragula.containers.push(containerElement);
      } // If this is an existing datagrid element, don't make it draggable.


      if ((component.type === 'datagrid' || component.type === 'datamap') && components.length > 0) {
        return element;
      } // Since we added a wrapper, need to return the original element so that we can find the components inside it.


      return element.children[0];
    };

    _this.options.hooks.attachDatagrid = function (element, component) {
      component.loadRefs(element, _defineProperty({}, "".concat(component.key, "-container"), 'single'));
      var dataGridContainer = component.refs["".concat(component.key, "-container")];

      if (dataGridContainer) {
        component.attachComponents(dataGridContainer.parentNode, [], component.component.components);
      } // Need to set up horizontal rearrangement of fields.

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
          return _this.editComponent(component.schema, parent, false, false, component.component);
        });
      }

      if (component.refs.editJson) {
        new _tooltip.default(component.refs.editJson, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Edit JSON')
        });
        component.addEventListener(component.refs.editJson, 'click', function () {
          return _this.editComponent(component.schema, parent, false, true, component.component);
        });
      }

      if (component.refs.removeComponent) {
        new _tooltip.default(component.refs.removeComponent, {
          trigger: 'hover',
          placement: 'top',
          title: _this.t('Remove')
        });
        component.addEventListener(component.refs.removeComponent, 'click', function () {
          return _this.removeComponent(component.schema, parent, component.component);
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
      query.params.tags = [_this.options.resourceTag];
    } else if (!_this.options || !_this.options.hasOwnProperty('resourceTag')) {
      query.params.tags = ['builder'];
    }

    var formio = new _Formio.default(_Formio.default.projectUrl);
    var isResourcesDisabled = _this.options.builder && _this.options.builder.resource === false;

    if (!formio.noProject && !isResourcesDisabled) {
      var resourceOptions = _this.options.builder && _this.options.builder.resource;
      formio.loadForms(query).then(function (resources) {
        if (resources.length) {
          _this.builder.resource = {
            title: resourceOptions ? resourceOptions.title : 'Existing Resource Fields',
            key: 'resource',
            weight: resourceOptions ? resourceOptions.weight : 50,
            subgroups: [],
            components: [],
            componentOrder: []
          };
          _this.groups.resource = {
            title: resourceOptions ? resourceOptions.title : 'Existing Resource Fields',
            key: 'resource',
            weight: resourceOptions ? resourceOptions.weight : 50,
            subgroups: [],
            components: [],
            componentOrder: []
          };

          if (!_this.groupOrder.includes('resource')) {
            _this.groupOrder.push('resource');
          }

          _this.addExistingResourceFields(resources);
        }
      });
    } // Notify components if they need to modify their render.


    _this.options.attachMode = 'builder';
    _this.webform = _this.webform || _this.createForm(_this.options);
    return _this;
  }

  _createClass(WebformBuilder, [{
    key: "allowDrop",
    value: function allowDrop() {
      return true;
    }
  }, {
    key: "addExistingResourceFields",
    value: function addExistingResourceFields(resources) {
      var _this2 = this;

      _lodash.default.each(resources, function (resource, index) {
        var resourceKey = "resource-".concat(resource.name);
        var subgroup = {
          key: resourceKey,
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
          subgroup.components[component.key] = _lodash.default.merge((0, _utils.fastCloneDeep)(_Components.default.components[component.type] ? _Components.default.components[component.type].builderInfo : _Components.default.components['unknown'].builderInfo), {
            key: component.key,
            title: componentName,
            group: 'resource',
            subgroup: resourceKey
          }, {
            schema: _objectSpread(_objectSpread({}, component), {}, {
              label: component.label,
              key: component.key,
              lockKey: true,
              source: !_this2.options.noSource ? resource._id : undefined,
              isNew: true
            })
          });
          _this2.fieldsList.components[component.key] = subgroup.components[component.key];
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
    key: "redraw",
    value: function redraw() {
      return _Webform.default.prototype.redraw.call(this);
    }
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
        return [].concat(_toConsumableArray(component.components), [component]);
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


      if (['address', 'container', 'datagrid', 'editgrid', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
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
                  groupId: "group-container-".concat(groupKey),
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

      this.on('change', function (form) {
        _this4.populateRecaptchaSettings(form);
      });
      return _get(_getPrototypeOf(WebformBuilder.prototype), "attach", this).call(this, element).then(function () {
        _this4.loadRefs(element, {
          form: 'single',
          sidebar: 'single',
          'sidebar-search': 'single',
          'sidebar-groups': 'single',
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

        _this4.addEventListener(_this4.refs['sidebar-search'], 'input', function (e) {
          var searchString = e.target.value;

          _this4.searchFields(searchString);
        });

        if (_this4.dragDropEnabled) {
          _this4.initDragula();
        }

        if (_this4.refs.form) {
          return _this4.webform.attach(_this4.refs.form);
        }
      });
    }
  }, {
    key: "searchFields",
    value: function searchFields(searchString) {
      var _this5 = this;

      var sidebar = this.refs['sidebar'];
      var sidebarGroups = this.refs['sidebar-groups'];

      if (!sidebar || !sidebarGroups) {
        return;
      }

      if (searchString) {
        var filteredComponentsOrder = [];

        for (var type in this.fieldsList.components) {
          var builderInfo = this.fieldsList.components[type];

          if (builderInfo.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1) {
            filteredComponentsOrder.push(type);
          }
        }

        this.fieldsList.componentOrder = filteredComponentsOrder;
        sidebarGroups.innerHTML = this.renderTemplate('builderSidebarGroup', {
          group: this.fieldsList,
          groupKey: 'searchFields',
          groupId: "builder-sidebar-".concat(this.id),
          subgroups: []
        });
      } else {
        sidebarGroups.innerHTML = this.groupOrder.map(function (groupKey) {
          return _this5.renderTemplate('builderSidebarGroup', {
            group: _this5.groups[groupKey],
            groupKey: groupKey,
            groupId: sidebar.id || sidebarGroups.id,
            subgroups: _this5.groups[groupKey].subgroups.map(function (group) {
              return _this5.renderTemplate('builderSidebarGroup', {
                group: group,
                groupKey: group.key,
                groupId: "group-container-".concat(groupKey),
                subgroups: []
              });
            })
          });
        }).join('');
      }

      this.loadRefs(this.element, {
        'sidebar-groups': 'single',
        'sidebar-anchor': 'multiple',
        'sidebar-group': 'multiple',
        'sidebar-container': 'multiple'
      });
      this.updateDragAndDrop();
    }
  }, {
    key: "updateDragAndDrop",
    value: function updateDragAndDrop() {
      if (this.dragDropEnabled) {
        this.initDragula();
      }

      if (this.refs.form) {
        return this.webform.attach(this.refs.form);
      }
    }
  }, {
    key: "initDragula",
    value: function initDragula() {
      var _this6 = this;

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
        return _this6.onDrop(element, target, source, sibling);
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
        info = (0, _utils.fastCloneDeep)(this.schemas[key]);
      } else if (this.groups.hasOwnProperty(group)) {
        var groupComponents = this.groups[group].components;

        if (groupComponents.hasOwnProperty(key)) {
          info = (0, _utils.fastCloneDeep)(groupComponents[key].schema);
        }
      }

      if (group.slice(0, group.indexOf('-')) === 'resource') {
        // This is an existing resource field.
        var resourceGroups = this.groups.resource.subgroups;

        var resourceGroup = _lodash.default.find(resourceGroups, {
          key: group
        });

        if (resourceGroup && resourceGroup.components.hasOwnProperty(key)) {
          info = (0, _utils.fastCloneDeep)(resourceGroup.components[key].schema);
        }
      }

      if (info) {
        info.key = _lodash.default.camelCase(info.key || info.title || info.label || info.placeholder || info.type);
      }

      return info;
    }
  }, {
    key: "getComponentsPath",
    value: function getComponentsPath(component, parent) {
      // Get path to the component in the parent component.
      var path = 'components';
      var columnIndex = 0;
      var tableRowIndex = 0;
      var tableColumnIndex = 0;
      var tabIndex = 0;

      switch (parent.type) {
        case 'table':
          tableRowIndex = _lodash.default.findIndex(parent.rows, function (row) {
            return row.some(function (column) {
              return column.components.some(function (comp) {
                return comp.key === component.key;
              });
            });
          });
          tableColumnIndex = _lodash.default.findIndex(parent.rows[tableRowIndex], function (column) {
            return column.components.some(function (comp) {
              return comp.key === component.key;
            });
          });
          path = "rows[".concat(tableRowIndex, "][").concat(tableColumnIndex, "].components");
          break;

        case 'columns':
          columnIndex = _lodash.default.findIndex(parent.columns, function (column) {
            return column.components.some(function (comp) {
              return comp.key === component.key;
            });
          });
          path = "columns[".concat(columnIndex, "].components");
          break;

        case 'tabs':
          tabIndex = _lodash.default.findIndex(parent.components, function (tab) {
            return tab.components.some(function (comp) {
              return comp.key === component.key;
            });
          });
          path = "components[".concat(tabIndex, "].components");
          break;
      }

      return path;
    }
    /* eslint-disable max-statements */

  }, {
    key: "onDrop",
    value: function onDrop(element, target, source, sibling) {
      var _this$groups$group,
          _this7 = this;

      if (!target) {
        return;
      } // If you try to drop within itself.


      if (element.contains(target)) {
        return;
      }

      var key = element.getAttribute('data-key');
      var type = element.getAttribute('data-type');
      var group = element.getAttribute('data-group');
      var info, isNew, path, index;

      if (key) {
        // This is a new component.
        info = this.getComponentInfo(key, group);

        if (!info && type) {
          info = this.getComponentInfo(type, group);
        }

        isNew = true;
      } else if (source.formioContainer) {
        index = _lodash.default.findIndex(source.formioContainer, {
          key: element.formioComponent.component.key
        });

        if (index !== -1) {
          // Grab and remove the component from the source container.
          info = source.formioContainer.splice(_lodash.default.findIndex(source.formioContainer, {
            key: element.formioComponent.component.key
          }), 1); // Since splice returns an array of one object, we need to destructure it.

          info = info[0];
        }
      } // If we haven't found the component, stop.


      if (!info) {
        return;
      } // Show an error if siblings are disabled for a component and such a component already exists.


      var draggableComponent = ((_this$groups$group = this.groups[group]) === null || _this$groups$group === void 0 ? void 0 : _this$groups$group.components[key]) || {};

      if (draggableComponent.disableSiblings) {
        var isCompAlreadyExists = false;
        (0, _formUtils.eachComponent)(this.webform.components, function (component) {
          if (component.key === draggableComponent.key) {
            isCompAlreadyExists = true;
            return;
          }
        }, true);

        if (isCompAlreadyExists) {
          this.webform.redraw();
          this.webform.setAlert('danger', "You cannot add more than one ".concat(draggableComponent.key, " component to one page."));
          return;
        }
      }

      if (target !== source) {
        // Ensure the key remains unique in its new container.
        _builder.default.uniquify(this.findNamespaceRoot(target.formioComponent.component), info);
      }

      var parent = target.formioComponent; // Insert in the new container.

      if (target.formioContainer) {
        if (sibling) {
          if (!sibling.getAttribute('data-noattach')) {
            index = _lodash.default.findIndex(target.formioContainer, {
              key: _lodash.default.get(sibling, 'formioComponent.component.key')
            });
            index = index === -1 ? 0 : index;
          } else {
            index = sibling.getAttribute('data-position');
          }

          if (index !== -1) {
            target.formioContainer.splice(index, 0, info);
          }
        } else {
          target.formioContainer.push(info);
        }

        path = this.getComponentsPath(info, parent.component);
        index = _lodash.default.findIndex(_lodash.default.get(parent.schema, path), {
          key: info.key
        });

        if (index === -1) {
          index = 0;
        }
      }

      if (parent && parent.addChildComponent) {
        parent.addChildComponent(info, element, target, source, sibling);
      }

      if (isNew && !this.options.noNewEdit && !info.noNewEdit) {
        this.editComponent(info, target, isNew);
      } // Only rebuild the parts needing to be rebuilt.


      var rebuild;

      if (target !== source) {
        if (source.formioContainer && source.contains(target)) {
          rebuild = source.formioComponent.rebuild();
        } else if (target.contains(source)) {
          rebuild = target.formioComponent.rebuild();
        } else {
          if (source.formioContainer) {
            rebuild = source.formioComponent.rebuild();
          }

          rebuild = target.formioComponent.rebuild();
        }
      } else {
        // If they are the same, only rebuild one.
        rebuild = target.formioComponent.rebuild();
      }

      if (!rebuild) {
        rebuild = _nativePromiseOnly.default.resolve();
      }

      return rebuild.then(function () {
        _this7.emit('addComponent', info, parent, path, index, isNew && !_this7.options.noNewEdit && !info.noNewEdit);

        if (!isNew || _this7.options.noNewEdit || info.noNewEdit) {
          _this7.emit('change', _this7.form);
        }
      });
    }
  }, {
    key: "setForm",
    value: function setForm(form) {
      var _this8 = this;

      if (!form.components) {
        form.components = [];
      }

      var isShowSubmitButton = !this.options.noDefaultSubmitButton && !form.components.length; // Ensure there is at least a submit button.

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
        var shouldRebuild = !this.webform.form.components || form.components.length !== this.webform.form.components.length;
        return this.webform.setForm(form).then(function () {
          if (_this8.refs.form) {
            _this8.builderHeight = _this8.refs.form.offsetHeight;
          }

          if (!shouldRebuild) {
            return _this8.form;
          }

          return _this8.rebuild().then(function () {
            return _this8.form;
          });
        });
      }

      return _nativePromiseOnly.default.resolve(form);
    }
  }, {
    key: "populateRecaptchaSettings",
    value: function populateRecaptchaSettings(form) {
      //populate isEnabled for recaptcha form settings
      var isRecaptchaEnabled = false;

      if (this.form.components) {
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
    }
  }, {
    key: "removeComponent",
    value: function removeComponent(component, parent, original) {
      var _this9 = this;

      if (!parent) {
        return;
      }

      var remove = true;

      if (!component.skipRemoveConfirm && (Array.isArray(component.components) && component.components.length || Array.isArray(component.rows) && component.rows.length || Array.isArray(component.columns) && component.columns.length)) {
        var message = 'Removing this component will also remove all of its children. Are you sure you want to do this?';
        remove = window.confirm(this.t(message));
      }

      if (!original) {
        original = parent.formioContainer.find(function (comp) {
          return comp.id === component.id;
        });
      }

      var index = parent.formioContainer ? parent.formioContainer.indexOf(original) : 0;

      if (remove && index !== -1) {
        var path = this.getComponentsPath(component, parent.formioComponent.component);

        if (parent.formioContainer) {
          parent.formioContainer.splice(index, 1);
        } else if (parent.formioComponent && parent.formioComponent.removeChildComponent) {
          parent.formioComponent.removeChildComponent(component);
        }

        var rebuild = parent.formioComponent.rebuild() || _nativePromiseOnly.default.resolve();

        rebuild.then(function () {
          _this9.emit('removeComponent', component, parent.formioComponent.schema, path, index);

          _this9.emit('change', _this9.form);
        });
      }

      return remove;
    }
  }, {
    key: "updateComponent",
    value: function updateComponent(component, changed) {
      // Update the preview.
      if (this.preview) {
        this.preview.form = {
          components: [_lodash.default.omit(component, ['hidden', 'conditional', 'calculateValue', 'logic', 'autofocus', 'customConditional'])]
        };
        var previewElement = this.componentEdit.querySelector('[ref="preview"]');

        if (previewElement) {
          this.setContent(previewElement, this.preview.render());
          this.preview.attach(previewElement);
        }
      } // Change the "default value" field to be reflective of this component.


      var defaultValueComponent = (0, _formUtils.getComponent)(this.editForm.components, 'defaultValue');

      if (defaultValueComponent && component.type !== 'hidden') {
        var defaultChanged = changed && (changed.component && changed.component.key === 'defaultValue' || changed.instance && defaultValueComponent.hasComponent && defaultValueComponent.hasComponent(changed.instance));

        if (!defaultChanged) {
          _lodash.default.assign(defaultValueComponent.component, _lodash.default.omit(component, ['key', 'label', 'placeholder', 'tooltip', 'hidden', 'autofocus', 'validate', 'disabled', 'defaultValue', 'customDefaultValue', 'calculateValue', 'conditional', 'customConditional']));

          var parentComponent = defaultValueComponent.parent;
          var tabIndex = -1;
          var index = -1;
          parentComponent.tabs.some(function (tab, tIndex) {
            tab.some(function (comp, compIndex) {
              if (comp.id === defaultValueComponent.id) {
                tabIndex = tIndex;
                index = compIndex;
                return true;
              }

              return false;
            });
          });

          if (tabIndex !== -1 && index !== -1) {
            var sibling = parentComponent.tabs[tabIndex][index + 1];
            parentComponent.removeComponent(defaultValueComponent);
            var newComp = parentComponent.addComponent(defaultValueComponent.component, defaultValueComponent.data, sibling);

            _lodash.default.pull(newComp.validators, 'required');

            parentComponent.tabs[tabIndex].splice(index, 1, newComp);

            newComp.checkValidity = function () {
              return true;
            };

            newComp.build(defaultValueComponent.element);
          }
        } else {
          this.preview._data[changed.instance._data.key] = changed.value;
          this.webform._data[changed.instance._data.key] = changed.value;
        }
      } // Called when we update a component.


      this.emit('updateComponent', component);
    }
  }, {
    key: "findRepeatablePaths",
    value: function findRepeatablePaths() {
      var repeatablePaths = [];
      var keys = new Map();
      (0, _formUtils.eachComponent)(this.form.components, function (comp, path) {
        if (!comp.key) {
          return;
        }

        if (keys.has(comp.key)) {
          if (keys.get(comp.key).includes(path)) {
            repeatablePaths.push(path);
          } else {
            keys.set(comp.key, [].concat(_toConsumableArray(keys.get(comp.key)), [path]));
          }
        } else {
          keys.set(comp.key, [path]);
        }
      });
      return repeatablePaths;
    }
  }, {
    key: "highlightInvalidComponents",
    value: function highlightInvalidComponents() {
      var repeatablePaths = this.findRepeatablePaths();
      (0, _formUtils.eachComponent)(this.webform.getComponents(), function (comp, path) {
        if (repeatablePaths.includes(path)) {
          comp.setCustomValidity("API Key is not unique: ".concat(comp.key));
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

  }, {
    key: "saveComponent",
    value: function saveComponent(component, parent, isNew, original) {
      var _this10 = this;

      this.editForm.detach();
      var parentContainer = parent ? parent.formioContainer : this.container;
      var parentComponent = parent ? parent.formioComponent : this;
      this.dialog.close();
      var path = parentContainer ? this.getComponentsPath(component, parentComponent.component) : '';

      if (!original) {
        original = parent.formioContainer.find(function (comp) {
          return comp.id === component.id;
        });
      }

      var index = parentContainer ? parentContainer.indexOf(original) : 0;

      if (index !== -1) {
        var submissionData = this.editForm.submission.data;
        submissionData = submissionData.componentJson || submissionData;
        var comp = null;
        parentComponent.getComponents().forEach(function (component) {
          if (component.component.key === original.key) {
            comp = component;
          }
        });
        var originalComp = comp.component;
        var originalComponentSchema = comp.schema;

        if (parentContainer) {
          parentContainer[index] = submissionData;

          if (comp) {
            comp.component = submissionData;
          }
        } else if (parentComponent && parentComponent.saveChildComponent) {
          parentComponent.saveChildComponent(submissionData);
        }

        var rebuild = parentComponent.rebuild() || _nativePromiseOnly.default.resolve();

        return rebuild.then(function () {
          var schema = parentContainer ? parentContainer[index] : comp ? comp.schema : [];

          _this10.emit('saveComponent', schema, originalComp, parentComponent.schema, path, index, isNew, originalComponentSchema);

          _this10.emit('change', _this10.form);

          _this10.highlightInvalidComponents();
        });
      }

      this.highlightInvalidComponents();
      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "editComponent",
    value: function editComponent(component, parent, isNew, isJsonEdit, original) {
      var _this11 = this;

      if (!component.key) {
        return;
      }

      var saved = false;
      var componentCopy = (0, _utils.fastCloneDeep)(component);
      var ComponentClass = _Components.default.components[componentCopy.type];
      var isCustom = ComponentClass === undefined;
      isJsonEdit = isJsonEdit || isCustom;
      ComponentClass = isCustom ? _Components.default.components.unknown : ComponentClass; // Make sure we only have one dialog open at a time.

      if (this.dialog) {
        this.dialog.close();
        this.highlightInvalidComponents();
      } // This is the render step.


      var editFormOptions = _lodash.default.clone(_lodash.default.get(this, 'options.editForm', {}));

      if (this.editForm) {
        this.editForm.destroy();
      } // Allow editForm overrides per component.


      var overrides = _lodash.default.get(this.options, "editForm.".concat(componentCopy.type), {}); // Pass along the form being edited.


      editFormOptions.editForm = this.form;
      editFormOptions.editComponent = component;
      this.editForm = new _Webform.default(_objectSpread(_objectSpread({}, _lodash.default.omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'skipInit'])), {}, {
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
      } : ComponentClass.editForm(_lodash.default.cloneDeep(overrides));
      var instance = new ComponentClass(componentCopy);
      this.editForm.submission = isJsonEdit ? {
        data: {
          componentJson: instance.component
        }
      } : {
        data: instance.component
      };

      if (this.preview) {
        this.preview.destroy();
      }

      if (!ComponentClass.builderInfo.hasOwnProperty('preview') || ComponentClass.builderInfo.preview) {
        this.preview = new _Webform.default(_lodash.default.omit(_objectSpread(_objectSpread({}, this.options), {}, {
          preview: true
        }), ['hooks', 'builder', 'events', 'attachMode', 'calculateValue']));
      }

      this.componentEdit = this.ce('div', {
        'class': 'component-edit-container'
      });
      this.setContent(this.componentEdit, this.renderTemplate('builderEditForm', {
        componentInfo: ComponentClass.builderInfo,
        editForm: this.editForm.render(),
        preview: this.preview ? this.preview.render() : false,
        helplinks: this.helplinks
      }));
      this.dialog = this.createModal(this.componentEdit, _lodash.default.get(this.options, 'dialogAttr', {})); // This is the attach step.

      this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));
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
                _this11.editForm.everyComponent(function (component) {
                  if (component.key === 'key' && component.parent.component.key === 'tabs') {
                    component.setValue(_lodash.default.camelCase(event.data.title || event.data.label || event.data.placeholder || event.data.type).replace(/^[0-9]*/, ''));
                    return false;
                  }
                });
              }

              if (_this11.form) {
                var formComponents = _this11.findNamespaceRoot(parent.formioComponent.component); // excluding component which key uniqueness is to be checked to prevent the comparing of the same keys


                formComponents = formComponents.filter(function (comp) {
                  return editFormOptions.editComponent.id !== comp.id;
                }); // Set a unique key for this component.

                _builder.default.uniquify(formComponents, event.data);
              }
            }
          } // Update the component.


          _this11.updateComponent(event.data.componentJson || event.data, event.changed);
        }
      });
      this.addEventListener(this.componentEdit.querySelector('[ref="cancelButton"]'), 'click', function (event) {
        event.preventDefault();

        _this11.editForm.detach();

        _this11.emit('cancelComponent', component);

        _this11.dialog.close();

        _this11.highlightInvalidComponents();
      });
      this.addEventListener(this.componentEdit.querySelector('[ref="removeButton"]'), 'click', function (event) {
        event.preventDefault(); // Since we are already removing the component, don't trigger another remove.

        saved = true;

        _this11.editForm.detach();

        _this11.removeComponent(component, parent, original);

        _this11.dialog.close();

        _this11.highlightInvalidComponents();
      });
      this.addEventListener(this.componentEdit.querySelector('[ref="saveButton"]'), 'click', function (event) {
        event.preventDefault();

        if (!_this11.editForm.checkValidity(_this11.editForm.data, true, _this11.editForm.data)) {
          _this11.editForm.setPristine(false);

          _this11.editForm.showErrors();

          return false;
        }

        saved = true;

        _this11.saveComponent(component, parent, isNew, original);
      });

      var dialogClose = function dialogClose() {
        _this11.editForm.destroy(true);

        if (_this11.preview) {
          _this11.preview.destroy(true);

          _this11.preview = null;
        }

        if (isNew && !saved) {
          _this11.removeComponent(component, parent, original);

          _this11.highlightInvalidComponents();
        } // Clean up.


        _this11.removeEventListener(_this11.dialog, 'close', dialogClose);

        _this11.dialog = null;
      };

      this.addEventListener(this.dialog, 'close', dialogClose); // Called when we edit a component.

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
      window.sessionStorage.setItem('formio.clipboard', JSON.stringify(component.schema));
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

          var path = '';
          var index = 0;

          if (parent.formioContainer) {
            index = parent.formioContainer.indexOf(component.component);
            path = this.getComponentsPath(schema, parent.formioComponent.component);
            parent.formioContainer.splice(index + 1, 0, schema);
          } else if (parent.formioComponent && parent.formioComponent.saveChildComponent) {
            parent.formioComponent.saveChildComponent(schema, false);
          }

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
      } while (container && !container.formioComponent);

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

      this.fieldsList.components[component.key] = component;
      return component;
    }
  }, {
    key: "init",
    value: function init() {
      if (this.webform) {
        this.webform.init();
      }

      return _get(_getPrototypeOf(WebformBuilder.prototype), "init", this).call(this);
    }
  }, {
    key: "clear",
    value: function clear() {
      if (this.webform.initialized) {
        this.webform.clear();
      }
    }
  }, {
    key: "destroy",
    value: function destroy(deleteFromGlobal) {
      if (this.webform.initialized) {
        this.webform.destroy(deleteFromGlobal);
      }

      _get(_getPrototypeOf(WebformBuilder.prototype), "destroy", this).call(this, deleteFromGlobal);
    }
  }, {
    key: "addBuilderGroup",
    value: function addBuilderGroup(name, group) {
      if (!this.groups[name]) {
        this.groups[name] = group;
        this.groupOrder.push(name);
        this.triggerRedraw();
      } else {
        this.updateBuilderGroup(name, group);
      }
    }
  }, {
    key: "updateBuilderGroup",
    value: function updateBuilderGroup(name, group) {
      if (this.groups[name]) {
        this.groups[name] = group;
        this.triggerRedraw();
      }
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
      this.setForm(value);
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