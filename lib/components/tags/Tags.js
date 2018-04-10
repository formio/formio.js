'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TagsComponent = undefined;

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('../base/Base');

var _choices = require('choices.js');

var _choices2 = _interopRequireDefault(_choices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TagsComponent = exports.TagsComponent = function (_BaseComponent) {
  _inherits(TagsComponent, _BaseComponent);

  _createClass(TagsComponent, null, [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.BaseComponent.schema.apply(_Base.BaseComponent, [{
        type: 'tags',
        label: 'Tags',
        key: 'tags',
        delimeter: ',',
        storeas: 'string',
        maxTags: 0
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Tags',
        icon: 'fa fa-tags',
        group: 'advanced',
        documentation: 'http://help.form.io/userguide/#tags',
        weight: 50,
        schema: TagsComponent.schema()
      };
    }
  }]);

  function TagsComponent(component, options, data) {
    _classCallCheck(this, TagsComponent);

    var _this = _possibleConstructorReturn(this, (TagsComponent.__proto__ || Object.getPrototypeOf(TagsComponent)).call(this, component, options, data));

    _this.component.delimeter = _this.component.delimeter || ',';
    return _this;
  }

  _createClass(TagsComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(TagsComponent.prototype.__proto__ || Object.getPrototypeOf(TagsComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.attr.type = 'text';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: 'addInput',
    value: function addInput(input, container) {
      _get(TagsComponent.prototype.__proto__ || Object.getPrototypeOf(TagsComponent.prototype), 'addInput', this).call(this, input, container);
      if (!input) {
        return;
      }
      this.choices = new _choices2.default(input, {
        delimiter: this.component.delimeter || ',',
        editItems: true,
        maxItemCount: this.component.maxTags,
        removeItemButton: true
      });
      this.choices.itemList.tabIndex = input.tabIndex;
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      if (this.choices) {
        this.choices.removeActiveItems();
        this.choices.setValue(value);
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.choices) {
        var value = this.choices.getValue(true);
        return this.component.storeas === 'string' ? value.join(this.component.delimeter) : value;
      }
      return null;
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      _get(TagsComponent.prototype.__proto__ || Object.getPrototypeOf(TagsComponent.prototype), 'destroy', this).call(this);
      if (this.choices) {
        this.choices.destroyed = true;
        this.choices.destroy();
        this.choices = null;
      }
    }
  }, {
    key: 'defaultSchema',
    get: function get() {
      return TagsComponent.schema();
    }
  }, {
    key: 'disabled',
    set: function set(disabled) {
      _set(TagsComponent.prototype.__proto__ || Object.getPrototypeOf(TagsComponent.prototype), 'disabled', disabled, this);
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

  return TagsComponent;
}(_Base.BaseComponent);