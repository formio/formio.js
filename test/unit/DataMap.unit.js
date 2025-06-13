import { Formio } from '../../src/Formio';
import Harness from '../harness';
import DataMapComponent from '../../src/components/datamap/DataMap';
import { comp1, formWithConditionalPanel, selectClearOnRefreshForDataMap } from './fixtures/datamap';
import assert from 'power-assert';
import { wait } from '../util';

describe('DataMap Component', () => {
  it('Should build a data map component', () => {
    return Harness.testCreate(DataMapComponent, comp1);
  });

  it('Should get and set values within the datamap.', () => {
    return Harness.testCreate(DataMapComponent, comp1).then((component) => {
      Harness.testSetGet(component, {
        one: 'One',
        two: 'Two',
        three: 'Three'
      });
    });
  });

  it('Select with refreshOn=Data Map should be cleared when the Data Map fields change (clearOnRefresh should be enabled) ', async () => {
    const dispatchNewValue = (dataMap, key) => {
      const textFieldInput = dataMap.getComponent([key]).refs.input[0];
      textFieldInput.value = "new value";
      const inputEvent = new Event('input');
      textFieldInput.dispatchEvent(inputEvent);
    }
    const form = await Formio.createForm(document.createElement('div'), selectClearOnRefreshForDataMap, { readOnly: true })
    const dataMap = form.getComponent(['dataMap']);
    const select = form.getComponent(['selectDataMap']);
    select.setValue('a');
    assert.equal(form.data.selectDataMap, "a");
    dataMap.addRow();
    await wait(500);
    assert.equal(form.data.selectDataMap, "");
    select.setValue('a');
    assert.equal(form.data.selectDataMap, "a");
    dispatchNewValue(dataMap, "__key")
    await wait(500);
    assert.equal(form.data.selectDataMap, "");
    select.setValue('b');
    assert.equal(form.data.selectDataMap, "b");
    dispatchNewValue(dataMap, "key")
    await wait(500);
    assert.equal(form.data.selectDataMap, "");
    select.setValue('c');
    assert.equal(form.data.selectDataMap, "c");
    dataMap.removeRow();
    await wait(500);
    assert.equal(form.data.selectDataMap, "");
  })

  it(
    'Should render data from submission properly when the Data Map is inside conditionally shown layout component',
    (done) => {
      Formio.createForm(document.createElement('div'), formWithConditionalPanel, { readOnly: true })
        .then((form) => {
          form.submission = {
            data: {
              checkbox: true,
              dataMap1: {
                key: 'a'
              },
              dataMap: {
                key: 'b',
                key1: 'c',
              },
            },
            state: 'submitted',
          };

          setTimeout(() => {
            const dataMap1 = form.getComponent(['dataMap1']);
            const dataMap = form.getComponent(['dataMap']);
            assert.equal(dataMap1.visible, true, 'Data Map should become visible');
            assert.equal(dataMap.visible, true, 'Data Map inside a panel should become visible');
            assert.deepEqual(dataMap1.dataValue, {
              key: 'a'
            }, 'Should set value of the Data Map properly');
            assert.deepEqual(dataMap.dataValue, {
              key: 'b',
              key1: 'c',
            }, 'Should set value of the Data Map inside a panel properly');
            assert.equal(dataMap1.rows.length, 1, 'Should create rows for Data Grid');
            assert.equal(dataMap.rows.length, 2, 'Should create rows for Data Grid inside a panel');

            done();
          }, 300);
        })
        .catch(done);
    }
  );
});
