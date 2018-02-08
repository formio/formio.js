'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ColumnComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Components = require('../Components');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnComponent = exports.ColumnComponent = function (_FormioComponents) {
    _inherits(ColumnComponent, _FormioComponents);

    function ColumnComponent() {
        _classCallCheck(this, ColumnComponent);

        return _possibleConstructorReturn(this, (ColumnComponent.__proto__ || Object.getPrototypeOf(ColumnComponent)).apply(this, arguments));
    }

    _createClass(ColumnComponent, [{
        key: 'className',
        get: function get() {
            var comp = this.component;
            var width = ' col-sm-' + (comp.width ? comp.width : 6);
            var offset = ' col-sm-offset-' + (comp.offset ? comp.offset : 0);
            var push = ' col-sm-push-' + (comp.push ? comp.push : 0);
            var pull = ' col-sm-pull-' + (comp.pull ? comp.pull : 0);
            return 'col' + width + offset + push + pull;
        }
    }]);

    return ColumnComponent;
}(_Components.FormioComponents);