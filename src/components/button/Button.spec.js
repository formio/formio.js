'use strict';
import assert from 'power-assert';
import { ButtonComponent } from './Button';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Button Component', function() {
  it('Should build a button component', function(done) {
    Harness.testCreate(ButtonComponent, comps.comp1).then((component) => {
      assert.equal(component.element.nodeName, 'BUTTON');
      done();
    });
  });
});
