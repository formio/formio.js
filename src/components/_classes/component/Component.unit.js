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
  it('Setting component to be required',() => {
    const component = new Component({
      key: 'testComponent',
      validate: {
        required: true
      }
    });

    assert.equal(component.className,'form-group has-feedback formio-component formio-component-undefined formio-component-testComponent  required');
  });
  it('Invalid message for required.',() => {
    const component = new Component({
      key: 'testComponent',
      defaultValue: '',
      validate: {
        required: true
      }
    });

    assert.equal(component.invalidMessage(component.validationValue,true,true),'required');
  });
  it('Setting component to be visible sets the default value',() => {
    const component = new Component({
      key: 'testComponent',
      defaultValue:'defaultValue'
    });

    component.visible = true;
    assert.equal(component.visible,true);
    assert.equal(component.dataValue,'defaultValue');
  });
  it('Setting component to be not visible sets the default value to null',() => {
    const component = new Component({
      key: 'testComponent',
      defaultValue:'defaultValue'
    });

    component.visible = false;
    assert.equal(component.dataValue,null);
    assert.equal(component.hasValue(),false);
  });
  it('Checking the schema of the component',() => {
    const component = new Component({
      key: 'testComponent'
    });

    assert.equal(component.schema.key,'testComponent');
    assert.equal(component.schema.input,true);
    assert.equal(component.schema.tableView,true);
    assert.equal(component.schema.label,'');
  });
  it('Calculating the value of the component',() => {
    const component = new Component({
      key: 'testComponent',
      calculateValue: function() {
        return 'testData';
      }
    });

    component.calculateValue('',null);
    assert.equal(component.dataValue,'testData');
  });
  // it('Setting suffix and prefix',() => {
  //   const component = new Component({
  //     key: 'testComponent'
  //   });
  //
  //   console.log(component.setCustomValidity('InValid',true));
  //   assert.equal(component.label,'Test Component');
  //   assert.equal(component.key,'testComponent');
  //   assert.equal(component.component.suffix,'Suffix');
  //   assert.equal(component.component.prefix,'Prefix');
  // });
});
