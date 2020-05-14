"use strict";

require("core-js/modules/es.symbol");

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
      return component.renderTemplate('componentModal', _objectSpread({}, data, {
        children: children
      }));
    }
  }]);

  function ComponentModal(component, modal) {
    _classCallCheck(this, ComponentModal);

    this.component = component;
    this.modal = modal;
    this.currentValue = this.component.dataValue;
    this.dataLoaded = false;
    this.init();
  }

  _createClass(ComponentModal, [{
    key: "init",
    value: function init() {
      this.loadRefs();
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (this.dataLoaded) {
        return;
      }

      this.currentValue = value;
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
    }
  }, {
    key: "loadRefs",
    value: function loadRefs() {
      this.component.loadRefs(this.modal, {
        modalOverlay: 'single',
        modalContents: 'single',
        modalClose: 'single',
        openModalWrapper: 'single',
        openModal: 'single',
        modalSave: 'single',
        modalWrapper: 'single'
      });
    }
  }, {
    key: "setEventListeners",
    value: function setEventListeners() {
      this.component.addEventListener(this.refs.openModal, 'click', this.openModalHandler.bind(this));
      this.component.addEventListener(this.refs.modalOverlay, 'click', this.closeModalHandler.bind(this));
      this.component.addEventListener(this.refs.modalClose, 'click', this.closeModalHandler.bind(this));
      this.component.addEventListener(this.refs.modalSave, 'click', this.saveModalValueHandler.bind(this));
    }
  }, {
    key: "setOpenEventListener",
    value: function setOpenEventListener() {
      this.component.loadRefs(this.modal, {
        'openModal': 'single'
      });
      this.component.addEventListener(this.refs.openModal, 'click', this.openModalHandler.bind(this));
    }
  }, {
    key: "openModalHandler",
    value: function openModalHandler(event) {
      event.preventDefault();
      this.refs.modalWrapper.classList.remove('component-rendering-hidden');
    }
  }, {
    key: "updateView",
    value: function updateView() {
      var template = this.currentValue === this.component.defaultValue ? this.openModalTemplate : this.component.getModalPreviewTemplate();
      this.component.setContent(this.refs.openModalWrapper, template);
      this.setOpenEventListener();
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      this.refs.modalWrapper.classList.add('component-rendering-hidden');
      this.updateView();
    }
  }, {
    key: "closeModalHandler",
    value: function closeModalHandler(event) {
      event.preventDefault();
      this.component.setValue(this.currentValue);
      this.closeModal();
    }
  }, {
    key: "saveModalValueHandler",
    value: function saveModalValueHandler(event) {
      event.preventDefault();
      this.currentValue = this.component.dataValue;
      this.closeModal();
    }
  }, {
    key: "refs",
    get: function get() {
      return this.component.refs;
    }
  }]);

  return ComponentModal;
}();

exports.default = ComponentModal;