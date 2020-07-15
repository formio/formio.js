import assert from 'power-assert';
import cloneDeep from 'lodash/cloneDeep';
import Harness from '../../../test/harness';
import SelectComponent from './Select';
import { expect } from 'chai';
import NativePromise from 'native-promise-only';

import {
  comp1,
  comp2,
  multiSelect,
  multiSelectOptions,
  comp4,
  comp5,
  comp6
} from './fixtures';

describe('Select Component', () => {
  it('should not stringify select option value', function(done) {
    Harness.testCreate(SelectComponent, comp6).then((component) => {
      component.setValue({ value:'a', label:'A' });

      assert.equal(component.choices._currentState.items[0].value.value, 'a');
      assert.equal(typeof component.choices._currentState.items[0].value , 'object');
      assert.equal(component.dataValue.value, 'a');
      assert.equal(typeof component.dataValue , 'object');
      done();
    });
  });

  it('should return string value for different value types', function(done) {
    Harness.testCreate(SelectComponent, comp4).then((component) => {
      const stringValue = component.asString(true);
      const stringValue1 = component.asString(11);
      const stringValue2 = component.asString('test');
      const stringValue3 = component.asString(12);
      assert.equal(stringValue, '<span>true</span>');
      assert.equal(stringValue1, '<span>11</span>');
      assert.equal(stringValue2, '<span>test</span>');
      assert.equal(stringValue3, '<span>1.2</span>');
      done();
    });
  });

  it('should correctly determine storage type when dataType is auto', function(done) {
    Harness.testCreate(SelectComponent, comp4).then((component) => {
      const value = component.normalizeSingleValue('true');
      const value1 = component.normalizeSingleValue('11');
      const value2 = component.normalizeSingleValue('test');
      const value3 = component.normalizeSingleValue('11test11test');
      const value4 = component.normalizeSingleValue('test11');
      const value5 = component.normalizeSingleValue('0');
      const value6 = component.normalizeSingleValue('');
      assert.equal(typeof value, 'boolean');
      assert.equal(typeof value1, 'number');
      assert.equal(typeof value2, 'string');
      assert.equal(typeof value3, 'string');
      assert.equal(typeof value4, 'string');
      assert.equal(typeof value5, 'number');
      assert.equal(typeof value6, 'string');
      done();
    });
  });

  it('should not stringify default empty values', function(done) {
    Harness.testCreate(SelectComponent, comp4).then((component) => {
      const value = component.normalizeSingleValue({});
      const value1 = component.normalizeSingleValue([]);
      assert.equal(typeof value, 'object');
      assert.equal(typeof value1, 'object');
      done();
    });
  });

  it('should not change value letter case', function(done) {
    Harness.testCreate(SelectComponent, comp4).then((component) => {
      const value = component.normalizeSingleValue('data.textArea');
      const value1 = component.normalizeSingleValue('ECMAScript');
      const value2 = component.normalizeSingleValue('JS');
      assert.equal(value, 'data.textArea');
      assert.equal(value1, 'ECMAScript');
      assert.equal(value2, 'JS');
      done();
    });
  });

  it('should define boolean value', function(done) {
    Harness.testCreate(SelectComponent, comp4).then((component) => {
      const value = component.normalizeSingleValue('TRUE');
      const value1 = component.normalizeSingleValue('False');
      const value2 = component.normalizeSingleValue('true');
      assert.equal(value, true);
      assert.equal(value1, false);
      assert.equal(value2, true);
      done();
    });
  });

  it('1/2 should not display empty choice options if property value is not defined', function(done) {
    Harness.testCreate(SelectComponent, comp5).then((component) => {
      component.setItems([{
        'label': '111',
        'value': '111'
      }, {
        'label': '222',
        'value': '222'
      }, {
        'label': '333',
        'value': '333'
      }], false);
      assert.equal(component.selectOptions.length, 0);
      done();
    });
  });

  it('2/2 should display choice option if property value is set', function(done) {
    comp5.template = '<span>{{ item.label }}</span>';
    Harness.testCreate(SelectComponent, comp5).then((component) => {
      component.setItems([{
        'label': '111',
        'value': '111'
      }, {
        'label': '222',
        'value': '222'
      }, {
        'label': '333',
        'value': '333'
      }], false);
      assert.equal(component.selectOptions.length, 3);
      done();
    });
  });

  it('should have only unique dropdown options', function(done) {
    comp5.template = '<span>{{ item.label }}</span>';
    comp5.uniqueOptions = true;
    Harness.testCreate(SelectComponent, comp5).then((component) => {
      component.setItems([{
        'label': 'Label 1',
        'value': 'value1'
      }, {
        'label': 'Label 2',
        'value': 'value2'
      }, {
        'label': 'Label 3',
        'value': 'value3'
      }, {
        'label': 'Label 4',
        'value': 'value3'
      }], false);

      assert.equal(component.selectOptions.length, 3);
      done();
    });
  });

  it('should set multiple selected values not repeating them', function(done) {
    Harness.testCreate(SelectComponent, multiSelect).then((component) => {
      component.setItems(multiSelectOptions, false);
      component.setChoicesValue(['Cheers']);
      component.setChoicesValue(['Cheers', 'Cyberdyne Systems'], 1);
      component.setChoicesValue(['Cheers', 'Cyberdyne Systems', 'Massive Dynamic'], 2);
      const choices = component.element.querySelector('.choices__list--multiple').children;
      assert.equal(choices.length, 3);
      done();
    });
  });

  it('should not show selected values in dropdown when searching', function(done) {
    Harness.testCreate(SelectComponent, multiSelect).then((component) => {
      component.setItems(multiSelectOptions, false);
      component.setChoicesValue(['Cheers']);
      component.setChoicesValue(['Cheers', 'Cyberdyne Systems'], 1);
      component.setItems([], true);
      const itemsInDropdown = component.element.querySelectorAll('.choices__item--choice');
      const choices = component.element.querySelector('.choices__list--multiple').children;
      assert.equal(choices.length, 2);
      assert.equal(itemsInDropdown.length, 1);
      done();
    });
  });

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

  it('should remove selected item', () => {
    return Harness.testCreate(SelectComponent, comp1).then((component) => {
      assert.deepEqual(component.dataValue, '');
      component.setValue('red');
      assert.equal(component.dataValue, 'red');

      const element = component.element.getElementsByClassName('choices__button')[0];
      component.choices._handleButtonAction(component.choices._store.activeItems, element);

      assert.equal(component.dataValue, '');
    });
  });

  it('should open dropdown after item has been removed', () => {
    global.requestAnimationFrame = cb => cb();
    window.matchMedia = window.matchMedia || function() {
      return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
      };
    };

    return Harness.testCreate(SelectComponent, comp1).then((component) => {
      component.setValue('red');

      const element = component.element.getElementsByClassName('choices__button')[0];
      component.choices._handleButtonAction(component.choices._store.activeItems, element);

      component.choices.showDropdown(true);

      assert.equal(component.choices.dropdown.isActive, true);
    });
  });

  it('should keep dropdown closed after item has been removed by keypress', () => {
    return Harness.testCreate(SelectComponent, comp1).then((component) => {
      component.setValue('red');

      const element = component.element.querySelector('.choices__button');
      const ke = new KeyboardEvent('keydown', {
        bubbles: true, cancelable: true, keyCode: 13
      });

      element.dispatchEvent(ke);

      assert.equal(component.dataValue, '');
      assert.equal(component.choices.dropdown.isActive, false);
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
