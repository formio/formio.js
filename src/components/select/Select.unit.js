/* eslint-disable max-statements */
import assert from 'power-assert';
import cloneDeep from 'lodash/cloneDeep';
import sinon from 'sinon';
import Harness from '../../../test/harness';
import SelectComponent from './Select';
import { expect } from 'chai';
import NativePromise from 'native-promise-only';
import Formio from './../../Formio';
import _ from 'lodash';

import {
  comp1,
  comp2,
  multiSelect,
  multiSelectOptions,
  comp4,
  comp5,
  comp6,
  comp7,
  comp8,
  comp9,
  comp10,
  comp11,
  comp12,
  comp13,
  comp14,
  comp15,
  comp16,
  comp17,
  comp18,
  comp19,
  comp20,
  comp21,
} from './fixtures';

describe('Select Component', () => {
  it('should not stringify select option value', function(done) {
    Harness.testCreate(SelectComponent, comp6).then((component) => {
      component.setValue({ value:'a', label:'A' });
      setTimeout(()=> {
        assert.equal(component.choices._currentState.items[0].value.value, 'a');
        assert.equal(typeof component.choices._currentState.items[0].value , 'object');
        assert.equal(component.dataValue.value, 'a');
        assert.equal(typeof component.dataValue , 'object');
        done();
      }, 300);
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

  it('Should return plain text when csv option is provided', () => {
    return Harness.testCreate(SelectComponent, comp1).then((component) => {
      assert.equal(component.getView('red', { csv:true }), 'Red');
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

  it('should format unlisted values', function(done) {
    comp5.template = '<span>{{ item.label }}</span>';
    Harness.testCreate(SelectComponent, comp5).then((component) => {
      const formattedValue1 = component.getView('Unlisted value');
      const formattedValue2 = component.getView(0);

      assert.equal(formattedValue1, '<span>Unlisted value</span>');
      assert.equal(formattedValue2, '<span>0</span>');
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
      const c1 = Object.assign(cloneDeep(comp1), { selectThreshold: 0.2 });
      const c2 = Object.assign(cloneDeep(comp1), { selectThreshold: 0.4 });
      const c3 = Object.assign(cloneDeep(comp1), { selectThreshold: 0.8 });
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

  it('Should render and set values in selects with different widget types', (done) => {
    const form = _.cloneDeep(comp7);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const selectHTML = form.getComponent('selectHtml');
      const selectChoices = form.getComponent('selectChoices');
      assert.equal(!!selectHTML.choices, false);
      assert.equal(!!selectChoices.choices, true);

      setTimeout(() => {
        assert.equal(selectChoices.element.querySelectorAll('.choices__item--choice').length, 3);
        const value = 'b';
        selectHTML.setValue(value);
        selectChoices.setValue(value);

        setTimeout(() => {
          assert.equal(selectHTML.dataValue, value);
          assert.equal(selectChoices.dataValue, value);
          assert.equal(selectHTML.getValue(), value);
          assert.equal(selectChoices.getValue(), value);

          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should clear select value when "clear value on refresh options" and "refresh options on" is enable and number component is changed   ', (done) => {
    const form = _.cloneDeep(comp8);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const numberComp = form.getComponent('number');
      const value = 'b';
      select.setValue(value);

      setTimeout(() => {
        assert.equal(select.dataValue, value);
        assert.equal(select.getValue(), value);
        const numberInput = numberComp.refs.input[0];
        const numberValue = 5;
        const inputEvent = new Event('input');
        numberInput.value = numberValue;
        numberInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal(numberComp.dataValue, numberValue);
          assert.equal(numberComp.getValue(), numberValue);
          assert.equal(select.dataValue, '');
          assert.equal(select.getValue(), '');

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });

  it('Should update select items when "refresh options on" is enable and number component is changed', (done) => {
    const form = _.cloneDeep(comp9);
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function(formio, type, url) {
      return new Promise(resolve => {
        let values =[{ name: 'Ivan' }, { name: 'Mike' }];

        if (url.endsWith('5')) {
          values = [{ name: 'Kate' }, { name: 'Ann' }, { name: 'Lana' }];
        }
         resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const numberComp = form.getComponent('number');
      setTimeout(() => {
        assert.equal(select.selectOptions.length, 2);
        assert.deepEqual(select.selectOptions[0].value, { name: 'Ivan' });

        const numberValue = 5;
        const inputEvent = new Event('input');
        const numberInput = numberComp.refs.input[0];

        numberInput.value = numberValue;
        numberInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal(numberComp.dataValue, numberValue);
          assert.equal(numberComp.getValue(), numberValue);
          assert.equal(select.selectOptions.length, 3);
          assert.deepEqual(select.selectOptions[0].value, { name: 'Kate' });

          Formio.makeRequest = originalMakeRequest;
          done();
        }, 500);
      }, 200);
    }).catch(done);
  });

  it('Should update select items when "refresh options on blur" is enable and number component is changed', (done) => {
    const form = _.cloneDeep(comp9);
    form.components[1].refreshOn = null;
    form.components[1].refreshOnBlur = 'number';

    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function(formio, type, url) {
      return new Promise(resolve => {
        let values =[{ name: 'Ivan' }, { name: 'Mike' }];

        if (url.endsWith('5')) {
          values = [{ name: 'Kate' }, { name: 'Ann' }, { name: 'Lana' }];
        }
         resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const numberComp = form.getComponent('number');
      setTimeout(() => {
        assert.equal(select.selectOptions.length, 2);
        assert.deepEqual(select.selectOptions[0].value, { name: 'Ivan' });

        const numberValue = 5;
        const inputEvent = new Event('input');
        const focusEvent = new Event('focus');
        const blurEvent = new Event('blur');
        const numberInput = numberComp.refs.input[0];
        numberInput.dispatchEvent(focusEvent);
        numberInput.value = numberValue;
        numberInput.dispatchEvent(inputEvent);
        numberInput.dispatchEvent(blurEvent);

        setTimeout(() => {
          assert.equal(numberComp.dataValue, numberValue);
          assert.equal(numberComp.getValue(), numberValue);
          assert.equal(select.selectOptions.length, 3);
          assert.deepEqual(select.selectOptions[0].value, { name: 'Kate' });

          Formio.makeRequest = originalMakeRequest;
          done();
        }, 500);
      }, 200);
    }).catch(done);
  });

  it('Should be able to search if static search is enable', (done) => {
    const form = _.cloneDeep(comp10);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');

      const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
      const focusEvent = new Event('focus');
      searchField.dispatchEvent(focusEvent);

      setTimeout(() => {
        assert.equal(select.choices.dropdown.isActive, true);
        const items = select.choices.choiceList.element.children;
        assert.equal(items.length, 5);

        const keyupEvent = new Event('keyup');
        const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
        searchField.value = 'par';
        searchField.dispatchEvent(keyupEvent);

        setTimeout(() => {
          const items = select.choices.choiceList.element.children;
          assert.equal(items.length, 1);

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });

  it('Should not be able to search if static search is disable', (done) => {
    const form = _.cloneDeep(comp10);
    form.components[0].searchEnabled = false;
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
      assert.equal(searchField, null);

      done();
    }).catch(done);
  });

  it('Should save correct value if value property and item template property are different', (done) => {
    const form = _.cloneDeep(comp9);
    form.components[1].refreshOn = null;
    form.components[1].valueProperty = 'age';
    form.components[1].lazyLoad = true;

    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;

    Formio.makeRequest = function() {
      return new Promise(resolve => {
        const values =[{ name: 'Ivan', age: 35 }, { name: 'Mike', age: 41 }];
        resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      assert.equal(select.selectOptions.length, 0);
      select.choices.showDropdown();

      setTimeout(() => {
        assert.equal(select.selectOptions.length, 2);
        assert.deepEqual(select.selectOptions[0].value, 35);
        assert.deepEqual(select.selectOptions[0].label, '<span>Ivan</span>');

        const items = select.choices.choiceList.element.children;
        assert.equal(items.length, 2);
        assert.equal(items[0].textContent.trim(), 'Ivan');

        select.setValue(41);

        setTimeout(() => {
          assert.equal(select.getValue(), 41);
          assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Mike');

          Formio.makeRequest = originalMakeRequest;

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });

  it('Should set custom header when sending request in select url', (done) => {
    const form = _.cloneDeep(comp9);
    form.components[1].refreshOn = null;
    form.components[1].lazyLoad = true;
    form.components[1].data.headers = [{ key:'testHeader', value:'test' }];

    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;

    Formio.makeRequest = function(formio, type, url, method, data, opts) {
      assert.equal(opts.header.get('testHeader'), 'test');
      return new Promise(resolve => {
        const values = [{ name: 'Ivan', age: 35 }, { name: 'Mike', age: 41 }];
        resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      assert.equal(select.selectOptions.length, 0);
      select.choices.showDropdown();

      setTimeout(() => {
        Formio.makeRequest = originalMakeRequest;
        done();
      }, 200);
    }).catch(done);
  });

  it('Should set value in select url with lazy load option', (done) => {
    const form = _.cloneDeep(comp9);
    form.components[1].refreshOn = null;
    form.components[1].lazyLoad = true;

    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;

    Formio.makeRequest = function() {
      return new Promise(resolve => {
        const values = [{ name: 'Ivan' }, { name: 'Mike' }];
        resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      select.setValue({ name: 'Ivan' });
      setTimeout(() => {
        assert.deepEqual(select.getValue(), { name: 'Ivan' });
        assert.deepEqual(select.dataValue, { name: 'Ivan' });
        assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Ivan');

        Formio.makeRequest = originalMakeRequest;

        done();
      }, 200);
    }).catch(done);
  });

  it('Should set value in select url with lazy load option when value property is defined', (done) => {
    const form = _.cloneDeep(comp9);
    form.components[1].refreshOn = null;
    form.components[1].lazyLoad = true;
    form.components[1].valueProperty = 'name';
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;

    Formio.makeRequest = function() {
      return new Promise(resolve => {
        const values = [{ name: 'Ivan' }, { name: 'Mike' }];
        resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      select.setValue('Ivan');
      setTimeout(() => {
        assert.equal(select.getValue(), 'Ivan');
        assert.equal(select.dataValue, 'Ivan');
        assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Ivan');

        Formio.makeRequest = originalMakeRequest;

        done();
      }, 200);
    }).catch(done);
  });

  it('Should be able to search if static search is enable', (done) => {
    const form = _.cloneDeep(comp10);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');

      const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
      const focusEvent = new Event('focus');
      searchField.dispatchEvent(focusEvent);

      setTimeout(() => {
        assert.equal(select.choices.dropdown.isActive, true);
        const items = select.choices.choiceList.element.children;
        assert.equal(items.length, 5);

        const keyupEvent = new Event('keyup');
        const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
        searchField.value = 'par';
        searchField.dispatchEvent(keyupEvent);

        setTimeout(() => {
          const items = select.choices.choiceList.element.children;
          assert.equal(items.length, 1);

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });

  it('Server side search is debounced with the correct timeout', (done) => {
    const form = _.cloneDeep(comp9);
    form.components[1].lazyLoad = false;
    form.components[1].searchDebounce = 0.7;
    form.components[1].disableLimit = false;
    form.components[1].searchField = 'name';
    const element = document.createElement('div');

    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = function() {
      return new Promise(resolve => {
        resolve([]);
      });
    };

    var searchHasBeenDebounced = false;
    var originalDebounce = _.debounce;
    _.debounce = (fn, timeout, opts) => {
      searchHasBeenDebounced = timeout === 700;
      return originalDebounce(fn, 0, opts);
    };

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
      const focusEvent = new Event('focus');
      searchField.dispatchEvent(focusEvent);

      setTimeout(() => {
        const keyupEvent = new Event('keyup');
        searchField.value = 'the_name';
        searchField.dispatchEvent(keyupEvent);

        setTimeout(() => {
          _.debounce = originalDebounce;
          Formio.makeRequest = originalMakeRequest;

          assert.equal(searchHasBeenDebounced, true);
          done();
        }, 50);
      }, 200);
    }).catch(done);
  });

  it('Should provide "Allow only available values" validation', (done) => {
    const form = _.cloneDeep(comp10);
    form.components[0].validate.onlyAvailableItems = true;
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const value = 'Dallas';
      select.setValue(value);

      setTimeout(() => {
        assert.equal(select.getValue(), value);
        assert.equal(select.dataValue, value);
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(form.errors.length, 1);
          assert.equal(select.error.message, 'Select is an invalid value.');
          document.innerHTML = '';
          done();
        }, 400);
      }, 200);
    }).catch(done);
  });

  it('Should render and set value in select json', (done) => {
    const formObj = _.cloneDeep(comp11);
    const element = document.createElement('div');

    Formio.createForm(element, formObj).then(form => {
      const select = form.getComponent('select');
      assert.equal(select.choices.containerInner.element.children[1].children[0].dataset.value, formObj.components[0].placeholder);
      select.choices.showDropdown();

      setTimeout(() => {
        const items = select.choices.choiceList.element.children;
        assert.equal(items.length, 4);

        const value = { value: 'a', label:'A' };
        select.setValue(value);

        setTimeout(() => {
          assert.deepEqual(select.getValue(), value);
          assert.deepEqual(select.dataValue, value);
          assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'A');

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });

  it('Should load and set items in select resource and set value', (done) => {
    const form = _.cloneDeep(comp12);
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;

    Formio.makeRequest = function(formio, type, url) {
      return new Promise(resolve => {
        let values = [{ data: { name: 'Ivan' } }, { data: { name: 'Mike' } }];

        if (url.endsWith('Ivan')) {
          assert.equal(url.endsWith('/form/60114dd32cab36ad94ac4f94/submission?limit=100&skip=0&data.name__regex=Ivan'), true);
          values = [{ data: { name: 'Ivan' } }];
        }
        else {
          assert.equal(url.endsWith('/form/60114dd32cab36ad94ac4f94/submission?limit=100&skip=0'), true);
        }

        resolve(values);
      });
    };

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const items = select.choices.choiceList.element.children;
      assert.equal(items.length, 1);
      select.setValue('Ivan');

      setTimeout(() => {
        assert.equal(select.getValue(), 'Ivan');
        assert.equal(select.dataValue, 'Ivan');
        assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Ivan');
        select.choices.showDropdown();

        setTimeout(() => {
          const items = select.choices.choiceList.element.children;

          assert.equal(items.length, 2);
          assert.equal(items[0].textContent, 'Ivan');

          Formio.makeRequest = originalMakeRequest;
          done();
        }, 400);
      }, 200);
    }).catch(done);
  });

  it('Should not have "limit" and "skip" query params when "Disable limit" option checked', (done) => {
    const form = _.cloneDeep(comp9);
    const element = document.createElement('div');
    const originalMakeRequest = Formio.makeRequest;
    Formio.makeRequest = (_, __, url) => {
      assert.equal(url, 'https://test.com/');
      return Promise.resolve({});
    };

    Formio.createForm(element, form).then(() => {
      setTimeout(() => {
        Formio.makeRequest = originalMakeRequest;
        done();
      }, 200);
    }).catch(done);
  });

  it('The empty option in html5 shouldn\'t have the [Object Object] value', () => {
    return Harness.testCreate(SelectComponent, comp13).then((component) => {
     const emptyOption = component.element.querySelectorAll('option')[0];
      assert.notEqual(emptyOption.value, '[object Object]');
      assert.equal(emptyOption.value, '');
    });
  });

  it('Should not have default values in schema', (done) => {
    const form = _.cloneDeep(comp14);
    const element = document.createElement('div');

    const requiredSchema = {
      label: 'Select',
      tableView: true,
      key: 'select',
      type: 'select',
      input: true
    };

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      assert.deepEqual(requiredSchema, select.schema);
      done();
    }).catch(done);
  });

  it('Should show async custom values and be able to set submission', (done) => {
    const formObj = _.cloneDeep(comp16);
    const element = document.createElement('div');

    Formio.createForm(element, formObj).then(form => {
      const select = form.getComponent('select');
     select.choices.showDropdown();

      setTimeout(() => {
        const items = select.choices.choiceList.element.children;
        assert.equal(items.length, 3);
        const value = 'bb';
        form.submission = { data: { select: value } };

        setTimeout(() => {
          assert.deepEqual(select.getValue(), value);
          assert.deepEqual(select.dataValue, value);
          assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'B');

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });

  it('Should provide metadata.selectData for Select component pointed to a resource where value property is set to a field', (done) => {
    const form = _.cloneDeep(comp17);
    const testItems = [
      { textField: 'John' },
      { textField: 'Mary' },
      { textField: 'Sally' }
    ];
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      select.setItems(testItems.map(item => ({ data: item })));
      const value = 'John';
      select.setValue(value);

      setTimeout(() => {
        assert.equal(select.dataValue, value);
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(_.isEqual(form.submission.metadata.selectData.select.data, testItems[0]), true);
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should provide correct metadata.selectData for multiple Select', (done) => {
    const form = _.cloneDeep(comp20);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const values = ['apple', 'orange'];
      select.setValue(values);

      setTimeout(()=> {
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          const metadata = form.submission.metadata.selectData.select;
          assert.equal(_.keys(metadata).length, 2);
          values.forEach((value) => {
            assert.equal(_.find(select.component.data.values, { value }).label, metadata[value].label);
          });
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should provide correct metadata.selectData for HTML5 Select', (done) => {
    const element = document.createElement('div');

    Formio.createForm(element, comp21).then(form => {
      const select = form.getComponent('animals');
      const checkbox = form.getComponent('checkbox');
      const value = 'dog';
      select.setValue(value);

      setTimeout(()=> {
        checkbox.setValue(true);
        setTimeout(() => {
          const submit = form.getComponent('submit');
          const clickEvent = new Event('click');
          const submitBtn = submit.refs.button;
          submitBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            const metadata = form.submission.metadata.selectData.animals2;
            assert.equal(metadata.label, 'Dog');
            done();
          }, 200);
        }, 300);
      }, 200);
    }).catch(done);
  });

  it('OnBlur validation should work properly with Select component', function(done) {
    this.timeout(0);
    const element = document.createElement('div');

    Formio.createForm(element, comp19).then(form => {
      const select = form.components[0];
      select.setValue('banana');
      select.focusableElement.focus();
      select.pristine = false;

      setTimeout(() => {
        assert(!select.error, 'Select should be valid while changing');
        select.focusableElement.dispatchEvent(new Event('blur'));

        setTimeout(() => {
          assert(select.error, 'Should set error after Select component was blurred');
          done();
        }, 500);
      }, 200);
    }).catch(done);
  });

  it('Should escape special characters in regex search field', done => {
    const form = _.cloneDeep(comp17);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
      const focusEvent = new Event('focus');
      searchField.dispatchEvent(focusEvent);

      setTimeout(() => {
        const keyupEvent = new Event('keyup');
        searchField.value = '^$.*+?()[]{}|';
        searchField.dispatchEvent(keyupEvent);

        const spy = sinon.spy(Formio, 'makeRequest');

        setTimeout(() => {
          assert.equal(spy.callCount, 1);

          const urlArg = spy.args[0][2];

          assert.ok(urlArg && typeof urlArg === 'string' && urlArg.startsWith('http'), 'A URL should be passed as the third argument to "Formio.makeRequest()"');

          assert.ok(urlArg.includes('__regex=%5C%5E%5C%24%5C.%5C*%5C%2B%5C%3F%5C(%5C)%5C%5B%5C%5D%5C%7B%5C%7D%5C%7C'), 'The URL should contain escaped and encoded search value regex');

          done();
        }, 500);
      }, 200);
    }).catch(done);
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

describe('Select Component', () => {
  it('Select Component should work correctly with the values in the form of an array', (done) => {
    const form = _.cloneDeep(comp18);
    const testItems = [
      { textField: ['one','two'] },
      { textField: ['three','four'] },
      { textField: ['five','six'] },
    ];
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      select.setItems(testItems.map(item => ({ data: item })));
      const value = ['three','four'];
      select.setValue(value);
      assert.equal(select.selectOptions.length, 3);
      setTimeout(() => {
        assert.deepEqual(select.getValue(), value);
        assert.deepEqual(select.dataValue, value);
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(select.dataValue, value);
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });
});

describe('Select Component with Entire Object Value Property', () => {
  it('Should provide correct value', (done) => {
    const form = _.cloneDeep(comp15);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const value = { 'textField':'rgd','submit':true,'number':11 };
      select.setValue(value);

      setTimeout(() => {
        assert.equal(select.getValue(), value);
        assert.equal(select.dataValue, value);
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(select.dataValue, value);
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should provide correct items for Resource DataSrc Type and Entire Object Value Property', (done) => {
    const form = _.cloneDeep(comp15);
    const testItems = [
      { textField: 'Jone', number: 1 },
      { textField: 'Mary', number: 2 },
      { textField: 'Sally', number: 3 }
    ];
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      select.setItems(testItems.map(item => ({ data: item })));
      const value = { textField: 'Jone', number: 1 };
      select.setValue(value);
      assert.equal(select.selectOptions.length, 3);

      setTimeout(() => {
        assert.equal(select.dataValue, value);
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(typeof select.dataValue, 'object');
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should provide correct html value for Resource DataSrc Type and Entire Object Value Property', (done) => {
    const form = _.cloneDeep(comp15);
    const testItems = [
      { textField: 'Jone', number: 1 },
      { textField: 'Mary', number: 2 },
      { textField: 'Sally', number: 3 }
    ];
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      select.setItems(testItems.map(item => ({ data: item })));
      const selectContainer = element.querySelector('[ref="selectContainer"]');
      assert.notEqual(selectContainer, null);
      const options = selectContainer.childNodes;
      assert.equal(options.length, 4);
      options.forEach((option) => {
        assert.notEqual(option.value, '[object Object]');
      });
      const value = { textField: 'Jone', number: 1 };
      select.setValue(value);
      assert.equal(select.selectOptions.length, 3);

      setTimeout(() => {
        assert.equal(select.dataValue, value);
        const submit = form.getComponent('submit');
        const clickEvent = new Event('click');
        const submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(typeof select.dataValue, 'object');
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should set submission value for Resource DataSrc Type and Entire Object Value Property', (done) => {
    const form = _.cloneDeep(comp15);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const select = form.getComponent('select');
      const value = { textField: 'Jone', nubmer: 1 };
      form.submission = {
        data: {
          select: value
        }
      };

      setTimeout(() => {
        assert.equal(typeof select.dataValue,  'object');
        const selectContainer = element.querySelector('[ref="selectContainer"]');
        assert.notEqual(selectContainer, null);
        assert.notEqual(selectContainer.value, '');
        const options = selectContainer.childNodes;
        assert.equal(options.length, 2);
        done();
      }, 1000);
    }).catch(done);
  });

  it('Should get string representation of value for Resource DataSrc Type and Entire Object Value Property', (done) => {
    Harness.testCreate(SelectComponent, comp15.components[0]).then((component) => {
      const entireObject = {
        a: '1',
        b: '2',
      };
      const formattedValue = component.getView(entireObject);
      assert.equal(formattedValue, JSON.stringify(entireObject));
      done();
    });
  });
});
