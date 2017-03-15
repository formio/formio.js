import { TextFieldComponent } from '../textfield/TextField';
import Promise from "native-promise-only";
export class AddressComponent extends TextFieldComponent {
  constructor(component, options, data) {
    super(component, options, data);

    // If google maps api is not ready, then load it.
    if (!AddressComponent.apiAdded && !(
      window.google &&
      window.google.maps &&
      window.google.maps.places &&
      window.google.maps.places.Autocomplete
    )) {
      // Add the API.
      AddressComponent.apiAdded = true;

      // Get the source for Google Maps API
      let src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=formioGoogleMapsCallback';
      if (component.map && component.map.key) {
        src += '&key=' + component.map.key;
      }
      if (component.map && component.map.region) {
        src += '&region=' + component.map.region;
      }
      let script = document.createElement('script');
      script.setAttribute('src', src);
      script.setAttribute('type', 'text/javascript');
      script.setAttribute('defer', true);
      script.setAttribute('async', true);
      document.getElementsByTagName('head')[0].appendChild(script);
    }
  }

  setValueAt(index, value) {
    this.value = value;
  }

  getValueAt(index) {
    return this.value;
  }

  addInput(input, container) {
    super.addInput(input, container);
    AddressComponent.apiReady.then(() => {
      let autocompleteOptions = {}
      if (this.component.map) {
        autocompleteOptions = this.component.map.autocompleteOptions || {}
      }
      let autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);
      autocomplete.addListener("place_changed", () => this.setValue(autocomplete.getPlace()));
    });
  }

  elementInfo() {
    let info = super.elementInfo();
    info.attr.class += ' address-search';
    return info;
  }
}

AddressComponent.apiReady = new Promise((resolve, reject) => {
  AddressComponent.apiResolve = resolve;
  AddressComponent.apiReject = reject;
});

window.formioGoogleMapsCallback = function() {
  AddressComponent.apiResolve();
};
