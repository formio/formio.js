import Harness from '../../../test/harness';
import ColumnsComponent from './Columns';
import assert from 'power-assert';
import {
  comp1,
  comp2
} from './fixtures';

describe('Columns Component', () => {
  it('Should build a columns component', () => {
    return Harness.testCreate(ColumnsComponent, comp1).then((component) => {
      Harness.testElements(component, 'input[type="text"]', 2);
    });
  });
  it('Should be auto-adjusting when auto adjust is set to true', done => {
    Harness.testCreate(ColumnsComponent, comp2)
    .then((component) => {
      const columns = component.component.columns;
      assert.equal(columns.every(col => col.currentWidth === 2), true);
      const oddIndexes = [0, 2, 4]; // 0 column has 2 textfields
      oddIndexes.forEach(i => columns[i].components[0].hidden = true); // we're setting hidden for odd columns
      // initially all components aren't hidden and have default width = 2
      component.rebuild(); // rebuild component to check conditions

      oddIndexes.forEach(i => {
        if (i === 0) {
          assert.equal(columns[i].currentWidth, 2, `column[${i}] should have width = 2`); // it has at least a component as visible
        }
        else {
          assert.equal(columns[i].currentWidth, 0, `column[${i}] should have width = 0`); // columns which has no visible components should have currentWidth as 0
        }
      });

      oddIndexes.forEach(i => columns[i].components[0].hidden = false); // we're setting visible for odd columns again
      component.rebuild(); // rebuild component to check conditions
      assert.equal(columns.every(col => col.currentWidth === 2), true, 'all columns should have width = 2'); // ensure we have initial width
    })
    .then(done)
    .catch(done);
  });
});
