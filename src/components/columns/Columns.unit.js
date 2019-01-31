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
  it('Should be able to add a Column', () => {
   const columns = new ColumnsComponent({
     columns: [
       { components: [], width: 6, offset: 0, push: 0, pull: 0 },
       { components: [], width: 6, offset: 0, push: 0, pull: 0 },
       { components: [], width: 1, offset: 0, push: 0, pull: 0 }
     ],
   });
  });
  it('Should be able to delete a Column', () => {
    const columns = new ColumnsComponent({
      columns: [
        { components: [], width: 6, offset: 0, push: 0, pull: 0 }
      ],
    });
  });
  it('Should be able to change the width of Columns', () => {
    const columns = new ColumnsComponent({
      columns: [
        { components: [], width: 5, offset: 0, push: 0, pull: 0 },
        { components: [], width: 5, offset: 0, push: 0, pull: 0 },
        { components: [], width: 2, offset: 0, push: 0, pull: 0 }
      ],
    });
  });
  it('Should be able to change the offset of the Column', () => {
    const columns = new ColumnsComponent({
    columns: [
      { components: [], width: 6, offset: 2, push: 0, pull: 0 },
      { components: [], width: 6, offset: 2, push: 0, pull: 0 }
    ],
  });
  });
  it('Should be able to change the push of the Column', () => {
    const columns = new ColumnsComponent({
      columns: [
        { components: [], width: 4, offset: 0, push: 2, pull: 0 },
        { components: [], width: 4, offset: 0, push: 2, pull: 0 }
      ],
    });
  });
  it('Should be able to change the pull of the Column', () => {
    const columns = new ColumnsComponent({
      columns: [
        { components: [], width: 4, offset: 0, push: 0, pull: 2 },
        { components: [], width: 4, offset: 0, push: 0, pull: 2 }
      ],
    });
  });
  it('Should be able to add component to the Column',() => {
 const columns = new ColumnsComponent({
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
