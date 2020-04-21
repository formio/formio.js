import Harness from '../../../test/harness';
import TextAreaComponent from './TextArea';
import sinon from 'sinon';
import { expect } from 'chai';

import {
  comp1,
  comp2
} from './fixtures';

describe('TextArea Component', () => {
  it('Should build a TextArea component', () => {
    return Harness.testCreate(TextAreaComponent, comp1).then((component) => {
      Harness.testElements(component, 'textarea', 1);
    });
  });

  it('setValue should be called only once', () => {
    return Harness.testCreate(TextAreaComponent, comp2).then((component) => {
      const valueToSet = [
        {
          firstName: 'Bobby',
          lastName: 'Lynch'
        },
        {
          firstName: 'Harold',
          lastName: 'Freeman'
        },
      ];
      const emit = sinon.spy(component, 'setValue');
      component.setValue(valueToSet);
      expect(component.getValue()).to.deep.equal([
        {
          firstName: 'Bobby',
          lastName: 'Lynch'
        },
        {
          firstName: 'Harold',
          lastName: 'Freeman'
        }
      ]);
      expect(emit.callCount).to.equal(1);
    });
  });
});
