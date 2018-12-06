import ButtonComponent from './Button';
import assert from 'assert';
describe('Button Unit Tests', () => {
  it('Checking schema of the button', () => {
    const button = new ButtonComponent();
    assert.equal(button.defaultSchema.key, 'submit');
    assert.equal(button.defaultSchema.label,'Submit');
    assert.equal(button.defaultSchema.action,'submit');
    assert.equal(button.defaultSchema.theme,'default');
  });
  it('Checking input info of the button', () => {
    const button = new ButtonComponent();
    assert.equal(button.inputInfo.type, 'button');
    assert.equal(button.inputInfo.content,'Submit');
  });
  it('Rendering a button', () => {
    const button = new ButtonComponent();
    assert.equal(button.rendered,false);
    button.render();
    assert.equal(button.rendered,true);
  });
});
