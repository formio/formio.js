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
    schema.components = [];
    this.eachComponent((component) => schema.components.push(component.schema));
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
    const isVisible = this.visible;
    const forceShow = this.options.show && this.options.show[this.component.key];
    const forceHide = this.options.hide && this.options.hide[this.component.key];
    this.componentComponents.forEach(component => {
      const conditionallyVisible = component.conditionallyVisible();
      if (forceShow || (!isVisible && conditionallyVisible)) {
        component.visible = true;
      }
      else if (forceHide || (isVisible && !conditionallyVisible)) {
        component.visible = false;
      }
      component.parentVisible = isVisible;
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
    return this.getComponents().reduce((components, component) => {
      let result = component;

      if (component && component.getAllComponents) {
        result = component.getAllComponents();
      }

      return components.concat(result);
    }, []);
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
      if (fn(component, components, index) === false) {
        return false;
      }

      if (typeof component.everyComponent === 'function') {
        if (component.everyComponent(fn) === false) {
          return false;
        }
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
      const index = _.findIndex(this.components, { id: before.id });
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
  addComponents(data, options) {
    data = data || this.data;
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
   * Remove a component from the components array.
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
    return this.componentComponents.reduce((changed, comp) => comp.updateValue(flags) || changed, false);
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
    this.getComponents().forEach((comp) => {
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
    return Promise.all(this.getComponents().map((comp) => comp.beforeNext()));
  }

  /**
   * Allow components to hook into the submission to provide their own async data.
   *
   * @return {*}
   */
  beforeSubmit() {
    return Promise.all(this.getComponents().map((comp) => comp.beforeSubmit()));
  }

  calculateValue(data, flags) {
    return this.getComponents().reduce(
      (changed, comp) => comp.calculateValue(data, flags) || changed,
      super.calculateValue(data, flags)
    );
  }

  isValid(data, dirty) {
    return this.getComponents().reduce(
      (valid, comp) => comp.isValid(data, dirty) && valid,
      super.isValid(data, dirty)
    );
  }

  checkValidity(data, dirty) {
    if (!checkCondition(this.component, data, this.data, this.root ? this.root._form : {}, this)) {
      this.setCustomValidity('');
      return true;
    }

    return this.getComponents().reduce(
      (check, comp) => comp.checkValidity(data, dirty) && check,
      super.checkValidity(data, dirty)
    );
  }

  setPristine(pristine) {
    super.setPristine(pristine);
    this.getComponents().forEach((comp) => comp.setPristine(pristine));
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
    const components = this.componentComponents.slice();
    components.forEach((comp) => this.removeComponent(comp, this.components));
    this.components = [];
  }

  set disabled(disabled) {
    this.componentComponents.forEach((component) => component.disabled = disabled);
  }

  get errors() {
    return this.getAllComponents().reduce((errors, comp) => errors.concat(comp.errors || []), []);
  }

  get value() {
    return this.data;
  }

  getValue() {
    return this.data;
  }

  resetValue() {
    this.getComponents().forEach((comp) => comp.resetValue());
    _.unset(this.data, this.key);
    this.setPristine(true);
  }

  setValue(value, flags) {
    if (!value) {
      return false;
    }
    flags = this.getFlags.apply(this, arguments);
    return this.getComponents().reduce((changed, component) => {
      if (component.type === 'button') {
        return;
      }

      if (component.type === 'components') {
        return component.setValue(value, flags) || changed;
      }
      else if (value && component.hasValue(value)) {
        return component.setValue(_.get(value, component.key), flags) || changed;
      }
      else {
        flags.noValidate = true;
        return component.setValue(component.defaultValue, flags) || changed;
      }
    }, false);
  }
}
