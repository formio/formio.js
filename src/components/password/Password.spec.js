'use strict';
import PasswordComponent from './Password';
import {components as comps} from './fixtures/index';
import Harness from '../../../test/harness';
describe('Password Component', () => {
  it('Should build a password component', (done) => {
    Harness.testCreate(PasswordComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="password"]', 1);
      done();
    });
  });
});
