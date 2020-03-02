import Element from './Element';
import Formio from './Formio';
import Displays from './displays';
import templates from './templates';
import * as FormioUtils from './utils/utils';
import NativePromise from 'native-promise-only';

/**
 * @summary Creates an easy to use interface for embedding webforms, pdfs, and wizards into your application.
 */
class Form extends Element {
  /**
   * @constructor
   * @tutorial api
   * @param {Object} element - The DOM element you wish to render this form within.
   * @param {Object | string} form - Either a Form JSON schema or the URL of a hosted form via. form.io.
   * @param {Object} options - The options to create a new form instance.
   * @param {boolean} options.readOnly - Set this form to readOnly
   * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
   * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
   * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
   *
   * @example
   * import Form from 'formiojs/Form';
   * const form = new Form(document.getElementById('formio'), 'https://examples.form.io/example');
   * form.ready.then(() => form.build());
   */
  constructor(...args) {
    let options = args[0] instanceof HTMLElement ? args[2] : args[1];
    options = options || {};
    if (Formio.options && Formio.options.form) {
      options = Object.assign(options, Formio.options.form);
    }
    super(options);
    this.ready = new NativePromise((resolve, reject) => {
      this.readyResolve = resolve;
      this.readyReject = reject;
    });

    this.instance = null;
    if (args[0] instanceof HTMLElement) {
      this.element = args[0];
      this.options = args[2] || {};
      this.options.events = this.events;
      this.setForm(args[1])
        .then(() => this.readyResolve(this.instance))
        .catch(this.readyReject);
    }
    else if (args[0]) {
      this.element = null;
      this.options = args[1] || {};
      this.options.events = this.events;
      this.setForm(args[0])
        .then(() => this.readyResolve(this.instance))
        .catch(this.readyReject);
    }
    else {
      this.element = null;
      this.options = {};
      this.options.events = this.events;
    }
    this.display = '';
  }

  /**
   * Create a new form instance provided the display of the form.
   *
   * @param {string} display - The display of the form, either "wizard", "form", or "pdf"
   * @return {*}
   */
  create(display) {
    if (this.options && (this.options.flatten || this.options.renderMode === 'flat')) {
      display = 'form';
    }
    this.display = display;
    if (Displays.displays[display]) {
      return new Displays.displays[display](this.element, this.options);
    }
    else {
      // eslint-disable-next-line new-cap
      return new Displays.displays['webform'](this.element, this.options);
    }
  }

  /**
   * Sets the form. Either as JSON or a URL to a form JSON schema.
   *
   * @param {string|object} formParam - Either the form JSON or the URL of the form json.
   * @return {*}
   */
  set form(formParam) {
    return this.setForm(formParam);
  }

  errorForm(err) {
    return {
      components: [
        {
          'label': 'HTML',
          'tag': 'div',
          'className': 'error error-message alert alert-danger ui red message',
          'attrs': [
            {
              'attr': 'role',
              'value': 'alert'
            }
          ],
          'key': 'errorMessage',
          'type': 'htmlelement',
          'input': false,
          'content': typeof err === 'string' ? err : err.message,
        }
      ]
    };
  }

  setForm(formParam) {
    let result;
    formParam = formParam || this.form;
    if (typeof formParam === 'string') {
      const formio = new Formio(formParam);
      let error;
      result = this.getSubmission(formio)
        .catch((err) => {
          error = err;
        })
        .then((submission) => {
          return formio.loadForm()
          // If the form returned an error, show it instead of the form.
            .catch(err => {
              error = err;
            })
            .then((form) => {
              // If the submission returned an error, show it instead of the form.
              if (error) {
                form = this.errorForm(error);
              }
              this.instance = this.instance || this.create(form.display);
              this.instance.url = formParam;
              this.instance.nosubmit = false;
              this._form = this.instance.form = form;
              if (submission) {
                this.instance.submission = submission;
              }
              if (error) {
                throw error;
              }
              return this.instance;
            });
        });
    }
    else {
      this.instance = this.instance || this.create(formParam.display);
      this._form = this.instance.form = formParam;
      result = this.instance.ready;
    }

    // A redraw has occurred so save off the new element in case of a setDisplay causing a rebuild.
    return result.then(() => {
      this.element = this.instance.element;
      return this.instance;
    });
  }

  getSubmission(formio) {
    if (formio.submissionId) {
      return formio.loadSubmission();
    }
    return NativePromise.resolve();
  }

  /**
   * Returns the loaded forms JSON.
   *
   * @return {object} - The loaded form's JSON
   */
  get form() {
    return this._form;
  }

  /**
   * Changes the display of the form.
   *
   * @param {string} display - The display to set this form. Either "wizard", "form", or "pdf"
   * @return {Promise<T>}
   */
  setDisplay(display) {
    if ((this.display === display) && this.instance) {
      return NativePromise.resolve(this.instance);
    }

    this.form.display = display;
    this.instance.destroy();
    this.instance = this.create(display);
    return this.setForm(this.form);
  }

  empty() {
    if (this.element) {
      while (this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
      }
    }
  }

  /**
   * Embeds a form into a website. This method is used to automatically include the Form.io styles into the header
   * as well as inject the DOM element used to contain the form embedded into a page.
   *
   * ```js
   * Form.embed({
   *   src: 'https://examples.form.io/example',
   *   class: 'formio-form-wrapper'
   * }).then((instance) => {
   *   instance.on('change', (change) => {
   *      console.log('The form has changed!', change);
   *   });
   * });
   * ```
   *
   * @param {object} embed - Embed options to use when embedding.
   * @param {string} embed.src - The URL of the form you wish to embed.
   * @paarm {string} embed.styles - The URL of the styles to include with the embed.
   * @param {string} embed.class - The CSS class to add to the DOM element created to embed.
   * @param {object} options - The options to pass to the {@link Form} constructor
   */
  static embed(embed, options) {
    return new NativePromise((resolve) => {
      if (!embed || !embed.src) {
        resolve();
      }
      const id = this.id || `formio-${Math.random().toString(36).substring(7)}`;
      const className = embed.class || 'formio-form-wrapper';
      let code = embed.styles ? `<link rel="stylesheet" href="${embed.styles}">` : '';
      code += `<div id="${id}" class="${className}"></div>`;
      document.write(code);
      let attempts = 0;
      const wait = setInterval(() => {
        attempts++;
        const formElement = document.getElementById(id);
        if (formElement || attempts > 10) {
          resolve(new Form(formElement, embed.src, options).ready);
          clearInterval(wait);
        }
      }, 10);
    });
  }

  /**
   * Sanitize an html string.
   *
   * @param {string} string - The string that needs to be sanitized.
   * @returns {string} - The sanitized string.
   */
  sanitize(dirty) {
    return FormioUtils.sanitize(dirty, this.options);
  }

  setContent(element, content) {
    if (element instanceof HTMLElement) {
      element.innerHTML = this.sanitize(content);
      return true;
    }
    return false;
  }

  /**
   * Build a new form. This is a method that performs all three phases of form creation.
   *  - Render - Which takes the template of the form to create an HTML string of the form.
   *  - Inject - Which takes the HTML string and then sets the contents of the DOM element with that string.
   *  - Attach - Which will attach all event listeners, load references, and perform logic on the rendered DOM elements.
   *
   *  ```js
   *  const wizard = new Form(document.getElementById('formio'), 'https://examples.form.io/wizard');
   *  wizard.ready.then(() => {
   *    wizard.build().then((instance) => {
   *      // Will return a Wizard instance since the form.display is set to "wizard"
   *      console.log(instance);
   *    });
   *  });
   *  ```
   *
   * @return {Promise<(Webform|PDF|Wizard)>} - Returns a promise to either a Webform, PDF, or Wizard display depending
   * on which display property is set on the form JSON.
   */
  build() {
    if (!this.instance) {
      return NativePromise.reject('Form not ready. Use form.ready promise');
    }

    if (!this.element) {
      return NativePromise.reject('No DOM element for form.');
    }

    // Add temporary loader.
    const template = (this.options && this.options.template) ? this.options.template : 'bootstrap';
    const loader = templates[template].loader || templates.bootstrap.loader;
    this.setContent(this.element, loader.form);

    return this.render().then(html => {
      this.setContent(this.element, html);
      return this.attach(this.element).then(() => this.instance);
    })
      .then((param) => {
        this.emit('build', param);
        return param;
      });
  }

  /**
   * Generates an HTML string representation of the form that will be rendered within the application.
   *
   * @return {Promise<string>} - A promise that will resolve a string representation of the HTML to be generated by the
   * rendered form.
   */
  render() {
    if (!this.instance) {
      return NativePromise.reject('Form not ready. Use form.ready promise');
    }
    return NativePromise.resolve(this.instance.render())
      .then((param) => {
        this.emit('render', param);
        return param;
      });
  }

  attach(element) {
    if (!this.instance) {
      return NativePromise.reject('Form not ready. Use form.ready promise');
    }
    this.element = element;
    return this.instance.attach(this.element)
      .then((param) => {
        this.emit('attach', param);
        return param;
      });
  }
}

// Allow simple embedding.
Formio.embedForm = (embed) => Form.embed(embed);

/**
 * Form Factory that creates a new {@link Form} instance. For more information on how to use this method, refer to the
 * {@tutorial renderer} documentation
 *
 * @memberof Formio
 * @tutorial renderer
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The {@link Form} options used to create this form.
 * @return {Promise<Webform>} - When the form is instance is ready.
 */
Formio.createForm = (...args) => {
  return (new Form(...args)).ready;
};

Formio.Form = Form;
export default Form;
