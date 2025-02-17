/* eslint-disable max-statements */
import assert from 'power-assert';
import cloneDeep from 'lodash/cloneDeep';
import set from 'lodash/set'
import sinon from 'sinon';
import Harness from '../harness';
import SelectComponent from '../../src/components/select/Select';
import { expect } from 'chai';
import { Formio } from '../../src/Formio';
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
  comp22,
  comp23,
  comp24,
  comp25,
  comp26,
  comp27,
  comp28
} from './fixtures/select';

global.requestAnimationFrame = cb => cb();
window.matchMedia = window.matchMedia || function() {
  return {
    matches : false,
    addListener : function() {},
    removeListener: function() {}
  };
};
window.scrollTo = () => {};

const timeout = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
const mockDebounce = (timeout, cb) => {
  const originalDebounce = _.debounce;

  _.debounce = (fn, wait, opts) => {
    cb?.(wait);
    return originalDebounce(fn, timeout, opts);
  }

  return () => {
    _.debounce = originalDebounce;
  }
};
const mockMakeRequest = (func) => {
  const originalMakeRequest = Formio.makeRequest;
  Formio.makeRequest = func;

  return () => {
    Formio.makeRequest = originalMakeRequest;
  }
}


// eslint-disable-next-line max-statements
describe('Select Component', () => {
  it('Should not stringify select option value', async () => {
    const component = await Harness.testCreate(SelectComponent, comp6);
    await component.itemsLoaded;
    component.setValue({ value:'a', label:'A' });

    await component.itemsLoaded;
    assert.equal(typeof component.choices._store.items[0].value , 'object');
    assert.equal(component.choices._store.items[0].value.value, 'a');
    assert.equal(component.dataValue.value, 'a');
    assert.equal(typeof component.dataValue , 'object');
  });

  it('Should return string value for different value types', async () => {
    const component = await Harness.testCreate(SelectComponent, comp4);
    const stringValue = component.asString(true);
    const stringValue1 = component.asString(11);
    const stringValue2 = component.asString('test');
    const stringValue3 = component.asString(12);
    const stringValue4 = component.asString([1, 2, 3]);
    assert.equal(stringValue, '<span>true</span>');
    assert.equal(stringValue1, '<span>11</span>');
    assert.equal(stringValue2, '<span>test</span>');
    assert.equal(stringValue3, '<span>1.2</span>');
    assert.equal(stringValue4, '<span>1,2,3</span>');
  });

  it('Should return string value if dataSrc set as custom', async () => {
    const component =  await Harness.testCreate(SelectComponent, comp27);
    const stringValue = component.asString('California');
    assert.equal(stringValue, 'California');
  });

  it('Should return plain text when csv option is provided', async () => {
    const component = await Harness.testCreate(SelectComponent, comp1);
    assert.equal(component.getView('red', { csv: true }), 'Red');
  });

  it('Should correctly determine storage type when dataType is auto', async () => {
    const component = await Harness.testCreate(SelectComponent, comp4);
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
  });

  it('Should not stringify default empty values', async () => {
    const component = await Harness.testCreate(SelectComponent, comp4);
    const value = component.normalizeSingleValue({});
    const value1 = component.normalizeSingleValue([]);
    assert.deepEqual(value, {});
    assert.deepEqual(value1, []);
  });

  it('Should not change value letter case', async () => {
    const component = await Harness.testCreate(SelectComponent, comp4);
    const value = component.normalizeSingleValue('data.textArea');
    const value1 = component.normalizeSingleValue('ECMAScript');
    const value2 = component.normalizeSingleValue('JS');
    assert.equal(value, 'data.textArea');
    assert.equal(value1, 'ECMAScript');
    assert.equal(value2, 'JS');
  });

  it('Should define boolean value', async () => {
    const component = await Harness.testCreate(SelectComponent, comp4);
    const value = component.normalizeSingleValue('TRUE');
    const value1 = component.normalizeSingleValue('False');
    const value2 = component.normalizeSingleValue('true');
    assert.equal(value, true);
    assert.equal(value1, false);
    assert.equal(value2, true);
  });

  it('Should not display empty choice options if property value is not defined', async () => {
    const component = await Harness.testCreate(SelectComponent, comp5);
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
  });

  it('Should display choice option if property value is set', async () => {
    comp5.template = '<span>{{ item.label }}</span>';
    const component = await Harness.testCreate(SelectComponent, comp5);
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
  });

  it('Should have only unique dropdown options', async () => {
    comp5.template = '<span>{{ item.label }}</span>';
    comp5.uniqueOptions = true;
    const component = await Harness.testCreate(SelectComponent, comp5);
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
  });

  it('Should format unlisted values', async () => {
    comp5.template = '<span>{{ item.label }}</span>';
    const component = await Harness.testCreate(SelectComponent, comp5);
    assert.equal(component.getView('Unlisted value'), '<span>Unlisted value</span>');
    assert.equal(component.getView(0), '<span>0</span>');
  });

  it('Should set multiple selected values not repeating them', async () => {
    const component = await Harness.testCreate(SelectComponent, multiSelect);
    component.setItems(multiSelectOptions, false);
    component.setChoicesValue(['Cheers']);
    component.setChoicesValue(['Cheers', 'Cyberdyne Systems'], 1);
    component.setChoicesValue(['Cheers', 'Cyberdyne Systems', 'Massive Dynamic'], 2);
    const choices = component.element.querySelector('.choices__list--multiple').children;
    assert.equal(choices.length, 3);
  });

  it('Should not show selected values in dropdown when searching', async () => {
    const component = await Harness.testCreate(SelectComponent, multiSelect);
    component.setItems(multiSelectOptions, false);
    component.setChoicesValue(['Cheers']);
    component.setChoicesValue(['Cheers', 'Cyberdyne Systems'], 1);
    component.setItems([], true);
    const itemsInDropdown = component.element.querySelectorAll('.choices__item--choice');
    const choices = component.element.querySelector('.choices__list--multiple').children;
    assert.equal(choices.length, 2);
    assert.equal(itemsInDropdown.length, 1);
  });

  it('Should build a Select component', async () => {
    const component = await Harness.testCreate(SelectComponent, comp1);
    Harness.testElements(component, 'select', 1);
  });

  it('Should preserve the tabindex', async () => {
    const component = await Harness.testCreate(SelectComponent, comp2);
    Harness.testElementAttribute(component.focusableElement, 'tabindex', '10');
  });

  it('Should default to 0 when tabindex is not specified', async () => {
    const component = await Harness.testCreate(SelectComponent, comp1);
    Harness.testElementAttribute(component.focusableElement, 'tabindex', '0');
  });

  it('Should allow to override threshold option of fuzzy search', async () => {
    const c1 = Object.assign(cloneDeep(comp1), { selectThreshold: 0.2 });
    const c2 = Object.assign(cloneDeep(comp1), { selectThreshold: 0.4 });
    const c3 = Object.assign(cloneDeep(comp1), { selectThreshold: 0.8 });

    const [a, b, c] = await Promise.all([
      Harness.testCreate(SelectComponent, c1),
      Harness.testCreate(SelectComponent, c2),
      Harness.testCreate(SelectComponent, c3),
    ]);
    expect(a.choices.config.fuseOptions.threshold).to.equal(0.2);
    expect(b.choices.config.fuseOptions.threshold).to.equal(0.4);
    expect(c.choices.config.fuseOptions.threshold).to.equal(0.8);
  });

  it('Should set component value', async () => {
    const component = await Harness.testCreate(SelectComponent, comp1);
    await component.itemsLoaded;
    assert.equal(component.dataValue, '');
    component.setValue('red');

    await component.itemsLoaded;
    assert.equal(component.dataValue, 'red');
    assert.equal(component.choices._store.items[0]?.value, 'red');
  });

  it('Should remove selected item', async () => {
    const component = await Harness.testCreate(SelectComponent, comp1);
    await component.itemsLoaded;
    assert.deepEqual(component.dataValue, '');
    component.setValue('red');

    await component.itemsLoaded;
    assert.equal(component.dataValue, 'red');
    const element = component.element.querySelector('.choices__button');
    component.choices._handleButtonAction(element);
    assert.equal(component.dataValue, '');
  });

  it('Should keep dropdown closed after item has been removed by keypress', async () => {
    const component = await Harness.testCreate(SelectComponent, comp1);
    await component.itemsLoaded;
    component.setValue('red');

    await component.itemsLoaded;
    assert.equal(component.dataValue, 'red');
    assert.equal(component.choices._store.items.length, 1);
    const element = component.element.querySelector('.choices__button');
    const event = new KeyboardEvent('keydown', {
      bubbles: true, cancelable: true, keyCode: 13
    });
    element.dispatchEvent(event);

    await timeout(0);
    assert.equal(component.choices._store.items.length, 0);
    assert.equal(component.dataValue, '');
    assert.equal(component.choices.dropdown.isActive, false);
  });

  it('Should render and set values in selects with different widget types', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp7));
    const selectHtml = form.getComponent('selectHtml');
    const selectChoices = form.getComponent('selectChoices');
    assert.equal(!!selectHtml.choices, false);
    assert.equal(!!selectChoices.choices, true);

    await Promise.all([selectHtml.itemsLoaded, selectChoices.itemsLoaded]);
    await timeout(0);
    assert.equal(selectHtml.selectOptions.length, 3);
    assert.equal(selectChoices.selectOptions.length, 3);
    assert.equal(selectChoices.choices._store.choices.length, 3);
    assert.equal(selectChoices.choices._store.items.length, 0);
    assert.equal(selectChoices.element.querySelectorAll('.choices__item--choice').length, 3);
    const value = 'b';
    selectHtml.setValue(value);
    selectChoices.setValue(value);

    await Promise.all([selectHtml.itemsLoaded, selectChoices.itemsLoaded]);
    assert.equal(selectHtml.dataValue, value);
    assert.equal(selectChoices.dataValue, value);
    assert.equal(selectChoices.choices._store.items.length, 1);
    assert.equal(selectHtml.getValue(), value);
    assert.equal(selectChoices.getValue(), value);
  });

  it('Should clear select value when "clear value on refresh options" and "refresh options on" is enable and number component is changed', async () => {
    const restoreDebounce = mockDebounce(0);

    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp8));
    const select = form.getComponent('select');
    const numberComp = form.getComponent('number');

    await select.itemsLoaded;
    const value = 'b';
    select.setValue(value);

    // timeout(0) need to complete triggerChange
    await Promise.all([select.itemsLoaded, timeout(0)]);
    assert.equal(select.dataValue, value);
    assert.equal(select.getValue(), value);

    const numberInput = numberComp.refs.input[0];
    const numberValue = 5;
    const inputEvent = new Event('input');
    numberInput.value = numberValue;
    numberInput.dispatchEvent(inputEvent);

    await timeout(50);
    assert.equal(numberComp.dataValue, numberValue);
    assert.equal(numberComp.getValue(), numberValue);
    assert.equal(select.dataValue, '');
    assert.equal(select.getValue(), '');
    assert.equal(select.choices._store.items.length, 0);

    restoreDebounce();
  });

  it('Should update select items when "refresh options on" is enable and number component is changed', async () => {
    const restoreDebounce = mockDebounce(0);
    const restoreMakeRequest = mockMakeRequest((formio, type, url) => new Promise((resolve) => {
      let values = [{ name: 'Ivan' }, { name: 'Mike' }];
      if (url.endsWith('5')) {
        values = [{ name: 'Kate' }, { name: 'Ann' }, { name: 'Lana' }];
      }
      resolve(values);
    }));

    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp9));
    const select = form.getComponent('select');
    const numberComp = form.getComponent('number');

    await select.itemsLoaded;
    assert.equal(select.selectOptions.length, 2);
    assert.deepEqual(select.selectOptions[0].value, { name: 'Ivan' });

    const numberValue = 5;
    const inputEvent = new Event('input');
    const numberInput = numberComp.refs.input[0];
    numberInput.value = numberValue;
    numberInput.dispatchEvent(inputEvent);

    await timeout(50);
    assert.equal(numberComp.dataValue, numberValue);
    assert.equal(numberComp.getValue(), numberValue);
    assert.equal(select.selectOptions.length, 3);
    assert.deepEqual(select.selectOptions[0].value, { name: 'Kate' });

    restoreDebounce();
    restoreMakeRequest();
  });

  it('Should update select items when "refresh options on blur" is enable and number component is changed', async () => {
    const restoreDebounce = mockDebounce(0);
    const restoreMakeRequest = mockMakeRequest((formio, type, url) => new Promise((resolve) => {
      let values =[{ name: 'Ivan' }, { name: 'Mike' }];
      if (url.endsWith('5')) {
        values = [{ name: 'Kate' }, { name: 'Ann' }, { name: 'Lana' }];
      }
      resolve(values);
    }));

    const formSchema = _.cloneDeep(comp9);
    formSchema.components[1].refreshOn = null;
    formSchema.components[1].refreshOnBlur = 'number';

    const element = document.createElement('div');
    const form = await Formio.createForm(element, formSchema);
    const select = form.getComponent('select');
    const numberComp = form.getComponent('number');

    await select.itemsLoaded;
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

    await timeout(50);
    assert.equal(numberComp.dataValue, numberValue);
    assert.equal(numberComp.getValue(), numberValue);
    assert.equal(select.selectOptions.length, 3);
    assert.deepEqual(select.selectOptions[0].value, { name: 'Kate' });

    restoreDebounce();
    restoreMakeRequest();
  });

  it('Should be able to search if static search is enable', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp10));
    const select = form.getComponent('select');

    await select.itemsLoaded;
    const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
    const focusEvent = new Event('focus');
    searchField.dispatchEvent(focusEvent);

    await timeout(0);
    await select.itemsLoaded;
    assert.equal(select.choices.dropdown.isActive, true);
    let items = select.choices.choiceList.element.children;
    assert.equal(items.length, 5);

    const event = new Event('input');
    searchField.value = 'par';
    searchField.dispatchEvent(event);
    items = select.choices.choiceList.element.children;
    assert.equal(items.length, 1);
  });

  it('Should not be able to search if static search is disable', async () => {
    const formSchema = _.cloneDeep(comp10);
    formSchema.components[0].searchEnabled = false;
    const element = document.createElement('div');
    const form = await Formio.createForm(element, formSchema);
    const select = form.getComponent('select');
    const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
    assert.equal(searchField, null);
  });

  it('Should save correct value if value property and item template property are different', async () => {
    const restoreMakeRequest = mockMakeRequest(() => new Promise((resolve) => {
        resolve([{ name: 'Ivan', age: 35 }, { name: 'Mike', age: 41 }]);
    }));

    const formSchema = _.cloneDeep(comp9);
    formSchema.components[1].refreshOn = null;
    formSchema.components[1].valueProperty = 'age';
    formSchema.components[1].lazyLoad = true;

    const element = document.createElement('div');
    const form = await Formio.createForm(element, formSchema);
    const select = form.getComponent('select');

    await select.itemsLoaded;
    assert.equal(select.selectOptions.length, 0);
    select.choices.showDropdown();

    // trigger change
    await timeout(0);
    await select.itemsLoaded;
    assert.equal(select.selectOptions.length, 2);
    assert.deepEqual(select.selectOptions[0].value, 35);
    assert.deepEqual(select.selectOptions[0].label, '<span>Ivan</span>');

    const items = select.choices.choiceList.element.children;
    assert.equal(items.length, 2);
    assert.equal(items[0].textContent.trim(), 'Ivan');
    select.setValue(41);

    await select.itemsLoaded;
    assert.equal(select.getValue(), 41);
    assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Mike');

    restoreMakeRequest();
  });

  it('Should set custom header when sending request in select url', async () => {
    const restoreMakeRequest = mockMakeRequest((formio, type, url, method, data, opts) => {
      assert.equal(opts.header.get('testHeader'), 'test');
      return new Promise((resolve) => {
        const values = [{ name: 'Ivan', age: 35 }, { name: 'Mike', age: 41 }];
        resolve(values);
      });
    });

    const formSchema = _.cloneDeep(comp9);
    formSchema.components[1].refreshOn = null;
    formSchema.components[1].lazyLoad = true;
    formSchema.components[1].data.headers = [{ key:'testHeader', value:'test' }];

    const element = document.createElement('div');
    const form = await Formio.createForm(element, formSchema);
    const select = form.getComponent('select');

    await select.itemsLoaded;
    assert.equal(select.selectOptions.length, 0);
    select.choices.showDropdown();

    // trigger change
    await timeout(0);
    await select.itemsLoaded;
    restoreMakeRequest();
  });

  it('Should set value in select url with lazy load option', async () => {
    const restoreMakeRequest = mockMakeRequest(() => new Promise((resolve) => {
      const values = [{ name: 'Ivan' }, { name: 'Mike' }];
      resolve(values);
    }));

    const formSchema = _.cloneDeep(comp9);
    formSchema.components[1].refreshOn = null;
    formSchema.components[1].lazyLoad = true;

    const element = document.createElement('div');
    const form = await Formio.createForm(element, formSchema);
    const select = form.getComponent('select');
    select.setValue({ name: 'Ivan' });

    await select.itemsLoaded;
    assert.deepEqual(select.getValue(), { name: 'Ivan' });
    assert.deepEqual(select.dataValue, { name: 'Ivan' });
    assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Ivan');

    restoreMakeRequest();
  });

  it('Should set value in select url with lazy load option when value property is defined', async () => {
    const restoreDebounce = mockDebounce(0);
    const restoreMakeRequest = mockMakeRequest(() => new Promise((resolve) => {
      const values = [{ name: 'Ivan' }, { name: 'Mike' }];
      resolve(values);
    }));

    const formSchema = _.cloneDeep(comp9);
    formSchema.components[1].refreshOn = null;
    formSchema.components[1].lazyLoad = true;
    formSchema.components[1].valueProperty = 'name';

    const element = document.createElement('div');
    const form = await Formio.createForm(element, formSchema);
    const select = form.getComponent('select');

    await select.itemsLoaded;
    select.setValue('Ivan');

    await timeout(0);
    await select.itemsLoaded;
    assert.equal(select.getValue(), 'Ivan');
    assert.equal(select.dataValue, 'Ivan');
    assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Ivan');

    restoreDebounce();
    restoreMakeRequest();
  });

  it('Server side search is debounced with the correct timeout', async () => {
    let searchHasBeenDebounced = false;
    const restoreDebounce = mockDebounce(0, (wait) => {
      if (wait === 700) {
        searchHasBeenDebounced = true;
      }
    });

    const formSchema = _.cloneDeep(comp9);
    formSchema.components[1].searchDebounce = 0.7;
    formSchema.components[1].searchField = 'name';

    const element = document.createElement('div');
    await Formio.createForm(element, formSchema);

    assert.equal(searchHasBeenDebounced, true);

    restoreDebounce();
  });

  it('Should provide "Allow only available values" validation', async () => {
    const formSchema = _.cloneDeep(comp10);
    formSchema.components[0].validate.onlyAvailableItems = true;

    const element = document.createElement('div');
    const form = await Formio.createForm(element, formSchema);
    const select = form.getComponent('select');

    await select.itemsLoaded;
    const value = 'Dallas';
    select.setValue(value);

    await select.itemsLoaded;
    assert.equal(select.getValue(), value);
    assert.equal(select.dataValue, value);

    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => reject('Shouldn\'t submit the form with a validation error.'));
      form.on('submitError', () => resolve());
    });
    assert.equal(form.errors.length, 1);
    assert.equal(select.errors[0].message, 'Select is an invalid value.');
  });

  it('Should render and set value in select json', async () => {
    const formObj = _.cloneDeep(comp11);
    const element = document.createElement('div');
    const form = await Formio.createForm(element, formObj);
    const select = form.getComponent('select');

    await select.itemsLoaded;
    assert.equal(select.choices.containerInner.element.children[1].children[0].dataset.value, '');
    select.choices.showDropdown();

    // trigger change
    await timeout(0);
    await select.itemsLoaded;
    const items = select.choices.choiceList.element.children;
    assert.equal(items.length, 4);
    const value = { value: 'a', label:'A' };
    select.setValue(value);

    await select.itemsLoaded;
    assert.deepEqual(select.getValue(), value);
    assert.deepEqual(select.dataValue, value);
    assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'A');
  });

  it('Should load and set items in select resource and set value', async () => {
    const restoreDebounce = mockDebounce(0);
    const restoreMakeRequest = mockMakeRequest((formio, type, url) => new Promise((resolve) => {
      let values = [{ data: { name: 'Ivan' } }, { data: { name: 'Mike' } }];

      if (url.endsWith('Ivan')) {
        assert.equal(url.endsWith('/form/60114dd32cab36ad94ac4f94/submission?limit=100&skip=0&data.name__regex=Ivan'), true);
        values = [{ data: { name: 'Ivan' } }];
      }
      else {
        assert.equal(url.endsWith('/form/60114dd32cab36ad94ac4f94/submission?limit=100&skip=0'), true);
      }

      resolve(values);
    }));

    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp12));
    const select = form.getComponent('select');

    let items = select.choices.choiceList.element.children;
    assert.equal(items.length, 1);
    select.setValue('Ivan');

    await timeout(0);
    await select.itemsLoaded;
    assert.equal(select.getValue(), 'Ivan');
    assert.equal(select.dataValue, 'Ivan');
    assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Ivan');
    select.choices.showDropdown();

    await timeout(0);
    await select.itemsLoaded;
    items = select.choices.choiceList.element.children;
    assert.equal(items.length, 2);
    assert.equal(items[0].textContent, 'Ivan');

    restoreDebounce();
    restoreMakeRequest();
  });

  it('Should not have "limit" and "skip" query params when "Disable limit" option checked', async () => {
    const restoreMakeRequest = mockMakeRequest((_, __, url) => {
      assert.equal(url, 'https://test.com/');
      return Promise.resolve({});
    });

    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp9));
    const select = form.getComponent('select');

    await select.itemsLoaded;
    restoreMakeRequest();
  });

  it('The empty option in html5 Shouldn\'t have the [Object Object] value', async () => {
    const component = await Harness.testCreate(SelectComponent, comp13);
    await component.itemsLoaded;
    const emptyOption = component.element.querySelectorAll('option')[0];
    assert.notEqual(emptyOption.value, '[object Object]');
    assert.equal(emptyOption.value, '');
  });

  it('Should not have default values in schema', async () => {
    const element = document.createElement('div');

    const requiredSchema = {
      label: 'Select',
      tableView: true,
      key: 'select',
      type: 'select',
      input: true
    };

    const form = await Formio.createForm(element, _.cloneDeep(comp14));
    const select = form.getComponent('select');
    assert.deepEqual(requiredSchema, select.schema);
  });

  it('Should show async custom values and be able to set submission', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp16));
    const select = form.getComponent('select');
    select.choices.showDropdown();

    await timeout(0);
    await select.itemsLoaded;
    assert.equal(select.dataValue, '');
    const items = select.choices.choiceList.element.children;
    assert.equal(items.length, 3);
    const value = 'bb';
    form.submission = { data: { select: value } };

    await form.submissionReady;
    assert.deepEqual(select.getValue(), value);
    assert.deepEqual(select.dataValue, value);
    assert.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'B');
  });

  it('Should provide metadata.selectData for Select component pointed to a resource where value property is set to a field', async () => {
    const testItems = [
      { data: { textField: 'John' }},
      { data: { textField: 'Mary' }},
      { data: { textField: 'Sally' }},
    ];
    const restoreMakeRequest = mockMakeRequest(() => new Promise((resolve) => {
      resolve(testItems);
    }));

    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp17));
    const select = form.getComponent('select');

    const value = 'John';
    select.setValue(value);

    await select.itemsLoaded;
    assert.equal(select.dataValue, value);
    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });
    assert.equal(_.isEqual(form.submission.metadata.selectData.select.data, testItems[0].data), true);

    restoreMakeRequest();
  });

  it('Should provide correct metadata.selectData for multiple Select', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp20));
    const select = form.getComponent('select');
    const values = ['apple', 'orange'];
    select.setValue(values);

    await select.itemsLoaded;
    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });
    const metadata = form.submission.metadata.selectData.select;
    assert.equal(_.keys(metadata).length, 2);
    values.forEach((value) => {
      assert.equal(_.find(select.component.data.values, { value }).label, metadata[value].label);
    });
  });

  it('Should provide correct metadata.selectData for HTML5 Select', async () => {
    const restoreDebounce = mockDebounce(0);

    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp21));
    const select = form.getComponent('animals');
    const checkbox = form.getComponent('checkbox');
    const value = 'dog';
    select.setValue(value);

    await select.itemsLoaded;
    checkbox.setValue(true);

    await timeout(50);
    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });
    const metadata = form.submission.metadata.selectData.animals2;
    assert.equal(metadata.label, 'Dog');

    restoreDebounce();
  });

  it('Should provide correct metadata.selectData for HTML5 Select with default value', async () => {
    const restoreMakeRequest = mockMakeRequest(() => new Promise((resolve) => {
      resolve([]);
    }));

    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp22));
    const select = form.getComponent('select');
    await select.itemsLoaded;

    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });

    const metadata = form.submission.metadata.selectData.select;
    assert.equal(metadata.label, 'Label 1');

    restoreMakeRequest();
  });

  it('Should provide correct metadata.selectData for ChoicesJS Select with default value', async () => {
    const restoreMakeRequest = mockMakeRequest(() => new Promise((resolve) => {
      resolve([]);
    }));

    const formSchema = _.cloneDeep(comp22);
    formSchema.components[0].widget='choicesjs';
    const element = document.createElement('div');
    const form = await Formio.createForm(element, formSchema);

    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });

    const metadata = form.submission.metadata.selectData.select;
    assert.equal(metadata.label, 'Label 1');

    restoreMakeRequest();
  });

  it('Should set correct label from metadata for ChoicesJS Select with default value', async () => {
    const formSchema = _.cloneDeep(comp22);
    formSchema.components[0].widget='choicesjs';
    const element = document.createElement('div');
    const form = await Formio.createForm(element, formSchema);
    const select = form.getComponent('select');
    form.submission = {
      data: {
        select: 'value2',
      },
      metadata: {
        selectData: {
          select: {
            label: 'Label 2',
          },
        },
      },
    };

    await form.submissionReady;
    await select.itemsLoaded;
    assert.equal(select.templateData['value2'].label, 'Label 2');
  });

  it('Should provide correct metadata.selectData for multiple Select with default value', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp23));
    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });

    const metadata = form.submission.metadata.selectData.select;
    assert.deepEqual(metadata, {
      value1: {
        label: 'Label 1',
      },
      value3: {
        label: 'Label 3',
      },
    });
  });

  it('Should set correct label from metadata for multiple Select with default value', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp23));
    const select = form.getComponent('select');
    form.submission = {
      data: {
        select: ['value1', 'value2'],
      },
      metadata: {
        selectData: {
          select: {
            value1: {
              label: 'Label 1',
            },
            value2: {
              label: 'Label 2',
            },
          },
        },
      },
    };

    await form.submissionReady;
    await select.itemsLoaded;
    assert.equal(select.templateData['value1'].label, 'Label 1');
    assert.equal(select.templateData['value2'].label, 'Label 2');
  });

  it('OnBlur validation Should work properly with Select component', async () => {
    const restoreDebounce = mockDebounce(0);

    const element = document.createElement('div');
    const form = await Formio.createForm(element, comp19);
    const select = form.components[0];
    select.setValue('banana');

    await select.itemsLoaded;
    select.choices.input.element.focus();
    select.pristine = false;

    await timeout(50);
    assert(!select.visibleErrors.length, 'Select Should be valid while changing');
    select.choices.input.element.dispatchEvent(new Event('blur'));

    await timeout(50);
    assert(select.visibleErrors.length, 'Should set error after Select component was blurred');

    restoreDebounce();
  });

  it('Should escape special characters in regex search field', async () => {
    const restoreDebounce = mockDebounce(0);
    const restoreMakeRequest = mockMakeRequest(() => new Promise((resolve) => {
      resolve([]);
    }))

    const element = document.createElement('div');
    Formio.setProjectUrl('https://formio.form.io');
    const form = await Formio.createForm(element, _.cloneDeep(comp17));
    const select = form.getComponent('select');
    const searchField = select.element.querySelector('.choices__input.choices__input--cloned');
    const focusEvent = new Event('focus');
    searchField.dispatchEvent(focusEvent);

    await timeout(0);
    await select.itemsLoaded;
    const keyupEvent = new Event('input');
    searchField.value = '^$.*+?()[]{}|';
    searchField.dispatchEvent(keyupEvent);
    const spy = sinon.spy(Formio, 'makeRequest');

    await timeout(0);
    await select.itemsLoaded;
    assert.equal(spy.callCount, 1);
    const urlArg = spy.args[0][2];
    assert.ok(urlArg && typeof urlArg === 'string' && urlArg.startsWith('http'), 'A URL Should be passed as the third argument to "Formio.makeRequest()"');
    assert.ok(urlArg.includes('__regex=%5C%5E%5C%24%5C.%5C*%5C%2B%5C%3F%5C(%5C)%5C%5B%5C%5D%5C%7B%5C%7D%5C%7C'), 'The URL Should contain escaped and encoded search value regex');

    restoreDebounce();
    restoreMakeRequest();
  });

  it('Should perform simple conditional logic for number data type', async () => {
    const restoreDebounce = mockDebounce();

    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp26));
    const select = form.getComponent('select');
    const textfield = form.getComponent('textField');
    select.setValue('1');

    await timeout(50);
    assert.equal(select.dataValue, 1);
    assert.equal(textfield.visible, true);
    select.setValue('2');

    await timeout(50);
    assert.equal(select.dataValue, 2);
    assert.equal(textfield.visible, true);
    select.setValue('10');

    await timeout(50);
    assert.equal(select.dataValue, 10);
    assert.equal(textfield.visible, false);
    select.setValue('1d');

    await timeout(50);
    assert.equal(select.dataValue, '1d');
    assert.equal(textfield.visible, false);

    restoreDebounce();
  });

  it('Should open edit grid modal when clicking on validation link when editing a submission', async () => {
    const form = await Formio.createForm(document.createElement('div'), comp25, {});
    form.submission = {
      "data": {
        "editGrid": [
          {
            "notselect": "",
            "textField": ""
          }
        ],
        "draft": true,
        "submit": false
      },
      "state": "draft",
    };
    const buttonComponent = form.getComponent('submit');
    buttonComponent.refs.button.click();

    await new Promise((resolve, reject) => {
      form.on('submit', () => reject('Shouldn\'t submit the form with a validation error.'));
      form.on('submitError', () => resolve());
    });

    form.refs.errorRef[0].click();
    assert(document.querySelector('body').classList.contains('modal-open'), 'modal Should be open');
  });

  it('Should render label for multiple Select when Data Source is Resource in read only mode', async () => {
    const restoreMakeRequest = mockMakeRequest(() => new Promise((resolve) => {
      resolve([]);
    }));

    const element = document.createElement('div');
    const formSchema = cloneDeep(comp24);
    set(formSchema, 'components[0].multiple', true);
    const form = await Formio.createForm(element, formSchema, { readOnly: true });
    const select = form.getComponent('select');
    form.setSubmission({
      metadata: {
        selectData: {
          select: {
            1: {
              data: {
                textField1: 'One'
              }
            },
            olivia: {
              data: {
                textField1: 'Olivia Miller'
              }
            }
          },
        },
      },
      data: {
        select: [1, 'olivia'],
        submit: true,
      },
      state: 'submitted',
    });

    await form.submissionReady;
    await select.itemsLoaded;
    await timeout(0);
    const selectedItems = select.element.querySelectorAll('[aria-selected="true"] span');
    assert.equal(selectedItems[0].innerHTML, 'One', 'Should show correct label for numeric values');
    assert.equal(selectedItems[1].innerHTML, 'Olivia Miller', 'Should show correct label for string values');

    restoreMakeRequest();
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

  it('Select Component Should work correctly with the values in the form of an array', async () => {
    const testItems = [
      { textField: ['one','two'] },
      { textField: ['three','four'] },
      { textField: ['five','six'] },
    ];
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp18));
    const select = form.getComponent('select');
    select.setItems(testItems.map(item => ({ data: item })));
    const value = ['three','four'];
    select.setValue(value);

    await select.itemsLoaded;
    assert.equal(select.selectOptions.length, 3);
    assert.deepEqual(select.getValue(), value);
    assert.deepEqual(select.dataValue, value);
    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });

    assert.equal(select.dataValue, value);
  });
});

describe('Select Component with Entire Object Value Property', () => {
  it('Should provide correct value', async () => {
    const restoreMakeRequest = mockMakeRequest(() => new Promise((resolve) => {
      resolve([]);
    }));

    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp15));
    const select = form.getComponent('select');
    const value = { 'textField':'rgd','submit':true,'number':11 };
    select.setValue(value);

    await select.itemsLoaded;
    assert.equal(select.getValue(), value);
    assert.equal(select.dataValue, value);
    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });
    assert.equal(select.dataValue, value);

    restoreMakeRequest();
  });

  it('Should provide correct items for Resource DataSrc Type and Entire Object Value Property', async () => {
    const testItems = [
      { textField: 'Jone', number: 1 },
      { textField: 'Mary', number: 2 },
      { textField: 'Sally', number: 3 }
    ];
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp15));
    const select = form.getComponent('select');
    select.setItems(testItems.map(item => ({ data: item })));
    const value = { textField: 'Jone', number: 1 };
    select.setValue(value);

    await select.itemsLoaded;
    assert.equal(select.selectOptions.length, 3);
    assert.equal(select.dataValue, value);
    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });
    assert.equal(typeof select.dataValue, 'object');
  });

  it('Should provide correct html value for Resource DataSrc Type and Entire Object Value Property', async () => {
    const testItems = [
      { textField: 'Jone', number: 1 },
      { textField: 'Mary', number: 2 },
      { textField: 'Sally', number: 3 }
    ];
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp15));
    const select = form.getComponent('select');
    select.setItems(testItems.map(item => ({ data: item })));

    await select.itemsLoaded;
    const selectContainer = element.querySelector('[ref="selectContainer"]');
    assert.notEqual(selectContainer, null);
    const options = selectContainer.childNodes;
    assert.equal(options.length, 4);
    options.forEach((option) => {
      assert.notEqual(option.value, '[object Object]');
    });
    const value = { textField: 'Jone', number: 1 };
    select.setValue(value);

    await select.itemsLoaded;
    assert.equal(select.selectOptions.length, 3);
    assert.equal(select.dataValue, value);
    const submit = form.getComponent('submit');
    const clickEvent = new Event('click');
    const submitBtn = submit.refs.button;
    submitBtn.dispatchEvent(clickEvent);

    await new Promise((resolve, reject) => {
      form.on('submit', () => resolve());
      form.on('submitError', () => reject('Should submit the form.'));
    });
    assert.equal(typeof select.dataValue, 'object');
  });

  // TODO: figure out why this test is working only with huge timeout
  it('Should set submission value for Resource DataSrc Type and Entire Object Value Property', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, _.cloneDeep(comp15));
    const select = form.getComponent('select');
    const value = { textField: 'Jone', number: 1 };
    form.submission = {
      data: {
        select: value
      }
    };

    await timeout(1000);
    assert.equal(typeof select.dataValue,  'object');
    const selectContainer = element.querySelector('[ref="selectContainer"]');
    assert.notEqual(selectContainer, null);
    assert.notEqual(selectContainer.value, '');
    const options = selectContainer.childNodes;
    assert.equal(options.length, 2);
  });

  it('Should get string representation of value for Resource DataSrc Type and Entire Object Value Property', async () => {
    const component = await Harness.testCreate(SelectComponent, comp15.components[0]);
    const entireObject = {
      a: '1',
      b: '2',
    };
    const formattedValue = component.getView(entireObject);
    assert.equal(formattedValue, JSON.stringify(entireObject));
  });

  it('Should render label for Select components when Data Source is Resource in read only mode', async () => {
    const element = document.createElement('div');
    const form =await Formio.createForm(element, comp24, { readOnly: true });
    const select = form.getComponent('select');
    form.setSubmission({
      metadata: {
        selectData: {
          select: {
            data: {
              textField1: 'A',
            },
          },
        },
      },
      data: {
        select: 1,
        select1: {
          textField1: 'A',
          textField2: '1',
          submit: true,
        },
        submit: true,
      },
      state: 'submitted',
    });

    await form.submissionReady;
    await select.itemsLoaded;
    const previewSelect = select.element.querySelector('[aria-selected="true"] span');
    assert.equal(previewSelect.innerHTML, 'A', 'Should show label as a selected value' +
      ' for Select component');
  });

  it('Should render label for Select components when Data Source is Resource for modal preview', async () => {
    const element = document.createElement('div');
    const comp = { ...comp24, modalEdit: true };
    const form = await Formio.createForm(element, comp);
    const select = form.getComponent('select');
    form.setSubmission({
      metadata: {
        selectData: {
          select: {
            data: {
              textField1: 'A',
            },
          },
        },
      },
      data: {
        select: 1,
        select1: {
          textField1: 'A',
          textField2: '1',
          submit: true,
        },
        submit: true,
      },
      state: 'submitted',
    });

    await form.submissionReady;
    await select.itemsLoaded;
    await timeout(0);
    const previewSelect = select.element.querySelector('[aria-selected="true"] span');
    assert.equal(previewSelect.innerHTML, 'A', 'Should show label as a selected value' +
      ' for Select component');
  });

  it('Should render label for Select Resource type in readOnly mode', async () => {
    const element = document.createElement('div');
    const form = await Formio.createForm(element, comp28, { readOnly: true });
    const select = form.getComponent('selectResource');
    form.setSubmission({
      form: '672483c1d9abe46bcd70bca4',
      metadata: {
        selectData: {
          selectResource: {
            data: {
              textField: 'test1',
            },
          },
        },
      },
      data: {
        selectResource: 'test1',
        submit: true,
      },
      _id: '6724d15cd9abe46bcd7115d1',
      project: '67211a9aa929e4e6ebc2bf77',
      state: 'submitted',
      created: '2024-11-01T13:02:20.349Z',
      modified: '2024-11-01T13:02:20.349Z',
    });

    await form.submissionReady;
    await select.itemsLoaded;

    const previewSelect = select.element.querySelector('[aria-selected="true"] span');
    assert.equal(previewSelect.innerHTML, 'test1');
  });
});
