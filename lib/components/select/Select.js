'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get2 = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base = require('../base/Base');

var _choices = require('choices.js');

var _choices2 = _interopRequireDefault(_choices);

var _formio = require('../../formio');

var _formio2 = _interopRequireDefault(_formio);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _get3 = require('lodash/get');

var _get4 = _interopRequireDefault(_get3);

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _cloneDeep2 = require('lodash/cloneDeep');

var _cloneDeep3 = _interopRequireDefault(_cloneDeep2);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SelectComponent = exports.SelectComponent = function (_BaseComponent) {
  _inherits(SelectComponent, _BaseComponent);

  function SelectComponent(component, options, data) {
    _classCallCheck(this, SelectComponent);

    // Trigger an update.
    var _this = _possibleConstructorReturn(this, (SelectComponent.__proto__ || Object.getPrototypeOf(SelectComponent)).call(this, component, options, data));

    _this.triggerUpdate = (0, _debounce3.default)(_this.updateItems.bind(_this), 100);

    // Keep track of the select options.
    _this.selectOptions = [];

    // See if this should use the template.
    _this.useTemplate = _this.component.dataSrc !== 'values' && _this.component.template;

    // If this component has been activated.
    _this.activated = false;

    // If they wish to refresh on a value, then add that here.
    if (_this.component.refreshOn) {
      _this.on('change', function (event) {
        if (_this.component.refreshOn === 'data') {
          _this.refreshItems();
        } else if (event.changed && event.changed.component.key === _this.component.refreshOn) {
          _this.refreshItems();
        }
      });
    }
    return _this;
  }

  _createClass(SelectComponent, [{
    key: 'refreshItems',
    value: function refreshItems() {
      this.triggerUpdate();
      if (this.component.clearOnRefresh) {
        this.setValue(null);
      }
    }
  }, {
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get2(SelectComponent.prototype.__proto__ || Object.getPrototypeOf(SelectComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'select';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: 'createWrapper',
    value: function createWrapper() {
      return false;
    }
  }, {
    key: 'itemTemplate',
    value: function itemTemplate(data) {
      // Perform a fast interpretation if we should not use the template.
      if (data && !this.useTemplate) {
        return this.t(data.label || data);
      }
      if (typeof data === 'string') {
        return this.t(data);
      }
      var template = this.component.template ? this.interpolate(this.component.template, { item: data }) : data.label;
      var label = template.replace(/<\/?[^>]+(>|$)/g, "");
      return template.replace(label, this.t(label));
    }
  }, {
    key: 'itemValue',
    value: function itemValue(data) {
      return this.component.valueProperty && (0, _isObject3.default)(data) ? (0, _get4.default)(data, this.component.valueProperty) : data;
    }
  }, {
    key: 'createInput',
    value: function createInput(container) {
      this.selectContainer = container;
      this.selectInput = _get2(SelectComponent.prototype.__proto__ || Object.getPrototypeOf(SelectComponent.prototype), 'createInput', this).call(this, container);
    }

    /**
     * Adds an option to the select dropdown.
     *
     * @param value
     * @param label
     */

  }, {
    key: 'addOption',
    value: function addOption(value, label, attr) {
      var option = {
        value: value,
        label: label
      };

      this.selectOptions.push(option);
      if (this.choices) {
        return;
      }

      option.element = document.createElement('option');
      if (this.value === option.value) {
        option.element.setAttribute('selected', 'selected');
        option.element.selected = 'selected';
      }
      option.element.innerHTML = label;
      if (attr) {
        (0, _each3.default)(attr, function (value, key) {
          option.element.setAttribute(key, value);
        });
      }
      this.selectInput.appendChild(option.element);
    }
  }, {
    key: 'addValueOptions',
    value: function addValueOptions(items) {
      var _this2 = this;

      items = items || [];
      if (!this.selectOptions.length) {
        if (this.choices) {
          // Add the currently selected choices if they don't already exist.
          var currentChoices = (0, _isArray3.default)(this.value) ? this.value : [this.value];
          (0, _each3.default)(currentChoices, function (choice) {
            _this2.addCurrentChoices(choice, items);
          });
        } else if (!this.component.multiple) {
          this.addPlaceholder(this.selectInput);
        }
      }
    }
  }, {
    key: 'setItems',
    value: function setItems(items) {
      var _this3 = this;

      // If the items is a string, then parse as JSON.
      if (typeof items == 'string') {
        try {
          items = JSON.parse(items);
        } catch (err) {
          console.warn(err.message);
          items = [];
        }
      }

      if (!this.choices && this.selectInput) {
        // Detach from DOM and clear input.
        this.selectContainer.removeChild(this.selectInput);
        this.selectInput.innerHTML = '';
      }

      this.selectOptions = [];

      // If they provided select values, then we need to get them instead.
      if (this.component.selectValues) {
        items = (0, _get4.default)(items, this.component.selectValues);
      }

      // Add the value options.
      this.addValueOptions(items);

      // Iterate through each of the items.
      (0, _each3.default)(items, function (item, index) {
        _this3.addOption(_this3.itemValue(item), _this3.itemTemplate(item));
      });

      if (this.choices) {
        this.choices.setChoices(this.selectOptions, 'value', 'label', true);
      } else {
        // Re-attach select input.
        this.selectContainer.appendChild(this.selectInput);
      }

      // We are no longer loading.
      this.loading = false;

      // If a value is provided, then select it.
      if (this.value) {
        this.setValue(this.value, true);
      } else {
        // If a default value is provided then select it.
        var defaultValue = this.defaultValue;
        if (defaultValue) {
          this.setValue(defaultValue);
        }
      }
    }
  }, {
    key: 'loadItems',
    value: function loadItems(url, search, headers, options, method, body) {
      var _this4 = this;

      options = options || {};

      // Ensure we have a method and remove any body if method is get
      method = method || 'GET';
      if (method.toUpperCase() === 'GET') {
        body = null;
      }

      var query = this.component.dataSrc === 'url' ? {} : {
        limit: 100,
        skip: 0
      };

      // Allow for url interpolation.
      url = this.interpolate(url, {
        data: this.data,
        formioBase: _formio2.default.getBaseUrl()
      });

      // Add search capability.
      if (this.component.searchField && search) {
        if ((0, _isArray3.default)(search)) {
          query[this.component.searchField + '__in'] = search.join(',');
        } else {
          query[this.component.searchField] = search;
        }
      }

      // Add filter capability
      if (this.component.filter) {
        var filter = this.interpolate(this.component.filter, { data: this.data });
        url += (!(url.indexOf('?') !== -1) ? '?' : '&') + filter;
      }

      // If they wish to return only some fields.
      if (this.component.selectFields) {
        query.select = this.component.selectFields;
      }

      if (!(0, _isEmpty3.default)(query)) {
        // Add the query string.
        url += (!(url.indexOf('?') !== -1) ? '?' : '&') + _formio2.default.serialize(query);
      }

      // Make the request.
      options.header = headers;
      this.loading = true;
      _formio2.default.makeRequest(this.options.formio, 'select', url, method, body, options).then(function (response) {
        return _this4.setItems(response);
      }).catch(function (err) {
        _this4.loading = false;
        _this4.events.emit('formio.error', err);
        console.warn('Unable to load resources for ' + _this4.component.key);
      });
    }

    /**
     * Get the request headers for this select dropdown.
     */

  }, {
    key: 'updateCustomItems',
    value: function updateCustomItems() {
      var data = (0, _cloneDeep3.default)(this.data);
      var row = (0, _cloneDeep3.default)(this.row);
      try {
        this.setItems(new Function('data', 'row', 'var values = []; ' + this.component.data.custom.toString() + '; return values;')(data, row));
      } catch (error) {
        this.setItems([]);
      }
    }
  }, {
    key: 'updateItems',
    value: function updateItems(searchInput, forceUpdate) {
      if (!this.component.data) {
        console.warn('Select component ' + this.component.key + ' does not have data configuration.');
        return;
      }

      switch (this.component.dataSrc) {
        case 'values':
          this.component.valueProperty = 'value';
          this.setItems(this.component.data.values);
          break;
        case 'json':
          this.setItems(this.component.data.json);
          break;
        case 'custom':
          this.updateCustomItems();
          break;
        case 'resource':
          if (!forceUpdate && !this.active) {
            // If we are lazyLoading, wait until activated.
            return;
          }
          var resourceUrl = this.options.formio ? this.options.formio.formsUrl : _formio2.default.getProjectUrl() + '/form';
          resourceUrl += '/' + this.component.data.resource + '/submission';

          try {
            this.loadItems(resourceUrl, searchInput, this.requestHeaders);
          } catch (err) {
            console.warn('Unable to load resources for ' + this.component.key);
          }
          break;
        case 'url':
          if (!forceUpdate && !this.active) {
            // If we are lazyLoading, wait until activated.
            return;
          }
          var url = this.component.data.url;
          var method = void 0;
          var body = void 0;

          if (url.substr(0, 1) === '/') {
            url = _formio2.default.getBaseUrl() + this.component.data.url;
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
          this.loadItems(url, searchInput, this.requestHeaders, { noToken: true }, method, body);
          break;
      }
    }
  }, {
    key: 'addPlaceholder',
    value: function addPlaceholder(input) {
      if (!this.component.placeholder) {
        return;
      }
      var placeholder = document.createElement('option');
      placeholder.setAttribute('placeholder', true);
      placeholder.appendChild(this.text(this.component.placeholder));
      input.appendChild(placeholder);
    }

    /**
     * Activate this select control.
     */

  }, {
    key: 'activate',
    value: function activate() {
      if (this.active) {
        return;
      }
      this.activated = true;
      if (this.choices) {
        this.choices.setChoices([{
          value: '',
          label: '<i class="' + this.iconClass('refresh') + '" style="font-size:1.3em;"></i>'
        }], 'value', 'label', true);
      } else {
        this.addOption('', this.t('loading...'));
      }
      this.refreshItems();
    }
  }, {
    key: 'addInput',
    value: function addInput(input, container) {
      var _this5 = this;

      _get2(SelectComponent.prototype.__proto__ || Object.getPrototypeOf(SelectComponent.prototype), 'addInput', this).call(this, input, container);
      if (this.component.multiple) {
        input.setAttribute('multiple', true);
      }

      if (this.component.widget === 'html5') {
        this.triggerUpdate();
        this.addEventListener(input, 'focus', function () {
          return _this5.activate();
        });
        return;
      }

      var placeholderValue = this.t(this.component.placeholder);
      var choicesOptions = {
        removeItemButton: this.component.removeItemButton || this.component.multiple || false,
        itemSelectText: '',
        classNames: {
          containerOuter: 'choices form-group formio-choices',
          containerInner: 'form-control'
        },
        itemComparer: _isEqual3.default,
        placeholder: !!this.component.placeholder,
        placeholderValue: placeholderValue,
        searchPlaceholderValue: placeholderValue,
        shouldSort: false,
        position: this.component.dropdown || 'auto',
        searchEnabled: this.component.searchEnabled || false
      };

      var tabIndex = input.tabIndex;
      this.addPlaceholder(input);
      this.choices = new _choices2.default(input, choicesOptions);
      this.choices.itemList.tabIndex = tabIndex;
      this.setInputStyles(this.choices.containerOuter);

      // If a search field is provided, then add an event listener to update items on search.
      if (this.component.searchField) {
        this.addEventListener(input, 'search', function (event) {
          return _this5.triggerUpdate(event.detail.value);
        });
        this.addEventListener(input, 'stopSearch', function () {
          return _this5.triggerUpdate();
        });
      }

      this.addEventListener(input, 'showDropdown', function () {
        if (_this5.component.dataSrc === 'custom') {
          _this5.updateCustomItems();
        }

        // Activate the control.
        _this5.activate();
      });

      // Force the disabled state with getters and setters.
      this.disabled = this.disabled;
      this.triggerUpdate();
    }
  }, {
    key: 'addCurrentChoices',
    value: function addCurrentChoices(value, items) {
      var _this6 = this;

      if (value) {
        var found = false;
        if (items && items.length) {
          (0, _each3.default)(items, function (choice) {
            if (choice._id && value._id && choice._id === value._id) {
              found = true;
              return false;
            }
            found |= (0, _isEqual3.default)(_this6.itemValue(choice), value);
            return found ? false : true;
          });
        }

        // Add the default option if no item is found.
        if (!found) {
          this.addOption(this.itemValue(value), this.itemTemplate(value));
        }
      }
    }
  }, {
    key: 'getValue',
    value: function getValue(flags) {
      flags = flags || {};
      if (!flags.changed && this.value) {
        return this.value;
      }
      if (this.choices) {
        this.value = this.choices.getValue(true);

        // Make sure we don't get the placeholder
        if (!this.component.multiple && this.component.placeholder && this.value === this.t(this.component.placeholder)) {
          this.value = '';
        }
      } else {
        var values = [];
        (0, _each3.default)(this.selectOptions, function (selectOption) {
          if (selectOption.element.selected) {
            values.push(selectOption.value);
          }
        });
        this.value = this.component.multiple ? values : values.shift();
      }
      return this.value;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      var hasPreviousValue = (0, _isArray3.default)(this.value) ? this.value.length : this.value;
      var hasValue = (0, _isArray3.default)(value) ? value.length : value;
      this.value = value;

      // Do not set the value if we are loading... that will happen after it is done.
      if (this.loading) {
        return;
      }

      // Determine if we need to perform an initial lazyLoad api call if searchField is provided.
      if (this.component.searchField && this.component.lazyLoad && !this.lazyLoadInit && !this.active && !this.selectOptions.length && hasValue) {
        this.loading = true;
        this.lazyLoadInit = true;
        this.triggerUpdate(this.value, true);
        return;
      }

      // Add the value options.
      this.addValueOptions();

      if (this.choices) {
        // Now set the value.
        if (hasValue) {
          this.choices.removeActiveItems().setChoices(this.selectOptions, 'value', 'label', true).setValueByChoice((0, _isArray3.default)(value) ? value : [value]);
        } else if (hasPreviousValue) {
          this.choices.removeActiveItems();
        }
      } else {
        if (hasValue) {
          var values = (0, _isArray3.default)(value) ? value : [value];
          (0, _each3.default)(this.selectOptions, function (selectOption) {
            (0, _each3.default)(values, function (val) {
              if ((0, _isEqual3.default)(val, selectOption.value)) {
                selectOption.element.selected = true;
                selectOption.element.setAttribute('selected', 'selected');
                return false;
              }
            });
          });
        } else {
          (0, _each3.default)(this.selectOptions, function (selectOption) {
            selectOption.element.selected = false;
            selectOption.element.removeAttribute('selected');
          });
        }
      }
      this.updateValue(flags);
    }

    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */

  }, {
    key: 'validateMultiple',
    value: function validateMultiple(value) {
      // Select component will contain one input when flagged as multiple.
      return false;
    }

    /**
     * Ouput this select dropdown as a string value.
     * @return {*}
     */

  }, {
    key: 'asString',
    value: function asString(value) {
      value = value || this.getValue();

      if (this.component.dataSrc === 'values') {
        value = (0, _find3.default)(this.component.data.values, ['value', value]);
      }

      if ((0, _isString3.default)(value)) {
        return value;
      }

      return (0, _isObject3.default)(value) ? this.itemTemplate(value) : '-';
    }
  }, {
    key: 'setupValueElement',
    value: function setupValueElement(element) {
      element.innerHTML = this.asString();
    }
  }, {
    key: 'updateViewOnlyValue',
    value: function updateViewOnlyValue() {
      this.setupValueElement(this.valueElement);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get2(SelectComponent.prototype.__proto__ || Object.getPrototypeOf(SelectComponent.prototype), 'destroy', this).call(this);
      if (this.choices) {
        this.choices.destroyed = true;
        this.choices.destroy();
        this.choices = null;
      }
    }
  }, {
    key: 'requestHeaders',
    get: function get() {
      var _this7 = this;

      // Create the headers object.
      var headers = new Headers();

      // Add custom headers to the url.
      if (this.component.data && this.component.data.headers) {
        try {
          (0, _each3.default)(this.component.data.headers, function (header) {
            if (header.key) {
              headers.set(header.key, _this7.interpolate(header.value, {
                data: _this7.data
              }));
            }
          });
        } catch (err) {
          console.warn(err.message);
        }
      }

      return headers;
    }
  }, {
    key: 'active',
    get: function get() {
      return !this.component.lazyLoad || this.activated;
    }
  }, {
    key: 'disabled',
    set: function set(disabled) {
      _set(SelectComponent.prototype.__proto__ || Object.getPrototypeOf(SelectComponent.prototype), 'disabled', disabled, this);
      if (!this.choices) {
        return;
      }
      if (disabled) {
        this.choices.disable();
      } else {
        this.choices.enable();
      }
    }
  }]);

  return SelectComponent;
}(_Base.BaseComponent);