import i18next from 'i18next';
import assert from 'power-assert';
import _ from 'lodash';
import EventEmitter from 'eventemitter2';
import { expect } from 'chai';
import NativePromise from 'native-promise-only';

import i18Defaults from '../lib/i18n';
import FormBuilder from '../lib/FormBuilder';
import AllComponents from '../lib/components';
import Components from '../lib/components/Components';

Components.setComponents(AllComponents);

if (process) {
  // Do not handle unhandled rejections.
  process.on('unhandledRejection', (err, p) => {
    console.warn('Unhandled rejection!', err);
  });
}

// Make sure that the Option is available from the window.
global.Option = global.window.Option;

// Stub out the toLocaleString method so it works in mocha.
// eslint-disable-next-line no-extend-native
Number.prototype.toLocaleString = function(local, options) {
  if (options && options.style === 'currency') {
    switch (local) {
      case 'en':
      case 'en-US':
        return '$100.00';
      case 'en-GB':
        return 'US$100.00';
      case 'fr':
        return '100,00 $US';
      case 'de':
        return '100,00 $';
    }
  }
  else {
    switch (local) {
      case 'en':
      case 'en-US':
        return '12,345.679';
      case 'en-GB':
        return '12,345.679';
      case 'fr':
        return '12 345,679';
      case 'de':
        return '12.345,679';
    }
  }
};

let formBuilderElement = null;
let formBuilder = null;

function onNext(cmp, event, cb) {
  expect(cmp.events).to.be.an('object');
  expect(cmp.events.once).to.be.a('function');
  const fullEvent = `${cmp.options.namespace}.${event}`;
  cmp.events.once(fullEvent, cb);
}

const Harness = {
  builderBefore(done, options = {}) {
    var html;    // Unsure what _your code_ needs here -- using `undefined` to trigger default value
    var opt = { url: 'http://localhost/' };
    this.jsdom = require('jsdom-global')(html, opt);
    window.confirm = () => true;
    formBuilderElement = document.createElement('div');
    document.body.appendChild(formBuilderElement);
    formBuilder = new FormBuilder(formBuilderElement, { display: 'form', components: [] }, options);
    formBuilder.instance.ready.then(() => done());
  },

  builderAfter(done) {
    formBuilder.instance.destroy();
    document.body.removeChild(formBuilderElement);
    done();
  },

  getBuilder() {
    return formBuilder.instance;
  },

  saveComponent() {
    const click = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });

    const saveBtn = formBuilder.instance.componentEdit.querySelector('[ref="saveButton"]');
    if (saveBtn) {
      saveBtn.dispatchEvent(click);
    }
  },

  buildComponent(type, container) {
    // Get the builder sidebar component.
    const webformBuilder = formBuilder.instance;
    let builderGroup = null;
    let groupName = '';

    _.each(webformBuilder.groups, (group, key) => {
      if (group.components[type]) {
        groupName = key;
        return false;
      }
    });

    if (!groupName) {
      return;
    }
    const openedGroup = document.getElementById(`group-${groupName}"`);
    if (openedGroup) {
      openedGroup.classList.remove('in');
    }
    const group = document.getElementById(`group-${groupName}`);
    group && group.classList.add('in');

    let component = webformBuilder.element.querySelector(`span[data-type='${type}']`);
    if (component) {
      component = component && component.cloneNode(true);
      const element = container || webformBuilder.element.querySelector('.drag-container.formio-builder-form');
      element.appendChild(component);
      builderGroup = document.getElementById(`group-container-${groupName}`);
      webformBuilder.onDrop(component, element, builderGroup);
    }
    else {
      return;
    }

    return webformBuilder;
  },

  setComponentProperty(property, before, after, cb) {
    const component = _.cloneDeep(formBuilder.editForm.submission);
    assert.equal(_.get(component.data, property), before);
    _.set(component.data, property, after);
    formBuilder.off('updateComponent');
    formBuilder.on('updateComponent', () => {
      const preview = formBuilder.componentPreview.innerHTML;
      assert.equal(_.get(formBuilder.editForm.submission.data, property), after);
      cb(preview);
    });
    formBuilder.editForm.submission = component;
  },

  testBuilderProperty(property, before, after, previewRegEx, cb) {
    Harness.testVisibility(formBuilder.editForm, `.formio-component-${property}`, true);
    Harness.setComponentProperty(property, before, after, (preview) => {
      if (previewRegEx) {
        assert(preview.match(previewRegEx), `${property} not set correctly`);
      }
      Harness.getInputValue(formBuilder.editForm, `data[${property}]`, after);
      cb();
    });
  },

  getDate() {
    let timestamp = (new Date()).getTime();
    timestamp = parseInt(timestamp / 1000, 10);
    return (new Date(timestamp * 1000)).toISOString();
  },
  testCreate(Component, componentSettings, options = {}) {
    const compSettings = _.cloneDeep(componentSettings);
    const component = new Component(compSettings, _.merge({
      events: new EventEmitter({
        wildcard: false,
        maxListeners: 0
      })
    }, options));
    component.pristine = false;
    return new Promise((resolve, reject) => {
      i18next.init(i18Defaults, (err) => {
        if (err) {
          return reject(err);
        }
        // Need a parent element to redraw.
        const parent = document.createElement('div');
        const element = document.createElement('div');
        parent.appendChild(element);
        component.build(element);
        assert(Boolean(component.element), `No ${component.type} element created.`);
        return resolve(component);
      });
    });
  },
  testConditionals(form, submission, hidden, done) {
    form.on('change', () => {
      form.everyComponent((comp) => {
        if (hidden.includes(comp.component.key)) {
          // Should be hidden.
          assert(!comp.visible, 'Element should not be visible');
          assert.equal(comp.element.childElementCount, 0, 'Hidden elements should not have children');
        }
        else {
          // Should be visible.
          assert(comp.visible, 'Element should not be hidden');
          assert.notEqual(comp.element.childElementCount, 0, 'Element must be visible');
        }
      });
      done();
    });
    form.submission = submission;
  },
  testVisibility(component, query, visible) {
    const element = component.element.querySelector(query);
    assert(element, `${query} not found`);
    if (visible) {
      assert((element.style.visibility === '') || (element.style.visibility === 'visible'), 'Element must be visible');
    }
    else {
      assert(element.style.visibility === 'hidden', 'Element must be hidden');
    }
  },
  clickElement(component, query) {
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    let element = query;
    if (typeof query === 'string') {
      element = this.testElement(component, query, true);
    }
    return element ? element.dispatchEvent(clickEvent) : null;
  },
  dispatchEvent(eventType, element, query, beforeDispatch) {
    const event = new Event(eventType);
    const el = element.querySelector(query);
    assert(el, 'Element is not found');
    beforeDispatch && beforeDispatch(el);
    el.dispatchEvent(event);
    return el;
  },
  testElements(component, query, number) {
    const elements = component.element.querySelectorAll(query);
    if (number !== undefined) {
      assert.equal(elements.length, number);
    }
    return elements;
  },
  testElement(component, query, exists) {
    const element = component.element.querySelector(query);
    if (exists !== undefined) {
      assert.equal(Boolean(element), Boolean(exists));
    }
    return element;
  },
  testInnerHtml(component, query, content) {
    const element = component.element.querySelector(query);
    assert(element, `${query} not found`);
    assert.equal(element.innerHTML.trim(), content);
  },
  testAttribute(component, query, attribute, value) {
    const element = component.element.querySelector(query);
    assert(element, `${query} not found`);
    assert.equal(element.getAttribute(attribute), value);
  },
  testHasClass(component, query, className) {
    const element = component.element.querySelector(query);
    assert(element, `${query} not found`);
    assert(element.className.split(' ').includes(className));
  },
  testElementAttribute(element, attribute, expected) {
    if (element !== undefined && element.getAttribute(attribute)) {
      assert.equal(expected, element.getAttribute(attribute));
    }
    return element;
  },
  testSetGet(component, value) {
    const originValue = _.cloneDeep(value);
    component.setValue(value);
    assert.deepEqual(component.getValue(), originValue);
    return component;
  },
  setInputValue(component, name, value) {
    const inputEvent = new Event('input', {bubbles: true, cancelable: true});
    const element = component.element.querySelector(`input[name="${name}"]`);
    assert(element, `${name} input not found`);
    element.value = value;
    return element.dispatchEvent(inputEvent);
  },
  getInputValue(component, name, value) {
    const element = component.element.querySelector(`[name="${name}"]`);
    assert(element, `${name} input not found`);
    assert.equal(value, element.value);
  },
  testSetInput(component, input, output, visible, index = 0) {
    component.setValue(input);
    assert.deepEqual(component.getValue(), output);
    assert.deepEqual(component.refs.input[index].value, visible);
    return component;
  },
  testSubmission(form, submission, onChange) {
    if (onChange) {
      form.on('change', onChange);
    }
    this.testSetGet(form, submission);
    assert.deepEqual(form.data, submission.data);
  },
  testErrors(form, submission, errors, done) {
    form.on('error', (err) => {
      _.each(errors, (error, index) => {
        error.component = form.getComponent(error.component).component;
        assert.deepEqual(err[index], error);
      });
      form.off('error');
      done();
    });

    this.testSetGet(form, submission);
    assert.deepEqual(form.data, submission.data);
    form.submit();
  },
  testValid(component, value) {
    return new Promise((resolve, reject) => {
      let resolved = false;
      component.on('componentChange', (change) => {
        if (resolved) {return}
        const valid = component.checkValidity();
        if (valid) {
          assert.equal(component.dataValue, value);
          resolve();
        }
        else {
          reject('Component should be valid');
        }
        resolved = true;
      });
      component.setValue(value);
      component.triggerChange();
    });
  },
  testInvalid(component, value, field, expectedError) {
    return new Promise((resolve, reject) => {
      let resolved = false;
      component.on('componentChange', (change) => {
        if (resolved) {return}
        if(component.checkValidity()) {
          reject('Component should not be valid');
          resolved = true;
        }
      });
      component.on('componentError', (error) => {
        if (resolved) {return}
        assert.equal(error.component.key, field);
        assert.equal(error.message, expectedError);
        resolve();
        resolved = true;
      });

      // Set the value.
      component.setValue(value);
      component.triggerChange();
    });
  },
  testComponent(component, test, done) {
    let testBad = true;
    component.on('componentChange', (change) => {
      const valid = component.checkValidity();
      if (valid && !testBad) {
        assert.equal(change.value, test.good.value);
        done();
      }
    });
    component.on('componentError', (error) => {
      if (!testBad) {
        return done(new Error('Validation Error'));
      }
      testBad = false;
      assert.equal(error.component.key, test.bad.field);
      assert.equal(error.message, test.bad.error);
      component.setValue(test.good.value);
    });

    // Set the value.
    component.pristine = false;
    component.setValue(test.bad.value);
  },
  testWizardPrevPage(form, errors, onPrevPage) {
    if (errors) {
      form.on('error', (err) => {
        _.each(errors, (error, index) => {
          error.component = form.getComponent(error.component).component;
          assert.deepEqual(err[index], error);
        });
      });
    }
    if (onPrevPage) {
      form.on('prevPage', onPrevPage);
    }
    return form.prevPage();
  },
  testWizardNextPage(form, errors, onNextPage) {
    if (errors) {
      form.on('error', (err) => {
        _.each(errors, (error, index) => {
          error.component = form.getComponent(error.component).component;
          assert.deepEqual(err[index], error);
        });
      });
    }
    if (onNextPage) {
      form.on('nextPage', onNextPage);
    }
    return form.nextPage();
  },
  testNumberBlur(cmp, inv, outv, display, index = 0) {
    const input = _.get(cmp, ['refs', 'input', index], {});
    input.value = inv;
    input.dispatchEvent(new Event('blur'));
    assert.strictEqual(cmp.getValueAt(index), outv);
    assert.strictEqual(input.value, display);
  },
  onNext
};
export default Harness;
