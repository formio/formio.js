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
const ChildConditional = 'show = _.get(instance, \'parent.manualMode\', false);';

export default class AddressComponent extends ContainerComponent {
  static schema(...extend) {
    return ContainerComponent.schema({
      type: 'address',
      label: 'Address',
      key: 'address',
      switchToManualModeLabel: 'Can\'t find address? Switch to manual mode.',
      provider: '',
      providerOptions: {},
      manualModeViewString: '',
      hideLabel: false,
      disableClearIcon: false,
      enableManualMode: false,
      components: [
        {
          label: 'Address 1',
          tableView: false,
          key: 'address1',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'Address 2',
          tableView: false,
          key: 'address2',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'City',
          tableView: false,
          key: 'city',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'State',
          tableView: false,
          key: 'state',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'Country',
          tableView: false,
          key: 'country',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
        },
        {
          label: 'Zip Code',
          tableView: false,
          key: 'zip',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional,
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
    if (this.builderMode || this.manualModeEnabled) {
      NestedComponent.prototype.addComponents.call(this, this.manualMode ? this.address : {});
    }
    Field.prototype.init.call(this);

    if (!this.builderMode) {
      if (this.component.provider) {
        const {
          provider,
          providerOptions,
        } = this.component;
        this.provider = this.initializeProvider(provider, providerOptions);
      }
      else if (this.component.map) {
        // Fallback to legacy version where Google Maps was the only provider.
        this.component.provider = GoogleAddressProvider.name;
        this.component.providerOptions = this.component.providerOptions || {};

        const {
          map,
          provider,
          providerOptions,
        } = this.component;

        const {
          key,
          region,
        } = map;

        if (key) {
          _.set(providerOptions, 'params.key', key);
        }
        if (region) {
          _.set(providerOptions, 'params.region', region);
        }

        this.provider = this.initializeProvider(provider, providerOptions);
      }
    }
  }

  initializeProvider(provider, options = {}) {
    const Provider = Formio.Providers.getProvider('address', provider);
    return new Provider(options);
  }

  get emptyValue() {
    return this.manualModeEnabled
      ? {
        mode: AddressComponentMode.Autocomplete,
        address: {},
      }
      : {};
  }

  get mode() {
    return this.manualModeEnabled
      ? this.dataValue
        ? this.dataValue.mode
        : this.dataValue
      : AddressComponentMode.Autocomplete;
  }

  set mode(value) {
    if (this.manualModeEnabled) {
      this.dataValue.mode = value;
    }
  }

  get autocompleteMode() {
    return this.mode === AddressComponentMode.Autocomplete;
  }

  get manualMode() {
    return this.mode === AddressComponentMode.Manual;
  }

  get manualModeEnabled() {
    return Boolean(this.component.enableManualMode);
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
    return (this.manualModeEnabled && this.dataValue) ? this.dataValue.address : this.dataValue;
  }

  set address(value) {
    if (this.manualModeEnabled) {
      this.dataValue.address = value;
    }
    else {
      this.dataValue = value;
    }
  }

  get defaultSchema() {
    return AddressComponent.schema();
  }

  isValueInLegacyFormat(value) {
    return value && !value.mode;
  }

  normalizeValue(value) {
    return (this.manualModeEnabled && this.isValueInLegacyFormat(value))
      ? {
        mode: AddressComponentMode.Autocomplete,
        address: value,
      }
      : value;
  }

  setValue(value, flags = {}) {
    const changed = Field.prototype.setValue.call(this, value, flags);

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
    return 'address';
  }

  render() {
    return super.render(this.renderTemplate(this.templateName, {
      children: (this.builderMode || this.manualModeEnabled) ? this.renderComponents() : '',
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
    }

    this.loadRefs(element, {
      [AddressComponent.modeSwitcherRef]: 'single',
      [AddressComponent.removeValueIconRef]: 'single',
      [AddressComponent.searchInputRef]: 'single',
    });

    if (!this.builderMode && this.searchInput && this.provider) {
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
          this.address = address;
          this.triggerChange({
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

        if (!this.builderMode) {
          if (this.manualMode) {
            this.restoreComponentsContext();
          }

          this.triggerChange({
            modified: true,
          });
        }

        this.redraw();
      });
    }

    if (!this.builderMode && this.removeValueIcon) {
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

    return result;
  }

  addChildComponent(component) {
    component.customConditional = ChildConditional;
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

  getValueAsString(value, options) {
    if (!value) {
      return '';
    }

    const normalizedValue = this.normalizeValue(value);

    const {
      address,
      mode,
    } = (
      this.manualModeEnabled
        ? normalizedValue
        : {
          address: normalizedValue,
          mode: AddressComponentMode.Autocomplete,
        }
    );
    const valueInManualMode = (mode === AddressComponentMode.Manual);

    if (this.provider && !valueInManualMode) {
      return this.getDisplayValue(address);
    }

    if (valueInManualMode) {
      if (this.component.manualModeViewString) {
        return this.interpolate(this.component.manualModeViewString, {
          address,
          data: this.data,
          component: this.component,
        });
      }

      return this.getComponents()
        .filter((component) => component.hasValue(address))
        .map((component) => [component, _.get(address, component.key)])
        .filter(([component, componentValue]) => !component.isEmpty(componentValue))
        .map(([component, componentValue]) => component.getValueAsString(componentValue, options))
        .join(', ');
    }

    return super.getValueAsString(address, options);
  }

  focus() {
    if (this.searchInput) {
      this.searchInput.focus();
    }
  }
}
