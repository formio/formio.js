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
  }

  // 888      d8b  .d888                                    888
  // 888      Y8P d88P"                                     888
  // 888          888                                       888
  // 888      888 888888 .d88b.   .d8888b 888  888  .d8888b 888  .d88b.
  // 888      888 888   d8P  Y8b d88P"    888  888 d88P"    888 d8P  Y8b
  // 888      888 888   88888888 888      888  888 888      888 88888888
  // 888      888 888   Y8b.     Y88b.    Y88b 888 Y88b.    888 Y8b.
  // 88888888 888 888    "Y8888   "Y8888P  "Y88888  "Y8888P 888  "Y8888
  //                                           888
  //                                      Y8b d88P
  //                                       "Y88P"

  init() {
    super.init();

    // // Do not rebuild the iframe...
    // if (this.iframe) {
    //   this.addComponents();
    //   return;
    // }

    // Handle an iframe submission.
    this.on('iframe-submission', (submission) => {
      this.setSubmission(submission).then(() => this.submit());
    }, true);

    // Trigger when this form is ready.
    this.on('iframe-ready', () => {
      console.log('Invoking iframeReadyResolve to mark iframe as ready');
      return this.iframeReadyResolve();
    }, true);

    // if (
    //   !this.options.readOnly &&
    //   _.find(this.form.components, (component) => component.type === 'button' && component.action === 'submit')
    // ) {
    //   this.submitButton = this.ce('button', {
    //     type: 'button',
    //     class: 'btn btn-primary'
    //   }, 'Submit');

    //   this.addEventListener(this.submitButton, 'click', () => {
    //     this.postMessage({ name: 'getSubmission' });
    //   });
    //   this.appendChild(this.element, this.submitButton);
    // }

    // this.addComponents();
  }

  render() {
    return this.renderTemplate('pdf', {
      classes: 'formio-form-pdf',
      children: this.renderComponents()
    });
  }

  attach(element) {
    return super.attach(element).then(() => {
      // We have to attach the iframe manually; it will not render via the template
      this.refs.iframe = this.ce('iframe', {
        src: this.getSrc(),
        id: `iframe-${this.id}`,
        seamless: true,
        class: 'formio-iframe'
      });

      this.appendChild(this.element, [
        this.refs.iframe
      ]);

      // this.loadRefs(this.element, {iframe: 'single'});
      // this.refs.webform.children[0].style.display = 'none';

      this.emit('attach', this, this.element);

      return this.element;
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

  redraw() {
    this.postMessage({ name: 'redraw' });
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

  destroy() {
    console.log('Destroying PDF');
    this.off('submitButton');
    this.off('checkValidity');
    this.off('requestUrl');
    this.off('resetForm');
    this.off('deleteSubmission');
    this.off('refreshData');
    return super.destroy();
  }

  // d8b 8888888888                                                                              888
  // Y8P 888                                                                                     888
  //     888                                                                                     888
  // 888 8888888 888d888 8888b.  88888b.d88b.   .d88b.        .d88b.  888  888  .d88b.  88888b.  888888 .d8888b
  // 888 888     888P"      "88b 888 "888 "88b d8P  Y8b      d8P  Y8b 888  888 d8P  Y8b 888 "88b 888    88K
  // 888 888     888    .d888888 888  888  888 88888888      88888888 Y88  88P 88888888 888  888 888    "Y8888b.
  // 888 888     888    888  888 888  888  888 Y8b.          Y8b.      Y8bd8P  Y8b.     888  888 Y88b.       X88
  // 888 888     888    "Y888888 888  888  888  "Y8888        "Y8888    Y88P    "Y8888  888  888  "Y888  88888P'

  postMessage(message) {
    // If we get here before the iframeReady promise is set up, it's via the superclass constructor
    if (!this.iframeReady) {
      return;
    }

    if (!message.type) {
      message.type = 'iframe-data';
    }

    this.iframeReady.then(() => {
      console.log('iframe is ready, proceeding to post message: ');
      console.log(message);
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

  // addComponent(component, element, data, before) {
  //   // Never add the component to the DOM.
  //   super.addComponent(component, data, before, true);
  // }

  // render() {
  //   return super.render(this.renderTemplate('pdf', {
  //     classes: 'formio-form-pdf',
  //     children: this.renderComponents(),
  //   }), (this.options.attachMode === 'builder') ? 'builder' : 'form', true);
  // }

  // Iframe should always be shown.
  // showElement() {}

  // init() {
  //   return;

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
