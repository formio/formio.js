var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import autocompleter from 'autocompleter';
import _ from 'lodash';
import { Formio } from '../../Formio';
import { GoogleAddressProvider } from '../../providers/address/GoogleAddressProvider';
import Field from '../_classes/field/Field';
import NestedComponent from '../_classes/nested/NestedComponent';
import ContainerComponent from '../container/Container';
export var AddressComponentMode = {
    Autocomplete: 'autocomplete',
    Manual: 'manual',
};
var RemoveValueIconHiddenClass = 'address-autocomplete-remove-value-icon--hidden';
var ChildConditional = 'show = _.get(instance, \'parent.manualMode\', false);';
var AddressComponent = /** @class */ (function (_super) {
    __extends(AddressComponent, _super);
    function AddressComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddressComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return ContainerComponent.schema.apply(ContainerComponent, __spreadArrays([{
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
            }], extend));
    };
    Object.defineProperty(AddressComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Address',
                group: 'advanced',
                icon: 'home',
                documentation: 'http://help.form.io/userguide/#address',
                weight: 35,
                schema: AddressComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    AddressComponent.prototype.mergeSchema = function (component) {
        if (component === void 0) { component = {}; }
        var defaultSchema = this.defaultSchema;
        if (component.components) {
            defaultSchema = _.omit(defaultSchema, 'components');
        }
        return _.defaultsDeep(component, defaultSchema);
    };
    AddressComponent.prototype.init = function () {
        this.components = this.components || [];
        if (this.builderMode || this.manualModeEnabled) {
            NestedComponent.prototype.addComponents.call(this, this.manualMode ? this.address : {});
        }
        Field.prototype.init.call(this);
        if (!this.builderMode) {
            if (this.component.map) {
                // Fallback to legacy version where Google Maps was the only provider.
                this.component.provider = GoogleAddressProvider.name;
                this.component.providerOptions = this.component.providerOptions || {};
                var _a = this.component, map = _a.map, providerOptions = _a.providerOptions;
                var key = map.key, region = map.region;
                if (key && !_.get(providerOptions, 'params.key')) {
                    _.set(providerOptions, 'params.key', key);
                }
                if (region && !_.get(providerOptions, 'params.region')) {
                    _.set(providerOptions, 'params.region', region);
                }
            }
            if (this.component.provider) {
                var _b = this.component, provider = _b.provider, providerOptions = _b.providerOptions;
                this.provider = this.initializeProvider(provider, providerOptions);
            }
        }
    };
    AddressComponent.prototype.initializeProvider = function (provider, options) {
        if (options === void 0) { options = {}; }
        var Provider = Formio.Providers.getProvider('address', provider);
        return new Provider(options);
    };
    Object.defineProperty(AddressComponent.prototype, "emptyValue", {
        get: function () {
            return this.manualModeEnabled
                ? {
                    mode: AddressComponentMode.Autocomplete,
                    address: {},
                }
                : {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "mode", {
        get: function () {
            var _a, _b;
            if (!this.manualModeEnabled) {
                return AddressComponentMode.Autocomplete;
            }
            return (_b = (_a = this.dataValue) === null || _a === void 0 ? void 0 : _a.mode) !== null && _b !== void 0 ? _b : AddressComponentMode.Autocomplete;
        },
        set: function (value) {
            if (this.manualModeEnabled) {
                this.dataValue.mode = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "autocompleteMode", {
        get: function () {
            return this.mode === AddressComponentMode.Autocomplete;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "manualMode", {
        get: function () {
            return this.mode === AddressComponentMode.Manual;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "manualModeEnabled", {
        get: function () {
            return !this.isMultiple && Boolean(this.component.enableManualMode);
        },
        enumerable: false,
        configurable: true
    });
    AddressComponent.prototype.restoreComponentsContext = function () {
        var _this = this;
        this.getComponents().forEach(function (component) {
            component.data = _this.address;
            component.setValue(component.dataValue, {
                noUpdateEvent: true,
            });
        });
    };
    Object.defineProperty(AddressComponent.prototype, "isMultiple", {
        get: function () {
            return Boolean(this.component.multiple);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "address", {
        get: function () {
            if (this.isMultiple) {
                return _.isArray(this.dataValue) ? this.dataValue : [this.dataValue];
            }
            // Manual mode is not implementing for multiple value
            return (this.manualModeEnabled && this.dataValue) ? this.dataValue.address : this.dataValue;
        },
        set: function (value) {
            if (this.manualModeEnabled && !this.isMultiple) {
                this.dataValue.address = value;
            }
            else {
                this.dataValue = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "defaultValue", {
        get: function () {
            return this.isMultiple ? [this.emptyValue] : this.emptyValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "defaultSchema", {
        get: function () {
            return AddressComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    AddressComponent.prototype.isValueInLegacyFormat = function (value) {
        return value && !value.mode;
    };
    AddressComponent.prototype.normalizeValue = function (value) {
        return (this.manualModeEnabled && this.isValueInLegacyFormat(value))
            ? {
                mode: AddressComponentMode.Autocomplete,
                address: value,
            }
            : value;
    };
    AddressComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = Field.prototype.setValue.call(this, value, flags);
        if (this.manualMode) {
            this.restoreComponentsContext();
        }
        if (changed) {
            this.redraw();
        }
        return changed;
    };
    Object.defineProperty(AddressComponent, "modeSwitcherRef", {
        get: function () {
            return 'modeSwitcher';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent, "removeValueIconRef", {
        get: function () {
            return 'removeValueIcon';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent, "searchInputRef", {
        get: function () {
            return 'searchInput';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent, "addRowButtonRef", {
        get: function () {
            return 'addButton';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent, "removeRowButtonRef", {
        get: function () {
            return 'removeRow';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "modeSwitcher", {
        get: function () {
            return this.refs
                ? (this.refs[AddressComponent.modeSwitcherRef] || null)
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "removeValueIcon", {
        get: function () {
            return this.refs
                ? (this.refs[AddressComponent.removeValueIconRef] || null)
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "searchInput", {
        get: function () {
            return this.refs
                ? (this.refs[AddressComponent.searchInputRef] || null)
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "addRowButton", {
        get: function () {
            return this.refs
                ? (this.refs[AddressComponent.addRowButtonRef] || null)
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "removeRowButton", {
        get: function () {
            return this.refs
                ? (this.refs[AddressComponent.removeRowButtonRef] || null)
                : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "searchInputAttributes", {
        get: function () {
            var attr = {
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
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "templateName", {
        get: function () {
            return 'address';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "gridTemplateName", {
        get: function () {
            return 'multiValueTable';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "rowTemplateName", {
        get: function () {
            return 'multiValueRow';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "hasChildren", {
        get: function () {
            return !this.isMultiple && (this.builderMode || this.manualModeEnabled);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddressComponent.prototype, "addAnother", {
        get: function () {
            return this.t(this.component.addAnother || 'Add Another');
        },
        enumerable: false,
        configurable: true
    });
    AddressComponent.prototype.renderElement = function (value) {
        return this.renderTemplate(this.templateName, {
            children: this.hasChildren ? this.renderComponents() : '',
            nestedKey: this.nestedKey,
            inputAttributes: this.searchInputAttributes,
            ref: {
                modeSwitcher: AddressComponent.modeSwitcherRef,
                removeValueIcon: AddressComponent.removeValueIconRef,
                searchInput: AddressComponent.searchInputRef,
            },
            displayValue: this.getDisplayValue(value),
            mode: {
                autocomplete: this.autocompleteMode,
                manual: this.manualMode,
            },
        });
    };
    AddressComponent.prototype.renderRow = function (value, index) {
        return this.renderTemplate(this.rowTemplateName, {
            index: index,
            disabled: this.disabled,
            element: "" + this.renderElement(value, index),
        });
    };
    AddressComponent.prototype.renderGrid = function () {
        return this.renderTemplate(this.gridTemplateName, {
            rows: this.address.map(this.renderRow.bind(this)).join(''),
            disabled: this.disabled,
            addAnother: this.addAnother,
        });
    };
    AddressComponent.prototype.render = function () {
        if (this.isMultiple) {
            return _super.prototype.render.call(this, this.renderGrid());
        }
        return _super.prototype.render.call(this, this.renderElement());
    };
    AddressComponent.prototype.addRow = function () {
        this.address = this.address.concat(this.emptyValue);
        _super.prototype.redraw.call(this);
    };
    AddressComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        var result = ((this.builderMode || this.manualMode) ? _super.prototype.attach : Field.prototype.attach).call(this, element);
        if (!this.builderMode) {
            if (!this.provider && this.component.provider) {
                var _b = this.component, provider = _b.provider, providerOptions = _b.providerOptions;
                this.provider = this.initializeProvider(provider, providerOptions);
            }
        }
        this.loadRefs(element, (_a = {},
            _a[AddressComponent.addRowButtonRef] = 'single',
            _a[AddressComponent.modeSwitcherRef] = 'single',
            _a[AddressComponent.removeRowButtonRef] = 'multiple',
            _a[AddressComponent.removeValueIconRef] = 'multiple',
            _a[AddressComponent.searchInputRef] = 'multiple',
            _a));
        this.searchInput.forEach(function (element, index) {
            if (!_this.builderMode && element && _this.provider) {
                autocompleter({
                    input: element,
                    debounceWaitMs: 300,
                    fetch: function (text, update) {
                        var query = text;
                        _this.provider.search(query).then(update);
                    },
                    render: function (address) {
                        var div = _this.ce('div');
                        div.textContent = _this.getDisplayValue(address);
                        return div;
                    },
                    onSelect: function (address) {
                        if (_this.isMultiple) {
                            _this.address[index] = address;
                            _this.address = __spreadArrays(_this.address);
                        }
                        else {
                            _this.address = address;
                        }
                        _this.triggerChange({
                            modified: true,
                        });
                        if (element) {
                            element.value = _this.getDisplayValue(_this.isMultiple ? _this.address[index] : _this.address);
                        }
                        _this.updateRemoveIcon(index);
                    },
                });
                _this.addEventListener(element, 'blur', function () {
                    if (!element) {
                        return;
                    }
                    if (element.value) {
                        element.value = _this.getDisplayValue(_this.isMultiple ? _this.address[index] : _this.address);
                    }
                });
                _this.addEventListener(element, 'keyup', function () {
                    if (!element) {
                        return;
                    }
                    if (!element.value) {
                        _this.clearAddress(element, index);
                    }
                });
            }
        });
        if (this.addRowButton) {
            this.addEventListener(this.addRowButton, 'click', function (event) {
                event.preventDefault();
                _this.addRow();
            });
        }
        this.removeRowButton.forEach(function (removeRowButton, index) {
            _this.addEventListener(removeRowButton, 'click', function (event) {
                event.preventDefault();
                _this.removeValue(index);
            });
        });
        if (this.modeSwitcher) {
            this.addEventListener(this.modeSwitcher, 'change', function () {
                if (!_this.modeSwitcher) {
                    return;
                }
                _this.dataValue = _this.emptyValue;
                _this.mode = _this.modeSwitcher.checked
                    ? AddressComponentMode.Manual
                    : AddressComponentMode.Autocomplete;
                if (!_this.builderMode) {
                    if (_this.manualMode) {
                        _this.restoreComponentsContext();
                    }
                    _this.triggerChange({
                        modified: true,
                    });
                }
                _this.redraw();
            });
        }
        if (!this.builderMode) {
            this.removeValueIcon.forEach(function (removeValueIcon, index) {
                _this.updateRemoveIcon(index);
                var removeValueHandler = function () {
                    var _a;
                    var searchInput = (_a = _this.searchInput) === null || _a === void 0 ? void 0 : _a[index];
                    _this.clearAddress(searchInput, index);
                    if (searchInput) {
                        searchInput.focus();
                    }
                };
                _this.addEventListener(removeValueIcon, 'click', removeValueHandler);
                _this.addEventListener(removeValueIcon, 'keydown', function (_a) {
                    var key = _a.key;
                    if (key === 'Enter') {
                        removeValueHandler();
                    }
                });
            });
        }
        return result;
    };
    AddressComponent.prototype.addChildComponent = function (component) {
        component.customConditional = ChildConditional;
    };
    AddressComponent.prototype.redraw = function () {
        var _this = this;
        var modeSwitcherInFocus = (this.modeSwitcher && (document.activeElement === this.modeSwitcher));
        return _super.prototype.redraw.call(this)
            .then(function (result) {
            if (modeSwitcherInFocus && _this.modeSwitcher) {
                _this.modeSwitcher.focus();
            }
            return result;
        });
    };
    AddressComponent.prototype.clearAddress = function (element, index) {
        var _a;
        if (!this.isEmpty()) {
            this.triggerChange();
        }
        if ((_a = this.address) === null || _a === void 0 ? void 0 : _a[index]) {
            this.address[index] = this.emptyValue;
        }
        else {
            this.address = this.emptyValue;
        }
        if (element) {
            element.value = '';
        }
        this.updateRemoveIcon(index);
    };
    AddressComponent.prototype.getDisplayValue = function (value) {
        if (value === void 0) { value = this.address; }
        return (this.provider && !this.manualMode)
            ? this.provider.getDisplayValue(value)
            : '';
    };
    AddressComponent.prototype.validateMultiple = function () {
        return this.isMultiple;
    };
    AddressComponent.prototype.updateRemoveIcon = function (index) {
        var _a;
        var removeValueIcon = (_a = this.removeValueIcon) === null || _a === void 0 ? void 0 : _a[index];
        if (removeValueIcon) {
            var value = this.isMultiple ? this.address[index] : this.address;
            if (this.isEmpty(value) || this.disabled) {
                this.addClass(removeValueIcon, RemoveValueIconHiddenClass);
            }
            else {
                this.removeClass(removeValueIcon, RemoveValueIconHiddenClass);
            }
        }
    };
    AddressComponent.prototype.getValueAsString = function (value, options) {
        if (!value) {
            return '';
        }
        var normalizedValue = this.normalizeValue(value);
        var _a = (this.manualModeEnabled
            ? normalizedValue
            : {
                address: normalizedValue,
                mode: AddressComponentMode.Autocomplete,
            }), address = _a.address, mode = _a.mode;
        var valueInManualMode = (mode === AddressComponentMode.Manual);
        if (this.provider && !valueInManualMode) {
            return this.getDisplayValue(address);
        }
        if (valueInManualMode) {
            if (this.component.manualModeViewString) {
                return this.interpolate(this.component.manualModeViewString, {
                    address: address,
                    data: this.data,
                    component: this.component,
                });
            }
            return this.getComponents()
                .filter(function (component) { return component.hasValue(address); })
                .map(function (component) { return [component, _.get(address, component.key)]; })
                .filter(function (_a) {
                var component = _a[0], componentValue = _a[1];
                return !component.isEmpty(componentValue);
            })
                .map(function (_a) {
                var component = _a[0], componentValue = _a[1];
                return component.getValueAsString(componentValue, options);
            })
                .join(', ');
        }
        return _super.prototype.getValueAsString.call(this, address, options);
    };
    AddressComponent.prototype.focus = function () {
        if (this.searchInput && this.searchInput[0]) {
            this.searchInput[0].focus();
        }
    };
    return AddressComponent;
}(ContainerComponent));
export default AddressComponent;
