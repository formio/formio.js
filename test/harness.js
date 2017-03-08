import assert from 'power-assert';
import _cloneDeep from 'lodash/cloneDeep';
import EventEmitter from 'eventemitter2';
import _merge from 'lodash/merge';
import _each from 'lodash/each';
export const Harness = {
  testCreate: function(Component, componentSettings, settings) {
    settings = settings || {};
    let compSettings = _cloneDeep(componentSettings);
    _merge(compSettings, settings);
    var component = new Component(compSettings, {
      events: new EventEmitter({
        wildcard: false,
        maxListeners: 0
      })
    });
    return component.localize().then(() => {
      component.build();
      assert(!!component.element, 'No ' + component.type + ' element created.');
      return component;
    });
  },
  testElements: function(component, query, numInputs) {
    let elements = component.element.querySelectorAll(query);
    if (numInputs !== undefined) {
      assert.equal(elements.length, numInputs);
    }
    return elements;
  },
  testSetGet: function(component, value) {
    component.setValue(value);
    assert.deepEqual(component.getValue(), value);
    return component;
  },
  testSubmission: function(form, submission, onChange) {
    if (onChange) {
      form.events.on('change', onChange);
    }
    this.testSetGet(form, submission.data);
    assert.deepEqual(form.data, submission.data);
  },
  testErrors: function(form, submission, error, done) {
    form.events.on('error', (err) => {
      error.component = form.getComponent(error.component).component;
      assert.deepEqual(err, error);
      done();
    });
    this.testSetGet(form, submission.data);
    assert.deepEqual(form.data, submission.data);
  },
  testComponent: function(component, test, done) {
    let hasError = false;
    component.events.on('componentChange', (change) => {
      if (hasError) {
        assert.equal(change.value, test.good.value);
        done();
      }
      else {
        done(new Error('No error thrown'));
      }
    });
    component.events.on('componentError', (error) => {
      hasError = true;
      assert.equal(error.component.key, test.bad.field);
      assert.equal(error.error, test.bad.error);
      component.setValue(test.good.value);
    });

    // Set the value.
    component.setValue(test.bad.value);
  }
};
