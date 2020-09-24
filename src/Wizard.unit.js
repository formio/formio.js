import _ from 'lodash';
import Harness from '../test/harness';
import Wizard from './Wizard';
import EditGrid from './components/editgrid/EditGrid';
import Formio from './Formio';
import assert from 'power-assert';
import wizardCond from '../test/forms/wizardConditionalPages';
import wizard from '../test/forms/wizardValidationOnPageChanged';
import wizard1 from '../test/forms/wizardValidationOnNextBtn';
import wizard2 from '../test/forms/wizardWithEditGrid';
import wizard3 from '../test/forms/conditionalWizardPages';
import wizard4 from '../test/forms/wizardWithAddWizardPage';
import wizard5 from '../test/forms/wizardWithAddWizardPageField';
import wizard6 from '../test/forms/wizardWithSimpleConditionalPage';
import wizard7 from '../test/forms/wizardWithCustomConditionalPage';

describe('Wizard tests', () => {
  it('Should display conditional page after setting submission', function(done) {
    const formElement = document.createElement('div');
    const wizardWithSimpleConditionalPage = new Wizard(formElement);

    wizardWithSimpleConditionalPage.setForm(wizard4).then(() => {
      setTimeout(() => {
        assert.equal(wizardWithSimpleConditionalPage.pages.length, 1);
        assert.equal(wizardWithSimpleConditionalPage.components.length, 1);
        const submissionData = { checkbox: true, number: 555 };
        wizardWithSimpleConditionalPage.setSubmission({ data:submissionData });

        setTimeout(() => {
          assert.equal(wizardWithSimpleConditionalPage.pages.length, 2);
          assert.equal(wizardWithSimpleConditionalPage.components.length, 2);
          assert.equal(wizardWithSimpleConditionalPage.data, submissionData);
          done();
        }, 500);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should display submission data on page with custom conditional logic in readOnly', function(done) {
    const formElement = document.createElement('div');
    const wizardWithCustomConditionalPage = new Wizard(formElement);

    wizardWithCustomConditionalPage.setForm(wizard5).then(() => {
      setTimeout(() => {
        wizardWithCustomConditionalPage.disabled = true;

        if (wizardWithCustomConditionalPage.options) {
          wizardWithCustomConditionalPage.options.readOnly = true;
        }
        else {
          wizardWithCustomConditionalPage.options = { readOnly: true };
        }

        setTimeout(() => {
          assert.equal(wizardWithCustomConditionalPage.pages.length, 1);
          assert.equal(wizardWithCustomConditionalPage.components.length, 1);

          const submissionData = { checkbox: true, number: 555 };

          wizardWithCustomConditionalPage.setSubmission({ data:submissionData });

          setTimeout(() => {
            assert.equal(wizardWithCustomConditionalPage.pages.length, 2);
            assert.equal(wizardWithCustomConditionalPage.components.length, 2);
            assert.equal(wizardWithCustomConditionalPage.data, submissionData);

            const clickEvent = new Event('click');
            const secondPageBtn = wizardWithCustomConditionalPage.refs[`${wizardWithCustomConditionalPage.wizardKey}-link`][1];

            secondPageBtn.dispatchEvent(clickEvent);

            setTimeout(() => {
              assert.equal(wizardWithCustomConditionalPage.page, 1);

              const numberComponent = wizardWithCustomConditionalPage.element.querySelector('[name="data[number]"]');

              assert.equal(numberComponent.value, 555);

              done();
            }, 400);
          }, 300);
        }, 200);
      }, 100);
    })
    .catch((err) => done(err));
  });

  it('Should show conditional wizard page', function(done) {
    const formElement = document.createElement('div');
    const wizardWithConditionalPage = new Wizard(formElement);

    wizardWithConditionalPage.setForm(wizard3).then(() => {
      setTimeout(() => {
        assert.equal(wizardWithConditionalPage.pages.length, 1);
        assert.equal(wizardWithConditionalPage.components.length, 1);

        const inputEvent = new Event('input');
        const numberComponent = wizardWithConditionalPage.element.querySelector('[name="data[number]"]');

        numberComponent.value = 5;
        numberComponent.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal(wizardWithConditionalPage.pages.length, 2);
          assert.equal(wizardWithConditionalPage.components.length, 2);

          done();
        }, 300);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should display editGrid submission data in readOnly mode', (done) => {
    const formElement = document.createElement('div');
    const wizardForm = new Wizard(formElement, { readOnly: true });
    wizardForm.setForm(wizard2).then(() => {
      wizardForm.setValue({ data: { editGrid: [{ textField: '111' }], number: 222 } });
      setTimeout(() => {
        assert.equal(wizardForm.element.querySelector('[name="data[number]"]').value, '222');

        Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][1]);

        setTimeout(() => {
          assert.equal(wizardForm.page, 1);

          const ditGridRowValue = wizardForm.element.querySelector('[ref = "editgrid-editGrid-row"]').querySelector('.col-sm-2').textContent.trim();
          assert.equal(ditGridRowValue, '111');
          done();
        }, 300);
      }, 100);
    })
      .catch((err) => done(err));
  });

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

  it('Should keep values during validation that are conditionally visible', async() => {
    const submission = {
      data: {
        a: true,
        b: 'b',
        c: 'c'
      }
    };

    const form = await Formio.createForm(wizardCond, {});

    form.validator.config = {
      db: {},
      token: '',
      form: wizardCond,
      submission: submission
    };

    // Set the submission data
    form.data = submission.data;

    // Perform calculations and conditions.
    form.calculateValue();
    form.checkConditions();

    // Reset the data
    form.data = {};

    form.setValue(submission, {
      sanitize: true
    });

    // Check the validity of the form.
    const valid = await form.checkAsyncValidity(null, true);

    assert(valid, 'Should be valid');
    assert.equal(form.data.c, 'c', 'Should keep the value of a conditionally visible page.');
  });

  it('Should replace components of the current page with addWizardPage component', (done) => {
    const formElement = document.createElement('div');
    wizardForm = new Wizard(formElement);
    const editGrid = new EditGrid(wizard7);
    wizardForm.setForm(wizard6).then(() => {
      wizardForm.prevPageState = _.clone(wizardForm.currentPage.components);
      wizardForm.emit('renderRows', editGrid);

      setTimeout(() => {
        assert.deepEqual(wizardForm.currentPage.components[0].key, 'addWizardPage', 'The AddWizardPage component should replace the whole form on the page.');

        setTimeout(() => {
          wizardForm.emit('onSaveAddPage', editGrid);
          assert.deepEqual(wizardForm.currentPage.components, wizardForm.prevPageState, 'Should return previous state.');

          done();
        }, 200);
      }, 100);
    })
      .catch((err) => done(err));
  });
});
