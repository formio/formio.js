"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Field2 = _interopRequireDefault(require("../field/Field"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var Multivalue =
/*#__PURE__*/
function (_Field) {
  _inherits(Multivalue, _Field);

  function Multivalue() {
    _classCallCheck(this, Multivalue);

    return _possibleConstructorReturn(this, _getPrototypeOf(Multivalue).apply(this, arguments));
  }

  _createClass(Multivalue, [{
    key: "useWrapper",
    value: function useWrapper() {
      return this.component.hasOwnProperty('multiple') && this.component.multiple;
    }
  }, {
    key: "render",
    value: function render() {
      // If single value field.
      if (!this.useWrapper()) {
        return _get(_getPrototypeOf(Multivalue.prototype), "render", this).call(this, "<div ref=\"element\">".concat(this.renderElement(this.dataValue), "</div>"));
      } // If multiple value field.


      return _get(_getPrototypeOf(Multivalue.prototype), "render", this).call(this, this.renderTemplate('multiValueTable', {
        rows: this.dataValue.map(this.renderRow.bind(this)).join(''),
        disabled: this.disabled,
        addAnother: this.addAnother
      }));
    }
  }, {
    key: "renderElement",
    value: function renderElement() {
      return '';
    }
  }, {
    key: "renderRow",
    value: function renderRow(value, index) {
      return this.renderTemplate('multiValueRow', {
        index: index,
        disabled: this.disabled,
        element: "".concat(this.renderElement(value, index))
      });
    }
  }, {
    key: "attach",
    value: function attach(dom) {
      var _this = this;

      var superAttach = _get(_getPrototypeOf(Multivalue.prototype), "attach", this).call(this, dom);

      this.loadRefs(dom, {
        addButton: 'multiple',
        input: 'multiple',
        removeRow: 'multiple',
        mask: 'multiple',
        select: 'multiple'
      });
      this.refs.input.forEach(this.attachElement.bind(this));

      if (!this.component.multiple) {
        return;
      }

      this.refs.removeRow.forEach(function (removeButton, index) {
        _this.addEventListener(removeButton, 'click', function (event) {
          event.preventDefault();

          _this.removeValue(index);
        });
      }); // If single value field.

      this.refs.addButton.forEach(function (addButton) {
        _this.addEventListener(addButton, 'click', function (event) {
          event.preventDefault();

          _this.addValue();
        });
      });
      return superAttach;
    }
    /**
     * Attach inputs to the element.
     *
     * @param element
     * @param index
     */

  }, {
    key: "attachElement",
    value: function attachElement(element, index) {
      var _this2 = this;

      this.addEventListener(element, this.inputInfo.changeEvent, function () {
        // Delay update slightly to give input mask a chance to run.
        var textCase = _lodash.default.get(_this2.component, 'case', 'mixed');

        if (textCase !== 'mixed') {
          var selectionStart = element.selectionStart,
              selectionEnd = element.selectionEnd;

          if (textCase === 'uppercase' && element.value) {
            element.value = element.value.toUpperCase();
          }

          if (textCase === 'lowercase' && element.value) {
            element.value = element.value.toLowerCase();
          }

          element.selectionStart = selectionStart;
          element.selectionEnd = selectionEnd;
        }

        setTimeout(function () {
          return _this2.updateValue(null, {
            modified: true
          }, index);
        }, 1);
      });

      if (!this.tryAttachMultipleMasksInput()) {
        this.setInputMask(this.refs.input[index]);
      }
    }
  }, {
    key: "onSelectMaskHandler",
    value: function onSelectMaskHandler(event) {
      var mask = this.component.inputMasks.find(function (inputMask) {
        return inputMask.label === event.target.value;
      });

      if (mask) {
        this.updateMask(this.refs.mask[0], mask.mask);
      }
    }
  }, {
    key: "tryAttachMultipleMasksInput",
    value: function tryAttachMultipleMasksInput() {
      if (!(this.isMultipleMasksField && this.component.inputMasks.length && this.refs.input.length)) {
        return false;
      }

      this.refs.select[0].onchange = this.onSelectMaskHandler.bind(this);
      var input = this.refs.mask[0];
      var mask = this.activeMask || this.component.inputMasks[0].mask;
      this.activeMask = mask;
      this.setInputMask(input, mask);
      return true;
    }
  }, {
    key: "updateMask",
    value: function updateMask(input, mask) {
      this.activeMask = mask; //destroy previous mask

      if (input.mask) {
        input.mask.destroy();
      } //set new text field mask


      this.setInputMask(input, mask, !this.component.placeholder); //update text field value after new mask is applied

      this.updateValue();
    }
    /**
     * Adds a new empty value to the data array.
     */

  }, {
    key: "addNewValue",
    value: function addNewValue(value) {
      if (value === undefined) {
        value = this.component.defaultValue ? this.component.defaultValue : this.emptyValue; // If default is an empty aray, default back to empty value.

        if (Array.isArray(value) && value.length === 0) {
          value = this.emptyValue;
        }
      }

      var dataValue = this.dataValue || [];

      if (!Array.isArray(dataValue)) {
        dataValue = [dataValue];
      }

      if (Array.isArray(value)) {
        dataValue = dataValue.concat(value);
      } else {
        dataValue.push(value);
      }

      this.dataValue = dataValue;
    }
    /**
     * Adds a new empty value to the data array, and add a new row to contain it.
     */

  }, {
    key: "addValue",
    value: function addValue() {
      this.addNewValue();
      this.redraw();
      this.checkConditions(this.root ? this.root.data : this.data);

      if (!this.isEmpty(this.dataValue)) {
        this.restoreValue();
      }

      if (this.root) {
        this.root.onChange();
      }
    }
  }, {
    key: "dataValue",
    get: function get() {
      var parent = _get(_getPrototypeOf(Multivalue.prototype), "dataValue", this);

      if (!parent && this.component.multiple) {
        return [];
      }

      return parent;
    },
    set: function set(value) {
      _set(_getPrototypeOf(Multivalue.prototype), "dataValue", value, this, true);
    }
  }, {
    key: "defaultValue",
    get: function get() {
      if (this.component.multiple) {
        return [_get(_getPrototypeOf(Multivalue.prototype), "defaultValue", this)];
      }

      return _get(_getPrototypeOf(Multivalue.prototype), "defaultValue", this);
    }
  }, {
    key: "addAnother",
    get: function get() {
      return this.t(this.component.addAnother || ' Add Another');
    }
  }]);

  return Multivalue;
}(_Field2.default);

exports.default = Multivalue;