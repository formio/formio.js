import assert from 'power-assert';
import { wait } from '../util';
// googleMock imports Formio, which must load before GoogleAddressProvider to
// avoid a circular-import crash in src/providers/address/index.js.
import {
  mockGoogleMapsLibrary,
  createGooglePlace,
  selectGmpPlace,
  newApiPlaceData,
} from './fixtures/address/googleMock';
import { GoogleAddressProvider } from '../../src/providers/address/GoogleAddressProvider';

describe('GoogleAddressProvider', function () {
  let mock;

  beforeEach(function () {
    mock = mockGoogleMapsLibrary();
  });

  afterEach(function () {
    mock.restore();
  });

  const createNewApiProvider = (options = {}) => {
    const provider = new GoogleAddressProvider(options);
    // Mirrors how Address.js enables the new API from the component's checkbox.
    provider.options.version = 'newPlacesApi';
    return provider;
  };

  const createSearchInput = (value = '') => {
    const parent = document.createElement('div');
    const input = document.createElement('input');
    input.value = value;
    parent.appendChild(input);
    document.body.appendChild(parent);
    return input;
  };

  it('Should pass a displayable place to onSelectAddress when a new Places API prediction is selected', async function () {
    const provider = createNewApiProvider();
    const input = createSearchInput();
    const selected = [];

    await provider.attachAutocomplete(input, 0, (place) => selected.push(place));

    const element = mock.created.elements[0];
    assert(element, 'should create a PlaceAutocompleteElement');
    selectGmpPlace(element, createGooglePlace(newApiPlaceData));
    await wait(50);

    assert.equal(selected.length, 1, 'should call onSelectAddress with the selected place');
    assert.equal(selected[0].formattedPlace, newApiPlaceData.formattedAddress);
    assert.equal(provider.getDisplayValue(selected[0]), newApiPlaceData.formattedAddress);
  });

  it('Should display saved addresses that only have new Places API properties', function () {
    const provider = new GoogleAddressProvider();
    assert.equal(
      provider.getDisplayValue({ formattedAddress: newApiPlaceData.formattedAddress }),
      newApiPlaceData.formattedAddress,
    );
  });

  it('Should keep displaying legacy-shaped saved addresses', function () {
    const provider = new GoogleAddressProvider();
    assert.equal(
      provider.getDisplayValue({ formatted_address: 'Los Angeles, CA, USA' }),
      'Los Angeles, CA, USA',
    );
  });

  it('Should resolve with a cleanup function that detaches the new Places API listener', async function () {
    const provider = createNewApiProvider();
    const input = createSearchInput();
    const selected = [];

    const cleanup = await provider.attachAutocomplete(input, 0, (place) => selected.push(place));
    assert.equal(typeof cleanup, 'function', 'should resolve to a cleanup function');

    cleanup();
    selectGmpPlace(mock.created.elements[0], createGooglePlace(newApiPlaceData));
    await wait(50);

    assert.equal(selected.length, 0, 'should not receive selections after cleanup');
  });

  it('Should request only new Places API field names when the form stores an autocompleteOptions object', async function () {
    // Mirrors the FIO-10428 QA form: the builder persists autocompleteOptions: {}.
    // The constructor computes legacy field names before Address.js flips the
    // version flag; those must not leak into the new API's fetchFields call.
    const provider = new GoogleAddressProvider({ autocompleteOptions: {} });
    provider.options.version = 'newPlacesApi';
    const input = createSearchInput();
    const selected = [];

    await provider.attachAutocomplete(input, 0, (place) => selected.push(place));
    selectGmpPlace(mock.created.elements[0], createGooglePlace(newApiPlaceData));
    await wait(50);

    assert.equal(selected.length, 1, 'should call onSelectAddress with the selected place');
    assert.equal(selected[0].formattedPlace, newApiPlaceData.formattedAddress);
  });

  it('Should still store a displayable place when fetchFields fails', async function () {
    const provider = createNewApiProvider();
    const input = createSearchInput();
    const selected = [];

    await provider.attachAutocomplete(input, 0, (place) => selected.push(place));

    const failingPlace = {
      fetchFields: () => Promise.reject(new Error('API_KEY_SERVICE_BLOCKED')),
    };
    selectGmpPlace(mock.created.elements[0], failingPlace, 'Austin, TX, USA');
    await wait(50);

    assert.equal(selected.length, 1, 'should still call onSelectAddress');
    assert.equal(provider.getDisplayValue(selected[0]), 'Austin, TX, USA');
  });

  it('Should map componentRestrictions country to includedRegionCodes for the new Places API element', async function () {
    const provider = createNewApiProvider({
      autocompleteOptions: { componentRestrictions: { country: ['GB'] } },
    });
    const input = createSearchInput();

    await provider.attachAutocomplete(input, 0, () => {});

    const options = mock.created.elements[0].constructorOptions;
    assert.deepEqual(options.includedRegionCodes, ['GB']);
    assert(
      !('componentRestrictions' in options),
      'should not pass the legacy componentRestrictions option to PlaceAutocompleteElement',
    );
  });

  it('Should initialize the new Places API element with the current search input value', async function () {
    const provider = createNewApiProvider();
    const input = createSearchInput('1600 Amphitheatre');

    await provider.attachAutocomplete(input, 0, () => {});

    assert.equal(mock.created.elements[0].value, '1600 Amphitheatre');
  });

  it('Should keep using the legacy Autocomplete when the new Places API is not enabled', async function () {
    const provider = new GoogleAddressProvider();
    const input = createSearchInput();

    const cleanup = await provider.attachAutocomplete(input, 0, () => {});

    assert.equal(mock.created.autocompletes.length, 1, 'should create a legacy Autocomplete');
    assert.equal(mock.created.elements.length, 0, 'should not create a PlaceAutocompleteElement');
    assert.equal(typeof cleanup, 'function', 'should resolve to a cleanup function');
  });
});
