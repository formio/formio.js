"use strict";

require("core-js/modules/es.string.trim.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _TextField = _interopRequireDefault(require("./TextField"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

require("flatpickr");

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('TextField Component', function () {
  it('Should create a new TextField', function () {
    var textField = new _TextField.default({
      label: 'First Name',
      key: 'firstName',
      input: true,
      type: 'textfield'
    });

    _powerAssert.default.equal(textField.component.key, 'firstName');
  });
  it('Should build a TextField component', function () {
    return _harness.default.testCreate(_TextField.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 1);
    });
  });
  it('Should disable multiple mask selector if component is disabled', function (done) {
    _harness.default.testCreate(_TextField.default, _fixtures.comp4).then(function (component) {
      _harness.default.testElements(component, '[disabled]', 2);

      done();
    });
  });
  it('Should provide required validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        required: true
      }
    })).then(function (component) {
      return _harness.default.testInvalid(component, '', 'firstName', 'First Name is required').then(function () {
        return component;
      });
    }).then(function (component) {
      return _harness.default.testValid(component, 'te').then(function () {
        return component;
      });
    });
  });
  it('Should provide minWords validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        minWords: 2
      }
    })).then(function (component) {
      return _harness.default.testInvalid(component, 'test', 'firstName', 'First Name must have at least 2 words.').then(function () {
        return component;
      });
    }).then(function (component) {
      return _harness.default.testValid(component, 'te st').then(function () {
        return component;
      });
    });
  });
  it('Should correctly calculate remaining words', function (done) {
    _harness.default.testCreate(_TextField.default, _fixtures.comp5).then(function (component) {
      var inputEvent = new Event('input', {
        bubbles: true,
        cancelable: true
      });
      var element = component.refs.input[0];
      element.value = 'paper format A4';
      element.dispatchEvent(inputEvent);
      setTimeout(function () {
        _powerAssert.default.equal(component.refs.wordcount[0].textContent, '2 words remaining.');

        element.value = 'Hey, guys! We are here!!';
        element.dispatchEvent(inputEvent);
        setTimeout(function () {
          _powerAssert.default.equal(component.refs.wordcount[0].textContent, '0 words remaining.');

          element.value = ' Some   test   text  111 ';
          element.dispatchEvent(inputEvent);
          setTimeout(function () {
            _powerAssert.default.equal(component.refs.wordcount[0].textContent, '1 words remaining.');

            done();
          }, 300);
        }, 275);
      }, 250);
    });
  });
  it('Should provide maxWords validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        maxWords: 2
      }
    })).then(function (component) {
      return _harness.default.testInvalid(component, 'test test test', 'firstName', 'First Name must have no more than 2 words.').then(function () {
        return component;
      });
    }).then(function (component) {
      return _harness.default.testValid(component, 'te st').then(function () {
        return component;
      });
    });
  });
  it('Should provide minLength validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        minLength: 2
      }
    })).then(function (component) {
      return _harness.default.testInvalid(component, 't', 'firstName', 'First Name must have at least 2 characters.').then(function () {
        return component;
      });
    }).then(function (component) {
      return _harness.default.testValid(component, 'te').then(function () {
        return component;
      });
    });
  });
  it('Should provide maxLength validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        maxLength: 5
      }
    })).then(function (component) {
      return _harness.default.testInvalid(component, 'testte', 'firstName', 'First Name must have no more than 5 characters.').then(function () {
        return component;
      });
    }).then(function (component) {
      return _harness.default.testValid(component, 'te').then(function () {
        return component;
      });
    });
  });
  it('Should provide custom validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then(function (component) {
      return _harness.default.testInvalid(component, 'Joe', 'firstName', 'You cannot be Joe').then(function () {
        return component;
      });
    }).then(function (component) {
      return _harness.default.testValid(component, 'Tom').then(function () {
        return component;
      });
    });
  });
  it('Should provide one custom error message', function (done) {
    var formJson = {
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
    var element = document.createElement('div');

    _Formio.default.createForm(element, formJson).then(function (form) {
      form.submission = {
        data: {
          textField: 'textField'
        }
      };
      var textField = form.getComponent('textField');
      setTimeout(function () {
        _powerAssert.default.equal(textField.refs.messageContainer.children.length, 1);

        _powerAssert.default.equal(textField.refs.messageContainer.children[0].innerHTML, 'Custom Error Message');

        done();
      }, 300);
    }).catch(done);
  });
  it('Should provide json validation', function () {
    return _harness.default.testCreate(_TextField.default, _lodash.default.merge({}, _fixtures.comp2, {
      validate: {
        json: {
          'if': [{
            '===': [{
              var: 'data.firstName'
            }, 'Joe']
          }, true, 'You must be Joe']
        }
      }
    })).then(function (component) {
      return _harness.default.testInvalid(component, 'Tom', 'firstName', 'You must be Joe').then(function () {
        return component;
      });
    }).then(function (component) {
      return _harness.default.testValid(component, 'Joe').then(function () {
        return component;
      });
    });
  });
  it('Should provide validation of number input mask after setting value', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = '99/99-99.99:99,99';
    var validValues = ['', '99/99-99.99:99,99'];
    var invalidValues = ['99/99-99.99:99,,99', '99/99-99.99:99,9', '9999-99.99:99,,99', '99/99-99.99:9(9,9)9', '99999999#999999999', 'fffffff()f99/99-99.99:99,99', '77ff7777ff7777ff7777', '9/99-99.99999,99', '9/99-9/9.9/9:99,9/9', '99/99-a9.99:99,99', '99/99---.99:99,99', 'ddddddddddddddd', '9/99-9/9.9/9:99,9/9ddd', '9/99-99.99999,fffffff', '99/_9-99.9f9:99,9g9', 'A8/99-99.99:99,99'];

    var testValidity = function testValidity(values, valid, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var changed = component.setValue(value);
          var error = 'Text Field does not match the mask.';

          if (value) {
            _powerAssert.default.equal(changed, true, 'Should set value');
          }

          setTimeout(function () {
            if (valid) {
              _powerAssert.default.equal(!!component.error, false, 'Should not contain error');
            } else {
              _powerAssert.default.equal(!!component.error, true, 'Should contain error');

              _powerAssert.default.equal(component.error.message, error, 'Should contain error message');

              _powerAssert.default.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');

              _powerAssert.default.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length - 1]);
  });
  it('Should allow inputing only numbers and format input according to input mask', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = '99/99-99.99:99,99';
    var values = ['99/99-99.99:99,,99', '9999-99.99:999,,99', '99/99-99.99:9(9,9)9', '99999999999999999', 'ffffffff99/99-99.99:99,99', '99ff999999ff999ff9', '9/99-99.99999,999', '9/99-9/9.9/9:999,9/9', '99.99-a9.99:999,99', '99/99---.99:9999,99', '999999999999', '99999-9/9.9/9:99,9/9ddd', '9----99999-99.99999,fffffff', '999-9kkkk9.99999f9:99,9g9', 'A9/99-99.999:99,99'];

    var testFormatting = function testFormatting(values, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var input = component.refs.input[0];
          var inputEvent = new Event('input');
          input.value = value;
          input.dispatchEvent(inputEvent);
          setTimeout(function () {
            _powerAssert.default.equal(!!component.error, false, 'Should not contain error');

            _powerAssert.default.equal(component.getValue(), '99/99-99.99:99,99', 'Should set and format value');

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length - 1]);
  });
  it('Should provide validation for alphabetic input mask after setting value', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = 'a/A/a-a:a.a,aa';
    var validValues = ['', 'b/V/r-y:d.d,as', 'b/b/r-y:d.d,as'];
    var invalidValues = ['b/b/r-y:d.d', 'b/v/r-yCC:d.d,as', 'rD/F/R-y:d.d,DE', 'bv/Sr-y:d.d,as', '555555555555555', 'ssssEsssssssssssss', 'b/v/Rr-y:d$.d,a', '3/3/#r-y:d.d,as', '3/3/6-6&&:d...d,as', '5/5/5ee-55.5,5'];

    var testValidity = function testValidity(values, valid, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var changed = component.setValue(value);
          var error = 'Text Field does not match the mask.';

          if (value) {
            _powerAssert.default.equal(changed, true, 'Should set value');
          }

          setTimeout(function () {
            if (valid) {
              _powerAssert.default.equal(!!component.error, false, 'Should not contain error');
            } else {
              _powerAssert.default.equal(!!component.error, true, 'Should contain error');

              _powerAssert.default.equal(component.error.message, error, 'Should contain error message');

              _powerAssert.default.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');

              _powerAssert.default.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length - 1]);
  });
  it('Should allow inputing only letters and format input according to input mask', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = 'a/a/a-a:a.a,aa';
    var values = ['ssssSSSSSSS/sss-ss.s,ss', 'ss/sSss-sSSs.s,ss', 'ssSssssssSSSssssss', 's/sS/sss-s5555:sss.--s,s', '3/s3/Ss-s:ss.s,ssSsss', 'ssSs3/3s/s6-s6:s...s,s', 's5/5sSS/5s-5:sS---5.s5,s5sss'];

    var testFormatting = function testFormatting(values, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var input = component.refs.input[0];
          var inputEvent = new Event('input');
          input.value = value;
          input.dispatchEvent(inputEvent);
          setTimeout(function () {
            _powerAssert.default.equal(!!component.error, false, 'Should not contain error');

            _powerAssert.default.equal(component.getValue(), 's/s/s-s:s.s,ss', 'Should set and format value');

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length - 1]);
  });
  it('Should provide validation for alphanumeric input mask after setting value', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = '**/***.*-*,**';
    var validValues = ['', 'f4/D34.3-S,dd', 'gg/ggg.g-g,gg', 'DD/DDD.D-D,DD', '55/555.5-5,55'];
    var invalidValues = ['er432ff', 'rD5/F/R-y:d', '_=+dsds4', 'sFFFFF--------2', 'sd', 'sf__df', 'gg/ggg.g-g'];

    var testValidity = function testValidity(values, valid, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var changed = component.setValue(value);
          var error = 'Text Field does not match the mask.';

          if (value) {
            _powerAssert.default.equal(changed, true, 'Should set value');
          }

          setTimeout(function () {
            if (valid) {
              _powerAssert.default.equal(!!component.error, false, 'Should not contain error');
            } else {
              _powerAssert.default.equal(!!component.error, true, 'Should contain error');

              _powerAssert.default.equal(component.error.message, error, 'Should contain error message');

              _powerAssert.default.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');

              _powerAssert.default.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length - 1]);
  });
  it('Should allow inputing only letters and digits and format input according to input mask', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = '**/***.*-*,**';
    var values = [{
      value: 'ssssSSSSSSS/sss-ss.s,ss',
      expected: 'ss/ssS.S-S,SS'
    }, {
      value: 'ss/sSss-sSSs.s,ss',
      expected: 'ss/sSs.s-s,SS'
    }, {
      value: 'ssS666ssssssSSSssssss',
      expected: 'ss/S66.6-s,ss'
    }, {
      value: 's/sS/sss-s5555:sss.--s,s',
      expected: 'ss/Sss.s-s,55'
    }, {
      value: '3/s3/Ss-s:ss.s,ssSsss',
      expected: '3s/3Ss.s-s,ss'
    }, {
      value: 'ssSs3/3s/s6-s6:s...s,s',
      expected: 'ss/Ss3.3-s,s6'
    }, {
      value: 's5/5sSS/5s-5:sS---5.s5,s5sss',
      expected: 's5/5sS.S-5,s5'
    }];

    var testFormatting = function testFormatting(values, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var input = component.refs.input[0];
          var inputEvent = new Event('input');
          input.value = value.value;
          input.dispatchEvent(inputEvent);
          setTimeout(function () {
            _powerAssert.default.equal(!!component.error, false, 'Should not contain error');

            _powerAssert.default.equal(component.getValue(), value.expected, 'Should set and format value');

            if (_lodash.default.isEqual(value.value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length - 1].value);
  });
  it('Should provide validation for mixed input mask after setting value', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = '**/99-aa';
    var validValues = ['', '4r/34-fg', '46/34-yy', 'ye/56-op', 'We/56-op'];
    var invalidValues = ['te/56-Dp', 'te/E6-pp', 'tdddde/E6-pp', 'te/E6', 'te/E6-p', 'gdfgdfgdf', '43543', 'W'];

    var testValidity = function testValidity(values, valid, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var changed = component.setValue(value);
          var error = 'Text Field does not match the mask.';

          if (value) {
            _powerAssert.default.equal(changed, true, 'Should set value');
          }

          setTimeout(function () {
            if (valid) {
              _powerAssert.default.equal(!!component.error, false, 'Should not contain error');
            } else {
              _powerAssert.default.equal(!!component.error, true, 'Should contain error');

              _powerAssert.default.equal(component.error.message, error, 'Should contain error message');

              _powerAssert.default.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');

              _powerAssert.default.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length - 1]);
  });
  it('Should allow inputing only letters and digits and format input according to mixed input mask', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = '**/99-aa';
    var values = [{
      value: 'S67gf-+f34cfd',
      expected: 'S6/73-cf'
    }, {
      value: '56DDDfdsf23,DDdsf',
      expected: '56/23-ds'
    }, {
      value: '--fs344d.g234df',
      expected: 'fs/34-dg'
    }, {
      value: '000000000g234df',
      expected: '00/00-gd'
    }];

    var testFormatting = function testFormatting(values, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var input = component.refs.input[0];
          var inputEvent = new Event('input');
          input.value = value.value;
          input.dispatchEvent(inputEvent);
          setTimeout(function () {
            _powerAssert.default.equal(!!component.error, false, 'Should not contain error');

            _powerAssert.default.equal(component.getValue(), value.expected, 'Should set and format value');

            if (_lodash.default.isEqual(value.value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length - 1].value);
  });
  it('Should allow multiple masks', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    var tf = form.components[0];
    tf.allowMultipleMasks = true;
    tf.inputMasks = [{
      label: 'number',
      mask: '99-99'
    }, {
      label: 'letter',
      mask: 'aa.aa'
    }, {
      label: 'any',
      mask: '**/**'
    }];
    var masks = [{
      index: 0,
      mask: 'number',
      valueValid: ['33-33'],
      valueInvalid: ['Bd']
    }, {
      index: 1,
      mask: 'letter',
      valueValid: ['rr.dd'],
      valueInvalid: ['Nr-22']
    }, {
      index: 2,
      mask: 'any',
      valueValid: ['Dv/33'],
      valueInvalid: ['4/4']
    }];

    var testMask = function testMask(mask, valid, lastValue) {
      var values = valid ? mask.valueValid : mask.valueInvalid;

      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var changed = component.setValue({
            value: value,
            maskName: mask.mask
          });
          var error = 'Text Field does not match the mask.';

          if (value) {
            _powerAssert.default.equal(changed, true, 'Should set value');
          }

          setTimeout(function () {
            _powerAssert.default.equal(component.refs.select[0].options[mask.index].selected, true, 'Should select correct mask');

            _powerAssert.default.equal(component.getValue().maskName, mask.mask, 'Should apply correct mask');

            if (valid) {
              _powerAssert.default.equal(!!component.error, false, 'Should not contain error');
            } else {
              _powerAssert.default.equal(!!component.error, true, 'Should contain error');

              _powerAssert.default.equal(component.error.message, error, 'Should contain error message');

              _powerAssert.default.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');

              _powerAssert.default.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    _lodash.default.each(masks, function (mask, index) {
      testMask(mask, true);
      testMask(mask, false, index === masks.length - 1 ? mask.valueInvalid[mask.valueInvalid.length - 1] : undefined);
    });
  });
  it('Should provide validation of number input mask with low dash and placeholder char after setting value', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = '99_99/99';
    form.components[0].inputMaskPlaceholderChar = '.';
    var validValues = ['', '55_44/88'];
    var invalidValues = ['99 99 99', '44_44_55', '55555555'];

    var testValidity = function testValidity(values, valid, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var input = component.refs.input[0];

          _powerAssert.default.equal(input.placeholder, '.._../..', 'Should set placeholder using the char setting');

          var changed = component.setValue(value);
          var error = 'Text Field does not match the mask.';

          if (value) {
            _powerAssert.default.equal(changed, true, 'Should set value');
          }

          setTimeout(function () {
            if (valid) {
              _powerAssert.default.equal(!!component.error, false, 'Should not contain error');
            } else {
              _powerAssert.default.equal(!!component.error, true, 'Should contain error');

              _powerAssert.default.equal(component.error.message, error, 'Should contain error message');

              _powerAssert.default.equal(component.element.classList.contains('has-error'), true, 'Should contain error class');

              _powerAssert.default.equal(component.refs.messageContainer.textContent.trim(), error, 'Should show error');
            }

            if (_lodash.default.isEqual(value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testValidity(validValues, true);
    testValidity(invalidValues, false, invalidValues[invalidValues.length - 1]);
  });
  it('Should format input according to input mask with low dash when placeholder char is set', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputMask = '99_99/99';
    form.components[0].inputMaskPlaceholderChar = '.';
    var values = [{
      value: '4444444',
      expected: '44_44/44'
    }];

    var testFormatting = function testFormatting(values, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('textField');
          var input = component.refs.input[0];
          var inputEvent = new Event('input');
          input.value = value.value;
          input.dispatchEvent(inputEvent);
          setTimeout(function () {
            _powerAssert.default.equal(!!component.error, false, 'Should not contain error');

            _powerAssert.default.equal(component.getValue(), value.expected, 'Should set and format value');

            if (_lodash.default.isEqual(value.value, lastValue)) {
              done();
            }
          }, 300);
        }).catch(done);
      });
    };

    testFormatting(values, values[values.length - 1].value);
  });
  it('Should correctly count characters if character counter is enabled', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].showCharCount = true;
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textField');

      var inputValue = function inputValue(value) {
        var input = component.refs.input[0];
        var inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      var checkValue = function checkValue(value) {
        _powerAssert.default.equal(component.dataValue, value, 'Should set value');

        _powerAssert.default.equal(parseInt(component.refs.charcount[0].textContent), value.length, 'Should show correct chars number');

        _powerAssert.default.equal(component.refs.charcount[0].textContent, "".concat(value.length, " characters"), 'Should show correct message');
      };

      var value = 'test Value (@#!-"]) _ 23.,5}/*&&';
      inputValue(value);
      setTimeout(function () {
        checkValue(value);
        value = '';
        inputValue(value);
        setTimeout(function () {
          checkValue(value);
          value = '  ';
          inputValue(value);
          setTimeout(function () {
            checkValue(value);
            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });
  it('Should format value to uppercase', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].case = 'uppercase';
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textField');

      var inputValue = function inputValue(value) {
        var input = component.refs.input[0];
        var inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      var checkValue = function checkValue(value) {
        _powerAssert.default.equal(component.dataValue, value.toUpperCase(), 'Should format value to uppercase');

        _powerAssert.default.equal(component.getValue(), value.toUpperCase(), 'Should format value to uppercase');
      };

      var value = 'SoMe Value';
      inputValue(value);
      setTimeout(function () {
        checkValue(value);
        value = 'test 1 value 1';
        inputValue(value);
        setTimeout(function () {
          checkValue(value);
          value = '';
          inputValue(value);
          setTimeout(function () {
            checkValue(value);
            done();
          }, 100);
        }, 100);
      }, 100);
    }).catch(done);
  });
  it('Should format value to lowercase', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].case = 'lowercase';
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textField');

      var inputValue = function inputValue(value) {
        var input = component.refs.input[0];
        var inputEvent = new Event('input');
        input.value = value;
        input.dispatchEvent(inputEvent);
      };

      var checkValue = function checkValue(value) {
        _powerAssert.default.equal(component.dataValue, value.toLowerCase(), 'Should format value to lowercase (1)');

        _powerAssert.default.equal(component.getValue(), value.toLowerCase(), 'Should format value to lowercase (2)');
      };

      var value = 'SoMe Value';
      inputValue(value);
      setTimeout(function () {
        checkValue(value);
        value = 'TEST 1 VALUE (1)';
        inputValue(value);
        setTimeout(function () {
          checkValue(value);
          value = '';
          inputValue(value);
          setTimeout(function () {
            checkValue(value);
            done();
          }, 100);
        }, 100);
      }, 100);
    }).catch(done);
  });
  it('Should render and open/close calendar on click', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

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
      useLocaleSettings: false
    };
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textField');

      var clickElem = function clickElem(path) {
        var elem = _lodash.default.get(component, path);

        var clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      var checkCalendarState = function checkCalendarState(open) {
        var calendar = document.querySelector('.flatpickr-calendar');

        _powerAssert.default.equal(calendar.classList.contains('open'), open, "".concat(open ? 'Should open calendar' : 'Should close calendar'));
      };

      _powerAssert.default.equal(component.widget.settings.type, 'calendar', 'Should create calendar widget');

      clickElem('refs.suffix[0]');
      setTimeout(function () {
        checkCalendarState(true);
        clickElem('refs.suffix[0]');
        setTimeout(function () {
          checkCalendarState(false);
          clickElem('element.children[1].children[0].children[1]');
          setTimeout(function () {
            checkCalendarState(true);
            clickElem('refs.suffix[0]');
            setTimeout(function () {
              checkCalendarState(false);
              document.body.innerHTML = '';
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });
  it('Should set value into calendar', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

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
      useLocaleSettings: false
    };
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textField');

      var clickElem = function clickElem(path) {
        var elem = _lodash.default.get(component, path);

        var clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      var checkCalendarState = function checkCalendarState(open, selectedDay) {
        var calendar = document.querySelector('.flatpickr-calendar');

        _powerAssert.default.equal(calendar.classList.contains('open'), open, "".concat(open ? 'Should open calendar' : 'Should close calendar'));

        if (selectedDay) {
          var day = calendar.querySelector('.flatpickr-day.selected').textContent;

          _powerAssert.default.equal(day, selectedDay, 'Should select correct day');
        }
      };

      var date = '16-03-2031';
      component.setValue(date);
      setTimeout(function () {
        checkCalendarState(false);
        var widget = component.element.querySelector('.flatpickr-input').widget;

        _powerAssert.default.equal(component.getValue(), date, 'Should set text field value');

        _powerAssert.default.equal(widget.calendar.input.value, date, 'Should set flatpickr value');

        _powerAssert.default.equal(widget.calendar.currentMonth, 2, 'Should set correct month');

        _powerAssert.default.equal(widget.calendar.currentYear, 2031, 'Should set correct year');

        clickElem('refs.suffix[0]');
        setTimeout(function () {
          checkCalendarState(true);
          clickElem('refs.suffix[0]');
          setTimeout(function () {
            checkCalendarState(false);
            document.body.innerHTML = '';
            done();
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });
  it('Should allow manual input and set value on blur if calendar widget is enabled with allowed input', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

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
      useLocaleSettings: false
    };
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textField');

      var clickElem = function clickElem(path, element) {
        var elem = element || _lodash.default.get(component, path);

        var clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      var checkCalendarState = function checkCalendarState(open, selectedDay) {
        var calendar = document.querySelector('.flatpickr-calendar');

        _powerAssert.default.equal(calendar.classList.contains('open'), open, "".concat(open ? 'Should open calendar' : 'Should close calendar'));

        if (selectedDay) {
          var day = calendar.querySelector('.flatpickr-day.selected').textContent;

          _powerAssert.default.equal(day, selectedDay, 'Should select correct day');
        }
      };

      var triggerDateInputEvent = function triggerDateInputEvent(eventName, value) {
        var dateInput = component.element.querySelector('.form-control.input');
        var event = new Event(eventName);

        if (eventName === 'input') {
          dateInput.value = value;
        }

        dateInput.dispatchEvent(event);
      };

      triggerDateInputEvent('focus');
      setTimeout(function () {
        var date = '21-01-2001';
        checkCalendarState(true);
        triggerDateInputEvent('input', date);
        setTimeout(function () {
          checkCalendarState(true);
          triggerDateInputEvent('blur');
          setTimeout(function () {
            checkCalendarState(true, 21);

            _powerAssert.default.equal(component.getValue(), date, 'Should set text field value');

            var widget = component.element.querySelector('.flatpickr-input').widget;

            _powerAssert.default.equal(widget.calendar.input.value, date, 'Should set flatpickr value');

            _powerAssert.default.equal(widget.calendar.currentMonth, 0, 'Should set correct month');

            _powerAssert.default.equal(widget.calendar.currentYear, 2001, 'Should set correct year');

            clickElem('refs.suffix[0]');
            setTimeout(function () {
              checkCalendarState(false);

              _powerAssert.default.equal(component.getValue(), date, 'Should save text field value');

              document.body.innerHTML = '';
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });
  it('Should allow removing date value if calendar widget is enabled with allowed input', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

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
      useLocaleSettings: false
    };
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var component = form.getComponent('textField');

      var clickElem = function clickElem(path, element) {
        var elem = element || _lodash.default.get(component, path);

        var clickEvent = new Event('click');
        elem.dispatchEvent(clickEvent);
      };

      var checkCalendarState = function checkCalendarState(open, selectedDay, noSelectedDay) {
        var calendar = document.querySelector('.flatpickr-calendar');

        _powerAssert.default.equal(calendar.classList.contains('open'), open, "".concat(open ? 'Should open calendar' : 'Should close calendar'));

        if (selectedDay) {
          var day = calendar.querySelector('.flatpickr-day.selected').textContent;

          _powerAssert.default.equal(day, selectedDay, 'Should select correct day');
        }

        if (noSelectedDay) {
          var _day = calendar.querySelector('.flatpickr-day.selected');

          _powerAssert.default.equal(!!_day, false, 'Should not contain selected day');
        }
      };

      var triggerDateInputEvent = function triggerDateInputEvent(eventName, value) {
        var dateInput = component.element.querySelector('.form-control.input');
        var event = new Event(eventName);

        if (eventName === 'input') {
          dateInput.value = value;
        }

        dateInput.dispatchEvent(event);
      };

      var date = '12-03-2009';
      component.setValue(date);
      triggerDateInputEvent('focus');
      setTimeout(function () {
        _powerAssert.default.equal(component.getValue(), date, 'Should set text field value');

        date = '';
        checkCalendarState(true);
        triggerDateInputEvent('input', date);
        setTimeout(function () {
          checkCalendarState(true);
          triggerDateInputEvent('blur');
          setTimeout(function () {
            checkCalendarState(true, '', true);

            _powerAssert.default.equal(component.getValue(), date, 'Should set text field value');

            var widget = component.element.querySelector('.flatpickr-input').widget;

            _powerAssert.default.equal(widget.calendar.input.value, date, 'Should set flatpickr value');

            clickElem('refs.suffix[0]');
            setTimeout(function () {
              checkCalendarState(false);

              _powerAssert.default.equal(component.getValue(), date, 'Should save text field value');

              document.body.innerHTML = '';
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 300);
    }).catch(done);
  });
  it('Test Display mask', function (done) {
    var element = document.createElement('div');

    _Formio.default.createForm(element, _fixtures.withDisplayAndInputMasks).then(function (form) {
      var textField = form.getComponent(['textField']);
      var textFieldDisplayMask = form.getComponent(['textFieldDisplayMask']);
      var textFieldDisplayAndInputMasks = form.getComponent(['textFieldDisplayAndInputMasks']);
      var textFieldDisplayAndInputMasksReverse = form.getComponent(['textFieldDisplayAndInputMasksReverse']);

      _harness.default.dispatchEvent('input', form.element, '[name="data[textField]"', function (input) {
        return input.value = '123123';
      });

      _harness.default.dispatchEvent('input', form.element, '[name="data[textFieldDisplayMask]"', function (input) {
        return input.value = '123123';
      });

      _harness.default.dispatchEvent('input', form.element, '[name="data[textFieldDisplayAndInputMasks]"', function (input) {
        return input.value = '123123';
      });

      _harness.default.dispatchEvent('input', form.element, '[name="data[textFieldDisplayAndInputMasksReverse]"', function (input) {
        return input.value = '123123';
      });

      setTimeout(function () {
        _harness.default.getInputValue(textField, 'data[textField]', '123-123');

        _harness.default.getInputValue(textFieldDisplayMask, 'data[textFieldDisplayMask]', '123-123');

        _harness.default.getInputValue(textFieldDisplayAndInputMasks, 'data[textFieldDisplayAndInputMasks]', '+1(23)-123');

        _harness.default.getInputValue(textFieldDisplayAndInputMasksReverse, 'data[textFieldDisplayAndInputMasksReverse]', '123-123');

        _powerAssert.default.equal(textField.dataValue, '123-123', 'If only Input mask is set, it should affect both value and view');

        _powerAssert.default.equal(textFieldDisplayMask.dataValue, '123123', 'If only Display mask is set, it should affect only view');

        _powerAssert.default.equal(textFieldDisplayAndInputMasks.dataValue, '123-123', 'If both Input and Display masks are set, the Input mask should be applied to value');

        _powerAssert.default.equal(textFieldDisplayAndInputMasksReverse.dataValue, '+1(23)-123', 'If both Input and Display masks are set, the Input mask should be applied to value');

        done();
      }, 200);
    }).catch(done);
  });
  it('Should render HTML', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputFormat = 'html';
    var element = document.createElement('div');

    _Formio.default.createForm(element, form, {
      readOnly: true
    }).then(function (form) {
      form.setSubmission({
        data: {
          textField: '<b>HTML!</b>'
        }
      });
      setTimeout(function () {
        var textField = form.getComponent('textField');
        textField.loadRefs(element, {
          value: 'multiple'
        });

        _powerAssert.default.equal(textField.refs.value[0].innerHTML, '<b>HTML!</b>');

        done();
      }, 300);
    }).catch(done);
  });
  it('Should render plain text', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    form.components[0].inputFormat = 'plain';
    var element = document.createElement('div');

    _Formio.default.createForm(element, form, {
      readOnly: true
    }).then(function (form) {
      form.setSubmission({
        data: {
          textField: '<b>Plain!</b>'
        }
      });
      setTimeout(function () {
        var textField = form.getComponent('textField');

        _powerAssert.default.equal(textField.refs.input[0].value, '<b>Plain!</b>');

        done();
      }, 300);
    }).catch(done);
  });
});