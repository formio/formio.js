import assert from 'power-assert';
import Harness from '../test/harness';
import formWithFormController from '../test/forms/formWithFormController';
import { fastCloneDeep } from './utils/utils';

describe('WizardBuilder tests', function() {
  this.retries(3);
  before((done) => Harness.builderBefore(done, {}, true));
  afterEach(() => Harness.getBuilder().setForm({ display: 'wizard', components: [] }));
  after((done) => Harness.builderAfter(done));

  it('Should execute form controller', (done) => {
    const form = fastCloneDeep(formWithFormController);
    form.display = 'wizard';
    const builder = Harness.getBuilder();
    builder.webform.form = form;

    setTimeout(() => {
      const textF = builder.webform.getComponent('textField');
      assert.equal(textF.getValue(), 'Hello World');
      assert.equal(textF.disabled, true);
      assert.equal(builder.webform.components[0].disabled, true);

      done();
    }, 500);
  });
});
