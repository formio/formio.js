"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.starts-with");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ChoicesWrapper = _interopRequireDefault(require("../../utils/ChoicesWrapper"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _Form = _interopRequireDefault(require("../../Form"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SelectComponent =
/*#__PURE__*/
function (_Field) {
  _inherits(SelectComponent, _Field);

  function SelectComponent() {
    _classCallCheck(this, SelectComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(SelectComponent).apply(this, arguments));
  }

  _createClass(SelectComponent, [{
    key: "init",
    value: function init() {
      var _this = this;

      _get(_getPrototypeOf(SelectComponent.prototype), "init", this).call(this); // Trigger an update.


      this.triggerUpdate = _lodash.default.debounce(this.updateItems.bind(this), 100); // Keep track of the select options.

      this.selectOptions = [];

      if (this.isInfiniteScrollProvided) {
        this.isFromSearch = false;
        this.searchServerCount = null;
        this.defaultServerCount = null;
        this.isScrollLoading = false;
        this.searchDownloadedResources = [];
        this.defaultDownloadedResources = [];
      } // If this component has been activated.


      this.activated = false; // Determine when the items have been loaded.

      this.itemsLoaded = new _nativePromiseOnly.default(function (resolve) {
        _this.itemsLoadedResolve = resolve;
      });
    }
  }, {
    key: "itemTemplate",
    value: function itemTemplate(data) {
      if (!data) {
        return '';
      } // If they wish to show the value in read only mode, then just return the itemValue here.


      if (this.options.readOnly && this.component.readOnlyValue) {
        return this.itemValue(data);
      } // Perform a fast interpretation if we should not use the template.


      if (data && !this.component.template) {
        var itemLabel = data.label || data;
        return typeof itemLabel === 'string' ? this.t(itemLabel) : itemLabel;
      }

      if (typeof data === 'string') {
        return this.t(data);
      }

      var template = this.component.template ? this.interpolate(this.component.template, {
        item: data
      }) : data.label;

      if (template) {
        var label = template.replace(/<\/?[^>]+(>|$)/g, '');
        return template.replace(label, this.t(label));
      } else {
        return JSON.stringify(data);
      }
    }
    /**
     * @param {*} data
     * @param {boolean} [forceUseValue=false] - if true, return 'value' property of the data
     * @return {*}
     */

  }, {
    key: "itemValue",
    value: function itemValue(data) {
      var forceUseValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (_lodash.default.isObject(data)) {
        if (this.valueProperty) {
          return _lodash.default.get(data, this.valueProperty);
        }

        if (forceUseValue) {
          return data.value;
        }
      }

      return data;
    }
    /**
     * Adds an option to the select dropdown.
     *
     * @param value
     * @param label
     */

  }, {
    key: "addOption",
    value: function addOption(value, label) {
      var attrs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var id = arguments.length > 3 ? arguments[3] : undefined;
      var option = {
        value: value,
        label: label
      };

      if (value) {
        this.selectOptions.push(option);
      }

      if (this.refs.selectContainer && this.component.widget === 'html5') {
        // Add element to option so we can reference it later.
        var div = document.createElement('div');
        div.innerHTML = this.sanitize(this.renderTemplate('selectOption', {
          selected: _lodash.default.isEqual(this.dataValue, option.value),
          option: option,
          attrs: attrs,
          id: id,
          useId: this.valueProperty === '' && _lodash.default.isObject(value) && id
        })).trim();
        option.element = div.firstChild;
        this.refs.selectContainer.appendChild(option.element);
      }
    }
  }, {
    key: "addValueOptions",
    value: function addValueOptions(items) {
      items = items || [];

      if (!this.selectOptions.length) {
        if (this.choices) {
          // Add the currently selected choices if they don't already exist.
          var currentChoices = Array.isArray(this.dataValue) ? this.dataValue : [this.dataValue];
          return this.addCurrentChoices(currentChoices, items);
        } else if (!this.component.multiple) {
          this.addPlaceholder();
        }
      }

      return false;
    }
  }, {
    key: "disableInfiniteScroll",
    value: function disableInfiniteScroll() {
      if (!this.downloadedResources) {
        return;
      }

      this.downloadedResources.serverCount = this.downloadedResources.length;
      this.serverCount = this.downloadedResources.length;
    }
    /* eslint-disable max-statements */

  }, {
    key: "setItems",
    value: function setItems(items, fromSearch) {
      var _this2 = this;

      // If the items is a string, then parse as JSON.
      if (typeof items == 'string') {
        try {
          items = JSON.parse(items);
        } catch (err) {
          console.warn(err.message);
          items = [];
        }
      } // Allow js processing (needed for form builder)


      if (this.component.onSetItems && typeof this.component.onSetItems === 'function') {
        var newItems = this.component.onSetItems(this, items);

        if (newItems) {
          items = newItems;
        }
      }

      if (!this.choices && this.refs.selectContainer) {
        if (this.loading) {// this.removeChildFrom(this.refs.input[0], this.selectContainer);
        }

        this.empty(this.refs.selectContainer);
      } // If they provided select values, then we need to get them instead.


      if (this.component.selectValues) {
        items = _lodash.default.get(items, this.component.selectValues, items) || [];
      }

      var areItemsEqual;

      if (this.isInfiniteScrollProvided) {
        areItemsEqual = this.isSelectURL ? _lodash.default.isEqual(items, this.downloadedResources) : false;
        var areItemsEnded = this.component.limit > items.length;
        var areItemsDownloaded = areItemsEqual && this.downloadedResources && this.downloadedResources.length === items.length;

        if (areItemsEnded) {
          this.disableInfiniteScroll();
        } else if (areItemsDownloaded) {
          this.selectOptions = [];
        } else {
          this.serverCount = items.serverCount;
        }
      }

      if (this.isScrollLoading && items) {
        if (!areItemsEqual) {
          this.downloadedResources = this.downloadedResources ? this.downloadedResources.concat(items) : items;
        }

        this.downloadedResources.serverCount = items.serverCount || this.downloadedResources.serverCount;
      } else {
        this.downloadedResources = items || [];
        this.selectOptions = [];
      } // Add the value options.


      if (!fromSearch) {
        this.addValueOptions(items);
      }

      if (this.component.widget === 'html5' && !this.component.placeholder) {
        this.addOption(null, '');
      } // Iterate through each of the items.


      _lodash.default.each(items, function (item, index) {
        _this2.addOption(_this2.itemValue(item), _this2.itemTemplate(item), {}, String(index));
      });

      if (this.choices) {
        this.choices.setChoices(this.selectOptions, 'value', 'label', true);
      } else if (this.loading) {} // Re-attach select input.
      // this.appendTo(this.refs.input[0], this.selectContainer);
      // We are no longer loading.


      this.isScrollLoading = false;
      this.loading = false; // If a value is provided, then select it.

      if (this.dataValue) {
        this.setValue(this.dataValue, {
          noUpdateEvent: true
        });
      } else {
        // If a default value is provided then select it.
        var defaultValue = this.defaultValue;

        if (defaultValue) {
          this.setValue(defaultValue);
        }
      } // Say we are done loading the items.


      this.itemsLoadedResolve();
    }
    /* eslint-enable max-statements */

  }, {
    key: "loadItems",
    value: function loadItems(url, search, headers, options, method, body) {
      var _this3 = this;

      options = options || {}; // See if they have not met the minimum search requirements.

      var minSearch = parseInt(this.component.minSearch, 10);

      if (this.component.searchField && minSearch > 0 && (!search || search.length < minSearch)) {
        // Set empty items.
        return this.setItems([]);
      } // Ensure we have a method and remove any body if method is get


      method = method || 'GET';

      if (method.toUpperCase() === 'GET') {
        body = null;
      }

      var limit = this.component.limit || 100;
      var skip = this.isScrollLoading ? this.selectOptions.length : 0;
      var query = this.component.dataSrc === 'url' ? {} : {
        limit: limit,
        skip: skip
      }; // Allow for url interpolation.

      url = this.interpolate(url, {
        formioBase: _Formio.default.getBaseUrl(),
        search: search,
        limit: limit,
        skip: skip,
        page: Math.abs(Math.floor(skip / limit))
      }); // Add search capability.

      if (this.component.searchField && search) {
        if (Array.isArray(search)) {
          query["".concat(this.component.searchField)] = search.join(',');
        } else {
          query["".concat(this.component.searchField)] = search;
        }
      } // If they wish to return only some fields.


      if (this.component.selectFields) {
        query.select = this.component.selectFields;
      } // Add sort capability


      if (this.component.sort) {
        query.sort = this.component.sort;
      }

      if (!_lodash.default.isEmpty(query)) {
        // Add the query string.
        url += (!url.includes('?') ? '?' : '&') + _Formio.default.serialize(query, function (item) {
          return _this3.interpolate(item);
        });
      } // Add filter capability


      if (this.component.filter) {
        url += (!url.includes('?') ? '?' : '&') + this.interpolate(this.component.filter);
      } // Make the request.


      options.header = headers;
      this.loading = true;

      _Formio.default.makeRequest(this.options.formio, 'select', url, method, body, options).then(function (response) {
        _this3.loading = false;

        _this3.setItems(response, !!search);
      }).catch(function (err) {
        if (_this3.isInfiniteScrollProvided) {
          _this3.setItems([]);

          _this3.disableInfiniteScroll();
        }

        _this3.isScrollLoading = false;
        _this3.loading = false;

        _this3.itemsLoadedResolve();

        _this3.emit('componentError', {
          component: _this3.component,
          message: err.toString()
        });

        console.warn("Unable to load resources for ".concat(_this3.key));
      });
    }
    /**
     * Get the request headers for this select dropdown.
     */

  }, {
    key: "getCustomItems",
    value: function getCustomItems() {
      return this.evaluate(this.component.data.custom, {
        values: []
      }, 'values');
    }
  }, {
    key: "updateCustomItems",
    value: function updateCustomItems() {
      this.setItems(this.getCustomItems() || []);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      if (this.component.lazyLoad) {
        this.activated = false;
        this.loading = true;
        this.setItems([]);
      }

      if (this.component.clearOnRefresh) {
        this.setValue(this.emptyValue);
      }

      this.updateItems(null, true);
    }
  }, {
    key: "updateItems",

    /* eslint-disable max-statements */
    value: function updateItems(searchInput, forceUpdate) {
      var _this4 = this;

      if (!this.component.data) {
        console.warn("Select component ".concat(this.key, " does not have data configuration."));
        this.itemsLoadedResolve();
        return;
      } // Only load the data if it is visible.


      if (!this.checkConditions()) {
        this.itemsLoadedResolve();
        return;
      }

      switch (this.component.dataSrc) {
        case 'values':
          this.setItems(this.component.data.values);
          break;

        case 'json':
          this.setItems(this.component.data.json);
          break;

        case 'custom':
          this.updateCustomItems();
          break;

        case 'resource':
          {
            // If there is no resource, or we are lazyLoading, wait until active.
            if (!this.component.data.resource || !forceUpdate && !this.active) {
              return;
            }

            var resourceUrl = this.options.formio ? this.options.formio.formsUrl : "".concat(_Formio.default.getProjectUrl(), "/form");
            resourceUrl += "/".concat(this.component.data.resource, "/submission");

            if (this.additionalResourcesAvailable) {
              try {
                this.loadItems(resourceUrl, searchInput, this.requestHeaders);
              } catch (err) {
                console.warn("Unable to load resources for ".concat(this.key));
              }
            } else {
              this.setItems(this.downloadedResources);
            }

            break;
          }

        case 'url':
          {
            if (!forceUpdate && !this.active) {
              // If we are lazyLoading, wait until activated.
              return;
            }

            var url = this.component.data.url;
            var method;
            var body;

            if (url.startsWith('/')) {
              var baseUrl = _Formio.default.getProjectUrl() || _Formio.default.getBaseUrl();

              url = baseUrl + url;
            }

            if (!this.component.data.method) {
              method = 'GET';
            } else {
              method = this.component.data.method;

              if (method.toUpperCase() === 'POST') {
                body = this.component.data.body;
              } else {
                body = null;
              }
            }

            var options = this.component.authenticate ? {} : {
              noToken: true
            };
            this.loadItems(url, searchInput, this.requestHeaders, options, method, body);
            break;
          }

        case 'indexeddb':
          {
            if (!window.indexedDB) {
              window.alert("Your browser doesn't support current version of indexedDB");
            }

            if (this.component.indexeddb && this.component.indexeddb.database && this.component.indexeddb.table) {
              var request = window.indexedDB.open(this.component.indexeddb.database);

              request.onupgradeneeded = function (event) {
                if (_this4.component.customOptions) {
                  var db = event.target.result;
                  var objectStore = db.createObjectStore(_this4.component.indexeddb.table, {
                    keyPath: 'myKey',
                    autoIncrement: true
                  });

                  objectStore.transaction.oncomplete = function () {
                    var transaction = db.transaction(_this4.component.indexeddb.table, 'readwrite');

                    _this4.component.customOptions.forEach(function (item) {
                      transaction.objectStore(_this4.component.indexeddb.table).put(item);
                    });
                  };
                }
              };

              request.onerror = function () {
                window.alert(request.errorCode);
              };

              request.onsuccess = function (event) {
                var db = event.target.result;
                var transaction = db.transaction(_this4.component.indexeddb.table, 'readwrite');
                var objectStore = transaction.objectStore(_this4.component.indexeddb.table);
                new _nativePromiseOnly.default(function (resolve) {
                  var responseItems = [];

                  objectStore.getAll().onsuccess = function (event) {
                    event.target.result.forEach(function (item) {
                      responseItems.push(item);
                    });
                    resolve(responseItems);
                  };
                }).then(function (items) {
                  if (!_lodash.default.isEmpty(_this4.component.indexeddb.filter)) {
                    items = _lodash.default.filter(items, _this4.component.indexeddb.filter);
                  }

                  _this4.setItems(items);
                });
              };
            }
          }
      }
    }
    /* eslint-enable max-statements */

  }, {
    key: "addPlaceholder",
    value: function addPlaceholder() {
      if (!this.component.placeholder) {
        return;
      }

      this.addOption('', this.component.placeholder, {
        placeholder: true
      });
    }
    /**
     * Activate this select control.
     */

  }, {
    key: "activate",
    value: function activate() {
      if (this.active) {
        return;
      }

      this.activated = true;

      if (this.choices) {
        this.choices.setChoices([{
          value: '',
          label: "<i class=\"".concat(this.iconClass('refresh'), "\" style=\"font-size:1.3em;\"></i>"),
          disabled: true
        }], 'value', 'label', true);
      } else if (this.component.dataSrc === 'url' || this.component.dataSrc === 'resource') {
        this.addOption('', this.t('loading...'));
      }

      this.triggerUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var info = this.inputInfo;
      info.attr = info.attr || {};
      info.multiple = this.component.multiple;
      return _get(_getPrototypeOf(SelectComponent.prototype), "render", this).call(this, this.wrapElement(this.renderTemplate('select', {
        input: info,
        selectOptions: '',
        index: null
      })));
    }
  }, {
    key: "wrapElement",
    value: function wrapElement(element) {
      return this.component.addResource ? this.renderTemplate('resourceAdd', {
        element: element
      }) : element;
    }
    /* eslint-disable max-statements */

  }, {
    key: "attach",
    value: function attach(element) {
      var _this5 = this;

      var superAttach = _get(_getPrototypeOf(SelectComponent.prototype), "attach", this).call(this, element);

      this.loadRefs(element, {
        selectContainer: 'single',
        addResource: 'single',
        autocompleteInput: 'single'
      }); //enable autocomplete for select

      var autocompleteInput = this.refs.autocompleteInput;

      if (autocompleteInput) {
        this.addEventListener(autocompleteInput, 'change', function (event) {
          _this5.setValue(event.target.value);
        });
      }

      var input = this.refs.selectContainer;

      if (!input) {
        return;
      }

      this.addEventListener(input, this.inputInfo.changeEvent, function () {
        return _this5.updateValue(null, {
          modified: true
        });
      });

      if (this.component.widget === 'html5') {
        this.triggerUpdate();
        this.focusableElement = input;
        this.addEventListener(input, 'focus', function () {
          return _this5.update();
        });
        this.addEventListener(input, 'keydown', function (event) {
          var key = event.key;

          if (['Backspace', 'Delete'].includes(key)) {
            _this5.setValue(_this5.emptyValue);
          }
        });
        return;
      }

      var useSearch = this.component.hasOwnProperty('searchEnabled') ? this.component.searchEnabled : true;
      var placeholderValue = this.t(this.component.placeholder);
      var customOptions = this.component.customOptions || {};

      if (typeof customOptions == 'string') {
        try {
          customOptions = JSON.parse(customOptions);
        } catch (err) {
          console.warn(err.message);
          customOptions = {};
        }
      }

      var choicesOptions = _objectSpread({
        removeItemButton: this.component.disabled ? false : _lodash.default.get(this.component, 'removeItemButton', true),
        itemSelectText: '',
        classNames: {
          containerOuter: 'choices form-group formio-choices',
          containerInner: this.transform('class', 'form-control ui fluid selection dropdown')
        },
        addItemText: false,
        placeholder: !!this.component.placeholder,
        placeholderValue: placeholderValue,
        noResultsText: this.t('No results found'),
        noChoicesText: this.t('No choices to choose from'),
        searchPlaceholderValue: this.t('Type to search'),
        shouldSort: false,
        position: this.component.dropdown || 'auto',
        searchEnabled: useSearch,
        searchChoices: !this.component.searchField,
        searchFields: _lodash.default.get(this, 'component.searchFields', ['label']),
        fuseOptions: Object.assign({
          include: 'score',
          threshold: _lodash.default.get(this, 'component.searchThreshold', 0.3)
        }, _lodash.default.get(this, 'component.fuseOptions', {})),
        itemComparer: _lodash.default.isEqual,
        resetScrollPosition: false
      }, customOptions);

      var tabIndex = input.tabIndex;
      this.addPlaceholder();
      input.setAttribute('dir', this.i18next.dir());
      this.choices = new _ChoicesWrapper.default(input, choicesOptions);

      if (this.component.multiple) {
        this.focusableElement = this.choices.input.element;
      } else {
        this.focusableElement = this.choices.containerInner.element;
        this.choices.containerOuter.element.setAttribute('tabIndex', '-1');

        if (useSearch) {
          this.addEventListener(this.choices.containerOuter.element, 'focus', function () {
            return _this5.focusableElement.focus();
          });
        }
      }

      if (this.isInfiniteScrollProvided) {
        this.scrollList = this.choices.choiceList.element;

        this.onScroll = function () {
          var isLoadingAvailable = !_this5.isScrollLoading && _this5.additionalResourcesAvailable && _this5.scrollList.scrollTop + _this5.scrollList.clientHeight >= _this5.scrollList.scrollHeight;

          if (isLoadingAvailable) {
            _this5.isScrollLoading = true;

            _this5.choices.setChoices([{
              value: "".concat(_this5.id, "-loading"),
              label: 'Loading...',
              disabled: true
            }], 'value', 'label');

            _this5.triggerUpdate(_this5.choices.input.element.value);
          }
        };

        this.scrollList.addEventListener('scroll', this.onScroll);
      }

      this.focusableElement.setAttribute('tabIndex', tabIndex); // If a search field is provided, then add an event listener to update items on search.

      if (this.component.searchField) {
        // Make sure to clear the search when no value is provided.
        if (this.choices && this.choices.input && this.choices.input.element) {
          this.addEventListener(this.choices.input.element, 'input', function (event) {
            _this5.isFromSearch = !!event.target.value;

            if (!event.target.value) {
              _this5.triggerUpdate();
            } else {
              _this5.serverCount = null;
              _this5.downloadedResources = [];
            }
          });
        }

        this.addEventListener(input, 'search', function (event) {
          return _this5.triggerUpdate(event.detail.value);
        });
        this.addEventListener(input, 'stopSearch', function () {
          return _this5.triggerUpdate();
        });
      }

      this.addEventListener(input, 'showDropdown', function () {
        if (_this5.dataValue) {
          _this5.triggerUpdate();
        }

        _this5.update();
      });

      if (placeholderValue && this.choices._isSelectOneElement) {
        this.addEventListener(input, 'removeItem', function () {
          var items = _this5.choices._store.activeItems;

          if (!items.length) {
            _this5.choices._addItem({
              value: placeholderValue,
              label: placeholderValue,
              choiceId: 0,
              groupId: -1,
              customProperties: null,
              placeholder: true,
              keyCode: null
            });
          }
        });
      } // Add value options.


      if (this.addValueOptions()) {
        this.choices.setChoiceByValue(this.dataValue); // this.restoreValue();
      }

      if (this.isSelectResource && this.refs.addResource) {
        this.addEventListener(this.refs.addResource, 'click', function (event) {
          event.preventDefault();

          var formioForm = _this5.ce('div');

          var dialog = _this5.createModal(formioForm);

          var projectUrl = _lodash.default.get(_this5.root, 'formio.projectUrl', _Formio.default.getBaseUrl());

          var formUrl = "".concat(projectUrl, "/form/").concat(_this5.component.data.resource);
          new _Form.default(formioForm, formUrl, {}).ready.then(function (form) {
            form.on('submit', function (submission) {
              if (_this5.component.multiple) {
                submission = [].concat(_toConsumableArray(_this5.dataValue), [submission]);
              }

              _this5.setValue(submission);

              dialog.close();
            });
          });
        });
      } // Force the disabled state with getters and setters.


      this.disabled = this.disabled;
      this.triggerUpdate();
      return superAttach;
    }
    /* eslint-enable max-statements */

  }, {
    key: "update",
    value: function update() {
      if (this.component.dataSrc === 'custom') {
        this.updateCustomItems();
      } // Activate the control.


      this.activate();
    }
  }, {
    key: "addCurrentChoices",

    /**
     * @param {*} value
     * @param {Array} items
     */
    value: function addCurrentChoices(values, items, keyValue) {
      var _this6 = this;

      if (!values) {
        return false;
      }

      var notFoundValuesToAdd = [];
      var added = values.reduce(function (defaultAdded, value) {
        if (!value || _lodash.default.isEmpty(value)) {
          return defaultAdded;
        }

        var found = false; // Make sure that `items` and `this.selectOptions` points
        // to the same reference. Because `this.selectOptions` is
        // internal property and all items are populated by
        // `this.addOption` method, we assume that items has
        // 'label' and 'value' properties. This assumption allows
        // us to read correct value from the item.

        var isSelectOptions = items === _this6.selectOptions;

        if (items && items.length) {
          _lodash.default.each(items, function (choice) {
            if (choice._id && value._id && choice._id === value._id) {
              found = true;
              return false;
            }

            var itemValue = keyValue ? choice.value : _this6.itemValue(choice, isSelectOptions);
            found |= _lodash.default.isEqual(itemValue, value);
            return found ? false : true;
          });
        } // Add the default option if no item is found.


        if (!found) {
          notFoundValuesToAdd.push({
            value: _this6.itemValue(value),
            label: _this6.itemTemplate(value)
          });
          return true;
        }

        return found || defaultAdded;
      }, false);

      if (notFoundValuesToAdd.length) {
        if (this.choices) {
          this.choices.setChoices(notFoundValuesToAdd, 'value', 'label');
        } else {
          notFoundValuesToAdd.map(function (notFoundValue) {
            _this6.addOption(notFoundValue.value, notFoundValue.label);
          });
        }
      }

      return added;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(data) {
      return this.component.multiple && Array.isArray(data) ? data.map(this.asString.bind(this)).join(', ') : this.asString(data);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      // If the widget isn't active.
      if (this.viewOnly || this.loading || !this.selectOptions.length || !this.element) {
        return this.dataValue;
      }

      var value = this.emptyValue;

      if (this.choices) {
        value = this.choices.getValue(true); // Make sure we don't get the placeholder

        if (!this.component.multiple && this.component.placeholder && value === this.t(this.component.placeholder)) {
          value = this.emptyValue;
        }
      } else if (this.refs.selectContainer) {
        value = this.refs.selectContainer.value;

        if (this.valueProperty === '') {
          if (value === '') {
            return {};
          }

          var option = this.selectOptions[value];

          if (option && _lodash.default.isObject(option.value)) {
            value = option.value;
          }
        }
      } else {
        value = this.dataValue;
      } // Choices will return undefined if nothing is selected. We really want '' to be empty.


      if (value === undefined || value === null) {
        value = '';
      }

      return value;
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var done = _get(_getPrototypeOf(SelectComponent.prototype), "redraw", this).call(this);

      this.triggerUpdate();
      return done;
    }
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */

  }, {
    key: "normalizeValue",
    value: function normalizeValue(value) {
      var dataType = _lodash.default.get(this.component, 'dataType', 'auto');

      switch (dataType) {
        case 'auto':
          if (!isNaN(parseFloat(value)) && isFinite(value)) {
            value = +value;
          }

          if (value === 'true') {
            value = true;
          }

          if (value === 'false') {
            value = false;
          }

          break;

        case 'number':
          value = +value;
          break;

        case 'string':
          if (_typeof(value) === 'object') {
            value = JSON.stringify(value);
          } else {
            value = value.toString();
          }

          break;

        case 'boolean':
          value = !!value;
          break;
      }

      return _get(_getPrototypeOf(SelectComponent.prototype), "normalizeValue", this).call(this, value);
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      flags = flags || {};
      var previousValue = this.dataValue;
      var changed = this.updateValue(value, flags);
      value = this.dataValue;
      var hasPreviousValue = Array.isArray(previousValue) ? previousValue.length : previousValue;
      var hasValue = Array.isArray(value) ? value.length : value; // Undo typing when searching to set the value.

      if (this.component.multiple && Array.isArray(value)) {
        value = value.map(function (value) {
          if (typeof value === 'boolean' || typeof value === 'number') {
            return value.toString();
          }

          return value;
        });
      } else {
        if (typeof value === 'boolean' || typeof value === 'number') {
          value = value.toString();
        }
      } // Do not set the value if we are loading... that will happen after it is done.


      if (this.loading) {
        return changed;
      } // Determine if we need to perform an initial lazyLoad api call if searchField is provided.


      if (this.component.searchField && this.component.lazyLoad && !this.lazyLoadInit && !this.active && !this.selectOptions.length && hasValue) {
        this.loading = true;
        this.lazyLoadInit = true;
        this.triggerUpdate(value, true);
        return changed;
      } // Add the value options.


      this.addValueOptions();

      if (this.choices) {
        // Now set the value.
        if (hasValue) {
          this.choices.removeActiveItems(); // Add the currently selected choices if they don't already exist.

          var currentChoices = Array.isArray(value) ? value : [value];

          if (!this.addCurrentChoices(currentChoices, this.selectOptions, true)) {
            this.choices.setChoices(this.selectOptions, 'value', 'label', true);
          }

          this.choices.setChoiceByValue(value);
        } else if (hasPreviousValue) {
          this.choices.removeActiveItems();
        }
      } else {
        if (hasValue) {
          var values = Array.isArray(value) ? value : [value];

          _lodash.default.each(this.selectOptions, function (selectOption) {
            _lodash.default.each(values, function (val) {
              if (_lodash.default.isEqual(val, selectOption.value) && selectOption.element) {
                selectOption.element.selected = true;
                selectOption.element.setAttribute('selected', 'selected');
                return false;
              }
            });
          });
        } else {
          _lodash.default.each(this.selectOptions, function (selectOption) {
            if (selectOption.element) {
              selectOption.element.selected = false;
              selectOption.element.removeAttribute('selected');
            }
          });
        }
      }

      return changed;
    }
    /**
     * Deletes the value of the component.
     */

  }, {
    key: "deleteValue",
    value: function deleteValue() {
      this.setValue('', {
        noUpdateEvent: true
      });

      _lodash.default.unset(this.data, this.key);
    }
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */

  }, {
    key: "validateMultiple",
    value: function validateMultiple() {
      // Select component will contain one input when flagged as multiple.
      return false;
    }
    /**
     * Output this select dropdown as a string value.
     * @return {*}
     */

  }, {
    key: "asString",
    value: function asString(value) {
      var _this7 = this;

      value = value || this.getValue();

      if (['values', 'custom'].includes(this.component.dataSrc)) {
        var _ref = this.component.dataSrc === 'values' ? {
          items: this.component.data.values,
          valueProperty: 'value'
        } : {
          items: this.getCustomItems(),
          valueProperty: this.valueProperty
        },
            items = _ref.items,
            valueProperty = _ref.valueProperty;

        value = this.component.multiple && Array.isArray(value) ? _lodash.default.filter(items, function (item) {
          return value.includes(item.value);
        }) : valueProperty ? _lodash.default.find(items, [valueProperty, value]) : value;
      }

      if (_lodash.default.isString(value)) {
        return value;
      }

      if (Array.isArray(value)) {
        var _items = [];
        value.forEach(function (item) {
          return _items.push(_this7.itemTemplate(item));
        });
        return _items.length > 0 ? _items.join('<br />') : '-';
      }

      return !_lodash.default.isNil(value) ? this.itemTemplate(value) : '-';
    }
  }, {
    key: "detach",
    value: function detach() {
      _get(_getPrototypeOf(SelectComponent.prototype), "detach", this).call(this);

      if (this.choices) {
        this.choices.destroyed = true;
        this.choices.destroy();
        this.choices = null;
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      this.focusableElement.focus();
    }
  }, {
    key: "setCustomValidity",
    value: function setCustomValidity(message, dirty, external) {
      if (message) {
        if (this.refs.messageContainer) {
          this.empty(this.refs.messageContainer);
        }

        this.error = {
          component: this.component,
          message: message,
          external: !!external
        };
        this.emit('componentError', this.error);

        if (this.refs.selectContainer) {
          this.addInputError(message, dirty, [this.refs.selectContainer]);
        }
      } else if (this.error && this.error.external === external) {
        if (this.refs.messageContainer) {
          this.empty(this.refs.messageContainer);
        }

        this.error = null;
        this.removeClass(this.refs.selectContainer, 'is-invalid');
        this.removeClass(this.element, 'alert alert-danger');
        this.removeClass(this.element, 'has-error');
      }
    }
  }, {
    key: "dataReady",
    get: function get() {
      return this.itemsLoaded;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return SelectComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      if (this.valueProperty) {
        return '';
      }

      return {};
    }
  }, {
    key: "valueProperty",
    get: function get() {
      if (this.component.valueProperty) {
        return this.component.valueProperty;
      } // Force values datasource to use values without actually setting it on the component settings.


      if (this.component.dataSrc === 'values') {
        return 'value';
      }

      return '';
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(SelectComponent.prototype), "elementInfo", this).call(this);

      info.type = 'select';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: "isSelectResource",
    get: function get() {
      return this.component.dataSrc === 'resource';
    }
  }, {
    key: "isSelectURL",
    get: function get() {
      return this.component.dataSrc === 'url';
    }
  }, {
    key: "isInfiniteScrollProvided",
    get: function get() {
      return this.isSelectResource || this.isSelectURL;
    }
  }, {
    key: "requestHeaders",
    get: function get() {
      var _this8 = this;

      // Create the headers object.
      var headers = new _Formio.default.Headers(); // Add custom headers to the url.

      if (this.component.data && this.component.data.headers) {
        try {
          _lodash.default.each(this.component.data.headers, function (header) {
            if (header.key) {
              headers.set(header.key, _this8.interpolate(header.value));
            }
          });
        } catch (err) {
          console.warn(err.message);
        }
      }

      return headers;
    }
  }, {
    key: "additionalResourcesAvailable",
    get: function get() {
      return _lodash.default.isNil(this.serverCount) || this.serverCount > this.downloadedResources.length;
    }
  }, {
    key: "serverCount",
    get: function get() {
      if (this.isFromSearch) {
        return this.searchServerCount;
      }

      return this.defaultServerCount;
    },
    set: function set(value) {
      if (this.isFromSearch) {
        this.searchServerCount = value;
      } else {
        this.defaultServerCount = value;
      }
    }
  }, {
    key: "downloadedResources",
    get: function get() {
      if (this.isFromSearch) {
        return this.searchDownloadedResources;
      }

      return this.defaultDownloadedResources;
    },
    set: function set(value) {
      if (this.isFromSearch) {
        this.searchDownloadedResources = value;
      } else {
        this.defaultDownloadedResources = value;
      }
    }
  }, {
    key: "active",
    get: function get() {
      return !this.component.lazyLoad || this.activated || this.options.readOnly;
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      _set(_getPrototypeOf(SelectComponent.prototype), "disabled", disabled, this, true);

      if (!this.choices) {
        return;
      }

      if (disabled) {
        this.setDisabled(this.choices.containerInner.element, true);
        this.focusableElement.removeAttribute('tabIndex');
        this.choices.disable();
      } else {
        this.setDisabled(this.choices.containerInner.element, false);
        this.focusableElement.setAttribute('tabIndex', this.component.tabindex || 0);
        this.choices.enable();
      }
    },
    get: function get() {
      return _get(_getPrototypeOf(SelectComponent.prototype), "disabled", this);
    }
  }, {
    key: "visible",
    set: function set(value) {
      // If we go from hidden to visible, trigger a refresh.
      if (value && !this._visible !== !value) {
        this.triggerUpdate();
      }

      _set(_getPrototypeOf(SelectComponent.prototype), "visible", value, this, true);
    },
    get: function get() {
      return _get(_getPrototypeOf(SelectComponent.prototype), "visible", this);
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2.default.schema.apply(_Field2.default, [{
        type: 'select',
        label: 'Select',
        key: 'select',
        data: {
          values: [],
          json: '',
          url: '',
          resource: '',
          custom: ''
        },
        clearOnRefresh: false,
        limit: 100,
        dataSrc: 'values',
        valueProperty: '',
        lazyLoad: true,
        filter: '',
        searchEnabled: true,
        searchField: '',
        minSearch: 0,
        readOnlyValue: false,
        authenticate: false,
        template: '<span>{{ item.label }}</span>',
        selectFields: '',
        searchThreshold: 0.3,
        tableView: true,
        fuseOptions: {
          include: 'score',
          threshold: 0.3
        },
        customOptions: {}
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Select',
        group: 'basic',
        icon: 'th-list',
        weight: 70,
        documentation: 'http://help.form.io/userguide/#select',
        schema: SelectComponent.schema()
      };
    }
  }]);

  return SelectComponent;
}(_Field2.default);

exports.default = SelectComponent;