import assert from 'power-assert';
import NativePromise from 'native-promise-only';
import Harness from '../test/harness';
import WebformBuilder from './WebformBuilder';
import Builders from '../lib/builders';
import { uniqueApiKeys, uniqueApiKeysLayout, uniqueApiKeysSameLevel, columnsForm, resourceKeyCamelCase } from '../test/formtest';
import sameApiKeysLayoutComps from '../test/forms/sameApiKeysLayoutComps';
import testApiKeysUniquifying from '../test/forms/testApiKeysUniquifying';
import formWithFormController from '../test/forms/formWithFormController';

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

  it('Should not show unique API error when components with same keys are inside and outside of the Data component', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(uniqueApiKeys).then(() => {
      builder.highlightInvalidComponents();
      const component = builder.webform.getComponent(['textField']);
      assert.equal(component.errors.length, 0);
      done();
    }).catch(done);
  });

  it('Should show unique API error when components inside and outside of the Layout component have same keys', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(uniqueApiKeysLayout).then(() => {
      builder.highlightInvalidComponents();
      const component = builder.webform.getComponent(['textField']);
      assert.equal(component.errors.length, 1);
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
      assert.equal(component.errors.length, 1, 'Should show Unique API Key error');
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
      assert.equal(component.errors.length, 1);
      done();
    }).catch(done);
  });

  it('Should uniquify API keys when add a component to the container which already has the same type component', (done) => {
    const builder = Harness.getBuilder();
    builder.webform.setForm(testApiKeysUniquifying).then(() => {
      const ERROR_MSG = 'Should add a number to the api key of the second component of the same type';
      let containerTestsReady;
      const containerTestsPromise = new NativePromise((resolve) => containerTestsReady = resolve);

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
        }, 150);
      }, 150);
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
      }, 150);
    }).catch(done);
  });
});
