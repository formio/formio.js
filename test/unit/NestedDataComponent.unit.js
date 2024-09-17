'use strict';
import { Formio } from '../../src/Formio';
import NestedDataComponent from '../../src/components/_classes/nesteddata/NestedDataComponent';
import Harness from '../harness';
import assert from 'power-assert';
import nestedDataCompWithModalPreview from '../forms/nestedDataWithModalViewAndLayoutComponents';

let component = null;
describe('NestedDataComponent class', () => {
  it('Should create a new NestedDataComponent class', () => {
    return Harness.testCreate(NestedDataComponent, {
      // key: 'nested',
      components: [
        {
          type: 'textfield',
          key: 'firstName',
          input: true
        },
        {
          type: 'textfield',
          key: 'lastName',
          input: true
        }
      ]
    }).then((_component) => {
      component = _component;
      Harness.testElements(component, 'input[name="data[firstName]"]', 1);
      Harness.testElements(component, 'input[name="data[lastName]"]', 1);
    });
  });
  it('Should show preview of the modal view component properly', (done) => {
    Formio.createForm(document.createElement('div'), nestedDataCompWithModalPreview)
      .then((form) => {
        const openModalBtn = form.element.querySelector('.open-modal-button');
        const openModalBtnRows = openModalBtn.querySelectorAll('tr');
        assert.equal(openModalBtnRows.length, 1);

        const dataGrid = form.getComponent(['dataGrid']);
        dataGrid.setValue([
          {
            textField: 'test'
          },
          {
            textField: 'test2'
          }
        ]);

        setTimeout(() => {
          const modalPreviewValues = form.element.querySelectorAll('.open-modal-button tr td input');
          assert.equal(modalPreviewValues.length, 2);
          assert.deepEqual(Array.prototype.map.call(modalPreviewValues, (i) => i.value), ['test', 'test2']);
          done();
        }, 300);
      }).catch(done);
  });
});
