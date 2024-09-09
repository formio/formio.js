

import Harness from '../../../test/harness';
import HiddenComponent from './Hidden';

import {
  comp1
} from './fixtures';

describe('Hidden Component', () => {
  it('Should build a hidden component', () => {
    return Harness.testCreate(HiddenComponent, comp1);
  });

  it('Should not incorrectly validate multiple when hidden component has an array value', () => {
    return Harness.testCreate(HiddenComponent, comp1).then((component) => {
      assert(component.checkValidity(), 'Item should be valid');
      component.setValue([
        {
          key: 'foo',
          value: 'bar'
        },
        {
          key: 'hello',
          value: 'world'
        }
      ]);
      assert(component.checkValidity(), 'Item should be valid after setting value');
    });
  });
});
