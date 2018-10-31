import CurrencyComponent from './Currency';
import assert from 'assert';
describe('Currency Unit Tests', () => {
  it('Should create a new Currency component', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency'
    });

    assert.equal(currency.component.key, 'currency');
  });
  it('Setting Placeholder', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency',
      placeholder: 'My Placeholder'
    });

    assert.equal(currency.component.placeholder,'My Placeholder');
  });
  it('Setting Prefix', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency',
      prefix: '$'
    });

    assert.equal(currency.component.prefix,'$');
  });
  it('Setting Suffix', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency',
      suffix: 'pounds'
    });

    assert.equal(currency.component.suffix,'pounds');
  });
  it('Setting Prefix and Suffix', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency',
      suffix: 'pounds',
      prefix: '$'
    });

    assert.equal(currency.component.prefix,'$');
    assert.equal(currency.component.suffix,'pounds');
  });
  it('Setting Required', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency',
      validate: {
        required: true
      }
    });

    assert.equal(currency.component.validate.required,true);
  });
  it('Setting Required false', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency',
      validate: {
        required: false
      }
    });

    assert.equal(currency.component.validate.required,false);
  });
  it('Setting Label', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency'
    });

    assert.equal(currency.label,'Currency');
  });
  it('Setting currency without Label', () => {
    const currency = new CurrencyComponent({
      label: '',
      key: 'currency',
      type: 'currency'
    });

    assert.equal(currency.label,'');
  });
  it('Setting custom class', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency',
      customClass: 'my-class'
    });

    assert.equal(currency.component.customClass,'my-class');
  });
  it('Setting multi-valued', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency',
      multiple: true
    });

    assert.equal(currency.component.multiple,true);
  });
  it('Setting multi valued adding and remove values', () => {
    const currency = new CurrencyComponent({
      label: 'Currency',
      key: 'currency',
      type: 'currency',
      defaultValue: 100,
      multiple: true
    });

    assert.equal(currency.dataValue.length,1);
    currency.addNewValue(200);
    assert.equal(currency.dataValue.length,2);
    currency.removeValue(1);
    assert.equal(currency.dataValue.length,1);
  });
});
