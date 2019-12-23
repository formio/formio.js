export default class ComponentModal {
  static render(component, data, topLevel) {
    const children = component.renderTemplate('component', data, topLevel);

    return component.renderTemplate('componentModal', {
      ...data,
      children,
    });
  }

  constructor(component, modal) {
    this.component = component;
    this.modal = modal;
    this.currentValue = this.component.dataValue;
    this.init();
  }

  get refs() {
    return this.component.refs;
  }

  init() {
    this.loadRefs();
  }

  setValue(value) {
    this.currentValue = value;
    this.updateView();
  }

  setOpenModalElement(template) {
    this.openModalTemplate = template;
    this.component.setContent(this.refs.openModalWrapper, template);
    this.loadRefs();
    this.setEventListeners();
  }

  loadRefs() {
    this.component.loadRefs(this.modal, {
      modalOverlay: 'single',
      modalContents: 'single',
      modalClose: 'single',
      openModalWrapper: 'single',
      openModal: 'single',
      modalSave: 'single',
      modalWrapper: 'single',
    });
  }

  setEventListeners() {
    this.component.addEventListener(this.refs.openModal, 'click', this.openModalHandler.bind(this));
    this.component.addEventListener(this.refs.modalOverlay, 'click', this.closeModalHandler.bind(this));
    this.component.addEventListener(this.refs.modalClose, 'click', this.closeModalHandler.bind(this));
    this.component.addEventListener(this.refs.modalSave, 'click', this.saveModalValueHandler.bind(this));
  }

  setOpenEventListener() {
    this.component.loadRefs(this.modal, {
      'openModal': 'single',
    });

    this.component.addEventListener(this.refs.openModal, 'click', this.openModalHandler.bind(this));
  }

  openModalHandler(event) {
    event.preventDefault();
    this.refs.modalWrapper.classList.remove('component-rendering-hidden');
  }

  updateView() {
    const template = this.currentValue === this.component.defaultValue
      ? this.openModalTemplate
      : this.component.getModalPreviewTemplate();
    this.component.setContent(this.refs.openModalWrapper, template);
    this.setOpenEventListener();
  }

  closeModal() {
    this.refs.modalWrapper.classList.add('component-rendering-hidden');
    this.updateView();
  }

  closeModalHandler(event) {
    event.preventDefault();
    this.component.setValue(this.currentValue);
    this.closeModal();
  }

  saveModalValueHandler(event) {
    event.preventDefault();
    this.currentValue = this.component.dataValue;
    this.closeModal();
  }
}
