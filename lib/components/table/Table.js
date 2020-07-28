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
import BuilderUtils from '../../utils/builder';
import { superGet } from '../../utils/utils';
import NestedComponent from '../_classes/nested/NestedComponent';
var TableComponent = /** @class */ (function (_super) {
    __extends(TableComponent, _super);
    function TableComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.noField = true;
        return _this;
    }
    TableComponent.emptyTable = function (numRows, numCols) {
        var rows = [];
        for (var i = 0; i < numRows; i++) {
            var cols = [];
            for (var j = 0; j < numCols; j++) {
                cols.push({ components: [] });
            }
            rows.push(cols);
        }
        return rows;
    };
    TableComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent.schema.apply(NestedComponent, __spreadArrays([{
                label: 'Table',
                type: 'table',
                input: false,
                key: 'table',
                numRows: 3,
                numCols: 3,
                rows: TableComponent.emptyTable(3, 3),
                header: [],
                caption: '',
                cloneRows: false,
                striped: false,
                bordered: false,
                hover: false,
                condensed: false,
                persistent: false
            }], extend));
    };
    Object.defineProperty(TableComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Table',
                group: 'layout',
                icon: 'table',
                weight: 40,
                documentation: 'http://help.form.io/userguide/#table',
                schema: TableComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "defaultSchema", {
        get: function () {
            return TableComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "schema", {
        get: function () {
            var _this = this;
            var schema = _.omit(superGet(NestedComponent, 'schema', this), 'components');
            schema.rows = [];
            this.eachComponent(function (component) {
                if (!schema.rows || !schema.rows.length) {
                    schema.rows = TableComponent.emptyTable(_this.component.numRows, _this.component.numCols);
                }
                if (!schema.rows[component.tableRow]) {
                    schema.rows[component.tableRow] = [];
                }
                if (!schema.rows[component.tableRow][component.tableColumn]) {
                    schema.rows[component.tableRow][component.column] = { components: [] };
                }
                schema.rows[component.tableRow][component.tableColumn].components.push(component.schema);
            });
            if (!schema.rows.length) {
                schema.rows = TableComponent.emptyTable(this.component.numRows, this.component.numCols);
            }
            return schema;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "className", {
        get: function () {
            var name = "table-responsive " + superGet(NestedComponent, 'className', this);
            if (!this.component.bordered) {
                name += ' no-top-border-table';
            }
            return name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "cellClassName", {
        get: function () {
            var name = '';
            if (this.component.cellAlignment) {
                name = "cell-align-" + this.component.cellAlignment;
            }
            return name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TableComponent.prototype, "tableKey", {
        get: function () {
            return "table-" + this.key;
        },
        enumerable: false,
        configurable: true
    });
    TableComponent.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        // Ensure component.rows has the correct number of rows and columns.
        for (var rowIndex = 0; rowIndex < this.component.numRows; rowIndex++) {
            this.component.rows[rowIndex] = this.component.rows[rowIndex] || [];
            for (var colIndex = 0; colIndex < this.component.numCols; colIndex++) {
                this.component.rows[rowIndex][colIndex] = this.component.rows[rowIndex][colIndex] || { components: [] };
            }
            this.component.rows[rowIndex] = this.component.rows[rowIndex].slice(0, this.component.numCols);
        }
        this.component.rows = this.component.rows.slice(0, this.component.numRows);
        var lastNonEmptyRow = [];
        this.table = [];
        _.each(this.component.rows, function (row, rowIndex) {
            _this.table[rowIndex] = [];
            _.each(row, function (column, colIndex) {
                _this.table[rowIndex][colIndex] = [];
                if (_this.component.cloneRows) {
                    if (column.components.length) {
                        lastNonEmptyRow[colIndex] = column;
                    }
                    else if (lastNonEmptyRow[colIndex]) {
                        column.components = _.cloneDeep(lastNonEmptyRow[colIndex].components);
                        BuilderUtils.uniquify(_this.root._form.components, column);
                    }
                }
                _.each(column.components, function (comp) {
                    var component = _this.createComponent(comp);
                    component.tableRow = rowIndex;
                    component.tableColumn = colIndex;
                    _this.table[rowIndex][colIndex].push(component);
                });
            });
        });
    };
    TableComponent.prototype.render = function () {
        var _this = this;
        return _super.prototype.render.call(this, this.renderTemplate('table', {
            cellClassName: this.cellClassName,
            tableKey: this.tableKey,
            tableComponents: this.table.map(function (row) {
                return row.map(function (column) {
                    return _this.renderComponents(column);
                });
            })
        }));
    };
    TableComponent.prototype.attach = function (element) {
        var _this = this;
        var keys = this.table.reduce(function (prev, row, rowIndex) {
            prev[_this.tableKey + "-" + rowIndex] = 'multiple';
            return prev;
        }, {});
        this.loadRefs(element, keys);
        var superAttach = _super.prototype.attach.call(this, element);
        this.table.forEach(function (row, rowIndex) {
            row.forEach(function (column, columnIndex) {
                _this.attachComponents(_this.refs[_this.tableKey + "-" + rowIndex][columnIndex], _this.table[rowIndex][columnIndex], _this.component.rows[rowIndex][columnIndex].components);
            });
        });
        return superAttach;
    };
    TableComponent.prototype.destroy = function (all) {
        _super.prototype.destroy.call(this, all);
        delete this.table;
    };
    return TableComponent;
}(NestedComponent));
export default TableComponent;
