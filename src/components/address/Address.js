import autocompleter from 'autocompleter';
import _ from 'lodash';

import Formio from '../../Formio';
import { GoogleAddressProvider } from '../../providers/address/GoogleAddressProvider';

import Field from '../_classes/field/Field';
import NestedComponent from '../_classes/nested/NestedComponent';
import ContainerComponent from '../container/Container';

export const AddressComponentMode = {
  Autocomplete: 'autocomplete',
  Manual: 'manual',
};

const RemoveValueIconHiddenClass = 'address-autocomplete-remove-value-icon--hidden';

export default class AddressComponent extends ContainerComponent {
  static schema(...extend) {
    return ContainerComponent.schema({
      type: 'address',
      label: 'Address',
      key: 'address',
      switchToManualModeLabel: "Can't find address? Switch to manual mode.",
      provider: '',
      providerOptions: {},
      manualModeViewString: '',
      hideLabel: false,
      disableClearIcon: false,
      components: [
        {
          label: 'Street',
          tableView: true,
          key: 'street',
          type: 'textfield',
          input: true,
        },
        {
          label: 'City',
          tableView: true,
          key: 'city',
          type: 'textfield',
          input: true,
        },
        {
          label: 'County',
          tableView: true,
          key: 'county',
          type: 'textfield',
          input: true,
        },
        {
          label: 'State',
          tableView: true,
          key: 'state',
          type: 'textfield',
          input: true,
        },
        {
          label: 'Zip Code',
          tableView: true,
          key: 'zip',
          type: 'textfield',
          input: true,
        },
        {
          label: 'Country',
          tableView: true,
          key: 'country',
          type: 'textfield',
          input: true,
        },
      ],
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Address',
      group: 'advanced',
      icon: 'home',
      documentation: 'http://help.form.io/userguide/#address',
      weight: 35,
      schema: AddressComponent.schema(),
    };
  }

  mergeSchema(component = {}) {
    let { defaultSchema } = this;

    if (component.components) {
      defaultSchema = _.omit(defaultSchema, 'components');
    }

    return _.defaultsDeep(component , defaultSchema);
  }

  init() {
    this.components = this.components || [];
    NestedComponent.prototype.addComponents.call(this, this.manualMode ? this.address : {});
    Field.prototype.init.call(this);

    if (!this.builderMode && this.component.provider) {
      const {
        provider,
        providerOptions,
      } = this.component;
      this.provider = this.initializeProvider(provider, providerOptions);
    }
  }

  initializeProvider(provider, options = {}) {
    const Provider = Formio.Providers.getProvider('address', provider);
    return new Provider(options);
  }

  get emptyValue() {
    return {
      mode: AddressComponentMode.Autocomplete,
      address: {},
    };
  }

  get mode() {
    return this.dataValue ? this.dataValue.mode : this.dataValue;
  }

  set mode(value) {
    this.dataValue.mode = value;
  }

  get autocompleteMode() {
    return this.mode === AddressComponentMode.Autocomplete;
  }

  get manualMode() {
    return this.mode === AddressComponentMode.Manual;
  }

  restoreComponentsContext() {
    this.getComponents().forEach((component) => {
      component.data = this.address;
      component.setValue(component.dataValue, {
        noUpdateEvent: true,
      });
    });
  }

  get address() {
    return this.dataValue ? this.dataValue.address : this.dataValue;
  }

  set address(value) {
    this.dataValue.address = value;
  }

  get defaultSchema() {
    return AddressComponent.schema();
  }

  isValueInLegacyFormat(value) {
    return !this.provider && value && !value.mode;
  }

  normalizeValue(value) {
    return this.isValueInLegacyFormat(value)
      ? {
        mode: AddressComponentMode.Autocomplete,
        address: value,
      }
      : value;
  }

  setValue(value, flags) {
    const changed = Field.prototype.setValue.call(this, value, flags);

    if (this.isValueInLegacyFormat(value)) {
      // Fallback to legacy version where Google Maps was the only provider.
      const {
        map,
        providerOptions = {},
      } = this.component;

      if (map) {
        const {
          key,
          region,
        } = map;

        if (key) {
          providerOptions.apiKey = key;
        }
        if (region) {
          providerOptions.region = region;
        }
      }

      this.provider = this.initializeProvider(GoogleAddressProvider.name, providerOptions);
    }

    if (this.manualMode) {
      this.restoreComponentsContext();
    }

    if (changed) {
      this.redraw();
    }

    return changed;
  }

  static get modeSwitcherRef() {
    return 'modeSwitcher';
  }

  static get removeValueIconRef() {
    return 'removeValueIcon';
  }

  static get searchInputRef() {
    return 'searchInput';
  }

  get modeSwitcher() {
    return this.refs
      ? (this.refs[AddressComponent.modeSwitcherRef] || null)
      : null;
  }

  get removeValueIcon() {
    return this.refs
      ? (this.refs[AddressComponent.removeValueIconRef] || null)
      : null;
  }

  get searchInput() {
    return this.refs
      ? (this.refs[AddressComponent.searchInputRef] || null)
      : null;
  }

  get searchInputAttributes() {
    const attr = {
      name: this.options.name,
      type: 'text',
      class: 'form-control',
      lang: this.options.language,
      tabindex: this.component.tabindex || 0,
    };

    if (this.component.placeholder) {
      attr.placeholder = this.t(this.component.placeholder);
    }

    if (this.disabled) {
      attr.disabled = 'disabled';
    }

    _.defaults(attr, this.component.attributes);

    return attr;
  }

  get templateName() {
    return this.builderMode ? super.templateName : 'address';
  }

  render() {
    return super.render(this.renderTemplate(this.templateName, {
      children: this.renderComponents(),
      nestedKey: this.nestedKey,
      inputAttributes: this.searchInputAttributes,
      ref: {
        modeSwitcher: AddressComponent.modeSwitcherRef,
        removeValueIcon: AddressComponent.removeValueIconRef,
        searchInput: AddressComponent.searchInputRef,
      },
      displayValue: this.getDisplayValue(),
      mode: {
        autocomplete: this.autocompleteMode,
        manual: this.manualMode,
      },
    }));
  }

  attach(element) {
    const result = ((this.builderMode || this.manualMode) ? super.attach : Field.prototype.attach).call(this, element);

    if (!this.builderMode) {
      if (!this.provider && this.component.provider) {
        const {
          provider,
          providerOptions,
        } = this.component;
        this.provider = this.initializeProvider(provider, providerOptions);
      }

      this.loadRefs(element, {
        [AddressComponent.modeSwitcherRef]: 'single',
        [AddressComponent.removeValueIconRef]: 'single',
        [AddressComponent.searchInputRef]: 'single',
      });

      if (this.searchInput && this.provider) {
        autocompleter({
          input: this.searchInput,
          debounceWaitMs: 300,
          fetch: (text, update) => {
            const query = text;
            this.provider.search(query).then(update);
          },
          render: (address) => {
            const div = this.ce('div');
            div.textContent = this.getDisplayValue(address);
            return div;
          },
          onSelect: (address) => {
            this.updateValue({
              ...this.dataValue,
              address,
            }, {
              modified: true,
            });

            if (this.searchInput) {
              this.searchInput.value = this.getDisplayValue();
            }
            this.updateRemoveIcon();
          },
        });

        this.addEventListener(this.searchInput, 'blur', () => {
          if (!this.searchInput) {
            return;
          }

          if (this.searchInput.value) {
            this.searchInput.value = this.getDisplayValue();
          }
        });

        this.addEventListener(this.searchInput, 'keyup', () => {
          if (!this.searchInput) {
            return;
          }

          if (!this.searchInput.value) {
            this.clearAddress();
          }
        });
      }

      if (this.modeSwitcher) {
        this.addEventListener(this.modeSwitcher, 'change', () => {
          if (!this.modeSwitcher) {
            return;
          }

          this.dataValue = this.emptyValue;
          this.mode = this.modeSwitcher.checked
            ? AddressComponentMode.Manual
            : AddressComponentMode.Autocomplete;

          if (this.manualMode) {
            this.restoreComponentsContext();
          }

          this.triggerChange({
            modified: true,
          });
          this.redraw();
        });
      }

      if (this.removeValueIcon) {
        this.updateRemoveIcon();

        const removeValueHandler = () => {
          this.clearAddress();
          this.focus();
        };

        this.addEventListener(this.removeValueIcon, 'click', removeValueHandler);
        this.addEventListener(this.removeValueIcon, 'keydown', ({ key }) => {
          if (key === 'Enter') {
            removeValueHandler();
          }
        });
      }
    }

    return result;
  }

  redraw() {
    const modeSwitcherInFocus = (this.modeSwitcher && (document.activeElement === this.modeSwitcher));

    return super.redraw()
      .then((result) => {
        if (modeSwitcherInFocus && this.modeSwitcher) {
          this.modeSwitcher.focus();
        }

        return result;
      });
  }

  clearAddress() {
    if (!this.isEmpty()) {
      this.triggerChange();
    }

    this.dataValue = this.emptyValue;
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    this.updateRemoveIcon();
  }

  getDisplayValue(value = this.address) {
    return (this.provider && !this.manualMode)
      ? this.provider.getDisplayValue(value)
      : '';
  }

  validateMultiple() {
    // Address component can't be multivalue.
    return false;
  }

  updateRemoveIcon() {
    if (this.removeValueIcon) {
      if (this.isEmpty() || this.disabled) {
        this.addClass(this.removeValueIcon, RemoveValueIconHiddenClass);
      }
      else {
        this.removeClass(this.removeValueIcon, RemoveValueIconHiddenClass);
      }
    }
  }

  getValueAsString(value) {
    if (!value) {
      return '';
    }

    const { address } = value;

    if (this.provider && !this.manualMode) {
      return this.getDisplayValue(address);
    }

    if (this.manualMode) {
      if (this.component.manualModeViewString) {
        return this.interpolate(this.component.manualModeViewString, {
          address,
          data: this.data,
          component: this.component,
        });
      }

      return this.getComponents()
        .filter((component) => !component.isEmpty())
        .map((component) => component.getValueAsString(component.dataValue))
        .join(', ');
    }

    return super.getValueAsString(address);
  }

  focus() {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }
}
