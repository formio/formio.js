import Harness from '../../../test/harness';
import TagsComponent from './Tags';
import assert from 'power-assert';

import {
  comp1,
  comp2
} from './fixtures';

describe('Tags Component', function() {
  it('Should build a tags component', function() {
    return Harness.testCreate(TagsComponent, comp1);
  });

  it('Should not exceed maxTags limit', function(done) {
    Harness.testCreate(TagsComponent, comp2).then((component) => {
      const blurEvent = new Event('blur');
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const element = component.choices.input.element;
      const values = ['1', '2', '3', '4', '5'];

      values.forEach(value => {
        element.value = value;
        element.dispatchEvent(inputEvent);
        element.dispatchEvent(blurEvent);
      });

      assert.equal(component.choices.getValue(true).length, 4);
      done();
    });
  });
});
