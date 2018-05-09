'use strict';
import assert from 'power-assert';
import FormComponent from './Form';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('Form Component', () => {
  it('Should build a form component', (done) => {
    Harness.testCreate(FormComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
