import Promise from 'native-promise-only';

import _ from 'lodash';

import Formio from './Formio';
import Webform from './Webform';

export default class PDF extends Webform {
  constructor(element, options) {
    super(element, options);

    // Resolve when the iframe is ready.
    this.iframeReady = new Promise((resolve) => (this.iframeReadyResolve = resolve));
  }

  postMessage(message) {
    if (!message.type) {
      message.type = 'iframe-data';
    }
    this.iframeReady.then(() => {
      if (this.iframe && this.iframe.contentWindow) {
        this.iframe.contentWindow.postMessage(JSON.stringify(message), '*');
      }
    });
  }

  // Do not clear the iframe.
  clear() {}
  redraw() {
    this.postMessage({ name: 'redraw' });
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
    if (this.options.builder) {
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

  addComponent(component, element, data, before, noAdd, state) {
    // Never add the component to the DOM.
    super.addComponent(component, element, data, before, true, state);
  }

  // Iframe should always be shown.
  showElement() {}
  build() {
    // Do not rebuild the iframe...
    if (this.iframe) {
      this.addComponents();
      return;
    }

    this.zoomIn = this.ce('span', {
      style: 'position:absolute;right:10px;top:10px;cursor:pointer;',
      class: 'btn btn-default btn-secondary no-disable'
    }, this.ce('i', {
      class: this.iconClass('zoom-in')
    }));
    this.addEventListener(this.zoomIn, 'click', (event) => {
      event.preventDefault();
      this.postMessage({ name: 'zoomIn' });
    });

    this.zoomOut = this.ce('span', {
      style: 'position:absolute;right:10px;top:60px;cursor:pointer;',
      class: 'btn btn-default btn-secondary no-disable'
    }, this.ce('i', {
      class: this.iconClass('zoom-out')
    }));
    this.addEventListener(this.zoomOut, 'click', (event) => {
      event.preventDefault();
      this.postMessage({ name: 'zoomOut' });
    });

    this.iframe = this.ce('iframe', {
      src: this.getSrc(),
      id: `iframe-${this.id}`,
      seamless: true,
      class: 'formio-iframe'
    });

    // Handle an iframe submission.
    this.on('iframe-submission', (submission) => {
      this.setSubmission(submission).then(() => this.submit());
    }, true);

    // Trigger when this form is ready.
    this.on('iframe-ready', () => this.iframeReadyResolve(), true);

    this.appendChild(this.element, [
      this.zoomIn,
      this.zoomOut,
      this.iframe
    ]);

    if (
      !this.options.readOnly &&
      _.find(this.form.components, (component) => component.type === 'button' && component.action === 'submit')
    ) {
      this.submitButton = this.ce('button', {
        type: 'button',
        class: 'btn btn-primary'
      }, 'Submit');

      this.addEventListener(this.submitButton, 'click', () => {
        this.postMessage({ name: 'getSubmission' });
      });
      this.appendChild(this.element, this.submitButton);
    }

    this.addComponents();
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
