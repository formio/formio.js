"use strict";

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Currency = _interopRequireDefault(require("./Currency"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Currency Component', function () {
  before(function (done) {
    // Need to polyfill some Intl.locale support, since node doesn't include it in standard builds
    require('../../../test/numberFormatPolyfill');

    done();
  });
  it('Should build a currency component', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'input[type="text"]', 1);
    });
  });
  it('Should place a caret between the period and the underline.', function (done) {
    _harness.default.testCreate(_Currency.default, _fixtures.comp3, {
      language: 'en-US'
    }).then(function (component) {
      var inputEvent = new Event('input');
      var currencyElement = component.element.querySelector('[name="data[currency]"]');
      currencyElement.value = 42;
      currencyElement.dispatchEvent(inputEvent);

      _powerAssert.default.equal(currencyElement.value, '$42');

      currencyElement.value = '.';
      currencyElement.dispatchEvent(inputEvent);
      setTimeout(function () {
        _powerAssert.default.equal(currencyElement.selectionStart, 3);

        done();
      }, 200);
    });
  });
  it('Should format value on blur for USA locale', function (done) {
    _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'en-US'
    }).then(function (component) {
      component.root = {
        onChange: function onChange() {},
        triggerChange: function triggerChange() {}
      };
      var blurEvent = new Event('blur');
      var inputEvent = new Event('input');
      var valueElement = component.element.querySelector('[name="data[money]"]');
      valueElement.value = 22222222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(valueElement.value, '$22,222,222.00');

      valueElement.value = 22222222.2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(valueElement.value, '$22,222,222.20');

      valueElement.value = 22222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(valueElement.value, '$22,222.00');

      valueElement.value = 222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(valueElement.value, '$222.00');

      valueElement.value = 2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(valueElement.value, '$2.00');

      done();
    });
  });
  it('Should format value on blur for French locale', function (done) {
    _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'fr'
    }).then(function (component) {
      component.root = {
        onChange: function onChange() {},
        triggerChange: function triggerChange() {}
      };
      var blurEvent = new Event('blur');
      var inputEvent = new Event('input');
      var valueElement = component.element.querySelector('[name="data[money]"]');
      valueElement.value = 22222222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '22 222 222,00 $US');

      valueElement.value = '22222222,2';
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '22 222 222,20 $US');

      valueElement.value = 22222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '22 222,00 $US');

      valueElement.value = 222;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '222,00 $US');

      valueElement.value = 2;
      valueElement.dispatchEvent(inputEvent);
      valueElement.dispatchEvent(blurEvent);

      _powerAssert.default.deepEqual(valueElement.value, '2,00 $US');

      done();
    });
  });
  it('Should not change entered value on blur if multiple value is set', function (done) {
    _harness.default.testCreate(_Currency.default, _fixtures.comp2).then(function (component) {
      component.root = {
        onChange: function onChange() {},
        triggerChange: function triggerChange() {}
      };
      var blurEvent = new Event('blur');
      var clickEvent = new Event('click');
      var addBtn = component.refs.addButton[0];
      addBtn.dispatchEvent(clickEvent);
      var firstValueElement = component.element.querySelectorAll('[name="data[currency]"]')[0];
      var secondValueElement = component.element.querySelectorAll('[name="data[currency]"]')[1];
      component.setValue([111, 222]);
      firstValueElement.dispatchEvent(blurEvent);
      secondValueElement.dispatchEvent(blurEvent);

      _powerAssert.default.equal(component.dataValue[0], component.getValue()[0]);

      _powerAssert.default.equal(component.dataValue[1], component.getValue()[1]);

      done();
    });
  });
  it('Should format currency submissions for table view for French locale', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'fr'
    }).then(function (component) {
      var value1 = component.getValueAsString(1);
      var value2 = component.getValueAsString(1.1);
      var value3 = component.getValueAsString(1.11);
      var value4 = component.getValueAsString(1111);
      var value5 = component.getValueAsString(1111111);
      var value6 = component.getValueAsString(-11111);

      _powerAssert.default.equal(value1, '1,00 $US');

      _powerAssert.default.equal(value2, '1,10 $US');

      _powerAssert.default.equal(value3, '1,11 $US');

      _powerAssert.default.equal(value4, '1 111,00 $US');

      _powerAssert.default.equal(value5, '1 111 111,00 $US');

      _powerAssert.default.equal(value6, '-11 111,00 $US');
    });
  });
  it('Should format currency sumbissions for table view for USA locale', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'en-US'
    }).then(function (component) {
      var value1 = component.getValueAsString(1);
      var value2 = component.getValueAsString(1.1);
      var value3 = component.getValueAsString(1.11);
      var value4 = component.getValueAsString(1111);
      var value5 = component.getValueAsString(1111111);
      var value6 = component.getValueAsString(-11111);

      _powerAssert.default.equal(value1, '$1.00');

      _powerAssert.default.equal(value2, '$1.10');

      _powerAssert.default.equal(value3, '$1.11');

      _powerAssert.default.equal(value4, '$1,111.00');

      _powerAssert.default.equal(value5, '$1,111,111.00');

      _powerAssert.default.equal(value6, '-$11,111.00');
    });
  });
  it('Should add trailing zeros', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'en-US'
    }).then(function (component) {
      _powerAssert.default.equal(component.addZerosAndFormatValue(null));

      _powerAssert.default.equal(component.addZerosAndFormatValue('3'), '3.00');

      _powerAssert.default.equal(component.addZerosAndFormatValue('3.1'), '3.10');

      _powerAssert.default.equal(component.addZerosAndFormatValue('-3'), '-3.00');

      _powerAssert.default.equal(component.addZerosAndFormatValue('$3'), '$3.00');

      _powerAssert.default.equal(component.addZerosAndFormatValue('-$3'), '-$3.00');

      _powerAssert.default.equal(component.addZerosAndFormatValue('$3.3'), '$3.30');

      _powerAssert.default.equal(component.addZerosAndFormatValue('$3.33'), '$3.33');
    });
  });
  it('Should set values with trailing zeros', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'en-US'
    }).then(function (component) {
      _powerAssert.default.equal(component.formatValue(null), null);

      _powerAssert.default.equal(component.formatValue('0'), '0.00');

      _powerAssert.default.equal(component.formatValue('3'), '3.00');

      _powerAssert.default.equal(component.formatValue('3.3'), '3.30');

      _powerAssert.default.equal(component.formatValue('3.33'), '3.33');
    });
  });
  it('Should format currency for USA locale', function () {
    /* eslint-disable max-statements */
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'en-US'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, undefined, '', '');

      _harness.default.testSetInput(component, {}, '', '');

      _harness.default.testSetInput(component, [], '', '');

      _harness.default.testSetInput(component, [''], '', '');

      _harness.default.testSetInput(component, ['1'], 1, '$1.00');

      _harness.default.testSetInput(component, ['$1.00'], 1, '$1.00');

      _harness.default.testSetInput(component, 0, 0, '$0.00');

      _harness.default.testSetInput(component, 1.00, 1, '$1.00');

      _harness.default.testSetInput(component, -1.00, -1, '-$1.00');

      _harness.default.testSetInput(component, 1, 1, '$1.00');

      _harness.default.testSetInput(component, -1, -1, '-$1.00');

      _harness.default.testSetInput(component, 1000, 1000, '$1,000.00');

      _harness.default.testSetInput(component, -1000, -1000, '-$1,000.00');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '$1,000.01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-$1,000.01');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '$1,234,567,890.12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-$1,234,567,890.12');

      _harness.default.testSetInput(component, 123456789.123456789, 123456789.12, '$123,456,789.12');

      _harness.default.testSetInput(component, -123456789.123456789, -123456789.12, '-$123,456,789.12');

      _harness.default.testSetInput(component, '0', 0, '$0.00');

      _harness.default.testSetInput(component, '1.00', 1, '$1.00');

      _harness.default.testSetInput(component, '-1.00', -1, '-$1.00');

      _harness.default.testSetInput(component, '1', 1, '$1.00');

      _harness.default.testSetInput(component, '-1', -1, '-$1.00');

      _harness.default.testSetInput(component, '1000', 1000, '$1,000.00');

      _harness.default.testSetInput(component, '-1000', -1000, '-$1,000.00');

      _harness.default.testSetInput(component, '1000.01', 1000.01, '$1,000.01');

      _harness.default.testSetInput(component, '-1000.01', -1000.01, '-$1,000.01');

      _harness.default.testSetInput(component, '1234567890.12', 1234567890.12, '$1,234,567,890.12');

      _harness.default.testSetInput(component, '-1234567890.12', -1234567890.12, '-$1,234,567,890.12');

      _harness.default.testSetInput(component, '123456789.123456789', 123456789.12, '$123,456,789.12');

      _harness.default.testSetInput(component, '-123456789.123456789', -123456789.12, '-$123,456,789.12');

      _harness.default.testSetInput(component, '$0', 0, '$0.00');

      _harness.default.testSetInput(component, '$_', 0, '$0.00');

      _harness.default.testSetInput(component, '-$_', 0, '$0.00');

      _harness.default.testSetInput(component, '$1.00', 1, '$1.00');

      _harness.default.testSetInput(component, '-$1.00', -1, '-$1.00');

      _harness.default.testSetInput(component, '$1', 1, '$1.00');

      _harness.default.testSetInput(component, '-$1', -1, '-$1.00');

      _harness.default.testSetInput(component, '$1000', 1000, '$1,000.00');

      _harness.default.testSetInput(component, '-$1000', -1000, '-$1,000.00');

      _harness.default.testSetInput(component, '$1000.01', 1000.01, '$1,000.01');

      _harness.default.testSetInput(component, '-$1000.01', -1000.01, '-$1,000.01');

      _harness.default.testSetInput(component, '$1234567890.12', 1234567890.12, '$1,234,567,890.12');

      _harness.default.testSetInput(component, '-$1234567890.12', -1234567890.12, '-$1,234,567,890.12');

      _harness.default.testSetInput(component, '$123456789.123456789', 123456789.12, '$123,456,789.12');

      _harness.default.testSetInput(component, '-$123456789.123456789', -123456789.12, '-$123,456,789.12');
    });
    /* eslint-enable max-statements */
  });
  it('Should format currency for British locale', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'en-GB'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, 'US$0.00');

      _harness.default.testSetInput(component, 1.00, 1, 'US$1.00');

      _harness.default.testSetInput(component, -1.00, -1, '-US$1.00');

      _harness.default.testSetInput(component, 1, 1, 'US$1.00');

      _harness.default.testSetInput(component, -1, -1, '-US$1.00');

      _harness.default.testSetInput(component, 1000, 1000, 'US$1,000.00');

      _harness.default.testSetInput(component, -1000, -1000, '-US$1,000.00');

      _harness.default.testSetInput(component, 1000.01, 1000.01, 'US$1,000.01');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-US$1,000.01');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, 'US$1,234,567,890.12');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-US$1,234,567,890.12');

      _harness.default.testSetInput(component, 123456789.123456789, 123456789.12, 'US$123,456,789.12');

      _harness.default.testSetInput(component, -123456789.123456789, -123456789.12, '-US$123,456,789.12');
    });
  });
  it('Should format currency for French locale', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'fr'
    }).then(function (component) {
      // The spaces in these tests are a weird unicode space so be careful duplicating the tests.
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0,00 $US');

      _harness.default.testSetInput(component, 1.00, 1, '1,00 $US');

      _harness.default.testSetInput(component, -1.00, -1, '-1,00 $US');

      _harness.default.testSetInput(component, 1, 1, '1,00 $US');

      _harness.default.testSetInput(component, -1, -1, '-1,00 $US');

      _harness.default.testSetInput(component, 1000, 1000, '1 000,00 $US');

      _harness.default.testSetInput(component, -1000, -1000, '-1 000,00 $US');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1 000,01 $US');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1 000,01 $US');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1 234 567 890,12 $US');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1 234 567 890,12 $US');

      _harness.default.testSetInput(component, 1234567890.123456789, 1234567890.12, '1 234 567 890,12 $US');

      _harness.default.testSetInput(component, -1234567890.123456789, -1234567890.12, '-1 234 567 890,12 $US');
    });
  });
  it('Should format currency for German locale', function () {
    return _harness.default.testCreate(_Currency.default, _fixtures.comp1, {
      language: 'de'
    }).then(function (component) {
      _harness.default.testSetInput(component, null, '', '');

      _harness.default.testSetInput(component, 0, 0, '0,00 $');

      _harness.default.testSetInput(component, 1.00, 1.00, '1,00 $');

      _harness.default.testSetInput(component, -1.00, -1.00, '-1,00 $');

      _harness.default.testSetInput(component, 1, 1, '1,00 $');

      _harness.default.testSetInput(component, -1, -1, '-1,00 $');

      _harness.default.testSetInput(component, 1000, 1000, '1.000,00 $');

      _harness.default.testSetInput(component, -1000, -1000, '-1.000,00 $');

      _harness.default.testSetInput(component, 1000.01, 1000.01, '1.000,01 $');

      _harness.default.testSetInput(component, -1000.01, -1000.01, '-1.000,01 $');

      _harness.default.testSetInput(component, 1234567890.12, 1234567890.12, '1.234.567.890,12 $');

      _harness.default.testSetInput(component, -1234567890.12, -1234567890.12, '-1.234.567.890,12 $');

      _harness.default.testSetInput(component, 1234567890.123456789, 1234567890.12, '1.234.567.890,12 $');

      _harness.default.testSetInput(component, -1234567890.123456789, -1234567890.12, '-1.234.567.890,12 $');
    });
  });
});