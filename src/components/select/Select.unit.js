import assert from 'power-assert';
import cloneDeep from 'lodash/cloneDeep';
import Harness from '../../../test/harness';
import SelectComponent from './Select';
import { expect } from 'chai';
import NativePromise from 'native-promise-only';

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

  it('Should allow to override threshold option of fuzzy search', () => {
    try {
      const c1 = Object.assign(cloneDeep(comp1), { searchThreshold: 0.2 });
      const c2 = Object.assign(cloneDeep(comp1), { searchThreshold: 0.4 });
      const c3 = Object.assign(cloneDeep(comp1), { searchThreshold: 0.8 });
      const comps = [
        Harness.testCreate(SelectComponent, c1),
        Harness.testCreate(SelectComponent, c2),
        Harness.testCreate(SelectComponent, c3),
      ];

      return NativePromise
        .all(comps)
        .then(([a, b, c]) => {
          expect(a.choices.config.fuseOptions.threshold).to.equal(0.2);
          expect(b.choices.config.fuseOptions.threshold).to.equal(0.4);
          expect(c.choices.config.fuseOptions.threshold).to.equal(0.8);
        });
    }
    catch (error) {
      return NativePromise.reject(error);
    }
  });

  it('should set component value', () => {
    return Harness.testCreate(SelectComponent, comp1).then((component) => {
      assert.deepEqual(component.dataValue, '');
      component.setValue('red');
      assert.equal(component.dataValue, 'red');
    });
  });

  // it('should reset input value when called with empty value', () => {
  //   const comp = Object.assign({}, comp1);
  //   delete comp.placeholder;
  //
  //   return Harness.testCreate(SelectComponent, comp).then((component) => {
  //     assert.deepEqual(component.dataValue, '');
  //     assert.equal(component.refs.input[0].value, '');
  //     component.setValue('red');
  //     assert.equal(component.dataValue, 'red');
  //     assert.equal(component.refs.input[0].value, 'red');
  //     component.setValue('');
  //     assert.equal(component.dataValue, '');
  //     assert.equal(component.refs.input[0].value, '');
  //   });
  // });
});
