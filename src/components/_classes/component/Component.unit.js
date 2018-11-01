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
  it('Checking data is set',() => {
    const component = new Component({
      key:'key'
    });
    component.dataValue = 'TestData';
    assert.equal(component.dataValue,'TestData');
  });
  it('Setting Default value with visible true',() => {
    const component = new Component({
      key: 'testComponent',
      defaultValue: 'This is the default value.'
    });

    assert.equal(component.visible,true);
    assert.equal(component.dataValue,'This is the default value.');
  });
  it('Setting Default value with visible false',() => {
    const component = new Component({
      key: 'testComponent',
      defaultValue: 'This is the default value.'
    });

    component.visible = false;
    assert.equal(component.dataValue,null);
  });
  it('Setting placeholder',() => {
    const component = new Component({
      key: 'testComponent',
      placeholder:'This is the placeholder.'
    });

    assert.equal(component.name,'This is the placeholder.');
  });
  // it('Setting prefix',() => {
  //   const component = new Component({
  //     label:'Test Component',
  //     key: 'testComponent',
  //     prefix:'Prefix'
  //   });
  //   assert.equal(component.label,'Test Component');
  //   assert.equal(component.key,'testComponent');
  //   assert.equal(component.component.prefix,'Prefix');
  // });
  // it('Setting suffix',() => {
  //   const component = new Component({
  //     label:'Test Component',
  //     key: 'testComponent',
  //     suffix:'Suffix'
  //   });
  //   assert.equal(component.label,'Test Component');
  //   assert.equal(component.key,'testComponent');
  //   assert.equal(component.component.suffix,'Suffix');
  // });
  // it('Setting suffix and prefix',() => {
  //   const component = new Component({
  //     label:'Test Component',
  //     key: 'testComponent',
  //     suffix: 'Suffix',
  //     prefix: 'Prefix'
  //   });
  //   assert.equal(component.label,'Test Component');
  //   assert.equal(component.key,'testComponent');
  //   assert.equal(component.component.suffix,'Suffix');
  //   assert.equal(component.component.prefix,'Prefix');
  // });
  it('Setting component to be required',() => {
    const component = new Component({
      key: 'testComponent',
      validate: {
        required: true
      }
    });

    assert.equal(component.className,'form-group has-feedback formio-component formio-component-undefined formio-component-testComponent  required');
  });
  it('Fulfilling required field with default value.',() => {
    const component = new Component({
      key: 'testComponent',
      defaultValue: '',
      validate: {
        required: true
      }
    });

    assert.equal(component.invalidMessage(component.dataValue,true,true),'required');
  });
  // it('Setting custom class',() => {
  //   const component = new Component({
  //     key: 'testComponent',
  //     customClass: 'my-custom-class'
  //   });
  //   var element = component.createElement();
  //   console.log('ele',element);
  //   assert.equal(component.label,'Test Comonent');
  //   assert.equal(component.key,'testComponent');
  //   assert.equal(component.component.customClass,'my-custom-class');
  // });
  // it('Setting multiple values',() => {
  //   const component = new Component({
  //     label:'Test Component',
  //     key: 'testComponent',
  //     multiple: true
  //   });
  //   assert.equal(component.label,'Test Component');
  //   assert.equal(component.key,'testComponent');
  //   assert.equal(component.component.multiple,true);
  // });
});
