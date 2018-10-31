import FieldsetComponent from './FieldSet';
import assert from 'assert';
describe('FieldSet Unit Tests', () => {
  it('Should create a new FieldSet component', () => {
    const fieldSet = new FieldsetComponent({
      label: 'FieldSet',
      key: 'fieldset',
      type: 'FieldSet'
    });

    assert.equal(fieldSet.key, 'fieldset');
  });
  it('Should create a new FieldSet component with legend', () => {
    const fieldSet = new FieldsetComponent({
      label: 'FieldSet',
      key: 'fieldset',
      type: 'FieldSet',
      legend:'my fieldset'
    });

    assert.equal(fieldSet.component.legend, 'my fieldset');
  });
  it('Should create a new FieldSet component without legend', () => {
    const fieldSet = new FieldsetComponent({
      label: 'Fieldset',
      key: 'fieldset',
      type: 'FieldSet'
    });

    assert.equal(fieldSet.component.legend, '');
  });
});
