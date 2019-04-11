import assert from 'power-assert';

import Harness from '../../../test/harness';
import RadioComponent from './Radio';

import {
  comp1
} from './fixtures';

describe('Radio Component', () => {
  it('Should build a radio component', (done) => {
    Harness.testCreate(RadioComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="radio"]', 4);
      Harness.testElements(component, 'span', 4);
      done();
    });
  });

  it('Span should have correct text label', (done) => {
    Harness.testCreate(RadioComponent, comp1).then((component) => {
      component.element.querySelectorAll('input').forEach((input) => {
        assert(input.getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input on radios.');
      });
      const spans = component.element.querySelectorAll('span');
      assert.equal(spans[0].innerHTML, 'Red');
      assert.equal(spans[1].innerHTML, 'Green');
      assert.equal(spans[2].innerHTML, 'Blue');
      assert.equal(spans[3].innerHTML, 'Yellow');
      done();
    });
  });

  it('Should set the radio-selected class on wrapper of selected radio', done => {
    Harness.testCreate(RadioComponent, comp1).then((component) => {
      const selector = '.radio:nth-child(1)';
      const firstRadioWrapper = component.element.querySelector(selector);
      assert(
        firstRadioWrapper.getAttribute('class').indexOf('radio-selected') === -1,
        'Radio wrapper does not have radio-selected class.'
      );
      Harness.clickElement(component, `${selector} input`);
      assert(
        firstRadioWrapper.getAttribute('class').indexOf('radio-selected') !== -1,
        'Radio wrapper has radio-selected class.'
      );
      done();
    });
  });

  it('Should unset the radio-selected class on wrapper of selected radio', done => {
    Harness.testCreate(RadioComponent, comp1).then((component) => {
      const selector = number => `.radio:nth-child(${number})`;
      const radioWrapper = component.element.querySelector(selector(1));
      assert(
        radioWrapper.getAttribute('class').indexOf('radio-selected') === -1,
        'Radio wrapper does not have radio-selected class.'
      );
      Harness.clickElement(component, `${selector(1)} input`);
      assert(
        radioWrapper.getAttribute('class').indexOf('radio-selected') !== -1,
        'Radio wrapper has radio-selected class.'
      );
      Harness.clickElement(component, `${selector(2)} input`);
      assert(
        radioWrapper.getAttribute('class').indexOf('radio-selected') === -1,
        'Radio wrapper does not have radio-selected class.'
      );
      done();
    });
  });
});
