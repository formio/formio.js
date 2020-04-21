import Harness from '../test/harness';
import Wizard from './Wizard';
import assert from 'power-assert';
import wizard from '../test/forms/wizardValidationOnPageChanged';
import wizard1 from '../test/forms/wizardValidationOnNextBtn';

describe('Wizard tests', () => {
  let wizardForm = null;
  it('Should set components errors if they are after page was changed with navigation', (done) => {
      const formElement = document.createElement('div');
      wizardForm = new Wizard(formElement);
      wizardForm.setForm(wizard).then(() => {
        Harness.testErrors(wizardForm, {
          data: {
            a: '1',
            c: '',
            textField: ''
          }
        },
        [{
          component: 'a',
          message: 'a must have at least 4 characters.'
        }], done);
        Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][2]);
        assert.equal(wizardForm.page, 2);
        setTimeout(() => {
          Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][0]);
          assert.equal(wizardForm.page, 0);
          setTimeout(() => {
            const aInput = wizardForm.currentPage.getComponent('a');
            assert.equal(aInput.errors.length, 1);
            assert.equal(aInput.errors[0].message, 'a must have at least 4 characters.');
            done();
          }, 100);
        }, 100);
    })
    .catch((err) => done(err));
  });

  it('Should leave errors for invalid fields after validation on next button and entering valid data in one of the fields', function(done) {
    const formElement = document.createElement('div');
    wizardForm = new Wizard(formElement);
    wizardForm.setForm(wizard1).then(() => {
      Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-next`]);
      setTimeout(() => {
        assert.equal(wizardForm.errors.length, 2);

        const inputEvent = new Event('input', { bubbles: true, cancelable: true });
        const inputA = formElement.querySelector('input[name="data[a]"]');

        for (let i = 0; i < 5; i++) {
          inputA.value += i;
          inputA.dispatchEvent(inputEvent);
        }

        setTimeout(() => {
          assert.equal(wizardForm.errors.length, 1);
          done();
        }, 250);
      }, 250);
    })
    .catch((err) => done(err));
  });

  it('Should not set components errors if in readOnly mode', (done) => {
    const formElement = document.createElement('div');
    wizardForm = new Wizard(formElement, { readOnly: true });
    wizardForm.setForm(wizard).then(() => {
      Harness.testSubmission(wizardForm, {
        data: {
          a: '1',
          textField: 'aaa',
          c: '0'
        }
      });

      Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][2]);
      assert.equal(wizardForm.page, 2);
      Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][0]);
      assert.equal(wizardForm.page, 0);
      const aInput = wizardForm.currentPage.getComponent('a');
      assert.equal(aInput.errors.length, 0);
      done();
    });
  });
});
