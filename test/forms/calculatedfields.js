import assert from 'power-assert';
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
        assert.equal(value.data.total, '25');
        done();
      });
      Harness.testSetGet(form, {data: {
        a: '10',
        b: '15',
        total: ''
      }});
    }
  }
};

