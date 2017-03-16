import { TextFieldComponent } from '../textfield/TextField';
import Promise from "native-promise-only";
import _defaultsDeep from 'lodash/defaultsDeep';
import _delay from 'lodash/delay';
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


  /**
   * Start the autocomplete and the input listeners
   *
   * @param input
   *   The input field
   * @param autocompleteOptions
   *   The default option for the autocompletion
   */
  autocompleteInit(input, autocompleteOptions) {
    // Set attribute autocomplete to off
    input.setAttribute("autocomplete", "off");

    // Init suggestions list
    this.autocompleteSuggestions = []

    // Start Google AutocompleteService
    const autocomplete = new google.maps.places.AutocompleteService();

    // Create suggestions container
    const suggestionContainer = document.createElement('div');
    suggestionContainer.classList.add('pac-container', 'pac-logo');
    input.parentNode.appendChild(suggestionContainer);

    // Add listener on input field for input event
    this.addEventListener(input, 'input', (event) => {
      if (input.value) {
        let options = {
          input: input.value
        }
        autocomplete.getPlacePredictions(_defaultsDeep(options, autocompleteOptions),
          (suggestions, status) => {
            this.autocompleteDisplaySuggestions(suggestions, status, suggestionContainer, input);
        });
      } else {
        this.autocompleteCleanSuggestions(suggestionContainer);
        suggestionContainer.style.display = 'none';
      }
    });
    // Add listener on input field for blur event
    this.addEventListener(input, 'blur', (event) => {
      // Delay to allow click on suggestion list
      _delay(function() {
        suggestionContainer.style.display = 'none';
      }, 100);
    });
    // Add listener on input field for focus event
    this.addEventListener(input, 'focus', (event) => {
      if (suggestionContainer.childElementCount) {
        suggestionContainer.style.display = 'block';
      }
    });
    // Add listener on input field for focus event
    this.addEventListener(window, 'resize', (event) => {
      // Set the same width as input field
      suggestionContainer.style.width = input.offsetWidth + 'px';
    });
    // Add listiner on input field for key event
    this.autocompleteKeyboardListener(suggestionContainer, input);
  }

  /**
   * Add listiner on input field for key event
   *
   * @param suggestionContainer
   *   Suggestions container
   * @param input
   *   Input field to listen
   */
  autocompleteKeyboardListener(suggestionContainer, input) {
    this.autocompleteKeyCodeListener = (event) => {
      if (input.value) {
        switch (event.keyCode) {
          case 38:
          // UP
            this.autocompleteKeyUpInteraction(suggestionContainer, input);
            break;

          case 40:
            // DOWN
            this.autocompleteKeyDownInteraction(suggestionContainer, input);
            break;

          case 9:
            // TAB
            this.autocompleteKeyValidationInteraction(suggestionContainer, input);
            break;

          case 13:
            // ENTER
            this.autocompleteKeyValidationInteraction(suggestionContainer, input);
            break;
        }
      }
    };

    this.addEventListener(input, 'keydown', this.autocompleteKeyCodeListener)
  }

  /**
   * Action when key up is trigger
   *
   * @param suggestionContainer
   *   Suggestions container
   * @param input
   *   Input field to listen
   */
  autocompleteKeyUpInteraction(suggestionContainer, input) {
    let elementSelected = document.querySelector('.pac-item-selected');
    if (!elementSelected) {
      // Returns the bottom of the list.
      return this.autocompleteListDecorator(suggestionContainer.lastChild, input);
    } else {
      // Transverse the list in reverse order.
      const previousSibling = elementSelected.previousSibling;
      if (previousSibling) {
       this.autocompleteListDecorator(previousSibling, input);
      } else {
        // Return to input value
        elementSelected.classList.remove('pac-item-selected');
        input.value = this.autocompleteInputValue;
      }
    }
  }

  /**
   * Action when key down is trigger
   *
   * @param suggestionContainer
   *   Suggestions container
   * @param input
   *   Input field to listen
   */
  autocompleteKeyDownInteraction(suggestionContainer, input) {
    let elementSelected = document.querySelector('.pac-item-selected');
    if (!elementSelected) {
      // Start at the top of the list.
      return this.autocompleteListDecorator(suggestionContainer.firstChild, input);
    } else {
      // Transverse the list from top down.
      const nextSibling = elementSelected.nextSibling;
      if (nextSibling) {
        this.autocompleteListDecorator(nextSibling, input);
      } else {
        // Return to input value
        elementSelected.classList.remove('pac-item-selected');
        input.value = this.autocompleteInputValue;
      }
    }
  }

  /**
   * Action when validation is trigger
   *
   * @param suggestionContainer
   *   Suggestions container
   * @param input
   *   Input field to listen
   */
  autocompleteKeyValidationInteraction(suggestionContainer, input) {
    let elementSelected = document.querySelector('.pac-item-selected');
    if (elementSelected) {
      for (const suggestion of this.autocompleteSuggestions) {
        let content = elementSelected.textContent || elementSelected.innerText;
        if (content === suggestion.description) {
          this.autocompleteServiceListener(suggestion, suggestionContainer, input);
        }
      }
      elementSelected.classList.remove('pac-item-selected');
    }
  }

  /**
   * Highlight suggestion selected
   *
   * @param item
   *   Item selected in suggestions container
   * @param input
   *   Input field to listen
   */
  autocompleteListDecorator(item, input) {
    let elementSelected = document.querySelector('.pac-item-selected');
    if (elementSelected) {
      elementSelected.classList.remove('pac-item-selected');
    }
    input.value = item.textContent || suggestionContainer.innerText;
    item.classList.add('pac-item-selected');
  }

  /**
   * Filter method to return if the suggestion should be displayed
   *
   * @param data
   *   Data to check
   * @returns {Boolean}
   */
  autocompleteFilterSuggestion(data) {
    try {
      let script = '(function() { var show = true;';
      script += this.component.map.autocompleteFilter.toString();
      script += '; return show; })()';
      let result = eval(script);
      return result.toString() === 'true';
    }
    catch (e) {
      console.warn('An error occurred in a custom autocomplete filter statement for component ' + this.component.key, e);
      return true;
    }

    return true;
  }

  /**
   * Clean suggestions list
   *
   * @param suggestionContainer
   *   Container tag
   */
  autocompleteCleanSuggestions(suggestionContainer) {
    // Clean click listener
    for (const suggestion of this.autocompleteSuggestions) {
      suggestion.item.removeEventListener('click', suggestion.clickListener);
    }
    this.autocompleteSuggestions = [];

    // Delete current suggestion list
    while (suggestionContainer.firstChild) {
      suggestionContainer.removeChild(suggestionContainer.firstChild);
    }
  }

  /**
   * Display suggestions when API returns value
   *
   * @param suggestions
   *   Suggestions returned
   * @param status
   *   State returned
   * @param suggestionContainer
   *   Suggestions container
   * @param input
   *   Input field to listen
   */
  autocompleteDisplaySuggestions(suggestions, status, suggestionContainer, input) {

    // Set the same width as input field
    suggestionContainer.style.width = input.offsetWidth + 'px';

    // Set the default input value
    this.autocompleteInputValue = input.value;

    this.autocompleteCleanSuggestions(suggestionContainer);
    if (status != google.maps.places.PlacesServiceStatus.OK) {
      suggestionContainer.style.display = 'none';
      return;
    }

    for (const suggestion of suggestions) {
      if (this.autocompleteFilterSuggestion(suggestion)) {
        this.autocompleteSuggestions.push(suggestion);
        this.autocompleteSuggestionBuilder(suggestion, suggestionContainer, input);
      }
    }

    if (!suggestionContainer.childElementCount) {
      this.autocompleteCleanSuggestions(suggestionContainer);
      suggestionContainer.style.display = 'none';
    }
    else {
      suggestionContainer.style.display = 'block';
    }
  }

  /**
   * Draw a suggestion in the list
   *
   * @param suggestion
   *   Suggestion to draw
   * @param suggestionContainer
   *   Suggestions container
   * @param input
   *   Input field to listen
   */
  autocompleteSuggestionBuilder(suggestion, suggestionContainer, input) {

    const item = document.createElement('div');
    item.classList.add('pac-item');

    const itemLogo = document.createElement('span');
    itemLogo.classList.add('pac-icon', 'pac-icon-marker');
    item.appendChild(itemLogo);

    // Draw Main part
    const itemMain = document.createElement('span');
    itemMain.classList.add('pac-item-query');
    if (suggestion.structured_formatting.main_text_matched_substrings) {
      let matches = suggestion.structured_formatting.main_text_matched_substrings;
      for(let k in matches) {
        let part = matches[k];
        if (k == 0 && part.offset > 0) {
          itemMain.appendChild(document.createTextNode(suggestion.structured_formatting.main_text.substring(0, part.offset)));
        }

        const itemBold = document.createElement('span');
        itemBold.classList.add('pac-matched');
        itemBold.appendChild(document.createTextNode(suggestion.structured_formatting.main_text.substring(part.offset, (part.offset + part.length))));
        itemMain.appendChild(itemBold);

        if (k == (matches.length - 1)) {
          let content = suggestion.structured_formatting.main_text.substring((part.offset + part.length));
          if (content.length > 0) {
            itemMain.appendChild(document.createTextNode(content));
          }
        }
      }
    }
    else {
      itemMain.appendChild(document.createTextNode(suggestion.structured_formatting.main_text));
    }
    item.appendChild(itemMain);


    // Draw secondary part
    if (suggestion.structured_formatting.secondary_text) {
      const itemSecondary = document.createElement('span')
      if (suggestion.structured_formatting.secondary_text_matched_substrings) {
        let matches = suggestion.structured_formatting.secondary_text_matched_substrings;
        for(let k in matches) {
          let part = matches[k];
          console.log(part);
          console.log((part.offset + part.length));
          if (k == 0 && part.offset > 0) {
            itemSecondary.appendChild(document.createTextNode(suggestion.structured_formatting.secondary_text.substring(0, part.offset)));
          }

          const itemBold = document.createElement('span');
          itemBold.classList.add('pac-matched');
          itemBold.appendChild(document.createTextNode(suggestion.structured_formatting.secondary_text.substring(part.offset, (part.offset + part.length))));
          itemSecondary.appendChild(itemBold);

          if (k == (matches.length - 1)) {
            let content = suggestion.structured_formatting.secondary_text.substring((part.offset + part.length));
            if (content.length > 0) {
              itemSecondary.appendChild(document.createTextNode(content));
            }
          }
        }
      }
      else {
        itemSecondary.appendChild(document.createTextNode(suggestion.structured_formatting.secondary_text));
      }
      item.appendChild(itemSecondary);
    }

    suggestionContainer.appendChild(item);

    let clickListener = (event) => {
      input.value = suggestion.description;
      this.autocompleteInputValue = suggestion.description;
      this.autocompleteServiceListener(suggestion, suggestionContainer, input);
    };
    suggestion.clickListener = clickListener;
    suggestion.item = item;
    if ('addEventListener' in item){
      item.addEventListener('click', clickListener, false);
    } else if ('attachEvent' in item) {
      item.attachEvent('onclick', clickListener);
    }
  }


  /**
   * Get detailed information and set it as value
   *
   * @param suggestion
   *   Suggestion to draw
   * @param suggestionContainer
   *   Suggestions container
   * @param input
   *   Input field to listen
   */
  autocompleteServiceListener(suggestion, suggestionContainer, input) {
    const service = new google.maps.places.PlacesService(input);
    service.getDetails({
      placeId: suggestion.place_id,
    }, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.setValue(place);
      }
    });
  }


  addInput(input, container) {
    super.addInput(input, container);
    AddressComponent.apiReady.then(() => {
      let autocompleteOptions = {}
      if (this.component.map) {
        autocompleteOptions = this.component.map.autocompleteOptions || {}
        if (autocompleteOptions.location) {
          autocompleteOptions.location = new google.maps.LatLng(autocompleteOptions.location.lat, autocompleteOptions.location.lng);
        }
      }

      if (this.component.map && this.component.map.autocompleteFilter) {
          // Call custom autocomplete to filter suggestions
          this.autocompleteInit(input, autocompleteOptions);
      }
      else {
          let autocomplete = new google.maps.places.Autocomplete(input, autocompleteOptions);
          autocomplete.addListener("place_changed", () => this.setValue(autocomplete.getPlace()));
      }
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
