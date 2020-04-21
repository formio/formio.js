"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _PDFBuilder = _interopRequireDefault(require("../PDFBuilder"));

var _WebformBuilder = _interopRequireDefault(require("../WebformBuilder"));

var _WizardBuilder = _interopRequireDefault(require("../WizardBuilder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Builders = /*#__PURE__*/function () {
  function Builders() {
    _classCallCheck(this, Builders);
  }

  _createClass(Builders, null, [{
    key: "addBuilder",
    value: function addBuilder(name, builder) {
      Builders.builders[name] = builder;
    }
  }, {
    key: "addBuilders",
    value: function addBuilders(builders) {
      Builders.builders = _lodash.default.merge(Builders.builders, builders);
    }
  }, {
    key: "getBuilder",
    value: function getBuilder(name) {
      return Builders.builders[name];
    }
  }, {
    key: "getBuilders",
    value: function getBuilders() {
      return Builders.builders;
    }
  }]);

  return Builders;
}();

exports.default = Builders;

_defineProperty(Builders, "builders", {
  pdf: _PDFBuilder.default,
  webform: _WebformBuilder.default,
  wizard: _WizardBuilder.default
});