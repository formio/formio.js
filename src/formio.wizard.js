'use strict';
import Promise from "native-promise-only";
import FormioForm from './formio.form';
import Formio from './formio';
import each from 'lodash/each';
import jsonLogic from 'json-logic-js';
export class FormioWizard extends FormioForm {
  constructor(element, options) {
    super(element, options);
    this.pages = [];
    this.page = 0;
    this.historyPages = {};
    this._nextPage = 1;
  }

  setPage(num) {
    if (num >= 0 && num < this.pages.length) {
      this.page = num;
      return super.setForm(this.currentPage());
    }
    return Promise.reject('Page not found');
  }

  getCondionalNextPage(data, page) {

    let form = this.pages[page];
    // Check conditional nextPage
    if (form) {
      page++;
      if(form.nextPage) {
        // Allow for script execution.
        if (typeof form.nextPage === 'string') {
          try {
            let script = '(function() {';
            script += form.nextPage.toString();
            script += '; return page; })()';
            let result = eval(script);
            let newPage = parseInt(result, 10);
            if (!isNaN(parseInt(newPage, 10)) && isFinite(newPage)) {
              return newPage;
            }

            // Assume they passed back the key of the page to go to.
            return this.getPageIndexByKey(result);
          }
          catch (e) {
            console.warn('An error occurred in a custom nextPage function statement for component ' + form.key, e);
            return page;
          }
        }
        // Or use JSON Logic.
        else {
          let result = jsonLogic.apply(form.nextPage, {
            data: data,
            page: page,
            form: form
          });
          let newPage = parseInt(result, 10);
          if (!isNaN(parseInt(newPage, 10)) && isFinite(newPage)) {
            return newPage;
          }

          return this.getPageIndexByKey(result);
        }
      }

      return page;
    }

    return null;
  }

  getPreviousPage() {
    if(typeof this.historyPages[this.page] !== 'undefined') {
      return this.historyPages[this.page];
    }

    return this.page - 1;
  }

  nextPage() {
    // Validate the form builed, before go to the next page
    if (this.checkValidity(this.submission.data, true)) {
      let currentPage = this.page;
      let nextPage = this.getCondionalNextPage(this.submission.data, currentPage);

      // Allow components to perform their own functions.
      return this.beforeNext(this.getPage(currentPage), this.getPage(nextPage)).then(() => {

        // Set the next page.
        return this.setPage(nextPage).then(() => {
          this.historyPages[this.page] = currentPage;
          this._nextPage = this.getCondionalNextPage(this.submission.data, this.page);
          this.emit('nextPage', {page: this.page, submission: this.submission});
        });
      });
    }
    else {
      return Promise.reject(this.showErrors());
    }
  }

  prevPage() {
    let prevPage = this.getPreviousPage();
    return this.setPage(prevPage).then(() => {
      this.emit('prevPage', {page: this.page, submission: this.submission});
    });
  }

  cancel() {
    super.cancel();
    this.historyPages = {};
    return this.setPage(0);
  }

  getPageIndexByKey(key) {
    let pageIndex = 0;
    each(this.pages, (_page, index) => {
      if (_page.key === key) {
        pageIndex = index;
        return false;
      }
    });
    return pageIndex;
  }

  getPage(pageNum) {
    if ((pageNum >= 0) && (pageNum < this.pages.length)) {
      return this.pages[pageNum];
    }
    return this.pages.length ? this.pages[0] : {components: []};
  }

  currentPage() {
    return this.getPage(this.page);
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
    if (name === 'previous') {
      return (this.page > 0);
    }
    let nextPage = this.getCondionalNextPage(this.submission.data, this.page);
    if (name === 'next') {
      return (nextPage !== null) && (nextPage < this.pages.length);
    }
    if (name === 'submit') {
      return (nextPage === null) || (this.page === (this.pages.length - 1));
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

  onSubmissionChange(changed) {
    super.onSubmissionChange(changed);

    // Update Wizard Nav
    let nextPage = this.getCondionalNextPage(this.submission.data, this.page);
    if (this._nextPage != nextPage) {
      this.element.removeChild(this.wizardNav);
      this.createWizardNav();
      this.emit('updateWizardNav', {oldpage: this._nextPage, newpage: nextPage, submission: this.submission});
      this._nextPage = nextPage;
    }
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
