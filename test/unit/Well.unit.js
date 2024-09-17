import Harness from '../harness';
import WellComponent from '../../src/components/well/Well';

import {
  comp1
} from './fixtures/well';
import { expect } from 'chai';

describe('Well Component', () => {
  it('Should build a Well component', () => {
    return Harness.testCreate(WellComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
    });
  });

  it('Should skip validation on non-input nested components', done => {
    Harness.testCreate(WellComponent, comp1)
      .then(cmp => {
        expect(cmp.shouldSkipValidation()).to.be.true;
        done();
      }, done)
      .catch(done);
  });
});
