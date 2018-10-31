import HiddenComponent from './Hidden';
import assert from 'assert';
describe('Hidden Unit Tests', () => {
  it('Should create a new Hidden component', () => {
    const hidden = new HiddenComponent({
      label: 'Hidden',
      key: 'hidden',
      type: 'Hidden'
    });

    assert.equal(hidden.key, 'hidden');
  });
  it('Set default value', () => {
    const hidden = new HiddenComponent({
      label: 'Hidden',
      key: 'hidden',
      type: 'Hidden',
      defaultValue: 'my value'
    });

    assert.equal(hidden.component.defaultValue, 'my value');
  });
  it('Sets a custom class', () => {
    const hidden = new HiddenComponent({
      label: 'Hidden',
      key: 'hidden',
      type: 'Hidden',
      customClass: 'my-class'
    });

    assert.equal(hidden.component.customClass, 'my-class');
  });
});
