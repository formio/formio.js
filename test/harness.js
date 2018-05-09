import i18next from 'i18next';
import assert from 'power-assert';
import _ from 'lodash';
import EventEmitter from 'eventemitter2';
import i18Defaults from '../src/i18n';
import WebformBuilder from "../src/WebformBuilder";
let formBuilderElement = null;
let formBuilder = null;
const Harness = {
  builderBefore: function(done) {
    formBuilderElement = document.createElement('div');
    document.body.appendChild(formBuilderElement);
    formBuilder = new WebformBuilder(formBuilderElement);
    formBuilder.form = {components: []};
    formBuilder.builderReady.then(done);
  },

  builderAfter: function(done) {
    formBuilder.destroy();
    document.body.removeChild(formBuilderElement);
  },

  buildComponent: function(type) {
    // Get the builder sidebar component.
    let builderGroup = null;
    _.each(formBuilder.groups, (group) => {
      if (group.components[type]) {
        builderGroup = group.body;
        return false;
      }
    });
    let component = document.getElementById(`builder-${type}`).cloneNode(true);
    formBuilder.element.appendChild(component);
    formBuilder.onDrop(component, formBuilder.element, builderGroup);
    return formBuilder;
  },

  setComponentProperty: function(property, before, after, cb) {
    let component = _.cloneDeep(formBuilder.editForm.submission);
    assert.equal(_.get(component.data, property), before);
    _.set(component.data, property, after);
    formBuilder.off('updateComponent');
    formBuilder.on('updateComponent', () => {
      let preview = formBuilder.componentPreview.innerHTML;
      assert.equal(_.get(formBuilder.editForm.submission.data, property), after);
      cb(preview);
    });
    formBuilder.editForm.submission = component;
  },

  testBuilderProperty: function(property, before, after, previewRegEx, cb) {
    Harness.testVisibility(formBuilder.editForm, `.formio-component-${property}`, true);
    Harness.setComponentProperty(property, before, after, (preview) => {
      if (previewRegEx) {
        assert(preview.match(previewRegEx), `${property} not set correctly`);
      }
      Harness.getInputValue(formBuilder.editForm, `data[${property}]`, after);
      cb();
    });
  },

  getDate: function() {
    let timestamp = (new Date()).getTime();
    timestamp = parseInt(timestamp / 1000, 10);
    return (new Date(timestamp * 1000)).toISOString();
  },
  testCreate: function(Component, componentSettings, options = {}) {
    let compSettings = _.cloneDeep(componentSettings);
    var component = new Component(compSettings, _.merge({
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
        assert(!!component.element, 'No ' + component.type + ' element created.');
        return resolve(component);
      });
    });
  },
  testConditionals: function(form, submission, hidden, done) {
    form.on('change', () => {
      form.everyComponent((comp) => {
        if (hidden.indexOf(comp.component.key) !== -1) {
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
  testVisibility: function(component, query, visible) {
    let element = component.element.querySelector(query);
    assert(element, query + ' not found');
    if (visible) {
      assert((element.style.visibility === '') || (element.style.visibility === 'visible'), 'Element must be visible');
    }
    else {
      assert(element.style.visibility === 'hidden', 'Element must be hidden');
    }
  },
  clickElement: function(component, query) {
    const clickEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    const element = this.testElement(component, query, true);
    return element.dispatchEvent(clickEvent);
  },
  testElements: function(component, query, number) {
    let elements = component.element.querySelectorAll(query);
    if (number !== undefined) {
      assert.equal(elements.length, number);
    }
    return elements;
  },
  testElement: function(component, query, exists) {
    let element = component.element.querySelector(query);
    if (exists !== undefined) {
      assert.equal(!!element, !!exists);
    }
    return element;
  },
  testInnerHtml: function(component, query, content) {
    let element = component.element.querySelector(query);
    assert(element, query + ' not found');
    assert.equal(element.innerHTML.trim(), content);
  },
  testAttribute: function(component, query, attribute, value) {
    let element = component.element.querySelector(query);
    assert(element, query + ' not found');
    assert.equal(element.getAttribute(attribute), value);
  },
  testHasClass: function(component, query, className) {
    let element = component.element.querySelector(query);
    assert(element, query + ' not found');
    assert(element.className.split(' ').indexOf(className) !== -1);
  },
  testElementAttribute: function(element, attribute, expected) {
    if (element !== undefined && element.getAttribute(attribute)) {
      assert.equal(expected, element.getAttribute(attribute));
    }
    return element;
  },
  testSetGet: function(component, value) {
    component.setValue(value);
    assert.deepEqual(component.getValue(), value);
    return component;
  },
  setInputValue: function(component, name, value) {
    const inputEvent = new Event('input', {bubbles: true, cancelable: true});
    const element = component.element.querySelector('input[name="' + name + '"]');
    assert(element, name + ' input not found');
    element.value = value;
    return element.dispatchEvent(inputEvent);
  },
  getInputValue: function(component, name, value) {
    const element = component.element.querySelector('[name="' + name + '"]');
    assert(element, name + ' input not found');
    assert.equal(value, element.value);
  },
  testSetInput: function(component, input, output, visible, index = 0) {
    component.setValue(input);
    assert.deepEqual(component.getValue(), output);
    assert.deepEqual(component.inputs[index].value, visible);
    return component;
  },
  testSubmission: function(form, submission, onChange) {
    if (onChange) {
      form.on('change', onChange);
    }
    this.testSetGet(form, submission);
    assert.deepEqual(form.data, submission.data);
  },
  testErrors: function(form, submission, errors, done) {
    form.on('error', (err) => {
      _.each(errors, (error, index) => {
        error.component = form.getComponent(error.component).component;
        assert.deepEqual(err[index], error);
      });
      done();
    });
    this.testSetGet(form, submission);
    assert.deepEqual(form.data, submission.data);
    form.submit();
  },
  testComponent: function(component, test, done) {
    let testBad = true;
    component.on('componentChange', (change) => {
      let valid = component.checkValidity();
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
  testWizardPrevPage: function(form, errors, onPrevPage) {
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
  testWizardNextPage: function(form, errors, onNextPage) {
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
  }
};
export default Harness;
