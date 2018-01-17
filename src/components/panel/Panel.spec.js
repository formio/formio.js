'use strict';
import assert from 'power-assert';
import { PanelComponent } from './Panel';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Panel Component', function() {
  it('Should build a panel component', function(done) {
    Harness.testCreate(PanelComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });

  it('Panel should have correct classes', function(done) {
    Harness.testCreate(PanelComponent, comps.comp1).then((component) => {
      let panelClass = component.element.getAttribute('class');
      assert(panelClass.indexOf('card bg-default') !== -1, 'No Bootstrap 4 classes');
      assert(panelClass.indexOf('panel panel-default') !== -1, 'No Bootstrap 3 classes');
      assert(component.element.childNodes[0].getAttribute('class').indexOf('card-header panel-heading') !== -1);
      assert(component.element.childNodes[0].childNodes[0].getAttribute('class').indexOf('card-title panel-title') !== -1);
      assert(component.element.childNodes[1].getAttribute('class').indexOf('card-body panel-body') !== -1);
      done();
    });
  });
});
