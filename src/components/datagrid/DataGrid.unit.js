import DataGridComponent from './DataGrid';
import assert from 'assert';
import ColumnsComponent from '../columns/Columns';
describe('DataGrid Unit Tests', () => {
  it('Should create a new DataGrid component', () => {
    const dataGrid = new DataGridComponent({
      label: 'DataGrid',
      key: 'datagrid',
      type: 'DataGrid'
    });

    assert.equal(dataGrid.key, 'datagrid');
  });
  it('Should create a new DataGrid component with Label', () => {
    const dataGrid = new DataGridComponent({
      label: 'DataGrid',
      key: 'datagrid',
      type: 'DataGrid'
    });

    assert.equal(dataGrid.label, 'DataGrid');
  });
  it('Should create a new DataGrid component without Label', () => {
    const dataGrid = new DataGridComponent({
      label: '',
      key: 'datagrid',
      type: 'DataGrid'
    });

    assert.equal(dataGrid.label, '');
  });
  it('Should be able to add component to the Data Grid',() => {
    const Datagrid = new DataGridComponent({
      DataGrid: [
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

