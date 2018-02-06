'use strict';
import {TextFieldComponent} from './TextField';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
describe('TextField Component', () => {
  it('Should build a TextField component', (done) => {
    Harness.testCreate(TextFieldComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
});
