/* eslint-disable no-unused-vars */
import Harness from '../harness';
import Wizard from '../../src/Wizard';
import { Formio } from '../../src/Formio';
import assert from 'power-assert';
import _ from 'lodash';
import wizardCond from '../forms/wizardConditionalPages';
import wizard from '../forms/wizardValidationOnPageChanged';
import wizard1 from '../forms/wizardValidationOnNextBtn';
import wizard2 from '../forms/wizardWithEditGrid';
import wizard3 from '../forms/conditionalWizardPages';
import wizard4 from '../forms/wizardWithSimpleConditionalPage';
import wizard5 from '../forms/wizardWithCustomConditionalPage';
import wizard6 from '../forms/wizardWithFirstConditionalPage';
import wizardWithHighPages from '../forms/wizardWithHighPages';
import wizardWithHiddenPanel from '../forms/wizardWithHiddenPanel';
import wizardWithAllowPrevious from '../forms/wizardWithAllowPrevious';
import wizardWithNestedWizard from '../forms/wizardWithNestedWizard';
import formWithSignature from '../forms/formWithSignature';
import wizardWithTooltip from '../forms/wizardWithTooltip';
import wizardForHtmlModeTest from '../forms/wizardForHtmlRenderModeTest';
import wizardTestForm from '../forms/wizardTestForm';
import wizardTestFormWithNestedComponents from '../forms/wizardTestFormWithNestedComponents';
import formWithNestedWizard from '../forms/formWIthNestedWizard';
import wizardWithDataGridAndEditGrid from '../forms/wizardWithDataGridAndEditGrid';
import customWizard from '../forms/customWizard';
//import wizardChildForm from '../test/forms/wizardChildForm';
//import wizardParentForm from '../test/forms/wizardParentForm';
import wizardWithComponentsWithSameApi from '../forms/wizardWithComponentsWithSameApi';
import wizardWithConditionallyVisiblePage from '../forms/conditionallyVisiblePage';
import wizardWithPanel from '../forms/wizardWithPanel';
import wizardWithWizard from '../forms/wizardWithWizard';
import simpleTwoPagesWizard from '../forms/simpleTwoPagesWizard';
import wizardWithNestedWizardInEditGrid from '../forms/wizardWithNestedWizardInEditGrid';
import wizardNavigateOrSaveOnEnter from '../forms/wizardNavigateOrSaveOnEnter';
import nestedConditionalWizard from '../forms/nestedConditionalWizard';
import wizardWithPrefixComps from '../forms/wizardWithPrefixComps';
import wizardPermission from '../forms/wizardPermission';
import formWithFormController from '../forms/formWithFormController';
import { fastCloneDeep } from '../../src/utils/utils';
import formsWithAllowOverride from '../forms/formsWithAllowOverrideComps';
import WizardWithCheckboxes from '../forms/wizardWithCheckboxes';
import WizardWithRequiredFields from '../forms/wizardWithRequiredFields';
import formWithNestedWizardAndRequiredFields from '../forms/formWithNestedWizardAndRequiredFields';
import simpleWizardWithRequiredFields from '../forms/simpleWizardWithRequiredFields';
import { wait } from '../util';

// eslint-disable-next-line max-statements
describe('Wizard tests', () => {
  // helpers
  const clickWizardBtn = (wizard, pathPart, clickError) => {
    const btn = _.get(wizard.refs, clickError ? pathPart : `${wizard.wizardKey}-${pathPart}`);
    const clickEvent = new Event('click');
    btn.dispatchEvent(clickEvent);
  };



const parentForm = {
  "_id": "677d3efea934773d422a05fa",
  "title": "Wizard parent",
  "name": "fdAsWizardParent",
  "path": "fdaswizardparent",
  "type": "form",
  "display": "wizard",
  "components": [
    {
      "title": "Page 1",
      "key": "page1",
      "type": "panel",
      "components": []
    },
    {
      "title": "Page 2",
      "key": "page2",
      "type": "panel",
      "components": [
        {
          "label": "Form",
          "key": "form",
          "type": "form",
          "form": "677d3efea934773d422a05f3",
          "lazyLoad": true
        }
      ]
    },
    {
      "title": "Page 3",
      "key": "page3",
      "type": "panel",
      "components": []
    }
  ]
};

const childFormOwner = {
  "_id": "677d3efea934773d422a05f3",
  "title": "Wizard Child Owner",
  "name": "fdaWizardChildOwner",
  "path": "fdawizardchildOwner",
  "type": "form",
  "components": [
    {
      "label": "Form",
      "key": "form",
      "type": "form",
      "form": "677d3efea934773d422a05ec",
      "lazyLoad": true
    },
    {
      "label": "Submit",
      "key": "submit",
      "type": "button"
    }
  ]
};



const childForm = {
  "_id": "677d3efea934773d422a05ec",
  "title": "Wizard Child",
  "name": "WizardChild",
  "path": "wizardchild",
  "type": "form",
  "components": [
    {
      "label": "Text Field",
      "key": "textField",
      "type": "textfield",
      "validate": {
        "required": true
      }
    },
    {
      "label": "Submit",
      "key": "submit",
      "type": "button"
    }
  ]
};

describe('Wizard Form with Nested Form validation', () => {
  const originalMakeRequest = Formio.makeRequest;
  let postRequestCount = 0;

  before(() => {
    // Mock Formio.makeRequest to count POST requests and serve mock forms
    Formio.makeRequest = (formio, type, url, method, data) => {
      if (type === 'form' && method === 'get') {
        if (url.includes('parentForm')) {
          return Promise.resolve(_.cloneDeep(parentForm));
        } else if (url.includes('677d3efea934773d422a05ec')) {
          return Promise.resolve(_.cloneDeep(childForm));
        } else if (url.includes('677d3efea934773d422a05f3')) {
          return Promise.resolve(_.cloneDeep(childFormOwner));
        }
      }
      if (type === 'submission' && ['put', 'post'].includes(method)) {
        postRequestCount++;
      }
      return Promise.resolve();
    };
  });

  after(() => {
    // Restore the original makeRequest
    Formio.makeRequest = originalMakeRequest;
  });

  it('Should validate wizard with nested forms with lazy load on without POST request (on client side)', async () => {
    const formElement = document.createElement('div');
    const wizard = await Formio.createForm(formElement, 'http://localhost:3000/idwqwhclwioyqbw/parentForm')
      // Navigate directly to the last page, don't open page with nested form to avoid loading before submission process
      wizard.setPage(2);
      await(300);

      // Assert we are on last
      assert.equal(wizard.page, 2, 'Should navigate to last');

      // Try to submit the form with empty data
      try {
        wizard.submit();
      }
      catch(err) {
        // Assert validation error
        assert(err, 'Should trigger validation error');
        assert.equal(err.length, 1);
        assert.equal(err[0].ruleName, 'required');

        // Assert no POST requests were made
        assert.equal(postRequestCount, 0, 'No submission POST requests should be made');
      }
  });
});

  it('Should recalculate values for components with "allow override" after wizard is canceled', function(done) {
    const formElement = document.createElement('div');
    Formio.createForm(formElement, formsWithAllowOverride.wizard).then((form) => {
      const calculatedValues = {
        number: 123,
        textField: 'test data',
        textArea: 'test data',
        radio: 'one'
      };

      const overridenValues = {
        number: 1233333,
        textField: 'test data3333',
        textArea: 'test data3333',
        radio: 'two'
      };

      const number = form.getComponent('number');
      const textArea = form.getComponent('textArea');
      const radio = form.getComponent('radio');
      const textField = form.getComponent('textField');
      const radioTrigger = form.getComponent('radio1');

      assert.equal(number.dataValue, number.emptyValue);
      assert.equal(textField.dataValue, textField.emptyValue);
      assert.equal(textArea.dataValue, textArea.emptyValue);
      assert.equal(radio.dataValue, calculatedValues.radio);

      radioTrigger.setValue('a');
      setTimeout(() => {
        // check if values are calculated correctly
        assert.equal(number.dataValue, calculatedValues.number);
        assert.equal(textField.dataValue, calculatedValues.textField);
        assert.equal(textArea.dataValue, calculatedValues.textArea);
        assert.equal(radio.dataValue, calculatedValues.radio);

        // override calculated values
        const numberInput = number.refs.input[0];
        const textFieldInput = textField.refs.input[0];
        const textAreaInput = textArea.refs.input[0];
        const radioInput =radio.refs.input[1];

        numberInput.value = overridenValues.number;
        textFieldInput.value = overridenValues.textField;
        textAreaInput.value = overridenValues.textArea;
        radioInput.checked = true;
        const inputEvent = new Event('input');
        const clickEvent = new Event('click');

        numberInput.dispatchEvent(inputEvent);
        textFieldInput.dispatchEvent(inputEvent);
        textAreaInput.dispatchEvent(inputEvent);
        radioInput.dispatchEvent(clickEvent);

        setTimeout(() => {
          // check if values are overriden
          assert.equal(number.getValue(), overridenValues.number);
          assert.equal(textField.dataValue, overridenValues.textField);
          assert.equal(textArea.dataValue, overridenValues.textArea);
          assert.equal(radio.dataValue, overridenValues.radio);
          // reset form
          form.cancel(true);

          setTimeout(() => {
            // make sure that values are reset
            assert.equal(number.dataValue, number.emptyValue);
            assert.equal(textField.dataValue, textField.emptyValue);
            assert.equal(textArea.dataValue, textArea.emptyValue);
            assert.equal(radio.dataValue, calculatedValues.radio);

            radioTrigger.setValue('a');
            setTimeout(() => {
              // check if values are recalculated correctly
              assert.equal(number.dataValue, calculatedValues.number);
              assert.equal(textField.dataValue, calculatedValues.textField);
              assert.equal(textArea.dataValue, calculatedValues.textArea);
              assert.equal(radio.dataValue, calculatedValues.radio);
              document.body.innerHTML = '';
              done();
            }, 300);
          }, 300);
        }, 300);
      }, 400);
    }).catch((err) => done(err));
  });

  it('Should execute form controller', function(done) {
    const form = fastCloneDeep(formWithFormController);
    form.display = 'wizard';
    Formio.createForm(form).then((form) => {
      setTimeout(() => {
        const textField = form.getComponent('textField');

        assert.equal(textField.getValue(), 'Hello World');
        assert.equal(textField.disabled, true);
        assert.equal(form.components[0].disabled, true);

        done();
      }, 300);
    }).catch((err) => done(err));
  });

  it('Should check correctly Permissions and disabled sumbit button', (done) => {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);

    wizard.setForm(wizardPermission).then(() => {
      wizard.form.disableWizardSubmit = true;
      wizard.redraw();
      const btn = wizard.element.querySelector('.btn-wizard-nav-submit');
      assert.equal(btn.disabled, true);

      done();
    }).catch(err => done(err));
  });

  it('Should correctly reset values', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);

    wizard.setForm(wizardWithDataGridAndEditGrid).then(() => {
      const dataGrid = wizard.getComponent('dataGrid');
      const editGrid = wizard.getComponent('editGrid');

      const checkComponents = (editGridRowsNumber, dataGridRowsNumber, editGridValue, dataGridValue) => {
        assert.equal(editGrid.editRows.length, editGridRowsNumber, `EditGrit should have ${dataGridRowsNumber} rows`);
        assert.equal(editGrid.components.length, editGridRowsNumber, `EditGrit should have ${dataGridRowsNumber} components`);
        assert.equal(dataGrid.rows.length, dataGridRowsNumber, `DataGrit should have ${dataGridRowsNumber} rows`);
        assert.equal(dataGrid.components.length, dataGridRowsNumber, `DataGrit should have ${dataGridRowsNumber} components`);

        if (editGridValue) {
          assert.deepEqual(editGrid.dataValue, editGridValue, 'Should set correct editGrid value');
        }

        if (dataGridValue) {
          assert.deepEqual(dataGrid.dataValue, dataGridValue, 'Should set correct dataGrid value');
        }
      };

      const event = (name, elem) => {
        const event = new Event(name);
        elem.dispatchEvent(event);
      };

      checkComponents(0, 1, [], [{}]);

      const submission = {
          data: {
            dataGrid: [{ number: 1111 }, { number: 2222 }],
            editGrid: [{ textField: 'test1' }, { textField: 'test2' }]
        }
      };

      wizard.submission = _.cloneDeep(submission);

      setTimeout(() => {
        checkComponents(2, 2,  submission.data.editGrid,submission.data.dataGrid);
        wizard.cancel(true);

        setTimeout(() => {
          checkComponents(0, 1, [], [{}]);
          event('click', editGrid.refs['editgrid-editGrid-addRow'][0]);

          setTimeout(() => {
            const editGridFirstRowInput = editGrid.element.querySelector('[name="data[editGrid][0][textField]"]');
            editGridFirstRowInput.value = 'test row 1';
            event('input', editGridFirstRowInput);
            event('click', editGrid.refs['editgrid-editGrid-saveRow'][0]);

            const dataGridFirstRowInput = dataGrid.element.querySelector('[name="data[dataGrid][0][number]"]');
            dataGridFirstRowInput.value = 11;
            event('input', dataGridFirstRowInput);

            setTimeout(() => {
              checkComponents(1, 1,  [{ textField:'test row 1' }], [{ number: 11 }]);

              event('click', editGrid.refs['editgrid-editGrid-addRow'][0]);
              event('click', dataGrid.refs['datagrid-dataGrid-addRow'][0]);

              setTimeout(() => {
                const editGridFirstRowInput = editGrid.element.querySelector('[name="data[editGrid][1][textField]"]');
                editGridFirstRowInput.value = 'test row 2';
                event('input', editGridFirstRowInput);
                event('click', editGrid.refs['editgrid-editGrid-saveRow'][0]);

                const dataGridFirstRowInput = dataGrid.element.querySelector('[name="data[dataGrid][1][number]"]');
                dataGridFirstRowInput.value = 22;
                event('input', dataGridFirstRowInput);

                setTimeout(() => {
                  const editGridValue = [{ textField:'test row 1' }, { textField:'test row 2' }];
                  const dataGridValue  = [{ number: 11 }, { number: 22 }];

                  checkComponents(2, 2, editGridValue, dataGridValue);

                  assert.deepEqual(wizard.submission.data, {
                    dataGrid: dataGridValue,
                    editGrid: editGridValue
                  }, 'Should contain correct submission data');

                  done();
                }, 200);
              }, 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    })
    .catch((err) => done(err));
  }).timeout(2500);

  it('Should set submission in wizard with nested wizard', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const nestedWizard = _.cloneDeep(wizardTestForm.form);
    const submission = {
      data: {
        selectBoxesParent: {
          a: true,
          b: false,
          c: false
        },
        formNested: {
          data: wizardTestForm.submission.data
        },
        numberParent: 1111
      }
    };

    wizard.setForm(formWithNestedWizard).then(() => {
      const nestedFormComp = wizard.getComponent('formNested');

      nestedFormComp.loadSubForm = ()=> {
        nestedFormComp.formObj = nestedWizard;
        nestedFormComp.subFormLoading = false;
        return new Promise((resolve) => resolve(nestedWizard));
      };

      nestedFormComp.createSubForm();

      setTimeout(() => {
      wizard.submission = _.cloneDeep(submission);

      setTimeout(() => {
        assert.deepEqual(wizard.data, submission.data, 'Should set wizard submission');
        assert.deepEqual(wizard.submission.data, submission.data, 'Should get wizard submission data');

        wizard.everyComponent((comp) => {
          if (comp.hasInput) {
            const expectedValue = _.get(submission.data, comp.path, undefined);
            assert.deepEqual(comp.getValue(), expectedValue, `Should set value for ${comp.component.type} inside wizard`);
            assert.deepEqual(comp.dataValue, expectedValue, `Should set value for ${comp.component.type} inside wizard`);
          }
        });

        done();
      }, 300);
    }, 300);
    })
    .catch((err) => done(err));
  });

  it('Should show conditional page inside nested wizard', async () => {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const nestedWizard = _.cloneDeep(wizardTestForm.form);
    nestedWizard.components[2].conditional = { show: true, when: 'checkbox', eq: 'true' };

    await wizard.setForm(formWithNestedWizard);

    const nestedFormComp = wizard.getComponent('formNested');

    nestedFormComp.loadSubForm = () => {
      nestedFormComp.formObj = nestedWizard;
      nestedFormComp.subFormLoading = false;
      return new Promise((resolve) => resolve(nestedWizard));
    };

    nestedFormComp.createSubForm();
    await wait(300);

    const checkPage = (pageNumber) => {
      assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
    };

    checkPage(0);
    assert.equal(wizard.pages.length, 4, 'Should have 4 pages');
    assert.equal(wizard.allPages.length, 4, 'Should have 4 pages');
    assert.equal(wizard.refs[`${wizard.wizardKey}-link`].length, 4, 'Should contain refs to breadcrumbs of parent and nested wizard');

    clickWizardBtn(wizard, 'link[3]');
    await wait(300);

    checkPage(3);
    assert.deepEqual(!!wizard.refs[`${wizard.wizardKey}-submit`], true, 'Should hav submit btn on the last page');
    wizard.getComponent('checkbox').setValue(true);
    await wait(300);

    checkPage(3);
    assert.deepEqual(!!wizard.refs[`${wizard.wizardKey}-submit`], true, 'Should have submit btn on the last page');
    wizard.getComponent('checkbox').setValue(true);
    await wait(500);

    checkPage(3);
    assert.deepEqual(!!wizard.refs[`${wizard.wizardKey}-submit`], false, 'Should not have submit btn ');
    assert.equal(wizard.pages.length, 5, 'Should show conditional page');
    assert.equal(wizard.allPages.length, 5, 'Should show conditional page');
    assert.equal(wizard.refs[`${wizard.wizardKey}-link`].length, 5, 'Should contain refs to breadcrumbs of visible conditional page');

    clickWizardBtn(wizard, 'next');
    await wait(300);

    checkPage(4);
    clickWizardBtn(wizard, 'previous');
    await wait(300);

    checkPage(3);
    wizard.getComponent('checkbox').setValue(false);
    await wait(500);

    assert.equal(wizard.pages.length, 4, 'Should hide conditional page');
    assert.equal(wizard.allPages.length, 4, 'Should hide conditional page');
    assert.equal(wizard.refs[`${wizard.wizardKey}-link`].length, 4, 'Should contain refs to breadcrumbs of visible pages');
    assert.deepEqual(!!wizard.refs[`${wizard.wizardKey}-submit`], true, 'Should have submit btn on the last page');
  }).timeout(6000);

  it('Should trigger validation of nested wizard before going to the next page', function (done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const nestedWizard = _.cloneDeep(WizardWithRequiredFields);
    const parentWizard = _.cloneDeep(formWithNestedWizard);

    const requiredTextField = {
      label: 'Parent Text Field',
      applyMaskOn: 'change',
      tableView: true,
      validate: {
        required: true
      },
      validateWhenHidden: false,
      key: 'textField',
      type: 'textfield',
      input: true
    }

    parentWizard.components[0].components.push(requiredTextField);

    wizard.setForm(parentWizard).then(() => {
      const nestedFormComp = wizard.getComponent('formNested');

      nestedFormComp.loadSubForm = () => {
        nestedFormComp.formObj = nestedWizard;
        nestedFormComp.subFormLoading = false;
        return new Promise((resolve) => resolve(nestedWizard));
      };

      nestedFormComp.createSubForm();
      setTimeout(() => {
        const checkPage = (pageNumber) => {
          assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
        };
        checkPage(0);
        clickWizardBtn(wizard, 'link[2]');
        setTimeout(() => {
          checkPage(2);
          clickWizardBtn(wizard, 'next');
          setTimeout(() => {
            checkPage(2);
            const errors = wizard.errors;
            assert.equal(errors.length, 2, 'Must err before next page');
            errors.forEach((error) => {
              assert.equal(error.ruleName, 'required');
              assert.equal(error.message, 'Text Field is required', 'Should set correct lebel in the error message');
            });
            done();
          }, 300)
        }, 300)
      }, 300)
    })
      .catch((err) => done(err));
  });

  it('Should only validate the current page components when the form has not been submitted', async function () {
    const wizardDefinition = {
      display: 'wizard',
      components: [
        {
          title: 'Page 1',
          collapsible: false,
          key: 'page1',
          type: 'panel',
          label: 'Panel',
          input: false,
          tableView: false,
          components: [
            {
              type: 'checkbox',
              label: 'Trigger Change',
              input: true,
              key: 'triggerChange',
            },
            {
              label: 'Text Field',
              applyMaskOn: 'change',
              tableView: true,
              validateWhenHidden: false,
              key: 'textField',
              type: 'textfield',
              input: true,
              validate: {
                required: true
              }
            },
          ],
        },
        {
          title: 'Page 2',
          collapsible: false,
          key: 'page2',
          type: 'panel',
          label: 'Panel',
          input: false,
          tableView: false,
          components: [
            {
              label: 'Text Field',
              applyMaskOn: 'change',
              tableView: true,
              validateWhenHidden: false,
              key: 'textField1',
              type: 'textfield',
              validate: {
                required: true
              },
              input: true,
            },
          ],
        },
      ],
    };

    const form = await Formio.createForm(document.createElement('div'), wizardDefinition);
    assert(form, 'Form should be created');
    const checkbox = form.getComponent('triggerChange');
    const clickEvent = new Event('click');
    checkbox.refs.input[0].dispatchEvent(clickEvent);
    await wait(200);
    assert.equal(form.errors.length, 1, 'Should have one error from the first page');
  });

  it('Should validate the entire wizard\'s components when the form has been submitted', async function () {
    const wizardDefinition = {
      display: 'wizard',
      components: [
        {
          title: 'Page 1',
          collapsible: false,
          key: 'page1',
          type: 'panel',
          label: 'Panel',
          input: false,
          tableView: false,
          components: [
            {
              type: 'checkbox',
              label: 'Trigger Change',
              input: true,
              key: 'triggerChange',
            },
            {
              label: 'Text Field',
              applyMaskOn: 'change',
              tableView: true,
              validateWhenHidden: false,
              key: 'textField',
              type: 'textfield',
              input: true,
              validate: {
                required: true
              }
            },
          ],
        },
        {
          title: 'Page 2',
          collapsible: false,
          key: 'page2',
          type: 'panel',
          label: 'Panel',
          input: false,
          tableView: false,
          components: [
            {
              label: 'Text Field',
              applyMaskOn: 'change',
              tableView: true,
              validateWhenHidden: false,
              key: 'textField1',
              type: 'textfield',
              validate: {
                required: true
              },
              input: true,
            },
          ],
        },
      ],
    };

    const form = await Formio.createForm(document.createElement('div'), wizardDefinition);
    assert(form, 'Form should be created');
    form.submitted = true;
    form.setSubmission({ data: { triggerChange: true } });
    await wait(200);
    assert(form.alert, 'Form should have an error list');
    assert.equal(form.alert.querySelectorAll("span[ref=errorRef]").length, 2, 'Should have two errors total');
  });


  it('Should have validation errors when parent form is valid but nested wizard is not', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const nestedWizard = _.cloneDeep(formWithNestedWizardAndRequiredFields.childWizard);
    const parentWizard = _.cloneDeep(formWithNestedWizardAndRequiredFields.parentWizard);

    wizard.setForm(parentWizard).then(() => {
      const formio = new Formio('http://test.localhost/test', {});
      wizard.formio = formio;
      const nestedFormComp = wizard.getComponent('child');

      nestedFormComp.loadSubForm = ()=> {
        nestedFormComp.formObj = nestedWizard;
        nestedFormComp.subFormLoading = false;
        return new Promise((resolve) => resolve(nestedWizard));
      };

      nestedFormComp.createSubForm();
      setTimeout(() => {
        const checkPage = (pageNumber) => {
          assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
        };
        checkPage(0);
        const firstPageComponentInput = wizard.allPages[0].components[0].refs.input[0];
        const inputEvent = new Event('input');
        firstPageComponentInput.value = 'test';
        firstPageComponentInput.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal(wizard.submission.data.textField, 'test');
          clickWizardBtn(wizard, 'link[4]');
          setTimeout(() => {
            checkPage(4);
            clickWizardBtn(wizard, 'submit');
            setTimeout(() => {
              assert.equal(wizard.errors.length, 2);
              done();
            }, 300)
          }, 300)
        }, 300)
      }, 300)
    })
    .catch((err) => done(err));
  })

  it('Should show form-level errors after failed submission even when the current page has no errors', async () => {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    await wizard.setForm(simpleWizardWithRequiredFields);
    // link[2] is the button for page 3
    clickWizardBtn(wizard, 'link[2]');
    await wait(200);
    // need to click on page 3 and submit the form to see all the errors
    // you can't submit the form without first navigating to page 3
    wizard.submit();
    await wait(400);
    const getRequiredFieldErrors = () =>
        wizard.errors.filter(error => error.message === 'Text Field is required');

    assert.equal(getRequiredFieldErrors().length, 2);
    // navigate to page 2
    clickWizardBtn(wizard, 'link[1]');
    await wait(200);
    // the form-level errors should still be the same
    assert.equal(getRequiredFieldErrors().length, 2);
    // navigate to page 1
    clickWizardBtn(wizard, 'link[0]');
    const page1Input = wizard.element.querySelector('input[name="data[textField]"]');
    const inputEvent = new Event('input');
    page1Input.value = '1';
    page1Input.dispatchEvent(inputEvent);
    await wait(200);
    // maintain form-level error after supplying value for one required field
    assert.equal(getRequiredFieldErrors().length, 1);
    assert.equal(getRequiredFieldErrors()[0].formattedKeyOrPath, 'textField1');
  });

  it('Should render values in HTML render mode', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement, {
      readOnly: true,
      renderMode: 'html'
    });
    const form = _.cloneDeep(wizardTestForm.form);

    wizard.setForm(form, ).then(() => {

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
        clickWizardBtn(wizard, 'next');

        setTimeout(() => {
          checkPage(1);
          checkValues();
          clickWizardBtn(wizard, 'next');

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

  it('Should render values for prefix Components', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement, {
      readOnly: true,
    });
    const form = _.cloneDeep(wizardWithPrefixComps.form);

    wizard.setForm(form).then(() => {

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      const checkValues = () => {
        wizard.refs[`wizard-${wizard.id}`].querySelectorAll('input').forEach((element, i)=> {
          switch (i) {
            case 0:
              assert.equal(element.value, 'prefix', 'Should render value');
              break;
            case 1:
              assert.equal(element.value, `page${wizard.page+1}`, 'Should render value');
              break;
            case 2:
              assert.equal(element.value, 'suffix', 'Should render value');
              break;
          }
        });
      };
      wizard.submission = _.cloneDeep(wizardWithPrefixComps.submission);

      setTimeout(() => {
        checkPage(0);
        checkValues();
        clickWizardBtn(wizard, 'next');

        setTimeout(() => {
          checkPage(1);
          checkValues();
          done();
        }, 200);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should redirect to the correct page from the Error list', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement, {
      renderMode: 'html'
    });

    wizard.setForm(wizardWithComponentsWithSameApi).then(() => {

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      setTimeout(() => {
        checkPage(0);
        wizard.setPage(1);

        setTimeout(() => {
          checkPage(1);
          clickWizardBtn(wizard, 'submit');

          setTimeout(() => {
            assert.equal(wizard.refs.errorRef.length, 1, 'Should have an error');
            const clickEvent = new Event('click');
            wizard.refs.errorRef[0].dispatchEvent(clickEvent);

            setTimeout(() => {
              checkPage(0);
              done();
            }, 200);
          }, 200);
        }, 300);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should redirect to the correct nested wizard page from the Error list', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const nestedWizard = _.cloneDeep(wizardTestForm.form);
    const parentWizardForm = _.cloneDeep(formWithNestedWizard);
    parentWizardForm.components[0].components.push({
      label: 'Parent Text',
      applyMaskOn: 'change',
      tableView: true,
      validate: {
        required: true
      },
      validateWhenHidden: false,
      key: 'parentText',
      type: 'textfield',
      input: true
    })
    const clickEvent = new Event('click');

    wizard.setForm(parentWizardForm).then(() => {
      const nestedFormComp = wizard.getComponent('formNested');

      nestedFormComp.loadSubForm = ()=> {
        nestedFormComp.formObj = nestedWizard;
        nestedFormComp.subFormLoading = false;
        return new Promise((resolve) => resolve(nestedWizard));
      };

      nestedFormComp.createSubForm();

      setTimeout(() => {
        const checkPage = (pageNumber) => {
          assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
        };

        clickWizardBtn(wizard, 'link[4]');
        setTimeout(() => {
          checkPage(4);
          clickWizardBtn(wizard, 'submit');
          setTimeout(() => {
            assert.equal(wizard.refs.errorRef.length, 4, 'Should have errors');
            wizard.refs.errorRef[0].dispatchEvent(clickEvent);
            setTimeout(() => {
              checkPage(0);
              assert.equal(wizard.refs.errorRef.length, 4, 'Should have errors');
              wizard.refs.errorRef[1].dispatchEvent(clickEvent);
                setTimeout(() => {
                  checkPage(2);
                  assert.equal(wizard.refs.errorRef.length, 4, 'Should have errors');
                  wizard.refs.errorRef[2].dispatchEvent(clickEvent);
                  setTimeout(() => {
                    checkPage(3);
                    done();
                  }, 200);
                }, 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200)
    })
    .catch((err) => done(err));
  });

  it('should set correct errors list for parent wizard before clicking on the Next button', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const nestedWizard = _.cloneDeep(wizardTestForm.form);
    const parentWizardForm = _.cloneDeep(formWithNestedWizard);
    parentWizardForm.components[1].components.push({
      label: 'Parent Text',
      applyMaskOn: 'change',
      tableView: true,
      validate: {
        required: true
      },
      validateWhenHidden: false,
      key: 'parentText',
      type: 'textfield',
      input: true
    })

    wizard.setForm(parentWizardForm).then(() => {
      const nestedFormComp = wizard.getComponent('formNested');

      nestedFormComp.loadSubForm = ()=> {
        nestedFormComp.formObj = nestedWizard;
        nestedFormComp.subFormLoading = false;
        return new Promise((resolve) => resolve(nestedWizard));
      };

      nestedFormComp.createSubForm();

      setTimeout(() => {

        clickWizardBtn(wizard, 'link[1]');

        setTimeout(() => {
          assert.equal(wizard.page, 1, `Should open wizard page 2`);
          clickWizardBtn(wizard, 'next');

          setTimeout(() => {
            assert.equal(wizard.errors.length, 1);
            assert.equal(wizard.refs.errorRef.length, 1, 'Should have an error');
            assert.equal(wizard.errors[0].message, 'Parent Text is required');
            done();
          }, 200);
        }, 200);
      }, 200)
    })
    .catch((err) => done(err));
  })

  it('Should execute advanced logic for wizard pages', function(done) {
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

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      checkPage(0);
      wizard.getComponent('textField').setValue('tooltip');
      clickWizardBtn(wizard, 'next');

      setTimeout(() => {
        checkPage(1);
        assert.equal(wizard.tooltips.length, 1, 'Should have tooltip after advanced logic execution');
        assert.equal(!!wizard.refs[`${wizard.wizardKey}-tooltip`][0], true, 'Should render tooltip icon');

        wizard.getComponent('checkbox').setValue(true);
        clickWizardBtn(wizard, 'next');

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

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };
      checkPage(0);
      wizard.getComponent('textField').setValue('page3');
      clickWizardBtn(wizard, 'next');

      setTimeout(() => {
        checkPage(2);
        wizard.getComponent('select').setValue('value1');
        clickWizardBtn(wizard, 'previous');

        setTimeout(() => {
          checkPage(1);
          wizard.getComponent('checkbox').setValue(true);
          clickWizardBtn(wizard, 'next');

          setTimeout(() => {
            checkPage(0);
            done();
          }, 200);
        }, 200);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should NOT navigate to next page if it contains invalid nested component', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const form = _.cloneDeep(wizardTestFormWithNestedComponents.form);

    wizard.setForm(form).then(() => {
      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };
      checkPage(0);
      wizard.submission = {
        data: {
          outerContainer: {
            firstComponent: 'c',
            secondComponent: 'q',
          }
        }
      };
      wizard.nextPage();
      setTimeout(() => {
        const errors = wizard.errors;
        checkPage(0);
        assert(errors.length > 0, 'Must err before next page');
        assert.equal(errors[0].message, 'Required Component is required');
        done();
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
        clickWizardBtn(wizard, 'next');

        setTimeout(() => {
          checkPage(1);
          checkBreadcrumb();
          clickWizardBtn(wizard, 'next');

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

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      checkPage(0);
      clickWizardBtn(wizard, 'link[1]');

      setTimeout(() => {
        checkPage(0);
        clickWizardBtn(wizard, 'link[2]');

        setTimeout(() => {
          checkPage(0);
          wizard.setSubmission(_.cloneDeep(wizardTestForm.submission));

          setTimeout(() => {
            checkPage(0);
            clickWizardBtn(wizard, 'next');

            setTimeout(() => {
              checkPage(1);
              clickWizardBtn(wizard, 'link[0]');

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

  it('Should correctly render customized wizard and navigate using custom btns', function(done) {
    const formElement = document.createElement('div');
    const customizedWizard = new Wizard(formElement);

    customizedWizard.setForm(customWizard).then(() => {
      customizedWizard.on('goToNextPage', function() {
        customizedWizard.nextPage();
      });
      customizedWizard.on('goToPrevPage', function() {
        customizedWizard.prevPage();
      });

      const checkBtns = (page) => {
        assert.equal(customizedWizard.page, page, `Should set page ${page + 1}`);
        assert.equal(!!customizedWizard.refs[`${customizedWizard.wizardKey}-next`], false, 'Should not render wizard next btn');
        assert.equal(!!customizedWizard.refs[`${customizedWizard.wizardKey}-cancel`], false, 'Should not render wizard cancel btn');
        assert.equal(!!customizedWizard.refs[`${customizedWizard.wizardKey}-previous`], false, 'Should not render wizard previous btn');
      };

      const navigatePage = (btnKey) => {
        const customBtn = customizedWizard.components[customizedWizard.page].getComponent(btnKey).refs.button;
        const clickEvent = new Event('click');
        customBtn.dispatchEvent(clickEvent);
      };
      checkBtns(0);
      navigatePage('nextPage');
      setTimeout(() => {
        checkBtns(1);
        navigatePage('nextPage1');
        setTimeout(() => {
          checkBtns(2);
          navigatePage('prevPage1');

          setTimeout(() => {
            checkBtns(1);
            navigatePage('prevPage');

            setTimeout(() => {
              checkBtns(0);
              customizedWizard.destroy();

              done();
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should not create a new submission on submission of edited draft submission', function(done) {
    const formElement = document.createElement('div');
    const customizedWizard = new Wizard(formElement);
    const expectedValues = {
      '1': {
        method: 'post',
        urlEnd: 'submission',
        state: 'draft',
        data: {
          textArea1: '',
          textField: 'test'
        },
        id: undefined
      },
      '2': {
        method: 'put',
        urlEnd: 'someId',
        state: 'draft',
        data: {
          number: 111111,
          textArea1: 'test1',
          textField: 'test1'
        },
        id: 'someId'
      },
      '3': {
        method: 'put',
        urlEnd: 'someId',
        state: 'draft',
        data: {
          number: 22222,
          textArea1: 'test',
          textField: 'test1'
        },
        id: 'someId'
      },
      '4': {
        method: 'put',
        urlEnd: 'someId',
        state: 'draft',
        data: {
          number: 22222,
          textArea1: 'test1',
          textField: 'test1'
        },
        id: 'someId'
      },
      '5': {
        method: 'put',
        urlEnd: 'someId',
        state: 'submitted',
        data: {
          number: 22222,
          textArea1: 'test1',
          textField: 'test1'
        },
        id: 'someId'
      }
    };

    customizedWizard.setForm(customWizard).then(() => {
      const formio = new Formio('http://test.localhost/draftwizardpages', {});
      let number = 1;

      formio.makeRequest = (type, url, method, data) => {
        assert.equal(method, expectedValues[number].method, `Should send ${expectedValues[number].method} request`);
        assert.equal(data._id, expectedValues[number].id, `Submission data should ${expectedValues[number].id ? '' : 'not'} contain id of editted submission`);
        assert.equal(url.endsWith(expectedValues[number].urlEnd), true, `Request url should end with ${expectedValues[number].urlEnd}`);
        assert.equal(data.state, expectedValues[number].state, `Should set ${expectedValues[number].state} state for submission`);
        _.each(expectedValues[number].data, function(value, key) {
          assert.equal(data.data[key], value, `${key} field should contain "${value}" value in submission object`);
        });

        number = number + 1;

        return new Promise(resolve => resolve({
          _id: 'someId',
          data: {
            number: 22222,
            textArea1: 'test1',
            textField: 'test1'
          },
          metadata:{},
          state: data.state
          })
        );
      };

      customizedWizard.formio = formio;

      customizedWizard.on('goToNextPage', function() {
        customizedWizard.executeSubmit({ state: 'draft' }).then(() => customizedWizard.nextPage());
      });
      customizedWizard.on('goToPrevPage', function() {
        customizedWizard.executeSubmit({ state: 'draft' }).then(() => customizedWizard.prevPage());
      });
      customizedWizard.on('saveSubmission', function() {
        customizedWizard.executeSubmit();
      });

      const checkPage = (page) => {
        assert.equal(customizedWizard.page, page, `Should set page ${page + 1}`);
      };

      const navigatePage = (btnKey) => {
        const customBtn = customizedWizard.components[customizedWizard.page].getComponent(btnKey).refs.button;
        const clickEvent = new Event('click');
        customBtn.dispatchEvent(clickEvent);
      };

      const setPageCompValue = (compKey, value) => {
        customizedWizard.components[customizedWizard.page].getComponent(compKey).setValue(value);
      };

      checkPage(0);
      setPageCompValue('textField', 'test');
      navigatePage('nextPage');

      setTimeout(() => {
        checkPage(1);
        setPageCompValue('number', 111111);
        navigatePage('nextPage1');

        setTimeout(() => {
          checkPage(2);
          setPageCompValue('textArea1', 'test');
          navigatePage('prevPage1');

          setTimeout(() => {
            checkPage(1);
            navigatePage('nextPage1');

            setTimeout(() => {
              checkPage(2);
              navigatePage('save');
              setTimeout(() => {
                customizedWizard.destroy();
                done();
              }, 200);
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    })
    .catch((err) => done(err));
  });

  it('Should show validation alert and components` errors and navigate pages after clicking alert error', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);

    wizard.setForm(wizardTestForm.form).then(() => {

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };

      const checkInvalidComp = (compKey, highLight) => {
        const comp = wizard.getComponent(compKey);

        assert.deepEqual(comp.errors.length, 1, `${compKey}: should have error`);
        assert.deepEqual(comp.errors[0].message, `${comp.component.label} is required`, `${compKey}: should have correct required validation message`);
        assert.deepEqual(comp.pristine, false, `${compKey}: should set pristine to false`);
        assert.deepEqual(comp.element.classList.contains(`${highLight ? 'formio-error-wrapper' : 'has-error'}`), true, `${compKey}: should set error class`);
        assert.deepEqual(comp.refs.messageContainer.querySelector('.error').textContent.trim(), `${comp.component.label} is required`, `${compKey}: should display error message`);
      };

      checkPage(0);
      clickWizardBtn(wizard, 'link[2]');

      setTimeout(() => {
        checkPage(2);
        assert.equal(wizard.visibleErrors.length, 0, 'Should not have validation errors');

        clickWizardBtn(wizard, 'submit');

        setTimeout(() => {
          assert.equal(wizard.visibleErrors.length, 3, 'Should have validation errors');
          assert.equal(wizard.refs.errorRef.length, wizard.errors.length, 'Should show alert with validation errors');
          assert.equal(!!wizard.element.querySelector('.alert-danger'), true, 'Should have alert with validation errors');
          checkInvalidComp('select', true);
          clickWizardBtn(wizard, 'errorRef[0]', true);

          setTimeout(() => {
            checkPage(0);

            assert.equal(wizard.visibleErrors.length, 3, 'Should have page validation error');
            assert.equal(wizard.refs.errorRef.length, 3, 'Should keep alert with validation errors');
            checkInvalidComp('textField', true);
            clickWizardBtn(wizard, 'errorRef[1]', true);

            setTimeout(() => {
              checkPage(1);

              assert.equal(wizard.visibleErrors.length, 3, 'Should have page validation error');
              assert.equal(wizard.refs.errorRef.length, 3, 'Should keep alert with validation errors');
              checkInvalidComp('checkbox', true);
              wizard.getComponent('checkbox').setValue(true);

              setTimeout(() => {
                checkPage(1);
                assert.equal(wizard.visibleErrors.length, 2, 'Should not have page validation error');
                assert.equal(wizard.refs.errorRef.length, 2, 'Should keep alert with validation errors');
                clickWizardBtn(wizard, 'errorRef[1]', true);

                setTimeout(() => {
                  checkPage(2);

                  assert.equal(wizard.visibleErrors.length, 2, 'Should have wizard validation errors');
                  assert.equal(wizard.refs.errorRef.length, 2, 'Should keep alert with validation errors');
                  wizard.getComponent('select').setValue('value1');

                  setTimeout(() => {
                    assert.equal(wizard.visibleErrors.length, 1, 'Should have wizard validation error');
                    assert.equal(wizard.refs.errorRef.length, 1, 'Should keep alert with validation errors');
                    clickWizardBtn(wizard, 'errorRef[0]', true);

                    setTimeout(() => {
                      checkPage(0);

                      assert.equal(wizard.visibleErrors.length, 1, 'Should have page validation error');
                      assert.equal(wizard.refs.errorRef.length, 1, 'Should keep alert with validation errors');
                      wizard.getComponent('textField').setValue('valid');

                      setTimeout(() => {
                        assert.equal(wizard.visibleErrors.length, 0, 'Should not have page validation error');
                        assert.equal(!!wizard.element.querySelector('.alert-danger'), false, 'Should not have alert with validation errors');
                        clickWizardBtn(wizard, 'link[2]');

                        setTimeout(() => {
                          clickWizardBtn(wizard, 'submit');
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

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };
      checkPage(0);
      clickWizardBtn(wizard, 'next');

      setTimeout(() => {
        checkPage(0);

        assert.equal(wizard.errors.length, 1, 'Should have validation error');
        assert.equal(wizard.refs.errorRef.length, wizard.errors.length, 'Should show alert with validation error');

        wizard.getComponent('textField').setValue('valid');

        clickWizardBtn(wizard, 'next');

        setTimeout(() => {
          checkPage(1);
          clickWizardBtn(wizard, 'next');

          setTimeout(() => {
            checkPage(1);

            assert.equal(wizard.errors.length, 1, 'Should have validation error');
            assert.equal(wizard.refs.errorRef.length, wizard.errors.length, 'Should show alert with validation error');

            clickWizardBtn(wizard, 'previous');

            setTimeout(() => {
              checkPage(0);

              assert.equal(wizard.errors.length, 0, 'Should not have validation error');
              assert.equal(!!wizard.refs.errorRef, false, 'Should not have alert with validation error');

              clickWizardBtn(wizard, 'next');

              setTimeout(() => {
                checkPage(1);
                assert.equal(wizard.errors.length, 1, 'Should have validation error');
                wizard.getComponent('checkbox').setValue(true);

                clickWizardBtn(wizard, 'next');

                setTimeout(() => {
                  checkPage(2);
                  assert.equal(wizard.errors.length, 1, 'Should have validation error');
                  assert.equal(wizard.visibleErrors.length, 0, 'Should not have visible validation error');
                  clickWizardBtn(wizard, 'link[0]');

                  setTimeout(() => {
                    checkPage(0);
                    assert.equal(wizard.errors.length, 0, 'Should not have validation error');
                    clickWizardBtn(wizard, 'link[2]');

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

  it('Should stay on current page when changing language', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement, { language: 'en' });
    wizard.setForm(wizardTestForm.form).then(() => {
      const checkPage = (page) => {
        assert.equal(wizard.page, page, `Page ${page + 1} should be the current page`);
      };

      Harness.clickElement(wizard, wizard.refs[`${wizard.wizardKey}-link`][2]);
      checkPage(2);

      wizard.language = 'es';
      setTimeout(() => {
        checkPage(2);
        done();
      }, 50);
    });
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

        clickWizardBtn(formHTMLMode, 'next');

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
        const tooltipText = wizardWithPageTooltip.element.querySelector('.tippy-content').textContent;
        assert.equal(tooltipText, wizardWithPageTooltip.currentPanel.tooltip);

        done();
      }, 300);
    })
    .catch((err) => done(err));
  });

  it('Should not clear wizard data when navigating between wizard pages with hidden panel', function(done) {
    const formElement = document.createElement('div');
    const formWithHiddenPage = new Wizard(formElement);

    formWithHiddenPage.setForm(wizardWithHiddenPanel).then(() => {
      const inputEvent = new Event('input');

      assert.equal(formWithHiddenPage.pages.length, 2);

      const page1Field = formWithHiddenPage.element.querySelector('[name="data[number]"]');

      page1Field.value = '555';
      page1Field.dispatchEvent(inputEvent);

      setTimeout(() => {
        assert.equal(formWithHiddenPage.element.querySelector('[name="data[number]"]').value, 555);

        clickWizardBtn(formWithHiddenPage, 'next');

        setTimeout(() => {
          assert.equal(formWithHiddenPage.page, 1);

          clickWizardBtn(formWithHiddenPage, 'previous');

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

            clickWizardBtn(wizardWithCustomConditionalPage, 'link[1]');

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
      }, [{
        component: wizardForm.currentPage.getComponent('a').component,
        message: 'a must have at least 4 characters.'
      }], function() {
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
      });
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

    // form.validator.config = {
    //   db: {},
    //   token: '',
    //   form: wizardCond,
    //   submission: submission
    // };

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

  it('Should show the actual page after re-rendering due to nested wizards.', (done) => {
    const formElement = document.createElement('div');
    wizardForm = new Wizard(formElement);
    wizardForm.setForm(wizardWithNestedWizard)
      .then(() => {
        assert.equal(wizardForm.element.querySelector('.wizard-page'), wizardForm.allPages[0].components[0].element.parentNode);
        done();
      })
      .catch(done);
  });
  // BUG - uncomment once fixed (ticket FIO-6043)
  // it('Should render all pages as a part of wizard pagination', (done) => {
  //   const formElement = document.createElement('div');
  //   const wizard = new Wizard(formElement);
  //   const childForm = _.cloneDeep(wizardChildForm);
  //   const clickEvent = new Event('click');

  //   wizard.setForm(wizardParentForm).then(() => {
  //     assert.equal(wizard.components.length, 2);
  //     assert.equal(wizard.allPages.length, 2);
  //     assert.equal(wizard.allPages[1].component.title, 'Page 3');

  //     const radioComp = wizard.getComponent('radio1');

  //     radioComp.setValue('yes');
  //     wizard.render();

  //     setTimeout(() => {
  //       const nestedFormComp = wizard.getComponent('formNested');
  //       nestedFormComp.loadSubForm = () => {
  //       nestedFormComp.formObj = childForm;
  //       nestedFormComp.subFormLoading = false;

  //         return new Promise((resolve) => resolve(childForm));
  //       };
  //       nestedFormComp.createSubForm();

  //       setTimeout(() => {
  //         assert.equal(wizard.components.length, 3);
  //         assert.equal(wizard.allPages.length, 4);
  //         assert.equal(wizard.allPages[1].component.title, 'Child Page 1');

  //         const checboxComp = wizard.getComponent('checkbox');

  //         checboxComp.setValue(true);
  //         wizard.render();

  //         setTimeout(() => {
  //           assert.equal(wizard.components.length, 3);
  //           assert.equal(wizard.allPages.length, 5);
  //           assert.equal(wizard.allPages[1].component.title, 'Page 2');
  //           assert.equal(wizard.element.querySelector('input[name="data[textFieldNearForm]"]'), null);

  //           const nextPageBtn = wizard.refs[`${wizard.wizardKey}-next`];

  //           nextPageBtn.dispatchEvent(clickEvent);

  //           setTimeout(() => {
  //             assert.equal(wizard.component.title, 'Page 2');
  //             assert.ok(wizard.element.querySelector('input[name="data[textFieldNearForm]"]'));

  //             done();
  //           }, 200);
  //         }, 200);
  //       }, 200);
  //     }, 200);
  //   }).catch(done);
  // });

  describe('Conditional pages', () => {
    it('Should remove page from header when it is hidden', (done) => {
      const formElement = document.createElement('div');
      const form = new Wizard(formElement);
      form.setForm(wizardWithConditionallyVisiblePage)
        .then(() => {
          const textField = form.getComponent(['textField']);
          Harness.dispatchEvent(
            'input',
            textField.element,
            '[name="data[textField]"]',
            (input) => input.value = 'hide',
          );
          assert.equal(form.refs[`wizard-${form.id}-link`].length, 3, 'Should show all the pages in header');

          setTimeout(() => {
            assert.equal(textField.dataValue, 'hide', 'Should set value');
            const page2 = form.getComponent(['page2']);
            assert.equal(page2.visible, false, 'Should be hidden by logic');
            assert.equal(form.refs[`wizard-${form.id}-link`].length, 2, 'Should remove invisible pages from header');
            done();
          }, 300);
        })
        .catch(done);
    });

    it('', (done) => {
      const formElement = document.createElement('div');
      Formio.createForm(formElement, nestedConditionalWizard).then((form) => {
        const nestedFormRadio = form.getComponent(['nestedForm']);

        nestedFormRadio.setValue('yes');
        setTimeout(() => {
          const secondQuestionToOpenNestedFormRadio = form.getComponent(['secondQuestionToOpenNestedForm']);
          assert(secondQuestionToOpenNestedFormRadio.visible, 'Should become visible');
          secondQuestionToOpenNestedFormRadio.setValue('openChildForm');

          setTimeout(() => {
            const nestedForm = form.getComponent(['form']);
            assert(nestedForm.visible, 'Should become visible');
            nestedForm.subForm.components.forEach((comp) => {
              assert.equal(comp.root, nestedForm.subForm, 'The root of the nested components should be set to the' +
                ' Wizard itself');
            });
            const nestedRadio1 = nestedForm.subForm.getComponent(['radio1']);

            nestedRadio1.setValue('unhidePage3');

            setTimeout(() => {
              const pages = form.element.querySelectorAll('.formio-form nav .pagination .page-item');
              assert.equal(pages.length, 3, 'Should show the hidden initially page');

              secondQuestionToOpenNestedFormRadio.setValue(2);

              setTimeout(() => {
                assert(!nestedForm.visible, 'Should become hidden');
                secondQuestionToOpenNestedFormRadio.setValue('openChildForm');

                setTimeout(() => {
                  assert(nestedForm.visible, 'Should become visible again');
                  secondQuestionToOpenNestedFormRadio.setValue('openChildForm');

                  nestedForm.subForm.components.forEach((comp) => {
                    assert.equal(comp.root, nestedForm.subForm, 'The root of the nested components should be set to the' +
                      ' Wizard itself');
                  });
                  const nestedRadio1 = nestedForm.subForm.getComponent(['radio1']);

                  nestedRadio1.setValue('unhidePage3');

                  setTimeout(() => {
                    const pages = form.element.querySelectorAll('.formio-form nav .pagination .page-item');
                    assert.equal(pages.length, 3, 'Should show the hidden initially page');

                    done();
                  });
                }, 400);
              }, 500);
            }, 400);
          }, 500);
        }, 400);
      }).catch(done);
    });
  });

  it('Should have proper values for localRoot', (done) => {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const form = _.cloneDeep(wizardWithPanel);
    const nestedMiddleForm = _.cloneDeep(wizardWithWizard);
    const childForm = _.cloneDeep(simpleTwoPagesWizard);

    wizard.setForm(form).then(() => {
      const nestedMiddleFormComp = wizard.getComponent('middleForm');
      nestedMiddleFormComp.loadSubForm = () => {
        nestedMiddleFormComp.formObj = nestedMiddleForm;
        nestedMiddleFormComp.subFormLoading = false;
        return new Promise((resolve) => resolve(nestedMiddleForm));
      };
      nestedMiddleFormComp.createSubForm();

      setTimeout(() => {
        const middleWizard = nestedMiddleFormComp.subForm;

        const nestedChildFormComp = middleWizard.getComponent('childForm');
        nestedChildFormComp.loadSubForm = () => {
          nestedChildFormComp.formObj = childForm;
          nestedChildFormComp.subFormLoading = false;
          return new Promise((resolve) => resolve(childForm));
        };
        nestedChildFormComp.createSubForm();

        setTimeout(() => {
          const childWizard = nestedChildFormComp.subForm;

          assert.equal(wizard.id, wizard.root.id);
          assert.equal(wizard.id, wizard.localRoot.id);
          assert.equal(wizard.root.id, wizard.localRoot.id);
          assert.notEqual(middleWizard.id, middleWizard.root.id);
          assert.equal(middleWizard.id, middleWizard.localRoot.id);
          assert.notEqual(middleWizard.root.id, middleWizard.localRoot.id);
          assert.notEqual(childWizard.id, childWizard.root.id);
          assert.notEqual(childWizard.id, childWizard.localRoot.id);
          assert.equal(childWizard.root.id, childWizard.localRoot.id);
          done();
        }, 200);
      }, 200);
    });
  });

  it('Should keep wizard pages separate from edit grid inner wizard pages', (done) => {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);
    const form = _.cloneDeep(wizardWithNestedWizardInEditGrid);
    const childForm = _.cloneDeep(simpleTwoPagesWizard);

    wizard.setForm(form).then(() => {
      assert.equal(wizard.components.length, 1);
      assert.equal(wizard.allPages.length, 1);

      const editGrid = wizard.getComponent('editGrid');
      editGrid.addRow();

      setTimeout(() => {
        const nestedFormComp = wizard.getComponent('formNested');

        nestedFormComp.loadSubForm = () => {
          nestedFormComp.formObj = childForm;
          nestedFormComp.subFormLoading = false;

          return new Promise((resolve) => resolve(childForm));
        };
        nestedFormComp.createSubForm();

        setTimeout(() => {
          assert.equal(nestedFormComp.subForm.components.length, 2);
          assert.equal(nestedFormComp.subForm.allPages.length, 2);
          assert.equal(wizard.components.length, 1);
          assert.equal(wizard.allPages.length, 1);
          done();
        }, 200);
      }, 200);
    });
  });

  it('Should navigate wizard pages and submit form using \'Save on Enter\' option', function(done) {
    const formElement = document.createElement('div');
    const wizard = new Wizard(formElement);

    wizard.setForm(wizardNavigateOrSaveOnEnter.form).then(() => {
      const pressEnter = () => {
        const event = new KeyboardEvent('keyup', {
          bubbles : true,
          cancelable : true,
          key : 'Enter',
          keyCode : 13
        });
        document.dispatchEvent(event);
      };

      const checkPage = (pageNumber) => {
        assert.equal(wizard.page, pageNumber, `Should open wizard page ${pageNumber + 1}`);
      };
      checkPage(0);
      pressEnter();

      setTimeout(() => {
        checkPage(1);

        pressEnter();

        setTimeout(() => {
          checkPage(2);

          pressEnter();

          setTimeout(() => {
            assert.equal(wizard.submission.state, 'submitted', 'Should submit the form');

            done();
          }, 50);
        }, 50);
      }, 50);
    })
    .catch((err) => done(err));
  });

  it('Should retain previous checkbox checked property when navigating to another page (checked)', (done) => {
    const wizard = new Wizard(document.createElement('div'));
    wizard.setForm(WizardWithCheckboxes).then(()=> {
      wizard.element.querySelector('input').click();
      clickWizardBtn(wizard, 'next');
      setTimeout(()=>{
        clickWizardBtn(wizard, 'previous');
        setTimeout(()=>{
          assert.equal(wizard.element.querySelector('input').checked, true);
          done();
        },200);
      },200);
    });
  });

  it('Should retain previous checkbox checked property when navigating to another page (unchecked)', (done) => {
    const wizard = new Wizard(document.createElement('div'));
    wizard.setForm(WizardWithCheckboxes).then(()=> {
      wizard.element.querySelector('input').click();
      wizard.element.querySelector('input').click();
      clickWizardBtn(wizard, 'next');
      setTimeout(()=>{
        clickWizardBtn(wizard, 'previous');
        setTimeout(()=>{
          assert.equal(wizard.element.querySelector('input').checked, false);
          done();
        },200);
      },200);
    });
  });
});
