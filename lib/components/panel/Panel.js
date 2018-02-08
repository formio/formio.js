'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Components = require('../Components');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PanelComponent = exports.PanelComponent = function (_FormioComponents) {
  _inherits(PanelComponent, _FormioComponents);

  function PanelComponent() {
    _classCallCheck(this, PanelComponent);

    return _possibleConstructorReturn(this, (PanelComponent.__proto__ || Object.getPrototypeOf(PanelComponent)).apply(this, arguments));
  }

  _createClass(PanelComponent, [{
    key: 'build',
    value: function build() {
      var panelClass = 'card border-' + this.bootstrap4Theme(this.component.theme) + ' ';
      panelClass += 'panel panel-' + this.component.theme + ' ';
      panelClass += this.component.customClass;
      this.element = this.ce('div', {
        class: panelClass
      });
      if (this.component.title) {
        var heading = this.ce('div', {
          class: 'card-header panel-heading'
        });
        var title = this.ce('h3', {
          class: 'card-title panel-title'
        });
        title.appendChild(this.text(this.component.title));
        this.createTooltip(title);
        heading.appendChild(title);
        this.element.appendChild(heading);
      }
      var body = this.ce('div', {
        class: 'card-body panel-body'
      });
      this.addComponents(body);
      this.element.appendChild(body);
    }
  }]);

  return PanelComponent;
}(_Components.FormioComponents);