'use strict';
import _ from 'lodash';
import Field from '../field/Field';
import Components from '../../Components';
import { getArrayFromComponentPath, getStringFromComponentPath, getRandomComponentId } from '../../../utils/utils';
import Component from '../component/Component';
import { process as processAsync, processSync } from '@formio/core/process';

export default class NestedComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      tree: false,
      lazyLoad: false,
    }, ...extend);
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'components';
    this._collapsed = !!this.component.collapsed;
  }

  get defaultSchema() {
    return NestedComponent.schema();
  }

  get schema() {
    const schema = super.schema;
    const components = _.uniqBy(this.getComponents(), 'component.key');
    schema.components = _.map(components, 'schema');
    return schema;
  }

  get collapsed() {
    return this._collapsed;
  }

  collapse(value) {
    const promise = this.redraw();
    if (!value) {
      this.checkValidity(this.data, !this.pristine);
    }
    return promise;
  }

  set collapsed(value) {
    this._collapsed = value;
    this.collapse(value);
  }

  set visible(value) {
    // DO NOT CALL super here.  There is an issue where clearOnHide was getting triggered with
    // subcomponents because the "parentVisible" flag was set to false when it should really be
    // set to true.
    const visibilityChanged = this._visible !== value;
    this._visible = value;
    const isVisible = this.visible;
    const forceShow = this.shouldForceShow();
    const forceHide = this.shouldForceHide();
    this.components.forEach(component => {
      // Set the parent visibility first since we may have nested components within nested components
      // and they need to be able to determine their visibility based on the parent visibility.
      component.parentVisible = isVisible;

      const conditionallyVisible = component.conditionallyVisible();
      if (forceShow || conditionallyVisible) {
        component.visible = true;
      }
      else if (forceHide || !isVisible || !conditionallyVisible) {
        component.visible = false;
      }
      // If hiding a nested component, clear all errors below.
      if (!component.visible) {
        component.error = '';
      }
    });
    if (visibilityChanged) {
      this.clearOnHide();
      this.redraw();
    }
  }

  get visible() {
    return super.visible;
  }

  set parentVisible(value) {
    super.parentVisible = value;
    this.components.forEach(component => component.parentVisible = this.visible);
  }

  get parentVisible() {
    return super.parentVisible;
  }

  get disabled() {
    return super.disabled;
  }

  set disabled(disabled) {
    super.disabled = disabled;
    this.components.forEach((component) => component.parentDisabled = disabled);
  }

  set parentDisabled(value) {
    super.parentDisabled = value;
    this.components.forEach(component => {
      component.parentDisabled = this.disabled;
    });
  }

  get parentDisabled() {
    return super.parentDisabled;
  }

  get ready() {
    return Promise.all(this.getComponents().map(component => component.ready));
  }

  get currentForm() {
    return super.currentForm;
  }

  set currentForm(instance) {
    super.currentForm = instance;
    this.getComponents().forEach(component => {
      component.currentForm = instance;
    });
  }

  get rowIndex() {
    return this._rowIndex;
  }

  set rowIndex(value) {
    this._rowIndex = value;
    this.eachComponent((component) => {
      component.rowIndex = value;
    });
  }

  componentContext() {
    return this._data;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
    this.eachComponent((component) => {
      component.data = this.componentContext(component);
    });
  }

  getComponents() {
    return this.components || [];
  }

  /**
   * Perform a deep iteration over every component, including those
   * within other container based components.
   *
   * @param {function} fn - Called for every component.
   */
  everyComponent(fn, options = {}) {
    const components = this.getComponents();
    _.each(components, (component, index) => {
      if (fn(component, components, index) === false) {
        return false;
      }

      if (typeof component.everyComponent === 'function') {
        if (component.everyComponent(fn, options) === false) {
          return false;
        }
      }
    });
  }

  hasComponent(component) {
    let result = false;

    this.everyComponent((comp) => {
      if (comp === component) {
        result = true;
        return false;
      }
    });

    return result;
  }

  flattenComponents() {
    const result = {};

    this.everyComponent((component) => {
      result[component.component.flattenAs || component.key] = component;
    });

    return result;
  }

  /**
   * Perform an iteration over each component within this container component.
   *
   * @param {function} fn - Called for each component
   */
  eachComponent(fn) {
    _.each(this.getComponents(), (component, index) => {
      if (fn(component, index) === false) {
        return false;
      }
    });
  }

  /**
   * Returns a component provided a key. This performs a deep search within the
   * component tree.
   *
   * @param {string} key - The key of the component to retrieve.
   * @param {function} [fn] - Called with the component once found.
   * @param {string} [originalPath] - The original path to the component.
   * @return {Component} - The component that is located.
   */
  getComponent(path, fn, originalPath) {
    originalPath = originalPath || getStringFromComponentPath(path);
    if (this.componentsMap.hasOwnProperty(originalPath)) {
      if (fn) {
        return fn(this.componentsMap[originalPath]);
      }
      else {
        return this.componentsMap[originalPath];
      }
    }

    path = getArrayFromComponentPath(path);
    const pathStr = originalPath;
    const newPath = _.clone(path);
    let key = newPath.shift();
    const remainingPath = newPath;
    let comp = null;
    let possibleComp = null;

    if (_.isNumber(key)) {
      key = remainingPath.shift();
    }

    if (!_.isString(key)) {
      return comp;
    }

    this.everyComponent((component, components) => {
      const matchPath = component.hasInput && component.path ? pathStr.includes(component.path) : true;
      if (component.component.key === key) {
        possibleComp = component;
        if (matchPath) {
          comp = component;
          if (remainingPath.length > 0 && 'getComponent' in component) {
            comp = component.getComponent(remainingPath, fn, originalPath);
          }
          else if (fn) {
            fn(component, components);
          }
          return false;
        }
      }
    });

    if (!comp) {
      comp = possibleComp;
    }

    return comp;
  }

  /**
   * Return a component provided the Id of the component.
   *
   * @param {string} id - The Id of the component.
   * @param {function} fn - Called with the component once it is retrieved.
   * @return {Object} - The component retrieved.
   */
  getComponentById(id, fn = null) {
    let comp = null;
    this.everyComponent((component, components) => {
      if (component.id === id) {
        comp = component;
        if (fn) {
          fn(component, components);
        }
        return false;
      }
    });
    return comp;
  }

  /**
   * Create a new component and add it to the components array.
   *
   * @param component
   * @param data
   */
   createComponent(component, options, data, before, replacedComp) {
    if (!component) {
      return;
    }
    options = options || this.options;
    data = data || this.data;
    options.parent = this;
    options.parentVisible = this.visible;
    options.root = options?.root || this.root || this;
    options.localRoot = this.localRoot;
    options.skipInit = true;
    if (!(options.display === 'pdf' && this.builderMode)) {
      component.id = getRandomComponentId();
    }
    const comp = Components.create(component, options, data, true);
    comp.init();
    if (component.internal) {
      return comp;
    }

    if (before) {
      const index = _.findIndex(this.components, { id: before.id });
      if (index !== -1) {
        this.components.splice(index, 0, comp);
      }
      else {
        this.components.push(comp);
      }
    }
    else if (replacedComp) {
      const index = _.findIndex(this.components, { id: replacedComp.id });
      if (index !== -1) {
        this.components[index] = comp;
      }
      else {
        this.components.push(comp);
      }
    }
    else {
      this.components.push(comp);
    }
    return comp;
  }

  getContainer() {
    return this.element;
  }

  get componentComponents() {
    return this.component.components || [];
  }

  get nestedKey() {
    return `nested-${this.key}`;
  }

  get templateName() {
    return 'container';
  }

  init() {
    this.components = this.components || [];
    this.addComponents();
    return super.init();
  }

  /**
   *
   * @param element
   * @param data
   */
  addComponents(data, options) {
    data = data || this.data;
    this.components = this.components || [];
    options = options || this.options;
    if (options.components) {
      this.components = options.components;
    }
    else {
      const components = this.hook('addComponents', this.componentComponents, this) || [];
      components.forEach((component) => this.addComponent(component, data));
    }
  }

  /**
   * Add a new component to the components array.
   *
   * @param {Object} component - The component JSON schema to add.
   * @param {Object} data - The submission data object to house the data for this component.
   * @param {HTMLElement} before - A DOM element to insert this element before.
   * @return {Component} - The created component instance.
   */
  addComponent(component, data = null, before = null, noAdd = false) {
    data = data || this.data;
    this.components = this.components || [];
    component = this.hook('addComponent', component, data, before, noAdd);
    const comp = this.createComponent(component, this.options, data, before ? before : null);
    if (noAdd) {
      return comp;
    }
    return comp;
  }

  beforeFocus() {
    if (this.parent && 'beforeFocus' in this.parent) {
      this.parent.beforeFocus(this);
    }
  }

  render(children) {
    // If already rendering, don't re-render.
    return super.render(children || this.renderTemplate(this.templateName, {
      children: !this.visible ? '' : this.renderComponents(),
      nestedKey: this.nestedKey,
      collapsed: this.options.pdf ? false : this.collapsed,
    }));
  }

  renderComponents(components) {
    components = components || this.getComponents();
    const children = components.map(component => component.render());
    return this.renderTemplate('components', {
      children,
      components,
    });
  }

  attach(element) {
    const superPromise = super.attach(element);

    this.loadRefs(element, {
      header: 'single',
      collapsed: this.collapsed,
      [this.nestedKey]: 'single',
    });

    let childPromise = Promise.resolve();
    if (this.refs[this.nestedKey]) {
      childPromise = this.attachComponents(this.refs[this.nestedKey]);
    }

    if (!this.visible) {
      this.attachComponentsLogic();
    }

    if (this.component.collapsible && this.refs.header) {
      this.addEventListener(this.refs.header, 'click', () => {
        this.collapsed = !this.collapsed;
      });
      this.addEventListener(this.refs.header, 'keydown', (e) => {
        if (e.keyCode === 13 || e.keyCode === 32) {
          e.preventDefault();
          this.collapsed = !this.collapsed;
        }
      });
    }

    return Promise.all([
      superPromise,
      childPromise,
    ]);
  }

  attachComponentsLogic(components) {
    components = components || this.components;

    _.each(components, (comp) => {
      comp.attachLogic();

      if  (_.isFunction(comp.attachComponentsLogic)) {
        comp.attachComponentsLogic();
      }
    });
  }

  attachComponents(element, components, container) {
    components = components || this.components;
    container = container || this.component.components;

    element = this.hook('attachComponents', element, components, container, this);
    if (!element) {
      // Return a non-resolving promise.
      return (new Promise(() => {}));
    }

    let index = 0;
    const promises = [];
    Array.prototype.slice.call(element.children).forEach(child => {
      if (!child.getAttribute('data-noattach') && components[index]) {
        promises.push(components[index].attach(child));
        index++;
      }
    });
    return Promise.all(promises);
  }

  /**
   * Remove a component from the components array and from the children object
   *
   * @param {Component} component - The component to remove from the components.
   * @param {Array<Component>} components - An array of components to remove this component from.
   */
  removeComponent(component, components, all = false) {
    components = components || this.components;
    component.destroy(all);
    _.remove(components, { id: component.id });
    if (this.componentsMap[component.path]) {
      delete this.componentsMap[component.path];
    }
  }

  /**
   * Removes a component provided the API key of that component.
   *
   * @param {string} key - The API key of the component to remove.
   * @param {function} fn - Called once the component is removed.
   * @return {null}
   */
  removeComponentByKey(key, fn = null) {
    const comp = this.getComponent(key, (component, components) => {
      this.removeComponent(component, components);
      if (fn) {
        fn(component, components);
      }
    });
    if (!comp) {
      if (fn) {
        fn(null);
      }
      return null;
    }
  }

  /**
   * Removes a component provided the Id of the component.
   *
   * @param {string} id - The Id of the component to remove.
   * @param {function} fn - Called when the component is removed.
   * @return {null}
   */
  removeComponentById(id, fn = null) {
    const comp = this.getComponentById(id, (component, components) => {
      this.removeComponent(component, components);
      if (fn) {
        fn(component, components);
      }
    });
    if (!comp) {
      if (fn) {
        fn(null);
      }
      return null;
    }
  }

  updateValue(value, flags = {}) {
    return this.components.reduce((changed, comp) => {
      return comp.updateValue(null, flags) || changed;
    }, super.updateValue(value, flags));
  }

  shouldSkipValidation(data, row, flags) {
    // Nested components with no input should not be validated.
    if (!this.component.input) {
      return true;
    }
    else {
      return super.shouldSkipValidation(data, row, flags);
    }
  }

  checkData(data, flags, row, components) {
    if (this.builderMode) {
      return true;
    }
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;
    components = components && _.isArray(components) ? components : this.getComponents();
    super.checkData(data, { ...flags }, row);
    components.forEach((comp) => comp.checkData(data, { ...flags }, row));
  }

  checkConditions(data, flags, row) {
    // check conditions of parent component first, because it may influence on visibility of it's children
    const check = super.checkConditions(data, flags, row);
    //row data of parent component not always corresponds to row of nested components, use comp.data as row data for children instead
    this.getComponents().forEach(comp => comp.checkConditions(data, flags, comp.data));
    return check;
  }

  clearOnHide(show) {
    super.clearOnHide(show);
    if (this.component.clearOnHide) {
      if (this.allowData && !this.hasValue() && !(this.options.server && !this.visible)) {
        this.dataValue = this.defaultValue;
      }
      if (this.hasValue()) {
        this.restoreComponentsContext();
      }
    }
    this.getComponents().forEach(component => component.clearOnHide(show));
  }

  restoreComponentsContext() {
    this.getComponents().forEach((component) => component.data = this.dataValue);
  }

  /**
   * Allow components to hook into the next page trigger to perform their own logic.
   *
   * @return {*}
   */
  beforePage(next) {
    return Promise.all(this.getComponents().map((comp) => comp.beforePage(next)));
  }

  /**
   * Allow components to hook into the submission to provide their own async data.
   *
   * @return {*}
   */
  beforeSubmit() {
    return Promise.allSettled(this.getComponents().map((comp) => comp.beforeSubmit()));
  }

  calculateValue(data, flags, row) {
    // Do not iterate into children and calculateValues if this nested component is conditionally hidden.
    if (!this.conditionallyVisible()) {
      return false;
    }
    return this.getComponents().reduce(
      (changed, comp) => comp.calculateValue(data, flags, row) || changed,
      super.calculateValue(data, flags, row)
    );
  }

  isLastPage() {
    return this.pages.length - 1 === this.page;
  }

  isValid(data, dirty) {
    return this.getComponents().reduce(
      (valid, comp) => comp.isValid(data, dirty) && valid,
      super.isValid(data, dirty)
    );
  }

  validationProcessor({ scope, data, row, instance }, flags) {
    const { dirty } = flags;
    if (!instance) {
      return;
    }
    instance.checkComponentValidity(data, dirty, row, flags, scope.errors);
    if (instance.processOwnValidation) {
      scope.noRecurse = true;
    }
  }

  /**
   * Perform a validation on all child components of this nested component.
   * @param {*} components
   * @param {*} data
   * @param {*} flags
   * @returns
   */
  validateComponents(components = null, data = null, flags = {}) {
    components = components || this.component.components;
    data = data || this.rootValue;
    const { async, dirty, process } = flags;
    const validationProcessorProcess = (context) => this.validationProcessor(context, flags);
    const checkModalProcessorProcess = ({ instance, component, components }) => {
      // If we just validated the last component, and there are errors from our parent, then we need to show a model of those errors.
      if (
        instance &&
        instance.parent &&
        (component === components[components.length - 1]) &&
        instance.parent.componentModal
      ) {
        instance.parent.checkModal(instance.parent.childErrors, dirty);
      }
    };
    const processorContext = {
      process: process || 'unknown',
      components,
      instances: this.componentsMap,
      data: data,
      scope: { errors: [] },
      processors: [
        {
          process: validationProcessorProcess,
          processSync: validationProcessorProcess
        },
        {
          process: checkModalProcessorProcess,
          processSync: checkModalProcessorProcess
        }
      ]
    };
    return async ? processAsync(processorContext).then((scope) => scope.errors) : processSync(processorContext).errors;
  }

  /**
   * Validate a nested component with data, or its own internal data.
   * @param {*} data
   * @param {*} flags
   * @returns
   */
  validate(data = null, flags = {}) {
    data = data || this.rootValue;
    return this.validateComponents(this.getComponents().map((component) => component.component), data, flags);
  }

  checkComponentValidity(data = null, dirty = false, row = null, flags = {}, allErrors = []) {
    this.childErrors = [];
    return super.checkComponentValidity(data, dirty, row, flags, allErrors);
  }

  /**
   * Checks the validity of the component.
   * @param {*} data - The data to check if the component is valid.
   * @param {boolean} dirty - If the component is dirty.
   * @param {*} row - The contextual row data for this component.
   * @param {boolean} silentCheck - If the check should be silent and not set the error messages.
   * @param {Array<any>} childErrors - An array of all errors that have occured so that it can be appended when another one occurs here.
   * @returns {boolean} - TRUE if the component is valid.
   */
  checkValidity(data = null, dirty = false, row = null, silentCheck = false, childErrors = []) {
    childErrors.push(...this.validate(data, { dirty, silentCheck }));
    return this.checkComponentValidity(data, dirty, row, { dirty, silentCheck }, childErrors) && childErrors.length === 0;
  }

  checkAsyncValidity(data = null, dirty = false, row = null, silentCheck = false) {
    console.log('Deprecation warning:  Component.checkAsyncValidity() will be deprecated in 6.x version of renderer.');
    return this.ready.then(() => {
      return this.validate(data, { dirty, silentCheck, async: true }).then((childErrors) => {
        return this.checkComponentValidity(data, dirty, row, { dirty, silentCheck, async: true }, childErrors).then((valid) => {
          return valid && childErrors.length === 0;
        });
      });
    });
  }

  setPristine(pristine) {
    super.setPristine(pristine);
    this.getComponents().forEach((comp) => comp.setPristine(pristine));
  }

  get isPristine() {
    return this.pristine && this.getComponents().every((c) => c.isPristine);
  }

  get isDirty() {
    return this.dirty && this.getComponents().every((c) => c.isDirty);
  }

  detach() {
    this.components.forEach(component => {
      component.detach();
    });
    super.detach();
  }

  clear() {
    this.components.forEach(component => {
      component.clear();
    });
    super.clear();
  }

  destroy(all = false) {
    this.destroyComponents(all);
    super.destroy(all);
  }

  destroyComponents(all = false) {
    const components = this.getComponents().slice();
    components.forEach((comp) => this.removeComponent(comp, this.components, all));
    this.components = [];
  }

  get visibleErrors() {
    return this.getComponents().reduce((errors, comp) => errors.concat(comp.visibleErrors || []), super.visibleErrors);
  }

  get errors() {
    const thisErrors = super.errors;
    return this.getComponents()
      .reduce((errors, comp) => errors.concat(comp.errors || []), thisErrors)
      .filter(err => err.level !== 'hidden');
  }

  getValue() {
    return this.data;
  }

  resetValue() {
    super.resetValue();
    this.getComponents().forEach((comp) => comp.resetValue());
    this.setPristine(true);
  }

  get dataReady() {
    return Promise.all(this.getComponents().map((component) => component.dataReady));
  }

  setNestedValue(component, value, flags = {}) {
    component._data = this.componentContext(component);
    if (component.type === 'button') {
      return false;
    }
    if (component.type === 'components') {
      if (component.tree && component.hasValue(value)) {
        return component.setValue(_.get(value, component.key), flags);
      }
      return component.setValue(value, flags);
    }
    else if (value && component.hasValue(value)) {
      return component.setValue(_.get(value, component.key), flags);
    }
    else if ((!this.rootPristine || component.visible) && component.shouldAddDefaultValue) {
      flags.noValidate = !flags.dirty;
      flags.resetValue = true;
      return component.setValue(component.defaultValue, flags);
    }
  }

  setValue(value, flags = {}) {
    if (!value) {
      return false;
    }
    return this.getComponents().reduce((changed, component) => {
      return this.setNestedValue(component, value, flags, changed) || changed;
    }, false);
  }

  get lazyLoad() {
    return this.component.lazyLoad ?? false;
  }
}
