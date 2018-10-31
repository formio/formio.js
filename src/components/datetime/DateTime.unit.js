import DateTimeComponent from './DateTime';
import assert from 'assert';
describe('DateTime Unit Tests', () => {
  it('Should create a new DateTime component', () => {
    const dateTime = new DateTimeComponent({
      label: 'DateTime',
      key: 'dateTime',
      type: 'dateTime'
    });

    assert.equal(dateTime.key, 'dateTime');
  });
  it('Should create a new DateTime component with Label', () => {
    const dateTime = new DateTimeComponent({
      label: 'DateTime',
      key: 'dateTime',
      type: 'dateTime'
    });

    assert.equal(dateTime.label, 'DateTime');
  });
  it('Should create a new DateTime component without Label', () => {
    const dateTime = new DateTimeComponent({
      label: '',
      key: 'dateTime',
      type: 'dateTime'
    });

    assert.equal(dateTime.label, '');
  });
});
