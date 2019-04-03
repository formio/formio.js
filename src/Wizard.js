import _ from 'lodash';
import Webform from './Webform';
import Component from './components/_classes/component/Component';
import Formio from './Formio';
import { checkCondition, firstNonNil } from './utils/utils';

export default class Wizard extends Webform {
  /**
   * Constructor for wizard based forms
   * @param element Dom element to place this wizard.
   * @param {Object} options Options object, supported options are:
   *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
   *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not
   */
  constructor(element, options) {
    super(element, options);
    this.panels = [];
    this.pages = [];
    this.globalComponents = [];
    this.components = [];
    this.page = 0;
    this._seenPages = [0];
  }

  isLastPage() {
    const next = this.getNextPage(this.submission.data, this.page);

    if (_.isNumber(next)) {
      return 0 < next && next >= this.pages.length;
    }

    return _.isNull(next);
  }

  getPages(args = {}) {
    const { all = false } = args;
    const pageOptions = _.clone(this.options);
    const components = _.clone(this.components);
    const pages = this.pages
          .filter(all ? _.identity : (p, index) => this._seenPages.includes(index))
          .map((page, index) => this.createComponent(
            page,
            _.assign(pageOptions, { components: index === this.page ? components : null })
          ));

    this.components = components;

    return pages;
  }

  getComponents() {
    return this.submitting
      ? this.getPages({ all: this.isLastPage() })
      : super.getComponents();
  }

  resetValue() {
    this.getPages({ all: true }).forEach((page) => page.resetValue());
    this.setPristine(true);
  }

  init() {
    // Check for and initlize button settings object
    this.options.buttonSettings = _.defaults(this.options.buttonSettings, {
      showPrevious: true,
      showNext: true,
      showCancel: !this.options.readOnly
    });

    this.options.breadcrumbSettings = _.defaults(this.options.breadcrumbSettings, {
      clickable: true
    });

    this.page = 0;
    return super.init();
  }

  get wizardKey() {
    return `wizard-${this.key}`;
  }

  get form() {
    return this.wizard;
  }

  set form(value) {
    super.form = value;
  }

  get buttons() {
    const buttons = {};
    ['cancel', 'previous', 'next', 'submit'].forEach((button) => {
      if (this.hasButton(button)) {
        buttons[button] = true;
      }
    });
    return buttons;
  }

  render() {
    return this.renderTemplate('wizard', {
      wizardKey: this.wizardKey,
      panels: this.panels,
      buttons: this.buttons,
      currentPage: this.page,
      components: this.renderComponents([...this.globalComponents, ...this.pages[this.page]]),
    }, (this.options.attachMode === 'builder') ? 'builder' : 'form');
  }

  attach(element) {
    this.element = element;
    this.loadRefs(element, {
      [this.wizardKey]: 'single',
      [`${this.wizardKey}-cancel`]: 'single',
      [`${this.wizardKey}-previous`]: 'single',
      [`${this.wizardKey}-next`]: 'single',
      [`${this.wizardKey}-submit`]: 'single',
      [`${this.wizardKey}-link`]: 'multiple',
    });

    const promises = this.attachComponents(this.refs[this.wizardKey], [...this.globalComponents, ...this.pages[this.page]]);

    [
      { name: 'cancel',    method: 'cancel' },
      { name: 'previous',  method: 'prevPage' },
      { name: 'next',      method: 'nextPage' },
      { name: 'submit',    method: 'submit' }
    ].forEach((button) => {
      const buttonElement = this.refs[`${this.wizardKey}-${button.name}`];
      if (!buttonElement) {
        return;
      }
      this.addEventListener(buttonElement, 'click', (event) => {
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
    });

    this.refs[`${this.wizardKey}-link`].forEach((link, index) => {
      this.addEventListener(link, 'click', (event) => {
        this.emit('wizardNavigationClicked', this.pages[index]);
        event.preventDefault();
        this.setPage(index);
      });
    });

    return promises;
  }

  addComponents() {
    this.pages = [];
    this.panels = [];
    _.each(this.component.components, (item) => {
      const pageOptions = _.clone(this.options);
      if (item.type === 'panel') {
        if (checkCondition(item, this.data, this.data, this.component, this)) {
          this.panels.push(item);
          const page = [];
          _.each(item.components, (comp) => {
            const component = this.createComponent(comp, pageOptions);
            component.page = this.page;
            page.push(component);
          });
          this.pages.push(page);
        }
      }
      else if (item.type === 'hidden') {
        const component = this.createComponent(item, pageOptions);
        this.globalComponents.push(component);
      }
    });
  }

  setPage(num) {
    if (num === this.page) {
      return;
    }
    if (!this.wizard.full && num >= 0 && num < this.pages.length) {
      this.page = num;
      if (!this._seenPages.includes(num)) {
        this._seenPages = this._seenPages.concat(num);
      }
      this.redraw();
      return Promise.resolve();
    }
    else if (this.wizard.full || !this.pages.length) {
      this.redraw();
      return Promise.resolve();
    }
    return Promise.reject('Page not found');
  }

  get currentPage() {
    return (this.pages && (this.pages.length >= this.page)) ? this.pages[this.page] : null;
  }

  getNextPage(data, currentPage) {
    const form = this.pages[currentPage];
    // Check conditional nextPage
    if (form) {
      const page = ++currentPage;
      if (form.nextPage) {
        const next = this.evaluate(form.nextPage, {
          next: page,
          data,
          page,
          form
        }, 'next');
        if (next === null) {
          return null;
        }

        const pageNum = parseInt(next, 10);
        if (!isNaN(parseInt(pageNum, 10)) && isFinite(pageNum)) {
          return pageNum;
        }

        return this.getPageIndexByKey(next);
      }

      return page;
    }

    return null;
  }

  getPreviousPage() {
    return Math.max(this.page - 1, 0);
  }

  beforeSubmit() {
    return Promise.all(this.getPages().map((page) => {
      page.options.beforeSubmit = true;
      return page.beforeSubmit();
    }));
  }

  nextPage() {
    // Read-only forms should not worry about validation before going to next page, nor should they submit.
    if (this.options.readOnly) {
      return this.setPage(this.getNextPage(this.submission.data, this.page)).then(() => {
        this.emit('nextPage', { page: this.page, submission: this.submission });
      });
    }

    // Validate the form builed, before go to the next page
    if (this.checkCurrentPageValidity(this.submission.data, true)) {
      this.checkData(this.submission.data);
      return this.beforeNext().then(() => {
        return this.setPage(this.getNextPage(this.submission.data, this.page)).then(() => {
          this.emit('nextPage', { page: this.page, submission: this.submission });
        });
      });
    }
    else {
      return Promise.reject(this.showErrors(null, true));
    }
  }

  prevPage() {
    const prevPage = this.getPreviousPage();
    return this.setPage(prevPage).then(() => {
      this.emit('prevPage', { page: this.page, submission: this.submission });
    });
  }

  cancel(noconfirm) {
    if (super.cancel(noconfirm)) {
      return this.setPage(0);
    }
    else {
      return this.setPage();
    }
  }

  getPageIndexByKey(key) {
    let pageIndex = 0;
    this.pages.forEach((page, index) => {
      if (page.key === key) {
        pageIndex = index;
        return false;
      }
    });
    return pageIndex;
  }

  checkPageValidity(data, dirty, page) {
    page = page || this.page;

    let check = true;
    this.pages[page].forEach((comp) => {
      check &= comp.checkValidity(data, dirty);
    });
    return check;
  }

  get schema() {
    return this.wizard;
  }

  setForm(form) {
    if (!form) {
      return;
    }
    this.wizard = form;
    this.component.components = form.components;
    return super.setForm(form);
  }

  isClickable(page, index) {
    return this.page !== index && firstNonNil([
      _.get(page, 'breadcrumbClickable'),
      this.options.breadcrumbSettings.clickable
    ]);
  }

  hasButton(name, nextPage) {
    const currentPage = this.currentPage;
    if (name === 'previous') {
      const show = firstNonNil([
        _.get(currentPage, 'buttonSettings.previous'),
        this.options.buttonSettings.showPrevious
      ]);
      return (this.page > 0) && show;
    }
    nextPage = (nextPage === undefined) ? this.getNextPage(this.submission.data, this.page) : nextPage;
    if (name === 'next') {
      const show = firstNonNil([
        _.get(currentPage, 'buttonSettings.next'),
        this.options.buttonSettings.showNext
      ]);
      return (nextPage !== null) && (nextPage < this.pages.length) && show;
    }
    if (name === 'cancel') {
      return firstNonNil([
        _.get(currentPage, 'buttonSettings.cancel'),
        this.options.buttonSettings.showCancel
      ]);
    }
    if (name === 'submit') {
      return !this.options.readOnly && ((nextPage === null) || (this.page === (this.pages.length - 1)));
    }
    return true;
  }

  pageId(page) {
    if (page.key) {
      // Some panels have the same key....
      return `${page.key}-${page.title}`;
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

  calculateVisiblePanels() {
    const visible = [];
    _.each(this.wizard.components, (component) => {
      if (component.type === 'panel') {
        // Ensure that this page can be seen.
        if (checkCondition(component, this.data, this.data, this.wizard, this)) {
          visible.push(component);
        }
      }
    });
    return visible;
  }

  onChange(flags, changed) {
    super.onChange(flags, changed);

    // Only rebuild if there is a page visibility change.
    const panels = this.calculateVisiblePanels();
    if (!_.isEqual(panels.map(panel => panel.key), this.panels.map(panel => panel.key))) {
      // If visible panels changes we need to completely rebuild to add new pages.
      this.rebuild();
    }
  }

  rebuild() {
    this.destroyComponents();
    this.addComponents();
    this.redraw();
  }

  checkCurrentPageValidity(...args) {
    return super.checkValidity(...args);
  }

  checkPagesValidity(pages, ...args) {
    const isValid = Component.prototype.checkValidity.apply(this, args);
    return pages.reduce((check, pageComp) => {
      return pageComp.checkValidity(...args) && check;
    }, isValid);
  }

  checkValidity(data, dirty) {
    if (this.submitting) {
      return this.checkPagesValidity(this.getPages(), data, dirty);
    }
    else {
      return this.checkCurrentPageValidity(data, dirty);
    }
  }

  get errors() {
    if (this.isLastPage()) {
      const pages = this.getPages({ all: true });

      this.checkPagesValidity(pages, this.submission.data, true);

      return pages.reduce((errors, pageComp) => {
        return errors.concat(pageComp.errors || []);
      }, []);
    }

    return super.errors;
  }
}

Wizard.setBaseUrl = Formio.setBaseUrl;
Wizard.setApiUrl = Formio.setApiUrl;
Wizard.setAppUrl = Formio.setAppUrl;
