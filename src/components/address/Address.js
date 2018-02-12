/* globals google */
import _ from 'lodash';

import {TextFieldComponent} from '../textfield/TextField';
import {BaseComponent} from '../base/Base';

export class AddressComponent extends TextFieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
    let src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=googleMapsCallback';
    if (component.map && component.map.key) {
      src += `&key=${component.map.key}`;
    }
    if (component.map && component.map.region) {
      src += `&region=${component.map.region}`;
    }
    BaseComponent.requireLibrary('googleMaps', 'google.maps.places', src);

    // Keep track of the full addresses.
    this.addresses = [];
  }

  setValueAt(index, value) {
    if (value === null || value === undefined) {
      value = this.defaultValue;
    }
    this.addresses[index] = value;
    if (value && value.formatted_address) {
      this.inputs[index].value = value.formatted_address;
    }
  }

  getValueAt(index) {
    return this.addresses[index];
  }

  /**
   * Start the autocomplete and the input listeners
   *
   * @param input
   *   The input field
   * @param autoCompleteOptions
   *   The default option for the autocompletion
   */
  autoCompleteInit(input, autoCompleteOptions) {
    // Set attribute autoComplete to off
    input.setAttribute('autocomplete', 'off');

    // Init suggestions list
    this.autoCompleteSuggestions = [];

    // Start Google AutocompleteService
    const autoComplete = new google.maps.places.AutocompleteService();

    // Create suggestions container
    const suggestionContainer = document.createElement('div');
    suggestionContainer.classList.add('pac-container', 'pac-logo');
    input.parentNode.appendChild(suggestionContainer);

    // Add listener on input field for input event
    this.addEventListener(input, 'input', () => {
      if (input.value) {
        const options = {
          input: input.value
        };
        autoComplete.getPlacePredictions(_.defaultsDeep(options, autoCompleteOptions),
          (suggestions, status) => {
            this.autoCompleteDisplaySuggestions(suggestions, status, suggestionContainer, input);
          });
      }
      else {
        this.autoCompleteCleanSuggestions(suggestionContainer);
        suggestionContainer.style.display = 'none';
      }
    });
    // Add listener on input field for blur event
    this.addEventListener(input, 'blur', () => {
      // Delay to allow click on suggestion list
      _.delay(() => {
        suggestionContainer.style.display = 'none';
      }, 100);
    });
    // Add listener on input field for focus event
    this.addEventListener(input, 'focus', () => {
      if (suggestionContainer.childElementCount) {
        suggestionContainer.style.display = 'block';
      }
    });
    // Add listener on input field for focus event
    this.addEventListener(window, 'resize', () => {
      // Set the same width as input field
      suggestionContainer.style.width = `${input.offsetWidth}px`;
    });
    // Add listiner on input field for key event
    this.autoCompleteKeyboardListener(suggestionContainer, input);
  }

  /**
   * Add listiner on input field for key event
   *
   * @param suggestionContainer
   *   Suggestions container
   * @param input
   *   Input field to listen
   */
  autoCompleteKeyboardListener(suggestionContainer, input) {
    this.autoCompleteKeyCodeListener = (event) => {
      if (input.value) {
        switch (event.keyCode) {
          case 38:
          // UP
            this.autoCompleteKeyUpInteraction(suggestionContainer, input);
            break;

          case 40:
            // DOWN
            this.autoCompleteKeyDownInteraction(suggestionContainer, input);
            break;

          case 9:
            // TAB
            this.autoCompleteKeyValidationInteraction(suggestionContainer, input);
            break;

          case 13:
            // ENTER
            this.autoCompleteKeyValidationInteraction(suggestionContainer, input);
            break;
        }
      }
    };

    this.addEventListener(input, 'keydown', this.autoCompleteKeyCodeListener);
  }

  /**
   * Action when key up is trigger
   *
   * @param suggestionContainer
   *   Suggestions container
   * @param input
   *   Input field to listen
   */
  autoCompleteKeyUpInteraction(suggestionContainer, input) {
    const elementSelected = document.querySelector('.pac-item-selected');
    if (!elementSelected) {
      // Returns the bottom of the list.
      return this.autoCompleteListDecorator(suggestionContainer.lastChild, input);
    }
    else {
      // Transverse the list in reverse order.
      const previousSibling = elementSelected.previousSibling;
      if (previousSibling) {
        this.autoCompleteListDecorator(previousSibling, input);
      }
      else {
        // Return to input value
        elementSelected.classList.remove('pac-item-selected');
        input.value = this.autoCompleteInputValue;
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
  autoCompleteKeyDownInteraction(suggestionContainer, input) {
    const elementSelected = document.querySelector('.pac-item-selected');
    if (!elementSelected) {
      // Start at the top of the list.
      if (suggestionContainer.firstChild) {
        return this.autoCompleteListDecorator(suggestionContainer.firstChild, input);
      }
    }
    else {
      // Transverse the list from top down.
      const nextSibling = elementSelected.nextSibling;
      if (nextSibling) {
        this.autoCompleteListDecorator(nextSibling, input);
      }
      else {
        // Return to input value
        elementSelected.classList.remove('pac-item-selected');
        input.value = this.autoCompleteInputValue;
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
  autoCompleteKeyValidationInteraction(suggestionContainer, input) {
    const elementSelected = document.querySelector('.pac-item-selected');
    if (elementSelected) {
      for (const suggestion of this.autoCompleteSuggestions) {
        const content = elementSelected.textContent || elementSelected.innerText;
        if (content === suggestion.description) {
          this.autoCompleteServiceListener(suggestion, suggestionContainer, input);
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
  autoCompleteListDecorator(item, input) {
    const elementSelected = document.querySelector('.pac-item-selected');
    if (elementSelected) {
      elementSelected.classList.remove('pac-item-selected');
    }
    input.value = item.textContent;
    item.classList.add('pac-item-selected');
  }

  /**
   * Filter method to return if the suggestion should be displayed
   *
   * @param data
   *   Data to check
   * @returns {Boolean}
   */
  autoCompleteFilterSuggestion(data) {
    try {
      const result = (new Function('data',
        `var show = true; ${this.component.map.autoCompleteFilter.toString()}; return show;`))(data);
      return result.toString() === 'true';
    }
    catch (e) {
      console.warn(
        `An error occurred in a custom autoComplete filter statement for component ${this.component.key}`, e);
      return true;
    }
  }

  /**
   * Clean suggestions list
   *
   * @param suggestionContainer
   *   Container tag
   */
  autoCompleteCleanSuggestions(suggestionContainer) {
    // Clean click listener
    for (const suggestion of this.autoCompleteSuggestions) {
      suggestion.item.removeEventListener('click', suggestion.clickListener);
    }
    this.autoCompleteSuggestions = [];

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
  autoCompleteDisplaySuggestions(suggestions, status, suggestionContainer, input) {
    // Set the same width as input field
    suggestionContainer.style.width = `${input.offsetWidth}px`;

    // Set the default input value
    this.autoCompleteInputValue = input.value;

    this.autoCompleteCleanSuggestions(suggestionContainer);
    if (status !== google.maps.places.PlacesServiceStatus.OK) {
      suggestionContainer.style.display = 'none';
      return;
    }

    for (const suggestion of suggestions) {
      if (this.autoCompleteFilterSuggestion(suggestion)) {
        this.autoCompleteSuggestions.push(suggestion);
        this.autoCompleteSuggestionBuilder(suggestion, suggestionContainer, input);
      }
    }

    if (!suggestionContainer.childElementCount) {
      this.autoCompleteCleanSuggestions(suggestionContainer);
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
  autoCompleteSuggestionBuilder(suggestion, suggestionContainer, input) {
    const item = document.createElement('div');
    item.classList.add('pac-item');

    const itemLogo = document.createElement('span');
    itemLogo.classList.add('pac-icon', 'pac-icon-marker');
    item.appendChild(itemLogo);

    // Draw Main part
    const itemMain = document.createElement('span');
    itemMain.classList.add('pac-item-query');
    if (suggestion.structured_formatting.main_text_matched_substrings) {
      const matches = suggestion.structured_formatting.main_text_matched_substrings;
      for (const k in matches) {
        const part = matches[k];
        if (k === 0 && part.offset > 0) {
          itemMain.appendChild(document.createTextNode(
            suggestion.structured_formatting.main_text.substring(0, part.offset)));
        }

        const itemBold = document.createElement('span');
        itemBold.classList.add('pac-matched');
        itemBold.appendChild(document.createTextNode(
          suggestion.structured_formatting.main_text.substring(part.offset, (part.offset + part.length))));
        itemMain.appendChild(itemBold);

        if (k === (matches.length - 1)) {
          const content = suggestion.structured_formatting.main_text.substring((part.offset + part.length));
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
      const itemSecondary = document.createElement('span');
      if (suggestion.structured_formatting.secondary_text_matched_substrings) {
        const matches = suggestion.structured_formatting.secondary_text_matched_substrings;
        for (const k in matches) {
          const part = matches[k];
          if (k === 0 && part.offset > 0) {
            itemSecondary.appendChild(document.createTextNode(
              suggestion.structured_formatting.secondary_text.substring(0, part.offset)));
          }

          const itemBold = document.createElement('span');
          itemBold.classList.add('pac-matched');
          itemBold.appendChild(document.createTextNode(
            suggestion.structured_formatting.secondary_text.substring(part.offset, (part.offset + part.length))));
          itemSecondary.appendChild(itemBold);

          if (k === (matches.length - 1)) {
            const content = suggestion.structured_formatting.secondary_text.substring((part.offset + part.length));
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

    const clickListener = () => {
      input.value = suggestion.description;
      this.autoCompleteInputValue = suggestion.description;
      this.autoCompleteServiceListener(suggestion, suggestionContainer, input);
    };
    suggestion.clickListener = clickListener;
    suggestion.item = item;
    if ('addEventListener' in item) {
      item.addEventListener('click', clickListener, false);
    }
    else if ('attachEvent' in item) {
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
  autoCompleteServiceListener(suggestion, suggestionContainer, input) {
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
    BaseComponent.libraryReady('googleMaps').then(() => {
      let autoCompleteOptions = {};
      if (this.component.map) {
        autoCompleteOptions = this.component.map.autoCompleteOptions || {};
        if (autoCompleteOptions.location) {
          const {
            lat,
            lng
          } = autoCompleteOptions.location;
          autoCompleteOptions.location = new google.maps.LatLng(lat, lng);
        }
      }

      if (this.component.map && this.component.map.autoCompleteFilter) {
        // Call custom autoComplete to filter suggestions
        this.autoCompleteInit(input, autoCompleteOptions);
      }
      else {
        const autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener('place_changed', () => this.setValue(autocomplete.getPlace()));
      }
    });
  }

  elementInfo() {
    const info = super.elementInfo();
    info.attr.class += ' address-search';
    return info;
  }

  getView(value) {
    return _.get(value, 'formatted_address', '');
  }
}
