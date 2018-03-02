'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContentComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Base = require('../base/Base');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContentComponent = exports.ContentComponent = function (_BaseComponent) {
  _inherits(ContentComponent, _BaseComponent);

  function ContentComponent() {
    _classCallCheck(this, ContentComponent);

    return _possibleConstructorReturn(this, (ContentComponent.__proto__ || Object.getPrototypeOf(ContentComponent)).apply(this, arguments));
  }

  _createClass(ContentComponent, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      this.element = this.ce('div', {
        id: this.id,
        class: 'form-group ' + this.component.customClass
      });

      this.element.component = this;

      if (this.options.builder) {
        var editorElement = this.ce('div');
        this.addQuill(editorElement, this.wysiwygDefault, function (element) {
          _this2.component.html = element.value;
        }).then(function (editor) {
          editor.clipboard.dangerouslyPasteHTML(_this2.component.html);
        });
        this.element.appendChild(editorElement);
      } else {
        this.element.innerHTML = this.interpolate(this.component.html, { data: this.data });
      }
    }
  }], [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.BaseComponent.schema.apply(_Base.BaseComponent, [{
        type: 'content',
        key: 'content',
        input: false,
        html: ''
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Content',
        group: 'basic',
        icon: 'fa fa-html5',
        documentation: 'http://help.form.io/userguide/#content-component',
        weight: 100,
        schema: ContentComponent.schema()
      };
    }
  }]);

  return ContentComponent;
}(_Base.BaseComponent);