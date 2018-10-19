import Component from './Component';
import assert from 'assert';

describe('Base Component Unit Tests', () => {
  it('Should create a Base Component', () => {
    const component = new Component();
    // Test that we have a proper constructed component.
    assert.equal(component.options.template, 'bootstrap3');
    assert.equal(component.options.renderMode, 'form');
    assert.equal(component.options.attachMode, 'full');
    assert.equal(component.attached, false);
    assert.equal(component.rendered, false);
  });
  it('Checking label and key for the component',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent'
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
  });
  it('Setting Default value',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      defaultValue: 'This is the default value.'
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.defaultValue,'This is the default value.');
  });
  it('Setting Default value',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      defaultValue: 'This is the default value.'
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.defaultValue,'This is the default value.');
  });
});
