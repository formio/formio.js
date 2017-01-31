'use strict';
import PasswordComponent from './Password';
import { components as comps } from './fixtures/index';
import { Harness as Harness } from '../../../test/harness';
describe('Password Component', function() {
  it('Should build a password component', function(done) {
    Harness.testCreate(PasswordComponent, comps.comp1).then((component) => {
      Harness.testInputs(component, 'input[type="password"]', 1);
      done();
    });
  });
});
