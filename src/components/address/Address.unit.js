import Harness from '../../../test/harness';
import AddressComponent from './Address';
import assert from 'power-assert';
import Formio from './../../Formio';
import _ from 'lodash';

import {
  comp1,
  comp2
} from './fixtures';

describe('Address Component', () => {
  it('Should build an address component', () => {
    return Harness.testCreate(AddressComponent, comp1);
  });

  it('Should set default value and clear it on "clear icon" click (openStreetMap provider)', (done) => {
    const form = _.cloneDeep(comp2);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const address = form.getComponent('address');
      assert.equal(!!address.provider, true);
      assert.equal(address.refs.searchInput[0].value, 'Dallas County, Texas, United States');
      const clearIcon = address.refs.removeValueIcon[0];

      const clickEvent = new Event('click');
      clearIcon.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(address.refs.searchInput[0].value, '');

        document.innerHTML = '';
        done();
      }, 300);
    }).catch(done);
  });

  it('Should disable "clear icon"', (done) => {
    const form = _.cloneDeep(comp2);
    const element = document.createElement('div');
    form.components[0].disableClearIcon = true;

    Formio.createForm(element, form).then(form => {
      const address = form.getComponent('address');
      assert.equal(!!address.provider, true);
      assert.equal(address.refs.removeValueIcon.length, 0);

      done();
    }).catch(done);
  });

  it('Test manual mode', (done) => {
    const form = _.cloneDeep(comp2);
    const element = document.createElement('div');
    form.components[0].disableClearIcon = true;
    form.components[0].enableManualMode = true;
    form.components[0].switchToManualModeLabel = 'Check it to switch to manual mode';
      Formio.createForm(element, form).then(form => {
      const address = form.getComponent('address');
      assert.equal(!!address.provider, true);
      assert.equal(address.mode, 'autocomplete');
      assert.equal(address.refs.modeSwitcher.checked, false, 'Manual mode should be turned off');
      assert.equal(address.refs.modeSwitcher.nextElementSibling.textContent, 'Check it to switch to manual mode', 'Should set custom label for manual mode checkbox');

      address.components.forEach(comp => {
        assert.equal(comp.visible, false, 'Manual mode components should be hidden');
      });
      address.refs.modeSwitcher.checked = true;

      const changeEvent = new Event('change');
      address.refs.modeSwitcher.dispatchEvent(changeEvent);

      setTimeout(() => {
        assert.equal(address.refs.modeSwitcher.checked, true, 'Manual mode should be turned on');
        assert.equal(address.mode, 'manual');
        const manualModeValue = {
          address1: 'test address1',
          address2: 'test address2',
          city: 'test city',
          country: 'test country',
          state: 'test state',
          zip: '1111111',
        };

        address.components.forEach(comp => {
          assert.equal(comp.visible, true, 'Manual mode components should be visible');

          const inputEvent = new Event('input');
          const input = comp.refs.input[0];
          input.value = manualModeValue[`${comp.component.key}`];
          input.dispatchEvent(inputEvent);
        });

        setTimeout(() => {
          assert.deepEqual(address.dataValue, { address: manualModeValue, mode: 'manual' }, 'Should set manual mode value');

          document.innerHTML = '';
          done();
        }, 300);
      }, 300);
    }).catch(done);
  });
});
