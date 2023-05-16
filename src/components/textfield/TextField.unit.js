import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../../../test/harness';
import TextFieldComponent from './TextField';
import Formio from './../../Formio';
import 'flatpickr';

import {
  comp1,
  comp2,
  comp4,
  comp5,
  comp6,
  withDisplayAndInputMasks,
  comp7,
} from './fixtures';

describe('TextField Component', () => {
  it('Should create a new TextField', () => {
    const textField = new TextFieldComponent({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield'
    });

    assert.equal(textField.component.key, 'firstName');
  });

  it('Should build a TextField component', () => {
    return Harness.testCreate(TextFieldComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 1);
    });
  });

  it('Should disable multiple mask selector if component is disabled', (done) => {
    Harness.testCreate(TextFieldComponent, comp4).then((component) => {
      Harness.testElements(component, '[disabled]', 2);
      done();
    });
  });

  it('Should check mask and value in the textfield component in the email template', (done) => {
    const formJson =  {
      components: [{
          label: 'Text Field',
          tableView: true,
          allowMultipleMasks: true,
          inputMasks: [{
            label: 'mask1',
            mask: 'mask1'
          }],
          key: 'textField',
          type: 'textfield',
          input: true
       }]
    };
    const element = document.createElement('div');
    Formio.createForm(element, formJson)
      .then(form => {
        form.setSubmission({
          data: {
            textField: {
                value: 'mask1',
                maskName: 'mask2'
            }
        },
        });

        const textField = form.getComponent('textField');

        setTimeout(() => {
          assert.equal(textField.dataValue.value, 'mask1', 'Should check value');
          assert.equal(textField.dataValue.maskName, 'mask2', 'Should check maskName');
          const toString = textField.getValueAsString(textField.dataValue, { email: true });
          assert.ok(toString.includes('table'), 'Email template should render html table');
          assert.ok(toString.includes(textField.dataValue.maskName), 'Email template should have Text Field mackName');
          assert.ok(toString.includes(textField.dataValue.value), 'Email template should have Text Field value');
          done();
        }, 300);
      })
      .catch(done);
  });

  it('Should provide required validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { required: true }
    })).then((component) => {
      return Harness.testInvalid(component, '', 'firstName', 'First Name is required').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te').then(() => component);
    });
  });

  it('Should provide minWords validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { minWords: 2 }
    })).then((component) => {
      return Harness.testInvalid(component, 'test', 'firstName', 'First Name must have at least 2 words.').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te st').then(() => component);
    });
  });

  it('Should correctly calculate remaining words', (done) => {
    Harness.testCreate(TextFieldComponent, comp5).then((component) => {
      const inputEvent = new Event('input', { bubbles: true, cancelable: true });
      const element = component.refs.input[0];

      element.value = 'paper format A4';
      element.dispatchEvent(inputEvent);

      setTimeout(()=>{
        assert.equal(component.refs.wordcount[0].textContent, '2 words remaining.');

        element.value = 'Hey, guys! We are here!!';
        element.dispatchEvent(inputEvent);

        setTimeout(()=>{
          assert.equal(component.refs.wordcount[0].textContent, '0 words remaining.');

          element.value = ' Some   test   text  111 ';
          element.dispatchEvent(inputEvent);

          setTimeout(()=>{
            assert.equal(component.refs.wordcount[0].textContent, '1 words remaining.');

            done();
          }, 300);
        }, 275);
      }, 250);
    });
  });

  it('Should provide maxWords validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { maxWords: 2 }
    })).then((component) => {
      return Harness.testInvalid(component, 'test test test', 'firstName', 'First Name must have no more than 2 words.').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te st').then(() => component);
    });
  });

  it('Should provide minLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { minLength: 2 }
    })).then((component) => {
      return Harness.testInvalid(component, 't', 'firstName', 'First Name must have at least 2 characters.').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te').then(() => component);
    });
  });

  it('Should provide maxLength validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: { maxLength: 5 }
    })).then(component => {
      return Harness.testInvalid(component, 'testte', 'firstName', 'First Name must have no more than 5 characters.').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'te').then(() => component);
    });
  });

  it('Should provide custom validation', () => {
    return Harness.testCreate(TextFieldComponent, _.merge({}, comp2, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then((component) => {
      return Harness.testInvalid(component, 'Joe', 'firstName', 'You cannot be Joe').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'Tom').then(() => component);
    });
  });

  it('Should provide one custom error message', (done) => {
    const formJson =  {
      components: [{
          label: 'Text Field',
          tableView: true,
          validate: {
            pattern: '^[0-9]*$]',
            customMessage: 'Custom Error Message',
            minWords: 10
          },
          key: 'textField',
          type: 'textfield',
          input: true
       }]
    };
    const element = document.createElement('div');
    Formio.createForm(element, formJson)
      .then(form => {
        form.submission = {
          data: {
            textField: 'textField'
          }
        };
        const textField = form.getComponent('textField');
        setTimeout(() => {
          assert.equal(textField.refs.messageContainer.children.length, 1);
          assert.equal(textField.refs.messageContainer.children[0].innerHTML, 'Custom Error Message');
          done();
        }, 300);
      })
      .catch(done);
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
      return Harness.testInvalid(component, 'Tom', 'firstName', 'You must be Joe').then(() => component);
    }).then((component) => {
      return Harness.testValid(component, 'Joe').then(() => component);
    });
  });

  it('Should provide number input mask only after blur event if applyMaskOn setting on blur', (done) => {
    const form = _.cloneDeep(comp7);
    const element = document.createElement('div');
    form.components[0].inputMask = '99-99';
    const value = 999;

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textField');
      const changed = component.setValue(value);

      if (value) {
        assert.equal(changed, true, 'Should set value');
        assert.equal(component.getValue(), value);
      }

      setTimeout(() => {
        const textFieldInput = component.element.querySelector('.form-control');
        const event = new Event('blur');
        textFieldInput.dispatchEvent(event);

        setTimeout(() => {
          assert.equal(component.getValue(), '99-9_');
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should provide validation of number input mask only after blur event if applyMaskOn setting on blur', (done) => {
    const form = _.cloneDeep(comp7);
    const element = document.createElement('div');
    form.components[0].inputMask = '99-99';
    let value = 999;

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textField');
      let changed = component.setValue(value);
      const error = 'Text Field does not match the mask.';

      if (value) {
        assert.equal(changed, true, 'Should set value');
      }

      setTimeout(() => {
        assert.equal(!!component.error, false, 'Should not contain error');

        const textFieldInput = component.element.querySelector('.form-control');
        const event = new Event('blur');
        textFieldInput.dispatchEvent(event);

        setTimeout(() => {
          assert.equal(!!component.error, true, 'Should contain error');
          assert.equal(component.error.message, error, 'Should contain error message');
          assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
          assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');

          value = 9999;
          changed = component.setValue(value);

          setTimeout(() => {
            assert.equal(!!component.error, true, 'Should contain error');
            assert.equal(component.error.message, error, 'Should contain error message');
            assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
            assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');

            textFieldInput.dispatchEvent(event);

            setTimeout(() => {
              assert.equal(!!component.error, false, 'Should not contain error');
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Should provide validation of number input mask after setting value', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = '99/99-99.99:99,99';

    const validValues = [
      '',
      '99/99-99.99:99,99',
    ];

    const invalidValues = [
      '99/99-99.99:99,,99',
      '99/99-99.99:99,9',
      '9999-99.99:99,,99',
      '99/99-99.99:9(9,9)9',
      '99999999#999999999',
      'fffffff()f99/99-99.99:99,99',
      '77ff7777ff7777ff7777',
      '9/99-99.99999,99',
      '9/99-9/9.9/9:99,9/9',
      '99/99-a9.99:99,99',
      '99/99---.99:99,99',
      'ddddddddddddddd',
      '9/99-9/9.9/9:99,9/9ddd',
      '9/99-99.99999,fffffff',
      '99/_9-99.9f9:99,9g9',
      'A8/99-99.99:99,99',
    ];

    const testValidity = (values, valid, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const changed = component.setValue(value);
          const error = 'Text Field does not match the mask.';

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length-1]);
  });

  it('Should allow inputing only numbers and format input according to input mask', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = '99/99-99.99:99,99';

    const values = [
      '99/99-99.99:99,,99',
      '9999-99.99:999,,99',
      '99/99-99.99:9(9,9)9',
      '99999999999999999',
      'ffffffff99/99-99.99:99,99',
      '99ff999999ff999ff9',
      '9/99-99.99999,999',
      '9/99-9/9.9/9:999,9/9',
      '99.99-a9.99:999,99',
      '99/99---.99:9999,99',
      '999999999999',
      '99999-9/9.9/9:99,9/9ddd',
      '9----99999-99.99999,fffffff',
      '999-9kkkk9.99999f9:99,9g9',
      'A9/99-99.999:99,99',
    ];

    const testFormatting = (values, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const input = component.refs.input[0];
          const inputEvent = new Event('input');
          input.value = value;
          input.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(!!component.error, false, 'Should not contain error');
            assert.equal(component.getValue(), '99/99-99.99:99,99', 'Should set and format value');

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length-1]);
  });

  it('Should provide validation for alphabetic input mask after setting value', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = 'a/A/a-a:a.a,aa';

    const validValues = [
      '',
      'b/V/r-y:d.d,as',
      'b/b/r-y:d.d,as',
    ];

    const invalidValues = [
      'b/b/r-y:d.d',
      'b/v/r-yCC:d.d,as',
      'rD/F/R-y:d.d,DE',
      'bv/Sr-y:d.d,as',
      '555555555555555',
      'ssssEsssssssssssss',
      'b/v/Rr-y:d$.d,a',
      '3/3/#r-y:d.d,as',
      '3/3/6-6&&:d...d,as',
      '5/5/5ee-55.5,5'
    ];

    const testValidity = (values, valid, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const changed = component.setValue(value);
          const error = 'Text Field does not match the mask.';

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length-1]);
  });

  it('Should allow inputing only letters and format input according to input mask', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = 'a/a/a-a:a.a,aa';

    const values = [
        'ssssSSSSSSS/sss-ss.s,ss',
        'ss/sSss-sSSs.s,ss',
        'ssSssssssSSSssssss',
        's/sS/sss-s5555:sss.--s,s',
        '3/s3/Ss-s:ss.s,ssSsss',
        'ssSs3/3s/s6-s6:s...s,s',
        's5/5sSS/5s-5:sS---5.s5,s5sss'
    ];

    const testFormatting = (values, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const input = component.refs.input[0];
          const inputEvent = new Event('input');
          input.value = value;
          input.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(!!component.error, false, 'Should not contain error');
            assert.equal(component.getValue(), 's/s/s-s:s.s,ss', 'Should set and format value');

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length-1]);
  });

  it('Should provide validation for alphanumeric input mask after setting value', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = '**/***.*-*,**';

    const validValues = [
      '',
      'f4/D34.3-S,dd',
      'gg/ggg.g-g,gg',
      'DD/DDD.D-D,DD',
      '55/555.5-5,55',
    ];

    const invalidValues = [
      'er432ff',
      'rD5/F/R-y:d',
      '_=+dsds4',
      'sFFFFF--------2',
      'sd',
      'sf__df',
      'gg/ggg.g-g',
    ];

    const testValidity = (values, valid, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const changed = component.setValue(value);
          const error = 'Text Field does not match the mask.';

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length-1]);
  });

  it('Should allow inputing only letters and digits and format input according to input mask', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = '**/***.*-*,**';

    const values = [
      { value:'ssssSSSSSSS/sss-ss.s,ss', expected: 'ss/ssS.S-S,SS' },
      { value:'ss/sSss-sSSs.s,ss', expected: 'ss/sSs.s-s,SS' },
      { value:'ssS666ssssssSSSssssss', expected: 'ss/S66.6-s,ss' },
      { value:'s/sS/sss-s5555:sss.--s,s', expected: 'ss/Sss.s-s,55' },
      { value:'3/s3/Ss-s:ss.s,ssSsss', expected: '3s/3Ss.s-s,ss' },
      { value:'ssSs3/3s/s6-s6:s...s,s', expected: 'ss/Ss3.3-s,s6' },
      { value:'s5/5sSS/5s-5:sS---5.s5,s5sss', expected: 's5/5sS.S-5,s5' },
    ];

    const testFormatting = (values, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const input = component.refs.input[0];
          const inputEvent = new Event('input');
          input.value = value.value;
          input.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(!!component.error, false, 'Should not contain error');
            assert.equal(component.getValue(), value.expected, 'Should set and format value');

            if (_.isEqual(value.value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length-1].value);
  });

  it('Should provide validation for mixed input mask after setting value', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = '**/99-aa';

    const validValues = [
      '',
      '4r/34-fg',
      '46/34-yy',
      'ye/56-op',
      'We/56-op',
    ];

    const invalidValues = [
      'te/56-Dp',
      'te/E6-pp',
      'tdddde/E6-pp',
      'te/E6',
      'te/E6-p',
      'gdfgdfgdf',
      '43543',
      'W'
    ];

    const testValidity = (values, valid, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const changed = component.setValue(value);
          const error = 'Text Field does not match the mask.';

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length-1]);
  });

  it('Should allow inputing only letters and digits and format input according to mixed input mask', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = '**/99-aa';

    const values = [
      { value:'S67gf-+f34cfd', expected: 'S6/73-cf' },
      { value:'56DDDfdsf23,DDdsf', expected: '56/23-ds' },
      { value:'--fs344d.g234df', expected: 'fs/34-dg' },
      { value:'000000000g234df', expected: '00/00-gd' },
    ];

    const testFormatting = (values, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const input = component.refs.input[0];
          const inputEvent = new Event('input');
          input.value = value.value;
          input.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(!!component.error, false, 'Should not contain error');
            assert.equal(component.getValue(), value.expected, 'Should set and format value');

            if (_.isEqual(value.value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length-1].value);
  });

  it('Should allow multiple masks', (done) => {
    const form = _.cloneDeep(comp6);
    const tf = form.components[0];
    tf.allowMultipleMasks = true;
    tf.inputMasks = [
      { label: 'number', mask: '99-99' },
      { label: 'letter', mask: 'aa.aa' },
      { label: 'any', mask: '**/**' }
    ];

    const masks = [
      { index: 0, mask: 'number', valueValid:['33-33'], valueInvalid: ['Bd'] },
      { index: 1, mask: 'letter', valueValid:['rr.dd'], valueInvalid: ['Nr-22'] },
      { index: 2, mask: 'any', valueValid:['Dv/33'], valueInvalid: ['4/4'] },
    ];

    const testMask = (mask, valid, lastValue) => {
      const values = valid ? mask.valueValid : mask.valueInvalid;

      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);
          const component = form.getComponent('textField');
          const changed = component.setValue({ value: value, maskName: mask.mask });
          const error = 'Text Field does not match the mask.';

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            assert.equal(component.refs.select[0].options[mask.index].selected, true, 'Should select correct mask');
            assert.equal(component.getValue().maskName, mask.mask, 'Should apply correct mask');

            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    _.each(masks, (mask, index) => {
      testMask(mask, true);
      testMask(mask, false,  (index === masks.length - 1) ? mask.valueInvalid[mask.valueInvalid.length-1] : undefined);
    });
  });

  it('Should provide validation of number input mask with low dash and placeholder char after setting value', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = '99_99/99';
    form.components[0].inputMaskPlaceholderChar = '.';

    const validValues = [
      '',
      '55_44/88',
    ];

    const invalidValues = [
      '99 99 99',
      '44_44_55',
      '55555555',
    ];

    const testValidity = (values, valid, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const input = component.refs.input[0];

          assert.equal(input.placeholder, '.._../..', 'Should set placeholder using the char setting');

          const changed = component.setValue(value);
          const error = 'Text Field does not match the mask.';

          if (value) {
            assert.equal(changed, true, 'Should set value');
          }

          setTimeout(() => {
            if (valid) {
              assert.equal(!!component.error, false, 'Should not contain error');
            }
            else {
              assert.equal(!!component.error, true, 'Should contain error');
              assert.equal(component.error.message, error, 'Should contain error message');
              assert.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');
              assert.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length-1]);
  });

  it('Should format input according to input mask with low dash when placeholder char is set', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputMask = '99_99/99';
    form.components[0].inputMaskPlaceholderChar = '.';

    const values = [
      { value:'4444444', expected: '44_44/44' },
    ];

    const testFormatting = (values, lastValue) => {
      _.each(values, (value) => {
        const element = document.createElement('div');

        Formio.createForm(element, form).then(form => {
          form.setPristine(false);

          const component = form.getComponent('textField');
          const input = component.refs.input[0];
          const inputEvent = new Event('input');
          input.value = value.value;
          input.dispatchEvent(inputEvent);

          setTimeout(() => {
            assert.equal(!!component.error, false, 'Should not contain error');
            assert.equal(component.getValue(), value.expected, 'Should set and format value');

            if (_.isEqual(value.value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length-1].value);
  });

  it('Should correctly count characters if character counter is enabled', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].showCharCount = true;
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textField');
      const inputValue = (value) => {
        const input = component.refs.input[0];
        const inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      const checkValue = (value) => {
        assert.equal(component.dataValue, value, 'Should set value');
        assert.equal(parseInt(component.refs.charcount[0].textContent), value.length, 'Should show correct chars number');
        assert.equal(component.refs.charcount[0].textContent, `${value.length} characters`, 'Should show correct message');
      };

      let value = 'test Value (@#!-"]) _ 23.,5}/*&&';
      inputValue(value);
      setTimeout(() => {
        checkValue(value);
        value = '';
        inputValue(value);

        setTimeout(() => {
          checkValue(value);
          value = '  ';
          inputValue(value);

          setTimeout(() => {
            checkValue(value);

            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should format value to uppercase', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].case = 'uppercase';
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textField');
      const inputValue = (value) => {
        const input = component.refs.input[0];
        const inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      const checkValue = (value) => {
        assert.equal(component.dataValue, value.toUpperCase(), 'Should format value to uppercase');
        assert.equal(component.getValue(), value.toUpperCase(), 'Should format value to uppercase');
      };

      let value = 'SoMe Value';
      inputValue(value);
      setTimeout(() => {
        checkValue(value);
        value = 'test 1 value 1';
        inputValue(value);

        setTimeout(() => {
          checkValue(value);
          value = '';
          inputValue(value);

          setTimeout(() => {
            checkValue(value);

            done();
          }, 100);
        }, 100);
      }, 100);
    }).catch(done);
  });

  it('Should format value to lowercase', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].case = 'lowercase';
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textField');
      const inputValue = (value) => {
        const input = component.refs.input[0];
        const inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      const checkValue = (value) => {
        assert.equal(component.dataValue, value.toLowerCase(), 'Should format value to lowercase (1)');
        assert.equal(component.getValue(), value.toLowerCase(), 'Should format value to lowercase (2)');
      };

      let value = 'SoMe Value';
      inputValue(value);
      setTimeout(() => {
        checkValue(value);
        value = 'TEST 1 VALUE (1)';
        inputValue(value);

        setTimeout(() => {
          checkValue(value);
          value = '';
          inputValue(value);

          setTimeout(() => {
            checkValue(value);

            done();
          }, 100);
        }, 100);
      }, 100);
    }).catch(done);
  });

  it('Should render and open/close calendar on click', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].widget = {
      allowInput: true,
      altInput: true,
      clickOpens: true,
      dateFormat: 'dd-MM-yyyy',
      enableDate: true,
      enableTime: true,
      format: 'dd-MM-yyyy',
      hourIncrement: 1,
      minuteIncrement: 5,
      mode: 'single',
      noCalendar: false,
      saveAs: 'date',
      'time_24hr': false,
      type: 'calendar',
      useLocaleSettings: false,
    };
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textField');
      const clickElem = (path) => {
        const elem = _.get(component, path);
        const clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };
      const checkCalendarState = (open) => {
        const calendar = document.querySelector('.flatpickr-calendar');
        assert.equal(calendar.classList.contains('open'), open, `${open ? 'Should open calendar' : 'Should close calendar'}`);
      };

      assert.equal(component.widget.settings.type, 'calendar', 'Should create calendar widget');
      clickElem('refs.suffix[0]');

       setTimeout(() => {
        checkCalendarState(true);
        clickElem('refs.suffix[0]');

        setTimeout(() => {
          checkCalendarState(false);
          clickElem('element.children[1].children[0].children[1]');

          setTimeout(() => {
            checkCalendarState(true);
            clickElem('refs.suffix[0]');

            setTimeout(() => {
              checkCalendarState(false);
              document.body.innerHTML = '';
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Should set value into calendar', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].widget = {
      allowInput: true,
      altInput: true,
      clickOpens: true,
      dateFormat: 'dd-MM-yyyy',
      enableDate: true,
      enableTime: true,
      format: 'dd-MM-yyyy',
      hourIncrement: 1,
      minuteIncrement: 5,
      mode: 'single',
      noCalendar: false,
      saveAs: 'date',
     'time_24hr': false,
      type: 'calendar',
      useLocaleSettings: false,
    };
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textField');
      const clickElem = (path) => {
        const elem = _.get(component, path);
        const clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };
      const checkCalendarState = (open, selectedDay) => {
        const calendar = document.querySelector('.flatpickr-calendar');
        assert.equal(calendar.classList.contains('open'), open, `${open ? 'Should open calendar' : 'Should close calendar'}`);
        if (selectedDay) {
          const day = calendar.querySelector('.flatpickr-day.selected').textContent;
          assert.equal(day, selectedDay, 'Should select correct day');
        }
      };

      const date = '16-03-2031';

      component.setValue(date);

       setTimeout(() => {
        checkCalendarState(false);
        const widget = component.element.querySelector('.flatpickr-input').widget;

        assert.equal(component.getValue(), date, 'Should set text field value');
        assert.equal(widget.calendar.input.value, date, 'Should set flatpickr value');
        assert.equal(widget.calendar.currentMonth, 2, 'Should set correct month');
        assert.equal(widget.calendar.currentYear, 2031, 'Should set correct year');

        clickElem('refs.suffix[0]');

        setTimeout(() => {
          checkCalendarState(true);
          clickElem('refs.suffix[0]');

          setTimeout(() => {
            checkCalendarState(false);
            document.body.innerHTML = '';
            done();
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Should allow manual input and set value on blur if calendar widget is enabled with allowed input', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].widget = {
      allowInput: true,
      altInput: true,
      clickOpens: true,
      dateFormat: 'dd-MM-yyyy',
      enableDate: true,
      enableTime: true,
      format: 'dd-MM-yyyy',
      hourIncrement: 1,
      minuteIncrement: 5,
      mode: 'single',
      noCalendar: false,
      saveAs: 'date',
     'time_24hr': false,
      type: 'calendar',
      useLocaleSettings: false,
    };
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textField');
      const clickElem = (path, element) => {
        const elem = element || _.get(component, path);
        const clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };
      const checkCalendarState = (open, selectedDay) => {
        const calendar = document.querySelector('.flatpickr-calendar');
        assert.equal(calendar.classList.contains('open'), open, `${open ? 'Should open calendar' : 'Should close calendar'}`);
        if (selectedDay) {
          const day = calendar.querySelector('.flatpickr-day.selected').textContent;
          assert.equal(day, selectedDay, 'Should select correct day');
        }
      };

      const triggerDateInputEvent = (eventName, value) => {
        const dateInput = component.element.querySelector('.form-control.input');
        const event = new Event(eventName);
        if (eventName === 'input') {
          dateInput.value = value;
        }
        dateInput.dispatchEvent(event);
      };

      triggerDateInputEvent('focus');

       setTimeout(() => {
        const date = '21-01-2001';
        checkCalendarState(true);
        triggerDateInputEvent('input', date);

        setTimeout(() => {
          checkCalendarState(true);
          triggerDateInputEvent('blur');

          setTimeout(() => {
            checkCalendarState(true, 21);

            assert.equal(component.getValue(), date, 'Should set text field value');
            const widget = component.element.querySelector('.flatpickr-input').widget;
            assert.equal(widget.calendar.input.value, date, 'Should set flatpickr value');
            assert.equal(widget.calendar.currentMonth, 0, 'Should set correct month');
            assert.equal(widget.calendar.currentYear, 2001, 'Should set correct year');

            clickElem('refs.suffix[0]');

            setTimeout(() => {
              checkCalendarState(false);
              assert.equal(component.getValue(), date, 'Should save text field value');

              document.body.innerHTML = '';
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Should allow removing date value if calendar widget is enabled with allowed input', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].widget = {
      allowInput: true,
      altInput: true,
      clickOpens: true,
      dateFormat: 'dd-MM-yyyy',
      enableDate: true,
      enableTime: true,
      format: 'dd-MM-yyyy',
      hourIncrement: 1,
      minuteIncrement: 5,
      mode: 'single',
      noCalendar: false,
      saveAs: 'date',
     'time_24hr': false,
      type: 'calendar',
      useLocaleSettings: false,
    };
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const component = form.getComponent('textField');
      const clickElem = (path, element) => {
        const elem = element || _.get(component, path);
        const clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      const checkCalendarState = (open, selectedDay, noSelectedDay) => {
        const calendar = document.querySelector('.flatpickr-calendar');
        assert.equal(calendar.classList.contains('open'), open, `${open ? 'Should open calendar' : 'Should close calendar'}`);
        if (selectedDay) {
          const day = calendar.querySelector('.flatpickr-day.selected').textContent;
          assert.equal(day, selectedDay, 'Should select correct day');
        }
        if (noSelectedDay) {
          const day = calendar.querySelector('.flatpickr-day.selected');
          assert.equal(!!day, false, 'Should not contain selected day');
        }
      };

      const triggerDateInputEvent = (eventName, value) => {
        const dateInput = component.element.querySelector('.form-control.input');
        const event = new Event(eventName);
        if (eventName === 'input') {
          dateInput.value = value;
        }
        dateInput.dispatchEvent(event);
      };

      let date = '12-03-2009';
      component.setValue(date);
      triggerDateInputEvent('focus');

       setTimeout(() => {
        assert.equal(component.getValue(), date, 'Should set text field value');
        date = '';
        checkCalendarState(true);
        triggerDateInputEvent('input', date);

        setTimeout(() => {
          checkCalendarState(true);
          triggerDateInputEvent('blur');

          setTimeout(() => {
            checkCalendarState(true, '', true);

            assert.equal(component.getValue(), date, 'Should set text field value');
            const widget = component.element.querySelector('.flatpickr-input').widget;
            assert.equal(widget.calendar.input.value, date, 'Should set flatpickr value');

            clickElem('refs.suffix[0]');

            setTimeout(() => {
              checkCalendarState(false);
              assert.equal(component.getValue(), date, 'Should save text field value');
              document.body.innerHTML = '';
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });

  it('Test Display mask', (done) => {
    const element = document.createElement('div');

    Formio.createForm(element, withDisplayAndInputMasks).then(form => {
      const textField = form.getComponent(['textField']);
      const textFieldDisplayMask = form.getComponent(['textFieldDisplayMask']);
      const textFieldDisplayAndInputMasks = form.getComponent(['textFieldDisplayAndInputMasks']);
      const textFieldDisplayAndInputMasksReverse = form.getComponent(['textFieldDisplayAndInputMasksReverse']);

      Harness.dispatchEvent(
        'input',
        form.element,
        '[name="data[textField]"',
        (input) => input.value = '123123',
      );
      Harness.dispatchEvent(
        'input',
        form.element,
        '[name="data[textFieldDisplayMask]"',
        (input) => input.value = '123123',
      );
      Harness.dispatchEvent(
        'input',
        form.element,
        '[name="data[textFieldDisplayAndInputMasks]"',
        (input) => input.value = '123123',
      );
      Harness.dispatchEvent(
        'input',
        form.element,
        '[name="data[textFieldDisplayAndInputMasksReverse]"',
        (input) => input.value = '123123',
      );

      setTimeout(() => {
        Harness.getInputValue(textField, 'data[textField]', '123-123');
        Harness.getInputValue(textFieldDisplayMask, 'data[textFieldDisplayMask]', '123-123');
        Harness.getInputValue(textFieldDisplayAndInputMasks, 'data[textFieldDisplayAndInputMasks]', '+1(23)-123');
        Harness.getInputValue(textFieldDisplayAndInputMasksReverse, 'data[textFieldDisplayAndInputMasksReverse]', '123-123');

        assert.equal(
          textField.dataValue,
          '123-123',
          'If only Input mask is set, it should affect both value and view',
        );
        assert.equal(
          textFieldDisplayMask.dataValue,
          '123123',
          'If only Display mask is set, it should affect only view',
        );
        assert.equal(
          textFieldDisplayAndInputMasks.dataValue,
          '123-123',
          'If both Input and Display masks are set, the Input mask should be applied to value',
        );
        assert.equal(
          textFieldDisplayAndInputMasksReverse.dataValue,
          '+1(23)-123',
          'If both Input and Display masks are set, the Input mask should be applied to value',
        );
        done();
      }, 200);
    }).catch(done);
  });

  it('Should render HTML', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputFormat = 'html';
    const element = document.createElement('div');

    Formio.createForm(element, form, {
      readOnly: true
    }).then(form => {
      form.setSubmission({
        data: {
          textField: '<b>HTML!</b>'
        }
      });
      setTimeout(() => {
        const textField = form.getComponent('textField');
        textField.loadRefs(element, {
          value: 'multiple'
        });
        assert.equal(textField.refs.value[0].innerHTML, '<b>HTML!</b>');
        done();
      }, 300);
    }).catch(done);
  });

  it('Should render plain text', (done) => {
    const form = _.cloneDeep(comp6);
    form.components[0].inputFormat = 'plain';
    const element = document.createElement('div');

    Formio.createForm(element, form, {
      readOnly: true
    }).then(form => {
      form.setSubmission({
        data: {
          textField: '<b>Plain!</b>'
        }
      });
      setTimeout(() => {
        const textField = form.getComponent('textField');
        assert.equal(textField.refs.input[0].value, '<b>Plain!</b>');
        done();
      }, 300);
    }).catch(done);
  });
});
