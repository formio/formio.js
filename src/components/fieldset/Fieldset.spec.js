'use strict';
import FieldsetComponent from './Fieldset';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('Fieldset Component', () => {
  it('Should build a fieldset component', (done) => {
    Harness.testCreate(FieldsetComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });
});
