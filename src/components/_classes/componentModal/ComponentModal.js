import _ from 'lodash';

export default class ComponentModal {
  static render(component, data, topLevel) {
    const children = component.renderTemplate('component', data, topLevel);
    const isOpened = this;

    return component.renderTemplate('componentModal', {
      ...data,
      children,
      isOpened
    });
  }

  constructor(component, modal, isOpened) {
    this.isOpened = isOpened;
    this.component = component;
    this.modal = modal;
    this.currentValue = this.component.dataValue;
    this.dataLoaded = false;
    this.init();
  }

  get refs() {
    return this.component.refs;
  }

  init() {
    this.loadRefs();
  }

  setValue(value) {
    if (this.dataLoaded) {
      return;
    }

    this.currentValue = value;
    this.dataLoaded = true;
    this.updateView();
  }

  setOpenModalElement(template) {
    this.openModalTemplate = template;
    this.component.setContent(this.refs.openModalWrapper, template);
    this.loadRefs();
    this.setEventListeners();
    if (this.isOpened) {
      this.refs.modalWrapper.classList.add('formio-dialog-disabled-animation');
      this.openModal();
    }
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
    this.component.addEventListener(this.refs.modalOverlay, 'click', this.showDialog.bind(this));
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
    this.openModal();
  }

  openModal() {
    this.isOpened = true;
    this.refs.modalWrapper.classList.remove('component-rendering-hidden');
  }

  updateView() {
    const template = _.isEqual(this.currentValue, this.component.defaultValue)
      ? this.openModalTemplate
      : this.component.getModalPreviewTemplate();
    this.component.setContent(this.refs.openModalWrapper, template);
    this.setOpenEventListener();
  }

  closeModal() {
    this.refs.modalWrapper.classList.remove('formio-dialog-disabled-animation');
    this.refs.modalWrapper.classList.add('component-rendering-hidden');
    this.isOpened = false;
    this.updateView();
  }

  closeModalHandler(event) {
    event.preventDefault();
    this.component.setValue(this.currentValue);
    this.closeModal();
  }

  showDialog() {
    const wrapper = this.component.ce('div');
    const dialogContent = `
      <h3 ref="dialogHeader">${this.component.t('Do you want to clear data?')}</h3>
      <div style="display:flex; justify-content: flex-end;">
        <button ref="dialogCancelButton" class="btn btn-secondary">${this.component.t('Cancel')}</button>
        <button ref="dialogYesButton" class="btn btn-primary">${this.component.t('Yes, delete it')}</button>
      </div>
    `;

    wrapper.innerHTML = dialogContent;
    wrapper.refs = {};
    this.component.loadRefs.call(wrapper, wrapper, {
      dialogHeader: 'single',
      dialogCancelButton: 'single',
      dialogYesButton: 'single',
    });

    const dialog = this.component.createModal(wrapper);
    const close = (event) => {
      event.preventDefault();
      dialog.close();
    };

    this.component.addEventListener(wrapper.refs.dialogYesButton, 'click', (event) => {
      close(event);
      this.closeModalHandler(event);
    });
    this.component.addEventListener(wrapper.refs.dialogCancelButton, 'click', close);
  }

  saveModalValueHandler(event) {
    event.preventDefault();
    this.currentValue = this.component.dataValue;
    this.closeModal();
  }
}
