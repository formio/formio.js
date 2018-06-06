'use strict';
import assert from 'power-assert';
import PanelComponent from './Panel';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('Panel Component', () => {
  it('Should build a panel component', (done) => {
    Harness.testCreate(PanelComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });

  it('Panel should have correct classes', (done) => {
    Harness.testCreate(PanelComponent, comps.comp1).then((component) => {
      const panelClass = component.element.getAttribute('class');
      assert(panelClass.includes('card border-secondary'), 'No Bootstrap 4 classes');
      assert(panelClass.includes('panel panel-default'), 'No Bootstrap 3 classes');
      assert(component.element.childNodes[0].getAttribute('class').includes('card-header panel-heading'));
      assert(component.element.childNodes[0].childNodes[0].getAttribute('class').includes('card-title panel-title'));
      assert(component.element.childNodes[1].getAttribute('class').includes('card-body panel-body'));
      done();
    });
  });
});
