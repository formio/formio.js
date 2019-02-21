import i18next from 'i18next';
import assert from 'power-assert';
import _ from 'lodash';
import EventEmitter from 'eventemitter2';
import { expect } from 'chai';

import i18Defaults from '../src/i18n';
import WebformBuilder from '../src/WebformBuilder';
import AllComponents from '../src/components';
import Components from '../src/components/Components';

Components.setComponents(AllComponents);

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
    formBuilderElement = document.createElement('div');
    document.body.appendChild(formBuilderElement);
    formBuilder = new WebformBuilder(formBuilderElement, options);
    formBuilder.form = { components: [] };
    formBuilder.builderReady.then(done);
  },

  builderAfter() {
    formBuilder.destroy();
    document.body.removeChild(formBuilderElement);
  },

  buildComponent(type) {
    // Get the builder sidebar component.
    let builderGroup = null;
    _.each(formBuilder.groups, (group) => {
      if (group.components[type]) {
        builderGroup = group.body;
        return false;
      }
    });
    const component = document.getElementById(`builder-${type}`).cloneNode(true);
    formBuilder.element.appendChild(component);
    formBuilder.onDrop(component, formBuilder.element, builderGroup);
    return formBuilder;
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
    return new Promise((resolve, reject) => {
      i18next.init(i18Defaults, (err) => {
        if (err) {
          return reject(err);
        }
        component.build();
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
          assert(comp.element.hidden, 'Element should not be visible');
          assert.equal(comp.element.style.visibility, 'hidden');
        }
        else {
          // Should be visible.
          assert(!comp.element.hidden, 'Element should not be hidden');
          assert((comp.element.style.visibility === '') || (comp.element.style.visibility === 'visible'), 'Element must be visible');
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
    const element = this.testElement(component, query, true);
    return element.dispatchEvent(clickEvent);
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
  assertStringEqual(test) {
    return function(value) {
      /* eslint-disable no-irregular-whitespace */
      return value.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,' ') ===
        test.replace(/[\u00A0\u1680​\u180e\u2000-\u2009\u200a​\u200b​\u202f\u205f​\u3000]/g,' ');
      /* eslint-enable  no-irregular-whitespace */
    };
  },
  testSetInput(component, input, output, visible, index = 0) {
    component.setValue(input);
    assert.deepEqual(component.getValue(), output);
    if (typeof visible === 'function') {
      assert(visible(component.inputs[index].value), 'Failed');
    }
    else {
      assert.deepEqual(component.inputs[index].value, visible);
    }
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

    onNext(form, 'change', () => {
      form.submit().catch(done);
    });

    this.testSetGet(form, submission);
    assert.deepEqual(form.data, submission.data);
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
    const input = _.get(cmp, ['inputs', index], {});
    input.value = inv;
    input.dispatchEvent(new Event('blur'));
    assert.strictEqual(cmp.getValueAt(index), outv);
    assert.strictEqual(input.value, display);
  },
  onNext
};
export default Harness;
