"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.keys");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ComponentModal = /*#__PURE__*/function () {
  _createClass(ComponentModal, null, [{
    key: "render",
    value: function render(component, data, topLevel) {
      var children = component.renderTemplate('component', data, topLevel);
      var isOpened = this;
      return component.renderTemplate('componentModal', _objectSpread(_objectSpread({}, data), {}, {
        children: children,
        isOpened: isOpened
      }));
    }
  }]);

  function ComponentModal(component, element, isOpened, currentValue) {
    _classCallCheck(this, ComponentModal);

    this.isOpened = isOpened;
    this.component = component;
    this.element = element;
    this.currentValue = (0, _utils.fastCloneDeep)(currentValue);
    this.dataLoaded = false;
    this.init();
  }

  _createClass(ComponentModal, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.openModalListener = this.openModalHandler.bind(this);

      this.showDialogListener = function (event) {
        if (_this.isValueChanged() && !_this.component.disabled) {
          _this.showDialog();
        } else {
          _this.closeModalHandler(event);
        }
      };

      this.closeModalListener = this.closeModalHandler.bind(this);
      this.saveModalListener = this.saveModalValueHandler.bind(this);
      this.closeDialogListener = this.closeDialog.bind(this);
      this.saveDialogListener = this.saveDialog.bind(this);
      this.loadRefs();
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (this.dataLoaded) {
        return;
      }

      this.currentValue = (0, _utils.fastCloneDeep)(value);
      this.dataLoaded = true;
      this.updateView();
    }
  }, {
    key: "setOpenModalElement",
    value: function setOpenModalElement(template) {
      this.openModalTemplate = template;
      this.component.setContent(this.refs.openModalWrapper, template);
      this.loadRefs();
      this.setEventListeners();

      if (this.isOpened) {
        this.refs.modalWrapper.classList.add('formio-dialog-disabled-animation');
        this.openModal();
      }
    }
  }, {
    key: "loadRefs",
    value: function loadRefs() {
      this.component.loadRefs(this.element, this.templateRefs);
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      this.component.removeEventListener(this.refs.openModal, 'click', this.openModalListener);
      this.component.removeEventListener(this.refs.modalOverlay, 'click', this.refs.modalSave ? this.showDialogListener : this.saveModalListener);
      this.component.removeEventListener(this.refs.modalClose, 'click', this.closeModalListener);
      this.component.removeEventListener(this.refs.modalSave, 'click', this.saveModalListener);
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      this.removeEventListeners();
      this.component.addEventListener(this.refs.openModal, 'click', this.openModalListener);
      this.component.addEventListener(this.refs.modalOverlay, 'click', this.refs.modalSave ? this.showDialogListener : this.saveModalListener);
      this.component.addEventListener(this.refs.modalClose, 'click', this.closeModalListener);
      this.component.addEventListener(this.refs.modalSave, 'click', this.saveModalListener);
    }
  }, {
    key: "isValueChanged",
    value: function isValueChanged() {
      var componentValue = this.component.getValue();
      var currentValue = this.currentValue; //excluding metadata comparison for components that have it in dataValue (for ex. nested forms)

      if (componentValue && componentValue.data && componentValue.metadata) {
        componentValue = this.component.getValue().data;
        currentValue = this.currentValue.data;
      }

      return !_lodash.default.isEqual(componentValue, currentValue);
    }
  }, {
    key: "setOpenEventListener",
    value: function setOpenEventListener() {
      this.component.removeEventListener(this.refs.openModal, 'click', this.openModalListener);
      this.component.loadRefs(this.element, {
        'openModal': 'single'
      });
      this.component.addEventListener(this.refs.openModal, 'click', this.openModalListener);
    }
  }, {
    key: "openModalHandler",
    value: function openModalHandler(event) {
      event.preventDefault();
      this.openModal();
    }
  }, {
    key: "positionOverElement",
    value: function positionOverElement() {
      // Position the modal just over the element on the page.
      var elementOffset = this.element.getBoundingClientRect().top;
      var modalHeight = this.refs.modalContents.getBoundingClientRect().height;
      var modalTop = elementOffset - modalHeight - 10;
      modalTop = modalTop > 0 ? modalTop : 10;
      this.refs.modalWrapper.style.paddingTop = "".concat(modalTop, "px");
    }
  }, {
    key: "openModal",
    value: function openModal() {
      this.isOpened = true;
      this.refs.modalWrapper.classList.remove('component-rendering-hidden');

      if (this.component.component.type === 'signature') {
        // Position signature modals just above the signature button.
        this.positionOverElement();
      }
    }
  }, {
    key: "updateView",
    value: function updateView() {
      var template = _lodash.default.isEqual(this.currentValue, this.component.defaultValue) ? this.openModalTemplate : this.component.getModalPreviewTemplate();
      this.component.setContent(this.refs.openModalWrapper, template);
      this.setOpenEventListener();
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.refs.modalWrapper.classList.remove('formio-dialog-disabled-animation');
      this.refs.modalWrapper.classList.add('component-rendering-hidden');
      this.isOpened = false;
      this.updateView();
    }
  }, {
    key: "closeModalHandler",
    value: function closeModalHandler(event) {
      event.preventDefault();
      this.closeModal();

      if (!this.component.disabled) {
        this.component.setValue(this.currentValue, {
          resetValue: true
        });
        this.component.redraw();
      }
    }
  }, {
    key: "showDialog",
    value: function showDialog() {
      this.dialogElement = this.component.ce('div');
      var dialogContent = "\n      <h3 ref=\"dialogHeader\">".concat(this.component.t('Do you want to clear changes?'), "</h3>\n      <div style=\"display:flex; justify-content: flex-end;\">\n        <button ref=\"dialogCancelButton\" class=\"btn btn-secondary\">").concat(this.component.t('Cancel'), "</button>\n        <button ref=\"dialogYesButton\" class=\"btn btn-primary\">").concat(this.component.t('Yes, delete it'), "</button>\n      </div>\n    ");
      this.dialogElement.innerHTML = dialogContent;
      this.dialogElement.refs = {};
      this.component.loadRefs.call(this.dialogElement, this.dialogElement, {
        dialogHeader: 'single',
        dialogCancelButton: 'single',
        dialogYesButton: 'single'
      });
      this.dialog = this.component.createModal(this.dialogElement);
      this.component.addEventListener(this.dialogElement.refs.dialogYesButton, 'click', this.saveDialogListener);
      this.component.addEventListener(this.dialogElement.refs.dialogCancelButton, 'click', this.closeDialogListener);
    }
  }, {
    key: "closeDialog",
    value: function closeDialog(event) {
      event.preventDefault();
      this.dialog.close();
      this.component.removeEventListener(this.dialogElement.refs.dialogYesButton, 'click', this.saveDialogListener);
      this.component.removeEventListener(this.dialogElement.refs.dialogCancelButton, 'click', this.closeDialogListener);
    }
  }, {
    key: "saveDialog",
    value: function saveDialog(event) {
      this.closeDialog(event);
      this.closeModalHandler(event);
    }
  }, {
    key: "saveModalValueHandler",
    value: function saveModalValueHandler(event) {
      event.preventDefault();
      this.currentValue = (0, _utils.fastCloneDeep)(this.component.dataValue);
      this.closeModal();
    }
  }, {
    key: "refs",
    get: function get() {
      return this.component.refs;
    }
  }, {
    key: "templateRefs",
    get: function get() {
      return {
        modalOverlay: 'single',
        modalContents: 'single',
        modalClose: 'single',
        openModalWrapper: 'single',
        openModal: 'single',
        modalSave: 'single',
        modalWrapper: 'single'
      };
    }
  }]);

  return ComponentModal;
}();

exports.default = ComponentModal;