import ColumnsComponent from './Columns';
import assert from 'assert';
describe('Columns Unit Tests', () => {
  it('Should create a new Columns component', () => {
    const columns = new ColumnsComponent({
      label: 'Columns',
      key: 'columns',
      type: 'columns'
    });

    assert.equal(columns.component.key, 'columns');
  });
});
