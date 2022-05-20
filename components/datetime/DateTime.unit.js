"use strict";

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.string.starts-with.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _DateTime = _interopRequireDefault(require("./DateTime"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _lodash = _interopRequireDefault(require("lodash"));

require("flatpickr");

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

describe('DateTime Component', function () {
  it('Should build a date time component', function () {
    return _harness.default.testCreate(_DateTime.default, _fixtures.comp1).then(function (dateTime) {
      return dateTime.destroy();
    });
  });
  it('Test formatting', function (done) {
    _harness.default.testCreate(_DateTime.default, _fixtures.comp2).then(function (dateTime) {
      var value = '2020-09-22T00:00:00';
      var formattedValue = '2020-09-22';
      dateTime.setValue(value);
      setTimeout(function () {
        _powerAssert.default.equal(dateTime.getValueAsString(value), formattedValue, 'getValueAsString should return formatted value');

        dateTime.destroy();
        done();
      }, 250);
    }).catch(done);
  });
  it('Should format value', function () {
    _fixtures.comp2.format = 'yyyy-MM-dd hh:mm a';
    return _harness.default.testCreate(_DateTime.default, _fixtures.comp2).then(function (dateTime) {
      _powerAssert.default.equal(dateTime.getValueAsString('2020-09-18T12:12:00'), '2020-09-18 12:12 PM');

      dateTime.destroy();
    });
  });
  it('Should allow manual input', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var blurEvent = new Event('blur');
      var value = '2021-04-13 7:00 PM';
      var expectedValueStart = '2021-04-13T19:00:00';
      var input = dateTime.element.querySelector('.input');
      input.value = value;
      input.dispatchEvent(blurEvent);
      setTimeout(function () {
        _powerAssert.default.equal(dateTime.getValue().startsWith(expectedValueStart), true);

        _powerAssert.default.equal(dateTime.dataValue.startsWith(expectedValueStart), true);

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });
  it('Should not allow manual input', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].allowInput = false;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var blurEvent = new Event('blur');
      var value = '2021-04-13 7:00 PM';
      var input = dateTime.element.querySelector('.input');
      input.value = value;
      input.dispatchEvent(blurEvent);
      setTimeout(function () {
        _powerAssert.default.equal(dateTime.getValue(), '');

        _powerAssert.default.equal(dateTime.dataValue, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });
  it('Should format date correctly', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    var formatsInitial = [{
      format: 'yyyy-dd-MM',
      inputValue: '2021-15-03 11:10 AM',
      setValue: '2021-03-15T00:00:00',
      expectedFormattedValue: '2021-15-03'
    }, {
      format: 'yyyy-dd',
      inputValue: '2021-15-03 11:10 AM',
      setValue: '2021-03-15T00:00:00',
      expectedFormattedValue: '2021-15'
    }, {
      format: 'yyyy',
      inputValue: '2021-15-03 11:10 AM',
      setValue: '2021-03-15T00:00:00',
      expectedFormattedValue: '2021'
    }, {
      format: 'dd-MM-yyyy',
      inputValue: '15-03-2021 11:10 AM',
      setValue: '2021-03-15T00:00:00',
      expectedFormattedValue: '15-03-2021'
    }, {
      format: 'MM-dd',
      inputValue: '03-15-2021 11:10 AM',
      setValue: '2021-03-15T00:00:00',
      expectedFormattedValue: '03-15'
    }, {
      format: 'dd-MM',
      inputValue: '15-03-2021 11:10 AM',
      setValue: '2021-03-15T00:00:00',
      expectedFormattedValue: '15-03'
    }, {
      format: 'MM-dd-yyyy',
      inputValue: '03-15-2021 11:10 AM',
      setValue: '2021-03-15T00:00:00',
      expectedFormattedValue: '03-15-2021'
    }, {
      format: 'yyyy-MM-dd',
      inputValue: '2021-03-15 11:10 AM',
      setValue: '2021-03-15T00:00:00',
      expectedFormattedValue: '2021-03-15'
    }, {
      format: 'dd-MM-yyyy hh:mm',
      inputValue: '15-03-2021 11:10 AM',
      setValue: '2021-03-15T11:10:00',
      expectedFormattedValue: '15-03-2021 11:10'
    }, {
      format: 'yyyy-MM-dd a',
      inputValue: '2021-03-15 PM',
      setValue: '2021-03-15T12:00:00',
      expectedFormattedValue: '2021-03-15 PM'
    }, {
      format: 'hh',
      inputValue: '11:10 AM',
      setValue: '2021-01-01T11:00:00',
      expectedFormattedValue: '11'
    }, {
      format: 'hh:mm a',
      inputValue: '11:10 AM 34',
      setValue: '2021-01-01T11:10:00',
      expectedFormattedValue: '11:10 AM'
    }, {
      format: 'mm',
      inputValue: '11:10 AM',
      setValue: '2021-01-01T00:11:00',
      expectedFormattedValue: '11'
    }];

    var getAllFormats = function getAllFormats(formats) {
      var separators = ['.', '/'];
      var formatsWithDiffSeparators = separators.reduce(function (result, separator) {
        var formatWithNewSeparator = formats.filter(function (format) {
          return format.format.split('-').length > 1;
        }).map(function (format) {
          return _objectSpread(_objectSpread({}, format), {}, {
            format: format.format.split('-').join(separator),
            inputValue: format.inputValue.split('-').join(separator),
            expectedFormattedValue: format.expectedFormattedValue.split('-').join(separator)
          });
        });
        return [].concat(_toConsumableArray(result), _toConsumableArray(formatWithNewSeparator));
      }, []);
      return [].concat(_toConsumableArray(formats), _toConsumableArray(formatsWithDiffSeparators));
    };

    var formats = getAllFormats(formatsInitial);
    var formComponents = [];
    formats.forEach(function (format, index) {
      var comp = _lodash.default.cloneDeep(form.components[0]);

      comp.format = format.format;
      comp.widget.format = format.format;
      comp.key = comp.key + index;
      formComponents.push(comp);
    });
    form.components = formComponents;

    _Formio.default.createForm(element, form).then(function (form) {
      form.components.forEach(function (comp, index) {
        comp.setValue(formats[index].setValue);
      });
      setTimeout(function () {
        form.components.forEach(function (comp, index) {
          var input = comp.element.querySelector('.input');

          _powerAssert.default.equal(input.value, formats[index].expectedFormattedValue, 'Should format date/time value after setting value');

          var blurEvent = new Event('blur');
          input.value = formats[index].inputValue;
          input.dispatchEvent(blurEvent);
        });
        setTimeout(function () {
          form.components.forEach(function (comp, index) {
            var input = comp.element.querySelector('.input');

            _powerAssert.default.equal(input.value, formats[index].expectedFormattedValue, 'Should format date/time value after inputting value');
          });
          document.innerHTML = '';
          done();
        }, 300);
      }, 300);
    }).catch(done);
  }).timeout(4000);
  it('Should disable weekends', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].datePicker.disableWeekends = true;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;

      _powerAssert.default.equal(calendar.config.disableWeekends, true);

      document.innerHTML = '';
      done();
    }).catch(done);
  });
  it('Should disable weekdays', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].datePicker.disableWeekdays = true;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;

      _powerAssert.default.equal(calendar.config.disableWeekdays, true);

      document.innerHTML = '';
      done();
    }).catch(done);
  });
  it('Should disable time', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].enableTime = false;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;

      _powerAssert.default.equal(calendar.config.enableTime, false);

      _powerAssert.default.equal(!!calendar.timeContainer, false);

      document.innerHTML = '';
      done();
    }).catch(done);
  });
  it('Should disable date', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].enableDate = false;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;

      _powerAssert.default.equal(!!calendar.daysContainer, false);

      document.innerHTML = '';
      done();
    }).catch(done);
  });
  it('Should enable time', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].enableTime = true;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;

      _powerAssert.default.equal(calendar.config.enableTime, true);

      _powerAssert.default.equal(!!calendar.timeContainer, true);

      document.innerHTML = '';
      done();
    }).catch(done);
  });
  it('Should enable date', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].enableDate = true;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;

      _powerAssert.default.equal(calendar.config.enableDate, true);

      _powerAssert.default.equal(!!calendar.daysContainer, true);

      document.innerHTML = '';
      done();
    }).catch(done);
  });
  it('Should not input the date that is disabled', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].datePicker.disable = '2021-04-15';

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var input = dateTime.element.querySelector('.input');
      var blurEvent = new Event('blur');
      input.value = '2021-04-15';
      input.dispatchEvent(blurEvent);
      setTimeout(function () {
        var input = dateTime.element.querySelector('.input');

        _powerAssert.default.equal(input.value, '');

        _powerAssert.default.equal(dateTime.dataValue, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });
  it('Should not input the date that is in disabled range', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].datePicker.disable = '2021-04-15-2021-04-20';

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var input = dateTime.element.querySelector('.input');
      var blurEvent = new Event('blur');
      input.value = '2021-04-17';
      input.dispatchEvent(blurEvent);
      setTimeout(function () {
        var input = dateTime.element.querySelector('.input');

        _powerAssert.default.equal(input.value, '');

        _powerAssert.default.equal(dateTime.dataValue, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });
  it('Should not allow inputting the date that meets condition of "custom disabled date"', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].datePicker.disableFunction = 'date.getDay() === 2';

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var input = dateTime.element.querySelector('.input');
      var blurEvent = new Event('blur');
      input.value = '2021-04-06';
      input.dispatchEvent(blurEvent);
      setTimeout(function () {
        var input = dateTime.element.querySelector('.input');

        _powerAssert.default.equal(input.value, '');

        _powerAssert.default.equal(dateTime.dataValue, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });
  it('Should not allow inputting the date if it is out of min/max date range', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].datePicker.minDate = '2021-04-04T12:00:00';
    form.components[0].datePicker.maxDate = '2021-04-18T12:00:00';

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var input = dateTime.element.querySelector('.input');
      var blurEvent = new Event('blur');
      input.value = '2020-04-03';
      input.dispatchEvent(blurEvent);
      setTimeout(function () {
        var input = dateTime.element.querySelector('.input');

        _powerAssert.default.equal(input.value, '');

        _powerAssert.default.equal(dateTime.dataValue, '');

        var blurEvent = new Event('blur');
        input.value = '2022-04-13';
        input.dispatchEvent(blurEvent);
        setTimeout(function () {
          var input = dateTime.element.querySelector('.input');

          _powerAssert.default.equal(input.value, '');

          _powerAssert.default.equal(dateTime.dataValue, '');

          document.innerHTML = '';
          done();
        }, 300);
      }, 300);
    }).catch(done);
  });
  it('Should set hour and minutes step', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].timePicker = {
      hourStep: 3,
      minuteStep: 10
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;

      _powerAssert.default.equal(calendar.config.minuteIncrement, 10);

      _powerAssert.default.equal(calendar.config.hourIncrement, 3);

      document.innerHTML = '';
      done();
    }).catch(done);
  });
  it('Should allow inputting 24h time', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp3);

    var element = document.createElement('div');
    form.components[0].timePicker = {
      showMeridian: false
    };
    form.components[0].widget['time_24hr'] = true;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var input = dateTime.element.querySelector('.input');
      var blurEvent = new Event('blur');
      input.value = '2020-04-03 22:11';
      input.dispatchEvent(blurEvent);
      setTimeout(function () {
        var input = dateTime.element.querySelector('.input');

        _powerAssert.default.equal(input.value, '2020-04-03 22:11');

        _powerAssert.default.equal(dateTime.dataValue.startsWith('2020-04-03T22:11:00'), true);

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });
  it('Should not set value if it does not meet minDate validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp5);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      dateTime.setValue('2021-05-01T09:00:00');
      setTimeout(function () {
        var input = dateTime.element.querySelector('.input');

        _powerAssert.default.equal(input.value, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });
  it('Should set value in readOnly mode even if it does not meet current minDate validation conditions', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp5);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form, {
      readOnly: true
    }).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      dateTime.setValue('2021-05-01T09:00:00');
      setTimeout(function () {
        var input = dateTime.element.querySelector('.input');

        _powerAssert.default.equal(input.value, '05/01/21');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });
  it('Should save hours and minutes values on first change', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp6);

    var element = document.createElement('div');
    form.components[0].enableDate = false;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      var blurEvent = new Event('blur');
      var input = dateTime.element.querySelector('.input');
      input.dispatchEvent(blurEvent);
      setTimeout(function () {
        var calendar = dateTime.element.querySelector('.flatpickr-input').widget.calendar;
        calendar._input.value = '7:00 PM';
        var expectedValue = 'T19:00:00';

        calendar._input.dispatchEvent(blurEvent);

        setTimeout(function () {
          _powerAssert.default.equal(dateTime.dataValue.includes(expectedValue), true);

          document.innerHTML = '';
          done();
        }, 200);
      }, 200);
    }).catch(done);
  });
  it('Should provide correct value after submission', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp7);

    var element = document.createElement('div');
    form.components[0].enableTime = false;

    _Formio.default.createForm(element, form).then(function (form) {
      var dateTime = form.getComponent('dateTime');
      dateTime.setValue('2022-12-21');
      setTimeout(function () {
        var submit = form.getComponent('submit');
        var clickEvent = new Event('click');
        var submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);
        setTimeout(function () {
          _powerAssert.default.equal(dateTime.dataValue, '2022-12-21');

          done();
        }, 200);
      }, 200);
    }).catch(done);
  }); // it('Test Shortcut Buttons', (done) => {
  //   // eslint-disable-next-line no-debugger
  //   debugger;
  //   window.flatpickr = Flatpickr;
  //   window.ShortcutButtonsPlugin = ShortcutButtonsPlugin;
  //   const formElement = document.createElement('div');
  //   const form = new Webform(formElement);
  //   form.setForm({ display: 'form', type: 'form', components: [comp2] })
  //     .then(() => {
  //       const dateTime = form.components[0];
  //       const buttonsWrappers = document.querySelectorAll('.shortcut-buttons-flatpickr-wrapper');
  //       const shortcutButtons = buttonsWrappers[buttonsWrappers.length - 1].querySelectorAll('.shortcut-buttons-flatpickr-button');
  //       assert.equal(shortcutButtons.length, 1);
  //       const input = dateTime.refs.input[0];
  //       Harness.clickElement(dateTime, shortcutButtons[0]);
  //       setTimeout(() => {
  //         input.widget.calendar.close();
  //         setTimeout(() => {
  //           assert.equal(form.data.date, '2020-10-10T00:00:00+00:00');
  //           dateTime.destroy();
  //           done();
  //         }, 250);
  //       }, 150);
  //     }).catch(done);
  // });
});