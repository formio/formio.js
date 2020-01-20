import NativePromise from 'native-promise-only';
import _ from 'lodash';
import Webform from './Webform';
import Formio from './Formio';
import { fastCloneDeep, checkCondition, firstNonNil, uniqueKey } from './utils/utils';

export default class Wizard extends Webform {
  /**
   * Constructor for wizard based forms
   * @param element Dom element to place this wizard.
   * @param {Object} options Options object, supported options are:
   *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
   *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not
   */
  constructor() {
    let element, options;
    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    }
    else {
      options = arguments[0];
    }
    super(element, options);
    this.pages = [];
    this.prefixComps = [];
    this.suffixComps = [];
    this.components = [];
    this.originalComponents = [];
    this.page = 0;
    this.currentNextPage = 0;
    this._seenPages = [0];
  }

  isLastPage() {
    const next = this.getNextPage();

    if (_.isNumber(next)) {
      return 0 < next && next >= this.pages.length;
    }

    return _.isNull(next);
  }

  getPages(args = {}) {
    const { all = false } = args;
    const pages = this.pages
          .filter(all ? _.identity : (p, index) => this._seenPages.includes(index));

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
      showSubmit: true,
      showCancel: !this.options.readOnly
    });

    this.options.breadcrumbSettings = _.defaults(this.options.breadcrumbSettings, {
      clickable: true
    });

    this.page = 0;
    const onReady = super.init();
    this.setComponentSchema();
    return onReady;
  }

  get wizardKey() {
    return `wizard-${this.id}`;
  }

  get form() {
    return this.wizard;
  }

  set form(value) {
    super.form = value;
  }

  get buttons() {
    const buttons = {};
    [
      { name: 'cancel',    method: 'cancel' },
      { name: 'previous',  method: 'prevPage' },
      { name: 'next',      method: 'nextPage' },
      { name: 'submit',    method: 'submit' }
    ].forEach((button) => {
      if (this.hasButton(button.name)) {
        buttons[button.name] = button;
      }
    });
    return buttons;
  }

  get renderContext() {
    return {
      wizardKey: this.wizardKey,
      isBreadcrumbClickable: this.isBreadcrumbClickable(),
      panels: this.pages.map(page => page.component),
      buttons: this.buttons,
      currentPage: this.page,
    };
  }

  render() {
    const ctx = this.renderContext;
    return this.renderTemplate('wizard', {
      ...ctx,
      wizardHeader: this.renderTemplate('wizardHeader', ctx),
      wizardNav: this.renderTemplate('wizardNav', ctx),
      components: this.renderComponents([
        ...this.prefixComps,
        ...this.currentPage.components,
        ...this.suffixComps
      ]),
    }, this.builderMode ? 'builder' : 'form');
  }

  redrawNavigation() {
    if (this.element) {
      let navElement = this.element.querySelector(`#${this.wizardKey}-nav`);
      if (navElement) {
        this.detachNav();
        navElement.outerHTML = this.renderTemplate('wizardNav', this.renderContext);
        navElement = this.element.querySelector(`#${this.wizardKey}-nav`);
        this.loadRefs(navElement, {
          [`${this.wizardKey}-cancel`]: 'single',
          [`${this.wizardKey}-previous`]: 'single',
          [`${this.wizardKey}-next`]: 'single',
          [`${this.wizardKey}-submit`]: 'single',
        });
        this.attachNav();
      }
    }
  }

  redrawHeader() {
    if (this.element) {
      let headerElement = this.element.querySelector(`#${this.wizardKey}-header`);
      if (headerElement) {
        this.detachHeader();
        headerElement.outerHTML = this.renderTemplate('wizardHeader', this.renderContext);
        headerElement = this.element.querySelector(`#${this.wizardKey}-header`);
        this.loadRefs(headerElement, {
          [`${this.wizardKey}-link`]: 'multiple'
        });
        this.attachHeader();
      }
    }
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

    const promises = this.attachComponents(this.refs[this.wizardKey], [
      ...this.prefixComps,
      ...this.currentPage.components,
      ...this.suffixComps,
    ]);
    this.attachNav();
    this.attachHeader();
    return promises.then(() => this.emit('render'));
  }

  isBreadcrumbClickable() {
    return _.get(this.options, 'breadcrumbSettings.clickable', true);
  }

  attachNav() {
    _.each(this.buttons, (button) => {
      const buttonElement = this.refs[`${this.wizardKey}-${button.name}`];
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
  }

  attachHeader() {
    if (this.isBreadcrumbClickable()) {
      this.refs[`${this.wizardKey}-link`].forEach((link, index) => {
        this.addEventListener(link, 'click', (event) => {
          this.emit('wizardNavigationClicked', this.pages[index]);
          event.preventDefault();
          this.setPage(index);
        });
      });
    }
  }

  detachNav() {
    _.each(this.buttons, (button) => {
      this.removeEventListener(this.refs[`${this.wizardKey}-${button.name}`], 'click');
    });
  }

  detachHeader() {
    this.refs[`${this.wizardKey}-link`].forEach((link) => {
      this.removeEventListener(link, 'click');
    });
  }

  establishPages() {
    this.pages = [];
    this.prefixComps = [];
    this.suffixComps = [];
    const visible = [];
    const currentPages = {};
    const pageOptions = _.clone(this.options);
    if (this.components && this.components.length) {
      this.components.map(page => {
        if (page.component.type === 'panel') {
          currentPages[page.component.key || page.component.title] = page;
        }
      });
    }
    if (this.originalComponents) {
      this.originalComponents.forEach((item) => {
        if (item.type === 'panel') {
          if (!item.key) {
            item.key = item.title;
          }
          let page = currentPages[item.key];
          const isVisible = checkCondition(item, this.data, this.data, this.component, this);
          if (isVisible) {
            visible.push(item);
            if (page) {
              this.pages.push(page);
            }
          }
          if (!page && isVisible) {
            page = this.createComponent(item, pageOptions);
            this.pages.push(page);
            page.eachComponent((component) => {
              component.page = (this.pages.length - 1);
            });
          }
          else if (page && !isVisible) {
            this.removeComponent(page);
          }
        }
        else if (item.type !== 'button') {
          if (!this.pages.length) {
            this.prefixComps.push(this.createComponent(item, pageOptions));
          }
          else {
            this.suffixComps.push(this.createComponent(item, pageOptions));
          }
        }
      });
    }
    return visible;
  }

  addComponents() {
    this.establishPages();
  }

  setPage(num) {
    if (num === this.page) {
      return NativePromise.resolve();
    }
    if (!this.wizard.full && num >= 0 && num < this.pages.length) {
      this.page = num;

      this.pageFieldLogic(num);

      this.getNextPage();
      if (!this._seenPages.includes(num)) {
        this._seenPages = this._seenPages.concat(num);
      }
      this.redraw();
      return NativePromise.resolve();
    }
    else if (this.wizard.full || !this.pages.length) {
      this.redraw();
      return NativePromise.resolve();
    }
    return NativePromise.reject('Page not found');
  }

  pageFieldLogic(page) {
    // Handle field logic on pages.
    this.component = this.pages[page].component;
    this.originalComponent = fastCloneDeep(this.component);
    this.fieldLogic(this.data);
    // If disabled changed, be sure to distribute the setting.
    this.disabled = this.shouldDisabled;
  }

  get currentPage() {
    return (this.pages && (this.pages.length >= this.page)) ? this.pages[this.page] : { components: [] };
  }

  getNextPage() {
    const data = this.submission.data;
    const form = this.pages[this.page].component;
    // Check conditional nextPage
    if (form) {
      const page = this.pages.length > (this.page + 1) ? this.page + 1 : -1;
      if (form.nextPage) {
        const next = this.evaluate(form.nextPage, {
          next: page,
          data,
          page,
          form
        }, 'next');
        if (next === null) {
          this.currentNextPage = null;
          return null;
        }

        const pageNum = parseInt(next, 10);
        if (!isNaN(parseInt(pageNum, 10)) && isFinite(pageNum)) {
          this.currentNextPage = pageNum;
          return pageNum;
        }

        this.currentNextPage = this.getPageIndexByKey(next);
        return this.currentNextPage;
      }

      this.currentNextPage = page;
      return page;
    }

    this.currentNextPage = null;
    return null;
  }

  getPreviousPage() {
    return this.page - 1;
  }

  beforeSubmit() {
    return NativePromise.all(this.getPages().map((page) => {
      page.options.beforeSubmit = true;
      return page.beforeSubmit();
    }));
  }

  beforePage(next) {
    return new NativePromise((resolve, reject) => {
      this.hook(next ? 'beforeNext' : 'beforePrev', this.currentPage, this.submission, (err) => {
        if (err) {
          this.showErrors(err, true);
          reject(err);
        }

        const form = this.currentPage;
        if (form) {
          form.beforePage(next).then(resolve).catch(reject);
        }
        else {
          resolve();
        }
      });
    });
  }

  nextPage() {
    // Read-only forms should not worry about validation before going to next page, nor should they submit.
    if (this.options.readOnly) {
      return this.setPage(this.getNextPage()).then(() => {
        this.emit('nextPage', { page: this.page, submission: this.submission });
      });
    }

    // Validate the form, before go to the next page
    if (this.checkValidity(this.submission.data, true, this.submission.data, true)) {
      this.checkData(this.submission.data);
      return this.beforePage(true).then(() => {
        return this.setPage(this.getNextPage()).then(() => {
          this.emit('nextPage', { page: this.page, submission: this.submission });
        });
      });
    }
    else {
      return NativePromise.reject(this.showErrors([], true));
    }
  }

  prevPage() {
    return this.beforePage().then(() => {
      return this.setPage(this.getPreviousPage()).then(() => {
        this.emit('prevPage', { page: this.page, submission: this.submission });
      });
    });
  }

  checkData(data, flags) {
    const dirty = this.currentPage.components.some(component => !component.isEmpty());
    return super.checkData(data, flags) && this.checkValidity(data, dirty, true);
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
    let pageIndex = this.page;
    this.pages.forEach((page, index) => {
      if (page.component.key === key) {
        pageIndex = index;
        return false;
      }
    });
    return pageIndex;
  }

  get schema() {
    return this.wizard;
  }

  setComponentSchema() {
    const pageKeys = {};
    this.originalComponents = [];
    this.component.components.map((item) => {
      if (item.type === 'panel') {
        item.key = uniqueKey(pageKeys, (item.key || 'panel'));
        pageKeys[item.key] = true;
      }
      this.originalComponents.push(_.clone(item));
    });

    if (!Object.keys(pageKeys).length) {
      const newPage = {
        type: 'panel',
        title: 'Page 1',
        label: 'Page 1',
        key: 'page1',
        components: this.component.components
      };
      this.component.components = [newPage];
      this.originalComponents.push(_.clone(newPage));
    }
  }

  setForm(form) {
    if (!form) {
      return;
    }
    this.wizard = form;
    this.component.components = form.components || [];
    this.setComponentSchema();
    return super.setForm(form);
  }

  setValue(submission, flags) {
    const changed = super.setValue(submission, flags);
    this.pageFieldLogic(this.page);
    return changed;
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
      return (this.getPreviousPage() > -1) && show;
    }
    nextPage = (nextPage === undefined) ? this.getNextPage() : nextPage;
    if (name === 'next') {
      const show = firstNonNil([
        _.get(currentPage, 'buttonSettings.next'),
        this.options.buttonSettings.showNext
      ]);
      return (nextPage !== null) && (nextPage !== -1) && show;
    }
    if (name === 'cancel') {
      return firstNonNil([
        _.get(currentPage, 'buttonSettings.cancel'),
        this.options.buttonSettings.showCancel
      ]);
    }
    if (name === 'submit') {
      const show = firstNonNil([
        _.get(currentPage, 'buttonSettings.submit'),
        this.options.buttonSettings.showSubmit
      ]);
      return show && !this.options.readOnly && ((nextPage === null) || (this.page === (this.pages.length - 1)));
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

  onChange(flags, changed) {
    super.onChange(flags, changed);
    if (this.alert && !this.submitted) {
      this.checkValidity(this.submission.data, true, this.submission.data, true);
      this.showErrors([], true);
    }

    // If the pages change, need to redraw the header.
    const currentPanels = this.pages.map(page => page.component.key);
    const panels = this.establishPages().map(panel => panel.key);
    if (!_.isEqual(panels, currentPanels)) {
      this.redrawHeader();
    }

    // If the next page changes, then make sure to redraw navigation.
    if (this.currentNextPage !== this.getNextPage()) {
      this.redrawNavigation();
    }
  }

  checkValidity(data, dirty, row, currentPageOnly) {
    if (!this.checkCondition(row, data)) {
      this.setCustomValidity('');
      return true;
    }

    const components = !currentPageOnly || this.isLastPage()
      ? this.getComponents()
      : this.currentPage.components;

    return components.reduce(
      (check, comp) => comp.checkValidity(data, dirty, row) && check,
      true
    );
  }

  get errors() {
    if (!this.isLastPage()) {
      return this.currentPage.errors;
    }

    return super.errors;
  }

  focusOnComponent(key) {
    let pageIndex = 0;
    const [page] = this.pages.filter((page, index) => {
      if (page.getComponent(key)) {
        pageIndex = index;
        return true;
      }
      return false;
    });

    if (page && page !== this.currentPage) {
      return this.setPage(pageIndex).then(() => {
        this.checkValidity(this.submission.data, true, this.submission.data);
        this.showErrors();
        super.focusOnComponent(key);
      });
    }
    return super.focusOnComponent(key);
  }
}

Wizard.setBaseUrl = Formio.setBaseUrl;
Wizard.setApiUrl = Formio.setApiUrl;
Wizard.setAppUrl = Formio.setAppUrl;
