'use strict';
import LocationComponent from './Location';
import { components as comps } from './fixtures/index';
import Harness from '../../../test/harness';
describe('Location Component', function() {
  it('Should build a location component', function(done) {
    Harness.testCreate(LocationComponent, comps.comp1).then((component) => {
      done();
  });
  });
});
