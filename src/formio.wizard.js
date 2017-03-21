'use strict';
import Promise from "native-promise-only";
import FormioForm from './formio.form';
import Formio from './formio';
import each from 'lodash/each';
export class FormioWizard extends FormioForm {
  constructor(element, options) {
    super(element, options);
    this.pages = [];
    this.page = 0;
  }

  setPage(num) {
    if (num >= 0 && num < this.pages.length) {
      this.page = num;
      return super.setForm(this.currentPage());
    }
    return Promise.reject('Page not found');
  }

  nextPage() {
    this.setPage(this.page + 1);
  }

  prevPage() {
    this.setPage(this.page - 1);
  }

  cancel() {
    super.cancel();
    this.setPage(0);
  }

  currentPage() {
    if ((this.page >= 0) && (this.page < this.pages.length)) {
      return this.pages[this.page];
    }
    this.page = 0;
    return this.pages.length ? this.pages[0] : {components: []};
  }

  setForm(form) {
    this.pages = [];
    each(form.components, (component) => {
      if (component.type === 'panel') {
        this.pages.push(component);
      }
    });
    return this.setPage(this.page);
  }

  build() {
    this.createWizardHeader();
    super.build();
    this.createWizardNav();
  }

  hasButton(name) {
    if (name === 'next') {
      return (this.page + 1) < this.pages.length;
    }
    if (name === 'previous') {
      return (this.page > 0);
    }
    if (name === 'submit') {
      return (this.page === (this.pages.length - 1));
    }
    return true;
  }

  createWizardHeader() {
    this.wizardHeader = this.ce('wizardHeader', 'ul', {
      class: 'pagination'
    });

    each(this.pages, (page, i) => {
      let pageButton = this.ce('pageButton', 'li', {
        class: (i === this.page) ? 'active' : 'disabled'
      });

      let pageLabel = this.ce('pageLabel', 'span');
      let pageTitle = (i === this.page) ? page.title : (i + 1);
      if (!pageTitle) {
        pageTitle = (i + 1);
      }
      pageLabel.appendChild(this.text(pageTitle));
      pageButton.appendChild(pageLabel);
      this.wizardHeader.appendChild(pageButton);
    });

    this.element.appendChild(this.wizardHeader);
  }

  createWizardNav() {
    this.wizardNav = this.ce('wizardNav', 'ul', {
      class: 'list-inline'
    });

    each([
      {name: 'cancel',    method: 'cancel',   class: 'btn btn-default'},
      {name: 'previous',  method: 'prevPage', class: 'btn btn-primary'},
      {name: 'next',      method: 'nextPage', class: 'btn btn-primary'},
      {name: 'submit',    method: 'submit',   class: 'btn btn-primary'}
    ], (button) => {
      if (!this.hasButton(button.name)) {
        return;
      }
      let buttonWrapper = this.ce('wizardNavButton', 'li');
      let buttonProp = button.name + 'Button';
      this[buttonProp] = this.ce(buttonProp, 'button', {
        class: button.class
      });
      this[buttonProp].appendChild(this.text(this.t(button.name)));
      this.addEventListener(this[buttonProp], 'click', (event) => {
        event.preventDefault();
        this[button.method]();
      });
      buttonWrapper.appendChild(this[buttonProp]);
      this.wizardNav.appendChild(buttonWrapper);
    });

    // Add the wizard navigation
    this.element.appendChild(this.wizardNav);
  }
}

FormioWizard.setBaseUrl = Formio.setBaseUrl;
FormioWizard.setApiUrl = Formio.setApiUrl;
FormioWizard.setAppUrl = Formio.setAppUrl;

module.exports = global.FormioWizard = FormioWizard;
