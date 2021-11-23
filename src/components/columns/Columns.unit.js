import Harness from '../../../test/harness';
import ColumnsComponent from './Columns';
import assert from 'power-assert';
import {
  comp1,
  comp2,
  comp3
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

  it('Should clear fields in modal window after confirming to clear data in dialog window', (done) => {
    Harness.testCreate(ColumnsComponent, comp3).then((component) => {
      const hiddenModalWindow = component.element.querySelector('.component-rendering-hidden');
      assert.equal(!!hiddenModalWindow, true);

      const clickEvent = new Event('click');
      const openModalElement = component.refs.openModal;
      //open modal edit window
      openModalElement.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(!!component.element.querySelector('.component-rendering-hidden'), false);

        const inputEvent = new Event('input');
        const columnsInputField = component.element.querySelector('[name="data[textField]"]');

        columnsInputField.value = 'alexy@form.io';
        columnsInputField.dispatchEvent(inputEvent);

        setTimeout(() => {
          assert.equal(component.element.querySelector('[name="data[textField]"]').value, 'alexy@form.io');

          const clickEvent = new Event('click');
          const modalOverlay = component.refs.modalOverlay;
          //click outside modal edit window
          modalOverlay.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(!!component.componentModal.dialog, true);

            const clickEvent = new Event('click');
            const btnForCleaningValues = document.querySelector('[ref="dialogYesButton"]');
            //click on 'yes, delete it' button inside alert window
            btnForCleaningValues.dispatchEvent(clickEvent);

            setTimeout(() => {
              const clickEvent = new Event('click');
              const openModalElement = component.refs.openModal;
              //open edit modal window again
              openModalElement.dispatchEvent(clickEvent);

              setTimeout(() => {
                assert.equal(component.element.querySelector('[name="data[textField]"]').value, '');
                done();
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }).catch(done);
  });
});
