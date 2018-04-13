'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormioPDFBuilder = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _formioForm = require('./formio.form.builder');

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _formio = require('./formio.pdf');

var _formio2 = _interopRequireDefault(_formio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FormioPDFBuilder = exports.FormioPDFBuilder = function (_FormioFormBuilder) {
  _inherits(FormioPDFBuilder, _FormioFormBuilder);

  function FormioPDFBuilder() {
    _classCallCheck(this, FormioPDFBuilder);

    return _possibleConstructorReturn(this, (FormioPDFBuilder.__proto__ || Object.getPrototypeOf(FormioPDFBuilder)).apply(this, arguments));
  }

  _createClass(FormioPDFBuilder, [{
    key: 'addDropZone',
    value: function addDropZone() {
      var _this2 = this;

      if (this.dropZone) {
        this.removeDropZone();
      }
      var iframeRect = _utils2.default.getElementRect(this.pdfForm.element);
      this.dropZone = this.ce('div', {
        style: 'position:absolute;width: 100%;height:' + iframeRect.height + 'px;'
      });

      this.pdfForm.prepend(this.dropZone);
      this.addEventListener(this.dropZone, 'dragover', function (event) {
        event.preventDefault();
        return false;
      });
      this.addEventListener(this.dropZone, 'drop', function (event) {
        event.preventDefault();
        _this2.dragStop(event);
        return false;
      });
    }
  }, {
    key: 'removeDropZone',
    value: function removeDropZone() {
      if (this.dropZone) {
        this.removeEventListener(this.dropZone, 'dragover');
        this.removeEventListener(this.dropZone, 'drop');
        this.pdfForm.removeChild(this.dropZone);
        this.dropZone = null;
      }
    }
  }, {
    key: 'updateComponent',
    value: function updateComponent(component) {
      _get(FormioPDFBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioPDFBuilder.prototype), 'updateComponent', this).call(this, component);
      this.pdfForm.postMessage({ name: 'updateElement', data: component.component });
    }
  }, {
    key: 'deleteComponent',
    value: function deleteComponent(component) {
      if (_get(FormioPDFBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioPDFBuilder.prototype), 'deleteComponent', this).call(this, component)) {
        this.pdfForm.postMessage({ name: 'removeElement', data: component.component });
      }
    }
  }, {
    key: 'dragStart',
    value: function dragStart(event, component) {
      event.dataTransfer.setData('text/plain', JSON.stringify(component.schema));
      this.addDropZone();
    }
  }, {
    key: 'dragStop',
    value: function dragStop(event, prevX, prevY) {
      event.preventDefault();
      var dropData = event.dataTransfer.getData('text/plain');
      if (!dropData || typeof dropData !== 'string') {
        return false;
      }

      var schema = JSON.parse(dropData);
      if (!schema) {
        return false;
      }

      schema.id = _utils2.default.getRandomComponentId();
      schema.overlay = {
        top: event.offsetY,
        left: event.offsetX,
        width: 100,
        height: 20
      };

      var component = this.addComponent(schema, this.getContainer(), this.data);
      component.isNew = true;
      this.editComponent(component);
      this.pdfForm.postMessage({ name: 'addElement', data: schema });
      this.removeDropZone();
      return false;
    }
  }, {
    key: 'addBuilderComponent',
    value: function addBuilderComponent(component) {
      var _this3 = this;

      var builderComponent = _get(FormioPDFBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioPDFBuilder.prototype), 'addBuilderComponent', this).call(this, component);
      builderComponent.element.draggable = true;
      builderComponent.element.setAttribute('draggable', true);
      this.addEventListener(builderComponent.element, 'dragstart', function (event) {
        return _this3.dragStart(event, component);
      });
    }
  }, {
    key: 'refreshDraggable',
    value: function refreshDraggable() {
      this.addSubmitButton();
      this.builderReadyResolve();
    }
  }, {
    key: 'build',
    value: function build() {
      var _this4 = this;

      this.element.noDrop = true;
      this.pdfForm = new _formio2.default(this.element, this.options);
      this.pdfForm.on('iframe-componentClick', function (schema) {
        return _this4.editComponent(_this4.getComponentById(schema.id));
      });
      this.pdfForm.on('iframe-componentUpdate', function (schema) {
        return _this4.updateComponent(_this4.getComponentById(schema.id));
      });
      this.updateDraggable();
      this.formReadyResolve();
    }
  }, {
    key: 'form',
    set: function set(form) {
      var _this5 = this;

      _set(FormioPDFBuilder.prototype.__proto__ || Object.getPrototypeOf(FormioPDFBuilder.prototype), 'form', form, this);
      this.ready.then(function () {
        _this5.pdfForm.form = form;
      });
    }
  }]);

  return FormioPDFBuilder;
}(_formioForm.FormioFormBuilder);