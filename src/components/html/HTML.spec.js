'use strict';
import { HTMLComponent } from './HTML';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('HTML Component', function() {
  it('Should build an html component', function(done) {
    Harness.testCreate(HTMLComponent, comps.comp1).then((component) => {
      done();
    });
  });
  it('Should build an html component and ignore empty attribute name', function(done) {
    let comp = comps.comp1;
    comp.attrs.push({
      "attr": "",
      "value": ""
    });
    Harness.testCreate(HTMLComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
