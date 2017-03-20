'use strict';
import { CurrencyComponent } from './Currency';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Currency Component', function() {
  it('Should build a currency component', function(done) {
    Harness.testCreate(CurrencyComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
});
