'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectComponent = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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

var _remove2 = require('lodash/remove');

var _remove3 = _interopRequireDefault(_remove2);

var _get3 = require('lodash/get');

var _get4 = _interopRequireDefault(_get3);

var _debounce2 = require('lodash/debounce');

var _debounce3 = _interopRequireDefault(_debounce2);

var _isEmpty2 = require('lodash/isEmpty');

var _isEmpty3 = _interopRequireDefault(_isEmpty2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

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
      if (info.attr.placeholder) {
        delete info.attr.placeholder;
      }
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
      return this.component.template ? this.interpolate(this.component.template, { item: data }) : data.label;
    }
  }, {
    key: 'itemValue',
    value: function itemValue(data) {
      return this.component.valueProperty ? (0, _get4.default)(data, this.component.valueProperty) : data;
    }
  }, {
    key: 'setItems',
    value: function setItems(items) {
      var _this2 = this;

      if (!this.choices) {
        return;
      }

      // If the items is a string, then parse as JSON.
      if (typeof items == 'string') {
        try {
          items = JSON.parse(items);
        } catch (err) {
          console.warn(err.message);
          items = [];
        }
      }

      this.choices._clearChoices();

      // If they provided select values, then we need to get them instead.
      if (this.component.selectValues) {
        items = (0, _get4.default)(items, this.component.selectValues);
      }

      // Add the currently selected choices if they don't already exist.
      var currentChoices = (0, _isArray3.default)(this.value) ? this.value : [this.value];
      (0, _each3.default)(currentChoices, function (choice) {
        _this2.addCurrentChoices(choice, items);
      });

      // Iterate through each of the items.
      (0, _each3.default)(items, function (item) {

        // Add the choice to the select list.
        _this2.choices._addChoice(_this2.itemValue(item), _this2.itemTemplate(item));
      });

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
    value: function loadItems(url, search, headers, options) {
      var _this3 = this;

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
        query[this.component.searchField] = search;
      }

      // Add filter capability
      if (this.component.filter) {
        var filter = this.interpolate(this.component.filter, { data: this.data });
        url += (url.indexOf('?') === -1 ? '?' : '&') + filter;
      }

      // If they wish to return only some fields.
      if (this.component.selectFields) {
        query.select = this.component.selectFields;
      }

      if (!(0, _isEmpty3.default)(query)) {
        // Add the query string.
        url += '?' + _formio2.default.serialize(query);
      }

      // Make the request.
      options.header = headers;
      _formio2.default.makeRequest(this.options.formio, 'select', url, method, body, options).then(function (response) {
        return _this3.setItems(response);
      }).catch(function (err) {
        _this3.events.emit('formio.error', err);
        console.warn('Unable to load resources for ' + _this3.component.key);
      });
    }

    /**
     * Get the request headers for this select dropdown.
     */

  }, {
    key: 'updateItems',
    value: function updateItems(searchInput) {
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
        case 'resource':
          var resourceUrl = this.options.formio ? this.options.formio.formsUrl : _formio2.default.getProjectUrl() + '/form';
          resourceUrl += '/' + this.component.data.resource + '/submission';

          try {
            this.loadItems(resourceUrl, searchInput, this.requestHeaders);
          } catch (err) {
            console.warn('Unable to load resources for ' + this.component.key);
          }
          break;
        case 'url':
          var url = this.component.data.url;
          var _method = void 0;
          var _body = void 0;

          if (url.substr(0, 1) === '/') {
            url = _formio2.default.getBaseUrl() + this.component.data.url;
          }

          if (!this.component.data.method) {
            _method = 'GET';
          } else {
            _method = this.component.data.method;
            if (_method.toUpperCase() === 'POST') {
              _body = this.component.data.body;
            } else {
              _body = null;
            }
          }
          this.loadItems(url, searchInput, this.requestHeaders, { noToken: true }, _method, _body);
          break;
      }
    }
  }, {
    key: 'addInput',
    value: function addInput(input, container) {
      var _this4 = this;

      _get2(SelectComponent.prototype.__proto__ || Object.getPrototypeOf(SelectComponent.prototype), 'addInput', this).call(this, input, container);
      if (this.component.multiple) {
        input.setAttribute('multiple', true);
      }
      var tabIndex = input.tabIndex;
      this.choices = new _choices2.default(input, {
        removeItemButton: true,
        itemSelectText: '',
        classNames: {
          containerOuter: 'choices form-group formio-choices',
          containerInner: 'form-control'
        },
        shouldSort: false,
        position: this.component.dropdown || 'auto'
      });
      this.choices.itemList.tabIndex = tabIndex;

      // If a search field is provided, then add an event listener to update items on search.
      if (this.component.searchField) {
        input.addEventListener('search', function (event) {
          return _this4.triggerUpdate(event.detail.value);
        });
      }

      // Create a pseudo-placeholder.
      if (this.component.placeholder && !this.choices.placeholderElement) {
        this.placeholder = this.ce('span', {
          class: 'formio-placeholder'
        }, [this.text(this.component.placeholder)]);

        // Prepend the placeholder.
        this.choices.containerInner.insertBefore(this.placeholder, this.choices.containerInner.firstChild);
        input.addEventListener('addItem', function () {
          _this4.placeholder.style.visibility = 'hidden';
        }, false);
        input.addEventListener('removeItem', function () {
          var value = _this4.getValue();
          if (!value || !value.length) {
            _this4.placeholder.style.visibility = 'visible';
          }
        }, false);
      }

      if (this.disabled) {
        this.choices.disable();
      }
      this.triggerUpdate();
    }
  }, {
    key: 'addCurrentChoices',
    value: function addCurrentChoices(value, items) {
      if (value && items.length) {
        var found = false;

        // Iterate through all elements and remove the ones that are found.
        (0, _remove3.default)(items, function (choice) {
          // For resources we may have two different instances of the same resource
          // Unify them so we don't have two copies of the same thing in the dropdown
          // and so the correct resource gets selected in the first place
          if (choice._id && value._id && choice._id === value._id) {
            return true;
          }
          found = (0, _isEqual3.default)(choice, value);
          return found;
        });

        // If it is not found, then add it.
        if (!found) {
          this.choices._addChoice(this.itemValue(value), this.itemTemplate(value));
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
      if (!this.choices) {
        return;
      }
      this.value = this.choices.getValue(true);
      return this.value;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      this.value = value;
      if (this.choices) {
        // Now set the value.
        if (value) {
          this.choices.setValueByChoice((0, _isArray3.default)(value) ? value : [value]);
        } else {
          this.choices.removeActiveItems();
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
      value = (typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object' ? { label: value } : value;
      return this.itemTemplate(value);
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      if (this.choices) {
        this.choices.destroy();
      }
    }
  }, {
    key: 'requestHeaders',
    get: function get() {
      // Create the headers object.
      var headers = new Headers();

      // Add custom headers to the url.
      if (this.component.data && this.component.data.headers) {
        try {
          (0, _each3.default)(this.component.data.headers, function (header) {
            if (header.key) {
              headers.set(header.key, header.value);
            }
          });
        } catch (err) {
          console.warn(err.message);
        }
      }

      return headers;
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