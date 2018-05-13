'use strict';
import TimeComponent from './Time';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('Time Component', () => {
  it('Should build a time component', (done) => {
    Harness.testCreate(TimeComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
