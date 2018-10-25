import CheckBoxComponent from './Checkbox';
import assert from 'assert';
import Component from '../_classes/component/Component';
describe('Checkbox Unit Tests', () => {
  it('Should create a new Checkbox component', () => {
    const checkbox = new CheckBoxComponent({
      label: 'Checkbox',
      key: 'checkbox',
      type: 'checkbox'
    });

    assert.equal(checkbox.component.key, 'checkbox');
  });
  it('Should create a new Checkbox component without label', () => {
    const checkbox = new CheckBoxComponent({
      label: '',
      key: 'checkbox',
      type: 'checkbox'
    });

    assert.equal(checkbox.component.label, '');
  });
  it('Setting default value to true', () => {
    const checkbox = new CheckBoxComponent({
      label: 'Checkbox',
      key: 'checkbox',
      type: 'checkbox',
      defaultValue: true
    });

    assert.equal(checkbox.defaultValue,true);
  });
  it('Setting custom class for checkbox', () => {
    const checkbox = new CheckBoxComponent({
      label: 'Checkbox',
      key: 'checkbox',
      type: 'checkbox',
      customClass: 'my-class'
    });

    assert.equal(checkbox.component.customClass,'my-class');
  });
});
