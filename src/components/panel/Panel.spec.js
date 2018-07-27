import assert from 'power-assert';

import Harness from '../../../test/harness';
import PanelComponent from './Panel';

import {
  comp1
} from './fixtures';

describe('Panel Component', () => {
  it('Should build a panel component', () => {
    return Harness.testCreate(PanelComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
    });
  });
});
