import assert from 'power-assert';

import Harness from '../../../test/harness';
import ButtonComponent from './Button';

import {
  comp1
} from './fixtures';

describe('Button Component', () => {
  it('Should build a button component', () => {
    return Harness.testCreate(ButtonComponent, comp1).then((component) => {
      const buttons = Harness.testElements(component, 'button[type="submit"]', 1);
      for (const button of buttons) {
        assert.equal(button.name, `data[${comp1.key}]`);
        assert.equal(button.innerHTML, comp1.label);
      }
    });
  });
});
