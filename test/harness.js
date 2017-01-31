import assert from 'power-assert';
import _cloneDeep from 'lodash/cloneDeep';
import EventEmitter from 'eventemitter2';
import _merge from 'lodash/merge';
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
  testInputs: function(component, query, numInputs) {
    let inputs = component.element.querySelectorAll(query);
    assert.equal(inputs.length, numInputs);
    return inputs;
  },
  testSetGet: function(component, value) {
    component.setValue(value);
    assert.deepEqual(component.value, value);
    return component;
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
