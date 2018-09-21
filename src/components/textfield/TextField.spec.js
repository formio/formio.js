import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../../../test/harness';
import TextFieldComponent from './TextField';

import {
  comp1,
  comp2,
  comp3
} from './fixtures';

describe('TextField Component', () => {
  it('Should build a TextField component', () => {
    return Harness.testCreate(TextFieldComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });

  it('Should provide required validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { required: true }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, '', 'firstName', 'First Name is required'),
        Harness.testValid(component, 'te')
      ];
    });
  });

  it('Should provide minLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { minLength: 2 }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 't', 'firstName', 'First Name must be longer than 1 characters.'),
        Harness.testValid(component, 'te')
      ];
    });
  });

  it('Should provide maxLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { maxLength: 5 }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 'testte', 'firstName', 'First Name must be shorter than 6 characters.'),
        Harness.testValid(component, 'te')
      ];
    });
  });

  it('Should provide custom validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 'Joe', 'firstName', 'You cannot be Joe'),
        Harness.testValid(component, 'Tom')
      ];
    });
  });

  it('Should provide json validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: {
        json: {
          'if': [
            {
              '===': [
                { var: 'data.firstName' },
                'Joe'
              ]
            },
            true,
            'You must be Joe'
          ]
        }
      }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 'Tom', 'firstName', 'You must be Joe'),
        Harness.testValid(component, 'Joe')
      ];
    });
  });

  it('Should allow for multiple values', () => {
    return Harness.testCreate(TextFieldComponent, comp3).then((component) => {
      console.log(component.element.innerHTML);
      Harness.testElements(component, 'table', 1);
      Harness.testElements(component, 'table tr', 1);
      Harness.testElements(component, 'table tr:first-child td', 2);
      Harness.testElements(component, 'table tr:first-child td:first-child input[name="data[names]"]', 1);
      Harness.testElements(component, 'table tr:first-child td:last-child .glyphicons-remove-circle', 1);
    });
  });

  it('Should provide required validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { required: true }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, '', 'firstName', 'First Name is required'),
        Harness.testValid(component, 'te')
      ];
    });
  });

  it('Should provide minLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { minLength: 2 }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 't', 'firstName', 'First Name must be longer than 1 characters.'),
        Harness.testValid(component, 'te')
      ];
    });
  });

  it('Should provide maxLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { maxLength: 5 }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 'testte', 'firstName', 'First Name must be shorter than 6 characters.'),
        Harness.testValid(component, 'te')
      ];
    });
  });

  it('Should provide custom validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 'Joe', 'firstName', 'You cannot be Joe'),
        Harness.testValid(component, 'Tom')
      ];
    });
  });

  it('Should provide json validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: {
        json: {
          'if': [
            {
              '===': [
                { var: 'data.firstName' },
                'Joe'
              ]
            },
            true,
            'You must be Joe'
          ]
        }
      }
    })).then((component) => {
      return Promise.all[
        Harness.testInvalid(component, 'Tom', 'firstName', 'You must be Joe'),
        Harness.testValid(component, 'Joe')
      ];
    });
  });

  it('Should allow for multiple values', () => {
    return Harness.testCreate(TextFieldComponent, comp3).then((component) => {
      Harness.testElements(component, 'table', 1);
      Harness.testElements(component, 'table tr', 1);
      Harness.testElements(component, 'table tr:first-child td', 2);
      Harness.testElements(component, 'table tr:first-child td:first-child input[name="data[names]"]', 1);
      Harness.testElements(component, 'table tr:first-child td:last-child .glyphicons-remove-circle', 1);
    });
  });
});

describe('TextField Builder', () => {
  let builder = null;

  before((done) => Harness.builderBefore(done));
  after(() => Harness.builderAfter());

  it('Should create a new textfield component', () => {
    builder = Harness.buildComponent('textfield');
    return builder.editForm.formReady.then(() => {
      // Make sure default preview is correct.
      const preview = builder.componentPreview.innerHTML;
      assert(preview.indexOf('formio-component formio-component-textfield formio-component-textField') !== -1, 'Must have correct classes');
      assert(preview.indexOf('<label class="control-label" style="">Text Field</label>') !== -1, 'Must have a label');
      assert(preview.indexOf('<input name="data[textField]" type="text" class="form-control"') !== -1, 'Must have an input');
    });
  });

  it('Should allow you to change the label', (done) => {
    Harness.setComponentProperty('label', 'Text Field', 'First Name', (preview) => {
      assert(preview.match(/label.*input/), 'Label must be on top.');
      assert(preview.indexOf('<label class="control-label" style="">First Name</label>') !== -1, 'Must have a label');
      done();
    });
  });

  it('Should allow you to hide/show the label', (done) => {
    Harness.setComponentProperty('hideLabel', false, true, (preview) => {
      assert(preview.indexOf('<label class="control-label"') === -1, 'Must not have a label');
      Harness.setComponentProperty('hideLabel', true, false, (preview) => {
        assert(preview.indexOf('<label class="control-label"') !== -1, 'Must have a label');
        done();
      });
    });
  });

  it('Should allow you to change the label position', (done) => {
    Harness.setComponentProperty('labelPosition', 'top', 'bottom', (preview) => {
      assert(preview.match(/input.*label/), 'Label must be on bottom.');
      Harness.setComponentProperty('labelPosition', 'bottom', 'left-left', (preview) => {
        assert(preview.match(/label.*style=".*float: left; width: 30%; margin-right: 3%;.*input/), 'Label must be positioned on the left floated left');
        Harness.setComponentProperty('labelPosition', 'left-left', 'left-right', (preview) => {
          assert(preview.match(/label.*style=".*float: left; width: 30%; margin-right: 3%; text-align: right;.*input/), 'Label must be positioned on the left floated right');
          Harness.setComponentProperty('labelPosition', 'left-right', 'right-left', (preview) => {
            assert(preview.match(/label.*style=".*float: right; width: 30%; margin-left: 3%;.*input/), 'Label must be positioned on the right floated left');
            Harness.setComponentProperty('labelPosition', 'right-left', 'right-right', (preview) => {
              assert(preview.match(/label.*style=".*float: right; width: 30%; margin-left: 3%; text-align: right;.*input/), 'Label must be positioned on the right floated right');
              done();
            });
          });
        });
      });
    });
  });

  it('Should allow you to change the label width and margin', (done) => {
    Harness.setComponentProperty('labelPosition', 'right-right', 'top', () => {
      Harness.testVisibility(builder.editForm, '.formio-component-labelWidth', false);
      Harness.testVisibility(builder.editForm, '.formio-component-labelMargin', false);
      Harness.setComponentProperty('labelPosition', 'top', 'left-left', () => {
        Harness.testVisibility(builder.editForm, '.formio-component-labelWidth', true);
        Harness.testVisibility(builder.editForm, '.formio-component-labelMargin', true);
        Harness.setComponentProperty('labelWidth', 30, 20, () => {
          Harness.setComponentProperty('labelMargin', 3, 5, (preview) => {
            assert(preview.match(/label.*style=".*float: left; width: 20%; margin-right: 5%;.*input/), 'Label must be positioned on the left floated left');
            Harness.setComponentProperty('labelPosition', 'left-left', 'right-right', (preview) => {
              assert(preview.match(/label.*style=".*float: right; width: 20%; margin-left: 5%; text-align: right;.*input/), 'Label must be positioned on the right floated right');
              Harness.testVisibility(builder.editForm, '.formio-component-labelWidth', true);
              Harness.testVisibility(builder.editForm, '.formio-component-labelMargin', true);
              done();
            });
          });
        });
      });
    });
  });

  it('Should allow you to set the input mask', (done) => {
    Harness.testBuilderProperty('inputMask', '', '(999) 999-9999', null, () => {
      assert.equal(builder.preview.inputs[0].placeholder, '(___) ___-____');
      builder.preview.setValue('1234567890');
      assert.equal(builder.preview.inputs[0].value, '(123) 456-7890');
      assert.equal(builder.preview.getValue(), '(123) 456-7890');
      done();
    });
  });

  it('Should set the placeholder of the input', (done) => {
    Harness.setComponentProperty('labelPosition', 'right-right', 'top', () => {
      Harness.testBuilderProperty('placeholder', '', 'Enter something here', /input.*name="data\[firstName\].*placeholder="Enter something here"/, done);
    });
  });

  it('Should set the description of the input', (done) => {
    Harness.testBuilderProperty('description', '', 'This is a description', /input.*div.*class="help-block">This is a description<\/div>/, done);
  });

  it('Should set the tooltip of the input', (done) => {
    Harness.testBuilderProperty('tooltip', '', 'This is something you should fill out.', /label.*i.*class="glyphicon glyphicon-question-sign text-muted.*<\/label>/, () => {
      assert(builder.preview.tooltip, 'There should be a tooltip instance');
      builder.preview.tooltip.show();
      const toolTipText = builder.preview.element.querySelector('.tooltip-inner');
      assert.equal(toolTipText.innerHTML, 'This is something you should fill out.');
      done();
    });
  });

  it('Should set the prefix of the input', (done) => {
    Harness.testBuilderProperty('prefix', '', '$', /div class="input-group">.*<div class="input-group-addon">\$<\/div>.*input/, done);
  });

  it('Should set the suffix of the input', (done) => {
    Harness.testBuilderProperty('suffix', '', 'USD', /div class="input-group">.*input.*<div class="input-group-addon">USD<\/div>/, done);
  });

  it('Should set the custom css class of the input', (done) => {
    Harness.testBuilderProperty('customClass', '', 'custom-text-field', null, () => {
      assert(builder.preview.hasClass(builder.preview.element, 'custom-text-field'), 'Preview should have this custom class');
      done();
    });
  });

  it('Should set the tab index of the input element', (done) => {
    Harness.testBuilderProperty('tabindex', '', 10, null, () => {
      assert.equal(builder.preview.inputs[0].tabIndex, 10);
      done();
    });
  });

  it('Should allow you to set the multiple flag', (done) => {
    Harness.testBuilderProperty('multiple', false, true, null, () => {
      done();
    });
  });
});
