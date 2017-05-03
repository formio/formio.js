'use strict';
import _each from 'lodash/each';
import _clone from 'lodash/clone';
import _remove from 'lodash/remove';
import _reduce from 'lodash/reduce';
import { BaseComponent } from './base/Base';
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

  /**
   * Perform a deep iteration over every component, including those
   * within other container based components.
   *
   * @param {function} cb - Called for every component.
   */
  everyComponent(cb) {
    _each(this.components, (component) => {
      if (component.type === 'components') {
        if (component.everyComponent(cb) === false) {
          return false;
        }
      }
      else if (cb(component, this.components) === false) {
        return false;
      }
    });
  }

  /**
   * Perform an iteration over each component within this container component.
   *
   * @param {function} cb - Called for each component
   */
  eachComponent(cb) {
    _each(this.components, (component) => {
      if (cb(component) === false) {
        return false;
      }
    });
  }

  /**
   * Returns a component provided a key. This performs a deep search within the
   * component tree.
   *
   * @param {string} key - The key of the component to retrieve.
   * @param {function} cb - Called with the component once found.
   * @return {Object} - The component that is located.
   */
  getComponent(key, cb) {
    let comp = null;
    this.everyComponent((component, components) => {
      if (component.component.key === key) {
        comp = component;
        if (cb) {
          cb(component, components);
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
   * @param {function} cb - Called with the component once it is retrieved.
   * @return {Object} - The component retrieved.
   */
  getComponentById(id, cb) {
    let comp = null;
    this.everyComponent((component, components) => {
      if (component.id === id) {
        comp = component;
        if (cb) {
          cb(component, components);
        }
        return false;
      }
    });
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
    let components = require('./index');
    let comp = components.create(component, this.options, data);
    this.components.push(comp);
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
    let element = component.getElement();
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
    _remove(components, {id: component.id});
  }

  /**
   * Removes a component provided the API key of that component.
   *
   * @param {string} key - The API key of the component to remove.
   * @param {function} cb - Called once the component is removed.
   * @return {null}
   */
  removeComponentByKey(key, cb) {
    let comp = this.getComponent(key, (component, components) => {
      this.removeComponent(component, components);
      if (cb) {
        cb(component, components);
      }
    });
    if (!comp) {
      if (cb) {
        cb(null);
      }
      return null;
    }
  }

  /**
   * Removes a component provided the Id of the component.
   *
   * @param {string} id - The Id of the component to remove.
   * @param {function} cb - Called when the component is removed.
   * @return {null}
   */
  removeComponentById(id, cb) {
    let comp = this.getComponentById(id, (component, components) => {
      this.removeComponent(component, components);
      if (cb) {
        cb(component, components);
      }
    });
    if (!comp) {
      if (cb) {
        cb(null);
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
    _each(this.component.components, (component) => this.addComponent(component, element, data));
  }

  updateValue(noValidate) {
    _each(this.components, (comp) => comp.updateValue(noValidate));
  }

  /**
   * A more performant way to check the conditions, calculations, and validity of
   * a submission once it has been changed.
   *
   * @param data
   * @param noValidate
   */
  checkData(data, noValidate) {
    _each(this.components, (comp) => {
      comp.checkConditions(data);
      comp.calculateValue(data);
      if (!noValidate) {
        comp.checkValidity(data);
      }
    });
  }

  checkConditions(data) {
    super.checkConditions(data);
    _each(this.components, (comp) => comp.checkConditions(data));
  }

  calculateValue(data) {
    super.calculateValue(data);
    _each(this.components, (comp) => comp.calculateValue(data));
  }

  checkValidity(data, dirty) {
    let check = super.checkValidity(data, dirty);
    _each(this.components, (comp) => {
      check &= comp.checkValidity(data, dirty);
    });
    return check;
  }

  destroy(all) {
    super.destroy(all);
    let components = _clone(this.components);
    _each(components, (comp) => this.removeComponent(comp, this.components));
  }

  set disable(disable) {
    _each(this.components, (component) => (component.disable = disable));
  }

  setHidden(component) {
    if (component.components && component.components.length) {
      component.hideComponents(this.hidden);
    }
    else {
      component.visible = (!this.hidden || (this.hidden.indexOf(component.component.key) === -1));
    }
  }

  hideComponents(hidden) {
    this.hidden = hidden;
    this.eachComponent((component) => this.setHidden(component));
  }

  get errors() {
    let errors = [];
    _each(this.components, (comp) => {
      let compErrors = comp.errors;
      if (compErrors.length) {
        errors = errors.concat(compErrors);
      }
    });
    return errors;
  }

  getValue() {
    return this.data;
  }

  setValue(value, noUpdate, noValidate) {
    if (!value) {
      return;
    }
    this.value = value;
    _each(this.components, (component) => {
      if (component.type === 'button') {
        return;
      }

      if (component.type === 'components') {
        component.setValue(value, noUpdate, noValidate);
      }
      else if (value && value.hasOwnProperty(component.component.key)) {
        component.setValue(value[component.component.key], noUpdate);
      }
      else if (component.component.input) {
        component.setValue(null, noUpdate, true);
      }
    });
  }
}
