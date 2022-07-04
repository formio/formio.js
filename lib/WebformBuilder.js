"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.index-of.js");

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.string.match.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.array.some.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.map.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.regexp.flags.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _Webform = _interopRequireDefault(require("./Webform"));

var _Component2 = _interopRequireDefault(require("./components/_classes/component/Component"));

var _tippy = _interopRequireDefault(require("tippy.js"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Components = _interopRequireDefault(require("./components/Components"));

var _Formio = require("./Formio");

var _utils = require("./utils/utils");

var _formUtils = require("./utils/formUtils");

var _builder = _interopRequireDefault(require("./utils/builder"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

require('./components/builder');

var Templates = _Formio.GlobalFormio.Templates;

if (!Templates) {
  Templates = require('./templates/Templates')["default"];
}

var dragula;

if (typeof window !== 'undefined') {
  // Import from "dist" because it would require and "global" would not be defined in Angular apps.
  dragula = require('dragula/dist/dragula');
}

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
    options.display = options.display || 'form';
    _this = _super.call(this, null, options);
    _this.element = element;
    _this.builderHeight = 0;
    _this.schemas = {};
    _this.repeatablePaths = [];
    _this.sideBarScroll = _lodash["default"].get(_this.options, 'sideBarScroll', true);
    _this.sideBarScrollOffset = _lodash["default"].get(_this.options, 'sideBarScrollOffset', 0);
    _this.dragDropEnabled = true; // Setup the builder options.

    _this.builder = _lodash["default"].defaultsDeep({}, _this.options.builder, _this.defaultGroups); // Turn off if explicitely said to do so...

    _lodash["default"].each(_this.defaultGroups, function (config, key) {
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

    for (var type in _Components["default"].components) {
      var component = _Components["default"].components[type];

      if (component.builderInfo && component.builderInfo.schema) {
        _this.schemas[type] = component.builderInfo.schema;
        component.type = type;
        var builderInfo = component.builderInfo;
        builderInfo.key = component.type;

        _this.addBuilderComponentInfo(builderInfo);
      }
    } // Filter out any extra components.
    // Add the components in each group.


    for (var _group in _this.groups) {
      var info = _this.groups[_group];

      for (var key in info.components) {
        var compKey = _group === 'resource' ? "component-".concat(key) : key;
        var comp = info.components[compKey];

        if (comp === true && _Components["default"].components[key] && _Components["default"].components[key].builderInfo) {
          comp = _Components["default"].components[key].builderInfo;
        }

        if (comp && comp.schema) {
          _this.schemas[key] = comp.schema;
          info.components[compKey] = comp;
          info.components[compKey].key = key;
        } else {
          // Do not include this component in the components array.
          delete info.components[compKey];
        }
      } // Order the components.


      _this.orderComponents(info);
    }

    _this.options.hooks = _this.options.hooks || {};

    _this.options.hooks.renderComponent = function (html, _ref) {
      var _self$component;

      var component = _ref.component,
          self = _ref.self;

      if (self.type === 'form' && !self.key) {
        var template = _this.hook('renderComponentFormTemplate', html.replace('formio-component-form', '')); // The main webform shouldn't have this class as it adds extra styles.


        return template;
      }

      if (_this.options.disabled && _this.options.disabled.includes(self.key) || self.parent.noDragDrop) {
        return html;
      }

      return _this.renderTemplate('builderComponent', {
        html: html,
        disableBuilderActions: self === null || self === void 0 ? void 0 : (_self$component = self.component) === null || _self$component === void 0 ? void 0 : _self$component.disableBuilderActions,
        childComponent: component
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

    _this.options.hooks.attachComponent = _this.attachComponent.bind(_assertThisInitialized(_this)); // Load resources tagged as 'builder'

    var query = {
      params: {
        type: 'resource',
        limit: 1000000,
        select: '_id,title,name,components'
      }
    };

    if (_this.options && _this.options.resourceTag) {
      query.params.tags = [_this.options.resourceTag];
    } else if (!_this.options || !_this.options.hasOwnProperty('resourceTag')) {
      query.params.tags = ['builder'];
    }

    var formio = new _Formio.GlobalFormio(_Formio.GlobalFormio.projectUrl);
    var isResourcesDisabled = _this.options.builder && _this.options.builder.resource === false;
    formio.loadProject().then(function (project) {
      if (project && (_lodash["default"].get(project, 'settings.addConfigToForms', false) || _lodash["default"].get(project, 'addConfigToForms', false))) {
        var config = project.config || {};
        _this.options.formConfig = config;
        var pathToFormConfig = 'webform._form.config';

        var webformConfig = _lodash["default"].get(_assertThisInitialized(_this), pathToFormConfig);

        if (_this.webform && !webformConfig) {
          _lodash["default"].set(_assertThisInitialized(_this), pathToFormConfig, config);
        }
      }
    })["catch"](function (err) {
      console.warn("Could not load project settings: ".concat(err.message || err));
    });

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
    _this.pathComponentsMapping = {};
    _this.arrayDataComponentPaths = [];
    _this.nestedDataComponents = [];
    _this.arrayDataComponents = [];
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

      _lodash["default"].each(resources, function (resource, index) {
        var resourceKey = "resource-".concat(resource.name);
        var subgroup = {
          key: resourceKey,
          title: resource.title,
          components: [],
          componentOrder: [],
          "default": index === 0
        };
        (0, _formUtils.eachComponent)(resource.components, function (component) {
          if (component.type === 'button') return;
          if (_this2.options && _this2.options.resourceFilter && (!component.tags || component.tags.indexOf(_this2.options.resourceFilter) === -1)) return;
          var componentName = component.label;

          if (!componentName && component.key) {
            componentName = _lodash["default"].upperFirst(component.key);
          }

          subgroup.componentOrder.push("component-".concat(component.key));
          subgroup.components["component-".concat(component.key)] = _lodash["default"].merge((0, _utils.fastCloneDeep)(_Components["default"].components[component.type] ? _Components["default"].components[component.type].builderInfo : _Components["default"].components['unknown'].builderInfo), {
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
        }, true);

        _this2.groups.resource.subgroups.push(subgroup);
      });

      this.triggerRedraw();
    }
  }, {
    key: "attachTooltip",
    value: function attachTooltip(component, title) {
      return (0, _tippy["default"])(component, {
        allowHTML: true,
        trigger: 'mouseenter focus',
        placement: 'top',
        delay: [200, 0],
        zIndex: 10000,
        content: title
      });
    }
  }, {
    key: "attachComponent",
    value: function attachComponent(element, component) {
      var _this3 = this;

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
        this.attachTooltip(component.refs.copyComponent, this.t('Copy'));
        component.addEventListener(component.refs.copyComponent, 'click', function () {
          return _this3.copyComponent(component);
        });
      }

      if (component.refs.pasteComponent) {
        var pasteToolTip = this.attachTooltip(component.refs.pasteComponent, this.t('Paste below'));
        component.addEventListener(component.refs.pasteComponent, 'click', function () {
          pasteToolTip.hide();

          _this3.pasteComponent(component);
        });
      }

      if (component.refs.moveComponent) {
        this.attachTooltip(component.refs.moveComponent, this.t('Move'));
      }

      var parent = this.getParentElement(element);

      if (component.refs.editComponent) {
        this.attachTooltip(component.refs.editComponent, this.t('Edit'));
        component.addEventListener(component.refs.editComponent, 'click', function () {
          return _this3.editComponent(component.schema, parent, false, false, component.component, {
            inDataGrid: component.isInDataGrid
          });
        });
      }

      if (component.refs.editJson) {
        this.attachTooltip(component.refs.editJson, this.t('Edit JSON'));
        component.addEventListener(component.refs.editJson, 'click', function () {
          return _this3.editComponent(component.schema, parent, false, true, component.component);
        });
      }

      if (component.refs.removeComponent) {
        this.attachTooltip(component.refs.removeComponent, this.t('Remove'));
        component.addEventListener(component.refs.removeComponent, 'click', function () {
          return _this3.removeComponent(component.schema, parent, component.component);
        });
      }

      return element;
    }
  }, {
    key: "createForm",
    value: function createForm(options) {
      this.webform = new _Webform["default"](this.element, options);

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
          "default": true
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
    key: "redraw",
    value: function redraw() {
      return _Webform["default"].prototype.redraw.call(this);
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
    /**
     * When a component sets its api key, we need to check if it is unique within its namespace. Find the namespace root
     * so we can calculate this correctly.
     * @param component
     */

  }, {
    key: "findNamespaceRoot",
    value: function findNamespaceRoot(component) {
      var path = (0, _utils.getArrayFromComponentPath)(component.path); // First get the component with nested parents.

      var comp = this.webform.getComponent(path);
      comp = Array.isArray(comp) ? comp[0] : comp;
      var namespaceKey = this.recurseNamespace(comp); // If there is no key, it is the root form.

      if (!namespaceKey || this.form.key === namespaceKey) {
        return this.form.components;
      }

      var componentSchema = component.component; // If the current component is the namespace, we don't need to find it again.

      if (namespaceKey === component.key) {
        return [].concat(_toConsumableArray(componentSchema.components), [componentSchema]);
      } // Get the namespace component so we have the original object.


      var namespaceComponent = (0, _formUtils.getComponent)(this.form.components, namespaceKey, true);
      return namespaceComponent ? namespaceComponent.components : comp.components;
    }
  }, {
    key: "recurseNamespace",
    value: function recurseNamespace(component) {
      // If there is no parent, we are at the root level.
      if (!component) {
        return null;
      } // Some components are their own namespace.


      if (['address', 'container', 'datagrid', 'editgrid', 'dynamicWizard', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
        return component.key;
      } // Anything else, keep going up.


      return this.recurseNamespace(component.parent);
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return this.renderTemplate('builder', {
        sidebar: this.renderTemplate('builderSidebar', {
          scrollEnabled: this.sideBarScroll,
          groupOrder: this.groupOrder,
          groupId: "builder-sidebar-".concat(this.id),
          groups: this.groupOrder.map(function (groupKey) {
            return _this4.renderTemplate('builderSidebarGroup', {
              group: _this4.groups[groupKey],
              groupKey: groupKey,
              groupId: "builder-sidebar-".concat(_this4.id),
              subgroups: _this4.groups[groupKey].subgroups.map(function (group) {
                return _this4.renderTemplate('builderSidebarGroup', {
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
      var _this5 = this;

      this.on('change', function (form) {
        _this5.populateRecaptchaSettings(form);
      });
      return _get(_getPrototypeOf(WebformBuilder.prototype), "attach", this).call(this, element).then(function () {
        _this5.loadRefs(element, {
          form: 'single',
          sidebar: 'single',
          'sidebar-search': 'single',
          'sidebar-groups': 'single',
          'container': 'multiple',
          'sidebar-anchor': 'multiple',
          'sidebar-group': 'multiple',
          'sidebar-container': 'multiple'
        });

        if (_this5.sideBarScroll && Templates.current.handleBuilderSidebarScroll) {
          Templates.current.handleBuilderSidebarScroll.call(_this5, _this5);
        } // Add the paste status in form


        if (typeof window !== 'undefined' && window.sessionStorage) {
          var data = window.sessionStorage.getItem('formio.clipboard');

          if (data) {
            _this5.addClass(_this5.refs.form, 'builder-paste-mode');
          }
        }

        if (!(0, _utils.bootstrapVersion)(_this5.options)) {
          // Initialize
          _this5.refs['sidebar-group'].forEach(function (group) {
            group.style.display = group.getAttribute('data-default') === 'true' ? 'inherit' : 'none';
          }); // Click event


          _this5.refs['sidebar-anchor'].forEach(function (anchor, index) {
            _this5.addEventListener(anchor, 'click', function () {
              var clickedParentId = anchor.getAttribute('data-parent').slice('#builder-sidebar-'.length);
              var clickedId = anchor.getAttribute('data-target').slice('#group-'.length);

              _this5.refs['sidebar-group'].forEach(function (group, groupIndex) {
                var openByDefault = group.getAttribute('data-default') === 'true';
                var groupId = group.getAttribute('id').slice('group-'.length);
                var groupParent = group.getAttribute('data-parent').slice('#builder-sidebar-'.length);
                group.style.display = openByDefault && groupParent === clickedId || groupId === clickedParentId || groupIndex === index ? 'inherit' : 'none';
              });
            }, true);
          });
        }

        _this5.addEventListener(_this5.refs['sidebar-search'], 'input', _lodash["default"].debounce(function (e) {
          var searchString = e.target.value;

          _this5.searchFields(searchString);
        }, 300));

        if (_this5.dragDropEnabled) {
          _this5.initDragula();
        }

        if (_this5.refs.form) {
          return _this5.webform.attach(_this5.refs.form);
        }
      });
    }
  }, {
    key: "searchFields",
    value: function searchFields() {
      var _this6 = this;

      var searchString = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      var searchValue = searchString.toLowerCase();
      var sidebar = this.refs['sidebar'];
      var sidebarGroups = this.refs['sidebar-groups'];

      if (!sidebar || !sidebarGroups) {
        return;
      }

      var filterGroupBy = function filterGroupBy(group) {
        var searchValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var result = _lodash["default"].toPlainObject(group);

        var _result$subgroups = result.subgroups,
            subgroups = _result$subgroups === void 0 ? [] : _result$subgroups,
            components = result.components;
        var filteredComponents = [];

        for (var key in components) {
          var isMatchedToTitle = components[key].title.toLowerCase().match(searchValue);
          var isMatchedToKey = components[key].key.toLowerCase().match(searchValue);

          if (isMatchedToTitle || isMatchedToKey) {
            filteredComponents.push(components[key]);
          }
        }

        _this6.orderComponents(result, filteredComponents);

        if (searchValue) {
          result["default"] = true;
        }

        if (result.componentOrder.length || subgroups.length) {
          return result;
        }

        return null;
      };

      var filterGroupOrder = function filterGroupOrder(groupOrder, searchValue) {
        var result = _lodash["default"].cloneDeep(groupOrder);

        return result.filter(function (key) {
          return filterGroupBy(_this6.groups[key], searchValue);
        });
      };

      var filterSubgroups = function filterSubgroups(groups, searchValue) {
        var result = _lodash["default"].clone(groups);

        return result.map(function (subgroup) {
          return filterGroupBy(subgroup, searchValue);
        }).filter(function (subgroup) {
          return !_lodash["default"].isNull(subgroup);
        });
      };

      var toTemplate = function toTemplate(groupKey) {
        return {
          group: filterGroupBy(_this6.groups[groupKey], searchValue),
          groupKey: groupKey,
          groupId: sidebar.id || sidebarGroups.id,
          subgroups: filterSubgroups(_this6.groups[groupKey].subgroups, searchValue).map(function (group) {
            return _this6.renderTemplate('builderSidebarGroup', {
              group: group,
              groupKey: group.key,
              groupId: "group-container-".concat(groupKey),
              subgroups: []
            });
          })
        };
      };

      sidebarGroups.innerHTML = filterGroupOrder(this.groupOrder, searchValue).map(function (groupKey) {
        return _this6.renderTemplate('builderSidebarGroup', toTemplate(groupKey));
      }).join('');
      this.loadRefs(this.element, {
        'sidebar-groups': 'single',
        'sidebar-anchor': 'multiple',
        'sidebar-group': 'multiple',
        'sidebar-container': 'multiple'
      });
      this.updateDragAndDrop();

      if (searchValue === '') {
        this.triggerRedraw();
      }
    }
  }, {
    key: "orderComponents",
    value: function orderComponents(groupInfo, foundComponents) {
      var components = foundComponents || groupInfo.components;
      var isResource = groupInfo.key.indexOf('resource-') === 0;

      if (components) {
        groupInfo.componentOrder = Object.keys(components).map(function (key) {
          return components[key];
        }).filter(function (component) {
          return component && !component.ignore && !component.ignoreForForm;
        }).sort(function (a, b) {
          return a.weight - b.weight;
        }).map(function (component) {
          return isResource ? "component-".concat(component.key) : component.key;
        });
      }
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
      var _this7 = this;

      var options = this.options;

      if (this.dragula) {
        this.dragula.destroy();
      }

      var containersArray = Array.prototype.slice.call(this.refs['sidebar-container']).filter(function (item) {
        return item.id !== 'group-container-resource';
      });

      if (!dragula) {
        return;
      }

      this.dragula = dragula(containersArray, {
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
        return _this7.onDrop(element, target, source, sibling);
      });
    }
  }, {
    key: "detach",
    value: function detach() {
      if (this.dragula) {
        this.dragula.destroy();
      }

      this.dragula = null;

      if (this.sideBarScroll && Templates.current.clearBuilderSidebarScroll) {
        Templates.current.clearBuilderSidebarScroll.call(this, this);
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
      } else if (group.slice(0, group.indexOf('-')) === 'resource') {
        // This is an existing resource field.
        var resourceGroups = this.groups.resource.subgroups;

        var resourceGroup = _lodash["default"].find(resourceGroups, {
          key: group
        });

        if (resourceGroup && resourceGroup.components.hasOwnProperty("component-".concat(key))) {
          info = (0, _utils.fastCloneDeep)(resourceGroup.components["component-".concat(key)].schema);
        }
      } else if (group === 'searchFields') {
        //Search components go into this group
        var _resourceGroups = this.groups.resource.subgroups;

        for (var ix = 0; ix < _resourceGroups.length; ix++) {
          var _resourceGroup = _resourceGroups[ix];

          if (_resourceGroup.components.hasOwnProperty("component-".concat(key))) {
            info = (0, _utils.fastCloneDeep)(_resourceGroup.components["component-".concat(key)].schema);
            break;
          }
        }
      }

      if (info) {
        info.key = this.generateKey(info);
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
          tableRowIndex = _lodash["default"].findIndex(parent.rows, function (row) {
            return row.some(function (column) {
              return column.components.some(function (comp) {
                return comp.key === component.key;
              });
            });
          });
          tableColumnIndex = _lodash["default"].findIndex(parent.rows[tableRowIndex], function (column) {
            return column.components.some(function (comp) {
              return comp.key === component.key;
            });
          });
          path = "rows[".concat(tableRowIndex, "][").concat(tableColumnIndex, "].components");
          break;

        case 'columns':
          columnIndex = _lodash["default"].findIndex(parent.columns, function (column) {
            return column.components.some(function (comp) {
              return comp.key === component.key;
            });
          });
          path = "columns[".concat(columnIndex, "].components");
          break;

        case 'tabs':
          tabIndex = _lodash["default"].findIndex(parent.components, function (tab) {
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
          _this8 = this;

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

      if (key && group) {
        // This is a new component.
        info = this.getComponentInfo(key, group);

        if (!info && type) {
          info = this.getComponentInfo(type, group);
        }

        isNew = true;
      } else if (source.formioContainer) {
        index = _lodash["default"].findIndex(source.formioContainer, {
          key: element.formioComponent.component.key
        });

        if (index !== -1) {
          // Grab and remove the component from the source container.
          info = source.formioContainer.splice(_lodash["default"].findIndex(source.formioContainer, {
            key: element.formioComponent.component.key
          }), 1); // Since splice returns an array of one object, we need to destructure it.

          info = info[0];
        }
      } // If we haven't found the component, stop.


      if (!info) {
        return;
      } // Show an error if siblings are disabled for a component and such a component already exists.


      var compKey = group === 'resource' ? "component-".concat(key) : key;
      var draggableComponent = ((_this$groups$group = this.groups[group]) === null || _this$groups$group === void 0 ? void 0 : _this$groups$group.components[compKey]) || {};

      if (draggableComponent.disableSiblings) {
        var isCompAlreadyExists = false;
        (0, _formUtils.eachComponent)(this.webform.components, function (component) {
          if (component.type === draggableComponent.schema.type) {
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
        _builder["default"].uniquify(this.findNamespaceRoot(target.formioComponent), info);
      }

      var parent = target.formioComponent; // Insert in the new container.

      if (target.formioContainer) {
        if (sibling) {
          if (!sibling.getAttribute('data-noattach')) {
            index = _lodash["default"].findIndex(target.formioContainer, {
              key: _lodash["default"].get(sibling, 'formioComponent.component.key')
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
        index = _lodash["default"].findIndex(_lodash["default"].get(parent.schema, path), {
          key: info.key
        });

        if (index === -1) {
          index = 0;
        }
      }

      if (parent && parent.addChildComponent) {
        parent.addChildComponent(info, element, target, source, sibling);
      }

      var componentInDataGrid = parent.type === 'datagrid';

      if (isNew && !this.options.noNewEdit && !info.noNewEdit) {
        this.editComponent(info, target, isNew, null, null, {
          inDataGrid: componentInDataGrid
        });
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
        rebuild = _nativePromiseOnly["default"].resolve();
      }

      return rebuild.then(function () {
        _this8.emit('addComponent', info, parent, path, index, isNew && !_this8.options.noNewEdit && !info.noNewEdit);

        if (!isNew || _this8.options.noNewEdit || info.noNewEdit) {
          _this8.emit('change', _this8.form);
        }
      });
    }
  }, {
    key: "setForm",
    value: function setForm(form) {
      var _this9 = this;

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
        return this.webform.setForm(form, {
          keepAsReference: true
        }).then(function () {
          if (_this9.refs.form) {
            _this9.builderHeight = _this9.refs.form.offsetHeight;
          }

          if (!shouldRebuild) {
            return _this9.form;
          }

          return _this9.rebuild().then(function () {
            return _this9.form;
          });
        });
      }

      return _nativePromiseOnly["default"].resolve(form);
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
          _lodash["default"].set(form, 'settings.recaptcha.isEnabled', true);
        } else if (_lodash["default"].get(form, 'settings.recaptcha.isEnabled')) {
          _lodash["default"].set(form, 'settings.recaptcha.isEnabled', false);
        }
      }
    }
  }, {
    key: "removeComponent",
    value: function removeComponent(component, parent, original) {
      var _this10 = this;

      if (!parent) {
        return;
      }

      var remove = true;
      var removingComponentsGroup = !component.skipRemoveConfirm && (Array.isArray(component.components) && component.components.length || Array.isArray(component.rows) && component.rows.length || Array.isArray(component.columns) && component.columns.length);

      if (this.options.alwaysConfirmComponentRemoval || removingComponentsGroup) {
        var message = removingComponentsGroup ? 'Removing this component will also remove all of its children. Are you sure you want to do this?' : 'Are you sure you want to remove this component?';
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

        var rebuild = parent.formioComponent.rebuild() || _nativePromiseOnly["default"].resolve();

        rebuild.then(function () {
          _this10.emit('removeComponent', component, parent.formioComponent.schema, path, index);

          _this10.emit('change', _this10.form);
        });
      }

      return remove;
    }
  }, {
    key: "replaceDoubleQuotes",
    value: function replaceDoubleQuotes(data) {
      var fieldsToRemoveDoubleQuotes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      if (data) {
        fieldsToRemoveDoubleQuotes.forEach(function (key) {
          if (data[key]) {
            data[key] = data[key].replace(/"/g, "'");
          }
        });
        return data;
      }
    }
  }, {
    key: "updateComponent",
    value: function updateComponent(component, changed) {
      var _this11 = this;

      // Update the preview.
      if (this.preview) {
        this.preview.form = {
          components: [_lodash["default"].omit(_objectSpread({}, component), ['hidden', 'conditional', 'calculateValue', 'logic', 'autofocus', 'customConditional'])],
          config: this.options.formConfig || {}
        };
        var fieldsToRemoveDoubleQuotes = ['label', 'tooltip', 'placeholder'];
        this.preview.form.components.forEach(function (component) {
          return _this11.replaceDoubleQuotes(component, fieldsToRemoveDoubleQuotes);
        });
        var previewElement = this.componentEdit.querySelector('[ref="preview"]');

        if (previewElement) {
          this.setContent(previewElement, this.preview.render());
          this.preview.attach(previewElement);
        }
      } // Change the "default value" field to be reflective of this component.


      var defaultValueComponent = (0, _formUtils.getComponent)(this.editForm.components, 'defaultValue', true);

      if (defaultValueComponent && component.type !== 'hidden') {
        var defaultChanged = changed && (changed.component && changed.component.key === 'defaultValue' || changed.instance && defaultValueComponent.hasComponent && defaultValueComponent.hasComponent(changed.instance));

        if (!defaultChanged) {
          _lodash["default"].assign(defaultValueComponent.component, _lodash["default"].omit(_objectSpread({}, component), ['key', 'label', 'placeholder', 'tooltip', 'hidden', 'autofocus', 'validate', 'disabled', 'defaultValue', 'customDefaultValue', 'calculateValue', 'conditional', 'customConditional', 'id']));

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

          if (tabIndex !== -1 && index !== -1 && changed && changed.value) {
            var sibling = parentComponent.tabs[tabIndex][index + 1];
            parentComponent.removeComponent(defaultValueComponent);
            var newComp = parentComponent.addComponent(defaultValueComponent.component, defaultValueComponent.data, sibling);

            _lodash["default"].pull(newComp.validators, 'required');

            parentComponent.tabs[tabIndex].splice(index, 1, newComp);

            newComp.checkValidity = function () {
              return true;
            };

            newComp.build(defaultValueComponent.element);
          }
        } else {
          var dataPath = changed.instance._data.key;
          var path = (0, _utils.getArrayFromComponentPath)(changed.instance.path);
          path.shift();

          if (path.length) {
            path.unshift(component.key);
            dataPath = (0, _utils.getStringFromComponentPath)(path);
          }

          _lodash["default"].set(this.preview._data, dataPath, changed.value);

          _lodash["default"].set(this.webform._data, dataPath, changed.value);
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
      }, true);
      return repeatablePaths;
    }
  }, {
    key: "highlightInvalidComponents",
    value: function highlightInvalidComponents() {
      var repeatablePaths = this.findRepeatablePaths();
      var hasInvalidComponents = false;
      this.webform.everyComponent(function (comp) {
        var _comp$error, _comp$error$message;

        var path = comp.path;

        if (repeatablePaths.includes(path)) {
          comp.setCustomValidity("API Key is not unique: ".concat(comp.key));
          hasInvalidComponents = true;
        } else if ((_comp$error = comp.error) !== null && _comp$error !== void 0 && (_comp$error$message = _comp$error.message) !== null && _comp$error$message !== void 0 && _comp$error$message.startsWith('API Key is not unique')) {
          comp.setCustomValidity('');
        }
      });
      this.emit('builderFormValidityChange', hasInvalidComponents);
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
      var _this12 = this;

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
        var fieldsToRemoveDoubleQuotes = ['label', 'tooltip', 'placeholder'];
        this.replaceDoubleQuotes(submissionData, fieldsToRemoveDoubleQuotes);
        this.hook('beforeSaveComponentSettings', submissionData);
        var comp = null;
        parentComponent.getComponents().forEach(function (component) {
          if (component.component.key === original.key) {
            comp = component;
          }
        });
        var originalComp = comp.component;
        var originalComponentSchema = comp.schema;
        var isParentSaveChildMethod = this.isParentSaveChildMethod(parent.formioComponent);

        if (parentContainer && !isParentSaveChildMethod) {
          parentContainer[index] = submissionData;

          if (comp) {
            comp.component = submissionData;
          }
        } else if (isParentSaveChildMethod) {
          parent.formioComponent.saveChildComponent(submissionData);
        }

        var rebuild = parentComponent.rebuild() || _nativePromiseOnly["default"].resolve();

        return rebuild.then(function () {
          var schema = parentContainer ? parentContainer[index] : comp ? comp.schema : [];

          _this12.emitSaveComponentEvent(schema, originalComp, parentComponent.schema, path, index, isNew, originalComponentSchema);

          _this12.emit('change', _this12.form);

          _this12.highlightInvalidComponents();
        });
      }

      this.highlightInvalidComponents();
      return _nativePromiseOnly["default"].resolve();
    }
  }, {
    key: "emitSaveComponentEvent",
    value: function emitSaveComponentEvent(schema, originalComp, parentComponentSchema, path, index, isNew, originalComponentSchema) {
      this.emit('saveComponent', schema, originalComp, parentComponentSchema, path, index, isNew, originalComponentSchema);
    }
  }, {
    key: "editComponent",
    value: function editComponent(component, parent, isNew, isJsonEdit, original) {
      var _this13 = this;

      var flags = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

      if (!component.key) {
        return;
      }

      var saved = false;
      var componentCopy = (0, _utils.fastCloneDeep)(component);
      var ComponentClass = _Components["default"].components[componentCopy.type];
      var isCustom = ComponentClass === undefined;
      isJsonEdit = isJsonEdit || isCustom;
      ComponentClass = isCustom ? _Components["default"].components.unknown : ComponentClass; // Make sure we only have one dialog open at a time.

      if (this.dialog) {
        this.dialog.close();
        this.highlightInvalidComponents();
      } // This is the render step.


      var editFormOptions = _lodash["default"].clone(_lodash["default"].get(this, 'options.editForm', {}));

      if (this.editForm) {
        this.editForm.destroy();
      } // Allow editForm overrides per component.


      var overrides = _lodash["default"].get(this.options, "editForm.".concat(componentCopy.type), {}); // Pass along the form being edited.


      editFormOptions.editForm = this.form;
      editFormOptions.editComponent = component;
      editFormOptions.flags = flags;
      this.hook('editComponentParentInstance', editFormOptions, parent);
      this.editForm = new _Webform["default"](_objectSpread(_objectSpread({}, _lodash["default"].omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'skipInit'])), {}, {
        language: this.options.language
      }, editFormOptions));
      this.hook('editFormProperties', parent);
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
        }, {
          type: 'checkbox',
          key: 'showFullSchema',
          label: 'Full Schema'
        }]
      } : ComponentClass.editForm(_lodash["default"].cloneDeep(overrides));
      var instanceOptions = {};
      this.hook('instanceOptionsPreview', instanceOptions);
      var instance = new ComponentClass(componentCopy, instanceOptions);
      var schema = this.hook('builderComponentSchema', component, instance);
      this.editForm.submission = isJsonEdit ? {
        data: {
          componentJson: schema,
          showFullSchema: this.options.showFullJsonSchema
        }
      } : {
        data: instance.component
      };

      if (this.preview) {
        this.preview.destroy();
      }

      if (!ComponentClass.builderInfo.hasOwnProperty('preview') || ComponentClass.builderInfo.preview) {
        this.preview = new _Webform["default"](_lodash["default"].omit(_objectSpread(_objectSpread({}, this.options), {}, {
          preview: true
        }), ['hooks', 'builder', 'events', 'attachMode', 'calculateValue']));
        this.hook('previewFormSettitngs', schema, isJsonEdit);
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
      this.dialog = this.createModal(this.componentEdit, _lodash["default"].get(this.options, 'dialogAttr', {})); // This is the attach step.

      this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));
      this.hook('editFormWrapper');
      this.updateComponent(componentCopy);
      this.editForm.on('change', function (event) {
        if (event.changed) {
          if (event.changed.component && event.changed.component.key === 'showFullSchema') {
            var value = event.changed.value;
            _this13.editForm.submission = {
              data: {
                componentJson: value ? instance.component : component,
                showFullSchema: value
              }
            };
            return;
          } // See if this is a manually modified key. Treat custom component keys as manually modified


          if (event.changed.component && event.changed.component.key === 'key' || isJsonEdit) {
            componentCopy.keyModified = true;
          }

          if (event.changed.component && ['label', 'title'].includes(event.changed.component.key)) {
            // Ensure this component has a key.
            if (isNew) {
              if (!event.data.keyModified) {
                _this13.editForm.everyComponent(function (component) {
                  if (component.key === 'key' && component.parent.component.key === 'tabs') {
                    component.setValue(_this13.updateComponentKey(event.data));
                    return false;
                  }
                });
              }

              if (_this13.form) {
                var formComponents = _this13.findNamespaceRoot(parent.formioComponent); // excluding component which key uniqueness is to be checked to prevent the comparing of the same keys


                formComponents = formComponents.filter(function (comp) {
                  return editFormOptions.editComponent.id !== comp.id;
                }); // Set a unique key for this component.

                _builder["default"].uniquify(formComponents, event.data);
              }
            }
          } // Update the component.


          _this13.updateComponent(event.data.componentJson || event.data, event.changed);
        }
      });
      var cancelButtons = this.componentEdit.querySelectorAll('[ref="cancelButton"]');
      cancelButtons.forEach(function (cancelButton) {
        _this13.addEventListener(cancelButton, 'click', function (event) {
          event.preventDefault();

          _this13.editForm.detach();

          _this13.emit('cancelComponent', component);

          _this13.dialog.close();

          _this13.highlightInvalidComponents();
        });
      });
      var removeButtons = this.componentEdit.querySelectorAll('[ref="removeButton"]');
      removeButtons.forEach(function (removeButton) {
        _this13.addEventListener(removeButton, 'click', function (event) {
          event.preventDefault(); // Since we are already removing the component, don't trigger another remove.

          saved = true;

          _this13.editForm.detach();

          _this13.removeComponent(component, parent, original);

          _this13.dialog.close();

          _this13.highlightInvalidComponents();
        });
      });
      var saveButtons = this.componentEdit.querySelectorAll('[ref="saveButton"]');
      saveButtons.forEach(function (saveButton) {
        _this13.addEventListener(saveButton, 'click', function (event) {
          event.preventDefault();

          if (!_this13.editForm.checkValidity(_this13.editForm.data, true, _this13.editForm.data)) {
            _this13.editForm.setPristine(false);

            _this13.editForm.showErrors();

            return false;
          }

          saved = true;

          _this13.saveComponent(component, parent, isNew, original);
        });
      });

      var dialogClose = function dialogClose() {
        _this13.editForm.destroy(true);

        if (_this13.preview) {
          _this13.preview.destroy(true);

          _this13.preview = null;
        }

        if (isNew && !saved) {
          _this13.removeComponent(component, parent, original);

          _this13.highlightInvalidComponents();
        } // Clean up.


        _this13.removeEventListener(_this13.dialog, 'close', dialogClose);

        _this13.dialog = null;
      };

      this.addEventListener(this.dialog, 'close', dialogClose); // Called when we edit a component.

      this.emit('editComponent', component);
    }
  }, {
    key: "updateComponentKey",
    value: function updateComponentKey(data) {
      return _lodash["default"].camelCase(data.title || data.label || data.placeholder || data.type).replace(/^[0-9]*/, '');
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

          if (parent) {
            _builder["default"].uniquify(this.findNamespaceRoot(parent.formioComponent), schema);

            var path = '';
            var index = 0;
            var isParentSaveChildMethod = this.isParentSaveChildMethod(parent.formioComponent);

            if (parent.formioContainer && !isParentSaveChildMethod) {
              index = parent.formioContainer.indexOf(component.component);
              path = this.getComponentsPath(schema, parent.formioComponent.component);
              parent.formioContainer.splice(index + 1, 0, schema);
            } else if (isParentSaveChildMethod) {
              parent.formioComponent.saveChildComponent(schema, false);
            }

            parent.formioComponent.rebuild();
            this.emitSaveComponentEvent(schema, schema, parent.formioComponent.component, path, index + 1, true, schema);
          }

          this.emit('change', this.form);
        }
      }
    }
  }, {
    key: "isParentSaveChildMethod",
    value: function isParentSaveChildMethod(parentComp) {
      return !!(parentComp && parentComp.saveChildComponent);
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

      component = _lodash["default"].clone(component);
      var groupInfo = this.groups[component.group];

      if (!groupInfo.components.hasOwnProperty(component.key)) {
        groupInfo.components[component.key] = component;
      }

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
    key: "generateKey",
    value: function generateKey(info) {
      return _lodash["default"].camelCase(info.key || info.title || info.label || info.placeholder || info.type);
    }
  }]);

  return WebformBuilder;
}(_Component2["default"]);

exports["default"] = WebformBuilder;