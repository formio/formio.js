'use strict';
import {SelectBoxesComponent} from './SelectBoxes';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
describe('SelectBoxes Component', () => {
  it('Should build a SelectBoxes component', (done) => {
    Harness.testCreate(SelectBoxesComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
      done();
    });
  });

  it('Should build a required SelectBoxes component', (done) => {
    Harness.testCreate(SelectBoxesComponent, comps.comp2).then((component) => {
      Harness.testElements(component, 'input[type="checkbox"]', 8);
      Harness.testElements(component, 'label.control-label > span', 8);
      Harness.testElements(component, 'label.control-label.field-required', 1);
      done();
    });
  });
});
