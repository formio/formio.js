'use strict';
import {HiddenComponent} from './Hidden';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
describe('Hidden Component', () => {
  it('Should build a hidden component', (done) => {
    Harness.testCreate(HiddenComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
