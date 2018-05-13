'use strict';
import TagsComponent from './Tags';
import { components as comps } from './fixtures/index';
import Harness from '../../../test/harness';
describe('Tags Component', function() {
  it('Should build a tags component', function(done) {
    Harness.testCreate(TagsComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
