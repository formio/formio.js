"use strict";

require("core-js/modules/es.string.trim.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _merge2 = _interopRequireDefault(require("lodash/merge"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _Number = _interopRequireDefault(require("./Number"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Number Component', function () {
  it('Should build an number component', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 1);
    });
  });
  it('Should format submissions for table view for French locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp4, {
      language: 'fr'
    }).then(function (component) {
      var value1 = component.getValueAsString(1);
      var value2 = component.getValueAsString(1.1);
      var value3 = component.getValueAsString(1.11);
      var value4 = component.getValueAsString(1111);
      var value5 = component.getValueAsString(1111111);
      var value6 = component.getValueAsString(-11111);

      _powerAssert.default.equal(value1, '1,00');

      _powerAssert.default.equal(value2, '1,10');

      _powerAssert.default.equal(value3, '1,11');

      _powerAssert.default.equal(value4, '1 111,00');

      _powerAssert.default.equal(value5, '1 111 111,00');

      _powerAssert.default.equal(value6, '-11 111,00');
    });
  });
  it('Should format sumbissions for table view for USA locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp4, {
      language: 'en-US'
    }).then(function (component) {
      var value1 = component.getValueAsString(1);
      var value2 = component.getValueAsString(1.1);
      var value3 = component.getValueAsString(1.11);
      var value4 = component.getValueAsString(1111);
      var value5 = component.getValueAsString(1111111);
      var value6 = component.getValueAsString(-11111);

      _powerAssert.default.equal(value1, '1.00');

      _powerAssert.default.equal(value2, '1.10');

      _powerAssert.default.equal(value3, '1.11');

      _powerAssert.default.equal(value4, '1,111.00');

      _powerAssert.default.equal(value5, '1,111,111.00');

      _powerAssert.default.equal(value6, '-11,111.00');
    });
  });
  it('Should format value on blur for USA locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp4, {
      language: 'en-US'
    }).then(function (component) {
      component.root = {
        onChange: function onChange() {},
        triggerChange: function triggerChange() {}
      };
      var blurEvent = new Event('blur');
      var inputEvent = new Event('input');
      var valueElement = component.element.querySelector('[name="data[number]"]');
      valueElement.value = 22222222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(valueElement.value, '22,222,222.00');

      valueElement.value = 22222222.2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(valueElement.value, '22,222,222.20');

      valueElement.value = 22222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(valueElement.value, '22,222.00');

      valueElement.value = 2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(valueElement.value, '2.00');
    });
  });
  it('Should format value on blur for French locale', function (done) {
    _harness.default.testCreate(_Number.default, _fixtures.comp4, {
      language: 'fr'
    }).then(function (component) {
      component.root = {
        onChange: function onChange() {},
        triggerChange: function triggerChange() {}
      };
      var blurEvent = new Event('blur');
      var inputEvent = new Event('input');
      var valueElement = component.element.querySelector('[name="data[number]"]');
      valueElement.value = 22222222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '22 222 222,00');

      valueElement.value = '22222222,2';
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '22 222 222,20');

      valueElement.value = 22222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '22 222,00');

      valueElement.value = 222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '222,00');

      valueElement.value = 2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '2,00');

      done();
    });
  });
  it('Should not change entered value on blur if multiple value is set', function (done) {
    _harness.default.testCreate(_Number.default, _fixtures.comp5).then(function (component) {
      component.root = {
        onChange: function onChange() {},
        triggerChange: function triggerChange() {}
      };
      var blurEvent = new Event('blur');
      var clickEvent = new Event('click');
      var addBtn = component.refs.addButton[0];
      addBtn.dispatchEvent(clickEvent);
      var firstValueElement = component.element.querySelectorAll('[name="data[number]"]')[0];
      var secondValueElement = component.element.querySelectorAll('[name="data[number]"]')[1];
      component.setValue([111, 222]);
      firstValueElement.dispatchEvent(blurEvent);
      secondValueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(component.dataValue[0], component.getValue()[0]);

      _powerAssert.default.equal(component.dataValue[1], component.getValue()[1]);

      done();
    });
  });
  it('Should limit decimals using step', function () {
    return _harness.default.testCreate(_Number.default, (0, _merge2.default)({}, _fixtures.comp2, {
      validate: {
        step: '0.001'
      }
    })).then(function (component) {
      _harness.default.testSetInput(component, 123456789.123456789, 123456789.123, '123,456,789.123');

      _harness.default.testSetInput(component, -123456789.123456789, -123456789.123, '-123,456,789.123');

      _harness.default.testSetInput(component, '123456789.123456789', 123456789.123, '123,456,789.123');

      _harness.default.testSetInput(component, '-123456789.123456789', -123456789.123, '-123,456,789.123');
    });
  });
  it('Should format submissions for table view for French locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'fr'
    }).then(function (component) {
      var value1 = component.getValueAsString(1);
      var value2 = component.getValueAsString(1.1);
      var value3 = component.getValueAsString(1.1111111);
      var value4 = component.getValueAsString(1111);
      var value5 = component.getValueAsString(1111111);
      var value6 = component.getValueAsString(-11111.1111);

      _powerAssert.default.equal(value1, '1');

      _powerAssert.default.equal(value2, '1,1');

      _powerAssert.default.equal(value3, '1,1111111');

      _powerAssert.default.equal(value4, '1 111');

      _powerAssert.default.equal(value5, '1 111 111');

      _powerAssert.default.equal(value6, '-11 111,1111');
    });
  });
  it('Should format sumissions for table view for USA locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'en-US'
    }).then(function (component) {
      var value1 = component.getValueAsString(1);
      var value2 = component.getValueAsString(1.1);
      var value3 = component.getValueAsString(1.1111111);
      var value4 = component.getValueAsString(1111);
      var value5 = component.getValueAsString(1111111);
      var value6 = component.getValueAsString(-11111.1111);

      _powerAssert.default.equal(value1, '1');

      _powerAssert.default.equal(value2, '1.1');

      _powerAssert.default.equal(value3, '1.1111111');

      _powerAssert.default.equal(value4, '1,111');

      _powerAssert.default.equal(value5, '1,111,111');

      _powerAssert.default.equal(value6, '-11,111.1111');
    });
  });
  it('Should format numbers for USA locale', function () {
    /* eslint-disable max-statements */
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'en-US'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, undefined, '', '');

      _harness.default.testSetInput(component, '', '', '');

      _harness.default.testSetInput(component, {}, '', '');

      _harness.default.testSetInput(component, [], '', '');

      _harness.default.testSetInput(component, [''], '', '');

      _harness.default.testSetInput(component, ['1'], 1, '1');

      _harness.default.testSetInput(component, 0, 0, '0');

      _harness.default.testSetInput(component, 1, 1, '1');

      _harness.default.testSetInput(component, -1, -1, '-1');

      _harness.default.testSetInput(component, 1000, 1000, '1,000');

      _harness.default.testSetInput(component, -1000, -1000, '-1,000');

      _harness.default.testSetInput(component, 1000.00, 1000, '1,000');

      _harness.default.testSetInput(component, -1000.00, -1000, '-1,000');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1,000.01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1,000.01');

      _harness.default.testSetInput(component, 1000.001, 1000.001, '1,000.001');

      _harness.default.testSetInput(component, -1000.001, -1000.001, '-1,000.001');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1,234,567,890.12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1,234,567,890.12');

      _harness.default.testSetInput(component, 12.123456789, 12.123456789, '12.123456789');

      _harness.default.testSetInput(component, -12.123456789, -12.123456789, '-12.123456789'); // These tests run into the maximum number of significant digits for floats.


      _harness.default.testSetInput(component, 123456789.123456789, 123456789.123456789, '123,456,789.12345679');

      _harness.default.testSetInput(component, -123456789.123456789, -123456789.123456789, '-123,456,789.12345679');

      _harness.default.testSetInput(component, '0', 0, '0');

      _harness.default.testSetInput(component, '1', 1, '1');

      _harness.default.testSetInput(component, '-1', -1, '-1');

      _harness.default.testSetInput(component, '1000', 1000, '1,000');

      _harness.default.testSetInput(component, '-1000', -1000, '-1,000');

      _harness.default.testSetInput(component, '1000.01', 1000.01, '1,000.01');

      _harness.default.testSetInput(component, '-1000.01', -1000.01, '-1,000.01');

      _harness.default.testSetInput(component, '1000.00', 1000, '1,000');

      _harness.default.testSetInput(component, '-1000.00', -1000, '-1,000');

      _harness.default.testSetInput(component, '1000.001', 1000.001, '1,000.001');

      _harness.default.testSetInput(component, '-1000.001', -1000.001, '-1,000.001');

      _harness.default.testSetInput(component, '1234567890.12', 1234567890.12, '1,234,567,890.12');

      _harness.default.testSetInput(component, '-1234567890.12', -1234567890.12, '-1,234,567,890.12');

      _harness.default.testSetInput(component, '12.123456789', 12.123456789, '12.123456789');

      _harness.default.testSetInput(component, '-12.123456789', -12.123456789, '-12.123456789');

      _harness.default.testSetInput(component, '123456789.123456789', 123456789.123456789, '123,456,789.12345679');

      _harness.default.testSetInput(component, '-123456789.123456789', -123456789.123456789, '-123,456,789.12345679');
    });
    /* eslint-enable max-statements */
  });
  it('Should format numbers for British locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'en-GB'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0');

      _harness.default.testSetInput(component, 1, 1, '1');

      _harness.default.testSetInput(component, -1, -1, '-1');

      _harness.default.testSetInput(component, 1000, 1000, '1,000');

      _harness.default.testSetInput(component, -1000, -1000, '-1,000');

      _harness.default.testSetInput(component, 1000.00, 1000, '1,000');

      _harness.default.testSetInput(component, -1000.00, -1000, '-1,000');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1,000.01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1,000.01');

      _harness.default.testSetInput(component, 1000.001, 1000.001, '1,000.001');

      _harness.default.testSetInput(component, -1000.001, -1000.001, '-1,000.001');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1,234,567,890.12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1,234,567,890.12');

      _harness.default.testSetInput(component, 12.123456789, 12.123456789, '12.123456789');

      _harness.default.testSetInput(component, -12.123456789, -12.123456789, '-12.123456789');
    });
  });
  it('Should format numbers for French locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'fr'
    }).then(function (component) {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0');

      _harness.default.testSetInput(component, 1, 1, '1');

      _harness.default.testSetInput(component, -1, -1, '-1');

      _harness.default.testSetInput(component, 1000, 1000, '1 000');

      _harness.default.testSetInput(component, -1000, -1000, '-1 000');

      _harness.default.testSetInput(component, 1000.00, 1000, '1 000');

      _harness.default.testSetInput(component, -1000.00, -1000, '-1 000');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1 000,01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1 000,01');

      _harness.default.testSetInput(component, 1000.001, 1000.001, '1 000,001');

      _harness.default.testSetInput(component, -1000.001, -1000.001, '-1 000,001');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12');

      _harness.default.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');

      _harness.default.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
    });
  });
  it('Should format numbers for German locale', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp2, {
      language: 'de'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0');

      _harness.default.testSetInput(component, 1, 1, '1');

      _harness.default.testSetInput(component, -1, -1, '-1');

      _harness.default.testSetInput(component, 1000, 1000, '1.000');

      _harness.default.testSetInput(component, -1000, -1000, '-1.000');

      _harness.default.testSetInput(component, 1000.00, 1000, '1.000');

      _harness.default.testSetInput(component, -1000.00, -1000, '-1.000');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1.000,01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1.000,01');

      _harness.default.testSetInput(component, 1000.001, 1000.001, '1.000,001');

      _harness.default.testSetInput(component, -1000.001, -1000.001, '-1.000,001');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1.234.567.890,12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1.234.567.890,12');

      _harness.default.testSetInput(component, 12.123456789, 12.123456789, '12,123456789');

      _harness.default.testSetInput(component, -12.123456789, -12.123456789, '-12,123456789');
    });
  });
  it('Should display default integer value', function () {
    return _harness.default.testCreate(_Number.default, _fixtures.comp3).then(function (number) {
      _powerAssert.default.deepEqual(_lodash.default.get(number, ['refs', 'input', '0', 'value']), '42');
    });
  });
  it('Should display default decimal value', function () {
    var TEST_VAL = 4.2;

    var comp = _lodash.default.cloneDeep(_fixtures.comp3);

    comp.defaultValue = TEST_VAL;
    comp.decimalLimit = 2;
    comp.requireDecimal = true;
    return _harness.default.testCreate(_Number.default, comp).then(function (number) {
      _powerAssert.default.deepEqual(_lodash.default.get(number, ['refs', 'input', '0', 'value']), '4.20');
    });
  });
  it('Should provide min/max validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    var validValues = [null, 20, 555, 34, 20.000001, 554.999];
    var invalidMin = [19.99, 0, 1, 0.34, -0.1, -20];
    var invalidMax = [555.00000001, 100000, 5555];

    var testValidity = function testValidity(values, valid, message, lastValue) {
      _lodash.default.each(values, function (value) {
        var element = document.createElement('div');

        _Formio.default.createForm(element, form, {
          language: 'en-US'
        }).then(function (form) {
          form.setPristine(false);
          var component = form.getComponent('number');
          var changed = component.setValue(value);
          var error = message;

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
    testValidity(invalidMin, false, 'Number cannot be less than 20.');
    testValidity(invalidMax, false, 'Number cannot be greater than 555.', invalidMax[invalidMax.length - 1]);
  });
  it('Should be able to switch between multiple and single values', function (done) {
    _harness.default.testCreate(_Number.default, _fixtures.comp5).then(function (component) {
      _powerAssert.default.equal(_lodash.default.isEqual(component.defaultValue, [null]), true);

      component.component.multiple = false;
      component.redraw().then(function () {
        _powerAssert.default.equal(component.defaultValue, null);

        done();
      });
    });
  }); // it('Should add trailing zeros on blur, if decimal required', (done) => {
  //   const comp = _.cloneDeep(comp3);
  //
  //   comp.decimalLimit = 2;
  //   comp.requireDecimal = true;
  //
  //   Harness.testCreate(NumberComponent, comp).then(number => {
  //     const testset = [
  //       // [inv, outv, display]
  //       ['42',        42,       '42.00'],
  //       ['42.1',      42.1,     '42.10'],
  //       ['42.01',     42.01,    '42.01'],
  //       ['4200',      4200,     '4200.00'],
  //       ['4200.4',    4200.4,   '4200.40'],
  //       ['4200.42',   4200.42,  '4200.42'],
  //       ['4200.',     4200,     '4200.00'],
  //       ['99999999.', 99999999, '99999999.00']
  //     ];
  //
  //     testset.forEach((set, index) => {
  //       try {
  //         Harness.testNumberBlur(number, ...set);
  //       }
  //       catch (err) {
  //         done(new Error(`Test case #${index}, set: ${set}, err: ${err.message}`));
  //       }
  //     });
  //
  //     done();
  //   }, done);
  // });
  //
  // it('Should add trailing zeros on blur, if decimal and delimiter is required', (done) => {
  //   const comp = _.cloneDeep(comp3);
  //
  //   comp.decimalLimit = 2;
  //   comp.requireDecimal = true;
  //   comp.delimiter = true;
  //
  //   /* eslint-disable max-statements */
  //   Harness.testCreate(NumberComponent, comp).then(number => {
  //     const testset = [
  //       // [inv, outv, display]
  //       ['42',        42,       '42.00'],
  //       ['42.1',      42.1,     '42.10'],
  //       ['42.01',     42.01,    '42.01'],
  //       ['4200',      4200,     '4,200.00'],
  //       ['4200.4',    4200.4,   '4,200.40'],
  //       ['4200.42',   4200.42,  '4,200.42'],
  //       ['4200.',     4200,     '4,200.00'],
  //       ['99999999.', 99999999, '99,999,999.00']
  //     ];
  //
  //     testset.forEach((set, index) => {
  //       try {
  //         Harness.testNumberBlur(number, ...set);
  //       }
  //       catch (err) {
  //         done(new Error(`Test case #${index}, set: ${set}, err: ${err.message}`));
  //       }
  //     });
  //
  //     done();
  //   }, done);
  // });
  //
  // it('Should add trailing zeros on blur with `multiple` flag', (done) => {
  //   Harness.testCreate(NumberComponent, comp4).then(number => {
  //     const testset = [
  //       ['42',        42,       '42.00'],
  //       ['42.1',      42.1,     '42.10'],
  //       ['42.01',     42.01,    '42.01'],
  //       ['4200',      4200,     '4,200.00'],
  //       ['4200.4',    4200.4,   '4,200.40'],
  //       ['4200.42',   4200.42,  '4,200.42'],
  //       ['4200.',     4200,     '4,200.00'],
  //       ['99999999.', 99999999, '99,999,999.00']
  //     ];
  //
  //     testset.forEach((set, index) => {
  //       try {
  //         assert.strictEqual(number.inputs.length, index + 1);
  //         Harness.testNumberBlur(number, ...set, index);
  //         number.addValue();
  //       }
  //       catch (err) {
  //         done(new Error(`Test case #${index}, set: ${set}, err: ${err.message}`));
  //       }
  //     });
  //
  //     done();
  //   }, done);
  // });
});