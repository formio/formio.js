'use strict';

var _Validator = _interopRequireDefault(require("./Validator"));

var _Component = _interopRequireDefault(require("../components/_classes/component/Component"));

var _powerAssert = _interopRequireDefault(require("power-assert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Legacy Validator Tests', function () {
  var baseComponent = new _Component.default({});
  it('Should test for minLength', function () {
    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 5, 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 4, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 3, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 6, 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.minLength.check(baseComponent, 6, ''), true);
  });
  it('Should test for maxLength', function () {
    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 5, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 4, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 3, 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 6, 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.maxLength.check(baseComponent, 6, ''), true);
  });
  it('Should test for email', function () {
    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test@a'), false);

    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test@example.com'), true);

    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test@a.com'), true);

    _powerAssert.default.equal(_Validator.default.validators.email.check(baseComponent, '', 'test@a.co'), true);
  });
  it('Should test for required', function () {
    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, ''), false);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, 't'), true);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, false, ''), true);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, false, 'tes'), true);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, undefined), false);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, null), false);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, []), false);

    _powerAssert.default.equal(_Validator.default.validators.required.check(baseComponent, true, ['test']), true);
  });
  it('Should test for custom', function () {
    _powerAssert.default.equal(_Validator.default.validators.custom.check(baseComponent, 'valid = (input == "test")', 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.custom.check(baseComponent, 'valid = (input == "test")', 'test2'), false);

    _powerAssert.default.equal(_Validator.default.validators.custom.check(baseComponent, 'valid = (input == "test") ? true : "Should be false."', 'test2'), 'Should be false.');

    _powerAssert.default.equal(_Validator.default.validators.custom.check(baseComponent, 'valid = (input == "test") ? true : "Should be false."', 'test'), true);
  });
  it('Should test for pattern', function () {
    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, 'A.*', 'A'), true);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, 'A.*', 'Aaaa'), true);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, 'w+', 'test'), false);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, '\\w+', 'test'), true);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, '\\w+@\\w+', 'test@a'), true);

    _powerAssert.default.equal(_Validator.default.validators.pattern.check(baseComponent, '\\w+@\\w+', 'test@example.com'), false);
  });
  it('Should test for json', function () {
    _powerAssert.default.equal(_Validator.default.validators.json.check(baseComponent, {
      or: [{
        '_isEqual': [{
          var: 'data.test'
        }, ['1', '2', '3']]
      }, 'Should be false.']
    }, null, {
      test: ['1', '2', '3']
    }), true);

    _powerAssert.default.equal(_Validator.default.validators.json.check(baseComponent, {
      or: [{
        '_isEqual': [{
          var: 'data.test'
        }, ['1', '2', '3']]
      }, 'Should be false.']
    }, null, {
      test: ['1', '2', '4']
    }), 'Should be false.');
  });
});
describe('Validator Tests', function () {
  it('Validates for required', function (done) {
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'required'
      }]
    });

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'required'
      },
      level: 'error',
      message: 'Test is required'
    }]);

    done();
  });
  it('Overrides the message and level', function (done) {
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'required',
        level: 'info',
        message: 'ABC'
      }]
    });

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}, {}, true), [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'required'
      },
      level: 'info',
      message: 'ABC'
    }]);

    done();
  });
  it('Only returns the last message for a rule', function (done) {
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'required',
        level: 'info',
        message: 'ABC'
      }, {
        rule: 'required',
        level: 'error',
        message: 'DEF'
      }]
    });

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'required'
      },
      level: 'error',
      message: 'DEF'
    }]);

    done();
  });
  it('Fulfills custom validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'custom'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'custom',
        level: 'error',
        message: 'DEF',
        settings: {
          custom: 'valid = input === "foo";'
        }
      }]
    }); // Null is empty value so false passes for Component.

    component.dataValue = 'foo';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'bar';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = [];

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    done();
  });
  it('Fulfills date validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'date'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'date',
        level: 'error',
        message: 'DEF',
        settings: {}
      }]
    });
    component.dataValue = '01/05/12';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'January 5, 2012';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '2019-12-04T16:33:10.626Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = new Date();

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills day validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'day'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'day',
        level: 'error',
        message: 'DEF',
        settings: {}
      }]
    });
    component.dataValue = '01/05/2012';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'January 5, 2012';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '2019-12-04T16:33:10.626Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = new Date();

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills email validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'email'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'email',
        level: 'error',
        message: 'DEF',
        settings: {}
      }]
    });
    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'test';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'test@example';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'test@example.com';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'test.test@example.com';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'test.test@example.io';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills json validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'json'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'json',
        level: 'error',
        message: 'DEF',
        settings: {
          json: {
            '==': [{
              var: 'input'
            }, 'foo']
          }
        }
      }]
    });
    component.dataValue = 'foo';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'bar';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = [];

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    done();
  });
  it('Fulfills mask validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'mask'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'mask',
        level: 'error',
        message: 'DEF',
        settings: {
          mask: '999'
        }
      }]
    });
    component.dataValue = '123';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'aaa';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '12';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '1234';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '1a2';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills max validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'max'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'max',
        level: 'error',
        message: 'DEF',
        settings: {
          limit: '10'
        }
      }]
    });
    component.dataValue = -1;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 0;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 1;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 9;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 10;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 11;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 1000000000;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '12';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills maxDate validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'maxDate'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'maxDate',
        level: 'error',
        message: 'DEF',
        settings: {
          dateLimit: '2019-12-04T00:00:00.000Z'
        }
      }]
    });
    component.dataValue = '2010-12-03T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '2019-12-03T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '2019-12-04T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '2019-12-05T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '2029-12-05T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills maxLength validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'maxLength'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'maxLength',
        level: 'error',
        message: 'DEF',
        settings: {
          length: '10'
        }
      }]
    });
    component.dataValue = 'a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '123456789';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '123456789a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '1234567890a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'this is a really long string';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills maxWords validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'maxWords'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'maxWords',
        level: 'error',
        message: 'DEF',
        settings: {
          length: '3'
        }
      }]
    });
    component.dataValue = 'This';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'This is';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'This is a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'This is a test';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'this is a really long string';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills maxYear validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'maxYear'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'maxYear',
        level: 'error',
        message: 'DEF',
        settings: '2020'
      }]
    });
    component.dataValue = '2030';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '2021';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '3040';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '0000';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '2000';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills minYear validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'minYear'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'minYear',
        level: 'error',
        message: 'DEF',
        settings: '2000'
      }]
    });
    component.dataValue = '1880';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '0011';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '1990';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '0000';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '2020';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '2000';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills min validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'min'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'min',
        level: 'error',
        message: 'DEF',
        settings: {
          limit: '10'
        }
      }]
    });
    component.dataValue = -1;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 0;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 1;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 9;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 10;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 11;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 1000000000;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '12';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills minDate validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'minDate'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'minDate',
        level: 'error',
        message: 'DEF',
        settings: {
          dateLimit: '2019-12-04T00:00:00.000Z'
        }
      }]
    });
    component.dataValue = '2010-12-03T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '2019-12-03T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '2019-12-04T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '2019-12-05T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '2029-12-05T00:00:00.000Z';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills minLength validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'minLength'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'minLength',
        level: 'error',
        message: 'DEF',
        settings: {
          length: '10'
        }
      }]
    });
    component.dataValue = 'a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '123456789';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = '123456789a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '1234567890a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'this is a really long string';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills minWords validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'minWords'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'minWords',
        level: 'error',
        message: 'DEF',
        settings: {
          length: '3'
        }
      }]
    });
    component.dataValue = 'This';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'This is';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'This is a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'This is a test';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'this is a really long string';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills pattern validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'pattern'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'pattern',
        level: 'error',
        message: 'DEF',
        settings: {
          pattern: 'a.c'
        }
      }]
    });
    component.dataValue = 'abc';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'adc';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'aaa';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'ccc';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'a';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = [];

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = ['abc'];

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills required validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'required'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'required',
        level: 'error',
        message: 'DEF'
      }]
    }); // Null is empty value so false passes for Component.

    component.dataValue = false;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = true;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 't';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'test';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = [];

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = ['test'];

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
  it('Fulfills url validation', function (done) {
    var fail = [{
      context: {
        index: 0,
        key: 'test',
        label: 'Test',
        validator: 'url'
      },
      level: 'error',
      message: 'DEF'
    }];
    var pass = [];
    var component = new _Component.default({
      key: 'test',
      label: 'Test',
      validations: [{
        rule: 'url',
        level: 'error',
        message: 'DEF'
      }]
    });
    component.dataValue = 't';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'test';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'test.com';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'http://test';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), fail);

    component.dataValue = 'http://test.com';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'https://test.com';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'https://www.test.com';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'https://one.two.three.four.test.io';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'https://www.test.com/test';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'https://www.test.com/test/test.html';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = 'https://www.test.com/one/two/three/four/test.html';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = '';

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = undefined;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    component.dataValue = null;

    _powerAssert.default.deepEqual(_Validator.default.checkComponent(component, {}), pass);

    done();
  });
});