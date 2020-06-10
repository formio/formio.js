var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import _ from 'lodash';
var ComponentModal = /** @class */ (function () {
    function ComponentModal(component, modal) {
        this.component = component;
        this.modal = modal;
        this.currentValue = this.component.dataValue;
        this.dataLoaded = false;
        this.init();
    }
    ComponentModal.render = function (component, data, topLevel) {
        var children = component.renderTemplate('component', data, topLevel);
        return component.renderTemplate('componentModal', __assign(__assign({}, data), { children: children }));
    };
    Object.defineProperty(ComponentModal.prototype, "refs", {
        get: function () {
            return this.component.refs;
        },
        enumerable: false,
        configurable: true
    });
    ComponentModal.prototype.init = function () {
        this.loadRefs();
    };
    ComponentModal.prototype.setValue = function (value) {
        if (this.dataLoaded) {
            return;
        }
        this.currentValue = value;
        this.dataLoaded = true;
        this.updateView();
    };
    ComponentModal.prototype.setOpenModalElement = function (template) {
        this.openModalTemplate = template;
        this.component.setContent(this.refs.openModalWrapper, template);
        this.loadRefs();
        this.setEventListeners();
    };
    ComponentModal.prototype.loadRefs = function () {
        this.component.loadRefs(this.modal, {
            modalOverlay: 'single',
            modalContents: 'single',
            modalClose: 'single',
            openModalWrapper: 'single',
            openModal: 'single',
            modalSave: 'single',
            modalWrapper: 'single',
        });
    };
    ComponentModal.prototype.setEventListeners = function () {
        this.component.addEventListener(this.refs.openModal, 'click', this.openModalHandler.bind(this));
        this.component.addEventListener(this.refs.modalOverlay, 'click', this.showDialog.bind(this));
        this.component.addEventListener(this.refs.modalClose, 'click', this.closeModalHandler.bind(this));
        this.component.addEventListener(this.refs.modalSave, 'click', this.saveModalValueHandler.bind(this));
    };
    ComponentModal.prototype.setOpenEventListener = function () {
        this.component.loadRefs(this.modal, {
            'openModal': 'single',
        });
        this.component.addEventListener(this.refs.openModal, 'click', this.openModalHandler.bind(this));
    };
    ComponentModal.prototype.openModalHandler = function (event) {
        event.preventDefault();
        this.refs.modalWrapper.classList.remove('component-rendering-hidden');
    };
    ComponentModal.prototype.updateView = function () {
        var template = _.isEqual(this.currentValue, this.component.defaultValue)
            ? this.openModalTemplate
            : this.component.getModalPreviewTemplate();
        this.component.setContent(this.refs.openModalWrapper, template);
        this.setOpenEventListener();
    };
    ComponentModal.prototype.closeModal = function () {
        this.refs.modalWrapper.classList.add('component-rendering-hidden');
        this.updateView();
    };
    ComponentModal.prototype.closeModalHandler = function (event) {
        event.preventDefault();
        this.component.setValue(this.currentValue);
        this.closeModal();
    };
    ComponentModal.prototype.showDialog = function () {
        var _this = this;
        var wrapper = this.component.ce('div');
        var dialogContent = "\n      <h3 ref=\"dialogHeader\">" + this.component.t('Do you want to clear data?') + "</h3>\n      <div style=\"display:flex; justify-content: flex-end;\">\n        <button ref=\"dialogCancelButton\" class=\"btn btn-secondary\">" + this.component.t('Cancel') + "</button>\n        <button ref=\"dialogYesButton\" class=\"btn btn-primary\">" + this.component.t('Yes, delete it') + "</button>\n      </div>\n    ";
        wrapper.innerHTML = dialogContent;
        wrapper.refs = {};
        this.component.loadRefs.call(wrapper, wrapper, {
            dialogHeader: 'single',
            dialogCancelButton: 'single',
            dialogYesButton: 'single',
        });
        var dialog = this.component.createModal(wrapper);
        var close = function (event) {
            event.preventDefault();
            dialog.close();
        };
        this.component.addEventListener(wrapper.refs.dialogYesButton, 'click', function (event) {
            close(event);
            _this.closeModalHandler(event);
        });
        this.component.addEventListener(wrapper.refs.dialogCancelButton, 'click', close);
    };
    ComponentModal.prototype.saveModalValueHandler = function (event) {
        event.preventDefault();
        this.currentValue = this.component.dataValue;
        this.closeModal();
    };
    return ComponentModal;
}());
export default ComponentModal;
