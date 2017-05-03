import assert from 'power-assert';
import _each from 'lodash/each';
import { Harness } from '../harness';
module.exports = {
  title: 'Calculated Fields Test',
  form: {
    components: [
      {
        type: 'textfield',
        label: 'A',
        key: 'a',
        input: true,
        inputType: 'text'
      },
      {
        type: 'textfield',
        label: 'B',
        key: 'b',
        input: true,
        inputType: 'text'
      },
      {
        type: 'textfield',
        label: 'Total',
        key: 'total',
        input: true,
        inputType: 'text',
        disabled: true,
        calculateValue: {
          "+": [
            {var: 'data.a'},
            {var: 'data.b'}
          ]
        }
      }
    ]
  },
  tests: {
    'Test calculated fields': (form, done) => {
      form.on('change', () => {
        let value = form.getValue();
        assert.equal(value.total, '25');
        done();
      });
      Harness.testSetGet(form, {
        a: '10',
        b: '15',
        total: ''
      });
    }
  }
};

