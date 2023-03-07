import Harness from '../../../test/harness';
import AddressComponent from './Address';
import assert from 'power-assert';
import Formio from './../../Formio';
import _ from 'lodash';

import {
  comp1,
  comp2,
  comp3,
  comp4,
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

  it('Should close modal window without showing dialog if value not changed', (done) => {
    const form = _.cloneDeep(comp3);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const value = {
        'address_components': [
          {
            'long_name': 'Los Angeles',
            'short_name': 'Los Angeles',
            types: ['locality', 'political'],
          },
          {
            'long_name': 'Los Angeles County',
            'short_name': 'Los Angeles County',
            types: ['administrative_area_level_2', 'political'],
          },
          {
            'long_name': 'California',
            'short_name': 'CA',
            types: ['administrative_area_level_1', 'political'],
          },
          {
            'long_name': 'United States',
            'short_name': 'US',
            types: ['country', 'political'],
          },
        ],
        'formatted_address': 'Los Angeles, CA, USA',
        geometry: {
          location: { lat: 34.0522342, lng: -118.2436849 },
          viewport: {
            south: 33.70365193147634,
            west: -118.6681759484859,
            north: 34.33730608759191,
            east: -118.155289077463,
          },
        },
        'place_id': 'ChIJE9on3F3HwoAR9AhGJW_fL-I',
        types: ['locality', 'political'],
        formattedPlace: 'Los Angeles, CA, USA',
      };
      const address = form.getComponent('address');
      const openModalButton = address.componentModal.refs.openModal;
      const clickEvent = new Event('click');
      openModalButton.dispatchEvent(clickEvent);

      setTimeout(() => {
        assert.equal(address.componentModal.isOpened, true);
        address.dataValue = value;
        address.componentModal.closeModal();
        address.redraw();

        setTimeout(() => {
          address.componentModal.isOpened = true;
          openModalButton.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(address.componentModal.isOpened, true);
            assert.equal(!!address.dataValue, true);
            const modalOverlayButton = address.componentModal.refs.modalOverlay;
            modalOverlayButton.dispatchEvent(clickEvent);

            setTimeout(() => {
              assert.equal(!!address.componentModal.isValueChanged(), false);
              assert.equal(!!address.componentModal.dialogElement, false);
              done();
            }, 200);
          }, 200);
        }, 200);
      }, 200);
    }).catch(done);
  });

  it('Should correctly display component that has a conditional based on the Address component', (done) => {
    const value = {
      'place_id': 298032694,
      licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
      'osm_type': 'relation',
      'osm_id': 1180520,
      boundingbox: [
        37.4148293,
        37.907822,
        -93.191483,
        -92.845795
      ],
      lat: 37.6832712,
      lon: -93.0219376,
      'display_name': 'Dallas County, Missouri, United States',
      class: 'boundary',
      type: 'administrative',
      importance: 0.6131235182618818,
      icon: 'https://nominatim.openstreetmap.org/ui/mapicons/poi_boundary_administrative.p.20.png',
      address: {
        county: 'Dallas County',
        state: 'Missouri',
        'ISO3166-2-lvl4': 'US-MO',
        country: 'United States',
        'country_code': 'us'
      }
    };

    const form = _.cloneDeep(comp4);
    const element = document.createElement('div');

    Formio.createForm(element, form).then(form => {
      const address = form.getComponent('address');
      const textfield = form.getComponent('textField');

      setTimeout(() => {
        address.setValue(value);

        setTimeout(() => {
          assert.equal(textfield.visible, true);
          const clearIcon = address.refs.removeValueIcon[0];
          const clickEvent = new Event('click');
          clearIcon.dispatchEvent(clickEvent);

          setTimeout(() => {
            assert.equal(textfield.visible, false);
            done();
          }, 300);
        }, 300);
      }, 300);
    });
  });
});
