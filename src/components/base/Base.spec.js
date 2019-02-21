import assert from 'power-assert';
import _merge from 'lodash/merge';
import { expect } from 'chai';

import Harness from '../../../test/harness';
import BaseComponent from './Base';

import {
  comp1,
  comp2,
  multipleWithDraggableRows
} from './fixtures';

let draggableRowsComponent;
const draggableRowsComponentData = [
  'one',
  'two',
  'three'
];

describe('Base Component', () => {
  it('Should build a base component', (done) => {
    Harness.testCreate(BaseComponent, comp1).then((component) => {
      const inputs = Harness.testElements(component, 'input[type="text"]', 1);
      for (let i=0; i < inputs.length; i++) {
        assert.equal(inputs[i].name, `data[${comp1.key}]`);
      }
      done();
    });
  });

  it('Should provide required validation', (done) => {
    Harness.testCreate(BaseComponent, _merge({}, comp1, {
      validate: { required: true }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: '',
        field: 'firstName',
        error: 'First Name is required'
      },
      good: {
        value: 'te'
      }
    }, done));
  });

  it('Should provide minLength validation', (done) => {
    Harness.testCreate(BaseComponent, _merge({}, comp1, {
      validate: { minLength: 2 }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 't',
        field: 'firstName',
        error: 'First Name must be longer than 1 characters.'
      },
      good: {
        value: 'te'
      }
    }, done));
  });

  it('Should provide maxLength validation', (done) => {
    Harness.testCreate(BaseComponent, _merge({}, comp1, {
      validate: { maxLength: 5 }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'testte',
        field: 'firstName',
        error: 'First Name must be shorter than 6 characters.'
      },
      good: {
        value: 'te'
      }
    }, done));
  });

  it('Should provide custom validation', (done) => {
    Harness.testCreate(BaseComponent, _merge({}, comp1, {
      validate: {
        custom: 'valid = (input !== "Joe") ? true : "You cannot be Joe"'
      }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'Joe',
        field: 'firstName',
        error: 'You cannot be Joe'
      },
      good: {
        value: 'Tom'
      }
    }, done));
  });

  it('Should provide json validation', (done) => {
    Harness.testCreate(BaseComponent, _merge({}, comp1, {
      validate: {
        json: {
          'if': [
            {
              '===': [
                { var: 'data.firstName' },
                'Joe'
              ]
            },
            true,
            'You must be Joe'
          ]
        }
      }
    })).then((component) => Harness.testComponent(component, {
      bad: {
        value: 'Tom',
        field: 'firstName',
        error: 'You must be Joe'
      },
      good: {
        value: 'Joe'
      }
    }, done));
  });

  it('Should allow for multiple values', (done) => {
    Harness.testCreate(BaseComponent, comp2).then((component) => {
      Harness.testElements(component, 'table', 1);
      Harness.testElements(component, 'table tr', 2);
      Harness.testElements(component, 'table tr:first-child td', 2);
      Harness.testElements(component, 'table tr:first-child td:first-child input[name="data[names]"]', 1);
      Harness.testElements(component, 'table tr:first-child td:last-child .glyphicon-remove-circle', 1);
      done();
    });
  });

  describe('Draggable Rows Functionality', () => {
    it('Should populate Drag Info for each row', (done) => {
      Harness.testCreate(BaseComponent, multipleWithDraggableRows)
        .then((component) => {
          component.setValue(draggableRowsComponentData);
          draggableRowsComponent = component;
          draggableRowsComponentData.forEach((value, index) => {
            assert(!!component.tbody.children[index].dragInfo, 'Drag Info is not populated for a draggable row');
            assert.equal(component.tbody.children[index].dragInfo.index, index, 'Drag Info index is not calculated correctly for a draggable row');
          });
          done();
        });
    });

    it('Should switch data values according to how rows are dragged', (done) => {
      draggableRowsComponent.setValue(draggableRowsComponentData);
      //fake dropping last element at first position
      draggableRowsComponent.onRowDrop(draggableRowsComponent.tbody.children[2], draggableRowsComponent.tbody, draggableRowsComponent.tbody, draggableRowsComponent.tbody.children[0]);
      assert.equal(draggableRowsComponent.dataValue[0], draggableRowsComponentData[2]);
      assert.equal(draggableRowsComponent.dataValue[1], draggableRowsComponentData[0]);
      assert.equal(draggableRowsComponent.dataValue[2], draggableRowsComponentData[1]);
      done();
    });

    it('Should allow dragging row to last position', (done) => {
      draggableRowsComponent.setValue(draggableRowsComponentData);
      //fake dropping first element at last position
      draggableRowsComponent.onRowDrop(draggableRowsComponent.tbody.children[0], draggableRowsComponent.tbody, draggableRowsComponent.tbody, undefined);
      assert.equal(draggableRowsComponent.dataValue[0], draggableRowsComponentData[1]);
      assert.equal(draggableRowsComponent.dataValue[1], draggableRowsComponentData[2]);
      assert.equal(draggableRowsComponent.dataValue[2], draggableRowsComponentData[0]);
      done();
    });
  });

  describe('shouldSkipValidation', () => {
    it('should return true if component is hidden', done => {
      Harness.testCreate(BaseComponent, comp1)
        .then(cmp => {
          cmp.visible = false;
          cmp.checkCondition = () => true;
          expect(cmp.visible).to.be.false;
          expect(cmp.checkCondition()).to.be.true;
          expect(cmp.shouldSkipValidation()).to.be.true;
          done();
        }, done)
        .catch(done);
    });

    it('should return true if component is conditionally hidden', done => {
      Harness.testCreate(BaseComponent, comp1)
        .then(cmp => {
          cmp.visible = true;
          cmp.checkCondition = () => false;
          expect(cmp.visible).to.be.true;
          expect(cmp.checkCondition()).to.be.false;
          expect(cmp.shouldSkipValidation()).to.be.true;
          done();
        }, done)
        .catch(done);
    });

    it('should return false if not hidden', done => {
      Harness.testCreate(BaseComponent, comp1)
        .then(cmp => {
          cmp.visible = true;
          cmp.checkCondition = () => true;
          expect(cmp.visible).to.be.true;
          expect(cmp.checkCondition()).to.be.true;
          expect(cmp.shouldSkipValidation()).to.be.false;
          done();
        }, done)
        .catch(done);
    });
  });
});
