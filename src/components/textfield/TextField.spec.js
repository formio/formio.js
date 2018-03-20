'use strict';
import {TextFieldComponent} from './TextField';
import {components as comps} from './fixtures/index';
import {Harness} from '../../../test/harness';
import assert from 'power-assert';
describe('TextField Component', () => {
  it('Should build a TextField component', (done) => {
    Harness.testCreate(TextFieldComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
      done();
    });
  });
});

describe('TextField Builder', () => {
  let builder = null;
  before((done) => Harness.builderBefore(done));
  after(() => Harness.builderAfter());
  it ('Should create a new textfield component', (done) => {
    builder = Harness.buildComponent('textfield');
    builder.editForm.formReady.then(() => {
      // Make sure default preview is correct.
      let preview = builder.componentPreview.innerHTML;
      assert(preview.indexOf('formio-component formio-component-textfield formio-component-textField') !== -1, 'Must have correct classes');
      assert(preview.indexOf('<label class="control-label" style="">Text Field</label>') !== -1, 'Must have a label');
      assert(preview.indexOf('<input name="data[textField]" type="text" class="form-control"></div>') !== -1, 'Must have an input');
      done();
    });
  });

  it ('Should allow you to change the label', (done) => {
    let component = builder.editForm.submission;
    assert.equal(component.data.label, 'Text Field');
    component.data.label = 'First Name';
    builder.off('updateComponent');
    builder.on('updateComponent', () => {
      let preview = builder.componentPreview.innerHTML;
      assert(preview.match(/label.*input/), 'Label must be on top.');
      assert(preview.indexOf('<label class="control-label" style="">First Name</label>') !== -1, 'Must have a label');
      done();
    });
    builder.editForm.submission = component;
  });

  it ('Should allow you to hide the label', (done) => {
    let component = builder.editForm.submission;
    assert.equal(component.data.hideLabel, false);
    component.data.hideLabel = true;
    builder.off('updateComponent');
    builder.on('updateComponent', () => {
      let preview = builder.componentPreview.innerHTML;
      assert(preview.indexOf('<label class="control-label"') === -1, 'Must not have a label');
      done();
    });
    builder.editForm.submission = component;
  });

  it ('Should allow you to change the label position', (done) => {
    let component = builder.editForm.submission;
    assert.equal(component.data.labelPosition, 'top');
    component.data.hideLabel = false;
    component.data.labelPosition = 'bottom';
    builder.off('updateComponent');
    builder.on('updateComponent', () => {
      let preview = builder.componentPreview.innerHTML;
      assert(preview.match(/input.*label/), 'Label must be on bottom.');
      done();
    });
    builder.editForm.submission = component;
  });
});
