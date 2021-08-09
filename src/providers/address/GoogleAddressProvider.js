/* globals google */
import { GlobalFormio as Formio } from '../../Formio';
import _ from 'lodash';
import { AddressProvider } from './AddressProvider';
import NativePromise from 'native-promise-only';

export class GoogleAddressProvider extends AddressProvider {
  static get name() {
    return 'google';
  }

  static get displayName() {
    return 'Google Maps';
  }

  constructor(options = {}) {
    super(options);
    this.setAutocompleteOptions();

    let src = 'https://maps.googleapis.com/maps/api/js?v=quarterly&libraries=places&callback=googleMapsCallback';

    if (options.params?.key) {
      src += `&key=${options.params.key}`;
    }

    Formio.requireLibrary(this.getLibraryName(), 'google.maps.places', src);
  }

  get displayValueProperty() {
    return 'formattedPlace';
  }

  get alternativeDisplayValueProperty() {
    return 'formatted_address';
  }

  set autocompleteOptions(options) {
    this._autocompleteOptions = options;
  }

  get autocompleteOptions() {
    return this._autocompleteOptions;
  }

  setAutocompleteOptions() {
    let options = _.get(this.options, 'params.autocompleteOptions', {});

    if (!_.isObject(options)) {
      options = {};
    }

    this.addRequiredProviderOptions(options);
    this.autocompleteOptions = options;
  }

  beforeMergeOptions(options) {
    // providing support of old Google Provider option
    this.convertRegionToAutocompleteOption(options);
  }

  getLibraryName() {
    return 'googleMaps';
  }

  convertRegionToAutocompleteOption(options) {
    const providerOptions = options;
    let region = _.get(providerOptions, 'params.region', '');

    if (region && !_.has(options, 'params.autocompleteOptions')) {
      region = region.toUpperCase().trim();
      // providing compatibility with ISO 3166-1 Alpha-2 county codes (for checking compatibility https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
      const countryCodes = { 'UK': 'GB' };

      if (countryCodes[region]) {
        region = countryCodes[region];
      }

      _.set(providerOptions, 'params.autocompleteOptions.componentRestrictions.country', [region]);
    }
  }

  getRequiredAddressProperties() {
    return ['address_components', 'formatted_address','geometry','place_id', 'plus_code', 'types'];
  }

  addRequiredProviderOptions(options) {
    const addressProperties = this.getRequiredAddressProperties();

    if (_.isArray(options.fields) && options.fields.length > 0 ) {
      options.fields.forEach(optionalField => {
        if (!addressProperties.some(addressProp => optionalField === addressProp)) {
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
      this.autocompleteOptions.fields.forEach(field => {
        if (place[field]) {
          filteredPlace[field] = place[field];
        }
      });
    }

    return filteredPlace;
  }

  attachAutocomplete(elem, index, onSelectAddress) {
    Formio.libraryReady(this.getLibraryName()).then(() => {
      const autocomplete = new google.maps.places.Autocomplete(elem, this.autocompleteOptions);

      autocomplete.addListener('place_changed', ()=>{
        const place = this.filterPlace(autocomplete.getPlace());
        place.formattedPlace = _.get(autocomplete, 'gm_accessors_.place.se.formattedPrediction', place[this.alternativeDisplayValueProperty]);

        onSelectAddress(place, elem, index);
      });
    });
  }

  search() {
    return NativePromise.resolve();
  }

  makeRequest() {
    return NativePromise.resolve();
  }

  getDisplayValue(address) {
    const displayedProperty = _.has(address, this.displayValueProperty)
      ? this.displayValueProperty
      : this.alternativeDisplayValueProperty;

    return _.get(address, displayedProperty, '');
  }
}
