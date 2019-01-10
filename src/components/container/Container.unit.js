import ContainerComponent from './Container';
import assert from 'assert';
import ColumnsComponent from '../columns/Columns';
describe('Container Unit Tests', () => {
  it('Should create a new Container component', () => {
    const container = new ContainerComponent({
      label: 'Container',
      key: 'container',
      type: 'container'
    });

    assert.equal(container.component.key, 'container');
  });
  it('Should be able to change the Container label',() => {
    const container = new ContainerComponent({
      label: 'New Label',
      key: 'container',
      type: 'container'
    });
  });
  it('Should be able to add component to the Container',() => {
    const container = new ColumnsComponent({
      container: [
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

