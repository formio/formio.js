"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("./index"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Templates = /*#__PURE__*/function () {
  function Templates() {
    _classCallCheck(this, Templates);
  }

  _createClass(Templates, null, [{
    key: "addTemplate",
    value: function addTemplate(name, template) {
      Templates.templates[name] = template;
    }
  }, {
    key: "extendTemplate",
    value: function extendTemplate(name, template) {
      Templates.templates[name] = _lodash.default.merge({}, Templates.templates[name], template);
    }
  }, {
    key: "setTemplate",
    value: function setTemplate(name, template) {
      Templates.addTemplate(name, template);
    }
  }, {
    key: "templates",
    get: function get() {
      if (!Templates._templates) {
        Templates._templates = _index.default;
      }

      return Templates._templates;
    }
  }, {
    key: "current",
    set: function set(templates) {
      var defaultTemplates = Templates.current;
      Templates._current = _lodash.default.merge({}, defaultTemplates, templates);
    },
    get: function get() {
      if (Templates._current) {
        return Templates._current;
      }

      return Templates.defaultTemplates;
    }
  }, {
    key: "defaultTemplates",
    get: function get() {
      return Templates.templates.bootstrap;
    }
  }, {
    key: "framework",
    set: function set(framework) {
      if (Templates.templates.hasOwnProperty(framework)) {
        Templates._framework = framework;
        Templates._current = Templates.templates[framework];
      }
    },
    get: function get() {
      return Templates._framework;
    }
  }]);

  return Templates;
}();

exports.default = Templates;