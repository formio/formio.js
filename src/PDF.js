import NativePromise from 'native-promise-only';
import { GlobalFormio as Formio } from './Formio';
import Webform from './Webform';
import { fastCloneDeep, eachComponent } from './utils/utils';

export default class PDF extends Webform {
  constructor(element, options) {
    options.display = 'pdf';
    super(element, options);
    this.components = [];
  }

  init() {
    super.init();

    // Handle an iframe submission.
    this.on('iframe-submission', (submission) => this.setValue(submission, {
      fromIframe: true
    }), true);

    this.on('iframe-change', (submission) => this.setValue(submission, {
      fromIframe: true
    }), true);

    this.on('iframe-getIframePositions', (query) => {
      const iframe = document.getElementById(`iframe-${query.formId}`);
      if (iframe) {
        const iframeBoundingClientRect = iframe.getBoundingClientRect();
        this.postMessage({
          name: 'iframePositions',
          data: {
            formId: query.formId,
            iframe: {
              top: iframeBoundingClientRect.top
            },
            scrollY: window.scrollY || window.pageYOffset
          }
        });
      }
    });

    // Trigger when this form is ready.
    this.on('iframe-ready', () => this.iframeReadyResolve(), true);
  }

  render() {
    this.submitButton = this.addComponent({
      disabled: this.form.disableWizardSubmit,
      input: true,
      type: 'button',
      action: 'submit',
      internal: true,
      label: 'Submit',
      key: 'submit',
      ref: 'button',
      hidden: this.isSubmitButtonHidden()
    });

    return this.renderTemplate('pdf', {
      submitButton: this.submitButton.render(),
      classes: 'formio-form-pdf',
      children: this.renderComponents()
    });
  }

  redraw() {
    this.postMessage({ name: 'redraw' });
    return this.builderMode ? NativePromise.resolve() : super.redraw();
  }

  rebuild() {
    if (this.builderMode && this.component.components) {
      this.destroyComponents();
      this.addComponents();
      return NativePromise.resolve();
    }
    this.postMessage({ name: 'redraw' });
    return super.rebuild();
  }

  // Do not attach nested components for pdf.
  attachComponents(element, components, container) {
    components = components || this.components;
    container = container || this.component.components;
    element = this.hook('attachComponents', element, components, container, this);
    return Promise.resolve();
  }

  attach(element) {
    return super.attach(element).then(() => {
      this.loadRefs(element, {
        button: 'single',
        buttonMessageContainer: 'single',
        buttonMessage: 'single',
        zoomIn: 'single',
        zoomOut: 'single',
        iframeContainer: 'single'
      });
      this.submitButton.refs = { ...this.refs };
      this.submitButton.attachButton();

      // Reset the iframeReady promise.
      this.iframeReady = new NativePromise((resolve, reject) => {
        this.iframeReadyResolve = resolve;
        this.iframeReadyReject = reject;
      });

      // iframes cannot be in the template so manually create it
      this.iframeElement = this.ce('iframe', {
        src: this.getSrc(),
        id: `iframe-${this.id}`,
        seamless: true,
        class: 'formio-iframe'
      });

      this.iframeElement.formioContainer = this.component.components;
      this.iframeElement.formioComponent = this;

      // Append the iframe to the iframeContainer in the template
      this.empty(this.refs.iframeContainer);
      this.appendChild(this.refs.iframeContainer, this.iframeElement);

      // Post the form to the iframe
      this.form.base = Formio.getBaseUrl();
      this.form.projectUrl = Formio.getProjectUrl();
      this.postMessage({ name: 'form', data: this.form });

      // Hide the submit button if the associated component is hidden
      const submitButton = this.components.find(c => c.element === this.refs.button);
      if (submitButton) {
        this.refs.button.classList.toggle('hidden', !submitButton.visible);
      }

      this.addEventListener(this.refs.zoomIn, 'click', (event) => {
        event.preventDefault();
        this.postMessage({ name: 'zoomIn' });
      });

      this.addEventListener(this.refs.zoomOut, 'click', (event) => {
        event.preventDefault();
        this.postMessage({ name: 'zoomOut' });
      });

      const form = fastCloneDeep(this.form);
      if (this.formio) {
        form.projectUrl = this.formio.projectUrl;
        form.url = this.formio.formUrl;
        form.base = this.formio.base;
        this.postMessage({ name: 'token', data: this.formio.getToken() });
      }

      this.emit('attach');
    });
  }

  /**
   * Get the submission from the iframe.
   *
   * @return {Promise<any>}
   */
  getSubmission() {
    return new NativePromise((resolve) => {
      this.once('iframe-submission', resolve);
      this.postMessage({ name: 'getSubmission' });
    });
  }

  /**
   * Ensure we have the submission from the iframe before we submit the form.
   *
   * @param options
   * @return {*}
   */
  submitForm(options = {}) {
    this.postMessage({ name: 'getErrors' });
    return this.getSubmission().then(() => super.submitForm(options));
  }

  getSrc() {
    if (!this._form || !this._form.settings || !this._form.settings.pdf) {
      return '';
    }

    let iframeSrc = `${this._form.settings.pdf.src}.html`;
    const params = [`id=${this.id}`];

    if (this.options.showCheckboxBackground || this._form.settings.showCheckboxBackground) {
      params.push('checkboxbackground=1');
    }

    if (this.options.readOnly) {
      params.push('readonly=1');
    }

    if (this.options.zoom) {
      params.push(`zoom=${this.options.zoom}`);
    }

    if (this.builderMode) {
      params.push('builder=1');
    }

    if (params.length) {
      iframeSrc += `?${params.join('&')}`;
    }

    return iframeSrc;
  }

  setForm(form, flags = {}) {
    return super.setForm(form, flags).then(() => {
      if (this.formio) {
        form.projectUrl = this.formio.projectUrl;
        form.url = this.formio.formUrl;
        form.base = this.formio.base;
        this.postMessage({ name: 'token', data: this.formio.getToken() });
      }
      this.postMessage({ name: 'form', data: this.form });
    });
  }

  /**
   * Set's the value of this form component.
   *
   * @param submission
   * @param flags
   */
  setValue(submission, flags = {}) {
    const changed = super.setValue(submission, flags);
    if (!flags || !flags.fromIframe) {
      this.once('iframe-ready', () => {
        if (changed) {
          this.postMessage({ name: 'submission', data: submission });
        }
      });
    }
    return changed;
  }

  postMessage(message) {
    // If we get here before the iframeReady promise is set up, it's via the superclass constructor
    if (!this.iframeReady) {
      return;
    }

    if (!message.type) {
      message.type = 'iframe-data';
    }

    this.iframeReady.then(() => {
      if (this.iframeElement && this.iframeElement.contentWindow && !(message.name === 'form' && this.iframeFormSetUp)) {
        this.iframeElement.contentWindow.postMessage(JSON.stringify(message), '*');
        this.iframeFormSetUp = message.name === 'form';
      }
    });
  }

  focusOnComponent(key) {
    this.postMessage({
      name: 'focusErroredField',
      data: key,
    });
  }

  // Do not clear the iframe.
  clear() {}

  showErrors(error, triggerEvent) {
    const helpBlock = document.getElementById('submit-error');
    const submitError = this.t('submitError');
    const isSubmitErrorShown = this.refs.buttonMessage?.textContent.trim() === submitError;

    if (!helpBlock && this.errors.length && !isSubmitErrorShown) {
      const p = this.ce('p', { class: 'help-block' });

      this.setContent(p, submitError);
      p.addEventListener('click', () => {
        window.scrollTo(0, 0);
      });

      const div = this.ce('div', { id: 'submit-error', class: 'has-error' });

      this.appendTo(p, div);
      this.appendTo(div, this.element);
    }

    if (!this.errors.length && helpBlock) {
      helpBlock.remove();
    }

    super.showErrors(error, triggerEvent);
  }

  isSubmitButtonHidden() {
    let hidden = false;
    eachComponent(this.component.components, (component) => {
      if (
        (component.type === 'button') &&
        ((component.action === 'submit') || !component.action)
      ) {
        hidden = component.hidden || false;
      }
    });

    return hidden;
  }
}

/**
 * Listen for window messages.
 */
if (typeof window !== 'undefined') {
  window.addEventListener('message', (event) => {
    let eventData = null;
    try {
      eventData = JSON.parse(event.data);
    }
    catch (err) {
      eventData = null;
    }

    // If this form exists, then emit the event within this form.
    if (
      eventData &&
      eventData.name &&
      eventData.formId &&
      Formio.forms.hasOwnProperty(eventData.formId)
    ) {
      Formio.forms[eventData.formId].emit(`iframe-${eventData.name}`, eventData.data);
    }
  });
}
