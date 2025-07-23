import _ from 'lodash';

import Webform from './Webform';
import { Formio } from './Formio';
import {
  fastCloneDeep,
  checkCondition,
  firstNonNil,
  uniqueKey,
  eachComponent,
} from './utils';

export default class Wizard extends Webform {
  /**
   * Constructor for wizard-based forms.
   * @param {HTMLElement | object | import('Form').FormOptions} [elementOrOptions] - The DOM element to render this form within or the options to create this form instance.
   * @param {import('Form').FormOptions} [_options] - The options to create a new form instance.
   *    - breadcrumbSettings.clickable: true (default) - determines if the breadcrumb bar is clickable.
   *    - buttonSettings.show*(Previous, Next, Cancel): true (default) - determines if the button is shown.
   *    - allowPrevious: false (default) - determines if the breadcrumb bar is clickable for visited tabs.
   */
  constructor(elementOrOptions = undefined, _options = undefined) {
    let element, options;
    if (elementOrOptions instanceof HTMLElement || _options) {
        element = elementOrOptions;
        options = _options || {};
    } else {
        options = elementOrOptions || {};
    }

    options.display = 'wizard';
    super(element, options);
    this.pages = [];
    this.prefixComps = [];
    this.suffixComps = [];
    this.components = [];
    this.originalComponents = [];
    this.page = 0;
    this.currentPanel = null;
    this.currentNextPage = 0;
    this._seenPages = [0];
    this.subWizards = [];
    this.allPages = [];
    this.lastPromise = Promise.resolve();
    this.enabledIndex = 0;
    this.editMode = false;
    this.originalOptions = _.cloneDeep(this.options);
  }

  isLastPage() {
    const next = this.getNextPage();

    if (_.isNumber(next)) {
      return next === -1;
    }

    return _.isNull(next);
  }

  getPages(args = {}) {
    const { all = false } = args;
    const pages = this.hasSubWizards ? this.components : this.pages;
    const filteredPages = pages
      .filter(all ? _.identity : (p, index) => this._seenPages.includes(index));

    return filteredPages;
  }

  get hasSubWizards() {
    return !_.isEmpty(this.subWizards);
  }

  get data() {
    return super.data;
  }

  get localData() {
    return this.pages[this.page]?.root?.submission.data || this.submission.data;
  }

  checkConditions(data, flags, row) {
    const visible = super.checkConditions(data, flags, row);
    this.establishPages(data);
    return visible;
  }

  set data(value) {
    this._data = value;
    _.each(this.getPages({ all: true }), (component) => {
      component.data = this.componentContext(component);
    });
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
    this.options.allowPrevious = this.options.allowPrevious || false;

    this.page = 0;
    const onReady = super.init();
    this.setComponentSchema();

    if (this.pages?.[this.page]) {
      this.component = this.pages[this.page].component;
    }

    this.on('subWizardsUpdated', (subForm) => {
      const subWizard = this.subWizards.find(subWizard => subForm?.id && subWizard.subForm?.id === subForm?.id);

      if (this.subWizards.length && subWizard) {
        subWizard.subForm.setValue(subForm._submission, {}, true);
        this.establishPages();
        this.redraw();
      }
    });

    return onReady;
  }

  get wizardKey() {
    return `wizard-${this.id}`;
  }

  get wizard() {
    return this.form;
  }

  set wizard(form) {
    this.setForm(form);
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

  get buttonOrder() {
    const defaultButtonOrder = [
      'cancel',
      'previous',
      'next',
      'submit'
    ];
    return this.options.properties?.wizardButtonOrder?.toLowerCase().split(', ') ?? defaultButtonOrder;
  }

  get renderContext() {
    return {
      disableWizardSubmit: this.form.disableWizardSubmit,
      wizardKey: this.wizardKey,
      isBreadcrumbClickable: this.isBreadcrumbClickable(),
      isSubForm: !!this.parent && !this.root?.component?.type === 'wizard',
      panels: this.allPages.length ? this.allPages.map(page => page.component) : this.pages.map(page => page.component),
      buttons: this.buttons,
      currentPage: this.page,
      buttonOrder: this.buttonOrder,
    };
  }

  prepareNavigationSettings(ctx) {
    const currentPanel = this.currentPanel;

    if (currentPanel && currentPanel.buttonSettings) {
      Object.keys(currentPanel.buttonSettings).forEach(() => {
        Object.keys(ctx.buttons).forEach(key => {
          if (typeof currentPanel.buttonSettings[key] !== 'undefined' && !currentPanel.buttonSettings[key] || ctx.isSubForm) {
            ctx.buttons[key] = null;
          }
        });
      });
    }

    return this.renderTemplate('wizardNav', ctx);
  }

  prepareHeaderSettings(ctx, headerType) {
    const shouldHideBreadcrumbs = this.currentPanel?.breadcrumb === 'none' ||
      _.get(this.form, 'settings.wizardBreadcrumbsType', '') === 'none';
    if (shouldHideBreadcrumbs || ctx.isSubForm) {
      return null;
    }
    return this.renderTemplate(headerType, ctx);
  }

  render() {
    const ctx = this.renderContext;

    if (this.component.id) {
      ctx.panels.forEach(panel => {
        if (panel.id === this.component.id) {
          this.currentPanel = panel;
          ctx.wizardPageTooltip = this.getFormattedTooltip(panel.tooltip);
        }
      });
    }

    const wizardNav = this.prepareNavigationSettings(ctx);

    const wizardHeaderType = `wizardHeader${_.get(this.form, 'settings.wizardHeaderType', '')}`;
    const wizardHeaderLocation =  _.get(this.form, 'settings.wizardHeaderLocation', 'left');
    const wizardHeader = this.prepareHeaderSettings(ctx, wizardHeaderType);

    return this.renderTemplate('wizard', {
      ...ctx,
      className: super.getClassName(),
      wizardHeader,
      wizardHeaderType,
      wizardHeaderLocation,
      wizardNav,
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
        headerElement.outerHTML = this.renderTemplate(`wizardHeader${_.get(this.form, 'settings.wizardHeaderType', '')}`, this.renderContext);
        headerElement = this.element.querySelector(`#${this.wizardKey}-header`);
        this.loadRefs(headerElement, {
          [`${this.wizardKey}-link`]: 'multiple',
          [`${this.wizardKey}-tooltip`]: 'multiple'
        });
        this.attachHeader();
      }
    }
  }

  /**
   * Attaches the wizard to the provided DOM element, initializes component references, sets up navigation,
   * and emits a render event. It will initialize the wizard's index if necessary,
   * attach event hooks, and make sure that the current page is rendered and displayed correctly.
   * @param {HTMLElement} element - The DOM element to which the wizard will be attached.
   * @returns {Promise} A promise that resolves when all components have been successfully attached.
   */
  attach(element) {
    this.setElement(element);
    this.loadRefs(element, {
      [this.wizardKey]: 'single',
      [`${this.wizardKey}-header`]: 'single',
      [`${this.wizardKey}-cancel`]: 'single',
      [`${this.wizardKey}-previous`]: 'single',
      [`${this.wizardKey}-next`]: 'single',
      [`${this.wizardKey}-submit`]: 'single',
      [`${this.wizardKey}-link`]: 'multiple',
      [`${this.wizardKey}-tooltip`]: 'multiple'
    });
    if ((this.options.readOnly || this.editMode) && !this.enabledIndex) {
      this.enabledIndex = this.pages?.length - 1;
    }

    this.hook('attachWebform', element, this);
    const promises = this.attachComponents(this.refs[this.wizardKey], [
      ...this.prefixComps,
      ...this.currentPage.components,
      ...this.suffixComps,
    ]);
    this.attachNav();
    this.attachHeader();
    return promises.then(() => {
      this.emit('render', { component: this.currentPage, page: this.page });
      if (this.component.scrollToTop) {
        this.scrollPageToTop();
      }
    });
  }

  scrollPageToTop() {
    const pageTop = this.refs[`${this.wizardKey}-header`] ?? this.refs[this.wizardKey];

    if (!pageTop) {
      return;
    }

    if ('scrollIntoView' in pageTop) {
      pageTop.scrollIntoView(true);
    }
    else {
      this.scrollIntoView(pageTop);
    }
  }

  isBreadcrumbClickable() {
    let currentPage = null;
    this.pages.map(page => {
      if (_.isEqual(this.currentPage.component, page.component)) {
        currentPage = page;
      }
    });

    if (_.has(currentPage, 'component.breadcrumbClickable')) {
      return _.get(currentPage, 'component.breadcrumbClickable');
    }

    if (_.has(this.options, 'breadcrumbSettings.clickable')) {
      return this.options.breadcrumbSettings.clickable;
    }

    return true;
  }

  isAllowPrevious() {
    let currentPage = null;
    this.pages.map(page => {
      if (_.isEqual(this.currentPage.component, page.component)) {
        currentPage = page;
      }
    });

    return _.get(currentPage.component, 'allowPrevious', this.options.allowPrevious);
  }

  /**
   * Handles navigate on 'Enter' key event in a wizard form.
   * @param {KeyboardEvent} event - The keyboard event object that triggered the handler.
   */
  handleNaviageteOnEnter(event) {
    if (event.keyCode === 13) {
      const clickEvent = new CustomEvent('click');
      const buttonElement = this.refs[`${this.wizardKey}-${this.buttons.next.name}`];
      if (buttonElement) {
        buttonElement.dispatchEvent(clickEvent);
      }
    }
  }

  /**
   * Handles save on 'Enter' key event in a wizard form.
   * @param {KeyboardEvent} event - The keyboard event object that triggered the handler.
   */
  handleSaveOnEnter(event) {
    if (event.keyCode === 13) {
      const clickEvent = new CustomEvent('click');
      const buttonElement = this.refs[`${this.wizardKey}-${this.buttons.submit.name}`];
      if (buttonElement) {
        buttonElement.dispatchEvent(clickEvent);
      }
    }
  }

  attachNav() {
    if (this.component.navigateOnEnter) {
      this.addEventListener(document, 'keyup', this.handleNaviageteOnEnter.bind(this));
    }
    if (this.component.saveOnEnter) {
      this.addEventListener(document, 'keyup', this.handleSaveOnEnter.bind(this));
    }
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


  /**
   * Emits an event indicating that a wizard page has been selected.
   * @param {number} index - Index of the selected wizard page in the `pages` array.
   * @fires emit - Emits the 'wizardPageSelected' event with the page object and index.
   */
  emitWizardPageSelected(index) {
    this.emit('wizardPageSelected', this.pages[index], index);
  }

  attachHeader() {
    const isAllowPrevious = this.isAllowPrevious();
    this.attachTooltips(this.refs[`${this.wizardKey}-tooltip`], this.currentPanel?.tooltip);

    if (this.isBreadcrumbClickable() || isAllowPrevious) {
      this.refs[`${this.wizardKey}-link`]?.forEach((link, index) => {
        if (!isAllowPrevious || index <= this.enabledIndex) {
          this.addEventListener(link, 'click', (event) => {
            this.emit('wizardNavigationClicked', this.pages[index]);
            event.preventDefault();
            return this.setPage(index).then(() => {
              this.emitWizardPageSelected(index);
            });
          });
        }
      });
    }
  }

  detachNav() {
    if (this.component.navigateOnEnter) {
      this.removeEventListener(document, 'keyup', this.handleNaviageteOnEnter.bind(this));
    }
    if (this.component.saveOnEnter) {
      this.removeEventListener(document, 'keyup', this.handleSaveOnEnter.bind(this));
    }
    _.each(this.buttons, (button) => {
      this.removeEventListener(this.refs[`${this.wizardKey}-${button.name}`], 'click');
    });
  }

  detachHeader() {
    if (this.refs[`${this.wizardKey}-link`]) {
      this.refs[`${this.wizardKey}-link`].forEach((link) => {
        this.removeEventListener(link, 'click');
      });
    }
  }

  transformPages() {
    const allComponents = [];
    const components = this.getSortedComponents(this);
    let defferedComponents = [];
    this.allPages = [];

    // Get all components including all nested components and line up in the correct order
    const getAllComponents = (nestedComp, compsArr, pushAllowed = true) => {
      const nestedPages = [];
      const dataArrayComponents = ['datagrid', 'editgrid', 'dynamicWizard'];
      const currentComponents = nestedComp?.subForm ? this.getSortedComponents(nestedComp.subForm) : nestedComp?.components || [];
      const visibleComponents = currentComponents.filter(comp => comp._visible);
      const filteredComponents = visibleComponents.filter(comp => !dataArrayComponents.includes(comp.component.type) && (comp.type !== 'form' || comp.isNestedWizard));
      const additionalComponents = currentComponents.filter(comp => comp.subForm?._form.display !== 'wizard');
      let hasNested = false;

      eachComponent(filteredComponents, (comp) => {
        if (comp && comp.component) {
          if (comp.component.type === 'panel' && comp?.parent.wizard && !getAllComponents(comp, compsArr, false)) {
            if (pushAllowed) {
              this.setRootPanelId(comp);
              nestedPages.push(comp);
            }
            hasNested = true;
          }
          if (comp.isNestedWizard && comp.subForm) {
            const hasNestedForm = getAllComponents(comp, nestedPages, pushAllowed);
            if (!hasNested) {
              hasNested = hasNestedForm;
            }
          }
        }
      }, true);

      if (nestedComp.component.type === 'panel') {
        if (!hasNested && pushAllowed) {
          this.setRootPanelId(nestedComp);
          compsArr.push(nestedComp);
        }
        if (hasNested && additionalComponents.length) {
          const newComp = _.clone(nestedComp);
          newComp.components = additionalComponents;
          this.setRootPanelId(newComp);
          defferedComponents.push(newComp);
        }
      }
      if (pushAllowed) {
        compsArr.push(...defferedComponents, ...nestedPages);
        defferedComponents = [];
      }
      return hasNested;
    };

    components.forEach((component) => {
      if (component.visible) {
        getAllComponents(component, allComponents);
      }
    }, []);

    // recalculate pages only for root wizards, including the situation when the wizard is in a wrapper
    if (this.localRoot && this.id === this.localRoot.id) {
      allComponents.forEach((comp, index) => {
        comp.eachComponent((component) => {
          component.page = index;
        });
      });
    }

    this.allPages = allComponents;
  }

  getSortedComponents({ components, originalComponents }) { // sorts components if they were shuffled after the conditional logic
    const currentComponents = [];
    const currentPages = [];

    if (components && components.length) {
      components.map(page => {
        if (page.component.type === 'panel') {
          currentPages[page.component.key || page.component.title] = page;
        }
      });
    }

    originalComponents?.forEach((item) => {
      if (!item.key) {
        item.key = item.title;
      }
      if (currentPages[item.key]) {
        currentComponents.push(currentPages[item.key]);
      }
    });

    return currentComponents;
  }

  findRootPanel(component) {
    return component.parent?.parent ? this.findRootPanel(component.parent) : component;
  }

  setRootPanelId(component) {
    if (component.rootPanelId && component.rootPanelId !== component.id) {
      return;
    }

    const parent = component.parent?.parent ? this.findRootPanel(component.parent) : component;
    component.rootPanelId = parent.id;
  }

  establishPages(data = this.data) {
    this.pages = [];
    this.prefixComps = [];
    this.suffixComps = [];
    const visible = [];
    const currentPages = {};
    const pageOptions = {
      ...(_.clone(this.options)),
      ...(this.parent ? { root: this } : {}),
    };
    if (this.components && this.components.length) {
      this.components.forEach(page => {
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
          const forceShow = this.shouldForceShow(item);
          const forceHide = this.shouldForceHide(item);

          let isVisible = !page
            ? checkCondition(item, data, data, this.component, this) && !item.hidden
            : page.visible;

          if (forceShow) {
            isVisible = true;
          }
          else if (forceHide) {
            isVisible = false;
          }

          if (isVisible) {
            visible.push(item);
            if (page) {
              this.pages.push(page);
            }
          }

          if (!page && isVisible) {
            page = this.createComponent(item, pageOptions);
            page.visible = isVisible;
            this.pages.push(page);
            page.eachComponent((component) => {
              component.page = (this.pages.length - 1);
            });
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

    if (this.pages.length) {
      this.emit('pagesChanged');
    }

    this.transformPages();
    if (this.allPages && this.allPages.length) {
      this.updatePages();
    }

    return visible;
  }

  updatePages() {
    this.pages = this.allPages;
  }

  addComponents() {
    this.establishPages();
  }

  setPage(num) {
    if (num === this.page) {
      return Promise.resolve();
    }

    if (num >= 0 && num < this.pages.length) {
      this.page = num;

      this.pageFieldLogic(num);

      this.getNextPage();

      let parentNum = num;
      if (this.hasSubWizards) {
        const pageFromPages = this.pages[num];
        const pageFromComponents = this.components[num];
        if (!pageFromComponents || pageFromPages?.id !== pageFromComponents.id) {
          parentNum = this.components.findIndex(comp => {
            return comp.id === this.pages?.[parentNum]?.rootPanelId;
          });
        }
      }
      if (!this._seenPages.includes(parentNum)) {
        this._seenPages = this._seenPages.concat(parentNum);
      }
      return this.redraw().then(() => {
        this.checkData(this.submission.data);
        this.triggerCaptcha(this.currentPage.components);
        const errors = this.submitted ? this.validate(this.localData, { dirty: true }) : this.validateCurrentPage();
        if (this.alert) {
          this.showErrors(errors, true, true);
        }
      });
    }
    else if (!this.pages.length) {
      this.redraw();
      return Promise.resolve();
    }
    return Promise.reject('Page not found');
  }

  pageFieldLogic(page) {
    if (this.pages?.[page]) {
      // Handle field logic on pages.
      this.component = this.pages[page].component;
      this.originalComponent = fastCloneDeep(this.component);
      this.fieldLogic(this.data);
      // If disabled changed, be sure to distribute the setting.
      this.disabled = this.shouldDisabled;
    }
  }

  get currentPage() {
    return (this.pages && (this.pages.length >= this.page)) ? this.pages[this.page] : { components: [] };
  }

  getNextPage() {
    if (this.pages?.[this.page]) {
      const data = this.submission.data;
      const form = this.pages[this.page].component;
      // Check conditional nextPage
      if (form) {
        const page = this.pages.length > (this.page + 1) && !this.showAllErrors ? this.page + 1 : -1;
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
    }

    return null;
  }

  getPreviousPage() {
    return this.page - 1;
  }

  beforeSubmit() {
    const pages = this.getPages({all: true});

    return Promise.all(pages.map((page) => {
      this.triggerButtonCaptcha(page);
      page.options.beforeSubmit = true;
      return page.beforeSubmit();
    }));
  }

  beforePage(next) {
    return new Promise((resolve, reject) => {
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

  emitNextPage() {
    this.emit('nextPage', { page: this.page, submission: this.submission });
  }

  nextPage() {
    // Read-only forms should not worry about validation before going to next page, nor should they submit.
    if (this.options.readOnly) {
      return this.beforePage(true).then(() => {
        return this.setPage(this.getNextPage()).then(() => {
          this.emitNextPage();
        });
      });
    }

    // Validate the form before going to the next page
    const currentPageErrors = this.validateCurrentPage({ dirty: true });
    const errors = this.submitted ? this.validate(this.localData, { dirty: true }) : currentPageErrors;
    // allow going to the next page if the current page is valid, even if there are form level errors
    if (currentPageErrors.length === 0) {
      this.checkData(this.submission.data);
      return this.beforePage(true).then(() => {
        return this.setPage(this.getNextPage()).then(() => {
          if (!(this.options.readOnly || this.editMode) && this.enabledIndex < this.page) {
            this.enabledIndex = this.page;
            this.redraw();
          }

          this.emitNextPage();
        });
      });
    }
    else {
      this.currentPage.components.forEach((comp) => comp.setPristine(false));
      this.scrollIntoView(this.element, true);
      return Promise.reject(this.showErrors(errors, true));
    }
  }

  validateCurrentPage(flags = {}) {
    const components = this.currentPage?.components.map((component) => component.component);
    // Accessing the parent ensures the right instance (whether it's the parent Wizard or a nested Wizard) performs its validation
    if (this.currentPage?.parent) {
      return this.currentPage?.parent.validateComponents(components, this.root.data, flags);
    }
    return this.currentPage?.validateComponents(components, this.root ? this.root.data : this.data, flags);
  }

  emitPrevPage() {
    this.emit('prevPage', { page: this.page, submission: this.submission });
  }

  prevPage() {
    return this.beforePage().then(() => {
      return this.setPage(this.getPreviousPage()).then(() => {
        this.emitPrevPage();
      });
    });
  }

  cancel(noconfirm) {
    if (this.options.readOnly) {
      return Promise.resolve();
    }

    if (super.cancel(noconfirm)) {
      this.setPristine(true);
      return this.setPage(0).then(() => {
        if (this.enabledIndex) {
          this.enabledIndex = 0;
        }
        this.onChange({ resetValue: true });
        this.redraw();
        return this.page;
      });
    }
    return Promise.resolve();
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

        if (this.wizard.full) {
          this.options.show = this.options.show || {};
          this.options.show[item.key] = true;
        }
        else if (
          Object.prototype.hasOwnProperty.call(this.wizard, 'full')
          && !_.isEqual(this.originalOptions.show, this.options.show)
        ) {
          this.options.show = { ...(this.originalOptions.show || {}) };
        }
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

  setForm(form, flags = {}) {
    if (!form) {
      return;
    }

    return super.setForm(form, flags);
  }

  onSetForm(clonedForm, initialForm) {
    this.component.components = (this.parent ? initialForm.components : clonedForm.components) || [];
    this.setComponentSchema();
  }

  setEditMode(submission) {
    if (!this.editMode && submission._id && !this.options.readOnly) {
      this.editMode = true;
      this.redraw();
    }
  }

  setValue(submission, flags = {}, ignoreEstablishment) {
    if (!submission || !submission.data) {
      submission = {
        data: {},
      };
    }
    const changed = this.getPages({ all: true }).reduce((changed, page) => {
      return this.setNestedValue(page, submission.data, flags, changed) || changed;
    }, false);

    this.mergeData(this.data, submission.data);

    if (changed) {
      this.pageFieldLogic(this.page);
    }

    submission.data = this.data;
    this._submission = submission;

    if (!ignoreEstablishment) {
      this.establishPages(submission.data);
    }

    this.setEditMode(submission);

    return changed;
  }

  isClickable(page, index) {
    return this.page !== index && firstNonNil([
      _.get(page, 'breadcrumbClickable'),
      this.options.breadcrumbSettings.clickable
    ]);
  }

  hasButton(name, nextPage = this.getNextPage()) {
    // get page options with global options as default values
    const {
      previous = this.options.buttonSettings.showPrevious,
      cancel = this.options.buttonSettings.showCancel,
      submit = this.options.buttonSettings.showSubmit,
      next = this.options.buttonSettings.showNext
    } = _.get(this.currentPage, 'component.buttonSettings', {});

    switch (name) {
      case 'previous':
        return previous && (this.getPreviousPage() > -1);
      case 'next':
        return next && (nextPage !== null) && (nextPage !== -1);
      case 'cancel':
        return cancel && !this.options.readOnly;
      case 'submit':
        return submit && !this.options.readOnly && ((nextPage === null) || (this.page === (this.pages.length - 1)));
      default:
        return true;
    }
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

  onChange(flags, changed, modified, changes) {
    super.onChange(flags, changed, modified, changes);
    // The onChange loop doesn't need all components for wizards
    const errors = this.submitted ? this.validate(this.localData, { dirty: true }) : this.validateCurrentPage();
    if (this.alert) {
      this.showErrors(errors, true, true);
    }

    // If the pages change, need to redraw the header.
    const currentPanels = this.pages;
    // calling this.establishPages() updates/mutates this.pages to be the current pages
    this.establishPages();
    const newPanels = this.pages;
    const currentNextPage = this.currentNextPage;
    const panelsUpdated = !_.isEqual(newPanels, currentPanels);

    if (this.currentPanel?.id && this.pages.length && (!this.hasSubWizards || (this.hasSubWizards && panelsUpdated))) {
      const newIndex = this.pages.findIndex(page => page.id === this.currentPanel.id);
      if (newIndex !== -1) this.setPage(newIndex);
    }
    if (panelsUpdated || (flags && flags.fromSubmission)) {
      this.redrawHeader();
    }

    // If the next page changes, then make sure to redraw navigation.
    if (currentNextPage !== this.getNextPage()) {
      this.redrawNavigation();
    }
    if (this.options.readOnly && (this.prefixComps.length || this.suffixComps.length)) {
      this.redraw();
    }
  }

  rebuild() {
    const currentPage = this.page;
    const setCurrentPage = () => this.setPage(currentPage);
    return super.rebuild().then(setCurrentPage);
  }

  checkValidity(data, dirty, row, currentPageOnly, childErrors = []) {
    if (!this.checkCondition(row, data)) {
      this.setCustomValidity('');
      return true;
    }

    const components = !currentPageOnly || this.isLastPage()
      ? this.getComponents()
      : this.currentPage.components;

    return components.reduce(
      (check, comp) => comp.checkValidity(data, dirty, row, currentPageOnly, childErrors) && check,
      true
    );
  }

  get errors() {
    return !this.isLastPage() && !this.submitted ? this.currentPage.errors : super.errors;
  }

  focusOnComponent(key) {
    const component = this.getComponent(key);
    if (component) {
      let topPanel = component.parent;
      while (!(topPanel.parent instanceof Wizard)) {
        topPanel = topPanel.parent;
      }
      const pageIndex = this.pages.findIndex(page => page.id === topPanel.id);
      if (pageIndex >= 0) {
        const page = this.pages[pageIndex];
        if (page && page !== this.currentPage) {
          return this.setPage(pageIndex).then(() => super.focusOnComponent(key));
        }
      }
    }
    return super.focusOnComponent(key);
  }

  triggerButtonCaptcha(page) {
    if (!page.components) {
      return;
    }

    let captchaComponent;

    page.eachComponent((component)=> {
      if (/^(re)?captcha$/.test(component.component.type) &&
        component.component.eventType === 'buttonClick' &&
        component.component.buttonKey === 'submit') {
          captchaComponent = component;
        }
    });

    if (captchaComponent) {
      captchaComponent.verify(`submitClick`);
    }
  }
}

Wizard.setBaseUrl = Formio.setBaseUrl;
Wizard.setApiUrl = Formio.setApiUrl;
Wizard.setAppUrl = Formio.setAppUrl;
