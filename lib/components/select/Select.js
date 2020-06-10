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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import Choices from '../../utils/ChoicesWrapper';
import _ from 'lodash';
import Formio from '../../Formio';
import Field from '../_classes/field/Field';
import Form from '../../Form';
import NativePromise from 'native-promise-only';
var SelectComponent = /** @class */ (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field.schema.apply(Field, __spreadArrays([{
                type: 'select',
                label: 'Select',
                key: 'select',
                data: {
                    values: [],
                    json: '',
                    url: '',
                    resource: '',
                    custom: ''
                },
                clearOnRefresh: false,
                limit: 100,
                dataSrc: 'values',
                valueProperty: '',
                lazyLoad: true,
                filter: '',
                searchEnabled: true,
                searchField: '',
                minSearch: 0,
                readOnlyValue: false,
                authenticate: false,
                template: '<span>{{ item.label }}</span>',
                selectFields: '',
                searchThreshold: 0.3,
                uniqueOptions: false,
                tableView: true,
                fuseOptions: {
                    include: 'score',
                    threshold: 0.3,
                },
                customOptions: {}
            }], extend));
    };
    Object.defineProperty(SelectComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Select',
                group: 'basic',
                icon: 'th-list',
                weight: 70,
                documentation: 'http://help.form.io/userguide/#select',
                schema: SelectComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.validators = this.validators.concat(['select']);
        // Trigger an update.
        var updateArgs = [];
        var triggerUpdate = _.debounce(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            updateArgs = [];
            return _this.updateItems.apply(_this, args);
        }, 100);
        this.triggerUpdate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args.length) {
                updateArgs = args;
            }
            return triggerUpdate.apply(void 0, updateArgs);
        };
        // Keep track of the select options.
        this.selectOptions = [];
        if (this.isInfiniteScrollProvided) {
            this.isFromSearch = false;
            this.searchServerCount = null;
            this.defaultServerCount = null;
            this.isScrollLoading = false;
            this.searchDownloadedResources = [];
            this.defaultDownloadedResources = [];
        }
        // If this component has been activated.
        this.activated = false;
        // Determine when the items have been loaded.
        this.itemsLoaded = new NativePromise(function (resolve) {
            _this.itemsLoadedResolve = resolve;
        });
    };
    Object.defineProperty(SelectComponent.prototype, "dataReady", {
        get: function () {
            return this.itemsLoaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "defaultSchema", {
        get: function () {
            return SelectComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "emptyValue", {
        get: function () {
            if (this.component.multiple) {
                return [];
            }
            if (this.valueProperty) {
                return '';
            }
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "valueProperty", {
        get: function () {
            if (this.component.valueProperty) {
                return this.component.valueProperty;
            }
            // Force values datasource to use values without actually setting it on the component settings.
            if (this.component.dataSrc === 'values') {
                return 'value';
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'select';
            info.changeEvent = 'change';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "isSelectResource", {
        get: function () {
            return this.component.dataSrc === 'resource';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "isSelectURL", {
        get: function () {
            return this.component.dataSrc === 'url';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "isInfiniteScrollProvided", {
        get: function () {
            return this.isSelectResource || this.isSelectURL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "shouldDisabled", {
        get: function () {
            return _super.prototype.shouldDisabled || this.parentDisabled;
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.isEntireObjectDisplay = function () {
        return this.component.dataSrc === 'resource' && this.valueProperty === 'data';
    };
    SelectComponent.prototype.groupOptions = function (options) {
        var grouped = _.groupBy(options, function (_a) {
            var _b = _a.group, group = _b === void 0 ? null : _b;
            return group;
        });
        var groups = _.keys(grouped);
        if ((groups.length === 1) && (groups[0] === 'null')) {
            return options;
        }
        return _.map(grouped, function (options, groupLabel) { return ({
            label: groupLabel !== null && groupLabel !== void 0 ? groupLabel : 'No Group',
            choices: options,
        }); });
    };
    Object.defineProperty(SelectComponent.prototype, "groupedSelectOptions", {
        get: function () {
            return this.groupOptions(this.selectOptions);
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.itemTemplate = function (data) {
        if (_.isEmpty(data)) {
            return '';
        }
        // If they wish to show the value in read only mode, then just return the itemValue here.
        if (this.options.readOnly && this.component.readOnlyValue) {
            return this.itemValue(data);
        }
        // Perform a fast interpretation if we should not use the template.
        if (data && !this.component.template) {
            var itemLabel = data.label || data;
            return (typeof itemLabel === 'string') ? this.t(itemLabel) : itemLabel;
        }
        if (typeof data === 'string') {
            return this.t(data);
        }
        if (data.data) {
            data.data = this.isEntireObjectDisplay() && _.isObject(data.data)
                ? JSON.stringify(data.data)
                : data.data;
        }
        var template = this.component.template ? this.interpolate(this.component.template, { item: data }) : data.label;
        if (template) {
            var label = template.replace(/<\/?[^>]+(>|$)/g, '');
            if (!label || !this.t(label))
                return;
            return template.replace(label, this.t(label));
        }
        else {
            return JSON.stringify(data);
        }
    };
    SelectComponent.prototype.itemGroup = function (data) {
        if (!this.component.groupProperty) {
            return null;
        }
        return _.get(data, this.component.groupProperty, null);
    };
    SelectComponent.prototype.itemDisabled = function (data) {
        if (this.component.dataSrc !== 'values') {
            return null;
        }
        return _.get(data, 'disabled', null);
    };
    /**
     * Adds an option to the select dropdown.
     *
     * @param value
     * @param label
     */
    SelectComponent.prototype.addOption = function (value, label, attrs, id, disabled, group) {
        if (attrs === void 0) { attrs = {}; }
        if (_.isNil(label))
            return;
        var option = {
            value: _.isObject(value) && this.isEntireObjectDisplay()
                ? this.normalizeSingleValue(value)
                : _.isObject(value)
                    ? value
                    : _.isNull(value)
                        ? this.emptyValue
                        : String(this.normalizeSingleValue(value)),
            label: label
        };
        var skipOption = this.component.uniqueOptions
            ? !!this.selectOptions.find(function (selectOption) { return _.isEqual(selectOption.value, option.value); })
            : false;
        if (skipOption) {
            return;
        }
        if (disabled) {
            option.disabled = this.calculateCondition(disabled);
        }
        if (group) {
            option.group = group;
        }
        if (value) {
            this.selectOptions.push(option);
        }
        if (this.refs.selectContainer && (this.component.widget === 'html5')) {
            // Add element to option so we can reference it later.
            var div = document.createElement('div');
            div.innerHTML = this.sanitize(this.renderTemplate('selectOption', {
                selected: _.isEqual(this.dataValue, option.value),
                option: option,
                attrs: attrs,
                id: id,
                useId: (this.valueProperty === '') && _.isObject(value) && id,
            })).trim();
            option.element = div.firstChild;
            this.refs.selectContainer.appendChild(option.element);
        }
    };
    SelectComponent.prototype.addValueOptions = function (items) {
        items = items || [];
        var added = false;
        if (!this.selectOptions.length) {
            // Add the currently selected choices if they don't already exist.
            var currentChoices = Array.isArray(this.dataValue) ? this.dataValue : [this.dataValue];
            added = this.addCurrentChoices(currentChoices, items);
            if (!added && !this.component.multiple) {
                this.addPlaceholder();
            }
        }
        return added;
    };
    SelectComponent.prototype.disableInfiniteScroll = function () {
        if (!this.downloadedResources) {
            return;
        }
        this.downloadedResources.serverCount = this.downloadedResources.length;
        this.serverCount = this.downloadedResources.length;
    };
    /* eslint-disable max-statements */
    SelectComponent.prototype.setItems = function (items, fromSearch) {
        var _this = this;
        // If the items is a string, then parse as JSON.
        if (typeof items == 'string') {
            try {
                items = JSON.parse(items);
            }
            catch (err) {
                console.warn(err.message);
                items = [];
            }
        }
        // Allow js processing (needed for form builder)
        if (this.component.onSetItems && typeof this.component.onSetItems === 'function') {
            var newItems = this.component.onSetItems(this, items);
            if (newItems) {
                items = newItems;
            }
        }
        if (!this.choices && this.refs.selectContainer) {
            if (this.loading) {
                // this.removeChildFrom(this.refs.input[0], this.selectContainer);
            }
            this.empty(this.refs.selectContainer);
        }
        // If they provided select values, then we need to get them instead.
        if (this.component.selectValues) {
            items = _.get(items, this.component.selectValues, items) || [];
        }
        var areItemsEqual;
        if (this.isInfiniteScrollProvided) {
            areItemsEqual = this.isSelectURL ? _.isEqual(items, this.downloadedResources) : false;
            var areItemsEnded = this.component.limit > items.length;
            var areItemsDownloaded = areItemsEqual
                && this.downloadedResources
                && this.downloadedResources.length === items.length;
            if (areItemsEnded) {
                this.disableInfiniteScroll();
            }
            else if (areItemsDownloaded) {
                this.selectOptions = [];
            }
            else {
                this.serverCount = items.serverCount;
            }
        }
        if (this.isScrollLoading && items) {
            if (!areItemsEqual) {
                this.downloadedResources = this.downloadedResources
                    ? this.downloadedResources.concat(items)
                    : items;
            }
            this.downloadedResources.serverCount = items.serverCount || this.downloadedResources.serverCount;
        }
        else {
            this.downloadedResources = items || [];
            this.selectOptions = [];
        }
        // Add the value options.
        if (!fromSearch) {
            this.addValueOptions(items);
        }
        if (this.component.widget === 'html5' && !this.component.placeholder) {
            this.addOption(null, '');
        }
        // Iterate through each of the items.
        _.each(items, function (item, index) {
            // preventing references of the components inside the form to the parent form when building forms
            if (_this.root && _this.root.options.editForm && _this.root.options.editForm._id && _this.root.options.editForm._id === item._id) {
                return;
            }
            _this.addOption(_this.itemValue(item), _this.itemTemplate(item), {}, String(index), _this.itemDisabled(item), _this.itemGroup(item));
        });
        if (this.choices) {
            this.choices.setChoices(this.groupedSelectOptions, 'value', 'label', true);
        }
        else if (this.loading) {
            // Re-attach select input.
            // this.appendTo(this.refs.input[0], this.selectContainer);
        }
        // We are no longer loading.
        this.isScrollLoading = false;
        this.loading = false;
        // If a value is provided, then select it.
        if (this.dataValue) {
            this.setValue(this.dataValue, {
                noUpdateEvent: true
            });
        }
        else {
            // If a default value is provided then select it.
            var defaultValue = this.multiple ? this.defaultValue || [] : this.defaultValue;
            if (defaultValue) {
                this.setValue(defaultValue);
            }
        }
        // Say we are done loading the items.
        this.itemsLoadedResolve();
    };
    /* eslint-enable max-statements */
    SelectComponent.prototype.loadItems = function (url, search, headers, options, method, body) {
        var _this = this;
        options = options || {};
        // See if they have not met the minimum search requirements.
        var minSearch = parseInt(this.component.minSearch, 10);
        if (this.component.searchField &&
            (minSearch > 0) &&
            (!search || (search.length < minSearch))) {
            // Set empty items.
            return this.setItems([]);
        }
        // Ensure we have a method and remove any body if method is get
        method = method || 'GET';
        if (method.toUpperCase() === 'GET') {
            body = null;
        }
        var limit = this.component.limit || 100;
        var skip = this.isScrollLoading ? this.selectOptions.length : 0;
        var query = (this.component.dataSrc === 'url') ? {} : {
            limit: limit,
            skip: skip,
        };
        // Allow for url interpolation.
        url = this.interpolate(url, {
            formioBase: Formio.getBaseUrl(),
            search: search,
            limit: limit,
            skip: skip,
            page: Math.abs(Math.floor(skip / limit))
        });
        // Add search capability.
        if (this.component.searchField && search) {
            if (Array.isArray(search)) {
                query["" + this.component.searchField] = search.join(',');
            }
            else {
                query["" + this.component.searchField] = search;
            }
        }
        // If they wish to return only some fields.
        if (this.component.selectFields) {
            query.select = this.component.selectFields;
        }
        // Add sort capability
        if (this.component.sort) {
            query.sort = this.component.sort;
        }
        if (!_.isEmpty(query)) {
            // Add the query string.
            url += (!url.includes('?') ? '?' : '&') + Formio.serialize(query, function (item) { return _this.interpolate(item); });
        }
        // Add filter capability
        if (this.component.filter) {
            url += (!url.includes('?') ? '?' : '&') + this.interpolate(this.component.filter);
        }
        // Make the request.
        options.header = headers;
        this.loading = true;
        Formio.makeRequest(this.options.formio, 'select', url, method, body, options)
            .then(function (response) {
            _this.loading = false;
            _this.setItems(response, !!search);
        })
            .catch(function (err) {
            if (_this.isInfiniteScrollProvided) {
                _this.setItems([]);
                _this.disableInfiniteScroll();
            }
            _this.isScrollLoading = false;
            _this.loading = false;
            _this.itemsLoadedResolve();
            _this.emit('componentError', {
                component: _this.component,
                message: err.toString(),
            });
            console.warn("Unable to load resources for " + _this.key);
        });
    };
    Object.defineProperty(SelectComponent.prototype, "requestHeaders", {
        /**
         * Get the request headers for this select dropdown.
         */
        get: function () {
            var _this = this;
            // Create the headers object.
            var headers = new Formio.Headers();
            // Add custom headers to the url.
            if (this.component.data && this.component.data.headers) {
                try {
                    _.each(this.component.data.headers, function (header) {
                        if (header.key) {
                            headers.set(header.key, _this.interpolate(header.value));
                        }
                    });
                }
                catch (err) {
                    console.warn(err.message);
                }
            }
            return headers;
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.getCustomItems = function () {
        return this.evaluate(this.component.data.custom, {
            values: []
        }, 'values');
    };
    SelectComponent.prototype.updateCustomItems = function () {
        this.setItems(this.getCustomItems() || []);
    };
    SelectComponent.prototype.refresh = function () {
        if (this.component.clearOnRefresh) {
            this.setValue(this.emptyValue);
        }
        if (this.component.lazyLoad) {
            this.activated = false;
            this.loading = true;
            this.setItems([]);
        }
        this.updateItems(null, true);
    };
    Object.defineProperty(SelectComponent.prototype, "additionalResourcesAvailable", {
        get: function () {
            return _.isNil(this.serverCount) || (this.serverCount > this.downloadedResources.length);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "serverCount", {
        get: function () {
            if (this.isFromSearch) {
                return this.searchServerCount;
            }
            return this.defaultServerCount;
        },
        set: function (value) {
            if (this.isFromSearch) {
                this.searchServerCount = value;
            }
            else {
                this.defaultServerCount = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "downloadedResources", {
        get: function () {
            if (this.isFromSearch) {
                return this.searchDownloadedResources;
            }
            return this.defaultDownloadedResources;
        },
        set: function (value) {
            if (this.isFromSearch) {
                this.searchDownloadedResources = value;
            }
            else {
                this.defaultDownloadedResources = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    /* eslint-disable max-statements */
    SelectComponent.prototype.updateItems = function (searchInput, forceUpdate) {
        var _this = this;
        if (!this.component.data) {
            console.warn("Select component " + this.key + " does not have data configuration.");
            this.itemsLoadedResolve();
            return;
        }
        // Only load the data if it is visible.
        if (!this.checkConditions()) {
            this.itemsLoadedResolve();
            return;
        }
        switch (this.component.dataSrc) {
            case 'values':
                this.setItems(this.component.data.values);
                break;
            case 'json':
                this.setItems(this.component.data.json);
                break;
            case 'custom':
                this.updateCustomItems();
                break;
            case 'resource': {
                // If there is no resource, or we are lazyLoading, wait until active.
                if (!this.component.data.resource || (!forceUpdate && !this.active)) {
                    return;
                }
                var resourceUrl = this.options.formio ? this.options.formio.formsUrl : Formio.getProjectUrl() + "/form";
                resourceUrl += ("/" + this.component.data.resource + "/submission");
                if (forceUpdate || this.additionalResourcesAvailable || this.dataValue.length && !this.serverCount) {
                    try {
                        this.loadItems(resourceUrl, searchInput, this.requestHeaders);
                    }
                    catch (err) {
                        console.warn("Unable to load resources for " + this.key);
                    }
                }
                else {
                    this.setItems(this.downloadedResources);
                }
                break;
            }
            case 'url': {
                if (!forceUpdate && !this.active && !this.calculatedValue) {
                    // If we are lazyLoading, wait until activated.
                    return;
                }
                var url = this.component.data.url;
                var method = void 0;
                var body = void 0;
                if (url.startsWith('/')) {
                    // if URL starts with '/project', we should use base URL to avoid issues with URL formed like <base_url>/<project_name>/project/<project_id>/...
                    var baseUrl = url.startsWith('/project') ? Formio.getBaseUrl() : Formio.getProjectUrl() || Formio.getBaseUrl();
                    url = baseUrl + url;
                }
                if (!this.component.data.method) {
                    method = 'GET';
                }
                else {
                    method = this.component.data.method;
                    if (method.toUpperCase() === 'POST') {
                        body = this.component.data.body;
                    }
                    else {
                        body = null;
                    }
                }
                var options = this.component.authenticate ? {} : { noToken: true };
                this.loadItems(url, searchInput, this.requestHeaders, options, method, body);
                break;
            }
            case 'indexeddb': {
                if (!window.indexedDB) {
                    window.alert("Your browser doesn't support current version of indexedDB");
                }
                if (this.component.indexeddb && this.component.indexeddb.database && this.component.indexeddb.table) {
                    var request_1 = window.indexedDB.open(this.component.indexeddb.database);
                    request_1.onupgradeneeded = function (event) {
                        if (_this.component.customOptions) {
                            var db_1 = event.target.result;
                            var objectStore = db_1.createObjectStore(_this.component.indexeddb.table, { keyPath: 'myKey', autoIncrement: true });
                            objectStore.transaction.oncomplete = function () {
                                var transaction = db_1.transaction(_this.component.indexeddb.table, 'readwrite');
                                _this.component.customOptions.forEach(function (item) {
                                    transaction.objectStore(_this.component.indexeddb.table).put(item);
                                });
                            };
                        }
                    };
                    request_1.onerror = function () {
                        window.alert(request_1.errorCode);
                    };
                    request_1.onsuccess = function (event) {
                        var db = event.target.result;
                        var transaction = db.transaction(_this.component.indexeddb.table, 'readwrite');
                        var objectStore = transaction.objectStore(_this.component.indexeddb.table);
                        new NativePromise(function (resolve) {
                            var responseItems = [];
                            objectStore.getAll().onsuccess = function (event) {
                                event.target.result.forEach(function (item) {
                                    responseItems.push(item);
                                });
                                resolve(responseItems);
                            };
                        }).then(function (items) {
                            if (!_.isEmpty(_this.component.indexeddb.filter)) {
                                items = _.filter(items, _this.component.indexeddb.filter);
                            }
                            _this.setItems(items);
                        });
                    };
                }
            }
        }
    };
    /* eslint-enable max-statements */
    SelectComponent.prototype.addPlaceholder = function () {
        if (!this.component.placeholder) {
            return;
        }
        this.addOption('', this.component.placeholder, { placeholder: true });
    };
    /**
     * Activate this select control.
     */
    SelectComponent.prototype.activate = function () {
        if (this.active) {
            return;
        }
        this.activated = true;
        if (this.choices) {
            this.choices.setChoices([{
                    value: '',
                    label: "<i class=\"" + this.iconClass('refresh') + "\" style=\"font-size:1.3em;\"></i>",
                    disabled: true,
                }], 'value', 'label', true);
        }
        else if (this.component.dataSrc === 'url' || this.component.dataSrc === 'resource') {
            this.addOption('', this.t('loading...'));
        }
        this.triggerUpdate();
    };
    Object.defineProperty(SelectComponent.prototype, "active", {
        get: function () {
            return !this.component.lazyLoad || this.activated || this.options.readOnly;
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.render = function () {
        var info = this.inputInfo;
        info.attr = info.attr || {};
        info.multiple = this.component.multiple;
        return _super.prototype.render.call(this, this.wrapElement(this.renderTemplate('select', {
            input: info,
            selectOptions: '',
            index: null,
        })));
    };
    SelectComponent.prototype.wrapElement = function (element) {
        return this.component.addResource && !this.options.readOnly
            ? (this.renderTemplate('resourceAdd', {
                element: element
            }))
            : element;
    };
    SelectComponent.prototype.choicesOptions = function () {
        var useSearch = this.component.hasOwnProperty('searchEnabled') ? this.component.searchEnabled : true;
        var placeholderValue = this.t(this.component.placeholder);
        var customOptions = this.component.customOptions || {};
        if (typeof customOptions == 'string') {
            try {
                customOptions = JSON.parse(customOptions);
            }
            catch (err) {
                console.warn(err.message);
                customOptions = {};
            }
        }
        return __assign({ removeItemButton: this.component.disabled ? false : _.get(this.component, 'removeItemButton', true), itemSelectText: '', classNames: {
                containerOuter: 'choices form-group formio-choices',
                containerInner: this.transform('class', 'form-control ui fluid selection dropdown')
            }, addItemText: false, placeholder: !!this.component.placeholder, placeholderValue: placeholderValue, noResultsText: this.t('No results found'), noChoicesText: this.t('No choices to choose from'), searchPlaceholderValue: this.t('Type to search'), shouldSort: false, position: (this.component.dropdown || 'auto'), searchEnabled: useSearch, searchChoices: !this.component.searchField, searchFields: _.get(this, 'component.searchFields', ['label']), fuseOptions: Object.assign({}, _.get(this, 'component.fuseOptions', {}), {
                include: 'score',
                threshold: _.get(this, 'component.searchThreshold', 0.3),
            }), valueComparer: _.isEqual, resetScrollPosition: false }, customOptions);
    };
    /* eslint-disable max-statements */
    SelectComponent.prototype.attach = function (element) {
        var _this = this;
        var superAttach = _super.prototype.attach.call(this, element);
        this.loadRefs(element, {
            selectContainer: 'single',
            addResource: 'single',
            autocompleteInput: 'single'
        });
        //enable autocomplete for select
        var autocompleteInput = this.refs.autocompleteInput;
        if (autocompleteInput) {
            this.addEventListener(autocompleteInput, 'change', function (event) {
                _this.setValue(event.target.value);
            });
        }
        var input = this.refs.selectContainer;
        if (!input) {
            return;
        }
        this.addEventListener(input, this.inputInfo.changeEvent, function () { return _this.updateValue(null, {
            modified: true
        }); });
        if (this.component.widget === 'html5') {
            this.triggerUpdate();
            this.focusableElement = input;
            this.addEventListener(input, 'focus', function () { return _this.update(); });
            this.addEventListener(input, 'keydown', function (event) {
                var key = event.key;
                if (['Backspace', 'Delete'].includes(key)) {
                    _this.setValue(_this.emptyValue);
                }
            });
            return;
        }
        var tabIndex = input.tabIndex;
        this.addPlaceholder();
        input.setAttribute('dir', this.i18next.dir());
        if (this.choices) {
            this.choices.destroy();
        }
        var choicesOptions = this.choicesOptions();
        this.choices = new Choices(input, choicesOptions);
        this.addEventListener(input, 'hideDropdown', function () {
            _this.choices.input.element.value = '';
            _this.updateItems(null, true);
        });
        if (this.selectOptions && this.selectOptions.length) {
            this.choices.setChoices(this.groupedSelectOptions, 'value', 'label', true);
        }
        if (this.component.multiple) {
            this.focusableElement = this.choices.input.element;
        }
        else {
            this.focusableElement = this.choices.containerInner.element;
            this.choices.containerOuter.element.setAttribute('tabIndex', '-1');
            if (choicesOptions.searchEnabled) {
                this.addEventListener(this.choices.containerOuter.element, 'focus', function () { return _this.focusableElement.focus(); });
            }
        }
        if (this.isInfiniteScrollProvided) {
            this.scrollList = this.choices.choiceList.element;
            this.onScroll = function () {
                var isLoadingAvailable = !_this.isScrollLoading
                    && _this.additionalResourcesAvailable
                    && ((_this.scrollList.scrollTop + _this.scrollList.clientHeight) >= _this.scrollList.scrollHeight);
                if (isLoadingAvailable) {
                    _this.isScrollLoading = true;
                    _this.choices.setChoices([{
                            value: _this.id + "-loading",
                            label: 'Loading...',
                            disabled: true,
                        }], 'value', 'label');
                    _this.triggerUpdate(_this.choices.input.element.value);
                }
            };
            this.addEventListener(this.scrollList, 'scroll', this.onScroll);
        }
        this.focusableElement.setAttribute('tabIndex', tabIndex);
        // If a search field is provided, then add an event listener to update items on search.
        if (this.component.searchField) {
            // Make sure to clear the search when no value is provided.
            if (this.choices && this.choices.input && this.choices.input.element) {
                this.addEventListener(this.choices.input.element, 'input', function (event) {
                    _this.isFromSearch = !!event.target.value;
                    if (!event.target.value) {
                        _this.triggerUpdate();
                    }
                    else {
                        _this.serverCount = null;
                        _this.downloadedResources = [];
                    }
                });
            }
            this.addEventListener(input, 'search', function (event) { return _this.triggerUpdate(event.detail.value); });
            this.addEventListener(input, 'stopSearch', function () { return _this.triggerUpdate(); });
        }
        this.addEventListener(input, 'showDropdown', function () {
            if (_this.dataValue) {
                _this.triggerUpdate();
            }
            _this.update();
        });
        if (choicesOptions.placeholderValue && this.choices._isSelectOneElement) {
            this.addPlaceholderItem(choicesOptions.placeholderValue);
            this.addEventListener(input, 'removeItem', function () {
                _this.addPlaceholderItem(choicesOptions.placeholderValue);
            });
        }
        // Add value options.
        this.addValueOptions();
        this.setChoicesValue(this.dataValue);
        if (this.isSelectResource && this.refs.addResource) {
            this.addEventListener(this.refs.addResource, 'click', function (event) {
                event.preventDefault();
                var formioForm = _this.ce('div');
                var dialog = _this.createModal(formioForm);
                var projectUrl = _.get(_this.root, 'formio.projectUrl', Formio.getBaseUrl());
                var formUrl = projectUrl + "/form/" + _this.component.data.resource;
                new Form(formioForm, formUrl, {}).ready
                    .then(function (form) {
                    form.on('submit', function (submission) {
                        if (_this.component.multiple) {
                            submission = __spreadArrays(_this.dataValue, [submission]);
                        }
                        _this.setValue(submission);
                        dialog.close();
                    });
                });
            });
        }
        // Force the disabled state with getters and setters.
        this.disabled = this.shouldDisabled;
        this.triggerUpdate();
        return superAttach;
    };
    SelectComponent.prototype.addPlaceholderItem = function (placeholderValue) {
        var items = this.choices._store.activeItems;
        if (!items.length) {
            this.choices._addItem({
                value: placeholderValue,
                label: placeholderValue,
                choiceId: 0,
                groupId: -1,
                customProperties: null,
                placeholder: true,
                keyCode: null
            });
        }
    };
    /* eslint-enable max-statements */
    SelectComponent.prototype.update = function () {
        if (this.component.dataSrc === 'custom') {
            this.updateCustomItems();
        }
        // Activate the control.
        this.activate();
    };
    Object.defineProperty(SelectComponent.prototype, "disabled", {
        get: function () {
            return _super.prototype.disabled;
        },
        set: function (disabled) {
            _super.prototype.disabled = disabled;
            if (!this.choices) {
                return;
            }
            if (disabled) {
                this.setDisabled(this.choices.containerInner.element, true);
                this.focusableElement.removeAttribute('tabIndex');
                this.choices.disable();
            }
            else {
                this.setDisabled(this.choices.containerInner.element, false);
                this.focusableElement.setAttribute('tabIndex', this.component.tabindex || 0);
                this.choices.enable();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "visible", {
        get: function () {
            return _super.prototype.visible;
        },
        set: function (value) {
            // If we go from hidden to visible, trigger a refresh.
            if (value && (!this._visible !== !value)) {
                this.triggerUpdate();
            }
            _super.prototype.visible = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {*} value
     * @param {Array} items
     */
    SelectComponent.prototype.addCurrentChoices = function (values, items, keyValue) {
        var _this = this;
        if (!values) {
            return false;
        }
        var notFoundValuesToAdd = [];
        var added = values.reduce(function (defaultAdded, value) {
            if (!value || _.isEmpty(value)) {
                return defaultAdded;
            }
            var found = false;
            // Make sure that `items` and `this.selectOptions` points
            // to the same reference. Because `this.selectOptions` is
            // internal property and all items are populated by
            // `this.addOption` method, we assume that items has
            // 'label' and 'value' properties. This assumption allows
            // us to read correct value from the item.
            var isSelectOptions = items === _this.selectOptions;
            if (items && items.length) {
                _.each(items, function (choice) {
                    if (choice._id && value._id && (choice._id === value._id)) {
                        found = true;
                        return false;
                    }
                    var itemValue = keyValue ? choice.value : _this.itemValue(choice, isSelectOptions);
                    found |= _.isEqual(itemValue, value);
                    return found ? false : true;
                });
            }
            // Add the default option if no item is found.
            if (!found) {
                notFoundValuesToAdd.push({
                    value: _this.itemValue(value),
                    label: _this.itemTemplate(value)
                });
                return true;
            }
            return found || defaultAdded;
        }, false);
        if (notFoundValuesToAdd.length) {
            if (this.choices) {
                this.choices.setChoices(notFoundValuesToAdd, 'value', 'label');
            }
            else {
                notFoundValuesToAdd.map(function (notFoundValue) {
                    _this.addOption(notFoundValue.value, notFoundValue.label);
                });
            }
        }
        return added;
    };
    SelectComponent.prototype.getValueAsString = function (data) {
        return (this.component.multiple && Array.isArray(data))
            ? data.map(this.asString.bind(this)).join(', ')
            : this.asString(data);
    };
    SelectComponent.prototype.getValue = function () {
        // If the widget isn't active.
        if (this.viewOnly || this.loading
            || (!this.component.lazyLoad && !this.selectOptions.length)
            || !this.element) {
            return this.dataValue;
        }
        var value = this.emptyValue;
        if (this.choices) {
            value = this.choices.getValue(true);
            // Make sure we don't get the placeholder
            if (!this.component.multiple &&
                this.component.placeholder &&
                (value === this.t(this.component.placeholder))) {
                value = this.emptyValue;
            }
        }
        else if (this.refs.selectContainer) {
            value = this.refs.selectContainer.value;
            if (this.valueProperty === '') {
                if (value === '') {
                    return {};
                }
                var option = this.selectOptions[value];
                if (option && _.isObject(option.value)) {
                    value = option.value;
                }
            }
        }
        else {
            value = this.dataValue;
        }
        // Choices will return undefined if nothing is selected. We really want '' to be empty.
        if (value === undefined || value === null) {
            value = '';
        }
        return value;
    };
    SelectComponent.prototype.redraw = function () {
        var done = _super.prototype.redraw.call(this);
        this.triggerUpdate();
        return done;
    };
    SelectComponent.prototype.normalizeSingleValue = function (value) {
        if (_.isNil(value)) {
            return;
        }
        //check if value equals to default emptyValue
        if (_.isObject(value) && Object.keys(value).length === 0) {
            return value;
        }
        var displayEntireObject = this.isEntireObjectDisplay();
        var dataType = this.component.dataType || 'auto';
        var normalize = {
            value: value,
            number: function () {
                var numberValue = Number(this.value);
                if (!Number.isNaN(numberValue) && Number.isFinite(numberValue) && value !== '') {
                    this.value = numberValue;
                }
                return this;
            },
            boolean: function () {
                if (_.isString(this.value)
                    && (this.value.toLowerCase() === 'true'
                        || this.value.toLowerCase() === 'false')) {
                    this.value = (this.value.toLowerCase() === 'true');
                }
                return this;
            },
            string: function () {
                this.value = String(this.value);
                return this;
            },
            object: function () {
                if (_.isObject(this.value) && displayEntireObject) {
                    this.value = JSON.stringify(this.value);
                }
                return this;
            },
            auto: function () {
                if (_.isObject(this.value)) {
                    this.value = this.object().value;
                }
                else {
                    this.value = this.string().number().boolean().value;
                }
                return this;
            }
        };
        try {
            return normalize[dataType]().value;
        }
        catch (err) {
            console.warn('Failed to normalize value', err);
            return value;
        }
    };
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    SelectComponent.prototype.normalizeValue = function (value) {
        var _this = this;
        if (this.component.multiple && Array.isArray(value)) {
            return value.map(function (singleValue) { return _this.normalizeSingleValue(singleValue); });
        }
        return _super.prototype.normalizeValue.call(this, this.normalizeSingleValue(value));
    };
    SelectComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var previousValue = this.dataValue;
        var changed = this.updateValue(value, flags);
        value = this.dataValue;
        var hasPreviousValue = Array.isArray(previousValue) ? previousValue.length : previousValue;
        var hasValue = Array.isArray(value) ? value.length : value;
        // Undo typing when searching to set the value.
        if (this.component.multiple && Array.isArray(value)) {
            value = value.map(function (value) {
                if (typeof value === 'boolean' || typeof value === 'number') {
                    return value.toString();
                }
                return value;
            });
        }
        else {
            if (typeof value === 'boolean' || typeof value === 'number') {
                value = value.toString();
            }
        }
        // Do not set the value if we are loading... that will happen after it is done.
        if (this.loading) {
            return changed;
        }
        // Determine if we need to perform an initial lazyLoad api call if searchField is provided.
        if (this.isInitApiCallNeeded(hasValue)) {
            this.loading = true;
            this.lazyLoadInit = true;
            var searchProperty = this.component.searchField || this.component.valueProperty;
            this.triggerUpdate(_.get(value.data || value, searchProperty, value), true);
            return changed;
        }
        // Add the value options.
        this.addValueOptions();
        this.setChoicesValue(value, hasPreviousValue);
        return changed;
    };
    SelectComponent.prototype.isInitApiCallNeeded = function (hasValue) {
        return this.component.lazyLoad &&
            !this.lazyLoadInit &&
            !this.active &&
            !this.selectOptions.length &&
            hasValue &&
            this.visible && (this.component.searchField || this.component.valueProperty);
    };
    SelectComponent.prototype.setChoicesValue = function (value, hasPreviousValue) {
        var hasValue = Array.isArray(value) ? value.length : value;
        hasPreviousValue = (hasPreviousValue === undefined) ? true : hasPreviousValue;
        if (this.choices) {
            // Now set the value.
            if (hasValue) {
                this.choices.removeActiveItems();
                // Add the currently selected choices if they don't already exist.
                var currentChoices = Array.isArray(value) ? value : [value];
                if (!this.addCurrentChoices(currentChoices, this.selectOptions, true)) {
                    this.choices.setChoices(this.groupedSelectOptions, 'value', 'label', true);
                }
                this.choices.setChoiceByValue(value);
            }
            else if (hasPreviousValue) {
                this.choices.removeActiveItems();
            }
        }
        else {
            if (hasValue) {
                var values_1 = Array.isArray(value) ? value : [value];
                _.each(this.selectOptions, function (selectOption) {
                    _.each(values_1, function (val) {
                        if (_.isEqual(val, selectOption.value) && selectOption.element) {
                            selectOption.element.selected = true;
                            selectOption.element.setAttribute('selected', 'selected');
                            return false;
                        }
                    });
                });
            }
            else {
                _.each(this.selectOptions, function (selectOption) {
                    if (selectOption.element) {
                        selectOption.element.selected = false;
                        selectOption.element.removeAttribute('selected');
                    }
                });
            }
        }
    };
    /**
     * Deletes the value of the component.
     */
    SelectComponent.prototype.deleteValue = function () {
        this.setValue('', {
            noUpdateEvent: true
        });
        this.unset();
    };
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */
    SelectComponent.prototype.validateMultiple = function () {
        // Select component will contain one input when flagged as multiple.
        return false;
    };
    /**
     * Output this select dropdown as a string value.
     * @return {*}
     */
    SelectComponent.prototype.isBooleanOrNumber = function (value) {
        return typeof value === 'number' || typeof value === 'boolean';
    };
    SelectComponent.prototype.getNormalizedValues = function () {
        var _this = this;
        if (!this.component || !this.component.data || !this.component.data.values) {
            return;
        }
        return this.component.data.values.map(function (value) { return ({ label: value.label, value: String(_this.normalizeSingleValue(value.value)) }); });
    };
    SelectComponent.prototype.asString = function (value) {
        var _this = this;
        value = value || this.getValue();
        //need to convert values to strings to be able to compare values with available options that are strings
        if (this.isBooleanOrNumber(value)) {
            value = value.toString();
        }
        if (Array.isArray(value) && value.some(function (item) { return _this.isBooleanOrNumber(item); })) {
            value = value.map(function (item) {
                if (_this.isBooleanOrNumber(item)) {
                    item = item.toString();
                }
            });
        }
        if (['values', 'custom'].includes(this.component.dataSrc)) {
            var _a = this.component.dataSrc === 'values'
                ? {
                    items: this.getNormalizedValues(),
                    valueProperty: 'value',
                }
                : {
                    items: this.getCustomItems(),
                    valueProperty: this.valueProperty,
                }, items = _a.items, valueProperty = _a.valueProperty;
            value = (this.component.multiple && Array.isArray(value))
                ? _.filter(items, function (item) { return value.includes(item.value); })
                : valueProperty
                    ? _.find(items, [valueProperty, value])
                    : value;
        }
        if (_.isString(value)) {
            return value;
        }
        if (Array.isArray(value)) {
            var items_1 = [];
            value.forEach(function (item) { return items_1.push(_this.itemTemplate(item)); });
            return items_1.length > 0 ? items_1.join('<br />') : '-';
        }
        return !_.isNil(value)
            ? this.itemTemplate(value)
            : '-';
    };
    SelectComponent.prototype.detach = function () {
        _super.prototype.detach.call(this);
        if (this.choices) {
            this.choices.destroy();
            this.choices = null;
        }
    };
    SelectComponent.prototype.focus = function () {
        if (this.focusableElement) {
            this.focusableElement.focus();
        }
    };
    SelectComponent.prototype.setErrorClasses = function (elements, dirty, options) {
        _super.prototype.setErrorClasses.call(this, elements, dirty, options);
        if (this.choices) {
            _super.prototype.setErrorClasses.call(this, [this.choices.containerInner.element], dirty, options);
        }
        else {
            _super.prototype.setErrorClasses.call(this, [this.refs.selectContainer], dirty, options);
        }
    };
    return SelectComponent;
}(Field));
export default SelectComponent;
