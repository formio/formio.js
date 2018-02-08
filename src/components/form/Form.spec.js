'use strict';
import assert from 'power-assert';
import {FormComponent} from './Form';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
describe('Form Component', () => {
  it('Should build a form component', (done) => {
    Harness.testCreate(FormComponent, comps.comp1).then((component) => {
      done();
    });
  });

  it('Should pass along the base parameter when set with src.', (done) => {
    Harness.testCreate(FormComponent, comps.comp2, {
      base: 'https://remote.form.io'
    }).then((component) => {
      assert.equal(component.formio.projectUrl, 'https://remote.form.io/testproject');
      done();
    });
  });
});
