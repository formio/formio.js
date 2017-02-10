'use strict';
import DateTimeComponent from './DateTime';
import { components as comps } from './fixtures/index';
import Harness from '../../../test/harness';
describe('DateTime Component', function() {
  it('Should build a date time component', function(done) {
    Harness.testCreate(DateTimeComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
