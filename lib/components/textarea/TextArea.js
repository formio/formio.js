'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TextAreaComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _TextField = require('../textfield/TextField');

var _Base = require('../base/Base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals Quill */


var TextAreaComponent = exports.TextAreaComponent = function (_TextFieldComponent) {
  _inherits(TextAreaComponent, _TextFieldComponent);

  function TextAreaComponent(component, options, data) {
    _classCallCheck(this, TextAreaComponent);

    // Never submit on enter for text areas.
    var _this = _possibleConstructorReturn(this, (TextAreaComponent.__proto__ || Object.getPrototypeOf(TextAreaComponent)).call(this, component, options, data));

    _this.options.submitOnEnter = false;
    return _this;
  }

  _createClass(TextAreaComponent, [{
    key: 'wysiwygDefault',
    value: function wysiwygDefault() {
      return {
        theme: 'snow',
        placeholder: this.component.placeholder,
        modules: {
          toolbar: [[{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }], [{ 'font': [] }], ['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }, 'clean'], [{ 'color': [] }, { 'background': [] }], [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }], ['blockquote', 'code-block'], ['link', 'image', 'video', 'formula', 'source']]
        }
      };
    }
  }, {
    key: 'createInput',
    value: function createInput(container) {
      var _this2 = this;

      if (!this.component.wysiwyg) {
        return _get(TextAreaComponent.prototype.__proto__ || Object.getPrototypeOf(TextAreaComponent.prototype), 'createInput', this).call(this, container);
      }

      // Normalize the configurations.
      if (this.component.wysiwyg.toolbarGroups) {
        console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
        this.component.wysiwyg = this.wysiwygDefault();
      }
      if (typeof this.component.wysiwyg === 'boolean') {
        this.component.wysiwyg = this.wysiwygDefault();
      }

      // Add the input.
      this.input = this.ce('div', {
        class: 'formio-wysiwyg-editor'
      });
      container.appendChild(this.input);

      // Lazy load the quill css.
      _Base.BaseComponent.requireLibrary('quill-css-' + this.component.wysiwyg.theme, 'Quill', [{ type: 'styles', src: 'https://cdn.quilljs.com/1.3.5/quill.' + this.component.wysiwyg.theme + '.css' }], true);

      // Lazy load the quill library.
      this.quillReady = _Base.BaseComponent.requireLibrary('quill', 'Quill', 'https://cdn.quilljs.com/1.3.5/quill.min.js', true).then(function () {
        _this2.quill = new Quill(_this2.input, _this2.component.wysiwyg);
        _this2.quill.root.spellcheck = _this2.component.spellcheck;

        /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ **/
        var txtArea = document.createElement('textarea');
        txtArea.setAttribute('class', 'quill-source-code');
        _this2.quill.addContainer('ql-custom').appendChild(txtArea);

        // Allows users to skip toolbar items when tabbing though form
        var elm = document.querySelectorAll('.ql-formats > button');
        for (var i = 0; i < elm.length; i++) {
          elm[i].setAttribute('tabindex', '-1');
        }

        var qlSource = document.querySelector('.ql-source');
        if (qlSource) {
          qlSource.addEventListener('click', function () {
            if (txtArea.style.display === 'inherit') {
              _this2.quill.setContents(_this2.quill.clipboard.convert(txtArea.value));
            }
            txtArea.style.display = txtArea.style.display === 'none' ? 'inherit' : 'none';
          });
        }
        /** END CODEBLOCK **/

        _this2.quill.on('text-change', function () {
          txtArea.value = _this2.quill.root.innerHTML;
          _this2.updateValue();
        });

        if (_this2.options.readOnly || _this2.component.disabled) {
          _this2.quill.disable();
        }

        return _this2.quill;
      });

      return this.input;
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty(value) {
      if (this.quill) {
        return !value || value === '<p><br></p>';
      } else {
        return _get(TextAreaComponent.prototype.__proto__ || Object.getPrototypeOf(TextAreaComponent.prototype), 'isEmpty', this).call(this, value);
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      var _this3 = this;

      if (!this.component.wysiwyg) {
        return _get(TextAreaComponent.prototype.__proto__ || Object.getPrototypeOf(TextAreaComponent.prototype), 'setValue', this).call(this, value, flags);
      }

      this.quillReady.then(function (quill) {
        quill.setContents(quill.clipboard.convert(value));
        _this3.updateValue(flags);
      });
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.viewOnly) {
        return this.dataValue;
      }
      return this.quill ? this.quill.root.innerHTML : _get(TextAreaComponent.prototype.__proto__ || Object.getPrototypeOf(TextAreaComponent.prototype), 'getValue', this).call(this);
    }
  }, {
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(TextAreaComponent.prototype.__proto__ || Object.getPrototypeOf(TextAreaComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'textarea';
      if (this.component.rows) {
        info.attr.rows = this.component.rows;
      }
      return info;
    }
  }, {
    key: 'defaultValue',
    get: function get() {
      var defaultValue = _get(TextAreaComponent.prototype.__proto__ || Object.getPrototypeOf(TextAreaComponent.prototype), 'defaultValue', this);
      if (this.component.wysiwyg && !defaultValue) {
        defaultValue = '<p><br></p>';
      }
      return defaultValue;
    }
  }]);

  return TextAreaComponent;
}(_TextField.TextFieldComponent);