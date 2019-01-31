import FieldsetComponent from './Fieldset';
import assert from 'assert';
import ColumnsComponent from '../columns/Columns';
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
      type: 'FieldSet',
      legend:''
    });

    assert.equal(fieldSet.component.legend, '');
  });
  it('Should be able to add component to the Fieldset',() => {
    const Fieldset = new FieldsetComponent({
      fieldset: [
        { components: [
            {
              'label': 'Text Field',
              'allowMultipleMasks': false,
              'showWordCount': false,
              'showCharCount': false,
              'tableView': true,
              'alwaysEnabled': false,
              'type': 'textfield',
              'input': true,
              'key': 'textField',
              'widget': {
                'type': ''
              }
            }
          ],
          'width': 6,
          'offset': 0,
          'push': 0,
          'pull': 0,
          'type': 'column',
          'hideOnChildrenHidden': false,
          'input': true,
          'key': '',
          'tableView': true,
          'label': ''
        }
      ]
    });
  });
});
