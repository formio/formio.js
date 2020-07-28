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
import EventEmitter from 'eventemitter2';
import _ from 'lodash';
import { superGet, superSet, uniqueKey } from '../../utils/utils';
import Component from '../_classes/component/Component';
import DataGridComponent from '../datagrid/DataGrid';
var DataMapComponent = /** @class */ (function (_super) {
    __extends(DataMapComponent, _super);
    function DataMapComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.type = 'datamap';
        return _this;
    }
    DataMapComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component.schema.apply(Component, __spreadArrays([{
                label: 'Data Map',
                key: 'dataMap',
                type: 'datamap',
                clearOnHide: true,
                addAnother: 'Add Another',
                disableAddingRemovingRows: false,
                keyBeforeValue: true,
                valueComponent: {
                    type: 'textfield',
                    key: 'value',
                    label: 'Value',
                    input: true
                },
                input: true,
                validate: {
                    maxLength: 0,
                    minLength: 0
                }
            }], extend));
    };
    Object.defineProperty(DataMapComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Data Map',
                icon: 'th-list',
                group: 'data',
                documentation: 'http://help.form.io/userguide/#datamap',
                weight: 20,
                schema: DataMapComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "schema", {
        get: function () {
            var schema = superGet(DataGridComponent, 'schema', this);
            if (this.components && (this.components.length > 0)) {
                schema.valueComponent = this.components[this.components.length - 1].schema;
            }
            return _.omit(schema, 'components');
        },
        enumerable: false,
        configurable: true
    });
    DataMapComponent.prototype.init = function () {
        var _a;
        this.components = [];
        this.rows = [];
        this.createRows();
        this.visibleColumns = (_a = {
                key: true
            },
            _a[this.valueKey] = true,
            _a);
        this.component.valueComponent.hideLabel = true;
    };
    Object.defineProperty(DataMapComponent.prototype, "defaultSchema", {
        get: function () {
            return DataMapComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "emptyValue", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "dataValue", {
        get: function () {
            if (!this.key ||
                (!this.visible && this.component.clearOnHide)) {
                return this.emptyValue;
            }
            if (!this.hasValue()) {
                this.dataValue = this.emptyValue;
            }
            return _.get(this.data, this.key);
        },
        set: function (value) {
            superSet(DataGridComponent, 'dataValue', this, value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "defaultValue", {
        get: function () {
            var value = superGet(DataGridComponent, 'defaultValue', this);
            if (Array.isArray(value)) {
                return value[0];
            }
            return this.emptyValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "keySchema", {
        get: function () {
            return {
                type: 'textfield',
                input: true,
                hideLabel: true,
                label: this.component.keyLabel || 'Key',
                key: '__key',
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataMapComponent.prototype, "valueKey", {
        get: function () {
            return this.component.valueComponent.key;
        },
        enumerable: false,
        configurable: true
    });
    DataMapComponent.prototype.getRowValues = function () {
        var dataValue = this.dataValue;
        if (this.builderMode) {
            return [dataValue];
        }
        if (_.isEmpty(dataValue)) {
            return [];
        }
        return Object.keys(dataValue).map(function () { return dataValue; });
    };
    Object.defineProperty(DataMapComponent.prototype, "iteratableRows", {
        get: function () {
            return this.rows.map(function (row) {
                return Object.keys(row).map(function (key) { return ({
                    components: row[key],
                    data: row[key].dataValue,
                }); });
            });
        },
        enumerable: false,
        configurable: true
    });
    DataMapComponent.prototype.componentContext = function (component) {
        return this.iteratableRows[component.row].find(function (comp) { return comp.components.key === component.key; }).data;
    };
    DataMapComponent.prototype.hasHeader = function () {
        return true;
    };
    DataMapComponent.prototype.hasRemoveButtons = function () {
        return !this.component.disableAddingRemovingRows &&
            !this.options.readOnly &&
            !this.disabled &&
            this.fullMode;
    };
    DataMapComponent.prototype.getColumns = function () {
        var keySchema = Object.assign({}, this.keySchema);
        var valueSchema = Object.assign({}, this.component.valueComponent);
        keySchema.hideLabel = false;
        valueSchema.hideLabel = false;
        return this.component.keyBeforeValue ?
            [keySchema, valueSchema] :
            [valueSchema, keySchema];
    };
    DataMapComponent.prototype.getRowKey = function (rowIndex) {
        var keys = Object.keys(this.dataValue);
        if (!keys[rowIndex]) {
            keys[rowIndex] = uniqueKey(this.dataValue, 'key');
        }
        return keys[rowIndex];
    };
    DataMapComponent.prototype.setRowComponentsData = function (rowIndex, rowData) {
        _.each(this.rows[rowIndex], function (component) {
            if (component.key === '__key') {
                component.data = {
                    '__key': Object.keys(rowData)[rowIndex],
                };
            }
            else {
                component.data = rowData;
            }
        });
    };
    DataMapComponent.prototype.createRowComponents = function (row, rowIndex) {
        var _this = this;
        var key = this.getRowKey(rowIndex);
        // Create a new event emitter since fields are isolated.
        var options = _.clone(this.options);
        options.events = new EventEmitter({
            wildcard: false,
            maxListeners: 0
        });
        options.name += "[" + rowIndex + "]";
        options.row = "" + rowIndex;
        var components = {};
        components['__key'] = this.createComponent(this.keySchema, options, { __key: key });
        components['__key'].on('componentChange', function (event) {
            var dataValue = _this.dataValue;
            var newKey = uniqueKey(dataValue, event.value);
            dataValue[newKey] = dataValue[key];
            delete dataValue[key];
            var comp = components[_this.valueKey];
            comp.component.key = newKey;
            comp.path = _this.calculateComponentPath(comp);
            key = newKey;
        });
        var valueComponent = _.clone(this.component.valueComponent);
        valueComponent.key = key;
        var componentOptions = this.options;
        componentOptions.row = options.row;
        components[this.valueKey] = this.createComponent(valueComponent, componentOptions, this.dataValue);
        return components;
    };
    Object.defineProperty(DataMapComponent.prototype, "canAddColumn", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    DataMapComponent.prototype.addChildComponent = function (component) {
        this.component.valueComponent = component;
    };
    DataMapComponent.prototype.saveChildComponent = function (component) {
        this.component.valueComponent = component;
    };
    DataMapComponent.prototype.removeChildComponent = function () {
        var defaultSchema = DataMapComponent.schema();
        this.component.valueComponent = defaultSchema.valueComponent;
    };
    DataMapComponent.prototype.addRow = function () {
        var index = this.rows.length;
        this.rows[index] = this.createRowComponents(this.dataValue, index);
        this.redraw();
        this.triggerChange();
    };
    DataMapComponent.prototype.removeRow = function (index) {
        var keys = Object.keys(this.dataValue);
        if (keys[index]) {
            delete this.dataValue[keys[index]];
        }
        this.rows.splice(index, 1);
        this.redraw();
        this.triggerChange();
    };
    DataMapComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = this.hasChanged(value, this.dataValue);
        this.dataValue = value;
        this.createRows();
        this.updateOnChange(flags, changed);
        return changed;
    };
    DataMapComponent.prototype.checkColumns = function () {
        return { rebuild: false, show: true };
    };
    return DataMapComponent;
}(DataGridComponent));
export default DataMapComponent;
