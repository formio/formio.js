'use strict';
import { GmapComponent } from './Gmap';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('Gmap Component', function() {
  it('Should build an address component', function(done) {
    Harness.testCreate(GmapComponent, comps.comp1).then((component) => {
      done();
  });
  });
});
