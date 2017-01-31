'use strict';
import HTMLComponent from './HTML';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('HTML Component', function() {
  it('Should build an html component', function(done) {
    Harness.testCreate(HTMLComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
