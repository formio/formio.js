'use strict';
import EmailComponent from './Email';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('Email Component', function() {
  it('Should build a email component', function(done) {
    Harness.testCreate(EmailComponent, comps.comp1).then((component) => {
      done();
    });
  });
});
