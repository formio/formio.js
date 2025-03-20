import { expect, assert } from 'chai';
import _ from 'lodash';
import utils from '../../src/utils';
import submission1 from './fixtures/utils/submission1.json'

describe('Util Tests', () => {
  describe('getValue', () => {
    it('should be able to get a simple value', () => {
      expect(utils.getValue(submission1, 'name')).to.be.equal(submission1.data.name);
    });

    it('should be able to get a value from a container', () => {
      expect(utils.getValue(submission1, 'animalname')).to.be.equal(submission1.data.mycontainer.animalname);
    });
  });

  describe('parseFloat', () => {
    it('should clear input and parse value', () => {
      expect(utils.parseFloatExt('12,345,678.90')).to.be.equal(12345678.90);
    });
  });

  describe('formatAsCurrency', () => {
    it('should be able to format Float value for Currency component', () => {
      expect(utils.formatAsCurrency(123.4)).to.be.equal('123.40');
      expect(utils.formatAsCurrency(12345678.9)).to.be.equal('12,345,678.90');
      expect(utils.formatAsCurrency(12345678.915)).to.be.equal('12,345,678.92');
    });

    it('should be able to format String value for Currency component', () => {
      expect(utils.formatAsCurrency('12345678.915')).to.be.equal('12,345,678.92');
    });
  });

  describe('checkCalculated', () => {
    it('should be able to calculate value based on javascript code', () => {
      const component = {
        key: 'sum',
        calculateValue: 'value = 3'
      };
      const data = {};

      utils.checkCalculated(component, null, data);
      expect(data.sum).to.be.equal(3);
    });

    it('should be able to calculate value based on json logic', () => {
      const component = {
        key: 'sum',
        calculateValue: {
          '_sum': { var: 'data.test' }
        }
      };
      const data = { test: [1, 2, 3] };

      utils.checkCalculated(component, null, data);
      expect(data.sum).to.be.equal(6);
    });

    it('should return undefined if no logic provided', () => {
      const component = {
        key: 'sum',
        calculateValue: '/* do nothing */'
      };
      const data = {};

      utils.checkCalculated(component, null, data);
      expect(data.sum).to.be.undefined;
    });
  });

  describe('checkCondition', () => {
    it('should display component by default', () => {
      expect(utils.checkCondition({}, null, {})).to.be.equal(true);
    });

    it('should calculate simple triggers', () => {
      const component = {
        key: 'sum',
        conditional: {
          when: 'test',
          eq: 3,
          show: true
        }
      };
      const data1 = { test: 3 };
      const data2 = { test: 5 };
      expect(utils.checkCondition(component, null, data1)).to.be.equal(true);
      expect(utils.checkCondition(component, null, data2)).to.be.equal(false);
    });

    it('should be able to calculate condition based on javascript code', () => {
      const component = {
        key: 'sum',
        customConditional(context) {
          return context.data.test === 3;
        }
      };
      const data1 = { test: 3 };
      const data2 = { test: 5 };

      expect(utils.checkCondition(component, null, data1)).to.be.equal(true);
      expect(utils.checkCondition(component, null, data2)).to.be.equal(false);
    });

    it('should be able to calculate condition based on json logic', () => {
      const component = {
        key: 'sum',
        conditional: {
          json: {
            '===': [
              { '_sum': { var: 'data.test' } },
              6
            ]
          }
        }
      };
      const data1 = { test: [1, 2, 3] };
      const data2 = { test: [1, 2, 4] };

      expect(utils.checkCondition(component, null, data1)).to.be.equal(true);
      expect(utils.checkCondition(component, null, data2)).to.be.equal(false);
    });
  });

  describe('getDateSetting', () => {
    it('should return null if no date provided', () => {
      expect(utils.getDateSetting()).to.be.equal(null);
      expect(utils.getDateSetting(null)).to.be.equal(null);
      expect(utils.getDateSetting(undefined)).to.be.equal(null);
      expect(utils.getDateSetting(NaN)).to.be.equal(null);
      expect(utils.getDateSetting('')).to.be.equal(null);
      expect(utils.getDateSetting('should be invalid')).to.be.equal(null);
    });

    it('should return valid Date on serialized date provided', () => {
      const date = new Date(0);
      expect(utils.getDateSetting(date)).to.be.eql(date);
      expect(utils.getDateSetting(date.valueOf())).to.be.eql(date);
      expect(utils.getDateSetting(date.toString())).to.be.eql(date);
      expect(utils.getDateSetting(date.toISOString())).to.be.eql(date);
    });

    it('should be able to get value using moment APIs', () => {
      const validMomentExpression = 'moment(0)';
      const validDate = new Date(0);
      const invalidMomentExpression = "moment('')";

      expect(utils.getDateSetting(validMomentExpression)).to.be.eql(validDate);
      expect(utils.getDateSetting(invalidMomentExpression)).to.be.equal(null);
    });
  });

  describe('checkTrigger', () => {
    it('should default to false', () => {
      expect(utils.checkCondition({}, { type: 'none' }, null, {})).to.be.equal(true);
    });

    it('should calculate simple triggers', () => {
      const component = {
        key: 'sum'
      };
      const trigger = {
        type: 'simple',
        simple: {
          when: 'test',
          eq: 3,
          show: true
        }
      };
      const data1 = { test: 3 };
      const data2 = { test: 5 };
      expect(utils.checkTrigger(component, trigger, null, data1)).to.be.equal(true);
      expect(utils.checkTrigger(component, trigger, null, data2)).to.be.equal(false);
    });

    it('should be able to calculate trigger based on javascript code', () => {
      const component = {
        key: 'sum'
      };
      const trigger = {
        type: 'javascript',
        javascript: 'result = data.test === 3'
      };
      const data1 = { test: 3 };
      const data2 = { test: 5 };

      expect(utils.checkTrigger(component, trigger, null, data1)).to.be.equal(true);
      expect(utils.checkTrigger(component, trigger, null, data2)).to.be.equal(false);
    });

    it('should be able to calculate trigger based on json logic', () => {
      const component = {
        key: 'sum'
      };
      const trigger = {
        type: 'json',
        json: {
          '===': [
            { '_sum': { var: 'data.test' } },
            6
          ]
        }
      };
      const data1 = { test: [1, 2, 3] };
      const data2 = { test: [1, 2, 4] };

      expect(utils.checkTrigger(component, trigger, null, data1)).to.be.equal(true);
      expect(utils.checkTrigger(component, trigger, null, data2)).to.be.equal(false);
    });
  });

  describe('setActionProperty', () => {
    it('should set a boolean action property to true', () => {
      const component = {
        key: 'test',
        disabled: false,
      };
      const action = {
        type: 'property',
        property: {
          label: 'Disabled',
          value: 'disabled',
          type: 'boolean',
        },
        state: true,
      };

      utils.setActionProperty(component, action);

      expect(component.disabled).to.be.equal(true);
    });

    it('should set a boolean action property to false', () => {
      const component = {
        key: 'test',
        disabled: true,
      };
      const action = {
        type: 'property',
        property: {
          label: 'Disabled',
          value: 'disabled',
          type: 'boolean',
        },
        state: false,
      };

      utils.setActionProperty(component, action);

      expect(component.disabled).to.be.equal(false);
    });

    it('should set a boolean action nested property', () => {
      const component = {
        key: 'test',
        validate: {
          required: true,
        },
      };
      const action = {
        type: 'property',
        property: {
          label: 'Required',
          value: 'validate.required',
          type: 'boolean',
        },
        state: false,
      };

      utils.setActionProperty(component, action);

      expect(component.validate.required).to.be.equal(false);
    });

    it('should set a string action property', () => {
      const component = {
        key: 'test',
        label: 'foo',
      };
      const action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string',
        },
        text: 'bar',
      };

      utils.setActionProperty(component, action);

      expect(component.label).to.be.equal('bar');
    });

    it('should set a string action property with result templating', () => {
      const component = {
        key: 'test',
        label: 'foo',
      };
      const action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string',
        },
        text: 'bar {{ result }}',
      };

      utils.setActionProperty(component, action, 'baz');

      expect(component.label).to.be.equal('bar baz');
    });

    it('should set a string action property with row templating', () => {
      const component = {
        key: 'test',
        label: 'foo',
      };
      const action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string',
        },
        text: 'bar {{ row.field }}',
      };

      utils.setActionProperty(component, action, true, { field: 'baz' });

      expect(component.label).to.be.equal('bar baz');
    });

    it('should set a string action property with data templating', () => {
      const component = {
        key: 'test',
        label: 'foo',
      };
      const action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string',
        },
        text: 'bar {{ data.field }}',
      };

      utils.setActionProperty(component, action, true, {}, { field: 'baz' });

      expect(component.label).to.be.equal('bar baz');
    });

    it('should set a string action property with component templating', () => {
      const component = {
        key: 'test',
        label: 'foo',
      };
      const action = {
        type: 'property',
        property: {
          label: 'Label',
          value: 'label',
          type: 'string',
        },
        text: 'bar {{ component.key }}',
      };

      utils.setActionProperty(component, action);

      expect(component.label).to.be.equal('bar test');
    });

    it('should do nothing with a bad request', () => {
      const component = {
        key: 'test',
        label: 'foo',
      };
      const originalComponent = _.cloneDeep(component);

      expect(component).to.deep.equal(originalComponent);
    });
  });

  describe('delay', () => {
    let score = 0;

    function incScore(value) {
      score += value || 1;
    }

    beforeEach(() => {
      score = 0;
    });

    it('should act as regular setTimeout()', (done) => {
      utils.delay(incScore);
      utils.delay(incScore, 0);
      utils.delay(incScore, 100, 2);
      utils.delay(() => {
        if (score === 4) {
          done();
        }
      }, 200);
    });

    it('should be cancelable via direct timer access', (done) => {
      const delay = utils.delay(incScore);
      clearTimeout(delay.timer);
      setTimeout(() => {
        if (score === 0) {
          done();
        }
      }, 100);
    });

    it('should be cancelable via cancel() method', (done) => {
      const delay = utils.delay(incScore);
      delay.cancel();
      setTimeout(() => {
        if (score === 0) {
          done();
        }
      }, 100);
    });

    it('should be able to call passed function synchronously', (done) => {
      const delay = utils.delay(incScore);
      delay();
      if (score === 1) {
        done();
      }
    });
  });

  describe('withSwitch', () => {
    it('should return Array with two functions', () => {
      const fns = utils.withSwitch();

      expect(fns).to.be.an('array').and.have.lengthOf(2);
      expect(fns[0]).to.be.a('function');
      expect(fns[1]).to.be.a('function');
    });

    describe('#get', () => {
      it('should return one of state', () => {
        const [get] = utils.withSwitch(42, 24);
        expect(get()).to.be.equal(42);
      });

      it('should be pure', () => {
        const [get] = utils.withSwitch(42, 24);
        expect(get()).to.be.equal(42);
        expect(get()).to.be.equal(42);
        expect(get()).to.be.equal(42);
        expect(get()).to.be.equal(42);
      });
    });

    describe('#toggle', () => {
      it('should cycle between states', () => {
        const [get, toggle] = utils.withSwitch(42, 24);
        expect(get()).to.be.equal(42);
        toggle();
        expect(get()).to.be.equal(24);
        toggle();
        expect(get()).to.be.equal(42);
      });
    });
  });

  describe('unfold', () => {
    it('should return provided argument', () => {
      const parameters = [{}, 1, null, 'string'];

      parameters.forEach(p => {
        assert(p === utils.unfold(p));
      });
    });

    it('should call parameter, if it is function and return result', () => {
      const x = Symbol('__unfold__');
      assert(utils.unfold(() => x) === x);
    });
  });

  describe('firstNonNil', () => {
    it('should return first non nil value', () => {
      expect(utils.firstNonNil([1])).to.equal(1);
      expect(utils.firstNonNil([1, 3])).to.equal(1);
      expect(utils.firstNonNil([3, 2, 1])).to.equal(3);
      expect(utils.firstNonNil([undefined, undefined, 3, 1])).to.equal(3);
    });
    it('should unfold all functions in array', () => {
      expect(utils.firstNonNil([() => 1])).to.equal(1);
      expect(utils.firstNonNil([() => 1, 3])).to.equal(1);
      expect(utils.firstNonNil([undefined, undefined, () => 3, 1])).to.equal(3);
    });
  });

  describe('observeOverload', () => {
    it('should invoke the callback, if there too many dispatches in a short time', done => {
      try {
        const dispatch = utils.observeOverload(() => true);

        for (let i = 0; i < 100; i += 1) {
          if (dispatch()) {
            return done();
          }
        }

        throw new Error('Callback not called');
      }
      catch (error) {
        done(error);
      }
    });

    it('should allow configuring the events limit', done => {
      try {
        for (let i = 1; i < 10; i += 1) {
          const dispatch = utils.observeOverload(() => done('Limit option is ignored1'), { limit: 100 });
          for (let j = 0; j < i * 10; j += 1) {
            dispatch();
          }
        }

        // exit if we done, otherwise throw
        let called = false;
        const dispatch = utils.observeOverload(() => {
          called = true;
          done();
        }, { limit: 100 });

        for (let i = 0; i < 110; i += 1) {
          dispatch();
        }

        if (!called) {
          throw new Error('Limit option is ignored2');
        }
      }
      catch (error) {
        done(error);
      }
    });

    it('should not invoke callback, if time between calls longer then options.delay', done => {
      try {
        const dispatch = utils.observeOverload(() => done('Callback should not be called'), { delay: 100, limit: 2 });
        let count = 0;

        const id = setInterval(() => {
          dispatch();
          count += 1;
          if (count >= 3) {
            done();
            clearInterval(id);
          }
        }, 110);
      }
      catch (error) {
        done(error);
      }
    });
  });

  describe('unescapeHTML', () => {
    it('should not remove html tags from string', () => {
      const unescapedString = utils.unescapeHTML('<div><p>This is a paragraph.</p> <p>This is another paragraph.</p></div>');
      expect(unescapedString).to.equal('<div><p>This is a paragraph.</p> <p>This is another paragraph.</p></div>');
    });

    it('should return string without HTML characters', () => {
      const unescapedString = utils.unescapeHTML('&lt;p&gt;ampersand &amp; &#34;quotes&#34; test&lt;&#47;p&gt;');
      expect(unescapedString).to.equal('<p>ampersand & "quotes" test</p>');
    });
  });

  describe('removeHTML', () => {
    it('should remove html tags from string', () => {
      const removedHTML = utils.removeHTML('<div><p> Hello</p> <p>World</p></div>');
      expect(removedHTML).to.equal('Hello World');
    });
  });

  describe('getCurrencyAffixes', () => {
    it('USD en', (done) => {
      try {
        const affixes = utils.getCurrencyAffixes({
          currency: 'USD',
          decimalLimit: 2,
          decimalSeparator: '.',
          lang: 'en',
        });
        const expectedResult = {
          prefix: '$',
          suffix: '',
        };
        expect(affixes.prefix).to.equal(expectedResult.prefix);
        expect(affixes.suffix).to.equal(expectedResult.suffix);
        done();
      }
      catch (err) {
        done(err);
      }
    });
/*
    it('USD ar-SA', (done) => {
      try {
        const affixes2 = utils.getCurrencyAffixes({
          currency: 'USD',
          decimalLimit: 2,
          decimalSeparator: '٫',
          lang: 'ar-SA',
        });
        const expectedResult = {
          prefix: '',
          suffix: ' US$',
        };
        expect(affixes2.prefix).to.equal(expectedResult.prefix);
        expect(affixes2.suffix).to.equal(expectedResult.suffix);
        done();
      }
      catch (err) {
        done(err);
      }
    });
*/
  });
});
