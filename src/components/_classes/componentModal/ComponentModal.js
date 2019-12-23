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
    this.init();
  }

  get refs() {
    return this.component.refs;
  }

  init() {
    this.loadRefs();
  }

  setOpenModalElement(template) {
    this.component.setContent(this.refs.openButtonWrapper, template);
    this.loadRefs();
    this.setEventListeners();
  }

  loadRefs() {
    this.component.loadRefs(this.modal, {
      modalOverlay: 'single',
      modalContents: 'single',
      modalClose: 'single',
      openButtonWrapper: 'single',
      openModal: 'single',
      modalWrapper: 'single',
    });
  }

  setEventListeners() {
    this.component.addEventListener(this.refs.openModal, 'click', this.openModal.bind(this));
    this.component.addEventListener(this.refs.modalOverlay, 'click', this.closeModal.bind(this));
    this.component.addEventListener(this.refs.modalClose, 'click', this.closeModal.bind(this));
  }

  openModal(event) {
    event.preventDefault();
    this.refs.modalWrapper.classList.remove('component-rendering-hidden');
  }

  closeModal(event) {
    event.preventDefault();
    this.refs.modalWrapper.classList.add('component-rendering-hidden');
  }
}
