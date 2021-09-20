import assert from 'power-assert';
import Formio from './../../Formio';
import _ from 'lodash';
import Harness from '../../../test/harness';
import RadioComponent from './Radio';

import {
  comp1,
  comp2,
  comp3,
  comp4,
  comp5,
  comp6,
  comp7
} from './fixtures';

describe('Radio Component', () => {
  it('Should build a radio component', () => {
    return Harness.testCreate(RadioComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="radio"]', 4);
      Harness.testElements(component, 'span', 4);
    });
  });

  it('Should return correct string values if storage type is Number', () => {
    return Harness.testCreate(RadioComponent, comp2).then((component) => {
      assert.equal(component.getValueAsString(1), 'one');
      assert.equal(component.getValueAsString(2), 'two');
    });
  });

  it('Should save checked value after redrawing if storage type is Number', (done) => {
    Harness.testCreate(RadioComponent, comp3).then((component) => {
      component.setValue(22);
      component.redraw();

      setTimeout(()=>{
        assert.equal(component.refs.input[0].checked, false);
        assert.equal(component.refs.input[1].value, '22');
        assert.equal(component.refs.input[1].checked, true);
        assert.equal(component.refs.input[2].checked, false);
        done();
      }, 700);
    });
  });

  it('Span should have correct text label', () => {
    return Harness.testCreate(RadioComponent, comp1).then((component) => {
      component.element.querySelectorAll('input').forEach((input) => {
        assert(input.getAttribute('class').indexOf('form-check-input') !== -1, 'No form-check-input on radios.');
      });
      const spans = component.element.querySelectorAll('span');
      assert.equal(spans[0].innerHTML, 'Red');
      assert.equal(spans[1].innerHTML, 'Green');
      assert.equal(spans[2].innerHTML, 'Blue');
      assert.equal(spans[3].innerHTML, 'Yellow');
    });
  });

  it('Should set false as defaultValue correctly', (done) => {
    Harness.testCreate(RadioComponent, comp4).then((component) => {
      assert.equal(component.dataValue, false, 'Should be equal to false');
      const input = component.element.querySelector('input[value="false"]');
      assert.equal(input.getAttribute('checked'), 'true', 'Should be checked');
      done();
    });
  });

  it('Should provide "Allow only available values" validation', (done) => {
    const form = _.cloneDeep(comp5);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const radio = form.getComponent('radio');
      let value = 'five';
      radio.setValue(value);

      setTimeout(() => {
        assert.equal(radio.getValue(), value);
        assert.equal(radio.dataValue, value);
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(form.errors.length, 1);
          assert.equal(radio.error.message, 'Radio is an invalid value.');
          value = 'one';
          radio.setValue(value);

          setTimeout(() => {
            assert.equal(radio.getValue(), value);
            assert.equal(radio.dataValue, value);
            assert.equal(form.errors.length, 0);
            assert.equal(!!radio.error, false);

            document.innerHTML = '';
            done();
          }, 300);
        }, 300);
      }, 200);
    }).catch(done);
  });
  it('Should not have default values in schema', (done) => {
    const form = _.cloneDeep(comp6);
    const element = document.createElement('div');

    const requiredSchema = {
      label: 'Radio',
      optionsLabelPosition: 'right',
      inline: true,
      tableView: false,
      key: 'radio',
      type: 'radio',
      input: true
    };

    Formio.createForm(element, form).then(form => {
      const radio = form.getComponent('radio');
      assert.deepEqual(requiredSchema, radio.schema);
      done();
    }).catch(done);
  });
});

describe('Radio Component', () => {
  it('should have red asterisk left hand side to the options labels if component is required and label is hidden', () => {
    return Harness.testCreate(RadioComponent, comp7).then(component => {
      const options = component.element.querySelectorAll('.form-check-label');
      options.forEach(i => {
        assert.deepEqual(!!getComputedStyle(i, ':before'), true);
      });
    });
  });
});
