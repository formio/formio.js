'use strict';
import SelectComponent from './Select';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('Select Component', () => {
  it('Should build a Select component', (done) => {
    Harness.testCreate(SelectComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'select', 1);
      done();
    });
  });

  it('Should preserve the tabindex', (done) => {
    Harness.testCreate(SelectComponent, comps.comp2).then((component) => {
      const element = component.element.getElementsByClassName('choices__list choices__list--single')[0];
      Harness.testElementAttribute(element, 'tabindex', '10');
      done();
    });
  });

  it('Should default to 0 when tabindex is not specified', (done) => {
    Harness.testCreate(SelectComponent, comps.comp1).then((component) => {
      const element = component.element.getElementsByClassName('choices__list choices__list--single')[0];
      Harness.testElementAttribute(element, 'tabindex', '0');
      done();
    });
  });
});
