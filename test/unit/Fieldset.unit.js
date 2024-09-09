import Harness from '../harness';
import FieldsetComponent from '../../src/components/fieldset/Fieldset';

import {
  comp1
} from './fixtures/fieldset';

describe('Fieldset Component', () => {
  it('Should build a fieldset component', () => {
    return Harness.testCreate(FieldsetComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
    });
  });
});
