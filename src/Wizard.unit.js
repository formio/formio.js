import Harness from '../test/harness';
import Wizard from './Wizard';
import Formio from './Formio';
import assert from 'power-assert';
import _ from 'lodash';
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
import wizardWithTooltip from '../test/forms/wizardWithTooltip';
import wizardForHtmlModeTest from '../test/forms/wizardForHtmlRenderModeTest';
import wizardTestForm from '../test/forms/wizardTestForm';

describe('Wizard tests', () => {
  it('Should render values in HTML render mode', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement, {
      readOnly: true,
      renderMode: 'html'
    });
    const form = _.cloneDeep(wizardTestForm.form);

    wizard.setForm(form, ).then(() => {
      const clickWizardBtn = (pathPart, clickError) => {
        const btn = _.get(wizard.refs, clickError ? pathPart : `${wizard.wizardKey}-${pathPart}`);
        const clickEvent = new Event('click');
        btn.dispatchEvent(clickEvent);
      };

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      const checkValues = () => {
        wizard.allPages[wizard.page].everyComponent((comp) => {
          const isParent = !!(comp.component.components || comp.component.rows || comp.component.columns);

          if (!isParent) {
            const isInEditGrid = comp.parent.component.type === 'editgrid';
            const value = isInEditGrid ? comp.parent.refs['editgrid-editGrid-row'][comp.rowIndex].textContent.trim() : comp.element.querySelector("[ref='value']").textContent;
            const expectedValue = _.get(wizardTestForm.htmlModeValues, comp.path, 'no data');

            assert.equal(value, expectedValue === 'true' ?  'True' : expectedValue, `${comp.component.key}: should render value in html render mode`);
          }
        });
      };

      wizard.submission = _.cloneDeep(wizardTestForm.submission);

      setTimeout(() => {
        checkPage(0);
        checkValues();
        clickWizardBtn('next');

        setTimeout(() => {
          checkPage(1);
          checkValues();
          clickWizardBtn('next');

          setTimeout(() => {
            checkPage(2);
            checkValues();
            done();
          }, 200);
        }, 200);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should exacute advanced logic for wizard pages', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const form = _.cloneDeep(wizardTestForm.form);
    _.each(form.components, (comp, index) => {
      if (index === 1) {
        comp.logic = [
          {
            name: 'simple logic',
            trigger: { type: 'simple', simple: { show: true, when: 'textField', eq: 'tooltip' } },
            actions: [
              {
                name: 'merge schema action',
                type: 'mergeComponentSchema',
                schemaDefinition: "schema = { tooltip: 'some tooltip'}"
              }
            ]
          }
        ];
       }
      if (index === 2) {
        comp.logic = [
          {
            name: 'logic test',
            trigger: { type: 'simple', simple: { show: true, when: 'checkbox', eq: 'true' } },
            actions: [
              {
                name: 'disabled',
                type: 'property',
                property: { label: 'Disabled', value: 'disabled', type: 'boolean' },
                state: true
              }
            ]
          }
        ];
      }
     });

    wizard.setForm(form).then(() => {
      const clickWizardBtn = (pathPart, clickError) => {
        const btn = _.get(wizard.refs, clickError ? pathPart : `${wizard.wizardKey}-${pathPart}`);
        const clickEvent = new Event('click');
        btn.dispatchEvent(clickEvent);
      };

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      checkPage(0);
      wizard.getComponent('textField').setValue('tooltip');
      clickWizardBtn('next');

      setTimeout(() => {
        checkPage(1);
        assert.equal(wizard.tooltips.length, 1, 'Should have tooltip after advanced logic execution');
        assert.equal(!!wizard.refs[`${wizard.wizardKey}-tooltip`][0], true, 'Should render tooltip icon');

        wizard.getComponent('checkbox').setValue(true);
        clickWizardBtn('next');

        setTimeout(() => {
          checkPage(2);
          assert.equal(wizard.allPages[wizard.page].disabled, true, 'Should disable page components after advanced logic execution');
          done();
        }, 200);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should navigate next page according to advanced next page logic', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const form = _.cloneDeep(wizardTestForm.form);
    _.each(form.components, (comp, index) => {
      if (index === 0) {
        comp.nextPage = "next = data.textField === 'page3' ? 'page3' : 'page2'";
      }
      if (index === 1) {
        comp.nextPage = "next = data.container && data.container.select === 'value1' ? 'page1' : 'page3'";
      }
     });

    wizard.setForm(form).then(() => {
      const clickWizardBtn = (pathPart, clickError) => {
        const btn = _.get(wizard.refs, clickError ? pathPart : `${wizard.wizardKey}-${pathPart}`);
        const clickEvent = new Event('click');
        btn.dispatchEvent(clickEvent);
      };

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };
      checkPage(0);
      wizard.getComponent('textField').setValue('page3');
      clickWizardBtn('next');

      setTimeout(() => {
        checkPage(2);
        wizard.getComponent('select').setValue('value1');
        clickWizardBtn('previous');

        setTimeout(() => {
          checkPage(1);
          wizard.getComponent('checkbox').setValue(true);
          clickWizardBtn('next');

          setTimeout(() => {
            checkPage(0);
            done();
          }, 200);
        }, 200);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should not render breadcrumb if it has hidden type', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const form = _.cloneDeep(wizardTestForm.form);
    _.each(form.components, (comp) => {
      comp.breadcrumb = 'none';
    });

    wizard.setForm(form).then(() => {
      const clickWizardBtn = (pathPart, clickError) => {
        const btn = _.get(wizard.refs, clickError ? pathPart : `${wizard.wizardKey}-${pathPart}`);
        const clickEvent = new Event('click');
        btn.dispatchEvent(clickEvent);
      };

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      const checkBreadcrumb = () => {
        assert.equal(_.get(wizard.refs, `${wizard.wizardKey}-link`).length, 0, 'Should not render wizard breadcrumb');
      };

      checkBreadcrumb();
      wizard.setSubmission(_.cloneDeep(wizardTestForm.submission));

      setTimeout(() => {
        checkPage(0);
        checkBreadcrumb();
        clickWizardBtn('next');

        setTimeout(() => {
          checkPage(1);
          checkBreadcrumb();
          clickWizardBtn('next');

          setTimeout(() => {
            checkPage(2);
            checkBreadcrumb();
            done();
          }, 100);
        }, 100);
      }, 100);
    })
    .catch((err) => done(err));
  });

  it('Should not navigate between wizard pages on breadcrumb click if breadcrumbClickable is false', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const form = _.cloneDeep(wizardTestForm.form);
    _.each(form.components, (comp) => {
      comp.breadcrumbClickable = false;
    });

    wizard.setForm(form).then(() => {
      const clickWizardBtn = (pathPart, clickError) => {
        const btn = _.get(wizard.refs, clickError ? pathPart : `${wizard.wizardKey}-${pathPart}`);
        const clickEvent = new Event('click');
        btn.dispatchEvent(clickEvent);
      };

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      checkPage(0);
      clickWizardBtn('link[1]');

      setTimeout(() => {
        checkPage(0);
        clickWizardBtn('link[2]');

        setTimeout(() => {
          checkPage(0);
          wizard.setSubmission(_.cloneDeep(wizardTestForm.submission));

          setTimeout(() => {
            checkPage(0);
            clickWizardBtn('next');

            setTimeout(() => {
              checkPage(1);
              clickWizardBtn('link[0]');

              setTimeout(() => {
                checkPage(1);
                done();
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    })
    .catch((err) => done(err));
  });

  it('Should set/get wizard submission', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);

    wizard.setForm(wizardTestForm.form).then(() => {
      wizard.submission = _.cloneDeep(wizardTestForm.submission);

      setTimeout(() => {
        assert.deepEqual(wizard.data, wizardTestForm.submission.data, 'Should set wizard submission');
        assert.deepEqual(wizard.submission.data, wizardTestForm.submission.data, 'Should get wizard submission data');

        wizard.everyComponent((comp) => {
          const expectedValue = _.get(wizardTestForm.submission.data, comp.path, 'no data');
          if (expectedValue !== 'no data') {
            assert.deepEqual(comp.getValue(), expectedValue, `Should set value for ${comp.component.type} inside wizard`);
            assert.deepEqual(comp.dataValue, expectedValue, `Should set value for ${comp.component.type} inside wizard`);
          }
        });
        done();
      }, 300);
    })
    .catch((err) => done(err));
  });

  it('Should show validation alert and components` errors and navigate pages after clicking alert error', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);

    wizard.setForm(wizardTestForm.form).then(() => {
      const clickWizardBtn = (pathPart, clickError) => {
        const btn = _.get(wizard.refs, clickError ? pathPart : `${wizard.wizardKey}-${pathPart}`);
        const clickEvent = new Event('click');
        btn.dispatchEvent(clickEvent);
      };

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      const checkInvalidComp = (compKey, highLight) => {
        const comp = wizard.getComponent(compKey);

        assert.deepEqual(!!comp.error, true, `${compKey}: should have error`);
        assert.deepEqual(comp.error.message, `${comp.component.label} is required`, `${compKey}: should have correct required validation message`);
        assert.deepEqual(comp.pristine, false, `${compKey}: should set pristine to false`);
        assert.deepEqual(comp.element.classList.contains(`${highLight ? 'formio-error-wrapper' : 'has-error'}`), true, `${compKey}: should set error class`);
        assert.deepEqual(comp.refs.messageContainer.querySelector('.error').textContent.trim(), `${comp.component.label} is required`, `${compKey}: should display error message`);
      };

      checkPage(0);
      clickWizardBtn('link[2]');

      setTimeout(() => {
        checkPage(2);
        assert.equal(wizard.errors.length, 0, 'Should not have validation errors');

        clickWizardBtn('submit');

        setTimeout(() => {
          assert.equal(wizard.errors.length, 3, 'Should have validation errors');
          assert.equal(wizard.refs.errorRef.length, wizard.errors.length, 'Should show alert with validation errors');
          assert.equal(!!wizard.element.querySelector('.alert-danger'), true, 'Should have alert with validation errors');
          checkInvalidComp('select', true);
          clickWizardBtn('errorRef[0]', true);

          setTimeout(() => {
            checkPage(0);

            assert.equal(wizard.errors.length, 1, 'Should have page validation error');
            assert.equal(wizard.refs.errorRef.length, 3, 'Should keep alert with validation errors');
            checkInvalidComp('textField');
            clickWizardBtn('errorRef[1]', true);

            setTimeout(() => {
              checkPage(1);

              assert.equal(wizard.errors.length, 1, 'Should have page validation error');
              assert.equal(wizard.refs.errorRef.length, 3, 'Should keep alert with validation errors');
              checkInvalidComp('checkbox');
              wizard.getComponent('checkbox').setValue(true);

              setTimeout(() => {
                checkPage(1);
                assert.equal(wizard.errors.length, 0, 'Should not have page validation error');
                assert.equal(wizard.refs.errorRef.length, 2, 'Should keep alert with validation errors');
                clickWizardBtn('errorRef[1]', true);

                setTimeout(() => {
                  checkPage(2);

                  assert.equal(wizard.errors.length, 2, 'Should have wizard validation errors');
                  assert.equal(wizard.refs.errorRef.length, 2, 'Should keep alert with validation errors');
                  wizard.getComponent('select').setValue('value1');

                  setTimeout(() => {
                    assert.equal(wizard.errors.length, 1, 'Should have wizard validation error');
                    assert.equal(wizard.refs.errorRef.length, 1, 'Should keep alert with validation errors');
                    clickWizardBtn('errorRef[0]', true);

                    setTimeout(() => {
                      checkPage(0);

                      assert.equal(wizard.errors.length, 1, 'Should have page validation error');
                      assert.equal(wizard.refs.errorRef.length, 1, 'Should keep alert with validation errors');
                      wizard.getComponent('textField').setValue('valid');

                      setTimeout(() => {
                        assert.equal(wizard.errors.length, 0, 'Should not have page validation error');
                        assert.equal(!!wizard.element.querySelector('.alert-danger'), false, 'Should not have alert with validation errors');
                        clickWizardBtn('link[2]');

                        setTimeout(() => {
                          clickWizardBtn('submit');
                          setTimeout(() => {
                            assert.equal(wizard.submission.state, 'submitted', 'Should submit the form');
                            done();
                          }, 300);
                        }, 300);
                      }, 300);
                    }, 300);
                  }, 300);
                }, 300);
              }, 300);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    })
    .catch((err) => done(err));
  }).timeout(3500);

  it('Should navigate wizard pages using navigation buttons and breadcrumbs', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);

    wizard.setForm(wizardTestForm.form).then(() => {
      const clickNavigationBtn = (pathPart) => {
        const btn = _.get(wizard.refs, `${wizard.wizardKey}-${pathPart}`);
        const clickEvent = new Event('click');
        btn.dispatchEvent(clickEvent);
      };

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };
      checkPage(0);
      clickNavigationBtn('next');

      setTimeout(() => {
        checkPage(0);

        assert.equal(wizard.errors.length, 1, 'Should have validation error');
        assert.equal(wizard.refs.errorRef.length, wizard.errors.length, 'Should show alert with validation error');

        wizard.getComponent('textField').setValue('valid');

        clickNavigationBtn('next');

        setTimeout(() => {
          checkPage(1);
          clickNavigationBtn('next');

          setTimeout(() => {
            checkPage(1);

            assert.equal(wizard.errors.length, 1, 'Should have validation error');
            assert.equal(wizard.refs.errorRef.length, wizard.errors.length, 'Should show alert with validation error');

            clickNavigationBtn('previous');

            setTimeout(() => {
              checkPage(0);

              assert.equal(wizard.errors.length, 0, 'Should not have validation error');
              assert.equal(!!wizard.refs.errorRef, false, 'Should not have alert with validation error');

              clickNavigationBtn('next');

              setTimeout(() => {
                checkPage(1);
                assert.equal(wizard.errors.length, 1, 'Should have validation error');
                wizard.getComponent('checkbox').setValue(true);

                clickNavigationBtn('next');

                setTimeout(() => {
                  checkPage(2);
                  assert.equal(wizard.errors.length, 0, 'Should not have validation error');
                  clickNavigationBtn('link[0]');

                  setTimeout(() => {
                    checkPage(0);
                    assert.equal(wizard.errors.length, 0, 'Should not have validation error');
                    clickNavigationBtn('link[2]');

                    setTimeout(() => {
                      checkPage(2);
                      done();
                    }, 50);
                  }, 50);
                }, 50);
              }, 50);
            }, 50);
          }, 50);
        }, 50);
      }, 50);
    })
    .catch((err) => done(err));
  });

  it('Should correctly set values in HTML render mode', function(done) {
    const formElement = document.createElement('div');
    const formHTMLMode = new Wizard(formElement, {
      readOnly: true,
      renderMode: 'html'
    });

    formHTMLMode.setForm(wizardForHtmlModeTest.form).then(() => {
      formHTMLMode.setSubmission(wizardForHtmlModeTest.submission);

      setTimeout(() => {
        const numberValue = formHTMLMode.element.querySelector('[ref="value"]').textContent;
        assert.equal(+numberValue, wizardForHtmlModeTest.submission.data.number);

        const nextPageBtn = formHTMLMode.refs[`${formHTMLMode.wizardKey}-next`];
        const clickEvent = new Event('click');
        nextPageBtn.dispatchEvent(clickEvent);

        setTimeout(() => {
          const textValue = formHTMLMode.element.querySelector('[ref="value"]').textContent;
          assert.equal(textValue, wizardForHtmlModeTest.submission.data.textField);

          done();
        }, 250);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should show tooltip for wizard pages', function(done) {
    const formElement = document.createElement('div');
    const wizardWithPageTooltip = new Wizard(formElement);

    wizardWithPageTooltip.setForm(wizardWithTooltip).then(() => {
      const clickEvent = new Event('click');

      assert.equal(wizardWithPageTooltip.tooltips.length, 1);

      const pageTooltipIcon = wizardWithPageTooltip.refs[`${wizardWithPageTooltip.wizardKey}-tooltip`][0];

      assert.equal(!!pageTooltipIcon, true);

      pageTooltipIcon.dispatchEvent(clickEvent);

      setTimeout(() => {
        const tooltipText = wizardWithPageTooltip.element.querySelector('.tooltip-inner').textContent;
        assert.equal(tooltipText, wizardWithPageTooltip.currentPanel.tooltip);

        done();
      }, 250);
    })
    .catch((err) => done(err));
  });

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
