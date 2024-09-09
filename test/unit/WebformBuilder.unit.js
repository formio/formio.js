import assert from 'power-assert';
import _ from 'lodash';
import Harness from '../harness';
import WebformBuilder from '../../src/WebformBuilder';
import Builders from '../../src/builders';
import { Formio } from '../../src/Formio';
import { uniqueApiKeys, uniqueApiKeysLayout, uniqueApiKeysSameLevel, columnsForm, resourceKeyCamelCase, uniqueApiKeysTranslation } from '../formtest';
import sameApiKeysLayoutComps from '../forms/sameApiKeysLayoutComps';
import testApiKeysUniquifying from '../forms/testApiKeysUniquifying';
import formBasedOnWizard from '../forms/formBasedOnWizard';
import formWithFormController from '../forms/formWithFormController';

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
    builder.webform.setForm(uniqueApiKeys).then(() => {
      builder.highlightInvalidComponents();
      const component = builder.webform.getComponent(['textField']);
      assert.equal(component.visibleErrors.length, 0);
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

  it('Should show unique API error when layout components have same keys', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(sameApiKeysLayoutComps).then(() => {
      builder.highlightInvalidComponents();
      const component = builder.webform.getComponent(['tabs']);
      assert.equal(component.visibleErrors.length, 1, 'Should show Unique API Key error');
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
    builder.setForm(formBasedOnWizard).then(() => {
      const components = builder.webform.components;
      const submit = components[components.length - 1];

      assert.equal(submit.key, 'submit');
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
          }, 200);
        }, 200);
      }, 300);
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
      const textField = builder.webform.getComponent(['dataGrid', 'textField'])[0];
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

  it('Should not hilight error for default values', (done) => {
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
  })
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

  after((done) => {
    Formio.makeRequest = originalMakeRequest;
    Harness.builderAfter(done);
  });
});
