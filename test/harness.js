import i18next from 'i18next';
import assert from 'power-assert';
import _cloneDeep from 'lodash/cloneDeep';
import EventEmitter from 'eventemitter2';
import _merge from 'lodash/merge';
import _each from 'lodash/each';
import i18n from '../src/i18n';
export const Harness = {
  getDate: function() {
    let timestamp = (new Date()).getTime();
    timestamp = parseInt(timestamp / 1000, 10);
    return (new Date(timestamp * 1000)).toISOString();
  },
  testCreate: function(Component, componentSettings, options = {}) {
    let compSettings = _cloneDeep(componentSettings);
    var component = new Component(compSettings, _merge({
      events: new EventEmitter({
        wildcard: false,
        maxListeners: 0
      })
    }, options));
    return new Promise((resolve, reject) => {
      i18next.init(i18n, (err) => {
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
          assert.equal(comp.element.hidden, true);
          assert.equal(comp.element.style.visibility, 'hidden');
        }
        else {
          // Should be visible.
          assert(!comp.element.hidden, 'Element is hidden');
          assert((comp.element.style.visibility === '') || (comp.element.style.visibility === 'visible'), 'Element must be visible');
        }
      });
      done();
    });
    form.submission = submission;
  },
  testElements: function(component, query, numInputs) {
    let elements = component.element.querySelectorAll(query);
    if (numInputs !== undefined) {
      assert.equal(elements.length, numInputs);
    }
    return elements;
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
      _each(errors, (error, index) => {
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
        _each(errors, (error, index) => {
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
        _each(errors, (error, index) => {
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
