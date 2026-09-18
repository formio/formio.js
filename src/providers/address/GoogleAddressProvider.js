/* globals google */
import { Formio } from '../../Formio';
import _ from 'lodash';
import { AddressProvider } from './AddressProvider';

const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com';
const GOOGLE_MAPS_JS_URL = `${GOOGLE_MAPS_BASE_URL}/maps/api/js`;
const GOOGLE_MAPS_JS_WITH_PARAMS_URL = `${GOOGLE_MAPS_JS_URL}?v=quarterly&libraries=places&loading=async&callback=googleMapsCallback`;
const NEW_PLACES_API_VERSION = 'newPlacesApi';

/**
 * @typedef {object} AutocompleteOptions
 * @property {string[]} fields - The fields to include in the autocomplete response.
 * @property {object} componentRestrictions - The component restrictions for the autocomplete response.
 * @property {string[]} componentRestrictions.country - The country codes to restrict the autocomplete response to.
 */

/**
 * @typedef {object} ProviderOptions
 * @property {string} region - The region to restrict the autocomplete response to.
 * @property {string} key - The API key for Google Maps.
 * @property {AutocompleteOptions} autocompleteOptions - The options for the autocomplete functionality.
 */

/**
 * @typedef {object} Place
 * @property {object} address_components - The address components of the place.
 * @property {string} formatted_address - The formatted address of the place.
 * @property {object} geometry - The geometry information of the place.
 * @property {string} place_id - The place ID of the place.
 * @property {object} plus_code - The plus code of the place.
 * @property {string[]} types - The types of the place.
 * @property {string} formattedPlace - The formatted place value.
 */

/**
 * @class GoogleAddressProvider
 * @augments AddressProvider
 */
export class GoogleAddressProvider extends AddressProvider {
  /**
   * @returns {string} The name of the provider.
   */

  static get name() {
    return 'google';
  }

  /**
   * @returns {string} The display name of the provider.
   */

  static get displayName() {
    return 'Google Maps';
  }

  /**

   * @param {ProviderOptions} options - The options for the provider.
   */

  constructor(options = {}) {
    super(options);
    this.setAutocompleteOptions();
    let src = GOOGLE_MAPS_JS_WITH_PARAMS_URL;
    if (options.params?.key) {
      src += `&key=${options.params.key}`;
    }
    this.tryRemoveLibrary(options);
    Formio.requireLibrary(this.getLibraryName(), 'google.maps.places', src);
  }

  /**
   * get display value property
   * @returns {string} The property to use for display value.
   */

  get displayValueProperty() {
    return 'formattedPlace';
  }

  /**
   * @returns {string} The alternative property to use for display value.
   */

  get alternativeDisplayValueProperty() {
    return 'formatted_address';
  }

  /**
   * @returns {string} The property to use for display value on places returned by the new Places API.
   */

  get newApiDisplayValueProperty() {
    return 'formattedAddress';
  }

  /**
   * @returns {boolean} Whether the provider is configured to use the new Places API.
   */

  get usesNewPlacesApi() {
    return this.options?.version === NEW_PLACES_API_VERSION;
  }

  /**
   * @param {AutocompleteOptions} options - The autocomplete options.
   */
  set autocompleteOptions(options) {
    this._autocompleteOptions = options;
  }

  /**
   * @returns {AutocompleteOptions} The autocomplete options.
   */
  get autocompleteOptions() {
    return this._autocompleteOptions;
  }

  /**
   * Sets the autocomplete options based on the provider options.

   */
  setAutocompleteOptions() {
    // Clone so the stored provider options are never mutated: the required fields
    // differ per Places API version, and stale fields from a previous computation
    // must not leak into the next one (FIO-10428).
    const storedOptions = _.get(this.options, 'autocompleteOptions', {});
    const options = _.isObject(storedOptions) ? _.cloneDeep(storedOptions) : {};

    this.addRequiredProviderOptions(options);

    this.autocompleteOptions = options;
  }

  /**

   * Converts the region to autocomplete option if it exists.
   * @param {ProviderOptions} options - The provider options.
   */

  beforeMergeOptions(options) {
    // providing support of old Google Provider option
    this.convertRegionToAutocompleteOption(options);
  }

  /**
   * @returns {string} The name of the library.
   */
  getLibraryName() {
    return 'googleMaps';
  }

  /**
   * Converts the region to autocomplete option.
   * @param {ProviderOptions} options - The provider options.
   */
  convertRegionToAutocompleteOption(options) {
    const providerOptions = options;
    let region = _.get(providerOptions, 'params.region', '');
    if (region && !_.has(options, 'params.autocompleteOptions')) {
      region = region.toUpperCase().trim();
      // providing compatibility with ISO 3166-1 Alpha-2 county codes (for checking compatibility https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
      const countryCodes = { UK: 'GB' };
      if (countryCodes[region]) {
        region = countryCodes[region];
      }
      _.set(providerOptions, 'params.autocompleteOptions.componentRestrictions.country', [region]);
    }
  }

  /**
   * @returns {string[]} The required address properties.
   */
  getRequiredAddressProperties() {
    return this.usesNewPlacesApi
      ? ['addressComponents', 'formattedAddress', 'location', 'viewport', 'id', 'plusCode', 'types']
      : ['address_components', 'formatted_address', 'geometry', 'place_id', 'plus_code', 'types'];
  }

  /**
   * Adds the required provider options to the options.
   * @param {AutocompleteOptions} options - The autocomplete options.
   */
  addRequiredProviderOptions(options) {
    const addressProperties = this.getRequiredAddressProperties();
    if (_.isArray(options.fields) && options.fields.length > 0) {
      options.fields.forEach((optionalField) => {
        if (!addressProperties.some((addressProp) => optionalField === addressProp)) {
          addressProperties.push(optionalField);
        }
      });
    }
    options.fields = addressProperties;
  }

  filterPlace(place) {
    place = place || {};
    const filteredPlace = {};

    if (this.autocompleteOptions) {
      this.autocompleteOptions.fields.forEach((field) => {
        if (place[field]) {
          filteredPlace[field] = place[field];
        }
      });
    }

    return filteredPlace;
  }

  attachAutocomplete(elem, index, onSelectAddress, disable = false) {
    if (disable) {
      return Promise.resolve();
    }
    return Formio.libraryReady(this.getLibraryName()).then(() => {
      this.setAutocompleteOptions();
      if (!this.usesNewPlacesApi) {
        const autocomplete = new google.maps.places.Autocomplete(elem, this.autocompleteOptions);
        const listener = autocomplete.addListener('place_changed', () => {
          const place = this.filterPlace(autocomplete.getPlace());
          place.formattedPlace = _.get(
            autocomplete,
            'gm_accessors_.place.se.formattedPrediction',
            place[this.alternativeDisplayValueProperty],
          );

          onSelectAddress(place, elem, index);
        });

        return () => {
          if (google?.maps?.event) {
            google.maps.event.clearInstanceListeners(autocomplete);
            google.maps.event.removeListener(listener);
          }
          document.querySelectorAll('.pac-container').forEach((node) => {
            if (node.parentNode) {
              node.parentNode.removeChild(node);
            }
          });
        };
      }

      const { fields, componentRestrictions, ...elementOptions } = this.autocompleteOptions;
      const country = componentRestrictions?.country;
      if (country) {
        // The new element spells legacy componentRestrictions.country as includedRegionCodes.
        elementOptions.includedRegionCodes = _.castArray(country);
      }
      elementOptions.noInputIcon = true;

      const autocomplete = new google.maps.places.PlaceAutocompleteElement(elementOptions);
      if (elem?.value) {
        autocomplete.value = elem.value;
      }
      autocomplete.classList.add('form-control');
      // Replace the existing element with the autocomplete element
      elem.parentNode.replaceChildren(autocomplete);

      const handlePlaceSelect = async (event) => {
        let selectedPlace;
        try {
          const place = event.placePrediction.toPlace();
          await place.fetchFields({
            fields: fields || this.getRequiredAddressProperties(),
          });

          const convertedPlace = {
            addressComponents: place.addressComponents || [],
            formattedAddress: place.formattedAddress || '',
            location: place.location || {},
            viewport: place.viewport || {},
            id: place.id || '',
            plusCode: place.plusCode || {},
            types: place.types || [],
          };
          selectedPlace = this.filterPlace(convertedPlace);
          selectedPlace.formattedPlace = convertedPlace.formattedAddress;
        } catch (err) {
          // fetchFields rejections are otherwise swallowed by the Maps event
          // dispatcher; never let a failed details request drop the selection.
          console.warn(`Unable to fetch the selected place's details: ${err}`);
          selectedPlace = { formattedPlace: String(event.placePrediction?.text ?? '') };
        }

        onSelectAddress(selectedPlace, elem, index);
      };
      autocomplete.addEventListener('gmp-select', handlePlaceSelect);

      return () => {
        autocomplete.removeEventListener('gmp-select', handlePlaceSelect);
      };
    });
  }

  search() {
    return Promise.resolve();
  }

  makeRequest() {
    return Promise.resolve();
  }

  getDisplayValue(address) {
    const displayedProperty = [
      this.displayValueProperty,
      this.alternativeDisplayValueProperty,
      this.newApiDisplayValueProperty,
    ].find((property) => _.has(address, property));

    return displayedProperty ? _.get(address, displayedProperty, '') : '';
  }

  /**
   * Tries to remove the library if api key for loaded script is different.
   * @param {ProviderOptions} options - The options for the provider.
   */
  tryRemoveLibrary(options = {}) {
    if (!Formio.libraries[this.getLibraryName()]) {
      return;
    }

    const existingScript = document.querySelector(`script[src^="${GOOGLE_MAPS_JS_URL}"]`);
    if (
      existingScript &&
      options.params?.key &&
      !existingScript.attributes.src.value.endsWith(options.params.key)
    ) {
      const googleMapsScripts =
        document.querySelectorAll(`script[src^="${GOOGLE_MAPS_BASE_URL}"]`) ?? [];
      googleMapsScripts.forEach((script) => script.parentNode.removeChild(script));
      delete Formio.libraries[this.getLibraryName()];
      delete globalThis?.google?.maps;
      delete globalThis[`${this.getLibraryName()}Callback`];
    }
  }
}
