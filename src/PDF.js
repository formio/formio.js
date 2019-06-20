import Promise from 'native-promise-only';

import _ from 'lodash';

import Formio from './Formio';
import Webform from './Webform';

export default class PDF extends Webform {
  constructor(element, options) {
    super(element, options);

    this.refreshIframeReadyPromise();

    this.components = [];
  }

  refreshIframeReadyPromise() {
    if (this.iframeReadyReject) {
      this.iframeReady = this.iframeReady.catch(err => {
        return;
      });

      this.iframeReadyReject();
    }

    // Resolve when the iframe is ready.
    this.iframeReady = new Promise((resolve, reject) => {
      this.iframeReadyResolve = resolve;
      this.iframeReadyReject = reject;
    });
  }

  init() {
    super.init();

    // Handle an iframe submission.
    this.on('iframe-submission', (submission) => {
      this.setSubmission(submission).then(() => this.submit());
    }, true);

    // Trigger when this form is ready.
    this.on('iframe-ready', () => {
      return this.iframeReadyResolve();
    }, true);
  }

  render() {
    return this.renderTemplate('pdf', {
      classes: 'formio-form-pdf',
      children: this.renderComponents()
    });
  }

  redraw() {
    return super.redraw();
  }

  attach(element) {
    return super.attach(element).then(() => {
      this.loadRefs(element, {
        submitButton: 'single',
        iframeContainer: 'single'
      });

      // iframes cannot be in the template so manually create it
      this.iframeElement = this.iframeElement || this.ce('iframe', {
        src: this.getSrc(),
        id: `iframe-${this.id}`,
        seamless: true,
        class: 'formio-iframe'
      });

      this.refreshIframeReadyPromise();

      this.iframeElement.formioContainer = this.component.components;
      this.iframeElement.formioComponent = this;

      // Append the iframe to the iframeContainer in the template
      this.appendChild(this.refs.iframeContainer, this.iframeElement);

      // Post the form to the iframe
      this.postMessage({ name: 'form', data: this.form });

      this.addEventListener(this.refs.submitButton, 'click', () => {
        this.postMessage({ name: 'getSubmission' });
      });

      const form = _.cloneDeep(this.form);
      if (this.formio) {
        form.projectUrl = this.formio.projectUrl;
        form.url = this.formio.formUrl;
        form.base = this.formio.base;
        this.postMessage({ name: 'token', data: this.formio.getToken() });
      }

      this.emit('attach');
    });
  }

  detach() {
    this.removeEventListener(this.refs.submitButton, 'click');

    const result = super.detach();

    return result;
  }

  destroy() {
    this.off('iframe-submission');
    this.off('iframe-ready');

    const result = super.destroy();

    return result;
  }

  getSrc() {
    if (!this._form || !this._form.settings || !this._form.settings.pdf) {
      return '';
    }

    let iframeSrc = `${this._form.settings.pdf.src}.html`;
    const params = [`id=${this.id}`];

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

  setForm(form) {
    return super.setForm(form).then(() => {
      if (this.formio) {
        form.projectUrl = this.formio.projectUrl;
        form.url = this.formio.formUrl;
        form.base = this.formio.base;
        this.postMessage({ name: 'token', data: this.formio.getToken() });
      }
      this.postMessage({ name: 'form', data: form });
    });
  }

  postMessage(message) {
    // If we get here before the iframeReady promise is set up, it's via the superclass constructor
    if (!this.iframeReady) {
      return;
    }

    if (!message.type) {
      message.type = 'iframe-data';
    }

    this.iframeReady = this.iframeReady.then(() => {
      if (this.iframeElement && this.iframeElement.contentWindow) {
        this.iframeElement.contentWindow.postMessage(JSON.stringify(message), '*');
      }
    });
  }

  // Do not clear the iframe.
  clear() {}

  setSubmission(submission) {
    submission.readOnly = !!this.options.readOnly;
    this.postMessage({ name: 'submission', data: submission });
    return super.setSubmission(submission).then(() => {
      if (this.formio) {
        this.formio.getDownloadUrl().then((url) => {
          // Add a download button if it has a download url.
          if (!url) {
            return;
          }
          if (!this.downloadButton) {
            if (this.options.primaryProject) {
              url += `&project=${this.options.primaryProject}`;
            }
            this.downloadButton = this.ce('a', {
              href: url,
              target: '_blank',
              style: 'position:absolute;right:10px;top:110px;cursor:pointer;'
            }, this.ce('img', {
              src: require('./pdf.image'),
              style: 'width:3em;'
            }));
            this.element.insertBefore(this.downloadButton, this.iframe);
          }
        });
      }
    });
  }
}

/**
 * Listen for window messages.
 */
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
