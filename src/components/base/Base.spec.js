'use strict';
import assert from 'power-assert';
import BaseComponent from './Base';
import { Harness as Harness } from '../../../test/harness';
import { components as comps } from './fixtures/index';
describe('Base Component', function() {
  it('Should build a base component', function(done) {
    Harness.testCreate(BaseComponent, comps.comp1).then((component) => {
      let inputs = Harness.testInputs(component, 'input[type="text"]', 1);
      for (let i=0; i < inputs.length; i++) {
        assert.equal(inputs[i].name, 'data[' + comps.comp1.key + ']');
      }
      done()
    });
  });

  it('Should provide required validation', function(done) {
    Harness.testCreate(BaseComponent, comps.comp1, {
      validate: {required: true}
    }).then((component) => Harness.testComponent(component, {
      bad: {
        value: '',
        field: 'firstName',
        error: 'First Name is required'
      },
      good: {
        value: 'te'
      }
    }, done));
  });

  it('Should provide minLength validation', function(done) {
    Harness.testCreate(BaseComponent, comps.comp1, {
      validate: {minLength: 2}
    }).then((component) => Harness.testComponent(component, {
      bad: {
        value: 't',
        field: 'firstName',
        error: 'First Name must be longer than 1 characters.'
      },
      good: {
        value: 'te'
      }
    }, done));
  });

  it('Should provide maxLength validation', function(done) {
    Harness.testCreate(BaseComponent, comps.comp1, {
      validate: {maxLength: 5}
    }).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'testte',
        field: 'firstName',
        error: 'First Name must be shorter than 6 characters.'
      },
      good: {
        value: 'te'
      }
    }, done));
  });

  it('Should provide custom validation', function(done) {
    Harness.testCreate(BaseComponent, comps.comp1, {
      validate: {custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'}
    }).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'Joe',
        field: 'firstName',
        error: 'You cannot be Joe'
      },
      good: {
        value: 'Tom'
      }
    }, done));
  });
});
