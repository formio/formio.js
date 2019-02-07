import sinon from 'sinon';
import assert from 'power-assert';
import Harness from '../harness';

export default {
  title: 'Form Validation Test',
  /* eslint-disable */
  form: {
    "components": [
      {
        "label": "validationCall Text 1",
        "allowMultipleMasks": false,
        "showWordCount": false,
        "showCharCount": false,
        "tableView": true,
        "alwaysEnabled": false,
        "type": "textfield",
        "input": true,
        "key": "textField",
        "defaultValue": "",
        "validate": {
          "custom": "console.log('1');\nvalid = true;",
          "unique": false,
          "customMessage": "",
          "json": ""
        },
        "inputFormat": "plain",
        "encrypted": false
      },
      {
        "label": "validationCall Number 1",
        "mask": false,
        "tableView": true,
        "alwaysEnabled": false,
        "type": "number",
        "input": true,
        "key": "number",
        "validate": {
          "custom": "console.log('2');\nvalid = true;",
          "customMessage": "",
          "json": ""
        },
        "delimiter": false,
        "requireDecimal": false,
        "encrypted": false,
        "properties": {},
        "tags": []
      },
      {
        "type": "button",
        "label": "Submit",
        "key": "submit",
        "disableOnInvalid": true,
        "theme": "primary",
        "input": true,
        "tableView": true
      }
    ]
  },
  /* eslint-enable */
  tests: {
    'validationCall Text 1 change should not trigger number validation'(form, done) {
      const [textfield, number] = form.components;
      const textCheckSpy = sinon.spy(textfield, 'checkValidity');
      const textEvalSpy = sinon.spy(textfield, 'evaluate');
      const numberCheckSpy = sinon.spy(number, 'checkValidity');
      const numberEvalSpy = sinon.spy(number, 'evaluate');

      Harness.setInputValue(textfield, 'data[textField]', 'a');

      setTimeout(() => {
        assert.equal(textCheckSpy.callCount, 2);
        assert.equal(textEvalSpy.callCount, 1);
        assert.equal(numberCheckSpy.callCount, 2);
        assert.equal(numberEvalSpy.callCount, 0);
        done();
      }, 250);
    },
    'validationCall Number 1 change should not trigger text validation'(form, done) {
      const [textfield, number] = form.components;
      const textCheckSpy = sinon.spy(textfield, 'checkValidity');
      const textEvalSpy = sinon.spy(textfield, 'evaluate');
      const numberCheckSpy = sinon.spy(number, 'checkValidity');
      const numberEvalSpy = sinon.spy(number, 'evaluate');

      Harness.setInputValue(number, 'data[number]', 1);

      setTimeout(() => {
        assert.equal(textCheckSpy.callCount, 2);
        assert.equal(textEvalSpy.callCount, 0);
        assert.equal(numberCheckSpy.callCount, 2);
        assert.equal(numberEvalSpy.callCount, 1);
        done();
      }, 250);
    },
    'All validations should trigger when fileds are touched.'(form, done) {
      const [textfield, number] = form.components;
      const textCheckSpy = sinon.spy(textfield, 'checkValidity');
      const textEvalSpy = sinon.spy(textfield, 'evaluate');
      const numberCheckSpy = sinon.spy(number, 'checkValidity');
      const numberEvalSpy = sinon.spy(number, 'evaluate');

      Harness.setInputValue(textfield, 'data[textField]', 'a');
      Harness.setInputValue(number, 'data[number]', 1);

      setTimeout(() => {
        assert.equal(textCheckSpy.callCount, 2);
        assert.equal(textEvalSpy.callCount, 1);
        assert.equal(numberCheckSpy.callCount, 2);
        assert.equal(numberEvalSpy.callCount, 1);
        done();
      }, 250);
    }
  }
};
