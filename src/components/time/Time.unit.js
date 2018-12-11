import Time from './Time';
import assert from 'assert';
describe('Time Unit Tests', () => {
  it('Should create a new Time component', () => {
    const time = new Time();
    assert.equal(time.key,'time');
  });
  it('Checking the  default schema of the time component', () => {
    const time = new Time();
    assert.equal(time.defaultSchema.input,true);
    assert.equal(time.defaultSchema.inputType,'time');
    assert.equal(time.defaultSchema.format,'HH:mm');
  });
});
