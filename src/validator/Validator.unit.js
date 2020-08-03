'use strict';
import Validator from './Validator';
import Component from '../components/_classes/component/Component';
import assert from 'power-assert';

describe('Legacy Validator Tests', () => {
  const baseComponent = new Component({});

  it('Should test for minLength', () => {
    assert.equal(Validator.validators.minLength.check(baseComponent, 5, 'test'), false);
    assert.equal(Validator.validators.minLength.check(baseComponent, 4, 'test'), true);
    assert.equal(Validator.validators.minLength.check(baseComponent, 3, 'test'), true);
    assert.equal(Validator.validators.minLength.check(baseComponent, 6, 'test'), false);
    assert.equal(Validator.validators.minLength.check(baseComponent, 6, ''), true);
  });

  it('Should test for maxLength', () => {
    assert.equal(Validator.validators.maxLength.check(baseComponent, 5, 'test'), true);
    assert.equal(Validator.validators.maxLength.check(baseComponent, 4, 'test'), true);
    assert.equal(Validator.validators.maxLength.check(baseComponent, 3, 'test'), false);
    assert.equal(Validator.validators.maxLength.check(baseComponent, 6, 'test'), true);
    assert.equal(Validator.validators.maxLength.check(baseComponent, 6, ''), true);
  });

  it('Should test for email', () => {
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test'), false);
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test@a'), false);
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test@example.com'), true);
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test@a.com'), true);
    assert.equal(Validator.validators.email.check(baseComponent, '', 'test@a.co'), true);
  });

  it('Should test for required', () => {
    assert.equal(Validator.validators.required.check(baseComponent, true, ''), false);
    assert.equal(Validator.validators.required.check(baseComponent, true, 't'), true);
    assert.equal(Validator.validators.required.check(baseComponent, false, ''), true);
    assert.equal(Validator.validators.required.check(baseComponent, false, 'tes'), true);
    assert.equal(Validator.validators.required.check(baseComponent, true, undefined), false);
    assert.equal(Validator.validators.required.check(baseComponent, true, null), false);
    assert.equal(Validator.validators.required.check(baseComponent, true, []), false);
    assert.equal(Validator.validators.required.check(baseComponent, true, ['test']), true);
  });

  it('Should test for custom', () => {
    assert.equal(Validator.validators.custom.check(baseComponent, 'valid = (input == "test")', 'test'), true);
    assert.equal(Validator.validators.custom.check(baseComponent, 'valid = (input == "test")', 'test2'), false);
    assert.equal(Validator.validators.custom.check(baseComponent, 'valid = (input == "test") ? true : "Should be false."', 'test2'), 'Should be false.');
    assert.equal(Validator.validators.custom.check(baseComponent, 'valid = (input == "test") ? true : "Should be false."', 'test'), true);
  });

  it('Should test for pattern', () => {
    assert.equal(Validator.validators.pattern.check(baseComponent, 'A.*', 'A'), true);
    assert.equal(Validator.validators.pattern.check(baseComponent, 'A.*', 'Aaaa'), true);
    assert.equal(Validator.validators.pattern.check(baseComponent, 'w+', 'test'), false);
    assert.equal(Validator.validators.pattern.check(baseComponent, '\\w+', 'test'), true);
    assert.equal(Validator.validators.pattern.check(baseComponent, '\\w+@\\w+', 'test@a'), true);
    assert.equal(Validator.validators.pattern.check(baseComponent, '\\w+@\\w+', 'test@example.com'), false);
  });

  it('Should test for json', () => {
    assert.equal(Validator.validators.json.check(baseComponent, {
      or: [{ '_isEqual': [{ var: 'data.test' }, ['1', '2', '3']] }, 'Should be false.']
    }, null, { test: ['1', '2', '3'] }), true);
    assert.equal(Validator.validators.json.check(baseComponent, {
      or: [{ '_isEqual': [{ var: 'data.test' }, ['1', '2', '3']] }, 'Should be false.']
    }, null, { test: ['1', '2', '4'] }), 'Should be false.');
  });
});

describe('Validator Tests', () => {
  it('Validates for required', (done) => {
    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'required',
        }
      ]
    });
    assert.deepEqual(Validator.checkComponent(component, {}), [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'required',
        },
        level: 'error',
        message: 'Test is required',
      }
    ]);
    done();
  });

  it('Overrides the message and level', (done) => {
    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'required',
          level: 'info',
          message: 'ABC',
        }
      ]
    });
    assert.deepEqual(Validator.checkComponent(component, {}, {}, true), [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'required',
        },
        level: 'info',
        message: 'ABC',
      }
    ]);
    done();
  });

  it('Only returns the last message for a rule', (done) => {
    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'required',
          level: 'info',
          message: 'ABC',
        },
        {
          rule: 'required',
          level: 'error',
          message: 'DEF',
        }
      ]
    });
    assert.deepEqual(Validator.checkComponent(component, {}), [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'required',
        },
        level: 'error',
        message: 'DEF',
      }
    ]);
    done();
  });

  it('Fulfills custom validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'custom',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'custom',
          level: 'error',
          message: 'DEF',
          settings: {
            custom: 'valid = input === "foo";',
          }
        }
      ]
    });
    // Null is empty value so false passes for Component.
    component.dataValue = 'foo';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'bar';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'a';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = [];
    assert.deepEqual(Validator.checkComponent(component, {}), fail);

    done();
  });

  it('Fulfills date validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'date',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'date',
          level: 'error',
          message: 'DEF',
          settings: {}
        }
      ]
    });
    component.dataValue = '01/05/12';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'January 5, 2012';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '2019-12-04T16:33:10.626Z';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = new Date();
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'a';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills day validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'day',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'day',
          level: 'error',
          message: 'DEF',
          settings: {}
        }
      ]
    });
    component.dataValue = '01/05/2012';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'January 5, 2012';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '2019-12-04T16:33:10.626Z';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = new Date();
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'a';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills email validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'email',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'email',
          level: 'error',
          message: 'DEF',
          settings: {}
        }
      ]
    });
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'test';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'test@example';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'test@example.com';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'test.test@example.com';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'test.test@example.io';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills json validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'json',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'json',
          level: 'error',
          message: 'DEF',
          settings: {
            json: { '==' : [{ var: 'input' }, 'foo'] },
          }
        }
      ]
    });
    component.dataValue = 'foo';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'bar';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'a';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = [];
    assert.deepEqual(Validator.checkComponent(component, {}), fail);

    done();
  });

  it('Fulfills mask validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'mask',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'mask',
          level: 'error',
          message: 'DEF',
          settings: {
            mask: '999',
          }
        }
      ]
    });
    component.dataValue = '123';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'aaa';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '12';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '1234';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '1a2';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills max validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'max',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'max',
          level: 'error',
          message: 'DEF',
          settings: {
            limit: '10',
          }
        }
      ]
    });
    component.dataValue = -1;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 0;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 1;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 9;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 10;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 11;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 1000000000;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '12';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills maxDate validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'maxDate',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'maxDate',
          level: 'error',
          message: 'DEF',
          settings: {
            dateLimit: '2019-12-04T00:00:00.000Z',
          }
        }
      ]
    });
    component.dataValue = '2010-12-03T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '2019-12-03T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '2019-12-04T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '2019-12-05T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '2029-12-05T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills maxLength validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'maxLength',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'maxLength',
          level: 'error',
          message: 'DEF',
          settings: {
            length: '10',
          }
        }
      ]
    });
    component.dataValue = 'a';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '123456789';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '123456789a';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '1234567890a';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'this is a really long string';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills maxWords validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'maxWords',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'maxWords',
          level: 'error',
          message: 'DEF',
          settings: {
            length: '3',
          }
        }
      ]
    });
    component.dataValue = 'This';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'This is';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'This is a';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'This is a test';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'this is a really long string';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills maxYear validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'maxYear',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'maxYear',
          level: 'error',
          message: 'DEF',
          settings: '2020'
        }
      ]
    });
    component.dataValue = '2030';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '2021';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '3040';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '0000';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '2000';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills minYear validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'minYear',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'minYear',
          level: 'error',
          message: 'DEF',
          settings: '2000'
        }
      ]
    });
    component.dataValue = '1880';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '0011';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '1990';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '0000';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '2020';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '2000';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills min validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'min',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'min',
          level: 'error',
          message: 'DEF',
          settings: {
            limit: '10',
          }
        }
      ]
    });
    component.dataValue = -1;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 0;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 1;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 9;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 10;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 11;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 1000000000;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '12';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills minDate validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'minDate',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'minDate',
          level: 'error',
          message: 'DEF',
          settings: {
            dateLimit: '2019-12-04T00:00:00.000Z',
          }
        }
      ]
    });
    component.dataValue = '2010-12-03T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '2019-12-03T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '2019-12-04T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '2019-12-05T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '2029-12-05T00:00:00.000Z';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills minLength validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'minLength',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'minLength',
          level: 'error',
          message: 'DEF',
          settings: {
            length: '10',
          }
        }
      ]
    });
    component.dataValue = 'a';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '123456789';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = '123456789a';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '1234567890a';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'this is a really long string';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills minWords validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'minWords',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'minWords',
          level: 'error',
          message: 'DEF',
          settings: {
            length: '3',
          }
        }
      ]
    });
    component.dataValue = 'This';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'This is';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'This is a';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'This is a test';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'this is a really long string';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills pattern validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'pattern',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'pattern',
          level: 'error',
          message: 'DEF',
          settings: {
            pattern: 'a.c',
          }
        }
      ]
    });
    component.dataValue = 'abc';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'adc';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'aaa';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'ccc';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'a';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = [];
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = ['abc'];
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills required validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'required',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'required',
          level: 'error',
          message: 'DEF',
        }
      ]
    });
    // Null is empty value so false passes for Component.
    component.dataValue = false;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = true;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 't';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'test';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = [];
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = ['test'];
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });

  it('Fulfills url validation', (done) => {
    const fail = [
      {
        context: {
          index: 0,
          key: 'test',
          label: 'Test',
          validator: 'url',
        },
        level: 'error',
        message: 'DEF',
      }
    ];

    const pass = [];

    const component = new Component({
      key: 'test',
      label: 'Test',
      validations: [
        {
          rule: 'url',
          level: 'error',
          message: 'DEF',
        }
      ]
    });
    component.dataValue = 't';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'test';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'test.com';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'http://test';
    assert.deepEqual(Validator.checkComponent(component, {}), fail);
    component.dataValue = 'http://test.com';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'https://test.com';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'https://www.test.com';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'https://one.two.three.four.test.io';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'https://www.test.com/test';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'https://www.test.com/test/test.html';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = 'https://www.test.com/one/two/three/four/test.html';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = '';
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = undefined;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);
    component.dataValue = null;
    assert.deepEqual(Validator.checkComponent(component, {}), pass);

    done();
  });
});
