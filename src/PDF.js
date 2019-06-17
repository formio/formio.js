import Promise from 'native-promise-only';

import _ from 'lodash';

import Formio from './Formio';
import Webform from './Webform';

export default class PDF extends Webform {
  constructor(element, options) {
    console.log('Creating PDF');
    super(element, options);

    // Resolve when the iframe is ready.
    this.iframeReady = new Promise((resolve) => {
      console.log('Setting up this.iframeReadyResolve');
      this.iframeReadyResolve = resolve;
    });
    this.components = [];
  }

  init() {
    console.log('PDF Init');

    // super.init();

    // Handle an iframe submission.
    this.on('iframe-submission', (submission) => {
      console.log('Got submission', submission);
      this.setSubmission(submission).then(() => this.submit());
    }, true);

    // Trigger when this form is ready.
    this.on('iframe-ready', () => {
      console.log('Invoking iframeReadyResolve to mark iframe as ready');
      return this.iframeReadyResolve();
    }, true);
  }

  destroy() {
    console.log('PDF Destroy');
    this.off('iframe-submission');
    this.off('iframe-ready');
  }

  render() {
    console.log('PDF Render');
    return this.renderTemplate('pdf', {
      classes: 'formio-form-pdf',
      children: this.renderComponents()
    });
  }

  attach(element) {
    console.log('PDF Attach');
    this.loadRefs(element, {
      submitButton: 'single',
      iframe: 'single'
    });

    // iframes cannot be in the template so manually create it.
    this.appendChild(this.refs.iframe, this.ce('iframe', {
      src: this.getSrc(),
      id: `iframe-${this.id}`,
      seamless: true,
      class: 'formio-iframe'
    }));

    this.addEventListener(this.refs.submitButton, 'click', () => {
      console.log('clicked!');
      this.postMessage({ name: 'getSubmission' });
    });

    const form = _.cloneDeep(this.form);
    if (this.formio) {
      form.projectUrl = this.formio.projectUrl;
      form.url = this.formio.formUrl;
      form.base = this.formio.base;
      this.postMessage({ name: 'token', data: this.formio.getToken() });
    }

    return super.attach(element);
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

  rebuild() {
    console.log('PDF Rebuild');
    // return super.rebuild();
  }

  redraw() {
    console.log('PDF Redraw');

    // If iframe already exists, don't redraw.
    if (this.refs.iframe) {
      console.log('Skipping redraw');
      return;
    }

    // this.postMessage({ name: 'redraw' });
    return super.redraw();
  }

  setForm(form) {
    console.log('PDF setForm', form);
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

    this.iframeReady.then(() => {
      console.log('doing message', message);
      if (this.refs.iframe && this.refs.iframe.contentWindow) {
        this.refs.iframe.contentWindow.postMessage(JSON.stringify(message), '*');
      }
    });
  }

  // // Do not clear the iframe.
  // clear() {}

  // setSubmission(submission) {
  //   submission.readOnly = !!this.options.readOnly;
  //   this.postMessage({ name: 'submission', data: submission });
  //   return super.setSubmission(submission).then(() => {
  //     if (this.formio) {
  //       this.formio.getDownloadUrl().then((url) => {
  //         // Add a download button if it has a download url.
  //         if (!url) {
  //           return;
  //         }
  //         if (!this.downloadButton) {
  //           if (this.options.primaryProject) {
  //             url += `&project=${this.options.primaryProject}`;
  //           }
  //           this.downloadButton = this.ce('a', {
  //             href: url,
  //             target: '_blank',
  //             style: 'position:absolute;right:10px;top:110px;cursor:pointer;'
  //           }, this.ce('img', {
  //             src: require('./pdf.image'),
  //             style: 'width:3em;'
  //           }));
  //           this.element.insertBefore(this.downloadButton, this.iframe);
  //         }
  //       });
  //     }
  //   });
  // }
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
