import Multivalue from './Multivalue';
import assert from 'assert';

describe('Multivalue Component Unit Tests', () => {
  it('Setting component to be multiple',() => {
    const multivalue = new Multivalue({
      key: 'testMultivalue',
      multiple: true
    });

    multivalue.addNewValue('Test One');
    assert.equal(multivalue.dataValue.length,2);
    assert.equal(multivalue.dataValue[1],'Test One');
    multivalue.addNewValue('Test Two');
    assert.equal(multivalue.dataValue.length,3);
    assert.equal(multivalue.dataValue[2],'Test Two');
    multivalue.removeValue(1);
    assert.equal(multivalue.dataValue.length,2);
    assert.equal(multivalue.dataValue[1],'Test Two');
    multivalue.addValue();
    assert.equal(multivalue.dataValue.length,3);
  });
});
