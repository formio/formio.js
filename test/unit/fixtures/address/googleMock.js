import { Formio } from '../../../../src/Formio';

const PLACE_FIELDS = [
  'addressComponents',
  'formattedAddress',
  'location',
  'viewport',
  'id',
  'plusCode',
  'types',
  'displayName',
];

/**
 * Installs a mock `google.maps.places` global and stubs Formio's library loader so
 * GoogleAddressProvider can be exercised without the real Google Maps script.
 * Returns the created widget instances for assertions and a restore function.
 */
export const mockGoogleMapsLibrary = () => {
  const originalRequireLibrary = Formio.requireLibrary;
  const originalLibraryReady = Formio.libraryReady;
  Formio.requireLibrary = () => Promise.resolve();
  Formio.libraryReady = () => Promise.resolve();

  // Other tests may have loaded the real google provider; clear its leftovers so
  // GoogleAddressProvider#tryRemoveLibrary does not delete the mocked google.maps.
  delete Formio.libraries.googleMaps;
  document
    .querySelectorAll('script[src^="https://maps.googleapis.com"]')
    .forEach((script) => script.remove());

  const created = { autocompletes: [], elements: [] };

  function Autocomplete(input, options) {
    this.input = input;
    this.options = options;
    this.listeners = {};
    created.autocompletes.push(this);
  }
  Autocomplete.prototype.addListener = function (event, callback) {
    this.listeners[event] = callback;
    return {};
  };
  Autocomplete.prototype.getPlace = function () {
    return this.place;
  };

  function PlaceAutocompleteElement(options = {}) {
    const element = document.createElement('gmp-place-autocomplete');
    element.constructorOptions = options;
    element.value = typeof options.value === 'string' ? options.value : '';
    created.elements.push(element);
    return element;
  }

  global.google = {
    maps: {
      event: {
        clearInstanceListeners() {},
        removeListener() {},
      },
      places: { Autocomplete, PlaceAutocompleteElement },
    },
  };

  return {
    created,
    restore() {
      Formio.requireLibrary = originalRequireLibrary;
      Formio.libraryReady = originalLibraryReady;
      delete global.google;
    },
  };
};

/**
 * Mirrors the documented google.maps.places.Place contract: fetchFields rejects
 * unknown (e.g. legacy-named) fields, and properties are only readable after
 * being requested through fetchFields — accessing an unfetched field throws.
 */
export const createGooglePlace = (data) => {
  const fetched = new Set();
  const place = {
    fetchFields({ fields }) {
      const unknown = fields.filter((field) => !PLACE_FIELDS.includes(field));
      if (unknown.length) {
        return Promise.reject(
          new Error(`in property fields: Unknown fields requested: ${unknown.join(', ')}`),
        );
      }
      fields.forEach((field) => fetched.add(field));
      return Promise.resolve({ place });
    },
  };
  PLACE_FIELDS.forEach((field) => {
    Object.defineProperty(place, field, {
      get() {
        if (!fetched.has(field)) {
          throw new Error(`Place field "${field}" was not requested via fetchFields.`);
        }
        return data[field];
      },
    });
  });
  return place;
};

export const selectGmpPlace = (element, place, predictionText = '') => {
  const event = new Event('gmp-select');
  event.placePrediction = {
    toPlace: () => place,
    // The real API exposes text as a FormattableText object, not a string.
    text: { text: predictionText, toString: () => predictionText },
  };
  element.dispatchEvent(event);
};

export const newApiPlaceData = {
  addressComponents: [
    { longText: 'Mountain View', shortText: 'Mountain View', types: ['locality'] },
    { longText: 'California', shortText: 'CA', types: ['administrative_area_level_1'] },
    { longText: 'United States', shortText: 'US', types: ['country'] },
  ],
  formattedAddress: '1600 Amphitheatre Pkwy, Mountain View, CA 94043, USA',
  location: { lat: 37.4224764, lng: -122.0842499 },
  viewport: { south: 37.42, west: -122.09, north: 37.43, east: -122.08 },
  id: 'ChIJ2eUgeAK6j4ARbn5u_wAGqWA',
  plusCode: { globalCode: '849VCWC8+W5' },
  types: ['street_address'],
  displayName: 'Googleplex',
};
