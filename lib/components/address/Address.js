'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddressComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _TextField = require('../textfield/TextField');

var _Base = require('../base/Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals google */


var AddressComponent = exports.AddressComponent = function (_TextFieldComponent) {
  _inherits(AddressComponent, _TextFieldComponent);

  function AddressComponent(component, options, data) {
    _classCallCheck(this, AddressComponent);

    var _this = _possibleConstructorReturn(this, (AddressComponent.__proto__ || Object.getPrototypeOf(AddressComponent)).call(this, component, options, data));

    var src = 'https://maps.googleapis.com/maps/api/js?v=3&libraries=places&callback=googleMapsCallback';
    if (component.map && component.map.key) {
      src += '&key=' + component.map.key;
    }
    if (component.map && component.map.region) {
      src += '&region=' + component.map.region;
    }
    _Base.BaseComponent.requireLibrary('googleMaps', 'google.maps.places', src);

    // Keep track of the full addresses.
    _this.addresses = [];
    return _this;
  }

  _createClass(AddressComponent, [{
    key: 'setValueAt',
    value: function setValueAt(index, value) {
      if (value === null || value === undefined) {
        value = this.defaultValue;
      }
      this.addresses[index] = value;
      if (value && value.formatted_address) {
        this.inputs[index].value = value.formatted_address;
      }
    }
  }, {
    key: 'getValueAt',
    value: function getValueAt(index) {
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

  }, {
    key: 'autoCompleteInit',
    value: function autoCompleteInit(input, autoCompleteOptions) {
      var _this2 = this;

      // Set attribute autoComplete to off
      input.setAttribute('autocomplete', 'off');

      // Init suggestions list
      this.autoCompleteSuggestions = [];

      // Start Google AutocompleteService
      var autoComplete = new google.maps.places.AutocompleteService();

      // Create suggestions container
      var suggestionContainer = document.createElement('div');
      suggestionContainer.classList.add('pac-container', 'pac-logo');
      input.parentNode.appendChild(suggestionContainer);

      // Add listener on input field for input event
      this.addEventListener(input, 'input', function () {
        if (input.value) {
          var options = {
            input: input.value
          };
          autoComplete.getPlacePredictions(_lodash2.default.defaultsDeep(options, autoCompleteOptions), function (suggestions, status) {
            _this2.autoCompleteDisplaySuggestions(suggestions, status, suggestionContainer, input);
          });
        } else {
          _this2.autoCompleteCleanSuggestions(suggestionContainer);
          suggestionContainer.style.display = 'none';
        }
      });
      // Add listener on input field for blur event
      this.addEventListener(input, 'blur', function () {
        // Delay to allow click on suggestion list
        _lodash2.default.delay(function () {
          suggestionContainer.style.display = 'none';
        }, 100);
      });
      // Add listener on input field for focus event
      this.addEventListener(input, 'focus', function () {
        if (suggestionContainer.childElementCount) {
          suggestionContainer.style.display = 'block';
        }
      });
      // Add listener on input field for focus event
      this.addEventListener(window, 'resize', function () {
        // Set the same width as input field
        suggestionContainer.style.width = input.offsetWidth + 'px';
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

  }, {
    key: 'autoCompleteKeyboardListener',
    value: function autoCompleteKeyboardListener(suggestionContainer, input) {
      var _this3 = this;

      this.autoCompleteKeyCodeListener = function (event) {
        if (input.value) {
          switch (event.keyCode) {
            case 38:
              // UP
              _this3.autoCompleteKeyUpInteraction(suggestionContainer, input);
              break;

            case 40:
              // DOWN
              _this3.autoCompleteKeyDownInteraction(suggestionContainer, input);
              break;

            case 9:
              // TAB
              _this3.autoCompleteKeyValidationInteraction(suggestionContainer, input);
              break;

            case 13:
              // ENTER
              _this3.autoCompleteKeyValidationInteraction(suggestionContainer, input);
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

  }, {
    key: 'autoCompleteKeyUpInteraction',
    value: function autoCompleteKeyUpInteraction(suggestionContainer, input) {
      var elementSelected = document.querySelector('.pac-item-selected');
      if (!elementSelected) {
        // Returns the bottom of the list.
        return this.autoCompleteListDecorator(suggestionContainer.lastChild, input);
      } else {
        // Transverse the list in reverse order.
        var previousSibling = elementSelected.previousSibling;
        if (previousSibling) {
          this.autoCompleteListDecorator(previousSibling, input);
        } else {
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

  }, {
    key: 'autoCompleteKeyDownInteraction',
    value: function autoCompleteKeyDownInteraction(suggestionContainer, input) {
      var elementSelected = document.querySelector('.pac-item-selected');
      if (!elementSelected) {
        // Start at the top of the list.
        if (suggestionContainer.firstChild) {
          return this.autoCompleteListDecorator(suggestionContainer.firstChild, input);
        }
      } else {
        // Transverse the list from top down.
        var nextSibling = elementSelected.nextSibling;
        if (nextSibling) {
          this.autoCompleteListDecorator(nextSibling, input);
        } else {
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

  }, {
    key: 'autoCompleteKeyValidationInteraction',
    value: function autoCompleteKeyValidationInteraction(suggestionContainer, input) {
      var elementSelected = document.querySelector('.pac-item-selected');
      if (elementSelected) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.autoCompleteSuggestions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var suggestion = _step.value;

            var content = elementSelected.textContent || elementSelected.innerText;
            if (content === suggestion.description) {
              this.autoCompleteServiceListener(suggestion, suggestionContainer, input);
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
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

  }, {
    key: 'autoCompleteListDecorator',
    value: function autoCompleteListDecorator(item, input) {
      var elementSelected = document.querySelector('.pac-item-selected');
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

  }, {
    key: 'autoCompleteFilterSuggestion',
    value: function autoCompleteFilterSuggestion(data) {
      try {
        var result = new Function('data', 'var show = true; ' + this.component.map.autoCompleteFilter.toString() + '; return show;')(data);
        return result.toString() === 'true';
      } catch (e) {
        console.warn('An error occurred in a custom autoComplete filter statement for component ' + this.component.key, e);
        return true;
      }
    }

    /**
     * Clean suggestions list
     *
     * @param suggestionContainer
     *   Container tag
     */

  }, {
    key: 'autoCompleteCleanSuggestions',
    value: function autoCompleteCleanSuggestions(suggestionContainer) {
      // Clean click listener
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this.autoCompleteSuggestions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var suggestion = _step2.value;

          suggestion.item.removeEventListener('click', suggestion.clickListener);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
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

  }, {
    key: 'autoCompleteDisplaySuggestions',
    value: function autoCompleteDisplaySuggestions(suggestions, status, suggestionContainer, input) {
      // Set the same width as input field
      suggestionContainer.style.width = input.offsetWidth + 'px';

      // Set the default input value
      this.autoCompleteInputValue = input.value;

      this.autoCompleteCleanSuggestions(suggestionContainer);
      if (status !== google.maps.places.PlacesServiceStatus.OK) {
        suggestionContainer.style.display = 'none';
        return;
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = suggestions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var suggestion = _step3.value;

          if (this.autoCompleteFilterSuggestion(suggestion)) {
            this.autoCompleteSuggestions.push(suggestion);
            this.autoCompleteSuggestionBuilder(suggestion, suggestionContainer, input);
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      if (!suggestionContainer.childElementCount) {
        this.autoCompleteCleanSuggestions(suggestionContainer);
        suggestionContainer.style.display = 'none';
      } else {
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

  }, {
    key: 'autoCompleteSuggestionBuilder',
    value: function autoCompleteSuggestionBuilder(suggestion, suggestionContainer, input) {
      var _this4 = this;

      var item = document.createElement('div');
      item.classList.add('pac-item');

      var itemLogo = document.createElement('span');
      itemLogo.classList.add('pac-icon', 'pac-icon-marker');
      item.appendChild(itemLogo);

      // Draw Main part
      var itemMain = document.createElement('span');
      itemMain.classList.add('pac-item-query');
      if (suggestion.structured_formatting.main_text_matched_substrings) {
        var matches = suggestion.structured_formatting.main_text_matched_substrings;
        for (var k in matches) {
          var part = matches[k];
          if (k === 0 && part.offset > 0) {
            itemMain.appendChild(document.createTextNode(suggestion.structured_formatting.main_text.substring(0, part.offset)));
          }

          var itemBold = document.createElement('span');
          itemBold.classList.add('pac-matched');
          itemBold.appendChild(document.createTextNode(suggestion.structured_formatting.main_text.substring(part.offset, part.offset + part.length)));
          itemMain.appendChild(itemBold);

          if (k === matches.length - 1) {
            var content = suggestion.structured_formatting.main_text.substring(part.offset + part.length);
            if (content.length > 0) {
              itemMain.appendChild(document.createTextNode(content));
            }
          }
        }
      } else {
        itemMain.appendChild(document.createTextNode(suggestion.structured_formatting.main_text));
      }
      item.appendChild(itemMain);

      // Draw secondary part
      if (suggestion.structured_formatting.secondary_text) {
        var itemSecondary = document.createElement('span');
        if (suggestion.structured_formatting.secondary_text_matched_substrings) {
          var _matches = suggestion.structured_formatting.secondary_text_matched_substrings;
          for (var _k in _matches) {
            var _part = _matches[_k];
            if (_k === 0 && _part.offset > 0) {
              itemSecondary.appendChild(document.createTextNode(suggestion.structured_formatting.secondary_text.substring(0, _part.offset)));
            }

            var _itemBold = document.createElement('span');
            _itemBold.classList.add('pac-matched');
            _itemBold.appendChild(document.createTextNode(suggestion.structured_formatting.secondary_text.substring(_part.offset, _part.offset + _part.length)));
            itemSecondary.appendChild(_itemBold);

            if (_k === _matches.length - 1) {
              var _content = suggestion.structured_formatting.secondary_text.substring(_part.offset + _part.length);
              if (_content.length > 0) {
                itemSecondary.appendChild(document.createTextNode(_content));
              }
            }
          }
        } else {
          itemSecondary.appendChild(document.createTextNode(suggestion.structured_formatting.secondary_text));
        }
        item.appendChild(itemSecondary);
      }

      suggestionContainer.appendChild(item);

      var clickListener = function clickListener() {
        input.value = suggestion.description;
        _this4.autoCompleteInputValue = suggestion.description;
        _this4.autoCompleteServiceListener(suggestion, suggestionContainer, input);
      };
      suggestion.clickListener = clickListener;
      suggestion.item = item;
      if ('addEventListener' in item) {
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

  }, {
    key: 'autoCompleteServiceListener',
    value: function autoCompleteServiceListener(suggestion, suggestionContainer, input) {
      var _this5 = this;

      var service = new google.maps.places.PlacesService(input);
      service.getDetails({
        placeId: suggestion.place_id
      }, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          _this5.setValue(place);
        }
      });
    }
  }, {
    key: 'addInput',
    value: function addInput(input, container) {
      var _this6 = this;

      _get(AddressComponent.prototype.__proto__ || Object.getPrototypeOf(AddressComponent.prototype), 'addInput', this).call(this, input, container);
      _Base.BaseComponent.libraryReady('googleMaps').then(function () {
        var autoCompleteOptions = {};
        if (_this6.component.map) {
          autoCompleteOptions = _this6.component.map.autoCompleteOptions || {};
          if (autoCompleteOptions.location) {
            var _autoCompleteOptions$ = autoCompleteOptions.location,
                lat = _autoCompleteOptions$.lat,
                lng = _autoCompleteOptions$.lng;

            autoCompleteOptions.location = new google.maps.LatLng(lat, lng);
          }
        }

        if (_this6.component.map && _this6.component.map.autoCompleteFilter) {
          // Call custom autoComplete to filter suggestions
          _this6.autoCompleteInit(input, autoCompleteOptions);
        } else {
          var autocomplete = new google.maps.places.Autocomplete(input);
          autocomplete.addListener('place_changed', function () {
            return _this6.setValue(autocomplete.getPlace());
          });
        }
      });
    }
  }, {
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(AddressComponent.prototype.__proto__ || Object.getPrototypeOf(AddressComponent.prototype), 'elementInfo', this).call(this);
      info.attr.class += ' address-search';
      return info;
    }
  }, {
    key: 'getView',
    value: function getView(value) {
      return _lodash2.default.get(value, 'formatted_address', '');
    }
  }]);

  return AddressComponent;
}(_TextField.TextFieldComponent);