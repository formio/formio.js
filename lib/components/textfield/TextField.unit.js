"use strict";

var _powerAssert = _interopRequireDefault(require("power-assert"));

var _lodash = _interopRequireDefault(require("lodash"));

var _harness = _interopRequireDefault(require("../../../test/harness"));

var _TextField = _interopRequireDefault(require("./TextField"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

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
      return _nativePromiseOnly.default.all[(_harness.default.testInvalid(component, 'Joe', 'firstName', 'You cannot be Joe'), _harness.default.testValid(component, 'Tom'))];
    });
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
      return _nativePromiseOnly.default.all[(_harness.default.testInvalid(component, 'Tom', 'firstName', 'You must be Joe'), _harness.default.testValid(component, 'Joe'))];
    });
  });
});