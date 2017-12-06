'use strict';
import Promise from "native-promise-only";
import FormioForm from './formio.form';
import Formio from './formio';
import FormioUtils from './utils';
import _ from 'lodash';
import each from 'lodash/each';
import clone from 'lodash/clone';
import defaults from 'lodash/defaults';
export class FormioWizard extends FormioForm {
  /**
   * Constructor for wizard based forms
   * @param element Dom element to place this wizard.
   * @param {Object} options Options object, supported options are:
   *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
   *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not  
   */ 
  constructor(element, options) {
    super(element, options);
    this.wizard = null;
    this.pages = [];
    this.globalComponents = [];
    this.page = 0;
    this.history = [];
    this._nextPage = 0;
  }

  setPage(num) {
    if (!this.wizard.full && num >= 0 && num < this.pages.length) {
      this.page = num;
      return super.setForm(this.currentPage());
    }
    else if (this.wizard.full) {
      return super.setForm(this.getWizard());
    }
    return Promise.reject('Page not found');
  }

  getNextPage(data, currentPage) {
    let form = this.pages[currentPage];
    // Check conditional nextPage
    if (form) {
      let page = ++currentPage;
      if (form.nextPage) {
        // Allow for script execution.
        if (typeof form.nextPage === 'string') {
          try {
            let next = page;
            eval('(function(data) {' + form.nextPage.toString() + '})(data)');
            page = next;
            if (!isNaN(parseInt(page, 10)) && isFinite(page)) {
              return page;
            }
            if (typeof page !== 'string') {
              return page;
            }

            // Assume they passed back the key of the page to go to.
            return this.getPageIndexByKey(page);
          }
          catch (e) {
            console.warn('An error occurred in a custom nextPage function statement for component ' + form.key, e);
            return page;
          }
        }
        // Or use JSON Logic.
        else {
          let result = FormioUtils.jsonLogic.apply(form.nextPage, {
            data,
            page,
            form,
            _
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
    let prev = this.history.pop();
    if(typeof prev !== 'undefined') {
      return prev;
    }

    return this.page - 1;
  }

  nextPage() {
    // Validate the form builed, before go to the next page
    if (this.checkValidity(this.submission.data, true)) {
      this.checkData(this.submission.data, {
        noValidate: true
      });
      return this.beforeNext().then(() => {
        this.history.push(this.page);
        return this.setPage(this.getNextPage(this.submission.data, this.page)).then(() => {
          this._nextPage = this.getNextPage(this.submission.data, this.page);
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
    this.history = [];
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

  addGlobalComponents(page) {
    // If there are non-page components, then add them here. This is helpful to allow for hidden fields that
    // can propogate between pages.
    if (this.globalComponents.length) {
      page.components = this.globalComponents.concat(page.components);
    }
    return page;
  }

  getPage(pageNum) {
    if ((pageNum >= 0) && (pageNum < this.pages.length)) {
      return this.addGlobalComponents(this.pages[pageNum]);
    }
    return null;
  }

  getWizard() {
    let pageIndex = 0;
    let page = null;
    let wizard = clone(this.wizard);
    wizard.components = [];
    do {
      page = this.getPage(pageIndex);
      if (page) {
        wizard.components.push(page);
      }
    } while (pageIndex = this.getNextPage(this.submission.data, pageIndex));

    // Add all other components.
    each(this.wizard.components, (component) => {
      if (component.type !== 'panel') {
        wizard.components.push(component);
      }
    });

    return wizard;
  }

  currentPage() {
    return this.getPage(this.page);
  }

  buildPages(form) {
    this.pages = [];
    each(form.components, (component) => {
      if (component.type === 'panel') {
        // Ensure that this page can be seen.
        if (FormioUtils.checkCondition(component, this.data, this.data)) {
          this.pages.push(component);
        }
      }
      else if (component.type === 'hidden') {
        // Global components are hidden components that can propagate between pages.
        this.globalComponents.push(component);
      }
    });
    this.buildWizardHeader();
    this.buildWizardNav();
  }

  setForm(form) {
    if (!form) {
      return;
    }
    this.wizard = form;
    this.buildPages(this.wizard);
    return this.setPage(this.page);
  }

  build() {
    super.build();
    this.formReady.then(() => {
      this.buildWizardHeader();
      this.buildWizardNav();
    });
  }

  hasButton(name, nextPage) {
    // Check for and initlize button settings object
    this.options.buttonSettings = defaults(this.options.buttonSettings, {
      showPrevious: true,
      showNext: true,
      showCancel: true
    });

    if (name === 'previous') {
      return (this.page > 0) && this.options.buttonSettings.showPrevious;
    }
    nextPage = (nextPage === undefined) ? this.getNextPage(this.submission.data, this.page) : nextPage;
    if (name === 'next') {
      return (nextPage !== null) && (nextPage < this.pages.length) && this.options.buttonSettings.showNext;
    }
    if (name === 'cancel') {
      return this.options.buttonSettings.showCancel;
    }
    if (name === 'submit') {
      return (nextPage === null) || (this.page === (this.pages.length - 1));
    }
    return true;
  }

  buildWizardHeader() {
    if (this.wizardHeader) {
      this.wizardHeader.innerHTML = '';
    }

    let currentPage = this.currentPage();
    if (!currentPage || this.wizard.full) {
      return;
    }

    currentPage.breadcrumb = currentPage.breadcrumb || 'default';
    if (currentPage.breadcrumb.toLowerCase() === 'none') {
      return;
    }

    // Check for and initlize breadcrumb settings object
    this.options.breadcrumbSettings = defaults(this.options.breadcrumbSettings, {
      clickable: true
    });

    this.wizardHeader = this.ce('ul', {
      class: 'pagination'
    });

    // Add the header to the beginning.
    this.prepend(this.wizardHeader);

    let showHistory = (currentPage.breadcrumb.toLowerCase() === 'history');
    each(this.pages, (page, i) => {
      // See if this page is in our history.
      if (showHistory && ((this.page !== i) && !this.history.includes(i))) {
        return;
      }

      // Set clickable based on breadcrumb settings
      let clickable = this.page !== i && this.options.breadcrumbSettings.clickable

      let pageButton = this.ce('li', {
        class: (i === this.page) ? 'active' : (clickable ? '' : 'disabled'),
        style: (clickable) ? 'cursor: pointer;' : ''
      });

      // Navigate to the page as they click on it.

      if (clickable) {
        this.addEventListener(pageButton, 'click', (event) => {
          event.preventDefault();
          this.setPage(i);
        });
      }

      let pageLabel = this.ce('span');
      let pageTitle = page.title;
      if (currentPage.breadcrumb.toLowerCase() === 'condensed') {
        pageTitle = ((i === this.page) || showHistory) ? page.title : (i + 1);
        if (!pageTitle) {
          pageTitle = (i + 1);
        }
      }

      pageLabel.appendChild(this.text(pageTitle));
      pageButton.appendChild(pageLabel);
      this.wizardHeader.appendChild(pageButton);
    });
  }

  pageId(page) {
    if (page.key) {
      return page.key;
    }
    else if (
      page.components &&
      page.components.length > 0
    ) {
      return this.pageId(page.components[0]);
    }
    else {
      return page.title;
    }
  }

  onChange(flags, changed) {
    super.onChange(flags, changed);

    // Only rebuild if there is a page change.
    let pageIndex = 0;
    let rebuild = false;
    each(this.wizard.components, (component) => {
      if (component.type !== 'panel') {
        return;
      }

      if (FormioUtils.hasCondition(component)) {
        let hasPage = this.pages && this.pages[pageIndex] && (this.pageId(this.pages[pageIndex]) === this.pageId(component));
        let shouldShow = FormioUtils.checkCondition(component, this.data, this.data);
        if ((shouldShow && !hasPage) || (!shouldShow && hasPage)) {
          rebuild = true;
          return false;
        }
        if (shouldShow) {
          pageIndex++;
        }
      }
      else {
        pageIndex++;
      }
    });

    if (rebuild) {
      this.setForm(this.wizard);
    }

    // Update Wizard Nav
    let nextPage = this.getNextPage(this.submission.data, this.page);
    if (this._nextPage != nextPage) {
      this.buildWizardNav(nextPage);
      this.emit('updateWizardNav', {oldpage: this._nextPage, newpage: nextPage, submission: this.submission});
      this._nextPage = nextPage;
    }
  }

  buildWizardNav(nextPage) {
    if (this.wizardNav) {
      this.wizardNav.innerHTML = '';
      if (this.element.contains(this.wizardNav)) {
        this.element.removeChild(this.wizardNav);
      }
    }
    if (this.wizard.full) {
      return;
    }
    this.wizardNav = this.ce('ul', {
      class: 'list-inline'
    });
    this.element.appendChild(this.wizardNav);
    each([
      {name: 'cancel',    method: 'cancel',   class: 'btn btn-default'},
      {name: 'previous',  method: 'prevPage', class: 'btn btn-primary'},
      {name: 'next',      method: 'nextPage', class: 'btn btn-primary'},
      {name: 'submit',    method: 'submit',   class: 'btn btn-primary'}
    ], (button) => {
      if (!this.hasButton(button.name, nextPage)) {
        return;
      }
      let buttonWrapper = this.ce('li');
      let buttonProp = button.name + 'Button';
      let buttonElement = this[buttonProp] = this.ce('button', {
        class: button.class + ' btn-wizard-nav-' + button.name
      });
      buttonElement.appendChild(this.text(this.t(button.name)));
      this.addEventListener(this[buttonProp], 'click', (event) => {
        event.preventDefault();

        // Disable the button until done.
        buttonElement.setAttribute('disabled', 'disabled');
        this.setLoading(buttonElement, true);

        // Call the button method, then re-enable the button.
        this[button.method]().then(() => {
          buttonElement.removeAttribute('disabled');
          this.setLoading(buttonElement, false);
        }).catch(() => {
          buttonElement.removeAttribute('disabled');
          this.setLoading(buttonElement, false);
        });
      });
      buttonWrapper.appendChild(this[buttonProp]);
      this.wizardNav.appendChild(buttonWrapper);
    });
  }
}

FormioWizard.setBaseUrl = Formio.setBaseUrl;
FormioWizard.setApiUrl = Formio.setApiUrl;
FormioWizard.setAppUrl = Formio.setAppUrl;

module.exports = global.FormioWizard = FormioWizard;
