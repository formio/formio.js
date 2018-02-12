'use strict';
import assert from 'power-assert';
import {ButtonComponent} from './Button';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
describe('Button Component', () => {
  it('Should build a button component', (done) => {
    Harness.testCreate(ButtonComponent, comps.comp1).then((component) => {
      const buttons = Harness.testElements(component, 'button[type="submit"]', 1);
      for (let i=0; i < buttons.length; i++) {
        assert.equal(buttons[i].name, `data[${comps.comp1.key}]`);
        assert.equal(buttons[i].innerHTML, comps.comp1.label);
      }
      done();
    });
  });
});
