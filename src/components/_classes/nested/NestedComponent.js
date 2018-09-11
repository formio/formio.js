'use strict';
import _ from 'lodash';
import Promise from 'native-promise-only';
import { checkCondition } from '../../../utils/utils';
import Component from '../component/Component';
import Components from '../../Components';

export default class NestedComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      tree: true
    }, ...extend);
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'components';
    this._collapsed = !!this.component.collapsed;
    this.components = [];
  }

  get defaultSchema() {
    return NestedComponent.schema();
  }

  get schema() {
    const schema = super.schema;
    schema.components = this.mapComponents((component) => component.schema);
    return schema;
  }

  get collapsed() {
    return this._collapsed;
  }

  set collapsed(value) {
    this._collapsed = value;
    this.redraw();
  }

  set visible(value) {
    super.visible = value;
    const forceShow = this.options.show && this.options.show[this.component.key];
    const forceHide = this.options.hide && this.options.hide[this.component.key];
    this.components.forEach(component => {
      if (forceShow) {
        component.visible = true;
      }
      else if (forceHide) {
        component.visible = false;
      }
      component.parentVisible = this.visible;
    });
  }

  get visible() {
    return super.visible;
  }

  set parentVisible(value) {
    super.parentVisible = value;
    this.components.forEach(component => {
      component.parentVisible = this.visible;
    });
  }

  get parentVisible() {
    return super.parentVisible;
  }

  getComponents() {
    return this.components || [];
  }

  getAllComponents() {
    return this.reduceComponents(
      (components, component) => components.concat(component.getAllComponents
        ? component.getAllComponents()
        : component),
      [],
    );
  }

  /**
   * Iterates over components and invokes iteratee for each component.
   *
   * @param {*} iteratee The function invoked per iteration.
   */
  eachComponent(iteratee) {
    this.components.forEach(iteratee);
  }

  mapComponents(iteratee) {
    return this.components.map(iteratee);
  }

  reduceComponents(iteratee, accumulator) {
    return this.components.reduce(iteratee, accumulator);
  }

  /**
   * Returns a component provided the predicate.
   *
   * @param {string} predicate Predicate to retrieve the component.
   * @return {Object} The component retrieved.
   */
  getComponentBy(predicate) {
    for (const component of this.components) {
      if (predicate(component)) {
        return component;
      }

      if (typeof component.getComponentBy === 'function') {
        const result = component.getComponentBy(predicate);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }

  /**
   * Returns a component provided the key.
   *
   * @param {string} key The key of the component to retrieve.
   * @return {Object} The component retrieved.
   */
  getComponentByKey(key) {
    return this.getComponentBy((component) => component.component.key === key);
  }

  /**
   * Return a component provided the Id of the component.
   *
   * @param {string} id The Id of the component to retrieve.
   * @return {Object} The component retrieved.
   */
  getComponentById(id) {
    return this.getComponentBy((component) => component.id === id);
  }

  /**
   * Create a new component and add it to the components array.
   *
   * @param component
   * @param data
   */
  createComponent(component, options, data, before) {
    options = options || this.options;
    data = data || this.data;
    const comp = Components.create(component, options, data, true);
    comp.parent = this;
    comp.root = this.root || this;
    comp.parentVisible = this.visible;
    comp.isBuilt = true;
    if (component.internal) {
      return comp;
    }

    if (before) {
      const index = this.components.findIndex((comp) => comp.id = before.id);
      if (index !== -1) {
        this.components.splice(index, 0, comp);
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
  }

  /**
   *
   * @param element
   * @param data
   */
  addComponents(data) {
    data = data || this.data;
    this.componentComponents.forEach((component) => this.addComponent(component, data));
  }

  /**
   * Add a new component to the components array.
   *
   * @param {Object} component - The component JSON schema to add.
   * @param {Object} data - The submission data object to house the data for this component.
   * @param {HTMLElement} before - A DOM element to insert this element before.
   * @return {Component} - The created component instance.
   */
  addComponent(component, data, before, noAdd) {
    data = data || this.data;
    const comp = this.createComponent(component, this.options, data, before ? before.component : null);
    if (noAdd) {
      return comp;
    }
    return comp;
  }

  render(children) {
    // If already rendering, don't re-render.
    return super.render(children || this.renderTemplate(this.templateName, {
      children: this.renderComponents(),
      nestedKey: this.nestedKey,
      collapsed: this.collapsed,
    }));
  }

  renderComponents(components) {
    components = components || this.components;
    const children = components.map(component => component.render());
    return this.renderTemplate('components', {
      children,
      components,
    });
  }

  attach(element) {
    this.loadRefs(element, {
      header: 'single',
      collapsed: this.collapsed,
      [this.nestedKey]: 'single',
    });

    if (this.refs[this.nestedKey]) {
      this.attachComponents(this.refs[this.nestedKey]);
    }

    if (this.component.collapsible && this.refs.header) {
      this.addEventListener(this.refs.header, 'click', () => {
        this.collapsed = !this.collapsed;
      });
    }

    super.attach(element);
  }

  attachComponents(element, components, container) {
    components = components || this.components;
    container = container || this.component.components;

    element = this.hook('attachComponents', element, components, container, this);
    if (!element) {
      return;
    }

    let index = 0;
    Array.prototype.slice.call(element.children).forEach(child => {
      if (!child.getAttribute('data-noattach') && components[index]) {
        components[index].attach(child);
        index++;
      }
    });
  }

  /**
   * Destroys component and removes it from the containing node.
   *
   * @param {Component} component - The component to remove from the components.
   * @param {Array<Component>} components - An array of components to remove this component from.
   */
  removeComponent(component, components) {
    component.destroy();
    _.remove(components, { id: component.id });
  }

  /**
   * Removes a component provided the API key of that component.
   *
   * @param {string} key - The API key of the component to remove.
   * @param {function} fn - Called once the component is removed.
   * @return {null}
   */
  removeComponentByKey(key, fn) {
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
  removeComponentById(id, fn) {
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

  updateValue(flags) {
    return this.reduceComponents((result, comp) => result || comp.updateValue(flags), false);
  }

  hasChanged() {
    return false;
  }

  /**
   * A more performant way to check the conditions, calculations, and validity of
   * a submission once it has been changed.
   *
   * @param data
   * @param flags
   */
  checkData(data, flags) {
    flags = flags || {};
    let valid = true;
    if (flags.noCheck) {
      return;
    }

    // Update the value.
    let changed = this.updateValue({
      noUpdateEvent: true
    });

    // Iterate through all components and check conditions, and calculate values.
    this.eachComponent((comp) => {
      changed |= comp.calculateValue(data, {
        noUpdateEvent: true
      });
      comp.checkConditions(data);
      if (!flags.noValidate) {
        valid &= comp.checkValidity(data);
      }
    });

    // Trigger the change if the values changed.
    if (changed) {
      this.triggerChange(flags);
    }

    // Return if the value is valid.
    return valid;
  }

  checkConditions(data) {
    this.eachComponent((comp) => comp.checkConditions(data));
    return super.checkConditions(data);
  }

  clearOnHide(show) {
    super.clearOnHide(show);
    this.eachComponent((component) => component.clearOnHide(show));
  }

  /**
   * Allow components to hook into the next page trigger to perform their own logic.
   *
   * @return {*}
   */
  beforeNext() {
    return Promise.all(this.mapComponents((comp) => comp.beforeNext()));
  }

  /**
   * Allow components to hook into the submission to provide their own async data.
   *
   * @return {*}
   */
  beforeSubmit() {
    return Promise.all(this.mapComponents((comp) => comp.beforeSubmit()));
  }

  calculateValue(data, flags) {
    return this.reduceComponents(
      (result, comp) => result || comp.calculateValue(data, flags),
      super.calculateValue(data, flags),
    );
  }

  isValid(data, dirty) {
    return this.reduceComponents(
      (result, comp) => result && comp.isValid(data, dirty),
      super.isValid(data, dirty),
    );
  }

  checkValidity(data, dirty) {
    if (!checkCondition(this.component, data, this.data, this.root ? this.root._form : {}, this)) {
      this.setCustomValidity('');
      return true;
    }

    return this.reduceComponents(
      (result, comp) => result && comp.checkValidity(data, dirty),
      super.checkValidity(data, dirty),
    );
  }

  setPristine(pristine) {
    super.setPristine(pristine);
    this.eachComponent((comp) => comp.setPristine(pristine));
  }

  detach() {
    this.components.forEach(component => {
      component.detach();
    });
    super.detach();
  }

  destroy() {
    this.destroyComponents();
    super.destroy();
  }

  destroyComponents() {
    this.eachComponent((comp) => this.removeComponent(comp));
    this.components = [];
  }

  setCustomValidity(message, dirty) {
    super.setCustomValidity(message, dirty);
    this.eachComponent((comp) => comp.setCustomValidity(message, dirty));
  }

  set disabled(disabled) {
    this.eachComponent((component) => component.disabled = disabled);
  }

  get errors() {
    return this.getAllComponents().reduce((errors, comp) => {
      const compErrors = comp.errors;
      return compErrors.length
        ? errors.concat(compErrors)
        : errors;
    }, []);
  }

  get value() {
    return this.data;
  }

  getValue() {
    return this.data;
  }

  resetValue() {
    this.eachComponent((comp) => comp.resetValue());
    _.unset(this.data, this.key);
    this.setPristine(true);
  }

  setValue(value, flags) {
    if (!value) {
      return false;
    }

    flags = this.getFlags(...arguments);
    return this.reduceComponents((changed, component) => {
      if (component.type === 'button') {
        return changed;
      }

      if (component.type === 'components') {
        return changed || component.setValue(value, flags);
      }
      else if (value && component.hasValue(value)) {
        return changed || component.setValue(_.get(value, component.key), flags);
      }
      else {
        flags.noValidate = true;
        return changed || component.setValue(component.defaultValue, flags);
      }
    }, false);
  }
}
