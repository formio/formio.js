import Harness from '../../../test/harness';
import TextAreaComponent from './TextArea';

import {
  comp1
} from './fixtures';

describe('TextArea Component', () => {
  it('Should build a TextArea component', () => {
    return Harness.testCreate(TextAreaComponent, comp1).then((component) => {
      Harness.testElements(component, 'textarea', 1);
    });
  });
});
