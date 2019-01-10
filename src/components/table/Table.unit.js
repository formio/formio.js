import Table from './Table';
import assert from 'assert';
import ColumnsComponent from '../columns/Columns';
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
  it('Should be able to change the number of rows',() => {
    const table = new Table();
    assert.equal(table.defaultSchema.input,false);
    assert.equal(table.defaultSchema.tableView,true);
    assert.equal(table.defaultSchema.condensed,false);
    // var numRows = 4;
    assert.equal(table.defaultSchema.numCols,3);
    assert.equal(table.defaultSchema.numRows,3);
  });
  it('Should be able to change the number of columns',() => {
    const table = new Table();
    assert.equal(table.defaultSchema.input,false);
    assert.equal(table.defaultSchema.tableView,true);
    assert.equal(table.defaultSchema.condensed,false);
    //var numCols = 4;
    assert.equal(table.defaultSchema.numCols,3);
    assert.equal(table.defaultSchema.numRows,3);
    console.log(table.inputInfo);
  });
  it('Should be able to add component to the Table',() => {
    const table = new Table({
      columns: [
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

