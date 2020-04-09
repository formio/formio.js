import assert from 'power-assert';

import Harness from '../test/harness';
import WebformBuilder from './WebformBuilder';
import { uniqueApiKeys, uniqueApiKeysLayout, uniqueApiKeysSameLevel } from '../test/formtest';

describe('WebformBuilder tests', () => {
  before((done) => Harness.builderBefore(done));
  after(() => Harness.builderAfter());
  it('Should create a new form builder class', (done) => {
    const builder = Harness.buildComponent('textfield');
    assert(builder instanceof WebformBuilder, 'Builder must be an instance of FormioFormBuilder');
    done();
  });
  it('Should not show unique API error when components with same keys are inside and outside of the Data component', (done) => {
    const builder = Harness.buildComponent('textfield');
    builder.webform.setForm(uniqueApiKeys).then(() => {
      builder.highlightInvalidComponents();
      builder.webform.getComponent('textField', component => {
        assert.equal(component.errors.length, 0);
        done();
      });
    }).catch(done)
      .finally(() => {
        builder.form = { components: [] };
      });
  });
  it('Should show unique API error when components inside and outside of the Layout component have same keys', (done) => {
    const builder = Harness.buildComponent('textfield');
    builder.webform.setForm(uniqueApiKeysLayout).then(() => {
      builder.highlightInvalidComponents();
      builder.webform.getComponent('textField', component => {
        assert.equal(component.errors.length, 1);
        done();
      });
    }).catch(done)
      .finally(() => {
      builder.form = { components: [] };
    });
  });
  it('Should show unique API error when components on the same level have same keys', (done) => {
    const builder = Harness.buildComponent('textfield');
    builder.webform.setForm(uniqueApiKeysSameLevel).then(() => {
      builder.highlightInvalidComponents();
      builder.webform.getComponent('textField', component => {
        assert.equal(component.errors.length, 1);
        done();
      });
    }).catch(done)
      .finally(() => {
      builder.form = { components: [] };
    });
  });
});
