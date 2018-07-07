import _ from 'lodash';
import Promise from 'native-promise-only';
import { checkCondition } from '../../utils/utils';
import BaseComponent from '../base/Base';
import Components from '../Components';

export default class NestedComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({}, ...extend);
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.type = 'components';
    this.components = [];
    this.hidden = [];
    this.collapsed = !!this.component.collapsed;
  }

  build(showLabel) {
    this.createElement();
    if (showLabel) {
      this.createLabel(this.element);
    }
    this.addComponents();
  }

  get defaultSchema() {
    return NestedComponent.schema();
  }

  get schema() {
    const schema = super.schema;
    schema.components = this.mapComponents((component) => component.schema);
    return schema;
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
    comp.build();
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

  /**
   * Add a new component to the components array.
   *
   * @param {Object} component The component JSON schema to add.
   * @param {HTMLElement} element The DOM element to append this child to.
   * @param {Object} data The submission data object to house the data for this component.
   * @param {HTMLElement} before A DOM element to insert this element before.
   * @return {BaseComponent} The created component instance.
   */
  addComponent(component, element, data, before, noAdd) {
    element = element || this.getContainer();
    data = data || this.data;
    const comp = this.createComponent(component, this.options, data, before ? before.component : null);
    if (noAdd) {
      return comp;
    }
    this.setHidden(comp);
    element = this.hook('addComponent', element, comp, this);
    if (before) {
      element.insertBefore(comp.getElement(), before);
    }
    else {
      element.appendChild(comp.getElement());
    }
    return comp;
  }

  /**
   * Destroys component and removes it from the containing node.
   *
   * @param {BaseComponent} component The component to remove.
   */
  removeComponent(component) {
    component.destroy();
    const element = component.getElement();
    if (element && element.parentNode) {
      this.removeChildFrom(element, element.parentNode);
    }
  }

  get componentComponents() {
    return this.component.components;
  }

  /**
   *
   * @param element
   * @param data
   */
  addComponents(element, data) {
    element = element || this.getContainer();
    data = data || this.data;
    const components = this.hook('addComponents', this.componentComponents, this);
    components.forEach((component) => this.addComponent(component, element, data));
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

  destroy() {
    super.destroy();
    this.empty(this.getElement());
    this.destroyComponents();
  }

  destroyComponents() {
    this.eachComponent((comp) => this.removeComponent(comp));
    this.components = [];
    this.hidden = [];
  }

  setCustomValidity(message, dirty) {
    super.setCustomValidity(message, dirty);
    this.eachComponent((comp) => comp.setCustomValidity(message, dirty));
  }

  set disabled(disabled) {
    this.eachComponent((component) => component.disabled = disabled);
  }

  setHidden(component) {
    if (component.components && component.components.length) {
      component.hideComponents(this.hidden);
    }
    else if (component.component.hidden) {
      component.visible = false;
    }
    else {
      component.visible = !this.hidden || !this.hidden.includes(component.key);
    }
  }

  hideComponents(hidden) {
    this.hidden = hidden;
    this.eachComponent((component) => this.setHidden(component));
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

  get dataReady() {
    return Promise.all(this.mapComponents((component) => component.dataReady));
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

  setCollapseHeader(header) {
    if (this.component.collapsible) {
      this.addClass(header, 'formio-clickable');
      this.addEventListener(header, 'click', () => this.toggleCollapse());
    }
  }

  setCollapsed(element) {
    if (!this.component.collapsible) {
      return;
    }

    const container = element || this.getContainer();

    if (this.collapsed) {
      container.setAttribute('hidden', true);
      container.style.visibility = 'hidden';
    }
    else {
      container.removeAttribute('hidden');
      container.style.visibility = 'visible';
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.setCollapsed();
  }
}
