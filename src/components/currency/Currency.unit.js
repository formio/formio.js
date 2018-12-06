import CurrencyComponent from './Currency';
import assert from 'assert';
describe('Currency Unit Tests', () => {
  it('Should create a new Currency component', () => {
    const currency = new CurrencyComponent();
    assert.equal(currency.component.key, 'currency');
  });
  it('Check the default schema of the component', () => {
    const currency = new CurrencyComponent();
    assert.equal(currency.defaultSchema.input, true);
    assert.equal(currency.defaultSchema.defaultValue, null);
    assert.equal(currency.defaultSchema.type, 'currency');
  });
  it('Checking the string is getting parsed correctly', () => {
    const currency = new CurrencyComponent();
    assert.equal(currency.parseNumber('$1000.00c'),1000);
    assert.equal(currency.parseNumber('$1000.01c'),1000.01);
  });
  it('Clearing the input', () => {
    const currency = new CurrencyComponent();
    assert.equal(currency.clearInput('$100test0.00c'),100);
    assert.equal(currency.clearInput('$1000.01c'),1000.01);
  });
});
