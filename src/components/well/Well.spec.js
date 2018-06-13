import assert from 'power-assert';

import Harness from '../../../test/harness';
import WellComponent from './Well';

import {
  comp1
} from './fixtures';

describe('Well Component', () => {
  it('Should build a Well component', (done) => {
    Harness.testCreate(WellComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
      done();
    });
  });

  it('Should include the correct classes', (done) => {
    Harness.testCreate(WellComponent, comp1).then((component) => {
      const componentClass = component.element.getAttribute('class');
      assert(componentClass.indexOf('card card-body bg-faded') !== -1, 'Bootstrap 4 classes not present.');
      assert(componentClass.indexOf('well') !== -1, 'Bootstrap 3 classes not present.');
      done();
    });
  });
});
