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
import _ from 'lodash';
import { superGet } from '../../utils/utils';
import NestedComponent from '../_classes/nested/NestedComponent';
var ColumnsComponent = /** @class */ (function (_super) {
    __extends(ColumnsComponent, _super);
    function ColumnsComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.rows = [];
        return _this;
    }
    ColumnsComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent.schema.apply(NestedComponent, __spreadArrays([{
                label: 'Columns',
                key: 'columns',
                type: 'columns',
                columns: [
                    { components: [], width: 6, offset: 0, push: 0, pull: 0, size: 'md' },
                    { components: [], width: 6, offset: 0, push: 0, pull: 0, size: 'md' }
                ],
                clearOnHide: false,
                input: false,
                tableView: false,
                persistent: false,
                autoAdjust: false,
                hideOnChildrenHidden: false
            }], extend));
    };
    Object.defineProperty(ColumnsComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Columns',
                icon: 'columns',
                group: 'layout',
                documentation: 'http://help.form.io/userguide/#columns',
                weight: 10,
                schema: ColumnsComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnsComponent.prototype, "schema", {
        get: function () {
            var schema = _.omit(superGet(NestedComponent, 'schema', this), ['components']);
            this.columns.map(function (column, colIndex) {
                column.map(function (comp, compIndex) {
                    _.set(schema, "columns[" + colIndex + "].components[" + compIndex + "]", comp.schema);
                });
            });
            return schema;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnsComponent.prototype, "defaultSchema", {
        get: function () {
            return ColumnsComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnsComponent.prototype, "className", {
        get: function () {
            return "row " + superGet(NestedComponent, 'className', this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ColumnsComponent.prototype, "columnKey", {
        get: function () {
            return "column-" + this.id;
        },
        enumerable: false,
        configurable: true
    });
    ColumnsComponent.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.columns = [];
        _.each(this.component.columns, function (column, index) {
            _this.columns[index] = [];
            if (!column.size) {
                column.size = 'md';
            }
            // Ensure there is a components array.
            if (!Array.isArray(column.components)) {
                column.components = [];
            }
            _.each(column.components, function (comp) {
                comp.hideOnChildrenHidden = _this.component.hideOnChildrenHidden;
                var component = _this.createComponent(comp);
                component.column = index;
                _this.columns[index].push(component);
            });
        });
        this.rows = this.groupByRow();
    };
    ColumnsComponent.prototype.labelIsHidden = function () {
        return true;
    };
    ColumnsComponent.prototype.render = function () {
        var _this = this;
        return _super.prototype.render.call(this, this.renderTemplate('columns', {
            columnKey: this.columnKey,
            columnComponents: this.columns.map(function (column) { return _this.renderComponents(column); })
        }));
    };
    ColumnsComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        this.loadRefs(element, (_a = {}, _a[this.columnKey] = 'multiple', _a));
        var superAttach = _super.prototype.attach.call(this, element);
        this.refs[this.columnKey].forEach(function (column, index) {
            return _this.attachComponents(column, _this.columns[index], _this.component.columns[index].components);
        });
        return superAttach;
    };
    Object.defineProperty(ColumnsComponent.prototype, "gridSize", {
        get: function () {
            return 12;
        },
        enumerable: false,
        configurable: true
    });
    ColumnsComponent.prototype.justifyRow = function (columns) {
        var visible = _.filter(columns, 'visible');
        var nbColumns = columns.length;
        var nbVisible = visible.length;
        if (nbColumns > 0 && nbVisible > 0) {
            var w_1 = Math.floor(this.gridSize / nbVisible);
            var totalWidth = w_1 * nbVisible;
            var span = this.gridSize - totalWidth;
            _.each(visible, function (column) {
                column.component.width = w_1;
            });
            // In case when row is not fully filled,
            // extending last col to fill empty space.
            _.last(visible).component.width += span;
            _.each(visible, function (col) {
                if (col.element) {
                    col.element.setAttribute('class', col.className);
                }
            });
        }
    };
    /**
     * Group columns in rows.
     * @return {Array.<ColumnComponent[]>}
     */
    ColumnsComponent.prototype.groupByRow = function () {
        var _this = this;
        var initVal = { stack: [], rows: [] };
        var width = function (x) { return x.component.width; };
        var result = _.reduce(this.components, function (acc, next) {
            var stack = __spreadArrays(acc.stack, [next]);
            if (_.sumBy(stack, width) <= _this.gridSize) {
                acc.stack = stack;
                return acc;
            }
            else {
                acc.rows = __spreadArrays(acc.rows, [acc.stack]);
                acc.stack = [next];
                return acc;
            }
        }, initVal);
        return _.concat(result.rows, [result.stack]);
    };
    ColumnsComponent.prototype.justify = function () {
        _.each(this.columns, this.justifyRow.bind(this));
    };
    ColumnsComponent.prototype.checkComponentConditions = function (data, flags, row) {
        if (this.component.autoAdjust) {
            var result = _super.prototype.checkComponentConditions.call(this, data, flags, row);
            this.justify();
            return result;
        }
        else {
            return _super.prototype.checkComponentConditions.call(this, data, flags, row);
        }
    };
    ColumnsComponent.prototype.detach = function (all) {
        _super.prototype.detach.call(this, all);
    };
    ColumnsComponent.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.columns = [];
    };
    return ColumnsComponent;
}(NestedComponent));
export default ColumnsComponent;
