import Input from './Input';
import assert from 'assert';

describe('Input Component Unit Tests', () => {
  it('Checking input info',() => {
    const input = new Input({
      key: 'testInput'
    });
    assert.equal(input.inputInfo.id,'testInput');
    assert.equal(input.inputInfo.type,'input');
    assert.equal(input.inputInfo.changeEvent,'input');
  });
});
