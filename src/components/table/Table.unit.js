import Table from './Table';
import assert from 'assert';
describe('Table Unit Tests', () => {
  it('Should create a new Table component', () => {
    const table = new Table();
    assert.equal(table.key,'table');
  });
  it('Checking the  default schema of the table component', () => {
    const table = new Table();
    assert.equal(table.defaultSchema.input,false);
    assert.equal(table.defaultSchema.tableView,true);
    assert.equal(table.defaultSchema.condensed,false);
    assert.equal(table.defaultSchema.numRows,3);
    assert.equal(table.defaultSchema.numCols,3);
  });
  it('Rendering the component', () => {
    const table = new Table();
    assert.equal(table.rendered,false);
    table.render();
    assert.equal(table.rendered,true);
  });
  it('Column key', () => {
    const table = new Table();
    assert.equal(table.columnKey,'column-table');
  });
  it('Class name', () => {
    const table = new Table();
    assert.equal(table.className,'table-responsive formio-component formio-component-table formio-component-table ');
  });
});
