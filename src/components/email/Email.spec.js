'use strict';
import {EmailComponent} from './Email';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
describe('Email Component', () => {
  it('Should build a email component', (done) => {
    Harness.testCreate(EmailComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
