import assert from 'power-assert';

import Harness from '../test/harness';
import WebformBuilder from './WebformBuilder';
import { uniqueApiKeys, uniqueApiKeysLayout, uniqueApiKeysSameLevel, columnsForm } from '../test/formtest';
import sameApiKeysLayoutComps from '../test/forms/sameApiKeysLayoutComps';
import testApiKeysUniquifying from '../test/forms/testApiKeysUniquifying';

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
      const columnInsideDataGrid = builder.webform.element.querySelector('[ref="columns-container"]');
      Harness.buildComponent('textfield', columnInsideDataGrid);
      setTimeout(() => {
        const apiKeyComp = builder.editForm.getComponent('key');
        assert.equal(
          apiKeyComp.dataValue,
          'textField1',
          'Should add a number to the API key, because DataGrid already has a textField'
        );
        Harness.saveComponent();

        setTimeout(() => {
          const panelInsideEditGrid = builder.webform.element.querySelector('[ref="editGrid-container"] [ref="panel-container"]');
          Harness.buildComponent('textfield', panelInsideEditGrid);

          setTimeout(() => {
            const apiKeyComp = builder.editForm.getComponent('key');
            assert.equal(
              apiKeyComp.dataValue,
              'textField1',
              'Should add a number to the API key, because DataGrid already has a textField'
            );

            done();
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });
});
