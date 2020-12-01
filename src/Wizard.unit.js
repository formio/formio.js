import Harness from '../test/harness';
import Wizard from './Wizard';
import Formio from './Formio';
import assert from 'power-assert';
import wizardCond from '../test/forms/wizardConditionalPages';
import wizard from '../test/forms/wizardValidationOnPageChanged';
import wizard1 from '../test/forms/wizardValidationOnNextBtn';
import wizard2 from '../test/forms/wizardWithEditGrid';
import wizard3 from '../test/forms/conditionalWizardPages';
import wizard4 from '../test/forms/wizardWithSimpleConditionalPage';
import wizard5 from '../test/forms/wizardWithCustomConditionalPage';
import wizard6 from '../test/forms/wizardWithFirstConditionalPage';
import wizardWithHighPages from '../test/forms/wizardWithHighPages';
import wizardWithHiddenPanel from '../test/forms/wizardWithHiddenPanel';
import wizardWithAllowPrevious from '../test/forms/wizardWithAllowPrevious';
import formWithSignature from '../test/forms/formWithSignature';

describe('Wizard tests', () => {
  it('Should not clear wizard data when navigating between wizard pages with hidden panel', function(done) {
    const formElement = document.createElement('div');
    const formWithHiddenPage = new Wizard(formElement);

    formWithHiddenPage.setForm(wizardWithHiddenPanel).then(() => {
      const clickEvent = new Event('click');
      const inputEvent = new Event('input');

      assert.equal(formWithHiddenPage.pages.length, 2);

      const page1Field = formWithHiddenPage.element.querySelector('[name="data[number]"]');

      page1Field.value = '555';
      page1Field.dispatchEvent(inputEvent);

      setTimeout(() => {
        assert.equal(formWithHiddenPage.element.querySelector('[name="data[number]"]').value, 555);

        const nextPageBtn = formWithHiddenPage.refs[`${formWithHiddenPage.wizardKey}-next`];
        nextPageBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          assert.equal(formWithHiddenPage.page, 1);

          const prevPageBtn = formWithHiddenPage.refs[`${formWithHiddenPage.wizardKey}-previous`];
          prevPageBtn.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(formWithHiddenPage.page, 0);
            assert.equal(formWithHiddenPage.element.querySelector('[name="data[number]"]').value, 555);

            done();
          }, 250);
        }, 200);
      }, 100);
    })
    .catch((err) => done(err));
  });

  it('Should show signature submission in HTML render mode', function(done) {
    const formElement = document.createElement('div');
    const formWithSignatureHTMLMode = new Wizard(formElement, {
      readOnly: true,
      renderMode: 'html'
    });

    formWithSignatureHTMLMode.setForm(formWithSignature.form).then(() => {
      formWithSignatureHTMLMode.setSubmission(formWithSignature.submission);

      setTimeout(() => {
        const signatureImage = formWithSignatureHTMLMode.element.querySelector('[ref="signatureImage"]');
        assert.equal(signatureImage.src === formWithSignature.submission.data.signature, true);

        done();
      }, 200);
    })
    .catch((err) => done(err));
  });

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
          assert.deepEqual(wizardWithSimpleConditionalPage.data, submissionData);
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
            assert.deepEqual(wizardWithCustomConditionalPage.data, submissionData);

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

  it('Should show first conditional wizard page', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);

    wizard.setForm(wizard6).then(() => {
      assert.equal(wizard.pages.length, 1);
      assert.equal(wizard.components.length, 1);
      assert.equal(wizard.page, 0);
      assert.equal(wizard.refs[`wizard-${wizard.id}-previous`], null);
      assert.equal(
        wizard.refs[
          `wizard-${wizard.id}-link`
        ][0].parentElement.classList.contains('active'),
        true
      );
      wizard.setValue({
        data: { b: 'true' },
      });
      setTimeout(() => {
        assert.equal(wizard.pages.length, 2);
        assert.equal(wizard.components.length, 2);
        assert.equal(wizard.page, 1);
        assert.notEqual(wizard.refs[`wizard-${wizard.id}-previous`], null);
        assert.equal(
          wizard.refs[
            `wizard-${wizard.id}-link`
          ][1].parentElement.classList.contains('active'),
          true
        );
        done();
      }, 300);
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

    assert.deepEqual(form.data, submission.data, 'Should set data properly');
    // Perform calculations and conditions.
    form.calculateValue();
    form.checkConditions();

    assert(form.components[2], 'Should contain the 3rd page');
    assert.equal(form.components[2].visible, true, 'Should be visible');

    const textField = form.components[2].components[0];

    assert.equal(textField.visible, true, 'Inner components of the 3rd page should be visible');
    assert.equal(textField.parentVisible, true, 'parentVisible of the 3rd page\'s child components should be equal to true');

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

  it('If allowPrevious is given, the breadcrumb bar should be clickable for visited tabs.', (done) => {
    const formElement = document.createElement('div');
    wizardForm = new Wizard(formElement, { allowPrevious: true });
    wizardForm.setForm(wizardWithAllowPrevious)
      .then(() => {
        Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-link`][1]);

        setTimeout(() => {
          assert.equal(wizardForm.page, 0, 'Should be disabled for unvisited tabs.');
          Harness.clickElement(wizardForm, wizardForm.refs[`${wizardForm.wizardKey}-next`]);

          setTimeout(() => {
            assert.equal(wizardForm.enabledIndex, 1, 'Should be clickable for visited tabs.');
            done();
          }, 100);
        }, 100);
      })
      .catch(done);
  });

  it('Should scroll to the top of the page when the page is changed', (done) => {
    const formElement = document.createElement('div');
    wizardForm = new Wizard(formElement);
    wizardForm.setForm(wizardWithHighPages)
      .then(() => {
        wizardForm.scrollIntoView(wizardForm.refs[`${wizardForm.wizardKey}-next`]);
        wizardForm.setPage(1);
        setTimeout(() => {
          assert.equal(wizardForm.refs[wizardForm.wizardKey].scrollTop, 0, 'The top edge of the page should be aligned to the top edge of the window');
          done();
        }, 350);
      })
      .catch(done);
  });
});
