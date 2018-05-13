'use strict';
import HTMLComponent from './HTML';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('HTML Component', () => {
  it('Should build an html component', (done) => {
    Harness.testCreate(HTMLComponent, comps.comp1).then((component) => {
      done();
    });
  });
  it('Should build an html component and ignore empty attribute name', (done) => {
    const comp = comps.comp1;
    comp.attrs.push({
      'attr': '',
      'value': ''
    });
    Harness.testCreate(HTMLComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
