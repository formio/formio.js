import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../harness';
import WebformBuilder from '../../src/WebformBuilder';
import BuilderUtils from '../../src/utils/builder';
import Builders from '../../src/builders';
import { Formio } from '../../src/Formio';
import { uniqueApiKeys, uniqueApiKeysLayout, uniqueApiKeysSameLevel, columnsForm, resourceKeyCamelCase, uniqueApiKeysTranslation } from '../formtest';
import testApiKeysUniquifying from '../forms/testApiKeysUniquifying';
import formBasedOnWizard from '../forms/formBasedOnWizard';
import formWithFormController from '../forms/formWithFormController';
import simpleWebform from '../forms/simpleWebform';
import formWithNumericKeys from '../forms/formWithNumericKeys';
import testUniqueApiKey from '../forms/testUniqueApiKey';
import FormBuilder from '../../src/FormBuilder';
import { wait } from '../util.js';
import * as datagridWithNestedForm from '../forms/datagridWithNestedForm.js';

global.requestAnimationFrame = (cb) => cb();
global.cancelAnimationFrame = () => {};

describe('WebformBuilder tests', function() {
  this.retries(3);
  before((done) => Harness.builderBefore(done));
  afterEach(() => Harness.getBuilder().setForm({ display: 'form', components: [] }));
  after((done) => Harness.builderAfter(done));
  it('Should create a new form builder class', (done) => {
    const builder = Harness.getBuilder();
    assert(builder instanceof WebformBuilder, 'Builder must be an instance of FormioFormBuilder');
    done();
  });

  it("Should open only one default opened group at a time", async () => {
    const builderOptions = {
      some_group1: {
        title: "Components group 1",
        weight: 10,
        default: true,
        components: {
          content: true,
        }
      },
      some_group2: {
        title: "Components group 2",
        weight: 9,
        default: true,
        components: {
          captcha: true
        }
      }
    }
    const builder = new FormBuilder(document.createElement('div'), { display: 'form', components: [] }, { builder: builderOptions });
    await builder.ready;
    const sidebarContainer = builder.element.querySelector('[ref="sidebar-groups"]');
    const groupsCollapse = [...sidebarContainer.querySelectorAll('[ref="sidebar-group"]')];
    // Should be opened only one group with default = true. As we get sort ascending (by weight field) the "Components group 2" will be visible
    groupsCollapse.forEach(x => {
      const id = x.getAttribute("id");
      if (id.includes("some_group2")) {
        assert.equal(x.classList.contains('show'), true);
      }
      else {
        assert.equal(x.classList.contains('show'), false);
      }
    })
  });

  it("Should not show errors with default array values", (done) => {
    const builder = Harness.getBuilder();
    builder
      .setForm({})
      .then(() => {
        Harness.buildComponent("address");
        setTimeout(() => {
          const multipleValues = builder.editForm.getComponent("multiple");
          const provider = builder.editForm.getComponent("provider");
          provider.setValue("nominatim");
          setTimeout(() => {
            multipleValues.setValue(true);
            setTimeout(() => {
              Harness.saveComponent();
              setTimeout(() => {
                assert.equal(builder.editForm.errors.length, 0);
                done();
              }, 350);
            }, 250);
          }, 250);
        }, 250);
      })
      .catch(done);
  });

  it('Should execute form controller', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.form = formWithFormController;

    setTimeout(() => {
      const textF = builder.webform.getComponent('textField');
      assert.equal(textF.getValue(), 'Hello World');
      assert.equal(textF.disabled, true);
      assert.equal(builder.webform.components[0].disabled, true);
      done();
    }, 500);
  });
  it('Should show API Key is not unique: {{key}} error when api keys are the same', (done) => {
    const builder = Harness.getBuilder();
    builder.i18next.currentLanguage = { apiKey: 'translated api key error {{key}}' };
    builder.webform.setForm(uniqueApiKeysTranslation).then(()=>{
      builder.highlightInvalidComponents();
      const component = builder.webform.getComponent(['textField']);
      assert.equal(component.visibleErrors.length, 1);
      done();
    }).catch(done);
  });

  it('Should show translated api key error {{key}} when apiKey is overridden in i18next translations', (done) => {
    const builder = Harness.getBuilder();
    builder.i18next.currentLanguage = { apiKey: 'translated api key error {{key}}' };
    builder.webform.setForm(uniqueApiKeysTranslation).then(() => {
      builder.highlightInvalidComponents();
      const component = builder.webform.getComponent(['textField']);
      assert.equal(component.visibleErrors[0].message,'translated api key error textField');
      done();
    }).catch(done);
  });

  it('Should not show unique API error when components with same keys are inside and outside of the Data component', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(testUniqueApiKey).then(() => {
      const tabs = builder.webform.getComponent('tabs1');
      const newTextField = {
        "label": "Text Field",
        "applyMaskOn": "change",
        "tableView": true,
        "validateWhenHidden": false,
        "key": "textField",
        "type": "textfield",
        "input": true
        }
      BuilderUtils.uniquify(builder.findNamespaceRoot(tabs), newTextField);
      assert.equal(newTextField.key, 'textField3');
      done();
    }).catch(done);
  });

  it('Should uniquify the key for the component inside layout component that inside container', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(uniqueApiKeysTranslation).then(()=>{
      builder.highlightInvalidComponents();
      const component = builder.webform.getComponent(['textField']);
      assert.equal(component.visibleErrors.length, 1);
      done();
    }).catch(done);
  });

  it('Should show unique API error when components inside and outside of the Layout component have same keys', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(uniqueApiKeysLayout).then(() => {
      builder.highlightInvalidComponents();
      const component = builder.webform.getComponent(['textField']);
      assert.equal(component.visibleErrors.length, 1);
      done();
    }).catch(done);
  });

  it('Should not overwrite existing resource key in camelCase', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm(resourceKeyCamelCase).then(() => {
      const component = builder.webform.getComponent('CalendarID');
      assert.equal(!!document.querySelector(`[name='data[${component.key}]']`), true);
      done();
    }).catch(done);
  });

  it('Should allow add components', function(done) {
    const builder = Harness.getBuilder();
    builder.setForm(columnsForm).then(() => {
      const column1 = builder.webform.element.querySelector('[ref="columns-container"]');
      Harness.buildComponent('textfield', column1);
      setTimeout(() => {
        Harness.saveComponent();
        setTimeout(() => {
          const columns = builder.webform.getComponent('columns');
          assert.equal(columns.columns[0].length, 1);
          done();
        }, 150);
      }, 150);
    }).catch(done);
  });

  it('Should show unique API error when components on the same level have same keys', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(uniqueApiKeysSameLevel).then(() => {
      builder.highlightInvalidComponents();
      const component = builder.webform.getComponent(['textField']);
      assert.equal(component.visibleErrors.length, 1);
      done();
    }).catch(done);
  });

  it('Should uniquify API keys when add a component to the container which already has the same type component', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(testApiKeysUniquifying).then(() => {
      const ERROR_MSG = 'Should add a number to the api key of the second component of the same type';
      let containerTestsReady;
      const containerTestsPromise = new Promise((resolve) => containerTestsReady = resolve);

      const container = builder.webform.element.querySelector(['[ref="container-container"]']);
      Harness.buildComponent('editgrid', container);

      setTimeout(() => {
        const newEditGridApiKey = builder.editForm.getComponent('key');
        assert.equal(newEditGridApiKey.dataValue, 'editGrid1', ERROR_MSG);
        Harness.saveComponent();

        setTimeout(() => {
          const editGridInsideContainer = container.querySelector('[ref="editGrid-container"]');
          Harness.buildComponent('columns', editGridInsideContainer);

          setTimeout(() => {
            const newColumnsApiKey = builder.editForm.getComponent('key');
            assert.equal(newColumnsApiKey.dataValue, 'columns1', ERROR_MSG);
            Harness.saveComponent();

            setTimeout(() => {
              const columnInsideEditGridInsideContainer = editGridInsideContainer.querySelector('[ref="columns-container"]');
              Harness.buildComponent('textfield', columnInsideEditGridInsideContainer);

              setTimeout(() => {
                const newTextFieldApiKey = builder.editForm.getComponent('key');
                assert.equal(newTextFieldApiKey.dataValue, 'textField1', ERROR_MSG);
                Harness.saveComponent();
                containerTestsReady();
              }, 150);
            }, 150);
          }, 150);
        }, 150);
      }, 150);

      containerTestsPromise.then(() => {
        const panel = builder.webform.element.querySelector(['[ref="panel-container"]']);
        Harness.buildComponent('datagrid', panel);

        setTimeout(() => {
          const newDataGridApiKey = builder.editForm.getComponent('key');
          assert.equal(newDataGridApiKey.dataValue, 'dataGrid1', ERROR_MSG);
          Harness.saveComponent();

          setTimeout(() => {
            const dataGridInsidePanel = panel.querySelector('[ref="dataGrid-container"]');
            Harness.buildComponent('number', dataGridInsidePanel);

            setTimeout(() => {
              const newNumberApiKey = builder.editForm.getComponent('key');
              assert.equal(newNumberApiKey.dataValue, 'number1', ERROR_MSG);
              Harness.saveComponent();

              setTimeout(() => {
                const columnInsidefieldSetInsideDataGridInsidePanel = dataGridInsidePanel.parentElement.querySelectorAll('[ref="columns-container"]')[1];
                Harness.buildComponent('checkbox', columnInsidefieldSetInsideDataGridInsidePanel);

                setTimeout(() => {
                  const newTextFieldApiKey = builder.editForm.getComponent('key');
                  assert.equal(newTextFieldApiKey.dataValue, 'checkbox1', ERROR_MSG);
                  done();
                }, 150);
              }, 150);
            }, 150);
          }, 150);
        }, 150);
      });
    }).catch(done);
  });

  it('Should override the way a key for new component is set', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm(columnsForm).then(() => {
      Builders.builders.webform.prototype.updateComponentKey = function() {
        return 'rewrittenNumberKey';
      };

      const column = builder.webform.element.querySelector('[ref="columns-container"]');

      Harness.buildComponent('number', column);

      setTimeout(() => {
        const numberLabel = builder.editForm.getComponent('label');
        numberLabel.setValue('Test Number');

        setTimeout(() => {
          const numberKey = builder.editForm.getComponent('key');
          assert.equal(numberKey.dataValue, 'rewrittenNumberKey');

          done();
        }, 350);
      }, 350);
    }).catch(done);
  });

  it('Should add submit button after switching from wizard form', (done) => {
    const builder = Harness.getBuilder();
    builder.options.noAddSubmitButton = true;
    builder.options.display = 'wizard';
    builder.setForm(formBasedOnWizard).then(() => {
      const components = builder.webform.components;
      const submit = components[components.length - 1];
      assert.equal(submit.key, 'submit');
      builder.options.noAddSubmitButton = false;
      builder.options.display = 'form';
      done();
    }).catch(done);
  });

  it('Should not add extra submit button if submit button API key was changed', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm(simpleWebform).then(() => {
      const components = builder.webform.components;
      const submit = components[1];
      assert.equal(components.length, 2);
      assert.equal(components[1].key, 'testSubmit');
      done();
    }).catch(done);
  });

  it('Should not add extra submit button if button action was changed', (done) => {
    const builder = Harness.getBuilder();
    builder.options.noAddSubmitButton = true;

    const cloneForm = _.cloneDeep(simpleWebform);
    cloneForm.components[1].action = 'reset'

    builder.setForm(cloneForm).then(() => {
      const components = builder.webform.components;
      assert.equal(components.length, 2);
      assert.equal(components[1].component.action, 'reset');
      builder.options.noAddSubmitButton = false;
      done();
    }).catch(done);
  });

  it('Should keep min/max date validation settings with moment.js function', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm(columnsForm).then(() => {
      const column1 = builder.webform.element.querySelector('[ref="columns-container"]');
      Harness.buildComponent('day', column1);

      setTimeout(() => {
        const maxDateComp = builder.editForm.getComponent('maxDate');
        maxDateComp.setValue('moment().add(10, \'days\')');

        setTimeout(() => {
          Harness.saveComponent();

          setTimeout(() => {
            const dayComp = builder.webform.getComponent(['day']);
            assert.equal(dayComp.component.maxDate, 'moment().add(10, \'days\')');
            done();
          }, 500);
        }, 500);
      }, 500);
    }).catch(done);
  });

  it('Should remove deleted components keys from default value', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({
      display: 'form',
      type: 'form',
      components: [
        {
          label: 'Data Grid',
          reorder: false,
          addAnotherPosition: 'bottom',
          layoutFixed: false,
          enableRowGroups: false,
          initEmpty: false,
          tableView: false,
          defaultValue: [
            {
              textField: '',
            },
          ],
          validateWhenHidden: false,
          key: 'dataGrid',
          type: 'datagrid',
          input: true,
          components: [
            {
              label: 'Text Field',
              applyMaskOn: 'change',
              tableView: true,
              validateWhenHidden: false,
              key: 'textField',
              type: 'textfield',
              input: true,
            },
          ],
        },
      ],
    }).then(() => {
      const textField = builder.webform.getComponent('dataGrid[0].textField');
      textField.refs.removeComponent.dispatchEvent( new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      }));

      setTimeout(() => {
        const dataGrid = builder.webform.getComponent(['dataGrid']);
        assert.deepEqual(dataGrid.schema.defaultValue, [{}], 'Should remove TextField key');
        done();
      }, 300);
    }).catch(done);
  });

  it('Should not highlight error for default values', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({}).then(() => {
      Harness.buildComponent('day');
      setTimeout(() => {
        const requiredDay = builder.editForm.getComponent('fields.day.required');
        requiredDay.setValue(true);
        setTimeout(() => {
          const defaultValue = builder.editForm.getComponent('defaultValue');
          assert.equal(defaultValue.checkComponentValidity(), true);
          done();
        }, 200);
      }, 200)
    }).catch(done);
  });

  it('Should show API error when components have invalid API keys', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(formWithNumericKeys).then(() => {
      builder.highlightInvalidComponents();
      const component = builder.webform.components[1];
      assert.equal(component.refs.messageContainer.textContent.trim(), 'apiKeyNotValid');
      done();
    }).catch(done);
  })

  it('should be able to render form with unknown component without crashing', () => {
    return Formio.builder(document.createElement('div'), {
      components: [
        {
          type: 'abc123'
        }
      ]
    })
  });

  it('should return false if hasEditTabs is passed a type that does not exist', () => {
    const webformBuilder = new WebformBuilder({});
    assert.equal(webformBuilder.hasEditTabs('abc123'), false);
  });
});

describe('Select Component selectData property', () => {
  const originalMakeRequest = Formio.makeRequest;

  before((done) => {
    Formio.makeRequest = () => {
      return new Promise(resolve => {
        const values = [{
          label: 'Label 1',
          value: 'value1',
        }, {
          label: 'Label 2',
          value: 'value2',
        }, {
          label: 'Label 3',
          value: 'value3',
        }];

        resolve(values);
      });
    };
    Harness.builderBefore(done);
  });
  afterEach(() => Harness.getBuilder().setForm({ display: 'form', components: [] }));

  it('Should calculate selectData property for url dataSource', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({}).then(() => {
      Harness.buildComponent('select');

      setTimeout(() => {
        const dataSrc = builder.editForm.getComponent('dataSrc');
        dataSrc.setValue('url');
        const url = builder.editForm.getComponent(['data.url']);
        const valueProperty = builder.editForm.getComponent('valueProperty');
        url.setValue('htts//fakeurl.com');
        valueProperty.setValue('value');

        setTimeout(() => {
          const defaultValue = builder.editForm.getComponent('defaultValue');
          defaultValue.setValue('value1');
          defaultValue.updateItems(null, true);

          setTimeout(() => {
            assert.deepEqual(builder.editForm.data.selectData, {
              label: 'Label 1',
            });
            Harness.saveComponent();
            setTimeout(() => {
              done();
            }, 150);
          }, 250);
        }, 250);
      }, 150);
    }).catch(done);
  });

  it('Should calculate selectData property for resource dataSource', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({}).then(() => {
      Harness.buildComponent('select');

      setTimeout(() => {
        const dataSrc = builder.editForm.getComponent('dataSrc');
        dataSrc.setValue('resource');
        const resource = builder.editForm.getComponent(['data.resource']);
        const valueProperty = builder.editForm.getComponent('valueProperty');
        resource.setValue('12345678');
        valueProperty.setValue('value');

        setTimeout(() => {
          const defaultValue = builder.editForm.getComponent('defaultValue');
          defaultValue.setValue('value1');
          defaultValue.updateItems(null, true);

          setTimeout(() => {
            assert.deepEqual(builder.editForm.data.selectData, {
              label: 'Label 1',
            });
            Harness.saveComponent();
            setTimeout(() => {
              done();
            }, 150);
          }, 250);
        }, 250);
      }, 150);
    }).catch(done);
  });

  it('Should not calculate selectData property without valueProperty', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({}).then(() => {
      Harness.buildComponent('select');

      setTimeout(() => {
        const dataSrc = builder.editForm.getComponent('dataSrc');
        dataSrc.setValue('url');
        const url = builder.editForm.getComponent(['data.url']);
        url.setValue('https://fakeurl.com');

        setTimeout(() => {
          const defaultValue = builder.editForm.getComponent('defaultValue');
          defaultValue.setValue('value1');
          defaultValue.updateItems(null, true);

          setTimeout(() => {
            assert.equal(builder.editForm.data.selectData, undefined);
            Harness.saveComponent();
            setTimeout(() => {
              done();
            }, 150);
          }, 250);
        }, 250);
      }, 150);
    }).catch(done);
  });

  it('Should remove selectData property if conditions are not met', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({}).then(() => {
      Harness.buildComponent('select');

      setTimeout(() => {
        const dataSrc = builder.editForm.getComponent('dataSrc');
        dataSrc.setValue('url');
        const url = builder.editForm.getComponent(['data.url']);
        const valueProperty = builder.editForm.getComponent('valueProperty');
        url.setValue('htts//fakeurl.com');
        valueProperty.setValue('value');

        setTimeout(() => {
          const defaultValue = builder.editForm.getComponent('defaultValue');
          defaultValue.setValue('value1');
          defaultValue.updateItems(null, true);

          setTimeout(() => {
            assert.deepEqual(builder.editForm.data.selectData, {
              label: 'Label 1',
            });

            setTimeout(() => {
              const widget = builder.editForm.getComponent('widget');
              widget.updateValue('html5', { modified: true });

              setTimeout(() => {
                assert.equal(builder.editForm.data.selectData, null);

                Harness.saveComponent();
                setTimeout(() => {
                  done();
                }, 150);
              }, 300);
            }, 150);
          }, 250);
        }, 250);
      }, 150);
    }).catch(done);
  });



  it('Should remove selectData property when clearing defaultValue', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({}).then(() => {
      Harness.buildComponent('select');

      setTimeout(() => {
        const dataSrc = builder.editForm.getComponent('dataSrc');
        dataSrc.setValue('url');
        const url = builder.editForm.getComponent(['data.url']);
        const valueProperty = builder.editForm.getComponent('valueProperty');
        url.setValue('htts//fakeurl.com');
        valueProperty.setValue('value');

        setTimeout(() => {
          const defaultValue = builder.editForm.getComponent('defaultValue');
          defaultValue.setValue('value1');
          defaultValue.updateItems(null, true);

          setTimeout(() => {
            assert.deepEqual(builder.editForm.data.selectData, {
              label: 'Label 1',
            });

            setTimeout(() => {
              defaultValue.updateValue('', { modified: true });

              setTimeout(() => {
                assert.equal(builder.editForm.data.selectData, null);

                Harness.saveComponent();
                setTimeout(() => {
                  done();
                }, 150);
              }, 300);
            }, 150);
          }, 250);
        }, 250);
      }, 150);
    }).catch(done);
  });

  it('Should calculate multiple selectData property for url dataSource', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({}).then(() => {
      Harness.buildComponent('select');

      setTimeout(() => {
        const multiple = builder.editForm.getComponent('multiple');
        multiple.setValue(true);
        const dataSrc = builder.editForm.getComponent('dataSrc');
        dataSrc.setValue('url');
        const url = builder.editForm.getComponent(['data.url']);
        const valueProperty = builder.editForm.getComponent('valueProperty');
        url.setValue('htts//fakeurl.com');
        valueProperty.setValue('value');

        setTimeout(() => {
          const defaultValue = builder.editForm.getComponent('defaultValue');
          defaultValue.setValue(['value1', 'value3']);
          defaultValue.updateItems(null, true);

          setTimeout(() => {
            assert.deepEqual(builder.editForm.data.selectData, {
              value1: {
                label: 'Label 1',
              },
              value3: {
                label: 'Label 3',
              },
            });
            Harness.saveComponent();
            setTimeout(() => {
              done();
            }, 150);
          }, 250);
        }, 250);
      }, 150);
    }).catch(done);
  });

  it('Should show correct default value for select component in form builder', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({}).then(() => {
      Harness.buildComponent('select');

      setTimeout(() => {
        const dataSrc = builder.editForm.getComponent('dataSrc');
        dataSrc.setValue('url');
        const url = builder.editForm.getComponent(['data.url']);
        const valueProperty = builder.editForm.getComponent('valueProperty');
        url.setValue('htts//fakeurl.com');
        valueProperty.setValue('value');

        setTimeout(() => {
          const defaultValue = builder.editForm.getComponent('defaultValue');
          assert.equal(defaultValue.type, 'select');
          defaultValue.setValue('value1');
          defaultValue.updateItems(null, true);

          setTimeout(() => {
            assert.deepEqual(builder.editForm.data.selectData, {
              label: 'Label 1',
            });
            Harness.saveComponent();
            setTimeout(() => {
              assert.equal(
                builder.webform.getComponent('select').element.querySelector('[aria-selected="true"] span').innerHTML,
                'Label 1',
              );

              const click = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
              });

              builder.webform.getComponent('select').element
                .querySelector('.component-settings-button-edit')
                .dispatchEvent(click);

              setTimeout(() => {
                const defaultValue = builder.editForm.getComponent('defaultValue');
                assert.equal(defaultValue.type, 'select');
                defaultValue.setValue('value2');
                defaultValue.updateItems(null, true);

                setTimeout(() => {
                  assert.deepEqual(builder.editForm.data.selectData, {
                    label: 'Label 2',
                  });
                  Harness.saveComponent();
                  setTimeout(() => {
                    assert.equal(
                      builder.webform.getComponent('select').element.querySelector('[aria-selected="true"] span').innerHTML,
                      'Label 2',
                    );
                    done();
                  }, 150);
                }, 250);
              }, 500);
            }, 150);
          }, 250);
        }, 250);
      }, 150);
    }).catch(done);
  });

  it('Should show correct default value for multiple select component in form builder', (done) => {
    const builder = Harness.getBuilder();
    builder.setForm({}).then(() => {
      Harness.buildComponent('select');

      setTimeout(() => {
        const multiple = builder.editForm.getComponent('multiple');
        multiple.setValue(true);
        const dataSrc = builder.editForm.getComponent('dataSrc');
        dataSrc.setValue('url');
        const url = builder.editForm.getComponent(['data.url']);
        const valueProperty = builder.editForm.getComponent('valueProperty');
        url.setValue('htts//fakeurl.com');
        valueProperty.setValue('value');

        setTimeout(() => {
          const defaultValue = builder.editForm.getComponent('defaultValue');
          assert.equal(defaultValue.type, 'select');
          defaultValue.setValue(['value1', 'value3']);
          defaultValue.updateItems(null, true);

          setTimeout(() => {
            assert.deepEqual(builder.editForm.data.selectData, {
              value1: {
                label: 'Label 1',
              },
              value3: {
                label: 'Label 3',
              },
            });
            Harness.saveComponent();
            setTimeout(() => {
              const elements = builder.webform.getComponent('select').element.querySelectorAll('.choices__list--multiple span');
              assert.deepEqual(
                Array.prototype.map.call(elements, (element) => element.innerHTML),
                ['Label 1', 'Label 3'],
              );

              const click = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
              });

              builder.webform.getComponent('select').element
                .querySelector('.component-settings-button-edit')
                .dispatchEvent(click);

              setTimeout(() => {
                const defaultValue = builder.editForm.getComponent('defaultValue');
                assert.equal(defaultValue.type, 'select');
                defaultValue.setValue(['value2', 'value3']);
                defaultValue.updateItems(null, true);

                setTimeout(() => {
                  assert.deepEqual(builder.editForm.data.selectData, {
                    value2: {
                      label: 'Label 2',
                    },
                    value3: {
                      label: 'Label 3',
                    },
                  });
                  Harness.saveComponent();
                  setTimeout(() => {
                    const elements = builder.webform.getComponent('select').element.querySelectorAll('.choices__list--multiple span');
                    assert.deepEqual(
                      Array.prototype.map.call(elements, (element) => element.innerHTML),
                      ['Label 2', 'Label 3'],
                    );
                    done();
                  }, 150);
                }, 250);
              }, 500);
            }, 150);
          }, 250);
        }, 250);
      }, 150);
    }).catch(done);
  });

  after((done) => {
    Formio.makeRequest = originalMakeRequest;
    Harness.builderAfter(done);
  });
});

describe('WebformBuilder with nested forms', function () {
  const originalMakeRequest = Formio.makeRequest;
  before((done) => {
    Formio.makeRequest = (formio, type, url, method, data) => {
      if (type === 'form' && method === 'get' && (url).includes('/687a3d82319f0b6faeb35735')) {
        return Promise.resolve(datagridWithNestedForm.nestedForm);
      };
      return originalMakeRequest(formio, type, url, method, data);
    }
    done();
  })
  it('Should not validate a nested form inside of dataGrid in edit mode', async () => {
    const comp = _.cloneDeep(datagridWithNestedForm.myForm);
    const builder = Harness.getBuilder();
    await builder.webform.setForm(comp);
    const grid = builder.webform.components[0];
    const editComponentRef = grid.refs.editComponent;
    const clickEvent = new Event('click');
    editComponentRef.dispatchEvent(clickEvent);
    await wait(600);
    const errors = builder.editForm.validate(builder.editForm.data, { dirty: true });
    assert.strictEqual(errors.length, 0);
  });
});
