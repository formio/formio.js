import NumberComponent from './Number';
import assert from 'assert';
describe('Number Unit Tests', () => {
  it('Should create a new Number component', () => {
    const number = new NumberComponent();
    assert.equal(number.key,'number');
  });
  it('Checking the default schema of the component', () => {
    const number = new NumberComponent();
    assert.equal(number.defaultSchema.multiple,false);
    assert.equal(number.defaultSchema.defaultValue,null);
    assert.equal(number.defaultSchema.type,'number');
  });
  it('Checking the number parsing method', () => {
    const number = new NumberComponent();
    assert.equal(number.parseNumber('100.010'),100.01);
    assert.equal(number.parseNumber('100a.00'),100);
  });
  it('Checking the number clearInput method', () => {
    const number = new NumberComponent();
    assert.equal(number.clearInput('100.010000000'),100.01);
    assert.equal(number.clearInput('00000100.00'),100);
  });
  it('Checking the number formatValue method', () => {
    const number = new NumberComponent();
    assert.equal(number.formatValue(100.010000000),100.01);
    assert.equal(number.formatValue(100.00000),100);
  });
});
