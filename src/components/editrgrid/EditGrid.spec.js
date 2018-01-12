'use strict';
import assert from 'power-assert';
import { EditGridComponent } from './EditGrid';
import { components as comps } from './fixtures/index';
import { Harness } from '../../../test/harness';
describe('EditGrid Component', function() {
  it('Should build an empty edit grid component', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(1)', "Field 1");
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(2)', "Field 2");
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      Harness.testElements(component, 'li.list-group-header', 1);
      Harness.testElements(component, 'li.list-group-item', 1);
      Harness.testElements(component, 'li.list-group-footer', 0);
      Harness.testElements(component, 'div.editRow', 0);
      Harness.testElements(component, 'div.removeRow', 0);
      Harness.testElements(component, 'div.editgrid-add a', 1);
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should build an edit grid component', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(1)', "Field 1");
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(2)', "Field 2");
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.testElements(component, 'li.list-group-header', 1);
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testElements(component, 'li.list-group-footer', 0);
      Harness.testElements(component, 'div.editRow', 2);
      Harness.testElements(component, 'div.removeRow', 2);
      Harness.testElements(component, 'div.editgrid-add a', 1);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', "good");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', "foo");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', "good");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', "bar");
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should add a row when add another is clicked', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testElements(component, 'li.list-group-item', 1);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      Harness.clickElement(component, 'div.editgrid-add a');
      Harness.testElements(component, 'li.list-group-item', 2);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      Harness.clickElement(component, 'div.editgrid-add a');
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "0");
      assert(!component.checkValidity(component.getValue()), 'Item should not be valid');
      done();
    });
  });

  it('Should save a new row when save is clicked', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      Harness.clickElement(component, 'div.editgrid-add a');
      Harness.testElements(component, 'li.list-group-item', 4);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      Harness.setInputValue(component, 'data[editgrid][2][field1]', 'good');
      Harness.setInputValue(component, 'data[editgrid][2][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      Harness.testElements(component, 'li.list-group-item', 4);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "3");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.row div:nth-child(1)', "good");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.row div:nth-child(2)', "baz");
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should cancel add a row when cancel is clicked', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      Harness.clickElement(component, 'div.editgrid-add a');
      Harness.testElements(component, 'li.list-group-item', 4);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      Harness.setInputValue(component, 'data[editgrid][2][field1]', 'good');
      Harness.setInputValue(component, 'data[editgrid][2][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-danger');
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      assert.equal(component.editRows.length, 2);
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should delete a row when delete is clicked', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        },
        {
          field1: 'good',
          field2: 'baz'
        }
      ]);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "3");
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.removeRow');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', "good");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', "foo");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', "good");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', "baz");
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should edit a row when edit is clicked', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      Harness.getInputValue(component, 'data[editgrid][1][field1]', 'good');
      Harness.getInputValue(component, 'data[editgrid][1][field2]', 'bar');
      Harness.testElements(component, 'div.editgrid-actions div.btn-primary', 1);
      Harness.testElements(component, 'div.editgrid-actions div.btn-danger', 1);
      assert(!component.checkValidity(component.getValue()), 'Item should not be valid');
      done();
    });
  });

  it('Should save a row when save is clicked', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      Harness.setInputValue(component, 'data[editgrid][1][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', "good");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', "baz");
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should cancel edit row when cancel is clicked', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      Harness.setInputValue(component, 'data[editgrid][1][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-danger');
      Harness.testElements(component, 'li.list-group-item', 3);
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "2");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(1)', "good");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(3) div.row div:nth-child(2)', "bar");
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });

  it('Should show error messages for existing data in rows', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'bad',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        },
        {
          field1: 'also bad',
          field2: 'baz'
        }
      ]);
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.has-error div.editgrid-row-error', 'Must be good');
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(4) div.has-error div.editgrid-row-error', 'Must be good');
      assert(!component.checkValidity(component.getValue()), 'Item should not be valid');
      done();
    });
  });

  it('Should not allow saving when errors exist', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.clickElement(component, 'div.editgrid-add a');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      Harness.getInputValue(component, 'data[editgrid][0][field1]', '');
      Harness.getInputValue(component, 'data[editgrid][0][field2]', '');
      assert(!component.checkValidity(component.getValue()), 'Item should not be valid');
      Harness.setInputValue(component, 'data[editgrid][0][field2]', 'baz');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      Harness.getInputValue(component, 'data[editgrid][0][field1]', '');
      Harness.getInputValue(component, 'data[editgrid][0][field2]', 'baz');
      assert(!component.checkValidity(component.getValue()), 'Item should not be valid');
      Harness.setInputValue(component, 'data[editgrid][0][field1]', 'bad');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      Harness.getInputValue(component, 'data[editgrid][0][field1]', 'bad');
      Harness.getInputValue(component, 'data[editgrid][0][field2]', 'baz');
      assert(!component.checkValidity(component.getValue()), 'Item should not be valid');
      Harness.setInputValue(component, 'data[editgrid][0][field1]', 'good');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      Harness.testInnerHtml(component, 'li.list-group-header div.row div:nth-child(3)', "1");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(1)', "good");
      Harness.testInnerHtml(component, 'li.list-group-item:nth-child(2) div.row div:nth-child(2)', "baz");
      done();
    });
  });

  it('Should not allow saving when rows are open', done => {
    Harness.testCreate(EditGridComponent, comps.comp1).then((component) => {
      Harness.testSetGet(component, [
        {
          field1: 'good',
          field2: 'foo'
        },
        {
          field1: 'good',
          field2: 'bar'
        }
      ]);
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      assert(!component.checkValidity(component.getValue()), 'Item should not be valid');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-primary');
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      Harness.clickElement(component, 'li.list-group-item:nth-child(3) div.editRow');
      assert(!component.checkValidity(component.getValue()), 'Item should not be valid');
      Harness.clickElement(component, 'div.editgrid-actions div.btn-danger');
      assert(component.checkValidity(component.getValue()), 'Item should be valid');
      done();
    });
  });
});