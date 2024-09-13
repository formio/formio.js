

import Harness from '../../../test/harness';
import HiddenComponent from './Hidden';
import assert from 'power-assert';

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

  it('Should set correct array data for Hidden component', () => {
    return Harness.testCreate(HiddenComponent, comp1).then((component) => {
      const value = [
        [ 1, 2, 3],
        ['a','b','c']
      ]
      component.setValue(value);
      assert(Array.isArray(component.dataValue), 'Value should be an Array');
      assert.deepEqual(component.dataValue, value, 'Value should be be equal to the set value');
    });
  });
});
