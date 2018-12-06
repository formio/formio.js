import HiddenComponent from './Hidden';
import assert from 'assert';
describe('Hidden Unit Tests', () => {
  it('Should create a new Hidden component', () => {
    const hidden = new HiddenComponent();
    assert.equal(hidden.type, 'hidden');
  });
  it('Checking the default schema of the component', () => {
    const hidden = new HiddenComponent();
    assert.equal(hidden.key, '');
    assert.equal(hidden.defaultSchema.hidden, false);
    assert.equal(hidden.defaultSchema.multiple, false);
  });
  it('Checking label is hidden', () => {
    const hidden = new HiddenComponent();
    assert.equal(hidden.labelIsHidden(), true);
  });
});
