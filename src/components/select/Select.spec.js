import assert from 'power-assert';
import Harness from '../../../test/harness';
import SelectComponent from './Select';

import {
  comp1,
  comp2
} from './fixtures';

describe('Select Component', () => {
  it('Should build a Select component', () => {
    return Harness.testCreate(SelectComponent, comp1).then((component) => {
      Harness.testElements(component, 'select', 1);
    });
  });

  it('Should preserve the tabindex', () => {
    return Harness.testCreate(SelectComponent, comp2).then((component) => {
      const element = component.element.getElementsByClassName('choices__list choices__list--single')[0];
      Harness.testElementAttribute(element, 'tabindex', '10');
    });
  });

  it('Should default to 0 when tabindex is not specified', () => {
    return Harness.testCreate(SelectComponent, comp1).then((component) => {
      const element = component.element.getElementsByClassName('choices__list choices__list--single')[0];
      Harness.testElementAttribute(element, 'tabindex', '0');
    });
  });

  describe('#setValue', () => {
    it('should set component value', (done) => {
      Harness.testCreate(SelectComponent, comp1).then((component) => {
        assert.equal(component.dataValue, '');
        component.setValue('red');
        assert.equal(component.dataValue, 'red');
        done();
      });
    });

    it('should reset input value when called with empty value', (done) => {
      const comp = Object.assign({}, comp1);
      delete comp.placeholder;

      Harness.testCreate(SelectComponent, comp).then((component) => {
        assert.equal(component.dataValue, '');
        assert.equal(component.inputs[0].value, '');
        component.setValue('red');
        assert.equal(component.dataValue, 'red');
        assert.equal(component.inputs[0].value, 'red');
        component.setValue('');
        assert.equal(component.dataValue, '');
        assert.equal(component.inputs[0].value, '');
        done();
      });
    });
  });
});
