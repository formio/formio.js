export default class ComponentModal {
  constructor(component) {
    this.previousValue = null;
    this.component = component;
  }

  renderElement(value, index) {
    const children = this.component.renderTemplate('component');
    const view = this.component.isEmpty(value) ? this.component.emptyModalText : this.component.renderTemplate('component', {
      value: this.component.formatValue(this.component.parseValue(value)),
      index
    }, 'html');
    return `<button lang='en' class='btn btn-light btn-md' ref='openModal'>${view}</button>${this.component.renderTemplate('componentModal', children)}`;
  }

  attachModal() {
    this.component.attach(this.refs.modalContents);
  }

  detachModal() {
    this.component.detach();
  }

  loadRefs(element) {
    this.component.loadRefs(element, {
      modalOverlay: 'single',
      modalContents: 'single',
      modalClose: 'single',
      openButtonWrapper: 'single',
      openModal: 'single',
      modalWrapper: 'single',
      saveButton: 'single',
      cancelButton: 'single'
    });
  }

  get refs() {
    return this.component.refs;
  }

  attach(element) {
    this.loadRefs(element);
    this.component.setContent(this.refs.openButtonWrapper, element);
    this.component.addEventListener(this.refs.saveButton, 'click', this.setValue.bind(this));
    this.component.addEventListener(this.refs.cancelButton, 'click', this.closeModal.bind(this));
    this.component.addEventListener(this.refs.openModal, 'click', this.openModal.bind(this));
    this.component.addEventListener(this.refs.modalOverlay, 'click', this.closeModal.bind(this));
    this.component.addEventListener(this.refs.modalClose, 'click', this.closeModal.bind(this));
  }

  setValue(event) {
    event.preventDefault();
    this.refs.modalWrapper.classList.add('component-rendering-hidden');
    this.component.redraw();
  }

  openModal(event) {
    event.preventDefault();
    this.previousValue = this.component.getValue();
    this.refs.modalWrapper.classList.remove('component-rendering-hidden');
    this.attachModal();
  }

  closeModal(event) {
    event.preventDefault();
    this.component.setValue(this.previousValue);
    this.refs.modalWrapper.classList.add('component-rendering-hidden');
    this.detachModal();
  }
}
