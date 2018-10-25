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
  it('Setting placeholder',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      placeholder:'This is the placeholder.'
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.component.placeholder,'This is the placeholder.');
  });
  it('Setting prefix',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      prefix:'Prefix'
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.component.prefix,'Prefix');
  });
  it('Setting suffix',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      suffix:'Suffix'
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.component.suffix,'Suffix');
  });
  it('Setting suffix and prefix',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      suffix: 'Suffix',
      prefix: 'Prefix'
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.component.suffix,'Suffix');
    assert.equal(component.component.prefix,'Prefix');
  });
  it('Setting component to be required',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      validate: {
        required: true
      }
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.component.validate.required,true);
  });
  it('Fulfilling required field with default value.',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      defaultValue: 'My Value',
      validate: {
        required: true
      }
    });

    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.isValid(component.defaultValue,true),true);
  });
  it('Setting custom class',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      customClass: 'my-custom-class'
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.component.customClass,'my-custom-class');
  });
  it('Setting multiple values',() => {
    const component = new Component({
      label:'Test Component',
      key: 'testComponent',
      multiple: true
    });
    assert.equal(component.label,'Test Component');
    assert.equal(component.key,'testComponent');
    assert.equal(component.component.multiple,true);
  });
});
