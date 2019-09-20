import Harness from '../../../test/harness';
import EmailComponent from './Email';

import {
  comp1
} from './fixtures';

describe('Email Component', () => {
  it('Should build a email component', () => {
    return Harness.testCreate(EmailComponent, comp1);
  });
});
