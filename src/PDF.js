import NativePromise from 'native-promise-only';
import _ from 'lodash';

import Formio from './Formio';
import Webform from './Webform';

export default class PDF extends Webform {
  constructor(element, options) {
    super(element, options);
    this.components = [];
  }

  init() {
    super.init();

    // Handle an iframe submission.
    this.on('iframe-submission', (submission) => {
      this.setSubmission(submission).then(() => {
        if (this.submitOnNextSubmissionMessage) {
          this.submitOnNextSubmissionMessage = false;
          this.submit();
        }
      });
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
        zoomIn: 'single',
        zoomOut: 'single',
        iframeContainer: 'single'
      });

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
      this.postMessage({ name: 'form', data: this.form });

      this.addEventListener(this.refs.submitButton, 'click', () => {
        this.requestUpdatedSubmission(true);
      });

      this.addEventListener(this.refs.zoomIn, 'click', (event) => {
        event.preventDefault();
        this.postMessage({ name: 'zoomIn' });
      });

      this.addEventListener(this.refs.zoomOut, 'click', (event) => {
        event.preventDefault();
        this.postMessage({ name: 'zoomOut' });
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

  requestUpdatedSubmission(submitOnReceipt = true) {
    return new Promise((resolve, reject) => {
      this.once('set-submission', resolve);
      this.submitOnNextSubmissionMessage = submitOnReceipt === true;
      this.postMessage({ name: 'getSubmission' });
    });
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

  setSubmission(submission) {
    submission.readOnly = !!this.options.readOnly;
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
      this.postMessage({ name: 'submission', data: submission });
      this.emit('set-submission', submission);
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

    this.iframeReady.then(() => {
      if (this.iframeElement && this.iframeElement.contentWindow) {
        this.iframeElement.contentWindow.postMessage(JSON.stringify(message), '*');
      }
    });
  }

  // Do not clear the iframe.
  clear() {}
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
