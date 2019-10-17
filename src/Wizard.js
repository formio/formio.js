import NativePromise from 'native-promise-only';
import _ from 'lodash';
import Webform from './Webform';
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
    this.panels = [];
    this.pages = [];
    this.globalComponents = [];
    this.components = [];
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
      components: this.renderComponents([...this.globalComponents, ...this.currentPage.components]),
    }, this.builderMode ? 'builder' : 'form');
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

    const promises = this.attachComponents(this.refs[this.wizardKey], [...this.globalComponents, ...this.currentPage.components]);

    const isClickable = _.get(this.options, 'breadcrumbSettings.clickable', true);
    if (isClickable) {
      [
        { name: 'cancel',    method: 'cancel' },
        { name: 'previous',  method: 'prevPage' },
        { name: 'next',      method: 'nextPage' },
        { name: 'submit',    method: 'submit' }
      ].forEach((button) => {
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
    _.each(this.originalComponents, (item) => {
      const pageOptions = _.clone(this.options);
      if (item.type === 'panel') {
        if (checkCondition(item, this.data, this.data, this.component, this)) {
          this.panels.push(item);
          if (!item.key) {
            item.key = item.title;
          }
          const page = this.createComponent(item, pageOptions);
          this.pages.push(page);
          page.eachComponent((component) => {
            component.page = this.page;
          });
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
    this.component = this.panels[page];
    this.originalComponent = _.cloneDeep(this.component);
    this.fieldLogic(this.data);
    // If disabled changed, be sure to distribute the setting.
    this.disabled = this.shouldDisabled;
  }

  get currentPage() {
    return (this.pages && (this.pages.length >= this.page)) ? this.pages[this.page] : { components: [] };
  }

  getNextPage() {
    const data = this.submission.data;
    const form = this.panels[this.page];
    // Check conditional nextPage
    if (form) {
      const page = this.page + 1;
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
    return Math.max(this.page - 1, 0);
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
    if (this.checkValidity(this.submission.data, true, true)) {
      this.checkData(this.submission.data);
      return this.beforePage(true).then(() => {
        return this.setPage(this.getNextPage()).then(() => {
          this.emit('nextPage', { page: this.page, submission: this.submission });
        });
      });
    }
    else {
      return NativePromise.reject(this.showErrors(null, true));
    }
  }

  prevPage() {
    return this.beforePage().then(() => {
      return this.setPage(this.getPreviousPage()).then(() => {
        this.emit('prevPage', { page: this.page, submission: this.submission });
      });
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
    let pageIndex = this.page;
    this.panels.forEach((page, index) => {
      if (page.key === key) {
        pageIndex = index;
        return false;
      }
    });
    return pageIndex;
  }

  get schema() {
    return this.wizard;
  }

  setForm(form) {
    if (!form) {
      return;
    }
    this.wizard = form;
    this.component.components = form.components || [];

    // Check if there are no panel components.
    if (this.component.components.filter(component => component.type === 'panel').length === 0) {
      this.component.components = [
        {
          type: 'panel',
          title: 'Page 1',
          label: 'Page 1',
          key: 'page1',
          components: this.component.components
        }
      ];
    }

    this.originalComponents = _.cloneDeep(this.component.components);

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
      return (this.page > 0) && show;
    }
    nextPage = (nextPage === undefined) ? this.getNextPage() : nextPage;
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

  calculateVisiblePanels() {
    const visible = [];
    _.each(this.wizard.components, (component) => {
      if (component.type === 'panel') {
        // Ensure that this page can be seen.
        if (checkCondition(component, this.data, this.data, this.wizard, this)) {
          if (!component.key) {
            component.key = component.title;
          }
          visible.push(component);
        }
      }
    });
    return visible;
  }

  onChange(flags, changed) {
    super.onChange(flags, changed);

    // Only rebuild if there is a page visibility change.
    const currentNextPage = this.currentNextPage;
    const nextPage = this.getNextPage();
    const currentPanels = this.panels.map(panel => panel.key);
    const panels = this.calculateVisiblePanels().map(panel => panel.key);
    if (
      (nextPage !== currentNextPage) ||
      !_.isEqual(panels, currentPanels)
    ) {
      // If visible panels changes we need to build this template again.
      this.rebuild();
    }
  }

  rebuild() {
    this.destroyComponents();
    this.addComponents();
    return this.redraw();
  }

  checkValidity(data, dirty, currentPageOnly) {
    if (!this.checkCondition(null, data)) {
      this.setCustomValidity('');
      return true;
    }

    const components = !currentPageOnly || this.isLastPage()
      ? this.getComponents()
      : this.currentPage.components;

    return components.reduce(
      (check, comp) => comp.checkValidity(data, dirty) && check,
      true
    );
  }

  get errors() {
    if (!this.isLastPage()) {
      return this.currentPage.errors;
    }

    return super.errors;
  }
}

Wizard.setBaseUrl = Formio.setBaseUrl;
Wizard.setApiUrl = Formio.setApiUrl;
Wizard.setAppUrl = Formio.setAppUrl;
