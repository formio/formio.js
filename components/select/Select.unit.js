"use strict";

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.string.ends-with.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _cloneDeep = _interopRequireDefault(require("lodash/cloneDeep"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _Select = _interopRequireDefault(require("./Select"));

var _chai = require("chai");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Formio = _interopRequireDefault(require("./../../Formio"));

var _lodash = _interopRequireDefault(require("lodash"));

var _fixtures = require("./fixtures");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

describe('Select Component', function () {
  it('should not stringify select option value', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp6).then(function (component) {
      component.setValue({
        value: 'a',
        label: 'A'
      });
      setTimeout(function () {
        _powerAssert.default.equal(component.choices._currentState.items[0].value.value, 'a');

        _powerAssert.default.equal(_typeof(component.choices._currentState.items[0].value), 'object');

        _powerAssert.default.equal(component.dataValue.value, 'a');

        _powerAssert.default.equal(_typeof(component.dataValue), 'object');

        done();
      }, 100);
    });
  });
  it('should return string value for different value types', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp4).then(function (component) {
      var stringValue = component.asString(true);
      var stringValue1 = component.asString(11);
      var stringValue2 = component.asString('test');
      var stringValue3 = component.asString(12);

      _powerAssert.default.equal(stringValue, '<span>true</span>');

      _powerAssert.default.equal(stringValue1, '<span>11</span>');

      _powerAssert.default.equal(stringValue2, '<span>test</span>');

      _powerAssert.default.equal(stringValue3, '<span>1.2</span>');

      done();
    });
  });
  it('should correctly determine storage type when dataType is auto', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp4).then(function (component) {
      var value = component.normalizeSingleValue('true');
      var value1 = component.normalizeSingleValue('11');
      var value2 = component.normalizeSingleValue('test');
      var value3 = component.normalizeSingleValue('11test11test');
      var value4 = component.normalizeSingleValue('test11');
      var value5 = component.normalizeSingleValue('0');
      var value6 = component.normalizeSingleValue('');

      _powerAssert.default.equal(_typeof(value), 'boolean');

      _powerAssert.default.equal(_typeof(value1), 'number');

      _powerAssert.default.equal(_typeof(value2), 'string');

      _powerAssert.default.equal(_typeof(value3), 'string');

      _powerAssert.default.equal(_typeof(value4), 'string');

      _powerAssert.default.equal(_typeof(value5), 'number');

      _powerAssert.default.equal(_typeof(value6), 'string');

      done();
    });
  });
  it('should not stringify default empty values', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp4).then(function (component) {
      var value = component.normalizeSingleValue({});
      var value1 = component.normalizeSingleValue([]);

      _powerAssert.default.equal(_typeof(value), 'object');

      _powerAssert.default.equal(_typeof(value1), 'object');

      done();
    });
  });
  it('should not change value letter case', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp4).then(function (component) {
      var value = component.normalizeSingleValue('data.textArea');
      var value1 = component.normalizeSingleValue('ECMAScript');
      var value2 = component.normalizeSingleValue('JS');

      _powerAssert.default.equal(value, 'data.textArea');

      _powerAssert.default.equal(value1, 'ECMAScript');

      _powerAssert.default.equal(value2, 'JS');

      done();
    });
  });
  it('should define boolean value', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp4).then(function (component) {
      var value = component.normalizeSingleValue('TRUE');
      var value1 = component.normalizeSingleValue('False');
      var value2 = component.normalizeSingleValue('true');

      _powerAssert.default.equal(value, true);

      _powerAssert.default.equal(value1, false);

      _powerAssert.default.equal(value2, true);

      done();
    });
  });
  it('1/2 should not display empty choice options if property value is not defined', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.comp5).then(function (component) {
      component.setItems([{
        'label': '111',
        'value': '111'
      }, {
        'label': '222',
        'value': '222'
      }, {
        'label': '333',
        'value': '333'
      }], false);

      _powerAssert.default.equal(component.selectOptions.length, 0);

      done();
    });
  });
  it('2/2 should display choice option if property value is set', function (done) {
    _fixtures.comp5.template = '<span>{{ item.label }}</span>';

    _harness.default.testCreate(_Select.default, _fixtures.comp5).then(function (component) {
      component.setItems([{
        'label': '111',
        'value': '111'
      }, {
        'label': '222',
        'value': '222'
      }, {
        'label': '333',
        'value': '333'
      }], false);

      _powerAssert.default.equal(component.selectOptions.length, 3);

      done();
    });
  });
  it('should have only unique dropdown options', function (done) {
    _fixtures.comp5.template = '<span>{{ item.label }}</span>';
    _fixtures.comp5.uniqueOptions = true;

    _harness.default.testCreate(_Select.default, _fixtures.comp5).then(function (component) {
      component.setItems([{
        'label': 'Label 1',
        'value': 'value1'
      }, {
        'label': 'Label 2',
        'value': 'value2'
      }, {
        'label': 'Label 3',
        'value': 'value3'
      }, {
        'label': 'Label 4',
        'value': 'value3'
      }], false);

      _powerAssert.default.equal(component.selectOptions.length, 3);

      done();
    });
  });
  it('should format unlisted values', function (done) {
    _fixtures.comp5.template = '<span>{{ item.label }}</span>';

    _harness.default.testCreate(_Select.default, _fixtures.comp5).then(function (component) {
      var formattedValue1 = component.getView('Unlisted value');
      var formattedValue2 = component.getView(0);

      _powerAssert.default.equal(formattedValue1, '<span>Unlisted value</span>');

      _powerAssert.default.equal(formattedValue2, '<span>0</span>');

      done();
    });
  });
  it('should set multiple selected values not repeating them', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.multiSelect).then(function (component) {
      component.setItems(_fixtures.multiSelectOptions, false);
      component.setChoicesValue(['Cheers']);
      component.setChoicesValue(['Cheers', 'Cyberdyne Systems'], 1);
      component.setChoicesValue(['Cheers', 'Cyberdyne Systems', 'Massive Dynamic'], 2);
      var choices = component.element.querySelector('.choices__list--multiple').children;

      _powerAssert.default.equal(choices.length, 3);

      done();
    });
  });
  it('should not show selected values in dropdown when searching', function (done) {
    _harness.default.testCreate(_Select.default, _fixtures.multiSelect).then(function (component) {
      component.setItems(_fixtures.multiSelectOptions, false);
      component.setChoicesValue(['Cheers']);
      component.setChoicesValue(['Cheers', 'Cyberdyne Systems'], 1);
      component.setItems([], true);
      var itemsInDropdown = component.element.querySelectorAll('.choices__item--choice');
      var choices = component.element.querySelector('.choices__list--multiple').children;

      _powerAssert.default.equal(choices.length, 2);

      _powerAssert.default.equal(itemsInDropdown.length, 1);

      done();
    });
  });
  it('Should build a Select component', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp1).then(function (component) {
      _harness.default.testElements(component, 'select', 1);
    });
  });
  it('Should preserve the tabindex', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp2).then(function (component) {
      var element = component.element.getElementsByClassName('choices__list choices__list--single')[0];

      _harness.default.testElementAttribute(element, 'tabindex', '10');
    });
  });
  it('Should default to 0 when tabindex is not specified', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp1).then(function (component) {
      var element = component.element.getElementsByClassName('choices__list choices__list--single')[0];

      _harness.default.testElementAttribute(element, 'tabindex', '0');
    });
  });
  it('Should allow to override threshold option of fuzzy search', function () {
    try {
      var c1 = Object.assign((0, _cloneDeep.default)(_fixtures.comp1), {
        selectThreshold: 0.2
      });
      var c2 = Object.assign((0, _cloneDeep.default)(_fixtures.comp1), {
        selectThreshold: 0.4
      });
      var c3 = Object.assign((0, _cloneDeep.default)(_fixtures.comp1), {
        selectThreshold: 0.8
      });
      var comps = [_harness.default.testCreate(_Select.default, c1), _harness.default.testCreate(_Select.default, c2), _harness.default.testCreate(_Select.default, c3)];
      return _nativePromiseOnly.default.all(comps).then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 3),
            a = _ref2[0],
            b = _ref2[1],
            c = _ref2[2];

        (0, _chai.expect)(a.choices.config.fuseOptions.threshold).to.equal(0.2);
        (0, _chai.expect)(b.choices.config.fuseOptions.threshold).to.equal(0.4);
        (0, _chai.expect)(c.choices.config.fuseOptions.threshold).to.equal(0.8);
      });
    } catch (error) {
      return _nativePromiseOnly.default.reject(error);
    }
  });
  it('should set component value', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp1).then(function (component) {
      _powerAssert.default.deepEqual(component.dataValue, '');

      component.setValue('red');

      _powerAssert.default.equal(component.dataValue, 'red');
    });
  });
  it('should remove selected item', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp1).then(function (component) {
      _powerAssert.default.deepEqual(component.dataValue, '');

      component.setValue('red');

      _powerAssert.default.equal(component.dataValue, 'red');

      var element = component.element.getElementsByClassName('choices__button')[0];

      component.choices._handleButtonAction(component.choices._store.activeItems, element);

      _powerAssert.default.equal(component.dataValue, '');
    });
  });
  it('should open dropdown after item has been removed', function () {
    global.requestAnimationFrame = function (cb) {
      return cb();
    };

    window.matchMedia = window.matchMedia || function () {
      return {
        matches: false,
        addListener: function addListener() {},
        removeListener: function removeListener() {}
      };
    };

    return _harness.default.testCreate(_Select.default, _fixtures.comp1).then(function (component) {
      component.setValue('red');
      var element = component.element.getElementsByClassName('choices__button')[0];

      component.choices._handleButtonAction(component.choices._store.activeItems, element);

      component.choices.showDropdown(true);

      _powerAssert.default.equal(component.choices.dropdown.isActive, true);
    });
  });
  it('should keep dropdown closed after item has been removed by keypress', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp1).then(function (component) {
      component.setValue('red');
      var element = component.element.querySelector('.choices__button');
      var ke = new KeyboardEvent('keydown', {
        bubbles: true,
        cancelable: true,
        keyCode: 13
      });
      element.dispatchEvent(ke);

      _powerAssert.default.equal(component.dataValue, '');

      _powerAssert.default.equal(component.choices.dropdown.isActive, false);
    });
  });
  it('Should render and set values in selects with different widget types', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp7);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var selectHTML = form.getComponent('selectHtml');
      var selectChoices = form.getComponent('selectChoices');

      _powerAssert.default.equal(!!selectHTML.choices, false);

      _powerAssert.default.equal(!!selectChoices.choices, true);

      setTimeout(function () {
        _powerAssert.default.equal(selectChoices.element.querySelectorAll('.choices__item--choice').length, 3);

        var value = 'b';
        selectHTML.setValue(value);
        selectChoices.setValue(value);
        setTimeout(function () {
          _powerAssert.default.equal(selectHTML.dataValue, value);

          _powerAssert.default.equal(selectChoices.dataValue, value);

          _powerAssert.default.equal(selectHTML.getValue(), value);

          _powerAssert.default.equal(selectChoices.getValue(), value);

          done();
        }, 200);
      }, 200);
    }).catch(done);
  });
  it('Should clear select value when "clear value on refresh options" and "refresh options on" is enable and number component is changed   ', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp8);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var numberComp = form.getComponent('number');
      var value = 'b';
      select.setValue(value);
      setTimeout(function () {
        _powerAssert.default.equal(select.dataValue, value);

        _powerAssert.default.equal(select.getValue(), value);

        var numberInput = numberComp.refs.input[0];
        var numberValue = 5;
        var inputEvent = new Event('input');
        numberInput.value = numberValue;
        numberInput.dispatchEvent(inputEvent);
        setTimeout(function () {
          _powerAssert.default.equal(numberComp.dataValue, numberValue);

          _powerAssert.default.equal(numberComp.getValue(), numberValue);

          _powerAssert.default.equal(select.dataValue, '');

          _powerAssert.default.equal(select.getValue(), '');

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });
  it('Should update select items when "refresh options on" is enable and number component is changed', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp9);

    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function (formio, type, url) {
      return new Promise(function (resolve) {
        var values = [{
          name: 'Ivan'
        }, {
          name: 'Mike'
        }];

        if (url.endsWith('5')) {
          values = [{
            name: 'Kate'
          }, {
            name: 'Ann'
          }, {
            name: 'Lana'
          }];
        }

        resolve(values);
      });
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var numberComp = form.getComponent('number');
      setTimeout(function () {
        _powerAssert.default.equal(select.selectOptions.length, 2);

        _powerAssert.default.deepEqual(select.selectOptions[0].value, {
          name: 'Ivan'
        });

        var numberValue = 5;
        var inputEvent = new Event('input');
        var numberInput = numberComp.refs.input[0];
        numberInput.value = numberValue;
        numberInput.dispatchEvent(inputEvent);
        setTimeout(function () {
          _powerAssert.default.equal(numberComp.dataValue, numberValue);

          _powerAssert.default.equal(numberComp.getValue(), numberValue);

          _powerAssert.default.equal(select.selectOptions.length, 3);

          _powerAssert.default.deepEqual(select.selectOptions[0].value, {
            name: 'Kate'
          });

          _Formio.default.makeRequest = originalMakeRequest;
          done();
        }, 500);
      }, 200);
    }).catch(done);
  });
  it('Should update select items when "refresh options on blur" is enable and number component is changed', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp9);

    form.components[1].refreshOn = null;
    form.components[1].refreshOnBlur = 'number';
    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function (formio, type, url) {
      return new Promise(function (resolve) {
        var values = [{
          name: 'Ivan'
        }, {
          name: 'Mike'
        }];

        if (url.endsWith('5')) {
          values = [{
            name: 'Kate'
          }, {
            name: 'Ann'
          }, {
            name: 'Lana'
          }];
        }

        resolve(values);
      });
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var numberComp = form.getComponent('number');
      setTimeout(function () {
        _powerAssert.default.equal(select.selectOptions.length, 2);

        _powerAssert.default.deepEqual(select.selectOptions[0].value, {
          name: 'Ivan'
        });

        var numberValue = 5;
        var inputEvent = new Event('input');
        var focusEvent = new Event('focus');
        var blurEvent = new Event('blur');
        var numberInput = numberComp.refs.input[0];
        numberInput.dispatchEvent(focusEvent);
        numberInput.value = numberValue;
        numberInput.dispatchEvent(inputEvent);
        numberInput.dispatchEvent(blurEvent);
        setTimeout(function () {
          _powerAssert.default.equal(numberComp.dataValue, numberValue);

          _powerAssert.default.equal(numberComp.getValue(), numberValue);

          _powerAssert.default.equal(select.selectOptions.length, 3);

          _powerAssert.default.deepEqual(select.selectOptions[0].value, {
            name: 'Kate'
          });

          _Formio.default.makeRequest = originalMakeRequest;
          done();
        }, 500);
      }, 200);
    }).catch(done);
  });
  it('Should be able to search if static search is enable', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp10);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var searchField = select.element.querySelector('.choices__input.choices__input--cloned');
      var focusEvent = new Event('focus');
      searchField.dispatchEvent(focusEvent);
      setTimeout(function () {
        _powerAssert.default.equal(select.choices.dropdown.isActive, true);

        var items = select.choices.choiceList.element.children;

        _powerAssert.default.equal(items.length, 5);

        var keyupEvent = new Event('keyup');
        var searchField = select.element.querySelector('.choices__input.choices__input--cloned');
        searchField.value = 'par';
        searchField.dispatchEvent(keyupEvent);
        setTimeout(function () {
          var items = select.choices.choiceList.element.children;

          _powerAssert.default.equal(items.length, 1);

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });
  it('Should not be able to search if static search is disable', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp10);

    form.components[0].searchEnabled = false;
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var searchField = select.element.querySelector('.choices__input.choices__input--cloned');

      _powerAssert.default.equal(searchField, null);

      done();
    }).catch(done);
  });
  it('Should save correct value if value property and item template property are different', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp9);

    form.components[1].refreshOn = null;
    form.components[1].valueProperty = 'age';
    form.components[1].lazyLoad = true;
    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function () {
      return new Promise(function (resolve) {
        var values = [{
          name: 'Ivan',
          age: 35
        }, {
          name: 'Mike',
          age: 41
        }];
        resolve(values);
      });
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');

      _powerAssert.default.equal(select.selectOptions.length, 0);

      select.choices.showDropdown();
      setTimeout(function () {
        _powerAssert.default.equal(select.selectOptions.length, 2);

        _powerAssert.default.deepEqual(select.selectOptions[0].value, 35);

        _powerAssert.default.deepEqual(select.selectOptions[0].label, '<span>Ivan</span>');

        var items = select.choices.choiceList.element.children;

        _powerAssert.default.equal(items.length, 2);

        _powerAssert.default.equal(items[0].textContent.trim(), 'Ivan');

        select.setValue(41);
        setTimeout(function () {
          _powerAssert.default.equal(select.getValue(), 41);

          _powerAssert.default.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Mike');

          _Formio.default.makeRequest = originalMakeRequest;
          done();
        }, 400);
      }, 200);
    }).catch(done);
  });
  it('Should set custom header when sending request in select url', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp9);

    form.components[1].refreshOn = null;
    form.components[1].lazyLoad = true;
    form.components[1].data.headers = [{
      key: 'testHeader',
      value: 'test'
    }];
    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function (formio, type, url, method, data, opts) {
      _powerAssert.default.equal(opts.header.get('testHeader'), 'test');

      return new Promise(function (resolve) {
        var values = [{
          name: 'Ivan',
          age: 35
        }, {
          name: 'Mike',
          age: 41
        }];
        resolve(values);
      });
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');

      _powerAssert.default.equal(select.selectOptions.length, 0);

      select.choices.showDropdown();
      setTimeout(function () {
        _Formio.default.makeRequest = originalMakeRequest;
        done();
      }, 200);
    }).catch(done);
  });
  it('Should set value in select url with lazy load option', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp9);

    form.components[1].refreshOn = null;
    form.components[1].lazyLoad = true;
    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function () {
      return new Promise(function (resolve) {
        var values = [{
          name: 'Ivan'
        }, {
          name: 'Mike'
        }];
        resolve(values);
      });
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      select.setValue({
        name: 'Ivan'
      });
      setTimeout(function () {
        _powerAssert.default.deepEqual(select.getValue(), {
          name: 'Ivan'
        });

        _powerAssert.default.deepEqual(select.dataValue, {
          name: 'Ivan'
        });

        _powerAssert.default.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Ivan');

        _Formio.default.makeRequest = originalMakeRequest;
        done();
      }, 200);
    }).catch(done);
  });
  it('Should set value in select url with lazy load option when value property is defined', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp9);

    form.components[1].refreshOn = null;
    form.components[1].lazyLoad = true;
    form.components[1].valueProperty = 'name';
    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function () {
      return new Promise(function (resolve) {
        var values = [{
          name: 'Ivan'
        }, {
          name: 'Mike'
        }];
        resolve(values);
      });
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      select.setValue('Ivan');
      setTimeout(function () {
        _powerAssert.default.equal(select.getValue(), 'Ivan');

        _powerAssert.default.equal(select.dataValue, 'Ivan');

        _powerAssert.default.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Ivan');

        _Formio.default.makeRequest = originalMakeRequest;
        done();
      }, 200);
    }).catch(done);
  });
  it('Should be able to search if static search is enable', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp10);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var searchField = select.element.querySelector('.choices__input.choices__input--cloned');
      var focusEvent = new Event('focus');
      searchField.dispatchEvent(focusEvent);
      setTimeout(function () {
        _powerAssert.default.equal(select.choices.dropdown.isActive, true);

        var items = select.choices.choiceList.element.children;

        _powerAssert.default.equal(items.length, 5);

        var keyupEvent = new Event('keyup');
        var searchField = select.element.querySelector('.choices__input.choices__input--cloned');
        searchField.value = 'par';
        searchField.dispatchEvent(keyupEvent);
        setTimeout(function () {
          var items = select.choices.choiceList.element.children;

          _powerAssert.default.equal(items.length, 1);

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });
  it('Server side search is debounced with the correct timeout', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp9);

    form.components[1].lazyLoad = false;
    form.components[1].searchDebounce = 0.7;
    form.components[1].disableLimit = false;
    form.components[1].searchField = 'name';
    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function () {
      return new Promise(function (resolve) {
        resolve([]);
      });
    };

    var searchHasBeenDebounced = false;
    var originalDebounce = _lodash.default.debounce;

    _lodash.default.debounce = function (fn, timeout, opts) {
      searchHasBeenDebounced = timeout === 700;
      return originalDebounce(fn, 0, opts);
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var searchField = select.element.querySelector('.choices__input.choices__input--cloned');
      var focusEvent = new Event('focus');
      searchField.dispatchEvent(focusEvent);
      setTimeout(function () {
        var keyupEvent = new Event('keyup');
        searchField.value = 'the_name';
        searchField.dispatchEvent(keyupEvent);
        setTimeout(function () {
          _lodash.default.debounce = originalDebounce;
          _Formio.default.makeRequest = originalMakeRequest;

          _powerAssert.default.equal(searchHasBeenDebounced, true);

          done();
        }, 50);
      }, 200);
    }).catch(done);
  });
  it('Should provide "Allow only available values" validation', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp10);

    form.components[0].validate.onlyAvailableItems = true;
    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var value = 'Dallas';
      select.setValue(value);
      setTimeout(function () {
        _powerAssert.default.equal(select.getValue(), value);

        _powerAssert.default.equal(select.dataValue, value);

        var submit = form.getComponent('submit');
        var clickEvent = new Event('click');
        var submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);
        setTimeout(function () {
          _powerAssert.default.equal(form.errors.length, 1);

          _powerAssert.default.equal(select.error.message, 'Select is an invalid value.');

          document.innerHTML = '';
          done();
        }, 400);
      }, 200);
    }).catch(done);
  });
  it('Should render and set value in select json', function (done) {
    var formObj = _lodash.default.cloneDeep(_fixtures.comp11);

    var element = document.createElement('div');

    _Formio.default.createForm(element, formObj).then(function (form) {
      var select = form.getComponent('select');

      _powerAssert.default.equal(select.choices.containerInner.element.children[1].children[0].dataset.value, formObj.components[0].placeholder);

      select.choices.showDropdown();
      setTimeout(function () {
        var items = select.choices.choiceList.element.children;

        _powerAssert.default.equal(items.length, 4);

        var value = {
          value: 'a',
          label: 'A'
        };
        select.setValue(value);
        setTimeout(function () {
          _powerAssert.default.deepEqual(select.getValue(), value);

          _powerAssert.default.deepEqual(select.dataValue, value);

          _powerAssert.default.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'A');

          done();
        }, 400);
      }, 200);
    }).catch(done);
  });
  it('Should load and set items in select resource and set value', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp12);

    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function (formio, type, url) {
      return new Promise(function (resolve) {
        var values = [{
          data: {
            name: 'Ivan'
          }
        }, {
          data: {
            name: 'Mike'
          }
        }];

        if (url.endsWith('Ivan')) {
          _powerAssert.default.equal(url.endsWith('/form/60114dd32cab36ad94ac4f94/submission?limit=100&skip=0&data.name__regex=Ivan'), true);

          values = [{
            data: {
              name: 'Ivan'
            }
          }];
        } else {
          _powerAssert.default.equal(url.endsWith('/form/60114dd32cab36ad94ac4f94/submission?limit=100&skip=0'), true);
        }

        resolve(values);
      });
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var items = select.choices.choiceList.element.children;

      _powerAssert.default.equal(items.length, 1);

      select.setValue('Ivan');
      setTimeout(function () {
        _powerAssert.default.equal(select.getValue(), 'Ivan');

        _powerAssert.default.equal(select.dataValue, 'Ivan');

        _powerAssert.default.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'Ivan');

        select.choices.showDropdown();
        setTimeout(function () {
          var items = select.choices.choiceList.element.children;

          _powerAssert.default.equal(items.length, 2);

          _powerAssert.default.equal(items[0].textContent, 'Ivan');

          _Formio.default.makeRequest = originalMakeRequest;
          done();
        }, 400);
      }, 200);
    }).catch(done);
  });
  it('Should not have "limit" and "skip" query params when "Disable limit" option checked', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp9);

    var element = document.createElement('div');
    var originalMakeRequest = _Formio.default.makeRequest;

    _Formio.default.makeRequest = function (_, __, url) {
      _powerAssert.default.equal(url, 'https://test.com/');

      return Promise.resolve({});
    };

    _Formio.default.createForm(element, form).then(function () {
      setTimeout(function () {
        _Formio.default.makeRequest = originalMakeRequest;
        done();
      }, 200);
    }).catch(done);
  });
  it('The empty option in html5 shouldn\'t have the [Object Object] value', function () {
    return _harness.default.testCreate(_Select.default, _fixtures.comp13).then(function (component) {
      var emptyOption = component.element.querySelectorAll('option')[0];

      _powerAssert.default.notEqual(emptyOption.value, '[object Object]');

      _powerAssert.default.equal(emptyOption.value, '');
    });
  });
  it('Should not have default values in schema', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp14);

    var element = document.createElement('div');
    var requiredSchema = {
      label: 'Select',
      tableView: true,
      key: 'select',
      type: 'select',
      input: true
    };

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');

      _powerAssert.default.deepEqual(requiredSchema, select.schema);

      done();
    }).catch(done);
  });
  it('Should provide correct value', function (done) {
    var form = _lodash.default.cloneDeep(_fixtures.comp15);

    var element = document.createElement('div');

    _Formio.default.createForm(element, form).then(function (form) {
      var select = form.getComponent('select');
      var value = '{"textField":"rgd","submit":true,"number":11}';
      select.setValue(value);
      setTimeout(function () {
        _powerAssert.default.equal(select.getValue(), value);

        _powerAssert.default.equal(select.dataValue, value);

        var submit = form.getComponent('submit');
        var clickEvent = new Event('click');
        var submitBtn = submit.refs.button;
        submitBtn.dispatchEvent(clickEvent);
        setTimeout(function () {
          _powerAssert.default.equal(select.dataValue, value);

          done();
        }, 200);
      }, 200);
    }).catch(done);
  });
  it('Should show async custom values and be able to set submission', function (done) {
    var formObj = _lodash.default.cloneDeep(_fixtures.comp16);

    var element = document.createElement('div');

    _Formio.default.createForm(element, formObj).then(function (form) {
      var select = form.getComponent('select');
      select.choices.showDropdown();
      setTimeout(function () {
        var items = select.choices.choiceList.element.children;

        _powerAssert.default.equal(items.length, 3);

        var value = 'bb';
        form.submission = {
          data: {
            select: value
          }
        };
        setTimeout(function () {
          _powerAssert.default.deepEqual(select.getValue(), value);

          _powerAssert.default.deepEqual(select.dataValue, value);

          _powerAssert.default.equal(select.choices.containerInner.element.children[1].children[0].children[0].textContent, 'B');

          done();
        }, 400);
      }, 200);
    }).catch(done);
  }); // it('should reset input value when called with empty value', () => {
  //   const comp = Object.assign({}, comp1);
  //   delete comp.placeholder;
  //
  //   return Harness.testCreate(SelectComponent, comp).then((component) => {
  //     assert.deepEqual(component.dataValue, '');
  //     assert.equal(component.refs.input[0].value, '');
  //     component.setValue('red');
  //     assert.equal(component.dataValue, 'red');
  //     assert.equal(component.refs.input[0].value, 'red');
  //     component.setValue('');
  //     assert.equal(component.dataValue, '');
  //     assert.equal(component.refs.input[0].value, '');
  //   });
  // });
});