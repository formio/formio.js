'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsetComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Components = require('../Components');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldsetComponent = exports.FieldsetComponent = function (_FormioComponents) {
  _inherits(FieldsetComponent, _FormioComponents);

  function FieldsetComponent() {
    _classCallCheck(this, FieldsetComponent);

    return _possibleConstructorReturn(this, (FieldsetComponent.__proto__ || Object.getPrototypeOf(FieldsetComponent)).apply(this, arguments));
  }

  _createClass(FieldsetComponent, [{
    key: 'build',
    value: function build() {
      this.element = this.ce('fieldset', {
        id: this.id,
        class: this.className + ' form-group ' + this.component.customClass
      });
      if (this.component.legend) {
        var legend = this.ce('legend');
        legend.appendChild(this.text(this.component.legend));
        this.createTooltip(legend);
        this.element.appendChild(legend);
      }
      this.addComponents(this.element);
    }
  }]);

  return FieldsetComponent;
}(_Components.FormioComponents);