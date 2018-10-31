import DataGridComponent from './DataGrid';
import assert from 'assert';
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
});
