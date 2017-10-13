'use strict';
import { SelectComponent } from './Select';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Select Component', function() {
  it('Should build a Select component', function(done) {
    Harness.testCreate(SelectComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'select', 1);
      done();
    });
  });

  it('Should preserve the tabindex', function(done) {
    Harness.testCreate(SelectComponent, comps.comp2).then((component) => {
      let element = component.element.getElementsByClassName("choices__list choices__list--single")[0];
      Harness.testElementAttribute(element, 'tabindex', '10');
      done();
    });
  });

  it('Should default to 0 when tabindex is not specified', function(done) {
    Harness.testCreate(SelectComponent, comps.comp1).then((component) => {
      let element = component.element.getElementsByClassName("choices__list choices__list--single")[0];
      Harness.testElementAttribute(element, 'tabindex', '0');
      done();
    });
  });
});
