import _ from 'lodash';
import Promise from 'native-promise-only';

import FormioUtils from '../utils/index';
import {BaseComponent} from './base/Base';

export class FormioComponents extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'components';
    this.components = [];
    this.hidden = [];
  }

  build() {
    this.createElement();
    this.addComponents();
  }

  getComponents() {
    return this.components;
  }

  /**
   * Perform a deep iteration over every component, including those
   * within other container based components.
   *
   * @param {function} fn - Called for every component.
   */
  everyComponent(fn) {
    const components = this.getComponents();
    _.each(components, (component, index) => {
      if (component.type === 'components') {
        if (component.everyComponent(fn) === false) {
          return false;
        }
      }
      else if (fn(component, components, index) === false) {
        return false;
      }
    });
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
   * @param {function} fn - Called with the component once found.
   * @return {Object} - The component that is located.
   */
  getComponent(key, fn) {
    let comp = null;
    this.everyComponent((component, components) => {
      if (component.component.key === key) {
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
   * Return a component provided the Id of the component.
   *
   * @param {string} id - The Id of the component.
   * @param {function} fn - Called with the component once it is retrieved.
   * @return {Object} - The component retrieved.
   */
  getComponentById(id, fn) {
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
  createComponent(component, options, data) {
    if (!this.options.components) {
      this.options.components = require('./index');
      _.assign(this.options.components, FormioComponents.customComponents);
    }
    const comp = this.options.components.create(component, options, data, true);
    comp.parent = this;
    comp.root = this.root || this;
    comp.build();
    comp.isBuilt = true;
    this.components.push(comp);
    return comp;
  }

  /**
   * Add a new component to the components array.
   *
   * @param {Object} component - The component JSON schema to add.
   * @param {HTMLElement} element - The DOM element to append this child to.
   * @param {Object} data - The submission data object to house the data for this component.
   * @return {BaseComponent} - The created component instance.
   */
  addComponent(component, element, data) {
    element = element || this.element;
    data = data || this.data;
    component.row = this.row;
    const comp = this.createComponent(component, this.options, data);
    this.setHidden(comp);
    element.appendChild(comp.getElement());
    return comp;
  }

  /**
   * Remove a component from the components array.
   *
   * @param {BaseComponent} component - The component to remove from the components.
   * @param {Array<BaseComponent>} components - An array of components to remove this component from.
   */
  removeComponent(component, components) {
    component.destroy();
    const element = component.getElement();
    if (element && element.parentNode) {
      this.removeChildFrom(element, element.parentNode);
    }
    _.remove(components, {id: component.id});
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

  /**
   *
   * @param element
   * @param data
   */
  addComponents(element, data) {
    element = element || this.element;
    data = data || this.data;
    _.each(this.component.components, (component) => this.addComponent(component, element, data));
  }

  updateValue(flags) {
    let changed = false;
    _.each(this.components, (comp) => {
      changed |= comp.updateValue(flags);
    });
    return changed;
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
    _.each(this.getComponents(), (comp) => {
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
    this.getComponents().forEach(comp => comp.checkConditions(data));
    return super.checkConditions(data);
  }

  clearOnHide(show) {
    super.clearOnHide(show);
    this.getComponents().forEach(component => component.clearOnHide(show));
  }

  /**
   * Allow components to hook into the next page trigger to perform their own logic.
   *
   * @return {*}
   */
  beforeNext() {
    const ops = [];
    _.each(this.getComponents(), (comp) => ops.push(comp.beforeNext()));
    return Promise.all(ops);
  }

  /**
   * Allow components to hook into the submission to provide their own async data.
   *
   * @return {*}
   */
  beforeSubmit() {
    const ops = [];
    _.each(this.getComponents(), (comp) => ops.push(comp.beforeSubmit()));
    return Promise.all(ops);
  }

  onResize(scale) {
    super.onResize(scale);
    _.each(this.getComponents(), (comp) => comp.onResize(scale));
  }

  calculateValue(data, flags) {
    let changed = super.calculateValue(data, flags);
    _.each(this.getComponents(), (comp) => {
      changed |= comp.calculateValue(data, flags);
    });
    return changed;
  }

  isValid(data, dirty) {
    let valid = super.isValid(data, dirty);
    _.each(this.getComponents(), (comp) => {
      valid &= comp.isValid(data, dirty);
    });
    return valid;
  }

  checkValidity(data, dirty) {
    if (!FormioUtils.checkCondition(this.component, data, this.data)) {
      return true;
    }

    let check = super.checkValidity(data, dirty);
    _.each(this.getComponents(), (comp) => {
      check &= comp.checkValidity(data, dirty);
    });
    return check;
  }

  setPristine(pristine) {
    super.setPristine(pristine);
    _.each(this.getComponents(), (comp) => (comp.setPristine(pristine)));
  }

  destroy(all) {
    super.destroy(all);
    const components = _.clone(this.components);
    _.each(components, (comp) => this.removeComponent(comp, this.components));
    this.components = [];
    this.hidden = [];
  }

  set disabled(disabled) {
    _.each(this.components, (component) => (component.disabled = disabled));
  }

  setHidden(component) {
    if (component.components && component.components.length) {
      component.hideComponents(this.hidden);
    }
    else if (component.component.hidden) {
      component.visible = false;
    }
    else {
      component.visible = (!this.hidden || !this.hidden.includes(component.component.key));
    }
  }

  hideComponents(hidden) {
    this.hidden = hidden;
    this.eachComponent((component) => this.setHidden(component));
  }

  get errors() {
    let errors = [];
    _.each(this.getComponents(), (comp) => {
      const compErrors = comp.errors;
      if (compErrors.length) {
        errors = errors.concat(compErrors);
      }
    });
    return errors;
  }

  get value() {
    return this.data;
  }

  getValue() {
    return this.data;
  }

  whenReady() {
    const promises = [];
    _.each(this.getComponents(), (component) => {
      promises.push(component.whenReady());
    });
    return Promise.all(promises);
  }

  setValue(value, flags) {
    if (!value) {
      return false;
    }
    flags = this.getFlags.apply(this, arguments);
    let changed = false;
    this.getComponents().forEach(component => {
      if (component.type === 'button') {
        return;
      }

      if (component.type === 'components') {
        changed |= component.setValue(value, flags);
      }
      else if (value && value.hasOwnProperty(component.component.key)) {
        changed |= component.setValue(_.get(value, component.component.key), flags);
      }
      else {
        flags.noValidate = true;
        changed |= component.setValue(component.defaultValue, flags);
      }
    });
    return changed;
  }
}

FormioComponents.customComponents = {};
