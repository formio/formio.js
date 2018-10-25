import ButtonComponent from './Button';
import assert from 'assert';
describe('Button Unit Tests', () => {
  it('Should create a new Button', () => {
    const button = new ButtonComponent({
      label: 'Submit',
      key: 'submit',
      type: 'button'
    });

    assert.equal(button.component.key, 'submit');
    assert.equal(button.component.theme,'default');
  });
  it('Checking theme', () => {
    const button = new ButtonComponent({
      label: 'Submit',
      key: 'submit',
      type: 'button'
    });

    assert.equal(button.component.theme,'default');
  });
  it('Checking size of the button', () => {
    const button = new ButtonComponent({
      label: 'Submit',
      key: 'submit',
      type: 'button'
    });

    assert.equal(button.component.size,'md');
  });
  it('Setting custom class', () => {
    const button = new ButtonComponent({
      label: 'Submit',
      key: 'submit',
      type: 'button',
      customClass: 'my-custom-class'
    });

    assert.equal(button.component.customClass,'my-custom-class');
  });
});
