import Promise from 'native-promise-only';
import Formio from './formio';
import FormioForm from './formio.form';

export default class FormioPDF extends FormioForm {
  constructor(element, options) {
    super(element, options);

    // Resolve when the iframe is ready.
    this.iframeReady = new Promise((resolve) => this.on('iframe-ready', resolve));

    // Handle an iframe submission.
    this.on('iframe-submission', (submission) => {
      this.setSubmission(submission).then(() => this.submit());
    });
  }

  postMessage(message) {
    this.iframeReady.then(() => this.iframe.contentWindow.postMessage(JSON.stringify(message), '*'));
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
    if (params.length) {
      iframeSrc += `?${params.join('&')}`;
    }
    return iframeSrc;
  }

  setForm(form) {
    this.postMessage({name: 'form', data: form});
    return super.setForm(form);
  }

  setSubmission(submission) {
    submission.readOnly = !!this.options.readOnly;
    this.postMessage({name: 'submission', data: submission});
    return super.setSubmission(submission).then(() => {
      this.formio.getDownloadUrl().then((url) => {
        // Add a download button if it has a download url.
        if (!url) {
          return;
        }
        if (!this.downloadButton) {
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
    });
  }

  setValue(submission) {
    this._submission = submission || {data: {}};
  }

  getValue() {
    return this._submission;
  }

  build() {
    this.zoomIn = this.ce('span', {
      style: 'position:absolute;right:10px;top:10px;cursor:pointer;',
      class: 'btn btn-default btn-secondary no-disable'
    }, this.ce('i', {
      class: this.iconClass('zoom-in')
    }));
    this.addEventListener(this.zoomIn, 'click', (event) => {
      event.preventDefault();
      this.postMessage({name: 'zoomIn'});
    });

    this.zoomOut = this.ce('span', {
      style: 'position:absolute;right:10px;top:60px;cursor:pointer;',
      class: 'btn btn-default btn-secondary no-disable'
    }, this.ce('i', {
      class: this.iconClass('zoom-out')
    }));
    this.addEventListener(this.zoomOut, 'click', (event) => {
      event.preventDefault();
      this.postMessage({name: 'zoomOut'});
    });

    this.iframe = this.ce('iframe', {
      src: this.getSrc(),
      seamless: true,
      class: 'formio-iframe'
    });

    this.appendChild(this.element, [
      this.zoomIn,
      this.zoomOut,
      this.iframe
    ]);

    if (!this.options.readOnly) {
      this.submitButton = this.ce('button', {
        type: 'button',
        class: 'btn btn-primary'
      }, 'Submit');

      this.addEventListener(this.submitButton, 'click', () => {
        this.postMessage({name: 'getSubmission'});
      });
      this.appendChild(this.element, this.submitButton);
    }
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
    eventData.formId &&
    Formio.forms.hasOwnProperty(eventData.formId)
  ) {
    Formio.forms[eventData.formId].emit(`iframe-${eventData.name}`, eventData.data);
  }
});
