import assert from 'power-assert';

import Harness from '../../../test/harness';
import WellComponent from './Well';

import {
  comp1
} from './fixtures';

describe('Well Component', () => {
  it('Should build a Well component', () => {
    return Harness.testCreate(WellComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
    });
  });
});
