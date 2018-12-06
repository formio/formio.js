import DateTimeComponent from './DateTime';
import assert from 'assert';
describe('DateTime Unit Tests', () => {
  it('Should create a new DateTime component', () => {
    const dateTime = new DateTimeComponent();
    assert.equal(dateTime.key, 'dateTime');
  });
  it('Checking the default schema of the component', () => {
    const dateTime = new DateTimeComponent();
    assert.equal(dateTime.defaultSchema.label, 'Date / Time');
    assert.equal(dateTime.defaultSchema.format, 'yyyy-MM-dd hh:mm a');
    assert.equal(dateTime.defaultSchema.displayInTimezone, 'viewer');
    assert.equal(dateTime.defaultSchema.datepickerMode, 'day');
  });
});
